import { NextRequest, NextResponse } from "next/server";
import { updateHomeSection, HomeSectionConfig } from "@/lib/home.service";

/**
 * API route to update a specific section of the home page.
 * 
 * POST /api/home/update-section
 * Body: { sectionKey: string, sectionData: HomeSectionConfig }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sectionKey, sectionData } = body;

    console.log("[update-section] Received request:", { sectionKey, sectionData });

    if (!sectionKey) {
      console.error("[update-section] Missing sectionKey");
      return NextResponse.json(
        { ok: false, message: "sectionKey is required" },
        { status: 400 }
      );
    }

    if (!sectionData || typeof sectionData !== "object") {
      console.error("[update-section] Invalid sectionData:", sectionData);
      return NextResponse.json(
        { ok: false, message: "sectionData is required and must be an object" },
        { status: 400 }
      );
    }

    console.log("[update-section] Calling updateHomeSection...");
    const result = await updateHomeSection(sectionKey, sectionData as HomeSectionConfig);
    console.log("[update-section] Result:", result);

    if (!result.success) {
      console.error("[update-section] Update failed:", result.error);
      return NextResponse.json(
        {
          ok: false,
          message: "Failed to update home section",
          error: result.error,
        },
        { status: 500 }
      );
    }

    console.log("[update-section] Update successful:", result.data);
    return NextResponse.json(
      {
        ok: true,
        message: "Home section updated successfully",
        data: result.data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[update-section] Exception:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Failed to update home section",
        error: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}

