import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ResourcesHero from "../components/ResourcesHero";
import { getRequestVisitContent, RequestVisitContent } from "@/lib/request-visit.service";
import { getHomeHeroData } from "@/lib/hero-utils";

import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Request a Visit",
  description:
    "Schedule a visit to Fort Dodge Islamic Center for your school, college, faith group, or community organization. Tour our facilities, learn about Islam, and participate in Q&A sessions.",
  path: "/resources/request-a-visit",
  keywords: [
    "visit Islamic center",
    "mosque tour",
    "school field trip",
    "Islamic center visit",
    "learn about Islam",
    "community visit",
  ],
});

type RequestVisitContentJson = {
  page?: string;
  hero?: { enabled?: boolean | null; data?: any | null };
  content?: { enabled?: boolean | null; data?: any | null };
  data?: {
    hero?: { enabled?: boolean | null; data?: any | null };
    content?: { enabled?: boolean | null; data?: any | null };
    [key: string]: unknown;
  } | null;
  [key: string]: unknown;
};

function getSections(requestVisit: RequestVisitContent | null): RequestVisitContentJson {
  if (!requestVisit?.data) {
    return {};
  }
  const data = requestVisit.data;
  // Support both shapes: flat and nested
  return (data.data && typeof data.data === "object" ? data : data) as RequestVisitContentJson;
}

export default async function RequestVisitPage() {
  const requestVisit = await getRequestVisitContent();
  const homeHeroData = await getHomeHeroData();
  const sections = getSections(requestVisit);

  const contentConfig = sections.content || sections.data?.content;

  const contentData = contentConfig?.data as any;
  const greeting = contentData?.greeting || "Peace!";
  const introParagraph = contentData?.["intro-paragraph"] || contentData?.introParagraph || "The members of Fort Dodge Islamic Center are available to present programs to you, your school or college, church or faith group, or civil organization about Islam. We hope that our programs about Islam and Muslims will be informative, build understanding, correct misconceptions, and promote tolerance and diversity within the community.";
  const programsParagraph = contentData?.["programs-paragraph"] || contentData?.programsParagraph || "Members of the Public Relations Committee would be happy to speak with you about several types of programs about Islam we can present to you. A wide variety of program subjects are available, including Islam as it relates to history, political science, social studies, world religions, or any other relevant subject headings.";
  const visitParagraph = contentData?.["visit-paragraph"] || contentData?.visitParagraph || "In an attempt to be informative about Islamic religious beliefs and practices, we are also happy to host individuals and groups at Fort Dodge Islamic Center. Should you be interested in visiting our mosque, please contact us to schedule your visit.";
  const contactParagraph = contentData?.["contact-paragraph"] || contentData?.contactParagraph || "Please contact us or email us at <a href=\"mailto:info@arqum.org\" class=\"font-semibold text-sky-700 underline underline-offset-2\">info@arqum.org</a>. You can also leave a message at (515) 292-3683. We will contact you as soon as possible to work out the details.";
  const closingParagraph = contentData?.["closing-paragraph"] || contentData?.closingParagraph || "In addition, we would appreciate receiving notification of any events in your organization where our participation would be appropriate. Our members represent a wide range of diverse regions and cultures in the world and contribute to the wonderful diversity of Ames and the surrounding communities.";
  const thankYou = contentData?.["thank-you"] || contentData?.thankYou || "Thank you,";
  const signature = contentData?.signature || "Public Relations Committee";
  const organization = contentData?.organization || "Fort Dodge Islamic Center";
  const emailLabel = contentData?.["email-label"] || contentData?.emailLabel || "Email:";
  const email = contentData?.email || "info@arqum.org";

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="bg-white">
        {/* Hero image from home page */}
        <ResourcesHero 
          data={homeHeroData}
        />

        {/* Content */}
        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
            <div className="prose prose-sm max-w-none text-gray-800 sm:prose-base">
              <p>{greeting}</p>

              <div
                className="text-base leading-relaxed text-gray-800"
                dangerouslySetInnerHTML={{ __html: introParagraph }}
              />

              <div
                className="text-base leading-relaxed text-gray-800"
                dangerouslySetInnerHTML={{ __html: programsParagraph }}
              />

              <div
                className="text-base leading-relaxed text-gray-800"
                dangerouslySetInnerHTML={{ __html: visitParagraph }}
              />

              <div
                className="text-base leading-relaxed text-gray-800"
                dangerouslySetInnerHTML={{ __html: contactParagraph }}
              />

              <div
                className="text-base leading-relaxed text-gray-800"
                dangerouslySetInnerHTML={{ __html: closingParagraph }}
              />

              <p>{thankYou}</p>

              <p className="mt-4">
                {signature && (
                  <>
                    {signature}
                    <br />
                  </>
                )}
                {organization && (
                  <>
                    {organization}
                    <br />
                  </>
                )}
                {emailLabel && email && (
                  <>
                    {emailLabel}{" "}
                    <a
                      href={`mailto:${email}`}
                      className="break-all font-semibold text-sky-700 underline underline-offset-2"
                    >
                      {email}
                    </a>
                  </>
                )}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
