import { NextResponse } from "next/server";
import { getIslamicSchoolContent } from "@/lib/islamic-school.service";

// Force dynamic rendering for real-time updates
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const islamicSchool = await getIslamicSchoolContent();

    return NextResponse.json(
      {
        ok: true,
        message: "Fetched Islamic School row.",
        islamicSchool,
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
    console.error("[islamic-school] Error fetching Islamic School content:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Failed to fetch Islamic School content.",
        error: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}

