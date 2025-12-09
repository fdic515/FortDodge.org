"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

/**
 * Client component that subscribes to real-time changes in the Home table.
 * When changes occur, it refreshes the page to show updated content.
 */
export default function HomeRealtimeSubscription() {
  const router = useRouter();

  useEffect(() => {
    // Subscribe to changes in the Home table
    const channel = supabase
      .channel("home-changes")
      .on(
        "postgres_changes",
        {
          event: "*", // Listen to all events (INSERT, UPDATE, DELETE)
          schema: "public",
          table: "Home",
        },
        (payload) => {
          console.log("[HomeRealtimeSubscription] Change detected:", payload);
          // Refresh the page to fetch updated data
          router.refresh();
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  // This component doesn't render anything
  return null;
}

