import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ResourcesHero from "./components/ResourcesHero";
import {
  getResourcesContent,
  ResourcesContent,
  ResourcesContentJson,
  ResourcesSectionConfig,
} from "@/lib/resources.service";
import { getHomeHeroData } from "@/lib/hero-utils";

// Icon components for visual enhancement
const SpeakerIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  </svg>
);

const VisitIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const GuideIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const PrayerIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SchoolIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M12 14l9-5-9-5-9 5 9 5z" />
    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v9M4.5 4.5h15" />
  </svg>
);

const ElectionIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const MembershipIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const PolicyIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const MinutesIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const FinancialIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const DoorIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

type ResourceSection = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType;
  category: string;
  href?: string;
};

const resourcesSections: ResourceSection[] = [
  {
    id: "request-speaker",
    title: "Request a Speaker",
    description:
      "Invite a qualified speaker from Fort Dodge Islamic Center for your school, organization, or community event. Share basic details about the audience, topic, and preferred date so we can best accommodate your request.",
    icon: SpeakerIcon,
    category: "requests",
  },
  {
    id: "request-visit",
    title: "Request a Visit",
    description:
      "Plan a guided visit to our center for classes, faith groups, or community organizations. We offer tours of the prayer area, a short presentation on Islam, and time for Q&A, tailored to your group's needs.",
    icon: VisitIcon,
    category: "requests",
  },
  {
    id: "visitors-guide",
    title: "Visitors Guide",
    description:
      "Learn what to expect when visiting the masjid for the first time, including dress guidelines, prayer times, etiquette in the prayer hall, and tips for school and community groups.",
    icon: GuideIcon,
    category: "information",
  },
  {
    id: "islamic-prayer",
    title: "Islamic Prayer",
    description:
      "Overview of the daily prayers, how they are performed, and how visitors can respectfully observe. This section can link to printable guides, videos, or recommended beginner resources.",
    icon: PrayerIcon,
    category: "information",
  },
  {
    id: "islamic-school",
    title: "Islamic School",
    description:
      "Information about our weekend or full-time Islamic school programs, class times, curriculum focus, and how to enroll your child or volunteer as a teacher or helper.",
    icon: SchoolIcon,
    category: "programs",
  },
  {
    id: "elections-nominations",
    title: "Elections & Nominations",
    description:
      "Details on community leadership elections, eligibility requirements, the nomination process, and important dates for upcoming elections at the center.",
    icon: ElectionIcon,
    category: "governance",
  },
  {
    id: "apply-renew-membership",
    title: "Apply/Renew Membership",
    description:
      "Become a member or renew your membership with Fort Dodge Islamic Center. Membership helps support our operations and may grant voting rights and other member benefits.",
    icon: MembershipIcon,
    category: "membership",
  },
  {
    id: "by-laws",
    title: "By Laws",
    description:
      "Access the governing by-laws of Fort Dodge Islamic Center, including organizational structure, board responsibilities, and membership guidelines.",
    icon: DocumentIcon,
    category: "governance",
  },
  {
    id: "fundraising-policy",
    title: "Fundraising Policy",
    description:
      "Review our policies for fundraising and solicitation at the masjid, including how to request approval for campaigns and what is and is not permitted on site.",
    icon: PolicyIcon,
    category: "governance",
  },
  {
    id: "meeting-minutes",
    title: "Meeting Minutes",
    description:
      "Browse archived minutes from board and general body meetings so community members can stay informed about key decisions and ongoing initiatives.",
    icon: MinutesIcon,
    category: "governance",
  },
  {
    id: "financial-assistance",
    title: "Financial Assistance",
    description:
      "Learn about local zakat and sadaqah assistance programs, eligibility criteria, and how to confidentially request financial support.",
    icon: FinancialIcon,
    category: "services",
  },
  {
    id: "request-door-access",
    title: "Request Door Access",
    description:
      "Submit a request for electronic door access (key fob or code) for approved volunteers, teachers, and regular attendees, subject to center policies.",
    icon: DoorIcon,
    category: "requests",
  },
  {
    id: "reserve-basement",
    title: "Reserve Basement",
    description:
      "Request use of the basement or social hall for classes, meetings, or small events. Include your event type, expected attendance, and preferred dates.",
    icon: CalendarIcon,
    category: "requests",
  },
];

export const dynamic = "force-dynamic";

