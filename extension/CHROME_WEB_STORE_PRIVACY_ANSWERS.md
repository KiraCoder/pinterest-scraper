# 📝 Chrome Web Store Privacy Practices - Copy-Paste Answers

## Quick Checklist

Before publishing, you need to:

- [ ] Fill out all permission justifications (below)
- [ ] Write single purpose description (below)
- [ ] Certify data usage compliance (checkbox)
- [ ] Add contact email on Account tab
- [ ] Verify contact email (check your inbox)

---

## 1. Single Purpose Description

**Field:** "Single purpose description"

**Copy this:**
```
This extension scrapes Pinterest pin data from search results and exports the data to CSV format. It collects pin metrics (saves, likes, comments, shares) to help users analyze Pinterest trends and engagement.
```

---

## 2. Permission Justifications

### activeTab Permission

**Field:** "Justification for activeTab"

**Copy this:**
```
Required to interact with the active Pinterest tab to extract pin data from the currently viewed search results page. The extension only reads publicly visible pin information when the user clicks "Start Scraping."
```

---

### downloads Permission

**Field:** "Justification for downloads"

**Copy this:**
```
Required to download the scraped Pinterest data as a CSV file to the user's computer. The extension generates CSV files containing pin metrics that the user can save locally for analysis.
```

---

### host Permission (https://www.pinterest.com/*)

**Field:** "Justification for host permission use"

**Copy this:**
```
Required to access Pinterest.com pages to read publicly available pin data. The extension only works on pinterest.com/search/pins/ pages and extracts visible pin information (titles, images, engagement metrics) that is already publicly displayed on the page.
```

---

### remote code Permission

**Field:** "Justification for remote code use"

**Copy this:**
```
This extension does NOT use remote code. All code is bundled within the extension package. No external scripts are loaded or executed.
```

**Alternative if they won't accept "does not use":**
```
Not applicable - this extension does not fetch or execute any remote code. All JavaScript is included in the extension package and runs locally.
```

---

### scripting Permission

**Field:** "Justification for scripting"

**Copy this:**
```
Required to inject a content script into Pinterest pages to extract pin data from the DOM. The content script reads publicly visible pin elements (images, titles, metrics) when the user initiates scraping.
```

---

### storage Permission

**Field:** "Justification for storage"

**Copy this:**
```
Required to store license key validation status locally in the browser. The extension saves whether the user has successfully activated the extension with a valid license key, so they don't need to re-enter it on every use.
```

---

### tabs Permission

**Field:** "Justification for tabs"

**Copy this:**
```
Required to check if the active tab is a Pinterest search page before allowing scraping. The extension verifies the URL matches pinterest.com/search/pins/ to ensure the scraper only runs on appropriate pages.
```

---

## 3. Data Usage Certification

**Field:** Checkbox to certify compliance with Developer Program Policies

**Action:** ✅ Check the box that says:
```
"I certify that my data usage complies with the Chrome Web Store Developer Program Policies"
```

---

## 4. Contact Email

### Step 1: Add Contact Email

1. Go to **Account tab** in Chrome Web Store Developer Dashboard
2. Find "Contact email" field
3. Enter your email (use the same email as your Google account, or a business email)
4. Click **Save**

### Step 2: Verify Email

1. Check your email inbox for verification email from Chrome Web Store
2. Click the verification link
3. Return to Chrome Web Store dashboard
4. You should now see "Email verified ✓"

---

## 5. Privacy Policy (Optional but Recommended)

Chrome Web Store may ask for a privacy policy. Here's a simple one:

**Copy this and create a page on your website:**

```markdown
# Privacy Policy - Upsell Pinterest Scraper

Last updated: [Today's Date]

## What We Collect

This extension does NOT collect, store, or transmit any personal data to external servers.

## Local Data Storage

The extension stores:
- License key validation status (stored locally in your browser)
- User preferences for scraping settings (max pins, scroll delay, etc.)

This data never leaves your device.

## Third-Party Services

The extension:
- Validates license keys with Gumroad API (one-time per activation)
- Accesses publicly available Pinterest pages (only when you click "Start Scraping")

## Data We Do NOT Collect

- Your browsing history
- Personal information
- Pinterest account credentials
- Scraped pin data (stays on your device as CSV files)

## Contact

For questions: [Your Email]
```

**Then add the privacy policy URL to your Chrome Web Store listing.**

---

## 6. Additional Store Listing Fields

### Short Description (132 chars max)

```
Extract Pinterest pin data with engagement metrics. Export saves, likes, comments, and shares to CSV for trend analysis.
```

### Detailed Description

```
Upsell Pinterest Scraper helps marketers, researchers, and creators analyze Pinterest trends by extracting pin data from search results.

✨ FEATURES:
• Extract unlimited pins from any Pinterest search
• Get full engagement metrics: saves, likes, repins, comments, shares
• Export data to CSV with smart file naming
• Filter by minimum engagement threshold
• Adjustable scroll delay for reliable scraping
• Real-time progress tracking

📊 PERFECT FOR:
• Marketing research and competitor analysis
• Trend discovery and content planning
• Pinterest growth strategies
• Academic research
• Data-driven content creation

🔒 PRIVACY:
• All data stays on your device
• No tracking or data collection
• Secure license key activation

💰 ONE-TIME PAYMENT:
• $10 lifetime license
• No subscription
• Unlimited use

📥 HOW TO USE:
1. Navigate to pinterest.com/search/pins/?q=your-query
2. Click the extension icon
3. Set your preferences (max pins, filters)
4. Click "Start Scraping"
5. Download CSV when complete

🎯 REQUIREMENTS:
• Valid license key (provided after purchase)
• Works only on Pinterest search pages

Get actionable Pinterest data in minutes!
```

