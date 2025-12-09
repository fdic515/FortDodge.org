type DonationOptionsProps = {
  data?: {
    "options-subtitle"?: string | null;
    optionsSubtitle?: string | null;
    "options-title"?: string | null;
    optionsTitle?: string | null;
    "donation-methods"?: Array<{
      title: string;
      description: string;
      bullets?: string;
      linkLabel?: string;
      linkHref?: string;
    }> | null;
    donationMethods?: Array<{
      title: string;
      description: string;
      bullets?: string;
      linkLabel?: string;
      linkHref?: string;
    }> | null;
  } | null;
};

const defaultOptions = [
  {
    title: "Donation Box",
    description:
      "Boxes are located in the main prayer hall and sisters' prayer hall. Use designated envelopes to direct your contribution.",
    bullets: "Deposit cash securely in any of the donation boxes.\nClearly mark the envelope with your intended fund.",
  },
  {
    title: "Checks",
    description:
      "Write checks payable to Fort Dodge Islamic Center and include the designated fund in the memo line.",
    bullets: "",
  },
  {
    title: "MOHID Kiosk",
    description:
      "Located in the main prayer hall and accepts major credit cards for one-time or recurring donations.",
    bullets: "Select the fund you would like to support directly on the kiosk.\nReceive an instant receipt for your records.",
  },
  {
    title: "MOHID Online",
    description:
      "Submit donations via the MOHID online portal. Choose your fund and donate from anywhere.",
    linkLabel: "us.mohid.co/ia/desmoines/daic/masjid/online/donation",
    linkHref:
      "https://us.mohid.co/ia/desmoines/daic/masjid/online/donation",
    bullets: "",
  },
  {
    title: "Venmo",
    description: "Give through Venmo at Fort Dodge Islamic Center.",
    linkLabel: "venmo.com/DarulArqumIslamicCenter",
    linkHref: "https://venmo.com/DarulArqumIslamicCenter",
    bullets: "",
  },
  {
    title: "PayPal",
    description: "Donate quickly and securely using PayPal.",
    linkLabel: "paypal.me/daicpaypal",
    linkHref: "https://paypal.me/daicpaypal",
    bullets: "",
  },
  {
    title: "Direct Transfer to the Bank",
    description:
      "Contact our treasurer to set up a direct bank transfer for larger or recurring gifts.",
    linkLabel: "treasurer@arqum.org",
    linkHref: "mailto:treasurer@arqum.org",
    bullets: "",
  },
];

export default function DonationOptions({ data }: DonationOptionsProps) {
  const subtitle = data?.["options-subtitle"] || data?.optionsSubtitle || "DONATION OPTIONS";
  const title = data?.["options-title"] || data?.optionsTitle || "Choose the method that works best for you";
  const methods = (Array.isArray(data?.["donation-methods"]) && data["donation-methods"].length > 0) 
    ? data["donation-methods"] 
    : (Array.isArray(data?.donationMethods) && data.donationMethods.length > 0)
    ? data.donationMethods
    : defaultOptions;

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

      <div className="space-y-5">
        {methods.map(
          ({ title: methodTitle, description, bullets, linkLabel, linkHref }) => {
            const bulletList = bullets ? bullets.split("\n").filter(b => b.trim()) : [];
            
            return (
              <div
                key={methodTitle}
                className="rounded-2xl border border-slate-100 p-5 shadow-md shadow-slate-200/60"
              >
                <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
                  {methodTitle}
                </h3>
                {description && (
                  <div
                    className="mt-2 text-sm text-slate-600"
                    // Render HTML from rich text editor for description
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                )}

                {bulletList.length > 0 && (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
                    {bulletList.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                )}

                {linkHref && linkLabel && (
                  <a
                    href={linkHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex max-w-full flex-wrap gap-2 text-sm font-semibold text-sky-700 transition hover:text-sky-900"
                  >
                    <span className="break-all">{linkLabel}</span>
                    <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}


