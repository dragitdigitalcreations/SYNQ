"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/page-header";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Calendar, Users, IndianRupee, ArrowLeft, FileText, Clock,
  CheckCircle2, Lock, Flag, Scale, ChevronRight, BarChart3,
  MessageSquare, Send, Target, TrendingUp, Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Deliverable {
  type: string;
  quantity: number;
  platform: string;
  revisions: number;
  price: number;
  status: string;
}

interface Milestone {
  name: string;
  amount: number;
  status: "released" | "escrow" | "pending";
  date?: string;
}

interface CampaignData {
  id: string;
  name: string;
  description: string;
  status: string;
  budget: number;
  startDate: string;
  endDate: string;
  brand?: string;
  objective?: string;
  deliverables: Deliverable[];
  milestones: Milestone[];
  creatorsCount?: number;
  matchScore?: number;
  matchReason?: string;
  progress?: number;
  analytics?: {
    impressions: string;
    engagement: string;
    costPerEngage: string;
    saves: string;
  };
}

// Mock data — in production, fetched from API
const mockCampaigns: Record<string, CampaignData> = {
  "1": {
    id: "1",
    name: "Summer Fashion Collection",
    description: "Launch campaign for our new summer collection targeting 18-28 age group across metro cities. Focus on lifestyle and aspirational content.",
    status: "ACTIVE",
    budget: 150000,
    startDate: "2026-03-01",
    endDate: "2026-04-15",
    brand: "StyleCo India",
    objective: "Brand Awareness",
    creatorsCount: 5,
    progress: 60,
    deliverables: [
      { type: "Reels", quantity: 3, platform: "Instagram", revisions: 2, price: 36000, status: "1 approved, 2 in review" },
      { type: "Stories", quantity: 4, platform: "Instagram", revisions: 1, price: 20000, status: "2 completed" },
      { type: "YouTube Short", quantity: 2, platform: "YouTube", revisions: 2, price: 50000, status: "In progress" },
      { type: "Photography", quantity: 5, platform: "Instagram", revisions: 2, price: 44000, status: "Not started" },
    ],
    milestones: [
      { name: "Reel #1 approved", amount: 36000, status: "released", date: "2026-03-10" },
      { name: "Stories batch delivered", amount: 20000, status: "escrow", date: "2026-03-18" },
      { name: "YouTube Shorts + Photos", amount: 94000, status: "pending" },
    ],
    matchScore: 87,
    matchReason: "Strong audience overlap in 18-25 age group + Fashion vertical match",
    analytics: {
      impressions: "124K",
      engagement: "4.8%",
      costPerEngage: "₹2.50",
      saves: "3,200",
    },
  },
  "2": {
    id: "2",
    name: "Fitness App Launch",
    description: "Pre-launch campaign for FitTrack app. Target fitness creators with engaged audiences for app install campaigns.",
    status: "ACTIVE",
    budget: 100000,
    startDate: "2026-03-10",
    endDate: "2026-04-10",
    brand: "FitTrack India",
    objective: "App Installs",
    creatorsCount: 3,
    progress: 25,
    deliverables: [
      { type: "Reels", quantity: 2, platform: "Instagram", revisions: 2, price: 24000, status: "In review" },
      { type: "YouTube Video", quantity: 1, platform: "YouTube", revisions: 3, price: 40000, status: "Draft submitted" },
      { type: "Stories", quantity: 6, platform: "Instagram", revisions: 1, price: 36000, status: "Not started" },
    ],
    milestones: [
      { name: "Reels batch", amount: 24000, status: "escrow" },
      { name: "YouTube video approved", amount: 40000, status: "pending" },
      { name: "Stories + final delivery", amount: 36000, status: "pending" },
    ],
    matchScore: 72,
    matchReason: "Fitness content alignment + High engagement rate",
    analytics: {
      impressions: "45K",
      engagement: "5.2%",
      costPerEngage: "₹3.10",
      saves: "890",
    },
  },
  "3": {
    id: "3",
    name: "Diwali Special",
    description: "Festive season campaign celebrating Diwali with lifestyle and fashion creators. Focus on ethnic wear and gifting.",
    status: "DRAFT",
    budget: 200000,
    startDate: "2026-10-01",
    endDate: "2026-11-15",
    brand: "FestiveWear Co",
    objective: "Sales Conversion",
    creatorsCount: 0,
    progress: 0,
    deliverables: [
      { type: "Reels", quantity: 5, platform: "Instagram", revisions: 2, price: 60000, status: "Not started" },
      { type: "YouTube Video", quantity: 2, platform: "YouTube", revisions: 3, price: 80000, status: "Not started" },
      { type: "Stories", quantity: 10, platform: "Instagram", revisions: 1, price: 60000, status: "Not started" },
    ],
    milestones: [
      { name: "Phase 1 — Teasers", amount: 60000, status: "pending" },
      { name: "Phase 2 — Main content", amount: 80000, status: "pending" },
      { name: "Phase 3 — Final push", amount: 60000, status: "pending" },
    ],
    matchScore: 65,
    matchReason: "Lifestyle content match + Regional audience alignment",
  },
  "4": {
    id: "4",
    name: "Year-End Sale Promo",
    description: "End-of-year sale promotion across multiple platforms. Quick turnaround campaign for holiday season.",
    status: "COMPLETED",
    budget: 80000,
    startDate: "2025-12-01",
    endDate: "2025-12-31",
    brand: "MegaStore",
    objective: "Sales Conversion",
    creatorsCount: 4,
    progress: 100,
    deliverables: [
      { type: "Reels", quantity: 4, platform: "Instagram", revisions: 1, price: 32000, status: "Completed" },
      { type: "Stories", quantity: 8, platform: "Instagram", revisions: 1, price: 24000, status: "Completed" },
      { type: "Photography", quantity: 6, platform: "Instagram", revisions: 2, price: 24000, status: "Completed" },
    ],
    milestones: [
      { name: "All reels delivered", amount: 32000, status: "released", date: "2025-12-15" },
      { name: "Stories + photos", amount: 48000, status: "released", date: "2025-12-28" },
    ],
    matchScore: 58,
    matchReason: "Partial tech vertical overlap + Budget within range",
    analytics: {
      impressions: "210K",
      engagement: "3.9%",
      costPerEngage: "₹1.80",
      saves: "5,100",
    },
  },
};

