import { NextResponse } from "next/server";
import { getVisitorGuideContent } from "@/lib/visitor-guide.service";

// Force dynamic rendering for real-time updates
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const visitorGuide = await getVisitorGuideContent();

    return NextResponse.json(
      {
        ok: true,
        message: "Fetched Visitor Guide row.",
        visitorGuide,
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
    console.error("[visitor-guide] Error fetching Visitor Guide content:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Failed to fetch Visitor Guide content.",
        error: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}

