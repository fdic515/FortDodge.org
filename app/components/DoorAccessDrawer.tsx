"use client";

import Link from "next/link";
import { FormEvent } from "react";

interface DoorAccessDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenMembershipDrawer: () => void;
}

const policyIntro = [
  "Fort Dodge Islamic Center is committed to the safety and security of its members. In line with this commitment, we are introducing a new door security policy. Starting 2/1/2024, The doors of the Islamic Center will be unlocked during regular prayer times (15 minutes before Athan and will remain open 15 minutes past Iqama), but access will be restricted at other times for enhanced security. To access the center's premises at other times, community members are required to sign up and obtain a unique access code.",
  "Please complete the following form accurately and thoroughly to request your access code. Once your request is approved, you will receive a confirmation email containing your unique access code. This code will be necessary for entry into the Fort Dodge Islamic Center outside prayer times.",
];

const policyAgreement = [
  "I understand that the access code provided is for my personal use only.",
  "I agree not to share my access code with anyone else.",
  "I will promptly report any loss or compromise of my access code to the Fort Dodge Islamic Center management.",
];

export default function DoorAccessDrawer({
  isOpen,
  onClose,
  onOpenMembershipDrawer,
}: DoorAccessDrawerProps) {
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Add form submission logic or redirect to Google Form
    // For now, you can add the Google Form URL here
    // window.open(
    //   "YOUR_GOOGLE_FORM_URL_HERE",
    //   "_blank",
    //   "noopener,noreferrer"
    // );
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
        aria-labelledby="door-access-drawer-title"
      >
        <header className="flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-slate-900 to-sky-900 px-6 py-5 text-white">
          <div className="max-w-xl">
            <h2
              id="door-access-drawer-title"
              className="text-xl font-semibold tracking-tight"
            >
              Fort Dodge Islamic Center Door Security Access Code Request Form
            </h2>
            <p className="mt-1 text-sm text-white/80">
              Request your unique access code for entry outside regular prayer times.
            </p>
          </div>

          <button
            type="button"
            aria-label="Close door access details"
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
            {policyIntro.map((text, index) => (
              <p key={index} className="text-sm leading-relaxed text-gray-700">
                {text}
              </p>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-sky-100 bg-gradient-to-br from-white to-sky-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
              Security Policy
            </p>
            <p className="mt-3 text-xs text-gray-600">
              * Indicates required question
            </p>
          </div>

          <form
            id="door-access-form"
            onSubmit={handleFormSubmit}
            className="mt-6 space-y-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="space-y-2">
              <label htmlFor="full-name" className="text-sm font-semibold text-gray-900">
                Full Name (First and Last name) <span className="text-rose-600">*</span>
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
              <label htmlFor="mobile-number" className="text-sm font-semibold text-gray-900">
                Mobile Number <span className="text-rose-600">*</span>
              </label>
              <input
                id="mobile-number"
                name="mobileNumber"
                type="tel"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-gray-900">
                Email Address <span className="text-rose-600">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="residential-address" className="text-sm font-semibold text-gray-900">
                Residential Address <span className="text-rose-600">*</span>
              </label>
              <textarea
                id="residential-address"
                name="residentialAddress"
                required
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="organization" className="text-sm font-semibold text-gray-900">
                Working/studying Organization <span className="text-rose-600">*</span>
              </label>
              <input
                id="organization"
                name="organization"
                type="text"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="access-reason" className="text-sm font-semibold text-gray-900">
                Specify the reason for requiring access (prayer, event, meeting, etc.) at times outside the regular prayer times. Access outside regular unlock times, will be reviewed based on the need of the personnel. <span className="text-rose-600">*</span>
              </label>
              <textarea
                id="access-reason"
                name="accessReason"
                required
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <fieldset className="space-y-3 rounded-xl border border-gray-200 p-4">
              <legend className="text-sm font-semibold text-gray-900">
                Do you want to become a member of Fort Dodge Islamic Center? We advise everyone to apply for membership. Regular membership is always free. The voting membership costs $30 per year.
                <span className="text-rose-600"> *</span>
              </legend>
              <div className="space-y-2 text-sm text-gray-800">
                <label className="flex items-start gap-2">
                  <input
                    type="radio"
                    name="membership"
                    value="yes"
                    required
                    className="mt-1 h-4 w-4 border-gray-300 text-black focus:ring-black"
                  />
                  <span>
                    Yes, please fill the form via the membership drawer{" "}
                    <Link
                      href="https://forms.gle/xtiX7nYHEWLfoEfy8"
                      className="text-sky-700 underline underline-offset-2"
                      onClick={(event) => {
                        event.preventDefault();
                        onClose();
                        onOpenMembershipDrawer();
                      }}
                    >
                      Open Membership Drawer
                    </Link>
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="membership"
                    value="no"
                    className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                  />
                  No
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="membership"
                    value="current"
                    className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                  />
                  I am currently a member
                </label>
              </div>
            </fieldset>

            <div className="rounded-xl border border-gray-200 bg-slate-50/60 p-4">
              <p className="text-sm text-gray-900 mb-3">
                By submitting this form, I confirm that all the information provided is accurate and complete and I have read and agree to abide by the following Fort Dodge Islamic Center's door security policy:
              </p>
              <ul className="space-y-2 mb-4">
                {policyAgreement.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-800">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <label className="flex items-center gap-2 text-sm text-gray-800">
                <input
                  type="checkbox"
                  name="agreement"
                  required
                  className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                />
                I agree
              </label>
            </div>
          </form>
        </div>
        <div className="border-t border-gray-200 bg-white px-6 py-4">
          <button
            type="submit"
            form="door-access-form"
            className="w-full rounded-full bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-900"
          >
            Submit
          </button>
        </div>
      </aside>
    </>
  );
}

