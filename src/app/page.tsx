"use client";

import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Moon, Sun, Star, CheckCircle2, Shield,
  TrendingUp, IndianRupee, Lock, ChevronRight,
  MessageSquare, FileText, CreditCard, Flag, Camera, Send,
  Briefcase, Zap, CheckCheck, RefreshCw, Circle,
  XCircle, AlertTriangle, Sparkles, BarChart3,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { useRef, useState, useEffect } from "react";

/* ─── Count-up animation ─── */
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

/* ─── Fade-up preset ─── */
const fu = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

/* ─── Unsplash helper ─── */
const img = (id: string, w = 300, h = 300) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

/* ─── Creator profiles ─── */
const creators = [
  {
    name: "Priya Sharma", handle: "@priyacreates", niche: "Fashion & Lifestyle",
    location: "Mumbai", followers: "2.1L", engagement: "4.8%", reel: "₹12,000",
    story: "₹4,500", rating: 4.9, collabs: 38, available: true,
    platforms: ["Instagram", "YouTube"],
    avatar: img("1494790108377-be9c29b29330", 120, 120),
    portfolio: img("1611162617474-5b21e879e113", 400, 300),
    tags: ["Fashion", "Beauty", "Lifestyle"],
  },
  {
    name: "Marcus Chen", handle: "@marcustech", niche: "Tech & Gadgets",
    location: "Bangalore", followers: "3.4L", engagement: "5.2%", reel: "₹18,000",
    story: "₹6,000", rating: 4.8, collabs: 52, available: true,
    platforms: ["YouTube", "Instagram"],
    avatar: img("1507003211169-0a1dd7228f2d", 120, 120),
    portfolio: img("1550439062-609e1531270e", 400, 300),
    tags: ["Tech", "Unboxing", "Reviews"],
  },
  {
    name: "Sneha Rao", handle: "@snehafit", niche: "Fitness & Wellness",
    location: "Hyderabad", followers: "85K", engagement: "7.1%", reel: "₹8,000",
    story: "₹3,000", rating: 5.0, collabs: 24, available: false,
    platforms: ["Instagram"],
    avatar: img("1534528741775-53994a69daeb", 120, 120),
    portfolio: img("1526170375885-4d8ecf77b99f", 400, 300),
    tags: ["Fitness", "Wellness", "Nutrition"],
  },
  {
    name: "Arjun Nair", handle: "@arjunwanders", niche: "Travel & Adventure",
    location: "Delhi NCR", followers: "1.2L", engagement: "6.3%", reel: "₹10,000",
    story: "₹3,500", rating: 4.7, collabs: 31, available: true,
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
            <a key={l} href={h} className="hover:text-text-primary transition-colors duration-150">{l}</a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2.5">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-all duration-150"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link href="/login" className="hidden md:block text-[13px] text-text-secondary hover:text-text-primary transition-colors px-2">
            Sign in
          </Link>
          <Link href="/register">
            <Button size="sm" className="glow-accent text-[13px] h-9 px-4 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
              Get Started <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

/* ═══════════════════════════════════════════════════════
   HERO — Crystal-clear value prop + workspace preview
═══════════════════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeTab, setActiveTab] = useState(0);

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
      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.07] via-transparent to-[#00B8D9]/[0.04]" />
        <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full bg-accent/[0.05] blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#00B8D9]/[0.04] blur-[120px]" />
        {/* Subtle grid */}
        <div className="absolute inset-0 dot-grid opacity-[0.02]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-16 w-full">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">

          {/* LEFT — Value proposition */}
          <div>
            <motion.div {...fu(0)}>
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/[0.08] border border-accent/[0.15] px-3.5 py-1.5 text-[12px] font-medium text-accent mb-8">
                <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                2,400+ brand-creator deals closed on SYNQ
              </div>
            </motion.div>

            {/* Sharp, scannable headline */}
            <motion.h1
              {...fu(0.07)}
              className="text-[46px] sm:text-[56px] lg:text-[62px] font-bold tracking-[-0.03em] leading-[1.05] text-text-primary"
            >
              Run influencer{" "}
              <br className="hidden sm:block" />
              campaigns.{" "}
              <span className="bg-gradient-to-r from-accent to-[#00B8D9] bg-clip-text text-transparent">
                Not group chats.
              </span>
            </motion.h1>

            {/* Specific, benefit-first subheadline */}
            <motion.p
              {...fu(0.15)}
              className="mt-6 text-[16px] text-text-secondary leading-[1.75] max-w-[430px]"
            >
              SYNQ gives every brand × creator deal a structured workspace — brief, contract,
              deliverables, feedback, and payments. All in one place. Not 47 DMs.
            </motion.p>

            <motion.div {...fu(0.23)} className="flex flex-col sm:flex-row items-start gap-3 mt-10">
              <Link href="/register?role=CREATOR">
                <Button size="lg" className="glow-accent gap-2 text-[15px] h-12 px-7 font-semibold hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150">
                  <Camera className="h-4 w-4" /> I&apos;m a Creator
                </Button>
              </Link>
              <Link href="/register?role=BUSINESS">
                <Button variant="outline" size="lg" className="gap-2 text-[15px] h-12 px-6 hover:border-[#00B8D9]/40 hover:text-[#00B8D9] transition-all duration-200">
                  <Briefcase className="h-4 w-4" /> I&apos;m a Brand
                </Button>
              </Link>
            </motion.div>

            <motion.div {...fu(0.31)} className="flex flex-wrap items-center gap-5 mt-8 text-[13px] text-text-secondary">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Free for creators</span>
              <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-success" /> Escrow-protected</span>
              <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-success" /> Signed contracts</span>
            </motion.div>
          </div>

          {/* RIGHT — SYNQ workspace UI */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.65 }}
            className="relative"
          >
            <div className="rounded-2xl bg-surface border border-border/50 shadow-2xl overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border/40 bg-surface-elevated/40">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-error/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-warning/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-success/50" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="flex rounded-lg bg-surface-elevated/70 p-0.5 gap-0.5">
                    {tabs.map((tab, i) => (
                      <button
                        key={tab.label}
                        onClick={() => setActiveTab(i)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-medium transition-all duration-200 ${
                          activeTab === i ? "bg-surface text-accent shadow-sm" : "text-text-secondary hover:text-text-primary"
                        }`}
                      >
                        <tab.icon className="h-3 w-3" /> {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex -space-x-1.5">
                  {[creators[0].avatar, creators[1].avatar].map((src, i) => (
                    <img key={i} src={src} alt="" className="h-5 w-5 rounded-full border-2 border-surface object-cover" />
                  ))}
                  <div className="h-5 w-5 rounded-full bg-accent/20 border-2 border-surface flex items-center justify-center text-[7px] font-bold text-accent">+2</div>
                </div>
              </div>

              <div className="flex items-center justify-between px-5 py-3 border-b border-border/30">
                <div>
                  <p className="text-[13px] font-semibold text-text-primary">Bloom Skincare × Priya Sharma</p>
                  <p className="text-[10px] text-text-secondary">Spring Glow Campaign · 14-day timeline</p>
                </div>
                <div className="rounded-full bg-success/10 border border-success/20 px-2.5 py-0.5 text-[10px] font-semibold text-success flex items-center gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> Active
                </div>
              </div>

              <div className="p-5 min-h-[280px]">
                <AnimatePresence mode="wait">
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
                              <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${d.progress}%` }} />
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-between text-[11px] mt-3 pt-2 border-t border-border/30">
                        <span className="text-text-secondary">Total campaign value</span>
                        <span className="font-bold text-accent">₹54,000</span>
                      </div>
                    </motion.div>
                  )}

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
                            <div><p className="text-[11px] font-medium text-text-primary">{t}</p><p className="text-[9px] text-text-secondary">{r}</p></div>
                            <p className="text-[11px] font-semibold text-text-primary">{p}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-3 text-[10px] text-success">
                        <Lock className="h-3 w-3" /> ₹54,000 locked in escrow on signing
                      </div>
                      <div className="flex gap-2 mt-3">
                        <div className="flex-1 rounded-lg bg-accent text-white text-[12px] font-semibold py-2.5 text-center cursor-pointer hover:bg-accent/90 transition-colors">Accept & Sign</div>
                        <div className="flex-1 rounded-lg bg-surface-elevated text-text-secondary text-[12px] py-2.5 text-center cursor-pointer hover:text-text-primary transition-colors">Negotiate</div>
                      </div>
                    </motion.div>
                  )}

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

              <div className="flex justify-center gap-1.5 pb-3">
                {tabs.map((_, i) => (
                  <button key={i} onClick={() => setActiveTab(i)} className={`h-1 rounded-full transition-all duration-300 ${activeTab === i ? "w-6 bg-accent" : "w-1.5 bg-border hover:bg-border/70"}`} />
                ))}
              </div>
            </div>

            {/* Floating toasts */}
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
   TRUST BAR — Animated counters
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
   PROBLEM SECTION — Before vs After
