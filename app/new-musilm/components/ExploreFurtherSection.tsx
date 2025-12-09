type ExploreItem = {
  title?: string;
  url?: string;
  description?: string;
};

type ExploreFurtherProps = {
  data?: {
    "explore-subtitle"?: string | null;
    "explore-title"?: string | null;
    "explore-description"?: string | null;
    "explore-items"?: ExploreItem[];
  } | null;
};

export default function ExploreFurtherSection({ data }: ExploreFurtherProps) {
  const items: ExploreItem[] =
    data?.["explore-items"] && data["explore-items"].length
      ? data["explore-items"]
      : [
          {
            title: "GainPeace",
            url: "https://gainpeace.com",
            description:
              "is a non-profit organization whose main goal is to educate the general public about Islam and clarify many misconceptions they may hold.",
          },
          {
            title: "Islamic Circle of North America",
            url: "https://www.icna.org",
            description:
              "The Mission of ICNA is to seek the pleasure of Allah (SWT) through the struggle for Iqamat-ud-Deen (application of the Islamic system of life) as spelled out in the Qur’an and the Sunnah of Prophet Muhammad (SAW).",
          },
          {
            title: "Islam Web",
            url: "http://www.islamweb.net/en/",
            description:
              "includes a comprehensive Islamic resource offering a wide range of content including fatwas, articles, Quran recitations, lectures, and prayer times.",
          },
          {
            title: "Discover Islam",
            url: "http://www.ediscoverislam.com/",
            description:
              "offers a platform with comprehensive resources about Islam, the Quran, and Prophet Muhammad. The site includes sections on the Quran, the purpose of life, scientific aspects of Islam, prophets and messengers, and various Islamic resources. It also provides free literature.",
          },
          {
            title: "New Muslims",
            url: "https://www.newmuslims.com/",
            description:
              "It is for new Muslim reverts who would like to learn their new religion in an easy and systematic way. Lessons here are organized under levels. So first you go to lesson 1 under level 1. Study it and then take its quiz. When you pass it move on to lesson 2 and so on. Best wishes.",
          },
        ];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-12 sm:px-6 sm:py-16">
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
            {data?.["explore-subtitle"] || "Explore further"}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            {data?.["explore-title"] || "Expand your circle of learning"}
          </h2>
          <p
            className="mt-4 text-base text-gray-600 sm:text-lg"
            dangerouslySetInnerHTML={{
              __html:
                data?.["explore-description"] ||
                "We hope these resources guide you on your path to gaining beneficial knowledge and bringing you closer to Allah.",
            }}
          />
        </div>
        <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-lg shadow-gray-100 sm:p-6">
          <ul className="space-y-5 text-base text-gray-800">
            {items.map((item, idx) => (
              <li
                key={idx}
                className={`rounded-2xl border border-slate-100 p-5 ${
                  idx % 2 === 0 ? "bg-slate-50" : "bg-white"
                }`}
              >
                <p className="font-semibold text-gray-900">
                  {item.title}{" "}
                  {item.url && (
                    <span>
                      (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-700 underline-offset-4 hover:underline"
                      >
                        {item.url.replace(/^https?:\/\//, "")}
                      </a>
                      )
                    </span>
                  )}
                </p>
                {item.description && (
                  <p
                    className="mt-2 text-sm text-gray-700"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}


