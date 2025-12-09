type NeedForDonationsProps = {
  data?: {
    "need-subtitle"?: string | null;
    needSubtitle?: string | null;
    "need-title"?: string | null;
    needTitle?: string | null;
    funds?: Array<{ title: string; description: string }> | null;
  } | null;
};

const defaultNeeds = [
  {
    title: "General Fund",
    description:
      "Supports the general operation of the Islamic Center, including maintenance, landscaping, cleaning, utilities, and other day-to-day expenses.",
  },
  {
    title: "Imam Fund",
    description:
      "Goes directly toward paying the Imam's salary. The Imam plays a vital role in serving the community.",
  },
  {
    title: "Islamic School Fund",
    description:
      "Operates and manages the Islamic school — hiring teachers, purchasing supplies, and providing student support.",
  },
  {
    title: "Sadaqa & Zakat Al-Mal Fund",
    description:
      "Helps needy people in Ames through financial assistance, food banks, and other social service programs.",
  },
];

export default function NeedForDonations({ data }: NeedForDonationsProps) {
  const subtitle = data?.["need-subtitle"] || data?.needSubtitle || "NEED FOR DONATIONS";
  const title = data?.["need-title"] || data?.needTitle || "Your support sustains vital programs and services";
  const funds = Array.isArray(data?.funds) && data.funds.length > 0 ? data.funds : defaultNeeds;

  return (
    <section className="space-y-6 rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/70 ring-1 ring-slate-100 sm:p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-700 sm:text-sm">
          {subtitle}
        </p>
        <h2 className="mt-2 text-xl font-semibold text-slate-900 sm:mt-3 sm:text-3xl">
          {title}
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {funds.map(({ title: fundTitle, description }) => (
          <div
            key={fundTitle}
            className="flex h-full flex-col rounded-2xl border border-slate-100 p-5 shadow-md shadow-slate-200/60"
          >
            <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
              {fundTitle}
            </h3>
            <div
              className="mt-2 text-sm text-slate-600"
              // Render HTML from rich text editor for description
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}


