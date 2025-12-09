import { NextRequest, NextResponse } from "next/server";
import {
  updateIslamicPrayerSection,
  IslamicPrayerSectionConfig,
} from "@/lib/islamic-prayer.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sectionKey, sectionData } = body as {
      sectionKey: string;
      sectionData: IslamicPrayerSectionConfig;
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

    const result = await updateIslamicPrayerSection(sectionKey, sectionData);

    if (!result.success) {
      return NextResponse.json(
        {
          ok: false,
          message: "Failed to update islamic prayer section",
          error: result.error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message: "Islamic prayer section updated successfully",
        data: result.data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[islamic-prayer/update-section] Exception:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Failed to update islamic prayer section",
        error: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}

