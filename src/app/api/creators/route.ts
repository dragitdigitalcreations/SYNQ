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

    const profile = await prisma.creatorProfile.upsert({
      where: { userId: session.user.id },
      update: {
        contentVerticals: JSON.stringify(body.contentVerticals || []),
        contentFormats: JSON.stringify(body.contentFormats || []),
        minBudget: body.minBudget,
        availability: body.availability || "OPEN",
        excludedCategories: JSON.stringify(body.excludedCategories || []),
        socialLinks: body.socialLinks ? JSON.stringify(body.socialLinks) : null,
        rateCard: body.rateCard ? JSON.stringify(body.rateCard) : null,
      },
      create: {
        userId: session.user.id,
        contentVerticals: JSON.stringify(body.contentVerticals || []),
        contentFormats: JSON.stringify(body.contentFormats || []),
        minBudget: body.minBudget,
        availability: body.availability || "OPEN",
        excludedCategories: JSON.stringify(body.excludedCategories || []),
        socialLinks: body.socialLinks ? JSON.stringify(body.socialLinks) : null,
        rateCard: body.rateCard ? JSON.stringify(body.rateCard) : null,
      },
    });

    // Update user name/bio/location
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: body.name || undefined,
        bio: body.bio || undefined,
        location: body.location || undefined,
        avatar: body.avatar || undefined,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Creator profile error:", error);
    return NextResponse.json({ error: "Failed to save profile" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const vertical = searchParams.get("vertical");
    const location = searchParams.get("location");
    const minBudget = searchParams.get("minBudget");
    const maxBudget = searchParams.get("maxBudget");
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 20);

    const creators = await prisma.creatorProfile.findMany({
      include: { user: { select: { id: true, name: true, avatar: true, location: true, bio: true, verified: true } } },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: "desc" },
    });

    const formatted = creators.map((c) => ({
      id: c.id,
      userId: c.userId,
      name: c.user.name,
      avatar: c.user.avatar,
      location: c.user.location,
      bio: c.user.bio,
      verified: c.user.verified,
      contentVerticals: JSON.parse(c.contentVerticals),
      contentFormats: JSON.parse(c.contentFormats),
      minBudget: c.minBudget,
      availability: c.availability,
      followers: c.followers,
      engagementRate: c.engagementRate,
      responseTime: c.responseTime,
      onTimeRate: c.onTimeRate,
      repeatRate: c.repeatRate,
      rateCard: c.rateCard ? JSON.parse(c.rateCard) : [],
      completedCollabs: c.completedCollabs,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Fetch creators error:", error);
    return NextResponse.json({ error: "Failed to fetch creators" }, { status: 500 });
  }
}
