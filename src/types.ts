/**
 * Represents a Pinterest pin with all relevant metadata
 */
export interface PinData {
  pin_id: string;
  pin_link: string;
  image_link: string;
  saves: number | null;
  reactions: number | null;
  likes: number | null;
  repins: number | null;
  comments: number | null;
  shares: number | null;
  created_at: string | null;
  description: string | null;
  author: string | null;
}

/**
 * Configuration options for the scraper
 */
export interface ScraperConfig {
  url: string;
  maxResults: number;
  likesThreshold: number;
  headless: boolean;
  outputFilename?: string;
  scrollDelay?: number;
  maxStallCycles?: number;
  fetchDetails?: boolean;
  chromeProfile?: string;
  scrollTime?: number;  // Time in seconds to scroll
  waitForLogin?: number;  // Time in seconds to wait for manual login
  useExtension?: boolean;  // Use extension data instead of detail fetching
}

/**
 * Progress statistics during scraping
 */
export interface ScrapeProgress {
  totalCollected: number;
  uniquePins: number;
  aboveThreshold: number;
  currentScrollCycle: number;
}