═══════════════════════════════════════════════════════ */
function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const chaos = [
    { icon: MessageSquare, text: "\"Did you see the brief I sent 3 days ago?\"", sub: "WhatsApp, 11:47 PM" },
    { icon: AlertTriangle, text: "Payment still pending — bank transfer, day 6", sub: "No confirmation, no receipt" },
    { icon: XCircle, text: "Brand changed scope mid-project. Nothing was written down.", sub: "Scope creep with no recourse" },
    { icon: MessageSquare, text: "\"Can you resend the final file? I lost it.\"", sub: "Google Drive, Wetransfer, Telegram" },
    { icon: AlertTriangle, text: "Revision #4. Which version was the approved one?", sub: "Feedback buried in email threads" },
  ];

  const synq = [
    { icon: CheckCheck, text: "Brief delivered. Creator accepted in 2h.", sub: "AI match score: 94%" },
    { icon: Lock, text: "₹54,000 locked in escrow on contract sign", sub: "Auto-released on approval" },
    { icon: FileText, text: "Scope locked. 3 Reels, 2 Stories, 2 revisions.", sub: "E-signed contract, immutable" },
    { icon: BarChart3, text: "All files in one workspace, versioned.", sub: "No lost assets, ever" },
    { icon: CheckCircle2, text: "Revision #2 approved. ₹12K released in 24h.", sub: "Full audit trail" },
  ];

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Dark atmospheric bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-elevated/10 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <p className="text-[12px] font-semibold text-error uppercase tracking-widest mb-3">The real problem</p>
          <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary">
            Every influencer deal has{" "}
            <span className="text-text-secondary">the same story.</span>
          </h2>
          <p className="mt-4 text-[16px] text-text-secondary max-w-lg mx-auto">
            Brands and creators lose time, money, and trust every day because
            collaborations happen across DMs, screenshots, and spreadsheets.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Before — chaos */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-error/15 bg-error/[0.03] p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="h-2 w-2 rounded-full bg-error" />
              <p className="text-[12px] font-semibold text-error uppercase tracking-wider">Without SYNQ</p>
            </div>
            <div className="space-y-3">
              {chaos.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="flex items-start gap-3 rounded-xl bg-error/[0.04] border border-error/[0.08] p-3"
                >
                  <div className="h-7 w-7 rounded-lg bg-error/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon className="h-3.5 w-3.5 text-error/70" />
                  </div>
                  <div>
                    <p className="text-[12px] font-medium text-text-primary leading-snug">{item.text}</p>
                    <p className="text-[10px] text-text-secondary mt-0.5">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* After — SYNQ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-accent/15 bg-accent/[0.03] p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <p className="text-[12px] font-semibold text-accent uppercase tracking-wider">With SYNQ</p>
            </div>
            <div className="space-y-3">
              {synq.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  className="flex items-start gap-3 rounded-xl bg-accent/[0.04] border border-accent/[0.08] p-3"
                >
                  <div className="h-7 w-7 rounded-lg bg-accent/[0.1] flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon className="h-3.5 w-3.5 text-accent" />
                  </div>
                  <div>
                    <p className="text-[12px] font-medium text-text-primary leading-snug">{item.text}</p>
                    <p className="text-[10px] text-text-secondary mt-0.5">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-8 text-[14px] text-text-secondary"
        >
          SYNQ replaces the chaos with one structured workspace — for both sides.
        </motion.p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   HOW IT WORKS — Role-toggle 3-step flow
═══════════════════════════════════════════════════════ */
function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeRole, setActiveRole] = useState<"creator" | "brand">("creator");

  const flows = {
    creator: [
      {
        n: "01", title: "Build your creator profile",
        desc: "Connect Instagram/YouTube. Set your rate card — Reels, Stories, YouTube. Define what you won't work with. Brands see everything upfront, no back-and-forth.",
        outcome: "Get 3× more qualified inbound briefs",
      },
      {
        n: "02", title: "Match with the right brands",
        desc: "AI scores every opportunity on audience overlap, content alignment, and budget fit. See the brand's reliability score (98% on-time pay) before accepting anything.",
        outcome: "94% match accuracy — no more random DMs",
      },
      {
        n: "03", title: "Deliver work, get paid automatically",
        desc: "Submit drafts in your workspace. Get structured feedback. Payment auto-releases the moment a milestone is approved. No invoice. No chasing.",
        outcome: "Average payment: within 24h of approval",
      },
    ],
    brand: [
      {
        n: "01", title: "Set up your campaign brief",
        desc: "Define your audience, deliverables (Reels × 3, Stories × 2), and budget. Brief goes live instantly. Creators who match your audience see it first.",
        outcome: "First creator response within 4h average",
      },
      {
        n: "02", title: "Find & invite verified creators",
        desc: "Browse 850+ creators. Filter by niche, engagement rate, location, and past collab count. Every creator shows their on-time delivery rate — no surprises.",
        outcome: "92% of brand-matched collabs deliver on time",
      },
      {
        n: "03", title: "Review, approve, measure ROI",
        desc: "Approve drafts with pinpoint feedback. Release milestone payments. Get analytics — save rates vs benchmarks, cost-per-engagement, and AI-powered campaign insights.",
        outcome: "2.4× better engagement vs industry average",
      },
    ],
  };

  const steps = flows[activeRole];

  return (
    <section ref={ref} id="how-it-works" className="py-24 relative">
      <div className="absolute inset-0 dot-grid opacity-[0.02] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-10">
          <p className="text-[12px] font-semibold text-accent uppercase tracking-widest mb-3">How it works</p>
          <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary">
            A clear path to your first collab
          </h2>
          <p className="mt-4 text-[15px] text-text-secondary max-w-md mx-auto">
            Pick your role. See exactly what happens next.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex rounded-xl bg-surface-elevated/60 border border-border/40 p-1 gap-1">
            <button
              onClick={() => setActiveRole("creator")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 ${activeRole === "creator" ? "bg-surface shadow text-accent border border-accent/15" : "text-text-secondary hover:text-text-primary"}`}
            >
              <Camera className="h-3.5 w-3.5" /> I&apos;m a Creator
            </button>
            <button
              onClick={() => setActiveRole("brand")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 ${activeRole === "brand" ? "bg-surface shadow text-[#00B8D9] border border-[#00B8D9]/15" : "text-text-secondary hover:text-text-primary"}`}
            >
              <Briefcase className="h-3.5 w-3.5" /> I&apos;m a Brand
            </button>
          </div>
        </motion.div>

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
                className="rounded-2xl bg-surface border border-border/50 p-6 hover:border-accent/20 hover:shadow-lg transition-all duration-300 relative group"
              >
                <div className={`h-11 w-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 ${activeRole === "creator" ? "bg-accent/[0.08] group-hover:bg-accent/[0.14]" : "bg-[#00B8D9]/[0.08] group-hover:bg-[#00B8D9]/[0.14]"}`}>
                  <span className={`text-[15px] font-bold font-mono ${activeRole === "creator" ? "text-accent" : "text-[#00B8D9]"}`}>{step.n}</span>
                </div>
                <h3 className="text-[15px] font-semibold text-text-primary mb-2 leading-snug">{step.title}</h3>
                <p className="text-[13px] text-text-secondary leading-relaxed mb-4">{step.desc}</p>
                <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${activeRole === "creator" ? "bg-accent/[0.07] text-accent" : "bg-[#00B8D9]/[0.07] text-[#00B8D9]"}`}>
                  <Zap className="h-3 w-3" /> {step.outcome}
                </div>
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
            <Button size="lg" className="glow-accent gap-2 h-12 px-8 text-[15px] hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150">
              {activeRole === "creator" ? "Join as Creator" : "Find Creators"} <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SYNQ TIMELINE — Signature component
   The ownable, memorable element that shows SYNQ's core:
   the complete lifecycle of a creator deal, live.
═══════════════════════════════════════════════════════ */
function SYNQTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  type EventStatus = "done" | "live" | "pending" | "upcoming";

  const events: {
    icon: React.ElementType;
    action: string;
    detail: string;
    badge?: string;
    badgeColor?: string;
    time: string;
    status: EventStatus;
  }[] = [
    { icon: Send, action: "Brief sent", detail: "Bloom Skincare → @priyacreates · ₹54,000 budget", badge: "AI match: 94%", badgeColor: "text-accent bg-accent/[0.08]", time: "2h ago", status: "done" },
    { icon: CheckCircle2, action: "Creator accepted", detail: "Priya Sharma reviewed & accepted the brief", badge: "Response in 1h 47m", badgeColor: "text-success bg-success/[0.08]", time: "1h 47m ago", status: "done" },
    { icon: FileText, action: "Contract signed", detail: "3 Reels · 2 Stories · 1 Photography session", badge: "₹54,000 in escrow", badgeColor: "text-[#00B8D9] bg-[#00B8D9]/[0.08]", time: "Yesterday", status: "done" },
    { icon: Camera, action: "Reel #1 submitted", detail: "@priyacreates uploaded draft for review", badge: undefined, badgeColor: undefined, time: "Today, 10:30 AM", status: "done" },
    { icon: CheckCheck, action: "Reel #1 approved · ₹12,000 released", detail: "Bloom Skincare approved — payment auto-released", badge: "Paid ✓", badgeColor: "text-success bg-success/[0.08]", time: "Today, 2:15 PM", status: "done" },
    { icon: RefreshCw, action: "Reel #2 in review", detail: "Brand feedback pending · 1 revision remaining", badge: "Live now", badgeColor: "text-warning bg-warning/[0.08]", time: "Just now", status: "live" },
    { icon: Circle, action: "Stories × 2", detail: "Awaiting creator submission · Due Apr 15", badge: undefined, badgeColor: undefined, time: "8 days left", status: "pending" },
    { icon: IndianRupee, action: "Final payout · ₹30,000", detail: "Auto-releases on final delivery approval", badge: "In escrow", badgeColor: "text-text-secondary bg-surface-elevated", time: "On completion", status: "upcoming" },
  ];

  const statusStyle: Record<EventStatus, { dot: string; line: string; card: string }> = {
    done: { dot: "bg-accent", line: "bg-accent/30", card: "border-border/30 bg-surface" },
    live: { dot: "bg-warning animate-pulse", line: "bg-warning/20", card: "border-warning/20 bg-warning/[0.02]" },
    pending: { dot: "bg-border", line: "bg-border/30", card: "border-border/20 bg-surface/50" },
    upcoming: { dot: "bg-border/50", line: "bg-transparent", card: "border-border/15 bg-surface/30" },
  };

  return (
    <section ref={ref} className="py-24 bg-surface-elevated/15 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-[0.02] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-accent/[0.04] blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">

          {/* Left — copy */}
          <div className="lg:sticky lg:top-24">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}}>
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/[0.08] border border-accent/[0.12] px-3 py-1.5 text-[11px] font-semibold text-accent mb-6">
                <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                Signature feature
              </div>
              <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary leading-[1.1] mb-5">
                Every deal.<br />
                Every step.<br />
                <span className="bg-gradient-to-r from-accent to-[#00B8D9] bg-clip-text text-transparent">
                  One place.
                </span>
              </h2>
              <p className="text-[16px] text-text-secondary leading-relaxed mb-8">
                SYNQ&apos;s collab timeline tracks every milestone from first brief to final payment.
                No more &ldquo;did you see my message?&rdquo; No more missed payments.
                The full story of every deal — for both sides.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  ["Brief to contract in under 2 hours", "average on SYNQ"],
                  ["100% of payments tracked & protected", "by escrow — always"],
                  ["Complete audit trail", "for every revision and approval"],
                ].map(([title, sub]) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded-full bg-accent/[0.1] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-3 w-3 text-accent" />
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-text-primary">{title}</p>
                      <p className="text-[11px] text-text-secondary">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/register">
                <Button size="lg" className="glow-accent gap-2 h-12 px-7 text-[15px] hover:scale-[1.02] transition-transform">
                  See it in action <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right — timeline feed */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="rounded-2xl bg-surface border border-border/50 shadow-xl overflow-hidden"
          >
            {/* Feed header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/40 bg-surface-elevated/40">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-lg bg-accent/[0.1] flex items-center justify-center">
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-text-primary">SYNQ Activity</p>
                  <p className="text-[10px] text-text-secondary">Bloom Skincare × Priya Sharma</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-success">
                <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                Live
              </div>
            </div>

            {/* Timeline events */}
            <div className="p-5 space-y-0">
              {events.map((ev, i) => {
                const s = statusStyle[ev.status];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="flex gap-3 group"
                  >
                    {/* Timeline spine */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className={`h-3 w-3 rounded-full mt-3 shrink-0 transition-all duration-300 ${s.dot} ${ev.status === "live" ? "ring-2 ring-warning/30" : ""}`} />
                      {i < events.length - 1 && (
                        <div className={`w-px flex-1 my-1 ${s.line} min-h-[16px]`} />
                      )}
                    </div>

                    {/* Event card */}
                    <div className={`flex-1 rounded-xl border p-3 mb-2 transition-all duration-200 hover:shadow-sm ${s.card} ${ev.status === "pending" || ev.status === "upcoming" ? "opacity-60" : ""}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2 min-w-0">
                          <ev.icon className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${ev.status === "done" ? "text-accent" : ev.status === "live" ? "text-warning" : "text-text-secondary"}`} />
                          <div className="min-w-0">
                            <p className={`text-[12px] font-semibold leading-snug ${ev.status === "upcoming" ? "text-text-secondary" : "text-text-primary"}`}>
                              {ev.action}
                            </p>
                            <p className="text-[10px] text-text-secondary mt-0.5 leading-snug">{ev.detail}</p>
                            {ev.badge && (
                              <span className={`inline-block mt-1.5 rounded-full px-2 py-0.5 text-[9px] font-semibold ${ev.badgeColor}`}>
                                {ev.badge}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-[9px] text-text-secondary whitespace-nowrap shrink-0 mt-0.5">{ev.time}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Feed footer — live stats */}
            <div className="border-t border-border/30 px-5 py-3 bg-surface-elevated/20">
              <div className="flex items-center justify-between text-[10px] text-text-secondary">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1"><span className="font-semibold text-text-primary">3</span> active collabs</span>
                  <span className="flex items-center gap-1"><span className="font-semibold text-success">₹12K</span> paid today</span>
                  <span className="flex items-center gap-1"><span className="font-semibold text-text-primary">4d</span> avg delivery</span>
                </div>
                <Link href="/register" className="text-accent hover:underline transition-colors">See yours →</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   CREATOR DISCOVERY — Real influencer cards with hover depth
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
              Find your perfect creator
            </h2>
            <p className="mt-3 text-[15px] text-text-secondary max-w-md">
              Every creator shows real metrics — engagement, rate card, delivery score, and AI match.
              No more gut-feel decisions.
            </p>
          </div>
          <Link href="/register?role=BUSINESS">
            <Button variant="outline" className="gap-2 shrink-0 hover:border-accent/30 hover:text-accent transition-all duration-200">
              Browse all 850+ creators <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 mb-8 flex-wrap"
        >
          {niches.map(n => <Pill key={n} label={n} active={active === n} onClick={() => setActive(n)} />)}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <AnimatePresence>
            {(filtered.length > 0 ? filtered : creators).map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="rounded-2xl bg-surface border border-border/50 overflow-hidden hover:border-accent/30 hover:shadow-xl transition-all duration-300 group cursor-pointer"
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
                  <div className="flex items-center gap-3 -mt-9 mb-3">
                    <img src={c.avatar} alt={c.name} className="h-12 w-12 rounded-xl border-2 border-surface object-cover shadow-md" />
                    <div className="pt-6">
                      <p className="text-[13px] font-semibold text-text-primary">{c.name}</p>
                      <p className="text-[10px] text-text-secondary">{c.handle}</p>
                    </div>
                  </div>

                  <p className="text-[11px] text-text-secondary mb-2">{c.niche} · {c.location}</p>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="rounded-lg bg-surface-elevated/60 p-2 text-center group-hover:bg-surface-elevated/80 transition-colors">
                      <p className="text-[13px] font-bold text-text-primary">{c.followers}</p>
                      <p className="text-[9px] text-text-secondary">followers</p>
                    </div>
                    <div className="rounded-lg bg-surface-elevated/60 p-2 text-center group-hover:bg-accent/[0.07] transition-colors">
                      <p className="text-[13px] font-bold text-accent">{c.engagement}</p>
                      <p className="text-[9px] text-text-secondary">engagement</p>
                    </div>
                  </div>

                  {/* Rate card — visible on hover */}
                  <div className="flex items-center gap-2 text-[11px] text-text-secondary mb-3">
                    <IndianRupee className="h-3 w-3 shrink-0 text-accent/60" />
                    <span>Reel <span className="font-semibold text-text-primary">{c.reel}</span></span>
                    <span className="text-border">·</span>
                    <span>Story <span className="font-semibold text-text-primary">{c.story}</span></span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-text-secondary mb-4">
                    <Star className="h-3 w-3 fill-warning text-warning" />
                    <span className="font-medium text-text-primary">{c.rating}</span>
                    <span className="text-border">·</span>
                    <span>{c.collabs} collabs · on-time</span>
                  </div>

                  <Link href="/register?role=BUSINESS">
                    <button className="w-full rounded-xl bg-accent/[0.07] border border-accent/[0.12] hover:bg-accent hover:text-white hover:border-accent hover:shadow-md text-accent text-[12px] font-semibold py-2.5 transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-[0.98]">
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
   DUAL AUDIENCE — Outcome-focused, not feature lists
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
          <p className="mt-4 text-[15px] text-text-secondary max-w-md mx-auto">
            Most platforms pick a side. SYNQ fixes the problem at the source — for creators and brands equally.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Creators */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-surface border border-accent/10 p-8 hover:border-accent/20 transition-all duration-300"
          >
            <div className="h-11 w-11 rounded-xl bg-accent/[0.08] flex items-center justify-center mb-6">
              <Camera className="h-5 w-5 text-accent" />
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-accent/[0.06] border border-accent/[0.10] px-3 py-1 text-[11px] font-semibold text-accent mb-4">
              Free forever
            </div>
            <h3 className="text-[22px] font-bold text-text-primary mb-2">For Creators</h3>
            <p className="text-[14px] text-text-secondary mb-6 leading-relaxed">
              You built your audience. You shouldn&apos;t spend 30% of your time chasing payments
              and managing chaotic brand DMs. SYNQ handles that — so you can focus on creating.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                { title: "Never chase an invoice again", desc: "Funds auto-release the moment a deliverable is approved. Average payout: 24h." },
                { title: "Know who you're working with", desc: "See brand reliability scores, response time, and past creator reviews before saying yes." },
                { title: "Protect yourself from scope creep", desc: "Everything agreed upfront. Signed digitally. Changes require mutual consent." },
                { title: "Your content. Your analytics.", desc: "Engagement benchmarks, save rates, and format performance — all in one dashboard." },
              ].map(({ title, desc }) => (
                <li key={title} className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-accent/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="h-3 w-3 text-accent" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-text-primary">{title}</p>
                    <p className="text-[12px] text-text-secondary mt-0.5">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/register?role=CREATOR">
              <Button className="w-full gap-2 glow-accent h-11 hover:scale-[1.01] active:scale-[0.99] transition-transform">
                Join as Creator <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Brands */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="rounded-2xl bg-surface border border-[#00B8D9]/10 p-8 hover:border-[#00B8D9]/20 transition-all duration-300"
          >
            <div className="h-11 w-11 rounded-xl bg-[#00B8D9]/[0.08] flex items-center justify-center mb-6">
              <Briefcase className="h-5 w-5 text-[#00B8D9]" />
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#00B8D9]/[0.06] border border-[#00B8D9]/[0.10] px-3 py-1 text-[11px] font-semibold text-[#00B8D9] mb-4">
              14-day free trial
            </div>
            <h3 className="text-[22px] font-bold text-text-primary mb-2">For Brands</h3>
            <p className="text-[14px] text-text-secondary mb-6 leading-relaxed">
              You&apos;re spending budget on influencer marketing but don&apos;t know if it&apos;s working.
              SYNQ gives you the tools to run campaigns like a product team — structured, measurable, repeatable.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                { title: "Find creators who actually fit", desc: "AI matches on audience overlap, not just follower count. 92% accuracy vs manual search." },
                { title: "Run campaigns with clarity", desc: "Deliverables, timelines, revision limits, and budget locked from day one. No surprises." },
                { title: "Know what you're getting", desc: "Creator reliability scores, on-time delivery rates, and past brand reviews — before you commit." },
                { title: "Measure real ROI", desc: "Cost-per-engagement vs category benchmarks. AI recommendations on what to do next." },
              ].map(({ title, desc }) => (
                <li key={title} className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-[#00B8D9]/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="h-3 w-3 text-[#00B8D9]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-text-primary">{title}</p>
                    <p className="text-[12px] text-text-secondary mt-0.5">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/register?role=BUSINESS">
              <Button variant="outline" className="w-full gap-2 h-11 border-[#00B8D9]/25 hover:border-[#00B8D9]/50 hover:text-[#00B8D9] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200">
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
            What they say after one deal on SYNQ
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="rounded-2xl bg-surface border border-border/50 p-6 flex flex-col gap-4 hover:shadow-md hover:border-accent/15 transition-all duration-300"
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
          <p className="mt-4 text-[15px] text-text-secondary max-w-sm mx-auto">
            We make money when brands succeed — so creators always stay free.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45 }}
            className="rounded-2xl bg-surface border border-border/50 p-8 hover:shadow-md transition-all duration-300"
          >
            <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-widest mb-4">For Creators</p>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-[44px] font-bold text-text-primary">Free</span>
              <span className="text-text-secondary">forever</span>
            </div>
            <p className="text-[13px] text-text-secondary mb-6">No credit card. No hidden fees. Ever.</p>
            <ul className="space-y-3 mb-8">
              {[
                "Unlimited brand collaborations",
                "Scope contracts & e-signature",
                "Escrow-protected payments",
                "Dispute resolution (24h)",
                "Performance analytics dashboard",
                "Verified creator badge",
              ].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-[13px] text-text-secondary">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <Link href="/register?role=CREATOR">
              <Button variant="outline" className="w-full h-11 text-[14px] hover:border-accent/30 hover:text-accent transition-all">Get Started Free</Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 14 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="rounded-2xl bg-surface border-2 border-accent/25 p-8 relative hover:shadow-lg hover:border-accent/35 transition-all duration-300"
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
              {[
                "Everything in Creator plan",
                "AI creator matching (92% accuracy)",
                "Campaign builder & management",
                "Advanced ROI analytics & benchmarks",
                "Creator comparison & reliability scores",
                "Priority support & onboarding",
              ].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-[13px] text-text-secondary">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <Link href="/register?role=BUSINESS">
              <Button className="w-full h-11 text-[14px] glow-accent gap-2 hover:scale-[1.01] active:scale-[0.99] transition-transform">
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
   FINAL CTA — High conviction close
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
          {/* Floating orbs */}
          <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-white/[0.04] blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-white/[0.04] blur-2xl pointer-events-none" />

          <div className="relative px-10 py-16 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3.5 py-1.5 text-[12px] font-medium text-white/80 mb-6">
              <Sparkles className="h-3.5 w-3.5" /> Join 850+ active creators and brands
            </div>
            <h2 className="text-[36px] sm:text-[48px] font-bold text-white tracking-tight leading-[1.1] mb-4">
              Stop managing collabs in DMs.
              <br />Start using SYNQ.
            </h2>
            <p className="text-white/70 text-[16px] mb-10 max-w-sm mx-auto">
              Your first collab is free. No credit card. Set up in under 5 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/register?role=CREATOR">
                <Button size="lg" className="bg-white text-accent hover:bg-white/90 gap-2 text-[15px] h-12 px-8 font-semibold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-transform">
                  <Camera className="h-4 w-4" /> Join as Creator
                </Button>
              </Link>
              <Link href="/register?role=BUSINESS">
                <Button size="lg" variant="ghost" className="text-white/85 hover:text-white hover:bg-white/10 gap-2 text-[15px] h-12 border border-white/20 hover:border-white/30 transition-all">
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
      <ProblemSection />
      <HowItWorksSection />
      <SYNQTimeline />
      <CreatorSection />
      <DualAudienceSection />
      <SocialProofSection />
      <PricingSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
