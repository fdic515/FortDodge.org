// Each prayer row coming from Supabase (all optional).
export type PrayerRow = {
  name?: string;
  adhan?: string;
  iqama?: string;
};

// Data shape for the prayer times section.
export type PrayerTimesData = {
  heading?: string;
  dateLabel?: string;
  description?: string;
  statusLabel?: string;
  statusValue?: string;
  prayers?: PrayerRow[];
};

export type PrayerTimesProps = {
  data?: PrayerTimesData | null;
};

export default function PrayerTimes({ data }: PrayerTimesProps) {
  // Temporary debug logs to verify whether data is coming from Supabase or using static defaults.
  console.log("[PrayerTimes] Raw data prop from Supabase (or null):", data);

  const prayers: PrayerRow[] =
    data?.prayers ?? [
      { name: "Fajr", adhan: "5:55 AM", iqama: "6:15 AM" },
      { name: "Sunrise", adhan: "7:15 AM", iqama: "-" },
      { name: "Dhuhr", adhan: "12:02 PM", iqama: "12:30 PM" },
      { name: "Asr", adhan: "2:27 PM", iqama: "3:00 PM" },
      { name: "Maghrib", adhan: "4:47 PM", iqama: "4:55 PM" },
      { name: "Isha", adhan: "6:09 PM", iqama: "7:00 PM" },
    ];

  console.log("[PrayerTimes] Final prayers array being rendered:", prayers);

  return (
    <section className="mx-auto mt-16 w-full max-w-5xl px-4 sm:px-6">
      <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur sm:p-8">
        <div className="flex flex-col items-center justify-between gap-4 border-b border-slate-100 pb-6 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
              {data?.heading ?? "Prayer Schedule"}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              {data?.dateLabel ?? "Prayer Times"}
            </h2>
            <p className="text-sm text-slate-500">
              {data?.description ??
                "Times are subject to moon sighting confirmations."}
            </p>
          </div>
          <div className="rounded-full border border-slate-200 px-5 py-2 text-sm font-medium text-slate-700">
            {data?.statusLabel ?? "Jamaat Status"}:{" "}
            {data?.statusValue ?? "On-Site"}
          </div>
        </div>

        <div className="mt-8 hidden overflow-hidden rounded-2xl border border-slate-100 sm:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm text-slate-700">
              <thead>
                <tr className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-6 py-3">Prayer</th>
                  <th className="px-6 py-3">Adhan</th>
                  <th className="px-6 py-3">Iqama</th>
                </tr>
              </thead>
              <tbody>
                {prayers.map((prayer, idx) => (
                  <tr
                    key={prayer.name}
                    className={idx % 2 ? "bg-white" : "bg-slate-50/60"}
                  >
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {prayer.name}
                    </td>
                    <td className="px-6 py-4">{prayer.adhan}</td>
                    <td className="px-6 py-4">{prayer.iqama}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:hidden">
          {prayers.map((prayer) => (
            <div
              key={prayer.name}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <p className="text-xs uppercase tracking-wide text-slate-500">
                {prayer.name}
              </p>
              <div className="mt-3 flex items-center justify-between text-sm">
                <div>
                  <p className="text-[11px] uppercase text-slate-400">Adhan</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {prayer.adhan}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] uppercase text-slate-400">Iqama</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {prayer.iqama}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}