# SYNQ — Product Sitemap & User Journey (Updated)
### Figma-Ready Documentation for Portfolio

---

## PRODUCT IDENTITY

**SYNQ is a collaboration workspace, not a marketplace.**

- Discovery (finding creators/brands) is an **entry point**, not the core product
- The **workspace** is the product — scope contracts, milestone payments, feedback loops, dispute resolution
- Every collab gets its own dedicated workspace with separated concerns
- The landing page leads with "Where Creators and Brands Build Together"
- Brand identity: Electric Violet (#6C5CE7) accent + Cyan (#00B8D9) secondary, dark-mode-first
- India-focused: all currency in INR (₹), Indian locale formatting

---

## PRODUCT SITEMAP

```
SYNQ
│
├── PUBLIC PAGES
│   ├── / ─────────────────────── Landing Page (7 sections)
│   │   ├── Hero (workspace-first: collab demo — Workspace/Scope/Payments)
│   │   ├── How It Works (4-step interactive with real product screens)
│   │   ├── Creator Discovery (15 verticals, INR rates, decision signals)
│   │   ├── Collaboration Workspace (6 separated tabs: Scope/Files/Chat/Feedback/Payments/Analytics)
│   │   ├── For Creators / For Businesses (with dispute flow + actionable analytics)
│   │   ├── Social Proof (merged: trust signals + testimonials + showcase)
│   │   ├── Pricing (Free / ₹3,999 mo)
│   │   ├── Final CTA (dual: Creator + Business)
│   │   └── Footer (India-focused)
│   │
│   ├── /creators/[id] ────────── Creator Public Portfolio
│   │   ├── Cover + Avatar + Verified badge
│   │   ├── Metrics grid (followers, engagement, response time, on-time rate, repeat rate)
│   │   ├── Badges section
│   │   ├── Portfolio grid
│   │   ├── Rate card
│   │   ├── Connected platforms
│   │   └── Collaboration history
│   │
│   └── /login ────────────────── Sign In Page
│
├── AUTH FLOW
│   ├── /register ─────────────── Registration
│   │   ├── Role selection (Creator / Business)
│   │   ├── Email + Password
│   │   └── → Redirect to onboarding
│   │
│   ├── /onboarding/creator ───── Creator Onboarding (6-step wizard)
│   │   ├── Step 1: Basic Info (name, location, bio, avatar upload)
│   │   ├── Step 2: Social Connect (Instagram, YouTube, Twitter, TikTok)
│   │   ├── Step 3: Content Profile (verticals, formats)
│   │   ├── Step 4: Collaboration Preferences (min budget, exclusions, availability)
│   │   ├── Step 5: Rate Card (pricing per format)
│   │   └── Step 6: Review & Submit
│   │   └── ❌ DROP-OFF: Save partial progress, send "Complete your profile" reminder at 24h, 72h
│   │
│   └── /onboarding/business ──── Business Onboarding (wizard)
│       ├── Step 1: Company Info (name, industry, size, website)
│       ├── Step 2: Brand Profile (target demographics, content preferences)
│       ├── Step 3: Campaign Goals (objectives, budget range)
│       └── Step 4: Review & Submit
│       └── ❌ DROP-OFF: Save partial progress, follow-up email with "here's what you'll unlock"
│
├── CREATOR DASHBOARD (/dashboard/creator)
│   ├── /dashboard/creator ────── Home
│   │   ├── Stat cards (earnings, active collabs, profile views, response time)
│   │   ├── Matched opportunities grid (with decision signals: brand reliability, effort estimate, reach)
│   │   ├── Active collaborations list
│   │   └── Recent activity feed
│   │
│   ├── /dashboard/creator/campaigns ── My Campaigns
│   │   └── List of campaigns I'm part of
│   │
│   ├── /dashboard/creator/campaigns/[id] ── Campaign Details
│   │   ├── Overview tab (campaign info, brand details, match score)
│   │   ├── Deliverables tab (milestones, progress tracking)
│   │   ├── Payments tab (escrow status, dispute resolution)
│   │   └── Analytics tab (performance metrics, AI insights)
│   │
│   ├── /dashboard/creator/collaborations ── Active Collaborations
│   │   └── All collaboration cards with status
│   │
│   ├── /dashboard/creator/analytics ── Performance Analytics
│   │   ├── Actionable insights (save rates vs benchmarks, cost-per-engage, content format performance)
│   │   ├── Earnings over time
│   │   ├── Reputation score breakdown (response time, on-time rate, repeat rate)
│   │   └── Collaboration success rate + drop-off points
│   │
│   ├── /dashboard/creator/messages ── Messages
│   │   ├── Conversation list
│   │   ├── Message thread (TEXT, FILE, SCOPE_CARD, PAYMENT_NOTIFICATION, SYSTEM)
│   │   └── Anti-disintermediation flagging
│   │
│   └── /dashboard/creator/settings ── Settings
│       ├── Profile editing
│       ├── Rate card management
│       ├── Notification preferences
│       └── Account settings
│
├── BUSINESS DASHBOARD (/dashboard/business)
│   ├── /dashboard/business ───── Home
│   │   ├── Stat cards (active campaigns, creators in pipeline, total spend, cost-per-engage)
│   │   ├── Response rate alerts
│   │   ├── Active campaigns grid
│   │   └── Creator pipeline (with match scores + reliability indicators)
│   │
│   ├── /dashboard/business/find-creators ── Creator Discovery
│   │   ├── Search bar
│   │   ├── Filter panel (verticals, budget range, engagement, location, on-time rate)
│   │   ├── Creator result cards (match scores + decision signals)
│   │   └── Actions: View Profile / Send Brief
│   │
│   ├── /dashboard/business/campaigns ── Campaign Management
│   │   └── All campaigns with status filters
│   │
│   ├── /dashboard/business/campaigns/[id] ── Campaign Details
│   │   ├── Overview tab (campaign info, creator roster, status)
│   │   ├── Deliverables tab (milestones, approval workflow)
│   │   ├── Payments tab (escrow, milestone releases, disputes)
│   │   └── Analytics tab (ROI metrics, AI insights)
│   │
│   ├── /dashboard/business/campaigns/new ── Campaign Builder
│   │   ├── Campaign details (name, objective, dates)
│   │   ├── Target criteria (audience, verticals)
│   │   ├── Deliverables management
│   │   └── Budget allocation
│   │
│   ├── /dashboard/business/analytics ── Analytics & ROI
│   │   ├── Campaign performance with actionable insights
│   │   ├── Creator comparison with benchmark data
│   │   ├── Cost-per-engage and save rate analysis
│   │   └── Exportable reports
│   │
│   ├── /dashboard/business/messages ── Messages
│   │   └── Same as creator messages
│   │
│   └── /dashboard/business/settings ── Settings
│       ├── Company profile editing
│       ├── Team management
│       ├── Billing
│       └── Notification preferences
│
├── COLLABORATION WORKSPACE (/collaborations/[id])
│   ├── Scope Tab ─────────────── Contract Details (SEPARATE from chat)
│   │   ├── Deliverables list with deadlines
│   │   ├── Total budget breakdown
│   │   ├── Usage rights and revision limits
│   │   └── Digital signatures
│   │
│   ├── Files Tab ─────────────── Asset Management (SEPARATE from chat)
│   │   ├── Brief documents
│   │   ├── Mood boards
│   │   ├── Draft uploads
│   │   └── Final deliverables
│   │
│   ├── Chat Tab ──────────────── Conversation Only (SEPARATE from scope/payments)
│   │   ├── Text messaging
│   │   ├── File sharing (links to Files tab)
│   │   ├── System notifications
│   │   └── Anti-disintermediation flagging
│   │
│   ├── Feedback Tab ──────────── Review Workflow
│   │   ├── Two-way feedback threads
│   │   ├── Revision tracking (shows remaining count)
│   │   └── Approval buttons
│   │
│   ├── Payments Tab ─────────── Escrow & Milestones (SEPARATE from chat)
│   │   ├── Escrow status
│   │   ├── Milestone-based releases
│   │   └── Dispute Resolution Flow:
│   │       ├── Step 1: Raise Issue (either party)
│   │       ├── Step 2: Mediation (platform mediator assigned within 24h)
│   │       ├── Step 3: Resolution (auto-resolved in 7 days if no response)
│   │       └── Outcomes: Full release / Partial release / Refund / Split
│   │
│   └── Analytics Tab ─────────── Actionable Campaign Metrics
│       ├── Save rates vs category benchmarks
│       ├── Cost-per-engagement analysis
│       ├── Reach vs projection tracking
│       └── AI-generated insights ("Reels get 2.3x more saves — consider adding 1 more")
│
└── SHARED PAGES
    ├── /messages ─────────────── Global Messaging Hub
    └── /settings ─────────────── Account Settings
```

---

## USER JOURNEY — CREATOR (with failure/drop-off paths)

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CREATOR USER JOURNEY                         │
└─────────────────────────────────────────────────────────────────────┘

AWARENESS                    CONSIDERATION                  ACTIVATION
─────────                    ─────────────                  ──────────
Landing Page ──────────────► "I'm a Creator" CTA ────────► Register
   │                              │                            │
   ├── Hero: "One workspace       ├── How It Works:            ├── Email + Password
   │   for every collab"          │   4-step walkthrough       │
   │                              │                            ▼
   ├── Workspace demo:            ├── For Creators card:    Onboarding Wizard
   │   See the real product       │   See exact benefits    (6 steps)
   │                              │                            │
   ├── Social proof:              └── Pricing: FREE            ├── 1. Basic Info
   │   Trust signals +                                         ├── 2. Connect Socials
   │   testimonials                                            ├── 3. Content Profile
   │                                                           ├── 4. Preferences
   └── Dispute resolution                                     ├── 5. Rate Card
       visibility                                              └── 6. Review → Submit

   ❌ DROP-OFF: Bounce                                         ❌ DROP-OFF: Incomplete onboarding
   → Retarget with "See                                        → Save progress at each step
     how Priya earned ₹2.85L"                                  → "Complete your profile" email at 24h
                                                               → "You're 1 step away" push at 72h
                                                               → Profile appears but marked "incomplete"


ONBOARDED                    MATCHING                       DECISION MOMENT
─────────                    ────────                       ───────────────
Creator Dashboard ─────────► Matched Opportunities ───────► Should I Accept?
   │                              │                            │
   ├── See stats                  ├── AI match score           ├── Brand reliability score (98% on-time pay)
   │   (earnings, views)          │   with reasoning           │
   │                              │                            ├── Estimated effort (~18h based on similar)
   ├── Profile complete?          ├── Brand profile             │
   │   → optimize                 │   preview                  ├── Expected reach projection (~45K)
   │                              │                            │
   └── Activity feed              └── Filter & search          ├── Repeat rate (how many creators return)
                                                               │
                                                               └── Decision: Accept / Negotiate / Decline

   ❌ DROP-OFF: No matches                                     ❌ DROP-OFF: Creator declines
   → "Complete your profile to                                 → Track decline reasons (budget too low,
     improve match quality"                                      brand mismatch, timeline too tight)
   → Suggest trending verticals                                → Feed back to matching algorithm
   → Manually curated picks                                    → Notify brand: "Creator passed — here's why"


COLLABORATION                DELIVERY                       COMPLETION
─────────────                ────────                       ──────────
Workspace Opens ───────────► Submit Deliverables ──────────► Get Paid
   │                              │                            │
   ├── Chat (separate tab)        ├── Upload drafts            ├── Milestone payment
   │   for conversation           │   to Files tab             │   auto-released
   │                              │                            │
   ├── Scope (separate tab)       ├── Track milestones         ├── Reputation score
   │   for contract               │   (visual progress)        │   updated ↑
   │                              │                            │
   ├── Feedback (separate tab)    ├── Receive feedback         ├── Actionable analytics
   │   for revisions              │   in Feedback tab          │   (save rates, benchmarks)
   │                              │                            │
   └── Payments (separate tab)    └── Iterate → Approve        └── Next match suggested
       for escrow + disputes                                       (flywheel)

   ❌ DROP-OFF: Creator ghosts                                 ❌ DROP-OFF: Deliverable rejected
   → Auto-reminder at 48h inactivity                           → Structured feedback required from brand
   → Warning at 5 days: "Respond or                            → Remaining revisions shown clearly
     collab may be flagged"                                    → If revisions exhausted:
   → At 7 days: Brand can Raise Issue                            → Mediation or scope renegotiation


DISPUTE FLOW (from any collaboration stage)
─────────────────────────────────────────────
Issue Raised ──────────────► Mediation ────────────────────► Resolution
   │                              │                            │
   ├── Either party can            ├── Platform mediator        ├── Full payment release
   │   raise an issue              │   assigned within 24h     │
   │                              │                            ├── Partial release (split)
   ├── Issue categories:           ├── Evidence review:         │
   │   - Quality concern           │   Files, chat history,    ├── Full refund
   │   - Missed deadline           │   scope contract          │
   │   - Scope disagreement        │                            └── Mediated compromise
   │   - Payment dispute           ├── Both parties respond
   │   - Communication issue       │   within 48h window
   │                              │
   └── Auto-freeze:               └── Auto-resolution if
       Escrow payments paused          no response in 7 days
       during dispute

   ❌ DROP-OFF: No resolution satisfaction
   → Escalation to senior review
   → Both parties can leave review
   → Dispute outcome affects reputation score
```

---

## USER JOURNEY — BUSINESS (with failure/drop-off paths)

```
┌─────────────────────────────────────────────────────────────────────┐
│                       BUSINESS USER JOURNEY                         │
└─────────────────────────────────────────────────────────────────────┘

AWARENESS                    CONSIDERATION                  ACTIVATION
─────────                    ─────────────                  ──────────
Landing Page ──────────────► "I'm a Brand" CTA ──────────► Register
   │                              │                            │
   ├── Hero: See the              ├── How It Works:            ├── Email + Password
   │   workspace in action        │   See workflow demo        │
   │                              │                            ▼
   ├── Discovery section:         ├── For Businesses card:  Onboarding Wizard
   │   Preview creator            │   ROI, analytics,       (4 steps)
   │   matching                   │   campaign management      │
   │                              │                            ├── 1. Company Info
   ├── Workspace demo:            └── Pricing: ₹3,999/mo       ├── 2. Brand Profile
   │   See collaboration               (14-day free trial)     ├── 3. Campaign Goals
   │   workspace                                               └── 4. Review → Submit
   │
   └── Dispute resolution                                     ❌ DROP-OFF: Incomplete onboarding
       + escrow visibility                                     → Save progress, resume later
                                                               → "Complete setup to find creators" email
   ❌ DROP-OFF: Bounce                                         → Show what they're missing
   → Retarget with creator
     quality + ROI data


ONBOARDED                    DISCOVERY                      OUTREACH
─────────                    ─────────                      ────────
Business Dashboard ────────► Find Creators ───────────────► Send Brief
   │                              │                            │
   ├── Active campaigns           ├── Search + filter          ├── Select creators
   │   overview                   │   (niche, budget,          │   from matches
   │                              │    engagement, location,   │
   ├── Creator pipeline           │    on-time rate)           ├── Customize scope
   │   with match scores          │                            │   (deliverables,
   │                              ├── AI match scoring         │    timeline, budget)
   ├── Spend tracking             │   (transparent reasoning)  │
   │                              │                            └── Invite to
   └── Cost-per-engage metrics    ├── Decision signals:            collaborate
                                  │   - Creator on-time rate
                                  │   - Repeat collab count
                                  │   - Response time avg
                                  │
                                  └── View public profiles

                                  ❌ DROP-OFF: No good matches  ❌ DROP-OFF: Creator declines invite
                                  → Adjust filters suggestion   → Show alternative creators
                                  → "Expand budget range"       → Suggest scope adjustments
                                  → Curated recommendations     → "3 similar creators available"


CAMPAIGN SETUP               COLLABORATION                  RESULTS
──────────────               ─────────────                  ───────
Create Campaign ───────────► Workspace Active ─────────────► Measure ROI
   │                              │                            │
   ├── Name, objective,           ├── Scope contract           ├── Actionable analytics:
   │   dates                      │   signed by both           │   save rates, cost-per-engage,
   │                              │                            │   benchmark comparisons
   ├── Target audience            ├── Chat tab for             │
   │   criteria                   │   conversation             ├── Creator comparison
   │                              │                            │   with benchmark data
   ├── Deliverables list          ├── Files tab for            │
   │   with deadlines             │   asset management         ├── AI insights:
   │                              │                            │   "Add 1 more Reel to maximize ROI"
   ├── Budget allocation          ├── Feedback tab for         │
   │                              │   structured reviews       ├── Exportable reports
   └── Invite matched             │                            │
       creators                   ├── Payments tab for         └── Re-engage top
                                  │   escrow + disputes            creators (flywheel)
                                  │
                                  └── Analytics tab for
                                      live performance

                                  ❌ DROP-OFF: Creator ghosts    ❌ DROP-OFF: Poor campaign results
                                  → Auto-reminders at 48h       → AI suggests: format changes,
                                  → "Raise Issue" after 7 days    creator swaps, budget reallocation
                                  → Dispute resolution flow     → Benchmark comparison to show
                                  → Replacement creator            where performance fell short
                                    suggestion                  → "Try these 3 creators for Round 2"
```

---

## INFORMATION ARCHITECTURE — LANDING PAGE SECTION FLOW

```
Section Flow (7 sections, down from 10 — merged for clarity):

┌──────────────────────────────────────────────────────────┐
│  1. HERO                                                  │
│  Question answered: "What is this?"                       │
│  → "Where Creators and Brands Build Together"             │
│  → Morphing SVG blob background (violet→cyan gradient)    │
│  → Workspace demo with animated gradient border           │
│  → Floating elements with parallax scroll effects         │
└──────────────┬───────────────────────────────────────────┘
               ▼
┌──────────────────────────────────────────────────────────┐
���  2. HOW IT WORKS (Interactive)                            │
│  Question answered: "How does it work?"                   │
│  → 4 steps with dot grid background pattern              │
│  → Gradient underline on section heading                 │
│  → Vertical accent line connecting steps                 │
│  → Floating gradient orbs + parallax effects             │
└──────────────┬───────────────────────────────────────────┘
               ▼
┌──────────────────────────────────────────────────────────┐
│  3. CREATOR DISCOVERY                                     │
│  Question answered: "Who's on here?"                      │
│  → Framed as entry point, not the core product           │
│  → Cards show decision signals: on-time rate, repeat rate │
│  → Phone mockup (Instagram preview) + Dashboard mockup   │
│  → SVG wave divider between sections                     │
└──────────────┬───────────────────────────────────────────┘
               ▼
┌──────────────────────────────────────────────────────────┐
│  4. COLLABORATION WORKSPACE (6-tab demo)                  │
│  Question answered: "How do we actually work together?"   │
│  → Separated tabs: Scope, Files, Chat, Feedback,         │
│    Payments, Analytics                                    │
│  → Chat ≠ Scope ≠ Payments (Problem 4 fix)               │
│  → Payments tab includes dispute resolution flow          │
│  → Analytics tab shows actionable insights, not vanity    │
└──────────────┬───────────────────────────────────────────┘
               ▼
┌──────────────────────────────────────────────────────────┐
│  5. FOR CREATORS / FOR BUSINESSES                         │
│  Question answered: "Is this for me?"                     │
│  → Creator: decision signals, dispute resolution, analytics │
│  → Business: separated concerns, actionable ROI           │
└──────────────┬───────────────────────────────────────────┘
               ▼
┌──────────────────────────────────────────────────────────┐
│  6. SOCIAL PROOF (Merged: Trust + Showcase + Testimonials) │
���  Question answered: "Can I trust this? What gets built?"  │
│  → Trust cards: Escrow (98%), Scope (2,400+), Reputation  │
│  → Animated count-up stats on scroll into view            │
│  → Gradient orbs + parallax scroll effects on cards       │
│  → Stats: ₹2.85L avg earnings, 92% match accuracy        │
└──────────────┬───────────────────────────────────────────┘
               ▼
┌──────────────────────────────────────────────────────────┐
│  7. PRICING                                               │
│  Question answered: "How much does it cost?"              │
│  → Creator: Free forever (includes dispute resolution)    │
│  → Business: ₹3,999/mo (actionable analytics, AI match)  │
└──────────────┬───────────────────────────────────────────┘
               ▼
┌──────────────────────────────────────────────────────────┐
│  8. FINAL CTA                                             │
│  → "Ready to collaborate — not just connect?"             │
│  → Dual CTAs: Creator (Free) / Business (Trial)          │
└──────────────────────────────────────────────────────────┘
```

---

## FIGMA FRAME STRUCTURE

```
📁 SYNQ — Product Design
│
├── 📄 Cover Page
│   └── Project name, date, version, your name
│
├── 📁 0. Design System
│   ├── Colors
│   │   ├── Background: #0F0F10 (dark-first)
│   │   ├── Surface: #18181B
│   │   ├── Border: #27272A
│   │   ├── Text Primary: #FAFAFA
│   │   ├── Text Secondary: #A1A1AA
│   │   ├── Accent: #6C5CE7 (Electric Violet — creative trust)
│   │   ├── Secondary: #00B8D9 (Cyan — clarity & progress)
│   │   ├── Success: #22C55E
│   │   ├── Warning: #F59E0B
│   │   └── Error: #EF4444
│   ├── Typography (Inter, scale: 10/11/12/13/14/15/16/18/20/24/32/40/48/64)
│   ├── Spacing (4/8/12/16/20/24/32/40/48/64/80/96)
│   ├── Shadows (xs/sm/md/lg/xl)
│   ├── Border Radius (8/10/12/14/16/20)
│   ├── Components (Button, Card, Badge, Avatar, Input, Tabs, etc.)
│   └── Icons (Lucide React icon set)
│
├── 📁 1. Landing Page (7 sections, not 10)
│   ├── 1.1 Nav (glass morphism, logo, links, CTA)
│   ├── 1.2 Hero (workspace-first: Workspace/Scope/Payments demo)
│   ├── 1.3 How It Works (4 steps + demo panel with decision signals)
│   ├── 1.4 Creator Discovery (filter pills + cards with reliability metrics)
│   ├── 1.5 Collaboration Workspace (6 separated tabs incl. dispute flow)
│   ├── 1.6 For Creators / For Businesses
│   ├── 1.7 Social Proof (merged: trust signals + testimonials + showcase)
│   ├── 1.8 Pricing
│   ├── 1.9 Final CTA
│   └── 1.10 Footer
│
├── 📁 2. Auth Flow
│   ├── 2.1 Login
│   ├── 2.2 Register (role selection)
│   ├── 2.3 Creator Onboarding (6 steps + drop-off handling)
│   └── 2.4 Business Onboarding (4 steps + drop-off handling)
│
├── 📁 3. Creator Dashboard
│   ├── 3.1 Home (stats + matches with decision signals + activity)
│   ├── 3.2 Campaigns
│   ├── 3.2a Campaign Details (4-tab: Overview, Deliverables, Payments, Analytics)
│   ├── 3.3 Collaborations
│   ├── 3.4 Analytics (actionable insights, not vanity metrics)
│   ├── 3.5 Messages
│   └── 3.6 Settings
│
├── 📁 4. Business Dashboard
│   ├── 4.1 Home (stats + pipeline + cost-per-engage)
│   ├── 4.2 Find Creators (search + filter + decision signals)
│   ├── 4.3 Campaign Builder (multi-step)
│   ├── 4.4 Campaign Management
│   ├── 4.4a Campaign Details (4-tab: Overview, Deliverables, Payments, Analytics)
│   ├── 4.5 Analytics & ROI (actionable insights)
│   ├── 4.6 Messages
│   └── 4.7 Settings
│
├── 📁 5. Collaboration Workspace (6 SEPARATED tabs)
│   ├── 5.1 Scope Tab (contract only — no chat)
│   ├── 5.2 Files Tab (assets only — no chat)
│   ├── 5.3 Chat Tab (conversation only — no scope/payment changes)
│   ├── 5.4 Feedback Tab (revisions + approvals)
│   ├── 5.5 Payments Tab (escrow + milestones + dispute resolution)
│   └── 5.6 Analytics Tab (actionable metrics + AI insights)
│
├── 📁 6. Dispute Resolution Flow
│   ├── 6.1 Raise Issue Screen (category selector + evidence upload)
│   ├── 6.2 Mediation View (mediator assigned, evidence review)
│   ├── 6.3 Resolution Screen (outcomes: release/partial/refund/split)
│   └── 6.4 Auto-Resolution (7-day timer, default outcome)
│
├── 📁 7. Public Pages
│   ├── 7.1 Creator Portfolio (/creators/[id])
│   └── 7.2 Error / 404
│
├── 📁 8. User Journeys (FigJam)
│   ├── 8.1 Creator Journey Flow (with failure/drop-off paths at every stage)
│   ├── 8.2 Business Journey Flow (with failure/drop-off paths at every stage)
│   ├── 8.3 Collaboration Lifecycle (with dispute resolution branch)
│   └── 8.4 Dispute Resolution Flow
│
└── 📁 9. Prototype Flows
    ├── 9.1 Creator: Landing → Register → Onboard → Dashboard → Campaign Details → Accept → Workspace → Deliver → Get Paid
    ├── 9.2 Business: Landing → Register → Onboard → Dashboard → Find Creator → Campaign Details → Review → Approve → Analytics
    ├── 9.3 Collaboration: Invitation → Decision → Contract → Workspace → Milestones → Payment → Complete
    └── 9.4 Dispute: Raise Issue → Mediation → Resolution (Happy + Unhappy paths)
```

---

## KEY DESIGN DECISIONS (for portfolio writeup)

| Decision | Rationale |
|----------|-----------|
| **Collaboration-first identity** (not marketplace) | Discovery is an entry point. The workspace IS the product. This prevents "too many products at once" confusion. |
| **Decision moment signals** (reliability, effort, reach) | Creators need to evaluate risk vs reward before accepting. Brands need to see on-time rates before hiring. |
| **Dispute resolution flow** (Raise → Mediate → Resolve) | Without explicit dispute handling, both sides feel unsafe. Auto-resolution + mediation builds trust. |
| **Separated workspace tabs** (Chat ≠ Scope ≠ Payments) | Mixing conversation with contracts creates confusion. Each concern gets its own dedicated tab. |
| **Actionable analytics** (not vanity metrics) | "2.3x more saves than avg" is actionable. "1,240 saves" alone is not. Every metric includes context. |
| **7 sections** (down from 10) | Merged Stats→Hero, Showcase+Trust→Social Proof. Less scrolling, same information, zero redundancy. |
| **Failure/drop-off paths documented** | Real products need recovery flows. Every stage has a "what if they leave?" plan. |
| **Dark-mode-first palette** | Background #0F0F10, Surface #18181B, Accent #6C5CE7, Secondary #00B8D9 — professional, modern |
| **Rich visual elements** | Morphing blobs, wave dividers, gradient orbs, phone/dashboard mockups, animated counters, parallax scroll |
| **Campaign Details (4-tab)** | Both creators and businesses get dedicated campaign detail pages with Overview, Deliverables, Payments, Analytics |
| **All currency in INR (₹)** | Product targets Indian market. ₹3,999/mo business plan, Free for creators. |
| **Real algorithm details** (4 factors with weights) | Transparency builds trust |

---

## DESIGN REFERENCES USED

| Section | Reference | What was adapted |
|---------|-----------|-----------------|
| Hero | **Original** (workspace-first) | Rotating demo showing Workspace/Scope/Payments — collaboration is the hero, not discovery |
| Discovery | **Contra** (adapted) | Card-based profiles with decision signals: on-time rate, repeat rate, reliability score |
| Workspace | **Original** (separated concerns) | 6 distinct tabs — Chat, Scope, Files, Feedback, Payments, Analytics — nothing mixed |
| How It Works | **Interactive walkthrough** | 4 steps with decision signals at step 2, dispute flow at step 4 |
| Social Proof | **Are.na** + trust signals (merged) | Masonry grid combining testimonials, campaign images, stats, and trust cards |
| Dual Audience | **Original** | Feature lists updated with dispute resolution, actionable analytics, separated concerns |
| Overall | **Collaboration-first** | Every section reinforces: "this is where collaborations happen" not "this is where you find people" |
