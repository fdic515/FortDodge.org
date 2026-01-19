import { SectionField } from "./home-default-sections";

export const getRamadanDefaultSections = (): Record<string, SectionField[]> => ({
  hero: [
    {
      id: "hero-image",
      label: "Hero Banner Image",
      type: "image",
      // Start empty so we don't try to load a non‑existent Supabase file path.
      // Admin can upload a real image which will be stored as "ramadan/....jpg".
      value: "",
    },
    {
      id: "hero-announcement-text",
      label: "Announcement Text (below hero)",
      type: "rich-text",
      value:
        'ISNA and the Fiqh Council of North America have <a href="https://www.fiqhcouncil.org" class="font-medium text-blue-700 underline" target="_blank">announced</a> the first day of Ramadan will be on <span class="font-semibold text-red-600">Saturday, March 1st</span>. Taraweeh will begin on Friday, February 28th.',
    },
    {
      id: "hero-eid-text",
      label: "Eid Date Text",
      type: "rich-text",
      value: "Eid is Sunday, March 30th.",
    },
  ],
  daily_lessons: [
    {
      id: "lessons-image",
      label: "Lessons Image",
      type: "image",
      // Start with empty value; frontend will fall back to default image path.
      value: "",
    },
    {
      id: "lessons-title",
      label: "Lessons Title",
      type: "text",
      value: "A Tour of the Qur'an",
    },
    {
      id: "lessons-description",
      label: "Description",
      type: "rich-text",
      value:
        "Join us for nightly reflections as we walk through the Qur'an together this Ramadan.",
    },
    {
      id: "lessons-location",
      label: "Location Text",
      type: "text",
      value: "1212 Iowa Ave, Ames, IA 50014",
    },
    {
      id: "lessons-time",
      label: "Time Text",
      type: "text",
      value: "After Maghrib • Some nights post-Taraweeh",
    },
    {
      id: "lessons-bullet-1",
      label: "Bullet Point 1",
      type: "text",
      value: "Some sessions will be between Maghrib and Isha",
    },
    {
      id: "lessons-bullet-2",
      label: "Bullet Point 2",
      type: "text",
      value: "Other dates will follow Taraweeh to accommodate volunteers",
    },
    {
      id: "lessons-bullet-3",
      label: "Bullet Point 3",
      type: "text",
      value: "Daily reflections lead by Br. Mohammed Badawi",
    },
    {
      id: "lessons-cta-label",
      label: "Button Text",
      type: "text",
      value: "Full schedule can be found here",
    },
    {
      id: "lessons-cta-url",
      label: "Button Link URL",
      type: "url",
      value:
        "https://drive.google.com/file/d/13A_rP39iS9XukHmQYbHyCn2jG4qFCMii/view",
    },
  ],
  zakat_ul_fitr: [
    {
      id: "zakat-title",
      label: "Zakat Title",
      type: "text",
      value: "Zakat-ul-Fitr",
    },
    {
      id: "zakat-amount",
      label: "Amount Text",
      type: "text",
      value: "$10 per person",
    },
    {
      id: "zakat-due-date",
      label: "Due Date Text",
      type: "text",
      value: "Due by end of Taraweeh on Friday, March 28th",
    },
    {
      id: "zakat-description",
      label: "Description",
      type: "rich-text",
      value:
        "Please submit Zakat-ul-Fitr before Eid so we can distribute to families in need.",
    },
    {
      id: "zakat-submission-methods",
      label: "Accepted Submission Methods",
      type: "array",
      value: [
        { label: "Online via Mohid", href: "https://www.mohid.com" },
        { label: "Mohid kiosk in the main prayer hall", href: "" },
        { label: "Labeled envelopes in both prayer halls (forthcoming)", href: "" },
      ],
      arrayItemSchema: [
        { id: "label", label: "Method Label", type: "text" },
        { id: "href", label: "Link URL (optional)", type: "url" },
      ],
    },
    {
      id: "zakat-disclaimer",
      label: "Disclaimer Text",
      type: "rich-text",
      value:
        "Prefer giving to a food distribution charity? Consider trusted partners such as the <a href='https://www.amoudfoundation.org/' target='_blank' class='font-medium text-amber-700 underline underline-offset-2'>Amoud Foundation</a>. DAIC does not endorse specific charities—please do your own due diligence.",
    },
  ],
  community_iftars: [
    {
      id: "iftar-title",
      label: "Title (e.g., 'Five Saturdays')",
      type: "text",
      value: "Five Saturdays",
    },
    {
      id: "iftar-note",
      label: "Note Text (e.g., 'No open community iftar on March 1st')",
      type: "text",
      value: "No open community iftar on March 1st",
    },
    {
      id: "iftar-intro",
      label: "Intro Text",
      type: "rich-text",
      value:
        "Each Saturday features a community-led iftar. Hosts welcome everyone to connect and share a meal.",
    },
    {
      id: "iftar-email-text",
      label: "Email Text (text before email address)",
      type: "text",
      value: "To reserve a date, email Sr. Kylie Anderson at",
    },
    {
      id: "iftar-email-address",
      label: "Email Address",
      type: "text",
      value: "social@arqum.org",
    },
    {
      id: "iftar-dates",
      label: "Iftar Dates",
      type: "array",
      value: [
        { date: "Saturday 3/8/2024", community: "The Sudanese Community" },
        { date: "Saturday 3/15/2024", community: "The Arab Community" },
        {
          date: "Saturday 3/22/2024",
          community: "The Indian & Pakistani Communities",
        },
        {
          date: "Saturday 3/29/2024",
          community: "The Bangladeshi Community",
        },
      ],
      arrayItemSchema: [
        { id: "date", label: "Date", type: "text" },
        { id: "community", label: "Community", type: "text" },
      ],
    },
  ],
});

