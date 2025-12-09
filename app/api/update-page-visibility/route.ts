import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const HOME_TABLE = "Home";

/**
 * POST /api/update-page-visibility
 * Update visibility status for a page
 * Body: { pageName: string, isVisible: boolean }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pageName, isVisible } = body;

    if (!pageName) {
      return NextResponse.json(
        { ok: false, message: "pageName is required" },
        { status: 400 }
      );
    }

    if (typeof isVisible !== "boolean") {
      return NextResponse.json(
        { ok: false, message: "isVisible must be a boolean" },
        { status: 400 }
      );
    }

    // Find the page row
    const { data: existingData, error: fetchError } = await supabase
      .from(HOME_TABLE)
      .select("*")
      .or(`page_name.eq.${pageName},data->>page.eq.${pageName}`)
      .maybeSingle();

    if (fetchError && fetchError.code !== "PGRST116") {
      return NextResponse.json(
        { ok: false, message: "Failed to fetch page data", error: fetchError.message },
        { status: 500 }
      );
    }

    if (existingData) {
      // Update existing row - add visibility to root of data object
      const currentData = existingData.data || {};
      
      // Handle nested data structure (some pages have data.data)
      let updatedData: any;
      if (currentData.data && typeof currentData.data === 'object') {
        // Nested structure: update both root and nested
        updatedData = {
          ...currentData,
          visibility: isVisible,
          page: pageName,
          data: {
            ...currentData.data,
            visibility: isVisible,
          },
        };
      } else {
        // Flat structure: update root only
        updatedData = {
          ...currentData,
          visibility: isVisible,
          page: pageName, // Ensure page identifier is set
        };
      }

      const { error: updateError } = await supabase
        .from(HOME_TABLE)
        .update({
          data: updatedData,
          page_name: pageName,
          updated_at: new Date().toISOString(),
        })
        .or(`page_name.eq.${pageName},data->>page.eq.${pageName}`);

      if (updateError) {
        console.error("[update-page-visibility] Update error:", updateError);
        return NextResponse.json(
          { ok: false, message: "Failed to update visibility", error: updateError.message },
          { status: 500 }
        );
      }

      return NextResponse.json({
        ok: true,
        message: "Page visibility updated successfully",
        pageName,
        isVisible,
      });
    } else {
      // Create new row if it doesn't exist
      const newData = {
        page: pageName,
        visibility: isVisible,
      };

      const { error: insertError } = await supabase
        .from(HOME_TABLE)
        .insert({
          data: newData,
          page_name: pageName,
        });

      if (insertError) {
        return NextResponse.json(
          { ok: false, message: "Failed to create page data", error: insertError.message },
          { status: 500 }
        );
      }

      return NextResponse.json({
        ok: true,
        message: "Page visibility created successfully",
        pageName,
        isVisible,
      });
    }
  } catch (error: any) {
    console.error("[update-page-visibility] Error:", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Failed to update page visibility",
        error: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}

