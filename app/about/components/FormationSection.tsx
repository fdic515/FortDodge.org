type FormationSectionProps = {
  data?: {
    subtitle?: string | null;
    title?: string | null;
    electionTitle?: string | null;
    electionContent?: string | null;
    volunteersTitle?: string | null;
    volunteersContent?: string | null;
    "formation-subtitle"?: string | null;
    "formation-title"?: string | null;
    "election-title"?: string | null;
    "election-content"?: string | null;
    "volunteers-title"?: string | null;
    "volunteers-content"?: string | null;
  } | null;
};

export default function FormationSection({ data }: FormationSectionProps) {
  const subtitle = data?.["formation-subtitle"] || data?.subtitle || "Our Commitment";
  const title = data?.["formation-title"] || data?.title || "Formation of Board of Directors and Board of Trustees";
  const electionTitle = data?.["election-title"] || data?.electionTitle || "Election Process";
  const electionContent = data?.["election-content"] || data?.electionContent || "The board of directors is elected annually, while the board of trustees is elected every two years. The board of directors is responsible for the overall management of the center, while the board of trustees is responsible for overseeing the finances and assets of the center.";
  const volunteersTitle = data?.["volunteers-title"] || data?.volunteersTitle || "Our Dedicated Volunteers";
  const volunteersContent = data?.["volunteers-content"] || data?.volunteersContent || "All members of the board of directors and board of trustees are volunteers who are passionate about serving the Muslim community. They bring a diverse range of skills and experience to the center, and they work together to make the center a vibrant and welcoming place for all members of the community. The board of directors and board of trustees play an essential role in the success of the center, and they are committed to providing leadership and guidance to ensure that the center continues to serve the Muslim community for years to come.";

  return (
    <section className="mb-12 sm:mb-16">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
          {subtitle}
        </p>
        <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
          {title}
        </h2>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="space-y-6 text-base leading-relaxed text-gray-700 sm:text-lg">
          <div className="rounded-lg border border-gray-100 bg-gray-50 p-5 sm:p-6">
            <h3 className="mb-3 text-lg font-semibold text-gray-900 sm:text-xl">
              {electionTitle}
            </h3>
            <div
              dangerouslySetInnerHTML={{ __html: electionContent }}
            />
          </div>

          <div className="rounded-lg border border-sky-100 bg-sky-50 p-5 sm:p-6">
            <h3 className="mb-3 text-lg font-semibold text-gray-900 sm:text-xl">
              {volunteersTitle}
            </h3>
            <div
              dangerouslySetInnerHTML={{ __html: volunteersContent }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

