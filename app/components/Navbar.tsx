"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ApplyMembershipDrawer from "./ApplyMembershipDrawer";
import FinancialDrawer from "./FinancialDrawer";
import DoorAccessDrawer from "./DoorAccessDrawer";
import ReserveBasementDrawer from "./ReserveBasementDrawer";
import ContactDrawer from "./ContactDrawer";

type MenuItem = {
  label: string;
  href: string;
  isButton?: boolean;
};

type ResourceMenuItem = {
  label: string;
  href: string;
  external?: boolean;
  drawer?: "membership" | "financial" | "doorAccess" | "reserveBasement";
};

const menuItems: MenuItem[] = [
  { label: "Home", href: "/" },
  { label: "Ramadan", href: "/ramadan" },
  { label: "Donate", href: "/donate", isButton: true },
  { label: "New Muslims", href: "/new-musilm" },
  { label: "Report A Death", href: "/report-death" },
  { label: "Resources", href: "/resources" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const resourcesMenuItems: ResourceMenuItem[] = [
  { label: "Request a Speaker", href: "/resources/request-a-speaker" },
  { label: "Request a Visit", href: "/resources/request-a-visit" },
  { label: "Visitors Guide", href: "/resources/visitors-guide" },
  { label: "Islamic Prayer", href: "/resources/islamic-prayer" },
  { label: "Islamic School", href: "/resources/islamic-school" },
  { label: "Elections & Nominations", href: "/resources/elections-nominations" },
  {
    label: "Apply/Renew Membership",
    href: "/resources/apply-renew-membership",
    drawer: "membership",
  },
  { label: "By Laws", href: "https://drive.google.com/file/d/1xFQ6g0plhCzVIaCvglVPC1nykuICqRWL/view?usp=sharing", external: true },
  { label: "Fundraising Policy", href: "https://drive.google.com/file/d/1byjbEt3yWlf2II2mjkHd74VzDJBDeVkD/view?usp=sharing", external: true },
  { label: "Meeting Minutes", href: "https://drive.google.com/drive/folders/17nWT8C6jEZm5XK8oqKNEM1fzzXOcDsa0", external: true },
  {
    label: "Financial Assistance",
    href: "/resources#financial-assistance",
    drawer: "financial",
  },
  { label: "Request Door Access", href: "/resources#request-door-access", drawer: "doorAccess" },
  { label: "Reserve Basement", href: "/resources#reserve-basement", drawer: "reserveBasement" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);
  const [isMembershipDrawerOpen, setIsMembershipDrawerOpen] = useState(false);
  const [isFinancialDrawerOpen, setIsFinancialDrawerOpen] = useState(false);
  const [isDoorAccessDrawerOpen, setIsDoorAccessDrawerOpen] = useState(false);
  const [isReserveBasementDrawerOpen, setIsReserveBasementDrawerOpen] = useState(false);
  const [isContactDrawerOpen, setIsContactDrawerOpen] = useState(false);
  const [pageVisibility, setPageVisibility] = useState<Record<string, boolean>>({});
  const [visibilityLoaded, setVisibilityLoaded] = useState<boolean>(false);
  const pathname = usePathname();

  // Fetch page visibility status - use single API call for faster loading
  useEffect(() => {
    async function fetchPageVisibility() {
      try {
        // Single API call to get all visibility data at once
        const response = await fetch("/api/page-visibility");
        const result = await response.json();
        
        if (result.ok && result.visibility) {
          // Map page names to hrefs
          const hrefMap: Record<string, string> = {
            "home": "/",
            "ramadan": "/ramadan",
            "donate": "/donate",
            "new-muslim": "/new-musilm",
            "report-death": "/report-death",
            "resources": "/resources",
            "about": "/about",
            "request-a-speaker": "/resources/request-a-speaker",
            "request-a-visit": "/resources/request-a-visit",
            "visitors-guide": "/resources/visitors-guide",
            "islamic-prayer": "/resources/islamic-prayer",
            "islamic-school": "/resources/islamic-school",
            "elections-nominations": "/resources/elections-nominations",
          };

          const visibility: Record<string, boolean> = {};
          
          // Convert page names to hrefs
          Object.entries(result.visibility).forEach(([pageName, isVisible]) => {
            const href = hrefMap[pageName];
            if (href) {
              visibility[href] = isVisible as boolean;
            }
          });

          setPageVisibility(visibility);
          setVisibilityLoaded(true);
        } else {
          // On error, set all to visible and mark as loaded
          setVisibilityLoaded(true);
        }
      } catch (error) {
        console.error("Failed to fetch page visibility:", error);
        // On error, set all to visible and mark as loaded
        setVisibilityLoaded(true);
      }
    }

    fetchPageVisibility();
  }, []);

  const isResourceActive = (href: string) => {
    const basePath = href.split("#")[0];

    // For links that point to a section on the main /resources page
    // (e.g. /resources#visitors-guide), we don't treat individual
    // sections as "active" to avoid highlighting all items at once.
    if (basePath === "/resources" && href.includes("#")) {
      return false;
    }

    // Exact match for the main /resources page link
    if (basePath === "/resources" && !href.includes("#")) {
      return pathname === "/resources";
    }

    // Match any dedicated sub-page like /resources/request-a-speaker
    return pathname?.startsWith(basePath);
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  const overlayActive = isMenuOpen || isMembershipDrawerOpen || isFinancialDrawerOpen || isDoorAccessDrawerOpen || isReserveBasementDrawerOpen || isContactDrawerOpen;

  // Disable body scroll when menu or drawer is open
  useEffect(() => {
    if (overlayActive) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    // Cleanup function
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [overlayActive]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openSearch = () => {
    setIsSearchOpen(true);
    setIsMenuOpen(false); // Close menu if open
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const openMembershipDrawer = () => {
    setIsMembershipDrawerOpen(true);
    setIsMenuOpen(false);
  };

  const closeMembershipDrawer = () => {
    setIsMembershipDrawerOpen(false);
  };

  const openFinancialDrawer = () => {
    setIsFinancialDrawerOpen(true);
    setIsMenuOpen(false);
  };

  const closeFinancialDrawer = () => {
    setIsFinancialDrawerOpen(false);
  };

  const openDoorAccessDrawer = () => {
    setIsDoorAccessDrawerOpen(true);
    setIsMenuOpen(false);
  };

  const closeDoorAccessDrawer = () => {
    setIsDoorAccessDrawerOpen(false);
  };

  const openReserveBasementDrawer = () => {
    setIsReserveBasementDrawerOpen(true);
    setIsMenuOpen(false);
  };

  const closeReserveBasementDrawer = () => {
    setIsReserveBasementDrawerOpen(false);
  };

  const openContactDrawer = () => {
    setIsContactDrawerOpen(true);
    setIsMenuOpen(false);
  };

  const closeContactDrawer = () => {
    setIsContactDrawerOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white/95 shadow-md backdrop-blur">
      {/* Search Mode */}
      <div
        className={`fixed inset-x-0 top-0 z-[60] bg-white/95 transition-opacity duration-200 ${
          isSearchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-4 py-4 flex items-center justify-center gap-4 bg-gray-50 shadow-md">
          <button
            type="button"
            onClick={closeSearch}
            aria-label="Close search"
            className="p-2 text-sky-900 hover:bg-gray-200 rounded-md transition-colors duration-200 absolute left-4"
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
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="relative max-w-md w-full">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-900">
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
                <circle cx="11" cy="11" r="7" />
                <line x1="16.65" y1="16.65" x2="21" y2="21" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search this site"
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-lg border border-gray-200 text-sky-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-200"
              autoFocus={isSearchOpen}
            />
          </div>
        </div>
      </div>

      {/* Normal Navbar */}
      <div className="transition-opacity duration-200">
        <div className="px-6 py-2 flex items-center justify-between">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image
              src="/images/fortlogos.png"
              alt="Fort Dodge Islamic Center logo"
              width={400}
              height={100}
              className="h-17 w-auto"
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex flex-wrap items-center gap-x-4 gap-y-2">
            {menuItems.map((item) => {
              // Check visibility - show by default, hide only if explicitly false
              // Single API call loads fast, so flash is minimal
              const isVisible = pageVisibility[item.href] !== undefined ? pageVisibility[item.href] : true;
              if (!isVisible) return null; // Hide if explicitly false
              
              const active = isActive(item.href);

              if (item.label === "Resources") {
                return (
                  <div key={item.label} className="relative group">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-1 cursor-pointer rounded-md px-3 py-1.5 whitespace-nowrap font-bold tracking-wide transition-colors duration-200 ${
                        active
                          ? "bg-sky-800 text-white"
                          : "text-sky-900 hover:text-gray-600"
                      }`}
                    >
                      <span>{item.label}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </Link>

                    <div className="invisible absolute left-1/2 z-50 mt-2 w-72 -translate-x-1/2 transform rounded-none border border-gray-200 bg-white/98 py-1.5 text-sm text-gray-800 opacity-0 shadow-lg shadow-gray-300 ring-1 ring-black/5 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                      {resourcesMenuItems.map((resource) => {
                        // Check visibility for resource items (skip drawers and external links)
                        if (!resource.drawer && !resource.external) {
                          // Show by default, hide only if explicitly false
                          const isVisible = pageVisibility[resource.href] !== undefined ? pageVisibility[resource.href] : true;
                          if (!isVisible) return null;
                        }
                        
                        const activeResource = isResourceActive(resource.href);
                        return (
                          <Link
                            key={resource.href}
                            href={resource.href}
                            onClick={(event) => {
                              if (resource.drawer) {
                                event.preventDefault();
                                if (resource.drawer === "membership") {
                                  openMembershipDrawer();
                                } else if (resource.drawer === "financial") {
                                  openFinancialDrawer();
                                } else if (resource.drawer === "doorAccess") {
                                  openDoorAccessDrawer();
                                } else if (resource.drawer === "reserveBasement") {
                                  openReserveBasementDrawer();
                                }
                              }
                            }}
                            className={`flex items-center px-5 py-2.5 text-left text-[0.9rem] border-b border-gray-100 last:border-b-0 transition-colors hover:bg-gray-100 hover:text-gray-900`}
                          >
                            <span className="mr-2 h-1 w-1 rounded-full bg-gray-400" />
                            <span
                              className={`truncate inline-block px-2 py-0.5 text-[0.78rem] font-semibold ${
                                activeResource
                                  ? "bg-sky-800 text-white"
                                  : "bg-transparent text-sky-900"
                              }`}
                            >
                              {resource.label}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              if (item.label === "Contact Us") {
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={openContactDrawer}
                    aria-current={active ? "page" : undefined}
                    className={`cursor-pointer rounded-md px-2 py-1 whitespace-nowrap font-bold transition-colors duration-200 ${
                      active
                        ? "bg-sky-800 text-white"
                        : "text-sky-900 hover:text-gray-600"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`cursor-pointer rounded-md px-2 py-1 whitespace-nowrap font-bold transition-colors duration-200 ${
                    active
                      ? "bg-sky-800 text-white"
                      : "text-sky-900 hover:text-gray-600"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <button
              type="button"
              onClick={openSearch}
              aria-label="Search"
              className="ml-4 rounded-full border border-gray-300 p-2 text-sky-900 hover:bg-gray-100 transition-all duration-200"
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
                <circle cx="11" cy="11" r="7" />
                <line x1="16.65" y1="16.65" x2="21" y2="21" />
              </svg>
            </button>
          </div>

          {/* Hamburger Menu Button - Mobile & Tablet */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-all duration-200"
          >
            {isMenuOpen ? (
              // Close icon (X)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 transition-transform duration-200"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 transition-transform duration-200"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Menu */}
      <div
        className={`lg:hidden overflow-y-auto transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 bg-white border-t border-gray-200">
          <div className="flex flex-col space-y-4">
            {menuItems.map((item) => {
              // Check visibility - show by default, hide only if explicitly false
              const isVisible = pageVisibility[item.href] !== undefined ? pageVisibility[item.href] : true;
              if (!isVisible) return null; // Hide if explicitly false
              
              const active = isActive(item.href);

              if (item.label === "Resources") {
                return (
                  <div key={item.label} className="space-y-2">
                    <button
                      type="button"
                      onClick={() =>
                        setIsMobileResourcesOpen((prev) => !prev)
                      }
                      aria-expanded={isMobileResourcesOpen}
                      className={`flex w-full items-center justify-between rounded-md px-3 py-2 font-bold transition-colors ${
                        active || isMobileResourcesOpen
                          ? "bg-sky-800 text-white"
                          : "text-sky-900 hover:text-gray-900"
                      }`}
                    >
                      <span>{item.label}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`h-5 w-5 transform transition-transform duration-200 ${
                          isMobileResourcesOpen ? "rotate-180" : "rotate-0"
                        }`}
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    <div
                      className={`ml-3 flex flex-col space-y-1 overflow-hidden transition-[max-height,opacity] duration-300 ${
                        isMobileResourcesOpen
                          ? "max-h-[75vh] overflow-y-auto pr-1 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className="rounded-md px-3 py-1.5 text-sm font-semibold text-gray-800 underline underline-offset-2 hover:bg-gray-100"
                      >
                        View all resources
                      </Link>
                      {resourcesMenuItems.map((resource) => {
                        // Check visibility for resource items (skip drawers and external links)
                        if (!resource.drawer && !resource.external) {
                          // Show by default, hide only if explicitly false
                          const isVisible = pageVisibility[resource.href] !== undefined ? pageVisibility[resource.href] : true;
                          if (!isVisible) return null;
                        }
                        
                        const activeResource = isResourceActive(resource.href);
                        return (
                          <Link
                            key={resource.href}
                            href={resource.href}
                            onClick={(event) => {
                              if (resource.drawer) {
                                event.preventDefault();
                                if (resource.drawer === "membership") {
                                  openMembershipDrawer();
                                } else if (resource.drawer === "financial") {
                                  openFinancialDrawer();
                                } else if (resource.drawer === "doorAccess") {
                                  openDoorAccessDrawer();
                                } else if (resource.drawer === "reserveBasement") {
                                  openReserveBasementDrawer();
                                }
                                setIsMobileResourcesOpen(false);
                              } else {
                                closeMenu();
                              }
                            }}
                            className="rounded-md px-3 py-1.5 text-sm transition-colors text-gray-700 hover:bg-gray-100"
                          >
                            <span
                              className={`inline-block px-2 py-0.5 text-[0.78rem] font-semibold ${
                                activeResource
                                  ? "bg-sky-800 text-white"
                                  : "bg-transparent text-sky-900"
                              }`}
                            >
                              {resource.label}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              if (item.label === "Contact Us") {
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      openContactDrawer();
                      closeMenu();
                    }}
                    aria-current={active ? "page" : undefined}
                    className={`cursor-pointer rounded-md px-3 py-2 font-bold transition-colors w-full text-left ${
                      active
                        ? "bg-sky-800 text-white"
                        : "text-sky-900 hover:text-gray-900"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={active ? "page" : undefined}
                  className={`cursor-pointer rounded-md px-3 py-2 font-bold transition-colors ${
                    active
                      ? "bg-sky-800 text-white"
                      : "text-sky-900 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search"
              className="mt-2 rounded-full border border-gray-300 p-2 text-sky-900 hover:bg-gray-100 transition-colors w-fit"
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
                <circle cx="11" cy="11" r="7" />
                <line x1="16.65" y1="16.65" x2="21" y2="21" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      </nav>
      <ApplyMembershipDrawer
        isOpen={isMembershipDrawerOpen}
        onClose={closeMembershipDrawer}
      />
      <FinancialDrawer
        isOpen={isFinancialDrawerOpen}
        onClose={closeFinancialDrawer}
      />
      <DoorAccessDrawer
        isOpen={isDoorAccessDrawerOpen}
        onClose={closeDoorAccessDrawer}
        onOpenMembershipDrawer={openMembershipDrawer}
      />
      <ReserveBasementDrawer
        isOpen={isReserveBasementDrawerOpen}
        onClose={closeReserveBasementDrawer}
      />
      <ContactDrawer
        isOpen={isContactDrawerOpen}
        onClose={closeContactDrawer}
      />
    </>
  );
}

  