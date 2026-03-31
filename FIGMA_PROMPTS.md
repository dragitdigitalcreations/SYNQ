# SYNQ — Figma AI Step-by-Step Prompts (Updated)

Run these prompts **one at a time** in Figma AI (select "Generate designs" or use the AI sidebar). Each prompt creates editable frames directly on your canvas. After each step, you can adjust, then move to the next.

**Before starting:** Create a new Figma file called "SYNQ — Design System". Create these pages in the left panel: "Variables", "Components", "Landing Page", "Auth Pages", "Dashboard - Creator", "Dashboard - Business", "Other Pages".

---

## STEP 0: SET UP VARIABLES MANUALLY FIRST

Figma AI can't create variables. Do this manually in **Local Variables** (click the diamond icon in the right panel):

### Color Collection (create 2 modes: "Light" and "Dark")

| Name | Light | Dark |
|------|-------|------|
| `bg` | `#FAFAFA` | `#0F0F10` |
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
| `input-bg` | `#F4F4F5` | `#27272A` |

### Number Collection

| Name | Value |
|------|-------|
| `radius-sm` | `8` |
| `radius-md` | `10` |
| `radius-lg` | `12` |
| `radius-xl` | `16` |
| `radius-2xl` | `20` |
| `space-4` | `16` |
| `space-6` | `24` |
| `space-8` | `32` |

---

## STEP 1: BUTTON COMPONENT

Go to the "Components" page. Paste this prompt:

```
Design a button component system for a modern SaaS app. Use Inter font, semibold weight.

Create 5 variants in a row:

1. "Primary" — Background #6C5CE7, white text, height 44px, horizontal padding 20px, corner radius 12px. On hover: background #5A4BD6, slightly larger shadow.

2. "Secondary" (tinted) — Background #6C5CE7 at 10% opacity, text color #6C5CE7, same dimensions.

3. "Ghost" — Transparent background, text color #71717A, hover: background #F4F4F5.

4. "Destructive" — Background #EF4444, white text, same dimensions.

5. "Outline" — Background #F4F4F5, text color #18181B, no border, same dimensions.

For each variant, show 3 sizes side by side:
- Small: height 36px, padding 14px, font 14px
- Medium: height 44px, padding 20px, font 14px
- Large: height 52px, padding 28px, font 16px

Also include an icon-only variant: 44x44px square with 12px corner radius.

Show all buttons with text "Get Started" and optionally a right-arrow icon (→).
Use auto-layout for everything. Background color for the canvas area: #FAFAFA.
```

---

## STEP 2: INPUT, TEXTAREA, SELECT COMPONENTS

Same page, paste:

```
Design form input components for a modern SaaS app. Use Inter font. Background color #FAFAFA for the canvas.

1. "Text Input" — Height 44px, corner radius 10px, NO border, background fill #F4F4F5 (light gray tint), horizontal padding 14px, font size 15px, text color #18181B, placeholder color #71717A. Show 4 states in a row:
   - Default (with placeholder "Enter email...")
   - Focused (2px ring around it in #6C5CE7 at 50% opacity)
   - With value (showing "hello@example.com")
   - Error (1px red ring #EF4444, red helper text below: "This field is required")

2. "Input with Icon" — Same as above but with a 16x16 gray icon on the left (mail icon), text indented 44px from left.

3. "Textarea" — Same styling as input but min height 80px, padding 14px horizontal, 12px vertical. Show with character count "42/280" in bottom-right corner in 12px monospace gray text.

4. "Select Trigger" — Same dimensions as input (44px height, radius 10, #F4F4F5 bg, no border), with a chevron-down icon on the right side. Show with text "Choose an option".

Use auto-layout for all. Group them with labels above: "Text Input", "Input with Icon", "Textarea", "Select".
```

---

## STEP 3: CARD, BADGE, AVATAR, SWITCH, CHECKBOX

Same page:

