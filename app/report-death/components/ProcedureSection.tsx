const defaultInformationNeeded = [
  "The caller’s name and phone number",
  "Name and location of deceased",
  "Birth date and date of death",
  "If hospice/doctor has been notified",
];

const defaultFuneralServices = [
  "Transferring the deceased from the hospital to the funeral home",
  "Use of bathing room facilities for washing the deceased",
  "Casket for transporting the deceased",
  "Funeral van for one day",
];

type ProcedureSectionProps = {
  data?: {
    "procedure-title"?: string;
    "procedure-description"?: string;
    "contact-paragraph"?: string;
    "funeral-home-paragraph"?: string;
    "contact-name"?: string;
    "contact-phone"?: string;
    "funeral-home-name"?: string;
    "funeral-home-phone"?: string;
    "funeral-home-address"?: string;
    "information-needed"?: Array<{ text?: string }>;
    "funeral-services"?: Array<{ text?: string }>;
    "ritual-bathing-note"?: string;
    "janazah-note"?: string;
    "payment-note"?: string;
    procedureTitle?: string;
    procedureDescription?: string;
    contactParagraph?: string;
    funeralHomeParagraph?: string;
    contactName?: string;
    contactPhone?: string;
    funeralHomeName?: string;
    funeralHomePhone?: string;
    funeralHomeAddress?: string;
    informationNeeded?: string[];
    funeralServices?: string[];
    ritualBathingNote?: string;
    janazahNote?: string;
    paymentNote?: string;
  } | null;
};

export default function ProcedureSection({ data }: ProcedureSectionProps) {
  const title =
    data?.["procedure-title"] ||
    data?.procedureTitle ||
    "Procedure";
  const description =
    data?.["procedure-description"] ||
    data?.procedureDescription ||
    "Preparing the dead for burial is a Farḍ Kifayah duty, meaning that if some Muslims properly carry out this duty, others are exempt. The process includes bathing the deceased, wrapping the body with a shroud, praying, and burying the body. At Fort Dodge Islamic Center, the Cemetery and Burial Committee coordinates arrangements in consultation with the family.";

  const contactParagraph =
    data?.["contact-paragraph"] ||
    data?.contactParagraph ||
    "The family members should contact Br. Yassir Obeid @ (515) 441-191809 as soon as possible to make the necessary arrangements for preparing the dead for burial.";

  const funeralHomeParagraph =
    data?.["funeral-home-paragraph"] ||
    data?.funeralHomeParagraph ||
    "Next, the family members should call Adams Funeral Home in Ames @ (515) 232-5121 to make arrangements to pick up the deceased from the hospital and transport to Adams Funeral Home for washing and preparing the body for burial. The address is: 502 Douglas Ave, Ames, IA";

  const contactName =
    data?.["contact-name"] ||
    data?.contactName ||
    "Br. Yassir Obeid";
  const contactPhone =
    data?.["contact-phone"] ||
    data?.contactPhone ||
    "(515) 441-1918";
  const funeralHomeName =
    data?.["funeral-home-name"] ||
    data?.funeralHomeName ||
    "Adams Funeral Home in Ames";
  const funeralHomePhone =
    data?.["funeral-home-phone"] ||
    data?.funeralHomePhone ||
    "(515) 232-5121";
  const funeralHomeAddress =
    data?.["funeral-home-address"] ||
    data?.funeralHomeAddress ||
    "502 Douglas Ave, Ames, IA";

  const informationNeeded: string[] =
    (Array.isArray(data?.["information-needed"]) &&
      data!["information-needed"]
        .map((item) => item.text || "")
        .filter(Boolean)) ||
    data?.informationNeeded ||
    defaultInformationNeeded;

  const funeralServices: string[] =
    (Array.isArray(data?.["funeral-services"]) &&
      data!["funeral-services"]
        .map((item) => item.text || "")
        .filter(Boolean)) ||
    data?.funeralServices ||
    defaultFuneralServices;

  const ritualBathingNote =
    data?.["ritual-bathing-note"] ||
    data?.ritualBathingNote ||
    "The ritual bathing and preparation of the body is done by Muslim Brother(s)/Sister(s) in conjunction with a funeral home. Men for the men and women for the women. It is permissible for either spouse to wash the other after death.";
  const janazahNote =
    data?.["janazah-note"] ||
    data?.janazahNote ||
    "The funeral director and staff will take the deceased to the masjid for the Janazah Prayer then to the cemetery for the burial.";
  const paymentNote =
    data?.["payment-note"] ||
    data?.paymentNote ||
    "Approximate cost of burial (may change) [See below]. Make checks payable to Fort Dodge Islamic Center for the total cost of burial.";

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold uppercase tracking-wide text-slate-900 sm:text-3xl">
            {title}
          </h2>

          {/* procedure-description comes from rich-text editor in admin */}
          <div
            className="text-base leading-relaxed text-slate-700 prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: description }}
          />

          <ol className="space-y-6 pl-5 text-base leading-relaxed text-slate-700">
            <li className="marker:text-slate-900">
              <span
                // contact-paragraph is rich-text
                dangerouslySetInnerHTML={{ __html: contactParagraph }}
              />
            </li>
            <li className="marker:text-slate-900">
              <span
                // funeral-home-paragraph is rich-text
                dangerouslySetInnerHTML={{ __html: funeralHomeParagraph }}
              />
            </li>
            <li className="marker:text-slate-900">
              The funeral director will take the following information from the
              family member:
              <ul className="mt-3 list-disc space-y-1 pl-5">
                {informationNeeded.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>

            <li className="marker:text-slate-900">
              Services provided by the Funeral Home:
              <ul className="mt-3 list-disc space-y-1 pl-5">
                {funeralServices.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>

            <li className="marker:text-slate-900">
              <span
                // ritual-bathing-note is rich-text
                dangerouslySetInnerHTML={{ __html: ritualBathingNote }}
              />
            </li>
            <li className="marker:text-slate-900">
              <span
                // janazah-note is rich-text
                dangerouslySetInnerHTML={{ __html: janazahNote }}
              />
            </li>
            <li className="marker:text-slate-900">
              <span
                // payment-note is rich-text
                dangerouslySetInnerHTML={{ __html: paymentNote }}
              />
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

