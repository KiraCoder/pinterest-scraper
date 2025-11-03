/**
 * Pinterest DOM selectors
 * Update these if Pinterest changes their markup
 */
export const SELECTORS = {
  // Pin container and link
  pinLink: 'a[href*="/pin/"]',

  // Image selectors (try in order)
  image: 'img[src]',
  imageSrcset: 'img[srcset]',

  // Pin card/container
  pinCard: '[data-test-id="pin"]',
  pinContainer: '[data-grid-item="true"]',

  // Metadata selectors
  likeButton: '[data-test-id="like-button"]',
  saveButton: '[data-test-id="save-button"]',

  // Text content
  description: '[data-test-id="pinrep-description"]',
  title: '[data-test-id="pin-title"]',

  // Author/creator
  author: '[data-test-id="creator-profile-name"]',
  authorLink: 'a[href*="/"]',

  // Load more button
  loadMoreButton: 'button:has-text("Show more")',

  // Pinterest may show counts in various formats
  statsContainer: '[data-test-id="stats"]',
};

/**
 * Regular expressions for parsing Pinterest data
 */
export const PATTERNS = {
  pinId: /\/pin\/([0-9a-zA-Z_-]+)/,
  likesCompact: /^([\d,.]+)([kKmM]?)$/,
  cleanWhitespace: /\s+/g,
};
