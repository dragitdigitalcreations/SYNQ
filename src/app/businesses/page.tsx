"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Shield, Lock, Zap, TrendingUp,
  Send, BarChart3, FileText, Users, IndianRupee, Star,
  Clock, ChevronRight, CheckCheck, Sparkles, Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { useRef } from "react";

const fu = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

/* ── Creator initials avatar ── */
function CreatorAvatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const palette = [
    "from-[#6C5CE7] to-[#a29bfe]", "from-[#00B8D9] to-[#74b9ff]",
    "from-[#00b894] to-[#55efc4]", "from-[#e17055] to-[#fab1a0]",
  ];
  const gradient = palette[initials.charCodeAt(0) % palette.length];
  const sz = size === "sm" ? "h-7 w-7 text-[10px]" : size === "lg" ? "h-12 w-12 text-[16px]" : "h-9 w-9 text-[12px]";
  return (
    <div className={`rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center font-bold text-white shrink-0 ${sz}`}>
      {initials}
    </div>
  );
}

const creators = [
  { name: "Priya Sharma", handle: "@priyacreates", niche: "Fashion", followers: "2.1L", engagement: "4.8%", match: "94%" },
  { name: "Marcus Chen", handle: "@marcustech", niche: "Tech", followers: "3.4L", engagement: "5.2%", match: "91%" },
  { name: "Sneha Rao", handle: "@snehafit", niche: "Fitness", followers: "85K", engagement: "7.1%", match: "88%" },
];

