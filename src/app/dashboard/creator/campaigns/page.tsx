"use client";

import { PageHeader } from "@/components/layout/page-header";
import { CampaignCard } from "@/components/dashboard/campaign-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Search } from "lucide-react";

const mockCampaigns = [
  { id: "1", name: "Summer Fashion Collection Launch", status: "ACTIVE", budget: 75000, startDate: "2026-03-15", endDate: "2026-04-15", matchScore: 87, matchReason: "Strong audience overlap in 18-25 age group + Fashion vertical match" },
  { id: "2", name: "Fitness App Launch Campaign", status: "ACTIVE", budget: 50000, startDate: "2026-03-20", endDate: "2026-04-20", matchScore: 72, matchReason: "Fitness content alignment + High engagement rate" },
  { id: "3", name: "Diwali Festive Campaign", status: "COMPLETED", budget: 35000, startDate: "2025-10-01", endDate: "2025-11-15", matchScore: 65, matchReason: "Lifestyle content match + Regional audience alignment" },
  { id: "4", name: "Tech Gadget Unboxing Series", status: "ACTIVE", budget: 40000, startDate: "2026-03-01", endDate: "2026-03-31", matchScore: 58, matchReason: "Partial tech vertical overlap + Budget within range" },
];

export default function BrowseCampaignsPage() {
  return (
    <div>
      <PageHeader title="Browse Campaigns" description="Find campaigns that match your profile" />
      <div className="grid gap-4 sm:grid-cols-2">
        {mockCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} {...campaign} role="creator" />
        ))}
      </div>
    </div>
  );
}
