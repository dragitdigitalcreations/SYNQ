# SYNQ — Complete Figma Design Prompt (Updated)

Use this prompt in Make (or any AI-to-Figma tool) to generate a pixel-perfect, fully responsive Figma file with variables, auto-layout, and prototyping-ready components.

---

## PRODUCT OVERVIEW

SYNQ is a collaboration workspace connecting content creators with businesses for brand collaborations in India. It features:
- A public landing page with product showcase
- Auth pages (login, register)
- Multi-step onboarding wizards (creator & business)
- Dual dashboards (creator & business) with sidebar navigation
- Messaging, analytics, campaigns, collaborations, settings
- Creator profile pages and collaboration workspaces
- Responsive from 375px mobile to 1440px+ desktop
- Light and dark mode

Design language: Apple Human Interface Guidelines (HIG) inspired — glass materials, shadow-based depth (no borders on cards), rounded corners, 44pt touch targets, tinted inputs, spring-like interactions. Dark-mode-first palette with Electric Violet (#6C5CE7) accent and Cyan (#00B8D9) secondary. India-focused (INR currency).

---

## SECTION 1: FIGMA VARIABLES (Create These First)

### 1.1 Color Variables (Create a "Colors" collection with Light and Dark modes)

| Variable Name | Light Mode | Dark Mode |
|---------------|-----------|-----------|
| `background` | `#FAFAFA` | `#0F0F10` |
| `foreground` | `#18181B` | `#FAFAFA` |
| `surface` | `#FFFFFF` | `#18181B` |
| `surface-elevated` | `#F4F4F5` | `#27272A` |
| `border` | `#E4E4E7` | `#27272A` |
| `text-primary` | `#18181B` | `#FAFAFA` |
| `text-secondary` | `#71717A` | `#A1A1AA` |
| `accent` | `#6C5CE7` | `#6C5CE7` |
| `accent-hover` | `#5A4BD6` | `#5A4BD6` |
| `success` | `#22C55E` | `#22C55E` |
| `warning` | `#F59E0B` | `#F59E0B` |
| `error` | `#EF4444` | `#EF4444` |
| `gradient-start` | `#6C5CE7` | `#6C5CE7` |
| `gradient-end` | `#00B8D9` | `#00B8D9` |
| `surface-glass` | `rgba(255,255,255,0.72)` | `rgba(24,24,27,0.72)` |
| `surface-glass-elevated` | `rgba(255,255,255,0.85)` | `rgba(39,39,42,0.80)` |
| `input-bg` | `rgba(120,120,128,0.08)` | `rgba(120,120,128,0.16)` |

### 1.2 Shadow Variables (Effects collection)

| Variable Name | Light Mode | Dark Mode |
|---------------|-----------|-----------|
| `shadow-xs` | `0 0.5px 1px rgba(0,0,0,0.04)` | `0 0.5px 1px rgba(0,0,0,0.15)` |
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)` | `0 1px 2px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.15)` |
| `shadow-md` | `0 2px 4px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)` | `0 2px 4px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.2)` |
| `shadow-lg` | `0 4px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08)` | `0 4px 8px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.25)` |
| `shadow-xl` | `0 8px 16px rgba(0,0,0,0.06), 0 16px 48px rgba(0,0,0,0.12)` | `0 8px 16px rgba(0,0,0,0.2), 0 16px 48px rgba(0,0,0,0.35)` |

### 1.3 Radius Variables (Number collection)

| Variable Name | Value |
|---------------|-------|
| `radius-xs` | `5` |
| `radius-sm` | `8` |
| `radius-md` | `10` |
| `radius-lg` | `12` |
| `radius-xl` | `16` |
| `radius-2xl` | `20` |
| `radius-full` | `9999` |

### 1.4 Spacing Variables (Number collection)

| Variable Name | Value |
|---------------|-------|
| `space-0.5` | `2` |
| `space-1` | `4` |
| `space-1.5` | `6` |
| `space-2` | `8` |
| `space-2.5` | `10` |
| `space-3` | `12` |
| `space-3.5` | `14` |
| `space-4` | `16` |
| `space-5` | `20` |
| `space-6` | `24` |
| `space-7` | `28` |
| `space-8` | `32` |
| `space-10` | `40` |
| `space-12` | `48` |
| `space-16` | `64` |
| `space-20` | `80` |
| `space-24` | `96` |

### 1.5 Typography Variables

| Variable Name | Font Family | Weight | Size | Line Height | Letter Spacing |
|---------------|-------------|--------|------|-------------|----------------|
| `heading-1` | Inter | Bold (700) | 28px | 1.15 | -0.03em |
| `heading-2` | Inter | Bold (700) | 24px | 1.15 | -0.025em |
| `heading-3` | Inter | Semibold (600) | 18px | 1.15 | -0.025em |
| `heading-4` | Inter | Semibold (600) | 16px | 1.15 | -0.025em |
| `body-lg` | Inter | Regular (400) | 15px | 1.6 | 0 |
| `body-md` | Inter | Regular (400) | 14px | 1.6 | 0 |
| `body-sm` | Inter | Regular (400) | 13px | 1.6 | 0 |
| `body-xs` | Inter | Regular (400) | 12px | 1.6 | 0 |
| `body-xxs` | Inter | Medium (500) | 10px | 1.6 | 0 |
| `label` | Inter | Medium (500) | 14px | 1.4 | 0 |
| `mono-lg` | JetBrains Mono | Semibold (600) | 24px | 1.2 | 0 |
| `mono-md` | JetBrains Mono | Medium (500) | 14px | 1.4 | 0 |
| `hero-title` | Inter | Bold (700) | 56px | 1.08 | -0.02em |
| `hero-subtitle` | Inter | Regular (400) | 20px | 1.6 | 0 |

---

## SECTION 2: COMPONENT LIBRARY (Build These as Figma Components)

### 2.1 Button

**Variants:** `variant` (primary, secondary, ghost, destructive, outline) × `size` (sm, md, lg, icon) × `state` (default, hover, pressed, disabled)

| Size | Height | Horizontal Padding | Font Size | Font Weight |
|------|--------|-------------------|-----------|-------------|
| sm | 36px | 14px | 14px | 600 |
| md | 44px | 20px | 14px | 600 |
| lg | 52px | 28px | 16px | 600 |
| icon | 44×44px | 0 | — | — |

- **Corner radius:** 12px (all sizes)
- **Gap (icon + text):** 8px
- **Press state:** scale 0.97
- **Transition:** 150ms

| Variant | Background | Text | Hover BG | Shadow |
|---------|-----------|------|----------|--------|
| primary | `accent` | `#FFFFFF` | `accent-hover` | shadow-sm → shadow-md on hover |
| secondary | `accent` at 10% opacity | `accent` | `accent` at 15% opacity | none |
| ghost | transparent | `text-secondary` | `surface-elevated` | none |
| destructive | `error` | `#FFFFFF` | `error` at 90% | none |
| outline | `surface-elevated` | `text-primary` | `surface-elevated` at 80% | none |

