"use client";

import { type ReactNode, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

type PageEditorLayoutProps = {
  children: ReactNode;
  pageTitle: string;
  pageDescription?: string;
};

export default function PageEditorLayout({
  children,
  pageTitle,
  pageDescription,
}: PageEditorLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-50">
      <AdminNavbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      <div className="flex pt-16">
        {/* Admin sidebar (collapsible on mobile) */}
        <AdminSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Backdrop for mobile/tablet sidebar */}
        {isSidebarOpen && (
          <button
            type="button"
            aria-label="Close sidebar"
            className="cursor-pointer fixed inset-0 z-30 bg-black/30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main className="flex-1 w-full min-h-[calc(100vh-4rem)] overflow-x-auto p-4 sm:p-6 md:p-8 lg:ml-64">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-8">
              <h1 className="mb-2 text-2xl font-bold text-sky-900 sm:text-3xl">
                {pageTitle}
              </h1>
              {pageDescription && (
                <p className="text-sm text-gray-600 sm:text-base">
                  {pageDescription}
                </p>
              )}
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

