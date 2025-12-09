import { NextResponse } from "next/server";
import { getRamadanContent } from "@/lib/ramadan.service";

export async function GET() {
  try {
    const ramadan = await getRamadanContent();

    return NextResponse.json(
      {
        ok: true,
        message: "Fetched Ramadan row.",
        ramadan,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[ramadan] Error fetching Ramadan content:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Failed to fetch Ramadan content.",
        error: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}


