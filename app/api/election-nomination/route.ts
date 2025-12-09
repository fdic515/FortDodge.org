import { NextResponse } from "next/server";
import { getElectionNominationContent } from "@/lib/election-nomination.service";

export async function GET() {
  try {
    const electionNomination = await getElectionNominationContent();

    return NextResponse.json(
      {
        ok: true,
        electionNomination,
      },
      { status: 200 }
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

