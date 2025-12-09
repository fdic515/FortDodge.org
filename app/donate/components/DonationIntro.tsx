type DonationIntroProps = {
  data?: {
    quote?: string | null;
    "quote-reference"?: string | null;
    quoteReference?: string | null;
    "intro-content"?: string | null;
    introContent?: string | null;
  } | null;
};

export default function DonationIntro({ data }: DonationIntroProps) {
  const quote = data?.quote || "Those who give charity night and day, secretly and openly, have their reward with their Lord. They will have no fear, and they will not grieve.";
  const quoteReference = data?.["quote-reference"] || data?.quoteReference || "-Quran 2:274";
  const introContent = data?.["intro-content"] || data?.introContent || "Fort Dodge Islamic Center is a non-profit organization that provides a variety of religious, educational, and social services to the Muslim community in Ames, Iowa. The center is a vital part of the community, relying on donations from generous individuals and businesses to operate.";

  return (
    <section className="space-y-6 rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/70 ring-1 ring-slate-100 sm:p-8">
      <blockquote className="text-center text-base font-medium italic text-slate-700 sm:text-lg">
        {quote}
        <span className="mt-2 block text-xs font-semibold text-sky-700 sm:text-sm">
          {quoteReference}
        </span>
      </blockquote>
      {introContent && (
        <div
          className="text-sm leading-relaxed text-slate-600 sm:text-base"
          // Render HTML from the admin rich text editor
          dangerouslySetInnerHTML={{ __html: introContent }}
        />
      )}
    </section>
  );
}


