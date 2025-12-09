// Shared types and default configuration for the Home page admin editor.
//
// NOTE:
// This file only contains data shape + defaults. It does not change any logic.
// The admin page still uses these defaults exactly as before.

export type SectionField = {
  id: string;
  label: string;
  type: "text" | "textarea" | "image" | "rich-text" | "url" | "time" | "array" | "table";
  value: string | any[];
  placeholder?: string;
  arrayItemSchema?: { id: string; label: string; type: string }[];
  tableColumns?: { id: string; label: string }[];
};

// Default sections structure – moved out of app/admin/home/page.tsx
// so the main page file stays smaller and easier to read.
export const getDefaultSections = (): Record<string, SectionField[]> => ({
  hero: [
    { id: "hero-image", label: "Hero Image", type: "image", value: "/images/fortdoge-masjid.jpg" },
  ],
  prayerTimes: [
    { 
      id: "prayer-date", 
      label: "Date Display", 
      type: "text", 
      value: "Monday • November 24, 2025",
      placeholder: "Monday • November 24, 2025"
    },
    { 
      id: "prayer-note", 
      label: "Note Text", 
      type: "textarea", 
      value: "Times are subject to moon sighting confirmations.",
      placeholder: "Times are subject to moon sighting confirmations."
    },
    { 
      id: "jamaat-status", 
      label: "Jamaat Status Button Text", 
      type: "text", 
      value: "Jamaat Status: On-Site",
      placeholder: "Jamaat Status: On-Site"
    },
    {
      id: "prayer-times-table",
      label: "Prayer Times",
      type: "table",
      value: [
        { name: "Fajr", adhan: "5:55 AM", iqama: "6:15 AM" },
        { name: "Sunrise", adhan: "7:15 AM", iqama: "-" },
        { name: "Dhuhr", adhan: "12:02 PM", iqama: "12:30 PM" },
        { name: "Asr", adhan: "2:27 PM", iqama: "3:00 PM" },
        { name: "Maghrib", adhan: "4:47 PM", iqama: "4:55 PM" },
        { name: "Isha", adhan: "6:09 PM", iqama: "7:00 PM" },
      ],
      tableColumns: [
        { id: "name", label: "Prayer Name" },
        { id: "adhan", label: "Adhan Time" },
        { id: "iqama", label: "Iqama Time" },
      ],
    },
  ],
  fridayPrayers: [
    { 
      id: "friday-subtitle", 
      label: "Subtitle", 
      type: "text", 
      value: "Jumu'ah Services",
      placeholder: "Jumu'ah Services"
    },
    { 
      id: "friday-title", 
      label: "Title", 
      type: "text", 
      value: "Friday Prayers",
      placeholder: "Friday Prayers"
    },
    { 
      id: "friday-description", 
      label: "Description", 
      type: "textarea", 
      value: "Doors open 30 minutes before each Khutbah. Please arrive early to secure parking and seating.",
      placeholder: "Doors open 30 minutes before each Khutbah. Please arrive early to secure parking and seating."
    },
    { 
      id: "friday-location", 
      label: "Location Text", 
      type: "text", 
      value: "Main Prayer Hall",
      placeholder: "Main Prayer Hall"
    },
    {
      id: "khutbahs",
      label: "Friday Khutbahs",
      type: "array",
      value: [
        { slot: "JUMU'AH KHUTBAH (1)", time: "12:15 PM", imam: "Imam Kareem" },
        { slot: "JUMU'AH KHUTBAH (2)", time: "1:15 PM", imam: "Guest Khateeb" },
      ],
      arrayItemSchema: [
        { id: "slot", label: "Slot Label", type: "text" },
        { id: "time", label: "Time", type: "time" },
        { id: "imam", label: "Khateeb Name", type: "text" },
      ],
    },
  ],
  donation: [
    { 
      id: "donation-subtitle", 
      label: "Subtitle", 
      type: "text", 
      value: "Give Today",
      placeholder: "Give Today"
    },
    { 
      id: "donation-title", 
      label: "Title", 
      type: "text", 
      value: "Click or Scan QR to Donate Now",
      placeholder: "Click or Scan QR to Donate Now"
    },
    { 
      id: "donation-description", 
      label: "Description", 
      type: "textarea", 
      value: "Every contribution sustains programs, outreach, and community services at Fort Dodge Islamic Center.",
      placeholder: "Every contribution sustains programs, outreach, and community services at Fort Dodge Islamic Center."
    },
    { 
      id: "donation-qr-image", 
      label: "QR Code Image", 
      type: "image", 
      value: "/images/aq-paypal.png"
    },
    {
      id: "payment-links",
      label: "Payment Links",
      type: "array",
      value: [
        { label: "PayPal", href: "https://www.paypal.com", accent: "text-sky-600" },
        { label: "Venmo", href: "https://www.venmo.com", accent: "text-sky-500" },
        { label: "Mohid", href: "https://www.mohid.com", accent: "text-rose-500" },
      ],
      arrayItemSchema: [
        { id: "label", label: "Label", type: "text" },
        { id: "href", label: "URL", type: "url" },
        { id: "accent", label: "Accent Color Class", type: "text" },
      ],
    },
    { 
      id: "quick-actions-title", 
      label: "Quick Actions Title", 
      type: "text", 
      value: "Prefer a direct link?",
      placeholder: "Prefer a direct link?"
    },
    { 
      id: "quick-actions-description", 
      label: "Quick Actions Description", 
      type: "textarea", 
      value: "Tap below to open your preferred donation platform instantly.",
      placeholder: "Tap below to open your preferred donation platform instantly."
    },
  ],
  infoBanner: [
    {
      id: "banner-cards",
      label: "Banner Cards",
      type: "array",
      value: [
        { text: "Our Islamic Center is solely dependent on generous donations. Your support keeps every program running." },
        { text: "Need help or know someone who needs help? Try our Muslim Connect to support the community together." },
      ],
      arrayItemSchema: [
        { id: "text", label: "Banner Text", type: "textarea" },
      ],
    },
    {
      id: "quick-links",
      label: "Quick Links / Icon Items",
      type: "array",
      value: [
        { label: "By Laws", src: "/images/laws-aq.png", href: "https://drive.google.com/file/d/1xFQ6g0plhCzVIaCvglVPC1nykuICqRWL/view?usp=sharing", external: "true", drawer: "" },
        { label: "Report a Death", src: "/images/phone-aq.png", href: "/report-death", external: "", drawer: "" },
        { label: "Financial Assistance", src: "/images/financial-aq.png", href: "/resources#financial-assistance", external: "", drawer: "" },
        { label: "Request a Visit", src: "/images/request-aq.png", href: "/resources/request-a-visit", external: "", drawer: "" },
        { label: "Visitor Guide", src: "/images/visit-aq.png", href: "/resources/visitors-guide", external: "", drawer: "" },
        { label: "New Muslim", src: "/images/new-aq.png", href: "/new-musilm", external: "", drawer: "" },
        { label: "Become a Member", src: "/images/member-aq.png", href: "/resources/apply-renew-membership", external: "", drawer: "membership" },
        { label: "Monthly Prayer Times", src: "/images/time-aq.png", href: "/resources/islamic-prayer", external: "", drawer: "" },
        { label: "Meeting Minutes", src: "/images/meetin-aq.png", href: "https://drive.google.com/drive/folders/17nWT8C6jEZm5XK8oqKNEM1fzzXOcDsa0", external: "true", drawer: "" },
        { label: "Contact Us", src: "/images/contact-aq.png", href: "/contact", external: "", drawer: "contact" },
        { label: "Reserve Basement", src: "/images/reserve-aq.png", href: "/resources#reserve-basement", external: "", drawer: "reserveBasement" },
        { label: "Request Door Access", src: "/images/door-aq.png", href: "/resources#request-door-access", external: "", drawer: "doorAccess" },
      ],
                arrayItemSchema: [
                  { id: "label", label: "Label", type: "text" },
                  { id: "src", label: "Icon Image", type: "image" },
                  { id: "href", label: "Link URL", type: "url" },
                  { id: "external", label: "External Link (true/false)", type: "text" },
                  { id: "drawer", label: "Drawer Type (membership/contact/reserveBasement/doorAccess or empty)", type: "text" },
                ],
    },
  ],
  calendar: [
    { 
      id: "stay-connected", 
      label: "Stay Connected", 
      type: "text", 
      value: "Stay Connected",
      placeholder: "Stay Connected"
    },
    { 
      id: "community-events-calendar", 
      label: "Community Events Calendar", 
      type: "text", 
      value: "Community Events Calendar",
      placeholder: "Community Events Calendar"
    },
  ],
});


