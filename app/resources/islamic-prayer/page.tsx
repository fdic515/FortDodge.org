import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ResourcesHero from "../components/ResourcesHero";
import {
  getIslamicPrayerContent,
  type IslamicPrayerContent,
  type IslamicPrayerContentJson,
} from "@/lib/islamic-prayer.service";
import { getHomeHeroData } from "@/lib/hero-utils";

import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Islamic Prayer",
  description:
    "Learn about the daily salah (Islamic prayer) - what is recited while standing, bowing, prostrating, and sitting. A guide to understanding Muslim prayer practices at Fort Dodge Islamic Center.",
  path: "/resources/islamic-prayer",
  keywords: [
    "Islamic prayer",
    "salah",
    "Muslim prayer guide",
    "how Muslims pray",
    "prayer postures",
    "Quran recitation in prayer",
  ],
});

function getSections(
  islamicPrayer: IslamicPrayerContent | null
): IslamicPrayerContentJson {
  if (!islamicPrayer?.data) {
    return {};
  }

  const data = islamicPrayer.data;
  // Support both shapes: flat and nested
  return (data.data && typeof data.data === "object"
    ? data
    : data) as IslamicPrayerContentJson;
}

export default async function IslamicPrayerPage() {
  const islamicPrayer = await getIslamicPrayerContent();
  const homeHeroData = await getHomeHeroData();
  const sections = getSections(islamicPrayer);

  const introConfig = sections.intro || sections.data?.intro;
  const standingConfig = sections.standing || sections.data?.standing;
  const bowingConfig = sections.bowing || sections.data?.bowing;
  const prostratingConfig = sections.prostrating || sections.data?.prostrating;
  const sittingConfig = sections.sitting || sections.data?.sitting;

  const introData = introConfig?.data as any;
  const standingData = standingConfig?.data as any;
  const bowingData = bowingConfig?.data as any;
  const prostratingData = prostratingConfig?.data as any;
  const sittingData = sittingConfig?.data as any;

  // Intro content
  const introContent =
    introData?.["intro-content"] ||
    introData?.introContent ||
    "Muslims pray five times a day. The salah (Arabic word for prayer) generally lasts five to ten minutes and is led by the Imam. He leads the congregation from the front and faces towards the direction of Makkah, as does the rest of the congregation. The congregation will form straight lines and act in unison during the entire prayer and follow the motions of the Imam. Here are translations to what's being said during salah:";

  // Standing section
  const standingTitle = standingData?.["standing-title"] || standingData?.standingTitle || "WHILE STANDING";
  const standingIntro = standingData?.["standing-intro"] || standingData?.standingIntro || "While standing, the first chapter of the Quran is recited. This chapter can be translated as follows:";
  const standingQuote = standingData?.["standing-quote"] || standingData?.standingQuote || "\"In the name of Allah, Most Gracious, Most Merciful. Praise be to Allah, Lord of the Worlds. Most Gracious, Most Merciful. Master of the Day of Judgment. Thee (alone) we worship and Thee (alone) we ask for help. Show us the straight path. The path of those whom Thou hast favoured; Not (the path) of those who earn Thine anger nor of those who go astray.\" (1:1-7)";
  const standingOutro = standingData?.["standing-outro"] || standingData?.standingOutro || "After the first chapter, any other passage from the Quran is recited. Depending on the time (and type) of the prayers, some recitations are done silently.";

  // Bowing section
  const bowingTitle = bowingData?.["bowing-title"] || bowingData?.bowingTitle || "WHILE BOWING";
  const bowingContent = bowingData?.["bowing-content"] || bowingData?.bowingContent || "Muslims then bow to God and glorify Him. This glorification can be translated as follows: \"Glory be to my Lord, the Almighty.\"";

  // Prostrating section
  const prostratingTitle = prostratingData?.["prostrating-title"] || prostratingData?.prostratingTitle || "WHILE PROSTRATING";
  const prostratingQuote = prostratingData?.["prostrating-quote"] || prostratingData?.prostratingQuote || "\"Glory be to my Lord, the most High.\"";
  const prostratingContent = prostratingData?.["prostrating-content"] || prostratingData?.prostratingContent || "Muslims then sit for a few seconds and prostrate one more time before standing up again. Depending on the time (and type) of the prayer, Muslims repeat this cycle once, twice or thrice in each prayer.";

  // Sitting section
  const sittingTitle = sittingData?.["sitting-title"] || sittingData?.sittingTitle || "WHILE SITTING";
  const sittingIntro = sittingData?.["sitting-intro"] || sittingData?.sittingIntro || "In the end (and also in the middle for some prayers) Muslims sit and testify before God that:";
  const sittingQuote = sittingData?.["sitting-quote"] || sittingData?.sittingQuote || "\"All service is for Allah and all acts of worship and good deeds are for Him. Peace and the mercy and blessings of Allah be upon you O Prophet. Peace be upon us and all of Allah's righteous slaves. I bear witness that none has the right to be worshipped except Allah and I bear witness that Muhammad is His slave and Messenger. O Allah exalt Muhammad and the followers of Muhammad, just as you exalted Abraham and the followers of Abraham. Verily you are full of praise and majesty. O Allah send blessings on Muhammad and the family of Muhammad, just as you sent blessings on Abraham and upon the followers of Abraham. Verily you are full of praise and majesty.\"";
  const sittingOutro = sittingData?.["sitting-outro"] || sittingData?.sittingOutro || "At the very end, Muslims turn their face to the right and the left, sending God's Peace on the angels surrounding them, saying: \"Peace be upon you and the mercy of Allah\"";

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

            {/* Standing */}
            <section className="mt-10 border-t border-gray-200 pt-8 sm:mt-12 sm:pt-10">
              <h1 className="text-xl font-semibold tracking-[0.11em] text-sky-700 sm:text-2xl">
                {standingTitle}
              </h1>
              <div
                className="mt-4 text-sm leading-relaxed text-gray-800 sm:text-[0.95rem]"
                dangerouslySetInnerHTML={{ __html: standingIntro }}
              />
              <div
                className="mt-4 text-center text-sm italic leading-relaxed text-gray-800 sm:text-[0.95rem]"
                dangerouslySetInnerHTML={{ __html: standingQuote }}
              />
              <div
                className="mt-4 text-sm leading-relaxed text-gray-800 sm:text-[0.95rem]"
                dangerouslySetInnerHTML={{ __html: standingOutro }}
              />
            </section>

            {/* Bowing */}
            <section className="mt-10 border-t border-gray-200 pt-8 sm:mt-12 sm:pt-10">
              <h2 className="text-xl font-semibold tracking-[0.11em] text-sky-700 sm:text-2xl">
                {bowingTitle}
              </h2>
              <div
                className="mt-4 text-sm leading-relaxed text-gray-800 sm:text-[0.95rem]"
                dangerouslySetInnerHTML={{ __html: bowingContent }}
              />
            </section>

            {/* Prostrating */}
            <section className="mt-10 border-t border-gray-200 pt-8 sm:mt-12 sm:pt-10">
              <h2 className="text-xl font-semibold tracking-[0.11em] text-sky-700 sm:text-2xl">
                {prostratingTitle}
              </h2>
              <div
                className="mt-4 text-sm leading-relaxed text-gray-800 sm:text-[0.95rem]"
                dangerouslySetInnerHTML={{ __html: prostratingQuote }}
              />
              <div
                className="mt-4 text-sm leading-relaxed text-gray-800 sm:text-[0.95rem]"
                dangerouslySetInnerHTML={{ __html: prostratingContent }}
              />
            </section>

            {/* Sitting */}
            <section className="mt-10 border-t border-gray-200 pt-8 sm:mt-12 sm:pt-10">
              <h2 className="text-xl font-semibold tracking-[0.11em] text-sky-700 sm:text-2xl">
                {sittingTitle}
              </h2>
              <div
                className="mt-4 text-sm leading-relaxed text-gray-800 sm:text-[0.95rem]"
                dangerouslySetInnerHTML={{ __html: sittingIntro }}
              />
              <div
                className="mt-4 text-center text-sm italic leading-relaxed text-gray-800 sm:text-[0.95rem]"
                dangerouslySetInnerHTML={{ __html: sittingQuote }}
              />
              <div
                className="mt-4 text-sm leading-relaxed text-gray-800 sm:text-[0.95rem]"
                dangerouslySetInnerHTML={{ __html: sittingOutro }}
              />
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