Disabled state: 50% opacity, no pointer events.

---

### 2.2 Input

**Variants:** `state` (default, focused, error, disabled) × `hasIcon` (yes, no)

| Property | Value |
|----------|-------|
| Height | 44px |
| Corner radius | 10px |
| Background | `input-bg` |
| Border | none (0) |
| Padding left | 14px (no icon) / 44px (with icon) |
| Padding right | 14px |
| Font size | 15px |
| Text color | `text-primary` |
| Placeholder color | `text-secondary` |
| Focus ring | 2px `accent` at 50% opacity |
| Error ring | 1px `error`, focus: 2px `error` at 50% |
| Icon position | left 14px, vertically centered, 16×16px, `text-secondary` |
| Error text | below input, 6px gap, 12px font, `error` color |

---

### 2.3 Textarea

Same as Input except:
| Property | Value |
|----------|-------|
| Min height | 80px |
| Padding | 14px horizontal, 12px vertical |
| Resize | none |
| Character count (optional) | bottom-right corner, 8px from edges, 12px mono font, `text-secondary` |

---

### 2.4 Card

**Variants:** `hover` (yes, no)

| Property | Value |
|----------|-------|
| Corner radius | 16px |
| Background | `surface` |
| Border | none (0) |
| Shadow | shadow-md |
| Hover shadow | shadow-lg |
| Hover scale | 1.015× |
| Transition | 200ms |
| Default padding | 24px (p-6) or 28px (p-7) depending on usage |

Sub-components:
- **CardHeader:** vertical auto-layout, 6px gap, 16px bottom padding
- **CardTitle:** 18px semibold, `text-primary`, tight tracking
- **CardDescription:** 14px regular, `text-secondary`
- **CardFooter:** horizontal auto-layout, 16px top padding

---

### 2.5 Tabs (Segmented Control)

**TabsList:**
| Property | Value |
|----------|-------|
| Corner radius | 10px |
| Background | `input-bg` |
| Padding | 2px |
| Gap | 0 |
| Layout | horizontal auto-layout |

**TabsTrigger:**
| Property | Value |
|----------|-------|
| Corner radius | 8px |
| Padding | 8px vertical, 16px horizontal |
| Font | 13px semibold |
| Default text | `text-secondary` |
| Active background | `surface` |
| Active text | `text-primary` |
| Active shadow | shadow-sm |

---

### 2.6 Dialog / Modal

**Overlay:** full screen, `#000000` at 40% opacity, blur 24px

