type IntroductionSectionProps = {
  data?: {
    subtitle?: string | null;
    title?: string | null;
    content?: string | null;
    byLawsText?: string | null;
    byLawsLink?: string | null;
    "intro-subtitle"?: string | null;
    "intro-title"?: string | null;
    "intro-content"?: string | null;
    "by-laws-text"?: string | null;
    "by-laws-link"?: string | null;
  } | null;
};

export default function IntroductionSection({ data }: IntroductionSectionProps) {
  const subtitle = data?.["intro-subtitle"] || data?.subtitle || "About Us";
  const title = data?.["intro-title"] || data?.title || "Welcome to Fort Dodge Islamic Center";
  const content = data?.["intro-content"] || data?.content || "The Fort Dodge Islamic Center is a non-profit organization founded in 2002 by Muslims to create a place for prayer, learning, and socialization. The center is a vibrant and welcoming community that is committed to providing resources and support for its members to live according to Islamic principles.";
  const byLawsText = data?.["by-laws-text"] || data?.byLawsText || 'You can find the "By Laws" under Resources > By Laws in the menu.';
  const byLawsLink = data?.["by-laws-link"] || data?.byLawsLink || "https://drive.google.com/file/d/1xFQ6g0plhCzVIaCvglVPC1nykuICqRWL/view?usp=sharing";

  return (
    <section className="mb-12 sm:mb-16">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            {subtitle}
          </p>
          <h1 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
            {title}
          </h1>
        </div>

        <div className="space-y-4 text-base leading-relaxed text-gray-700 sm:text-lg">
          <div
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div className="rounded-lg border border-sky-100 bg-sky-50 p-4 sm:p-5">
            <div
              className="text-sm text-gray-700 sm:text-base"
              dangerouslySetInnerHTML={{ __html: byLawsText }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

