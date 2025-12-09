import Navbar from "./components/Navbar";
import HeroSection, { HeroSectionData } from "./components/HeroSection";
import InfoBanner, { InfoBannerData } from "./components/infobanner";
import PrayerTimes, { PrayerTimesData } from "./components/prayertime";
import DonationSection, { DonationSectionData } from "./components/DonationSection";
import FridayPrayers, { FridayPrayersData } from "./components/Fridayprayer";
import CalendarSection, { CalendarSectionData } from "./components/calendersection";
import Footer from "./components/Footer";
import HomeRealtimeSubscription from "./components/HomeRealtimeSubscription";

import {
  getHomeContent,
  updateHomeSection,
  HomeContent,
  HomeContentJson,
  HomeSectionConfig,
} from "../lib/home.service";
import { resolveStorageImageUrlAsync } from "../lib/storage.service";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

// Always fetch fresh data from Supabase on each request so admin updates show immediately.
export const dynamic = "force-dynamic";

export const metadata = generateSEOMetadata({
  title: "Home",
  description:
    "Fort Dodge Islamic Center - Daily prayer times, Friday prayers, Islamic education, community services, and spiritual guidance for Muslims in Fort Dodge, Iowa.",
  path: "/",
  keywords: [
    "Fort Dodge masjid",
    "Islamic center",
    "Muslim community Fort Dodge",
    "prayer times",
    "Friday prayer",
    "Islamic education",
    "community services",
  ],
});

/**
 * Helper to determine if a section should be rendered, with sensible defaults.
 * - If the section config is missing, we assume it is enabled (backwards compatible).
 * - If `enabled` is explicitly `false`, we hide the section.
 */
function isSectionEnabled(section?: HomeSectionConfig | null): boolean {
  if (!section || typeof section.enabled === "undefined") {
    return true;
  }
  return Boolean(section.enabled);
}

/**
 * Safely pull out the JSON `data` object from the fetched row.
 */
function getSections(home: HomeContent | null): HomeContentJson {
  return home?.data ?? {};
}

/**
 * Decide which config to use for the info banner / quick links section.
 *
 * FINAL RULE:
 * - Always prefer the `quickLinks` key (this is what admin + DB use now).
 * - Only if `quickLinks` is missing entirely, fall back to `infoBanner`.
 *
 * This guarantees that the links you edit in the admin (stored under
 * `data.quickLinks`) are what the frontend will render, even if old
 * `infoBanner` data still exists in the row.
 */
function pickInfoBannerConfig(
  sections: HomeContentJson
): HomeSectionConfig | null {
  const quickLinksConfig = sections.quickLinks ?? null;
  const infoBannerConfig = sections.infoBanner ?? null;

  // Prefer quickLinks over infoBanner because quickLinks has the updated src field
  // infoBanner only has iconPath (old format)
  return quickLinksConfig ?? infoBannerConfig ?? null;
}

/**
 * Home page (server component).
 *
 * - Fetches home content from Supabase on the server.
 * - Dynamically displays hero, prayer time, Friday prayers, and donation sections
 *   based on the JSON configuration.
 * - Handles missing or empty sections gracefully using component-level defaults.
 */
export default async function Home() {
  const home: HomeContent | null = await getHomeContent();
  const sections = getSections(home);

  const heroConfig = sections.heroSection ?? null;
  const prayerTimeConfig = sections.prayerTime ?? null;
  const fridayPrayersConfig = sections.fridayPrayers ?? null;
  const donationConfig = sections.donation ?? null;
  // Pick the best available config for the info banner / quick links section.
  const infoBannerConfig = pickInfoBannerConfig(sections);
  const calendarConfig = sections.calendar ?? null;

  // Check if hero image exists in storage, if not, remove it from data and database
  let heroData = (heroConfig?.data ?? null) as HeroSectionData | null;
  if (heroData?.heroImage) {
    const imageExists = await resolveStorageImageUrlAsync(heroData.heroImage, {
      bucket: "Public",
      folder: "Home",
    });
    if (!imageExists) {
      console.warn("[Home] Hero image does not exist in storage, removing from database:", heroData.heroImage);
      // Remove heroImage field completely from the data object
      const { heroImage: removed, ...restHeroData } = heroData;
      heroData = restHeroData as HeroSectionData;
      // Update database to remove invalid image path
      if (heroConfig) {
        const updatedHeroConfig: HomeSectionConfig = {
          ...heroConfig,
          data: heroData,
        };
        await updateHomeSection("heroSection", updatedHeroConfig);
        console.log("[Home] Successfully removed invalid hero image from database");
      }
    }
  }

  const prayerTimesData = (prayerTimeConfig?.data ?? null) as PrayerTimesData | null;
  const fridayPrayersData = (fridayPrayersConfig?.data ?? null) as FridayPrayersData | null;
  const donationData = (donationConfig?.data ?? null) as DonationSectionData | null;
  const infoBannerData = (infoBannerConfig?.data ?? null) as InfoBannerData | null;
  const calendarData = (calendarConfig?.data ?? null) as CalendarSectionData | null;

  return (
    <div className="min-h-screen bg-zinc-50">
      <HomeRealtimeSubscription />
      <Navbar />

      {/* Dynamically rendered sections based on Supabase JSON */}
      {isSectionEnabled(heroConfig) && <HeroSection data={heroData} />}

      {isSectionEnabled(prayerTimeConfig) && (
        <PrayerTimes data={prayerTimesData} />
      )}

      {isSectionEnabled(fridayPrayersConfig) && (
        <FridayPrayers data={fridayPrayersData} />
      )}

      {isSectionEnabled(donationConfig) && (
        <DonationSection data={donationData} />
      )}

      {/* Info banner and calendar sections can also be wired to JSON when needed */}
      {isSectionEnabled(infoBannerConfig) && <InfoBanner data={infoBannerData} />}

      {isSectionEnabled(calendarConfig) && <CalendarSection data={calendarData} />}

      <Footer />
    </div>
  );
}