**Content (Desktop):**
| Property | Value |
|----------|-------|
| Width | max 512px, centered |
| Corner radius | 20px |
| Background | `surface` |
| Border | none |
| Shadow | shadow-xl |
| Padding | 28px |

**Content (Mobile — bottom sheet):**
| Property | Value |
|----------|-------|
| Width | 100% |
| Position | bottom-aligned |
| Corner radius | 20px top, 0 bottom |
| Drag indicator | centered, 36×4px, `text-secondary` at 30%, radius full, 4px top margin, 16px bottom margin |

**Close button:** top-right, 16px from edges, 8px radius, `text-secondary` at 70%

---

### 2.7 Dropdown Menu

**Content:**
| Property | Value |
|----------|-------|
| Corner radius | 12px |
| Background | `surface-glass-elevated` + blur 40px saturate 200% |
| Border | none |
| Shadow | shadow-xl |
| Padding | 6px |

**MenuItem:**
| Property | Value |
|----------|-------|
| Corner radius | 8px |
| Padding | 10px vertical, 12px horizontal |
| Font | 15px regular |
| Text | `text-primary` |
| Hover background | `surface-elevated` |
| Min height | 44px (touch target) |

**Separator:** full-width, 1px, `border` color, 4px vertical margin

---

### 2.8 Select

**Trigger:** Same dimensions as Input (44px height, 10px radius, `input-bg`, no border)

**Content:** Same as Dropdown Menu content (12px radius, glass-elevated, shadow-xl)

**Item:** 8px radius, 10px vertical padding, 32px left padding (for checkmark), 12px right padding, 15px font

**Check indicator:** left 8px, 14×14px container, accent-colored check icon

---

### 2.9 Badge

**Variants:** default, success, warning, error, accent, outline

| Property | Value |
|----------|-------|
| Corner radius | full (9999px) |
| Padding | 2px vertical, 10px horizontal |
| Font | 12px medium |

| Variant | Background | Text |
|---------|-----------|------|
| default | `surface-elevated` | `text-secondary` |
| success | `success` at 10% | `success` |
| warning | `warning` at 10% | `warning` |
| error | `error` at 10% | `error` |
| accent | `accent` at 10% | `accent` |
| outline | transparent, 1px `border` | `text-secondary` |

---

### 2.10 Avatar

**Variants:** `size` (sm, md, lg, xl) × `hasImage` (yes, no)

| Size | Dimensions | Font Size |
|------|-----------|-----------|
| sm | 32×32px | 12px |
| md | 40×40px | 14px |
| lg | 48×48px | 16px |
| xl | 64×64px | 18px |

- Shape: circle (radius full)
- Image: fill, cover
- Fallback: `accent` at 10% background, `accent` text, medium weight, initials (first letters of first + last name)

---

### 2.11 Switch (iOS-style)

| Property | Value |
|----------|-------|
| Track width | 44px |
| Track height | 26px |
| Track radius | full |
| Track off | `border` color |
| Track on | `accent` |
| Thumb size | 22×22px |
| Thumb radius | full |
| Thumb color | `#FFFFFF` |
| Thumb shadow | shadow-sm |
| Thumb off position | 0px translate |
| Thumb on position | 20px translate |
| Transition | 200ms |

---

### 2.12 Checkbox

| Property | Value |
|----------|-------|
| Size | 18×18px |
| Corner radius | 5px |
| Border | 1px `border` |
| Background (off) | `surface` |
| Background (on) | `accent` |
| Border (on) | `accent` |
| Check icon | 12×12px white |

---

### 2.13 Tooltip

| Property | Value |
|----------|-------|
| Corner radius | 10px |
| Background | `surface-glass-elevated` + blur 40px |
| Border | none |
| Shadow | shadow-lg |
| Padding | 6px vertical, 12px horizontal |
| Font | 14px regular, `text-primary` |

---

### 2.14 Separator

- Horizontal: 100% width × 1px height
- Vertical: 1px width × 100% height
- Color: `border`

---

### 2.15 Empty State

| Property | Value |
|----------|-------|
| Layout | vertical center-aligned |
| Icon area | 24px bottom margin, `text-secondary` |
| Title | 18px semibold, `text-primary` |
| Description | 14px regular, `text-secondary`, 8px top margin, max 384px width |
| Action button | 24px top margin |
| Vertical padding | 96px top and bottom |

---

## SECTION 3: LAYOUT COMPONENTS

### 3.1 Sidebar (Desktop only, hidden < 768px)

| Property | Expanded | Collapsed |
|----------|---------|-----------|
| Width | 256px | 72px |
| Height | 100vh (sticky top-0) |
| Background | `surface-glass` + blur 20px saturate 180% |
| Shadow | shadow-sm |
| Border | none |

