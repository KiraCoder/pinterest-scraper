# Quick Start Guide

## Basic Usage

### Step 1: Find a Pinterest Search URL

1. Go to https://pinterest.com
2. Search for something (e.g., "minimalist interior")
3. Click on "Pins" tab
4. Copy the URL from your browser (it looks like: `https://www.pinterest.com/search/pins/?q=minimalist%20interior`)

### Step 2: Run the Scraper

**Get most-liked pins with full data:**
```bash
npm run dev -- \
  --url "https://www.pinterest.com/search/pins/?q=YOUR_SEARCH" \
  --max 50 \
  --likes 5000 \
  --fetch-details
```

Replace `YOUR_SEARCH` with your search query from Step 1.

### Step 3: Find Your CSV File

The CSV file will be saved in the current directory with a name like:
`pinterest_YOUR_SEARCH_2025-11-02T19-04-15.csv`

Open it in Excel, Google Sheets, or any CSV viewer!

## Common Commands

### Get top 100 pins with 10k+ likes
```bash
npm run dev -- --url "https://www.pinterest.com/search/pins/?q=modern%20architecture" --max 100 --likes 10000 --fetch-details
```

### Get 50 pins with any number of likes
```bash
npm run dev -- --url "https://www.pinterest.com/search/pins/?q=street%20style" --max 50 --fetch-details
```

### Watch the scraper work (visible browser)
```bash
npm run dev -- --url "https://www.pinterest.com/search/pins/?q=cozy%20bedroom" --max 20 --fetch-details --headless false
```

### Save to specific filename
```bash
npm run dev -- --url "https://www.pinterest.com/search/pins/?q=vintage%20fashion" --max 100 --likes 5000 --fetch-details --output vintage_fashion.csv
```

## What You Get

A CSV file with:
- Pin URLs
- Image URLs
- **Likes counts** (e.g., 8200, 7500, 6900)
- **Descriptions**
- **Authors**

Sorted by likes (highest first)!

## Tips

- Start small (`--max 20`) to test first
- Use `--fetch-details` for accurate likes data
- Higher `--likes` threshold = fewer but more popular pins
- The scraper adds random delays to avoid detection
