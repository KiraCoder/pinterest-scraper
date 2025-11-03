# 🔑 How to Enable License Key Generation in Gumroad

## Problem
You made a test purchase but received NO license key in the email. This means license key generation is disabled in your Gumroad product settings.

---

## Solution: Enable License Keys in Gumroad

### Step 1: Go to Your Product
1. Open: https://app.gumroad.com/products
2. Find: **Pinterest Scraper** product
3. Click: **Edit Product**

### Step 2: Navigate to Workflow Tab
Look for tabs at the top:
- Content
- **Workflow** ← Click this one
- Pricing
- Settings

### Step 3: Find License Keys Section
Scroll down in the Workflow tab until you find:

**"License Keys"** section

You should see a toggle or checkbox that says:
- ✅ **"Generate unique license keys for each purchase"**

### Step 4: Enable License Keys
1. Click the toggle to **enable** license key generation
2. Gumroad will show: "License keys will be automatically generated for new purchases"
3. Click **Save** or **Update** button at the bottom

---

## Alternative Locations (if not in Workflow tab)

If you don't see it in Workflow, check:

### Option A: Content Tab
- Go to **Content** tab
- Look for "License Keys" or "Generate License Keys"
- Enable the toggle

### Option B: Advanced Settings
- Go to **Settings** tab
- Scroll to "Advanced" section
- Look for "License Keys" option
- Enable it

---

## What It Should Look Like

When enabled, you should see:

```
✅ License Keys
   Generate unique license keys for each purchase

   Format: XXXXXX-XXXXXX-XXXXXX-XXXXXX

   License keys will be sent in the purchase email automatically.
```

---

## After Enabling

### Test Again:
1. **Lower product price to $0.01** (for testing)
2. **Make a new test purchase** with different email
3. **Check the email** - you should now see:

```
Your License Key: ABC123-DEF456-GHI789-JKL012

Enter this key when activating the Pinterest Scraper extension.
```

4. **Test in extension:**
   - Clear extension storage (see below)
   - Open extension
   - Enter the license key from email
   - Click "Activate"
   - Should unlock! ✅

5. **Change price back to $10** after testing succeeds

---

## How to Clear Extension Storage (for testing)

### Method 1: Chrome Storage
1. Right-click extension icon
2. Inspect Popup
3. Go to Console tab
4. Run:
```javascript
chrome.storage.local.clear()
```
5. Reload extension

### Method 2: Extension Page
1. Go to `chrome://extensions/`
2. Find "Upsell Pinterest Scraper"
3. Click **Remove** button
4. Reload the extension folder

---

## Email Template (Optional)

While you're in Gumroad settings, you can customize the purchase email to highlight the license key:

### Go to: Workflow → Email Content

**Suggested template:**
```
🎉 Thank you for purchasing Pinterest Scraper!

Your License Key:
{license_key}

📥 How to Activate:
1. Install the Pinterest Scraper extension from Chrome Web Store
2. Click the extension icon
3. Enter your license key above
4. Click "Activate"

You now have lifetime access! No subscription, no recurring fees.

Need help? Reply to this email.
```

**Important:** Make sure `{license_key}` variable is included in the email template!

---

## Troubleshooting

### Still No License Key After Enabling?

1. **Make sure you saved the product settings**
   - Look for green "Saved" confirmation

2. **Try a NEW purchase**
   - Old purchases won't generate keys retroactively
   - Use different email for test purchase

3. **Check Gumroad email templates**
   - Make sure `{license_key}` placeholder is in the email
   - Go to: Workflow → Email Content

4. **Contact Gumroad Support**
   - If toggle is missing or not working
   - They can enable it for your product

---

## Verification Checklist

Before going live:

- [ ] License key generation enabled in Gumroad
- [ ] Test purchase shows license key in email
- [ ] License key validates in extension (unlocks successfully)
- [ ] Master password still works: `MySecretPass123`
- [ ] Product price set to $10
- [ ] Email template includes `{license_key}` variable

---

## Current Product Info

**Product ID:** `oAK4W6eMlMOEUs6ItQBa4w==`
**Product URL:** https://nursmain.gumroad.com/l/pinterest-scraper
**Price:** $10 (use $0.01 for testing)

---

## What Happens When Customer Buys

### With License Keys Enabled:
1. Customer pays $10 on Gumroad
2. Gumroad generates unique license key (e.g., `ABC123-DEF456-GHI789-JKL012`)
3. Gumroad sends email with license key
4. Customer installs extension
5. Customer enters license key
6. Extension validates with Gumroad API
7. Extension unlocks! ✅

### Without License Keys (Current Problem):
1. Customer pays $10 ❌
2. No license key generated ❌
3. Email has no activation code ❌
4. Customer can't activate extension ❌
5. Customer requests refund ❌

**This is why enabling license keys is critical!**

---

## Next Steps

1. **Go to Gumroad now** → Enable license keys
2. **Test with $0.01 purchase** → Verify key appears in email
3. **Test key in extension** → Make sure it unlocks
4. **Change price to $10** → Ready to sell!
5. **Publish to Chrome Web Store** → See PUBLISHING_GUIDE.md

---

## Screenshot Locations (if you get stuck)

If you can't find the license key toggle, take screenshots of:
1. Your product edit page
2. All available tabs (Content, Workflow, Pricing, Settings)
3. Send to Gumroad support or share with developer

The toggle MUST be there - every Gumroad product has this option.

---

**Once license keys are enabled, your dual authentication system will work perfectly!**

Master Password: Instant unlock for you ✅
License Keys: Secure unlock for customers ✅