```
Design these UI components for a modern SaaS app. Canvas background: #FAFAFA. Use Inter font.

1. "Card" — A rectangular container, corner radius 16px, white (#FFFFFF) background, NO border, shadow: 0 2px 4px rgba(0,0,0,0.04) and 0 4px 12px rgba(0,0,0,0.06). Show two versions:
   - Default card (280px wide, with sample title "Campaign Results" in 18px semibold and description text in 14px gray)
   - Hover state card (slightly larger shadow, scaled up 1.5%)

2. "Badge" — Pill-shaped labels, corner radius 9999 (full), padding 2px vertical 10px horizontal, font 12px medium. Show 6 variants in a row:
   - Default: background #F4F4F5, text #71717A
   - Success: background #22C55E at 10%, text #22C55E
   - Warning: background #F59E0B at 10%, text #F59E0B
   - Error: background #EF4444 at 10%, text #EF4444
   - Accent: background #6C5CE7 at 10%, text #6C5CE7
   - Outline: transparent with 1px #E4E4E7 border, text #71717A

3. "Avatar" — Circular, show 4 sizes: 32px, 40px, 48px, 64px. Each with:
   - Image version (use a placeholder photo)
   - Fallback version: #6C5CE7 at 10% background, initials "PS" in #6C5CE7

4. "Switch" (iOS style) — Track: 44px wide, 26px tall, full corner radius. Off state: track #E4E4E7, On state: track #6C5CE7. Thumb: 22px white circle with small shadow, moves 20px when toggled.

5. "Checkbox" — 18x18px square, corner radius 5px. Off: white with 1px #E4E4E7 border. On: #6C5CE7 fill with white checkmark icon.

Use auto-layout. Label each component group clearly.
```

---

## STEP 4: TABS (SEGMENTED CONTROL) + DIALOG + DROPDOWN + TOOLTIP

Same page:

```
Design these overlay/control components for a SaaS app. Canvas background: #FAFAFA. Inter font.

1. "Segmented Control / Tabs" — Container: corner radius 10px, background #F4F4F5, padding 2px, no gap between items. Show 3 tabs: "Overview", "Analytics", "Settings".
   - Each tab: radius 8px, padding 8px vertical 16px horizontal, font 13px semibold
   - Active tab: white (#FFFFFF) background, #18181B text, small shadow
   - Inactive tab: transparent, #71717A text

2. "Dialog / Modal" — Show a modal overlay:
   - Background overlay: semi-transparent black (40% opacity)
   - Content box: centered, max width 512px, corner radius 20px, white background, no border, large shadow, padding 28px
   - Show with: Title "Delete Campaign?" in 18px semibold, description in 14px gray, two buttons (Cancel as ghost, Delete as destructive)
   - Also show a mobile version: same content but docked to bottom of a phone frame (375px), rounded only on top (20px), with a small gray drag indicator bar (36x4px centered at top)

3. "Dropdown Menu" — Floating panel:
   - Corner radius 12px, NO border, frosted glass effect (white at 85% opacity), large shadow, padding 6px
   - Show 4 menu items: "Settings", "Profile", separator line, "Sign out" (in red #EF4444)
   - Each item: radius 8px, padding 10px vertical 12px horizontal, font 15px, 44px min height

4. "Tooltip" — Small floating label:
   - Corner radius 10px, frosted glass background (white at 85%), shadow, padding 6px vertical 12px horizontal
   - Font 14px, text #18181B
   - Show with arrow pointing down and text "Edit profile"

Use auto-layout for all internal layouts.
```

---

## STEP 5: SIDEBAR + NAVBAR + MOBILE NAV

Go to the "Components" page (or create a "Layout Components" section):

