type GovernanceStructureSectionProps = {
  data?: {
    subtitle?: string | null;
    title?: string | null;
    directorsTitle?: string | null;
    directorsDescription?: string | null;
    trusteesTitle?: string | null;
    trusteesDescription?: string | null;
    "governance-subtitle"?: string | null;
    "governance-title"?: string | null;
    "directors-title"?: string | null;
    "directors-description"?: string | null;
    "trustees-title"?: string | null;
    "trustees-description"?: string | null;
  } | null;
};

export default function GovernanceStructureSection({ data }: GovernanceStructureSectionProps) {
  const subtitle = data?.["governance-subtitle"] || data?.subtitle || "Leadership";
  const title = data?.["governance-title"] || data?.title || "Governance Structure";
  const directorsTitle = data?.["directors-title"] || data?.directorsTitle || "Board of Directors";
  const directorsDescription = data?.["directors-description"] || data?.directorsDescription || "Responsible for overall management and day-to-day operations of the center. The board of directors is elected annually and works diligently to ensure the center serves the community effectively.";
  const trusteesTitle = data?.["trustees-title"] || data?.trusteesTitle || "Board of Trustees";
  const trusteesDescription = data?.["trustees-description"] || data?.trusteesDescription || "Responsible for overseeing finances and assets of the center. The board of trustees is elected every two years and ensures the financial stability and long-term sustainability of the center.";

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

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-sky-50 to-white p-6 shadow-sm transition-all duration-300 hover:shadow-md sm:p-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-800 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">{directorsTitle}</h3>
          </div>
          <div
            className="text-base leading-relaxed text-gray-700"
            dangerouslySetInnerHTML={{ __html: directorsDescription }}
          />
        </div>

        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm transition-all duration-300 hover:shadow-md sm:p-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-800 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">{trusteesTitle}</h3>
          </div>
          <div
            className="text-base leading-relaxed text-gray-700"
            dangerouslySetInnerHTML={{ __html: trusteesDescription }}
          />
        </div>
      </div>
    </section>
  );
}

