import { NextResponse } from "next/server";
import { getReportDeathContent } from "@/lib/report-death.service";

export async function GET() {
  try {
    const reportDeath = await getReportDeathContent();

    return NextResponse.json(
      {
        ok: true,
        message: "Fetched Report a Death row.",
        reportDeath,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[report-death] Error fetching Report a Death content:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Failed to fetch Report a Death content.",
        error: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}



