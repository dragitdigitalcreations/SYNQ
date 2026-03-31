import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.message.deleteMany();
  await prisma.feedback.deleteMany();
  await prisma.timelineEvent.deleteMany();
  await prisma.collabFile.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.collaboration.deleteMany();
  await prisma.deliverable.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.creatorProfile.deleteMany();
  await prisma.businessProfile.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  const password = await bcrypt.hash("password123", 12);

  // ─── CREATORS ───────────────────────────────────────────────
  const creators = await Promise.all([
    createCreator(prisma, password, "Priya Sharma", "priya@example.com", "Mumbai, Maharashtra",
      "Fashion & lifestyle content creator with 520K+ followers. Specializing in Reels, fashion hauls, and brand storytelling.",
      ["Fashion", "Lifestyle", "Beauty"], ["Reels", "YouTube Videos", "Stories", "Photography"],
      520000, 4.8, 2, 98, 40, 8000, 47),
    createCreator(prisma, password, "Arjun Mehta", "arjun@example.com", "Bangalore, Karnataka",
      "Tech reviewer & gadget enthusiast. YouTube focused with detailed, honest reviews.",
      ["Tech", "Gaming"], ["YouTube Videos", "Reels", "Blog Posts"],
      180000, 5.2, 1, 95, 30, 10000, 32),
    createCreator(prisma, password, "Sneha Reddy", "sneha@example.com", "Hyderabad, Telangana",
      "Fitness & wellness coach creating health-focused content for young professionals.",
      ["Fitness", "Health", "Lifestyle"], ["Reels", "YouTube Videos", "Stories"],
      95000, 6.1, 3, 92, 25, 5000, 21),
    createCreator(prisma, password, "Rahul Kapoor", "rahul@example.com", "Delhi NCR",
      "Food blogger & restaurant reviewer. 310K followers who trust my taste.",
      ["Food", "Travel"], ["Reels", "Stories", "Photography", "Blog Posts"],
      310000, 3.9, 4, 88, 20, 6000, 28),
    createCreator(prisma, password, "Ananya Iyer", "ananya@example.com", "Chennai, Tamil Nadu",
      "Beauty & skincare creator. Brand collaborations specialist with consistent aesthetic.",
      ["Beauty", "Fashion"], ["Reels", "YouTube Videos", "Stories"],
      240000, 4.3, 5, 90, 15, 7000, 19),
    createCreator(prisma, password, "Vikram Singh", "vikram@example.com", "Jaipur, Rajasthan",
      "Travel photographer & storyteller. National Geographic featured. Visual-first content.",
      ["Travel", "Photography"], ["Photography", "YouTube Videos", "Reels"],
      420000, 3.5, 6, 85, 10, 12000, 35),
    createCreator(prisma, password, "Meera Nair", "meera@example.com", "Kochi, Kerala",
      "Lifestyle and food vlogger bringing Kerala's culture to the world.",
      ["Food", "Lifestyle", "Travel"], ["YouTube Videos", "Reels", "Blog Posts"],
      145000, 5.8, 2, 94, 35, 4000, 15),
    createCreator(prisma, password, "Karthik Rajan", "karthik@example.com", "Coimbatore, Tamil Nadu",
      "Comedy content creator. Relatable sketches about South Indian life.",
      ["Comedy", "Lifestyle"], ["Reels", "YouTube Videos"],
      680000, 7.2, 1, 96, 45, 15000, 52),
    createCreator(prisma, password, "Deepika Patel", "deepika@example.com", "Ahmedabad, Gujarat",
      "Education & career guidance creator. Helping students make better choices.",
      ["Education", "Business"], ["YouTube Videos", "Blog Posts", "LinkedIn Posts"],
      120000, 4.5, 3, 97, 50, 5000, 18),
    createCreator(prisma, password, "Aditya Verma", "aditya@example.com", "Pune, Maharashtra",
      "Music producer & artist. Creating original compositions and covers.",
      ["Music", "Lifestyle"], ["YouTube Videos", "Reels", "Stories"],
      210000, 4.0, 4, 89, 20, 8000, 22),
    createCreator(prisma, password, "Ishita Gupta", "ishita@example.com", "Lucknow, Uttar Pradesh",
      "Fashion designer turned content creator. Sustainable fashion advocate.",
      ["Fashion", "Lifestyle"], ["Reels", "Photography", "Blog Posts"],
      170000, 5.5, 2, 93, 30, 7000, 25),
    createCreator(prisma, password, "Rohan Das", "rohan@example.com", "Kolkata, West Bengal",
      "Sports & fitness content. Former athlete sharing training tips.",
      ["Sports", "Fitness"], ["YouTube Videos", "Reels"],
      88000, 6.8, 3, 91, 25, 4000, 12),
    createCreator(prisma, password, "Tanvi Sharma", "tanvi@example.com", "Chandigarh, Punjab",
      "Beauty and makeup artist. Tutorial-focused content for beginners.",
      ["Beauty", "Lifestyle"], ["YouTube Videos", "Reels", "Stories"],
      330000, 4.1, 2, 94, 35, 9000, 38),
    createCreator(prisma, password, "Nikhil Joshi", "nikhil@example.com", "Indore, Madhya Pradesh",
      "Tech educator and coding content creator. Making programming accessible.",
      ["Tech", "Education"], ["YouTube Videos", "Blog Posts"],
      95000, 5.9, 1, 98, 60, 6000, 14),
    createCreator(prisma, password, "Pooja Hegde", "pooja@example.com", "Mangalore, Karnataka",
      "Travel and adventure vlogger. Solo female travel in India.",
      ["Travel", "Lifestyle"], ["YouTube Videos", "Reels", "Photography"],
      260000, 4.7, 3, 90, 20, 10000, 30),
    createCreator(prisma, password, "Siddharth Nair", "siddharth@example.com", "Trivandrum, Kerala",
      "Photography and visual storytelling. Landscapes and street photography.",
      ["Photography", "Travel"], ["Photography", "Reels"],
      150000, 3.8, 5, 87, 15, 8000, 20),
    createCreator(prisma, password, "Kavya Krishnan", "kavya@example.com", "Mysore, Karnataka",
      "Yoga instructor and mindfulness creator. Wellness-focused content.",
      ["Health", "Fitness", "Lifestyle"], ["YouTube Videos", "Reels", "Stories"],
      110000, 6.5, 2, 96, 40, 5000, 16),
    createCreator(prisma, password, "Amit Saxena", "amit@example.com", "Noida, Uttar Pradesh",
      "Gaming streamer and esports commentator. Focused on mobile gaming.",
      ["Gaming", "Tech"], ["YouTube Videos", "Reels"],
      390000, 5.0, 1, 92, 25, 11000, 40),
    createCreator(prisma, password, "Ritu Desai", "ritu@example.com", "Surat, Gujarat",
      "Home decor and DIY creator. Budget-friendly interior design tips.",
      ["Lifestyle", "Education"], ["YouTube Videos", "Reels", "Photography"],
      78000, 7.0, 3, 95, 30, 3500, 10),
    createCreator(prisma, password, "Varun Malhotra", "varun@example.com", "Gurgaon, Haryana",
      "Finance and investing creator. Simplifying personal finance for millennials.",
      ["Business", "Education"], ["YouTube Videos", "Blog Posts", "LinkedIn Posts"],
      200000, 4.2, 2, 97, 55, 8000, 24),
  ]);

  // ─── BUSINESSES ─────────────────────────────────────────────
  const businesses = await Promise.all([
    createBusiness(prisma, password, "StyleCraft", "stylecraft@example.com", "E-commerce / D2C", "SMB", "https://stylecraft.example.com"),
    createBusiness(prisma, password, "TechGear India", "techgear@example.com", "Technology", "STARTUP", "https://techgear.example.com"),
    createBusiness(prisma, password, "FreshBites", "freshbites@example.com", "Food & Beverage", "SMB", "https://freshbites.example.com"),
    createBusiness(prisma, password, "FitLife Studio", "fitlife@example.com", "Health & Wellness", "STARTUP", "https://fitlife.example.com"),
    createBusiness(prisma, password, "Wanderlust Travel", "wanderlust@example.com", "Travel & Hospitality", "SMB", "https://wanderlust.example.com"),
  ]);

  // ─── CAMPAIGNS ──────────────────────────────────────────────
  const campaign1 = await prisma.campaign.create({
    data: {
      businessId: businesses[0].profileId,
      name: "Summer Fashion Collection Launch",
      description: "Launching our new summer collection with influencer-created content. Looking for fashion creators who can showcase our vibrant, sustainable clothing line to Gen-Z audiences.",
      objective: "Product Launch",
      status: "ACTIVE",
      budget: 150000,
      startDate: new Date("2026-03-01"),
      endDate: new Date("2026-04-15"),
      targetVerticals: JSON.stringify(["Fashion", "Lifestyle"]),
      targetRegions: JSON.stringify(["Mumbai", "Delhi NCR", "Bangalore"]),
      targetAgeRange: JSON.stringify({ min: 18, max: 30 }),
      usageRights: true,
      deliverables: {
        create: [
          { contentType: "Reels", quantity: 3, platform: "Instagram", description: "Outfit of the day featuring our summer pieces", revisionLimit: 2, price: 12000 },
          { contentType: "Stories", quantity: 5, platform: "Instagram", description: "Behind-the-scenes styling content", revisionLimit: 1, price: 5000 },
          { contentType: "Photography", quantity: 10, platform: "Instagram", description: "High-quality product photography", revisionLimit: 2, price: 8000 },
        ],
      },
    },
  });

  const campaign2 = await prisma.campaign.create({
    data: {
      businessId: businesses[1].profileId,
      name: "TechGear Wireless Earbuds Launch",
      description: "Launching our premium wireless earbuds. Need tech reviewers who can create honest, detailed reviews showing the product's audio quality and features.",
      objective: "Product Launch",
      status: "ACTIVE",
      budget: 100000,
      startDate: new Date("2026-03-10"),
      endDate: new Date("2026-04-10"),
      targetVerticals: JSON.stringify(["Tech", "Gaming"]),
      targetRegions: JSON.stringify(["Pan India"]),
      targetAgeRange: JSON.stringify({ min: 18, max: 35 }),
      deliverables: {
        create: [
          { contentType: "YouTube Videos", quantity: 1, platform: "YouTube", description: "Detailed review video (8-12 mins)", revisionLimit: 2, price: 25000 },
          { contentType: "Reels", quantity: 2, platform: "Instagram", description: "Quick feature highlights", revisionLimit: 1, price: 8000 },
        ],
      },
    },
  });

  const campaign3 = await prisma.campaign.create({
    data: {
      businessId: businesses[2].profileId,
      name: "FreshBites Healthy Snacks Campaign",
      description: "Promoting our new line of healthy, guilt-free snacks. Looking for food and fitness creators who align with health-conscious audiences.",
      objective: "Brand Awareness",
      status: "ACTIVE",
      budget: 80000,
      startDate: new Date("2026-03-15"),
      endDate: new Date("2026-04-30"),
      targetVerticals: JSON.stringify(["Food", "Fitness", "Health"]),
      targetRegions: JSON.stringify(["Mumbai", "Bangalore", "Chennai"]),
      deliverables: {
        create: [
          { contentType: "Reels", quantity: 2, platform: "Instagram", description: "Recipe or snack review Reels", revisionLimit: 2, price: 10000 },
          { contentType: "Stories", quantity: 3, platform: "Instagram", description: "Try-on/taste test stories", revisionLimit: 1, price: 3000 },
        ],
      },
    },
  });

  // ─── COLLABORATIONS ─────────────────────────────────────────
  // Completed collab: Priya x StyleCraft
  const collab1 = await prisma.collaboration.create({
    data: {
      campaignId: campaign1.id,
      creatorId: creators[0].profileId,
      status: "COMPLETED",
      matchScore: 92,
      matchReason: "Strong audience overlap in 18-25 age group. Fashion vertical match. Budget fits rate card.",
      scopeCard: JSON.stringify({
        deliverables: [
          { contentType: "Reels", quantity: 3, platform: "Instagram", revisionLimit: 2, price: 12000 },
          { contentType: "Stories", quantity: 5, platform: "Instagram", revisionLimit: 1, price: 5000 },
        ],
        totalBudget: 41000,
        usageRights: true,
      }),
      scopeSignedAt: new Date("2026-02-26"),
      currentRevision: 2,
      payment: {
        create: {
          amount: 41000,
          status: "RELEASED",
          milestones: JSON.stringify([
            { label: "50% on approval", amount: 20500, released: true },
            { label: "50% on publish", amount: 20500, released: true },
          ]),
          releasedAt: new Date("2026-03-10"),
        },
      },
      timelineEvents: {
        create: [
          { type: "INVITED", description: "StyleCraft invited Priya Sharma", createdAt: new Date("2026-02-20") },
          { type: "ACCEPTED", description: "Priya accepted the collaboration", createdAt: new Date("2026-02-21") },
          { type: "BRIEF_SENT", description: "Creative brief shared", createdAt: new Date("2026-02-23") },
          { type: "DRAFT_SUBMITTED", description: "First draft submitted", createdAt: new Date("2026-03-01") },
          { type: "APPROVED", description: "Content approved", createdAt: new Date("2026-03-05") },
          { type: "PUBLISHED", description: "Content published", createdAt: new Date("2026-03-07") },
          { type: "PAYMENT_RELEASED", description: "Full payment released", createdAt: new Date("2026-03-10") },
        ],
      },
    },
  });

  // Active collab: Arjun x TechGear
  const collab2 = await prisma.collaboration.create({
    data: {
      campaignId: campaign2.id,
      creatorId: creators[1].profileId,
      status: "IN_PROGRESS",
      matchScore: 85,
      matchReason: "Tech vertical perfect match. High engagement rate. Active and responsive.",
      scopeCard: JSON.stringify({
        deliverables: [
          { contentType: "YouTube Videos", quantity: 1, platform: "YouTube", revisionLimit: 2, price: 25000 },
          { contentType: "Reels", quantity: 2, platform: "Instagram", revisionLimit: 1, price: 8000 },
        ],
        totalBudget: 41000,
        usageRights: false,
      }),
      scopeSignedAt: new Date("2026-03-12"),
      currentRevision: 1,
      payment: {
        create: {
          amount: 41000,
          status: "ESCROW",
          milestones: JSON.stringify([
            { label: "50% on approval", amount: 20500, released: false },
            { label: "50% on publish", amount: 20500, released: false },
          ]),
        },
      },
      timelineEvents: {
        create: [
          { type: "INVITED", description: "TechGear invited Arjun Mehta", createdAt: new Date("2026-03-10") },
          { type: "ACCEPTED", description: "Arjun accepted", createdAt: new Date("2026-03-11") },
          { type: "BRIEF_SENT", description: "Product and creative brief shared", createdAt: new Date("2026-03-12") },
          { type: "DRAFT_SUBMITTED", description: "Video draft submitted for review", createdAt: new Date("2026-03-18") },
        ],
      },
    },
  });

  // ─── MESSAGES ───────────────────────────────────────────────
  // Priya <-> StyleCraft
  const styleUser = await prisma.user.findFirst({ where: { email: "stylecraft@example.com" } });
  const priyaUser = await prisma.user.findFirst({ where: { email: "priya@example.com" } });
  const techUser = await prisma.user.findFirst({ where: { email: "techgear@example.com" } });
  const arjunUser = await prisma.user.findFirst({ where: { email: "arjun@example.com" } });

  if (styleUser && priyaUser) {
    await prisma.message.createMany({
      data: [
        { senderId: styleUser.id, receiverId: priyaUser.id, content: "Hi Priya! We loved your portfolio. Would you be interested in our Summer Fashion Collection campaign?", createdAt: new Date("2026-02-20T10:30:00") },
        { senderId: priyaUser.id, receiverId: styleUser.id, content: "Hey! Thanks for reaching out. I'd love to know more. What are the deliverables?", createdAt: new Date("2026-02-20T10:45:00") },
        { senderId: styleUser.id, receiverId: priyaUser.id, content: "We need 3 Reels, 5 Stories, and 10 product photos. Budget is ₹61,000 total. Timeline is 6 weeks.", createdAt: new Date("2026-02-20T11:00:00") },
        { senderId: priyaUser.id, receiverId: styleUser.id, content: "That sounds great! The budget works for me. Can you send the creative brief?", createdAt: new Date("2026-02-20T11:15:00") },
        { senderId: styleUser.id, receiverId: priyaUser.id, content: "Great work on the photos! The brand team is very happy with the quality.", messageType: "TEXT", createdAt: new Date("2026-03-08T14:00:00") },
      ],
    });
  }

  if (techUser && arjunUser) {
    await prisma.message.createMany({
      data: [
        { senderId: techUser.id, receiverId: arjunUser.id, content: "Hi Arjun, we're launching wireless earbuds and would love for you to review them!", createdAt: new Date("2026-03-10T09:00:00") },
        { senderId: arjunUser.id, receiverId: techUser.id, content: "Sounds interesting! I'd love to check them out. What's the timeline?", createdAt: new Date("2026-03-10T09:30:00") },
        { senderId: techUser.id, receiverId: arjunUser.id, content: "We need the review live by April 10. Can share the product this week.", createdAt: new Date("2026-03-10T10:00:00") },
      ],
    });
  }

  console.log("Seed completed successfully!");
  console.log(`Created ${creators.length} creators, ${businesses.length} businesses, 3 campaigns, 2 collaborations`);
}

