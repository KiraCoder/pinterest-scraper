import { ElementHandle } from 'playwright';
import { parseExtensionNumber, parseTimePeriod } from './extension-selectors';

/**
 * Extract metrics from Pinterest Sort Extension overlay
 * The extension adds an overlay div to each pin with all the metrics
 */
export async function extractExtensionData(pinContainer: ElementHandle): Promise<{
  saves: number | null;
  reactions: number | null;
  likes: number | null;
  repins: number | null;
  comments: number | null;
  shares: number | null;
  created_at: string | null;
}> {
  const defaultData = {
    saves: null,
    reactions: null,
    likes: null,
    repins: null,
    comments: null,
    shares: null,
    created_at: null,
  };

  try {
    // Find the extension overlay container
    const overlay = await pinContainer.$('.absolute.left-2.top-1');
    if (!overlay) {
      return defaultData;
    }

    // Get all text content from the overlay
    const overlayText = await overlay.textContent();
    if (!overlayText) {
      return defaultData;
    }

    // Extract each metric by finding the tooltip and the next number
    const metrics = {
      saves: null as number | null,
      reactions: null as number | null,
      likes: null as number | null,
      repins: null as number | null,
      comments: null as number | null,
      shares: null as number | null,
      created_at: null as string | null,
    };

    // Find all tooltips and their associated values
    const tooltips = await overlay.$$('.ytuong-tooltip');

    for (const tooltip of tooltips) {
      const tooltipText = await tooltip.textContent();
      if (!tooltipText) continue;

      const cleanText = tooltipText.trim();

      // Find the parent container and get the badge value
      const parent = await tooltip.evaluateHandle(el => el.parentElement?.parentElement);
      if (!parent) continue;

      const parentText = await parent.evaluate((el) => el?.textContent);
      if (!parentText) continue;

      // Extract the number after the tooltip
      // Pattern: tooltip text followed by a number in a badge
      const match = parentText.match(/\d[\d,]+/);
      const value = match ? match[0] : null;

      switch (cleanText) {
        case 'Saves':
          metrics.saves = parseExtensionNumber(value);
          break;
        case 'Reactions':
          metrics.reactions = parseExtensionNumber(value);
          break;
        case 'Likes':
          metrics.likes = parseExtensionNumber(value);
          break;
        case 'Repins':
          metrics.repins = parseExtensionNumber(value);
          break;
        case 'Comments':
          metrics.comments = parseExtensionNumber(value);
          break;
        case 'Shares':
          metrics.shares = parseExtensionNumber(value);
          break;
        case 'Created At':
          // Find the time badge (e.g., "8 M")
          const timeMatch = parentText.match(/(\d+\s*[MYWDH])/i);
          if (timeMatch) {
            metrics.created_at = parseTimePeriod(timeMatch[0]);
          }
          break;
      }
    }

    return metrics;
  } catch (error) {
    console.error('Error extracting extension data:', error);
    return defaultData;
  }
}

/**
 * Alternative approach: Extract metrics using a more robust method
 * by querying the DOM structure directly
 */
export async function extractExtensionDataV2(pinContainer: ElementHandle): Promise<{
  saves: number | null;
  reactions: number | null;
  likes: number | null;
  repins: number | null;
  comments: number | null;
  shares: number | null;
  created_at: string | null;
}> {
  try {
    const data = await pinContainer.evaluate((container: Element) => {
      const overlay = container.querySelector('.absolute.left-2.top-1');
      if (!overlay) return null;

      const result = {
        saves: null as number | null,
        reactions: null as number | null,
        likes: null as number | null,
        repins: null as number | null,
        comments: null as number | null,
        shares: null as number | null,
        created_at: null as string | null,
      };

      // Helper to parse numbers
      const parseNum = (text: string | null): number | null => {
        if (!text) return null;
        const cleaned = text.trim().replace(/,/g, '');
        const num = parseInt(cleaned, 10);
        return isNaN(num) ? null : num;
      };

      // Find all tooltips and extract their values
      const tooltips = Array.from(overlay.querySelectorAll('.ytuong-tooltip'));
      tooltips.forEach((tooltip: Element) => {
        const tooltipText = tooltip.textContent?.trim();
        if (!tooltipText) return;

        // Get the parent container that has the value
        const parent = tooltip.parentElement?.parentElement;
        if (!parent || !(parent instanceof Element)) return;

        // Find the span with the number (various colored badges)
        const badges = Array.from(parent.querySelectorAll('span[class*="bg-"]'));
        let valueText: string | null = null;

        // Look for the badge with a number
        for (const badge of badges) {
          const text = badge.textContent?.trim();
          if (text && /\d/.test(text)) {
            valueText = text;
            break;
          }
        }

        // Map tooltip to result field
        switch (tooltipText) {
          case 'Saves':
            result.saves = parseNum(valueText);
            break;
          case 'Reactions':
            result.reactions = parseNum(valueText);
            break;
          case 'Likes':
            result.likes = parseNum(valueText);
            break;
          case 'Repins':
            result.repins = parseNum(valueText);
            break;
          case 'Comments':
            result.comments = parseNum(valueText);
            break;
          case 'Shares':
            result.shares = parseNum(valueText);
            break;
          case 'Created At':
            result.created_at = valueText;
            break;
        }
      });

      return result;
    });

    return data || {
      saves: null,
      reactions: null,
      likes: null,
      repins: null,
      comments: null,
      shares: null,
      created_at: null,
    };
  } catch (error) {
    return {
      saves: null,
      reactions: null,
      likes: null,
      repins: null,
      comments: null,
      shares: null,
      created_at: null,
    };
  }
}
