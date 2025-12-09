"use client";

import Link from "next/link";
import { FormEvent } from "react";

interface ApplyMembershipDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const overview = [
  "Fort Dodge Islamic Center offers two types of membership: paid full membership and associate membership.",
  "Paid full members have the right to vote in General Assembly elections and are eligible to serve on the Board of Directors. The annual membership fee is $30 and applies to members of the General Membership.",
  "Associate members do not have voting privileges, but they are still entitled to all other benefits of membership, such as access to the Center’s facilities and programs.",
  "Please complete this form to establish or renew your membership at Fort Dodge Islamic Center. If you have any questions, please email membership@darularqam.org.",
];

const membershipHighlights = [
  "Voting eligibility",
  "Facility access",
  "Community updates",
];

const instructions = [
  "Complete all required parts clearly.",
  "Submit the form.",
  "The fee for full membership is $30 per person per year. There is no fee for associate membership.",
  "Select the method of payment: debit or credit card through our website, MOHID, or by submitting the fees into the donation box.",
];

const paymentOptions = [
  {
    label: "Donate Portal",
    description: "Use the Arqum donate page for debit/credit payments.",
    href: "/donate",
    external: false,
  },
  {
    label: "MOHID Online",
    description: "Complete dues through the secure Mohid donation flow.",
    href: "https://us.mohid.co/tx/dallas/daic/masjid/online/donation",
    external: true,
  },
];

export default function ApplyMembershipDrawer({
  isOpen,
  onClose,
}: ApplyMembershipDrawerProps) {
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSddImQS6sjm5dzc-IR4Gxj1Po8iMW9tut0ae6ddxp-DkVh2mQ/viewform",
      "_blank",
      "noopener,noreferrer"
    );
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
        aria-labelledby="membership-drawer-title"
      >
        <header className="flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-slate-900 to-sky-900 px-6 py-5 text-white">
          <div className="max-w-xl">
            <h2
              id="membership-drawer-title"
              className="text-xl font-semibold tracking-tight"
            >
              Fort Dodge Islamic Center Membership Application Form
            </h2>
            <p className="mt-1 text-sm text-white/80">
              Submit the quick intake below and finish the official Google Form in the next step.
            </p>
          </div>

          <button
            type="button"
            aria-label="Close membership details"
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
          <div className="mt-4 flex flex-wrap gap-2">
            {membershipHighlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-800"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-sky-100 bg-gradient-to-br from-white to-sky-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
              Instructions
            </p>
            <ul className="mt-3 space-y-3 text-sm text-gray-700">
              {instructions.map((step) => (
                <li key={step} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-600" />
                  <span>{step}</span>
                </li>
              ))}
              <li className="flex flex-col gap-1 rounded-xl bg-gray-50 p-3 text-sm text-gray-700">
                <span className="font-semibold text-gray-900">Online link:</span>
                <Link
                  href="/donate"
                  target="_blank"
                  rel="noreferrer"
                  className="break-all text-sky-700 underline underline-offset-2"
                >
                  https://www.arqum.org/donate
                </Link>
              </li>
              <li className="flex flex-col gap-1 rounded-xl bg-gray-50 p-3 text-sm text-gray-700">
                <span className="font-semibold text-gray-900">MOHID link:</span>
                <Link
                  href="https://us.mohid.co/tx/dallas/daic/masjid/online/donation"
                  target="_blank"
                  rel="noreferrer"
                  className="break-all text-sky-700 underline underline-offset-2"
                >
                  https://us.mohid.co/tx/dallas/daic/masjid/online/donation
                </Link>
              </li>
            </ul>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gray-500">
              Once your application is processed, we will add your email to our members mailing list.
            </p>
          </div>

          <form
            id="apply-membership-form"
            onSubmit={handleFormSubmit}
            className="mt-6 space-y-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="space-y-2">
              <label htmlFor="full-name" className="text-sm font-semibold text-gray-900">
                Full Name <span className="text-rose-600">*</span>
              </label>
              <input
                id="full-name"
                name="fullName"
                type="text"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="mailing-address" className="text-sm font-semibold text-gray-900">
                Mailing Address <span className="text-rose-600">*</span>
              </label>
              <textarea
                id="mailing-address"
                name="mailingAddress"
                required
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone-number" className="text-sm font-semibold text-gray-900">
                Phone Number <span className="text-rose-600">*</span>
              </label>
              <input
                id="phone-number"
                name="phoneNumber"
                type="tel"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-gray-900">
                Email <span className="text-rose-600">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <fieldset className="space-y-3 rounded-xl border border-gray-200 p-4">
              <legend className="text-sm font-semibold text-gray-900">
                Do you want to be added to Fort Dodge Islamic Center mailing list to receive updates and notifications?
                <span className="text-rose-600"> *</span>
              </legend>
              <div className="space-y-2 text-sm text-gray-800">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="mailingList"
                    value="yes"
                    required
                    className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                  />
                  Yes
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="mailingList"
                    value="no"
                    className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                  />
                  No
                </label>
              </div>
            </fieldset>

            <fieldset className="space-y-3 rounded-xl border border-gray-200 bg-slate-50/60 p-4">
              <legend className="text-sm font-semibold text-gray-900">
                Type of Membership <span className="text-rose-600">*</span>
              </legend>
              <div className="space-y-2 text-sm text-gray-800">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="membershipType"
                    value="full"
                    required
                    className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                  />
                  Full Member ($30/Year)
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="membershipType"
                    value="associate"
                    className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                  />
                  Associate Member
                </label>
              </div>
            </fieldset>

          </form>
        </div>
        <div className="border-t border-gray-200 bg-white px-6 py-4">
          <button
            type="submit"
            form="apply-membership-form"
            className="w-full rounded-full bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-900"
          >
            Submit
          </button>
        </div>
      </aside>
    </>
  );
}


