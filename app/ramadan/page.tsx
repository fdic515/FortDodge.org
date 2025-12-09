import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import CommunityIftars from "./components/CommunityIftars";
import HeroBanner from "./components/HeroBanner";
import TafsirSeries from "./components/TafsirSeries";
import ZakatSection from "./components/ZakatSection";
import {
  getRamadanContent,
  RamadanContent,
  RamadanContentJson,
} from "@/lib/ramadan.service";
import { getHomeHeroData } from "@/lib/hero-utils";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = generateSEOMetadata({
  title: "Ramadan",
  description:
    "Ramadan resources and programs at Fort Dodge Islamic Center. Find information about daily tafsir series, community iftars, zakat ul-fitr, and special Ramadan activities for the Muslim community in Fort Dodge, Iowa.",
  path: "/ramadan",
  keywords: [
    "Ramadan Fort Dodge",
    "Ramadan programs",
    "iftar community",
    "zakat ul-fitr",
    "Ramadan tafsir",
    "Islamic month of fasting",
    "Ramadan activities Iowa",
  ],
});

function getSections(ramadan: RamadanContent | null): RamadanContentJson {
  const root = (ramadan?.data ?? {}) as RamadanContentJson;

  // If there's a nested `data` object, that's where sections live.
  if (root.data && typeof root.data === "object") {
    return root.data as RamadanContentJson;
  }

  // Otherwise, assume flat shape.
  return root;
}

export default async function RamadanPage() {
  const ramadan = await getRamadanContent();
  const homeHeroData = await getHomeHeroData();
  const sections = getSections(ramadan);
  
  // Keep Ramadan-specific announcement and eid text from ramadan data
  const heroConfig =
    // Prefer Home-style "heroSection" key if present.
    (sections as any).heroSection ?? sections.hero ?? null;
  const ramadanHeroData = (heroConfig?.data ?? null) as any;
  
  // Merge home hero image with ramadan-specific text
  const mergedHeroData = {
    ...homeHeroData,
    announcementText: ramadanHeroData?.announcementText,
    eidText: ramadanHeroData?.eidText,
  };

  const lessonsConfig = sections.daily_lessons ?? null;
  const zakatConfig = sections.zakat_ul_fitr ?? null;
  const iftarsConfig = sections.community_iftars ?? null;

  const lessonsData = (lessonsConfig?.data ?? null) as any;
  const zakatData = (zakatConfig?.data ?? null) as any;
  const iftarsData = (iftarsConfig?.data ?? null) as any;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <HeroBanner data={mergedHeroData} />
      <main className="mx-auto max-w-6xl space-y-8 px-4 py-6 sm:space-y-10 sm:px-6 sm:py-8 md:space-y-12 md:px-8 md:py-12">
        <ZakatSection data={zakatData} />
        <TafsirSeries data={lessonsData} />
        <CommunityIftars data={iftarsData} />
      </main>
      <Footer />
    </div>
  );
}

