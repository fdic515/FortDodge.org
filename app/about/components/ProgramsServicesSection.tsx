type ProgramsServicesSectionProps = {
  data?: {
    subtitle?: string | null;
    title?: string | null;
    services?: Array<{ title: string; description: string }> | null;
    "programs-subtitle"?: string | null;
    "programs-title"?: string | null;
  } | null;
};

export default function ProgramsServicesSection({ data }: ProgramsServicesSectionProps) {
  const subtitle = data?.["programs-subtitle"] || data?.subtitle || "What We Offer";
  const title = data?.["programs-title"] || data?.title || "Programs and Services";
  const services = data?.services || [
    {
      title: "Five daily prayers",
      description: "Regular prayer services throughout the day",
    },
    {
      title: "Jummah prayer on Fridays",
      description: "Weekly congregational Friday prayers",
    },
    {
      title: "Islamic classes for children and adults",
      description: "Educational programs for all ages",
    },
    {
      title: "A library with books on Islam and other topics",
      description: "Extensive collection of Islamic literature and resources",
    },
    {
      title: "A community hall for events and gatherings",
      description: "Spacious facility for community activities",
    },
  ];

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

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg sm:p-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-sky-50 to-blue-50 text-sky-600 transition-colors group-hover:from-sky-100 group-hover:to-blue-100 group-hover:text-sky-700">
                  <span className="text-lg font-semibold">{index + 1}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-gray-900 group-hover:text-sky-700 transition-colors sm:text-lg">
                  {service.title}
                </h3>
                {service.description && (
                  <p
                    className="mt-2 text-sm text-gray-600 sm:text-base"
                    dangerouslySetInnerHTML={{ __html: service.description }}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