```
Design the navigation system for a SaaS dashboard app. Inter font. Canvas: #FAFAFA.

1. "Sidebar" (desktop only) — Vertical panel, 256px wide, full height (900px to simulate viewport).
   - Background: white at 72% opacity with a subtle frosted glass feel, small shadow on the right side, NO right border.
   - Header: 64px height, 16px horizontal padding, thin bottom border (#E4E4E7 at 50%). Contains:
     - Logo: SYNQ wordmark image (theme-aware), height 24px. Collapsed: "SQ" bold text on accent circle
     - Text "SYNQ" in semibold #18181B
     - Collapse button (chevron-left, 16px) on the far right
   - Navigation items (6 items stacked): "Home", "Campaigns", "Collaborations", "Messages", "Analytics", "Settings"
     - Each item: 44px min-height, 10px corner radius, 12px horizontal padding, 10px vertical, 14px medium font, 12px gap between icon and label
     - Active item ("Home"): background #6C5CE7 at 10%, text #6C5CE7
     - Other items: text #71717A, hover: text #18181B with #F4F4F5 background
     - Use appropriate icons: Home, Briefcase, Users, MessageSquare, BarChart, Settings
   - Footer: 8px padding, thin top border, small dot (8px circle, #6C5CE7) + text "Creator Account" in 12px gray
   - Also show a "collapsed" version: 72px wide, only icons visible, no text

2. "Top Navbar" — Horizontal bar, full width (1184px to simulate content area), 60px height.
   - Background: white (#FFFFFF), tiny shadow underneath.
   - Left: Search input (40px height, 10px radius, #F4F4F5 background, search icon, max width 448px) — only on desktop
   - Right: Theme toggle icon button + Bell icon button (with small 8px red dot) + User avatar (32px) with dropdown trigger
   - On mobile (375px version): show SYNQ logo image (height 24px, theme-aware) on the left instead of search

3. "Mobile Tab Bar" — Fixed bottom bar for mobile, full width (375px).
   - Background: white at 72% opacity, frosted glass, shadow on top (0 -1px 3px rgba(0,0,0,0.06)), NO top border
   - 5 items evenly spaced: Home, Campaigns, Messages, Analytics, Settings
   - Each: vertical layout (icon on top, label below), 44px min-width, 50px min-height, 10px radius
   - Active: icon and text in #6C5CE7
   - Inactive: icon and text in #71717A
   - Label: 10px medium font
   - Bottom padding: 8px (for safe area)

Use auto-layout for everything.
```

---

## STEP 6: LANDING PAGE — DESKTOP (1440px)

Go to "Landing Page" page. Paste:

```
Design the landing page for "SYNQ" — a creator-business collaboration platform. Desktop width: 1440px. Use Inter font. Background: #FAFAFA.

NAVIGATION BAR (sticky top):
- Full width, white background, tiny shadow. Inner content max-width 1152px centered.
- Left: SYNQ logo image (wordmark, theme-aware: white in dark mode, dark in light mode), height 24px
- Center: 4 links in 14px gray text — "Features", "How It Works", "Testimonials", "Pricing"
- Right: Theme toggle icon + "Sign in" text button + "Get Started Free" violet button (#6C5CE7, white text, 12px radius)

HERO SECTION:
- Centered layout, max-width 768px, 112px top padding, 96px bottom padding
- Background: morphing SVG blob (violet #6C5CE7 → cyan #00B8D9 gradient, blurred, slow animation)
- Pill badge: rounded full, #6C5CE7 at 8% background, violet text, lightning icon + "Where Creators and Brands Build Together"
- Headline: 56px bold, #18181B, line-height 1.08: "Creator partnerships," then on next conceptual phrase "structured and secure" in gradient text (#6C5CE7 → #00B8D9)
- Subheadline: 20px #71717A, max-width 640px: "SYNQ replaces scattered DMs, vague agreements, and payment anxiety with one workspace — from discovery and contracts to collaboration and escrow-protected payments."
- Two buttons side by side: "Start as Creator" (violet primary with arrow, 200px min-width) + "Start as Business" (gray outline with arrow, 200px)
- Small text below: "Free to start · No credit card required · Set up in 2 minutes" in 14px gray

PRODUCT MODULE TABS (below hero):
- Card container: max-width 1152px, 16px corner radius, white background, larger shadow
- Horizontal tab row at top with thin bottom border: 5 tabs with icons — Discovery (search icon), Contracts (file icon), Workspace (message icon), Payments (credit card icon), Analytics (chart icon)
- First tab "Discovery" is active: violet text and bottom border
- Content area below tabs, 40px padding, two-column layout:
  - Left column: Title "Find the perfect partner in seconds" in 24px bold, description paragraph in 15px gray, violet "Learn more →" link
  - Right column: 4 bullet points with green checkmark icons and 14px text describing features

STATS BAR:
- Full-width light gray strip (#F4F4F5 at 50%), 48px vertical padding
- 4 stats in a row centered: "2,400+" / "850+" / "320+" / "98%" — each number in 36px bold monospace violet, label in 14px gray below

Use auto-layout for all sections. Make each section a separate frame so I can rearrange them.
```

