import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ResourcesHero from "../components/ResourcesHero";
import {
  getVisitorGuideContent,
  type VisitorGuideContent,
  type VisitorGuideContentJson,
} from "@/lib/visitor-guide.service";
import { getHomeHeroData } from "@/lib/hero-utils";

import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Visitors Guide",
  description:
    "Complete visitor guide for Fort Dodge Islamic Center. Learn about dress code, entering the center, prayer hall etiquette, and what to expect during your visit.",
  path: "/resources/visitors-guide",
  keywords: [
    "visitor guide",
    "mosque etiquette",
    "visiting Islamic center",
    "dress code for mosque",
    "prayer hall guidelines",
    "first time visiting mosque",
  ],
});

function getSections(
  visitorGuide: VisitorGuideContent | null
): VisitorGuideContentJson {
  if (!visitorGuide?.data) {
    return {};
  }

  const data = visitorGuide.data;
  // Support both shapes: flat and nested
  return (data.data && typeof data.data === "object"
    ? data
    : data) as VisitorGuideContentJson;
}

export default async function VisitorsGuidePage() {
  const visitorGuide = await getVisitorGuideContent();
  const homeHeroData = await getHomeHeroData();
  const sections = getSections(visitorGuide);

  const introConfig = sections.intro || sections.data?.intro;
  const dressCodeConfig = sections.dressCode || sections.data?.dressCode;
  const enteringCenterConfig =
    sections.enteringCenter || sections.data?.enteringCenter;
  const multipurposeRoomConfig =
    sections.multipurposeRoom || sections.data?.multipurposeRoom;
  const prayerHallConfig = sections.prayerHall || sections.data?.prayerHall;
  const closingConfig = sections.closing || sections.data?.closing;

  const introData = introConfig?.data as any;
  const dressCodeData = dressCodeConfig?.data as any;
  const enteringCenterData = enteringCenterConfig?.data as any;
  const multipurposeRoomData = multipurposeRoomConfig?.data as any;
  const prayerHallData = prayerHallConfig?.data as any;
  const closingData = closingConfig?.data as any;

  // Intro content
  const introContent =
    introData?.["intro-content"] ||
    "Thank you for your interest in visiting Fort Dodge Islamic Center. Our center welcomes all visitors and request that the following guidelines are closely followed:";

  // Dress code
  const defaultDressItems: string[] = [
    "Clothing should be modest for both men and women. This means an ankle length skirt or trousers, which should not be tight fitting or translucent, together with a long sleeved and high-necked top. A headscarf (of any color) is encouraged for women.",
    "Before entering the prayer hall one must remove any footwear and place it on a rack. Clean and presentable socks, stockings, or tights are therefore a good idea.",
  ];

  const dressTitle = dressCodeData?.["dress-title"] || "DRESS CODE";
  const dressItemsRaw = dressCodeData?.["dress-items"];
  const dressItemsArray: any[] = Array.isArray(dressItemsRaw)
    ? dressItemsRaw
    : defaultDressItems.map((text) => ({ text }));
  const dressItems: string[] = dressItemsArray
    .map((item) =>
      typeof item === "string" ? item : item?.text || ""
    )
    .filter((item) => item.trim().length > 0);

  // Entering center
  const defaultEnteringItems: string[] = [
    'Visitors may be greeted by the Arabic greeting "As-salam Alaikum" which means "peace be upon you." The answer, if the visitor chooses to use it, is "Wa alaikum-as-salam", which means "peace be upon you too".',
    "Do not offer, or expect, to shake hands with people of the opposite sex.",
    "Before entering the prayer hall or prayer room, Muslim men and women perform wudhu or cleansing ablutions if they have not already done so earlier or from home. This is not necessary for non-Muslim visitors who do not join in the prayer.",
  ];

  const enteringTitle =
    enteringCenterData?.["entering-title"] || "ENTERING THE CENTER";
  const enteringItemsRaw = enteringCenterData?.["entering-items"];
  const enteringItemsArray: any[] = Array.isArray(enteringItemsRaw)
    ? enteringItemsRaw
    : defaultEnteringItems.map((text) => ({ text }));
  const enteringItems: string[] = enteringItemsArray
    .map((item) =>
      typeof item === "string" ? item : item?.text || ""
    )
    .filter((item) => item.trim().length > 0);

  // Multipurpose room
  const multipurposeTitle =
    multipurposeRoomData?.["multipurpose-title"] || "THE MULTIPURPOSE ROOM";
  const multipurposeContent =
    multipurposeRoomData?.["multipurpose-content"] ||
    "There are multipurpose rooms in Fort Dodge Islamic Center in which community gatherings and meetings take place. Visitors are welcomed in one of these rooms before being escorted to the Prayer Halls.";

  // Prayer hall
  const defaultPrayerItems: string[] = [
    "Before you enter the prayer hall, ensure that your phone is turned on silent, your footwear is removed, and all food and drink items (if any) have been stored or discarded.",
    "Enter the prayer hall quietly. Muslims sit and pray on the floor in the prayer hall. Chairs are available for visitors in the rear of the prayer hall but you are welcome to sit on the floor as well.",
    "If visiting as a group during a time when prayers are taking place, sit together toward the rear of the hall.",
    "If a visitor arrives when the prayer is in progress, he or she should find a place near the rear wall and quietly observe the prayer.",
    "Muslims do not make sacred offerings or carry out blessing of food during prayer. Additionally, there are no sacred or holy objects in the masjid, except copies of the Quran on bookshelves along the side walls or elsewhere in the prayer hall. Note that Quran copies can only be touched by those who have performed wudhu.",
    "The only gestures expected of visitors are to remove their shoes, act respectfully in the prayer hall and silently observe the ritual of prayer.",
  ];

  const prayerTitle =
    prayerHallData?.["prayer-title"] || "THE PRAYER HALL";
  const prayerItemsRaw = prayerHallData?.["prayer-items"];
  const prayerItemsArray: any[] = Array.isArray(prayerItemsRaw)
    ? prayerItemsRaw
    : defaultPrayerItems.map((text) => ({ text }));
  const prayerItems: string[] = prayerItemsArray
    .map((item) =>
      typeof item === "string" ? item : item?.text || ""
    )
    .filter((item) => item.trim().length > 0);

  // Closing section
  const closingContent =
    closingData?.["closing-content"] ||
    "Thank you once again for your interest in visiting us. If you have any questions or require clarification, please e-mail us at info@arqum.org. We also invite you to write about your visit experience. Enjoy Your Visit.";
  const contactEmail =
    closingData?.["contact-email"] || "info@arqum.org";

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
            <div className="rounded-3xl border border-gray-200 bg-zinc-50/60 px-5 py-5 sm:px-7 sm:py-6 shadow-sm">
              <div
                className="text-sm leading-relaxed text-gray-800 sm:text-[0.95rem]"
                dangerouslySetInnerHTML={{ __html: introContent }}
              />
            </div>

            {/* Dress code */}
            <section className="mt-10 border-t border-gray-200 pt-8 sm:mt-12 sm:pt-10">
              <h1 className="text-xl font-semibold tracking-[0.11em] text-sky-700 sm:text-2xl">
                {dressTitle}
              </h1>
              <ul className="mt-4 list-disc space-y-3 pl-6 text-sm leading-relaxed text-gray-800 sm:text-[0.95rem]">
                {dressItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Entering the center */}
            <section className="mt-10 border-t border-gray-200 pt-8 sm:mt-12 sm:pt-10">
              <h2 className="text-xl font-semibold tracking-[0.11em] text-sky-700 sm:text-2xl">
                {enteringTitle}
              </h2>
              <ul className="mt-4 list-disc space-y-3 pl-6 text-sm leading-relaxed text-gray-800 sm:text-[0.95rem]">
                {enteringItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Multipurpose room */}
            <section className="mt-10 border-t border-gray-200 pt-8 sm:mt-12 sm:pt-10">
              <h2 className="text-xl font-semibold tracking-[0.11em] text-sky-700 sm:text-2xl">
                {multipurposeTitle}
              </h2>
              <div
                className="mt-4 text-sm leading-relaxed text-gray-800 sm:text-[0.95rem]"
                dangerouslySetInnerHTML={{ __html: multipurposeContent }}
              />
            </section>

            {/* Prayer hall */}
            <section className="mt-10 border-t border-gray-200 pt-8 sm:mt-12 sm:pt-10">
              <h2 className="text-xl font-semibold tracking-[0.11em] text-sky-700 sm:text-2xl">
                {prayerTitle}
              </h2>
              <ul className="mt-4 list-disc space-y-3 pl-6 text-sm leading-relaxed text-gray-800 sm:text-[0.95rem]">
                {prayerItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Closing */}
            <div className="mt-12 border-t border-gray-200 pt-8 text-sm leading-relaxed text-gray-800 sm:text-[0.95rem]">
              <div
                dangerouslySetInnerHTML={{ __html: closingContent }}
              />
              {contactEmail && (
                <p className="mt-4">
                  If you have any questions or require clarification, please
                  e-mail us at{" "}
                  <a
                    href={`mailto:${contactEmail}`}
                    className="font-medium text-sky-700 underline underline-offset-2"
                  >
                    {contactEmail}
                  </a>
                  . We also invite you to write about your visit experience. Enjoy Your
                  Visit.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

