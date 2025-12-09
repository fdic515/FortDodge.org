import { NextRequest, NextResponse } from "next/server";
import {
  updateVisitorGuideSection,
  VisitorGuideSectionConfig,
} from "@/lib/visitor-guide.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sectionKey, sectionData } = body as {
      sectionKey: string;
      sectionData: VisitorGuideSectionConfig;
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

    const result = await updateVisitorGuideSection(sectionKey, sectionData);

    if (!result.success) {
      return NextResponse.json(
        {
          ok: false,
          message: "Failed to update visitor guide section",
          error: result.error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message: "Visitor guide section updated successfully",
        data: result.data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[visitor-guide/update-section] Exception:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Failed to update visitor guide section",
        error: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}

