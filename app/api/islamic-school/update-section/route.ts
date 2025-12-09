import { NextRequest, NextResponse } from "next/server";
import {
  updateIslamicSchoolSection,
  IslamicSchoolSectionConfig,
} from "@/lib/islamic-school.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sectionKey, sectionData } = body as {
      sectionKey: string;
      sectionData: IslamicSchoolSectionConfig;
    };

    if (!sectionKey) {
      return NextResponse.json(
        { ok: false, message: "sectionKey is required" },
        { status: 400 }
      );
    }

    if (!sectionData || typeof sectionData !== "object") {
      return NextResponse.json(
        {
          ok: false,
          message: "sectionData is required and must be an object",
        },
        { status: 400 }
      );
    }

    const result = await updateIslamicSchoolSection(sectionKey, sectionData);

    if (!result.success) {
      return NextResponse.json(
        {
          ok: false,
          message: "Failed to update islamic school section",
          error: result.error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message: "Islamic school section updated successfully",
        data: result.data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[islamic-school/update-section] Exception:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Failed to update islamic school section",
        error: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}

