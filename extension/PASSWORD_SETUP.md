# 🔒 Password Setup Guide

## Your Extension is Now Password Protected!

The extension has been set up with a simple password system for your personal use.

---

## 🔑 Default Password

**Current password:** `MySecretPass123`

**⚠️ IMPORTANT: Change this password immediately!**

---

## ✏️ How to Change Your Password

### Step 1: Open the File

Open this file in a text editor:
```
/Users/nuraaly/work/pinterest-scraper/extension/license.js
```

### Step 2: Find Line 9

You'll see:
```javascript
// 🔒 YOUR PERSONAL PASSWORD - CHANGE THIS TO YOUR OWN PASSWORD
const CORRECT_PASSWORD = 'MySecretPass123';
```

### Step 3: Change the Password

Replace `MySecretPass123` with your own password:

**Examples:**
```javascript
const CORRECT_PASSWORD = 'SuperSecret2025!';
const CORRECT_PASSWORD = 'PinterestRocks@456';
const CORRECT_PASSWORD = 'MyPassword123';
```

**Tips for a good password:**
- Use a mix of letters, numbers, and symbols
- At least 8 characters
- Something you'll remember
- Don't share with others

### Step 4: Save the File

Save `license.js` after changing the password.

### Step 5: Reload Extension

1. Go to `chrome://extensions/`
2. Find "Upsell Pinterest Scraper"
3. Click the reload icon (🔄)

### Step 6: Test It

1. Click the extension icon
2. Enter your NEW password
3. Should unlock ✅

---

## 🧪 Testing

**Test the password:**
1. Open extension
2. Enter your password
3. Click "Unlock Extension"
4. Should redirect to scraper interface

**If wrong password:**
- You'll see: "❌ Incorrect password. Please try again."

**If correct password:**
- You'll see: "✓ Access granted! Redirecting..."
- Then opens the scraper

---

## 🔄 Reset Password

**If you forget your password:**

1. Open `license.js`
2. Change line 9 to a new password
3. Save file
4. Reload extension
5. Use new password

**To clear stored authentication:**
1. Right-click extension icon → "Manage Extension"
2. Scroll to "Site Settings" or "Storage"
3. Click "Clear storage"
4. OR use this in console:
```javascript
chrome.storage.local.clear()
```

---

## 🚀 How It Works

1. **First time:** Extension opens → Shows password screen
2. **Enter password:** Checks against `CORRECT_PASSWORD` in code
3. **If correct:** Stores authentication in Chrome storage
4. **Next time:** Extension remembers you're authenticated
5. **Shows scraper directly** (no password needed again)

**Password is stored locally** in your browser. One-time entry per browser.

---

## 🔒 Security Notes

**This is a simple password system for personal use:**

✅ **Good for:**
- Keeping extension private on your computer
- Preventing accidental use by others
- Personal projects

⚠️ **NOT recommended for:**
- Selling to others (password is visible in code)
- High security needs (can be bypassed if someone has file access)
- Production apps with multiple users

**For commercial use:** Use the Gumroad monetization system instead (see `MONETIZATION_PLAN.md`)

---

## 📋 Quick Reference

| What | Where | Line |
|------|-------|------|
| Change password | `license.js` | Line 9 |
| Test password | Open extension | Click icon |
| Reset auth | Chrome storage | Clear local storage |

---

## 🎯 You're All Set!

Your extension is now:
- ✅ Password protected
- ✅ Personal use only
- ✅ Easy to change password
- ✅ Ready to use

**Current password:** `MySecretPass123` (remember to change it!)

**To use extension:**
1. Reload extension in Chrome
2. Click extension icon
3. Enter password: `MySecretPass123`
4. Start scraping!

Enjoy! 🚀
