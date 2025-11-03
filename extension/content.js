// Pinterest Scraper Content Script
// Prevent multiple injections
if (window.upsellPinterestScraperLoaded) {
  console.log('🎯 Upsell Pinterest Scraper already loaded, skipping duplicate injection');
  // Still set up listener in case it was cleared
} else {
  window.upsellPinterestScraperLoaded = true;
  console.log('🎯 Upsell Pinterest Scraper content script loaded');
}

// Initialize variables if not already done
if (!window.scraperState) {
  window.scraperState = {
    isActive: false,
    config: null,
    collectedPins: new Map(),
    scrollCycleCount: 0,
    startTime: 0,
    scraperInterval: null,
    lastPinCount: 0,
    stallCycles: 0,
    maxStallCycles: 5
  };
}

let isScraperActive = window.scraperState.isActive;
let scraperConfig = window.scraperState.config;
let collectedPins = window.scraperState.collectedPins;
let scrollCycleCount = window.scraperState.scrollCycleCount;
let startTime = window.scraperState.startTime;
let scraperInterval = window.scraperState.scraperInterval;
let lastPinCount = window.scraperState.lastPinCount;
let stallCycles = window.scraperState.stallCycles;
let maxStallCycles = window.scraperState.maxStallCycles;

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('📨 Content script received message:', message);

  if (message.action === 'START_SCRAPING') {
    startScraping(message.config);
    sendResponse({ status: 'started' });
  } else if (message.action === 'STOP_SCRAPING') {
    stopScraping();
    sendResponse({ status: 'stopped' });
  } else if (message.action === 'GET_SEARCH_QUERY') {
    // Extract search query from Pinterest's search input
    const searchInput = document.querySelector('input[id*="SearchInput"]') ||
                       document.querySelector('input[type="search"]') ||
                       document.querySelector('input[placeholder*="Search"]');

    const searchQuery = searchInput?.value || 'pinterest_pins';
    console.log('🔍 Extracted search query:', searchQuery);
    sendResponse({ searchQuery });
  }

  return true; // Keep the message channel open for async response
});

function startScraping(config) {
  console.log('🚀 Starting Pinterest scraper with config:', config);

  isScraperActive = true;
  scraperConfig = config;
  collectedPins.clear();
  scrollCycleCount = 0;
  startTime = Date.now();
  lastPinCount = 0;
  stallCycles = 0;

  // Start the scraping loop
  scrapingLoop();
}

function stopScraping() {
  console.log('🛑 Stopping scraper');
  isScraperActive = false;

  if (scraperInterval) {
    clearTimeout(scraperInterval);
    scraperInterval = null;
  }

  // Send final data
  sendComplete();
}

async function scrapingLoop() {
  if (!isScraperActive) return;

  // Extract pins from current view
  await extractPinsFromPage();
  scrollCycleCount++;

  // Check if we made progress
  if (collectedPins.size === lastPinCount) {
    stallCycles++;
    console.log(`⚠️ Stalled ${stallCycles}/${maxStallCycles} - no new pins found`);
  } else {
    stallCycles = 0; // Reset stall counter
    lastPinCount = collectedPins.size;
  }

  // Check if we've reached limits
  const elapsedTime = (Date.now() - startTime) / 1000;
  const hasReachedMaxPins = collectedPins.size >= scraperConfig.maxPins;
  const hasReachedMaxTime = scraperConfig.maxTime > 0 && elapsedTime >= scraperConfig.maxTime;
  const hasStalled = stallCycles >= maxStallCycles;

  if (hasReachedMaxPins) {
    console.log('✓ Reached maximum pins target');
    stopScraping();
    return;
  }

  if (hasReachedMaxTime) {
    console.log('⏱️ Time limit reached');
    stopScraping();
    return;
  }

  if (hasStalled) {
    console.log('⚠️ Stopped - no new pins loading after multiple scrolls');
    stopScraping();
    return;
  }

  // Send progress update
  sendProgress();

  // Scroll down more aggressively to load new content
  window.scrollBy({ top: 1000, behavior: 'smooth' });

  // Wait a bit for content to load
  await new Promise(resolve => setTimeout(resolve, 500));

  // Schedule next iteration
  scraperInterval = setTimeout(scrapingLoop, scraperConfig.scrollDelay);
}

