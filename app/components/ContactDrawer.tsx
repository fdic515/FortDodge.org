"use client";

import Link from "next/link";
import { FormEvent } from "react";

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const contactMethods = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/DAIC.Ames/",
    external: true,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/?phone=15152923683",
    external: true,
  },
  {
    label: "Email",
    href: "mailto:info@arqum.org",
    external: false,
  },
  {
    label: "Voicemail",
    href: "tel:15152923683",
    external: false,
    display: "(515) 292-3683",
  },
];

export default function ContactDrawer({
  isOpen,
  onClose,
}: ContactDrawerProps) {
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // You can add form submission logic here
    // For now, we'll just show an alert or you can integrate with your backend
    alert("Thank you for your message! We will get back to you soon.");
    // Reset form
    event.currentTarget.reset();
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
        aria-labelledby="contact-drawer-title"
      >
        <header className="flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-slate-900 to-sky-900 px-6 py-5 text-white">
          <div className="max-w-xl">
            <h2
              id="contact-drawer-title"
              className="text-xl font-semibold tracking-tight"
            >
              Fort Dodge Islamic Center - Contact Us
            </h2>
            <p className="mt-1 text-sm text-white/80">
              To serve you better, we suggest to use any of the different contact means we have available. But, we are happy to receive any anonymous queries or questions via this form.
            </p>
          </div>

          <button
            type="button"
            aria-label="Close contact form"
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
          <div className="space-y-6">
            {/* Contact Methods Section */}
            <div className="rounded-2xl border border-sky-100 bg-gradient-to-br from-white to-sky-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 mb-4">
                Contact Methods
              </p>
              <div className="space-y-3">
                {contactMethods.map((method) => (
                  <div
                    key={method.label}
                    className="flex items-center justify-between rounded-xl bg-gray-50 p-3"
                  >
                    <span className="text-sm font-semibold text-gray-900">
                      {method.label}:
                    </span>
                    <Link
                      href={method.href}
                      target={method.external ? "_blank" : undefined}
                      rel={method.external ? "noreferrer" : undefined}
                      className="break-all text-sm text-sky-700 underline underline-offset-2 hover:text-sky-900"
                    >
                      {method.display || method.href.replace(/^(mailto:|tel:)/, "")}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Section */}
            <form
              id="contact-form"
              onSubmit={handleFormSubmit}
              className="space-y-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <p className="text-xs text-gray-500 mb-4">
                <span className="text-rose-600">*</span> Indicates required question
              </p>

              <div className="space-y-2">
                <label htmlFor="full-name" className="text-sm font-semibold text-gray-900">
                  Full Name <span className="text-rose-600">*</span>
                </label>
                <input
                  id="full-name"
                  name="fullName"
                  type="text"
                  required
                  placeholder="Your answer"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
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
                  placeholder="Your answer"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-semibold text-gray-900">
                  Phone <span className="text-rose-600">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="Your answer"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-gray-900">
                  Message <span className="text-rose-600">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Your answer"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black resize-none"
                />
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 bg-white px-6 py-4">
          <button
            type="submit"
            form="contact-form"
            className="w-full rounded-full bg-black px-4 py-3 text-sm font-semibold text-white transition hover:from-purple-700 hover:to-purple-800"
          >
            Submit
          </button>
        </div>
      </aside>
    </>
  );
}

