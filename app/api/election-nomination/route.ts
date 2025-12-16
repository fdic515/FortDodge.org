import { NextResponse } from "next/server";
import { getElectionNominationContent } from "@/lib/election-nomination.service";

// Force dynamic rendering for real-time updates
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const electionNomination = await getElectionNominationContent();

    return NextResponse.json(
      {
        ok: true,
        electionNomination,
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
    console.error("[election-nomination] Exception:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Failed to fetch election nomination content",
        error: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}

