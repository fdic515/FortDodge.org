import Image from "next/image";
import Link from "next/link";
import { resolveStorageImageUrl } from "../../../lib/storage.service";

type TafsirSeriesProps = {
  data?: {
    image?: string | null;
    title?: string | null;
    description?: string | null;
    location?: string | null;
    time?: string | null;
    bullet1?: string | null;
    bullet2?: string | null;
    bullet3?: string | null;
    ctaLabel?: string | null;
    ctaUrl?: string | null;
  } | null;
};

const defaultBulletPoints = [
  "Some sessions will be between Maghrib and Isha",
  "Other dates will follow Taraweeh to accommodate volunteers",
  "Daily reflections lead by Br. Mohammed Badawi",
];

const defaultMeta = [
  { label: "Location", value: "1212 Iowa Ave, Ames, IA 50014" },
  { label: "Time", value: "After Maghrib • Some nights post-Taraweeh" },
];

export default function TafsirSeries({ data }: TafsirSeriesProps) {
  const lessonsImageValue = data?.image || "/images/quran-aq.jpg";
  const lessonsImageUrl = resolveStorageImageUrl(lessonsImageValue, {
    bucket: "Public",
    folder: "ramadan",
  }) as string | null;

  const title = data?.title || "A Tour of the Qur'an";
  const description =
    data?.description ||
    "Join us for nightly reflections as we walk through the Qur'an together this Ramadan.";
  const bulletPoints =
    data && (data.bullet1 || data.bullet2 || data.bullet3)
      ? [
          data.bullet1 || defaultBulletPoints[0],
          data.bullet2 || defaultBulletPoints[1],
          data.bullet3 || defaultBulletPoints[2],
        ]
      : defaultBulletPoints;
  const meta = [
    {
      label: "Location",
      value: data?.location || defaultMeta[0].value,
    },
    {
      label: "Time",
      value: data?.time || defaultMeta[1].value,
    },
  ];
  const ctaLabel = data?.ctaLabel || "Full schedule can be found here";
  const ctaUrl =
    data?.ctaUrl ||
    "https://drive.google.com/file/d/13A_rP39iS9XukHmQYbHyCn2jG4qFCMii/view";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-6 p-5 lg:flex-row lg:items-stretch lg:gap-8 lg:p-8">
        {/* Image */}
        <div className="relative w-full flex-1 overflow-hidden rounded-xl bg-slate-100 lg:max-w-md">
          {lessonsImageUrl && (
            <Image
              src={lessonsImageUrl}
              alt="Tafsir lessons promotional poster"
              fill
              className="object-cover lg:object-contain"
              priority
            />
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <span className="rounded-full border border-slate-200 px-3 py-1">
                Tafsir Series
              </span>
              <span className="text-slate-400">Daily Lessons</span>
            </div>
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              {title}
            </h2>
            <p
              className="text-slate-600"
              // Allow HTML from the admin rich text editor for the description.
              dangerouslySetInnerHTML={{ __html: description }}
            />

            <div className="grid gap-3 sm:grid-cols-2">
              {meta.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <ul className="space-y-3 text-sm text-slate-700">
              {bulletPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                    ✓
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Link
              href={ctaUrl}
              target="_blank"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              {ctaLabel}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

