"use client";

import { PageHeader } from "@/components/layout/page-header";
import { Card, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/stat-card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { IndianRupee, Eye, BarChart3, TrendingUp } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";

const earningsData = [
  { month: "Oct", earnings: 25000 },
  { month: "Nov", earnings: 38000 },
  { month: "Dec", earnings: 42000 },
  { month: "Jan", earnings: 35000 },
  { month: "Feb", earnings: 52000 },
  { month: "Mar", earnings: 45200 },
];

const profileViewsData = [
  { week: "W1", views: 45 },
  { week: "W2", views: 62 },
  { week: "W3", views: 78 },
  { week: "W4", views: 91 },
  { week: "W5", views: 84 },
  { week: "W6", views: 110 },
];

const verticalData = [
  { name: "Fashion", value: 45 },
  { name: "Lifestyle", value: 25 },
  { name: "Beauty", value: 20 },
  { name: "Travel", value: 10 },
];

const COLORS = ["#6C5CE7", "#00B8D9", "#34C759", "#FF9F0A"];

const industryData = [
  { industry: "E-commerce", collabs: 12 },
  { industry: "Fashion", collabs: 8 },
  { industry: "Beauty", collabs: 6 },
  { industry: "Tech", collabs: 4 },
  { industry: "Food", collabs: 3 },
];

export default function CreatorAnalyticsPage() {
  return (
    <div>
      <PageHeader title="Analytics" description="Track your performance and growth" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Earnings" value="₹2,37,200" change={{ value: "+18% vs last quarter", positive: true }} icon={<IndianRupee className="h-4 w-4" />} />
        <StatCard label="Profile Views" value="470" change={{ value: "+32% this month", positive: true }} icon={<Eye className="h-4 w-4" />} />
        <StatCard label="Completion Rate" value="96%" change={{ value: "Above average", positive: true }} icon={<BarChart3 className="h-4 w-4" />} />
        <StatCard label="Regional Rank" value="Top 15%" change={{ value: "Mumbai creators", positive: true }} icon={<TrendingUp className="h-4 w-4" />} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Earnings Chart */}
        <Card className="p-6">
          <CardTitle className="mb-4">Earnings Over Time</CardTitle>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earningsData}>
                <defs>
                  <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6C5CE7" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6C5CE7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fill: "var(--text-secondary)", fontSize: 12 }} />
                <YAxis tick={{ fill: "var(--text-secondary)", fontSize: 12 }} tickFormatter={(v) => `₹${v / 1000}K`} />
                <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} formatter={(v) => [formatCurrency(v as number), "Earnings"]} />
                <Area type="monotone" dataKey="earnings" stroke="#6C5CE7" fill="url(#earningsGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Profile Views */}
        <Card className="p-6">
          <CardTitle className="mb-4">Profile View Trends</CardTitle>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={profileViewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="week" tick={{ fill: "var(--text-secondary)", fontSize: 12 }} />
                <YAxis tick={{ fill: "var(--text-secondary)", fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="views" fill="#6C5CE7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Content Verticals */}
        <Card className="p-6">
          <CardTitle className="mb-4">Top Content Verticals</CardTitle>
          <div className="flex items-center gap-8">
            <div className="h-48 w-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={verticalData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value" paddingAngle={4}>
                    {verticalData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {verticalData.map((v, i) => (
                <div key={v.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ background: COLORS[i] }} />
                  <span className="text-sm text-text-primary">{v.name}</span>
                  <span className="text-sm font-mono text-text-secondary">{v.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Brand Categories */}
        <Card className="p-6">
          <CardTitle className="mb-4">Brands by Industry</CardTitle>
          <div className="space-y-3">
            {industryData.map((item) => (
              <div key={item.industry} className="flex items-center gap-3">
                <span className="text-sm text-text-primary w-24">{item.industry}</span>
                <div className="flex-1 h-2 rounded-full bg-surface-elevated overflow-hidden">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${(item.collabs / 12) * 100}%` }} />
                </div>
                <span className="text-sm font-mono text-text-secondary w-8">{item.collabs}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg bg-accent/5 border border-accent/10 p-3">
            <p className="text-xs text-accent font-medium">You earn 20% above average for your region</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
