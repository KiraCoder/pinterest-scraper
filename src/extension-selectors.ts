/**
 * Selectors for Pinterest Sort Extension overlay data
 * The extension adds overlays to each pin with metrics
 */

export const EXTENSION_SELECTORS = {
  // Main overlay container
  overlayContainer: '.absolute.left-2.top-1',

  // Generic tooltip selector - we'll search for specific text
  tooltip: '.ytuong-tooltip',

  // Metric badges (colored spans with numbers)
  yellowBadge: 'span.bg-yellow-100.text-yellow-800',  // Saves
  tealBadge: 'span.bg-teal-100.text-teal-800',       // Reactions, Repins
  grayBadge: 'span.bg-gray-100.text-gray-800',       // Likes, Comments
  blueBadge: 'span.bg-blue-100.text-blue-800',       // Created At
};

/**
 * Helper to parse numbers from extension badges
 */
export function parseExtensionNumber(text: string | null): number | null {
  if (!text) return null;

  // Remove commas and parse
  const cleaned = text.trim().replace(/,/g, '');
  const num = parseInt(cleaned, 10);

  return isNaN(num) ? null : num;
}

/**
 * Helper to parse time periods (e.g., "8 M" -> "8 months")
 */
export function parseTimePeriod(text: string | null): string | null {
  if (!text) return null;

  const cleaned = text.trim();

  // Map shortcuts to full words
  const timeMap: { [key: string]: string } = {
    'M': 'months',
    'Y': 'years',
    'W': 'weeks',
    'D': 'days',
    'H': 'hours',
  };

  // Match pattern like "8 M"
  const match = cleaned.match(/^(\d+)\s*([MYWDH])$/i);
  if (match) {
    const [, number, unit] = match;
    const fullUnit = timeMap[unit.toUpperCase()] || unit;
    return `${number} ${fullUnit}`;
  }

  return cleaned;
}
