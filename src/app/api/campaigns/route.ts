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

    const businessProfile = await prisma.businessProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!businessProfile) {
      return NextResponse.json({ error: "Business profile not found" }, { status: 404 });
    }

    const campaign = await prisma.campaign.create({
      data: {
        businessId: businessProfile.id,
        name: body.name,
        description: body.description,
        objective: body.objective || "",
        budget: body.budget,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        targetVerticals: JSON.stringify(body.targetVerticals || []),
        targetRegions: JSON.stringify(body.targetRegions || []),
        targetAgeRange: body.targetAgeRange ? JSON.stringify(body.targetAgeRange) : null,
        targetGender: body.targetGender || null,
        usageRights: body.usageRights || false,
        deliverables: {
          create: (body.deliverables || []).map((d: { contentType: string; quantity: number; platform: string; description?: string; revisionLimit?: number; usageRights?: boolean; price?: number }) => ({
            contentType: d.contentType,
            quantity: d.quantity || 1,
            platform: d.platform,
            description: d.description || "",
            revisionLimit: d.revisionLimit || 2,
            usageRights: d.usageRights || false,
            price: d.price || 0,
          })),
        },
      },
      include: { deliverables: true },
    });

    return NextResponse.json(campaign);
  } catch (error) {
    console.error("Campaign creation error:", error);
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const campaigns = await prisma.campaign.findMany({
      where: status ? { status } : undefined,
      include: {
        business: { include: { user: { select: { name: true, avatar: true } } } },
        deliverables: true,
        _count: { select: { collaborations: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(campaigns);
  } catch (error) {
    console.error("Fetch campaigns error:", error);
    return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 });
  }
}
