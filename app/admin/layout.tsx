"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Allow access to /admin (login page) and /admin/login
    const isLoginPage = pathname === "/admin" || pathname === "/admin/login";
    
    if (isLoginPage) {
      setIsChecking(false);
      setIsAuthenticated(null);
      return;
    }

    // For all other admin routes, check authentication
    const checkAuth = () => {
      try {
        const authStatus = localStorage.getItem("adminAuth");
        
        if (authStatus !== "true") {
          // Not authenticated - redirect to login
          setIsAuthenticated(false);
          setIsChecking(false);
          router.replace("/admin");
          return;
        }
        
        // Authenticated - allow access
        setIsAuthenticated(true);
        setIsChecking(false);
      } catch (error) {
        // If localStorage is not available, redirect to login
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
        setIsChecking(false);
        router.replace("/admin");
      }
    };

    // Check immediately
    checkAuth();

    // Also listen for storage changes (in case user logs out in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "adminAuth" && e.newValue !== "true" && !isLoginPage) {
        router.replace("/admin");
      }
    };

    // Listen for custom storage events (same-tab changes)
    const handleCustomStorageChange = () => {
      if (!isLoginPage) {
        checkAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("adminAuthChange", handleCustomStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("adminAuthChange", handleCustomStorageChange);
    };
  }, [router, pathname]);

  // Show loading while checking authentication
  if (isChecking && pathname !== "/admin" && pathname !== "/admin/login") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Don't render protected content if not authenticated
  if (isAuthenticated === false && pathname !== "/admin" && pathname !== "/admin/login") {
    return null;
  }

  return <>{children}</>;
}