async function extractPinsFromPage() {
  // Find all pin links on the page - try multiple selectors
  let pinLinks = [];

  // Method 1: Look for links with /pin/ pattern
  const links1 = document.querySelectorAll('a[href*="/pin/"]');

  // Method 2: Look for data-grid-item containers (Pinterest's grid structure)
  const gridItems = document.querySelectorAll('[data-grid-item="true"]');

  // Method 3: Look for common Pinterest pin container patterns
  const pinContainers = document.querySelectorAll('div[data-test-id="pin"], div[data-test-id="pinWrapper"]');

  console.log(`📍 DOM scan - ${links1.length} pin links, ${gridItems.length} grid items, ${pinContainers.length} test containers`);

  // Debug: Log first few hrefs to see what we're finding
  if (links1.length > 0) {
    console.log(`  Sample hrefs:`, Array.from(links1).slice(0, 5).map(l => l.getAttribute('href')));
  }

  // Collect all links - be very permissive
  const allPinLinks = new Set();

  // Add all links with /pin/ in href
  links1.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes('/pin/')) {
      // Skip obvious non-pin links
      if (!href.includes('/boards/') &&
          !href.includes('/_protected/') &&
          !href.includes('/users/')) {
        allPinLinks.add(link);
      }
    }
  });

  // Also scan grid items specifically
  gridItems.forEach(item => {
    const links = item.querySelectorAll('a[href*="/pin/"]');
    links.forEach(link => allPinLinks.add(link));
  });

  const uniqueLinks = Array.from(allPinLinks);

  console.log(`📍 Found ${uniqueLinks.length} unique pin link elements to process`);

  let newPinsCount = 0;
  let skippedExisting = 0;
  let failedExtraction = 0;

  for (const linkElement of uniqueLinks) {
    try {
      const href = linkElement.getAttribute('href');
      if (!href || !href.includes('/pin/')) {
        continue;
      }

      // Extract pin ID from URL - more robust regex
      const pinIdMatch = href.match(/\/pin\/(\d+)/);
      if (!pinIdMatch) {
        console.log(`  ⚠️ Couldn't extract pin ID from: ${href}`);
        continue;
      }

      const pinId = pinIdMatch[1];

      // Skip if already collected
      if (collectedPins.has(pinId)) {
        skippedExisting++;
        continue;
      }

      // Extract pin data
      const pinData = await extractPinData(linkElement, pinId);
      if (pinData) {
        collectedPins.set(pinId, pinData);
        newPinsCount++;
        console.log(`✓ Collected pin ${pinId} (Total: ${collectedPins.size})`);
      } else {
        failedExtraction++;
        console.log(`  ✗ Failed to extract data for pin ${pinId}`);
      }
    } catch (error) {
      console.error('  ✗ Error extracting pin:', error);
      failedExtraction++;
    }
  }

  console.log(`📌 Cycle summary: ${newPinsCount} new, ${skippedExisting} already had, ${failedExtraction} failed (Total: ${collectedPins.size})`);
}

async function extractPinData(linkElement, pinId) {
  try {
    // Build pin URL
    const href = linkElement.getAttribute('href');
    const pinUrl = href.startsWith('http') ? href : `https://www.pinterest.com${href}`;

    // Find the parent container (try to get the grid item)
    let container = linkElement;
    for (let i = 0; i < 10; i++) {
      if (container.hasAttribute('data-grid-item') ||
          container.querySelector('[data-grid-item]')) {
        break;
      }
      container = container.parentElement;
      if (!container) break;
    }

    // Extract image URL
    const imgElement = linkElement.querySelector('img');
    let imageUrl = '';
    if (imgElement) {
      imageUrl = imgElement.src || imgElement.getAttribute('data-src') || '';
    }

    // Try to extract metrics from Pinterest's data
    const metrics = extractMetricsFromContainer(container);

    // Extract description from container text
    const description = extractDescription(container);

    // Try to find author
    const author = extractAuthor(container);

    const pinData = {
      pin_id: pinId,
      pin_link: pinUrl,
      image_link: imageUrl,
      saves: metrics.saves,
      reactions: metrics.reactions,
      likes: metrics.likes || metrics.saves, // Fallback to saves
      repins: metrics.repins,
      comments: metrics.comments,
      shares: metrics.shares,
      created_at: metrics.created_at,
      description: description,
      author: author
    };

    return pinData;
  } catch (error) {
    console.error('Error in extractPinData for pin', pinId, ':', error);

    // Return minimal pin data even if extraction fails
    const href = linkElement.getAttribute('href');
    const pinUrl = href?.startsWith('http') ? href : `https://www.pinterest.com${href || '/pin/' + pinId}`;

    return {
      pin_id: pinId,
      pin_link: pinUrl,
      image_link: '',
      saves: null,
      reactions: null,
      likes: null,
      repins: null,
      comments: null,
      shares: null,
      created_at: null,
      description: null,
      author: null
    };
  }
}

