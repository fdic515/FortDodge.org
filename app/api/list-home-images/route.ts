import { NextResponse } from "next/server";
import { getImagesFromFolder } from "@/lib/storage.service";

/**
 * Simple test endpoint to verify that the public Supabase Storage bucket
 * is working and that we can list + fetch image URLs from it.
 *
 * GET /api/list-home-images
 */
export async function GET() {
  try {
    // Change these if your bucket / folder names are different
    const bucket = "Public";
    const folder = "Home";

    const images = await getImagesFromFolder(bucket, folder);

    return NextResponse.json(
      {
        ok: true,
        bucket,
        folder,
        count: images.length,
        images,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[list-home-images] Error listing images:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Failed to fetch images from Supabase Storage.",
        error: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}


