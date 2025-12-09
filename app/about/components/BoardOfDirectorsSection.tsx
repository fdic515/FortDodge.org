type BoardOfDirectorsSectionProps = {
  data?: {
    subtitle?: string | null;
    title?: string | null;
    "board-members"?: Array<{ role: string; name: string; email: string }> | null;
    "directors-section-subtitle"?: string | null;
    "directors-section-title"?: string | null;
  } | null;
};

export default function BoardOfDirectorsSection({ data }: BoardOfDirectorsSectionProps) {
  const subtitle = data?.["directors-section-subtitle"] || data?.subtitle || "Our Leadership Team";
  const title = data?.["directors-section-title"] || data?.title || "Members of the Board of Directors";
  const boardMembers = data?.["board-members"] || [
    {
      role: "Chair",
      name: "Br. Mahmoud Gshash",
      email: "chair@arqum.org",
    },
    {
      role: "Vice Chair",
      name: "Br. Shakil Ahmed",
      email: "vicechair@arqum.org",
    },
    {
      role: "Secretary",
      name: "Sr. Danielle Walsh",
      email: "secretary@arqum.org",
    },
    {
      role: "Treasurer",
      name: "Br. Umar Farooq",
      email: "treasurer@arqum.org",
    },
    {
      role: "Public Relations Liaison",
      name: "Br. Umar Farooq",
      email: "pr@arqum.org",
    },
    {
      role: "Religious Affairs Liaison",
      name: "Br. Yasir Idris",
      email: "religious@arqum.org",
    },
    {
      role: "Social Affairs Liaison",
      name: "Br. Kylie Anderson",
      email: "social@arqum.org",
    },
    {
      role: "Building & Property Liaison",
      name: "Br. Yassir Obeid",
      email: "building@arqum.org",
    },
    {
      role: "Education Liaison",
      name: "Br. Amir Abdelmawla",
      email: "education@arqum.org",
    },
    {
      role: "Women's Affairs Liaison",
      name: "Sr. Ayah Dajani",
      email: "sisters@arqum.org",
    },
    {
      role: "Member at-Large",
      name: "Br. Mohammed Soliman",
      email: "m.soliman@arqum.org",
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

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {boardMembers.map((member, index) => (
            <div
              key={member.email || index}
              className="group rounded-lg border border-gray-100 bg-gray-50 p-4 transition-all duration-300 hover:border-sky-300 hover:bg-sky-50 hover:shadow-md sm:p-5"
            >
              <div className="mb-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-sky-700 sm:text-sm">
                  {member.role}
                </p>
              </div>
              <p className="mb-2 text-base font-semibold text-gray-900 sm:text-lg">
                {member.name}
              </p>
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-2 text-sm text-sky-700 underline underline-offset-2 transition-colors hover:text-sky-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {member.email}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

