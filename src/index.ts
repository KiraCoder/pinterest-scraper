#!/usr/bin/env node

import { Command } from 'commander';
import { PinterestScraper } from './scraper';
import { exportToCSV, sortByLikes } from './csv-exporter';
import { generateFilename } from './utils';
import { ScraperConfig } from './types';

const program = new Command();

program
  .name('pinterest-scraper')
  .description('Scrape the most-liked pins from Pinterest search results')
  .version('2.0.0')
  .requiredOption('-u, --url <url>', 'Pinterest search URL')
  .option('-m, --max <number>', 'Maximum number of pins to collect', '2000')
  .option('-l, --likes <number>', 'Minimum saves/likes threshold', '0')
  .option('-o, --output <filename>', 'Output CSV filename (auto-generated if not provided)')
  .option('--headless <boolean>', 'Run browser in headless mode (ignored if using chrome-profile)', 'true')
  .option('--scroll-delay <number>', 'Delay between scrolls in ms', '1000')
  .option('--scroll-time <number>', 'Max time to scroll in seconds (e.g., 60 for 1 min, 120 for 2 min)')
  .option('--chrome-profile <path>', 'Path to your Chrome profile (enables extension support)')
  .option('--wait-for-login <number>', 'Seconds to wait for manual login', '0')
  .option('--use-extension', 'Use Pinterest Sort Extension data (auto-enabled with chrome-profile)')
  .option('--fetch-details', '[LEGACY] Visit each pin page to get accurate likes count (slower)')
  .parse(process.argv);

const options = program.opts();

async function main() {
  try {
    // Parse options
    const config: ScraperConfig = {
      url: options.url,
      maxResults: parseInt(options.max),
      likesThreshold: parseInt(options.likes),
      headless: options.headless === 'true' || options.headless === true,
      outputFilename: options.output,
      scrollDelay: parseInt(options.scrollDelay),
      scrollTime: options.scrollTime ? parseInt(options.scrollTime) : undefined,
      chromeProfile: options.chromeProfile,
      waitForLogin: options.waitForLogin ? parseInt(options.waitForLogin) : 0,
      useExtension: options.useExtension || !!options.chromeProfile,  // Auto-enable with chrome profile
      fetchDetails: options.fetchDetails || false,
    };

    // Validate URL
    if (!config.url.includes('pinterest.com')) {
      console.error('Error: URL must be a Pinterest URL');
      process.exit(1);
    }

    console.log('Pinterest Scraper v2.0 Starting...\n');
    console.log('Configuration:');
    console.log(`  URL: ${config.url}`);
    console.log(`  Max Results: ${config.maxResults}`);
    console.log(`  Min Saves/Likes: ${config.likesThreshold}`);
    if (config.scrollTime) {
      console.log(`  Max Scroll Time: ${config.scrollTime}s (${Math.floor(config.scrollTime / 60)}m ${config.scrollTime % 60}s)`);
    }
    console.log(`  Chrome Profile: ${config.chromeProfile ? 'Yes (using your Chrome)' : 'No (using Playwright Chromium)'}`);
    console.log(`  Extension Mode: ${config.useExtension ? 'Yes (fast, accurate data)' : 'No'}`);
    if (config.waitForLogin && config.waitForLogin > 0) {
      console.log(`  Wait for Login: ${config.waitForLogin}s`);
    }
    console.log('');

    // Initialize scraper
    const scraper = new PinterestScraper(config);

    try {
      // Start scraping
      await scraper.initialize();
      const pins = await scraper.scrape();

      // Sort by likes
      const sortedPins = sortByLikes(pins);

      // Generate filename
      const filename = generateFilename(config.url, config.outputFilename);

      // Export to CSV
      await exportToCSV(sortedPins, filename);

      console.log('\n✓ Scraping completed successfully!');
      console.log(`\nTop 5 most-saved pins:`);
      sortedPins.slice(0, 5).forEach((pin, index) => {
        const saves = pin.saves ?? pin.likes ?? '?';
        const extras: string[] = [];
        if (pin.reactions) extras.push(`${pin.reactions} reactions`);
        if (pin.repins) extras.push(`${pin.repins} repins`);
        const extrasText = extras.length > 0 ? ` (${extras.join(', ')})` : '';
        console.log(`  ${index + 1}. ${saves} saves${extrasText} - ${pin.pin_link}`);
      });
    } finally {
      // Always close browser
      await scraper.close();
    }
  } catch (error) {
    console.error('\n❌ Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Run the scraper
main();
