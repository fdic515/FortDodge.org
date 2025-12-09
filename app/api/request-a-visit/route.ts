import { NextResponse } from "next/server";
import { getRequestVisitContent } from "@/lib/request-visit.service";

export async function GET() {
  try {
    const requestVisit = await getRequestVisitContent();

    return NextResponse.json(
      {
        ok: true,
        message: "Fetched Request Visit row.",
        requestVisit,
      },
      { status: 200 }
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