function extractMetricsFromContainer(container) {
  const metrics = {
    saves: null,
    reactions: null,
    likes: null,
    repins: null,
    comments: null,
    shares: null,
    created_at: null
  };

  // Check for Pinterest Sort Extension data
  const extensionOverlay = container.querySelector('.absolute.left-2.top-1');
  if (extensionOverlay) {
    const tooltips = extensionOverlay.querySelectorAll('.ytuong-tooltip');

    tooltips.forEach(tooltip => {
      const tooltipText = tooltip.textContent?.trim();
      if (!tooltipText) return;

      const parent = tooltip.parentElement?.parentElement;
      if (!parent) return;

      // Find badge with number
      const badges = parent.querySelectorAll('span[class*="bg-"]');
      let valueText = null;

      for (const badge of badges) {
        const text = badge.textContent?.trim();
        if (text && /\d/.test(text)) {
          valueText = text;
          break;
        }
      }

      const parseNum = (text) => {
        if (!text) return null;
        const cleaned = text.replace(/,/g, '');
        const num = parseInt(cleaned, 10);
        return isNaN(num) ? null : num;
      };

      switch (tooltipText) {
        case 'Saves':
          metrics.saves = parseNum(valueText);
          break;
        case 'Reactions':
          metrics.reactions = parseNum(valueText);
          break;
        case 'Likes':
          metrics.likes = parseNum(valueText);
          break;
        case 'Repins':
          metrics.repins = parseNum(valueText);
          break;
        case 'Comments':
          metrics.comments = parseNum(valueText);
          break;
        case 'Shares':
          metrics.shares = parseNum(valueText);
          break;
        case 'Created At':
          metrics.created_at = valueText;
          break;
      }
    });
  } else {
    // Fallback: Try to extract from Pinterest's native elements
    const textContent = container.textContent || '';

    // Look for save count patterns like "123 saves" or "1.2k saves"
    const saveMatch = textContent.match(/([0-9,.]+[kKmM]?)\s*saves?/i);
    if (saveMatch) {
      metrics.saves = parseMetricNumber(saveMatch[1]);
      metrics.likes = metrics.saves; // Use saves as likes fallback
    }
  }

  return metrics;
}

function parseMetricNumber(text) {
  if (!text) return null;

  text = text.trim().toLowerCase();
  let multiplier = 1;

  if (text.includes('k')) {
    multiplier = 1000;
    text = text.replace('k', '');
  } else if (text.includes('m')) {
    multiplier = 1000000;
    text = text.replace('m', '');
  }

  const num = parseFloat(text.replace(/,/g, ''));
  return isNaN(num) ? null : Math.round(num * multiplier);
}

function extractDescription(container) {
  // Try to find description text
  const textElements = container.querySelectorAll('div, span, p');

  for (const el of textElements) {
    const text = el.textContent?.trim();
    if (text && text.length > 20 && text.length < 500 && !text.match(/^\d+$/)) {
      // Likely a description
      return text.substring(0, 500);
    }
  }

  return null;
}

function extractAuthor(container) {
  // Try to find author/creator name
  const links = container.querySelectorAll('a[href*="/"]');

  for (const link of links) {
    const href = link.getAttribute('href');
    if (href && href.startsWith('/') && !href.includes('/pin/') && !href.includes('/search/')) {
      const text = link.textContent?.trim();
      if (text && text.length > 0 && text.length < 100) {
        return text;
      }
    }
  }

  return null;
}

function sendProgress() {
  const pins = Array.from(collectedPins.values());

  let status = `Scrolling and collecting pins... (${collectedPins.size}/${scraperConfig.maxPins})`;

  if (stallCycles > 0) {
    status = `⚠️ Stalled ${stallCycles}/${maxStallCycles} - Looking for new pins... (${collectedPins.size}/${scraperConfig.maxPins})`;
  }

  chrome.runtime.sendMessage({
    action: 'UPDATE_PROGRESS',
    data: {
      pinsCollected: collectedPins.size,
      scrollCycles: scrollCycleCount,
      status: status,
      pins: pins
    }
  });
}

function sendComplete() {
  const pins = Array.from(collectedPins.values());

  chrome.runtime.sendMessage({
    action: 'SCRAPING_COMPLETE',
    data: {
      pins: pins,
      totalCollected: pins.length
    }
  });
}
