# Troubleshooting Guide

## Error: "Could not establish connection. Receiving end does not exist."

This error means the extension popup can't communicate with the Pinterest page. Here's how to fix it:

### Solution 1: Reload Extension + Refresh Page (Most Common Fix)

1. **Reload the Extension:**
   - Go to `chrome://extensions/`
   - Find "Upsell Pinterest Scraper"
   - Click the refresh icon (🔄)

2. **Refresh Pinterest Page:**
   - Go back to your Pinterest tab
   - Press `F5` or `Cmd+R`
   - You should see in console: `🎯 Upsell Pinterest Scraper content script loaded`

3. **Try Again:**
   - Click the extension icon
   - Fill in settings
   - Click "Start Scraping"

### Solution 2: Check You're on the Right Page

The extension only works on Pinterest search pages:

✅ **Correct URL:**
```
https://www.pinterest.com/search/pins/?q=fall+outfits
```

❌ **Wrong URLs:**
```
https://www.pinterest.com/                    (homepage)
https://www.pinterest.com/username/           (profile page)
https://www.pinterest.com/pin/123456/         (single pin)
```

### Solution 3: Check Console for Errors

1. **Open Console:**
   - On Pinterest page, press `F12`
   - Click "Console" tab

2. **Look for:**
   - `🎯 Upsell Pinterest Scraper content script loaded` ✅ Good!
   - Any red error messages ❌ Report these

3. **If you DON'T see the loaded message:**
   - Extension isn't running on this page
   - Try Solution 1 above

### Solution 4: Reinstall Extension

If nothing else works:

1. **Remove Extension:**
   - Go to `chrome://extensions/`
   - Click "Remove" on "Upsell Pinterest Scraper"

2. **Reload:**
   - Click "Load unpacked"
   - Select `/Users/nuraaly/work/pinterest-scraper/extension/`

3. **Test:**
   - Go to Pinterest search page
   - Refresh page
   - Try extension

## Other Common Issues

### Extension Icon Doesn't Appear

**Solution:**
- Click the puzzle piece icon in Chrome toolbar
- Find "Upsell Pinterest Scraper"
- Click the pin icon to keep it visible

### No Pins Being Collected

**Check Console:** Look for messages like:
```
📍 Found 0 unique pin link elements to process
```

**Possible causes:**
1. Pinterest changed their HTML structure
2. Page hasn't fully loaded - wait a few seconds
3. No pins on the page - scroll down manually first

**Solution:**
- Scroll down the Pinterest page manually a few times
- Wait for pins to load
- Try extension again

### CSV Download Not Working

**Solutions:**
1. Check Chrome's download permissions
2. Look in Downloads folder - might have downloaded silently
3. Click "Download CSV" button manually (don't wait for auto-download)

### Scraper Stops at Low Number

**Check your settings:**
- **Min Saves/Likes**: If set to 4000, only pins with 4000+ saves are included
- **Solution**: Lower to 0 or 1000 to get more pins

### Extension Popup Closes Immediately

This is normal Chrome behavior when you click outside the popup.

**To keep it open:**
- Right-click extension icon → "Inspect popup"
- This opens DevTools and keeps popup open

## Still Having Issues?

### Collect Debug Info:

1. **Chrome Version:**
   - Go to `chrome://version/`
   - Copy version number

2. **Console Output:**
   - Press F12 on Pinterest page
   - Copy any error messages (red text)

3. **Extension Errors:**
   - Go to `chrome://extensions/`
   - Check for errors on extension card
   - Copy error text

4. **Pinterest URL:**
   - Copy the full URL you're trying to scrape

### Check Files:

Run this in terminal to verify all files exist:
```bash
cd /Users/nuraaly/work/pinterest-scraper/extension
ls -la
```

Should see:
- manifest.json
- popup.html
- popup.js
- content.js
- styles.css
- icon16.png, icon48.png, icon128.png

## Quick Reset

If extension is completely broken:

```bash
cd /Users/nuraaly/work/pinterest-scraper/extension
# Check for syntax errors
node -c popup.js
node -c content.js
```

If errors appear, the JavaScript files have syntax issues that need fixing.
