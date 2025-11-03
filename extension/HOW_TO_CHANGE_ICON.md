# How to Change the Extension Icon

You can customize the Upsell Pinterest Scraper icon to your preference!

## Option 1: Quick Replace (Easiest)

1. **Find or create your icon images** in 3 sizes:
   - 16x16 pixels
   - 48x48 pixels
   - 128x128 pixels

2. **Name them:**
   - `icon16.png`
   - `icon48.png`
   - `icon128.png`

3. **Replace the files** in:
   ```
   /Users/nuraaly/work/pinterest-scraper/extension/
   ```

4. **Reload the extension:**
   - Go to `chrome://extensions/`
   - Find "Upsell Pinterest Scraper"
   - Click the refresh icon (🔄)

5. **Done!** Your new icon appears

## Option 2: Use Canva (Recommended for Custom Design)

1. **Go to** [Canva.com](https://canva.com)

2. **Create a custom size:** 128 x 128 pixels

3. **Design your icon:**
   - Add text, shapes, colors
   - Keep it simple and recognizable
   - Use high contrast for visibility

4. **Download as PNG**

5. **Resize for other sizes:**
   - Use [ResizeImage.net](https://resizeimage.net) or similar
   - Create 16x16 and 48x48 versions

6. **Replace files** as described in Option 1

## Option 3: Use AI Image Generators

1. **Go to:**
   - [DALL-E](https://openai.com/dall-e)
   - [Midjourney](https://midjourney.com)
   - Or any AI image generator

2. **Prompt example:**
   ```
   "Simple flat icon for a Pinterest scraper Chrome extension,
   purple gradient background, white letter P in center,
   modern minimal design, 128x128 pixels"
   ```

3. **Download and resize** as needed

4. **Replace files** in the extension folder

## Option 4: Use Online Icon Generator

### Method A: Favicon.io
1. Go to [Favicon.io](https://favicon.io/favicon-generator/)
2. Generate icons with text or emojis
3. Download the package
4. Rename files to match our naming
5. Replace in extension folder

### Method B: RealFaviconGenerator
1. Go to [RealFaviconGenerator.net](https://realfavicongenerator.net/)
2. Upload your design
3. Generate all sizes
4. Download and rename
5. Replace in extension folder

## Quick Icon Ideas

### Text-based:
- Letter "U" (for Upsell)
- Letter "P" (for Pinterest)
- "PS" (for Pinterest Scraper)

### Symbol-based:
- Pin icon 📌
- Download arrow ⬇️
- Chart/graph 📊
- Search icon 🔍

### Colors:
- Purple gradient (current: #667eea to #764ba2)
- Pinterest red (#E60023)
- Custom brand colors

## Create Icon with Code (Advanced)

If you want to programmatically create icons:

```html
<!DOCTYPE html>
<html>
<body>
  <canvas id="canvas" width="128" height="128"></canvas>
  <script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Gradient background
    const gradient = ctx.createLinearGradient(0, 0, 128, 128);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);

    // Add your design here
    ctx.fillStyle = 'white';
    ctx.font = 'bold 72px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('U', 64, 64);

    // Download
    const link = document.createElement('a');
    link.download = 'icon128.png';
    link.href = canvas.toDataURL();
    link.click();
  </script>
</body>
</html>
```

Save this as `create-icon.html`, open in browser, and it will download your custom icon!

## Tips

- **Keep it simple** - Small icons need to be clear
- **High contrast** - Make sure it's visible on light and dark backgrounds
- **Test it** - Check how it looks in the Chrome toolbar
- **Square format** - Icons should be square (equal width and height)
- **PNG format** - Use PNG with transparency for best results

## After Changing Icons

1. **Reload extension** in Chrome
2. **Check toolbar** - Icon should update immediately
3. **Check extensions page** - Verify all sizes look good
4. **If stuck** - Try restarting Chrome completely
