"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { CampaignCard } from "@/components/dashboard/campaign-card";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IndianRupee, Eye, Briefcase, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const mockStats = [
  { label: "Earnings this month", value: "₹45,200", change: { value: "+12% from last month", positive: true }, icon: <IndianRupee className="h-4 w-4" /> },
  { label: "Active Collaborations", value: "3", change: { value: "+1 this week", positive: true }, icon: <Briefcase className="h-4 w-4" /> },
  { label: "Profile Views", value: "284", change: { value: "+24%", positive: true }, icon: <Eye className="h-4 w-4" /> },
  { label: "Avg Response Time", value: "2.4h", change: { value: "-0.3h", positive: true }, icon: <Clock className="h-4 w-4" /> },
];

const mockOpportunities = [
  { id: "1", name: "Summer Fashion Collection Launch", status: "ACTIVE", budget: 75000, startDate: "2026-03-15", endDate: "2026-04-15", matchScore: 87, matchReason: "Strong audience overlap in 18-25 age group + Fashion vertical match + Budget fits your rate card" },
  { id: "2", name: "Fitness App Launch Campaign", status: "ACTIVE", budget: 50000, startDate: "2026-03-20", endDate: "2026-04-20", matchScore: 72, matchReason: "Your Fitness content aligns + High engagement rate + Regional audience match" },
];

const mockActivity = [
  { id: "1", type: "payment" as const, title: "Payment received", description: "₹15,000 from StyleCraft for Reel campaign", time: "2 hours ago" },
  { id: "2", type: "collab" as const, title: "New collaboration invite", description: "TechGear wants you for their product launch", time: "5 hours ago" },
  { id: "3", type: "review" as const, title: "Draft approved", description: "FreshBites approved your Instagram Reel draft", time: "1 day ago" },
  { id: "4", type: "message" as const, title: "New message", description: "StyleCraft: 'Great work on the photos!'", time: "2 days ago" },
];

export default function CreatorDashboard() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(" ")[0] || "Creator";

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${firstName}`}
        description={new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {mockStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Opportunities */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text-primary">Matched Opportunities</h2>
            <Link href="/dashboard/creator/campaigns">
              <Button variant="ghost" size="sm" className="gap-1">
                Browse all <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-4">
            {mockOpportunities.map((opp) => (
              <CampaignCard key={opp.id} {...opp} role="creator" />
            ))}
          </div>

          {/* Active Collaborations */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Active Collaborations</h2>
            <Card className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium text-text-primary">StyleCraft — Reel Campaign</p>
                  <p className="text-xs text-text-secondary">2 deliverables remaining</p>
                </div>
                <Badge variant="accent">In Progress</Badge>
              </div>
              <div className="flex gap-2">
                {["Briefing", "In Progress", "Review", "Completed"].map((stage, i) => (
                  <div key={stage} className="flex-1">
                    <div className={`h-1.5 rounded-full ${i <= 1 ? "bg-accent" : "bg-surface-elevated"}`} />
                    <p className="text-[10px] text-text-secondary mt-1">{stage}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Activity Feed */}
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-4">Recent Activity</h2>
          <Card className="p-5">
            <ActivityFeed items={mockActivity} />
          </Card>
        </div>
      </div>
    </div>
  );
}
