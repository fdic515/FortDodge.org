type SupportAndCommunityProps = {
  data?: {
    "support-subtitle"?: string | null;
    "support-items"?: {
      title?: string;
      phone?: string;
      url?: string;
      description?: string;
    }[];
    "community-subtitle"?: string | null;
    "community-text"?: string | null;
  } | null;
};

export default function SupportAndCommunitySection({
  data,
}: SupportAndCommunityProps) {
  const supportItems =
    data?.["support-items"] && data["support-items"].length
      ? data["support-items"]
      : [
          {
            title: "24-Hour Hotline for Non-Muslims and New Muslims",
            phone: "1-800-662-ISLAM (4752)",
            url: "",
            description: "",
          },
          {
            title: "New Muslim Academy",
            phone: "",
            url: "https://www.newmuslimacademy.org/",
            description:
              "Andrew's story (YouTube Video) New Muslim Academy is an online platform designed to support new Muslims in learning about their faith. It offers free access to structured video classes, webinars, and live interactions with qualified mentors and instructors.",
          },
          {
            title: "Zad Academy Program",
            phone: "",
            url: "https://zad-academy.com/en",
            description:
              "Embark on a 2-year learning journey with free online program. Learn the core principles, beliefs, and teachings of Islam taught by renowned scholars, all from the comfort of your own home.",
          },
        ];

  const communitySubtitle =
    data?.["community-subtitle"] || "Connect with your community";
  const communityText =
    data?.["community-text"] ||
    "Find a local mosque near you using The Islamic Finder (https://www.islamicfinder.org/).";

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6 sm:py-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            {data?.["support-subtitle"] || "Learning and Support"}
          </p>
          <div className="mt-4 rounded-3xl border border-gray-100 bg-white p-5 shadow-lg shadow-gray-100 sm:p-6">
            <ul className="space-y-6 text-base text-gray-800">
              {supportItems.map((item, idx) => (
                <li key={idx} className="rounded-2xl bg-slate-50 p-5">
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  {item.phone && (
                    <p className="mt-1 text-sm text-gray-700">{item.phone}</p>
                  )}
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
                      className="mt-1 text-sm text-gray-700"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            {communitySubtitle}
          </p>
          <div className="mt-4 rounded-3xl border border-gray-100 bg-zinc-50 p-5 shadow-inner sm:p-6">
            <p
              className="text-base text-gray-800"
              dangerouslySetInnerHTML={{ __html: communityText }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}


