"use client";

import Link from "next/link";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Moon, Sun, Star, CheckCircle2, Search, Zap, Shield,
  TrendingUp, IndianRupee, Clock, ChevronRight, BarChart3, Lock,
  MessageSquare, FileText, CreditCard, Flag, Camera, Heart, Send,
  Play, Sparkles, Users, Briefcase, Target,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { useRef, useState, useEffect } from "react";

/* ─── Animated count-up ─── */
function useCountUp(target: number, inView: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t0 = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - t0) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);
  return count;
}

/* ─── Fade-up animation preset ─── */
const fu = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

/* ─── Unsplash image helper ─── */
const img = (id: string, w = 300, h = 300) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

/* ─── Creator profiles (influencers, not developers) ─── */
const creators = [
  {
    name: "Priya Sharma",
    handle: "@priyacreates",
    niche: "Fashion & Lifestyle",
    location: "Mumbai",
    followers: "2.1L",
    engagement: "4.8%",
    reel: "₹12,000",
    story: "₹4,500",
    rating: 4.9,
    collabs: 38,
    available: true,
    platforms: ["Instagram", "YouTube"],
    avatar: img("1494790108377-be9c29b29330", 120, 120),
    portfolio: img("1611162617474-5b21e879e113", 400, 300),
    tags: ["Fashion", "Beauty", "Lifestyle"],
  },
  {
    name: "Marcus Chen",
    handle: "@marcustech",
    niche: "Tech & Gadgets",
    location: "Bangalore",
    followers: "3.4L",
    engagement: "5.2%",
    reel: "₹18,000",
    story: "₹6,000",
    rating: 4.8,
    collabs: 52,
    available: true,
    platforms: ["YouTube", "Instagram"],
    avatar: img("1507003211169-0a1dd7228f2d", 120, 120),
    portfolio: img("1550439062-609e1531270e", 400, 300),
    tags: ["Tech", "Unboxing", "Reviews"],
  },
  {
    name: "Sneha Rao",
    handle: "@snehafit",
    niche: "Fitness & Wellness",
    location: "Hyderabad",
    followers: "85K",
    engagement: "7.1%",
    reel: "₹8,000",
    story: "₹3,000",
    rating: 5.0,
    collabs: 24,
    available: false,
    platforms: ["Instagram"],
    avatar: img("1534528741775-53994a69daeb", 120, 120),
    portfolio: img("1526170375885-4d8ecf77b99f", 400, 300),
    tags: ["Fitness", "Wellness", "Nutrition"],
  },
  {
    name: "Arjun Nair",
    handle: "@arjunwanders",
    niche: "Travel & Adventure",
    location: "Delhi NCR",
    followers: "1.2L",
    engagement: "6.3%",
    reel: "₹10,000",
    story: "₹3,500",
    rating: 4.7,
    collabs: 31,
    available: true,
    platforms: ["Instagram", "YouTube"],
    avatar: img("1539571696357-5a69c17a67c6", 120, 120),
    portfolio: img("1469474968028-56623f02e42e", 400, 300),
    tags: ["Travel", "Photography", "Adventure"],
  },
];

