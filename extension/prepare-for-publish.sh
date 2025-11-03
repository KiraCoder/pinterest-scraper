#!/bin/bash

# Upsell Pinterest Scraper - Prepare for Publishing
# This script helps you package the extension for distribution

echo "🚀 Preparing Upsell Pinterest Scraper for Publishing"
echo "=================================================="
echo ""

# Check if we're in the right directory
if [ ! -f "manifest.json" ]; then
    echo "❌ Error: manifest.json not found!"
    echo "Please run this script from the extension directory"
    exit 1
fi

# Create output directory
mkdir -p ../releases
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
VERSION=$(grep -o '"version": "[^"]*' manifest.json | grep -o '[^"]*$')
OUTPUT_DIR="../releases/v${VERSION}_${TIMESTAMP}"
mkdir -p "$OUTPUT_DIR"

echo "📦 Packaging Extension v${VERSION}"
echo ""

# Files to include in package
INCLUDE_FILES=(
    "manifest.json"
    "popup.html"
    "popup.js"
    "content.js"
    "styles.css"
    "icon16.png"
    "icon48.png"
    "icon128.png"
)

# Create ZIP for Chrome Web Store
echo "Creating ZIP package..."
zip -q "${OUTPUT_DIR}/upsell-pinterest-scraper-v${VERSION}.zip" "${INCLUDE_FILES[@]}"

if [ $? -eq 0 ]; then
    echo "✅ ZIP created: ${OUTPUT_DIR}/upsell-pinterest-scraper-v${VERSION}.zip"
else
    echo "❌ Failed to create ZIP"
    exit 1
fi

# Create checksums
echo ""
echo "Creating checksums..."
cd "$OUTPUT_DIR"
shasum -a 256 *.zip > checksums.txt
cd - > /dev/null

echo "✅ Checksums created"
echo ""

# Show package info
ZIP_SIZE=$(du -h "${OUTPUT_DIR}/upsell-pinterest-scraper-v${VERSION}.zip" | cut -f1)
echo "📊 Package Information:"
echo "   Version: ${VERSION}"
echo "   Size: ${ZIP_SIZE}"
echo "   Location: ${OUTPUT_DIR}"
echo ""

# Checklist
echo "📋 Pre-Publishing Checklist:"
echo ""
echo "Required for Chrome Web Store:"
echo "  [ ] Developer account created ($5 fee)"
echo "  [ ] Privacy policy hosted online"
echo "  [ ] Screenshots prepared (1280x800 or 640x400)"
echo "  [ ] Small promo tile (440x280)"
echo "  [ ] Extension description written"
echo "  [ ] Icons look professional"
echo "  [ ] Tested on multiple Pinterest searches"
echo ""
echo "Optional but recommended:"
echo "  [ ] Marquee promo tile (1400x560)"
echo "  [ ] Support email set up"
echo "  [ ] README with user instructions"
echo "  [ ] Tested on Windows and Mac"
echo ""

echo "📚 Next Steps:"
echo ""
echo "1. Review PUBLISHING_GUIDE.md for detailed instructions"
echo "2. Go to Chrome Web Store Developer Dashboard:"
echo "   https://chrome.google.com/webstore/devconsole/"
echo "3. Click 'New Item'"
echo "4. Upload: ${OUTPUT_DIR}/upsell-pinterest-scraper-v${VERSION}.zip"
echo "5. Fill in store listing details"
echo "6. Submit for review"
echo ""

echo "✨ Package ready for publishing!"
echo ""

# Open releases folder
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "Opening releases folder..."
    open "$OUTPUT_DIR"
fi
