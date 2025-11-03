import { chromium, Browser, Page, BrowserContext } from 'playwright';
import { PinData, ScraperConfig, ScrapeProgress } from './types';
import { SELECTORS } from './selectors';
import { extractPinId, normalizeLikes, randomDelay, cleanText } from './utils';
import { extractPinDetails } from './pin-details';
import { extractExtensionDataV2 } from './extension-extractor';

export class PinterestScraper {
  private browser: Browser | BrowserContext | null = null;
  private page: Page | null = null;
  private config: ScraperConfig;
  private collectedPins: Map<string, PinData> = new Map();
  private progress: ScrapeProgress = {
    totalCollected: 0,
    uniquePins: 0,
    aboveThreshold: 0,
    currentScrollCycle: 0,
  };
  private startTime: number = 0;

  constructor(config: ScraperConfig) {
    this.config = {
      scrollDelay: 1000,
      maxStallCycles: 15,
      ...config,
    };
  }

  /**
   * Initialize browser and navigate to Pinterest search URL
   */
  async initialize(): Promise<void> {
    console.log('Launching browser...');

    // Launch browser with user's Chrome profile if provided
    if (this.config.chromeProfile) {
      console.log(`Using Chrome profile: ${this.config.chromeProfile}`);
      this.browser = await chromium.launchPersistentContext(this.config.chromeProfile, {
        headless: false,  // Must be false when using user profile
        channel: 'chrome',  // Use actual Chrome instead of Chromium
        viewport: { width: 1920, height: 1080 },
        args: [
          '--disable-blink-features=AutomationControlled',
        ],
        ignoreDefaultArgs: ['--disable-extensions', '--disable-component-extensions-with-background-pages'],
      });

      // For persistent context, browser IS the context, so we get page directly
      const pages = this.browser.pages();
      if (pages.length > 0) {
        this.page = pages[0];
      } else {
        this.page = await this.browser.newPage();
      }
    } else {
      // Standard Playwright launch without profile
      this.browser = await chromium.launch({
        headless: this.config.headless,
      });

      const context = await this.browser.newContext({
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        viewport: { width: 1920, height: 1080 },
      });

      this.page = await context.newPage();
    }

    console.log(`Navigating to: ${this.config.url}`);
    await this.page.goto(this.config.url, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    // Wait for Pinterest to load pins
    console.log('Waiting for page to load...');
    await this.page.waitForTimeout(3000);

    // If wait for login is specified, give user time to log in
    if (this.config.waitForLogin && this.config.waitForLogin > 0) {
      console.log(`\n⏳ Waiting ${this.config.waitForLogin} seconds for you to log in if needed...`);
      console.log('(The browser window is open - please log in if required)\n');
      await this.page.waitForTimeout(this.config.waitForLogin * 1000);
    }

    // Debug: Check if extension is loaded
    if (this.config.useExtension) {
      await this.page.waitForTimeout(2000); // Extra wait for extension to load
      const extensionCheck = await this.page.$$('.absolute.left-2.top-1');
      console.log(`\n🔍 Extension check: Found ${extensionCheck.length} extension overlays`);
      if (extensionCheck.length === 0) {
        console.log('⚠️  WARNING: Pinterest Sort Extension overlays not detected!');
        console.log('   Make sure the extension is installed and active in your Chrome profile.');
      } else {
        console.log('✓ Extension overlays detected!\n');
      }
    }
  }

  /**
   * Main scraping loop with auto-scrolling
   */
  async scrape(): Promise<PinData[]> {
    if (!this.page) throw new Error('Page not initialized');

    console.log('\nStarting scrape...');
    if (this.config.scrollTime) {
      console.log(`Target: ${this.config.maxResults} pins OR ${this.config.scrollTime} seconds (whichever comes first)`);
    } else {
      console.log(`Target: ${this.config.maxResults} pins`);
    }
    console.log(`Min saves threshold: ${this.config.likesThreshold}\n`);

    // Record start time for time-based stopping
    this.startTime = Date.now();
    const maxTimeMs = this.config.scrollTime ? this.config.scrollTime * 1000 : Infinity;

    let stalledCycles = 0;
    let lastUniqueCount = 0;

    while (
      this.collectedPins.size < this.config.maxResults &&
      stalledCycles < (this.config.maxStallCycles || 15)
    ) {
      // Check if time limit reached
      const elapsedTime = Date.now() - this.startTime;
      if (elapsedTime >= maxTimeMs) {
        console.log(`\n⏱️  Time limit reached (${this.config.scrollTime}s)`);
        break;
      }

      this.progress.currentScrollCycle++;

      // Extract pins from current viewport
      await this.extractPinsFromPage();

      // Check if we made progress
      if (this.collectedPins.size === lastUniqueCount) {
        stalledCycles++;
        console.log(`  [Stalled ${stalledCycles}/${this.config.maxStallCycles}] No new pins found`);
      } else {
        stalledCycles = 0;
        lastUniqueCount = this.collectedPins.size;
      }

      // Print progress (with time remaining if applicable)
      this.printProgress(elapsedTime, maxTimeMs);

      // Stop if we have enough pins
      if (this.collectedPins.size >= this.config.maxResults) {
        console.log('\n✓ Reached target number of pins');
        break;
      }

      // Scroll to load more pins
      await this.scrollPage();

      // Random delay to mimic human behavior
      await randomDelay(this.config.scrollDelay || 1000, 800);
    }

    if (stalledCycles >= (this.config.maxStallCycles || 15)) {
      console.log('\n⚠ Stopped: No new pins loading after multiple scroll attempts');
    }

    // Convert to array
    let allPins = Array.from(this.collectedPins.values());

    // Fetch detailed information if requested
    if (this.config.fetchDetails) {
      console.log(`\n\nFetching detailed information for ${allPins.length} pins...`);
      allPins = await this.fetchPinDetails(allPins);
    }

    // Filter by likes threshold
    const filteredPins = allPins.filter(
      pin => pin.likes === null || pin.likes >= this.config.likesThreshold
    );

    console.log(`\nTotal unique pins collected: ${allPins.length}`);
    console.log(`Pins above ${this.config.likesThreshold} likes threshold: ${filteredPins.length}`);

    return filteredPins;
  }

  /**
   * Fetch detailed information for each pin
   */
  private async fetchPinDetails(pins: PinData[]): Promise<PinData[]> {
    if (!this.page) return pins;

    const detailedPins: PinData[] = [];

    for (let i = 0; i < pins.length; i++) {
      const pin = pins[i];
      console.log(`[${i + 1}/${pins.length}] Fetching details for pin ${pin.pin_id}`);

      try {
        const detailedPin = await extractPinDetails(this.page, pin);
        detailedPins.push(detailedPin);

        // Add random delay between requests to avoid rate limiting
        if (i < pins.length - 1) {
          await randomDelay(800, 600);
        }
      } catch (error) {
        console.error(`  ✗ Error fetching details: ${error instanceof Error ? error.message : error}`);
        detailedPins.push(pin);
      }
    }

    return detailedPins;
  }

  /**
   * Extract pin data from all visible pins on the page
   */
  private async extractPinsFromPage(): Promise<void> {
    if (!this.page) return;

    // Find all pin links
    const pinLinks = await this.page.$$(SELECTORS.pinLink);

    for (const linkElement of pinLinks) {
      try {
        // Extract pin URL
        const href = await linkElement.getAttribute('href');
        if (!href) continue;

        // Build absolute URL
        const pinUrl = href.startsWith('http') ? href : `https://www.pinterest.com${href}`;
        const pinId = extractPinId(pinUrl);
        if (!pinId || this.collectedPins.has(pinId)) continue;

        // Extract image
        const imgElement = await linkElement.$('img');
        let imageUrl: string | null = null;
        if (imgElement) {
          imageUrl = (await imgElement.getAttribute('src')) ||
                     (await imgElement.getAttribute('data-src')) ||
                     null;
        }

        // Try to find parent container for metadata
        const container = await linkElement.evaluateHandle(el => {
          let parent = el.parentElement;
          let depth = 0;
          while (parent && depth < 10) {
            if (parent.hasAttribute('data-grid-item') || parent.querySelector('[data-grid-item]')) {
              return parent;
            }
            parent = parent.parentElement;
            depth++;
          }
          return el.parentElement || el;
        });

        // Extract extension data if using extension
        let extensionData = {
          saves: null as number | null,
          reactions: null as number | null,
          likes: null as number | null,
          repins: null as number | null,
          comments: null as number | null,
          shares: null as number | null,
          created_at: null as string | null,
        };

        if (this.config.useExtension) {
          extensionData = await extractExtensionDataV2(container);
        }

        // Extract text content from container for description
        const textContent = await container.evaluate(el => el.textContent);
        const description = cleanText(textContent);

        // Create pin data with all fields
        const pinData: PinData = {
          pin_id: pinId,
          pin_link: pinUrl,
          image_link: imageUrl || '',
          saves: extensionData.saves,
          reactions: extensionData.reactions,
          likes: extensionData.likes,
          repins: extensionData.repins,
          comments: extensionData.comments,
          shares: extensionData.shares,
          created_at: extensionData.created_at,
          description: description ? description.substring(0, 500) : null,
          author: null,
        };

        this.collectedPins.set(pinId, pinData);
      } catch (error) {
        // Skip problematic pins
        continue;
      }
    }
  }

  /**
   * Scroll the page to load more pins
   */
  private async scrollPage(): Promise<void> {
    if (!this.page) return;

    // Scroll using mouse wheel
    await this.page.mouse.wheel(0, 800);

    // Wait for new content to load
    await this.page.waitForTimeout(1500);
  }

  /**
   * Print current progress
   */
  private printProgress(elapsedTimeMs?: number, maxTimeMs?: number): void {
    const aboveThreshold = Array.from(this.collectedPins.values()).filter(
      pin => (pin.saves !== null && pin.saves >= this.config.likesThreshold) ||
             (pin.likes !== null && pin.likes >= this.config.likesThreshold) ||
             (pin.saves === null && pin.likes === null)
    ).length;

    let progressText = `\r  Cycle ${this.progress.currentScrollCycle} | ` +
      `Unique pins: ${this.collectedPins.size} | ` +
      `Above threshold: ${aboveThreshold}`;

    // Add time info if available
    if (elapsedTimeMs !== undefined && maxTimeMs !== undefined && maxTimeMs !== Infinity) {
      const elapsedSec = Math.floor(elapsedTimeMs / 1000);
      const maxSec = Math.floor(maxTimeMs / 1000);
      const remainingSec = maxSec - elapsedSec;
      progressText += ` | Time: ${elapsedSec}s/${maxSec}s (${remainingSec}s left)`;
    }

    process.stdout.write(progressText);
  }

  /**
   * Close browser and cleanup
   */
  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }
  }
}
