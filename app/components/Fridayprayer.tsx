// Individual khutbah row from Supabase.
export type KhutbahRow = {
  slot?: string;
  time?: string;
  imam?: string;
};

// Data shape for the Friday prayers section.
export type FridayPrayersData = {
  eyebrow?: string;
  title?: string;
  description?: string;
  locationLabel?: string;
  locationValue?: string;
  khutbahs?: KhutbahRow[];
};

export type FridayPrayersProps = {
  data?: FridayPrayersData | null;
};

const defaultKhutbahs: KhutbahRow[] = [
  { slot: "First Khutbahs", time: "12:15 PM", imam: "Imam Kareem" },
  { slot: "Second Khutbah", time: "1:15 PM", imam: "Guest Khateeb" },
];

const LocationIcon = () => (
  <svg
    className="h-4 w-4 text-amber-200"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10z" />
    <circle cx="12" cy="11" r="2.5" />
  </svg>
);

const ClockIcon = () => (
  <svg
    className="h-5 w-5 text-slate-500"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export default function FridayPrayers({ data }: FridayPrayersProps) {
  const khutbahs: KhutbahRow[] =
    data?.khutbahs && data.khutbahs.length > 0
      ? data.khutbahs
      : defaultKhutbahs;

  // Normalize description to prevent hydration mismatch
  // Always ensure we have a non-empty string value
  // Use a consistent default that matches between server and client
  const defaultDescription = "Doors open 30 minutes before each Khutbah. Please arrive early to secure parking and seating.";
  
  // Normalize the description: handle null, undefined, empty string, or whitespace-only strings
  let safeDescriptionHtml = defaultDescription;
  if (data?.description) {
    const trimmed = String(data.description).trim();
    if (trimmed.length > 0) {
      safeDescriptionHtml = trimmed;
    }
  }

  return (
    <section className="mx-auto mt-16 w-full max-w-5xl px-6">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-[#152C44] via-[#1f3b56] to-[#274365] text-white shadow-2xl">
        <div className="flex flex-col gap-6 p-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-amber-200/80">
              {data?.eyebrow ?? "Jumu'ah Services"}
            </p>
            <h2 className="mt-2 text-3xl font-semibold">
              {data?.title ?? "Friday Prayers"}
            </h2>
            <div
              className="mt-2 text-sm text-slate-100/90"
              // Render admin-entered HTML so bold/underline/color etc. appear on the frontend.
              dangerouslySetInnerHTML={{
                __html: safeDescriptionHtml,
              }}
            />
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-sm shadow-sm">
            <div className="flex items-center gap-2 text-white">
              <LocationIcon />
              <p className="font-semibold">Locations</p>
            </div>
            <p className="mt-1 text-slate-100/90">
              {data?.locationValue ?? "Main Prayer Hall"}
            </p>
          </div>
        </div>

        <div className="grid gap-6 border-t border-white/10 bg-white text-slate-900 px-8 py-6 sm:grid-cols-2">
          {khutbahs.map((k, index) => (
            <div
              key={`${k.slot || 'khutbah'}-${k.time || ''}-${k.imam || ''}-${index}`}
              className="rounded-2xl border border-slate-200 p-6 shadow-sm"
            >
              <p className="text-xs uppercase tracking-wide text-amber-500">
                {k.slot}
              </p>
              <div className="mt-2 flex items-center gap-2 text-2xl font-semibold text-slate-900">
                <ClockIcon />
                <span>{k.time}</span>
              </div>
              <p className="mt-1 text-sm text-slate-500">Khateeb: {k.imam}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}