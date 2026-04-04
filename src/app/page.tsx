"use client";

import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Moon, Sun, Star, CheckCircle2, Shield, Bell,
  TrendingUp, IndianRupee, Lock, ChevronRight,
  MessageSquare, FileText, CreditCard, Flag, Camera, Send,
  Briefcase, Zap, CheckCheck, RefreshCw, Circle,
  XCircle, AlertTriangle, Sparkles, BarChart3, User,
  Clock, Minus, Play, Users, Timer, Wallet, ArrowDown,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { useRef, useState, useEffect } from "react";

/* ─── Count-up ─── */
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

/* ─── CSS-only avatar initials ─── */
function CreatorAvatar({
  name, className = "", size = "md",
}: { name: string; className?: string; size?: "sm" | "md" | "lg" }) {
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
  const sz = size === "sm" ? "h-7 w-7 text-[10px]" : size === "lg" ? "h-12 w-12 text-[16px]" : "h-9 w-9 text-[12px]";
  return (
    <div className={`rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center font-bold text-white shrink-0 ${sz} ${className}`}>
      {initials}
    </div>
  );
}

/* ─── CSS-only portfolio tile ─── */
function PortfolioTile({ niche, className = "" }: { niche: string; className?: string }) {
  const configs: Record<string, { gradient: string; label: string }> = {
    "Fashion & Lifestyle": { gradient: "from-pink-500/20 via-purple-500/10 to-accent/20", label: "Fashion" },
    "Tech & Gadgets": { gradient: "from-[#00B8D9]/20 via-accent/10 to-blue-500/20", label: "Tech" },
    "Fitness & Wellness": { gradient: "from-green-500/20 via-emerald-500/10 to-teal-500/20", label: "Fitness" },
    "Travel & Adventure": { gradient: "from-orange-500/20 via-amber-500/10 to-yellow-500/20", label: "Travel" },
  };
  const c = configs[niche] ?? { gradient: "from-accent/20 to-[#00B8D9]/20", label: niche };
  return (
    <div className={`bg-gradient-to-br ${c.gradient} flex items-end p-3 rounded-xl border border-border/20 ${className}`}>
      <span className="text-[10px] font-medium text-text-secondary">{c.label}</span>
    </div>
  );
}

/* ─── Skeleton loading block ─── */
function Sk({ className }: { className: string }) {
  return <div className={`rounded-lg bg-surface-elevated/70 animate-pulse ${className}`} />;
}