import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Resources",
  description:
    "Central hub for visitor information, community policies, membership, facility requests, Islamic school, prayer guidance, and other resources at Fort Dodge Islamic Center.",
  path: "/resources",
  keywords: [
    "Fort Dodge Islamic Center resources",
    "visitor information",
    "membership application",
    "Islamic school",
    "prayer guidance",
    "community policies",
    "facility requests",
  ],
});

function getSections(resources: ResourcesContent | null): ResourcesContentJson {
  const root = (resources?.data ?? {}) as ResourcesContentJson;

  if (root.data && typeof root.data === "object") {
    return root.data as ResourcesContentJson;
  }

  return root;
}

export default async function ResourcesPage() {
  const resources = await getResourcesContent();
  const homeHeroData = await getHomeHeroData();
  const sections = getSections(resources);

  const mainContentConfig = sections.mainContent ?? null;

  const mainContentData = (mainContentConfig?.data ?? null) as any;

  // Map kebab-case section IDs to camelCase database keys
  const sectionKeyMap: Record<string, string> = {
    "request-speaker": "requestSpeaker",
    "request-visit": "requestVisit",
    "visitors-guide": "visitorsGuide",
    "islamic-prayer": "islamicPrayer",
    "islamic-school": "islamicSchool",
    "elections-nominations": "electionsNominations",
    "apply-renew-membership": "applyRenewMembership",
    "by-laws": "byLaws",
    "fundraising-policy": "fundraisingPolicy",
    "meeting-minutes": "meetingMinutes",
    "financial-assistance": "financialAssistance",
    "request-door-access": "requestDoorAccess",
    "reserve-basement": "reserveBasement",
  };

  // Get dynamic data for each resource section
  const getSectionData = (sectionId: string) => {
    const camelCaseKey = sectionKeyMap[sectionId];
    if (!camelCaseKey) return null;
    
    const config = (sections[camelCaseKey as keyof ResourcesContentJson] ?? null) as ResourcesSectionConfig | null;
    return (config?.data ?? null) as any;
  };

  // Map section IDs to their data
  const sectionDataMap: Record<string, any> = {};
  Object.keys(sectionKeyMap).forEach((sectionId) => {
    sectionDataMap[sectionId] = getSectionData(sectionId);
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <main className="bg-transparent">
        <ResourcesHero data={homeHeroData} />

        <section className="bg-transparent">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
            <header className="mb-12 text-center sm:mb-16">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
                {mainContentData?.["content-subtitle"] ||
                  mainContentData?.subtitle ||
                  "Community Resources"}
              </p>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                {mainContentData?.["content-title"] ||
                  mainContentData?.title ||
                  "Helpful information, forms, and policies in one place"}
              </h1>
              {mainContentData?.["content-description"] ||
                mainContentData?.description ? (
                <div
                  className="mt-5 max-w-3xl mx-auto text-base leading-relaxed text-gray-600 sm:text-lg prose prose-gray max-w-none"
                  dangerouslySetInnerHTML={{
                    __html:
                      mainContentData?.["content-description"] ||
                      mainContentData?.description ||
                      "",
                  }}
                />
              ) : (
                <p className="mt-5 max-w-3xl mx-auto text-base leading-relaxed text-gray-600 sm:text-lg">
                  Use the cards below to find visitor information, request speakers or visits,
                  review policies, and access other important documents from Fort Dodge Islamic Center
                  Islamic Center.
                </p>
              )}
            </header>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {resourcesSections.map((section) => {
                const Icon = section.icon;
                const sectionData = sectionDataMap[section.id];
                const title =
                  sectionData?.title || section.title;
                const description =
                  sectionData?.description || section.description;

                const content = (
                  <article
                    key={section.id}
                    id={section.id}
                    className="group relative scroll-mt-32 h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl sm:p-7"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-50 to-blue-50 text-sky-600 transition-colors group-hover:from-sky-100 group-hover:to-blue-100 group-hover:text-sky-700">
                          <Icon />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl group-hover:text-sky-700 transition-colors">
                          {title}
                        </h2>
                        {description ? (
                          <div
                            className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: description }}
                          />
                        ) : (
                          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                            {section.description}
                          </p>
                        )}
                      </div>
                    </div>
                    {section.href && (
                      <div className="mt-5 flex items-center text-sm font-medium text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Learn more</span>
                        <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </article>
                );

                return section.href ? (
                  <Link key={section.id} href={section.href} className="block h-full">
                    {content}
                  </Link>
                ) : (
                  content
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

