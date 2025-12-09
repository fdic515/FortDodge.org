import { NextResponse } from "next/server";
import { getResourcesContent } from "@/lib/resources.service";

export async function GET() {
  try {
    const resources = await getResourcesContent();

    return NextResponse.json({
      ok: true,
      resources,
    });
  } catch (error: any) {
    console.error("[resources API] Error:", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Failed to fetch resources content",
        error: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}

