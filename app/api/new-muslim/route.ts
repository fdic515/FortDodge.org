import { NextResponse } from "next/server";
import { getNewMuslimContent } from "@/lib/new-muslim.service";

export async function GET() {
  try {
    const newMuslim = await getNewMuslimContent();

    return NextResponse.json(
      {
        ok: true,
        message: "Fetched New Muslim row.",
        newMuslim,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[new-muslim] Error fetching New Muslim content:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Failed to fetch New Muslim content.",
        error: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}


