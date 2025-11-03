// Dual Authentication: Master Password OR Gumroad License Key
const licenseInput = document.getElementById('licenseInput');
const validateBtn = document.getElementById('validateBtn');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const loading = document.getElementById('loading');

// 🔒 YOUR MASTER PASSWORD - CHANGE THIS TO YOUR OWN PASSWORD
const MASTER_PASSWORD = 'MySecretPass123';

// Gumroad product ID (for products created after Jan 2023)
const PRODUCT_ID = 'oAK4W6eMlMOEUs6ItQBa4w==';

// Check if already authenticated on load
checkExistingAuth();

// Validate button click
validateBtn.addEventListener('click', validateLicenseOrPassword);

// Enter key validation
licenseInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    validateLicenseOrPassword();
  }
});

async function checkExistingAuth() {
  const result = await chrome.storage.local.get(['licenseValid']);

  if (result.licenseValid) {
    // Already authenticated, redirect to main popup immediately
    window.location.replace('popup.html');
  }
}

async function validateLicenseOrPassword() {
  const enteredValue = licenseInput.value.trim();

  // Hide previous messages
  errorMessage.style.display = 'none';
  successMessage.style.display = 'none';

  // Validation
  if (!enteredValue) {
    showError('Please enter your license key or password');
    return;
  }

  // Show loading
  validateBtn.disabled = true;
  loading.style.display = 'block';

  try {
    // First, check if it's the master password
    if (enteredValue === MASTER_PASSWORD) {
      console.log('✓ Master password accepted');
      await unlockExtension('master-password');
      return;
    }

    // If not master password, try validating as Gumroad license key
    console.log('Checking Gumroad license key...');
    const isValidLicense = await verifyWithGumroad(enteredValue);

    if (isValidLicense) {
      console.log('✓ Valid Gumroad license');
      await unlockExtension('gumroad-license', enteredValue);
    } else {
      showError('❌ Invalid license key or password. Please try again.');
    }
  } catch (error) {
    console.error('Authentication error:', error);
    showError('Error during authentication. Please try again.');
  } finally {
    validateBtn.disabled = false;
    loading.style.display = 'none';
  }
}

async function unlockExtension(authMethod, licenseKey = null) {
  // Store authentication in Chrome storage
  await chrome.storage.local.set({
    licenseValid: true,
    authenticatedAt: new Date().toISOString(),
    authMethod: authMethod,
    licenseKey: licenseKey
  });

  // Show success
  showSuccess('✓ Access granted! Redirecting...');

  // Redirect to main popup after brief delay
  setTimeout(() => {
    window.location.replace('popup.html');
  }, 800);
}

async function verifyWithGumroad(licenseKey) {
  try {
    // Gumroad license verification endpoint
    const url = 'https://api.gumroad.com/v2/licenses/verify';

    const params = new URLSearchParams({
      product_id: PRODUCT_ID,
      license_key: licenseKey,
      increment_uses_count: 'false' // Don't increment on validation
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params
    });

    const data = await response.json();

    console.log('Gumroad response:', data);

    // Check if license is valid
    if (data.success && data.purchase) {
      // Additional checks
      const purchase = data.purchase;

      // Check if refunded or chargebacked
      if (purchase.refunded || purchase.chargebacked) {
        console.log('License was refunded or chargebacked');
        return false;
      }

      // License is valid
      return true;
    }

    return false;
  } catch (error) {
    console.error('Gumroad API error:', error);
    // If Gumroad API fails, don't block - might be network issue
    return false;
  }
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
  successMessage.style.display = 'none';
}

function showSuccess(message) {
  successMessage.textContent = message;
  successMessage.style.display = 'block';
  errorMessage.style.display = 'none';
}
