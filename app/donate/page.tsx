import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import DonationHero from "./components/DonationHero";
import DonationIntro from "./components/DonationIntro";
import NeedForDonations from "./components/NeedForDonations";
import DonationOptions from "./components/DonationOptions";
import DonationSection from "@/app/components/DonationSection";
import {
  getDonateContent,
  DonateContent,
  DonateContentJson,
} from "@/lib/donate.service";
import { getHomeHeroData } from "@/lib/hero-utils";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = generateSEOMetadata({
  title: "Donate",
  description:
    "Support Fort Dodge Islamic Center through donations. Accepting donations via donation box, checks, MOHID kiosk, MOHID online, Venmo, PayPal, and direct bank transfer. Your contributions help maintain our facilities and programs.",
  path: "/donate",
  keywords: [
    "donate to Fort Dodge Islamic Center",
    "Islamic center donations",
    "zakats",
    "sadaqah",
    "charity Fort Dodge",
    "Muslim donations",
    "support Islamic center",
  ],
});

function getSections(donate: DonateContent | null): DonateContentJson {
  const root = (donate?.data ?? {}) as DonateContentJson;

  // If there's a nested `data` object, that's where sections live.
  if (root.data && typeof root.data === "object") {
    return root.data as DonateContentJson;
  }

  // Otherwise, assume flat shape.
  return root;
}

export default async function DonatePage() {
  const donate = await getDonateContent();
  const homeHeroData = await getHomeHeroData();
  const sections = getSections(donate);

  const introConfig = sections.intro ?? null;
  // Use need_for_donations as the primary key
  const needConfig = (sections as any).need_for_donations ?? sections.need ?? null;
  const optionsConfig = sections.options ?? null;
  const closingConfig = sections.closing ?? null;
  const giveTodayConfig = sections.giveToday ?? null;

  const introData = (introConfig?.data ?? null) as any;
  const needData = (needConfig?.data ?? null) as any;
  const optionsData = (optionsConfig?.data ?? null) as any;
  const closingData = (closingConfig?.data ?? null) as any;
  const giveTodayData = (giveTodayConfig?.data ?? null) as any;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <DonationHero data={homeHeroData} />
      <main className="mx-auto w-full max-w-5xl space-y-8 px-4 py-10 sm:space-y-10 sm:px-6 lg:space-y-12 lg:px-8 lg:py-14">
        <DonationIntro data={introData} />
        <NeedForDonations data={needData} />
        <DonationOptions data={optionsData} />
        {closingData?.["closing-content"] && (
          <section className="rounded-3xl bg-white p-8 shadow-lg shadow-slate-200/70 ring-1 ring-slate-100">
            <div
              className="text-base text-slate-600"
              // Render HTML from the admin rich text editor
              dangerouslySetInnerHTML={{ __html: closingData["closing-content"] }}
            />
          </section>
        )}
        <DonationSection 
          data={giveTodayData ? {
            subtitle: giveTodayData["give-subtitle"] || giveTodayData.giveSubtitle || undefined,
            title: giveTodayData["give-title"] || giveTodayData.giveTitle || undefined,
            description: giveTodayData["give-description"] || giveTodayData.giveDescription || undefined,
            qrCodeImage: giveTodayData["qr-image"] || giveTodayData.qrImage || undefined,
            paymentLinks: Array.isArray(giveTodayData["quick-links"]) 
              ? giveTodayData["quick-links"].map((link: any) => ({
                  label: link.label || "",
                  href: link.href || "",
                  accent: "text-sky-600"
                }))
              : (Array.isArray(giveTodayData.quickLinks)
                  ? giveTodayData.quickLinks.map((link: any) => ({
                      label: link.label || "",
                      href: link.href || "",
                      accent: "text-sky-600"
                    }))
                  : undefined)
          } : undefined}
        />
      </main>
      <Footer />
    </div>
  );
}


