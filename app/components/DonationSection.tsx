import Image from "next/image";
import { resolveStorageImageUrl } from "../../lib/storage.service";

// Individual payment link coming from Supabase.
export type DonationLink = {
  label?: string;
  href?: string;
  accent?: string;
  description?: string;
};

// Data shape for the donation section.
export type DonationSectionData = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  quickActionsTitle?: string;
  quickActionsDescription?: string;
  heroImage?: string;
  heroImageAlt?: string;
  // Backwards‑compat fields based on your Supabase JSON
  qrCodeImage?: string;
  links?: DonationLink[];
  paymentLinks?: DonationLink[];
};

export type DonationSectionProps = {
  data?: DonationSectionData | null;
};

const defaultPaymentLinks: DonationLink[] = [
  { label: "PayPal", href: "https://www.paypal.com", accent: "text-sky-600" },
  { label: "Venmo", href: "https://www.venmo.com", accent: "text-sky-500" },
  { label: "Mohid", href: "https://www.mohid.com", accent: "text-rose-500" },
];

export default function DonationSection({ data }: DonationSectionProps) {
  const rawImage = data?.heroImage ?? data?.qrCodeImage ?? "/images/aq-paypal.png";
  const imageSrc =
    resolveStorageImageUrl(rawImage, { bucket: "Public", folder: "Home" }) ?? null;
  const imageAlt =
    data?.heroImageAlt ??
    "QR codes for PayPal, Venmo, and Mohid donations";

  const linksSource =
    (data?.links && data.links.length ? data.links : null) ||
    (data?.paymentLinks && data.paymentLinks.length
      ? data.paymentLinks
      : null);

  const links: DonationLink[] = linksSource ?? defaultPaymentLinks;

  return (
    <section className="mx-auto mt-16 w-full max-w-5xl px-4 sm:px-6">
      <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-2xl backdrop-blur sm:p-8">
        <div className="flex flex-col items-center text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-rose-500">
            {data?.eyebrow ?? data?.subtitle ?? "Give Today"}
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">
            {data?.title ?? "Click or Scan QR to Donate Now"}
          </h2>
          <p
            className="mt-2 max-w-3xl text-sm text-slate-500 sm:text-base"
            // Render admin-entered HTML so bold/underline/color etc. appear on the frontend.
            dangerouslySetInnerHTML={{
              __html:
                data?.description ??
                "Every contribution sustains programs, outreach, and community services at Fort Dodge Islamic Center.",
            }}
          />
        </div>

        <div className="mt-8 flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-12">
          <div className="w-full flex-1">
            {imageSrc && (
              <div className="mx-auto max-w-md overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 shadow-lg">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={800}
                  height={400}
                  className="w-full object-contain"
                  priority
                />
              </div>
            )}
          </div>

          <div className="flex w-full flex-1 flex-col gap-4">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5 text-center text-slate-700 shadow-inner sm:text-left">
              <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                Quick Actions
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">
                {data?.quickActionsTitle ?? "Prefer a direct link?"}
              </h3>
              <p
                className="mt-1 text-sm"
                // Allow HTML formatting from the admin editor for the quick actions description.
                dangerouslySetInnerHTML={{
                  __html:
                    data?.quickActionsDescription ??
                    "Tap below to open your preferred donation platform instantly.",
                }}
              />
            </div>
            {links.map(({ label, href, accent, description }) => {
              if (!label && !href) return null;

              const resolvedLabel = label ?? "Donate";
              const resolvedHref = href ?? "#";
              const resolvedAccent = accent ?? "text-sky-600";

              return (
                <a
                  key={`${resolvedLabel}-${resolvedHref}`}
                  href={resolvedHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left shadow transition hover:border-slate-300"
                >
                  <div>
                    <p className={`text-sm font-semibold ${resolvedAccent}`}>
                      {resolvedLabel}
                    </p>
                    <p className="text-xs text-slate-500">
                      {description ?? `Open ${resolvedLabel} donation page`}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-slate-400 transition group-hover:text-slate-600">
                    →
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

