# Upsell Pinterest Scraper - Chrome Extension

A beautiful, easy-to-use Chrome extension for scraping Pinterest pins with full engagement metrics.

## Features

- **Modern UI**: Clean, gradient-based interface with real-time progress tracking
- **Flexible Options**: Configure max pins, minimum likes threshold, scroll delay, and time limits
- **Rich Data**: Extracts saves, reactions, likes, repins, comments, shares, creation date, descriptions, and authors
- **Auto-Download**: Automatically generates and downloads CSV files
- **Extension Compatible**: Works with Pinterest Sort Extension for enhanced data extraction
- **Real-time Progress**: Live stats showing pins collected, scroll cycles, and elapsed time

## Installation

### Step 1: Prepare the Extension

The extension files are already in the `extension/` folder. Before loading, you need icon files.

#### Create Simple Icons (Temporary)

For now, you can use any 16x16, 48x48, and 128x128 PNG images. Save them as:
- `icon16.png`
- `icon48.png`
- `icon128.png`

Or create simple colored squares using this command:

```bash
cd extension

# On macOS (requires ImageMagick - install with: brew install imagemagick)
convert -size 16x16 xc:#667eea icon16.png
convert -size 48x48 xc:#667eea icon48.png
convert -size 128x128 xc:#667eea icon128.png

# Or just copy any existing PNG files and rename them
```

### Step 2: Load Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top right corner)
3. Click **"Load unpacked"**
4. Select the `extension/` folder from this project
5. The extension should now appear in your toolbar

### Step 3: Pin the Extension (Optional)

1. Click the puzzle piece icon in Chrome toolbar
2. Find "Upsell Pinterest Scraper"
3. Click the pin icon to keep it visible

## Usage

### Quick Start

1. **Navigate to Pinterest search page**
   - Example: `https://www.pinterest.com/search/pins/?q=comfy+outfits`

2. **Click the extension icon** in your Chrome toolbar

3. **Configure settings:**
   - **Maximum Pins**: How many pins to collect (default: 100)
   - **Minimum Saves/Likes**: Filter out pins below this threshold (default: 0)
   - **Scroll Delay**: Milliseconds between scrolls (default: 1500)
   - **Max Time**: Maximum seconds to scroll (0 = unlimited)

4. **Click "Start Scraping"**

5. **Watch the progress** as it collects pins automatically

6. **CSV auto-downloads** when complete

### Example Configurations

#### Quick Scrape (100 pins in ~2 minutes)
- Max Pins: 100
- Min Saves: 0
- Scroll Delay: 1500ms
- Max Time: 0

#### High-Quality Pins (500 pins with 10k+ saves)
- Max Pins: 500
- Min Saves: 10000
- Scroll Delay: 1500ms
- Max Time: 180 (3 minutes)

#### Fast Scroll (many pins quickly)
- Max Pins: 2000
- Min Saves: 0
- Scroll Delay: 800ms
- Max Time: 120 (2 minutes)

## CSV Output

The extension generates a CSV file with these columns:

| Column | Description |
|--------|-------------|
| Pin ID | Unique Pinterest pin ID |
| Pin Link | Full URL to the pin |
| Image Link | Direct link to pin image |
| Saves | Number of saves (if available) |
| Reactions | Number of reactions |
| Likes | Number of likes |
| Repins | Number of repins |
| Comments | Number of comments |
| Shares | Number of shares |
| Created At | When pin was created |
| Description | Pin description/title |
| Author | Pin creator |

**Filename format**: `upsell_pinterest_YYYY-MM-DDTHH-MM-SS.csv`

## Enhanced Mode with Pinterest Sort Extension

For best results, install the [Pinterest Sort Extension](https://chromewebstore.google.com/detail/pinterest-sort-extension/djcledakkebdgjncnemijiabiaimbaic) in Chrome:

1. Install Pinterest Sort Extension from Chrome Web Store
2. Navigate to Pinterest search page
3. Wait for extension overlays to appear on pins
4. Use this scraper - it will automatically detect and extract the rich data

## Tips

- **Start small**: Test with 10-20 pins first to verify it works
- **Scroll delay matters**: Too fast (< 1000ms) may miss pins, too slow wastes time
- **Pinterest loads infinitely**: The scraper will keep going until limits are reached
- **Use time limits**: Set Max Time to prevent endless scrolling
- **Check your browser**: Works best when Pinterest page is visible (not in background tab)

## Troubleshooting

### Extension doesn't appear
- Make sure you loaded the unpacked extension correctly
- Check for errors in `chrome://extensions/`
- Verify all files are in the `extension/` folder

### "Not on Pinterest" warning
- You must be on a Pinterest search results page
- URL should contain: `pinterest.com/search/pins/?q=`

### No data collected
- Scroll more slowly (increase scroll delay to 2000ms)
- Make sure page has fully loaded before starting
- Check browser console for errors (F12 → Console tab)

### Missing saves/likes data
- Install Pinterest Sort Extension for better data
- Some pins may not have public save counts
- Pinterest's API may limit data visibility

### CSV doesn't download
- Check Chrome's download permissions for extensions
- Look in Downloads folder - it may have downloaded silently
- Try clicking "Download CSV" button manually

## Development

Want to modify the extension? Here's the structure:

```
extension/
├── manifest.json       # Extension configuration
├── popup.html          # UI interface
├── popup.js            # UI logic and CSV generation
├── content.js          # Pinterest page scraping logic
├── styles.css          # Modern UI styling
├── icon16.png          # 16x16 icon
├── icon48.png          # 48x48 icon
├── icon128.png         # 128x128 icon
└── README.md           # This file
```

### Making Changes

1. Edit the files in `extension/` folder
2. Go to `chrome://extensions/`
3. Click the refresh icon on "Upsell Pinterest Scraper"
4. Test your changes

## License

MIT License - Feel free to modify and use as needed!

## Credits

Built with modern web technologies:
- Chrome Extensions Manifest V3
- Vanilla JavaScript
- CSS Gradients & Flexbox
- Pinterest's public DOM structure
