import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NewMuslimHero from "./components/NewMuslimHero";
import JourneyIntro from "./components/JourneyIntro";
import FoundationsSection from "./components/FoundationsSection";
import SupportAndCommunitySection from "./components/SupportAndCommunitySection";
import ResourcesSection from "./components/ResourcesSection";
import ExploreFurtherSection from "./components/ExploreFurtherSection";
import {
  getNewMuslimContent,
  NewMuslimContent,
  NewMuslimContentJson,
} from "@/lib/new-muslim.service";
import { getHomeHeroData } from "@/lib/hero-utils";

export const dynamic = "force-dynamic";

import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "New Muslim Resources",
  description:
    "Guidance, classes, and curated resources to help new Muslims grow in faith with confidence. Fort Dodge Islamic Center provides support, education, and community for those new to Islam.",
  path: "/new-musilm",
  keywords: [
    "new Muslim resources",
    "revert to Islam",
    "new Muslim support",
    "Islamic education for beginners",
    "Muslim conversion resources",
    "learning Islam",
  ],
});

function getSections(newMuslim: NewMuslimContent | null): NewMuslimContentJson {
  const root = (newMuslim?.data ?? {}) as NewMuslimContentJson;

  if (root.data && typeof root.data === "object") {
    return root.data as NewMuslimContentJson;
  }

  return root;
}

export default async function NewMuslimPage() {
  const newMuslim = await getNewMuslimContent();
  const homeHeroData = await getHomeHeroData();
  const sections = getSections(newMuslim);

  const journeyIntroConfig = sections.journeyIntro ?? null;
  const foundationsConfig = sections.foundations ?? null;
  const supportConfig = sections.support ?? null;
  const resourcesConfig = sections.resources ?? null;
  const exploreConfig = sections.explore ?? null;

  const journeyIntroData = (journeyIntroConfig?.data ?? null) as any;
  const foundationsData = (foundationsConfig?.data ?? null) as any;
  const supportData = (supportConfig?.data ?? null) as any;
  const resourcesData = (resourcesConfig?.data ?? null) as any;
  const exploreData = (exploreConfig?.data ?? null) as any;

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      <main>
        <NewMuslimHero data={homeHeroData} />
        <JourneyIntro data={journeyIntroData} />
        <FoundationsSection data={foundationsData} />
        <SupportAndCommunitySection data={supportData} />
        <ResourcesSection data={resourcesData} />
        <ExploreFurtherSection data={exploreData} />
      </main>
      <Footer />
    </div>
  );
}

