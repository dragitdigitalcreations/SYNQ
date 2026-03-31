import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getFile, getFileNodes, getFileStyles, getFileComponents } from "@/lib/figma";
import { figmaFileQuerySchema } from "@/lib/validations/figma";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const parsed = figmaFileQuerySchema.safeParse({
      fileKey: searchParams.get("fileKey") ?? "",
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { fileKey } = parsed.data;
    const include = searchParams.get("include");
    const nodeIds = searchParams.get("nodeIds");

    // Fetch specific nodes
    if (nodeIds) {
      const data = await getFileNodes(fileKey, nodeIds.split(","));
      return NextResponse.json(data);
    }

    // Fetch styles or components only
    if (include === "styles") {
      const data = await getFileStyles(fileKey);
      return NextResponse.json(data);
    }
    if (include === "components") {
      const data = await getFileComponents(fileKey);
      return NextResponse.json(data);
    }

    // Default: full file
    const data = await getFile(fileKey);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Figma API error:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch from Figma";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
