type FoundationsSectionProps = {
  data?: {
    subtitle?: string | null;
    title?: string | null;
    description?: string | null;
    "quranic-resources"?: {
      title?: string;
      webUrl?: string;
      mobileUrl?: string;
      description?: string;
    }[];
    "sunnah-resources"?: {
      title?: string;
      url?: string;
      description?: string;
    }[];
  } | null;
};

export default function FoundationsSection({ data }: FoundationsSectionProps) {
  const quranic =
    data?.["quranic-resources"] && data["quranic-resources"].length
      ? data["quranic-resources"]
      : [
          {
            title: "The Clear Quran by Dr. Mustafa Khattab",
            webUrl: "https://online.theclearquran.org/surah",
            mobileUrl: "https://theclearquran.org/tcq-app/",
            description: "",
          },
          {
            title: "Quran translation",
            webUrl: "http://www.islamicstudies.info/quran/saheeh/",
            mobileUrl: "",
            description: "",
          },
          {
            title:
              "An annotated linguistic resource which shows the Arabic grammar, syntax, and morphology for each word in the Holy Quran",
            webUrl: "http://corpus.quran.com/wordbyword.jsp",
            mobileUrl: "",
            description: "",
          },
          {
            title: "Quran recitation/memorizing – various reciters",
            webUrl: "https://quranexplorer.com",
            mobileUrl: "",
            description: "",
          },
        ];

  const sunnah =
    data?.["sunnah-resources"] && data["sunnah-resources"].length
      ? data["sunnah-resources"]
      : [
          {
            title:
              "The Sealed Nectar [PDF]– book on the biography of the Prophet",
            url: "",
            description: "",
          },
          {
            title: "Riyad us Saleheen",
            url: "https://sunnah.com/riyadussalihin",
            description: "A comprehensive list of says of the Prophet",
          },
        ];

  return (
    <section className="bg-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-10 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            {data?.subtitle || "The Foundations"}
          </p>
          <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
            {data?.title || "Build steady knowledge roots"}
          </h2>
          <p
            className="mt-4 max-w-3xl text-base text-gray-600 sm:text-lg"
            dangerouslySetInnerHTML={{
              __html:
                data?.description ||
                "Start with reliable resources covering the Quran, the Sunnah, and the shining example of Prophet Muhammad ﷺ.",
            }}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-gray-100 bg-white p-5 shadow-lg shadow-gray-100 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white font-semibold">
                01
              </span>
              <div>
                <p className="text-base font-semibold uppercase tracking-wide text-slate-700">
                  Quranic Resources
                </p>
              </div>
            </div>
            <ul className="mt-6 space-y-4 text-sm text-gray-700">
              {quranic.map((item, idx) => (
                <li key={idx} className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-base font-medium text-gray-900">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    {item.webUrl && (
                      <>
                        Web:{" "}
                        <a
                          href={item.webUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sky-700 underline-offset-4 hover:underline"
                        >
                          {item.webUrl}
                        </a>
                      </>
                    )}
                    {item.mobileUrl && (
                      <>
                        {item.webUrl && ", "}Mobile App:{" "}
                        <a
                          href={item.mobileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sky-700 underline-offset-4 hover:underline"
                        >
                          {item.mobileUrl}
                        </a>
                      </>
                    )}
                  </p>
                  {item.description && (
                    <p
                      className="mt-1 text-xs text-gray-500"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  )}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-gray-100 bg-white p-5 shadow-lg shadow-gray-100 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white font-semibold">
                02
              </span>
              <div>
                <p className="text-base font-semibold uppercase tracking-wide text-slate-700">
                  Sunnah Resources
                </p>
                <p className="text-sm text-gray-600">
                  example of Prophet Muhammad, peace be upon him
                </p>
              </div>
            </div>
            <ul className="mt-6 space-y-4 text-sm text-gray-700">
              {sunnah.map((item, idx) => (
                <li key={idx} className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-base font-medium text-gray-900">
                    {item.title}
                  </p>
                  {item.url && (
                    <p className="mt-1 text-sm text-gray-700">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-700 underline-offset-4 hover:underline"
                      >
                        {item.url}
                      </a>
                    </p>
                  )}
                  {item.description && (
                    <p
                      className="mt-1 text-xs text-gray-500"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  )}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}


