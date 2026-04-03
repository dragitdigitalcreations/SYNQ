"use client";

import Link from "next/link";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, Moon, Sun, Star, CheckCircle2,
  Search, Zap, Shield, TrendingUp,
  IndianRupee, Clock, BadgeCheck, ChevronRight, UserPlus,
  SlidersHorizontal, Handshake, BarChart3, Lock, FileText,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { useRef, useState, useEffect } from "react";

/* ─── Count-up hook ─── */
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

/* ─── Scroll parallax wrapper ─── */
function ParallaxY({ children, offset = 30, className }: { children: React.ReactNode; offset?: number; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return <motion.div ref={ref} style={{ y }} className={className}>{children}</motion.div>;
}

/* ─── Fade-up preset ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

/* ─── Creator mock data ─── */
const creators = [
  {
    name: "Priya Sharma",
    role: "UI/UX Designer",
    location: "Mumbai",
    tags: ["Figma", "Branding", "Motion"],
    rate: "₹1,200/hr",
    rating: 4.9,
    projects: 38,
    available: true,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format&q=80",
    cover: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=200&fit=crop&auto=format&q=80",
  },
  {
    name: "Arjun Mehta",
    role: "Full-Stack Developer",
    location: "Bangalore",
    tags: ["React", "Node.js", "AWS"],
    rate: "₹1,800/hr",
    rating: 4.8,
    projects: 52,
    available: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format&q=80",
    cover: "https://images.unsplash.com/photo-1550439062-609e1531270e?w=400&h=200&fit=crop&auto=format&q=80",
  },
  {
    name: "Sneha Rao",
    role: "Video Editor",
    location: "Hyderabad",
    tags: ["Premiere Pro", "After Effects", "Reels"],
    rate: "₹900/hr",
    rating: 5.0,
    projects: 24,
    available: false,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format&q=80",
    cover: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=200&fit=crop&auto=format&q=80",
  },
  {
    name: "Rohan Gupta",
    role: "Content Writer",
    location: "Delhi NCR",
    tags: ["SEO", "Copywriting", "Strategy"],
    rate: "₹600/hr",
    rating: 4.7,
    projects: 61,
    available: true,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&auto=format&q=80",
    cover: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=200&fit=crop&auto=format&q=80",
  },
];

/* ─── Skill tag chip ─── */
function Chip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-accent/[0.08] border border-accent/[0.12] px-2.5 py-0.5 text-[11px] font-medium text-accent">
      {label}
    </span>
  );
}