async function createCreator(
  prisma: PrismaClient, password: string,
  name: string, email: string, location: string, bio: string,
  verticals: string[], formats: string[],
  followers: number, engagement: number, responseTime: number,
  onTimeRate: number, repeatRate: number, minBudget: number, completedCollabs: number,
) {
  const user = await prisma.user.create({
    data: {
      name, email, password, role: "CREATOR",
      location, bio, verified: followers > 100000,
    },
  });

  const profile = await prisma.creatorProfile.create({
    data: {
      userId: user.id,
      contentVerticals: JSON.stringify(verticals),
      contentFormats: JSON.stringify(formats),
      minBudget,
      availability: "OPEN",
      excludedCategories: JSON.stringify([]),
      socialLinks: JSON.stringify({ instagram: name.toLowerCase().replace(/\s/g, ""), youtube: "", tiktok: "", twitter: "" }),
      rateCard: JSON.stringify(formats.map((f, i) => ({ format: f, price: minBudget + i * 2000 }))),
      followers,
      engagementRate: engagement,
      responseTime,
      onTimeRate,
      repeatRate,
      completedCollabs,
    },
  });

  return { userId: user.id, profileId: profile.id };
}

async function createBusiness(
  prisma: PrismaClient, password: string,
  companyName: string, email: string, industry: string, size: string, website: string,
) {
  const user = await prisma.user.create({
    data: {
      name: companyName, email, password, role: "BUSINESS", verified: true,
    },
  });

  const profile = await prisma.businessProfile.create({
    data: {
      userId: user.id,
      companyName, website, industry, companySize: size,
    },
  });

  return { userId: user.id, profileId: profile.id };
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
