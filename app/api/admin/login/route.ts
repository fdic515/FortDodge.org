import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const HOME_TABLE = "Home";
const ADMIN_PAGE_NAME = "admin";

/**
 * POST /api/admin/login
 * Authenticate admin with email and password
 * Body: { email: string, password: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Hard-coded admin email (cannot be changed)
    const ADMIN_EMAIL = "Fdic515@gmail.com";

    // Verify email matches hardcoded admin email
    if (email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { ok: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Fetch admin credentials from Home table (same as other pages)
    const { data: adminData, error: fetchError } = await supabase
      .from(HOME_TABLE)
      .select("data")
      .or(`page_name.eq.${ADMIN_PAGE_NAME},data->>page.eq.${ADMIN_PAGE_NAME}`)
      .maybeSingle();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("[admin/login] Database error:", fetchError);
      return NextResponse.json(
        { ok: false, message: "Database error occurred" },
        { status: 500 }
      );
    }

    // If no admin record exists, initialize with default password
    if (!adminData || !adminData.data) {
      const defaultPassword = "admin123";
      
      // Create initial admin record in Home table (same pattern as other pages)
      const newData = {
        page: ADMIN_PAGE_NAME,
        email: ADMIN_EMAIL,
        password: defaultPassword,
      };

      const { error: insertError } = await supabase
        .from(HOME_TABLE)
        .insert({
          data: newData,
          page_name: ADMIN_PAGE_NAME,
        });

      if (insertError) {
        console.error("[admin/login] Failed to initialize admin:", insertError);
        return NextResponse.json(
          { ok: false, message: "Failed to initialize admin account" },
          { status: 500 }
        );
      }

      // Check if provided password matches default
      if (password === defaultPassword) {
        return NextResponse.json({
          ok: true,
          message: "Login successful",
        });
      } else {
        return NextResponse.json(
          { ok: false, message: "Invalid email or password" },
          { status: 401 }
        );
      }
    }

    // Verify password (plain text comparison)
    const storedPassword = adminData.data?.password;
    if (storedPassword === password) {
      return NextResponse.json({
        ok: true,
        message: "Login successful",
      });
    } else {
      return NextResponse.json(
        { ok: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }
  } catch (error: any) {
    console.error("[admin/login] Error:", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Failed to authenticate",
        error: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}