/* ─── Lazy-loaded creator photo with shimmer placeholder ─── */
function CreatorImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`absolute inset-0 bg-gradient-to-br from-surface-elevated to-accent/[0.06] transition-opacity duration-500 ${loaded ? "opacity-0 pointer-events-none" : "opacity-100 animate-pulse"}`}
      />
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
        className={`object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />
    </div>
  );
}

/* ─── Trust signal with hover tooltip ─── */
function TrustSignal({
  icon: Icon, label, tooltip, className = "",
}: {
  icon: React.ElementType; label: string; tooltip: string; className?: string;
}) {
  return (
    <span className={`group relative inline-flex items-center gap-1.5 cursor-default ${className}`}>
      <Icon
        className="h-3.5 w-3.5 transition-all duration-200 group-hover:scale-110 group-hover:text-emerald-500"
        aria-hidden="true"
      />
      <span>{label}</span>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-56 rounded-xl bg-surface border border-border/50 px-3 py-2.5 text-[11px] text-text-primary leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl z-30 whitespace-normal text-left"
      >
        {tooltip}
        <span className="absolute top-full left-1/2 -translate-x-1/2 h-0 w-0 border-x-[5px] border-x-transparent border-t-[5px] border-t-border/50" />
      </span>
    </span>
  );
}

/* ─── Creator profiles ─── */
const UNS = (id: string) =>
  `https://images.unsplash.com/${id}?w=480&h=480&fit=crop&auto=format&q=80&fm=webp`;

const creators = [
  {
    name: "Priya Sharma", handle: "@priyacreates", niche: "Fashion & Lifestyle",
    image: UNS("photo-1534528741775-53994a69daeb"),
    location: "Mumbai", followers: "2.1L", engagement: "4.8%", reel: "₹12,000",
    story: "₹4,500", rating: 4.9, collabs: 38, available: true,
    platforms: ["Instagram", "YouTube"],
    tags: ["Fashion", "Beauty", "Lifestyle"],
    responseRate: "94%", avgReachPerReel: "1.8L", saveRate: "8.2%",
    cpe: "₹2.84", estRoi: "3.1×",
    lastResult: { campaign: "Bloom Skincare", reach: "1.9L", sales: "+₹1.2L GMV" },
  },
  {
    name: "Marcus Chen", handle: "@marcustech", niche: "Tech & Gadgets",
    image: UNS("photo-1507003211169-0a1dd7228f2d"),
    location: "Bangalore", followers: "3.4L", engagement: "5.2%", reel: "₹18,000",
    story: "₹6,000", rating: 4.8, collabs: 52, available: true,
    platforms: ["YouTube", "Instagram"],
    tags: ["Tech", "Unboxing", "Reviews"],
    responseRate: "88%", avgReachPerReel: "2.6L", saveRate: "6.4%",
    cpe: "₹3.10", estRoi: "2.7×",
    lastResult: { campaign: "Boat Audio", reach: "3.1L", sales: "+₹2.8L GMV" },
  },
  {
    name: "Sneha Rao", handle: "@snehafit", niche: "Fitness & Wellness",
    image: UNS("photo-1571019613454-1cb2f99b2d8b"),
    location: "Hyderabad", followers: "85K", engagement: "7.1%", reel: "₹8,000",
    story: "₹3,000", rating: 5.0, collabs: 24, available: false,
    platforms: ["Instagram"],
    tags: ["Fitness", "Wellness", "Nutrition"],
    responseRate: "98%", avgReachPerReel: "72K", saveRate: "11.3%",
    cpe: "₹2.10", estRoi: "4.2×",
    lastResult: { campaign: "NutriPro India", reach: "78K", sales: "+₹84K GMV" },
  },
  {
    name: "Arjun Nair", handle: "@arjunwanders", niche: "Travel & Adventure",
    image: UNS("photo-1539571696357-5a69c17a67c6"),
    location: "Delhi NCR", followers: "1.2L", engagement: "6.3%", reel: "₹10,000",
    story: "₹3,500", rating: 4.7, collabs: 31, available: true,
    platforms: ["Instagram", "YouTube"],
    tags: ["Travel", "Photography", "Adventure"],
    responseRate: "82%", avgReachPerReel: "98K", saveRate: "7.8%",
    cpe: "₹3.50", estRoi: "2.4×",
    lastResult: { campaign: "TrailCo Outdoors", reach: "1.1L", sales: "+₹96K GMV" },
  },
  {
    name: "Riya Kapoor", handle: "@riyabeauty", niche: "Beauty & Skincare",
    image: UNS("photo-1531746020798-e6953c6e8e04"),
    location: "Pune", followers: "1.8L", engagement: "5.9%", reel: "₹14,000",
    story: "₹5,000", rating: 4.8, collabs: 44, available: true,
    platforms: ["Instagram", "YouTube"],
    tags: ["Beauty", "Skincare", "Makeup"],
    responseRate: "91%", avgReachPerReel: "1.5L", saveRate: "9.1%",
    cpe: "₹2.65", estRoi: "3.4×",
    lastResult: { campaign: "Minimalist India", reach: "1.7L", sales: "+₹1.5L GMV" },
  },
  {
    name: "Devraj Menon", handle: "@devfoods", niche: "Food & Cooking",
    image: UNS("photo-1552374196-c4e7ffc6e126"),
    location: "Chennai", followers: "97K", engagement: "8.4%", reel: "₹9,000",
    story: "₹3,200", rating: 4.9, collabs: 19, available: true,
    platforms: ["Instagram", "YouTube"],
    tags: ["Food", "Cooking", "Recipes"],
    responseRate: "96%", avgReachPerReel: "83K", saveRate: "12.7%",
    cpe: "₹1.98", estRoi: "4.8×",
    lastResult: { campaign: "Swiggy Instamart", reach: "91K", sales: "+₹1.1L GMV" },
  },
];

/* ─── Top creators this week ─── */
const topCreators = [
  {
    rank: 1, name: "Priya Sharma", handle: "@priyacreates", niche: "Fashion & Lifestyle",
    image: UNS("photo-1534528741775-53994a69daeb"),
    followers: "2.1L", engagement: "4.8%", rateRange: "₹12K – ₹45K",
    rating: 4.9, collabs: 38, available: true, trending: true,
    badge: "Top Fashion", badgeC: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  },
  {
    rank: 2, name: "Sneha Rao", handle: "@snehafit", niche: "Fitness & Wellness",
    image: UNS("photo-1571019613454-1cb2f99b2d8b"),
    followers: "85K", engagement: "7.1%", rateRange: "₹8K – ₹22K",
    rating: 5.0, collabs: 24, available: false, trending: true,
    badge: "Rising Star", badgeC: "bg-success/10 text-success border-success/20",
  },
  {
    rank: 3, name: "Marcus Chen", handle: "@marcustech", niche: "Tech & Gadgets",
    image: UNS("photo-1507003211169-0a1dd7228f2d"),
    followers: "3.4L", engagement: "5.2%", rateRange: "₹18K – ₹72K",
    rating: 4.8, collabs: 52, available: true, trending: false,
    badge: "Top Tech", badgeC: "bg-[#00B8D9]/10 text-[#00B8D9] border-[#00B8D9]/20",
  },
  {
    rank: 4, name: "Riya Kapoor", handle: "@riyabeauty", niche: "Beauty & Skincare",
    image: UNS("photo-1531746020798-e6953c6e8e04"),
    followers: "1.8L", engagement: "5.9%", rateRange: "₹14K – ₹50K",
    rating: 4.8, collabs: 44, available: true, trending: true,
    badge: "Trending", badgeC: "bg-accent/10 text-accent border-accent/20",
  },
  {
    rank: 5, name: "Arjun Nair", handle: "@arjunwanders", niche: "Travel & Adventure",
    image: UNS("photo-1539571696357-5a69c17a67c6"),
    followers: "1.2L", engagement: "6.3%", rateRange: "₹10K – ₹38K",
    rating: 4.7, collabs: 31, available: true, trending: false,
    badge: "Top Travel", badgeC: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  },
  {
    rank: 6, name: "Devraj Menon", handle: "@devfoods", niche: "Food & Cooking",
    image: UNS("photo-1552374196-c4e7ffc6e126"),
    followers: "97K", engagement: "8.4%", rateRange: "₹9K – ₹28K",
    rating: 4.9, collabs: 19, available: true, trending: true,
    badge: "High Engage", badgeC: "bg-success/10 text-success border-success/20",
  },
];

/* ─── Featured campaigns ─── */
const featuredCampaigns = [
  {
    brand: "Bloom Skincare", brandInitials: "BS", brandColor: "from-pink-500/20 to-rose-400/20",
    title: "Spring Glow — Skincare Routine Series",
    budget: "₹15,000 – ₹30,000 per creator",
    creatorsNeeded: 4, spotsLeft: 2,
    applicants: 14, lastApplied: "6m ago",
    formats: ["Reel", "Story"], niche: "Beauty", platform: "Instagram",
    deadline: "Apr 20, 2025", matchScore: 92, urgent: true,
    desc: "Authentic before/after content for our Vitamin C serum launch.",
    tags: ["Beauty", "Skincare", "Lifestyle"],
  },
  {
    brand: "TrailCo Outdoors", brandInitials: "TC", brandColor: "from-green-500/20 to-emerald-400/20",
    title: "Summer Adventure — Gear Review Series",
    budget: "₹18,000 – ₹45,000 per creator",
    creatorsNeeded: 3, spotsLeft: 3,
    applicants: 9, lastApplied: "22m ago",
    formats: ["Reel", "Long-form"], niche: "Travel", platform: "YouTube",
    deadline: "May 5, 2025", matchScore: 88, urgent: false,
    desc: "Show our gear in real outdoor scenarios. Authenticity over production value.",
    tags: ["Travel", "Adventure", "Outdoors"],
  },
  {
    brand: "NutriPro India", brandInitials: "NP", brandColor: "from-[#00B8D9]/20 to-teal-400/20",
    title: "Wellness Series — Protein & Recovery",
    budget: "₹10,000 – ₹22,000 per creator",
    creatorsNeeded: 6, spotsLeft: 4,
    applicants: 21, lastApplied: "2m ago",
    formats: ["Reel", "Story", "Post"], niche: "Fitness", platform: "Instagram",
    deadline: "Apr 28, 2025", matchScore: 85, urgent: false,
    desc: "Workout & nutrition integration content. We want real gym-goers, not models.",
    tags: ["Fitness", "Wellness", "Nutrition"],
  },
  {
    brand: "EcoWear India", brandInitials: "EW", brandColor: "from-lime-500/20 to-green-400/20",
    title: "Conscious Fashion — Sustainable Capsule",
    budget: "₹20,000 – ₹55,000 per creator",
    creatorsNeeded: 5, spotsLeft: 5,
    applicants: 7, lastApplied: "1h ago",
    formats: ["Reel", "Try-on"], niche: "Fashion", platform: "Instagram",
    deadline: "May 12, 2025", matchScore: 79, urgent: false,
    desc: "Style our sustainable collection. We value ethical creators who walk the talk.",
    tags: ["Fashion", "Sustainability", "Lifestyle"],
  },
];

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
        scrolled ? "bg-surface-glass backdrop-blur-xl border-b border-border/40 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-8">
        <Link href="/" className="shrink-0">
          <Image
            src={theme === "dark" ? "/synq logo night mode.png" : "/synq logo light mode.png"}
            alt="SYNQ" width={88} height={28} className="h-7 w-auto object-contain"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-[13px] text-text-secondary flex-1">
          {[["How it works","#how-it-works"],["For Creators","#creators"],["For Brands","#brands"],["Pricing","#pricing"]].map(([l,h]) => (
            <a key={l} href={h} className="hover:text-text-primary transition-colors duration-150">{l}</a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2.5">
          <button onClick={toggleTheme} className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-all duration-150">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link href="/login" className="hidden md:block text-[13px] text-text-secondary hover:text-text-primary transition-colors px-2">Sign in</Link>
          <Link href="/register">
            <Button size="sm" className="glow-accent text-[13px] h-9 px-4 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
              Get Started <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

/* ═══════════════════════════════════════════════════════
   HERO — Final copy pass: specific, outcome-driven, no buzzwords
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
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.07] via-transparent to-[#00B8D9]/[0.04]" />
        <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full bg-accent/[0.05] blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#00B8D9]/[0.04] blur-[120px]" />
        <div className="absolute inset-0 dot-grid opacity-[0.02]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-16 w-full">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
          <div>
            <motion.div {...fu(0)}>
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/[0.08] border border-accent/[0.15] px-3.5 py-1.5 text-[12px] font-medium text-accent mb-8">
                <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                Influencer deal management · Built for India
              </div>
            </motion.div>

            {/* ── HERO HEADLINE ── */}
            <motion.h1
              {...fu(0.07)}
              className="text-[46px] sm:text-[58px] lg:text-[64px] font-bold tracking-[-0.03em] leading-[1.04] text-text-primary"
            >
              Brief, contract,{" "}
              <br className="hidden sm:block" />
              deliver, pay —{" "}
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-accent to-[#00B8D9] bg-clip-text text-transparent">
                one workspace.
              </span>
            </motion.h1>

            <motion.p {...fu(0.15)} className="mt-6 text-[17px] text-text-secondary leading-[1.72] max-w-[440px]">
              Brands send a brief. Creators accept, sign a contract, and deliver.
              Payments release automatically on approval.{" "}
              <span className="text-text-primary font-medium">No DMs. No spreadsheets. No chasing.</span>
            </motion.p>

            <motion.p {...fu(0.2)} className="mt-3 text-[13px] text-text-secondary/70 pl-3.5 border-l-2 border-accent/25 leading-relaxed max-w-[440px]">
              For D2C brands spending ₹50K+ on influencers. For creators tired of waiting 12 days to get paid.
            </motion.p>

            <motion.div {...fu(0.26)} className="flex flex-col sm:flex-row items-start gap-3 mt-10">
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
              <TrustSignal
                icon={Shield}
                label="Escrow-protected"
                tooltip="Payments are held in a regulated escrow account and released only when you approve the deliverable. SYNQ follows RBI-compliant payment rails."
              />
              <TrustSignal
                icon={Lock}
                label="Signed contracts"
                tooltip="Every deal is backed by an e-signed contract with locked scope, revision limits, and payment terms. No verbal agreements. No chasing."
              />
            </motion.div>
          </div>

          {/* Workspace preview — hidden on small screens to keep hero clean */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.65 }}
            className="relative hidden lg:block"
          >
            <div className="rounded-2xl bg-surface border border-border/50 shadow-2xl overflow-hidden">
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
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-medium transition-all duration-200 ${activeTab === i ? "bg-surface text-accent shadow-sm" : "text-text-secondary hover:text-text-primary"}`}
                      >
                        <tab.icon className="h-3 w-3" /> {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex -space-x-1.5">
                  {["Priya Sharma", "Marcus Chen"].map((name, i) => (
                    <div key={i} className="h-5 w-5 rounded-full border-2 border-surface overflow-hidden">
                      <CreatorAvatar name={name} size="sm" className="!rounded-full h-full w-full" />
                    </div>
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
                  <button key={i} onClick={() => setActiveTab(i)} className={`h-1 rounded-full transition-all duration-300 ${activeTab === i ? "w-6 bg-accent" : "w-1.5 bg-border"}`} />
                ))}
              </div>
            </div>

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
                <CreatorAvatar name="Marcus Chen" size="md" />
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
   PROBLEM — Before vs After
═══════════════════════════════════════════════════════ */
function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const chaos = [
    { icon: MessageSquare, text: "\"Did you see the brief I sent 3 days ago?\"", sub: "WhatsApp, 11:47 PM" },
    { icon: AlertTriangle, text: "Payment pending — bank transfer, day 6", sub: "No confirmation, no receipt" },
    { icon: XCircle, text: "Brand changed scope mid-project. Nothing was written down.", sub: "No recourse, no refund" },
    { icon: MessageSquare, text: "\"Can you resend the final file? I lost it.\"", sub: "Drive links, WeTransfer, Telegram" },
    { icon: AlertTriangle, text: "Revision #4. Which version was the approved one?", sub: "Feedback buried in email threads" },
  ];

  const synqItems = [
    { icon: CheckCheck, text: "Brief accepted in 1h 47m — not 3 days.", sub: "You stop waiting. You start working." },
    { icon: Lock, text: "₹54,000 in escrow before a single frame is shot.", sub: "The money is there. Non-negotiable." },
    { icon: FileText, text: "Scope signed. Brand can't add a 4th deliverable.", sub: "Changes require mutual consent. Always." },
    { icon: BarChart3, text: "Final file available to both parties. Forever.", sub: "No 'can you resend that?' ever again." },
    { icon: CheckCircle2, text: "Approved at 2:15 PM. ₹12,000 credited at 2:15:38 PM.", sub: "38 seconds. Not 12 days." },
  ];

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-elevated/10 to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-14">
          <p className="text-[12px] font-semibold text-error uppercase tracking-widest mb-3">The real problem</p>
          <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary">
            Every influencer deal has{" "}
            <span className="text-text-secondary">the same story.</span>
          </h2>
          <p className="mt-4 text-[16px] text-text-secondary max-w-lg mx-auto">
            Brands and creators lose time, money, and trust because collaborations happen across DMs, screenshots, and spreadsheets.
          </p>
        </motion.div>

        {/* Mobile: each problem paired directly above its solution */}
        <div className="flex flex-col gap-5 md:hidden">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-error" />
              <p className="text-[11px] font-semibold text-error uppercase tracking-wider">Without SYNQ</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <p className="text-[11px] font-semibold text-accent uppercase tracking-wider">With SYNQ</p>
            </div>
          </div>
          {chaos.map((item, i) => (
            <div key={i} className="flex flex-col gap-2">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
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
              {(() => {
                const si = synqItems[i];
                const SIcon = si.icon;
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.15 + i * 0.07 }}
                    className="flex items-start gap-3 rounded-xl bg-accent/[0.04] border border-accent/[0.08] p-3 ml-4"
                  >
                    <div className="h-7 w-7 rounded-lg bg-accent/[0.1] flex items-center justify-center shrink-0 mt-0.5">
                      <SIcon className="h-3.5 w-3.5 text-accent" />
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-text-primary leading-snug">{si.text}</p>
                      <p className="text-[10px] text-text-secondary mt-0.5">{si.sub}</p>
                    </div>
                  </motion.div>
                );
              })()}
            </div>
          ))}
        </div>

        {/* Desktop: two columns side by side */}
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }} className="rounded-2xl border border-error/15 bg-error/[0.03] p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="h-2 w-2 rounded-full bg-error" />
              <p className="text-[12px] font-semibold text-error uppercase tracking-wider">Without SYNQ</p>
            </div>
            <div className="space-y-3">
              {chaos.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 + i * 0.07 }} className="flex items-start gap-3 rounded-xl bg-error/[0.04] border border-error/[0.08] p-3">
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

          <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-2xl border border-accent/15 bg-accent/[0.03] p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <p className="text-[12px] font-semibold text-accent uppercase tracking-wider">With SYNQ</p>
            </div>
            <div className="space-y-3">
              {synqItems.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 + i * 0.07 }} className="flex items-start gap-3 rounded-xl bg-accent/[0.04] border border-accent/[0.08] p-3">
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
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   LIVE DEMO — Interactive simulated dashboard
   Creator and Brand views. Skeleton loading. Real states.
═══════════════════════════════════════════════════════ */
function LiveDemoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [role, setRole] = useState<"creator" | "brand">("creator");
  const [nav, setNav] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [liveIdx, setLiveIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setLiveIdx(p => p + 1), 3800);
    return () => clearInterval(t);
  }, []);

  const switchRole = (r: "creator" | "brand") => {
    if (r === role) return;
    setLoading(true);
    setTimeout(() => { setRole(r); setNav("dashboard"); setLoading(false); }, 700);
  };

  const switchNav = (n: string) => {
    if (n === nav) return;
    setLoading(true);
    setTimeout(() => { setNav(n); setLoading(false); }, 350);
  };

  /* ── Creator data ── */
  const creatorStats = [
    { label: "Earned this month", value: "₹54,000", badge: "+₹12K today", up: true },
    { label: "Active deals", value: "3", badge: "1 needs action", up: null },
    { label: "Avg engagement", value: "4.8%", badge: "+0.6% vs last mo.", up: true },
    { label: "On-time rate", value: "100%", badge: "38 collabs done", up: true },
  ];
  const creatorDeals = [
    { brand: "Bloom Skincare", campaign: "Spring Glow", status: "Reel #2 in review", badge: "Action needed", badgeC: "bg-warning/10 text-warning border border-warning/20", pay: "₹12,000", days: "2 days left", urgent: true },
    { brand: "TrailCo Outdoors", campaign: "Summer Launch", status: "Brief accepted · Day 3", badge: "Active", badgeC: "bg-success/10 text-success border border-success/20", pay: "₹18,000", days: "8 days left", urgent: false },
    { brand: "NutriPro India", campaign: "Wellness Series", status: "Awaiting your signature", badge: "Sign contract", badgeC: "bg-accent/10 text-accent border border-accent/20", pay: "₹9,500", days: "Pending", urgent: false },
  ];
  const creatorActivity = [
    { icon: IndianRupee, text: "₹12,000 released", detail: "Reel #1 · Bloom Skincare", time: "2m ago", c: "text-success bg-success/[0.08]" },
    { icon: MessageSquare, text: "Feedback on Reel #2", detail: "\"Love the energy, reduce caption\"", time: "18m ago", c: "text-accent bg-accent/[0.08]" },
    { icon: FileText, text: "New brief received", detail: "EcoWear · Fashion · ₹22K budget", time: "1h ago", c: "text-[#00B8D9] bg-[#00B8D9]/[0.08]" },
    { icon: CheckCheck, text: "Contract signed", detail: "NutriPro India campaign", time: "2h ago", c: "text-success bg-success/[0.08]" },
  ];

  /* ── Brand data ── */
  const brandStats = [
    { label: "Active campaigns", value: "4", badge: "2 need review", up: null },
    { label: "Budget in escrow", value: "₹1.08L", badge: "Protected", up: null },
    { label: "Creator responses", value: "12", badge: "Last 48h", up: true },
    { label: "Avg delivery time", value: "4.2 days", badge: "vs 9.3 industry", up: true },
  ];
  const brandCampaigns = [
    { creator: "Priya Sharma", handle: "@priyacreates", campaign: "Spring Glow", status: "Reel #2 waiting review", badge: "Review now", badgeC: "bg-warning/10 text-warning border border-warning/20", budget: "₹54,000", match: "94%", urgent: true },
    { creator: "Marcus Chen", handle: "@marcustech", campaign: "Tech Week Series", status: "Contract pending sign", badge: "Pending", badgeC: "bg-accent/10 text-accent border border-accent/20", budget: "₹72,000", match: "91%", urgent: false },
    { creator: "Arjun Nair", handle: "@arjunwanders", campaign: "Summer Launch", status: "Brief accepted · Active", badge: "On track", badgeC: "bg-success/10 text-success border border-success/20", budget: "₹38,000", match: "88%", urgent: false },
  ];
  const brandActivity = [
    { icon: Camera, text: "Reel #2 submitted", detail: "Priya Sharma · Spring Glow", time: "Just now", c: "text-accent bg-accent/[0.08]" },
    { icon: CheckCheck, text: "Reel #1 approved", detail: "₹12K auto-released to Priya", time: "2h ago", c: "text-success bg-success/[0.08]" },
    { icon: Send, text: "Brief accepted", detail: "Arjun Nair · Summer Launch", time: "3h ago", c: "text-[#00B8D9] bg-[#00B8D9]/[0.08]" },
    { icon: User, text: "New creator matched", detail: "EcoWear brief · 3 creators shortlisted", time: "5h ago", c: "text-accent bg-accent/[0.08]" },
  ];

  /* ── Bar chart data (CSS-only) ── */
  const chartBars = role === "creator"
    ? [{ m: "Jan", v: 38, label: "₹38K" }, { m: "Feb", v: 52, label: "₹52K" }, { m: "Mar", v: 61, label: "₹61K" }, { m: "Apr", v: 54, label: "₹54K" }]
    : [{ m: "Jan", v: 44, label: "₹44K" }, { m: "Feb", v: 68, label: "₹68K" }, { m: "Mar", v: 92, label: "₹92K" }, { m: "Apr", v: 108, label: "₹1.08L" }];
  const chartMax = Math.max(...chartBars.map(b => b.v));

  /* ── Messages ── */
  const messages = [
    { name: "Bloom Skincare", avatar: "BS", last: "Great work on Reel #1! For Reel #2 — reduce text in caption and add the product in frame by 0:08.", time: "2m", unread: 2 },
    { name: "TrailCo Outdoors", avatar: "TC", last: "Hey! Brief has been sent. Let us know if you have questions before signing.", time: "3h", unread: 0 },
    { name: "NutriPro India", avatar: "NP", last: "Contract is ready for your signature. Escrow will be funded within 1h of signing.", time: "1d", unread: 1 },
  ];

  const navItems: { id: string; label: string; icon: React.ElementType; dot?: boolean }[] = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "deals", label: role === "creator" ? "My Deals" : "Campaigns", icon: Briefcase, dot: role === "creator" ? true : true },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "messages", label: "Messages", icon: MessageSquare, dot: true },
  ];

  const stats = role === "creator" ? creatorStats : brandStats;
  const deals = role === "creator" ? creatorDeals : brandCampaigns;
  const activity = role === "creator" ? creatorActivity : brandActivity;

  return (
    <section ref={ref} id="demo" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-[0.02] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-accent/[0.04] blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/[0.08] border border-accent/[0.12] px-3.5 py-1.5 text-[12px] font-medium text-accent mb-5">
            <Play className="h-3 w-3" /> Interactive demo
          </div>
          <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary">
            The real SYNQ dashboard.
          </h2>
          <p className="mt-4 text-[15px] text-text-secondary max-w-lg mx-auto">
            See exactly what you and your collaborator see. Switch roles below.
          </p>
        </motion.div>

        {/* Role toggle — sliding pill */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="flex justify-center mb-8">
          <div className="inline-flex rounded-xl bg-surface-elevated/60 border border-border/40 p-1 relative">
            {(["creator", "brand"] as const).map((r) => (
              <button
                key={r}
                onClick={() => switchRole(r)}
                aria-label={r === "creator" ? "Switch to Creator View" : "Switch to Brand View"}
                aria-pressed={role === r}
                className={`relative flex items-center gap-2 px-5 py-2 rounded-lg text-[13px] font-semibold z-10 transition-colors duration-200 ${
                  role === r
                    ? r === "creator" ? "text-accent" : "text-[#00B8D9]"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {role === r && (
                  <motion.div
                    layoutId="role-pill"
                    className="absolute inset-0 rounded-lg bg-surface shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {r === "creator" ? <Camera className="h-3.5 w-3.5" /> : <Briefcase className="h-3.5 w-3.5" />}
                  {r === "creator" ? "Creator View" : "Brand View"}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Dashboard window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="rounded-2xl bg-surface border border-border/50 shadow-2xl overflow-hidden"
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border/40 bg-surface-elevated/50">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-error/50" />
              <div className="h-2.5 w-2.5 rounded-full bg-warning/50" />
              <div className="h-2.5 w-2.5 rounded-full bg-success/50" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="flex items-center gap-2 rounded-lg bg-surface-elevated/70 px-3 py-1.5 text-[11px] text-text-secondary">
                <div className="h-1.5 w-1.5 rounded-full bg-success" />
                app.synq.io/dashboard
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CreatorAvatar name={role === "creator" ? "Priya Sharma" : "Bloom Skincare"} size="sm" className="!rounded-full border border-border/50" />
              <span className="text-[11px] text-text-secondary hidden sm:block">{role === "creator" ? "Priya Sharma" : "Bloom Skincare"}</span>
            </div>
          </div>

          {/* App body */}
          <div className="flex min-h-[380px] sm:min-h-[520px]">
            {/* Sidebar nav */}
            <div className="w-44 border-r border-border/40 bg-surface-elevated/20 p-3 hidden sm:block shrink-0">
              <div className="space-y-0.5">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => switchNav(item.id)}
                    className={`w-full flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl text-[12px] font-medium transition-all duration-200 ${nav === item.id ? "bg-accent/[0.08] text-accent" : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated/60"}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon className="h-3.5 w-3.5" />
                      {item.label}
                    </div>
                    {item.dot && item.id !== nav && <div className="h-1.5 w-1.5 rounded-full bg-accent" />}
                  </button>
                ))}
              </div>

              {/* Sidebar footer — collab count */}
              <div className="mt-4 pt-4 border-t border-border/30">
                <div className="rounded-xl bg-accent/[0.06] border border-accent/[0.1] p-3">
                  <p className="text-[10px] font-semibold text-accent mb-1">{role === "creator" ? "This month" : "Active budget"}</p>
                  <p className="text-[16px] font-bold text-text-primary">{role === "creator" ? "₹54,000" : "₹1.08L"}</p>
                  <p className="text-[9px] text-text-secondary mt-0.5">{role === "creator" ? "earned across 3 deals" : "across 4 campaigns"}</p>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                {loading ? (
                  /* ── Skeleton loading state ── */
                  <motion.div key="skel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="p-5">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                      {[0,1,2,3].map(i => (
                        <div key={i} className="rounded-xl border border-border/25 p-3">
                          <Sk className="h-3 w-16 mb-2" />
                          <Sk className="h-6 w-12 mb-1" />
                          <Sk className="h-2.5 w-20" />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      {[0,1,2].map(i => (
                        <div key={i} className="rounded-xl border border-border/25 p-4 flex items-center gap-3">
                          <Sk className="h-9 w-9 rounded-full shrink-0" />
                          <div className="flex-1">
                            <Sk className="h-3 w-32 mb-2" />
                            <Sk className="h-2.5 w-48" />
                          </div>
                          <Sk className="h-6 w-16 rounded-full" />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : nav === "dashboard" ? (
                  /* ── Dashboard view ── */
                  <motion.div key={`dash-${role}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="p-5">
                    {/* Stats row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                      {stats.map((s, i) => (
                        <motion.div
                          key={s.label}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.06 }}
                          className="rounded-xl border border-border/30 bg-surface-elevated/30 p-3 hover:border-accent/20 transition-colors"
                        >
                          <p className="text-[10px] text-text-secondary mb-1 font-medium">{s.label}</p>
                          <p className="text-[20px] font-bold text-text-primary leading-none mb-1">{s.value}</p>
                          <p className={`text-[9px] font-medium ${s.up === true ? "text-success" : s.up === false ? "text-error" : "text-text-secondary"}`}>
                            {s.up === true ? "↑ " : s.up === false ? "↓ " : ""}{s.badge}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Active deals / campaigns */}
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
                        {role === "creator" ? "Active Deals" : "Live Campaigns"}
                      </p>
                      <button className="text-[11px] text-accent hover:underline">View all</button>
                    </div>
                    <div className="space-y-2.5">
                      {role === "creator"
                        ? creatorDeals.map((deal, i) => (
                          <motion.div
                            key={deal.brand}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + i * 0.07 }}
                            className={`rounded-xl border p-3.5 flex items-center gap-3 hover:shadow-sm transition-all duration-200 ${deal.urgent ? "border-warning/20 bg-warning/[0.02]" : "border-border/30 bg-surface"}`}
                          >
                            <div className="h-8 w-8 rounded-lg bg-accent/[0.08] flex items-center justify-center text-[11px] font-bold text-accent shrink-0">
                              {deal.brand.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[12px] font-semibold text-text-primary">{deal.brand}</p>
                              <p className="text-[10px] text-text-secondary">{deal.status}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <span className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-semibold ${deal.badgeC} mb-1`}>{deal.badge}</span>
                              <p className="text-[10px] text-text-secondary flex items-center gap-1 justify-end">
                                <Clock className="h-2.5 w-2.5" /> {deal.days}
                              </p>
                            </div>
                            <p className="text-[11px] font-bold text-text-primary shrink-0 hidden sm:block">{deal.pay}</p>
                          </motion.div>
                        ))
                        : brandCampaigns.map((c, i) => (
                          <motion.div
                            key={c.creator}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + i * 0.07 }}
                            className={`rounded-xl border p-3.5 flex items-center gap-3 hover:shadow-sm transition-all duration-200 ${c.urgent ? "border-warning/20 bg-warning/[0.02]" : "border-border/30 bg-surface"}`}
                          >
                            <CreatorAvatar name={c.creator} size="sm" className="!rounded-full" />
                            <div className="flex-1 min-w-0">
                              <p className="text-[12px] font-semibold text-text-primary">{c.creator} <span className="font-normal text-text-secondary">{c.handle}</span></p>
                              <p className="text-[10px] text-text-secondary">{c.status}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <span className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-semibold ${c.badgeC} mb-1`}>{c.badge}</span>
                              <p className="text-[10px] text-text-secondary">Match {c.match}</p>
                            </div>
                            <p className="text-[11px] font-bold text-text-primary shrink-0 hidden sm:block">{c.budget}</p>
                          </motion.div>
                        ))
                      }
                    </div>
                  </motion.div>
                ) : nav === "deals" ? (
                  /* ── Deals / Campaigns full list ── */
                  <motion.div key={`deals-${role}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[13px] font-semibold text-text-primary">{role === "creator" ? "My Active Deals" : "All Campaigns"}</p>
                      <Button size="sm" className="glow-accent h-8 text-[11px] px-3 gap-1.5">
                        {role === "creator" ? <><Send className="h-3 w-3" /> Find Brands</> : <><Sparkles className="h-3 w-3" /> New Campaign</>}
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {(role === "creator" ? creatorDeals : brandCampaigns).map((item, i) => {
                        const d = item as typeof creatorDeals[0];
                        const b = item as typeof brandCampaigns[0];
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="rounded-xl border border-border/40 bg-surface p-4 hover:border-accent/20 hover:shadow-sm transition-all duration-200 cursor-pointer"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-start gap-3">
                                {role === "brand"
                                  ? <CreatorAvatar name={b.creator} size="md" className="!rounded-full mt-0.5" />
                                  : <div className="h-9 w-9 rounded-lg bg-accent/[0.08] flex items-center justify-center text-[12px] font-bold text-accent shrink-0 mt-0.5">{d.brand?.charAt(0)}</div>
                                }
                                <div>
                                  <p className="text-[13px] font-semibold text-text-primary">
                                    {role === "creator" ? d.brand : `${b.creator} — ${b.campaign}`}
                                  </p>
                                  <p className="text-[11px] text-text-secondary mt-0.5">
                                    {role === "creator" ? d.campaign : b.handle}
                                  </p>
                                  <p className="text-[11px] text-text-secondary mt-1">
                                    {role === "creator" ? d.status : b.status}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right shrink-0">
                                <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${role === "creator" ? d.badgeC : b.badgeC}`}>
                                  {role === "creator" ? d.badge : b.badge}
                                </span>
                                <p className="text-[13px] font-bold text-text-primary mt-1.5">
                                  {role === "creator" ? d.pay : b.budget}
                                </p>
                                <p className="text-[10px] text-text-secondary flex items-center gap-1 justify-end mt-0.5">
                                  <Clock className="h-2.5 w-2.5" />
                                  {role === "creator" ? d.days : `Match ${b.match}`}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : nav === "analytics" ? (
                  /* ── Analytics view ── */
                  <motion.div key={`analytics-${role}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="p-5">
                    <p className="text-[13px] font-semibold text-text-primary mb-5">
                      {role === "creator" ? "Earnings over time" : "Campaign spend vs results"}
                    </p>

                    {/* CSS bar chart */}
                    <div className="flex items-end gap-3 h-36 mb-2">
                      {chartBars.map((bar, i) => (
                        <motion.div
                          key={bar.m}
                          initial={{ height: 0 }}
                          animate={{ height: `${(bar.v / chartMax) * 100}%` }}
                          transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                          className="flex-1 rounded-t-lg relative group cursor-pointer"
                          style={{
                            background: i === chartBars.length - 1
                              ? "linear-gradient(to top, #6C5CE7, #00B8D9)"
                              : "var(--color-surface-elevated)"
                          }}
                        >
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-surface border border-border/50 rounded-lg px-2 py-0.5 text-[9px] font-semibold text-text-primary whitespace-nowrap shadow-sm">
                            {bar.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex gap-3 mb-6">
                      {chartBars.map((bar, i) => (
                        <div key={bar.m} className="flex-1 text-center">
                          <p className={`text-[10px] font-medium ${i === chartBars.length - 1 ? "text-accent" : "text-text-secondary"}`}>{bar.m}</p>
                        </div>
                      ))}
                    </div>

                    {/* Key metrics */}
                    <div className="grid grid-cols-3 gap-3">
                      {(role === "creator"
                        ? [
                          { label: "Reel save rate", value: "8.2%", sub: "vs 3.1% avg", c: "text-success" },
                          { label: "Story completion", value: "74%", sub: "vs 61% avg", c: "text-success" },
                          { label: "Cost per engage", value: "₹2.84", sub: "per interaction", c: "text-text-primary" },
                        ]
                        : [
                          { label: "Cost per engage", value: "₹2.84", sub: "vs ₹6.2 industry", c: "text-success" },
                          { label: "Avg Reel saves", value: "8.2%", sub: "2.4× benchmark", c: "text-success" },
                          { label: "On-time delivery", value: "100%", sub: "all 4 campaigns", c: "text-success" },
                        ]
                      ).map(m => (
                        <div key={m.label} className="rounded-xl border border-border/30 bg-surface-elevated/30 p-3">
                          <p className="text-[9px] text-text-secondary mb-1">{m.label}</p>
                          <p className={`text-[17px] font-bold ${m.c}`}>{m.value}</p>
                          <p className="text-[9px] text-text-secondary">{m.sub}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  /* ── Messages view ── */
                  <motion.div key={`msgs-${role}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="flex h-full">
                    {/* Conversation list */}
                    <div className="w-52 border-r border-border/30 p-2 space-y-1">
                      {messages.map((msg, i) => (
                        <motion.div
                          key={msg.name}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07 }}
                          className={`rounded-xl p-3 cursor-pointer transition-all duration-200 ${i === 0 ? "bg-accent/[0.07] border border-accent/[0.12]" : "hover:bg-surface-elevated/50"}`}
                        >
                          <div className="flex items-start justify-between gap-1 mb-1">
                            <div className="flex items-center gap-2">
                              <div className="h-7 w-7 rounded-full bg-accent/[0.1] flex items-center justify-center text-[9px] font-bold text-accent shrink-0">
                                {msg.avatar}
                              </div>
                              <p className="text-[11px] font-semibold text-text-primary truncate">{msg.name}</p>
                            </div>
                            {msg.unread > 0 && (
                              <div className="h-4 w-4 rounded-full bg-accent flex items-center justify-center text-[8px] font-bold text-white shrink-0">
                                {msg.unread}
                              </div>
                            )}
                          </div>
                          <p className="text-[9px] text-text-secondary truncate leading-snug">{msg.last}</p>
                          <p className="text-[9px] text-text-secondary/60 mt-0.5">{msg.time}</p>
                        </motion.div>
                      ))}
                    </div>
                    {/* Active conversation preview */}
                    <div className="flex-1 flex flex-col">
                      <div className="px-4 py-3 border-b border-border/30 flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-full bg-accent/[0.1] flex items-center justify-center text-[9px] font-bold text-accent">BS</div>
                        <div>
                          <p className="text-[12px] font-semibold text-text-primary">Bloom Skincare</p>
                          <p className="text-[9px] text-text-secondary">Spring Glow Campaign · Active</p>
                        </div>
                      </div>
                      <div className="flex-1 p-4 space-y-3 overflow-hidden">
                        <div className="flex justify-end">
                          <div className="bg-accent/[0.08] rounded-2xl rounded-tr-sm px-3 py-2 max-w-[75%]">
                            <p className="text-[11px] text-text-primary">Reel #1 is live! Should hit around 40K views based on my last 3 reels.</p>
                            <p className="text-[9px] text-text-secondary mt-1">10:12 AM</p>
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-surface-elevated/60 border border-border/30 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[75%]">
                            <p className="text-[11px] text-text-primary">Fantastic! Reel #1 approved ✓ — ₹12,000 has been released to your account.</p>
                            <p className="text-[9px] text-text-secondary mt-1">10:28 AM</p>
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-surface-elevated/60 border border-border/30 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%]">
                            <p className="text-[11px] text-text-primary">For Reel #2 — great energy! Two notes: reduce text overlay in caption, and show the product in frame by 0:08.</p>
                            <p className="text-[9px] text-text-secondary mt-1">2:15 PM · Unread</p>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-2.5 border-t border-border/30">
                        <div className="flex items-center gap-2 rounded-xl bg-surface-elevated/50 border border-border/30 px-3 py-2">
                          <p className="text-[11px] text-text-secondary flex-1">Reply to Bloom Skincare...</p>
                          <Send className="h-3.5 w-3.5 text-accent shrink-0" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Activity sidebar — only on dashboard */}
              {!loading && nav === "dashboard" && (
                <div className="absolute right-0 top-0 bottom-0 w-52 border-l border-border/30 bg-surface-elevated/10 p-3 hidden lg:block overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Live Activity</p>
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                      <span className="text-[9px] text-success">live</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {/* pinned newest item — cycles in */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={liveIdx}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.35 }}
                        className="flex items-start gap-2 rounded-xl bg-accent/[0.06] border border-accent/[0.1] px-2 py-2"
                      >
                        {(() => {
                          const all = [...creatorActivity, ...brandActivity];
                          const a = all[liveIdx % all.length];
                          return (
                            <>
                              <div className={`h-6 w-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${a.c}`}>
                                <a.icon className="h-3 w-3" />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1 mb-0.5">
                                  <p className="text-[10px] font-semibold text-accent">just now</p>
                                </div>
                                <p className="text-[10px] font-medium text-text-primary leading-snug">{a.text}</p>
                                <p className="text-[9px] text-text-secondary truncate">{a.detail}</p>
                              </div>
                            </>
                          );
                        })()}
                      </motion.div>
                    </AnimatePresence>
                    {/* static older items below */}
                    {activity.slice(0, 3).map((a, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.07 }}
                        className="flex items-start gap-2"
                      >
                        <div className={`h-6 w-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${a.c}`}>
                          <a.icon className="h-3 w-3" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-medium text-text-primary leading-snug">{a.text}</p>
                          <p className="text-[9px] text-text-secondary truncate">{a.detail}</p>
                          <p className="text-[9px] text-text-secondary/60">{a.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-5 text-[13px] text-text-secondary"
        >
          This is what you see on day one.{" "}
          <Link href="/register" className="text-accent hover:underline font-medium">Create your account →</Link>
        </motion.p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   REAL USE CASE — A real deal, minute by minute
═══════════════════════════════════════════════════════ */
function RealUseCaseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const timeline: {
    time: string;
    icon: React.ElementType;
    event: string;
    detail: string;
    color: string;
    highlight: boolean;
  }[] = [
    {
      time: "Tue · 9:03 AM",
      icon: Bell,
      event: "3 new briefs matched your profile",
      detail: "Bloom Skincare · TrailCo Outdoors · EcoWear India",
      color: "text-accent bg-accent/[0.08]",
      highlight: false,
    },
    {
      time: "9:47 AM",
      icon: CheckCircle2,
      event: "Brief accepted: Bloom Skincare · Spring Glow",
      detail: "AI match score 94% · ₹54,000 budget · 14-day timeline",
      color: "text-success bg-success/[0.08]",
      highlight: false,
    },
    {
      time: "10:12 AM",
      icon: FileText,
      event: "Contract reviewed: scope locked in writing",
      detail: "3 Reels · ₹12,000 each · 2 revisions allowed · 14-day deadline",
      color: "text-[#00B8D9] bg-[#00B8D9]/[0.08]",
      highlight: false,
    },
    {
      time: "10:14 AM",
      icon: Lock,
      event: "✓ Contract signed · ₹54,000 locked in escrow",
      detail: "E-sign complete · Contract #SC-2024-0388 · Funds held by SYNQ",
      color: "text-accent bg-accent/[0.08]",
      highlight: true,
    },
    {
      time: "Day 3 · 2:15 PM",
      icon: Camera,
      event: "Reel_01_SpringGlow_v1.mp4 submitted for review",
      detail: "74.2 MB · 0:32 runtime · Caption and cover frame included",
      color: "text-text-secondary bg-surface-elevated",
      highlight: false,
    },
    {
      time: "Day 3 · 4:30 PM",
      icon: CheckCheck,
      event: "Reel #1 approved by Bloom Skincare ✓",
      detail: '"Looks great — love the energy. Approve." — Rahul M., Brand Manager',
      color: "text-success bg-success/[0.08]",
      highlight: false,
    },
    {
      time: "Day 3 · 4:31 PM",
      icon: IndianRupee,
      event: "₹12,000 released to UPI — 38 seconds after approval",
      detail: "Ref: TXN-SYNQ-9847 · Milestone 1 of 3 · ₹42,000 remaining in escrow",
      color: "text-success bg-success/[0.08]",
      highlight: true,
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-surface-elevated/15 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-[0.02] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">

        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="mb-12">
          <p className="text-[12px] font-semibold text-accent uppercase tracking-widest mb-3">Real workflow</p>
          <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary max-w-2xl">
            A real Tuesday for @priyacreates.
          </h2>
          <p className="mt-4 text-[16px] text-text-secondary max-w-xl">
            Brief to signed contract in{" "}
            <span className="font-semibold text-text-primary">71 minutes</span>.
            Approval to payment in{" "}
            <span className="font-semibold text-success">38 seconds</span>.
            Every step logged, timestamped, auditable.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-10 items-start">

          {/* Left — creator card + before-SYNQ callout */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-24 space-y-4"
          >
            <div className="rounded-2xl border border-border/50 bg-surface p-5">
              <div className="flex items-center gap-3 mb-4">
                <CreatorAvatar name="Priya Sharma" size="lg" className="border-2 border-accent/20" />
                <div>
                  <p className="text-[14px] font-semibold text-text-primary">Priya Sharma</p>
                  <p className="text-[11px] text-text-secondary">@priyacreates · Fashion & Lifestyle</p>
                  <p className="text-[10px] text-accent mt-0.5">Mumbai · 2.1L followers · 4.8% engagement</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "On-time rate", value: "100%", c: "text-success" },
                  { label: "Active deals", value: "3 this month", c: "text-accent" },
                  { label: "Avg payout time", value: "18 hours", c: "text-text-primary" },
                  { label: "Earned this month", value: "₹54,000", c: "text-text-primary" },
                ].map(s => (
                  <div key={s.label} className="rounded-xl bg-surface-elevated/60 p-2.5">
                    <p className="text-[9px] text-text-secondary mb-0.5">{s.label}</p>
                    <p className={`text-[14px] font-bold ${s.c}`}>{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-error/15 bg-error/[0.03] p-4">
              <p className="text-[10px] font-semibold text-error uppercase tracking-wider mb-3">
                The same deal without SYNQ
              </p>
              <div className="space-y-2 text-[12px] text-text-secondary">
                {[
                  "Brief arrived as a 4-minute voice note on WhatsApp.",
                  "Scope changed twice. Nothing was written down.",
                  "Payment landed 12 days after approval. No reference number.",
                  "Revision feedback: 11 screenshots in Instagram DMs.",
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <XCircle className="h-3.5 w-3.5 text-error/60 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — timestamped deal log */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl bg-surface border border-border/50 shadow-xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/40 bg-surface-elevated/40">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-lg bg-accent/[0.1] flex items-center justify-center">
                  <Clock className="h-3.5 w-3.5 text-accent" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-text-primary">Deal log</p>
                  <p className="text-[10px] text-text-secondary">Bloom Skincare × @priyacreates · Spring Glow Campaign</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                <span className="text-[10px] text-success font-medium">In progress</span>
              </div>
            </div>

            <div className="p-5 space-y-0">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.09 }}
                  className="flex gap-3 group"
                >
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`h-7 w-7 rounded-lg flex items-center justify-center mt-2 shrink-0 ${item.color}`}>
                      <item.icon className="h-3.5 w-3.5" />
                    </div>
                    {i < timeline.length - 1 && (
                      <div className="w-px flex-1 my-1 bg-border/25 min-h-[16px]" />
                    )}
                  </div>
                  <div className={`flex-1 rounded-xl border p-3.5 mb-2 transition-all duration-200 hover:shadow-sm ${item.highlight ? "border-accent/20 bg-accent/[0.03]" : "border-border/25 bg-surface"}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className={`text-[12px] font-semibold leading-snug ${item.highlight ? "text-accent" : "text-text-primary"}`}>{item.event}</p>
                        <p className="text-[10px] text-text-secondary mt-0.5 leading-relaxed">{item.detail}</p>
                      </div>
                      <span className="text-[9px] text-text-secondary whitespace-nowrap shrink-0 mt-0.5 font-mono">{item.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-border/30 px-5 py-3 bg-surface-elevated/20 flex items-center justify-between">
              <div className="flex items-center gap-5 text-[10px] text-text-secondary">
                <span>Brief → Contract: <span className="font-semibold text-text-primary">71 min</span></span>
                <span>Approval → Payment: <span className="font-semibold text-success">38 sec</span></span>
                <span className="hidden sm:inline">Disputes: <span className="font-semibold text-success">0</span></span>
              </div>
              <Link href="/register" className="text-[11px] text-accent hover:underline transition-colors">Start your deal log →</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   DIFFERENTIATION TABLE
═══════════════════════════════════════════════════════ */
function DifferentiationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const features = [
    "Structured campaign brief",
    "Creator reliability scores",
    "Scope contract + e-sign",
    "Escrow-protected payments",
    "Content delivery workspace",
    "Pinpoint revision feedback",
    "ROI analytics vs benchmarks",
    "Dispute resolution (24h)",
  ];

  type ColStatus = "no" | "partial" | "yes";

  const cols: { label: string; sub: string; status: ColStatus[]; highlight: boolean }[] = [
    {
      label: "Slack + WhatsApp",
      sub: "Great for chat. Terrible for deals.",
      status: ["no","no","no","no","no","no","no","no"],
      highlight: false,
    },
    {
      label: "Notion + Airtable",
      sub: "Flexible docs. Zero enforcement.",
      status: ["partial","partial","no","no","no","no","partial","no"],
      highlight: false,
    },
    {
      label: "SYNQ",
      sub: "The complete deal lifecycle",
      status: ["yes","yes","yes","yes","yes","yes","yes","yes"],
      highlight: true,
    },
  ];

  const statusIcon = (s: ColStatus, highlight: boolean) => {
    if (s === "yes") return <CheckCircle2 className={`h-4 w-4 ${highlight ? "text-accent" : "text-success"}`} />;
    if (s === "partial") return <Minus className="h-4 w-4 text-warning" />;
    return <XCircle className="h-4 w-4 text-error/40" />;
  };

  return (
    <section ref={ref} className="py-24 bg-surface-elevated/15 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-[0.02] pointer-events-none" />
      <div className="max-w-5xl mx-auto px-6 relative">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-14">
          <p className="text-[12px] font-semibold text-accent uppercase tracking-widest mb-3">Why SYNQ</p>
          <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary">
            Why not Slack, Notion,
            <br />
            <span className="text-text-secondary font-medium">or a spreadsheet?</span>
          </h2>
          <p className="mt-4 text-[15px] text-text-secondary max-w-xl mx-auto">
            Fair question. Those tools are great — but they weren&apos;t built for influencer deal structure. Here&apos;s the honest difference.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }} className="rounded-2xl overflow-hidden border border-border/50 shadow-lg">
          <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] border-b border-border/40 bg-surface-elevated/40">
            <div className="px-5 py-4">
              <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Feature</p>
            </div>
            {cols.map((col) => (
              <div key={col.label} className={`px-4 py-4 text-center ${col.highlight ? "bg-accent/[0.05] border-l border-r border-accent/15" : ""}`}>
                <p className={`text-[12px] font-bold ${col.highlight ? "text-accent" : "text-text-primary"}`}>{col.label}</p>
                <p className="text-[10px] text-text-secondary mt-0.5">{col.sub}</p>
                {col.highlight && (
                  <div className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[9px] font-semibold text-accent mt-1.5">
                    <Sparkles className="h-2.5 w-2.5" /> Complete
                  </div>
                )}
              </div>
            ))}
          </div>
          {features.map((feature, fi) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -8 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + fi * 0.05 }}
              className={`grid grid-cols-[1.4fr_1fr_1fr_1fr] border-b border-border/25 last:border-0 ${fi % 2 === 0 ? "bg-surface" : "bg-surface-elevated/20"}`}
            >
              <div className="px-5 py-3.5 flex items-center">
                <p className="text-[13px] text-text-primary">{feature}</p>
              </div>
              {cols.map((col) => (
                <div key={col.label} className={`px-4 py-3.5 flex items-center justify-center ${col.highlight ? "bg-accent/[0.03]" : ""}`}>
                  {statusIcon(col.status[fi], col.highlight)}
                </div>
              ))}
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }} className="flex items-center justify-center gap-6 mt-6 text-[12px] text-text-secondary">
          <span className="flex items-center gap-1.5"><Minus className="h-3.5 w-3.5 text-warning" /> Partial / workaround</span>
          <span className="flex items-center gap-1.5"><XCircle className="h-3.5 w-3.5 text-error/40" /> Not available</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-accent" /> Purpose-built in SYNQ</span>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   HOW IT WORKS
═══════════════════════════════════════════════════════ */
function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeRole, setActiveRole] = useState<"creator" | "brand">("creator");

  type StepData = {
    n: string;
    title: string;
    desc: string;
    outcome: string;
    preview: React.ReactNode;
  };

  const flows: Record<"creator" | "brand", StepData[]> = {
    creator: [
      {
        n: "01", title: "Build your creator profile",
        desc: "Set your rate card, niche, and platforms. Brands see your engagement, on-time rate, and past reviews — before they DM you.",
        outcome: "3× more qualified inbound briefs",
        preview: (
          <div className="rounded-xl bg-surface-elevated/50 border border-border/30 p-3 space-y-2">
            <div className="flex items-center gap-2.5 mb-3">
              <CreatorAvatar name="Priya Sharma" size="md" className="border border-accent/20" />
              <div>
                <p className="text-[11px] font-semibold text-text-primary">@priyacreates</p>
                <p className="text-[9px] text-accent">Fashion · 2.1L · 4.8%</p>
              </div>
              <div className="ml-auto rounded-full bg-success/10 border border-success/20 px-2 py-0.5 text-[9px] font-semibold text-success flex items-center gap-1">
                <div className="h-1 w-1 rounded-full bg-success" /> Available
              </div>
            </div>
            {[["Reel rate", "₹12,000"], ["Story rate", "₹4,500"], ["On-time", "100%"]].map(([l, v]) => (
              <div key={l} className="flex justify-between text-[10px]">
                <span className="text-text-secondary">{l}</span>
                <span className="font-semibold text-text-primary">{v}</span>
              </div>
            ))}
          </div>
        ),
      },
      {
        n: "02", title: "Match with the right brands",
        desc: "AI scores every opportunity on audience overlap, content fit, and brand reliability. No more random cold DMs.",
        outcome: "94% match accuracy",
        preview: (
          <div className="rounded-xl bg-surface-elevated/50 border border-border/30 p-3">
            <p className="text-[9px] text-text-secondary uppercase tracking-wider mb-2">New brief matched for you</p>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-[11px] font-semibold text-text-primary">Bloom Skincare</p>
                <p className="text-[9px] text-text-secondary">Spring Glow · 3 Reels · ₹54K</p>
              </div>
              <span className="rounded-full bg-accent/10 text-accent text-[9px] font-bold px-2 py-0.5">94% match</span>
            </div>
            <div className="h-1 rounded-full bg-surface-elevated overflow-hidden mb-2">
              <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-accent to-[#00B8D9]" />
            </div>
            <div className="flex items-center gap-1 text-[9px] text-success"><Shield className="h-2.5 w-2.5" /> Brand reliability: 98%</div>
          </div>
        ),
      },
      {
        n: "03", title: "Deliver, get feedback, get paid",
        desc: "Submit drafts directly in your workspace. Feedback is pinned to the draft. Payment auto-releases the moment a milestone is approved.",
        outcome: "Avg payment in 24h of approval",
        preview: (
          <div className="rounded-xl bg-surface-elevated/50 border border-border/30 p-3 space-y-2">
            <div className="flex justify-between items-center mb-1">
              <p className="text-[10px] font-semibold text-text-primary">Reel #1</p>
              <span className="rounded-full bg-success/10 text-success text-[9px] px-2 py-0.5 font-semibold">Approved ✓</span>
            </div>
            <div className="rounded-lg bg-surface border border-border/30 p-2 text-[9px] text-text-secondary">
              &ldquo;Great energy — approved!&rdquo; — Rahul M., Bloom
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-success/[0.08] border border-success/15 px-2.5 py-2">
              <IndianRupee className="h-3 w-3 text-success" />
              <p className="text-[10px] font-semibold text-success">₹12,000 released · 38 seconds ago</p>
            </div>
          </div>
        ),
      },
    ],
    brand: [
      {
        n: "01", title: "Set up your campaign brief",
        desc: "Define audience, deliverables, budget, and timeline in one form. The brief goes live instantly — matched creators see it first.",
        outcome: "First response within 4h average",
        preview: (
          <div className="rounded-xl bg-surface-elevated/50 border border-border/30 p-3 space-y-2">
            <p className="text-[9px] text-text-secondary uppercase tracking-wider mb-2">Campaign brief</p>
            {[["Campaign", "Spring Glow 2024"], ["Deliverable", "3 Reels · 2 Stories"], ["Budget", "₹54,000"], ["Timeline", "14 days"]].map(([l, v]) => (
              <div key={l} className="flex justify-between text-[10px]">
                <span className="text-text-secondary">{l}</span>
                <span className="font-semibold text-text-primary">{v}</span>
              </div>
            ))}
            <div className="flex items-center gap-1 mt-1 text-[9px] text-accent"><Zap className="h-2.5 w-2.5" /> 12 creators matched instantly</div>
          </div>
        ),
      },
      {
        n: "02", title: "Find & invite verified creators",
        desc: "Browse 850+ creators with real engagement rates, on-time delivery scores, and verified reviews from past brands.",
        outcome: "92% on-time delivery rate",
        preview: (
          <div className="rounded-xl bg-surface-elevated/50 border border-border/30 p-3 space-y-2">
            {[creators[0], creators[1]].map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <CreatorAvatar name={c.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold text-text-primary">{c.name}</p>
                  <p className="text-[9px] text-text-secondary">{c.engagement} eng · {c.followers}</p>
                </div>
                <span className={`text-[9px] font-bold rounded-full px-1.5 py-0.5 ${i === 0 ? "bg-accent/10 text-accent" : "bg-[#00B8D9]/10 text-[#00B8D9]"}`}>{i === 0 ? "94%" : "91%"}</span>
              </div>
            ))}
          </div>
        ),
      },
      {
        n: "03", title: "Review, approve, measure ROI",
        desc: "Approve drafts with pinpoint feedback. Payments auto-release per milestone. Analytics show real CPE vs benchmarks.",
        outcome: "2.4× better engagement",
        preview: (
          <div className="rounded-xl bg-surface-elevated/50 border border-border/30 p-3 space-y-2">
            <div className="grid grid-cols-3 gap-1.5">
              {[["CPE", "₹2.84", "text-success"], ["Save rate", "8.2%", "text-success"], ["On-time", "100%", "text-success"]].map(([l, v, c]) => (
                <div key={l} className="rounded-lg bg-surface border border-border/20 p-2 text-center">
                  <p className={`text-[12px] font-bold ${c}`}>{v}</p>
                  <p className="text-[8px] text-text-secondary">{l}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1 text-[9px] text-accent"><TrendingUp className="h-2.5 w-2.5" /> 2.4× above category avg</div>
          </div>
        ),
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
          <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary">Three steps, zero chaos</h2>
          <p className="mt-4 text-[15px] text-text-secondary max-w-md mx-auto">Pick your role. See exactly what happens next — with real UI, not just bullet points.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="flex justify-center mb-12">
          <div className="inline-flex rounded-xl bg-surface-elevated/60 border border-border/40 p-1 gap-1">
            <button onClick={() => setActiveRole("creator")} className={`flex items-center gap-2 px-5 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 ${activeRole === "creator" ? "bg-surface shadow text-accent border border-accent/15" : "text-text-secondary hover:text-text-primary"}`}>
              <Camera className="h-3.5 w-3.5" /> I&apos;m a Creator
            </button>
            <button onClick={() => setActiveRole("brand")} className={`flex items-center gap-2 px-5 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 ${activeRole === "brand" ? "bg-surface shadow text-[#00B8D9] border border-[#00B8D9]/15" : "text-text-secondary hover:text-text-primary"}`}>
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
                className="rounded-2xl bg-surface border border-border/50 p-5 hover:border-accent/20 hover:shadow-lg transition-all duration-300 group flex flex-col"
              >
                <div className={`h-11 w-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${activeRole === "creator" ? "bg-accent/[0.08] group-hover:bg-accent/[0.14]" : "bg-[#00B8D9]/[0.08] group-hover:bg-[#00B8D9]/[0.14]"}`}>
                  <span className={`text-[15px] font-bold font-mono ${activeRole === "creator" ? "text-accent" : "text-[#00B8D9]"}`}>{step.n}</span>
                </div>
                <h3 className="text-[15px] font-semibold text-text-primary mb-2 leading-snug">{step.title}</h3>
                <p className="text-[12px] text-text-secondary leading-relaxed mb-4">{step.desc}</p>

                {/* Mini UI preview */}
                <div className="mb-4 flex-1">
                  {step.preview}
                </div>

                <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${activeRole === "creator" ? "bg-accent/[0.07] text-accent" : "bg-[#00B8D9]/[0.07] text-[#00B8D9]"}`}>
                  <Zap className="h-3 w-3" /> {step.outcome}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }} className="text-center mt-10">
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
   SYNQ TIMELINE — Signature activity feed
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
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-[0.02] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-accent/[0.04] blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
          <div className="lg:sticky lg:top-24">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}}>
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/[0.08] border border-accent/[0.12] px-3 py-1.5 text-[11px] font-semibold text-accent mb-6">
                <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                Signature feature
              </div>
              <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary leading-[1.1] mb-5">
                Every deal.<br />Every step.<br />
                <span className="bg-gradient-to-r from-accent to-[#00B8D9] bg-clip-text text-transparent">One place.</span>
              </h2>
              <p className="text-[16px] text-text-secondary leading-relaxed mb-8">
                The SYNQ timeline tracks every milestone from first brief to final payment. Not buried in 6 apps.
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

          <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15, duration: 0.6 }} className="rounded-2xl bg-surface border border-border/50 shadow-xl overflow-hidden">
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
                <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> Live
              </div>
            </div>

            <div className="p-5 space-y-0">
              {events.map((ev, i) => {
                const s = statusStyle[ev.status];
                return (
                  <motion.div key={i} initial={{ opacity: 0, x: 12 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 + i * 0.08 }} className="flex gap-3 group">
                    <div className="flex flex-col items-center shrink-0">
                      <div className={`h-3 w-3 rounded-full mt-3 shrink-0 transition-all duration-300 ${s.dot} ${ev.status === "live" ? "ring-2 ring-warning/30" : ""}`} />
                      {i < events.length - 1 && <div className={`w-px flex-1 my-1 ${s.line} min-h-[16px]`} />}
                    </div>
                    <div className={`flex-1 rounded-xl border p-3 mb-2 transition-all duration-200 hover:shadow-sm ${s.card} ${ev.status === "pending" || ev.status === "upcoming" ? "opacity-60" : ""}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2 min-w-0">
                          <ev.icon className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${ev.status === "done" ? "text-accent" : ev.status === "live" ? "text-warning" : "text-text-secondary"}`} />
                          <div className="min-w-0">
                            <p className={`text-[12px] font-semibold leading-snug ${ev.status === "upcoming" ? "text-text-secondary" : "text-text-primary"}`}>{ev.action}</p>
                            <p className="text-[10px] text-text-secondary mt-0.5 leading-snug">{ev.detail}</p>
                            {ev.badge && <span className={`inline-block mt-1.5 rounded-full px-2 py-0.5 text-[9px] font-semibold ${ev.badgeColor}`}>{ev.badge}</span>}
                          </div>
                        </div>
                        <span className="text-[9px] text-text-secondary whitespace-nowrap shrink-0 mt-0.5">{ev.time}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="border-t border-border/30 px-5 py-3 bg-surface-elevated/20">
              <div className="flex items-center justify-between text-[10px] text-text-secondary">
                <div className="flex items-center gap-4">
                  <span><span className="font-semibold text-text-primary">3</span> active collabs</span>
                  <span><span className="font-semibold text-success">₹12K</span> paid today</span>
                  <span><span className="font-semibold text-text-primary">4d</span> avg delivery</span>
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
   CASE STUDY — Bloom Skincare real-world story
   Problem → Approach → Decision → Outcome
═══════════════════════════════════════════════════════ */
function CaseStudySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const metrics = [
    { label: "Avg campaign delivery", beforeVal: "18 days", afterVal: "6 days", beforePct: 100, afterPct: 33, improvement: "3× faster" },
    { label: "Payment disputes", beforeVal: "3 in Q3", afterVal: "0", beforePct: 100, afterPct: 0, improvement: "−100%" },
    { label: "Scope changes post-sign", beforeVal: "67%", afterVal: "0%", beforePct: 100, afterPct: 0, improvement: "−100%" },
    { label: "Cost per engagement", beforeVal: "₹9.20", afterVal: "₹2.84", beforePct: 100, afterPct: 31, improvement: "3.2× better" },
  ];

  return (
    <section ref={ref} className="py-24 bg-surface-elevated/15 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-[0.02] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">

        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="mb-12">
          <p className="text-[12px] font-semibold text-accent uppercase tracking-widest mb-3">Case study</p>
          <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary max-w-2xl">
            How Bloom Skincare turned a chaotic Q3 into their best influencer quarter.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 mb-10">
          {/* Left — narrative */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }}>
            <div className="space-y-8">
              {[
                {
                  tag: "The challenge",
                  tagC: "text-error bg-error/[0.06] border-error/[0.12]",
                  title: "12 campaigns. 4 creators. 3 missed deadlines.",
                  body: "Bloom Skincare's marketing team was running influencer campaigns entirely over WhatsApp and Gmail. Briefs got lost. One creator submitted completely off-brand content because the brief was never formalized. Two payments were delayed 12+ days. Their Q3 CPE was ₹9.20 — nearly 3× industry average.",
                },
                {
                  tag: "The approach",
                  tagC: "text-accent bg-accent/[0.06] border-accent/[0.12]",
                  title: "Moved every active deal to SYNQ in under a day.",
                  body: "Rahul Mehta (Brand Manager) set up SYNQ in 47 minutes. Created 4 campaign briefs with deliverables, revision limits, and timelines locked. Each creator signed a scoped contract. ₹1.2L was moved to escrow across 4 active campaigns.",
                },
                {
                  tag: "Key decision",
                  tagC: "text-[#00B8D9] bg-[#00B8D9]/[0.06] border-[#00B8D9]/[0.12]",
                  title: "Used AI creator matching instead of manual search.",
                  body: "SYNQ's match score surfaced Priya Sharma (94% match for Bloom's audience profile) over a creator they'd previously worked with at lower engagement. That single campaign delivered 8.2% save rate — 2.6× their Q3 benchmark.",
                },
              ].map((block, i) => (
                <motion.div
                  key={block.tag}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.12 }}
                >
                  <div className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold mb-3 ${block.tagC}`}>
                    {block.tag}
                  </div>
                  <h3 className="text-[16px] font-semibold text-text-primary mb-2">{block.title}</h3>
                  <p className="text-[13px] text-text-secondary leading-relaxed">{block.body}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — before/after metrics panel */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="rounded-2xl border border-border/50 bg-surface overflow-hidden shadow-lg">
              {/* Header */}
              <div className="grid grid-cols-2 border-b border-border/40">
                <div className="px-5 py-4 border-r border-border/40 bg-error/[0.03]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="h-2 w-2 rounded-full bg-error" />
                    <p className="text-[11px] font-semibold text-error uppercase tracking-wider">Before SYNQ</p>
                  </div>
                  <p className="text-[10px] text-text-secondary">Q3 2024 · WhatsApp + Gmail</p>
                </div>
                <div className="px-5 py-4 bg-accent/[0.03]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                    <p className="text-[11px] font-semibold text-accent uppercase tracking-wider">With SYNQ</p>
                  </div>
                  <p className="text-[10px] text-text-secondary">Q4 2024 · Same team, same budget</p>
                </div>
              </div>

              {/* Bar chart metric rows */}
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.25 + i * 0.09 }}
                  className={`px-5 py-4 border-b border-border/20 last:border-0 ${i % 2 === 0 ? "bg-surface" : "bg-surface-elevated/20"}`}
                >
                  <p className="text-[11px] font-semibold text-text-secondary mb-3">{m.label}</p>
                  <div className="space-y-2">
                    {/* Before bar */}
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-error/80 w-16 shrink-0 text-right tabular-nums">{m.beforeVal}</span>
                      <div className="flex-1 h-2 rounded-full bg-surface-elevated overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-error/40"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${m.beforePct}%` } : { width: 0 }}
                          transition={{ delay: 0.3 + i * 0.09, duration: 0.55, ease: "easeOut" }}
                        />
                      </div>
                      <span className="text-[9px] text-error/50 w-10 shrink-0">Before</span>
                    </div>
                    {/* After bar */}
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-success font-semibold w-16 shrink-0 text-right tabular-nums">{m.afterVal}</span>
                      <div className="flex-1 h-2 rounded-full bg-surface-elevated overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: "linear-gradient(to right, #00b894, #55efc4)" }}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: m.afterPct === 0 ? "3px" : `${m.afterPct}%` } : { width: 0 }}
                          transition={{ delay: 0.42 + i * 0.09, duration: 0.55, ease: "easeOut" }}
                        />
                      </div>
                      <motion.span
                        initial={{ opacity: 0, x: -4 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.6 + i * 0.09 }}
                        className="text-[9px] font-semibold text-success bg-success/[0.08] rounded-full px-1.5 py-0.5 w-10 shrink-0 text-center whitespace-nowrap"
                      >
                        {m.improvement}
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Context note */}
            <div className="mt-4 rounded-xl border border-border/30 bg-surface-elevated/30 px-4 py-3 flex items-start gap-3">
              <User className="h-4 w-4 text-text-secondary shrink-0 mt-0.5" />
              <p className="text-[12px] text-text-secondary leading-relaxed">
                <span className="font-semibold text-text-primary">Rahul Mehta, Bloom Skincare — </span>
                &ldquo;Same budget, same creators. SYNQ didn&apos;t change our spend — it changed how every deal ran. We delivered our best influencer quarter without adding headcount.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   CREATOR DISCOVERY
═══════════════════════════════════════════════════════ */
function CreatorSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const niches = ["All", "Fashion", "Tech", "Fitness", "Travel", "Beauty", "Food"];
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? creators : creators.filter(c => c.tags.includes(active));
  const display = filtered.length > 0 ? filtered : creators;

  return (
    <section ref={ref} id="creators" className="py-24 bg-surface-elevated/20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-[12px] font-semibold text-accent uppercase tracking-widest mb-3">Creator Discovery</p>
            <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary">Find your perfect creator</h2>
            <p className="mt-3 text-[15px] text-text-secondary max-w-md">
              Every creator shows real metrics — engagement, rate card, delivery score. No more gut-feel decisions.
            </p>
          </div>
          <Link href="/register?role=BUSINESS">
            <Button variant="outline" className="gap-2 shrink-0 hover:border-accent/30 hover:text-accent transition-all duration-200">
              Browse all 850+ creators <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }} className="flex items-center gap-2 mb-8 flex-wrap">
          {niches.map(n => <Pill key={n} label={n} active={active === n} onClick={() => setActive(n)} />)}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {display.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="rounded-2xl bg-surface border border-border/50 overflow-hidden hover:border-accent/30 hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                {/* Photo header — full bleed real image */}
                <div className="relative h-40 overflow-hidden">
                  <CreatorImage src={c.image} alt={c.name} className="w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
                  {/* Availability badge */}
                  <div className={`absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full px-2 py-0.5 backdrop-blur-sm ${c.available ? "bg-success/20 border border-success/30" : "bg-black/40 border border-white/10"}`}>
                    {c.available && <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />}
                    <span className={`text-[9px] font-semibold ${c.available ? "text-success" : "text-white/70"}`}>{c.available ? "Available" : "Busy"}</span>
                  </div>
                </div>

                <div className="p-4">
                  {/* Avatar + name — avatar overlaps the photo */}
                  <div className="flex items-end gap-3 -mt-10 mb-3">
                    <div className="relative h-14 w-14 rounded-xl overflow-hidden border-2 border-surface shadow-lg shrink-0">
                      <CreatorImage src={c.image} alt={c.name} className="w-full h-full" />
                    </div>
                    <div className="pb-0.5">
                      <p className="text-[13px] font-bold text-text-primary leading-tight">{c.name}</p>
                      <p className="text-[10px] text-text-secondary">{c.handle}</p>
                    </div>
                  </div>

                  <p className="text-[11px] text-text-secondary mb-3">{c.niche} · {c.location}</p>

                  {/* 4-metric grid — decision data */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="rounded-lg bg-surface-elevated/60 p-2 text-center group-hover:bg-surface-elevated/80 transition-colors">
                      <p className="text-[13px] font-bold text-text-primary">{c.followers}</p>
                      <p className="text-[9px] text-text-secondary">followers</p>
                    </div>
                    <div className="rounded-lg bg-surface-elevated/60 p-2 text-center group-hover:bg-accent/[0.07] transition-colors">
                      <p className="text-[13px] font-bold text-accent">{c.engagement}</p>
                      <p className="text-[9px] text-text-secondary">engagement</p>
                    </div>
                    <div className="rounded-lg bg-success/[0.06] p-2 text-center">
                      <p className="text-[13px] font-bold text-success">{c.estRoi}</p>
                      <p className="text-[9px] text-text-secondary">est. ROI</p>
                    </div>
                    <div className="rounded-lg bg-surface-elevated/60 p-2 text-center">
                      <p className="text-[13px] font-bold text-text-primary">{c.responseRate}</p>
                      <p className="text-[9px] text-text-secondary">response rate</p>
                    </div>
                  </div>

                  {/* Last campaign result */}
                  <div className="rounded-lg bg-surface-elevated/40 border border-border/25 px-3 py-2 mb-3">
                    <p className="text-[9px] text-text-secondary mb-0.5 uppercase tracking-wider">Last campaign</p>
                    <p className="text-[11px] font-medium text-text-primary">{c.lastResult.campaign}</p>
                    <div className="flex items-center gap-2 mt-0.5 text-[10px] text-text-secondary">
                      <span>{c.lastResult.reach} reach</span>
                      <span className="text-border">·</span>
                      <span className="font-semibold text-success">{c.lastResult.sales}</span>
                    </div>
                  </div>

                  {/* Price + rating */}
                  <div className="flex items-center justify-between text-[11px] text-text-secondary mb-4">
                    <div className="flex items-center gap-1.5">
                      <IndianRupee className="h-3 w-3 text-accent/60" />
                      <span>Reel <span className="font-semibold text-text-primary">{c.reel}</span></span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-warning text-warning" />
                      <span className="font-medium text-text-primary">{c.rating}</span>
                      <span className="text-border ml-1">·</span>
                      <span className="ml-1">{c.cpe}/engage</span>
                    </div>
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
   DUAL AUDIENCE
═══════════════════════════════════════════════════════ */
function DualAudienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="brands" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-14">
          <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary">Built for both sides of every deal</h2>
          <p className="mt-4 text-[15px] text-text-secondary max-w-md mx-auto">Most platforms pick a side. SYNQ fixes the problem for creators and brands equally.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }} className="rounded-2xl bg-surface border border-accent/10 p-8 hover:border-accent/20 transition-all duration-300">
            <div className="h-11 w-11 rounded-xl bg-accent/[0.08] flex items-center justify-center mb-6"><Camera className="h-5 w-5 text-accent" /></div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-accent/[0.06] border border-accent/[0.10] px-3 py-1 text-[11px] font-semibold text-accent mb-4">Free forever</div>
            <h3 className="text-[22px] font-bold text-text-primary mb-2">For Creators</h3>
            <p className="text-[14px] text-text-secondary mb-6 leading-relaxed">You built your audience. You shouldn&apos;t spend 30% of your time chasing payments and managing chaotic brand DMs.</p>
            <ul className="space-y-4 mb-8">
              {[
                { title: "Never chase an invoice again", desc: "You submit. Brand approves. Money moves — automatically, no follow-up, no bank transfer wait.", result: "Avg payout: 24h after approval" },
                { title: "Know who you're working with first", desc: "See brand reliability score, response rate, and reviews from creators they've worked with before.", result: "Avoid bad-pay brands before you start" },
                { title: "Your scope, legally protected", desc: "3 Reels, 2 revisions, 14 days. It's signed. If the brand asks for more, you can say no with a contract behind you.", result: "Zero scope creep on 100% of signed deals" },
                { title: "Know what content performs", desc: "See your save rate, reach, and CPE across every deal — so you can charge more for what works.", result: "Data to negotiate your next rate card" },
              ].map(({ title, desc, result }) => (
                <li key={title} className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-accent/[0.08] flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 className="h-3 w-3 text-accent" /></div>
                  <div>
                    <p className="text-[13px] font-semibold text-text-primary">{title}</p>
                    <p className="text-[12px] text-text-secondary mt-0.5 mb-1.5">{desc}</p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent/[0.06] border border-accent/[0.10] px-2 py-0.5 text-[10px] font-medium text-accent">
                      <Zap className="h-2.5 w-2.5" /> {result}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/register?role=CREATOR">
              <Button className="w-full gap-2 glow-accent h-11 hover:scale-[1.01] active:scale-[0.99] transition-transform">Join as Creator <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.08 }} className="rounded-2xl bg-surface border border-[#00B8D9]/10 p-8 hover:border-[#00B8D9]/20 transition-all duration-300">
            <div className="h-11 w-11 rounded-xl bg-[#00B8D9]/[0.08] flex items-center justify-center mb-6"><Briefcase className="h-5 w-5 text-[#00B8D9]" /></div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#00B8D9]/[0.06] border border-[#00B8D9]/[0.10] px-3 py-1 text-[11px] font-semibold text-[#00B8D9] mb-4">14-day free trial</div>
            <h3 className="text-[22px] font-bold text-text-primary mb-2">For Brands</h3>
            <p className="text-[14px] text-text-secondary mb-6 leading-relaxed">You&apos;re spending budget on influencer marketing but don&apos;t know if it&apos;s working. SYNQ makes campaigns run like a product team.</p>
            <ul className="space-y-4 mb-8">
              {[
                { title: "Find creators who actually match your audience", desc: "AI matches on audience overlap and content fit, not just follower count. You see why each creator was matched before inviting.", result: "92% accuracy vs manual shortlisting" },
                { title: "Run campaigns like a product sprint", desc: "Deliverables, timelines, revision limits, and budget locked in the brief. Both sides see the same source of truth from day one.", result: "67% fewer mid-campaign scope changes" },
                { title: "Know what you're getting before you commit", desc: "Creator on-time rate, brand reviews, and past engagement performance visible on every profile — before you send the brief.", result: "Reduce bad-fit hirings before they happen" },
                { title: "See what's actually working", desc: "Cost-per-engagement tracked against category benchmarks. Know which format and which creator drove real GMV impact.", result: "2.4× better CPE vs industry average" },
              ].map(({ title, desc, result }) => (
                <li key={title} className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-[#00B8D9]/[0.08] flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 className="h-3 w-3 text-[#00B8D9]" /></div>
                  <div>
                    <p className="text-[13px] font-semibold text-text-primary">{title}</p>
                    <p className="text-[12px] text-text-secondary mt-0.5 mb-1.5">{desc}</p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#00B8D9]/[0.06] border border-[#00B8D9]/[0.10] px-2 py-0.5 text-[10px] font-medium text-[#00B8D9]">
                      <Zap className="h-2.5 w-2.5" /> {result}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/register?role=BUSINESS">
              <Button variant="outline" className="w-full gap-2 h-11 border-[#00B8D9]/25 hover:border-[#00B8D9]/50 hover:text-[#00B8D9] transition-all duration-200">
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
   SOCIAL PROOF
═══════════════════════════════════════════════════════ */
const testimonials = [
  {
    quote: "Before SYNQ, I spent 2 hours chasing a brand for a revision buried in their DMs. Now my entire collab — scope, feedback, payment — is in one place. Got paid within 24h of approval.",
    author: "Priya Sharma", role: "Fashion Creator · 2.1L followers · Mumbai",
    outcome: "₹54,000 earned — zero invoice chasing",
  },
  {
    quote: "We ran 12 influencer campaigns last quarter. SYNQ's analytics showed Reels had 2.4× better save rates than Stories. We doubled down and hit our GMV target 3 weeks early.",
    author: "Rahul Mehta", role: "Brand Manager · Bloom Skincare",
    outcome: "3× faster campaign delivery",
  },
  {
    quote: "A brand tried to change scope mid-project. I pointed to the signed contract on SYNQ. Dispute settled in 48 hours. I got paid in full. Never going back to DM-based deals.",
    author: "Sneha Rao", role: "Fitness Creator · Hyderabad",
    outcome: "Dispute resolved in 48h, full payment received",
  },
];

function SocialProofSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-24 bg-surface-elevated/20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-14">
          <p className="text-[12px] font-semibold text-accent uppercase tracking-widest mb-3">Real results</p>
          <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary">What they say after one deal on SYNQ</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.author} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.45 }} className="rounded-2xl bg-surface border border-border/50 p-6 flex flex-col gap-4 hover:shadow-md hover:border-accent/15 transition-all duration-300">
              <div className="flex gap-0.5">{[0,1,2,3,4].map(j => <Star key={j} className="h-3.5 w-3.5 fill-warning text-warning" />)}</div>
              <p className="text-[13px] text-text-secondary leading-[1.75] flex-1">&ldquo;{t.quote}&rdquo;</p>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-success/[0.07] border border-success/[0.12] px-3 py-1 text-[11px] font-medium text-success w-fit">
                <TrendingUp className="h-3 w-3" /> {t.outcome}
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-border/40">
                <CreatorAvatar name={t.author} size="md" className="!rounded-full" />
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
   ONBOARDING PREVIEW — "What happens after you click"
═══════════════════════════════════════════════════════ */
function OnboardingPreviewSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01", title: "Pick your role", sub: "Creator or Brand — 10 seconds",
      preview: (
        <div className="space-y-3">
          <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-4">Who are you joining as?</p>
          <div className="rounded-xl border-2 border-accent bg-accent/[0.06] p-4 flex items-center gap-3 cursor-pointer">
            <div className="h-9 w-9 rounded-lg bg-accent/[0.12] flex items-center justify-center shrink-0"><Camera className="h-4 w-4 text-accent" /></div>
            <div>
              <p className="text-[13px] font-semibold text-text-primary">I&apos;m a Creator</p>
              <p className="text-[11px] text-text-secondary">Find brand deals · Free forever</p>
            </div>
            <div className="ml-auto h-5 w-5 rounded-full bg-accent flex items-center justify-center shrink-0"><CheckCheck className="h-3 w-3 text-white" /></div>
          </div>
          <div className="rounded-xl border border-border/50 bg-surface p-4 flex items-center gap-3 cursor-pointer hover:border-[#00B8D9]/30 transition-colors">
            <div className="h-9 w-9 rounded-lg bg-surface-elevated flex items-center justify-center shrink-0"><Briefcase className="h-4 w-4 text-text-secondary" /></div>
            <div>
              <p className="text-[13px] font-medium text-text-primary">I&apos;m a Brand</p>
              <p className="text-[11px] text-text-secondary">Find creators · 14-day trial</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: "02", title: "Build your profile", sub: "Add your niche, rates, and platforms — 3 minutes",
      preview: (
        <div className="space-y-3">
          <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-4">Creator profile</p>
          <div className="flex items-center gap-3 mb-4">
            <CreatorAvatar name="Priya Sharma" size="lg" className="border-2 border-accent/30" />
            <div>
              <p className="text-[13px] font-semibold text-text-primary">Priya Sharma</p>
              <p className="text-[11px] text-accent">@priyacreates · Fashion & Lifestyle</p>
            </div>
          </div>
          {[
            { label: "Instagram followers", value: "2.1L", icon: Camera },
            { label: "Engagement rate", value: "4.8%", icon: TrendingUp },
            { label: "Reel rate", value: "₹12,000", icon: IndianRupee },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center justify-between rounded-lg bg-surface-elevated/60 px-3 py-2">
              <div className="flex items-center gap-2 text-[12px] text-text-secondary"><Icon className="h-3.5 w-3.5 text-accent/60" /> {label}</div>
              <span className="text-[12px] font-semibold text-text-primary">{value}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 mt-3 text-[11px] text-success">
            <CheckCircle2 className="h-3.5 w-3.5" /> Profile 85% complete — get verified badge
          </div>
        </div>
      ),
    },
    {
      number: "03", title: "Your first match", sub: "AI finds relevant deals within minutes",
      preview: (
        <div className="space-y-3">
          <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-4">New brief for you</p>
          <div className="rounded-xl border border-accent/20 bg-accent/[0.04] p-4">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <p className="text-[13px] font-semibold text-text-primary">Bloom Skincare</p>
                <p className="text-[11px] text-text-secondary">Spring Glow Campaign</p>
              </div>
              <div className="rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-semibold text-accent whitespace-nowrap">94% match</div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[["₹54,000","Budget"],["3 Reels","Deliverables"],["14 days","Timeline"]].map(([v,l]) => (
                <div key={l} className="text-center">
                  <p className="text-[12px] font-bold text-text-primary">{v}</p>
                  <p className="text-[10px] text-text-secondary">{l}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-success mb-3"><Shield className="h-3 w-3" /> Brand reliability: 98%</div>
            <div className="flex gap-2">
              <div className="flex-1 rounded-lg bg-accent text-white text-[11px] font-semibold py-2 text-center cursor-pointer">Accept Brief</div>
              <div className="flex-1 rounded-lg bg-surface-elevated text-text-secondary text-[11px] py-2 text-center cursor-pointer">View details</div>
            </div>
          </div>
          <p className="text-[10px] text-text-secondary text-center">+3 more briefs matching your niche</p>
        </div>
      ),
    },
  ];

  return (
    <section ref={ref} className="py-24 relative">
      <div className="absolute inset-0 dot-grid opacity-[0.02] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-14">
          <p className="text-[12px] font-semibold text-accent uppercase tracking-widest mb-3">What happens next</p>
          <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary">Up and running in under 5 minutes.</h2>
          <p className="mt-4 text-[15px] text-text-secondary max-w-md mx-auto">No setup calls. No onboarding meetings. Click &ldquo;Get Started,&rdquo; pick your role, and you&apos;re in.</p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-start">
          <div className="space-y-3">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1 }}
                onClick={() => setActiveStep(i)}
                className={`rounded-2xl border p-5 cursor-pointer transition-all duration-300 ${activeStep === i ? "border-accent/25 bg-accent/[0.04] shadow-md" : "border-border/50 bg-surface hover:border-accent/15 hover:shadow-sm"}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${activeStep === i ? "bg-accent text-white" : "bg-surface-elevated text-text-secondary"}`}>
                    <span className="text-[14px] font-bold font-mono">{step.number}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-[15px] font-semibold mb-0.5 transition-colors ${activeStep === i ? "text-text-primary" : "text-text-secondary"}`}>{step.title}</h3>
                    <p className="text-[12px] text-text-secondary">{step.sub}</p>
                  </div>
                  {activeStep === i && <div className="h-2 w-2 rounded-full bg-accent shrink-0 mt-2 animate-pulse" />}
                </div>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }} className="pt-2">
              <Link href="/register">
                <Button size="lg" className="glow-accent gap-2 h-12 px-8 text-[15px] w-full sm:w-auto hover:scale-[1.02] active:scale-[0.98] transition-transform">
                  Get Started Free <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <p className="text-[12px] text-text-secondary mt-3">No credit card. Free for creators forever.</p>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div key={activeStep} initial={{ opacity: 0, y: 12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }} transition={{ duration: 0.3 }} className="rounded-2xl bg-surface border border-border/50 shadow-xl overflow-hidden">
                <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border/40 bg-surface-elevated/40">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-error/50" />
                    <div className="h-2.5 w-2.5 rounded-full bg-warning/50" />
                    <div className="h-2.5 w-2.5 rounded-full bg-success/50" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="rounded-lg bg-surface-elevated/70 px-3 py-1 text-[10px] text-text-secondary">app.synq.io/onboarding</div>
                  </div>
                </div>
                <div className="p-6">{steps[activeStep].preview}</div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
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
    <section ref={ref} id="pricing" className="py-24 bg-surface-elevated/15">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-14">
          <p className="text-[12px] font-semibold text-accent uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary">Free for creators. Powerful for brands.</h2>
          <p className="mt-4 text-[15px] text-text-secondary max-w-sm mx-auto">We make money when brands succeed — so creators always stay free.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, x: -14 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.45 }} className="rounded-2xl bg-surface border border-border/50 p-8 hover:shadow-md transition-all duration-300">
            <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-widest mb-4">For Creators</p>
            <div className="flex items-baseline gap-2 mb-2"><span className="text-[44px] font-bold text-text-primary">Free</span><span className="text-text-secondary">forever</span></div>
            <p className="text-[13px] text-text-secondary mb-6">No credit card. No hidden fees. Ever.</p>
            <ul className="space-y-3 mb-8">
              {["Unlimited brand collaborations","Scope contracts & e-signature","Escrow-protected payments","Dispute resolution (24h)","Performance analytics dashboard","Verified creator badge"].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-[13px] text-text-secondary"><CheckCircle2 className="h-4 w-4 text-success shrink-0" /> {f}</li>
              ))}
            </ul>
            <Link href="/register?role=CREATOR"><Button variant="outline" className="w-full h-11 text-[14px] hover:border-accent/30 hover:text-accent transition-all">Get Started Free</Button></Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 14 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.45, delay: 0.08 }} className="rounded-2xl bg-surface border-2 border-accent/25 p-8 relative hover:shadow-lg hover:border-accent/35 transition-all duration-300">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-[#00B8D9] px-4 py-1 text-[11px] font-semibold text-white whitespace-nowrap">Most Popular</div>
            <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-widest mb-4">For Brands</p>
            <div className="flex items-baseline gap-2 mb-1"><span className="text-[44px] font-bold text-text-primary">₹3,999</span><span className="text-text-secondary">/month</span></div>
            <p className="text-[12px] text-text-secondary mb-6">14-day free trial · No credit card required</p>
            <ul className="space-y-3 mb-8">
              {["Everything in Creator plan","AI creator matching (92% accuracy)","Campaign builder & management","Advanced ROI analytics & benchmarks","Creator comparison & reliability scores","Priority support & onboarding"].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-[13px] text-text-secondary"><CheckCircle2 className="h-4 w-4 text-success shrink-0" /> {f}</li>
              ))}
            </ul>
            <Link href="/register?role=BUSINESS"><Button className="w-full h-11 text-[14px] glow-accent gap-2 hover:scale-[1.01] active:scale-[0.99] transition-transform">Start Free Trial <ArrowRight className="h-4 w-4" /></Button></Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   FINAL CTA — live activity ticker + conviction-driven
═══════════════════════════════════════════════════════ */
const LIVE_TICKER = [
  { icon: IndianRupee, text: "₹18,000 released to @marcustech — TrailCo campaign", time: "2 min ago", c: "text-success" },
  { icon: FileText, text: "Contract signed: EcoWear India × @snehafit", time: "9 min ago", c: "text-[#00B8D9]" },
  { icon: Send, text: "New campaign posted: Zudio India · 22 creators matched", time: "14 min ago", c: "text-accent" },
  { icon: CheckCheck, text: "Reel approved + ₹12,000 auto-released: Bloom Skincare", time: "21 min ago", c: "text-success" },
  { icon: Star, text: "94% AI match found: Arjun Nair × WildTrail Co.", time: "28 min ago", c: "text-warning" },
];

function FinalCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [tickerIdx, setTickerIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTickerIdx(p => (p + 1) % LIVE_TICKER.length), 3200);
    return () => clearInterval(t);
  }, []);

  const tick = LIVE_TICKER[tickerIdx];

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
          <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-white/[0.04] blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-white/[0.04] blur-2xl pointer-events-none" />

          {/* Live activity ticker strip */}
          <div className="relative border-b border-white/10 bg-black/10 px-6 py-2.5">
            <div className="flex items-center justify-center gap-2.5">
              <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse shrink-0" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={tickerIdx}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 text-[12px] text-white/75"
                >
                  <tick.icon className={`h-3 w-3 shrink-0 ${tick.c}`} />
                  <span>{tick.text}</span>
                  <span className="text-white/30 hidden sm:inline">·</span>
                  <span className="text-white/40 hidden sm:inline">{tick.time}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="relative px-10 py-14 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3.5 py-1.5 text-[12px] font-medium text-white/80 mb-6">
              <Sparkles className="h-3.5 w-3.5" /> 850+ creators and brands active right now
            </div>
            <h2 className="text-[36px] sm:text-[48px] font-bold text-white tracking-tight leading-[1.1] mb-4">
              Your next brand deal,<br />fully structured from day one.
            </h2>
            <p className="text-white/70 text-[16px] mb-4 max-w-sm mx-auto">
              Brief locked. Contract signed. Payment protected. You focus on the work.
            </p>
            <p className="text-white/45 text-[13px] mb-8 max-w-xs mx-auto">
              Average time from signup to first deal accepted: <span className="text-white/70 font-semibold">4 hours 12 minutes</span>
            </p>

            {/* Trust signals row */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-10 text-[12px] text-white/55">
              <TrustSignal
                icon={Shield}
                label="Escrow-protected payments"
                tooltip="Payments are held in a regulated escrow account and released only when you approve the deliverable. SYNQ follows RBI-compliant payment rails."
                className="text-white/55"
              />
              <span className="hidden sm:block text-white/20">·</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5" /> 2,400+ deals closed</span>
              <span className="hidden sm:block text-white/20">·</span>
              <TrustSignal
                icon={Lock}
                label="Signed contracts"
                tooltip="Every deal is backed by an e-signed contract with locked scope, revision limits, and payment terms. No verbal agreements. No chasing."
                className="text-white/55"
              />
              <span className="hidden sm:block text-white/20">·</span>
              <span className="flex items-center gap-1.5"><TrendingUp className="h-3.5 w-3.5" /> 98% on-time payments</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/register?role=CREATOR">
                <Button size="lg" className="bg-white text-accent hover:bg-white/90 gap-2 text-[15px] h-12 px-8 font-semibold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-transform">
                  <Camera className="h-4 w-4" /> Join as Creator — Free
                </Button>
              </Link>
              <Link href="/register?role=BUSINESS">
                <Button size="lg" variant="ghost" className="text-white/85 hover:text-white hover:bg-white/10 gap-2 text-[15px] h-12 border border-white/20 hover:border-white/30 transition-all">
                  <Briefcase className="h-4 w-4" /> Find Creators — 14-day trial
                </Button>
              </Link>
            </div>
            <p className="text-white/35 text-[12px] mt-6">No credit card · Cancel anytime · Made for India 🇮🇳</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   TOP CREATORS THIS WEEK
═══════════════════════════════════════════════════════ */
function TopCreatorsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">

        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              <p className="text-[12px] font-semibold text-success uppercase tracking-widest">Live on SYNQ</p>
            </div>
            <h2 className="text-[36px] sm:text-[42px] font-bold tracking-tight text-text-primary">
              Top creators this week
            </h2>
            <p className="mt-3 text-[15px] text-text-secondary max-w-lg">
              Ranked by deal completion rate, engagement, and brand satisfaction scores. Updated every Monday.
            </p>
          </div>
          <Link href="/register?role=BUSINESS">
            <Button variant="outline" className="gap-2 shrink-0 hover:border-accent/30 hover:text-accent transition-all duration-200">
              View all creators <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Creator leaderboard grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {topCreators.map((c, i) => (
            <motion.div
              key={c.handle}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.45 }}
              className="group rounded-2xl bg-surface border border-border/50 overflow-hidden hover:border-accent/25 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Full-bleed photo */}
              <div className="relative h-44 overflow-hidden">
                <CreatorImage src={c.image} alt={c.name} className="w-full h-full group-hover:scale-105 transition-transform duration-600" />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Rank badge */}
                <div className="absolute top-3 left-3 h-7 w-7 rounded-xl flex items-center justify-center text-[11px] font-bold shadow-lg"
                  style={{ background: i === 0 ? "linear-gradient(135deg,#f9ca24,#f0932b)" : i === 1 ? "linear-gradient(135deg,#dfe6e9,#b2bec3)" : i === 2 ? "linear-gradient(135deg,#cd853f,#a0522d)" : "var(--color-surface-elevated)", color: i < 3 ? "#000" : "var(--color-text-secondary)" }}>
                  #{c.rank}
                </div>

                {/* Trending badge */}
                {c.trending && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-2 py-0.5">
                    <TrendingUp className="h-2.5 w-2.5 text-success" />
                    <span className="text-[9px] font-semibold text-white/90">Trending</span>
                  </div>
                )}

                {/* Name over photo (bottom) */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-[14px] font-bold text-white leading-tight">{c.name}</p>
                  <p className="text-[11px] text-white/65">{c.handle}</p>
                </div>
              </div>

              <div className="p-4">
                {/* Niche badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${c.badgeC}`}>
                    {c.badge}
                  </span>
                  <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold ${c.available ? "bg-success/10 text-success border border-success/20" : "bg-surface-elevated text-text-secondary border border-border/40"}`}>
                    {c.available && <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />}
                    {c.available ? "Available now" : "Busy"}
                  </div>
                </div>

                {/* Key metrics — what brands need to decide */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="rounded-lg bg-surface-elevated/50 p-2 text-center">
                    <p className="text-[12px] font-bold text-text-primary">{c.followers}</p>
                    <p className="text-[9px] text-text-secondary">followers</p>
                  </div>
                  <div className="rounded-lg bg-accent/[0.06] p-2 text-center">
                    <p className="text-[12px] font-bold text-accent">{c.engagement}</p>
                    <p className="text-[9px] text-text-secondary">engage</p>
                  </div>
                  <div className="rounded-lg bg-surface-elevated/50 p-2 text-center">
                    <p className="text-[12px] font-bold text-text-primary">{c.rating}</p>
                    <p className="text-[9px] text-text-secondary">rating</p>
                  </div>
                </div>

                {/* Price range */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5 text-[11px] text-text-secondary">
                    <IndianRupee className="h-3 w-3 text-accent/60" />
                    <span className="font-semibold text-text-primary">{c.rateRange}</span>
                    <span className="text-text-secondary/50">/ deal</span>
                  </div>
                  <span className="text-[10px] text-text-secondary">{c.collabs} collabs</span>
                </div>

                <Link href="/register?role=BUSINESS">
                  <button className="w-full rounded-xl bg-accent/[0.07] border border-accent/[0.12] hover:bg-accent hover:text-white hover:border-accent hover:shadow-md text-accent text-[12px] font-semibold py-2.5 transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-[0.98]">
                    <Send className="h-3.5 w-3.5" /> Send Brief
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-10 pt-10 border-t border-border/30"
        >
          {[
            { icon: CheckCircle2, label: "All creators SYNQ-verified", c: "text-success" },
            { icon: Star, label: "Min. 4.5 rating to appear", c: "text-warning" },
            { icon: Shield, label: "Escrow on every deal", c: "text-accent" },
            { icon: TrendingUp, label: "Metrics updated weekly", c: "text-[#00B8D9]" },
          ].map(({ icon: Icon, label, c }) => (
            <div key={label} className="flex items-center gap-2 text-[12px] text-text-secondary">
              <Icon className={`h-3.5 w-3.5 ${c}`} />
              <span>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   FEATURED CAMPAIGNS — Open deals for creators to apply
═══════════════════════════════════════════════════════ */
function FeaturedCampaignsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-24 bg-surface-elevated/15 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-[0.025] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">

        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <p className="text-[12px] font-semibold text-accent uppercase tracking-widest">Open Campaigns</p>
            </div>
            <h2 className="text-[36px] sm:text-[42px] font-bold tracking-tight text-text-primary">
              Featured campaigns
            </h2>
            <p className="mt-3 text-[15px] text-text-secondary max-w-lg">
              Brands looking for creators right now. Apply via SYNQ — brief, contract, and escrow all set up in minutes.
            </p>
          </div>
          <Link href="/register?role=CREATOR">
            <Button className="glow-accent gap-2 shrink-0 hover:scale-[1.02] transition-transform">
              Apply as Creator <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {featuredCampaigns.map((camp, i) => (
            <motion.div
              key={camp.brand}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className={`rounded-2xl bg-surface border overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer ${camp.urgent ? "border-warning/25 hover:border-warning/40" : "border-border/50 hover:border-accent/25"}`}
            >
              {/* Campaign header */}
              <div className={`bg-gradient-to-r ${camp.brandColor} px-5 py-4 border-b border-border/20`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Brand initials avatar */}
                    <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${camp.brandColor} flex items-center justify-center text-[12px] font-bold text-text-primary border border-border/30 shrink-0`}>
                      {camp.brandInitials}
                    </div>
                    <div>
                      <p className="text-[11px] text-text-secondary">{camp.brand}</p>
                      <p className="text-[14px] font-bold text-text-primary leading-snug">{camp.title}</p>
                    </div>
                  </div>
                  {camp.urgent && (
                    <div className="flex items-center gap-1 rounded-full bg-warning/10 border border-warning/20 px-2 py-0.5 shrink-0">
                      <div className="h-1.5 w-1.5 rounded-full bg-warning animate-pulse" />
                      <span className="text-[9px] font-semibold text-warning">{camp.spotsLeft} spots left</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5">
                {/* Live activity signal */}
                <div className="flex items-center gap-4 mb-3 text-[11px] text-text-secondary">
                  <span className="flex items-center gap-1.5">
                    <Users className="h-3 w-3 text-accent" />
                    <span><span className="font-semibold text-text-primary">{camp.applicants}</span> creators applied</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-text-secondary" />
                    <span>Last <span className="font-medium text-text-primary">{camp.lastApplied}</span></span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Timer className="h-3 w-3 text-warning" />
                    <span className="text-warning font-medium">{camp.deadline}</span>
                  </span>
                </div>

                {/* Description */}
                <p className="text-[12px] text-text-secondary mb-4 leading-relaxed">{camp.desc}</p>

                {/* Campaign stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="rounded-xl bg-surface-elevated/50 p-3">
                    <p className="text-[9px] text-text-secondary mb-1 uppercase tracking-wider">Budget</p>
                    <p className="text-[13px] font-bold text-text-primary">{camp.budget}</p>
                  </div>
                  <div className="rounded-xl bg-surface-elevated/50 p-3">
                    <p className="text-[9px] text-text-secondary mb-1 uppercase tracking-wider">Spots left</p>
                    <p className={`text-[13px] font-bold ${camp.spotsLeft <= 2 ? "text-warning" : "text-text-primary"}`}>{camp.spotsLeft} of {camp.creatorsNeeded}</p>
                  </div>
                </div>

                {/* Tags row */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {camp.formats.map(f => (
                    <span key={f} className="rounded-full bg-accent/[0.07] border border-accent/[0.12] text-accent text-[10px] font-medium px-2 py-0.5">{f}</span>
                  ))}
                  {camp.tags.map(t => (
                    <span key={t} className="rounded-full bg-surface-elevated border border-border/40 text-text-secondary text-[10px] px-2 py-0.5">{t}</span>
                  ))}
                </div>

                {/* Match score + CTA */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 w-24 rounded-full bg-surface-elevated overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent to-[#00B8D9]"
                        style={{ width: `${camp.matchScore}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-accent">{camp.matchScore}% match</span>
                  </div>
                  <Link href="/register?role=CREATOR">
                    <button className="rounded-xl bg-accent text-white text-[12px] font-semibold px-4 py-2 hover:bg-accent/90 hover:shadow-md active:scale-[0.97] transition-all duration-200 flex items-center gap-1.5">
                      Apply Now <ArrowRight className="h-3 w-3" />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-8 rounded-2xl border border-accent/15 bg-accent/[0.03] p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <p className="text-[14px] font-semibold text-text-primary mb-1">Are you a brand with a live campaign?</p>
            <p className="text-[13px] text-text-secondary">Post it on SYNQ and get matched with verified creators in under 4 hours.</p>
          </div>
          <Link href="/register?role=BUSINESS">
            <Button variant="outline" className="gap-2 shrink-0 hover:border-accent/30 hover:text-accent transition-all whitespace-nowrap">
              Post a Campaign <Briefcase className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   MARKETPLACE PULSE — Live feed + animated stats
   Placed between TrustBar and ProblemSection to establish
   that SYNQ is a working, active platform from the start.
═══════════════════════════════════════════════════════ */
function MarketplacePulseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [feedIdx, setFeedIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setFeedIdx(p => p + 1), 2600);
    return () => clearInterval(t);
  }, []);

  const c1 = useCountUp(847, isInView, 2000);
  const c2 = useCountUp(2847, isInView, 1800);
  const c3 = useCountUp(127, isInView, 1400);
  const c4 = useCountUp(99, isInView, 1500);

  const liveFeed = [
    { icon: IndianRupee, text: "₹18,000 released", detail: "TrailCo × @arjunwanders · Reel #2 approved", time: "just now", c: "text-success bg-success/[0.08]" },
    { icon: FileText, text: "Contract signed", detail: "Bloom Skincare × @priyacreates · ₹54,000 in escrow", time: "1m ago", c: "text-accent bg-accent/[0.08]" },
    { icon: Camera, text: "Reel submitted", detail: "@riyabeauty → NutriPro India · Review pending", time: "3m ago", c: "text-[#00B8D9] bg-[#00B8D9]/[0.08]" },
    { icon: CheckCheck, text: "Deal completed", detail: "EcoWear × @devfoods · ₹28,000 paid in full", time: "5m ago", c: "text-success bg-success/[0.08]" },
    { icon: Bell, text: "New match", detail: "@snehafit matched Mamaearth — 91% fit score", time: "8m ago", c: "text-accent bg-accent/[0.08]" },
    { icon: Shield, text: "₹45,000 to escrow", detail: "NutriPro Series · @marcustech · Funds protected", time: "12m ago", c: "text-success bg-success/[0.08]" },
    { icon: Star, text: "5★ review posted", detail: "Bloom Skincare rated @priyacreates · \"Exactly on brief\"", time: "18m ago", c: "text-warning bg-warning/[0.08]" },
    { icon: IndianRupee, text: "₹9,500 released", detail: "EcoWear × @arjunwanders · Milestone 1 paid", time: "22m ago", c: "text-success bg-success/[0.08]" },
  ];

  const current = liveFeed[feedIdx % liveFeed.length];

  return (
    <section ref={ref} className="py-16 border-y border-border/40 bg-surface-elevated/10 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-[0.02] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid lg:grid-cols-[1fr_420px] gap-8 items-start">

          {/* Left — animated stats */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <p className="text-[12px] font-semibold text-success uppercase tracking-widest">Live platform activity</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-8">
              {[
                { value: c1, suffix: "+", prefix: "", label: "Verified creators", sub: "across India", icon: Users, c: "text-accent" },
                { value: c2, suffix: "+", prefix: "", label: "Deals closed", sub: "with 98% satisfaction", icon: CheckCheck, c: "text-success" },
                { value: c3, suffix: "", prefix: "", label: "Active right now", sub: "deals in progress", icon: Zap, c: "text-warning", live: true },
                { value: c4, suffix: "%", prefix: "", label: "On-time payments", sub: "escrow-protected", icon: Shield, c: "text-[#00B8D9]" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.08 }}
                  className="flex flex-col"
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <s.icon className={`h-3.5 w-3.5 ${s.c}`} />
                    {s.live && <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />}
                  </div>
                  <div className={`text-[30px] sm:text-[34px] font-bold tracking-tight ${s.c}`}>
                    {s.prefix}{s.value.toLocaleString()}{s.suffix}
                  </div>
                  <div className="text-[12px] font-medium text-text-primary mt-0.5">{s.label}</div>
                  <div className="text-[11px] text-text-secondary">{s.sub}</div>
                </motion.div>
              ))}
            </div>

            {/* Recent payout strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="rounded-xl border border-border/40 bg-surface p-4"
            >
              <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-3">Recent payouts this week</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { creator: "Priya S.", amount: "₹54,000", niche: "Fashion" },
                  { creator: "Marcus C.", amount: "₹72,000", niche: "Tech" },
                  { creator: "Sneha R.", amount: "₹22,000", niche: "Fitness" },
                  { creator: "Arjun N.", amount: "₹38,000", niche: "Travel" },
                  { creator: "Riya K.", amount: "₹45,000", niche: "Beauty" },
                  { creator: "Devraj M.", amount: "₹19,500", niche: "Food" },
                ].map(p => (
                  <div key={p.creator} className="flex items-center gap-1.5 rounded-full bg-success/[0.06] border border-success/[0.12] px-3 py-1">
                    <IndianRupee className="h-2.5 w-2.5 text-success" />
                    <span className="text-[11px] font-semibold text-success">{p.amount}</span>
                    <span className="text-[10px] text-text-secondary">· {p.creator}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — live activity feed */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="rounded-2xl border border-border/40 bg-surface overflow-hidden shadow-sm"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/30 bg-surface-elevated/30">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                <p className="text-[12px] font-semibold text-text-primary">Live on SYNQ</p>
              </div>
              <span className="text-[10px] text-text-secondary">Updated in real time</span>
            </div>
            <div className="divide-y divide-border/20">
              {/* Cycling newest event */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={feedIdx}
                  initial={{ opacity: 0, y: -10, backgroundColor: "rgba(0,184,89,0.04)" }}
                  animate={{ opacity: 1, y: 0, backgroundColor: "rgba(0,184,89,0)" }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.35 }}
                  className="flex items-start gap-3 px-4 py-3"
                >
                  <div className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${current.c}`}>
                    <current.icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-text-primary leading-snug">{current.text}</p>
                    <p className="text-[10px] text-text-secondary leading-snug truncate">{current.detail}</p>
                  </div>
                  <span className="text-[9px] font-semibold text-success shrink-0 mt-0.5">just now</span>
                </motion.div>
              </AnimatePresence>

              {/* Static older events */}
              {liveFeed.slice(1, 6).map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.25 + i * 0.06 }}
                  className="flex items-start gap-3 px-4 py-3"
                >
                  <div className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${a.c}`}>
                    <a.icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-text-primary leading-snug">{a.text}</p>
                    <p className="text-[10px] text-text-secondary leading-snug truncate">{a.detail}</p>
                  </div>
                  <span className="text-[10px] text-text-secondary/70 shrink-0 mt-0.5">{a.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   MARKETPLACE INTERACTION — Brand → Apply → Contract → Pay
   Interactive 5-step flow auto-advancing every 3.5s
═══════════════════════════════════════════════════════ */
function MarketplaceInteractionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [step, setStep] = useState(0);
  const TOTAL = 5;

  useEffect(() => {
    if (!isInView) return;
    const t = setInterval(() => setStep(p => (p + 1) % TOTAL), 3800);
    return () => clearInterval(t);
  }, [isInView]);

  const steps = [
    { label: "Brief Posted", icon: Send, color: "text-[#00B8D9]", bg: "bg-[#00B8D9]/[0.08]" },
    { label: "Creators Matched", icon: Bell, color: "text-accent", bg: "bg-accent/[0.08]" },
    { label: "Creator Applied", icon: Camera, color: "text-warning", bg: "bg-warning/[0.08]" },
    { label: "Contract + Escrow", icon: Lock, color: "text-success", bg: "bg-success/[0.08]" },
    { label: "Paid in 38 sec", icon: IndianRupee, color: "text-success", bg: "bg-success/[0.08]" },
  ];

  const panels = [
    /* Step 0 — Brief Posted */
    <div key="brief" className="space-y-3">
      <div className="rounded-xl border border-[#00B8D9]/20 bg-[#00B8D9]/[0.03] p-4">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="h-8 w-8 rounded-lg bg-pink-500/10 flex items-center justify-center text-[10px] font-bold text-pink-500 shrink-0">BS</div>
          <div>
            <p className="text-[12px] font-semibold text-text-primary">Bloom Skincare posted a campaign</p>
            <p className="text-[10px] text-text-secondary">just now · 2 min ago</p>
          </div>
        </div>
        <div className="space-y-2 text-[12px]">
          {[
            ["Campaign", "Spring Glow — Skincare Routine Series"],
            ["Budget", "₹54,000 total · ₹18,000 per creator"],
            ["Deliverables", "3 Reels · 2 Stories · 1 Post"],
            ["Timeline", "14 days from contract sign"],
            ["Niche", "Beauty · Skincare · Lifestyle"],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-2">
              <span className="text-text-secondary w-24 shrink-0">{k}:</span>
              <span className="text-text-primary font-medium">{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 text-[11px] text-success">
        <CheckCircle2 className="h-3.5 w-3.5" />
        <span>Brief structured and saved — no DMs needed</span>
      </div>
    </div>,

    /* Step 1 — Creators Matched */
    <div key="matched" className="space-y-3">
      <p className="text-[11px] text-text-secondary mb-2">AI matched 3 verified creators in 4 minutes</p>
      {[
        { name: "Priya Sharma", handle: "@priyacreates", match: 94, niche: "Fashion & Lifestyle", followers: "2.1L", engage: "4.8%", color: "border-accent/30 bg-accent/[0.03]" },
        { name: "Riya Kapoor", handle: "@riyabeauty", match: 89, niche: "Beauty & Skincare", followers: "1.8L", engage: "5.9%", color: "border-border/40" },
        { name: "Ananya K.", handle: "@ananyalife", match: 81, niche: "Lifestyle", followers: "1.1L", engage: "5.2%", color: "border-border/40" },
      ].map((c, i) => (
        <motion.div
          key={c.handle}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15 }}
          className={`rounded-xl border ${c.color} p-3 flex items-center gap-3`}
        >
          <CreatorAvatar name={c.name} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold text-text-primary">{c.name} <span className="text-text-secondary font-normal">{c.handle}</span></p>
            <p className="text-[10px] text-text-secondary">{c.niche} · {c.followers} followers · {c.engage} engage</p>
          </div>
          <div className={`text-[10px] font-bold rounded-full px-2 py-0.5 ${i === 0 ? "text-accent bg-accent/[0.1]" : "text-text-secondary bg-surface-elevated"}`}>
            {c.match}% match
          </div>
        </motion.div>
      ))}
      <div className="flex items-center gap-2 text-[11px] text-accent">
        <Bell className="h-3.5 w-3.5" />
        <span>All 3 creators notified — avg response time 1h 47m</span>
      </div>
    </div>,

    /* Step 2 — Creator Applied */
    <div key="applied" className="space-y-3">
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="rounded-xl border border-accent/20 bg-accent/[0.03] p-4">
        <div className="flex items-center gap-3 mb-3">
          <CreatorAvatar name="Priya Sharma" size="md" />
          <div>
            <p className="text-[13px] font-semibold text-text-primary">Priya Sharma accepted</p>
            <p className="text-[10px] text-text-secondary">@priyacreates · responded in 47 minutes</p>
          </div>
          <span className="ml-auto text-[10px] font-bold text-accent bg-accent/[0.1] rounded-full px-2 py-0.5">94% match</span>
        </div>
        <p className="text-[12px] text-text-secondary italic border-l-2 border-accent/20 pl-3">
          "Love the brief — very clear scope. I've done 3 skincare collabs this year with great results. Can deliver all 3 reels in 10 days."
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[["On-time rate","100%","text-success"],["Collabs done","38","text-text-primary"],["Avg rating","4.9★","text-warning"]].map(([l,v,c]) => (
            <div key={l} className="rounded-lg bg-surface-elevated/60 p-2 text-center">
              <p className={`text-[13px] font-bold ${c}`}>{v}</p>
              <p className="text-[9px] text-text-secondary">{l}</p>
            </div>
          ))}
        </div>
      </motion.div>
      <div className="flex items-center gap-2 text-[11px] text-warning">
        <CheckCheck className="h-3.5 w-3.5" />
        <span>Brand shortlisted Priya — contract ready to send</span>
      </div>
    </div>,

    /* Step 3 — Contract + Escrow */
    <div key="contract" className="space-y-3">
      <div className="rounded-xl border border-success/20 bg-success/[0.02] p-4 space-y-2.5">
        <div className="flex items-center gap-2 mb-1">
          <FileText className="h-4 w-4 text-success" />
          <p className="text-[12px] font-semibold text-text-primary">Contract #SC-2024-0388 — signed by both parties</p>
        </div>
        {[
          ["Deliverables", "3 Reels · 2 Stories · 1 Photo post"],
          ["Revisions", "Max 2 per deliverable"],
          ["Deadline", "14 days from today (Apr 28)"],
          ["Scope change", "Requires mutual consent"],
          ["Disputes", "Resolved within 24 hours by SYNQ"],
        ].map(([k, v]) => (
          <div key={k} className="flex gap-2 text-[11px]">
            <span className="text-text-secondary w-24 shrink-0">{k}:</span>
            <span className="text-text-primary">{v}</span>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-success/20 bg-success/[0.03] p-3 flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-success/[0.12] flex items-center justify-center shrink-0">
          <Lock className="h-4 w-4 text-success" />
        </div>
        <div>
          <p className="text-[12px] font-semibold text-success">₹54,000 locked in escrow</p>
          <p className="text-[10px] text-text-secondary">Funds held by SYNQ · Released on approval only</p>
        </div>
        <CheckCircle2 className="h-4 w-4 text-success ml-auto shrink-0" />
      </div>
      <div className="flex items-center gap-2 text-[11px] text-success">
        <Shield className="h-3.5 w-3.5" />
        <span>Scope is locked. No surprises for either party.</span>
      </div>
    </div>,

    /* Step 4 — Payment Released */
    <div key="paid" className="space-y-3">
      <div className="rounded-xl border border-success/25 bg-success/[0.04] p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-8 w-8 rounded-xl bg-success/[0.12] flex items-center justify-center">
            <IndianRupee className="h-4 w-4 text-success" />
          </div>
          <div>
            <p className="text-[13px] font-bold text-success">₹12,000 released to Priya</p>
            <p className="text-[10px] text-text-secondary font-mono">Ref: TXN-SYNQ-9847 · 38 seconds after approval</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          {[["Milestone","1 of 3"],["Remaining","₹42,000"],["Time","38 sec"]].map(([l,v]) => (
            <div key={l} className="rounded-lg bg-surface-elevated/60 p-2">
              <p className="text-[12px] font-bold text-text-primary">{v}</p>
              <p className="text-[9px] text-text-secondary">{l}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-border/30 bg-surface-elevated/30 p-3 space-y-1.5 text-[11px]">
        <div className="flex justify-between text-text-secondary">
          <span>Brief to contract:</span><span className="font-semibold text-text-primary">1h 47m</span>
        </div>
        <div className="flex justify-between text-text-secondary">
          <span>Approval to payment:</span><span className="font-semibold text-success">38 seconds</span>
        </div>
        <div className="flex justify-between text-text-secondary">
          <span>Disputes:</span><span className="font-semibold text-success">0</span>
        </div>
      </div>
    </div>,
  ];

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] via-transparent to-[#00B8D9]/[0.03] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">

        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-14">
          <p className="text-[12px] font-semibold text-accent uppercase tracking-widest mb-3">How it actually works</p>
          <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary">
            From brief to payment —{" "}
            <span className="bg-gradient-to-r from-accent to-[#00B8D9] bg-clip-text text-transparent">watch it happen</span>
          </h2>
          <p className="mt-4 text-[15px] text-text-secondary max-w-lg mx-auto">
            This is a real deal lifecycle on SYNQ. Click any step or watch it auto-advance.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">

          {/* Left — step navigator */}
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {steps.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setStep(i)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200 shrink-0 lg:w-full ${step === i ? `${s.bg} border border-current/20 shadow-sm` : "hover:bg-surface-elevated/50"}`}
              >
                <div className={`h-8 w-8 rounded-lg ${s.bg} flex items-center justify-center shrink-0`}>
                  <s.icon className={`h-4 w-4 ${s.color}`} />
                </div>
                <div className="hidden lg:block min-w-0">
                  <p className={`text-[12px] font-semibold ${step === i ? s.color : "text-text-secondary"}`}>Step {i + 1}</p>
                  <p className={`text-[11px] truncate ${step === i ? "text-text-primary" : "text-text-secondary"}`}>{s.label}</p>
                </div>
                {step === i && (
                  <div className="hidden lg:block ml-auto">
                    <div className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" style={{ color: "var(--color-accent)" }} />
                  </div>
                )}
              </button>
            ))}

            {/* Progress bar on desktop */}
            <div className="hidden lg:block mt-4 pt-4 border-t border-border/30">
              <div className="flex items-center justify-between text-[10px] text-text-secondary mb-2">
                <span>Progress</span>
                <span>{step + 1} / {TOTAL}</span>
              </div>
              <div className="h-1.5 rounded-full bg-surface-elevated overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-[#00B8D9]"
                  animate={{ width: `${((step + 1) / TOTAL) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          </div>

          {/* Right — step content */}
          <div className="rounded-2xl border border-border/50 bg-surface shadow-lg overflow-hidden">
            {/* Step header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border/30 bg-surface-elevated/40">
              <div className={`h-8 w-8 rounded-lg ${steps[step].bg} flex items-center justify-center shrink-0`}>
                {(() => { const SI = steps[step].icon; return <SI className={`h-4 w-4 ${steps[step].color}`} />; })()}
              </div>
              <div>
                <p className="text-[11px] text-text-secondary">Step {step + 1} of {TOTAL}</p>
                <p className={`text-[14px] font-bold ${steps[step].color}`}>{steps[step].label}</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5 text-[10px] text-text-secondary">
                <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                <span>Live demo</span>
              </div>
            </div>

            {/* Animated step content */}
            <div className="p-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {panels[step]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation footer */}
            <div className="px-5 pb-4 flex items-center justify-between">
              <button
                onClick={() => setStep(p => Math.max(0, p - 1))}
                disabled={step === 0}
                className="text-[12px] text-text-secondary hover:text-text-primary disabled:opacity-30 transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-elevated/60"
              >
                ← Previous
              </button>
              <div className="flex gap-1.5">
                {steps.map((_, i) => (
                  <button key={i} onClick={() => setStep(i)} className={`h-1.5 rounded-full transition-all duration-300 ${step === i ? "w-5 bg-accent" : "w-1.5 bg-border"}`} />
                ))}
              </div>
              <button
                onClick={() => setStep(p => Math.min(TOTAL - 1, p + 1))}
                disabled={step === TOTAL - 1}
                className="text-[12px] text-accent hover:text-accent/80 disabled:opacity-30 transition-colors px-3 py-1.5 rounded-lg hover:bg-accent/[0.06]"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   PAYMENT ESCROW — Visual escrow flow
═══════════════════════════════════════════════════════ */
function PaymentEscrowSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const flowSteps = [
    {
      step: "01", icon: FileText, label: "Deal signed",
      detail: "Both parties sign the scoped contract. Deliverables, deadlines, and revision limits are locked.",
      color: "text-[#00B8D9]", bg: "bg-[#00B8D9]/[0.08]", border: "border-[#00B8D9]/20",
    },
    {
      step: "02", icon: Lock, label: "₹54,000 to escrow",
      detail: "Brand funds move to SYNQ-managed escrow instantly. Creator sees confirmation — work begins.",
      color: "text-accent", bg: "bg-accent/[0.08]", border: "border-accent/20",
    },
    {
      step: "03", icon: Camera, label: "Creator delivers",
      detail: "Reel #1 submitted on Day 3. Uploaded directly to SYNQ — no Drive links, no WeTransfer.",
      color: "text-text-secondary", bg: "bg-surface-elevated", border: "border-border/30",
    },
    {
      step: "04", icon: CheckCheck, label: "Brand approves",
      detail: "\"Looks great — approve.\" One click at 2:15 PM. SYNQ automatically triggers the release.",
      color: "text-success", bg: "bg-success/[0.08]", border: "border-success/20",
    },
    {
      step: "05", icon: IndianRupee, label: "₹12,000 in 38 sec",
      detail: "Milestone 1 paid. Ref: TXN-SYNQ-9847. No bank transfer wait. No follow-up required.",
      color: "text-success", bg: "bg-success/[0.08]", border: "border-success/20",
      highlight: true,
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-surface-elevated/15 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-[0.025] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">

        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="mb-14">
          <p className="text-[12px] font-semibold text-success uppercase tracking-widest mb-3">Payment protection</p>
          <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary max-w-2xl">
            Your money is safe.{" "}
            <span className="text-text-secondary font-medium">Every rupee. Every deal.</span>
          </h2>
          <p className="mt-4 text-[16px] text-text-secondary max-w-xl">
            SYNQ escrow holds funds from the moment the contract is signed until the moment you approve. Creators never chase invoices. Brands never pay for bad work.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">

          {/* Left — escrow flow timeline */}
          <div className="space-y-0">
            {flowSteps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.45 }}
                className="flex gap-4 group"
              >
                <div className="flex flex-col items-center shrink-0">
                  <div className={`h-10 w-10 rounded-xl ${s.bg} border ${s.border} flex items-center justify-center mt-3 shrink-0 group-hover:scale-105 transition-transform`}>
                    <s.icon className={`h-5 w-5 ${s.color}`} />
                  </div>
                  {i < flowSteps.length - 1 && (
                    <div className="w-px flex-1 my-2 bg-gradient-to-b from-border/40 to-border/10 min-h-[24px]" />
                  )}
                </div>
                <div className={`flex-1 rounded-xl border p-4 mb-3 transition-all duration-200 hover:shadow-sm ${s.highlight ? "border-success/25 bg-success/[0.03]" : "border-border/25 bg-surface"}`}>
                  <div className="flex items-start gap-2">
                    <span className="text-[10px] font-bold text-text-secondary/50 font-mono mt-0.5 shrink-0">{s.step}</span>
                    <div>
                      <p className={`text-[13px] font-semibold ${s.highlight ? "text-success" : "text-text-primary"}`}>{s.label}</p>
                      <p className="text-[12px] text-text-secondary mt-0.5 leading-relaxed">{s.detail}</p>
                    </div>
                    {s.highlight && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ delay: 0.7, type: "spring" }}
                        className="ml-auto shrink-0 rounded-full bg-success/[0.1] border border-success/20 px-2 py-0.5 text-[10px] font-bold text-success"
                      >
                        38 sec
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right — escrow stats + trust panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:sticky lg:top-24 space-y-4"
          >
            {/* Escrow status card */}
            <div className="rounded-2xl border border-success/20 bg-surface overflow-hidden shadow-md">
              <div className="bg-success/[0.04] border-b border-success/15 px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-xl bg-success/[0.12] flex items-center justify-center">
                    <Shield className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-text-primary">SYNQ Escrow · Active</p>
                    <p className="text-[10px] text-text-secondary">RBI-compliant · Regulated</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                    <span className="text-[10px] text-success font-medium">Live</span>
                  </div>
                </div>
              </div>
              <div className="p-5 space-y-3">
                {[
                  { label: "Total held in escrow today", value: "₹12.4L", c: "text-success" },
                  { label: "Deals with funds protected", value: "127 active", c: "text-accent" },
                  { label: "Avg release time", value: "41 seconds", c: "text-text-primary" },
                  { label: "Disputes raised", value: "0 this week", c: "text-success" },
                ].map(s => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-[12px] text-text-secondary">{s.label}</span>
                    <span className={`text-[12px] font-bold ${s.c}`}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Creator perspective */}
            <div className="rounded-2xl border border-border/40 bg-surface p-4">
              <div className="flex items-start gap-3 mb-3">
                <CreatorAvatar name="Priya Sharma" size="sm" />
                <div>
                  <p className="text-[12px] font-semibold text-text-primary">Priya Sharma, @priyacreates</p>
                  <p className="text-[10px] text-text-secondary">Fashion Creator · Mumbai</p>
                </div>
              </div>
              <p className="text-[12px] text-text-secondary italic leading-relaxed">
                &ldquo;I used to wait 12 days for payment. With SYNQ, I approved at 2:15 PM and had the money at 2:15:38. I check the escrow before I even start shooting now.&rdquo;
              </p>
            </div>

            {/* Brand perspective */}
            <div className="rounded-2xl border border-border/40 bg-surface p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="h-7 w-7 rounded-lg bg-pink-500/10 flex items-center justify-center text-[10px] font-bold text-pink-500 shrink-0">BS</div>
                <div>
                  <p className="text-[12px] font-semibold text-text-primary">Rahul Mehta, Bloom Skincare</p>
                  <p className="text-[10px] text-text-secondary">Brand Manager</p>
                </div>
              </div>
              <p className="text-[12px] text-text-secondary italic leading-relaxed">
                &ldquo;Scope disputes were our biggest headache. Once we signed contracts on SYNQ, they stopped completely. The escrow means creators actually deliver on brief.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   MARKET PROBLEM — Fake followers, ghosting, scope creep
═══════════════════════════════════════════════════════ */
function MarketProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const problems = [
    {
      icon: AlertTriangle,
      title: "Fake followers are everywhere",
      stat: "61% of Indian influencers",
      statSub: "have detectable follower inflation (HypeAuditor 2024)",
      detail: "A creator with 500K followers might only reach 12K real humans. Brands have no way to tell — until the campaign is over and the numbers don't add up.",
      iconC: "text-error", bgC: "bg-error/[0.06] border-error/[0.12]",
      fix: "SYNQ shows real engagement rate, save rate, and past campaign reach — not just follower count. Every creator is verified before listing.",
    },
    {
      icon: XCircle,
      title: "Deals fall through mid-campaign",
      stat: "1 in 3 influencer deals",
      statSub: "end in scope disputes or ghosting (Creator IQ 2023)",
      detail: "Brand sent a voice note brief on WhatsApp. Creator delivered something completely different. No written scope. No recourse. Budget wasted.",
      iconC: "text-error", bgC: "bg-error/[0.06] border-error/[0.12]",
      fix: "SYNQ contracts lock deliverables, revision limits, and deadlines before escrow funds. If scope changes, both parties must consent in writing.",
    },
    {
      icon: Clock,
      title: "Creators wait 12–45 days to get paid",
      stat: "Avg payment delay: 18 days",
      statSub: "with no tracking, no reference, no recourse",
      detail: "Creator submitted the reel on Day 3. Brand said \"processing.\" Then silence. Then a half-payment 3 weeks later. With no contract, there's nothing to enforce.",
      iconC: "text-warning", bgC: "bg-warning/[0.06] border-warning/[0.12]",
      fix: "Escrow means the money is already there before work starts. Approval triggers instant release — 38 seconds on average. No follow-up needed.",
    },
    {
      icon: MessageSquare,
      title: "No structured workflow exists",
      stat: "4.3 tools per campaign",
      statSub: "WhatsApp + Drive + Gmail + Notion + spreadsheets",
      detail: "Briefs in DMs. Files on Drive. Feedback in emails. Approvals on Instagram comments. Every campaign is a custom mess that breaks differently every time.",
      iconC: "text-warning", bgC: "bg-warning/[0.06] border-warning/[0.12]",
      fix: "One workspace. Brief, contract, delivery, revision, payment — all in one place. Both parties see the same source of truth from day one.",
    },
  ];

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-error/[0.02] to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">

        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-14">
          <p className="text-[12px] font-semibold text-error uppercase tracking-widest mb-3">The real problem</p>
          <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary">
            Why influencer deals are{" "}
            <span className="text-error">broken</span> today
          </h2>
          <p className="mt-4 text-[15px] text-text-secondary max-w-lg mx-auto">
            These aren&apos;t edge cases. Every brand and creator who&apos;s run more than 3 campaigns has hit at least two of these.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="rounded-2xl bg-surface border border-border/40 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Problem panel */}
              <div className={`p-5 border-b border-border/20 ${p.bgC} bg-opacity-50`}>
                <div className="flex items-start gap-3 mb-3">
                  <div className={`h-9 w-9 rounded-xl ${p.bgC} flex items-center justify-center shrink-0`}>
                    <p.icon className={`h-4.5 w-4.5 ${p.iconC}`} />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-text-primary leading-snug">{p.title}</p>
                    <p className={`text-[11px] font-semibold mt-0.5 ${p.iconC}`}>{p.stat}</p>
                    <p className="text-[10px] text-text-secondary">{p.statSub}</p>
                  </div>
                </div>
                <p className="text-[12px] text-text-secondary leading-relaxed">{p.detail}</p>
              </div>
              {/* SYNQ fix */}
              <div className="p-4 bg-accent/[0.02]">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                  <p className="text-[12px] text-text-primary leading-relaxed">
                    <span className="font-semibold text-accent">SYNQ: </span>{p.fix}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-8 rounded-2xl border border-accent/15 bg-accent/[0.03] p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <p className="text-[15px] font-bold text-text-primary mb-1">
              The industry has a structure problem. SYNQ is the structure.
            </p>
            <p className="text-[13px] text-text-secondary">
              Every deal on SYNQ has a written brief, signed contract, and escrow-protected payment. Not optional. Built in.
            </p>
          </div>
          <Link href="/register">
            <Button className="glow-accent gap-2 shrink-0 whitespace-nowrap hover:scale-[1.02] transition-transform">
              See how it works <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   DEAL NEGOTIATION — Offer → Counter → Accept
═══════════════════════════════════════════════════════ */
function DealNegotiationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [phase, setPhase] = useState(0); // 0=offer, 1=counter, 2=accepted
  const PHASES = 3;

  useEffect(() => {
    if (!isInView) return;
    const t = setInterval(() => setPhase(p => (p + 1) % PHASES), 3500);
    return () => clearInterval(t);
  }, [isInView]);

  const offerThread = [
    /* Offer */
    [
      { from: "brand", name: "Rahul · Bloom Skincare", avatar: "BS", time: "10:03 AM", type: "offer",
        body: "Hi Priya! We'd love to work with you on our Spring Glow campaign.",
        offer: { deliverables: "3 Reels · 2 Stories", budget: "₹36,000", deadline: "14 days", revisions: "2 per deliverable" },
      },
      { from: "creator", name: "Priya Sharma", avatar: "PS", time: "10:41 AM", type: "read",
        body: "Thanks for the brief — I reviewed it. The scope and timeline look good. I'd like to discuss the rate a bit.",
      },
    ],
    /* Counter */
    [
      { from: "brand", name: "Rahul · Bloom Skincare", avatar: "BS", time: "10:03 AM", type: "offer",
        body: "Hi Priya! We'd love to work with you on our Spring Glow campaign.",
        offer: { deliverables: "3 Reels · 2 Stories", budget: "₹36,000", deadline: "14 days", revisions: "2 per deliverable" },
      },
      { from: "creator", name: "Priya Sharma", avatar: "PS", time: "10:41 AM", type: "counter",
        body: "Great brief! My Reels average 1.8L reach and 4.8% engagement for skincare content. For this scope I'd need:",
        counter: { deliverables: "3 Reels · 2 Stories", budget: "₹45,000", deadline: "14 days", revisions: "2 per deliverable" },
        note: "Previous skincare campaign drove ₹1.2L GMV — happy to share the analytics.",
      },
      { from: "brand", name: "Rahul · Bloom Skincare", avatar: "BS", time: "11:02 AM", type: "thinking",
        body: "Let me check with my manager on the budget — your numbers look strong.",
      },
    ],
    /* Accepted */
    [
      { from: "creator", name: "Priya Sharma", avatar: "PS", time: "10:41 AM", type: "counter",
        body: "Based on my reach and past results, I'd need ₹45,000 for this scope.",
        counter: { deliverables: "3 Reels · 2 Stories", budget: "₹45,000", deadline: "14 days", revisions: "2 per deliverable" },
      },
      { from: "brand", name: "Rahul · Bloom Skincare", avatar: "BS", time: "11:24 AM", type: "accept",
        body: "We're in! ₹45,000 works. The ROI you shared from Minimalist India convinced us.",
        accepted: { budget: "₹45,000", next: "Contract → Escrow → Brief" },
      },
      { from: "system", name: "SYNQ", avatar: "SQ", time: "11:24 AM", type: "system",
        body: "Deal terms agreed. Generating contract #SC-2024-0389 — ready for e-signature.",
      },
    ],
  ];

  const thread = offerThread[phase];

  const msgBubble = (msg: typeof thread[0]) => {
    const isCreator = msg.from === "creator";
    const isBrand = msg.from === "brand";
    const isSystem = msg.from === "system";

    return (
      <motion.div
        key={`${phase}-${msg.time}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-start gap-2.5 ${isCreator ? "flex-row-reverse" : ""}`}
      >
        {/* Avatar */}
        {isSystem ? (
          <div className="h-7 w-7 rounded-full bg-accent/[0.1] flex items-center justify-center text-[8px] font-bold text-accent shrink-0 mt-0.5">SQ</div>
        ) : isBrand ? (
          <div className="h-7 w-7 rounded-full bg-pink-500/10 flex items-center justify-center text-[8px] font-bold text-pink-500 shrink-0 mt-0.5">BS</div>
        ) : (
          <CreatorAvatar name="Priya Sharma" size="sm" className="!rounded-full mt-0.5" />
        )}

        <div className={`max-w-[82%] ${isCreator ? "items-end" : "items-start"} flex flex-col gap-1.5`}>
          <div className="flex items-center gap-1.5">
            <p className="text-[10px] font-semibold text-text-secondary">{msg.name}</p>
            <span className="text-[9px] text-text-secondary/50">{msg.time}</span>
          </div>

          {/* Message body */}
          <div className={`rounded-2xl px-3.5 py-2.5 text-[12px] leading-relaxed ${
            isSystem ? "bg-accent/[0.07] border border-accent/[0.15] text-accent rounded-xl" :
            isCreator ? "bg-accent/[0.09] text-text-primary rounded-tr-sm" :
            "bg-surface-elevated/70 border border-border/30 text-text-primary rounded-tl-sm"
          }`}>
            {msg.body}
          </div>

          {/* Offer card */}
          {"offer" in msg && msg.offer && (
            <div className="rounded-xl border border-[#00B8D9]/25 bg-[#00B8D9]/[0.04] p-3 w-full text-[11px] space-y-1.5">
              <p className="text-[10px] font-bold text-[#00B8D9] uppercase tracking-wider mb-2">Offer from Bloom Skincare</p>
              {Object.entries(msg.offer).map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-text-secondary capitalize">{k}:</span>
                  <span className="font-semibold text-text-primary">{v}</span>
                </div>
              ))}
            </div>
          )}

          {/* Counter card */}
          {"counter" in msg && msg.counter && (
            <div className="rounded-xl border border-accent/25 bg-accent/[0.04] p-3 w-full text-[11px] space-y-1.5">
              <p className="text-[10px] font-bold text-accent uppercase tracking-wider mb-2">Counter from Priya</p>
              {Object.entries(msg.counter).map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-text-secondary capitalize">{k}:</span>
                  <span className={`font-semibold ${k === "budget" ? "text-accent" : "text-text-primary"}`}>{v}</span>
                </div>
              ))}
            </div>
          )}

          {/* Accepted card */}
          {"accepted" in msg && msg.accepted && (
            <div className="rounded-xl border border-success/25 bg-success/[0.04] p-3 w-full text-[11px] space-y-1.5">
              <div className="flex items-center gap-1.5 mb-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                <p className="text-[10px] font-bold text-success uppercase tracking-wider">Deal accepted</p>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Final budget:</span>
                <span className="font-bold text-success">{msg.accepted.budget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Next step:</span>
                <span className="font-semibold text-text-primary">{msg.accepted.next}</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  const phaseLabels = ["Offer sent", "Creator counters", "Deal accepted"];
  const phaseColors = ["text-[#00B8D9]", "text-warning", "text-success"];
  const phaseBg = ["bg-[#00B8D9]/[0.08]", "bg-warning/[0.08]", "bg-success/[0.08]"];

  return (
    <section ref={ref} className="py-24 bg-surface-elevated/15 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-[0.02] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">

        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
          <p className="text-[12px] font-semibold text-accent uppercase tracking-widest mb-3">Real deal flow</p>
          <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary">
            Negotiate like pros.{" "}
            <span className="text-text-secondary font-medium">Not over DMs.</span>
          </h2>
          <p className="mt-4 text-[15px] text-text-secondary max-w-lg mx-auto">
            Structured offer and counter-offer built into the platform. All terms logged, timestamped, and ready for contract the moment both sides agree.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-8 items-start">

          {/* Phase selector */}
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
            {phaseLabels.map((label, i) => (
              <button
                key={label}
                onClick={() => setPhase(i)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200 shrink-0 lg:w-full ${phase === i ? `${phaseBg[i]} border border-current/20` : "hover:bg-surface-elevated/50"}`}
              >
                <div className={`h-2 w-2 rounded-full ${phase === i ? (i === 2 ? "bg-success" : i === 1 ? "bg-warning" : "bg-[#00B8D9]") : "bg-border"} ${phase === i ? "animate-pulse" : ""}`} />
                <span className={`text-[12px] font-semibold ${phase === i ? phaseColors[i] : "text-text-secondary"}`}>{label}</span>
              </button>
            ))}

            {/* What SYNQ adds */}
            <div className="hidden lg:block mt-6 pt-6 border-t border-border/30 space-y-3">
              <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider">What SYNQ adds</p>
              {[
                "All terms in writing",
                "Timestamped messages",
                "Auto-generates contract",
                "No ambiguous DMs",
              ].map(item => (
                <div key={item} className="flex items-center gap-2 text-[11px] text-text-secondary">
                  <CheckCircle2 className="h-3 w-3 text-success shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chat window */}
          <div className="rounded-2xl bg-surface border border-border/50 overflow-hidden shadow-lg">
            {/* Window chrome */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/30 bg-surface-elevated/40">
              <div className="flex items-center gap-2.5">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-error/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-warning/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-success/50" />
                </div>
                <span className="text-[11px] text-text-secondary ml-2">Negotiation — Spring Glow Campaign</span>
              </div>
              <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${phaseBg[phase]} ${phaseColors[phase]}`}>
                <div className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                {phaseLabels[phase]}
              </div>
            </div>

            {/* Messages */}
            <div className="p-4 space-y-4 min-h-[320px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={phase}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  {thread.map((msg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}>
                      {msgBubble(msg)}
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Input bar — disabled, shows next action */}
            <div className="px-4 py-3 border-t border-border/30 bg-surface-elevated/20">
              {phase === 2 ? (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                  <p className="text-[12px] text-success font-medium">Terms agreed — contract auto-generated and ready to sign</p>
                </div>
              ) : (
                <div className="flex items-center gap-2 rounded-xl bg-surface-elevated/50 border border-border/30 px-3 py-2 opacity-50">
                  <p className="text-[11px] text-text-secondary flex-1">{phase === 0 ? "Creator reviewing offer…" : "Brand reviewing counter…"}</p>
                  <Send className="h-3.5 w-3.5 text-text-secondary shrink-0" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   CAMPAIGN RESULTS — Reach, engagement, conversions, ROI
═══════════════════════════════════════════════════════ */
function CampaignResultsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const campaigns = [
    {
      brand: "Bloom Skincare", campaign: "Spring Glow",
      brandInitials: "BS", brandColor: "bg-pink-500/10 text-pink-500",
      budget: "₹54,000", status: "Completed",
      creators: [
        { name: "Priya Sharma", handle: "@priyacreates", reach: "1.9L", engagement: "4.8%", saves: "8,200", cpe: "₹2.84", gmv: "₹1.2L", score: 94 },
        { name: "Riya Kapoor", handle: "@riyabeauty", reach: "1.7L", engagement: "5.9%", saves: "7,400", cpe: "₹2.65", gmv: "₹1.5L", score: 89 },
      ],
      totals: { reach: "3.6L", engagement: "5.3%", saves: "15,600", gmv: "₹2.7L", roi: "5.0×" },
    },
    {
      brand: "NutriPro India", campaign: "Wellness Series",
      brandInitials: "NP", brandColor: "bg-[#00B8D9]/10 text-[#00B8D9]",
      budget: "₹38,500", status: "Completed",
      creators: [
        { name: "Sneha Rao", handle: "@snehafit", reach: "78K", engagement: "7.1%", saves: "5,100", cpe: "₹2.10", gmv: "₹84K", score: 97 },
        { name: "Devraj Menon", handle: "@devfoods", reach: "91K", engagement: "8.4%", saves: "6,800", cpe: "₹1.98", gmv: "₹1.1L", score: 95 },
      ],
      totals: { reach: "1.7L", engagement: "7.8%", saves: "11,900", gmv: "₹1.94L", roi: "5.0×" },
    },
  ];

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-[0.02] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">

        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[12px] font-semibold text-accent uppercase tracking-widest mb-3">Real results</p>
            <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary">
              What good campaigns look like.
            </h2>
            <p className="mt-3 text-[15px] text-text-secondary max-w-xl">
              After every campaign on SYNQ, brands get a full analytics report — reach, engagement, CPE, and GMV impact — broken down per creator.
            </p>
          </div>
          <Link href="/register?role=BUSINESS">
            <Button variant="outline" className="gap-2 shrink-0 hover:border-accent/30 hover:text-accent transition-all duration-200">
              Run your first campaign <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="space-y-6">
          {campaigns.map((camp, ci) => (
            <motion.div
              key={camp.campaign}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: ci * 0.15, duration: 0.45 }}
              className="rounded-2xl bg-surface border border-border/40 overflow-hidden shadow-sm"
            >
              {/* Campaign header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border/30 bg-surface-elevated/30">
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-xl ${camp.brandColor} flex items-center justify-center text-[11px] font-bold shrink-0`}>
                    {camp.brandInitials}
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-text-primary">{camp.brand} · {camp.campaign}</p>
                    <p className="text-[10px] text-text-secondary">Budget: {camp.budget} · {camp.creators.length} creators</p>
                  </div>
                </div>
                <span className="rounded-full bg-success/10 border border-success/20 text-success text-[10px] font-semibold px-3 py-1">{camp.status}</span>
              </div>

              {/* Per-creator table */}
              <div className="overflow-x-auto">
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="border-b border-border/20 bg-surface-elevated/20">
                      <th className="text-left px-5 py-2.5 text-text-secondary font-medium">Creator</th>
                      <th className="text-right px-4 py-2.5 text-text-secondary font-medium">Reach</th>
                      <th className="text-right px-4 py-2.5 text-text-secondary font-medium">Engage</th>
                      <th className="text-right px-4 py-2.5 text-text-secondary font-medium">Saves</th>
                      <th className="text-right px-4 py-2.5 text-text-secondary font-medium">CPE</th>
                      <th className="text-right px-4 py-2.5 text-text-secondary font-medium">GMV impact</th>
                      <th className="text-right px-5 py-2.5 text-text-secondary font-medium">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {camp.creators.map((c, i) => (
                      <motion.tr
                        key={c.handle}
                        initial={{ opacity: 0, x: -8 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2 + ci * 0.15 + i * 0.08 }}
                        className="border-b border-border/15 hover:bg-surface-elevated/30 transition-colors"
                      >
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <CreatorAvatar name={c.name} size="sm" className="shrink-0" />
                            <div>
                              <p className="font-semibold text-text-primary">{c.name}</p>
                              <p className="text-text-secondary text-[10px]">{c.handle}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-text-primary">{c.reach}</td>
                        <td className="px-4 py-3 text-right font-bold text-accent">{c.engagement}</td>
                        <td className="px-4 py-3 text-right text-text-secondary">{c.saves}</td>
                        <td className="px-4 py-3 text-right text-success font-semibold">{c.cpe}</td>
                        <td className="px-4 py-3 text-right font-bold text-success">{c.gmv}</td>
                        <td className="px-5 py-3 text-right">
                          <span className="inline-flex items-center justify-center rounded-full bg-accent/[0.08] text-accent font-bold text-[10px] px-2 py-0.5 min-w-[36px]">
                            {c.score}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                    {/* Totals row */}
                    <tr className="bg-surface-elevated/40 font-semibold">
                      <td className="px-5 py-3 text-[11px] font-bold text-text-primary">Campaign total</td>
                      <td className="px-4 py-3 text-right text-[12px] font-bold text-text-primary">{camp.totals.reach}</td>
                      <td className="px-4 py-3 text-right text-[12px] font-bold text-accent">{camp.totals.engagement}</td>
                      <td className="px-4 py-3 text-right text-[11px] text-text-secondary">{camp.totals.saves}</td>
                      <td className="px-4 py-3 text-right text-[11px] text-success">{camp.totals.saves}</td>
                      <td className="px-4 py-3 text-right text-[12px] font-bold text-success">{camp.totals.gmv}</td>
                      <td className="px-5 py-3 text-right">
                        <span className="inline-flex items-center justify-center rounded-full bg-success/[0.1] text-success font-bold text-[10px] px-2.5 py-0.5">
                          {camp.totals.roi} ROI
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Benchmark callout */}
              <div className="px-5 py-3 bg-surface-elevated/10 border-t border-border/20 flex flex-wrap items-center gap-x-6 gap-y-1.5 text-[11px] text-text-secondary">
                <span className="flex items-center gap-1.5"><TrendingUp className="h-3 w-3 text-success" /> Engagement <span className="font-semibold text-success">{camp.totals.engagement}</span> vs. <span>3.1% category avg</span></span>
                <span className="flex items-center gap-1.5"><IndianRupee className="h-3 w-3 text-success" /> GMV <span className="font-semibold text-success">{camp.totals.gmv}</span> from <span>{camp.budget} spend</span></span>
                <span className="flex items-center gap-1.5"><BarChart3 className="h-3 w-3 text-accent" /> <span className="font-semibold text-accent">{camp.totals.roi}</span> return on ad spend</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Creator dashboard teaser */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-8 rounded-2xl border border-border/40 bg-surface overflow-hidden shadow-sm"
        >
          <div className="px-5 py-4 border-b border-border/30 bg-surface-elevated/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CreatorAvatar name="Priya Sharma" size="sm" />
                <div>
                  <p className="text-[12px] font-bold text-text-primary">Priya Sharma — Creator Dashboard</p>
                  <p className="text-[10px] text-text-secondary">April 2025 · 3 active deals</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                <span className="text-[10px] text-success font-medium">Live</span>
              </div>
            </div>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
              {[
                { label: "Earned this month", value: "₹54,000", sub: "+₹12K today", c: "text-text-primary", subc: "text-success" },
                { label: "Active deals", value: "3", sub: "1 needs action", c: "text-text-primary", subc: "text-warning" },
                { label: "Pending invites", value: "4", sub: "2 brand-new", c: "text-accent", subc: "text-text-secondary" },
                { label: "Avg CPE this month", value: "₹2.84", sub: "vs ₹6.20 industry", c: "text-success", subc: "text-text-secondary" },
              ].map(s => (
                <div key={s.label} className="rounded-xl border border-border/30 bg-surface-elevated/30 p-3">
                  <p className="text-[10px] text-text-secondary mb-1">{s.label}</p>
                  <p className={`text-[20px] font-bold ${s.c}`}>{s.value}</p>
                  <p className={`text-[10px] ${s.subc}`}>{s.sub}</p>
                </div>
              ))}
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { brand: "Bloom Skincare", status: "Reel #2 in review", badge: "Action needed", badgeC: "bg-warning/10 text-warning border-warning/20", pay: "₹12,000", days: "2 days left" },
                { brand: "TrailCo Outdoors", status: "Brief accepted · Day 3", badge: "Active", badgeC: "bg-success/10 text-success border-success/20", pay: "₹18,000", days: "8 days left" },
                { brand: "NutriPro India", status: "Awaiting signature", badge: "Sign contract", badgeC: "bg-accent/10 text-accent border-accent/20", pay: "₹9,500", days: "Pending" },
              ].map(d => (
                <div key={d.brand} className="rounded-xl border border-border/30 bg-surface p-3 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-accent/[0.07] flex items-center justify-center text-[11px] font-bold text-accent shrink-0">
                    {d.brand.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-text-primary truncate">{d.brand}</p>
                    <p className="text-[10px] text-text-secondary">{d.status}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`inline-block rounded-full px-1.5 py-0.5 text-[9px] font-semibold border ${d.badgeC}`}>{d.badge}</span>
                    <p className="text-[10px] font-bold text-text-primary mt-0.5">{d.pay}</p>
                  </div>
                </div>
              ))}
            </div>
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
            <Image src={theme === "dark" ? "/synq logo night mode.png" : "/synq logo light mode.png"} alt="SYNQ" width={80} height={26} className="h-6 w-auto object-contain mb-3" />
            <p className="text-[12px] text-text-secondary leading-relaxed max-w-[180px]">Structured brand-creator collaborations. Built for India.</p>
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
                  <li key={label}><a href={href} className="text-[12px] text-text-secondary hover:text-text-primary transition-colors">{label}</a></li>
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
      <MarketplacePulseSection />
      <MarketProblemSection />
      <ProblemSection />
      <LiveDemoSection />
      <DealNegotiationSection />
      <RealUseCaseSection />
      <PaymentEscrowSection />
      <DifferentiationSection />
      <HowItWorksSection />
      <SYNQTimeline />
      <MarketplaceInteractionSection />
      <CaseStudySection />
      <CampaignResultsSection />
      <CreatorSection />
      <TopCreatorsSection />
      <FeaturedCampaignsSection />
      <DualAudienceSection />
      <SocialProofSection />
      <OnboardingPreviewSection />
      <PricingSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
