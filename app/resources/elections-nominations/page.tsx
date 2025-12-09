import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ResourcesHero from "../components/ResourcesHero";
import {
  getElectionNominationContent,
  type ElectionNominationContent,
  type ElectionNominationContentJson,
} from "@/lib/election-nomination.service";
import { getHomeHeroData } from "@/lib/hero-utils";

import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Elections & Nominations",
  description:
    "Information about the DAIC Board of Directors election, nomination process, membership requirements, and ways to renew your membership at Fort Dodge Islamic Center.",
  path: "/resources/elections-nominations",
  keywords: [
    "board of directors election",
    "nomination process",
    "membership renewal",
    "voting eligibility",
    "community elections",
  ],
});

function getSections(
  electionNomination: ElectionNominationContent | null
): ElectionNominationContentJson {
  if (!electionNomination?.data) {
    return {};
  }

  const data = electionNomination.data;
  // Support both shapes: flat and nested
  return (data.data && typeof data.data === "object"
    ? data
    : data) as ElectionNominationContentJson;
}

export default async function ElectionsNominationsPage() {
  const electionNomination = await getElectionNominationContent();
  const homeHeroData = await getHomeHeroData();
  const sections = getSections(electionNomination);

  const electionConfig = sections.election || sections.data?.election;
  const membershipConfig = sections.membership || sections.data?.membership;
  const questionsConfig = sections.questions || sections.data?.questions;

  const electionData = electionConfig?.data as any;
  const membershipData = membershipConfig?.data as any;
  const questionsData = questionsConfig?.data as any;

  // Election section
  const electionTitle =
    electionData?.["election-title"] || electionData?.electionTitle || "DAIC Board of Directors Election";
  const electionIntro =
    electionData?.["election-intro"] ||
    electionData?.electionIntro ||
    "The DAIC Board of Directors Election will be held on Sunday, September 28th 2025 after Dhuhr Prayer. Nomination forms are available on the DAIC bulletin boards and via the link below:";
  const nominationFormLink =
    electionData?.["nomination-form-link"] ||
    electionData?.nominationFormLink ||
    "/files/board-of-directors-nomination-form.pdf";
  const nominationFormLabel =
    electionData?.["nomination-form-label"] ||
    electionData?.nominationFormLabel ||
    "Board of Directors Nomination Form";
  const nominationDeadline =
    electionData?.["nomination-deadline"] ||
    electionData?.nominationDeadline ||
    "If you would like to nominate someone, please complete the appropriate form, and submit it by Isha prayer on Friday, September 26th.";

  // Membership section
  const membershipTitle =
    membershipData?.["membership-title"] ||
    membershipData?.membershipTitle ||
    "MEMBERSHIP & VOTING";
  const membershipIntro =
    membershipData?.["membership-intro"] ||
    membershipData?.membershipIntro ||
    "To vote in the upcoming election you must be a DAIC member. The membership dues are $30 per person for a one-year membership. You can renew your membership in one of the following ways:";
  
  const defaultMembershipMethods = [
    { method: "Donation Box", description: "Drop off an envelope in the Islamic Center Donation Box with your NAME and \"MEMBERSHIP\" written on the envelope." },
    { method: "Mohid Kiosk", description: "Select the Membership option on the kiosk and follow the instructions." },
    { method: "Online", description: "Membership dues can also be paid through the Islamic Center website. To pay dues online go to www.arqum.org and press the donate button, then choose DAIC Membership in the category and follow the instructions.", link: "https://www.arqum.org" },
  ];

  const membershipMethodsRaw = membershipData?.["membership-methods"] || membershipData?.membershipMethods;
  const membershipMethodsArray: any[] = Array.isArray(membershipMethodsRaw)
    ? membershipMethodsRaw
    : defaultMembershipMethods;
  const membershipMethods = membershipMethodsArray.map((item: any) => {
    if (typeof item === "object" && item !== null) {
      return {
        method: item.method || "",
        description: item.description || "",
        link: item.link || "",
      };
    }
    return { method: "", description: String(item || ""), link: "" };
  });

  // Questions section
  const questionsTitle =
    questionsData?.["questions-title"] ||
    questionsData?.questionsTitle ||
    "QUESTIONS";
  const questionsContent =
    questionsData?.["questions-content"] ||
    questionsData?.questionsContent ||
    "For any further questions contact DAIC Treasurer at treasurer@arqum.org.";
  const treasurerEmail =
    questionsData?.["treasurer-email"] ||
    questionsData?.treasurerEmail ||
    "treasurer@arqum.org";

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
            {/* Election Section */}
            <section className="rounded-3xl border border-gray-200 bg-zinc-50/60 px-5 py-5 sm:px-7 sm:py-6 shadow-sm">
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                {electionTitle}
              </h1>
              <div
                className="mt-3 text-sm leading-relaxed text-gray-800 sm:text-[0.95rem]"
                dangerouslySetInnerHTML={{ __html: electionIntro }}
              />
              {nominationFormLink && nominationFormLabel && (
                <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-relaxed text-gray-800 sm:text-[0.95rem]">
                  <li>
                    <a
                      href={nominationFormLink}
                      className="font-medium text-sky-700 underline underline-offset-2"
                    >
                      {nominationFormLabel}
                    </a>
                  </li>
                </ul>
              )}
              <div
                className="mt-4 text-sm leading-relaxed text-gray-800 sm:text-[0.95rem]"
                dangerouslySetInnerHTML={{ __html: nominationDeadline }}
              />
            </section>

            {/* Membership & Voting Section */}
            <section className="mt-10 border-t border-gray-200 pt-8 sm:mt-12 sm:pt-10">
              <h2 className="text-xl font-semibold tracking-[0.11em] text-sky-700 sm:text-2xl">
                {membershipTitle}
              </h2>
              <div
                className="mt-4 text-sm leading-relaxed text-gray-800 sm:text-[0.95rem]"
                dangerouslySetInnerHTML={{ __html: membershipIntro }}
              />
              <ul className="mt-4 list-disc space-y-3 pl-6 text-sm leading-relaxed text-gray-800 sm:text-[0.95rem]">
                {membershipMethods.map((item, index) => (
                  <li key={index}>
                    {item.method && (
                      <span className="font-semibold">{item.method}:</span>
                    )}{" "}
                    {item.description}
                    {item.link && (
                      <>
                        {" "}
                        <a
                          href={item.link}
                          className="font-medium text-sky-700 underline underline-offset-2"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item.link.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                        </a>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            {/* Questions Section */}
            <section className="mt-10 border-t border-gray-200 pt-8 sm:mt-12 sm:pt-10">
              <h2 className="text-xl font-semibold tracking-[0.11em] text-sky-700 sm:text-2xl">
                {questionsTitle}
              </h2>
              <div
                className="mt-4 text-sm leading-relaxed text-gray-800 sm:text-[0.95rem]"
                dangerouslySetInnerHTML={{ __html: questionsContent }}
              />
              {treasurerEmail && (
                <p className="mt-4 text-sm leading-relaxed text-gray-800 sm:text-[0.95rem]">
                  For any further questions contact DAIC Treasurer at{" "}
                  <a
                    href={`mailto:${treasurerEmail}`}
                    className="font-medium text-sky-700 underline underline-offset-2"
                  >
                    {treasurerEmail}
                  </a>
                  .
                </p>
              )}
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


