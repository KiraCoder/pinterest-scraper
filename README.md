# Pinterest Scraper

A TypeScript-based tool to scrape the most-liked pins from Pinterest search results.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install chromium
```

## Usage

### Quick Start (Recommended)

Get the most-liked pins with accurate data:

```bash
npm run dev -- --url "https://www.pinterest.com/search/pins/?q=comfy%20outfits" --max 50 --likes 5000 --fetch-details
```

### Two Modes

**1. Fast Mode (without `--fetch-details`)**
- Quickly collects pin links and images from search grid
- **No likes, descriptions, or author data**
- Use for: Just getting image URLs quickly

**2. Detailed Mode (with `--fetch-details`)** ⭐ **Recommended**
- Visits each pin's detail page to get accurate data
- **Gets exact likes counts, descriptions, and authors**
- Slower but much more useful for analysis
- Use for: Finding most-liked pins for analysis

### Options

- `--url <url>` - Pinterest search URL (required)
- `--max <number>` - Maximum number of pins to collect (default: 500)
- `--likes <number>` - Minimum likes threshold (default: 0)
- `--fetch-details` - Get accurate likes/descriptions/authors (recommended!)
- `--output <filename>` - Output CSV filename (default: auto-generated)
- `--headless <boolean>` - Run in headless mode (default: true)
- `--scroll-delay <number>` - Delay between scrolls in ms (default: 1000)

### Examples

```bash
# Get top 100 pins with 10k+ likes (with full details)
npm run dev -- --url "https://www.pinterest.com/search/pins/?q=interior%20design" --max 100 --likes 10000 --fetch-details

# Get 500 pins with any number of likes (fast, no details)
npm run dev -- --url "https://www.pinterest.com/search/pins/?q=recipes" --max 500

# Run with visible browser to see what's happening
npm run dev -- --url "https://www.pinterest.com/search/pins/?q=minimalist%20bedroom" --max 20 --fetch-details --headless false

# Get pins and save to custom filename
npm run dev -- --url "https://www.pinterest.com/search/pins/?q=street%20style" --max 200 --likes 5000 --fetch-details --output my_pins.csv
```

## Output

The scraper generates a CSV file with columns:

| Column | Description | Available Without --fetch-details |
|--------|-------------|----------------------------------|
| `pin_id` | Unique Pinterest pin ID | ✓ |
| `pin_link` | Full URL to the pin | ✓ |
| `image_link` | URL to the pin image | ✓ |
| `likes` | Number of saves/likes | ❌ (only with --fetch-details) |
| `description` | Pin title/description | ❌ (only with --fetch-details) |
| `author` | Pin author/creator | ❌ (only with --fetch-details) |

**Output filename format:** `pinterest_{query}_{timestamp}.csv`

## Tips

1. **Always use `--fetch-details`** if you need likes counts for analysis
2. Start with small `--max` values (20-50) to test before scraping thousands
3. Pinterest may rate-limit heavy scraping - the scraper includes random delays
4. Use `--headless false` to watch the scraper work (useful for debugging)
5. The scraper automatically filters pins below your `--likes` threshold

## How It Works

1. Opens Pinterest search page in browser
2. Scrolls down to load pins dynamically
3. Collects pin links and image URLs from grid
4. (If `--fetch-details` enabled) Visits each pin's detail page to extract likes, description, and author
5. Filters pins by your likes threshold
6. Exports to CSV sorted by likes (highest first)
