export type CalendarSectionData = {
  stayConnected?: string;
  communityEventsCalendar?: string;
};

export type CalendarSectionProps = {
  data?: CalendarSectionData | null;
};

export default function CalendarSection({ data }: CalendarSectionProps) {
  const stayConnected = data?.stayConnected || "Stay Connected";
  const communityEventsCalendar = data?.communityEventsCalendar || "Community Events Calendar";

  return (
    <section className="mx-auto mt-16 mb-20 w-full max-w-6xl px-4 sm:px-6">
      <div className="mb-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
          {stayConnected}
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-800">
          {communityEventsCalendar}
        </h2>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-2 shadow-md">
        <iframe
          src="https://calendar.google.com/calendar/u/0/embed?height=400&wkst=1&bgcolor=%23ffffff&ctz=America/Chicago&mode=AGENDA&showCalendars=1&showTabs=1&showNav=1&src=Y18wODY0OWFmZGQzMzU4NzA1ZWQwZTVlMTdiMjY5OWE5YmFhODRkZTdlNDM1YzA4MDM2YmMyYzc2NTFmNTQwMWQxQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23C0CA33
" 
          className="h-[460px] w-full rounded-lg border border-gray-200 sm:h-[540px] lg:h-[700px]"
          style={{ border: "0" }}
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </div>
    </section>
  );
}