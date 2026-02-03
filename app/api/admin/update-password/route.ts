import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const HOME_TABLE = "Home";
const ADMIN_PAGE_NAME = "admin";

/**
 * POST /api/admin/update-password
 * Update admin password
 * Body: { newPassword: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { newPassword } = body;

    if (!newPassword || typeof newPassword !== "string") {
      return NextResponse.json(
        { ok: false, message: "New password is required" },
        { status: 400 }
      );
    }

    if (newPassword.length === 0) {
      return NextResponse.json(
        { ok: false, message: "Password cannot be empty" },
        { status: 400 }
      );
    }

    // Hard-coded admin email (cannot be changed)
    const ADMIN_EMAIL = "Fdic515@gmail.com";

    // Check if admin record exists in Home table (same pattern as other pages)
    const { data: adminData, error: fetchError } = await supabase
      .from(HOME_TABLE)
      .select("data")
      .or(`page_name.eq.${ADMIN_PAGE_NAME},data->>page.eq.${ADMIN_PAGE_NAME}`)
      .maybeSingle();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("[admin/update-password] Database error:", fetchError);
      return NextResponse.json(
        { ok: false, message: "Database error occurred" },
        { status: 500 }
      );
    }

    if (adminData && adminData.data) {
      // Update existing password in Home table
      const updatedData = {
        ...adminData.data,
        page: ADMIN_PAGE_NAME,
        email: ADMIN_EMAIL,
        password: newPassword,
      };

      const { error: updateError } = await supabase
        .from(HOME_TABLE)
        .update({
          data: updatedData,
          page_name: ADMIN_PAGE_NAME,
          updated_at: new Date().toISOString(),
        })
        .or(`page_name.eq.${ADMIN_PAGE_NAME},data->>page.eq.${ADMIN_PAGE_NAME}`);

      if (updateError) {
        console.error("[admin/update-password] Update error:", updateError);
        return NextResponse.json(
          { ok: false, message: "Failed to update password", error: updateError.message },
          { status: 500 }
        );
      }

      return NextResponse.json({
        ok: true,
        message: "Password updated successfully",
      });
    } else {
      // Create admin record with new password if it doesn't exist (same pattern as other pages)
      const newData = {
        page: ADMIN_PAGE_NAME,
        email: ADMIN_EMAIL,
        password: newPassword,
      };

      const { error: insertError } = await supabase
        .from(HOME_TABLE)
        .insert({
          data: newData,
          page_name: ADMIN_PAGE_NAME,
        });

      if (insertError) {
        console.error("[admin/update-password] Insert error:", insertError);
        return NextResponse.json(
          { ok: false, message: "Failed to create admin account", error: insertError.message },
          { status: 500 }
        );
      }

      return NextResponse.json({
        ok: true,
        message: "Password set successfully",
      });
    }
  } catch (error: any) {
    console.error("[admin/update-password] Error:", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Failed to update password",
        error: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}

