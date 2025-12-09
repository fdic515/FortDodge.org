import { NextResponse } from "next/server";
import { getIslamicPrayerContent } from "@/lib/islamic-prayer.service";

export async function GET() {
  try {
    const islamicPrayer = await getIslamicPrayerContent();

    return NextResponse.json(
      {
        ok: true,
        message: "Fetched Islamic Prayer row.",
        islamicPrayer,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[islamic-prayer] Error fetching Islamic Prayer content:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Failed to fetch Islamic Prayer content.",
        error: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}