---

## STEP 7: LANDING PAGE — FEATURES + HOW IT WORKS SECTIONS

Same page, below the previous frame:

```
Continue the SYNQ landing page. Desktop 1440px width. Background #FAFAFA. Inter font.

SECTION: "FEATURES" (id: features)
- Max-width 1024px centered, 96px vertical padding
- Heading: "Creator collaborations are broken. We fixed it." — 36px bold centered
- Subheading: "The creator economy runs on DMs, spreadsheets, and hope. SYNQ replaces chaos with structure." — 18px gray centered, max-width 640px
- 3-column grid below (24px gap), 6 feature cards total (2 rows of 3):
  Each card: white background, 16px radius, no border, medium shadow, 24px padding
    - Icon container: 10px radius, #6C5CE7 at 10% background, 10px padding, violet icon (20px)
    - Title: 16px semibold #18181B
    - Description: 14px #71717A, relaxed line-height
  Cards:
    1. Shield icon — "Trust & Reputation" — "Behavior-based scores replace unreliable reviews..."
    2. Target icon — "Smart Matching" — "AI-powered matching analyzes content style..."
    3. FileText icon — "Scope Contracts" — "Structured contracts with deliverables..."
    4. MessageSquare icon — "Collaboration Workspace" — "Dedicated project spaces with messaging..."
    5. CreditCard icon — "Escrow Payments" — "Funds held securely from day one..."
    6. BarChart icon — "Performance Analytics" — "Track campaign ROI, engagement metrics..."

SECTION: "HOW IT WORKS" (light gray background strip)
- 96px vertical padding, max-width 1024px centered
- Heading: "See how it works" centered, 36px bold
- Subheading: "Four simple steps from discovery to delivery." 18px gray centered
- Two-column layout (48px gap):
  LEFT: 4 clickable step cards stacked (8px gap between):
    - Step 01 (active): white background, medium shadow, 20px padding, 14px corner radius
      - "01" in 24px bold monospace violet + "Create your profile" in semibold + description paragraph in 14px gray
    - Steps 02, 03, 04 (inactive): transparent background, "02" in faded gray, title in gray, no description
  RIGHT: Mock app window
    - White card, 20px corner radius, larger shadow, 24px padding
    - Window chrome header: 3 colored dots (red/yellow/green, 10px each) + centered title
    - Content: A profile card mockup showing avatar, name, tags (Photography/Lifestyle/Travel in violet pills), stats (Followers: 128K, Engagement: 4.8%), and a progress bar at 85%

Use auto-layout for every frame and section.
```

---

## STEP 8: LANDING PAGE — CREATORS/BUSINESSES + TESTIMONIALS + PRICING + CTA + FOOTER

Same page, continue below:

