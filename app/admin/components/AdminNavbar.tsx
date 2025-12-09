
"use client";

import Image from "next/image";
import Link from "next/link";

type AdminNavbarProps = {
  onToggleSidebar?: () => void;
};

export default function AdminNavbar({ onToggleSidebar }: AdminNavbarProps) {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        {/* Left side: mobile menu + logo */}
        <div className="flex items-center gap-3">
          {/* Mobile sidebar toggle */}
          <button
            type="button"
            aria-label="Toggle admin menu"
            className="cursor-pointer inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 lg:hidden"
            onClick={onToggleSidebar}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <Link
            href="/admin"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Image
              src="/images/fortlogos.png"
              alt="Fort Dodge Islamic Center logo"
              width={240}
              height={60}
              className="h-8 w-auto sm:h-10 md:h-12"
              priority
            />
            <span className="hidden text-sm font-semibold text-gray-800 sm:inline">
              Admin Dashboard
            </span>
          </Link>
        </div>

        {/* Right side: View Site button */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors duration-200 hover:border-gray-400 hover:bg-gray-50 sm:px-4 sm:py-2 sm:text-sm"
          >
            View Site
          </Link>
        </div>
      </div>
    </nav>
  );
}