### Category

Choose: **Productivity**

### Language

Choose: **English**

---

## 7. Screenshots Required

You need **1-5 screenshots** (1280x800 or 640x400 pixels)

### Screenshot Ideas:

1. **Main scraper interface** - showing the form with max pins, filters, etc.
2. **Progress tracking** - showing scraping in progress with stats
3. **CSV preview** - showing Excel/Google Sheets with exported data
4. **License activation** - showing the activation screen
5. **Pinterest integration** - showing the extension working on Pinterest

**Tool to create screenshots:**
- Use Chrome's built-in screenshot (Ctrl+Shift+I → Device Mode → Capture Screenshot)
- Or use https://www.figma.com/ to create professional mockups
- Or use Snagit, Greenshot, or any screenshot tool

---

## 8. Promotional Images (Optional)

### Small Promo Tile (440x280)
- Shows extension icon + name
- Eye-catching design
- Use Canva or Figma

### Large Promo Tile (920x680)
- Feature highlight
- "Extract Pinterest Data"
- Screenshots of UI

### Marquee Promo Tile (1400x560)
- Big banner image
- "Pinterest Scraper - $10 One-Time Payment"
- Benefit bullets

---

## 9. Final Checklist Before Submitting

- [ ] All permission justifications filled out (7 total)
- [ ] Single purpose description written
- [ ] Data usage compliance checkbox checked
- [ ] Contact email added on Account tab
- [ ] Contact email verified (check inbox)
- [ ] Short description (132 chars max)
- [ ] Detailed description written
- [ ] Category selected (Productivity)
- [ ] At least 1 screenshot uploaded (1280x800)
- [ ] Icon files present (128x128, 48x48, 16x16)
- [ ] Privacy policy URL added (optional but recommended)
- [ ] Extension tested and working

---

## 10. After Submission

### Review Timeline:
- Typically **1-7 days**
- Can be faster (same day) or slower (2 weeks)

### Possible Outcomes:

**✅ Approved:**
- Your extension is live!
- Share the Chrome Web Store URL
- Start promoting on Gumroad

**❌ Rejected:**
- You'll get an email with rejection reasons
- Fix the issues mentioned
- Resubmit (no penalty)

### Common Rejection Reasons:
- Privacy policy missing or insufficient
- Permission justifications unclear
- Screenshots not showing functionality
- Single purpose not clear enough
- Icon too similar to Google/Chrome branding

---

## 11. Pro Tips

✅ **Be Specific:** Don't say "for functionality" - explain exactly what each permission does

✅ **Be Honest:** If you don't use remote code, say so clearly

✅ **Use Screenshots:** Show real usage, not placeholder images

✅ **Privacy First:** Emphasize that data stays on user's device

✅ **Clear Purpose:** "Scrapes Pinterest pins and exports to CSV" - simple and clear

❌ **Don't:**
- Copy-paste generic justifications from other extensions
- Lie about permissions
- Use misleading screenshots
- Skip the privacy policy (even if optional)

---

## Copy-Paste Template for All Justifications

Save time - here's everything in one block you can reference:

```
SINGLE PURPOSE:
This extension scrapes Pinterest pin data from search results and exports the data to CSV format. It collects pin metrics (saves, likes, comments, shares) to help users analyze Pinterest trends and engagement.

ACTIVETAB:
Required to interact with the active Pinterest tab to extract pin data from the currently viewed search results page. The extension only reads publicly visible pin information when the user clicks "Start Scraping."

DOWNLOADS:
Required to download the scraped Pinterest data as a CSV file to the user's computer. The extension generates CSV files containing pin metrics that the user can save locally for analysis.

HOST PERMISSIONS:
Required to access Pinterest.com pages to read publicly available pin data. The extension only works on pinterest.com/search/pins/ pages and extracts visible pin information (titles, images, engagement metrics) that is already publicly displayed on the page.

REMOTE CODE:
This extension does NOT use remote code. All code is bundled within the extension package. No external scripts are loaded or executed.

SCRIPTING:
Required to inject a content script into Pinterest pages to extract pin data from the DOM. The content script reads publicly visible pin elements (images, titles, metrics) when the user initiates scraping.

STORAGE:
Required to store license key validation status locally in the browser. The extension saves whether the user has successfully activated the extension with a valid license key, so they don't need to re-enter it on every use.

TABS:
Required to check if the active tab is a Pinterest search page before allowing scraping. The extension verifies the URL matches pinterest.com/search/pins/ to ensure the scraper only runs on appropriate pages.
```

---

## Need Help?

If Chrome Web Store rejects your submission, share the rejection email and I'll help you fix the issues!

Good luck with your launch! 🚀
