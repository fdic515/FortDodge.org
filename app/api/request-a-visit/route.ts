import { NextResponse } from "next/server";
import { getRequestVisitContent } from "@/lib/request-visit.service";

// Force dynamic rendering for real-time updates
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const requestVisit = await getRequestVisitContent();

    return NextResponse.json(
      {
        ok: true,
        message: "Fetched Request Visit row.",
        requestVisit,
      },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error: any) {
    console.error("[request-a-visit] Error fetching Request Visit content:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Failed to fetch Request Visit content.",
        error: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}

