import { getHomeContent } from "./home.service";

/**
 * Get home page hero data to be used across all pages.
 * This centralizes the logic for fetching and extracting hero data.
 * 
 * @returns Hero section data from home page, or null if not available
 */
export async function getHomeHeroData(): Promise<any | null> {
  try {
    const home = await getHomeContent();
    if (!home?.data) {
      return null;
    }

    const homeSections = home.data;
    const homeHeroConfig = (homeSections as any).heroSection ?? null;
    const homeHeroData = (homeHeroConfig?.data ?? null) as any;

    return homeHeroData;
  } catch (error) {
    console.error("[hero-utils] Failed to fetch home hero data:", error);
    return null;
  }
}

