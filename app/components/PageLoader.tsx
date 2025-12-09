"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Show loader when pathname changes
    setIsLoading(true);
    setIsVisible(true);

    // Hide loader after 1.5 seconds (between 1-2 seconds as requested)
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Wait for fade-out animation to complete
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#EFF4F7] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-[#E1E6EA]"></div>
          <div className="absolute top-0 left-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-[#5E7A8A] border-r-[#5E7A8A]"></div>
        </div>
        {/* Optional text */}
        <p className="text-sm font-semibold text-[#355160]">Loading...</p>
      </div>
    </div>
  );
}

