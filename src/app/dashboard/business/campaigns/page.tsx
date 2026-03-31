"use client";

import { PageHeader } from "@/components/layout/page-header";
import { CampaignCard } from "@/components/dashboard/campaign-card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const mockCampaigns = [
  { id: "1", name: "Summer Fashion Collection", status: "ACTIVE", budget: 150000, startDate: "2026-03-01", endDate: "2026-04-15", creatorsCount: 5, progress: 60 },
  { id: "2", name: "Fitness App Launch", status: "ACTIVE", budget: 100000, startDate: "2026-03-10", endDate: "2026-04-10", creatorsCount: 3, progress: 25 },
  { id: "3", name: "Diwali Special", status: "DRAFT", budget: 200000, startDate: "2026-10-01", endDate: "2026-11-15", creatorsCount: 0, progress: 0 },
  { id: "4", name: "Year-End Sale Promo", status: "COMPLETED", budget: 80000, startDate: "2025-12-01", endDate: "2025-12-31", creatorsCount: 4, progress: 100 },
];

export default function CampaignsListPage() {
  return (
    <div>
      <PageHeader
        title="My Campaigns"
        description="Manage your creator campaigns"
        action={
          <Link href="/dashboard/business/campaigns/new">
            <Button className="gap-2"><PlusCircle className="h-4 w-4" /> New Campaign</Button>
          </Link>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {mockCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} {...campaign} role="business" />
        ))}
      </div>
    </div>
  );
}