**Header (logo area):** 64px height, 16px horizontal padding, bottom border `border` at 50% opacity
- Logo: SYNQ wordmark image (theme-aware: dark mode = white text, light mode = dark text), height 24px
- Brand text: hidden (logo image includes wordmark)
- Collapsed state: "SQ" text in bold white on accent background circle
- Collapse button: right-aligned, 4px padding, 6px radius, chevron-left icon 16×16px (rotates 180° when collapsed)

**Nav items:** 16px top padding, 8px horizontal padding, 4px gap between items
- Each item: 12px horizontal padding, 10px vertical padding, 10px radius, 14px medium font, 44px min-height, 12px icon-text gap
- Icon: 16×16px
- Active: `accent` at 10% background, `accent` text
- Inactive: `text-secondary`, hover: `text-primary` + `surface-elevated` background

**Footer:** 8px padding, top border `border` at 50% opacity
- Role indicator: 8×8px circle (`accent` for creator, `success` for business) + "Creator Account" or "Business Account" text, 12px, `text-secondary`

---

### 3.2 Navbar (Top bar)

| Property | Value |
|----------|-------|
| Height | 60px |
| Position | sticky top-0, z-index 40 |
| Background | `surface` |
| Shadow | shadow-xs |
| Padding | 20px (mobile), 32px (desktop) |
| Layout | horizontal, space-between |

**Left (mobile only < 768px):** SYNQ logo image (theme-aware), height 24px
**Center (desktop only ≥ 768px):** Search input, max-width 448px, height 40px, 10px radius, `input-bg`, search icon 16×16px left
**Right:** Theme toggle (icon button) + Notification bell (icon button with 8×8px accent dot) + Avatar dropdown (32px avatar + dropdown w-192px)

---

### 3.3 Mobile Nav (Bottom tab bar, visible only < 768px)

| Property | Value |
|----------|-------|
| Position | fixed bottom-0, full width |
| Z-index | 50 |
| Background | `surface-glass` + blur 20px saturate 180% |
| Shadow | `0 -1px 3px rgba(0,0,0,0.06)` |
| Padding | 8px horizontal, 8px vertical + safe-area-inset-bottom (8px fallback) |
| Layout | horizontal, space-around, max 5 items |

**Each item:**
| Property | Value |
|----------|-------|
| Min width | 44px |
| Min height | 50px |
| Corner radius | 10px |
| Padding | 12px horizontal, 4px vertical |
| Icon size | inherent from lucide (20px default) |
| Label | 10px medium, truncated |
| Gap (icon → label) | 2px |
| Active color | `accent` |
| Inactive color | `text-secondary` |
| Layout | vertical, center-aligned |

---

### 3.4 Page Header

| Property | Value |
|----------|-------|
| Bottom margin | 40px |
| Layout mobile | vertical, 4px gap |
| Layout desktop (≥ 640px) | horizontal, space-between, vertically centered |
| Title | 28px bold, -0.03em tracking, `text-primary` |
| Description | 15px regular, `text-secondary`, 8px top margin |
| Action slot | 16px top margin (mobile), 0 (desktop) |

---

### 3.5 Dashboard Layout (Main shell)

```
┌────────────────────────────────────────────────────┐
│ ┌──────────┐ ┌────────────────────────────────────┐│
│ │          │ │ Navbar (60px)                       ││
│ │ Sidebar  │ ├────────────────────────────────────┤│
│ │ 256px    │ │                                    ││
│ │ (desktop)│ │ Main Content                       ││
│ │          │ │ padding: 24px (desktop)             ││
│ │          │ │ padding: 16px + 80px bottom (mobile)││
│ │          │ │                                    ││
│ └──────────┘ └────────────────────────────────────┘│
│              ┌────────────────────────────────────┐│
│              │ Mobile Nav (bottom, mobile only)   ││
│              └────────────────────────────────────┘│
└────────────────────────────────────────────────────┘
```

- Outer: `flex`, min-height 100vh, `background`
- Sidebar: left column (desktop only)
- Right column: `flex-1 flex flex-col`
  - Navbar: top
  - Main: `flex-1`, padding 16px mobile / 24px desktop, 80px bottom padding on mobile (for tab bar)
- Mobile Nav: fixed overlay at bottom

---

## SECTION 4: PAGE DESIGNS (Create These Frames)

Design each page at 3 breakpoints:
- **Mobile:** 375px width
- **Tablet:** 768px width
- **Desktop:** 1440px width

### 4.1 Landing Page (`/`)

**Nav:** Sticky, `surface` background, shadow-xs, max-width 1152px centered
- SYNQ logo image (theme-aware, height 28px) left
- Links center (desktop): Features, How It Works, Testimonials, Pricing — 14px, `text-secondary`
- Right: Theme toggle + "Sign in" (ghost button) + "Get Started Free" (primary button with glow-accent hover effect, sm size)