const statusVariant: Record<string, "success" | "warning" | "accent" | "default"> = {
  ACTIVE: "success",
  DRAFT: "default",
  PAUSED: "warning",
  COMPLETED: "accent",
};

const milestoneConfig = {
  released: { color: "bg-success", textColor: "text-success", bgColor: "bg-success/10", icon: CheckCircle2, label: "Released" },
  escrow: { color: "bg-warning", textColor: "text-warning", bgColor: "bg-warning/10", icon: Lock, label: "In Escrow" },
  pending: { color: "bg-surface-elevated", textColor: "text-text-secondary", bgColor: "bg-surface-elevated/50", icon: Clock, label: "Pending" },
};

interface CampaignDetailsProps {
  campaignId: string;
  role: "creator" | "business";
}

export function CampaignDetails({ campaignId, role }: CampaignDetailsProps) {
  const campaign = mockCampaigns[campaignId];
  const [activeTab, setActiveTab] = useState<"overview" | "deliverables" | "payments" | "analytics">("overview");

  if (!campaign) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h2 className="text-xl font-semibold text-text-primary mb-2">Campaign not found</h2>
        <p className="text-sm text-text-secondary mb-6">This campaign doesn&apos;t exist or you don&apos;t have access.</p>
        <Link href={role === "business" ? "/dashboard/business/campaigns" : "/dashboard/creator/campaigns"}>
          <Button variant="outline" className="gap-2"><ArrowLeft className="h-4 w-4" /> Back to Campaigns</Button>
        </Link>
      </div>
    );
  }

  const releasedAmount = campaign.milestones.filter((m) => m.status === "released").reduce((sum, m) => sum + m.amount, 0);
  const escrowAmount = campaign.milestones.filter((m) => m.status === "escrow").reduce((sum, m) => sum + m.amount, 0);

  const tabs = [
    { key: "overview" as const, label: "Overview", icon: FileText },
    { key: "deliverables" as const, label: "Deliverables", icon: Target },
    { key: "payments" as const, label: "Payments", icon: IndianRupee },
    ...(campaign.analytics ? [{ key: "analytics" as const, label: "Analytics", icon: BarChart3 }] : []),
  ];

  return (
    <div>
      <PageHeader
        title={campaign.name}
        description={campaign.description}
        action={
          <div className="flex items-center gap-3">
            <Badge variant={statusVariant[campaign.status] || "default"} className="text-sm px-3 py-1">{campaign.status}</Badge>
            {role === "creator" && campaign.status === "ACTIVE" && (
              <Button className="gap-2"><Send className="h-4 w-4" /> Apply</Button>
            )}
            {role === "business" && campaign.status === "DRAFT" && (
              <Button className="gap-2"><Send className="h-4 w-4" /> Publish</Button>
            )}
          </div>
        }
      />

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card className="p-4">
            <div className="flex items-center gap-2 text-text-secondary text-xs mb-1"><IndianRupee className="h-3 w-3" /> Budget</div>
            <p className="text-xl font-bold text-text-primary">{formatCurrency(campaign.budget)}</p>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="p-4">
            <div className="flex items-center gap-2 text-text-secondary text-xs mb-1"><Calendar className="h-3 w-3" /> Timeline</div>
            <p className="text-sm font-semibold text-text-primary">{formatDate(campaign.startDate)}</p>
            <p className="text-xs text-text-secondary">to {formatDate(campaign.endDate)}</p>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="p-4">
            <div className="flex items-center gap-2 text-text-secondary text-xs mb-1"><Users className="h-3 w-3" /> Creators</div>
            <p className="text-xl font-bold text-text-primary">{campaign.creatorsCount ?? 0}</p>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="p-4">
            <div className="flex items-center gap-2 text-text-secondary text-xs mb-1"><TrendingUp className="h-3 w-3" /> Progress</div>
            <p className="text-xl font-bold text-text-primary">{campaign.progress ?? 0}%</p>
            {campaign.progress !== undefined && (
              <div className="h-1.5 rounded-full bg-surface-elevated overflow-hidden mt-2">
                <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${campaign.progress}%` }} />
              </div>
            )}
          </Card>
        </motion.div>
      </div>

      {/* Match score for creators */}
      {role === "creator" && campaign.matchScore && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Card className="p-5 border-accent/10">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-accent/10 px-4 py-2">
                <span className="text-lg font-bold text-accent font-mono">{campaign.matchScore}%</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">Match Score</p>
                {campaign.matchReason && <p className="text-xs text-text-secondary mt-0.5">{campaign.matchReason}</p>}
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border/50 mb-6 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
              activeTab === tab.key
                ? "text-accent border-accent"
                : "text-text-secondary border-transparent hover:text-text-primary"
            }`}
          >
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "overview" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Campaign Details</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              {campaign.brand && (
                <div>
                  <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">Brand</p>
                  <p className="font-medium text-text-primary">{campaign.brand}</p>
                </div>
              )}
              {campaign.objective && (
                <div>
                  <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">Objective</p>
                  <p className="font-medium text-text-primary">{campaign.objective}</p>
                </div>
              )}
              <div>
                <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">Duration</p>
                <p className="font-medium text-text-primary">{formatDate(campaign.startDate)} — {formatDate(campaign.endDate)}</p>
              </div>
              <div>
                <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">Deliverables</p>
                <p className="font-medium text-text-primary">{campaign.deliverables.length} types, {campaign.deliverables.reduce((s, d) => s + d.quantity, 0)} total items</p>
              </div>
            </div>
          </Card>

          {/* Scope summary */}
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Scope Summary</h3>
            <div className="space-y-2.5">
              {campaign.deliverables.map((d) => (
                <div key={`${d.type}-${d.platform}`} className="flex items-center justify-between rounded-xl bg-surface-elevated/30 border border-border/30 p-3.5">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{d.type} × {d.quantity} on {d.platform}</p>
                    <p className="text-xs text-text-secondary">{d.status} · {d.revisions} revisions max</p>
                  </div>
                  <p className="text-sm font-semibold text-text-primary">{formatCurrency(d.price)}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
              <span className="text-sm text-text-secondary">Total contract value</span>
              <span className="text-lg font-bold text-accent">{formatCurrency(campaign.budget)}</span>
            </div>
          </Card>

          {/* Payment overview */}
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Payment Status</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="rounded-xl bg-success/[0.06] border border-success/10 p-4">
                <p className="text-xs text-text-secondary">Released</p>
                <p className="text-lg font-bold text-success">{formatCurrency(releasedAmount)}</p>
              </div>
              <div className="rounded-xl bg-warning/[0.06] border border-warning/10 p-4">
                <p className="text-xs text-text-secondary">In Escrow</p>
                <p className="text-lg font-bold text-warning">{formatCurrency(escrowAmount)}</p>
              </div>
              <div className="rounded-xl bg-surface-elevated/50 border border-border/30 p-4">
                <p className="text-xs text-text-secondary">Pending</p>
                <p className="text-lg font-bold text-text-primary">{formatCurrency(campaign.budget - releasedAmount - escrowAmount)}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {activeTab === "deliverables" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {campaign.deliverables.map((d, i) => (
            <motion.div key={`${d.type}-${d.platform}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-text-primary">{d.type} × {d.quantity}</h4>
                    <p className="text-xs text-text-secondary mt-0.5">Platform: {d.platform} · Max {d.revisions} revisions</p>
                  </div>
                  <span className="text-sm font-bold text-accent font-mono">{formatCurrency(d.price)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={d.status.includes("approved") || d.status === "Completed" ? "success" : d.status.includes("review") || d.status.includes("progress") ? "warning" : "default"}>
                    {d.status}
                  </Badge>
                </div>
                {role === "business" && campaign.status === "ACTIVE" && (
                  <div className="flex gap-2 mt-4 pt-3 border-t border-border/30">
                    <Button variant="ghost" size="sm" className="gap-1 text-xs"><MessageSquare className="h-3 w-3" /> Send Feedback</Button>
                    <Button variant="ghost" size="sm" className="gap-1 text-xs text-success"><CheckCircle2 className="h-3 w-3" /> Approve</Button>
                  </div>
                )}
                {role === "creator" && campaign.status === "ACTIVE" && (
                  <div className="flex gap-2 mt-4 pt-3 border-t border-border/30">
                    <Button variant="ghost" size="sm" className="gap-1 text-xs"><FileText className="h-3 w-3" /> Upload Draft</Button>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {activeTab === "payments" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Payment summary */}
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-text-primary">{formatCurrency(campaign.budget)}</p>
            <p className="text-sm text-text-secondary mt-1">Total contract value</p>
            <div className="h-2 w-full rounded-full bg-surface-elevated overflow-hidden mt-4 max-w-sm mx-auto">
              <div
                className="h-full rounded-full bg-gradient-to-r from-success to-accent transition-all duration-500"
                style={{ width: `${(releasedAmount / campaign.budget) * 100}%` }}
              />
            </div>
            <p className="text-xs text-text-secondary mt-2">
              {formatCurrency(releasedAmount)} released · {formatCurrency(escrowAmount)} in escrow
            </p>
          </Card>

          {/* Milestones */}
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Milestones</h3>
            <div className="space-y-3">
              {campaign.milestones.map((m) => {
                const config = milestoneConfig[m.status];
                return (
                  <div key={m.name} className="flex items-center justify-between py-3 border-b border-border/20 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${config.color}`}>
                        <config.icon className="h-3.5 w-3.5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-text-primary">{m.name}</p>
                        {m.date && <p className="text-xs text-text-secondary">{formatDate(m.date)}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${config.bgColor} ${config.textColor}`}>{config.label}</span>
                      <span className="text-sm font-semibold text-text-primary">{formatCurrency(m.amount)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Dispute resolution */}
          <Card className="p-6 border-error/10">
            <div className="flex items-center gap-2 mb-3">
              <Flag className="h-4 w-4 text-error" />
              <h3 className="text-sm font-semibold text-text-primary">Dispute Resolution</h3>
            </div>
            <div className="flex items-center gap-2 mb-3">
              {[
                { step: "Raise Issue", icon: Flag, desc: "Either party flags a concern" },
                { step: "Mediation", icon: Scale, desc: "Platform mediator in 24h" },
                { step: "Resolution", icon: CheckCircle2, desc: "Auto-resolved in 7 days" },
              ].map((s, i) => (
                <div key={s.step} className="flex items-center gap-2">
                  <div className="text-center">
                    <div className="h-8 w-8 rounded-full bg-surface-elevated flex items-center justify-center mx-auto mb-1">
                      <s.icon className="h-3.5 w-3.5 text-text-secondary" />
                    </div>
                    <p className="text-[10px] font-medium text-text-primary">{s.step}</p>
                    <p className="text-[8px] text-text-secondary">{s.desc}</p>
                  </div>
                  {i < 2 && <ChevronRight className="h-3 w-3 text-border mt-[-12px]" />}
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full">Raise an Issue</Button>
          </Card>
        </motion.div>
      )}

      {activeTab === "analytics" && campaign.analytics && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Impressions", value: campaign.analytics.impressions, color: "text-accent" },
              { label: "Engagement", value: campaign.analytics.engagement, color: "text-success" },
              { label: "Cost/Engage", value: campaign.analytics.costPerEngage, color: "text-[#00B8D9]" },
              { label: "Saves", value: campaign.analytics.saves, color: "text-warning" },
            ].map((stat) => (
              <Card key={stat.label} className="p-4">
                <p className="text-xs text-text-secondary">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </Card>
            ))}
          </div>
          <Card className="p-5 border-accent/10">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-accent" />
              <span className="text-sm font-semibold text-text-primary">AI Insight</span>
            </div>
            <p className="text-sm text-text-secondary">
              {role === "creator"
                ? "Your content is performing 2.3x above category average. Consider requesting a rate increase for the next collaboration."
                : "This campaign's cost-per-engagement is 38% below industry benchmark. Consider scaling with additional creators."
              }
            </p>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