```
Continue the SYNQ landing page. Desktop 1440px. Background #FAFAFA. Inter font.

SECTION: "FOR CREATORS & BUSINESSES"
- Max-width 1024px centered, 96px padding
- Two cards side by side (32px gap), equal height:
  LEFT CARD: "For Creators" — white, 16px radius, shadow, 32px padding
    - Icon: 12px radius container, #6C5CE7 at 10% bg, sparkles icon in violet, 24px
    - Title: "For Creators" 20px bold
    - Description: gray text
    - 5 bullet points with green checkmark icons (16px) + 14px text
    - Full-width violet button: "Join as Creator →"
  RIGHT CARD: "For Businesses" — same layout but:
    - Icon: #00B8D9 at 10% bg, trending-up icon in #00B8D9
    - Button: secondary style (#6C5CE7 at 10% bg, violet text): "Join as Business →"

SECTION: "TESTIMONIALS" (light gray background strip)
- 96px padding, max-width 1024px
- Heading: "Trusted by creators and brands" 36px bold centered
- 3-column grid (24px gap), 6 testimonial cards (2 rows):
  Each card: white, 16px radius, shadow, 24px padding
    - 5 gold star icons in a row (14px, filled, color #F59E0B)
    - Quote in 14px gray, italic feel
    - Divider line (50% opacity border color)
    - Author: 36px circle avatar (#6C5CE7 at 10% bg with violet initials) + Name (14px medium) + Role (12px gray)
  Sample testimonials about the platform working well.

SECTION: "PRICING"  (light gray strip)
- 96px padding, max-width 640px centered
- Heading: "Simple, transparent pricing" 36px bold centered
- Subheading: "Free for creators. Pay-as-you-grow for businesses."
- Two pricing cards side by side (24px gap):
  LEFT: "Creator" — white card, 28px padding
    - Label "Creator" in 14px semibold violet
    - Price: "Free" in 28px bold
    - Description: 14px gray
    - 5 features with green checkmarks
    - Gray outline button "Get Started"
  RIGHT: "Business" — same but with a 2px violet ring (at 20% opacity) around it
    - Price: "₹3,999" in 28px bold + "/mo" in 18px gray
    - Coral primary button "Start Free Trial"

SECTION: "FINAL CTA"
- Max-width 768px centered, 96px padding
- Rounded card (20px radius): gradient fill from #6C5CE7 to #00B8D9 (135 degrees), 48px padding
- Title: "Ready to transform your collaborations?" 28px bold, WHITE text
- Description: white at 80% opacity
- Two buttons: "Get Started Free" (white bg, violet text, larger shadow) + "Sign in" (transparent, white text)

FOOTER:
- Full width, thin top border, very light gray background
- Max-width 1152px centered, 48px padding
- 4-column grid:
  - Col 1: Logo + short description
  - Col 2: "Product" links (Features, Pricing, How It Works, API Docs)
  - Col 3: "Company" links (About, Blog, Careers, Contact)
  - Col 4: "Legal" links (Privacy, Terms, Cookies, Security)
- Bottom bar: copyright left, tagline right

Use auto-layout for everything. Each section should be a separate auto-layout frame.
```

---

## STEP 9: LANDING PAGE — MOBILE (375px)

Create a new frame on the same page:

```
Design the mobile version (375px width) of the SYNQ landing page. Same design system: Inter font, background #FAFAFA, accent color #6C5CE7.

NAVIGATION: Full width, 60px height, white bg, shadow
- Left: SYNQ logo image (height 24px, theme-aware)
- Right: Hamburger menu icon (or just "Sign in" + small violet button "Start")

HERO: 375px wide, 80px top padding, 64px bottom padding, 16px horizontal padding
- Same pill badge, centered
- Headline: 36px bold (smaller than desktop), centered
- Subheadline: 18px gray, centered
- Buttons STACKED vertically (full width each, 12px gap)
- Trust text below

PRODUCT TABS: Full width card, tabs scroll horizontally (show scroll indicator)
- Content area: single column, 24px padding
- Features list below the description

STATS: 2x2 grid instead of 4 columns

FEATURES: Single column cards, full width, 16px gap

HOW IT WORKS: Single column — steps stacked on top, demo card below

FOR CREATORS/BUSINESSES: Single column, cards stacked

TESTIMONIALS: Single column, one card at a time

PRICING: Single column, cards stacked

CTA: Full width, buttons stacked

FOOTER: 2-column grid for links, stacked on very small

Everything uses auto-layout with 16px horizontal padding. All text is centered where appropriate, left-aligned in cards.
```

