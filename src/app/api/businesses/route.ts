import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const profile = await prisma.businessProfile.upsert({
      where: { userId: session.user.id },
      update: {
        companyName: body.companyName,
        website: body.website || null,
        industry: body.industry,
        companySize: body.companySize || "STARTUP",
        logo: body.logo || null,
        targetDemo: body.targetDemo ? JSON.stringify(body.targetDemo) : null,
      },
      create: {
        userId: session.user.id,
        companyName: body.companyName,
        website: body.website || null,
        industry: body.industry,
        companySize: body.companySize || "STARTUP",
        logo: body.logo || null,
        targetDemo: body.targetDemo ? JSON.stringify(body.targetDemo) : null,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Business profile error:", error);
    return NextResponse.json({ error: "Failed to save profile" }, { status: 500 });
  }
}
