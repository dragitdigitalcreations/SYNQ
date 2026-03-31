"use client";

import { PageHeader } from "@/components/layout/page-header";
import { Card, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/stat-card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { formatCurrency } from "@/lib/utils";
import { BarChart3, TrendingUp, IndianRupee, Users } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";

const roiData = [
  { campaign: "Fashion SS", roi: 3.8 },
  { campaign: "Tech Launch", roi: 4.5 },
  { campaign: "Food Collab", roi: 2.9 },
  { campaign: "Fitness Q1", roi: 5.2 },
];

const responseData = [
  { month: "Oct", rate: 35 },
  { month: "Nov", rate: 42 },
  { month: "Dec", rate: 38 },
  { month: "Jan", rate: 45 },
  { month: "Feb", rate: 52 },
  { month: "Mar", rate: 48 },
];

const topCreators = [
  { name: "Priya Sharma", collabs: 5, roi: 4.8, spend: 185000 },
  { name: "Arjun Mehta", collabs: 3, roi: 4.2, spend: 120000 },
  { name: "Sneha Reddy", collabs: 2, roi: 3.9, spend: 65000 },
];

export default function BusinessAnalyticsPage() {
  return (
    <div>
      <PageHeader title="Analytics" description="Campaign performance and ROI insights" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Avg. Campaign ROI" value="4.2x" change={{ value: "+0.3 vs last quarter", positive: true }} icon={<TrendingUp className="h-4 w-4" />} />
        <StatCard label="Creator Response Rate" value="48%" change={{ value: "+6% this month", positive: true }} icon={<Users className="h-4 w-4" />} />
        <StatCard label="Avg. Cost/Engagement" value="₹2.40" change={{ value: "-₹0.30", positive: true }} icon={<IndianRupee className="h-4 w-4" />} />
        <StatCard label="Budget Utilized" value="72%" change={{ value: "₹2.85L of ₹3.95L", positive: true }} icon={<BarChart3 className="h-4 w-4" />} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-6">
          <CardTitle className="mb-4">Campaign ROI</CardTitle>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roiData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="campaign" tick={{ fill: "var(--text-secondary)", fontSize: 12 }} />
                <YAxis tick={{ fill: "var(--text-secondary)", fontSize: 12 }} tickFormatter={(v) => `${v}x`} />
                <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} formatter={(v) => [`${v}x`, "ROI"]} />
                <Bar dataKey="roi" fill="#34C759" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <CardTitle className="mb-4">Creator Response Rate Trend</CardTitle>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={responseData}>
                <defs>
                  <linearGradient id="responseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6C5CE7" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6C5CE7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fill: "var(--text-secondary)", fontSize: 12 }} />
                <YAxis tick={{ fill: "var(--text-secondary)", fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
                <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="rate" stroke="#6C5CE7" fill="url(#responseGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <CardTitle className="mb-4">Top Performing Creators</CardTitle>
        <div className="space-y-3">
          {topCreators.map((creator, i) => (
            <div key={creator.name} className="flex items-center gap-4 rounded-lg border border-border p-4">
              <span className="text-lg font-bold font-mono text-text-secondary w-6">{i + 1}</span>
              <Avatar name={creator.name} size="md" />
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">{creator.name}</p>
                <p className="text-xs text-text-secondary">{creator.collabs} collaborations</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono font-medium text-success">{creator.roi}x ROI</p>
                <p className="text-xs text-text-secondary">{formatCurrency(creator.spend)} spent</p>
              </div>
              <Badge variant="accent">Re-hire</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
