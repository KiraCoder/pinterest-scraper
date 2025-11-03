# Pinterest Scraper v2.0 🚀

**NEW**: Now supports Pinterest Sort Extension for fast, accurate data extraction!

A TypeScript-based tool to scrape the most-saved pins from Pinterest search results with full metrics (saves, reactions, likes, repins, comments, shares, dates).

## What's New in v2.0

✨ **Pinterest Sort Extension Support** - Extract ALL metrics instantly from the grid (no need to visit each pin)
⏱️ **Time-based Scrolling** - Set max scroll time (e.g., 60s) OR max pins - whichever comes first
🎯 **Much Faster** - Get thousands of pins in minutes with accurate data
📊 **More Data** - Saves, Reactions, Likes, Repins, Comments, Shares, Created Date

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers (for non-extension mode):
```bash
npx playwright install chromium
```

3. **(Recommended)** Install [Pinterest Sort Extension](https://chromewebstore.google.com/detail/pinterest-sort-extension/djcledakkebdgjncnemijiabiaimbaic) in your Chrome browser

## Usage

### Recommended: With Pinterest Sort Extension (Fast & Accurate)

```bash
npm run dev -- \
  --url "https://www.pinterest.com/search/pins/?q=minimalist%20interior" \
  --max 2000 \
  --scroll-time 120 \
  --chrome-profile "/Users/YOUR_USERNAME/Library/Application Support/Google/Chrome/Profile 1"
```

**Find your Chrome profile path:**
1. Open Chrome
2. Go to `chrome://version`
3. Copy the "Profile Path"

### Without Extension (Legacy Mode)

```bash
npm run dev -- \
  --url "https://www.pinterest.com/search/pins/?q=interior%20design" \
  --max 100 \
  --likes 5000 \
  --fetch-details
```

## Options

| Option | Description | Default | Example |
|--------|-------------|---------|---------|
| `--url` | Pinterest search URL | **(required)** | `"https://pinterest.com/search/pins/?q=..."` |
| `--max` | Max number of pins to collect | `2000` | `1000` |
| `--scroll-time` | Max scroll time in seconds | none | `120` (2 minutes) |
| `--likes` | Min saves/likes threshold | `0` | `5000` |
| `--chrome-profile` | Path to your Chrome profile | none | `"/Users/.../Chrome/Profile 1"` |
| `--wait-for-login` | Seconds to wait for manual login | `0` | `10` |
| `--use-extension` | Use extension data | auto with profile | - |
| `--output` | Custom CSV filename | auto-generated | `my_pins.csv` |
| `--fetch-details` | [LEGACY] Visit each pin page | `false` | - |

## Examples

### Get 2000 pins in 2 minutes with all metrics
```bash
npm run dev -- \
  --url "https://www.pinterest.com/search/pins/?q=modern%20architecture" \
  --max 2000 \
  --scroll-time 120 \
  --chrome-profile "/Users/nuraaly/Library/Application Support/Google/Chrome/Profile 1"
```

### Filter for only highly-saved pins (10k+ saves)
```bash
npm run dev -- \
  --url "https://www.pinterest.com/search/pins/?q=street%20style" \
  --max 1000 \
  --likes 10000 \
  --scroll-time 90 \
  --chrome-profile "/Users/nuraaly/Library/Application Support/Google/Chrome/Profile 1"
```

### With login wait time (if not logged into Pinterest)
```bash
npm run dev -- \
  --url "https://www.pinterest.com/search/pins/?q=cozy%20bedroom" \
  --max 500 \
  --scroll-time 60 \
  --chrome-profile "/Users/nuraaly/Library/Application Support/Google/Chrome/Profile 1" \
  --wait-for-login 15
```

## CSV Output

The scraper generates a CSV file with these columns:

| Column | Description | With Extension | Without Extension |
|--------|-------------|----------------|-------------------|
| Pin ID | Unique Pinterest pin ID | ✓ | ✓ |
| Pin Link | Full URL to the pin | ✓ | ✓ |
| Image Link | URL to the pin image | ✓ | ✓ |
| **Saves** | Number of saves | ✓ | ❌ |
| **Reactions** | Number of reactions | ✓ | ❌ |
| **Likes** | Number of likes | ✓ | Limited |
| **Repins** | Number of repins | ✓ | ❌ |
| **Comments** | Number of comments | ✓ | ❌ |
| **Shares** | Number of shares | ✓ | ❌ |
| **Created At** | When pin was created (e.g., "8 months") | ✓ | ❌ |
| Description | Pin title/description | ✓ | Limited |
| Author | Pin creator | ✓ | Limited |

**Filename format:** `pinterest_{query}_{timestamp}.csv`

## How It Works

### Extension Mode (v2.0 - Recommended)
1. Launches your Chrome browser with your profile
2. Opens Pinterest search page (extension automatically loads)
3. Scrolls for X seconds OR until Y pins collected (whichever comes first)
4. Extension adds overlay data to each pin
5. Scraper reads extension data directly from grid
6. Exports comprehensive CSV - **Much faster!**

### Legacy Mode (v1.0 - Slow)
1. Opens Pinterest search in Playwright browser
2. Scrolls and collects pin links
3. Visits EACH pin individually for details
4. Extracts limited data from each page
5. Exports CSV

## Tips

1. **Always use `--chrome-profile` + extension** for best results
2. **Set realistic time limits**: 60-120s is usually enough for 1000-2000 pins
3. **Use OR logic**: `--max 2000 --scroll-time 120` stops at 2000 pins OR 2 minutes
4. **Pinterest is infinite**: The scraper will keep scrolling until time/max limit
5. **Login wait**: Use `--wait-for-login 10` if you need to log in manually
6. **Sort by saves**: CSV is automatically sorted by saves (highest first)

## Troubleshooting

**Extension data not showing?**
- Make sure Pinterest Sort Extension is installed and enabled
- Wait longer after page load (try `--wait-for-login 15`)
- Check that extension overlay appears when you manually visit Pinterest

**Chrome profile not found?**
- Go to `chrome://version` in Chrome
- Copy the exact "Profile Path"
- Make sure to quote the path in the command

**Rate limiting / CAPTCHAs?**
- Reduce `--max` and `--scroll-time`
- Add delays between runs
- Use `--wait-for-login` to solve CAPTCHAs manually

## Version History

- **v2.0**: Pinterest Sort Extension support, time-based scrolling, comprehensive metrics
- **v1.0**: Basic scraping with detail page visits

## Requirements

- Node.js 18+
- Chrome browser (for extension mode)
- [Pinterest Sort Extension](https://chromewebstore.google.com/detail/pinterest-sort-extension/djcledakkebdgjncnemijiabiaimbaic) (recommended)
