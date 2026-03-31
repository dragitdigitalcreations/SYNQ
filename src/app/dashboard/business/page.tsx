"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { CampaignCard } from "@/components/dashboard/campaign-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Briefcase, Users, IndianRupee, TrendingUp, PlusCircle, ArrowRight, Send, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

const mockStats = [
  { label: "Active Campaigns", value: "3", change: { value: "+1 this month", positive: true }, icon: <Briefcase className="h-4 w-4" /> },
  { label: "Creators in Pipeline", value: "12", change: { value: "+4 this week", positive: true }, icon: <Users className="h-4 w-4" /> },
  { label: "Total Spend", value: "₹2,85,000", change: { value: "+18%", positive: true }, icon: <IndianRupee className="h-4 w-4" /> },
  { label: "Avg. ROI Score", value: "4.2x", change: { value: "+0.3", positive: true }, icon: <TrendingUp className="h-4 w-4" /> },
];

const mockCampaigns = [
  { id: "1", name: "Summer Fashion Collection", status: "ACTIVE", budget: 150000, startDate: "2026-03-01", endDate: "2026-04-15", creatorsCount: 5, progress: 60 },
  { id: "2", name: "Fitness App Launch", status: "ACTIVE", budget: 100000, startDate: "2026-03-10", endDate: "2026-04-10", creatorsCount: 3, progress: 25 },
  { id: "3", name: "Diwali Special", status: "DRAFT", budget: 200000, startDate: "2026-10-01", endDate: "2026-11-15", creatorsCount: 0, progress: 0 },
];

const mockCreatorPipeline = [
  { id: "1", name: "Priya Sharma", avatar: null, vertical: "Fashion", matchScore: 92, priceRange: "₹8K–₹15K" },
  { id: "2", name: "Arjun Mehta", avatar: null, vertical: "Tech", matchScore: 85, priceRange: "₹10K–₹20K" },
  { id: "3", name: "Sneha Reddy", avatar: null, vertical: "Fitness", matchScore: 78, priceRange: "₹5K–₹12K" },
  { id: "4", name: "Rahul Kapoor", avatar: null, vertical: "Food", matchScore: 73, priceRange: "₹6K–₹10K" },
];

export default function BusinessDashboard() {
  const { data: session } = useSession();

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Manage your campaigns and creator partnerships"
        action={
          <Link href="/dashboard/business/campaigns/new">
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" /> Create Campaign
            </Button>
          </Link>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {mockStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Response Rate Alert */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-start gap-3 rounded-xl border border-warning/20 bg-warning/5 p-4"
      >
        <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-text-primary">Your response rate is 38%</p>
          <p className="text-xs text-text-secondary mt-0.5">Tip: Creators respond 3x more to detailed briefs with clear deliverables and fair budgets.</p>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Campaigns */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text-primary">Active Campaigns</h2>
            <Link href="/dashboard/business/campaigns">
              <Button variant="ghost" size="sm" className="gap-1">
                View all <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-4">
            {mockCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} {...campaign} role="business" />
            ))}
          </div>
        </div>

        {/* Creator Pipeline */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Creator Pipeline</h2>
            <Link href="/dashboard/business/find-creators">
              <Button variant="ghost" size="sm" className="gap-1">
                Find more <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
          <Card className="p-4 space-y-3">
            {mockCreatorPipeline.map((creator) => (
              <div key={creator.id} className="flex items-center gap-3 rounded-lg p-2 hover:bg-surface-elevated transition-colors">
                <Avatar name={creator.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{creator.name}</p>
                  <p className="text-xs text-text-secondary">{creator.vertical} · {creator.priceRange}</p>
                </div>
                <Badge variant="accent" className="font-mono text-xs">{creator.matchScore}%</Badge>
                <Button variant="ghost" size="icon" className="shrink-0" aria-label="Send brief">
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
