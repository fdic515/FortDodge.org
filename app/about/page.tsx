import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import AboutHero from "./components/AboutHero";
import IntroductionSection from "./components/IntroductionSection";
import ProgramsServicesSection from "./components/ProgramsServicesSection";
import GovernanceStructureSection from "./components/GovernanceStructureSection";
import BoardOfDirectorsSection from "./components/BoardOfDirectorsSection";
import BoardOfTrusteesSection from "./components/BoardOfTrusteesSection";
import FormationSection from "./components/FormationSection";
import {
  getAboutContent,
  AboutContent,
  AboutContentJson,
} from "@/lib/about.service";
import { getHomeHeroData } from "@/lib/hero-utils";

export const dynamic = "force-dynamic";

import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "About Us",
  description:
    "Learn about Fort Dodge Islamic Centers, a non-profit organization founded in 2002, providing prayer, learning, and community services to Muslims in Fort Dodge, Iowa. Discover our mission, governance structure, board of directors, and programs.",
  path: "/about",
  keywords: [
    "about Fort Dodge Islamic Center",
    "Islamic center history",
    "board of directors",
    "governance structure",
    "Muslim organization Iowa",
    "community programs",
  ],
});

function getSections(about: AboutContent | null): AboutContentJson {
  const root = (about?.data ?? {}) as AboutContentJson;

  if (root.data && typeof root.data === "object") {
    return root.data as AboutContentJson;
  }

  return root;
}

export default async function AboutPage() {
  const about = await getAboutContent();
  const homeHeroData = await getHomeHeroData();
  const sections = getSections(about);

  const introductionConfig = sections.introduction ?? null;
  const programsConfig = sections.programs ?? null;
  const governanceConfig = sections.governance ?? null;
  const boardDirectorsConfig = sections.boardDirectors ?? null;
  const boardTrusteesConfig = sections.boardTrustees ?? null;
  const formationConfig = sections.formation ?? null;

  const introductionData = (introductionConfig?.data ?? null) as any;
  const programsData = (programsConfig?.data ?? null) as any;
  const governanceData = (governanceConfig?.data ?? null) as any;
  const boardDirectorsData = (boardDirectorsConfig?.data ?? null) as any;
  const boardTrusteesData = (boardTrusteesConfig?.data ?? null) as any;
  const formationData = (formationConfig?.data ?? null) as any;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="bg-white">
        <AboutHero data={homeHeroData} />

        <section className="bg-gray-50">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
            <IntroductionSection data={introductionData} />
            <ProgramsServicesSection data={programsData} />
            <GovernanceStructureSection data={governanceData} />
            <BoardOfDirectorsSection data={boardDirectorsData} />
            <BoardOfTrusteesSection data={boardTrusteesData} />
            <FormationSection data={formationData} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

