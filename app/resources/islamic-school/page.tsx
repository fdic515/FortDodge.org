import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ResourcesHero from "../components/ResourcesHero";
import {
  getIslamicSchoolContent,
  type IslamicSchoolContent,
  type IslamicSchoolContentJson,
} from "@/lib/islamic-school.service";
import { getHomeHeroData } from "@/lib/hero-utils";

import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

// Force dynamic rendering to prevent caching on Vercel
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = generateSEOMetadata({
  title: "Islamic School",
  description:
    "Fort Dodge Islamic School (DAIS) - Weekend Islamic education program for children. Learn about our vision, mission, curriculum, and how to enroll or apply for the principal position.",
  path: "/resources/islamic-school",
  keywords: [
    "Islamic school Fort Dodge",
    "DAIS",
    "Islamic education for children",
    "weekend Islamic school",
    "Quran classes",
    "Arabic classes",
    "Islamic studies",
  ],
});

function getSections(
  islamicSchool: IslamicSchoolContent | null
): IslamicSchoolContentJson {
  if (!islamicSchool?.data) {
    return {};
  }

  const data = islamicSchool.data;
  // Support both shapes: flat and nested
  return (data.data && typeof data.data === "object"
    ? data
    : data) as IslamicSchoolContentJson;
}

export default async function IslamicSchoolPage() {
  const islamicSchool = await getIslamicSchoolContent();
  const homeHeroData = await getHomeHeroData();
  const sections = getSections(islamicSchool);

  const introConfig = sections.intro || sections.data?.intro;
  const visionConfig = sections.vision || sections.data?.vision;
  const missionConfig = sections.mission || sections.data?.mission;
  const principalConfig = sections.principal || sections.data?.principal;
  const administrationConfig = sections.administration || sections.data?.administration;

  const introData = introConfig?.data as any;
  const visionData = visionConfig?.data as any;
  const missionData = missionConfig?.data as any;
  const principalData = principalConfig?.data as any;
  const adminData = administrationConfig?.data as any;

  // Intro section
  const introTitle =
    introData?.["intro-title"] || introData?.introTitle || "Islamic School";
  const introContent =
    introData?.["intro-content"] ||
    introData?.introContent ||
    "Fort Dodge Islamic School (DAIS) is our weekend educational program dedicated to providing quality Islamic education to children in our community.";

  // Vision section
  const visionTitle =
    visionData?.["vision-title"] || visionData?.visionTitle || "VISION";
  const visionContent =
    visionData?.["vision-content"] ||
    visionData?.visionContent ||
    "DAIS' vision is to cultivate tomorrow's leaders; proud, and practicing Muslims who will positively shape our families, communities, nation, and the world inshaAllah.";

  // Mission section
  const missionTitle =
    missionData?.["mission-title"] || missionData?.missionTitle || "MISSION";
  const missionContent =
    missionData?.["mission-content"] ||
    missionData?.missionContent ||
    "DAIS — a Sunday school — provides Islamic education based on the Quran and Sunnah to elementary and middle school students at DAIC. DAIS prepares students to meet the challenges of our changing world by teaching them Quran, Islamic studies, and Arabic in an enriching and stimulating Islamic environment.";

  // Principal section
  const principalTitle =
    principalData?.["principal-title"] ||
    principalData?.principalTitle ||
    "HIRING A PRINCIPAL FOR THE ISLAMIC SCHOOL";
  const principalContent =
    principalData?.["principal-content"] ||
    principalData?.principalContent ||
    "We are looking for a principal for our Islamic school. Please check the principal position description and apply by sending your CV and any supported documents to: education@arqum.org.";
  const principalPdfLink =
    principalData?.["principal-pdf-link"] ||
    principalData?.principalPdfLink ||
    "/files/dais-principal-position-description.pdf";
  const principalEmail =
    principalData?.["principal-email"] ||
    principalData?.principalEmail ||
    "education@arqum.org";

  // Administration section
  const adminTitle =
    adminData?.["admin-title"] || adminData?.adminTitle || "ADMINISTRATION";
  const adminPrincipalLabel =
    adminData?.["admin-principal-label"] ||
    adminData?.adminPrincipalLabel ||
    "Principal:";
  const adminPrincipal =
    adminData?.["admin-principal"] ||
    adminData?.adminPrincipal ||
    "(To be announced)";
  const adminInfoText =
    adminData?.["admin-info-text"] ||
    adminData?.adminInfoText ||
    "For more information e-mail us at education@arqum.org.";
  const adminEmail =
    adminData?.["admin-email"] || adminData?.adminEmail || "education@arqum.org";
  const adminNote =
    adminData?.["admin-note"] ||
    adminData?.adminNote ||
    "Information about the starting date of the school and the deadline for registration will be posted as soon as they are available.";

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="bg-white">
        {/* Hero image from home page */}
        <ResourcesHero
          data={homeHeroData}
        />

        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
            {/* Intro */}
            <section className="rounded-3xl border border-gray-200 bg-zinc-50/60 px-5 py-5 sm:px-7 sm:py-6 shadow-sm">
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                {introTitle}
              </h1>
              <div
                className="mt-3 text-sm leading-relaxed text-gray-800 sm:text-[0.95rem]"
                dangerouslySetInnerHTML={{ __html: introContent }}
              />
            </section>

            {/* Vision */}
            <section className="mt-10 border-t border-gray-200 pt-8 sm:mt-12 sm:pt-10">
              <h2 className="text-xl font-semibold tracking-[0.11em] text-sky-700 sm:text-2xl">
                {visionTitle}
              </h2>
              <div
                className="mt-4 text-sm leading-relaxed text-gray-800 sm:text-[0.95rem]"
                dangerouslySetInnerHTML={{ __html: visionContent }}
              />
            </section>

            {/* Mission */}
            <section className="mt-10 border-t border-gray-200 pt-8 sm:mt-12 sm:pt-10">
              <h2 className="text-xl font-semibold tracking-[0.11em] text-sky-700 sm:text-2xl">
                {missionTitle}
              </h2>
              <div
                className="mt-4 text-sm leading-relaxed text-gray-800 sm:text-[0.95rem]"
                dangerouslySetInnerHTML={{ __html: missionContent }}
              />
            </section>

            {/* Principal Hiring */}
            <section className="mt-10 border-t border-gray-200 pt-8 sm:mt-12 sm:pt-10">
              <h2 className="text-xl font-semibold tracking-[0.11em] text-sky-700 sm:text-2xl">
                {principalTitle}
              </h2>
              <div
                className="mt-4 text-sm leading-relaxed text-gray-800 sm:text-[0.95rem]"
                dangerouslySetInnerHTML={{ __html: principalContent }}
              />
            </section>

            {/* Administration */}
            <section className="mt-10 border-t border-gray-200 pt-8 sm:mt-12 sm:pt-10">
              <h2 className="text-xl font-semibold tracking-[0.11em] text-sky-700 sm:text-2xl">
                {adminTitle}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-800 sm:text-[0.95rem]">
                <span className="font-semibold">{adminPrincipalLabel}</span>{" "}
                {adminPrincipal}
              </p>
              <div
                className="mt-4 text-sm leading-relaxed text-gray-800 sm:text-[0.95rem]"
                dangerouslySetInnerHTML={{ __html: adminInfoText }}
              />
              <div
                className="mt-4 text-sm leading-relaxed text-gray-800 sm:text-[0.95rem]"
                dangerouslySetInnerHTML={{ __html: adminNote }}
              />
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


