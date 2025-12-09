const defaultCosts = [
  { item: "Cost of Gravesite", cost: "*FREE" },
  { item: "Washing the body", cost: "FREE" },
  { item: "Burial kit, Wood", cost: "$100" },
  { item: "Opening and closing the grave", cost: "$1000 - $1200" },
  { item: "Funeral Home (see services description above)", cost: "$3250" },
];

type CostBreakdownProps = {
  data?: {
    "cost-title"?: string;
    "cost-note"?: string;
    "costs-table"?: Array<{ item?: string; cost?: string }>;
    "total-label"?: string;
    "total-cost"?: string;
    "non-resident-note"?: string;
    title?: string;
    note?: string;
    costs?: Array<{ item?: string; cost?: string }>;
    totalLabel?: string;
    totalCost?: string;
    nonResidentNote?: string;
  } | null;
};

export default function CostBreakdown({ data }: CostBreakdownProps) {
  const title =
    data?.["cost-title"] ||
    data?.title ||
    "Approximate Costs";
  const note =
    data?.["cost-note"] ||
    data?.note ||
    "Make the cashier's check payable to Fort Dodge Islamic Center.";

  const rows =
    (Array.isArray(data?.["costs-table"]) &&
      data!["costs-table"]
        .map((row) => ({
          item: row.item || "",
          cost: row.cost || "",
        }))
        .filter((row) => row.item && row.cost)) ||
    data?.costs ||
    defaultCosts;

  const totalLabel =
    data?.["total-label"] ||
    data?.totalLabel ||
    "Total costs for burial in the Sunset Gardens Islamic Cemetery";
  const totalCost =
    data?.["total-cost"] ||
    data?.totalCost ||
    "$3600 - $4850";
  const nonResidentNote =
    data?.["non-resident-note"] ||
    data?.nonResidentNote ||
    "*There is an additional charge of $350 for non-residents of Ames.";

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm md:p-10">
          <h2 className="text-2xl font-semibold uppercase tracking-wide text-slate-900 sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-sm text-slate-600">{note}</p>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-white/60 bg-white">
            <table className="min-w-full divide-y divide-slate-100 text-left text-base text-slate-800">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="px-4 py-3 font-semibold uppercase tracking-wide sm:px-6">Items</th>
                  <th className="px-4 py-3 text-right font-semibold uppercase tracking-wide sm:px-6">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((row) => (
                  <tr key={row.item}>
                    <td className="px-4 py-4 text-sm sm:px-6 sm:text-base">{row.item}</td>
                    <td className="px-4 py-4 text-right font-semibold sm:px-6">{row.cost}</td>
                  </tr>
                ))}
                <tr className="bg-slate-100 font-semibold">
                  <td className="px-4 py-4 sm:px-6">{totalLabel}</td>
                  <td className="px-4 py-4 text-right sm:px-6">{totalCost}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-slate-600">
            {nonResidentNote}
          </p>
        </div>
      </div>
    </section>
  );
}

