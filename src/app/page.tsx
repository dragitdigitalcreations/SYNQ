"use client";

import Link from "next/link";
import {
  motion,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Moon,
  Sun,
  BarChart3,
  FileText,
  CreditCard,
  Star,
  CheckCircle2,
  ChevronRight,
  Lock,
  Clock,
  TrendingUp,
  Zap,
  Send,
  Shield,
  Briefcase,
  Handshake,
  IndianRupee,
  Flag,
  Camera,
  Heart,
  Target,
  MessageSquare,
  FolderOpen,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { useRef, useState, useEffect } from "react";

/* ─── Animated Count-Up ─── */
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

/* ─── Morphing Gradient Blob ─── */
function MorphingBlob({ className }: { className?: string }) {
  return (
    <motion.div className={className}>
      <svg viewBox="0 0 800 800" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#00B8D9" stopOpacity="0.07" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.05" />
          </linearGradient>
          <filter id="blobBlur"><feGaussianBlur stdDeviation="40" /></filter>
        </defs>
        <motion.path
          fill="url(#blobGrad)"
          filter="url(#blobBlur)"
          animate={{
            d: [
              "M400,250 C500,200 650,250 650,400 C650,550 500,650 400,600 C300,550 150,500 150,400 C150,300 300,300 400,250Z",
              "M400,200 C550,180 700,300 680,420 C660,540 520,680 380,640 C240,600 120,480 140,360 C160,240 250,220 400,200Z",
              "M400,250 C500,200 650,250 650,400 C650,550 500,650 400,600 C300,550 150,500 150,400 C150,300 300,300 400,250Z",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  );
}

/* ─── Floating parallax element ─── */
function FloatingElement({
  children,
  className,
  speed = 0.5,
  delay = 0,
  drift = 8,
  duration = 5,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  delay?: number;
  drift?: number;
  duration?: number;
}) {
  const elRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: elRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * -80]);
  return (
    <motion.div
      ref={elRef}
      style={{ y }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1],
        translateY: [0, -drift, 0],
      }}
      transition={{
        opacity: { delay, duration: 0.6 },
        translateY: { delay: delay + 0.6, duration, repeat: Infinity, ease: "easeInOut" },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Parallax section wrapper ─── */
function ParallaxSection({
  children,
  className,
  offset = 40,
}: {
  children: React.ReactNode;
  className?: string;
  offset?: number;
}) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return (
    <motion.div ref={sectionRef} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Gradient Underline ─── */
function GradientUnderline({ inView }: { inView: boolean }) {
  return (
    <motion.div
      className="h-[3px] rounded-full bg-gradient-to-r from-accent via-[#00B8D9] to-accent mt-3 mx-auto max-w-[80px]"
      initial={{ scaleX: 0, opacity: 0 }}
      animate={inView ? { scaleX: 1, opacity: 1 } : {}}
      transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      style={{ transformOrigin: "left" }}
    />
  );
}

/* ─── Shared fade-up ─── */
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

/* ─── Unsplash images ─── */
const img = (seed: string, w = 400, h = 400) =>
  `https://images.unsplash.com/photo-${seed}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const photos = {
  creators: [
    img("1494790108377-be9c29b29330", 200, 200),
    img("1507003211169-0a1dd7228f2d", 200, 200),
    img("1539571696357-5a69c17a67c6", 200, 200),
    img("1534528741775-53994a69daeb", 200, 200),
  ],
  portfolios: [
    img("1611162617474-5b21e879e113", 400, 300),
    img("1505740420928-5e560c06d30e", 400, 300),
    img("1469474968028-56623f02e42e", 400, 300),
    img("1558171813-4c2f0da0ab0e", 400, 300),
    img("1550439062-609e1531270e", 400, 300),
  ],
};

/* ═══════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════ */
function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface-glass backdrop-blur-xl shadow-sm border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-8">
        <Link href="/" className="flex-shrink-0">
          <Image
            src={theme === "dark" ? "/synq logo night mode.png" : "/synq logo light mode.png"}
            alt="SYNQ"
            width={90}
            height={28}
            className="h-7 w-auto object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-text-secondary flex-1">
          <a href="#how-it-works" className="hover:text-text-primary transition-colors">
            How it works
          </a>
          <a href="#features" className="hover:text-text-primary transition-colors">
            Features
          </a>
          <a href="#pricing" className="hover:text-text-primary transition-colors">
            Pricing
          </a>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-all"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link
            href="/login"
            className="hidden md:block text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Sign in
          </Link>
          <Link href="/register">
            <Button size="sm" className="glow-accent text-sm">
              Start for Free
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO — Clear value prop · 3 floating elements · workspace preview
   ═══════════════════════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveTab((p) => (p + 1) % 3), 4000);
    return () => clearInterval(t);
  }, []);

  const tabs = [
    { label: "Workspace", icon: Handshake },
    { label: "Scope", icon: FileText },
    { label: "Payments", icon: CreditCard },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden min-h-[calc(100vh-64px)] flex items-center"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.04] via-transparent to-transparent" />
        <MorphingBlob className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[900px] h-[900px]" />
        <div className="absolute top-1/4 right-[5%] w-[250px] h-[250px] rounded-full bg-[#00B8D9]/[0.05] blur-[80px]" />
      </div>

      {/* 3 focused floating elements */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <FloatingElement
          className="absolute top-[16%] left-[4%]"
          speed={0.3}
          delay={0.6}
          drift={8}
          duration={6}
        >
          <div className="rounded-xl bg-surface/80 backdrop-blur-sm border border-border/30 px-3 py-2 shadow-lg">
            <div className="flex items-center gap-2">
              <Heart className="h-3.5 w-3.5 text-error" />
              <span className="text-[11px] font-semibold text-text-primary">4.8% Engagement</span>
            </div>
            <p className="text-[9px] text-text-secondary mt-0.5">Above industry avg</p>
          </div>
        </FloatingElement>

        <FloatingElement
          className="absolute top-[55%] left-[3%]"
          speed={0.5}
          delay={0.9}
          drift={7}
          duration={7}
        >
          <div className="rounded-full bg-success/10 border border-success/20 px-3 py-1.5 shadow-md">
            <span className="text-[11px] font-bold text-success flex items-center gap-1">
              <IndianRupee className="h-3 w-3" />
              12K released
            </span>
          </div>
        </FloatingElement>

        <FloatingElement
          className="absolute top-[36%] right-[3%]"
          speed={0.4}
          delay={1.2}
          drift={9}
          duration={5.5}
        >
          <div className="rounded-xl bg-surface/80 backdrop-blur-sm border border-border/30 px-3 py-2 shadow-lg">
            <div className="flex items-center gap-2">
              <Target className="h-3.5 w-3.5 text-accent" />
              <span className="text-[11px] font-semibold text-text-primary">92% match</span>
            </div>
            <p className="text-[9px] text-text-secondary">AI-scored</p>
          </div>
        </FloatingElement>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <motion.div {...fadeUp}>
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/[0.08] border border-accent/[0.15] px-3.5 py-1.5 text-sm font-medium text-accent mb-8">
                <Zap className="h-3.5 w-3.5" />
                Built for the Indian creator economy
              </div>
            </motion.div>

            <motion.h1
              {...fadeUp}
              transition={{ delay: 0.08, duration: 0.5 }}
              className="text-[52px] sm:text-[64px] font-bold tracking-[-0.03em] leading-[1.05] text-text-primary"
            >
              Creator-brand
              <br />
              collabs that{" "}
              <span className="bg-gradient-to-r from-accent to-[#00B8D9] bg-clip-text text-transparent">
                actually work.
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ delay: 0.16, duration: 0.5 }}
              className="mt-6 text-[18px] text-text-secondary leading-[1.7] max-w-md"
            >
              Scope contracts, escrow payments, feedback loops, and dispute
              resolution — in one structured workspace. Stop managing collabs
              with DMs.
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ delay: 0.24 }}
              className="flex flex-col sm:flex-row items-start gap-3 mt-10"
            >
              <Link href="/register?role=CREATOR">
                <Button size="lg" className="gap-2 text-[15px] px-7 glow-accent h-12">
                  Start for Free <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/register?role=BUSINESS">
                <Button variant="outline" size="lg" className="gap-2 text-[15px] h-12">
                  <Briefcase className="h-4 w-4" /> I&apos;m a Brand
                </Button>
              </Link>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ delay: 0.32 }}
              className="flex flex-wrap items-center gap-5 mt-8 text-[13px] text-text-secondary"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" /> Free for creators
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-success" /> Escrow-protected
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-success" /> Dispute resolution
              </span>
            </motion.div>
          </div>

          {/* Right: Workspace preview */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-[20px] bg-surface shadow-2xl overflow-hidden group border border-border/30">
              {/* Animated gradient border */}
              <div
                className="absolute -inset-[1px] rounded-[20px] bg-gradient-to-r from-accent via-[#00B8D9] to-accent opacity-15 group-hover:opacity-30 transition-opacity duration-500"
                style={{ backgroundSize: "200% 100%", animation: "shimmer 4s linear infinite" }}
              />

              {/* Window chrome */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50 bg-surface-elevated/30">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-error/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-warning/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-success/50" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="flex rounded-lg bg-surface-elevated/60 p-0.5 gap-0.5">
                    {tabs.map((tab, i) => (
                      <button
                        key={tab.label}
                        onClick={() => setActiveTab(i)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-medium transition-all ${
                          activeTab === i
                            ? "bg-surface text-accent shadow-sm"
                            : "text-text-secondary hover:text-text-primary"
                        }`}
                      >
                        <tab.icon className="h-3 w-3" /> {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tab content */}
              <div className="p-5 min-h-[300px]">
                <AnimatePresence mode="wait">
                  {/* Workspace */}
                  {activeTab === 0 && (
                    <motion.div
                      key="ws"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="text-sm font-semibold text-text-primary">
                            Bloom Skincare × Priya Sharma
                          </h4>
                          <p className="text-[10px] text-text-secondary">
                            Spring Glow · 14-day timeline
                          </p>
                        </div>
                        <div className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success">
                          Active
                        </div>
                      </div>
                      <div className="flex gap-1 mb-3 overflow-x-auto scrollbar-hide">
                        {["Scope","Files","Chat","Feedback","Payments","Analytics"].map((t, i) => (
                          <span
                            key={t}
                            className={`rounded-md px-2.5 py-1 text-[9px] font-medium whitespace-nowrap ${
                              i === 0
                                ? "bg-accent/10 text-accent"
                                : "bg-surface-elevated text-text-secondary"
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      {[
                        { type: "Instagram Reels × 3", status: "1 approved, 1 in review", payment: "₹12K released", progress: 66, c: "text-accent" },
                        { type: "Story Set × 2", status: "Drafts due Mar 15", payment: "₹10K in escrow", progress: 20, c: "text-warning" },
                        { type: "Photography × 1", status: "Not started", payment: "₹8K in escrow", progress: 0, c: "text-text-secondary" },
                      ].map((d) => (
                        <div
                          key={d.type}
                          className="flex items-center gap-3 rounded-xl bg-surface-elevated/30 border border-border/20 p-2.5 mb-2"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-medium text-text-primary">{d.type}</p>
                            <p className={`text-[9px] ${d.c}`}>{d.status}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-[10px] font-medium text-text-primary">{d.payment}</p>
                            <div className="h-1 w-14 rounded-full bg-surface-elevated overflow-hidden mt-1">
                              <div
                                className="h-full rounded-full bg-accent"
                                style={{ width: `${d.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="text-[10px] flex justify-between text-text-secondary mt-2">
                        <span>Total: ₹54,000</span>
                        <span className="text-success font-medium">₹12K released · ₹42K secured</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Scope */}
                  {activeTab === 1 && (
                    <motion.div
                      key="sc"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-text-primary">Scope Contract</h4>
                        <div className="rounded-full bg-warning/10 px-2 py-0.5 text-[10px] font-medium text-warning">
                          Pending
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {[
                          { label: "Reliability", value: "98%", c: "text-success", bg: "bg-success/[0.06]" },
                          { label: "Est. Effort", value: "~18h", c: "text-accent", bg: "bg-accent/[0.06]" },
                          { label: "Reach", value: "~45K", c: "text-[#00B8D9]", bg: "bg-[#00B8D9]/[0.06]" },
                        ].map((s) => (
                          <div key={s.label} className={`rounded-lg ${s.bg} p-2 text-center`}>
                            <p className="text-[8px] text-text-secondary">{s.label}</p>
                            <p className={`text-[11px] font-bold ${s.c}`}>{s.value}</p>
                          </div>
                        ))}
                      </div>
                      <div className="rounded-xl bg-surface-elevated/30 p-3 space-y-1.5">
                        {[["Reels × 3","₹36,000"],["Stories × 2","₹10,000"],["Photography × 1","₹8,000"]].map(([t, p]) => (
                          <div
                            key={t}
                            className="flex justify-between text-[11px] py-1 border-b border-border/20 last:border-0"
                          >
                            <span className="text-text-primary">{t}</span>
                            <span className="font-medium text-text-primary">{p}</span>
                          </div>
                        ))}
                        <div className="flex justify-between font-semibold text-[11px] pt-1">
                          <span className="text-text-secondary">Total</span>
                          <span className="text-accent">₹54,000</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-[10px] text-success">
                        <Lock className="h-3 w-3" /> ₹54,000 held in escrow upon signing
                      </div>
                      <div className="flex gap-2 mt-3">
                        <div className="flex-1 rounded-lg bg-accent py-2 text-center text-[11px] font-semibold text-white cursor-pointer">
                          Accept & Sign
                        </div>
                        <div className="flex-1 rounded-lg bg-surface-elevated py-2 text-center text-[11px] text-text-secondary cursor-pointer">
                          Negotiate
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Payments */}
                  {activeTab === 2 && (
                    <motion.div
                      key="pay"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-text-primary">Milestone Payments</h4>
                        <div className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
                          ₹12K released
                        </div>
                      </div>
                      {[
                        { name: "Reel #1 approved", amount: "₹12,000", status: "Released", sc: "bg-success/10 text-success" },
                        { name: "Reel #2 in review", amount: "₹12,000", status: "In Escrow", sc: "bg-warning/10 text-warning" },
                        { name: "Reel #3 + Stories + Photo", amount: "₹30,000", status: "In Escrow", sc: "bg-warning/10 text-warning" },
                      ].map((p) => (
                        <div
                          key={p.name}
                          className="flex items-center justify-between py-2.5 border-b border-border/20 last:border-0"
                        >
                          <p className="text-[11px] text-text-primary">{p.name}</p>
                          <div className="flex items-center gap-2">
                            <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${p.sc}`}>
                              {p.status}
                            </span>
                            <span className="text-[11px] font-medium text-text-primary">{p.amount}</span>
                          </div>
                        </div>
                      ))}
                      <div className="mt-3 rounded-xl bg-error/[0.04] border border-error/10 p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Flag className="h-3.5 w-3.5 text-error" />
                          <span className="text-[11px] font-semibold text-text-primary">
                            Dispute Resolution
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-text-secondary">
                          <span>Raise Issue</span>
                          <ChevronRight className="h-2.5 w-2.5" />
                          <span>24h Mediation</span>
                          <ChevronRight className="h-2.5 w-2.5" />
                          <span>Resolution</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Tab dots */}
              <div className="flex justify-center gap-1.5 pb-3">
                {tabs.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      activeTab === i ? "w-6 bg-accent" : "w-1.5 bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   TRUST BAR — 4 stats for instant credibility
   ═══════════════════════════════════════════════════════════ */
function TrustBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const collabs = useCountUp(2400, isInView);
  const creators = useCountUp(850, isInView);
  const paymentRate = useCountUp(98, isInView);

  const stats = [
    { value: `${collabs.toLocaleString()}+`, label: "Collabs completed", icon: Handshake },
    { value: `${creators}+`, label: "Verified creators", icon: Camera },
    { value: `${paymentRate}%`, label: "On-time payment rate", icon: Shield },
    { value: "₹2.85L", label: "Avg annual creator earnings", icon: IndianRupee },
  ];

  return (
    <div ref={ref} className="border-y border-border/50 bg-surface-elevated/20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex flex-col items-center md:items-start gap-1"
            >
              <s.icon className="h-4 w-4 text-accent mb-0.5" />
              <div className="text-2xl font-bold text-text-primary tracking-tight">{s.value}</div>
              <div className="text-[13px] text-text-secondary">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HOW IT WORKS — 3 steps with interactive product demo
   ═══════════════════════════════════════════════════════════ */
const steps = [
  {
    number: "01",
    title: "Build your profile",
    description:
      "Creators set rate cards per format, connect Instagram/YouTube, and define what they won't work with — brands see it all upfront. Brands add campaign goals and ideal creator criteria.",
    creatorNote: "Set rates (Reels ₹12K, YouTube ₹25K, Stories ₹5K) and upload portfolio",
    brandNote: "Define campaign objectives and creator criteria before the first message",
    demo: (isInView: boolean) => (
      <div className="space-y-3">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={photos.creators[0]}
            alt=""
            className="h-12 w-12 rounded-full object-cover border-2 border-accent/20"
          />
          <div>
            <p className="text-xs font-semibold text-text-primary">Priya Sharma</p>
            <p className="text-[10px] text-text-secondary">Mumbai · Fashion, Lifestyle</p>
          </div>
          <div className="ml-auto rounded-full bg-success/10 px-2 py-0.5 text-[9px] font-medium text-success">
            Open
          </div>
        </div>
        <div className="space-y-1.5">
          {[["Reels","₹12,000"],["YouTube Video","₹25,000"],["Stories","₹5,000"],["Photography","₹8,000"]].map(([f, p]) => (
            <div key={f} className="flex justify-between text-[11px]">
              <span className="text-text-secondary">{f}</span>
              <span className="font-medium text-text-primary">{p}</span>
            </div>
          ))}
        </div>
        <div className="h-1.5 w-full rounded-full bg-surface-elevated overflow-hidden mt-2">
          <motion.div
            className="h-full rounded-full bg-accent"
            initial={{ width: 0 }}
            animate={isInView ? { width: "92%" } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>
        <p className="text-[9px] text-text-secondary">Profile completeness: 92%</p>
      </div>
    ),
  },
  {
    number: "02",
    title: "Match & sign a scope contract",
    description:
      "AI scores every pair on audience overlap, content alignment, budget fit, and behavioral reliability — with transparent reasoning. Contracts lock deliverables, revision limits, and payment milestones before work starts.",
    creatorNote: "See brand reliability (98% on-time pay), estimated effort, and expected reach before accepting",
    brandNote: "Scope contracts prevent scope creep. Everything locked in writing.",
    demo: (isInView: boolean) => (
      <div className="space-y-2.5">
        <div className="text-[11px] font-semibold text-text-primary mb-2">Top Matches for Priya</div>
        {[
          { name: "Bloom Skincare", industry: "Beauty", score: 92, reliability: "98% on-time pay", photo: photos.portfolios[0] },
          { name: "TrailCo Outdoor", industry: "Travel", score: 87, reliability: "95% on-time pay", photo: photos.portfolios[2] },
          { name: "NomadCo Coffee", industry: "Food", score: 81, reliability: "91% on-time pay", photo: photos.portfolios[4] },
        ].map((m, i) => (
          <motion.div
            key={m.name}
            className="flex items-center gap-2.5 rounded-xl bg-surface-elevated/50 p-2.5"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.1 }}
          >
            <img src={m.photo} alt="" className="h-8 w-8 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-medium text-text-primary">{m.name}</div>
              <div className="text-[9px] text-text-secondary">{m.industry}</div>
              <div className="text-[9px] text-success">{m.reliability}</div>
            </div>
            <div className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">
              {m.score}%
            </div>
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    number: "03",
    title: "Collaborate & get paid",
    description:
      "A dedicated workspace with separated tabs — Chat, Scope, Files, Feedback, Payments, Analytics. Nothing mixed. Milestone payments auto-release on approval. Dispute resolution built in if anything goes wrong.",
    creatorNote: "Submit → feedback → iterate → milestone approved → ₹ auto-released",
    brandNote: "Review drafts, approve milestones. Analytics show real ROI, not vanity metrics.",
    demo: (_: boolean) => (
      <div className="space-y-2.5">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide mb-2">
          {["Scope","Files","Chat","Feedback","Payments","Analytics"].map((t, i) => (
            <span
              key={t}
              className={`rounded-md px-2 py-1 text-[9px] font-medium whitespace-nowrap ${
                i === 4 ? "bg-accent/10 text-accent" : "bg-surface-elevated text-text-secondary"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
        {[
          { event: "Reel #1 approved", amount: "₹12,000", ok: true },
          { event: "Reel #2 in review", amount: "₹12,000", ok: false },
          { event: "Final delivery", amount: "₹30,000", ok: false },
        ].map((e) => (
          <div key={e.event} className="flex items-center gap-2.5 py-1.5">
            <div
              className={`h-5 w-5 rounded-full flex items-center justify-center ${
                e.ok ? "bg-success" : "bg-surface-elevated border border-border"
              }`}
            >
              {e.ok ? (
                <CheckCircle2 className="h-2.5 w-2.5 text-white" />
              ) : (
                <Clock className="h-2.5 w-2.5 text-text-secondary" />
              )}
            </div>
            <div className="flex-1 text-[10px] text-text-primary">{e.event}</div>
            <div className="text-[10px] font-medium text-text-primary">{e.amount}</div>
          </div>
        ))}
        <div className="rounded-xl bg-success/[0.06] border border-success/10 p-2.5 mt-2">
          <p className="text-[10px] font-medium text-success">
            Milestone approved → ₹12,000 auto-released
          </p>
          <p className="text-[9px] text-text-secondary mt-0.5">
            Funds go directly to your account within 24h
          </p>
        </div>
      </div>
    ),
  },
];

function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isInView) return;
    const t = setInterval(() => setActiveStep((p) => (p + 1) % 3), 7000);
    return () => clearInterval(t);
  }, [isInView]);

  return (
    <section ref={ref} id="how-it-works" className="py-24 relative">
      <div className="absolute inset-0 dot-grid opacity-[0.03] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-accent mb-2">How it works</p>
          <h2 className="text-3xl sm:text-[40px] font-bold tracking-tight text-text-primary">
            From brief to payment in 3 steps
          </h2>
          <GradientUnderline inView={isInView} />
          <p className="mt-4 text-text-secondary max-w-md mx-auto text-[16px]">
            Every step is real product — not a feature list.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Steps */}
          <div className="space-y-2 relative">
            <div className="absolute left-[21px] top-8 bottom-8 w-px bg-gradient-to-b from-accent/40 via-accent/10 to-transparent hidden md:block" />
            {steps.map((step, i) => (
              <motion.button
                key={step.number}
                onClick={() => setActiveStep(i)}
                className={`w-full text-left rounded-2xl p-5 transition-all duration-300 ${
                  activeStep === i
                    ? "bg-surface shadow-md border border-border/50"
                    : "hover:bg-surface-elevated/40"
                }`}
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`text-2xl font-bold font-mono shrink-0 transition-colors ${
                      activeStep === i ? "text-accent" : "text-text-secondary/25"
                    }`}
                  >
                    {step.number}
                  </span>
                  <div className="flex-1">
                    <h4
                      className={`font-semibold text-[15px] transition-colors ${
                        activeStep === i ? "text-text-primary" : "text-text-secondary"
                      }`}
                    >
                      {step.title}
                    </h4>
                    <AnimatePresence mode="wait">
                      {activeStep === i && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <p className="text-[13px] text-text-secondary mt-2 leading-relaxed">
                            {step.description}
                          </p>
                          <div className="mt-3 grid grid-cols-2 gap-2">
                            <div className="rounded-lg bg-accent/[0.06] p-2.5">
                              <p className="text-[10px] font-semibold text-accent mb-1">For Creators</p>
                              <p className="text-[10px] text-text-secondary leading-relaxed">
                                {step.creatorNote}
                              </p>
                            </div>
                            <div className="rounded-lg bg-[#00B8D9]/[0.06] p-2.5">
                              <p className="text-[10px] font-semibold text-[#00B8D9] mb-1">For Brands</p>
                              <p className="text-[10px] text-text-secondary leading-relaxed">
                                {step.brandNote}
                              </p>
                            </div>
                          </div>
                          <div className="h-0.5 w-full rounded-full bg-surface-elevated mt-3 overflow-hidden">
                            <motion.div
                              className="h-full rounded-full bg-accent"
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 7, ease: "linear" }}
                              key={`pg-${activeStep}`}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Demo panel */}
          <ParallaxSection offset={30}>
            <motion.div
              className="rounded-2xl bg-surface shadow-lg border border-border/50 p-5 min-h-[380px] flex flex-col sticky top-24"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/50">
                <div className="flex gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-error/50" />
                  <div className="h-2 w-2 rounded-full bg-warning/50" />
                  <div className="h-2 w-2 rounded-full bg-success/50" />
                </div>
                <div className="flex-1 text-center text-[10px] text-text-secondary font-medium">
                  {steps[activeStep].title}
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="flex-1"
                >
                  {steps[activeStep].demo(isInView)}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </ParallaxSection>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FEATURES — 3 core differentiators, product-specific
   ═══════════════════════════════════════════════════════════ */
function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const features = [
    {
      icon: FileText,
      title: "Scope contracts that protect both sides",
      description:
        "Deliverables, revision limits, usage rights, and timeline locked in writing before work starts. No more 'you said X' disputes.",
      highlight: "Prevents 90% of scope disputes",
    },
    {
      icon: CreditCard,
      title: "Escrow-protected milestone payments",
      description:
        "Funds are held securely before work starts, then released automatically when milestones are approved. Creators never chase invoices.",
      highlight: "₹0 unpaid invoices on SYNQ",
    },
    {
      icon: BarChart3,
      title: "Actionable analytics, not vanity metrics",
      description:
        "Save rates vs benchmarks, cost-per-engagement, content format performance. \"Reels get 2.3× more saves — consider adding one more.\"",
      highlight: "AI-powered campaign insights",
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
          <p className="text-sm font-medium text-accent mb-2">Why SYNQ</p>
          <h2 className="text-3xl sm:text-[40px] font-bold tracking-tight text-text-primary">
            Built around how collabs break
          </h2>
          <GradientUnderline inView={isInView} />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="rounded-2xl bg-surface border border-border/50 p-6 hover:border-accent/20 hover:shadow-md transition-all duration-300 group"
            >
              <div className="h-10 w-10 rounded-xl bg-accent/[0.08] flex items-center justify-center mb-4 group-hover:bg-accent/[0.14] transition-colors">
                <f.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="text-[16px] font-semibold text-text-primary mb-2 leading-snug">
                {f.title}
              </h3>
              <p className="text-[14px] text-text-secondary leading-relaxed">{f.description}</p>
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent/[0.08] px-3 py-1 text-[12px] font-medium text-accent">
                <Zap className="h-3 w-3" /> {f.highlight}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mid-page CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/register">
            <Button size="lg" className="gap-2 glow-accent text-[15px] h-12 px-8">
              Start Collaborating <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   DUAL AUDIENCE — For Creators / For Brands
   ═══════════════════════════════════════════════════════════ */
function DualAudienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-[40px] font-bold tracking-tight text-text-primary">
            Built for both sides of every collab
          </h2>
          <GradientUnderline inView={isInView} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Creators */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-surface border border-accent/10 p-8"
          >
            <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
              <Camera className="h-5 w-5 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">For Creators</h3>
            <p className="text-[14px] text-text-secondary mb-6">
              Stop chasing payments and managing 10 different DMs. Your work, protected.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Escrow payments — never chase an invoice again",
                "Decision signals — see brand reliability before accepting",
                "Structured feedback — revisions tracked, not lost in chat",
                "Actionable analytics — save rates and format benchmarks",
                "Dispute resolution — raise an issue if anything goes wrong",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[14px] text-text-secondary">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/register?role=CREATOR">
              <Button className="w-full gap-2 glow-accent">
                Join as Creator <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Brands */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl bg-surface border border-[#00B8D9]/10 p-8"
          >
            <div className="h-10 w-10 rounded-xl bg-[#00B8D9]/10 flex items-center justify-center mb-6">
              <Briefcase className="h-5 w-5 text-[#00B8D9]" />
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">For Brands</h3>
            <p className="text-[14px] text-text-secondary mb-6">
              Find the right creators. Run structured campaigns. Measure actual ROI.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "AI matching — scored on audience overlap, not just follower count",
                "Campaign builder — deliverables, timelines, budget in one place",
                "Creator comparison — reliability scores, response time, repeat rate",
                "Structured feedback — comments attached to the right deliverable",
                "ROI analytics — cost-per-engage vs category benchmarks",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[14px] text-text-secondary">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/register?role=BUSINESS">
              <Button
                variant="outline"
                className="w-full gap-2 border-[#00B8D9]/30 hover:border-[#00B8D9]/60 hover:text-[#00B8D9]"
              >
                Join as a Brand <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SOCIAL PROOF — Real testimonials with specific outcomes
   ═══════════════════════════════════════════════════════════ */
const testimonials = [
  {
    quote:
      "Before SYNQ, I'd spend 2 hours chasing a brand for a revision note buried in their DMs. Now my entire collaboration — scope, feedback, payment — is in one place.",
    author: "Priya Sharma",
    role: "Lifestyle Creator · Mumbai",
    photo: photos.creators[0],
    stat: "3.2× faster campaign delivery",
  },
  {
    quote:
      "We ran 12 creator campaigns last quarter. SYNQ's analytics told us Reels had 2.4× better save rates than stories. We doubled down and hit our GMV target 3 weeks early.",
    author: "Rahul Mehta",
    role: "Brand Manager · Bloom Skincare",
    photo: photos.creators[1],
    stat: "₹4.2L saved in influencer spend",
  },
  {
    quote:
      "A brand tried to change scope mid-project. The contract I signed on SYNQ was the proof I needed. Dispute settled in 48 hours. Never going back to DM-based collabs.",
    author: "Alex Rivera",
    role: "Travel Creator · Delhi NCR",
    photo: photos.creators[2],
    stat: "Dispute resolved in 48h",
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
          <p className="text-sm font-medium text-accent mb-2">Real results</p>
          <h2 className="text-3xl sm:text-[40px] font-bold tracking-tight text-text-primary">
            Trusted by creators and brands
          </h2>
          <GradientUnderline inView={isInView} />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="rounded-2xl bg-surface border border-border/50 p-6 flex flex-col gap-4"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-warning text-warning" />
                ))}
              </div>
              <p className="text-[14px] text-text-secondary leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-success/[0.08] px-3 py-1 text-[12px] font-medium text-success w-fit">
                <TrendingUp className="h-3 w-3" /> {t.stat}
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                <img
                  src={t.photo}
                  alt={t.author}
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div>
                  <p className="text-[13px] font-medium text-text-primary">{t.author}</p>
                  <p className="text-[12px] text-text-secondary">{t.role}</p>
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
   PRICING — Free for creators · ₹3,999/mo for brands
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
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-accent mb-2">Pricing</p>
          <h2 className="text-3xl sm:text-[40px] font-bold tracking-tight text-text-primary">
            Free for creators. Powerful for brands.
          </h2>
          <GradientUnderline inView={isInView} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Creator */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="rounded-2xl bg-surface border border-border/50 p-8"
          >
            <div className="mb-6">
              <p className="text-sm font-medium text-text-secondary mb-1">For Creators</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-text-primary">Free</span>
                <span className="text-text-secondary">forever</span>
              </div>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                "Unlimited collaborations",
                "Scope contracts & e-signature",
                "Escrow-protected payments",
                "Dispute resolution",
                "Performance analytics",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-[14px] text-text-secondary">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <Link href="/register?role=CREATOR">
              <Button variant="outline" className="w-full h-11">
                Get Started Free
              </Button>
            </Link>
          </motion.div>

          {/* Business */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl bg-surface border-2 border-accent/30 p-8 relative"
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-[#00B8D9] px-4 py-1 text-xs font-semibold text-white">
              Most Popular
            </div>
            <div className="mb-6">
              <p className="text-sm font-medium text-text-secondary mb-1">For Brands</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-text-primary">₹3,999</span>
                <span className="text-text-secondary">/month</span>
              </div>
              <p className="text-[13px] text-text-secondary mt-1">
                14-day free trial · No credit card required
              </p>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                "Everything in Creator",
                "AI creator matching (92% accuracy)",
                "Campaign builder & management",
                "Advanced analytics & ROI tracking",
                "Creator comparison reports",
                "Priority support",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-[14px] text-text-secondary">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <Link href="/register?role=BUSINESS">
              <Button className="w-full h-11 gap-2 glow-accent">
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
   FINAL CTA — Single dominant call to action
   ═══════════════════════════════════════════════════════════ */
function FinalCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #6C5CE7 0%, #00B8D9 100%)" }}
        >
          <div className="relative">
            <h2 className="text-3xl sm:text-[44px] font-bold text-white tracking-tight leading-[1.1] mb-4">
              Ready to collaborate
              <br />
              without the chaos?
            </h2>
            <p className="text-white/75 text-[17px] mb-10 max-w-md mx-auto">
              Join 850+ creators and brands already running structured collabs on SYNQ.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/register?role=CREATOR">
                <Button
                  size="lg"
                  className="bg-white text-accent hover:bg-white/90 gap-2 text-[15px] h-12 px-8 font-semibold shadow-lg"
                >
                  Start for Free <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/register?role=BUSINESS">
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-white/90 hover:text-white hover:bg-white/10 gap-2 text-[15px] h-12"
                >
                  <Briefcase className="h-4 w-4" /> I&apos;m a Brand
                </Button>
              </Link>
            </div>
            <p className="text-white/50 text-[13px] mt-6">
              Free for creators · 14-day trial for brands · No credit card
            </p>
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
    <footer className="border-t border-border/50 bg-surface-elevated/10">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Image
              src={theme === "dark" ? "/synq logo night mode.png" : "/synq logo light mode.png"}
              alt="SYNQ"
              width={80}
              height={26}
              className="h-6 w-auto object-contain mb-3"
            />
            <p className="text-[13px] text-text-secondary leading-relaxed max-w-[200px]">
              Structured creator-brand collaborations. Built for India.
            </p>
          </div>
          {[
            {
              title: "Product",
              links: [["How it works", "#how-it-works"], ["Features", "#features"], ["Pricing", "#pricing"]],
            },
            {
              title: "For You",
              links: [["I'm a Creator", "/register?role=CREATOR"], ["I'm a Brand", "/register?role=BUSINESS"], ["Sign In", "/login"]],
            },
            {
              title: "Legal",
              links: [["Privacy", "#"], ["Terms", "#"], ["Security", "#"]],
            },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-[13px] font-semibold text-text-primary mb-3">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-[13px] text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-8 border-t border-border/30">
          <p className="text-[12px] text-text-secondary">© 2025 SYNQ. All rights reserved.</p>
          <p className="text-[12px] text-text-secondary">Made for the Indian creator economy 🇮🇳</p>
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
      <DualAudienceSection />
      <SocialProofSection />
      <PricingSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