---

## STEP 10: LOGIN + REGISTER PAGES

Go to "Auth Pages" page:

```
Design auth pages for SYNQ. Inter font. Background #FAFAFA.

Create 2 frames side by side:

FRAME 1: "Login Page" — 1440px wide, centered content max-width 448px, vertically centered in viewport
- Logo: centered, SYNQ logo image (theme-aware), height 32px
- Title: "Welcome back" 24px semibold centered
- Subtitle: "Sign in to your SYNQ account" 14px gray centered
- Below card: "Don't have an account? Sign up" with "Sign up" as violet link
- White card (16px radius, shadow, 24px padding) containing:
  - Email input with mail icon (44px height, 10px radius, #F4F4F5 bg, no border)
  - Password input with lock icon
  - 16px gap between fields
  - Full-width violet button "Sign in →" (52px height)
- Divider line with "or continue with" text centered
- Google sign-in button: full width, #F4F4F5 bg, Google "G" logo, "Continue with Google" text
- Below card: "Don't have an account? Sign up" with "Sign up" as violet link

FRAME 2: "Register Page" — Same layout but with:
- Title: "Join SYNQ and start collaborating"
- Before the form: Role selector — two side-by-side boxes (2-column grid, 12px gap)
  - "Creator" box: 16px radius, 2px violet border, light violet background, sparkle icon + "Creator" label
  - "Business" box: 16px radius, 2px gray border, white bg, briefcase icon + "Business" label
- Form: Name, Email, Password inputs
- Button: "Create Account →"

Also create a 375px mobile version of each — same content, just full-width at 375px with 16px padding.
```

---

## STEP 11: CREATOR DASHBOARD

Go to "Dashboard - Creator" page:

```
Design the creator dashboard for SYNQ. 1440px wide. Inter font.

LAYOUT STRUCTURE:
- Left: Sidebar (256px) — white at 72% opacity, frosted glass feel, small shadow, NO right border
  - Logo header (64px), 6 nav items, role footer
  - "Home" item is active (violet background at 10%, violet text)
- Right: Main content area (remaining width)
  - Top: Navbar (60px) — white bg, shadow, search bar center, icons + avatar right
  - Content below with 24px padding all around

CONTENT:
- Page Header: "Dashboard" in 28px bold, "Welcome back, here's your overview" in 15px gray, 40px bottom margin
- Stats Row: 4 cards in a horizontal row (equal width, 16px gap)
  Each stat card: 12px radius, 1px #E4E4E7 border, white bg, 24px padding
    - Icon + label in 14px gray (top)
    - Value: 24px semibold monospace #18181B
    - Trend: 12px "↑ 12%" in green or "↓ 3%" in red
  Stats: "Total Earnings ₹2.85L" / "Active Collabs 4" / "Match Score 92" / "Response Rate 96%"

- Below stats: 3-column grid
  - Left 2/3: "Open Opportunities" heading + 2-column grid of campaign cards
    Each campaign card: 12px radius, 1px border, 20px padding
      - Title + status badge (green "Active")
      - Match score highlight bar (violet at 5% bg)
      - Progress bar (6px height, violet fill)
      - "12 creators" text + "Apply" button
  - Right 1/3: "Active Collaborations" card with 3 list items (avatar + name + status badge + amount)
    Then "Recent Activity" feed with timeline dots and text

Use auto-layout for the entire layout. Sidebar should be fixed, content scrollable.
```

---