**Hero Section:**
- Background: morphing SVG blob (accent #6C5CE7 → cyan #00B8D9 gradient, blur filter, slow 8-10s animation cycle), with floating gradient orbs scattered across page
- Max-width 768px centered text
- Pill badge: `accent` at 8% background, `accent` text, 14px medium, full radius, with Zap icon
- Headline: 56px bold (mobile: 36px, tablet: 48px), tracking tight, line-height 1.08
  - "Creator partnerships, " in `text-primary`
  - "structured and secure" in gradient text (`accent` → `#00B8D9`) with animated gradient underline
- Subheadline: 20px (mobile: 18px), `text-secondary`, max-width 640px, 24px top margin
- CTA buttons: 2 buttons side-by-side (stack on mobile), 40px top margin
  - "Start as Creator" — primary lg with ArrowRight icon
  - "Start as Business" — outline lg with ArrowRight icon
  - Each min-width 200px
- Trust line: "Free to start · No credit card required · Set up in 2 minutes" — 14px `text-secondary`, 16px top margin

**Product Module Bar:** 64px below hero, max-width 1152px
- Card container: 16px radius, `surface`, shadow-lg
- Tab row: horizontal scroll, bottom border at 50%
  - Each tab: icon (16px) + label, 20px horizontal padding, 14px vertical, 14px medium
  - Active tab: `accent` text, 2px `accent` bottom border, `accent` at 4% background
  - Inactive: `text-secondary`, transparent border
  - Tabs: Discovery (Search icon), Contracts (FileText), Workspace (MessageSquare), Payments (CreditCard), Analytics (BarChart3)
- Content area: 40px padding (desktop), 32px (mobile)
  - 2-column grid (stacks on mobile)
  - Left: Title (24px bold, mobile: 20px), description (15px `text-secondary`, 12px top margin), "Learn more" link (`accent`, 20px top margin, with ArrowUpRight icon)
  - Right: 4 feature checkpoints, 12px gap each
    - Green CheckCircle2 icon (16px) + 14px text

**Stats Bar:** `surface-elevated` at 50% background, 48px vertical padding
- 4-column grid (2 on mobile), 32px gap, max-width 1024px centered
- Each stat: centered, number in 36px bold mono `accent`, label in 14px `text-secondary`
- Stats: "2,400+" Collaborations, "850+" Active creators, "320+" Brands, "98%" Payment rate

**Problem → Solution Section:** 96px vertical padding, max-width 1024px
- Heading: 36px bold (mobile: 28px), centered
- Subheading: 18px `text-secondary`, max-width 640px, centered, 16px top margin
- 3-column grid (2 on tablet, 1 on mobile), 24px gap, 64px top margin
- 6 feature cards (Card component with hover):
  - Icon container: 10px radius, `accent` at 10%, 10px padding, accent icon 20×20
  - Title: 16px semibold, 8px top margin
  - Description: 14px `text-secondary`, relaxed line-height
  - Cards: Trust/Shield, Smart Matching/Target, Scope Contracts/FileText, Workspace/MessageSquare, Escrow Payments/CreditCard, Analytics/BarChart3

**How It Works — Interactive Demo:** `surface-elevated` at 30% background, 96px padding
- Heading + subheading centered
- 2-column grid (stacks on mobile), 48px gap, vertically centered
- Left: 4 step buttons, 8px gap
  - Each: full-width, 20px padding, 14px radius
  - Active: `surface` background, shadow-md
  - Inactive: transparent, hover `surface-elevated` at 50%
  - Number: 24px bold mono, `accent` (active) or `text-secondary` at 30% (inactive)
  - Title: semibold, `text-primary` (active) or `text-secondary`
  - Description (only on active): 14px `text-secondary`, 6px top margin
- Right: Demo card, 20px radius, `surface`, shadow-lg, 24px padding
  - Window chrome: 3 dots (10px circles: error/60%, warning/60%, success/60%), 6px gap, centered title
  - Content changes per step (Profile card, Match list, Contract details, Milestone tracker)

**For Creators / For Businesses:** 96px padding, max-width 1024px
- 2-column grid (stacks on mobile), 32px gap
- Each: Card with 32px padding
  - Icon container: 12px radius, accent/10% (creator) or `#00B8D9`/10% (business), 12px padding
  - Icon: 24×24px, Sparkles (creator) or TrendingUp (business)
  - Title: 20px bold, 8px margin
  - Description: `text-secondary`, 24px bottom margin
  - 5 feature bullets: CheckCircle2 (success, 16px) + 14px text, 12px gap
  - CTA button: full-width, 32px top margin
    - Creator: primary "Join as Creator"
    - Business: secondary "Join as Business"

**Testimonials:** `surface-elevated` at 30%, 96px padding
- 3-column grid (2 on tablet, 1 on mobile), 24px gap
- 6 testimonial cards (Card, 24px padding):
  - 5 star icons (14px, `warning` fill)
  - Quote: 14px `text-secondary`, relaxed line-height, 12px top margin
  - Author: 16px top margin, top border at 50%, 16px top padding
    - Avatar circle (36px, `accent`/10% bg, initials in `accent`)
    - Name: 14px medium
    - Role: 12px `text-secondary`

**Trust Strip:** 64px vertical padding, max-width 1024px
- 3-column grid (stacks on mobile), 32px gap, centered
- Each: centered layout
  - Circle icon container: `accent` at 10%, 12px padding, full radius
  - Icon: 20×20px `accent`
  - Title: semibold `text-primary`, 4px margin
  - Description: 14px `text-secondary`, max-width 320px

**Pricing Section:** `surface-elevated` at 30%, 96px padding
- Heading + subheading centered
- 2-column grid, max-width 640px centered, 24px gap, 48px top margin
- Creator card: Card, 28px padding, left-aligned
  - "Creator" label: 14px semibold `accent`
  - "Free" price: 28px bold
  - Description: 14px `text-secondary`
  - 5 features with CheckCircle2 icons, 10px gap
  - Outline button full-width
- Business card: Same but with 2px ring `accent` at 20%
  - "₹3,999/mo" with "/mo" in 18px normal `text-secondary`
  - Primary button full-width

**Final CTA:** 96px padding, max-width 768px centered
- Card: 20px radius, gradient fill (`accent` → `#00B8D9` at 135°), 48px padding
- Headline: 28px bold, white
- Description: white at 80%, max-width 448px centered
- 2 buttons (stacks on mobile), 32px top margin
  - "Get Started Free": white bg, `accent` text, lg, shadow-lg
  - "Sign in": ghost, white text, hover white at 10%

**Visual Elements (throughout landing page):**
- **SVG Wave Dividers:** Custom wave/curve shapes between sections (after Hero, after Discovery, after Dual Audience). Accent-tinted, theme-aware opacity.
- **Gradient Orbs:** 2-3 floating semi-transparent gradient orbs (accent → cyan) scattered near How It Works, Workspace, and Social Proof sections. Blurred, parallax-attached.
- **Dot Grid Pattern:** Subtle radial-gradient dot grid behind How It Works section, fading at edges with mask-image.
- **Phone Mockup:** Instagram-style phone frame with post preview in Discovery section (xl screens).
- **Dashboard Mockup:** Analytics dashboard card with animated bar chart in Discovery section.
- **Gradient Underlines:** Animated gradient underline that draws in from left on scroll, applied to section headings.
- **Sparkle Particles:** Floating sparkle particles around the CTA gradient box.
- **Animated Stat Counters:** Count-up animation on social proof stats triggered on scroll into view.
- **Animated Gradient Border:** Rotating conic gradient border on the hero workspace preview card (shimmer effect).
- **Glow Effect:** Accent glow on hover for CTA buttons (box-shadow: 0 0 20px accent at 30%).

**Footer:** top border at 50%, `surface-elevated` at 30%, 48px vertical padding
- Max-width 1152px, 4-column grid (2 on mobile), 32px gap
- Column 1 (spans 2 on mobile): Logo + description
- Column 2: "Product" — Features, Pricing, How It Works, API Docs
- Column 3: "Company" — About, Blog, Careers, Contact
- Column 4: "Legal" — Privacy, Terms, Cookies, Security
- Footer bar: top border, 24px top padding/margin, copyright left, tagline right

---

### 4.2 Login Page (`/login`)

**Layout:** Centered, max-width 448px, `background`
- Logo: centered, SYNQ logo image (theme-aware), height 32px
- Title: "Welcome back", 24px semibold, centered
- Subtitle: "Sign in to your SYNQ account" 14px `text-secondary`, centered

**Card (24px padding):**
- Email input with Mail icon
- Password input with Lock icon
- Sign in button: full-width, lg, primary
- Separator with "or continue with" text
- Google button: full-width, outline, Google SVG icon
- Sign up link: 14px, centered, `accent` colored

---

### 4.3 Register Page (`/register`)

Same layout as login with:
- Role selector: 2-column grid, 12px gap
  - Each: vertical layout, center-aligned, 16px padding, 12px radius, 2px border
  - Selected: `accent` border, `accent`/5% background
  - Unselected: `border` color border
  - Icon: 24×24px (Sparkles for creator, Building for business)
  - Label: 14px medium
- Name input, Email input, Password input
- "Create Account" button, full-width, lg

---

### 4.4 Creator Dashboard (`/dashboard/creator`)

**Uses dashboard layout (Sidebar + Navbar + Mobile Nav)**

**Content:**
- PageHeader: "Dashboard", description "Welcome back, here's your overview"
- Stats row: 4 columns (2 on tablet, 1 on mobile), 16px gap
  - StatCard: 12px radius, 1px `border` border, `surface` bg, 24px padding
  - Label: 14px `text-secondary` with icon
  - Value: 24px semibold mono `text-primary`
  - Trend: 12px medium, `success` (up) or `error` (down) with arrow icon
- Main grid: 3-column (stacks on mobile), 24px gap
  - Left 2/3: "Opportunities" section — campaign cards grid (2-column on lg, 1 on mobile)
  - Right 1/3: "Active Collaborations" + Activity Feed

---

### 4.5 Business Dashboard (`/dashboard/business`)

Similar to creator dashboard with:
- Different stats (Active Campaigns, Total Spend, Creators Engaged, Avg Response)
- Alert banner: `warning`/5% background, `warning`/20% border, 12px radius
- Creator pipeline cards with match scores and avatars

---

### 4.6 Creator Analytics (`/dashboard/creator/analytics`)

- Stats row (4 columns)
- Charts section (2-column grid, stacks on mobile):
  - Area chart (earnings over time) — 256px height
  - Bar chart (content performance) — 256px height
- Bottom section (2-column):
  - Pie chart (platform split) — 192px diameter with legend
  - Top brands list

Chart colors: `#6C5CE7` (accent), `#00B8D9` (cyan), `#22C55E` (success), `#F59E0B` (warning)

---

### 4.7 Business Analytics (`/dashboard/business/analytics`)

Same layout pattern, different metrics:
- Response rate area chart
- Campaign performance bars
- Top performers list with rank numbers

---

### 4.8 Browse Campaigns (`/dashboard/creator/campaigns`)

- PageHeader
- 2-column card grid (1 on mobile)
- CampaignCard: 12px radius, 1px border, 20px padding
  - Header: title + badge status
  - Match score highlight: `accent`/5% bg, `accent`/10% border
  - Progress bar: 6px height, full radius
  - Creators count + action button

---

### 4.9 My Campaigns (`/dashboard/business/campaigns`)

Same grid, with "Create Campaign" action in PageHeader

---

### 4.10 Create Campaign Wizard (`/dashboard/business/campaigns/new`)

- WizardShell with 5 steps (progress circles + connecting lines)
- Each step: Card with 24px padding, vertical form fields, 20px gap
- Navigation: Back button (outline) + Continue/Submit button (primary, lg)

---

### 4.10a Campaign Details (`/dashboard/*/campaigns/[id]`)

**Uses dashboard layout (Sidebar + Navbar + Mobile Nav)**

**Content:**
- PageHeader: Campaign name, with status badge and "Back to Campaigns" link
- 4-tab interface: Overview, Deliverables, Payments, Analytics

**Overview Tab:**
- Campaign info card: brand logo/avatar, campaign name, description, dates, budget range
- Creator role: Match score bar (accent gradient), brand reliability score
- Business role: Creator roster with avatars, acceptance status
- Status badges: Draft, Active, In Review, Completed, Disputed

**Deliverables Tab:**
- Milestone list: each with title, deadline, status badge, progress bar
- Deliverable cards: format type icon, description, due date, approval status
- Action buttons: Submit (creator), Approve/Request Changes (business)

**Payments Tab:**
- Escrow status card: total amount, released amount, pending amount
- Milestone payment timeline: visual progress with amounts at each stage
- Dispute resolution section: Raise Issue button, dispute status, mediation info

**Analytics Tab:**
- Performance metrics: impressions, engagement rate, saves, shares
- AI insights card: accent-tinted background, lightbulb icon, actionable recommendation text
- Comparison chart: actual vs projected performance

---

### 4.11 My Collaborations (`/dashboard/creator/collaborations`)

- Vertical list, 12px gap
- Each card: horizontal layout, avatar + details left, payment + status + button right

---

### 4.12 Find Creators (`/dashboard/business/find-creators`)

- Search input (full-width) + Filter button
- Collapsible filter panel with MultiSelect and RangeSlider
- Creator cards: horizontal layout
  - Avatar (lg) + Name/badges/location/bio + Metrics row + Match score + Buttons

---

### 4.13 Messages (`/dashboard/*/messages`)

- 2-panel layout (stacks on mobile)
- Left panel: 320px width, conversation list, search, unread badges
- Right panel: chat header + message thread + input bar
- Message bubbles: 70% max-width, 16px radius
  - Sent (right): `accent` background, white text, slightly flattened bottom-right
  - Received (left): `surface-elevated`, `text-primary`, slightly flattened bottom-left

---

### 4.14 Settings (`/dashboard/*/settings`)

- Max-width 768px centered
- Sections: Profile, Notifications, Privacy, Appearance, Connected Accounts, Danger Zone
- Each section: Card with 24px padding, icon + title header
- Form layout: 2-column grid for short fields, full-width for textareas
- Toggle rows: label left, Switch right
- Danger zone: `error`/20% border, `error` title

---

### 4.15 Creator Onboarding (`/onboarding/creator`)

- WizardShell, 6 steps
- Steps: Basic Info, Social Connect, Content Profile, Preferences, Rate Card, Review
- Centered layout, max-width 512px

---

### 4.16 Business Onboarding (`/onboarding/business`)

- WizardShell, 5 steps
- Steps: Company Info, Goals, Audience, Verification, Review

---

### 4.17 Creator Profile (`/creators/[id]`)

- Uses InnerNav (56px header with back button)
- Cover gradient: 192px height, `accent`/20% → `#00B8D9`/20%
- Profile: -64px margin-top (overlaps cover), max-width 896px centered
- Header: Avatar 96×96px + name + verified badge + location + bio + badges + button
- Metrics: 6-column grid (3 on tablet, 2 on mobile)
- Main: 3-column (2/1 split on lg)
  - Portfolio grid (3-column, square aspect ratio)
  - Rate card + social links + collab history

---

### 4.18 Collaboration Workspace (`/collaborations/[id]`)

- Uses InnerNav
- Max-width 1024px centered, 32px vertical padding
- Header with campaign name, participants, status
- 6-tab interface: Scope, Files, Feedback, Timeline, Payment, Performance
- Each tab: Card with structured content

---

## SECTION 5: RESPONSIVE RULES

### Breakpoints
| Name | Width | Sidebar | Nav | Mobile Nav | Columns |
|------|-------|---------|-----|------------|---------|
| Mobile | 375px | Hidden | Mobile logo | Visible | 1 |
| Tablet | 768px | Visible (expanded) | Search visible | Hidden | 2 |
| Desktop | 1440px | Visible (expanded) | Full | Hidden | 3-4 |

### Auto-Layout Rules
- All containers use auto-layout (vertical or horizontal)
- Cards: vertical auto-layout, fill container width
- Grids: use Figma's auto-layout wrap for responsive behavior
- Max-widths: 448px (forms), 512px (wizards), 640px (pricing), 768px (settings), 896px (profiles), 1024px (content), 1152px (landing page)

### Content Padding
- Mobile: 16px horizontal
- Tablet: 24px horizontal
- Desktop: 24px-32px horizontal
- Dashboard content: 16px mobile (+ 80px bottom), 24px desktop

---

## SECTION 6: ICON SYSTEM

All icons use **Lucide** icon set, 1.5px stroke weight:
- Navigation: Home, Search, BarChart3, MessageSquare, Settings, Users, Briefcase, FileText, CreditCard, Bell, Moon, Sun, ChevronLeft, ArrowRight, ArrowUpRight, ChevronRight, X
- Features: Shield, Target, Workflow, Sparkles, Zap, Star, CheckCircle2, Play, Globe, Lock, TrendingUp, Layers
- Standard sizes: 12px (xxs), 14px (xs), 16px (sm), 20px (md), 24px (lg)

---

## SECTION 7: INTERACTION NOTES (For Prototyping)

1. **Button press:** Scale to 97%, 150ms ease
2. **Card hover:** Scale to 101.5%, shadow-md → shadow-lg, 200ms
3. **Sidebar collapse:** Width 256px ↔ 72px, 200ms ease-out, text fades
4. **Tab switch:** Content crossfade, 200ms
5. **Dialog open:** Overlay fade-in + content zoom from 95% + slide from top, 200ms
6. **Dialog mobile:** Slide up from bottom
7. **Dropdown:** Fade-in + zoom from 95%, 150ms
8. **Mobile nav → page:** Instant switch, active state changes
9. **Theme toggle:** All colors swap instantly via variables
10. **Workflow demo:** Step click → left panel expands description + right panel crossfades content

---

## SECTION 8: EXPORT CHECKLIST

After generating, verify:
- [ ] All color variables created with Light + Dark modes
- [ ] All shadow variables created with Light + Dark modes
- [ ] All 15 UI components built as Figma components with variants
- [ ] All 5 layout components built
- [ ] Landing page at 375px, 768px, 1440px
- [ ] Auth pages (login, register) at 375px and 768px
- [ ] Dashboard pages at 375px, 768px, 1440px
- [ ] All pages use auto-layout (no fixed positioning except nav bars)
- [ ] Touch targets are minimum 44px on mobile
- [ ] Text is legible (minimum 12px)
- [ ] Color contrast passes WCAG AA
- [ ] Glass materials use background blur effect in Figma
- [ ] Gradient fill from `#6C5CE7` to `#00B8D9` at 135° on CTA and accent elements
- [ ] SYNQ logo image used (not old gradient square with Sparkles icon)
- [ ] All currency shown in INR (₹), not USD ($)
