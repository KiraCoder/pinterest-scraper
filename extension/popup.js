// Check license first
checkLicense();

async function checkLicense() {
  const result = await chrome.storage.local.get(['licenseValid']);

  if (!result.licenseValid) {
    // No valid license, redirect to license page immediately
    window.location.replace('license.html');
    return;
  }

  // License is valid, show the page and continue with normal popup
  document.body.classList.add('loaded');
  initializePopup();
}

function initializePopup() {
  // UI Elements
  const formSection = document.getElementById('formSection');
  const progressSection = document.getElementById('progressSection');
  const warningBox = document.getElementById('warningBox');
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const downloadBtn = document.getElementById('downloadBtn');

  // Input fields
  const maxPinsInput = document.getElementById('maxPins');
  const minLikesInput = document.getElementById('minLikes');
  const scrollDelayInput = document.getElementById('scrollDelay');
  const maxTimeInput = document.getElementById('maxTime');

  // Progress elements
  const pinsCollectedEl = document.getElementById('pinsCollected');
  const scrollCyclesEl = document.getElementById('scrollCycles');
  const timeElapsedEl = document.getElementById('timeElapsed');
  const progressBar = document.getElementById('progressBar');
  const statusText = document.getElementById('statusText');

  let collectedPins = [];
  let isScraperRunning = false;
  let startTime = 0;
  let timerInterval = null;

  // Check if we're on Pinterest
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0]?.url || '';
    if (!url.includes('pinterest.com/search/pins/')) {
      warningBox.style.display = 'block';
      formSection.style.display = 'none';
    }
  });

// Start scraping
startBtn.addEventListener('click', async () => {
  const config = {
    maxPins: parseInt(maxPinsInput.value),
    minLikes: parseInt(minLikesInput.value),
    scrollDelay: parseInt(scrollDelayInput.value),
    maxTime: parseInt(maxTimeInput.value),
  };

  console.log('Starting scraper with config:', config);

  // Get active tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab || !tab.id) {
    alert('Error: Could not find active tab!');
    return;
  }

  // First, try to inject the content script if it's not already loaded
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });
    console.log('Content script injected');
  } catch (error) {
    // Content script might already be loaded, that's okay
    console.log('Content script already present or injection failed:', error);
  }

  // Wait a moment for script to initialize
  await new Promise(resolve => setTimeout(resolve, 100));

  // Send message to content script to start scraping
  try {
    chrome.tabs.sendMessage(tab.id, {
      action: 'START_SCRAPING',
      config
    }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error sending message:', chrome.runtime.lastError);
        alert('Error: Extension could not connect to the page.\n\nPlease:\n1. Refresh the Pinterest page (F5)\n2. Make sure you are on pinterest.com/search/pins/\n3. Try again');
        return;
      }
      console.log('Message sent successfully:', response);
    });

    // Switch to progress view
    formSection.style.display = 'none';
    progressSection.style.display = 'block';
    isScraperRunning = true;
    startTime = Date.now();

    // Start timer
    timerInterval = setInterval(updateTimer, 1000);
  } catch (error) {
    console.error('Error starting scraper:', error);
    alert('Error starting scraper: ' + error.message);
  }
});

// Stop scraping
stopBtn.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { action: 'STOP_SCRAPING' });

  stopScraper();
});

// Download CSV
downloadBtn.addEventListener('click', async () => {
  if (collectedPins.length === 0) {
    alert('No pins to download!');
    return;
  }

  // Get search query from the page
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { action: 'GET_SEARCH_QUERY' }, (response) => {
    const searchQuery = response?.searchQuery || 'pinterest_pins';
    downloadCSV(collectedPins, searchQuery);
  });
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'UPDATE_PROGRESS') {
    updateProgress(message.data);
  } else if (message.action === 'SCRAPING_COMPLETE') {
    scrapingComplete(message.data);
  }
});

function updateProgress(data) {
  pinsCollectedEl.textContent = data.pinsCollected;
  scrollCyclesEl.textContent = data.scrollCycles;
  statusText.textContent = data.status;

  // Update progress bar
  const progress = (data.pinsCollected / parseInt(maxPinsInput.value)) * 100;
  progressBar.style.width = Math.min(progress, 100) + '%';

  // Store pins
  if (data.pins) {
    collectedPins = data.pins;
  }
}

function scrapingComplete(data) {
  stopScraper();
  collectedPins = data.pins;

  statusText.textContent = `✓ Scraping complete! Collected ${data.pins.length} pins - Click Download to save`;
  statusText.style.borderLeftColor = '#48bb78';

  downloadBtn.style.display = 'flex';
  stopBtn.style.display = 'none';

  // No auto-download - user clicks the button
}

function stopScraper() {
  isScraperRunning = false;
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  timeElapsedEl.textContent = `${elapsed}s`;
}

function downloadCSV(pins, searchQuery = 'pinterest_pins') {
  // Filter by minimum likes
  const minLikes = parseInt(minLikesInput.value);
  const filteredPins = pins.filter(pin => {
    const saves = pin.saves || 0;
    return saves >= minLikes;
  });

  // Sort by saves (highest first)
  filteredPins.sort((a, b) => (b.saves || 0) - (a.saves || 0));

  // Create CSV content
  const headers = [
    'Pin ID',
    'Pin Link',
    'Image Link',
    'Saves',
    'Reactions',
    'Likes',
    'Repins',
    'Comments',
    'Shares',
    'Created At',
    'Description',
    'Author'
  ];

  let csv = headers.join(',') + '\n';

  filteredPins.forEach(pin => {
    const row = [
      pin.pin_id || '',
      pin.pin_link || '',
      pin.image_link || '',
      pin.saves || 0,
      pin.reactions || 0,
      pin.likes || 0,
      pin.repins || 0,
      pin.comments || 0,
      pin.shares || 0,
      pin.created_at || '',
      `"${(pin.description || '').replace(/"/g, '""')}"`,
      `"${(pin.author || '').replace(/"/g, '""')}"`
    ];
    csv += row.join(',') + '\n';
  });

  // Create download with improved filename
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  // Format: fall_outfits_max100_2025-11-03_01-30-45.csv
  const now = new Date();
  const date = now.toISOString().split('T')[0]; // 2025-11-03
  const time = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // 01-30-45

  // Clean search query for filename
  const cleanQuery = searchQuery
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

  // Add max pins or time info
  const maxPins = parseInt(maxPinsInput.value);
  const maxTime = parseInt(maxTimeInput.value);
  const limitInfo = maxTime > 0 ? `time${maxTime}s` : `max${maxPins}`;

  const filename = `${cleanQuery}_${limitInfo}_${date}_${time}.csv`;

  chrome.downloads.download({
    url: url,
    filename: filename,
    saveAs: true
  });

  statusText.textContent = `✓ Downloaded ${filteredPins.length} pins to ${filename}`;
}

} // End of initializePopup function
