# Upsell Pinterest Scraper

> Extract Pinterest pin data with saves, likes, engagement metrics, and more. Export to CSV for easy analysis.

![Version](https://img.shields.io/badge/version-1.0.0-purple)
![Chrome](https://img.shields.io/badge/Chrome-Extension-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

- 📊 **Rich Data Extraction** - Saves, reactions, likes, repins, comments, shares, dates
- ⚡ **Fast & Flexible** - Configurable limits, filters, and scroll speeds
- 💾 **CSV Export** - Download organized data for Excel, Google Sheets, etc.
- 🎯 **Smart Filtering** - Filter by minimum saves/likes threshold
- 🎨 **Modern UI** - Beautiful, intuitive interface with real-time progress
- 🔒 **Privacy First** - All processing happens in your browser, no external servers

## 🚀 Installation

### From Chrome Web Store (Recommended)
1. Visit the [Chrome Web Store page](#) (coming soon)
2. Click "Add to Chrome"
3. Done! Extension is ready to use

### Manual Installation (Developer Mode)
1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the extension folder
6. Extension appears in your toolbar

## 📖 How to Use

### Quick Start

1. **Navigate to Pinterest search**
   ```
   https://www.pinterest.com/search/pins/?q=your-search-term
   ```

2. **Click the extension icon** in your Chrome toolbar

3. **Configure settings:**
   - **Maximum Pins:** How many pins to collect (e.g., 100)
   - **Minimum Saves/Likes:** Filter threshold (e.g., 1000)
   - **Scroll Delay:** Milliseconds between scrolls (default: 1500)
   - **Max Time:** Optional time limit in seconds (0 = unlimited)

4. **Click "Start Scraping"** and watch the progress

5. **Click "Download CSV"** when complete

### Example Use Cases

**Finding Trending Content:**
```
Max Pins: 200
Min Saves: 5000
Scroll Delay: 1500ms
Max Time: 0
```

**Quick Data Sample:**
```
Max Pins: 50
Min Saves: 0
Scroll Delay: 1000ms
Max Time: 60s
```

**High-Quality Research:**
```
Max Pins: 500
Min Saves: 10000
Scroll Delay: 2000ms
Max Time: 0
```

## 📊 CSV Output

The extension generates a CSV file with these columns:

| Column | Description |
|--------|-------------|
| Pin ID | Unique Pinterest pin identifier |
| Pin Link | Full URL to the pin |
| Image Link | Direct link to pin image |
| Saves | Number of saves |
| Reactions | Number of reactions |
| Likes | Number of likes |
| Repins | Number of repins |
| Comments | Number of comments |
| Shares | Number of shares |
| Created At | When pin was created |
| Description | Pin description/title |
| Author | Pin creator |

**Filename format:**
```
fall_outfits_max100_2025-11-03_14-30-45.csv
```
- Search query + max pins/time + date + time

## 🎯 Perfect For

- 📈 **Pinterest Marketers** - Analyze trending pins and engagement
- ✍️ **Content Creators** - Research popular content ideas
- 🛍️ **E-commerce Sellers** - Find winning products and designs
- 📱 **Social Media Managers** - Track performance metrics
- 🔍 **Market Researchers** - Gather data for analysis

## ⚙️ Settings Explained

### Maximum Pins
The scraper will stop when it collects this many pins (or reaches time limit).

### Minimum Saves/Likes
Only pins with at least this many saves will be included in the CSV. Set to 0 to include all pins.

### Scroll Delay
How long (in milliseconds) to wait between scrolls. Lower = faster, but may miss pins. Higher = slower, but more thorough.

**Recommended:**
- Fast: 1000ms
- Normal: 1500ms
- Careful: 2000ms

### Max Time
Optional time limit in seconds. Scraper stops when reaching this time OR max pins, whichever comes first. Set to 0 for no limit.

## 🔧 Troubleshooting

### Extension doesn't start
- Make sure you're on a Pinterest search page (`pinterest.com/search/pins/?q=...`)
- Refresh the Pinterest page
- Reload the extension in `chrome://extensions/`

### Only collecting a few pins
- Check your "Minimum Saves/Likes" setting - lower it to get more results
- Increase "Maximum Pins" setting
- Pinterest might have limited results for your search query

### CSV not downloading
- Check Chrome's download settings/permissions
- Look in your Downloads folder - it may have downloaded silently
- Click "Download CSV" button manually

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for more help.

## 🔒 Privacy & Security

- ✅ All data processing happens **locally in your browser**
- ✅ **No data is sent to external servers**
- ✅ Extension only reads **public Pinterest data**
- ✅ **No login credentials** are collected or stored
- ✅ **No tracking or analytics**

See our [Privacy Policy](#) for full details.

## 📝 Changelog

### Version 1.0.0 (November 2025)
- Initial release
- Basic pin scraping with configurable limits
- CSV export with comprehensive metrics
- Modern UI with real-time progress tracking
- Smart filename generation with search query

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use and modify as needed.

## 💬 Support

Having issues? Found a bug? Have a feature request?

- Open an [Issue on GitHub](#)
- Email: support@example.com
- Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

## 🌟 Show Your Support

If you find this extension useful, please:
- ⭐ Star this repository
- 📝 Leave a review on Chrome Web Store
- 🐦 Share on social media

## 👨‍💻 Author

Created with ❤️ by [Your Name]

---

**Note:** This extension is not affiliated with, endorsed by, or sponsored by Pinterest, Inc.
