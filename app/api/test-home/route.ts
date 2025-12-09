import { NextResponse } from "next/server";
import { getHomeContent } from "@/lib/home.service";

export async function GET() {
  try {
    const home = await getHomeContent();

    return NextResponse.json(
      {
        ok: true,
        message: "Supabase connection OK. Fetched Home row.",
        home,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[test-home] Error fetching Home content:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Supabase connection FAILED.",
        error: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}