## STEP 12: CREATOR DASHBOARD — MOBILE (375px)

Same page:

```
Design the mobile version (375px) of the SYNQ creator dashboard.

NO sidebar (hidden on mobile). Instead:
- Top: Navbar (60px) with SYNQ logo (height 24px) on left, icons on right
- Bottom: Fixed tab bar (5 items: Home, Campaigns, Messages, Analytics, Settings) — each item is icon + 10px label, violet for active, gray for others, frosted glass background

CONTENT (16px padding, 80px bottom padding for tab bar):
- Page Header: "Dashboard" 28px bold
- Stats: 2x2 grid (not 4 columns) with same stat cards
- Below: Single column — campaign cards full width stacked, then activity feed

Use auto-layout. Show the mobile tab bar as a fixed bottom element.
```

---

## STEP 13: MESSAGES PAGE

Go to "Other Pages" page:

```
Design the messaging interface for SYNQ. 1440px wide desktop + 375px mobile.

DESKTOP (inside dashboard layout with sidebar + navbar):
- Two-panel layout filling the content area:
  LEFT PANEL: 320px wide, white bg, right border
    - Search input at top (40px height, full width, 16px padding around)
    - Conversation list below (scrollable):
      Each conversation: full width, 12px vertical padding, 16px horizontal
        - Avatar (40px) with green online dot (12px circle, bottom-right)
        - Name (14px medium) + last message preview (14px gray, truncated)
        - Timestamp (12px gray) top-right
        - Unread badge: 20px violet circle with white count number
      Active conversation: light gray (#F4F4F5) background
  RIGHT PANEL: Flex fill remaining width
    - Header: avatar + name + "Online" status, bottom border
    - Message thread (scrollable):
      - Sent messages (right-aligned): violet background (#6C5CE7), white text, 16px radius (flatter bottom-right), max 70% width
      - Received messages (left-aligned): #F4F4F5 bg, #18181B text, 16px radius (flatter bottom-left), max 70% width
      - Timestamps between message groups: centered, 12px gray
    - Input bar at bottom: text input (full width) + send button (violet, icon)

MOBILE (375px): Show conversation list as full screen. Then show a separate frame with the chat view (back arrow + header + messages + input). On mobile, only one panel visible at a time.
```

---

## STEP 14: SETTINGS PAGE

Same page:

```
Design the settings page for SYNQ. Desktop 1440px (inside dashboard with sidebar). Inter font.

Content area max-width 768px centered, 24px padding.

SECTIONS (each is a white card, 16px radius, shadow, 24px padding, 24px gap between cards):

1. "Profile" — Icon (user) + title. Contains:
   - Avatar (64px) + "Change Photo" button
   - Two-column grid: Name input + Email input
   - Full-width Bio textarea

2. "Notifications" — Icon (bell) + title. Contains:
   - 4 toggle rows: each has label on left, description in gray below, Switch toggle on right
   - "Email notifications", "Push notifications", "Marketing emails", "Collaboration updates"

3. "Appearance" — Icon (palette) + title. Contains:
   - Theme selector: "Light" / "Dark" / "System" — segmented control (tabs component)

4. "Connected Accounts" — Icon (link) + title. Contains:
   - 3 rows: each has platform icon + name + status, with Connect/Disconnect button
   - Instagram (connected, green badge), YouTube (not connected), TikTok (not connected)

5. "Danger Zone" — Red-tinted card (1px #EF4444 at 20% border)
   - Title "Danger Zone" in red
   - "Delete Account" with red destructive button

Use auto-layout for everything.
```

---

## STEP 15: REMAINING PAGES (Quick Frames)

Generate these as simpler frames:

