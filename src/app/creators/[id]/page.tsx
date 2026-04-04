"use client";

import { motion } from "framer-motion";
import {
  MapPin, CheckCircle, Clock, Star, Repeat, Send, Calendar,
  Instagram, Youtube, Twitter, BarChart3, Users, Zap,
  ArrowLeft, Shield, TrendingUp, IndianRupee, Camera,
  MessageSquare, Lock,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import Image from "next/image";

/* ── CSS initials avatar (no external image deps) ── */
function CreatorAvatar({ name, size = "md", className = "" }: { name: string; size?: "sm" | "md" | "lg" | "xl"; className?: string }) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const palette = [
    "from-[#6C5CE7] to-[#a29bfe]",
    "from-[#00B8D9] to-[#74b9ff]",
    "from-[#00b894] to-[#55efc4]",
    "from-[#e17055] to-[#fab1a0]",
    "from-[#fd79a8] to-[#fdcb6e]",
    "from-[#6c5ce7] to-[#00cec9]",
  ];
  const gradient = palette[initials.charCodeAt(0) % palette.length];
  const sz =
    size === "sm" ? "h-8 w-8 text-[11px]" :
    size === "lg" ? "h-16 w-16 text-[20px]" :
    size === "xl" ? "h-24 w-24 text-[28px]" :
    "h-10 w-10 text-[13px]";
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center font-bold text-white shrink-0 ${sz} ${className}`}>
      {initials}
    </div>
  );
}

/* ── Gradient portfolio tile ── */
function PortfolioTile({ niche, index }: { niche: string; index: number }) {
  const configs = [
    { gradient: "from-pink-500/20 via-purple-500/10 to-accent/20", label: "Reel" },
    { gradient: "from-[#00B8D9]/20 via-accent/10 to-blue-500/20", label: "Story" },
    { gradient: "from-green-500/20 via-emerald-500/10 to-teal-500/20", label: "Photo" },
    { gradient: "from-orange-500/20 via-amber-500/10 to-yellow-500/20", label: "YouTube" },
    { gradient: "from-accent/20 via-purple-500/10 to-pink-500/20", label: "Collab" },
    { gradient: "from-[#00B8D9]/20 via-teal-500/10 to-green-500/20", label: "Brand" },
  ];
  const c = configs[index % configs.length];
  return (
    <div className={`aspect-square rounded-xl bg-gradient-to-br ${c.gradient} border border-border/20 flex items-end p-2.5 group-hover:scale-[1.02] transition-transform duration-300`}>
      <div className="flex items-center gap-1">
        <Camera className="h-3 w-3 text-text-secondary" />
        <span className="text-[9px] font-medium text-text-secondary">{c.label}</span>
      </div>
    </div>
  );
}

const mockCreator = {
  id: "1",
  name: "Priya Sharma",
  handle: "@priyacreates",
  location: "Mumbai, Maharashtra",
  niche: "Fashion & Lifestyle",
  bio: "Fashion & lifestyle content creator with 2.1L+ followers on Instagram. I create authentic, visually stunning content that connects brands with Gen-Z and millennial audiences. Known for Reels that consistently hit 8%+ save rates.",
  verified: true,
  verticals: ["Fashion", "Lifestyle", "Beauty"],
  formats: ["Reels", "YouTube Shorts", "Stories", "Photography"],
  followers: "2.1L",
  followersRaw: 210000,
  engagementRate: 4.8,
  responseTime: 2,
  onTimeRate: 100,
  repeatRate: 42,
  completedCollabs: 38,
  availability: "OPEN",
  socialLinks: { instagram: "priyacreates", youtube: "PriyaSharmaOfficial", twitter: "priyacreates" },
  rateCard: [
    { format: "Instagram Reel", price: "₹12,000" },
    { format: "YouTube Short", price: "₹8,000" },
    { format: "Story Set (×3)", price: "₹4,500" },
    { format: "Photography", price: "₹7,500" },
  ],
  badges: ["Fast Responder", "100% On-Time", "5+ Repeat Brands"],
  recentCollabs: [
    { brand: "Bloom Skincare", campaign: "Spring Glow", deliverable: "3 Reels", result: "8.2% save rate", date: "Mar 2024", c: "text-accent bg-accent/[0.07]" },
    { brand: "TrailCo Outdoors", campaign: "Summer Launch", deliverable: "2 Reels + Stories", result: "6.1% engagement", date: "Feb 2024", c: "text-[#00B8D9] bg-[#00B8D9]/[0.07]" },
    { brand: "NutriPro India", campaign: "Wellness Series", deliverable: "5 Stories", result: "74% completion", date: "Jan 2024", c: "text-success bg-success/[0.07]" },
  ],
};

export default function CreatorProfilePage() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-text-primary">
      {/* Top nav */}
      <nav className="sticky top-0 z-40 bg-surface-glass backdrop-blur-xl border-b border-border/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-1.5 text-[13px] text-text-secondary hover:text-text-primary transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </Link>
            <div className="h-4 w-px bg-border/40" />
            <Image
              src={theme === "dark" ? "/synq logo night mode.png" : "/synq logo light mode.png"}
              alt="SYNQ" width={64} height={20} className="h-5 w-auto object-contain"
            />
          </div>
          <Link href="/register?role=BUSINESS">
            <Button size="sm" className="glow-accent gap-2 text-[13px] h-9 px-4">
              <Send className="h-3.5 w-3.5" /> Send Brief
            </Button>
          </Link>
        </div>
      </nav>

      {/* Cover gradient */}
      <div className="h-36 sm:h-48 bg-gradient-to-br from-accent/15 via-accent/5 to-[#00B8D9]/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, var(--color-text-primary) 1px, transparent 0)", backgroundSize: "24px 24px" }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-12 pb-20">

        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start gap-5 mb-8"
        >
          <CreatorAvatar name={mockCreator.name} size="xl" className="ring-4 ring-background shadow-xl" />
          <div className="flex-1 pt-2 sm:pt-8">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-[22px] sm:text-[26px] font-bold text-text-primary leading-none">{mockCreator.name}</h1>
              {mockCreator.verified && (
                <div className="flex items-center gap-1 rounded-full bg-accent/[0.08] border border-accent/[0.15] px-2 py-0.5">
                  <CheckCircle className="h-3 w-3 text-accent" />
                  <span className="text-[10px] font-semibold text-accent">Verified</span>
                </div>
              )}
              <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold border ${mockCreator.availability === "OPEN" ? "bg-success/10 border-success/20 text-success" : "bg-surface-elevated border-border text-text-secondary"}`}>
                <div className={`h-1.5 w-1.5 rounded-full ${mockCreator.availability === "OPEN" ? "bg-success animate-pulse" : "bg-text-secondary"}`} />
                {mockCreator.availability === "OPEN" ? "Available for deals" : "Selective"}
              </div>
            </div>
            <p className="text-[13px] text-text-secondary flex items-center gap-1.5 mb-2">
              <MapPin className="h-3.5 w-3.5" /> {mockCreator.location}
              <span className="text-border mx-1">·</span>
              <span className="text-accent font-medium">{mockCreator.handle}</span>
            </p>
            <p className="text-[14px] text-text-secondary leading-relaxed max-w-xl mb-3">{mockCreator.bio}</p>
            <div className="flex flex-wrap gap-1.5">
              {mockCreator.verticals.map(v => (
                <span key={v} className="rounded-full bg-surface-elevated border border-border/50 px-2.5 py-0.5 text-[11px] font-medium text-text-secondary">{v}</span>
              ))}
              {mockCreator.formats.map(f => (
                <span key={f} className="rounded-full bg-accent/[0.06] border border-accent/[0.12] px-2.5 py-0.5 text-[11px] font-medium text-accent">{f}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8"
        >
          {[
            { label: "Followers", value: mockCreator.followers, icon: Users, c: "text-text-primary" },
            { label: "Engagement", value: `${mockCreator.engagementRate}%`, icon: BarChart3, c: "text-accent" },
            { label: "Response", value: `${mockCreator.responseTime}h`, icon: Clock, c: "text-text-primary" },
            { label: "On-Time", value: `${mockCreator.onTimeRate}%`, icon: Zap, c: "text-success" },
            { label: "Repeat Rate", value: `${mockCreator.repeatRate}%`, icon: Repeat, c: "text-[#00B8D9]" },
            { label: "Collabs", value: `${mockCreator.completedCollabs}`, icon: Star, c: "text-warning" },
          ].map(m => (
            <div key={m.label} className="rounded-xl border border-border/40 bg-surface p-3 text-center hover:border-accent/20 transition-colors">
              <m.icon className={`h-3.5 w-3.5 mx-auto mb-1 ${m.c}`} />
              <p className={`text-[17px] font-bold font-mono ${m.c}`}>{m.value}</p>
              <p className="text-[9px] text-text-secondary mt-0.5">{m.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {mockCreator.badges.map(badge => (
            <div key={badge} className="flex items-center gap-1.5 rounded-full bg-success/[0.07] border border-success/[0.15] px-3 py-1">
              <CheckCircle className="h-3 w-3 text-success" />
              <span className="text-[11px] font-medium text-success">{badge}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 rounded-full bg-surface-elevated border border-border/40 px-3 py-1">
            <Shield className="h-3 w-3 text-text-secondary" />
            <span className="text-[11px] font-medium text-text-secondary">SYNQ Verified Creator</span>
          </div>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-8">

          {/* Left — portfolio + recent collabs */}
          <div>
            <h2 className="text-[15px] font-semibold text-text-primary mb-4">Portfolio</h2>
            <div className="grid grid-cols-3 gap-2 mb-10 group">
              {Array.from({ length: 6 }).map((_, i) => (
                <PortfolioTile key={i} niche={mockCreator.niche} index={i} />
              ))}
            </div>

            <h2 className="text-[15px] font-semibold text-text-primary mb-4">Recent Collaborations</h2>
            <div className="space-y-3 mb-8">
              {mockCreator.recentCollabs.map((collab, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.07 }}
                  className="rounded-xl border border-border/40 bg-surface p-4 flex items-start justify-between gap-4 hover:border-accent/20 hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-xl bg-surface-elevated border border-border/40 flex items-center justify-center text-[13px] font-bold text-text-secondary shrink-0">
                      {collab.brand.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-text-primary">{collab.brand}</p>
                      <p className="text-[11px] text-text-secondary">{collab.campaign} · {collab.deliverable}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold mb-1 ${collab.c}`}>
                      <TrendingUp className="h-2.5 w-2.5" /> {collab.result}
                    </div>
                    <p className="text-[10px] text-text-secondary">{collab.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — rate card, platforms, CTA */}
          <div className="space-y-5">
            {/* Rate Card */}
            <div className="rounded-2xl border border-border/50 bg-surface p-5">
              <div className="flex items-center gap-2 mb-4">
                <IndianRupee className="h-4 w-4 text-accent" />
                <h3 className="text-[14px] font-semibold text-text-primary">Rate Card</h3>
              </div>
              <div className="space-y-2.5">
                {mockCreator.rateCard.map(item => (
                  <div key={item.format} className="flex justify-between items-center">
                    <span className="text-[12px] text-text-secondary">{item.format}</span>
                    <span className="text-[13px] font-bold text-text-primary font-mono">{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-border/30">
                <div className="flex items-center gap-1.5 text-[10px] text-success">
                  <Lock className="h-3 w-3" /> Prices locked on contract sign
                </div>
              </div>
            </div>

            {/* Platforms */}
            <div className="rounded-2xl border border-border/50 bg-surface p-5">
              <h3 className="text-[14px] font-semibold text-text-primary mb-3">Connected Platforms</h3>
              <div className="space-y-2.5">
                {mockCreator.socialLinks.instagram && (
                  <div className="flex items-center gap-2.5 text-[12px]">
                    <div className="h-7 w-7 rounded-lg bg-pink-500/10 flex items-center justify-center shrink-0">
                      <Instagram className="h-3.5 w-3.5 text-pink-500" />
                    </div>
                    <span className="text-text-secondary">@{mockCreator.socialLinks.instagram}</span>
                    <span className="ml-auto text-[11px] font-semibold text-text-primary">{mockCreator.followers}</span>
                  </div>
                )}
                {mockCreator.socialLinks.youtube && (
                  <div className="flex items-center gap-2.5 text-[12px]">
                    <div className="h-7 w-7 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                      <Youtube className="h-3.5 w-3.5 text-red-500" />
                    </div>
                    <span className="text-text-secondary">{mockCreator.socialLinks.youtube}</span>
                  </div>
                )}
                {mockCreator.socialLinks.twitter && (
                  <div className="flex items-center gap-2.5 text-[12px]">
                    <div className="h-7 w-7 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0">
                      <Twitter className="h-3.5 w-3.5 text-sky-500" />
                    </div>
                    <span className="text-text-secondary">@{mockCreator.socialLinks.twitter}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Collab stats */}
            <div className="rounded-2xl border border-border/50 bg-surface p-5">
              <h3 className="text-[14px] font-semibold text-text-primary mb-3">Track Record</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Completed", value: `${mockCreator.completedCollabs}`, c: "text-text-primary" },
                  { label: "Repeat rate", value: `${mockCreator.repeatRate}%`, c: "text-[#00B8D9]" },
                  { label: "On-time", value: `${mockCreator.onTimeRate}%`, c: "text-success" },
                  { label: "Avg response", value: `${mockCreator.responseTime}h`, c: "text-text-primary" },
                ].map(s => (
                  <div key={s.label} className="rounded-xl bg-surface-elevated/60 p-2.5 text-center">
                    <p className={`text-[18px] font-bold font-mono ${s.c}`}>{s.value}</p>
                    <p className="text-[9px] text-text-secondary">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-2xl border-2 border-accent/20 bg-accent/[0.03] p-5">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="h-4 w-4 text-accent" />
                <h3 className="text-[14px] font-semibold text-text-primary">Work with Priya</h3>
              </div>
              <p className="text-[12px] text-text-secondary mb-4 leading-relaxed">
                Send a structured brief. If Priya accepts, scope is locked and ₹ goes to escrow automatically.
              </p>
              <Link href="/register?role=BUSINESS">
                <Button className="w-full glow-accent gap-2 h-11 text-[13px]">
                  <Send className="h-3.5 w-3.5" /> Send Brief
                </Button>
              </Link>
              <div className="flex items-center gap-1.5 mt-3 text-[10px] text-text-secondary justify-center">
                <Shield className="h-3 w-3" /> Payment protected by escrow
              </div>
            </div>

            {/* Availability signal */}
            <div className="rounded-xl border border-success/15 bg-success/[0.03] p-4 flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse shrink-0" />
              <div>
                <p className="text-[12px] font-semibold text-success">Available for deals</p>
                <p className="text-[10px] text-text-secondary mt-0.5">Responds within {mockCreator.responseTime}h · {mockCreator.availability === "OPEN" ? "Taking new briefs" : "Selective"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
