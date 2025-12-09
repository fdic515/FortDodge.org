"use client";

import Link from "next/link";
import { FormEvent } from "react";

interface ReserveBasementDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const introCopy = [
  "This form is intended for members and affiliates of Fort Dodge Islamic Center seeking to reserve the basement space for various activities and events. Our basement is a versatile space, ideal for gatherings, educational sessions, community events, and more. Please fill out this form to begin the reservation process. All requests are subject to review based on our policy guidelines and availability.",
  "Note: Please allow at least 2 days for us to process your request. We do not guarantee same-day reservations, so plan in advance.",
];

const contactDetails = [
  { label: "Phone", value: "(515) 528-3618", href: "tel:15155283618" },
  { label: "Email", value: "info@arqum.org", href: "mailto:info@arqum.org" },
];

const policyItems = [
  {
    title: "1. Safety First:",
    description:
      "The safety of our community is our top priority. The basement contains electrical components and utility rooms, which can be hazardous, especially to children. It is imperative that these areas are treated with caution.",
  },
  {
    title: "2. Adult Supervision Required for Children:",
    description:
      "Children are welcome to participate in activities held in the basement; however, they must be under adult supervision at all times. Unscheduled, unsupervised access by children to the basement is strictly prohibited to prevent accidents.",
  },
  {
    title: "3. Prioritizing Space for Community Activities:",
    description:
      "While we understand the need for recreational space for children, the primary purpose of the basement is to serve as an additional space for community activities, educational purposes, and events. Therefore, reservation requests will be prioritized based on these needs.",
  },
  {
    title: "4. Respect for the Space:",
    description:
      "All users of the basement are expected to respect the space. This includes maintaining cleanliness, ensuring all equipment and facilities are used appropriately, and leaving the space in the same condition as it was found.",
  },
  {
    title: "5. Compliance with Islamic Center Rules and Regulations:",
    description:
      "All activities in the basement must adhere to the overall rules and guidelines of the Fort Dodge Islamic Center. Any activities contrary to these guidelines will not be permitted.",
  },
  {
    title: "6. Reservation Review and Confirmation:",
    description:
      "Submission of this form does not guarantee a reservation. All requests will be reviewed. We will contact you via email communications as soon as possible to confirm availability. Please wait for our confirmation before proceeding with arrangements.",
  },
  {
    title: "7. Cleaning:",
    description:
      "The reservation holder will be responsible to clean and remove trash from the basement after the reservation ends. They will also vacuum and return everything as it was before the reservation.",
  },
  {
    title: "8. Community Use:",
    description:
      "The basement is intended for community use and a safe, respectful, and beneficial use of the basement space for our community.",
  },
];

const RESERVATION_FORM_URL =
  process.env.NEXT_PUBLIC_RESERVE_BASEMENT_FORM_URL ||
  "https://forms.gle/ReserveBasementForm";

export default function ReserveBasementDrawer({
  isOpen,
  onClose,
}: ReserveBasementDrawerProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.open(RESERVATION_FORM_URL, "_blank", "noopener,noreferrer");
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
        aria-labelledby="reserve-basement-title"
      >
        <header className="flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-slate-900 to-sky-900 px-6 py-5 text-white">
          <div className="max-w-xl">
            <h2
              id="reserve-basement-title"
              className="text-xl font-semibold tracking-tight"
            >
              Fort Dodge Islamic Center Basement Reservation Form
            </h2>
            <p className="mt-1 text-sm text-white/80">
              Provide your event details to request basement usage for classes,
              gatherings, or community events.
            </p>
          </div>

          <button
            type="button"
            aria-label="Close reserve basement drawer"
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
          <section className="space-y-4">
            {introCopy.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-gray-700">
                {paragraph}
              </p>
            ))}
          </section>

          <div className="mt-4 flex flex-wrap gap-2">
            {contactDetails.map((detail) => (
              <Link
                key={detail.label}
                href={detail.href}
                target={detail.href.startsWith("http") ? "_blank" : undefined}
                rel={detail.href.startsWith("http") ? "noreferrer" : undefined}
                className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-900 transition hover:bg-sky-100"
              >
                <span>{detail.label}</span>
                <span className="tracking-normal text-slate-900">{detail.value}</span>
              </Link>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
              Basement Usage Policy
            </p>
            <ol className="mt-3 space-y-3 text-sm text-gray-700">
              {policyItems.map((item) => (
                <li key={item.title} className="space-y-1">
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p>{item.description}</p>
                </li>
              ))}
            </ol>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="space-y-2">
              <label htmlFor="reservation-name" className="text-sm font-semibold text-gray-900">
                Name <span className="text-rose-600">*</span>
              </label>
              <input
                id="reservation-name"
                name="name"
                type="text"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="reservation-email" className="text-sm font-semibold text-gray-900">
                Email address <span className="text-rose-600">*</span>
              </label>
              <input
                id="reservation-email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="reservation-phone" className="text-sm font-semibold text-gray-900">
                Contact number <span className="text-rose-600">*</span>
              </label>
              <input
                id="reservation-phone"
                name="phone"
                type="tel"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="reservation-date" className="text-sm font-semibold text-gray-900">
                  Date of reservation <span className="text-rose-600">*</span>
                </label>
                <input
                  id="reservation-date"
                  name="reservationDate"
                  type="date"
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="reservation-time" className="text-sm font-semibold text-gray-900">
                  Time of reservation
                </label>
                <input
                  id="reservation-time"
                  name="reservationTime"
                  type="time"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="reservation-purpose" className="text-sm font-semibold text-gray-900">
                Purpose of reservation <span className="text-rose-600">*</span>
              </label>
              <textarea
                id="reservation-purpose"
                name="purpose"
                rows={3}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <label className="flex items-start gap-3 rounded-xl border border-gray-200 bg-slate-50/60 p-3 text-sm text-gray-800">
              <input
                type="checkbox"
                required
                className="mt-1 h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
              />
              <span>
                I agree to abide by these policies and ensure a safe, respectful, and beneficial use
                of the basement space for our community.
              </span>
            </label>

           
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

