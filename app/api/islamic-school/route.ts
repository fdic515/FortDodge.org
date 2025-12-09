import { NextResponse } from "next/server";
import { getIslamicSchoolContent } from "@/lib/islamic-school.service";

export async function GET() {
  try {
    const islamicSchool = await getIslamicSchoolContent();

    return NextResponse.json(
      {
        ok: true,
        message: "Fetched Islamic School row.",
        islamicSchool,
      },
      { status: 200 }
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

