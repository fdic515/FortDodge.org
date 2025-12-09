"use client";

import Link from "next/link";
import { FormEvent } from "react";

interface FinancialDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const overview = [
  "The aim of the financial assistance program is to provide short-term financial aid to community members experiencing hardship. This support is made possible through Zakat, Sadaqa, and Fitra contributions.",
];

const howToApply = [
  {
    title: "Online Application",
    description:
      "The fastest and most convenient method is to complete the Google Form linked below.",
  },
  {
    title: "Printable Application (optional)",
    description:
      "Download the latest application from our website, fill it out, and return it using any of the options below:",
    bullets: [
      "Place the completed form in the donation box located in the prayer hall.",
      "Email the completed form to treasurer@arqum.org.",
    ],
  },
  {
    title: "Supporting Documents",
    description:
      "Please include recent documents such as bank statements and receipts. These can be scanned and emailed to treasurer@arqum.org.",
  },
];

const maritalStatusOptions = ["Married", "Single", "Divorced", "Widowed"];

const frequencyScale = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const financialFormUrl = "https://forms.gle/financial-assistance";

export default function FinancialDrawer({
  isOpen,
  onClose,
}: FinancialDrawerProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.open(financialFormUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
        onClick={onClose}
      />

      <aside
        className={`fixed top-0 right-0 z-[70] flex h-full w-full max-w-2xl flex-col bg-white transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0 shadow-2xl" : "translate-x-full shadow-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="financial-drawer-title"
      >
        <header className="flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-slate-900 to-sky-900 px-6 py-5 text-white">
          <div className="max-w-xl">
            <h2
              id="financial-drawer-title"
              className="text-xl font-semibold tracking-tight"
            >
              Fort Dodge Islamic Center Financial Assistance Form
            </h2>
            <p className="mt-1 text-sm text-white/80">
              Share your information below. You will finish the official Google Form in the next
              step.
            </p>
          </div>

          <button
            type="button"
            aria-label="Close financial assistance details"
            onClick={onClose}
            className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 pb-7 pt-6">
          <div className="space-y-4">
            {overview.map((text) => (
              <p key={text} className="text-sm leading-relaxed text-gray-700">
                {text}
              </p>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-sky-100 bg-gradient-to-br from-white to-sky-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
              How to apply
            </p>
            <div className="mt-3 space-y-4 text-sm text-gray-700">
              {howToApply.map((item) => (
                <div key={item.title} className="rounded-xl bg-white/80 p-4 shadow-sm">
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="mt-2">{item.description}</p>
                  {item.bullets && (
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700">
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gray-500">
              For help, email{" "}
              <Link
                href="mailto:treasurer@arqum.org"
                className="text-sky-700 underline underline-offset-2"
              >
                treasurer@arqum.org
              </Link>{" "}
              or visit our{" "}
              <Link href="https://arqum.org" className="text-sky-700 underline underline-offset-2">
                website
              </Link>
              . Your privacy will be respected at every step.
            </p>
          </div>

          <form
            id="financial-assistance-form"
            onSubmit={handleSubmit}
            className="mt-6 space-y-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="space-y-2">
              <label htmlFor="applicant-name" className="text-sm font-semibold text-gray-900">
                Applicant Full Name <span className="text-rose-600">*</span>
              </label>
              <input
                id="applicant-name"
                name="applicantName"
                type="text"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="financial-mailing-address" className="text-sm font-semibold text-gray-900">
                Mailing Address <span className="text-rose-600">*</span>
              </label>
              <textarea
                id="financial-mailing-address"
                name="mailingAddress"
                required
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="financial-phone" className="text-sm font-semibold text-gray-900">
                Phone <span className="text-rose-600">*</span>
              </label>
              <input
                id="financial-phone"
                name="phone"
                type="tel"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="financial-email" className="text-sm font-semibold text-gray-900">
                Email <span className="text-rose-600">*</span>
              </label>
              <input
                id="financial-email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <fieldset className="space-y-3 rounded-xl border border-gray-200 p-4">
              <legend className="text-sm font-semibold text-gray-900">
                Marital Status <span className="text-rose-600">*</span>
              </legend>
              <div className="space-y-2 text-sm text-gray-800">
                {maritalStatusOptions.map((status) => (
                  <label key={status} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="maritalStatus"
                      value={status.toLowerCase()}
                      required
                      className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                    />
                    {status}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="space-y-2">
              <label htmlFor="household-members" className="text-sm font-semibold text-gray-900">
                List member of your family living with you and their relationship to you{" "}
                <span className="text-rose-600">*</span>
              </label>
              <textarea
                id="household-members"
                name="householdMembers"
                required
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="assistance-reason" className="text-sm font-semibold text-gray-900">
                Reason You Need Assistance <span className="text-rose-600">*</span>
              </label>
              <textarea
                id="assistance-reason"
                name="assistanceReason"
                required
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="monthly-income" className="text-sm font-semibold text-gray-900">
                Monthly Income <span className="text-rose-600">*</span>
              </label>
              <p className="text-xs text-gray-600">
                Kindly list your current sources of income. Include grants or assistance you receive
                from local, state, or federal government and any other agency.
              </p>
              <textarea
                id="monthly-income"
                name="monthlyIncome"
                required
                rows={3}
                placeholder="Job ($2000)\nGovernment Assistance ($250)"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="monthly-expenses" className="text-sm font-semibold text-gray-900">
                Monthly Expenses <span className="text-rose-600">*</span>
              </label>
              <textarea
                id="monthly-expenses"
                name="monthlyExpenses"
                required
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="assistance-amount" className="text-sm font-semibold text-gray-900">
                Amount of assistance you need <span className="text-rose-600">*</span>
              </label>
              <input
                id="assistance-amount"
                name="assistanceAmount"
                type="text"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <fieldset className="space-y-3 rounded-xl border border-gray-200 p-4">
              <legend className="text-sm font-semibold text-gray-900">
                How often you need assistance? <span className="text-rose-600">*</span>
              </legend>
              <div className="rounded-xl border border-sky-100 bg-sky-50/60 p-4">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                  <span>Month</span>
                  <span>Months</span>
                </div>
                <div className="mt-3 space-y-3">
                  <div className="grid grid-cols-10 text-center text-[0.65rem] font-semibold text-gray-500 sm:text-xs">
                    {frequencyScale.map((value) => (
                      <span key={`label-${value}`}>{value}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-10 gap-1 sm:gap-2">
                    {frequencyScale.map((value, index) => (
                      <label
                        key={value}
                        className="flex flex-col items-center gap-1 text-[0.7rem] text-gray-700"
                      >
                        <input
                          type="radio"
                          name="assistanceFrequency"
                          value={value}
                          required={index === 0}
                          className="peer sr-only"
                        />
                        <span
                          className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-300 bg-white text-[0.6rem] shadow-sm transition peer-checked:border-sky-600 peer-checked:bg-sky-50 sm:h-7 sm:w-7"
                          aria-hidden="true"
                        >
                          <span className="h-2 w-2 rounded-full bg-sky-600 opacity-0 transition peer-checked:opacity-100 sm:h-2.5 sm:w-2.5" />
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </fieldset>
          </form>
        </div>

        <div className="border-t border-gray-200 bg-white px-6 py-4">
          <button
            type="submit"
            form="financial-assistance-form"
            className="w-full rounded-full bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-900"
          >
            Submit
          </button>
        </div>
      </aside>
    </>
  );
}


