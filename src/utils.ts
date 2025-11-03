import { PATTERNS } from './selectors';

/**
 * Extract Pinterest pin ID from URL
 */
export function extractPinId(url: string): string | null {
  try {
    const match = url.match(PATTERNS.pinId);
    if (match && match[1]) {
      return match[1];
    }

    // Try parsing as URL
    const urlObj = new URL(url);
    const parts = urlObj.pathname.split('/').filter(Boolean);
    const pinIndex = parts.indexOf('pin');
    if (pinIndex !== -1 && parts[pinIndex + 1]) {
      return parts[pinIndex + 1];
    }
  } catch (error) {
    console.error(`Failed to extract pin ID from ${url}:`, error);
  }
  return null;
}

/**
 * Normalize likes count from compact format (e.g., "5.2k" -> 5200)
 */
export function normalizeLikes(likesStr: string | null | undefined): number | null {
  if (!likesStr) return null;

  const cleaned = String(likesStr).trim().toLowerCase();
  const match = cleaned.match(PATTERNS.likesCompact);

  if (!match) return null;

  const [, numberPart, suffix] = match;
  const baseNumber = parseFloat(numberPart.replace(',', ''));

  if (isNaN(baseNumber)) return null;

  switch (suffix) {
    case 'k':
      return Math.round(baseNumber * 1000);
    case 'm':
      return Math.round(baseNumber * 1_000_000);
    default:
      return Math.round(baseNumber);
  }
}

/**
 * Generate output filename from search query and timestamp
 */
export function generateFilename(searchUrl: string, customName?: string): string {
  if (customName) {
    return customName.endsWith('.csv') ? customName : `${customName}.csv`;
  }

  try {
    const url = new URL(searchUrl);
    const query = url.searchParams.get('q') || 'pinterest';
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    return `pinterest_${query}_${timestamp}.csv`;
  } catch {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    return `pinterest_scrape_${timestamp}.csv`;
  }
}

/**
 * Random delay to mimic human behavior
 */
export async function randomDelay(baseMs: number, jitterMs: number = 800): Promise<void> {
  const delay = baseMs + Math.random() * jitterMs;
  await new Promise(resolve => setTimeout(resolve, delay));
}

/**
 * Clean and normalize text content
 */
export function cleanText(text: string | null | undefined): string | null {
  if (!text) return null;
  return text.replace(PATTERNS.cleanWhitespace, ' ').trim() || null;
}
