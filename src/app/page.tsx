"use client";

import Link from "next/link";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Moon,
  Sun,
  MessageSquare,
  BarChart3,
  FileText,
  CreditCard,
  Search,
  Star,
  CheckCircle2,
  ChevronRight,
  Lock,
  ArrowUpRight,
  Play,
  FolderOpen,
  Clock,
  TrendingUp,
  Zap,
  ChevronLeft,
  Send,
  Shield,
  Target,
  Briefcase,
  PenTool,
  Handshake,
  Award,
  IndianRupee,
  MapPin,
  Timer,
  ThumbsUp,
  Flag,
  Scale,
  Bot,
  Camera,
  Hash,
  Heart,
  Palette,
  Video,
  Clapperboard,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/components/theme-provider";
import { useRef, useState, useEffect, useCallback } from "react";

/* ─── Animated Count-Up Hook ─── */
function useCountUp(target: number, inView: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);
  return count;
}

/* ─── Morphing Gradient Blob (Hero Background) ─── */
function MorphingBlob({ className }: { className?: string }) {
  return (
    <motion.div className={className}>
      <svg viewBox="0 0 800 800" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#00B8D9" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.08" />
          </linearGradient>
          <filter id="blobBlur">
            <feGaussianBlur stdDeviation="40" />
          </filter>
        </defs>
        <motion.path
          fill="url(#blobGrad)"
          filter="url(#blobBlur)"
          animate={{
            d: [
              "M400,250 C500,200 650,250 650,400 C650,550 500,650 400,600 C300,550 150,500 150,400 C150,300 300,300 400,250Z",
              "M400,200 C550,180 700,300 680,420 C660,540 520,680 380,640 C240,600 120,480 140,360 C160,240 250,220 400,200Z",
              "M420,230 C530,190 680,280 660,430 C640,580 500,660 370,620 C240,580 130,460 160,340 C190,220 310,270 420,230Z",
              "M400,250 C500,200 650,250 650,400 C650,550 500,650 400,600 C300,550 150,500 150,400 C150,300 300,300 400,250Z",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  );
}

/* ─── SVG Wave Section Divider ─── */
function WaveDivider({ flip = false, color = "var(--accent)", opacity = 0.06 }: { flip?: boolean; color?: string; opacity?: number }) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`}>
      <svg viewBox="0 0 1440 80" className="w-full h-[60px] md:h-[80px]" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80Z"
          fill={color}
          fillOpacity={opacity}
        />
        <path
          d="M0,50 C360,10 720,70 1080,30 C1260,14 1380,40 1440,50 L1440,80 L0,80Z"
          fill={color}
          fillOpacity={opacity * 0.6}
        />
      </svg>
    </div>
  );
}

/* ─── Floating Gradient Orb ─── */
function GradientOrb({ className, color1 = "#6C5CE7", color2 = "#00B8D9", size = 400, speed = 0.3 }: { className?: string; color1?: string; color2?: string; size?: number; speed?: number }) {
  const orbRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: orbRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * -120]);
  return (
    <motion.div
      ref={orbRef}
      style={{ y, width: size, height: size }}
      className={`absolute rounded-full pointer-events-none ${className}`}
      animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="w-full h-full rounded-full blur-[80px]" style={{ background: `radial-gradient(circle, ${color1}20, ${color2}10, transparent)` }} />
    </motion.div>
  );
}

/* ─── Phone Mockup (Instagram-style) ─── */
function PhoneMockup({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="w-[180px] h-[360px] rounded-[28px] bg-surface border-2 border-border/50 shadow-2xl overflow-hidden">
        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-1.5 bg-surface-elevated/50">
          <span className="text-[8px] font-semibold text-text-primary">9:41</span>
          <div className="w-16 h-4 rounded-full bg-surface-elevated" />
          <div className="flex gap-0.5">
            <div className="w-3 h-1.5 rounded-sm bg-text-secondary/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-text-secondary/40" />
          </div>
        </div>
        {/* App header */}
        <div className="px-3 py-2 border-b border-border/30">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-accent to-[#00B8D9]" />
            <div>
              <p className="text-[8px] font-bold text-text-primary">priyacreates</p>
              <p className="text-[6px] text-text-secondary">Mumbai, India</p>
            </div>
            <div className="ml-auto text-[7px] font-semibold text-accent">Follow</div>
          </div>
        </div>
        {/* Post image */}
        <div className="aspect-square bg-gradient-to-br from-accent/20 via-[#00B8D9]/10 to-accent/5 flex items-center justify-center">
          <div className="text-center">
            <Camera className="h-8 w-8 text-accent/40 mx-auto mb-1" />
            <p className="text-[7px] text-text-secondary">Spring Glow</p>
            <p className="text-[6px] text-text-secondary">Campaign</p>
          </div>
        </div>
        {/* Engagement */}
        <div className="px-3 py-2">
          <div className="flex items-center gap-3 mb-1">
            <Heart className="h-3.5 w-3.5 text-error" />
            <MessageSquare className="h-3.5 w-3.5 text-text-secondary" />
            <Send className="h-3.5 w-3.5 text-text-secondary" />
          </div>
          <p className="text-[8px] font-semibold text-text-primary">12,847 likes</p>
          <p className="text-[7px] text-text-secondary mt-0.5"><span className="font-semibold text-text-primary">priyacreates</span> Loving the new Bloom Skincare line...</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Dashboard Metrics Mockup ─── */
function DashboardMockup({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="w-[220px] rounded-2xl bg-surface border border-border/50 shadow-2xl overflow-hidden p-3">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-5 w-5 rounded-md bg-gradient-to-br from-accent to-[#00B8D9] flex items-center justify-center">
            <BarChart3 className="h-2.5 w-2.5 text-white" />
          </div>
          <span className="text-[9px] font-semibold text-text-primary">Campaign Analytics</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="rounded-lg bg-accent/[0.06] p-2">
            <p className="text-[7px] text-text-secondary">Engagement</p>
            <p className="text-sm font-bold text-accent">4.8%</p>
          </div>
          <div className="rounded-lg bg-success/[0.06] p-2">
            <p className="text-[7px] text-text-secondary">ROI</p>
            <p className="text-sm font-bold text-success">3.2x</p>
          </div>
        </div>
        {/* Mini chart bars */}
        <div className="flex items-end gap-1 h-10 px-1">
          {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm bg-gradient-to-t from-accent to-[#00B8D9]"
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
            />
          ))}
        </div>
        <p className="text-[7px] text-text-secondary text-center mt-1.5">Last 10 days performance</p>
      </div>
    </div>
  );
}

/* ─── Animated Gradient Underline ─── */
function GradientUnderline({ inView }: { inView: boolean }) {
  return (
    <motion.div
      className="h-[3px] rounded-full bg-gradient-to-r from-accent via-[#00B8D9] to-accent mt-3 mx-auto max-w-[120px]"
      initial={{ scaleX: 0, opacity: 0 }}
      animate={inView ? { scaleX: 1, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      style={{ transformOrigin: "left" }}
    />
  );
}

/* ─── Sparkle Particle ─── */
function SparkleParticle({ delay = 0, x = 0, y = 0 }: { delay?: number; x?: number; y?: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-white"
      style={{ left: `${50 + x}%`, top: `${50 + y}%` }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
        y: [0, -20, -40],
      }}
      transition={{
        duration: 2.5,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

/* ─── Shared Animations ─── */
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

/* ─── Unsplash image helper ─── */
const img = (seed: string, w = 400, h = 400) =>
  `https://images.unsplash.com/photo-${seed}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const photos = {
  creators: [
    img("1494790108377-be9c29b29330", 200, 200),
    img("1507003211169-0a1dd7228f2d", 200, 200),
    img("1539571696357-5a69c17a67c6", 200, 200),
    img("1534528741775-53994a69daeb", 200, 200),
    img("1506794778202-cad84cf45f1d", 200, 200),
    img("1438761681033-6461ffad8d80", 200, 200),
  ],
  portfolios: [
    img("1611162617474-5b21e879e113", 400, 300),
    img("1505740420928-5e560c06d30e", 400, 300),
    img("1469474968028-56623f02e42e", 400, 300),
    img("1558171813-4c2f0da0ab0e", 400, 300),
    img("1550439062-609e1531270e", 400, 300),
    img("1526170375885-4d8ecf77b99f", 400, 300),
    img("1542291026-7eec264c27ff", 400, 300),
    img("1586023492125-27b2c045efd7", 400, 300),
    img("1492684223f8-e1222c5e5689", 400, 300),
  ],
  showcase: [
    img("1596462502278-27bfdc403348", 600, 450),
    img("1441986300917-64674bd600d8", 600, 450),
    img("1515886657613-9f3515b0c78f", 600, 450),
    img("1504674900247-0877df9cc836", 600, 450),
  ],
};

/* ─── Actual product verticals ─── */
const productVerticals = [
  "All", "Fashion", "Lifestyle", "Beauty", "Tech", "Travel", "Food", "Fitness", "Photography", "Education",
];

/* ═══════════════════════════════════════════════════════════════════════
   1. HERO — Collaboration-first identity
   "One workspace for every creator-brand collaboration"
   Discovery is a feature. The workspace IS the product.
   ═══════════════════════════════════════════════════════════════════════ */
/* ─── Floating parallax element with continuous alive motion ─── */
function FloatingElement({ children, className, speed = 0.5, delay = 0, drift = 8, duration = 5 }: { children: React.ReactNode; className?: string; speed?: number; delay?: number; drift?: number; duration?: number }) {
  const elRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: elRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * -80]);
  return (
    <motion.div
      ref={elRef}
      style={{ y }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{
        opacity: [0, 1, 1],
        scale: [0.7, 1, 1],
        translateY: [0, -drift, 0, drift * 0.5, 0],
        rotate: [0, drift * 0.3, 0, -drift * 0.2, 0],
      }}
      transition={{
        opacity: { delay, duration: 0.6 },
        scale: { delay, duration: 0.6 },
        translateY: { delay: delay + 0.6, duration, repeat: Infinity, ease: "easeInOut" },
        rotate: { delay: delay + 0.6, duration: duration * 1.3, repeat: Infinity, ease: "easeInOut" },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Parallax section wrapper for classy scroll effects ─── */
function ParallaxSection({ children, className, offset = 40 }: { children: React.ReactNode; className?: string; offset?: number }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  return (
    <motion.div ref={sectionRef} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeHeroTab, setActiveHeroTab] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveHeroTab((p) => (p + 1) % 3), 4000);
    return () => clearInterval(timer);
  }, []);

  const heroTabs = [
    { label: "Workspace", icon: Handshake },
    { label: "Scope", icon: FileText },
    { label: "Payments", icon: CreditCard },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] via-transparent to-surface-elevated/30" />
        {/* Morphing gradient blob — replaces static blur circle */}
        <MorphingBlob className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[900px]" />
        {/* Secondary orb for depth */}
        <div className="absolute top-[20%] right-[5%] w-[300px] h-[300px] rounded-full bg-[#00B8D9]/[0.04] blur-[100px]" />
      </div>

      {/* Parallax floating elements — alive creator-mind artifacts */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {/* Floating engagement card — slow gentle bob */}
        <FloatingElement className="absolute top-[12%] left-[4%]" speed={0.3} delay={0.5} drift={10} duration={6}>
          <div className="rounded-xl bg-surface/80 backdrop-blur-sm border border-border/30 px-3 py-2 shadow-lg">
            <div className="flex items-center gap-2">
              <Heart className="h-3.5 w-3.5 text-error" />
              <span className="text-[11px] font-semibold text-text-primary">4.8% ER</span>
            </div>
            <p className="text-[9px] text-text-secondary mt-0.5">Above industry avg</p>
          </div>
        </FloatingElement>

        {/* Floating ₹ payment released */}
        <FloatingElement className="absolute top-[58%] left-[2%]" speed={0.6} delay={0.8} drift={6} duration={7}>
          <div className="rounded-full bg-success/10 border border-success/20 px-3 py-1.5 shadow-md">
            <span className="text-[11px] font-bold text-success flex items-center gap-1"><IndianRupee className="h-3 w-3" />12K released</span>
          </div>
        </FloatingElement>

        {/* Camera — creator's primary tool */}
        <FloatingElement className="absolute top-[20%] right-[3%]" speed={0.4} delay={1.1} drift={12} duration={5}>
          <div className="rounded-xl bg-accent/10 border border-accent/15 p-2.5 shadow-md">
            <Camera className="h-4 w-4 text-accent" />
          </div>
        </FloatingElement>

        {/* Content format: Reels */}
        <FloatingElement className="absolute top-[68%] right-[5%]" speed={0.5} delay={0.6} drift={7} duration={8}>
          <div className="rounded-lg bg-surface/80 backdrop-blur-sm border border-border/30 px-3 py-1.5 shadow-md">
            <div className="flex items-center gap-1.5">
              <Video className="h-3 w-3 text-[#C850C0]" />
              <span className="text-[10px] font-medium text-text-primary">Reels × 3</span>
            </div>
          </div>
        </FloatingElement>

        {/* Hashtag trending */}
        <FloatingElement className="absolute top-[40%] left-[7%]" speed={0.7} delay={0.9} drift={9} duration={6.5}>
          <div className="rounded-full bg-[#00B8D9]/10 border border-[#00B8D9]/15 px-2.5 py-1 shadow-sm">
            <span className="text-[10px] font-medium text-[#00B8D9] flex items-center gap-1"><Hash className="h-2.5 w-2.5" />SpringGlow</span>
          </div>
        </FloatingElement>

        {/* Palette icon — creative */}
        <FloatingElement className="absolute top-[45%] right-[2%]" speed={0.35} delay={1.3} drift={11} duration={5.5}>
          <div className="rounded-xl bg-[#C850C0]/10 border border-[#C850C0]/15 p-2 shadow-sm">
            <Palette className="h-3.5 w-3.5 text-[#C850C0]" />
          </div>
        </FloatingElement>

        {/* Match score badge */}
        <FloatingElement className="absolute bottom-[22%] left-[5%]" speed={0.45} delay={0.7} drift={8} duration={7.5}>
          <div className="rounded-xl bg-surface/80 backdrop-blur-sm border border-border/30 px-3 py-2 shadow-lg">
            <div className="flex items-center gap-2">
              <Target className="h-3.5 w-3.5 text-accent" />
              <span className="text-[11px] font-semibold text-text-primary">92% match</span>
            </div>
          </div>
        </FloatingElement>

        {/* Video production */}
        <FloatingElement className="absolute bottom-[28%] right-[4%]" speed={0.55} delay={1.0} drift={10} duration={6}>
          <div className="rounded-lg bg-error/10 border border-error/15 p-2 shadow-sm">
            <Clapperboard className="h-3.5 w-3.5 text-error" />
          </div>
        </FloatingElement>

        {/* Notification toast */}
        <FloatingElement className="absolute top-[32%] right-[8%]" speed={0.25} delay={1.5} drift={6} duration={7}>
          <div className="rounded-xl bg-surface/90 backdrop-blur-sm border border-border/30 px-3 py-2 shadow-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3 w-3 text-success" />
              <span className="text-[10px] font-medium text-text-primary">Reel approved!</span>
            </div>
            <p className="text-[8px] text-success ml-5">₹12K auto-released</p>
          </div>
        </FloatingElement>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Copy: Collaboration-first, not marketplace */}
          <div>
            <motion.div {...fadeUp}>
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/[0.08] border border-accent/[0.15] px-3.5 py-1.5 text-sm font-medium text-accent mb-6">
                <Handshake className="h-3.5 w-3.5" />
                <span>2,400+ collaborations completed across India</span>
              </div>
            </motion.div>

            <motion.h1
              {...fadeUp}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-text-primary leading-[1.08]"
            >
              One workspace for every{" "}
              <span className="bg-gradient-to-r from-accent to-[#00B8D9] bg-clip-text text-transparent">
                creator collab.
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-5 text-lg text-text-secondary max-w-lg leading-relaxed"
            >
              Stop juggling DMs, spreadsheets, and payment reminders. SYNQ gives every collaboration a structured workspace — scope contracts, milestone payments, feedback loops, and dispute resolution in one place.
            </motion.p>

            <motion.div {...fadeUp} transition={{ delay: 0.3, duration: 0.6 }} className="flex flex-col sm:flex-row items-start gap-3 mt-8">
              <Link href="/register?role=CREATOR">
                <Button size="lg" className="gap-2 text-[15px] glow-accent">
                  <Sparkles className="h-4 w-4" /> I&apos;m a Creator
                </Button>
              </Link>
              <Link href="/register?role=BUSINESS">
                <Button variant="outline" size="lg" className="gap-2 text-[15px]">
                  <Briefcase className="h-4 w-4" /> I&apos;m a Brand
                </Button>
              </Link>
            </motion.div>

            {/* Inline stats — replaces separate Stats Bar section */}
            <motion.div {...fadeUp} transition={{ delay: 0.4, duration: 0.6 }} className="flex items-center gap-5 mt-8 text-sm text-text-secondary">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Free for creators</span>
              <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-success" /> Escrow-protected</span>
              <span className="flex items-center gap-1.5"><Scale className="h-3.5 w-3.5 text-success" /> Dispute resolution</span>
            </motion.div>
          </div>

          {/* Right — Workspace preview (not match results — workspace IS the product) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-[20px] bg-surface shadow-xl overflow-hidden group">
              {/* Animated gradient border */}
              <div className="absolute -inset-[1px] rounded-[20px] bg-gradient-to-r from-accent via-[#00B8D9] to-accent opacity-20 group-hover:opacity-40 transition-opacity duration-500" style={{ backgroundSize: "200% 100%", animation: "shimmer 4s linear infinite" }} />
              <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border/50 bg-surface-elevated/30">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-error/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-warning/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-success/60" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="flex rounded-lg bg-surface-elevated/60 p-0.5">
                    {heroTabs.map((tab, i) => (
                      <button
                        key={tab.label}
                        onClick={() => setActiveHeroTab(i)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-medium transition-all ${
                          activeHeroTab === i ? "bg-surface text-accent shadow-sm" : "text-text-secondary"
                        }`}
                      >
                        <tab.icon className="h-3 w-3" />
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex -space-x-1.5">
                  {photos.creators.slice(0, 2).map((src, i) => (
                    <img key={i} src={src} alt="" className="h-5 w-5 rounded-full border-2 border-surface object-cover" />
                  ))}
                  <div className="h-5 w-5 rounded-full bg-accent/20 border-2 border-surface flex items-center justify-center text-[7px] font-bold text-accent">+3</div>
                </div>
              </div>

              <div className="p-5 min-h-[320px]">
                <AnimatePresence mode="wait">
                  {/* Screen 1: Collaboration Workspace — the core product */}
                  {activeHeroTab === 0 && (
                    <motion.div key="workspace" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="text-sm font-semibold text-text-primary">Bloom Skincare × Priya Sharma</h4>
                          <p className="text-[10px] text-text-secondary">Spring Glow Campaign · 14 day timeline</p>
                        </div>
                        <div className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success">In Progress</div>
                      </div>
                      {/* Workspace tabs */}
                      <div className="flex gap-1 mb-3 overflow-x-auto scrollbar-hide">
                        {["Scope", "Files", "Chat", "Feedback", "Payments", "Analytics"].map((tab, i) => (
                          <div key={tab} className={`rounded-md px-2.5 py-1 text-[9px] font-medium whitespace-nowrap ${i === 0 ? "bg-accent/10 text-accent" : "bg-surface-elevated text-text-secondary"}`}>{tab}</div>
                        ))}
                      </div>
                      {/* Active deliverables */}
                      {[
                        { type: "Instagram Reels × 3", status: "1 approved, 1 in review", payment: "₹12K released", progress: 66, statusColor: "text-accent" },
                        { type: "Story Set × 2", status: "Drafts due Mar 15", payment: "₹10K in escrow", progress: 20, statusColor: "text-warning" },
                        { type: "Product Photography × 1", status: "Not started", payment: "₹8K in escrow", progress: 0, statusColor: "text-text-secondary" },
                      ].map((d) => (
                        <div key={d.type} className="flex items-center gap-3 rounded-xl bg-surface-elevated/30 border border-border/30 p-3 mb-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-medium text-text-primary">{d.type}</p>
                            <p className={`text-[9px] ${d.statusColor}`}>{d.status}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-[10px] font-medium text-text-primary">{d.payment}</p>
                            <div className="h-1 w-16 rounded-full bg-surface-elevated overflow-hidden mt-1">
                              <div className="h-full rounded-full bg-accent" style={{ width: `${d.progress}%` }} />
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="mt-3 flex items-center justify-between text-[10px]">
                        <span className="text-text-secondary">Total: ₹54,000</span>
                        <span className="text-success font-medium">₹12,000 released · ₹42,000 secured</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Screen 2: Scope Contract with decision signals */}
                  {activeHeroTab === 1 && (
                    <motion.div key="scope" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-text-primary">Scope Contract</h4>
                        <div className="rounded-full bg-warning/10 px-2 py-0.5 text-[10px] font-medium text-warning">Pending Signature</div>
                      </div>
                      {/* Decision signals — Problem 2 fix */}
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="rounded-lg bg-success/[0.06] border border-success/10 p-2 text-center">
                          <p className="text-[9px] text-text-secondary">Brand Reliability</p>
                          <p className="text-[11px] font-bold text-success">98%</p>
                          <p className="text-[8px] text-text-secondary">on-time payment</p>
                        </div>
                        <div className="rounded-lg bg-accent/[0.06] border border-accent/10 p-2 text-center">
                          <p className="text-[9px] text-text-secondary">Est. Effort</p>
                          <p className="text-[11px] font-bold text-accent">~18 hrs</p>
                          <p className="text-[8px] text-text-secondary">based on similar</p>
                        </div>
                        <div className="rounded-lg bg-[#00B8D9]/[0.06] border border-[#00B8D9]/10 p-2 text-center">
                          <p className="text-[9px] text-text-secondary">Expected Reach</p>
                          <p className="text-[11px] font-bold text-[#00B8D9]">~45K</p>
                          <p className="text-[8px] text-text-secondary">impressions</p>
                        </div>
                      </div>
                      <div className="rounded-xl bg-surface-elevated/30 border border-border/30 p-3 space-y-2">
                        {[
                          { type: "Reels × 3", revisions: 2, price: "₹36,000" },
                          { type: "Stories × 2", revisions: 1, price: "₹10,000" },
                          { type: "Photography × 1", revisions: 2, price: "₹8,000" },
                        ].map((d) => (
                          <div key={d.type} className="flex items-center justify-between text-[11px] py-1 border-b border-border/20 last:border-0">
                            <span className="text-text-primary">{d.type} <span className="text-text-secondary">· {d.revisions} rev</span></span>
                            <span className="font-medium text-text-primary">{d.price}</span>
                          </div>
                        ))}
                        <div className="flex justify-between text-[11px] font-semibold pt-1">
                          <span className="text-text-secondary">Total (14 days)</span>
                          <span className="text-accent">₹54,000</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-[10px] text-success">
                        <Lock className="h-3 w-3" />
                        <span>₹54,000 held in escrow upon signing</span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button className="flex-1 rounded-lg bg-accent py-2.5 text-center text-[11px] font-semibold text-white">Accept & Sign</button>
                        <button className="flex-1 rounded-lg bg-surface-elevated py-2.5 text-center text-[11px] font-medium text-text-secondary">Negotiate Terms</button>
                      </div>
                    </motion.div>
                  )}

                  {/* Screen 3: Payments with dispute flow — Problem 3 fix */}
                  {activeHeroTab === 2 && (
                    <motion.div key="payments" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-text-primary">Milestone Payments</h4>
                        <div className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">₹12K released</div>
                      </div>
                      {[
                        { name: "Reel #1 approved", amount: "₹12,000", status: "Released", color: "bg-success/10 text-success" },
                        { name: "Reel #2 in review", amount: "₹12,000", status: "In Escrow", color: "bg-warning/10 text-warning" },
                        { name: "Reel #3 + Stories + Photo", amount: "₹30,000", status: "In Escrow", color: "bg-warning/10 text-warning" },
                      ].map((p) => (
                        <div key={p.name} className="flex items-center justify-between py-2.5 border-b border-border/20 last:border-0">
                          <div>
                            <p className="text-[11px] text-text-primary">{p.name}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${p.color}`}>{p.status}</span>
                            <span className="text-[11px] font-medium text-text-primary">{p.amount}</span>
                          </div>
                        </div>
                      ))}
                      {/* Dispute resolution — Problem 3 */}
                      <div className="mt-3 rounded-xl bg-error/[0.04] border border-error/10 p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Flag className="h-3.5 w-3.5 text-error" />
                          <span className="text-[11px] font-semibold text-text-primary">Issue Resolution</span>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] text-text-secondary">
                          <span className="flex items-center gap-1"><Flag className="h-2.5 w-2.5" /> Raise Issue</span>
                          <ChevronRight className="h-2.5 w-2.5" />
                          <span className="flex items-center gap-1"><Scale className="h-2.5 w-2.5" /> Mediation</span>
                          <ChevronRight className="h-2.5 w-2.5" />
                          <span className="flex items-center gap-1"><CheckCircle2 className="h-2.5 w-2.5" /> Resolution</span>
                        </div>
                        <p className="text-[9px] text-text-secondary mt-1.5">Auto-resolution if no response in 7 days. Platform mediator assigned within 24h.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex justify-center gap-1.5 pb-3">
                {heroTabs.map((_, i) => (
                  <div key={i} className={`h-1 rounded-full transition-all duration-300 ${activeHeroTab === i ? "w-6 bg-accent" : "w-1.5 bg-border"}`} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   2. HOW IT WORKS — 4 steps, collaboration-first framing
   ═══════════════════════════════════════════════════════════════════════ */
const workflowSteps = [
  {
    number: "01",
    title: "Build your profile",
    description: "Creators: set rate cards per format (Reels ₹12K, YouTube ₹25K, Stories ₹5K), define excluded categories, and connect Instagram/YouTube. Brands: add company details, target demographics, and campaign objectives.",
    forCreator: "Set your rates, upload portfolio, define what you won't work with — brands see everything upfront",
    forBusiness: "Define your brand profile, objectives (awareness, launch, UGC), and ideal creator criteria",
  },
  {
    number: "02",
    title: "Get matched with context",
    description: "AI scores every pair on 4 factors: audience overlap (35%), content alignment (30%), budget fit (20%), behavioral reliability (15%). Every match includes transparent reasoning — not just a number.",
    forCreator: "See why each brand fits: their payment reliability, avg collaboration length, and repeat rate",
    forBusiness: "Filter by vertical, location, engagement, budget. Every creator shows response time and on-time delivery rate",
  },
  {
    number: "03",
    title: "Sign a scope contract",
    description: "Structured contracts with deliverables (type × quantity × platform), revision limits, usage rights, timeline, and payment milestones. Both sign digitally. Funds move to escrow before work starts.",
    forCreator: "See estimated effort, brand reliability score, and expected reach before accepting any collaboration",
    forBusiness: "Scope contracts prevent scope creep. Revision limits and usage rights are locked in writing.",
  },
  {
    number: "04",
    title: "Collaborate & get paid",
    description: "Work in a dedicated workspace with separated tabs — Chat for conversation, Scope for contract, Files for assets, Feedback for revisions, Payments for escrow, and Analytics for performance insights.",
    forCreator: "Submit → feedback → iterate → milestone approved → ₹ auto-released. Raise issues if something goes wrong.",
    forBusiness: "Review drafts, leave structured feedback, approve milestones. Dispute resolution built in if needed.",
  },
];

function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(() => setActiveStep((p) => (p + 1) % 4), 6000);
    return () => clearInterval(timer);
  }, [isInView]);

  const demoScreens: Record<number, React.ReactNode> = {
    0: (
      <div className="space-y-3">
        <div className="flex items-center gap-3 mb-3">
          <img src={photos.creators[0]} alt="" className="h-14 w-14 rounded-full object-cover border-2 border-accent/20" />
          <div>
            <p className="text-xs font-semibold text-text-primary">Priya Sharma</p>
            <p className="text-[10px] text-text-secondary">Mumbai, Maharashtra</p>
          </div>
          <div className="ml-auto rounded-full bg-success/10 px-2 py-0.5 text-[9px] font-medium text-success">Open</div>
        </div>
        <div className="text-[10px] font-medium text-text-secondary mb-1">Rate Card</div>
        <div className="space-y-1.5">
          {[
            { format: "Reels", price: "₹12,000" },
            { format: "YouTube Video", price: "₹25,000" },
            { format: "Stories", price: "₹5,000" },
            { format: "Photography", price: "₹8,000" },
          ].map((r) => (
            <div key={r.format} className="flex justify-between text-[11px]">
              <span className="text-text-secondary">{r.format}</span>
              <span className="font-medium text-text-primary">{r.price}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {["Fashion", "Lifestyle", "Beauty"].map((v) => (
            <span key={v} className="rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-medium text-accent">{v}</span>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1.5 mt-2">
          {photos.portfolios.slice(0, 3).map((src, i) => (
            <img key={i} src={src} alt="" className="aspect-square rounded-lg object-cover" />
          ))}
        </div>
        <div className="h-2 w-full rounded-full bg-surface-elevated overflow-hidden mt-1">
          <motion.div className="h-full rounded-full bg-accent" initial={{ width: 0 }} animate={isInView ? { width: "92%" } : {}} transition={{ duration: 1, delay: 0.3 }} />
        </div>
        <div className="text-[9px] text-text-secondary">Profile completeness: 92%</div>
      </div>
    ),
    1: (
      <div className="space-y-2.5">
        <div className="text-[11px] font-semibold text-text-primary mb-1">Top Matches for Priya</div>
        {[
          { name: "Bloom Skincare", industry: "Beauty", score: 92, budget: "₹50K-₹2L", reliability: "98% on-time pay", photo: photos.portfolios[7] },
          { name: "TrailCo Outdoor", industry: "Travel", score: 87, budget: "₹25K-₹75K", reliability: "95% on-time pay", photo: photos.portfolios[2] },
          { name: "NomadCo Coffee", industry: "Food & Bev", score: 81, budget: "₹15K-₹40K", reliability: "91% on-time pay", photo: photos.portfolios[4] },
        ].map((match, i) => (
          <motion.div key={match.name} className="flex items-center gap-2.5 rounded-xl bg-surface-elevated/50 p-2.5" initial={{ opacity: 0, x: -10 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 + i * 0.12 }}>
            <img src={match.photo} alt="" className="h-9 w-9 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-medium text-text-primary truncate">{match.name}</div>
              <div className="text-[9px] text-text-secondary">{match.industry} · {match.budget}</div>
              {/* Decision signal — brand reliability */}
              <div className="text-[8px] text-success">{match.reliability}</div>
            </div>
            <div className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">{match.score}%</div>
          </motion.div>
        ))}
        <div className="mt-2 p-2.5 rounded-xl bg-accent/[0.04] border border-accent/10">
          <div className="text-[10px] text-accent font-medium mb-1.5">Match Score = 4 Weighted Factors</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {[
              { label: "Audience Overlap", weight: "35%" },
              { label: "Content Alignment", weight: "30%" },
              { label: "Budget Fit", weight: "20%" },
              { label: "Behavioral Score", weight: "15%" },
            ].map((f) => (
              <div key={f.label} className="flex justify-between text-[9px]">
                <span className="text-text-secondary">{f.label}</span>
                <span className="font-medium text-text-primary">{f.weight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    2: (
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-semibold text-text-primary">Scope Contract</div>
          <div className="rounded-full bg-warning/10 px-2 py-0.5 text-[9px] font-medium text-warning">Awaiting Signature</div>
        </div>
        {/* Decision signals for creators — Problem 2 */}
        <div className="grid grid-cols-3 gap-1.5">
          <div className="rounded-lg bg-success/[0.06] p-1.5 text-center">
            <p className="text-[8px] text-text-secondary">Reliability</p>
            <p className="text-[10px] font-bold text-success">98%</p>
          </div>
          <div className="rounded-lg bg-accent/[0.06] p-1.5 text-center">
            <p className="text-[8px] text-text-secondary">Est. Effort</p>
            <p className="text-[10px] font-bold text-accent">~18h</p>
          </div>
          <div className="rounded-lg bg-[#00B8D9]/[0.06] p-1.5 text-center">
            <p className="text-[8px] text-text-secondary">Exp. Reach</p>
            <p className="text-[10px] font-bold text-[#00B8D9]">~45K</p>
          </div>
        </div>
        <div className="rounded-xl bg-surface-elevated/30 p-3 space-y-1.5 text-[11px]">
          {[
            { type: "Reels × 3", price: "₹36,000" },
            { type: "Stories × 2", price: "₹10,000" },
            { type: "Photography × 1", price: "₹8,000" },
          ].map((d) => (
            <div key={d.type} className="flex items-center justify-between py-1 border-b border-border/20 last:border-0">
              <span className="text-text-primary">{d.type}</span>
              <span className="font-medium text-text-primary">{d.price}</span>
            </div>
          ))}
          <div className="flex justify-between font-semibold pt-1">
            <span className="text-text-secondary">Total (14 days)</span>
            <span className="text-accent">₹54,000</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-success"><Lock className="h-3 w-3" /> Escrow-locked on signing</div>
        <div className="flex gap-2">
          <div className="flex-1 rounded-lg bg-accent py-2 text-center text-[11px] font-semibold text-white cursor-pointer">Accept & Sign</div>
          <div className="flex-1 rounded-lg bg-surface-elevated py-2 text-center text-[11px] font-medium text-text-secondary cursor-pointer">Negotiate</div>
        </div>
      </div>
    ),
    3: (
      <div className="space-y-2.5">
        {/* Separated workspace tabs — Problem 4 */}
        <div className="flex gap-1 overflow-x-auto scrollbar-hide mb-2">
          {["Scope", "Files", "Chat", "Feedback", "Payments", "Analytics"].map((tab, i) => (
            <div key={tab} className={`rounded-md px-2 py-1 text-[9px] font-medium whitespace-nowrap ${i === 4 ? "bg-accent/10 text-accent" : "bg-surface-elevated text-text-secondary"}`}>{tab}</div>
          ))}
        </div>
        <div className="text-[11px] font-semibold text-text-primary mb-1">Milestone Payments</div>
        {[
          { event: "Reel #1 approved", amount: "₹12,000", status: "Released", icon: CheckCircle2, color: "bg-success" },
          { event: "Reel #2 in review", amount: "₹12,000", status: "Escrow", icon: Clock, color: "bg-warning" },
          { event: "Final delivery pending", amount: "₹30,000", status: "Escrow", icon: Lock, color: "bg-surface-elevated" },
        ].map((e) => (
          <div key={e.event} className="flex items-center gap-2.5 py-1.5">
            <div className={`h-5 w-5 rounded-full flex items-center justify-center ${e.color}`}>
              <e.icon className="h-2.5 w-2.5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-text-primary">{e.event}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-medium text-text-primary">{e.amount}</span>
              <p className={`text-[8px] ${e.status === "Released" ? "text-success" : "text-warning"}`}>{e.status}</p>
            </div>
          </div>
        ))}
        {/* Dispute resolution preview */}
        <div className="mt-2 rounded-xl bg-error/[0.04] border border-error/10 p-2.5">
          <div className="flex items-center gap-1.5 text-[10px] font-medium text-text-primary mb-1"><Flag className="h-3 w-3 text-error" /> Something wrong?</div>
          <p className="text-[9px] text-text-secondary">Raise an issue → 24h mediation → Auto-resolution in 7 days</p>
        </div>
      </div>
    ),
  };

  return (
    <section ref={ref} id="how-it-works" className="py-24 relative">
      {/* Decorative dot grid */}
      <div className="absolute inset-0 dot-grid opacity-[0.04] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <ParallaxSection offset={30}>
          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-accent mb-3"><Play className="h-4 w-4" /> How It Works</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">From brief to payment in four steps</h2>
            <GradientUnderline inView={isInView} />
            <p className="mt-4 text-text-secondary max-w-xl mx-auto">Every step shows you the real product. Click through to explore.</p>
          </motion.div>
        </ParallaxSection>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-2 relative">
            {/* Vertical accent line connecting steps */}
            <div className="absolute left-[22px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-accent/30 via-accent/10 to-transparent hidden md:block" />
            {workflowSteps.map((step, i) => (
              <motion.button
                key={step.number}
                onClick={() => setActiveStep(i)}
                className={`w-full text-left rounded-[14px] p-5 transition-all duration-300 ${activeStep === i ? "bg-surface shadow-md border border-border/50" : "hover:bg-surface-elevated/50"}`}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <span className={`text-2xl font-bold font-mono transition-colors ${activeStep === i ? "text-accent" : "text-text-secondary/30"}`}>{step.number}</span>
                  <div className="flex-1">
                    <h4 className={`font-semibold transition-colors ${activeStep === i ? "text-text-primary" : "text-text-secondary"}`}>{step.title}</h4>
                    <AnimatePresence mode="wait">
                      {activeStep === i && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                          <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">{step.description}</p>
                          <div className="mt-3 grid grid-cols-2 gap-2">
                            <div className="rounded-lg bg-accent/[0.06] p-2.5">
                              <div className="text-[10px] font-semibold text-accent mb-0.5 flex items-center gap-1"><Sparkles className="h-2.5 w-2.5" /> For Creators</div>
                              <p className="text-[10px] text-text-secondary leading-relaxed">{step.forCreator}</p>
                            </div>
                            <div className="rounded-lg bg-[#00B8D9]/[0.06] p-2.5">
                              <div className="text-[10px] font-semibold text-[#00B8D9] mb-0.5 flex items-center gap-1"><Briefcase className="h-2.5 w-2.5" /> For Brands</div>
                              <p className="text-[10px] text-text-secondary leading-relaxed">{step.forBusiness}</p>
                            </div>
                          </div>
                          <div className="h-0.5 w-full rounded-full bg-surface-elevated mt-3 overflow-hidden">
                            <motion.div className="h-full rounded-full bg-accent" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 6, ease: "linear" }} key={`progress-${activeStep}`} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <ParallaxSection offset={40}>
          <motion.div className="rounded-[20px] bg-surface shadow-lg border border-border/50 p-5 min-h-[440px] flex flex-col sticky top-24" initial={{ opacity: 0, scale: 0.95 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/50">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-error/60" /><div className="h-2.5 w-2.5 rounded-full bg-warning/60" /><div className="h-2.5 w-2.5 rounded-full bg-success/60" />
              </div>
              <div className="flex-1 text-center text-[10px] text-text-secondary font-medium">{workflowSteps[activeStep].title}</div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activeStep} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="flex-1">
                {demoScreens[activeStep]}
              </motion.div>
            </AnimatePresence>
          </motion.div>
          </ParallaxSection>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   3. CREATOR DISCOVERY — Now with decision signals (Problem 2)
   Shows brand reliability, effort estimates, repeat rate on cards
   ═══════════════════════════════════════════════════════════════════════ */
const mockCreators = [
  { name: "Priya Sharma", handle: "@priyacreates", location: "Mumbai", category: "Fashion", followers: "210K", engagement: "4.8%", rate: "₹12,000", responseTime: "2h", onTime: "96%", repeatRate: "4 brands", photo: photos.creators[0], tags: ["Fashion", "Lifestyle", "Beauty"], matchScore: 92, portfolio: photos.portfolios.slice(0, 3), availability: "OPEN" },
  { name: "Marcus Chen", handle: "@marcusvisuals", location: "Bangalore", category: "Tech", followers: "340K", engagement: "5.2%", rate: "₹25,000", responseTime: "3h", onTime: "92%", repeatRate: "6 brands", photo: photos.creators[1], tags: ["Tech Review", "Unboxing"], matchScore: 89, portfolio: photos.portfolios.slice(3, 6), availability: "SELECTIVE" },
  { name: "Alex Rivera", handle: "@alexwanders", location: "Delhi NCR", category: "Travel", followers: "85K", engagement: "6.1%", rate: "₹8,000", responseTime: "1h", onTime: "98%", repeatRate: "3 brands", photo: photos.creators[2], tags: ["Travel", "Photography"], matchScore: 87, portfolio: photos.portfolios.slice(2, 5), availability: "OPEN" },
  { name: "Sarah Kim", handle: "@sarahkimstyle", location: "Mumbai", category: "Fashion", followers: "520K", engagement: "3.9%", rate: "₹18,000", responseTime: "4h", onTime: "88%", repeatRate: "8 brands", photo: photos.creators[3], tags: ["Fashion", "Beauty"], matchScore: 84, portfolio: photos.portfolios.slice(5, 8), availability: "SELECTIVE" },
  { name: "Jordan Osei", handle: "@jordantech", location: "Hyderabad", category: "Tech", followers: "160K", engagement: "5.8%", rate: "₹15,000", responseTime: "2h", onTime: "94%", repeatRate: "5 brands", photo: photos.creators[4], tags: ["Software", "AI"], matchScore: 81, portfolio: photos.portfolios.slice(1, 4), availability: "OPEN" },
  { name: "Leah Nguyen", handle: "@leahcooks", location: "Chennai", category: "Food", followers: "290K", engagement: "7.2%", rate: "₹10,000", responseTime: "1.5h", onTime: "97%", repeatRate: "7 brands", photo: photos.creators[5], tags: ["Food", "Wellness"], matchScore: 78, portfolio: photos.portfolios.slice(4, 7), availability: "OPEN" },
];

function CreatorDiscoverySection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const filtered = activeCategory === "All" ? mockCreators : mockCreators.filter((c) => c.category === activeCategory);
  const scroll = useCallback((dir: "left" | "right") => { scrollRef.current?.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" }); }, []);

  return (
    <section ref={sectionRef} id="discover" className="py-24 bg-surface-elevated/30 relative overflow-hidden">
      {/* Floating mockups for visual depth — hidden on mobile */}
      <div className="absolute inset-0 pointer-events-none hidden xl:block">
        <FloatingElement className="absolute top-[8%] right-[-2%]" speed={0.2} delay={0.5} drift={6} duration={7}>
          <PhoneMockup />
        </FloatingElement>
        <FloatingElement className="absolute bottom-[5%] left-[-1%]" speed={0.25} delay={1.0} drift={5} duration={8}>
          <DashboardMockup />
        </FloatingElement>
      </div>
      <div className="max-w-6xl mx-auto px-6 relative">
        <ParallaxSection offset={25}>
          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-medium text-accent mb-3"><Search className="h-4 w-4" /> Discovery</div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">Find your next collaborator</h2>
              <GradientUnderline inView={isInView} />
              <p className="mt-4 text-text-secondary max-w-lg">15 verticals, transparent metrics, AI match scores. Discovery is how you get into the workspace — not the destination.</p>
            </div>
            <Link href="/register?role=BUSINESS"><Button variant="outline" className="gap-2">Browse All Creators <ArrowUpRight className="h-4 w-4" /></Button></Link>
          </motion.div>
        </ParallaxSection>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="flex items-center gap-2 mb-8 overflow-x-auto scrollbar-hide pb-2">
          {productVerticals.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat ? "bg-accent text-white shadow-sm" : "bg-surface text-text-secondary hover:text-text-primary hover:bg-surface-elevated border border-border/50"}`}>{cat}</button>
          ))}
        </motion.div>

        <ParallaxSection offset={15}>
        <div className="relative">
          <button onClick={() => scroll("left")} className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-surface shadow-md hidden md:flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"><ChevronLeft className="h-5 w-5" /></button>
          <button onClick={() => scroll("right")} className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-surface shadow-md hidden md:flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"><ChevronRight className="h-5 w-5" /></button>

          <div ref={scrollRef} className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-2 px-2">
            {filtered.map((creator, i) => (
              <motion.div key={creator.name} className="snap-start shrink-0 w-[300px]" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 + i * 0.08 }} onMouseEnter={() => setHoveredCard(i)} onMouseLeave={() => setHoveredCard(null)}>
                <div className={`relative rounded-[16px] bg-surface border border-border/50 overflow-hidden transition-all duration-300 cursor-pointer ${hoveredCard === i ? "shadow-lg -translate-y-1 border-accent/20" : "shadow-sm hover:shadow-md"}`}>
                  <div className="p-5">
                    {/* Profile first — avatar on top, no cover image overlay */}
                    <div className="flex items-center gap-3 mb-3">
                      <img src={creator.photo} alt={creator.name} className="h-14 w-14 rounded-full object-cover shadow-sm ring-2 ring-border/30" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-text-primary text-[15px] leading-tight truncate">{creator.name}</h4>
                          <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium shrink-0 ${creator.availability === "OPEN" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>{creator.availability === "OPEN" ? "Open" : "Selective"}</span>
                        </div>
                        <p className="text-xs text-text-secondary flex items-center gap-1"><MapPin className="h-2.5 w-2.5" />{creator.location}</p>
                      </div>
                      <div className="rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-bold text-accent shrink-0">{creator.matchScore}%</div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {creator.tags.map((tag) => (<span key={tag} className="rounded-full bg-surface-elevated px-2.5 py-1 text-[10px] font-medium text-text-secondary">{tag}</span>))}
                    </div>
                    {/* Portfolio preview — below profile */}
                    <div className="grid grid-cols-3 gap-1.5 mb-3">
                      {creator.portfolio.map((src, n) => (<img key={n} src={src} alt="" className="aspect-square rounded-lg object-cover" />))}
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-3 text-center">
                      <div><p className="text-[9px] text-text-secondary uppercase tracking-wider">Followers</p><p className="text-sm font-semibold text-text-primary">{creator.followers}</p></div>
                      <div><p className="text-[9px] text-text-secondary uppercase tracking-wider">Engage</p><p className="text-sm font-semibold text-accent">{creator.engagement}</p></div>
                      <div><p className="text-[9px] text-text-secondary uppercase tracking-wider">Starts at</p><p className="text-sm font-semibold text-text-primary">{creator.rate}</p></div>
                    </div>
                    {/* Hover — decision signals */}
                    <AnimatePresence>
                      {hoveredCard === i && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                          <div className="flex items-center gap-3 mb-3 text-[10px] text-text-secondary">
                            <span className="flex items-center gap-1"><Timer className="h-3 w-3" /> {creator.responseTime} avg</span>
                            <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-success" /> {creator.onTime} on-time</span>
                            <span className="flex items-center gap-1"><Award className="h-3 w-3" /> {creator.repeatRate}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="flex gap-2">
                      <button className="flex-1 rounded-lg bg-accent text-white py-2.5 text-sm font-medium hover:bg-accent-hover transition-colors">View Profile</button>
                      <button className="rounded-lg bg-surface-elevated px-3.5 py-2.5 text-text-secondary hover:text-text-primary transition-colors" title="Send Brief"><Send className="h-4 w-4" /></button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        </ParallaxSection>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   4. COLLABORATION WORKSPACE — Separated concerns (Problem 4)
   Chat, Scope, and Payments are distinct tabs. Dispute flow included.
   Actionable analytics (Problem 5) in Performance tab.
   ═══════════════════════════════════════════════════════════════════════ */
function CollaborationWorkspaceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeWsTab, setActiveWsTab] = useState(0);

  const wsTabs = [
    { label: "Scope", icon: FileText },
    { label: "Files", icon: FolderOpen },
    { label: "Chat", icon: MessageSquare },
    { label: "Feedback", icon: ThumbsUp },
    { label: "Payments", icon: CreditCard },
    { label: "Analytics", icon: BarChart3 },
  ];

  return (
    <section ref={ref} id="workspace" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <ParallaxSection offset={30}>
          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-[#00B8D9] mb-3"><Handshake className="h-4 w-4" /> The Workspace</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">This is where collaborations actually happen</h2>
            <GradientUnderline inView={isInView} />
            <p className="mt-4 text-text-secondary max-w-2xl mx-auto">Every collab gets a dedicated workspace with 6 focused tabs. Chat stays separate from contracts. Payments stays separate from feedback. Nothing gets tangled.</p>
          </motion.div>
        </ParallaxSection>

        <ParallaxSection offset={35}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="rounded-[20px] bg-surface border border-border/50 shadow-xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-3 border-b border-border/50 bg-surface-elevated/30">
            <div className="flex gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-error/60" /><div className="h-2.5 w-2.5 rounded-full bg-warning/60" /><div className="h-2.5 w-2.5 rounded-full bg-success/60" /></div>
            <div className="h-5 w-px bg-border/50" />
            <div className="flex items-center gap-1 text-[11px] text-text-secondary"><FolderOpen className="h-3.5 w-3.5" /> Bloom Skincare × Priya Sharma</div>
            <div className="ml-auto flex items-center gap-2">
              <div className="flex -space-x-2">
                {photos.creators.slice(0, 2).map((src, i) => (<img key={i} src={src} alt="" className="h-6 w-6 rounded-full border-2 border-surface object-cover" />))}
              </div>
              <div className="text-[10px] text-success flex items-center gap-1"><div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> 2 online</div>
            </div>
          </div>

          <div className="flex border-b border-border/50 overflow-x-auto scrollbar-hide">
            {wsTabs.map((tab, i) => (
              <button key={tab.label} onClick={() => setActiveWsTab(i)} className={`flex items-center gap-1.5 px-4 py-3 text-[12px] font-medium whitespace-nowrap border-b-2 transition-all ${activeWsTab === i ? "text-accent border-accent bg-accent/[0.03]" : "text-text-secondary border-transparent hover:text-text-primary"}`}>
                <tab.icon className="h-3.5 w-3.5" />{tab.label}
              </button>
            ))}
          </div>

          <div className="p-6 min-h-[320px]">
            <AnimatePresence mode="wait">
              {/* Tab 0: Scope — Contract only, no chat mixed in */}
              {activeWsTab === 0 && (
                <motion.div key="scope" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h4 className="text-sm font-semibold text-text-primary mb-4">Scope Contract — Signed ✓</h4>
                  <div className="space-y-2.5">
                    {[
                      { type: "Instagram Reels × 3", status: "1 approved, 1 in review, 1 pending", revisions: "2", price: "₹36,000" },
                      { type: "Story Set × 2", status: "In progress", revisions: "1", price: "₹10,000" },
                      { type: "Product Photography × 1", status: "Not started", revisions: "2", price: "₹8,000" },
                    ].map((d) => (
                      <div key={d.type} className="flex items-center justify-between rounded-xl bg-surface-elevated/30 border border-border/30 p-3.5">
                        <div>
                          <p className="text-sm font-medium text-text-primary">{d.type}</p>
                          <p className="text-xs text-text-secondary">{d.status} · {d.revisions} revisions max</p>
                        </div>
                        <p className="text-sm font-semibold text-text-primary">{d.price}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
                    <div className="text-sm text-text-secondary">14 days · Usage rights 6 months</div>
                    <div className="text-lg font-bold text-accent">₹54,000</div>
                  </div>
                </motion.div>
              )}

              {/* Tab 1: Files — separate from chat */}
              {activeWsTab === 1 && (
                <motion.div key="files" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h4 className="text-sm font-semibold text-text-primary mb-4">Shared Files</h4>
                  {[
                    { name: "Campaign Brief.pdf", type: "BRIEF", by: "Bloom Skincare", date: "Mar 3", size: "2.4 MB" },
                    { name: "Mood Board — Spring Glow.zip", type: "MOOD_BOARD", by: "Bloom Skincare", date: "Mar 4", size: "18 MB" },
                    { name: "Reel_1_Draft_v2.mp4", type: "DRAFT", by: "Priya Sharma", date: "Mar 8", size: "45 MB" },
                    { name: "Reel_1_Final.mp4", type: "FINAL", by: "Priya Sharma", date: "Mar 11", size: "52 MB" },
                  ].map((f) => (
                    <div key={f.name} className="flex items-center gap-3 py-3 border-b border-border/20 last:border-0">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-[9px] font-bold text-white ${f.type === "BRIEF" ? "bg-[#6366F1]" : f.type === "MOOD_BOARD" ? "bg-[#00B8D9]" : f.type === "DRAFT" ? "bg-warning" : "bg-success"}`}>{f.type.charAt(0)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-text-primary truncate">{f.name}</p>
                        <p className="text-[10px] text-text-secondary">{f.by} · {f.date} · {f.size}</p>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${f.type === "BRIEF" ? "bg-[#6366F1]/10 text-[#6366F1]" : f.type === "MOOD_BOARD" ? "bg-[#00B8D9]/10 text-[#00B8D9]" : f.type === "DRAFT" ? "bg-warning/10 text-warning" : "bg-success/10 text-success"}`}>{f.type.replace("_", " ")}</span>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Tab 2: Chat — Problem 4: separated from scope/payments */}
              {activeWsTab === 2 && (
                <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h4 className="text-sm font-semibold text-text-primary mb-4">Chat</h4>
                  <p className="text-xs text-text-secondary mb-4">Conversation stays here. Scope changes happen in the Scope tab. Payment discussions in Payments.</p>
                  <div className="space-y-3">
                    {[
                      { from: "Bloom Skincare", avatar: "BS", msg: "Hey Priya! Excited to kick this off. Brief is uploaded in the Files tab.", time: "Mar 3, 10:00 AM", isCreator: false },
                      { from: "Priya Sharma", avatar: "", msg: "Got it! Love the mood board. Quick question — do you want the reels shot indoors or outdoor?", time: "Mar 3, 11:30 AM", isCreator: true },
                      { from: "Bloom Skincare", avatar: "BS", msg: "Outdoor would be great! Natural lighting works best for our products.", time: "Mar 3, 12:15 PM", isCreator: false },
                    ].map((m, i) => (
                      <div key={i} className={`flex items-start gap-2 ${m.isCreator ? "flex-row-reverse" : ""}`}>
                        {m.isCreator ? (
                          <img src={photos.creators[0]} alt="" className="h-6 w-6 rounded-full object-cover shrink-0" />
                        ) : (
                          <div className="h-6 w-6 rounded-full bg-[#00B8D9]/20 flex items-center justify-center text-[9px] font-bold text-[#00B8D9] shrink-0">{m.avatar}</div>
                        )}
                        <div className={`rounded-xl p-3 max-w-[75%] ${m.isCreator ? "bg-accent/10" : "bg-surface-elevated/50"}`}>
                          <p className="text-[11px] text-text-primary">{m.msg}</p>
                          <p className="text-[9px] text-text-secondary mt-1">{m.time}</p>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 text-[10px] text-text-secondary mt-2 p-2 rounded-lg bg-surface-elevated/30">
                      <Bot className="h-3.5 w-3.5" />
                      <span>Off-platform contact attempts are flagged automatically</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 3: Feedback — revision tracking */}
              {activeWsTab === 3 && (
                <motion.div key="feedback" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="flex items-center justify-between mb-4"><h4 className="text-sm font-semibold text-text-primary">Feedback — Revision 1 of 2</h4><span className="text-xs text-text-secondary">1 revision remaining</span></div>
                  <div className="space-y-3">
                    <div className="rounded-xl bg-surface-elevated/30 border border-border/30 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-6 w-6 rounded-full bg-[#00B8D9]/20 flex items-center justify-center text-[9px] font-bold text-[#00B8D9]">BS</div>
                        <span className="text-xs font-medium text-text-primary">Bloom Skincare</span>
                        <span className="text-[10px] text-text-secondary ml-auto">Mar 9</span>
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed">Love the overall vibe! Two small changes: 1) Extend the product close-up by 2 seconds 2) Add the brand tagline in the last frame.</p>
                      <div className="mt-2 rounded-full bg-warning/10 px-2 py-0.5 text-[10px] font-medium text-warning w-fit">Changes Requested</div>
                    </div>
                    <div className="rounded-xl bg-surface-elevated/30 border border-accent/20 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <img src={photos.creators[0]} alt="" className="h-6 w-6 rounded-full object-cover" />
                        <span className="text-xs font-medium text-text-primary">Priya Sharma</span>
                        <span className="text-[10px] text-text-secondary ml-auto">Mar 10</span>
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed">Done! Extended close-up and added tagline with a subtle fade-in. Updated file in Files tab.</p>
                      <div className="mt-2 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success w-fit">Approved ✓</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 4: Payments — with dispute flow (Problem 3) */}
              {activeWsTab === 4 && (
                <motion.div key="payments" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h4 className="text-sm font-semibold text-text-primary mb-4">Escrow Payments</h4>
                  <div className="rounded-xl bg-surface-elevated/30 border border-border/30 p-5 text-center mb-4">
                    <p className="text-3xl font-bold text-text-primary">₹54,000</p>
                    <p className="text-sm text-text-secondary mt-1">Total contract value</p>
                    <div className="h-2 w-full rounded-full bg-surface-elevated overflow-hidden mt-3 max-w-xs mx-auto">
                      <div className="h-full rounded-full bg-gradient-to-r from-success to-accent" style={{ width: "22%" }} />
                    </div>
                    <p className="text-xs text-text-secondary mt-1.5">₹12,000 released · ₹42,000 in escrow</p>
                  </div>
                  {[
                    { milestone: "Reel #1 approved", amount: "₹12,000", status: "Released", statusColor: "text-success bg-success/10" },
                    { milestone: "Reel #2 + Stories", amount: "₹22,000", status: "In Escrow", statusColor: "text-warning bg-warning/10" },
                    { milestone: "Final delivery + photo", amount: "₹20,000", status: "In Escrow", statusColor: "text-warning bg-warning/10" },
                  ].map((p) => (
                    <div key={p.milestone} className="flex items-center justify-between py-3 border-b border-border/20 last:border-0">
                      <p className="text-sm text-text-primary">{p.milestone}</p>
                      <div className="flex items-center gap-3">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${p.statusColor}`}>{p.status}</span>
                        <span className="text-sm font-semibold text-text-primary">{p.amount}</span>
                      </div>
                    </div>
                  ))}
                  {/* Dispute resolution flow — Problem 3 */}
                  <div className="mt-5 rounded-xl bg-error/[0.04] border border-error/10 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Flag className="h-4 w-4 text-error" />
                      <h5 className="text-sm font-semibold text-text-primary">Dispute Resolution</h5>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      {[
                        { step: "Raise Issue", icon: Flag, desc: "Either party flags a concern" },
                        { step: "Mediation", icon: Scale, desc: "Platform mediator assigned in 24h" },
                        { step: "Resolution", icon: CheckCircle2, desc: "Auto-resolved in 7 days if no response" },
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
                    <button className="w-full rounded-lg bg-surface-elevated py-2 text-center text-[11px] font-medium text-text-secondary hover:text-text-primary transition-colors">Raise an Issue</button>
                  </div>
                </motion.div>
              )}

              {/* Tab 5: Analytics — Actionable insights, not vanity metrics (Problem 5) */}
              {activeWsTab === 5 && (
                <motion.div key="analytics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h4 className="text-sm font-semibold text-text-primary mb-2">Campaign Analytics</h4>
                  <p className="text-xs text-text-secondary mb-4">Actionable insights, not just numbers</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {[
                      { metric: "Reel Saves", value: "1,240", insight: "2.3x higher than avg for beauty reels", color: "text-success" },
                      { metric: "Story Reach", value: "34K", insight: "Tracking above 45K projection", color: "text-accent" },
                      { metric: "Profile Visits", value: "890", insight: "12% converted to followers", color: "text-[#00B8D9]" },
                      { metric: "Cost per Engage", value: "₹3.20", insight: "38% below industry benchmark", color: "text-success" },
                    ].map((m) => (
                      <div key={m.metric} className="rounded-xl bg-surface-elevated/30 border border-border/30 p-3">
                        <p className="text-[10px] text-text-secondary">{m.metric}</p>
                        <p className="text-xl font-bold text-text-primary">{m.value}</p>
                        <p className={`text-[9px] ${m.color} font-medium mt-1`}>{m.insight}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl bg-accent/[0.04] border border-accent/10 p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="h-3.5 w-3.5 text-accent" />
                      <span className="text-[11px] font-semibold text-text-primary">Insight</span>
                    </div>
                    <p className="text-[11px] text-text-secondary">Priya&apos;s Reels get 2.3x more saves than the average beauty creator. Consider adding 1 more Reel to maximize ROI on this campaign.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        </ParallaxSection>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   5. FOR CREATORS / FOR BUSINESSES — Accurate features + dispute mention
   ═══════════════════════════════════════════════════════════════════════ */
function DualAudienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-surface-elevated/30">
      <div className="max-w-6xl mx-auto px-6">
        <ParallaxSection offset={25}>
          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">Built for both sides of every collab</h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">Whether you create content or commission it — every feature exists to make collaborations work, not just start.</p>
          </motion.div>
        </ParallaxSection>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
            <Card className="p-8 h-full border-accent/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-[12px] bg-accent/10 p-3"><Sparkles className="h-6 w-6 text-accent" /></div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">For Creators</h3>
                  <p className="text-sm text-text-secondary">Collaborate with confidence, get paid reliably</p>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  { icon: PenTool, text: "Portfolio + rate cards per format (Reels, YouTube, Stories, Photography, etc.)" },
                  { icon: Target, text: "See brand reliability scores, payment history, and effort estimates before accepting" },
                  { icon: FileText, text: "Scope contracts with revision limits, usage rights, and digital signatures" },
                  { icon: IndianRupee, text: "Milestone escrow — ₹ auto-released on approval. No more invoice chasing." },
                  { icon: Flag, text: "Raise issues if something goes wrong. Mediation within 24h, auto-resolution in 7 days." },
                  { icon: BarChart3, text: "Actionable analytics: save rates, cost-per-engage, benchmark comparisons — not just follower counts" },
                ].map((item) => (
                  <li key={item.text} className="flex items-start gap-2.5 text-sm text-text-primary"><item.icon className="h-4 w-4 text-accent mt-0.5 shrink-0" />{item.text}</li>
                ))}
              </ul>
              <Link href="/register?role=CREATOR"><Button className="w-full gap-2">Join as Creator — It&apos;s Free <ArrowRight className="h-4 w-4" /></Button></Link>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
            <Card className="p-8 h-full border-[#00B8D9]/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-[12px] bg-[#00B8D9]/10 p-3"><Briefcase className="h-6 w-6 text-[#00B8D9]" /></div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">For Brands & Businesses</h3>
                  <p className="text-sm text-text-secondary">Find vetted creators, manage collabs, measure ROI</p>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  { icon: Search, text: "Filter 850+ creators by vertical, engagement, location, budget, and on-time delivery rate" },
                  { icon: BarChart3, text: "5-step campaign builder with objectives, deliverables, usage rights, and budget allocation" },
                  { icon: Shield, text: "Scope contracts prevent scope creep. Revision limits and digital signatures built in." },
                  { icon: Lock, text: "Escrow from day one. Pay only when milestones are approved. Dispute resolution if needed." },
                  { icon: TrendingUp, text: "Campaign analytics with cost-per-engage, save rates, creator comparisons, and benchmark data" },
                  { icon: MessageSquare, text: "Separated workspace: Chat for talk, Scope for contracts, Files for assets, Feedback for revisions" },
                ].map((item) => (
                  <li key={item.text} className="flex items-start gap-2.5 text-sm text-text-primary"><item.icon className="h-4 w-4 text-[#00B8D9] mt-0.5 shrink-0" />{item.text}</li>
                ))}
              </ul>
              <Link href="/register?role=BUSINESS"><Button variant="secondary" className="w-full gap-2">Start Free Trial <ArrowRight className="h-4 w-4" /></Button></Link>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   6. SOCIAL PROOF — Merged Showcase + Trust Strip (Problem 6)
   Combines testimonials, stats, and trust signals into one section
   ═══════════════════════════════════════════════════════════════════════ */
function SocialProofSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const successRate = useCountUp(98, isInView);
  const contractCount = useCountUp(2400, isInView, 2500);
  const creatorCount = useCountUp(850, isInView, 2200);

  return (
    <section ref={ref} className="py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <ParallaxSection offset={25}>
          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-accent mb-3"><Star className="h-4 w-4" /> Trusted by Creators & Brands</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">Real collaborations, real results</h2>
            <GradientUnderline inView={isInView} />
          </motion.div>
        </ParallaxSection>

        {/* Trust signals — merged from old Trust Strip */}
        <ParallaxSection offset={20}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="grid sm:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Lock, title: "Escrow-protected", desc: "Every rupee held in escrow. Auto-released on milestone approval. Dispute resolution built in.", stat: `${successRate}% success rate` },
            { icon: Shield, title: "Structured scope", desc: "Clear deliverables, revision limits, usage rights, digital signatures. No vague agreements.", stat: `${contractCount.toLocaleString()}+ contracts signed` },
            { icon: Award, title: "Reputation scoring", desc: "Based on response time, on-time delivery, and repeat collaboration rate. Not vanity metrics.", stat: `${creatorCount.toLocaleString()}+ verified creators` },
          ].map((item) => (
            <div key={item.title} className="rounded-[16px] bg-surface border border-border/50 p-6 text-center hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <div className="rounded-full bg-accent/10 p-3 inline-flex mb-3"><item.icon className="h-5 w-5 text-accent" /></div>
              <h4 className="font-semibold text-text-primary mb-1">{item.title}</h4>
              <p className="text-sm text-text-secondary mb-3">{item.desc}</p>
              <p className="text-sm font-bold text-accent font-mono">{item.stat}</p>
            </div>
          ))}
        </motion.div>
        </ParallaxSection>

        {/* Testimonials + campaign showcase */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {[
            { type: "quote" as const, text: "I used to spend 40% of my time chasing invoices. Now payments are automatic.", by: "Priya Sharma, Creator" },
            { type: "image" as const, label: "Spring Glow Campaign", creator: "Priya Sharma", img: photos.showcase[0] },
            { type: "stat" as const, value: "₹2.85L", label: "Avg. monthly creator earnings" },
            { type: "quote" as const, text: "Scope contracts eliminated every awkward conversation about revisions and deadlines.", by: "Bloom Skincare, Brand" },
            { type: "image" as const, label: "Trail Pack Launch", creator: "Alex Rivera", img: photos.showcase[1] },
            { type: "quote" as const, text: "The dispute resolution gave us confidence to work with new creators. We've never had to use it — but knowing it's there matters.", by: "NomadCo Marketing" },
            { type: "image" as const, label: "Winter Collection", creator: "Sarah Kim", img: photos.showcase[2] },
            { type: "stat" as const, value: "92%", label: "Average AI match accuracy" },
            { type: "image" as const, label: "Morning Rituals", creator: "Leah Nguyen", img: photos.showcase[3] },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.05 * i }} className="break-inside-avoid">
              {item.type === "image" && (
                <div className="group rounded-[14px] bg-surface border border-border/50 overflow-hidden hover:shadow-md transition-all cursor-pointer hover:-translate-y-0.5">
                  <img src={item.img} alt={item.label} className="w-full aspect-[4/3] object-cover" />
                  <div className="p-3"><p className="text-xs font-medium text-text-primary">{item.label}</p><p className="text-[10px] text-text-secondary mt-0.5">{item.creator}</p></div>
                </div>
              )}
              {item.type === "quote" && (
                <div className="rounded-[14px] bg-surface border border-border/50 p-5 hover:shadow-md transition-all">
                  <p className="text-sm text-text-primary leading-relaxed italic">&ldquo;{item.text}&rdquo;</p>
                  <p className="text-[11px] text-accent font-medium mt-3">— {item.by}</p>
                </div>
              )}
              {item.type === "stat" && (
                <div className="rounded-[14px] bg-gradient-to-br from-accent to-[#00B8D9] p-5 relative overflow-hidden">
                  {/* Decorative shine */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_50%)]" />
                  <p className="text-3xl font-bold text-white relative">{item.value}</p>
                  <p className="text-sm text-white/70 mt-1 relative">{item.label}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   7. PRICING — INR
   ═══════════════════════════════════════════════════════════════════════ */
function PricingSection() {
  const pricingRef = useRef(null);
  const isPricingInView = useInView(pricingRef, { once: true, margin: "-100px" });

  return (
    <section ref={pricingRef} id="pricing" className="py-24 bg-surface-elevated/30 relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <ParallaxSection offset={25}>
        <motion.div initial={{ opacity: 0 }} animate={isPricingInView ? { opacity: 1 } : {}}>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">Simple, transparent pricing</h2>
          <GradientUnderline inView={isPricingInView} />
          <p className="mt-4 text-lg text-text-secondary max-w-xl mx-auto">Free for creators. Affordable for businesses. No hidden fees.</p>
        </motion.div>
        </ParallaxSection>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isPricingInView ? { opacity: 1, y: 0 } : {}} className="grid sm:grid-cols-2 gap-6 mt-12 max-w-2xl mx-auto">
          <ParallaxSection offset={15}>
          <Card className="p-7 text-left">
            <div className="text-sm font-semibold text-accent mb-1">Creator</div>
            <div className="text-3xl font-bold text-text-primary">Free</div>
            <p className="text-sm text-text-secondary mt-1 mb-6">Everything you need — forever</p>
            <ul className="space-y-2.5 text-sm text-text-primary">
              {["Unlimited collaborations", "Portfolio & rate card", "Escrow payments", "Reputation scoring", "Separated workspace tabs", "Dispute resolution"].map((f) => (
                <li key={f} className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-success" />{f}</li>
              ))}
            </ul>
            <Link href="/register?role=CREATOR" className="mt-6 block"><Button variant="outline" className="w-full">Get Started Free</Button></Link>
          </Card>
          </ParallaxSection>

          <ParallaxSection offset={-15}>
          <Card className="p-7 text-left ring-2 ring-accent/20 relative overflow-hidden">
            <div className="absolute top-3 right-3 rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-bold text-accent">Popular</div>
            <div className="text-sm font-semibold text-accent mb-1">Business</div>
            <div className="text-3xl font-bold text-text-primary">₹3,999<span className="text-lg font-normal text-text-secondary">/mo</span></div>
            <p className="text-sm text-text-secondary mt-1 mb-6">Scale your creator partnerships</p>
            <ul className="space-y-2.5 text-sm text-text-primary">
              {["Everything in Creator", "AI-powered matching", "Campaign builder (5-step)", "Actionable analytics & ROI", "Creator discovery filters", "Priority support"].map((f) => (
                <li key={f} className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-success" />{f}</li>
              ))}
            </ul>
            <Link href="/register?role=BUSINESS" className="mt-6 block"><Button className="w-full glow-accent">Start 14-Day Free Trial</Button></Link>
          </Card>
          </ParallaxSection>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   CTA SECTION — Enhanced with sparkle particles and parallax scale
   ═══════════════════════════════════════════════════════════════════════ */
function CTASection() {
  const ctaRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: ctaRef, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.7, 1]);

  return (
    <motion.div ref={ctaRef} style={{ scale, opacity }}>
      <div className="relative rounded-[20px] bg-gradient-to-br from-accent to-[#00B8D9] p-12 overflow-hidden">
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.15),transparent_60%)]" />
        {/* Sparkle particles */}
        <div className="absolute inset-0 pointer-events-none">
          <SparkleParticle delay={0} x={-30} y={-20} />
          <SparkleParticle delay={0.5} x={25} y={-15} />
          <SparkleParticle delay={1.0} x={-15} y={10} />
          <SparkleParticle delay={1.5} x={35} y={5} />
          <SparkleParticle delay={2.0} x={-40} y={15} />
          <SparkleParticle delay={0.8} x={10} y={-25} />
          <SparkleParticle delay={1.8} x={-20} y={20} />
          <SparkleParticle delay={0.3} x={40} y={-10} />
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold tracking-tight text-white">Ready to collaborate — not just connect?</h2>
          <p className="mt-3 text-white/80 max-w-md mx-auto">Join 850+ creators and 320+ brands already synced across India.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
            <Link href="/register?role=CREATOR"><Button size="lg" className="gap-2 bg-white text-accent hover:bg-white/90 shadow-lg glow-accent"><PenTool className="h-4 w-4" /> Join as Creator — Free</Button></Link>
            <Link href="/register?role=BUSINESS"><Button size="lg" className="gap-2 bg-white/10 text-white hover:bg-white/20 border border-white/20"><Briefcase className="h-4 w-4" /> Start Business Trial</Button></Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN PAGE — Reduced from 10 to 7 sections (Problem 6)
   Removed: standalone Stats Bar (merged into hero), standalone Trust Strip
   (merged into Social Proof), standalone Showcase (merged into Social Proof)
   ═══════════════════════════════════════════════════════════════════════ */
export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 glass border-b border-border/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-1">
            <Image
              src={theme === "dark" ? "/synq logo night mode.png" : "/synq logo light mode.png"}
              alt="SYNQ"
              width={100}
              height={32}
              className="h-7 w-auto object-contain"
              priority
            />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#how-it-works" className="text-text-secondary hover:text-text-primary transition-colors">How It Works</a>
            <a href="#discover" className="text-text-secondary hover:text-text-primary transition-colors">Discover</a>
            <a href="#workspace" className="text-text-secondary hover:text-text-primary transition-colors">Workspace</a>
            <a href="#pricing" className="text-text-secondary hover:text-text-primary transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2 rounded-lg text-text-secondary hover:text-text-primary transition-colors" aria-label="Toggle theme">{theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>
            <Link href="/login"><Button variant="ghost" size="sm">Sign in</Button></Link>
            <Link href="/register"><Button size="sm">Get Started</Button></Link>
          </div>
        </div>
      </nav>

      {/* 7 sections with visual dividers and gradient orbs */}
      <HeroSection />
      <WaveDivider color="var(--accent)" opacity={0.06} />
      <div className="relative">
        <GradientOrb className="top-[-200px] left-[-100px] hidden lg:block" color1="#6C5CE7" color2="#00B8D9" size={500} speed={0.2} />
        <HowItWorksSection />
      </div>
      <CreatorDiscoverySection />
      <WaveDivider color="#00B8D9" opacity={0.05} flip />
      <div className="relative">
        <GradientOrb className="top-[100px] right-[-80px] hidden lg:block" color1="#00B8D9" color2="#6C5CE7" size={400} speed={0.3} />
        <CollaborationWorkspaceSection />
      </div>
      <DualAudienceSection />
      <WaveDivider color="var(--accent)" opacity={0.05} />
      <div className="relative">
        <GradientOrb className="bottom-[-100px] left-[10%] hidden lg:block" color1="#6C5CE7" color2="#00B8D9" size={350} speed={0.25} />
        <SocialProofSection />
      </div>
      <PricingSection />

      {/* Final CTA — Enhanced with sparkle particles and radial glow */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <CTASection />
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-surface-elevated/30">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-1 mb-4">
                <Image
                  src={theme === "dark" ? "/synq logo night mode.png" : "/synq logo light mode.png"}
                  alt="SYNQ"
                  width={90}
                  height={28}
                  className="h-6 w-auto object-contain"
                />
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">The collaboration workspace for creators and brands in India. From scope to payment.</p>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary text-sm mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="#how-it-works" className="hover:text-text-primary transition-colors">How It Works</a></li>
                <li><a href="#discover" className="hover:text-text-primary transition-colors">Discover Creators</a></li>
                <li><a href="#workspace" className="hover:text-text-primary transition-colors">Workspace</a></li>
                <li><a href="#pricing" className="hover:text-text-primary transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary text-sm mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><span className="hover:text-text-primary transition-colors cursor-pointer">About</span></li>
                <li><span className="hover:text-text-primary transition-colors cursor-pointer">Blog</span></li>
                <li><span className="hover:text-text-primary transition-colors cursor-pointer">Careers</span></li>
                <li><span className="hover:text-text-primary transition-colors cursor-pointer">Contact</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary text-sm mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><span className="hover:text-text-primary transition-colors cursor-pointer">Privacy Policy</span></li>
                <li><span className="hover:text-text-primary transition-colors cursor-pointer">Terms of Service</span></li>
                <li><span className="hover:text-text-primary transition-colors cursor-pointer">Cookie Policy</span></li>
                <li><span className="hover:text-text-primary transition-colors cursor-pointer">Security</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-text-secondary">&copy; 2026 SYNQ. All rights reserved.</p>
            <span className="text-xs text-text-secondary">Made in India for the creator economy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
