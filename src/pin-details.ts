import { Page } from 'playwright';
import { PinData } from './types';
import { normalizeLikes, cleanText } from './utils';

/**
 * Extract detailed information from a pin's detail page
 */
export async function extractPinDetails(page: Page, pinData: PinData): Promise<PinData> {
  try {
    console.log(`  Fetching details for pin ${pinData.pin_id}...`);

    // Navigate to pin detail page
    await page.goto(pinData.pin_link, {
      waitUntil: 'domcontentloaded',
      timeout: 15000
    });

    // Wait a bit for dynamic content to load
    await page.waitForTimeout(2000);

    // Extract likes/saves count
    // Pinterest shows saves count in various places
    let likes: number | null = null;

    // Try multiple selectors for the saves/likes count
    const possibleSelectors = [
      'div[data-test-id="saves-count"]',
      'div[data-test-id="aggregated-save-count"]',
      'span:has-text("saves")',
      'span:has-text("save")',
      '[aria-label*="saves"]',
      '[aria-label*="save"]',
    ];

    for (const selector of possibleSelectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          const text = await element.textContent();
          if (text) {
            const match = text.match(/(\d+\.?\d*[kKmM]?)\s*(saves?|likes?)?/i);
            if (match) {
              likes = normalizeLikes(match[1]);
              if (likes !== null) break;
            }
          }
        }
      } catch (e) {
        continue;
      }
    }

    // If still no likes found, try extracting from entire page text
    if (likes === null) {
      const pageText = await page.textContent('body');
      if (pageText) {
        const savesMatch = pageText.match(/(\d+\.?\d*[kKmM]?)\s+saves/i);
        if (savesMatch) {
          likes = normalizeLikes(savesMatch[1]);
        }
      }
    }

    // Extract description
    let description: string | null = null;
    const descSelectors = [
      'h1[data-test-id="pin-title"]',
      'div[data-test-id="pinrep-description"]',
      'h1',
      'meta[property="og:description"]',
    ];

    for (const selector of descSelectors) {
      try {
        if (selector.startsWith('meta')) {
          description = await page.getAttribute(selector, 'content');
        } else {
          const element = await page.$(selector);
          if (element) {
            description = await element.textContent();
          }
        }
        if (description) {
          description = cleanText(description);
          if (description && description.length > 10) break;
        }
      } catch (e) {
        continue;
      }
    }

    // Extract author
    let author: string | null = null;
    const authorSelectors = [
      'div[data-test-id="creator-profile-name"]',
      'a[data-test-id="creator-profile-link"]',
      '[data-test-id="closeup-attribution"] a',
    ];

    for (const selector of authorSelectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          author = await element.textContent();
          if (author) {
            author = cleanText(author);
            if (author) break;
          }
        }
      } catch (e) {
        continue;
      }
    }

    // Update pin data
    return {
      ...pinData,
      likes: likes ?? pinData.likes,
      description: description ?? pinData.description,
      author: author ?? pinData.author,
    };
  } catch (error) {
    console.error(`  ✗ Failed to fetch details for pin ${pinData.pin_id}:`, error instanceof Error ? error.message : error);
    return pinData;
  }
}
