import { NextResponse } from "next/server";
import { getDonateContent } from "@/lib/donate.service";

export async function GET() {
  try {
    const donate = await getDonateContent();

    return NextResponse.json(
      {
        ok: true,
        message: "Fetched Donate row.",
        donate,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[donate] Error fetching Donate content:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Failed to fetch Donate content.",
        error: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}

