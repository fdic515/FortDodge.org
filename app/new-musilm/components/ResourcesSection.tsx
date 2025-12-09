type ResourceItems = {
  title?: string;
  pdfUrl?: string;
  hardCopyUrl?: string;
  wikiUrl?: string;
  url?: string;
  description?: string;
};

type ResourcesSectionProps = {
  data?: {
    "resources-subtitle"?: string | null;
    "resources-title"?: string | null;
    "resource-items"?: ResourceItems[];
  } | null;
};

export default function ResourcesSection({ data }: ResourcesSectionProps) {
  const items: ResourceItems[] =
    data?.["resource-items"] && data["resource-items"].length
      ? data["resource-items"]
      : [
          {
            title: "The New Muslim Guide",
            pdfUrl: "https://www.newmuslimguide.com/en/download/",
            hardCopyUrl: "https://www.newmuslimguide.com/en/order/",
            description:
              "Simple rules and important Islamic guidelines for new Muslims in all aspects of life. This exquisitely illustrated guide presents you with the first step and the foundation stage in learning about this great religion, which is undoubtedly the best blessing Allah has bestowed on upon man.",
          },
          {
            title: "Tell Me How To Pray",
            pdfUrl:
              "https://www.newmuslimguide.com/en/wp-content/uploads/2020/10/Tell-Me-How-to-Pray.pdf",
            hardCopyUrl: "https://www.newmuslimguide.com/en/order/",
            wikiUrl: "https://en.wikipedia.org/wiki/Salah",
            description:
              "Learn the basics of praying, from making wudu to positioning your hands in prayer. The basics are covered for you in this detailed guide so that you can gain a better understanding.",
          },
          {
            title: "Tell Me About Allah",
            hardCopyUrl: "https://www.newmuslimguide.com/en/order/",
            description:
              "This little gem of a book guides you through all the 99 of Allah (SWT) so you can get to know Allah (SWT) In sha Allah.",
          },
          {
            title: "Tell Me About Islam",
            hardCopyUrl: "https://www.newmuslimguide.com/en/order/",
            description:
              "This guide takes you through the six articles of faith in detail, followed by the five pillars and some further aspects of Islam.",
          },
          {
            title: "New Muslim Guide",
            url: "https://www.newmuslimguide.com/",
          },
        ];

  return (
    <section className="bg-zinc-50">
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-12 sm:px-6 sm:py-16">
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            {data?.["resources-subtitle"] || "Resources on Islam"}
          </p>
          <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
            {data?.["resources-title"] || "Study, review, and grow with confidence"}
          </h2>
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
                  {(item.pdfUrl || item.hardCopyUrl || item.wikiUrl) && (
                    <span className="text-sm font-medium text-sky-700">
                      {item.pdfUrl && (
                        <>
                          [
                          <a
                            href={item.pdfUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="underline-offset-4 hover:underline"
                          >
                            PDF
                          </a>
                          ]{" "}
                        </>
                      )}
                      {item.wikiUrl && (
                        <>
                          [
                          <a
                            href={item.wikiUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="underline-offset-4 hover:underline"
                          >
                            Wiki
                          </a>
                          ]{" "}
                        </>
                      )}
                      {item.hardCopyUrl && (
                        <>
                          [
                          <a
                            href={item.hardCopyUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="underline-offset-4 hover:underline"
                          >
                            Hard Copy - Free
                          </a>
                          ]
                        </>
                      )}
                    </span>
                  )}
                  {item.url && !item.pdfUrl && !item.hardCopyUrl && !item.wikiUrl && (
                    <span className="text-sm font-medium text-sky-700">
                      {" "}
                      -{" "}
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="underline-offset-4 hover:underline"
                      >
                        {item.url}
                      </a>
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


