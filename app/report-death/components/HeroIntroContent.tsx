type HeroIntroContentProps = {
  data?: {
    "intro-subtitle"?: string;
    "intro-title"?: string;
    "intro-quote"?: string;
    "intro-quote-reference"?: string;
    "intro-content"?: string;
    subtitle?: string;
    title?: string;
    quote?: string;
    quoteReference?: string;
    content?: string;
  } | null;
};

export default function HeroIntroContent({ data }: HeroIntroContentProps) {
  const subtitle =
    data?.["intro-subtitle"] ||
    data?.subtitle ||
    "Fort Dodge Islamic Center";
  const title =
    data?.["intro-title"] || data?.title || "Report a Death";
  const quoteText =
    data?.["intro-quote"] ||
    data?.quote ||
    "Every soul will taste death, and you will only be given your (full) compensation on the Day of Resurrection. So the one who is drawn away from the Fire and admitted to Paradise has attained (his desire); and what is the life of this world except the enjoyment of delusion.";
  const quoteRef =
    data?.["intro-quote-reference"] ||
    data?.quoteReference ||
    "Quran 3:185";
  const introContent =
    data?.["intro-content"] ||
    data?.content ||
    "It is requested that Muslims become familiar with these issues at all times since death can approach anyone at any given time or place.";

  return (
    <section className="bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-xl backdrop-blur">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
            {subtitle}
          </p>
          <h1 className="mt-4 text-3xl font-bold uppercase tracking-[0.15em] text-slate-900 md:text-4xl">
            {title}
          </h1>

          <div className="mt-8 rounded-2xl border-l-4 border-slate-900/60 bg-slate-50 px-6 py-6 text-slate-700">
            <p className="text-lg italic leading-relaxed">
              {/* intro-quote is managed by rich-text editor in admin */}
              <span
                dangerouslySetInnerHTML={{ __html: quoteText }}
              />
              {quoteRef && (
                <span className="font-semibold"> {quoteRef}</span>
              )}
            </p>
          </div>

          {/* intro-content is also rich-text from admin */}
          <div
            className="mt-8 text-base leading-relaxed text-slate-700 prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: introContent }}
          />
        </div>
      </div>
    </section>
  );
}

