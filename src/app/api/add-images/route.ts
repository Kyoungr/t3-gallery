import { db } from "../../../server/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { images } = await req.json();

    const result = await db.insert(images).values(
      images.map((image: { name: string; url: string }) => ({
        name: image.name,
        url: image.url,
      })),
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error adding images:", error);
    return NextResponse.json(
      { error: "Failed to add images" },
      { status: 500 },
    );
  }
}