export default function BusinessesPage() {
  const { theme } = useTheme();
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const howRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-80px" });
  const howInView = useInView(howRef, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-background text-text-primary">

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-surface-glass backdrop-blur-xl border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-8">
          <Link href="/" className="shrink-0">
            <Image
              src={theme === "dark" ? "/synq logo night mode.png" : "/synq logo light mode.png"}
              alt="SYNQ" width={88} height={28} className="h-7 w-auto object-contain"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-[13px] text-text-secondary flex-1">
            {[["For Creators", "/"], ["Pricing", "/#pricing"], ["How it works", "/#how-it-works"]].map(([l, h]) => (
              <a key={l} href={h} className="hover:text-text-primary transition-colors">{l}</a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2.5">
            <Link href="/login" className="hidden md:block text-[13px] text-text-secondary hover:text-text-primary transition-colors px-2">Sign in</Link>
            <Link href="/register?role=BUSINESS">
              <Button size="sm" className="glow-accent text-[13px] h-9 px-4 gap-1.5">
                Start Free Trial <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00B8D9]/[0.06] via-transparent to-accent/[0.04] pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#00B8D9]/[0.04] blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div {...fu(0)}>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#00B8D9]/[0.08] border border-[#00B8D9]/[0.15] px-3.5 py-1.5 text-[12px] font-medium text-[#00B8D9] mb-8">
                <div className="h-1.5 w-1.5 rounded-full bg-[#00B8D9] animate-pulse" />
                SYNQ for Brands · 14-day free trial
              </div>
            </motion.div>

            <motion.h1 {...fu(0.07)} className="text-[40px] sm:text-[54px] lg:text-[62px] font-bold tracking-[-0.03em] leading-[1.06] text-text-primary mb-6">
              Run influencer campaigns
              <br />
              <span className="bg-gradient-to-r from-[#00B8D9] to-accent bg-clip-text text-transparent">
                that actually deliver ROI.
              </span>
            </motion.h1>

            <motion.p {...fu(0.15)} className="text-[17px] text-text-secondary leading-[1.72] max-w-2xl mx-auto mb-4">
              Brief, contract, review, pay — one structured workspace. Stop losing ₹ to bad-fit creators, missed deadlines, and scope disputes.
            </motion.p>

            <motion.p {...fu(0.19)} className="text-[13px] text-text-secondary/70 mb-10">
              For D2C brands spending ₹50K+ per month on influencer marketing.
            </motion.p>

            <motion.div {...fu(0.24)} className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/register?role=BUSINESS">
                <Button size="lg" className="glow-accent gap-2 text-[15px] h-12 px-8 font-semibold hover:scale-[1.02] active:scale-[0.98] transition-transform">
                  Start Free Trial <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/#demo">
                <Button variant="outline" size="lg" className="gap-2 text-[15px] h-12 px-6 hover:border-[#00B8D9]/40 hover:text-[#00B8D9] transition-all">
                  See how it works <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div {...fu(0.3)} className="flex flex-wrap items-center justify-center gap-5 mt-8 text-[13px] text-text-secondary">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> 14-day free trial</span>
              <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-success" /> Escrow-protected payments</span>
              <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-success" /> Signed contracts</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div ref={statsRef} className="border-y border-border/40 bg-surface-elevated/20">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "850+", label: "Verified creators", sub: "across India" },
              { value: "2,400+", label: "Deals completed", sub: "with 98% satisfaction" },
              { value: "₹2.84", label: "Avg cost-per-engage", sub: "vs ₹6.2 industry avg" },
              { value: "4.2 days", label: "Avg campaign delivery", sub: "vs 18 days without SYNQ" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07 }}
              >
                <div className="text-[28px] sm:text-[32px] font-bold text-text-primary tracking-tight">{s.value}</div>
                <div className="text-[13px] font-medium text-text-primary mt-0.5">{s.label}</div>
                <div className="text-[11px] text-text-secondary">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works — brand flow */}
      <section ref={howRef} className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={howInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-14">
            <p className="text-[12px] font-semibold text-[#00B8D9] uppercase tracking-widest mb-3">How it works</p>
            <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary">Three steps, zero chaos</h2>
            <p className="mt-4 text-[15px] text-text-secondary max-w-md mx-auto">From brief to campaign analytics in days, not weeks.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 relative">
            <div className="absolute top-10 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-transparent via-border to-transparent hidden md:block" />
            {[
              {
                n: "01", title: "Post your campaign brief",
                desc: "Define audience, deliverables, and budget. The brief goes live instantly — matched creators respond within hours.",
                outcome: "First response avg: 4h",
                preview: (
                  <div className="rounded-xl bg-surface-elevated/50 border border-border/30 p-3 space-y-2">
                    <p className="text-[9px] text-text-secondary uppercase tracking-wider mb-2">Campaign brief</p>
                    {[["Campaign", "Spring Glow"], ["Deliverable", "3 Reels · ₹54K"], ["Timeline", "14 days"]].map(([l, v]) => (
                      <div key={l} className="flex justify-between text-[10px]">
                        <span className="text-text-secondary">{l}</span>
                        <span className="font-semibold text-text-primary">{v}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-1 mt-1 text-[9px] text-[#00B8D9]"><Zap className="h-2.5 w-2.5" /> 12 creators matched</div>
                  </div>
                ),
              },
              {
                n: "02", title: "Pick the right creator",
                desc: "See AI match scores, engagement rates, past reviews, and on-time delivery rates. Every metric is real — not self-reported.",
                outcome: "92% on-time delivery",
                preview: (
                  <div className="rounded-xl bg-surface-elevated/50 border border-border/30 p-3 space-y-2">
                    {creators.slice(0, 2).map((c, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CreatorAvatar name={c.name} size="sm" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-semibold text-text-primary truncate">{c.name}</p>
                          <p className="text-[9px] text-text-secondary">{c.engagement} eng</p>
                        </div>
                        <span className="text-[9px] font-bold rounded-full bg-[#00B8D9]/10 text-[#00B8D9] px-1.5 py-0.5">{c.match}</span>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                n: "03", title: "Review, approve, measure ROI",
                desc: "Approve drafts with structured feedback. Payments release per milestone. Analytics track CPE vs category benchmarks.",
                outcome: "2.4× better CPE",
                preview: (
                  <div className="rounded-xl bg-surface-elevated/50 border border-border/30 p-3">
                    <div className="grid grid-cols-3 gap-1.5">
                      {[["CPE", "₹2.84", "text-success"], ["Saves", "8.2%", "text-success"], ["OT", "100%", "text-success"]].map(([l, v, c]) => (
                        <div key={l} className="rounded-lg bg-surface border border-border/20 p-2 text-center">
                          <p className={`text-[12px] font-bold ${c}`}>{v}</p>
                          <p className="text-[8px] text-text-secondary">{l}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-[9px] text-[#00B8D9]"><TrendingUp className="h-2.5 w-2.5" /> 2.4× above avg</div>
                  </div>
                ),
              },
            ].map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 18 }}
                animate={howInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                className="rounded-2xl bg-surface border border-border/50 p-5 hover:border-[#00B8D9]/20 hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="h-11 w-11 rounded-xl bg-[#00B8D9]/[0.08] flex items-center justify-center mb-4">
                  <span className="text-[15px] font-bold font-mono text-[#00B8D9]">{step.n}</span>
                </div>
                <h3 className="text-[15px] font-semibold text-text-primary mb-2">{step.title}</h3>
                <p className="text-[12px] text-text-secondary leading-relaxed mb-4">{step.desc}</p>
                <div className="mb-4 flex-1">{step.preview}</div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#00B8D9]/[0.07] text-[#00B8D9] px-2.5 py-1 text-[11px] font-medium">
                  <Zap className="h-3 w-3" /> {step.outcome}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section ref={featuresRef} className="py-24 bg-surface-elevated/15">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={featuresInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-14">
            <p className="text-[12px] font-semibold text-[#00B8D9] uppercase tracking-widest mb-3">What you get</p>
            <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-text-primary">Everything to run campaigns properly.</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                icon: Users, title: "AI Creator Matching",
                desc: "Find creators who actually match your audience — not just follower count. SYNQ scores on overlap, content fit, and brand reliability.",
                result: "92% accuracy vs manual search",
                c: "text-[#00B8D9] bg-[#00B8D9]/[0.08]",
              },
              {
                icon: FileText, title: "Structured Campaign Briefs",
                desc: "Deliverables, timelines, revision limits, and budget locked before anyone starts work. Both sides see the same source of truth.",
                result: "67% fewer scope changes",
                c: "text-accent bg-accent/[0.08]",
              },
              {
                icon: Lock, title: "Escrow-Protected Payments",
                desc: "Funds are held in escrow from contract sign. Auto-release on approval. No chasing, no bank transfer delays.",
                result: "98% on-time payment rate",
                c: "text-success bg-success/[0.08]",
              },
              {
                icon: BarChart3, title: "Real ROI Analytics",
                desc: "Cost-per-engagement tracked vs category benchmarks. Know which creator, which format, and which campaign drove actual GMV.",
                result: "2.4× better CPE on avg",
                c: "text-[#00B8D9] bg-[#00B8D9]/[0.08]",
              },
              {
                icon: Star, title: "Creator Reliability Scores",
                desc: "On-time delivery rate, brand reviews, response time, and revision history — visible on every profile before you send a brief.",
                result: "Reduce bad-fit hires before they happen",
                c: "text-warning bg-warning/[0.08]",
              },
              {
                icon: CheckCheck, title: "Structured Review & Feedback",
                desc: "Approve drafts with timestamped notes. Revisions are tracked. No feedback lost in email threads. Full audit trail.",
                result: "Zero revision disputes on signed deals",
                c: "text-accent bg-accent/[0.08]",
              },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 14 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.07 }}
                className="rounded-2xl bg-surface border border-border/50 p-6 hover:border-[#00B8D9]/20 hover:shadow-md transition-all duration-300"
              >
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-4 ${f.c}`}>
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-semibold text-text-primary mb-2">{f.title}</h3>
                <p className="text-[13px] text-text-secondary leading-relaxed mb-3">{f.desc}</p>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#00B8D9]/[0.06] border border-[#00B8D9]/[0.10] px-2.5 py-1 text-[11px] font-medium text-[#00B8D9]">
                  <Zap className="h-2.5 w-2.5" /> {f.result}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator pool preview */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[12px] font-semibold text-[#00B8D9] uppercase tracking-widest mb-4">Creator discovery</p>
              <h2 className="text-[32px] sm:text-[40px] font-bold tracking-tight text-text-primary mb-4">
                850+ verified creators,<br />ready to work with you.
              </h2>
              <p className="text-[15px] text-text-secondary leading-relaxed mb-6">
                Every creator shows real engagement data, on-time delivery history, and verified brand reviews. You know exactly what you&apos;re getting before the brief is sent.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Filter by niche, engagement rate, city, platform",
                  "AI match score against your audience profile",
                  "Past brand reviews and dispute history",
                  "Real rate cards — no negotiation surprises",
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-[13px] text-text-secondary">
                    <CheckCircle2 className="h-4 w-4 text-[#00B8D9] shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/register?role=BUSINESS">
                <Button className="gap-2 border border-[#00B8D9]/30 bg-[#00B8D9]/[0.07] text-[#00B8D9] hover:bg-[#00B8D9]/[0.12] transition-all h-11 text-[13px]">
                  Browse creators <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {creators.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="rounded-2xl bg-surface border border-border/50 p-4 flex items-center gap-4 hover:border-[#00B8D9]/20 hover:shadow-sm transition-all duration-200"
                >
                  <CreatorAvatar name={c.name} size="lg" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-text-primary">{c.name} <span className="font-normal text-text-secondary">{c.handle}</span></p>
                    <p className="text-[11px] text-text-secondary">{c.niche} · {c.followers} followers · {c.engagement} engagement</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="rounded-full bg-[#00B8D9]/10 px-2.5 py-1 text-[11px] font-bold text-[#00B8D9] mb-1">{c.match} match</div>
                    <Link href="/register?role=BUSINESS">
                      <button className="text-[10px] text-accent hover:underline flex items-center gap-1 ml-auto">
                        Send brief <Send className="h-2.5 w-2.5" />
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
              <div className="text-center pt-2">
                <Link href="/register?role=BUSINESS" className="text-[13px] text-text-secondary hover:text-text-primary transition-colors flex items-center justify-center gap-1.5">
                  See all 850+ creators <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing snippet */}
      <section className="py-20 bg-surface-elevated/15">
        <div className="max-w-xl mx-auto px-6 text-center">
          <p className="text-[12px] font-semibold text-[#00B8D9] uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-[32px] font-bold tracking-tight text-text-primary mb-4">Simple, usage-based pricing.</h2>
          <div className="rounded-2xl border-2 border-[#00B8D9]/20 bg-surface p-8 mb-6">
            <div className="flex items-baseline gap-2 justify-center mb-1">
              <span className="text-[48px] font-bold text-text-primary">₹3,999</span>
              <span className="text-text-secondary">/month</span>
            </div>
            <p className="text-[13px] text-text-secondary mb-6">14-day free trial · No credit card</p>
            <ul className="space-y-2.5 mb-8 text-left">
              {[
                "AI creator matching (92% accuracy)",
                "Unlimited campaign briefs",
                "Signed contracts + escrow payments",
                "Advanced ROI analytics & benchmarks",
                "Creator reliability scores",
                "Priority support & onboarding",
              ].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-[13px] text-text-secondary">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <Link href="/register?role=BUSINESS">
              <Button className="w-full h-11 text-[14px] glow-accent gap-2 hover:scale-[1.01] transition-transform">
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <p className="text-[12px] text-text-secondary">Free for creators · Brands pay ₹3,999/mo · Cancel anytime</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div
            className="rounded-3xl overflow-hidden relative px-10 py-16 text-center"
            style={{ background: "linear-gradient(135deg, #00B8D9 0%, #6C5CE7 100%)" }}
          >
            <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3.5 py-1.5 text-[12px] font-medium text-white/80 mb-6">
                <Sparkles className="h-3.5 w-3.5" /> Join 850+ brands and creators already on SYNQ
              </div>
              <h2 className="text-[32px] sm:text-[44px] font-bold text-white tracking-tight leading-[1.1] mb-4">
                Your next campaign,<br />fully structured from day one.
              </h2>
              <p className="text-white/70 text-[16px] mb-4 max-w-sm mx-auto">
                Brief locked. Contract signed. Payment protected.
              </p>
              <p className="text-white/40 text-[13px] mb-10">
                Avg time from signup to first campaign live: <span className="text-white/65 font-semibold">4h 12min</span>
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/register?role=BUSINESS">
                  <Button size="lg" className="bg-white text-[#00B8D9] hover:bg-white/90 gap-2 text-[15px] h-12 px-8 font-semibold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-transform">
                    Start Free Trial — 14 days <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/register?role=CREATOR">
                  <Button size="lg" variant="ghost" className="text-white/85 hover:text-white hover:bg-white/10 gap-2 text-[15px] h-12 border border-white/20">
                    <Camera className="h-4 w-4" /> I&apos;m a Creator
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-8 text-[12px] text-white/45">
                <span className="flex items-center gap-1.5"><IndianRupee className="h-3.5 w-3.5" /> Escrow-protected</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 14-day trial</span>
                <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" /> Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
