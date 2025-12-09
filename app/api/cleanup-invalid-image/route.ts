import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { updateHomeSection } from "@/lib/home.service";

/**
 * API route to remove invalid image paths from database.
 * Called when an image fails to load on the frontend.
 * 
 * POST /api/cleanup-invalid-image
 * Body: {
 *   table: "Home",
 *   section: "heroSection",
 *   field: "heroImage",
 *   path: "Home/image.jpg"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { table, section, field, path } = body;

    if (!table || !section || !field) {
      return NextResponse.json(
        { ok: false, message: "Missing required fields: table, section, field" },
        { status: 400 }
      );
    }

    console.log("[cleanup-invalid-image] Removing invalid image path:", {
      table,
      section,
      field,
      path,
    });

    // For Home table, use the home service
    if (table === "Home") {
      const { getHomeContent } = await import("@/lib/home.service");
      const home = await getHomeContent();

      if (!home || !home.data) {
        return NextResponse.json(
          { ok: false, message: "Home content not found" },
          { status: 404 }
        );
      }

      const sectionData = home.data[section as keyof typeof home.data];
      if (!sectionData || !(sectionData as any).data) {
        return NextResponse.json(
          { ok: true, message: "Section data not found, nothing to clean" },
          { status: 200 }
        );
      }

      // Remove the invalid image field - create new object without the field
      const { [field]: removed, ...restData } = (sectionData as any).data;
      const updatedSectionData = {
        ...sectionData,
        data: restData,
      };

      const result = await updateHomeSection(section, updatedSectionData);
      
      if (result.success) {
        console.log("[cleanup-invalid-image] Successfully removed invalid image path");
        return NextResponse.json({
          ok: true,
          message: "Invalid image path removed from database",
        });
      } else {
        return NextResponse.json(
          { ok: false, message: result.error || "Failed to update database" },
          { status: 500 }
        );
      }
    }

    // For other tables, you can add similar logic here
    return NextResponse.json(
      { ok: false, message: `Table ${table} not supported yet` },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("[cleanup-invalid-image] Error:", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Failed to cleanup invalid image",
        error: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}