/* ─── Creator card ─── */
function CreatorCard({ creator, index }: { creator: typeof creators[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      className="rounded-2xl bg-surface border border-border/50 overflow-hidden hover:border-accent/25 hover:shadow-lg transition-all duration-300 group"
    >
      {/* Cover */}
      <div className="relative h-24 overflow-hidden">
        <img src={creator.cover} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
        {creator.available ? (
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full bg-success/15 border border-success/25 px-2 py-0.5">
            <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            <span className="text-[10px] font-medium text-success">Available</span>
          </div>
        ) : (
          <div className="absolute top-2.5 right-2.5 rounded-full bg-surface-elevated/80 border border-border/50 px-2 py-0.5">
            <span className="text-[10px] font-medium text-text-secondary">Busy</span>
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Avatar + name */}
        <div className="flex items-center gap-3 -mt-8 mb-3">
          <img src={creator.avatar} alt={creator.name} className="h-12 w-12 rounded-xl border-2 border-surface object-cover shadow-md" />
          <div className="pt-5">
            <p className="text-[13px] font-semibold text-text-primary leading-tight">{creator.name}</p>
            <p className="text-[11px] text-text-secondary">{creator.role} · {creator.location}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {creator.tags.map(t => <Chip key={t} label={t} />)}
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3 text-[11px] text-text-secondary mb-4">
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-warning text-warning" /> {creator.rating}
          </span>
          <span className="text-border">·</span>
          <span>{creator.projects} projects</span>
          <span className="text-border">·</span>
          <span className="font-medium text-text-primary">{creator.rate}</span>
        </div>

        {/* CTA */}
        <button className="w-full rounded-xl bg-accent/[0.08] border border-accent/[0.15] hover:bg-accent hover:text-white text-accent text-[12px] font-semibold py-2.5 transition-all duration-200 flex items-center justify-center gap-1.5">
          <UserPlus className="h-3.5 w-3.5" /> Connect
        </button>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════ */
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
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-surface-glass backdrop-blur-xl border-b border-border/40 shadow-sm" : "bg-transparent"
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
          {[["How it works", "#how-it-works"], ["Creators", "#creators"], ["Pricing", "#pricing"]].map(([label, href]) => (
            <a key={label} href={href} className="hover:text-text-primary transition-colors">{label}</a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2.5">
          <button onClick={toggleTheme} className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-all">
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

/* ═══════════════════════════════════════════════════════════
   HERO — Split layout, product UI right side
═══════════════════════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden">
      {/* Background depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.05] via-transparent to-[#00B8D9]/[0.03]" />
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-accent/[0.06] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#00B8D9]/[0.05] blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: Copy ── */}
          <div>
            <motion.div {...fadeUp(0)}>
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/[0.08] border border-accent/[0.15] px-3.5 py-1.5 text-[12px] font-medium text-accent mb-8">
                <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                850+ creators on the platform
              </div>
            </motion.div>

            <motion.h1
              {...fadeUp(0.06)}
              className="text-[48px] sm:text-[60px] lg:text-[64px] font-bold tracking-[-0.03em] leading-[1.04] text-text-primary"
            >
              Find the right{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-accent to-[#00B8D9] bg-clip-text text-transparent">
                  creators
                </span>
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="6" viewBox="0 0 200 6" fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
                >
                  <motion.path d="M0 4 Q50 0 100 3 Q150 6 200 2" stroke="url(#underlineGrad)" strokeWidth="2.5" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="underlineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6C5CE7" />
                      <stop offset="100%" stopColor="#00B8D9" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
              <br />to build your next project
            </motion.h1>

            <motion.p
              {...fadeUp(0.14)}
              className="mt-7 text-[17px] text-text-secondary leading-[1.75] max-w-[440px]"
            >
              Connect with designers, developers, and editors ready to collaborate —
              with structured workspaces, scope contracts, and escrow payments built in.
            </motion.p>

            <motion.div {...fadeUp(0.22)} className="flex flex-col sm:flex-row items-start gap-3 mt-10">
              <Link href="/register">
                <Button size="lg" className="glow-accent gap-2 text-[15px] h-12 px-7 font-semibold">
                  Start Collaborating <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#creators">
                <Button variant="outline" size="lg" className="gap-2 text-[15px] h-12 px-6">
                  <Search className="h-4 w-4" /> Explore Creators
                </Button>
              </Link>
            </motion.div>

            <motion.p {...fadeUp(0.3)} className="mt-5 text-[12px] text-text-secondary/60 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-success" />
              No spam. Just real creators ready to build.
            </motion.p>
          </div>

          {/* ── Right: Product UI preview ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.18 }}
            className="relative"
          >
            {/* Main card: active collab */}
            <div className="rounded-2xl bg-surface border border-border/50 shadow-2xl overflow-hidden">
              {/* Window bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40 bg-surface-elevated/40">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-error/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-warning/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-success/50" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="rounded-lg bg-surface-elevated/60 border border-border/30 px-3 py-1 text-[10px] text-text-secondary font-medium">
                    synq.app/discover
                  </div>
                </div>
              </div>

              {/* Search bar */}
              <div className="px-4 pt-4 pb-3">
                <div className="flex items-center gap-2 rounded-xl bg-surface-elevated border border-border/40 px-3 py-2.5">
                  <Search className="h-3.5 w-3.5 text-text-secondary" />
                  <span className="text-[12px] text-text-secondary">Search by skill, role, or project type…</span>
                  <div className="ml-auto flex items-center gap-1.5">
                    <div className="rounded-md bg-accent/10 border border-accent/20 px-2 py-0.5 text-[10px] font-medium text-accent">UI/UX</div>
                    <div className="rounded-md bg-surface border border-border/40 px-2 py-0.5 text-[10px] text-text-secondary">React</div>
                  </div>
                </div>
              </div>

              {/* Creator list — 3 items */}
              <div className="px-4 pb-4 space-y-2.5">
                {[
                  { name: "Priya Sharma", role: "UI/UX Designer", tags: ["Figma", "Branding"], score: 98, available: true, avatar: creators[0].avatar },
                  { name: "Arjun Mehta", role: "Full-Stack Developer", tags: ["React", "Node.js"], score: 94, available: true, avatar: creators[1].avatar },
                  { name: "Sneha Rao", role: "Video Editor", tags: ["Premiere Pro", "Reels"], score: 89, available: false, avatar: creators[2].avatar },
                ].map((c, i) => (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, x: 12 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.35 + i * 0.1 }}
                    className="flex items-center gap-3 rounded-xl bg-surface-elevated/50 border border-border/30 px-3 py-2.5 hover:border-accent/20 transition-colors"
                  >
                    <img src={c.avatar} alt="" className="h-9 w-9 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-[12px] font-semibold text-text-primary truncate">{c.name}</p>
                        {c.available && <div className="h-1.5 w-1.5 rounded-full bg-success shrink-0" />}
                      </div>
                      <p className="text-[10px] text-text-secondary truncate">{c.role}</p>
                      <div className="flex gap-1 mt-1">
                        {c.tags.map(t => (
                          <span key={t} className="rounded-full bg-accent/[0.07] px-2 py-0.5 text-[9px] font-medium text-accent">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <div className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">{c.score}%</div>
                      <button className="rounded-lg bg-accent text-white text-[10px] font-semibold px-2.5 py-1 hover:bg-accent-hover transition-colors">
                        Connect
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom bar */}
              <div className="border-t border-border/40 px-4 py-2.5 flex items-center justify-between bg-surface-elevated/20">
                <span className="text-[10px] text-text-secondary">Showing 3 of 850+ creators</span>
                <button className="text-[10px] font-medium text-accent flex items-center gap-1 hover:underline">
                  View all <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Floating: active collab toast */}
            <motion.div
              initial={{ opacity: 0, y: 12, x: 12 }}
              animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -bottom-5 -left-5 rounded-xl bg-surface border border-border/50 shadow-xl px-3.5 py-2.5 hidden sm:block"
            >
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent to-[#00B8D9] flex items-center justify-center shrink-0">
                  <Handshake className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-text-primary">New collab started</p>
                  <p className="text-[10px] text-text-secondary">Priya × Arjun — Brand Redesign</p>
                </div>
                <div className="h-2 w-2 rounded-full bg-success ml-1 animate-pulse" />
              </div>
            </motion.div>

            {/* Floating: payment released */}
            <motion.div
              initial={{ opacity: 0, y: -12, x: -12 }}
              animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="absolute -top-4 -right-4 rounded-xl bg-surface border border-border/50 shadow-xl px-3.5 py-2.5 hidden sm:block"
            >
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-success/10 flex items-center justify-center">
                  <IndianRupee className="h-3.5 w-3.5 text-success" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-success">₹24,000 released</p>
                  <p className="text-[10px] text-text-secondary">Milestone approved ✓</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   TRUST BAR
═══════════════════════════════════════════════════════════ */
function TrustBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const c1 = useCountUp(850, isInView);
  const c2 = useCountUp(2400, isInView);
  const c3 = useCountUp(98, isInView);
  const c4 = useCountUp(48, isInView);

  const stats = [
    { value: `${c1}+`, label: "Verified creators" },
    { value: `${c2.toLocaleString()}+`, label: "Collabs completed" },
    { value: `${c3}%`, label: "On-time payment rate" },
    { value: `${c4}h`, label: "Avg first response" },
  ];

  return (
    <div ref={ref} className="border-y border-border/40 bg-surface-elevated/20">
      <div className="max-w-6xl mx-auto px-6 py-7">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 divide-x-0 md:divide-x divide-border/30">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07 }}
              className="flex flex-col items-center md:items-start px-4 first:pl-0"
            >
              <div className="text-[28px] font-bold text-text-primary tracking-tight">{s.value}</div>
              <div className="text-[12px] text-text-secondary mt-0.5">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HOW IT WORKS — 3 steps
═══════════════════════════════════════════════════════════ */
function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const steps = [
    {
      icon: UserPlus,
      step: "01",
      title: "Create your profile",
      description: "Set your skills, rate, availability, and portfolio. Tell the world what you build and how you work.",
    },
    {
      icon: SlidersHorizontal,
      step: "02",
      title: "Discover creators",
      description: "Search by skill, role, or project type. Filter by availability, rating, and location. Every profile shows real work.",
    },
    {
      icon: Handshake,
      step: "03",
      title: "Start collaborating",
      description: "Send a collab invite, agree on scope and terms, then work together in a dedicated structured workspace.",
    },
  ];

  return (
    <section ref={ref} id="how-it-works" className="py-24 relative">
      {/* subtle dot grid */}
      <div className="absolute inset-0 dot-grid opacity-[0.025] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-[12px] font-semibold text-accent uppercase tracking-widest mb-3">How it works</p>
          <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary">
            From profile to collab in 3 steps
          </h2>
          <p className="mt-4 text-[16px] text-text-secondary max-w-md mx-auto leading-relaxed">
            No confusing flows. Just a clear path from finding the right person to building together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* connector line — desktop */}
          <div className="absolute top-10 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-transparent via-border to-transparent hidden md:block" />

          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.45 }}
              className="relative flex flex-col items-center md:items-start text-center md:text-left p-6 rounded-2xl bg-surface border border-border/50 hover:border-accent/20 hover:shadow-md transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-xl bg-accent/[0.08] border border-accent/[0.12] flex items-center justify-center mb-5 relative z-10">
                <s.icon className="h-5 w-5 text-accent" />
              </div>
              <div className="absolute top-4 right-4 text-[11px] font-bold text-text-secondary/25 font-mono">{s.step}</div>
              <h3 className="text-[16px] font-semibold text-text-primary mb-2">{s.title}</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link href="/register">
            <Button size="lg" className="glow-accent gap-2 h-12 px-8 text-[15px]">
              Start for Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FEATURES — 4 real use cases
═══════════════════════════════════════════════════════════ */
function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const features = [
    {
      icon: SlidersHorizontal,
      title: "Skill-based discovery",
      description:
        "Filter by role, skill, location, and availability. SYNQ matches you with creators who fit your project — not just whoever's popular.",
      detail: "Search: UI/UX · React · Video · Copywriting · 50+ skills",
    },
    {
      icon: FileText,
      title: "Scope contracts, built in",
      description:
        "Define deliverables, revision limits, timelines, and payment milestones before work starts. Both parties sign digitally — no PDFs, no ambiguity.",
      detail: "Deliverables · Revisions · Timeline · Payment milestones",
    },
    {
      icon: Lock,
      title: "Escrow-protected payments",
      description:
        "Funds are locked in escrow when the project starts and released when milestones are approved. Creators never chase invoices again.",
      detail: "₹0 unpaid invoices on SYNQ",
    },
    {
      icon: BarChart3,
      title: "Real project analytics",
      description:
        "Track delivery speed, revision counts, and project health. Not vanity metrics — actual signals that help you improve and pick better collaborators.",
      detail: "Delivery rate · Response time · Revision efficiency",
    },
  ];

  return (
    <section ref={ref} id="features" className="py-24 bg-surface-elevated/20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-[12px] font-semibold text-accent uppercase tracking-widest mb-3">Built for real work</p>
          <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary">
            Everything a collab actually needs
          </h2>
          <p className="mt-4 text-[16px] text-text-secondary max-w-md mx-auto">
            Not a list of buzzwords. Features that solve the exact problems creators and brands face every day.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.09, duration: 0.45 }}
              className="rounded-2xl bg-surface border border-border/50 p-6 hover:border-accent/20 hover:shadow-md transition-all duration-300 group flex gap-4"
            >
              <div className="h-10 w-10 rounded-xl bg-accent/[0.08] border border-accent/[0.10] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-accent/[0.14] transition-colors">
                <f.icon className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-text-primary mb-1.5">{f.title}</h3>
                <p className="text-[13px] text-text-secondary leading-relaxed mb-3">{f.description}</p>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-accent/[0.07] border border-accent/[0.10] px-3 py-1 text-[11px] font-medium text-accent">
                  <Zap className="h-3 w-3" /> {f.detail}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   CREATOR PREVIEW — Real platform feel
═══════════════════════════════════════════════════════════ */
function CreatorPreviewSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Design", "Development", "Video", "Writing"];
  const roleMap: Record<string, string> = { Design: "Designer", Development: "Developer", Video: "Editor", Writing: "Writer" };
  const filtered = activeFilter === "All"
    ? creators
    : creators.filter(c => c.role.toLowerCase().includes(roleMap[activeFilter]?.toLowerCase() ?? activeFilter.toLowerCase()));

  return (
    <section ref={ref} id="creators" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <p className="text-[12px] font-semibold text-accent uppercase tracking-widest mb-3">Meet the creators</p>
            <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary">
              Real people, real work
            </h2>
            <p className="mt-3 text-[15px] text-text-secondary max-w-md">
              Every creator on SYNQ has a verified profile, a rate card, and a track record.
            </p>
          </div>
          <Link href="/register?role=CREATOR">
            <Button variant="outline" className="gap-2 shrink-0">
              Browse all creators <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 mb-8 flex-wrap"
        >
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                activeFilter === f
                  ? "bg-accent text-white shadow-sm"
                  : "bg-surface border border-border/50 text-text-secondary hover:border-accent/25 hover:text-text-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <AnimatePresence mode="wait">
            {(filtered.length > 0 ? filtered : creators).map((c, i) => (
              <CreatorCard key={c.name} creator={c} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SOCIAL PROOF — Testimonials + trust signals
═══════════════════════════════════════════════════════════ */
const testimonials = [
  {
    quote: "Found a developer on SYNQ in 20 minutes. Scope contract was signed same day. The escrow payment meant I never worried about getting paid.",
    author: "Priya Sharma",
    role: "UI/UX Designer · Mumbai",
    avatar: creators[0].avatar,
    outcome: "3× faster than freelance platforms",
  },
  {
    quote: "We ran a full brand refresh with a team of 3 creators we found here. Everything — brief, revisions, feedback — was in one workspace. Zero Slack chaos.",
    author: "Rahul Mehta",
    role: "Founder · Bloom Studio",
    avatar: creators[1].avatar,
    outcome: "Brand refresh delivered in 18 days",
  },
  {
    quote: "The scope contract saved me from a nightmare scope creep situation. I pointed to the signed doc. Done. Dispute resolved in 24 hours.",
    author: "Sneha Rao",
    role: "Video Editor · Hyderabad",
    avatar: creators[2].avatar,
    outcome: "Dispute resolved without losing payment",
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
          className="text-center mb-16"
        >
          <p className="text-[12px] font-semibold text-accent uppercase tracking-widest mb-3">Creators love it</p>
          <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary">
            Real results, not testimonials
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="rounded-2xl bg-surface border border-border/50 p-6 flex flex-col gap-4 hover:border-accent/15 hover:shadow-md transition-all duration-300"
            >
              <div className="flex gap-0.5 mb-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-warning text-warning" />
                ))}
              </div>
              <p className="text-[13px] text-text-secondary leading-[1.75] flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
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

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: Shield, text: "Escrow-protected payments" },
            { icon: BadgeCheck, text: "Verified creator profiles" },
            { icon: Clock, text: "Avg 48h first response" },
            { icon: Lock, text: "Signed scope contracts" },
          ].map((s, i) => (
            <div key={s.text} className="flex items-center gap-2.5 rounded-xl bg-surface border border-border/40 px-4 py-3">
              <s.icon className="h-4 w-4 text-accent shrink-0" />
              <p className="text-[12px] text-text-secondary leading-tight">{s.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   PRICING
═══════════════════════════════════════════════════════════ */
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
          <p className="mt-4 text-[16px] text-text-secondary">No hidden fees. No lock-in.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Creator */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45 }}
            className="rounded-2xl bg-surface border border-border/50 p-8"
          >
            <p className="text-[12px] font-semibold text-text-secondary uppercase tracking-widest mb-4">For Creators</p>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-[42px] font-bold text-text-primary">Free</span>
              <span className="text-text-secondary text-[15px]">forever</span>
            </div>
            <ul className="space-y-3 mb-8">
              {["Verified creator profile","Unlimited collaboration requests","Scope contracts & e-signature","Escrow-protected payments","Dispute resolution","Project analytics"].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-[13px] text-text-secondary">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <Link href="/register?role=CREATOR">
              <Button variant="outline" className="w-full h-11 text-[14px]">Get Started Free</Button>
            </Link>
          </motion.div>

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="rounded-2xl bg-surface border-2 border-accent/30 p-8 relative"
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-[#00B8D9] px-4 py-1 text-[11px] font-semibold text-white whitespace-nowrap">
              Most Popular
            </div>
            <p className="text-[12px] font-semibold text-text-secondary uppercase tracking-widest mb-4">For Brands</p>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-[42px] font-bold text-text-primary">₹3,999</span>
              <span className="text-text-secondary text-[15px]">/month</span>
            </div>
            <p className="text-[12px] text-text-secondary mb-6">14-day free trial · No credit card required</p>
            <ul className="space-y-3 mb-8">
              {["Everything in Creator","AI creator matching (92% accuracy)","Campaign builder & management","Advanced ROI analytics","Creator comparison reports","Priority support"].map(f => (
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

/* ═══════════════════════════════════════════════════════════
   FINAL CTA
═══════════════════════════════════════════════════════════ */
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
          {/* Subtle texture */}
          <div className="absolute inset-0 dot-grid opacity-[0.08] pointer-events-none" />

          <div className="relative px-10 py-16 text-center">
            <h2 className="text-[36px] sm:text-[48px] font-bold text-white tracking-tight leading-[1.1] mb-4">
              Stop searching.
              <br />Start collaborating.
            </h2>
            <p className="text-white/70 text-[16px] mb-10 max-w-sm mx-auto">
              Join 850+ creators and brands already building together on SYNQ.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/register">
                <Button size="lg" className="bg-white text-accent hover:bg-white/90 gap-2 text-[15px] h-12 px-8 font-semibold shadow-xl">
                  Join SYNQ today <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="ghost" size="lg" className="text-white/80 hover:text-white hover:bg-white/10 text-[15px] h-12">
                  Sign in
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

/* ═══════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════ */
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
              Structured creator collaborations. Built for India.
            </p>
          </div>
          {[
            { title: "Platform", links: [["How it works", "#how-it-works"], ["Creators", "#creators"], ["Pricing", "#pricing"]] },
            { title: "Join", links: [["I'm a Creator", "/register?role=CREATOR"], ["I'm a Brand", "/register?role=BUSINESS"], ["Sign in", "/login"]] },
            { title: "Legal", links: [["Privacy", "#"], ["Terms", "#"], ["Security", "#"]] },
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

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
export default function LandingPage() {
  return (
    <main className="bg-background text-text-primary min-h-screen">
      <Navbar />
      <HeroSection />
      <TrustBar />
      <HowItWorksSection />
      <FeaturesSection />
      <CreatorPreviewSection />
      <SocialProofSection />
      <PricingSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}

