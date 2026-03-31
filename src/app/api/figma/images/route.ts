import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getImages } from "@/lib/figma";
import { figmaImagesQuerySchema } from "@/lib/validations/figma";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const parsed = figmaImagesQuerySchema.safeParse({
      fileKey: searchParams.get("fileKey") ?? "",
      nodeIds: searchParams.get("nodeIds") ?? "",
      format: searchParams.get("format") ?? "png",
      scale: searchParams.get("scale") ?? "2",
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { fileKey, nodeIds, format, scale } = parsed.data;
    const data = await getImages(fileKey, nodeIds.split(","), format, scale);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Figma images API error:", error);
    const message = error instanceof Error ? error.message : "Failed to export images from Figma";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
