import { NextResponse } from "next/server";
import { getAboutContent } from "@/lib/about.service";

export async function GET() {
  try {
    const about = await getAboutContent();

    return NextResponse.json(
      {
        ok: true,
        message: "Fetched About row.",
        about,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[about] Error fetching About content:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Failed to fetch About content.",
        error: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}

