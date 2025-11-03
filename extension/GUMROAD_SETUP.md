# Gumroad Setup Guide

## 🎯 Complete Setup for Token-Based Pinterest Scraper

Follow these steps to enable license key generation in Gumroad and start selling your extension!

---

## Step 1: Enable License Keys in Gumroad

### Option A: Using Gumroad's License Key Feature

1. **Go to your product:**
   - https://app.gumroad.com/products
   - Click "Edit" on "Pinterest Scraper"

2. **Find License Key Settings:**

   Look for one of these locations (Gumroad interface varies):

   **Location 1: Under "Content" tab:**
   - Scroll down to "License Key" section
   - Toggle "Generate unique license keys" to ON

   **Location 2: Under "Customization" tab:**
   - Look for "License Keys" section
   - Enable "Send a unique license key to each customer"

   **Location 3: In "Delivery" settings:**
   - Find "License management" option
   - Enable license key generation

3. **Configure License Key Format (Optional):**
   - Gumroad auto-generates format like: `XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`
   - You can customize prefix if available
   - Default format works perfectly!

4. **Save Changes**

---

## Step 2: Customize Email Template

1. **Go to Email Settings:**
   - In your product edit page
   - Find "Email" or "Receipt" section

2. **Add License Key to Email:**

   Make sure the customer email includes:
   ```
   Your Pinterest Scraper License Key:
   {license_key}

   To activate:
   1. Install the Chrome extension
   2. Click the extension icon
   3. Enter your license key
   4. Start scraping!
   ```

3. **Test the variable:**
   - The `{license_key}` variable should auto-populate
   - If not available, check Gumroad docs for current variable name

---

## Step 3: Test Your Setup

### Make a Test Purchase

1. **Set product price to $0.01** (temporarily)
2. **Buy your own product** using a different email
3. **Check the email** you receive
4. **Look for the license key** in the email

**Expected email should have:**
- Order confirmation
- **License Key:** `ABC123-DEF456-GHI789` (example format)
- Download links (if any)

### Test the Extension

1. **Install extension** in Chrome
2. **Click extension icon**
3. **You should see:** License activation screen
4. **Enter test license key**
5. **Should validate** and unlock the scraper

If it works → **Change price back to $10** and you're ready to sell!

---

## Step 4: Publish Your Product

1. **Set final price:** $10
2. **Add product description:**
   ```
   Unlock the Upsell Pinterest Scraper

   Extract Pinterest pin data with full metrics:
   - Saves, Reactions, Likes, Repins, Comments, Shares
   - Export to CSV for analysis
   - Unlimited usage
   - Lifetime license (no subscription)

   After purchase, you'll receive a unique license key via email.
   Simply install the Chrome extension and enter your key to activate.
   ```

3. **Add cover image** (optional but recommended)
4. **Set it to "Published"**
5. **Copy your product link:** https://nursmain.gumroad.com/l/pinterest-scraper

---

## Step 5: Update Extension (IMPORTANT!)

The extension is already configured with your Gumroad permalink:
- Product: `pinterest-scraper`
- Store: `nursmain.gumroad.com`

**If you change the product permalink**, you need to update:

File: `extension/license.js`
Line 7:
```javascript
const PRODUCT_PERMALINK = 'pinterest-scraper'; // Change this if needed
```

---

## Troubleshooting

### License Keys Not Generating

**If you can't find the license key toggle:**

1. **Contact Gumroad Support:**
   - Go to: https://help.gumroad.com
   - Ask: "How do I enable license key generation for my product?"

2. **Alternative: Use Gumroad API manually**
   - Get your API key: gumroad.com/settings/advanced
   - Use Gumroad's API to generate keys
   - (More complex, only if automatic doesn't work)

### License Validation Failing

**Check these:**

1. **Product permalink matches:**
   - Gumroad: `pinterest-scraper`
   - Extension code: `pinterest-scraper` (should match)

2. **License key format:**
   - Should be alphanumeric with dashes
   - Example: `ABC123-DEF456-GHI789`

3. **Test with a real purchase:**
   - Make sure to test end-to-end

### Customer Can't Activate

**Most common issues:**

1. **Typo in license key:**
   - Tell customers to copy-paste, not type

2. **Spaces before/after:**
   - Extension auto-trims, but remind customers

3. **Refunded purchase:**
   - Refunded licenses won't validate
   - This is intentional security

---

## Marketing Your Extension

### Share Your Product Link

Your Gumroad product page:
```
https://nursmain.gumroad.com/l/pinterest-scraper
```

**Where to promote:**
- Twitter/X
- Reddit (r/pinterest, r/marketing)
- Facebook groups
- LinkedIn
- Your website/blog
- Email list

### Create a Landing Page

See `LANDING_PAGE.html` (I'll create this next!)

---

## Gumroad Dashboard

### Track Your Sales

Go to: https://app.gumroad.com/sales

You'll see:
- Number of sales
- Revenue (minus 10% Gumroad fee)
- License keys generated
- Customer emails

### Manage Licenses

You can:
- View all issued licenses
- Disable specific licenses (for refunds/abuse)
- See usage analytics

---

## Customer Support

### Common Customer Questions

**Q: I lost my license key**
A: Forward their purchase receipt email (Gumroad sends it automatically)

**Q: Can I use on multiple computers?**
A: Yes! License works on any Chrome browser when they log in

**Q: Can I get a refund?**
A: Set your refund policy in Gumroad settings

### Support Email Template

Create an email for support:

```
Hi [Name],

Thanks for purchasing Pinterest Scraper!

Your license key is in the email you received from Gumroad.

To activate:
1. Install the extension from [Chrome Web Store link]
2. Click the extension icon
3. Enter your license key
4. Start scraping!

Need help? Reply to this email.

Best,
[Your Name]
```

---

## Pricing Strategy

### Current: $10 One-Time

**Consider testing:**

**Option 1: Tiered Pricing**
- Basic: $10 - 1000 pins/month
- Pro: $25 - Unlimited
- Lifetime: $99 - Forever

**Option 2: Pay What You Want**
- Minimum: $5
- Suggested: $10
- Let customers pay more

**Option 3: Bundles**
- Extension + Tutorial Video: $15
- Extension + Support: $20

---

## Next Steps

1. ✅ Enable license keys in Gumroad
2. ✅ Test with $0.01 purchase
3. ✅ Set price to $10
4. ✅ Publish product
5. ✅ Share link and start selling!

---

## Revenue Projections

**Conservative (5 sales/week):**
- 20 sales/month × $10 = $200
- Gumroad fee (10%): -$20
- **Net: $180/month = $2,160/year**

**Moderate (3 sales/day):**
- 90 sales/month × $10 = $900
- Gumroad fee: -$90
- **Net: $810/month = $9,720/year**

**Optimistic (10 sales/day):**
- 300 sales/month × $10 = $3,000
- Gumroad fee: -$300
- **Net: $2,700/month = $32,400/year**

---

## Questions?

Check:
- Gumroad Help: https://help.gumroad.com
- This guide's troubleshooting section above
- Extension TROUBLESHOOTING.md file

Ready to make money! 🚀💰