```
Design these additional pages for SYNQ. Desktop 1440px, inside the dashboard layout (sidebar + navbar). Inter font, background #FAFAFA.

1. "Analytics Page" — Page header "Analytics".
   - 4 stat cards in a row
   - Below: 2-column grid with an area chart (left, 256px height, violet gradient fill) and a bar chart (right, 256px height, violet bars)
   - Below that: 2-column grid with a pie chart (4 segments in violet, cyan, green, gold) and a "Top Brands" list

2. "Browse Campaigns" — Page header "Campaigns".
   - 2-column grid of campaign cards (same card design as dashboard)
   - 6 sample cards

3. "My Collaborations" — Page header "Collaborations".
   - Vertical list of collaboration items, 12px gap
   - Each: white card, 20px padding, horizontal layout — avatar + campaign name + brand + "₹45,000" + status badge + "View" button

4. "Creator Onboarding" — Centered layout, max 512px, no sidebar
   - Progress bar at top: 6 circles connected by lines (first 2 filled violet, rest gray)
   - Step title centered below
   - White card with form content: Name input, Location input, Bio textarea
   - Navigation: "Back" outline button + "Continue" violet button

5. "Creator Profile" — Full-width page (with back-nav header instead of sidebar)
   - Cover gradient banner (192px, violet to cyan at low opacity)
   - Profile card overlapping cover: large avatar (96px), name, verified badge, location, bio
   - Tags row: "Photography", "Lifestyle", "Travel" as violet pills
   - 6-column metric cards below (followers, engagement, response time, etc.)
   - Two-column layout: portfolio grid (3x3 square thumbnails) left, rate card right

Use auto-layout for everything. Show each page as a separate frame.
```

---

## STEP 16: DARK MODE VERSIONS

Select any completed frame and duplicate it, then:

```
Convert this frame to dark mode for SYNQ:
- Background: #0F0F10
- Surface/cards: #18181B
- Surface-elevated: #27272A
- Borders: #27272A
- Text primary: #FAFAFA
- Text secondary: #A1A1AA
- Input backgrounds: #27272A
- Accent color stays: #6C5CE7
- Gradient stays: #6C5CE7 (Electric Violet) → #00B8D9 (Cyan)
- Shadows get stronger: rgba(0,0,0,0.2) base
- Glass surfaces: rgba(30,30,32,0.72)

Keep all spacing, sizing, layout, and typography exactly the same. Only change colors.
```

Repeat for key pages: Landing hero, Dashboard, Messages, Login.

---

## PROTOTYPING TIPS (Manual in Figma)

After generating all frames:

1. **Connect Landing nav links** to scroll-to sections using "Scroll to" interaction
2. **Connect "Sign in" / "Get Started"** buttons to Login/Register frames using "Navigate to"
3. **Connect Login → Dashboard** with "Navigate to" on the Sign in button
4. **Connect sidebar items** to their respective dashboard pages
5. **Tab interactions:** Use "Change to" variant on tab components (or "Navigate to" for page-level tabs)
6. **Dialog open/close:** Add "Open overlay" on trigger buttons, "Close overlay" on X button and overlay background
7. **Mobile nav:** Connect tab bar items to respective mobile pages
8. **Hover states:** Add "While hovering" → variant change on buttons and cards

---

## CHECKLIST AFTER GENERATION

- [ ] All frames use auto-layout (check: no red "fixed position" warnings)
- [ ] Colors match the variable table (spot-check: accent is #6C5CE7, not blue)
- [ ] Corner radii are consistent (cards: 16px, buttons: 12px, inputs: 10px, badges: full)
- [ ] Touch targets are 44px minimum on mobile
- [ ] Text hierarchy is clear (28px page titles, 18px section titles, 15px body, 14px secondary)
- [ ] Dark mode versions have correct contrast
- [ ] Mobile frames are 375px wide with 16px padding
- [ ] Desktop content areas use max-width constraints (1152px landing, 1024px features, 768px settings)
- [ ] Gradient is violet-to-cyan (#6C5CE7 → #00B8D9), NOT coral/pink
- [ ] SYNQ logo image used (not old gradient square with Sparkles icon)
- [ ] All currency shown in INR (₹), not USD ($)
