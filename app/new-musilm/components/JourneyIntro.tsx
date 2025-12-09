type JourneyIntroData = {
  subtitle?: string | null;
  title?: string | null;
  quote?: string | null;
  quoteSource?: string | null;
  content1?: string | null;
  content2?: string | null;
} | null;

export default function JourneyIntro({ data }: { data?: JourneyIntroData }) {
  return (
    <section className="bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
        <div className="rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-xl backdrop-blur">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
            {data?.subtitle || "Fort Dodge Islamic Center"}
          </p>
          <h1 className="mt-4 text-3xl font-bold uppercase tracking-[0.15em] text-slate-900 md:text-4xl">
            {data?.title || "Welcome to Your Islamic Journey"}
          </h1>

          <div className="mt-8 rounded-2xl border-l-4 border-slate-900/60 bg-slate-50 px-6 py-6 text-slate-700">
            <p className="text-lg italic leading-relaxed">
              {data?.quote ||
                "Whoever follows a path in the pursuit of knowledge, Allah will make a path to Paradise easy for him."}{" "}
              <span className="font-semibold">
                {data?.quoteSource || "(Bukhaari)"}
              </span>
            </p>
          </div>

          <p
            className="mt-8 text-base leading-relaxed text-slate-700"
            dangerouslySetInnerHTML={{
              __html:
                data?.content1 ||
                "It is our pleasure to accompany you on this important path to deepening your knowledge of Islam. The Prophet Muhammad (peace and blessings be upon him) emphasized that seeking knowledge is a fundamental duty for every Muslim, and that the scholars are the heirs of the Prophets—passing on the priceless inheritance of guidance.",
            }}
          />
          <p
            className="mt-6 text-base leading-relaxed text-slate-700"
            dangerouslySetInnerHTML={{
              __html:
                data?.content2 ||
                "To assist you on this journey, we have compiled authentic resources rooted in the Quran—the word of Allah—and the Sunnah, the example of Prophet Muhammad (peace be upon him). Become familiar with these essentials as you continue to nurture your faith and understanding.",
            }}
          />
        </div>
      </div>
    </section>
  );
}