/* ─── Niche filter pill ─── */
function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 ${
        active
          ? "bg-accent text-white shadow-sm"
          : "bg-surface border border-border/50 text-text-secondary hover:border-accent/30 hover:text-text-primary"
      }`}
    >
      {label}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════ */
function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface-glass backdrop-blur-xl border-b border-border/40 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-8">
        <Link href="/" className="shrink-0">
          <Image
            src={theme === "dark" ? "/synq logo night mode.png" : "/synq logo light mode.png"}
            alt="SYNQ" width={88} height={28}
            className="h-7 w-auto object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-[13px] text-text-secondary flex-1">
          {[["How it works","#how-it-works"],["For Creators","#creators"],["For Brands","#brands"],["Pricing","#pricing"]].map(([l,h]) => (
            <a key={l} href={h} className="hover:text-text-primary transition-colors">{l}</a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2.5">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-all"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link href="/login" className="hidden md:block text-[13px] text-text-secondary hover:text-text-primary transition-colors px-2">
            Sign in
          </Link>
          <Link href="/register">
            <Button size="sm" className="glow-accent text-[13px] h-9 px-4">
              Get Started <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

/* ═══════════════════════════════════════════════════════
   HERO — Brand × Creator collaboration workspace preview
═══════════════════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeTab, setActiveTab] = useState(0);

  /* Auto-rotate tabs */
  useEffect(() => {
    const t = setInterval(() => setActiveTab(p => (p + 1) % 3), 4500);
    return () => clearInterval(t);
  }, []);

  const tabs = [
    { label: "Campaign", icon: Briefcase },
    { label: "Contract", icon: FileText },
    { label: "Payments", icon: CreditCard },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden min-h-[calc(100vh-64px)] flex items-center">
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.06] via-transparent to-[#00B8D9]/[0.04]" />
        <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full bg-accent/[0.05] blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#00B8D9]/[0.04] blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-16 w-full">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">

          {/* LEFT — Value proposition */}
          <div>
            <motion.div {...fu(0)}>
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/[0.08] border border-accent/[0.15] px-3.5 py-1.5 text-[12px] font-medium text-accent mb-8">
                <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                2,400+ brand-creator collabs completed
              </div>
            </motion.div>

            <motion.h1
              {...fu(0.07)}
              className="text-[50px] sm:text-[60px] lg:text-[64px] font-bold tracking-[-0.03em] leading-[1.05] text-text-primary"
            >
              Where brands and{" "}
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-accent to-[#00B8D9] bg-clip-text text-transparent">
                creators build together
              </span>
            </motion.h1>

            <motion.p
              {...fu(0.15)}
              className="mt-6 text-[17px] text-text-secondary leading-[1.75] max-w-[440px]"
            >
              Stop managing campaigns over DMs and spreadsheets. SYNQ gives every brand-creator
              collaboration a structured workspace — scope, payments, feedback, and analytics in one place.
            </motion.p>

            <motion.div {...fu(0.23)} className="flex flex-col sm:flex-row items-start gap-3 mt-10">
              <Link href="/register?role=CREATOR">
                <Button size="lg" className="glow-accent gap-2 text-[15px] h-12 px-7 font-semibold">
                  <Camera className="h-4 w-4" /> I&apos;m a Creator
                </Button>
              </Link>
              <Link href="/register?role=BUSINESS">
                <Button variant="outline" size="lg" className="gap-2 text-[15px] h-12 px-6">
                  <Briefcase className="h-4 w-4" /> I&apos;m a Brand
                </Button>
              </Link>
            </motion.div>

            <motion.div {...fu(0.31)} className="flex flex-wrap items-center gap-5 mt-8 text-[13px] text-text-secondary">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Free for creators</span>
              <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-success" /> Escrow payments</span>
              <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-success" /> Signed contracts</span>
            </motion.div>
          </div>

          {/* RIGHT — Real SYNQ workspace UI */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.65 }}
            className="relative"
          >
            {/* Main workspace window */}
            <div className="rounded-2xl bg-surface border border-border/50 shadow-2xl overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border/40 bg-surface-elevated/40">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-error/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-warning/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-success/50" />
                </div>
                <div className="flex-1 flex justify-center">
                  {/* Tab switcher */}
                  <div className="flex rounded-lg bg-surface-elevated/70 p-0.5 gap-0.5">
                    {tabs.map((tab, i) => (
                      <button
                        key={tab.label}
                        onClick={() => setActiveTab(i)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-medium transition-all ${
                          activeTab === i ? "bg-surface text-accent shadow-sm" : "text-text-secondary hover:text-text-primary"
                        }`}
                      >
                        <tab.icon className="h-3 w-3" /> {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Collab participants */}
                <div className="flex -space-x-1.5">
                  {[creators[0].avatar, creators[1].avatar].map((src, i) => (
                    <img key={i} src={src} alt="" className="h-5 w-5 rounded-full border-2 border-surface object-cover" />
                  ))}
                  <div className="h-5 w-5 rounded-full bg-accent/20 border-2 border-surface flex items-center justify-center text-[7px] font-bold text-accent">+2</div>
                </div>
              </div>

              {/* Campaign header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-border/30">
                <div>
                  <p className="text-[13px] font-semibold text-text-primary">Bloom Skincare × Priya Sharma</p>
                  <p className="text-[10px] text-text-secondary">Spring Glow Campaign · 14-day timeline</p>
                </div>
                <div className="rounded-full bg-success/10 border border-success/20 px-2.5 py-0.5 text-[10px] font-semibold text-success">
                  Active
                </div>
              </div>

              {/* Tab content */}
              <div className="p-5 min-h-[280px]">
                <AnimatePresence mode="wait">
                  {/* Campaign — deliverables overview */}
                  {activeTab === 0 && (
                    <motion.div key="camp" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
                      <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-3">Deliverables</p>
                      {[
                        { type: "Instagram Reels × 3", status: "1 approved · 1 in review", payment: "₹36,000", progress: 66, sc: "text-accent" },
                        { type: "Story Set × 2", status: "Awaiting draft", payment: "₹10,000", progress: 0, sc: "text-warning" },
                        { type: "Photography × 1", status: "Not started", payment: "₹8,000", progress: 0, sc: "text-text-secondary" },
                      ].map(d => (
                        <div key={d.type} className="flex items-center gap-3 rounded-xl bg-surface-elevated/40 border border-border/25 p-3 mb-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] font-medium text-text-primary">{d.type}</p>
                            <p className={`text-[10px] mt-0.5 ${d.sc}`}>{d.status}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-[11px] font-semibold text-text-primary">{d.payment}</p>
                            <div className="h-1 w-14 rounded-full bg-surface-elevated mt-1 overflow-hidden">
                              <div className="h-full rounded-full bg-accent" style={{ width: `${d.progress}%` }} />
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-between text-[11px] mt-3 pt-2 border-t border-border/30">
                        <span className="text-text-secondary">Total campaign</span>
                        <span className="font-semibold text-accent">₹54,000</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Contract — scope with decision signals */}
                  {activeTab === 1 && (
                    <motion.div key="cont" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {[
                          { label: "Brand Reliability", value: "98%", c: "text-success", bg: "bg-success/[0.06]" },
                          { label: "Est. Effort", value: "~18h", c: "text-accent", bg: "bg-accent/[0.06]" },
                          { label: "Exp. Reach", value: "~45K", c: "text-[#00B8D9]", bg: "bg-[#00B8D9]/[0.06]" },
                        ].map(s => (
                          <div key={s.label} className={`rounded-xl ${s.bg} p-2.5 text-center`}>
                            <p className="text-[9px] text-text-secondary mb-0.5">{s.label}</p>
                            <p className={`text-[13px] font-bold ${s.c}`}>{s.value}</p>
                          </div>
                        ))}
                      </div>
                      <div className="rounded-xl bg-surface-elevated/40 border border-border/25 divide-y divide-border/25">
                        {[["Reels × 3","₹36,000","2 revisions"],["Stories × 2","₹10,000","1 revision"],["Photography × 1","₹8,000","2 revisions"]].map(([t,p,r]) => (
                          <div key={t} className="flex items-center justify-between px-3 py-2">
                            <div>
                              <p className="text-[11px] font-medium text-text-primary">{t}</p>
                              <p className="text-[9px] text-text-secondary">{r}</p>
                            </div>
                            <p className="text-[11px] font-semibold text-text-primary">{p}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-3 text-[10px] text-success">
                        <Lock className="h-3 w-3" /> ₹54,000 locked in escrow on signing
                      </div>
                      <div className="flex gap-2 mt-3">
                        <div className="flex-1 rounded-lg bg-accent text-white text-[12px] font-semibold py-2.5 text-center cursor-pointer">Accept & Sign</div>
                        <div className="flex-1 rounded-lg bg-surface-elevated text-text-secondary text-[12px] py-2.5 text-center cursor-pointer">Negotiate</div>
                      </div>
                    </motion.div>
                  )}

                  {/* Payments — milestone escrow */}
                  {activeTab === 2 && (
                    <motion.div key="pay" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Milestone Payments</p>
                        <div className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold text-accent">₹12K released</div>
                      </div>
                      {[
                        { name: "Reel #1 approved", amount: "₹12,000", status: "Released", c: "bg-success/10 text-success" },
                        { name: "Reel #2 in review", amount: "₹12,000", status: "In Escrow", c: "bg-warning/10 text-warning" },
                        { name: "Final delivery", amount: "₹30,000", status: "In Escrow", c: "bg-warning/10 text-warning" },
                      ].map(p => (
                        <div key={p.name} className="flex items-center justify-between py-2.5 border-b border-border/25 last:border-0">
                          <p className="text-[11px] text-text-primary">{p.name}</p>
                          <div className="flex items-center gap-2">
                            <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${p.c}`}>{p.status}</span>
                            <span className="text-[11px] font-semibold text-text-primary">{p.amount}</span>
                          </div>
                        </div>
                      ))}
                      <div className="mt-3 rounded-xl bg-error/[0.04] border border-error/10 p-3">
                        <p className="text-[10px] font-semibold text-text-primary mb-1 flex items-center gap-1.5">
                          <Flag className="h-3 w-3 text-error" /> Dispute Resolution
                        </p>
                        <p className="text-[9px] text-text-secondary">Raise issue → 24h mediation → Auto-resolved in 7 days</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Tab indicator dots */}
              <div className="flex justify-center gap-1.5 pb-3">
                {tabs.map((_, i) => (
                  <div key={i} className={`h-1 rounded-full transition-all duration-300 ${activeTab === i ? "w-6 bg-accent" : "w-1.5 bg-border"}`} />
                ))}
              </div>
            </div>

            {/* Floating toast — payment released */}
            <motion.div
              initial={{ opacity: 0, x: 16, y: -8 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="absolute -top-4 -right-4 rounded-xl bg-surface border border-border/50 shadow-xl px-3.5 py-2.5 hidden sm:block"
            >
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-success/10 flex items-center justify-center shrink-0">
                  <IndianRupee className="h-4 w-4 text-success" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-success">₹12,000 released</p>
                  <p className="text-[10px] text-text-secondary">Reel #1 approved ✓</p>
                </div>
              </div>
            </motion.div>

            {/* Floating toast — new invite */}
            <motion.div
              initial={{ opacity: 0, x: -16, y: 8 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="absolute -bottom-4 -left-4 rounded-xl bg-surface border border-border/50 shadow-xl px-3.5 py-2.5 hidden sm:block"
            >
              <div className="flex items-center gap-2.5">
                <img src={creators[1].avatar} alt="" className="h-8 w-8 rounded-lg object-cover shrink-0" />
                <div>
                  <p className="text-[11px] font-semibold text-text-primary">New collab invite</p>
                  <p className="text-[10px] text-text-secondary">TrailCo × Marcus Chen</p>
                </div>
                <div className="h-2 w-2 rounded-full bg-accent animate-pulse ml-1" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   TRUST BAR
═══════════════════════════════════════════════════════ */
function TrustBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const c1 = useCountUp(850, isInView);
  const c2 = useCountUp(2400, isInView);
  const c3 = useCountUp(98, isInView);
  const c4 = useCountUp(285, isInView);

  return (
    <div ref={ref} className="border-y border-border/40 bg-surface-elevated/20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: `${c1}+`, label: "Verified creators", sub: "across India" },
            { value: `${c2.toLocaleString()}+`, label: "Collabs completed", sub: "with 98% satisfaction" },
            { value: `${c3}%`, label: "On-time payment rate", sub: "escrow-protected" },
            { value: `₹${c4}K`, label: "Avg creator earnings", sub: "per brand deal" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07 }}
              className="flex flex-col"
            >
              <div className="text-[28px] sm:text-[32px] font-bold text-text-primary tracking-tight">{s.value}</div>
              <div className="text-[13px] font-medium text-text-primary mt-0.5">{s.label}</div>
              <div className="text-[11px] text-text-secondary">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   HOW IT WORKS — Creator path + Brand path, side by side
═══════════════════════════════════════════════════════ */
function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeRole, setActiveRole] = useState<"creator" | "brand">("creator");

  const flows = {
    creator: [
      { n: "01", title: "Build your creator profile", desc: "Set your niche, connect Instagram/YouTube, upload your rate card (Reels, Stories, YouTube), and define what you won't work with — brands see everything upfront." },
      { n: "02", title: "Get matched with brands", desc: "AI scores every brand opportunity on audience overlap, content alignment, and budget fit. See brand reliability (98% on-time pay) before you accept anything." },
      { n: "03", title: "Deliver, get paid — automatically", desc: "Work in a structured workspace. Submit drafts, receive structured feedback, and get your payment auto-released when milestones are approved. No invoice chasing." },
    ],
    brand: [
      { n: "01", title: "Set up your brand & campaign", desc: "Add your company profile, target demographics, and campaign objectives. Define deliverables (Reels × 3, Stories × 2) and your total budget upfront." },
      { n: "02", title: "Discover & invite creators", desc: "Browse 850+ verified creators. Filter by niche, engagement rate, location, and follower count. Every creator shows on-time delivery rate and past collab count." },
      { n: "03", title: "Manage, review & measure ROI", desc: "Approve drafts, give structured feedback, release milestone payments. Get actionable analytics — save rates vs benchmarks, cost-per-engagement, and AI insights." },
    ],
  };

  const steps = flows[activeRole];

  return (
    <section ref={ref} id="how-it-works" className="py-24 relative">
      <div className="absolute inset-0 dot-grid opacity-[0.025] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-10">
          <p className="text-[12px] font-semibold text-accent uppercase tracking-widest mb-3">How it works</p>
          <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary">
            A clear path for both sides
          </h2>
          <p className="mt-4 text-[16px] text-text-secondary max-w-md mx-auto">
            SYNQ is designed for both creators and brands — pick your side to see the flow.
          </p>
        </motion.div>

        {/* Role toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex rounded-xl bg-surface-elevated/60 border border-border/40 p-1 gap-1">
            <button
              onClick={() => setActiveRole("creator")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-[13px] font-semibold transition-all ${activeRole === "creator" ? "bg-surface shadow text-accent border border-accent/15" : "text-text-secondary hover:text-text-primary"}`}
            >
              <Camera className="h-3.5 w-3.5" /> I&apos;m a Creator
            </button>
            <button
              onClick={() => setActiveRole("brand")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-[13px] font-semibold transition-all ${activeRole === "brand" ? "bg-surface shadow text-[#00B8D9] border border-[#00B8D9]/15" : "text-text-secondary hover:text-text-primary"}`}
            >
              <Briefcase className="h-3.5 w-3.5" /> I&apos;m a Brand
            </button>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 relative">
          <div className="absolute top-10 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-transparent via-border to-transparent hidden md:block" />
          <AnimatePresence mode="wait">
            {steps.map((step, i) => (
              <motion.div
                key={`${activeRole}-${step.n}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="rounded-2xl bg-surface border border-border/50 p-6 hover:border-accent/20 hover:shadow-md transition-all duration-300 relative"
              >
                <div className={`h-11 w-11 rounded-xl flex items-center justify-center mb-5 ${activeRole === "creator" ? "bg-accent/[0.08]" : "bg-[#00B8D9]/[0.08]"}`}>
                  <span className={`text-[15px] font-bold font-mono ${activeRole === "creator" ? "text-accent" : "text-[#00B8D9]"}`}>{step.n}</span>
                </div>
                <h3 className="text-[15px] font-semibold text-text-primary mb-2 leading-snug">{step.title}</h3>
                <p className="text-[13px] text-text-secondary leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link href={`/register?role=${activeRole === "creator" ? "CREATOR" : "BUSINESS"}`}>
            <Button size="lg" className="glow-accent gap-2 h-12 px-8 text-[15px]">
              {activeRole === "creator" ? "Join as Creator" : "Find Creators"} <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   CREATOR DISCOVERY — Real influencer cards
═══════════════════════════════════════════════════════ */
function CreatorSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const niches = ["All", "Fashion", "Tech", "Fitness", "Travel"];
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? creators : creators.filter(c => c.tags.includes(active));

  return (
    <section ref={ref} id="creators" className="py-24 bg-surface-elevated/20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <p className="text-[12px] font-semibold text-accent uppercase tracking-widest mb-3">Creator Discovery</p>
            <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary">
              Find your next creator
            </h2>
            <p className="mt-3 text-[15px] text-text-secondary max-w-md">
              Every creator shows real metrics — follower count, engagement rate, rate card, and on-time delivery score.
            </p>
          </div>
          <Link href="/register?role=BUSINESS">
            <Button variant="outline" className="gap-2 shrink-0">
              Browse all 850+ creators <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 mb-8 flex-wrap"
        >
          {niches.map(n => <Pill key={n} label={n} active={active === n} onClick={() => setActive(n)} />)}
        </motion.div>

        {/* Creator cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <AnimatePresence>
            {(filtered.length > 0 ? filtered : creators).map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="rounded-2xl bg-surface border border-border/50 overflow-hidden hover:border-accent/25 hover:shadow-lg transition-all duration-300 group"
              >
                {/* Portfolio thumbnail */}
                <div className="relative h-28 overflow-hidden">
                  <img src={c.portfolio} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
                  <div className={`absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full px-2 py-0.5 ${c.available ? "bg-success/15 border border-success/25" : "bg-surface-elevated/80 border border-border/40"}`}>
                    {c.available && <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />}
                    <span className={`text-[9px] font-semibold ${c.available ? "text-success" : "text-text-secondary"}`}>
                      {c.available ? "Available" : "Busy"}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  {/* Avatar overlap */}
                  <div className="flex items-center gap-3 -mt-9 mb-3">
                    <img src={c.avatar} alt={c.name} className="h-12 w-12 rounded-xl border-2 border-surface object-cover shadow-md" />
                    <div className="pt-6">
                      <p className="text-[13px] font-semibold text-text-primary">{c.name}</p>
                      <p className="text-[10px] text-text-secondary">{c.handle}</p>
                    </div>
                  </div>

                  {/* Niche + location */}
                  <p className="text-[11px] text-text-secondary mb-2">{c.niche} · {c.location}</p>

                  {/* Key metrics */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="rounded-lg bg-surface-elevated/60 p-2 text-center">
                      <p className="text-[13px] font-bold text-text-primary">{c.followers}</p>
                      <p className="text-[9px] text-text-secondary">followers</p>
                    </div>
                    <div className="rounded-lg bg-surface-elevated/60 p-2 text-center">
                      <p className="text-[13px] font-bold text-accent">{c.engagement}</p>
                      <p className="text-[9px] text-text-secondary">engagement</p>
                    </div>
                  </div>

                  {/* Rate card */}
                  <div className="flex items-center gap-2 text-[11px] text-text-secondary mb-3">
                    <IndianRupee className="h-3 w-3 shrink-0" />
                    <span>Reel <span className="font-semibold text-text-primary">{c.reel}</span></span>
                    <span className="text-border">·</span>
                    <span>Story <span className="font-semibold text-text-primary">{c.story}</span></span>
                  </div>

                  {/* Rating + collabs */}
                  <div className="flex items-center gap-2 text-[11px] text-text-secondary mb-4">
                    <Star className="h-3 w-3 fill-warning text-warning" />
                    <span className="font-medium text-text-primary">{c.rating}</span>
                    <span className="text-border">·</span>
                    <span>{c.collabs} collabs done</span>
                  </div>

                  {/* CTA */}
                  <Link href="/register?role=BUSINESS">
                    <button className="w-full rounded-xl bg-accent/[0.08] border border-accent/[0.15] hover:bg-accent hover:text-white hover:border-accent text-accent text-[12px] font-semibold py-2.5 transition-all duration-200 flex items-center justify-center gap-1.5">
                      <Send className="h-3.5 w-3.5" /> Send Brief
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   FOR CREATORS / FOR BRANDS — Side by side value props
═══════════════════════════════════════════════════════ */
function DualAudienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="brands" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary">
            Built for both sides of every deal
          </h2>
          <p className="mt-4 text-[16px] text-text-secondary max-w-md mx-auto">
            SYNQ solves real problems on both sides — not just for one.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Creators */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-surface border border-accent/10 p-8"
          >
            <div className="h-11 w-11 rounded-xl bg-accent/[0.08] flex items-center justify-center mb-6">
              <Camera className="h-5 w-5 text-accent" />
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-accent/[0.06] border border-accent/[0.10] px-3 py-1 text-[11px] font-semibold text-accent mb-4">
              Free forever
            </div>
            <h3 className="text-[22px] font-bold text-text-primary mb-2">For Creators</h3>
            <p className="text-[14px] text-text-secondary mb-6 leading-relaxed">
              Stop chasing payments and managing 10 different DMs. Your work, your rates, your terms — protected.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                ["Escrow payments", "Never chase an invoice again — funds auto-release on approval"],
                ["Decision signals", "See brand reliability score before accepting any deal"],
                ["Structured feedback", "Revisions tracked in one place, not buried in DMs"],
                ["Actionable analytics", "Engagement benchmarks, save rates, content format performance"],
                ["Dispute resolution", "Raise an issue — platform mediates within 24h"],
              ].map(([title, desc]) => (
                <li key={title} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[13px] font-medium text-text-primary">{title} — </span>
                    <span className="text-[13px] text-text-secondary">{desc}</span>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/register?role=CREATOR">
              <Button className="w-full gap-2 glow-accent h-11">
                Join as Creator <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Brands */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="rounded-2xl bg-surface border border-[#00B8D9]/10 p-8"
          >
            <div className="h-11 w-11 rounded-xl bg-[#00B8D9]/[0.08] flex items-center justify-center mb-6">
              <Briefcase className="h-5 w-5 text-[#00B8D9]" />
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#00B8D9]/[0.06] border border-[#00B8D9]/[0.10] px-3 py-1 text-[11px] font-semibold text-[#00B8D9] mb-4">
              14-day free trial
            </div>
            <h3 className="text-[22px] font-bold text-text-primary mb-2">For Brands</h3>
            <p className="text-[14px] text-text-secondary mb-6 leading-relaxed">
              Find creators who actually fit your audience. Run structured campaigns. Measure real ROI.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                ["AI creator matching", "92% accuracy — scored on audience overlap, not just follower count"],
                ["Campaign builder", "Deliverables, timelines, budget, and revision limits in one place"],
                ["Creator comparison", "Reliability scores, response time, repeat collab rate side by side"],
                ["Structured feedback", "Comments attached to the right deliverable, not lost in chat"],
                ["ROI analytics", "Cost-per-engagement vs category benchmarks with AI recommendations"],
              ].map(([title, desc]) => (
                <li key={title} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[13px] font-medium text-text-primary">{title} — </span>
                    <span className="text-[13px] text-text-secondary">{desc}</span>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/register?role=BUSINESS">
              <Button variant="outline" className="w-full gap-2 h-11 border-[#00B8D9]/25 hover:border-[#00B8D9]/50 hover:text-[#00B8D9]">
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SOCIAL PROOF — Specific outcomes
═══════════════════════════════════════════════════════ */
const testimonials = [
  {
    quote: "Before SYNQ, I spent 2 hours chasing a brand for a revision buried in their DMs. Now my entire collab — scope, feedback, payment — is in one place. Got paid within 24h of approval.",
    author: "Priya Sharma",
    role: "Fashion Creator · 2.1L followers · Mumbai",
    outcome: "₹54,000 earned — zero invoice chasing",
    avatar: creators[0].avatar,
  },
  {
    quote: "We ran 12 influencer campaigns last quarter. SYNQ's analytics showed Reels had 2.4× better save rates than Stories. We doubled down and hit our GMV target 3 weeks early.",
    author: "Rahul Mehta",
    role: "Brand Manager · Bloom Skincare",
    outcome: "3× faster campaign delivery",
    avatar: creators[1].avatar,
  },
  {
    quote: "A brand tried to change scope mid-project. I pointed to the signed contract on SYNQ. Dispute settled in 48 hours. I got paid in full. Never going back to DM-based deals.",
    author: "Sneha Rao",
    role: "Fitness Creator · Hyderabad",
    outcome: "Dispute resolved in 48h, full payment received",
    avatar: creators[2].avatar,
  },
];

function SocialProofSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 bg-surface-elevated/20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <p className="text-[12px] font-semibold text-accent uppercase tracking-widest mb-3">Real results</p>
          <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary">
            What creators and brands say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="rounded-2xl bg-surface border border-border/50 p-6 flex flex-col gap-4 hover:shadow-md transition-all duration-300"
            >
              <div className="flex gap-0.5">
                {[0,1,2,3,4].map(j => <Star key={j} className="h-3.5 w-3.5 fill-warning text-warning" />)}
              </div>
              <p className="text-[13px] text-text-secondary leading-[1.75] flex-1">&ldquo;{t.quote}&rdquo;</p>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-success/[0.07] border border-success/[0.12] px-3 py-1 text-[11px] font-medium text-success w-fit">
                <TrendingUp className="h-3 w-3" /> {t.outcome}
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-border/40">
                <img src={t.avatar} alt={t.author} className="h-9 w-9 rounded-full object-cover" />
                <div>
                  <p className="text-[12px] font-semibold text-text-primary">{t.author}</p>
                  <p className="text-[11px] text-text-secondary">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   PRICING
═══════════════════════════════════════════════════════ */
function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="pricing" className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <p className="text-[12px] font-semibold text-accent uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary">
            Free for creators. Powerful for brands.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45 }}
            className="rounded-2xl bg-surface border border-border/50 p-8"
          >
            <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-widest mb-4">For Creators</p>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-[44px] font-bold text-text-primary">Free</span>
              <span className="text-text-secondary">forever</span>
            </div>
            <ul className="space-y-3 mb-8">
              {["Unlimited brand collaborations","Scope contracts & e-signature","Escrow-protected payments","Dispute resolution","Performance analytics","Verified creator badge"].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-[13px] text-text-secondary">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <Link href="/register?role=CREATOR">
              <Button variant="outline" className="w-full h-11 text-[14px]">Get Started Free</Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 14 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="rounded-2xl bg-surface border-2 border-accent/25 p-8 relative"
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-[#00B8D9] px-4 py-1 text-[11px] font-semibold text-white whitespace-nowrap">
              Most Popular
            </div>
            <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-widest mb-4">For Brands</p>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-[44px] font-bold text-text-primary">₹3,999</span>
              <span className="text-text-secondary">/month</span>
            </div>
            <p className="text-[12px] text-text-secondary mb-6">14-day free trial · No credit card required</p>
            <ul className="space-y-3 mb-8">
              {["Everything in Creator","AI creator matching (92% accuracy)","Campaign builder & management","Advanced ROI analytics & benchmarks","Creator comparison & reliability scores","Priority support & onboarding"].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-[13px] text-text-secondary">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <Link href="/register?role=BUSINESS">
              <Button className="w-full h-11 text-[14px] glow-accent gap-2">
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   FINAL CTA
═══════════════════════════════════════════════════════ */
function FinalCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="rounded-3xl overflow-hidden relative"
          style={{ background: "linear-gradient(135deg, #6C5CE7 0%, #00B8D9 100%)" }}
        >
          <div className="absolute inset-0 dot-grid opacity-[0.07] pointer-events-none" />
          <div className="relative px-10 py-16 text-center">
            <h2 className="text-[36px] sm:text-[48px] font-bold text-white tracking-tight leading-[1.1] mb-4">
              Stop managing collabs in DMs.
              <br />Start using SYNQ.
            </h2>
            <p className="text-white/70 text-[16px] mb-10 max-w-sm mx-auto">
              Join 850+ creators and brands already running structured campaigns on SYNQ.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/register?role=CREATOR">
                <Button size="lg" className="bg-white text-accent hover:bg-white/90 gap-2 text-[15px] h-12 px-8 font-semibold shadow-lg">
                  <Camera className="h-4 w-4" /> Join as Creator
                </Button>
              </Link>
              <Link href="/register?role=BUSINESS">
                <Button size="lg" variant="ghost" className="text-white/85 hover:text-white hover:bg-white/10 gap-2 text-[15px] h-12 border border-white/20">
                  <Briefcase className="h-4 w-4" /> Find Creators
                </Button>
              </Link>
            </div>
            <p className="text-white/40 text-[12px] mt-6">Free for creators · 14-day trial for brands · No credit card</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════ */
function Footer() {
  const { theme } = useTheme();
  return (
    <footer className="border-t border-border/40 bg-surface-elevated/10">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Image
              src={theme === "dark" ? "/synq logo night mode.png" : "/synq logo light mode.png"}
              alt="SYNQ" width={80} height={26}
              className="h-6 w-auto object-contain mb-3"
            />
            <p className="text-[12px] text-text-secondary leading-relaxed max-w-[180px]">
              Structured brand-creator collaborations. Built for India.
            </p>
          </div>
          {[
            { title: "Platform", links: [["How it works","#how-it-works"],["For Creators","#creators"],["For Brands","#brands"],["Pricing","#pricing"]] },
            { title: "Join", links: [["I'm a Creator","/register?role=CREATOR"],["I'm a Brand","/register?role=BUSINESS"],["Sign in","/login"]] },
            { title: "Legal", links: [["Privacy","#"],["Terms","#"],["Security","#"]] },
          ].map(col => (
            <div key={col.title}>
              <p className="text-[12px] font-semibold text-text-primary mb-3">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-[12px] text-text-secondary hover:text-text-primary transition-colors">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 border-t border-border/30">
          <p className="text-[11px] text-text-secondary">© 2025 SYNQ. All rights reserved.</p>
          <p className="text-[11px] text-text-secondary">Made for the Indian creator economy 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE ENTRY
═══════════════════════════════════════════════════════ */
export default function LandingPage() {
  return (
    <main className="bg-background text-text-primary min-h-screen">
      <Navbar />
      <HeroSection />
      <TrustBar />
      <HowItWorksSection />
      <CreatorSection />
      <DualAudienceSection />
      <SocialProofSection />
      <PricingSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
