type CommunityIftarsProps = {
  data?: {
    title?: string | null;
    note?: string | null;
    intro?: string | null;
    emailText?: string | null;
    emailAddress?: string | null;
    iftarDates?: { date: string; community: string }[] | null;
  } | null;
};

const defaultIftarDates = [
  { date: "Saturday 3/8/2024", community: "The Sudanese Community" },
  { date: "Saturday 3/15/2024", community: "The Arab Community" },
  {
    date: "Saturday 3/22/2024",
    community: "The Indian & Pakistani Communities",
  },
  { date: "Saturday 3/29/2024", community: "The Bangladeshi Community" },
];

export default function CommunityIftars({ data }: CommunityIftarsProps) {
  const title = data?.title || "Five Saturdays";
  const note = data?.note || "No open community iftar on March 1st";
  const intro =
    data?.intro ||
    "Each Saturday features a community-led iftar. Hosts welcome everyone to connect, share a meal, and reflect together.";
  const emailText = data?.emailText || "To reserve a date, email Sr. Kylie Anderson at";
  const emailAddress = data?.emailAddress || "social@arqum.org";
  const iftarDates = data?.iftarDates || defaultIftarDates;
  return (
    <section className="rounded-2xl border border-indigo-100 bg-white p-4 shadow-lg sm:rounded-3xl sm:p-6 md:p-8">
      <div className="space-y-3 sm:space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-sky-800 sm:text-sm">
          Community Iftars
        </p>
        <h2 className="text-xl font-semibold text-sky-800 sm:text-2xl md:text-3xl">
          <span className="block sm:inline">{title}</span>
          {note && (
            <>
              <span className="hidden sm:inline"> • </span>
              <span className="block mt-1 text-base sm:mt-0 sm:inline sm:text-inherit">
                {note}
              </span>
            </>
          )}
        </h2>
        <p className="text-sm text-sky-800/80 sm:text-base">
          <span
            // Render HTML from the admin rich text editor for the intro text.
            dangerouslySetInnerHTML={{ __html: intro }}
          />{" "}
          {emailText}{" "}
          <a
            href={`mailto:${emailAddress}`}
            className="font-semibold text-sky-800 underline underline-offset-4 break-all sm:break-normal"
          >
            {emailAddress}
          </a>
          .
        </p>
        <div className="mt-4 grid gap-3 sm:mt-6 sm:gap-4 md:grid-cols-2">
          {iftarDates.map((entry) => (
            <div
              key={entry.date}
              className="rounded-xl border border-indigo-50 bg-indigo-50/70 p-4 sm:rounded-2xl sm:p-5"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-sky-800 sm:text-sm">
                {entry.date}
              </p>
              <p className="mt-1.5 text-lg font-semibold text-sky-800 sm:mt-2 sm:text-xl">
                {entry.community}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

