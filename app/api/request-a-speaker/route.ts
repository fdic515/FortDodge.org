import { NextResponse } from "next/server";
import { getRequestSpeakerContent } from "@/lib/request-speaker.service";

// Force dynamic rendering for real-time updates
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const requestSpeaker = await getRequestSpeakerContent();

    return NextResponse.json(
      {
        ok: true,
        message: "Fetched Request Speaker row.",
        requestSpeaker,
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
    console.error("[request-a-speaker] Error fetching Request Speaker content:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Failed to fetch Request Speaker content.",
        error: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}

