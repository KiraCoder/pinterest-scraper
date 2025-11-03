import { createObjectCsvWriter } from 'csv-writer';
import { PinData } from './types';

/**
 * Export pins data to CSV file
 */
export async function exportToCSV(pins: PinData[], filename: string): Promise<void> {
  const csvWriter = createObjectCsvWriter({
    path: filename,
    header: [
      { id: 'pin_id', title: 'Pin ID' },
      { id: 'pin_link', title: 'Pin Link' },
      { id: 'image_link', title: 'Image Link' },
      { id: 'saves', title: 'Saves' },
      { id: 'reactions', title: 'Reactions' },
      { id: 'likes', title: 'Likes' },
      { id: 'repins', title: 'Repins' },
      { id: 'comments', title: 'Comments' },
      { id: 'shares', title: 'Shares' },
      { id: 'created_at', title: 'Created At' },
      { id: 'description', title: 'Description' },
      { id: 'author', title: 'Author' },
    ],
  });

  await csvWriter.writeRecords(pins);
  console.log(`\n✓ Exported ${pins.length} pins to ${filename}`);
}

/**
 * Sort pins by saves (most important metric) in descending order
 * Falls back to likes if saves are not available
 */
export function sortByLikes(pins: PinData[]): PinData[] {
  return pins.sort((a, b) => {
    // Prefer saves over likes for sorting
    const metricA = a.saves ?? a.likes ?? 0;
    const metricB = b.saves ?? b.likes ?? 0;
    return metricB - metricA;
  });
}
