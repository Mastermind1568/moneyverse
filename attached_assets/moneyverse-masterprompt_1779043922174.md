# MONEYVERSE — Complete Frontend Build Brief

## WHAT YOU ARE BUILDING

Moneyverse is a Bitcoin financial education platform targeting African markets
(Nigeria, Ghana, Kenya, South Africa) and diaspora (UK, Canada, UAE, Dubai).
The core product is "The Blueprint: Bitcoin Masterclass" — a 3-tier course
covering Bitcoin fundamentals, DCA strategy, self-custody, cycle theory, exit
architecture, and cross-border payments.

Build a complete marketing + course frontend. Editorial, brutalist, high-contrast
design. Think Financial Times meets Supreme. No gradients. No rounded corners.
Hard edges. Heavy typography. Orange accent on black.

---

## TECH STACK

- Framework: Next.js 14+ (App Router)
- Styling: CSS custom properties (no Tailwind) — all styles inline or via
  global CSS classes
- TypeScript: strict mode, zero errors
- Fonts: Load via next/font or Google Fonts:
  - Display/Serif: Playfair Display (weights 700, 900)
  - Mono: Space Mono (weight 400, 700)
  - Sans: Inter (weights 400, 500, 600)
- No UI libraries. No component libraries. Pure HTML + CSS.

---

## DESIGN SYSTEM

### Colors
```css
--black:  #0A0A0A;
--white:  #FFFFFF;
--accent: #F59300;   /* orange */
--n50:    #FAFAFA;
--n100:   #F5F5F5;
--n200:   #E5E5E5;
--n400:   #A3A3A3;
--n600:   #525252;
--n700:   #404040;
--red:    #EF4444;
```

### Typography Scale
```css
/* Display — hero headings */
.display {
  font-family: var(--font-serif);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 0.85;
}

/* Section headings */
.h-section {
  font-family: var(--font-serif);
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 1.0;
}

/* Overline labels */
.overline {
  font-family: var(--font-sans);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #767676;
}

/* Mono utility */
.mono {
  font-family: var(--font-mono);
}

/* Serif body */
.serif {
  font-family: var(--font-serif);
}
```

### Layout Rules
- Global max content width: none (full bleed sections)
- Section padding: 120px top/bottom, 64px left/right (desktop)
- Mobile section padding: 60px top/bottom, 20px left/right
- All borders: `2px solid var(--black)` (outer) or `1px solid var(--n200)` (inner)
- No border-radius anywhere. Everything is sharp corners.
- Grid gaps: 0 (borders create visual separation)

### Accent Rule (orange horizontal line before section headings)
```css
.accent-rule {
  display: block;
  width: 40px;
  height: 3px;
  background: var(--accent);
}
.accent-rule.lg {
  width: 60px;
}
```

### Buttons
```css
.btn {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 12px 24px;
  border: 2px solid var(--black);
  background: transparent;
  color: var(--black);
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}
.btn.orange {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--black);
}
.btn.sm {
  padding: 8px 16px;
  font-size: 10px;
}
```

---

## SITE ARCHITECTURE

Pages to build:
1. `/` — Homepage
2. `/pricing` — Masterclass pricing + checkout
3. `/calculator` — Currency Loss Calculator (free tool)
4. `/partner` — Affiliate Programme + profit calculator
5. `/faq` — 17 objection-handling Q&As
6. `/about` — The thesis / founder story
7. `/blog` — Research index (static, no CMS needed)
8. `/preview/[slug]` — Module preview pages (15 slugs)
9. `/success` — Post-purchase confirmation
10. `/cancel` — Abandoned checkout

---

## GLOBAL COMPONENTS

### HEADER

Fixed, 52px tall. Orange 3px masthead stripe at top.

Left: Logo — orange square (14×14px) + "MONEYVERSE" in serif 900 + "v1.0" in
tiny mono uppercase.

Center/Right nav links (desktop):
- The Thesis → /about
- Research → /blog
- Free Tools → /calculator
- Partner → /partner
- Masterclass → /pricing

Far right: "Access Blueprint" button (orange, sm)

Mobile: Hide nav links, show hamburger (3 lines, 40×40px bordered button).
Hamburger opens full-width dropdown with all links + orange CTA button.

Active link: black color + 2px orange underline bottom.

### FOOTER

Black background, white text.

Row 1: Live ticker strip (scrolling marquee) — alternate between:
"BTC CYCLE PHASE: ACCUMULATION" · "NEXT HALVING: EST. 2028" ·
"30% AFFILIATE COMMISSION" · "LIFETIME ACCESS · NO SUBSCRIPTION" ·
"85 LESSONS · 11H 43M RUNTIME" · "NIGERIAN NAIRA −74% SINCE 2021"

Row 2: 4-column grid
- Col 1 (2fr): Logo + italic serif tagline "A masterclass for operators who
  move before the cycle peaks." + disclaimer in tiny sans: "Moneyverse is not
  investment advice. Bitcoin involves risk. Past cycles do not guarantee future
  results."
- Col 2: Product — The Blueprint (/pricing), The Thesis (/about), Dashboard (/dashboard)
- Col 3: Resources — Currency Calculator (/calculator), Affiliate Program (/partner),
  FAQ (/faq), Research (/blog)
- Col 4: Email capture — "Get the Free Guide" overline, italic serif headline
  "One email. The 4-Year Clock, distilled." + email input + submit button

Row 3: Bottom bar — "© 2026 Moneyverse Capital, Ltd. · Lagos · London · Dubai"
left, "Terms · Privacy · Disclosures" right.

Mobile: 2-col grid. Col 1 spans full width. Form stacks below.

---

## PAGE 1: HOMEPAGE ( / )

### Hero Section — Black background, full viewport height

Layout: 2-col grid (60/40 split), hard border between columns.

Left column:
- Small overline: "Bitcoin · Financial Sovereignty · 2026"
- Giant display heading — clamp(6rem, 16vw, 18rem), line-height 0.8:
  ```
  Money
  verse.
  ```
  "verse" in italic. Period in orange.
- Below: paragraph in italic serif 22px max-width 560px:
  "The naira fell 74%. The cedi needed an IMF bailout. Your bank charged you
  6% to send money home. Most Bitcoin investors have no exit plan, no risk
  framework, and no idea what the chart is telling them.
  This is the operating manual."
- Two buttons side by side:
  [Get The Blueprint →] (orange) [See the Curriculum →] (bordered)

Right column:
- Black background with faint topo pattern (SVG, orange at 10% opacity)
- Centered stat: "$97" in display size orange, "Starting price" overline above,
  "Once. Yours forever." mono below
- Below: vertical list of 3 mini stats with orange tick marks:
  "85 Lessons" / "11h 43m Runtime" / "30-Day Guarantee"

### Stats Bar — 5 columns, white background, border top+bottom

| 11 | 85 | 11h 43m | Lifetime | 30 Days |
|Modules|Lessons|Runtime|Access|Guarantee (orange)|

### Problem Block — 2 columns, black left / white right

Left (black):
- Overline "The Problem" in accent
- Heading serif 900: "Your savings are being taxed without your consent."
- Body: "Every year the naira, cedi, and shilling lose purchasing power.
  Your bank is not a savings vehicle. It is a slow drain. The Blueprint
  is the system that stops it."
- Mono stat: "Average African currency depreciation vs USD since 2021: 47%"

Right (white):
- Grid of 3 items stacked with border separators:
  1. "The naira needs ₦1,580 today to buy what ₦410 bought in 2022."
  2. "Sending $200 home costs $14–28 in fees. That's 7–14%."
  3. "93% of Bitcoin investors have no exit plan for the next cycle peak."

### Thesis Section — White, full bleed

- Overline "Why Bitcoin"
- Heading: "Not an investment. An exit."
- 3-column grid (bordered):
  1. "Fixed Supply" — "21 million. No government can print more."
  2. "Self-Custody" — "Your keys, your coins. No bank can freeze it."
  3. "Global Liquidity" — "Send value across borders in 10 minutes for $0.50."

### Curriculum Preview — White

- Heading: "What's inside."
- Show first 4 modules as teaser cards (accordion):
  Module 01: The Fiat Trap · 6 lessons · 38 min
  Module 02: Bitcoin Fundamentals · 8 lessons · 54 min
  Module 03: The 4-Year Clock · 7 lessons · 48 min
  Module 04: DCA Protocol · 6 lessons · 42 min
- "See all 11 modules →" link to /pricing

### Social Proof — 3 testimonials on n50 background

```
"The clearest articulation of cycle theory I've ever paid for."
— B. Ofori · Personal Finance · 84K

"Eleven modules. Zero hype. Read the curriculum and you understand
what's missing everywhere else."
— A. Hartmann · Macro Strategy · 38K

"Bought it for the affiliate program. Stayed for the Exit Plan module."
— K. Patel · Real Estate · 121K
```

### Final CTA — Black background

- Left: Heading "Enroll before the next cycle peak."
  Body: "11 modules. 85 lessons. One payment. Starts at $97."
- Right: Big "$97" in orange, "Access Blueprint →" orange button,
  mono note: "30-day conditional guarantee"

---

## PAGE 2: PRICING ( /pricing )

### JSON-LD structured data (Course schema) — inject in <head>
```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "The Blueprint: Bitcoin Masterclass",
  "description": "Eleven modules. 85 lessons. The operating manual for preserving wealth through the next four-year Bitcoin cycle.",
  "url": "https://moneyverse.network/pricing",
  "provider": { "@type": "Organization", "name": "Moneyverse" },
  "offers": [
    { "@type": "Offer", "price": "97",  "priceCurrency": "USD", "name": "Blueprint" },
    { "@type": "Offer", "price": "197", "priceCurrency": "USD", "name": "Blueprint + Live" },
    { "@type": "Offer", "price": "997", "priceCurrency": "USD", "name": "Sovereign Stack" }
  ],
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "340" },
  "timeRequired": "PT11H43M"
}
```

### Hero — Black background

- Overline: "The Moneyverse Masterclass · 2026 Edition"
- Display heading (clamp 5rem → 14rem): "The Blueprint."
  ("Blue" in italic, period in orange)
- Sub-copy italic serif 26px max 680px:
  "The naira fell 74%. The cedi needed an IMF bailout. Your bank charged you
  6% to send money home. Most Bitcoin investors have no exit plan, no risk
  framework, and no idea what the chart is telling them.
  This is the system that fixes all of it." (last line in orange)
- Top right: "Starting from" overline, "$97" in orange 72px, "Once. Yours
  forever." mono below

### Vitals Bar — 5 columns bordered

11 Modules · 85 Lessons · 11h 43m Runtime · Lifetime Access · 30 Days Guarantee

"30 Days" and "Guarantee" in orange.

### Curriculum Section

Heading: "The Curriculum."
Sub: "Eleven modules, sequenced for operators. Each chapter compounds on the
last — from understanding what fiat extracts from you, to the African monetary
sovereignty context that makes the whole thesis unavoidable."
Top right mono: "Approx 11h 43min · 85 lessons · + 12 worksheets"

Accordion — all 15 modules. Each row has:
- Module number (01–15) in large serif, faded
- Module title
- Description
- Duration + lesson count
- First lesson: preview link (▶ icon)
- Other lessons: lock icon (🔒), grayed

**MODULE DATA — all 15:**

M01: The Fiat Trap · 6 lessons · 38 min
"Every fiat currency in history has failed. Understand the mechanism extracting
value from your savings right now."
Lessons: The History of Money / What Fiat Currency Actually Is /
How Inflation Works as a Tax / The Naira Case Study: 2020–2025 /
Currency Devaluation vs. Hyperinflation / Your Savings Account Is Not Safe

M02: Bitcoin Fundamentals · 8 lessons · 54 min
"21 million coins. No central bank. No inflation. Learn the protocol that makes
Bitcoin categorically different from every other asset."
Lessons: What Bitcoin Actually Is / The 21 Million Hard Cap / Mining and
Difficulty Adjustment / Why No One Controls Bitcoin / Bitcoin vs Gold:
The Store of Value Comparison / The Node Network / How Transactions Work /
Why Bitcoin Cannot Be Shut Down

M03: The 4-Year Clock · 7 lessons · 48 min
"The halving cycle is the most predictable pattern in financial markets.
Learn to read it, position before it moves, and exit before it reverses."
Lessons: What the Halving Is / The 4 Phases of Every Cycle / Historical Cycle
Analysis: 2013 · 2017 · 2021 / Where We Are Right Now / The Pre-Halving
Accumulation Window / Post-Halving Price Action / Reading the Clock for 2025–2028

M04: DCA Protocol · 6 lessons · 42 min
"Systematic weekly accumulation removes emotion from the equation. This module
sets up your DCA to run automatically — forever."
Lessons: Why DCA Beats Lump Sum (Almost Always) / Setting Your Weekly Stack
Amount / Which Exchange or P2P to Use / Automating Your DCA Schedule /
Tracking Your Cost Basis / The 21-Day Activation Sequence: Days 1–7

M05: Self-Custody Masterclass · 9 lessons · 1h 12m
"Your Bitcoin on an exchange is not your Bitcoin. This module walks you
through hardware wallet setup, seed phrase security, and cold storage protocol."
Lessons: Why Self-Custody Is Non-Negotiable / Hardware Wallet Options Compared /
Unboxing and Initial Setup / Generating Your Seed Phrase / Seed Phrase Storage
Protocol / Transferring From Exchange to Cold Wallet / Verifying Your Backup /
What To Do If You Lose Your Device / Multi-Sig for Advanced Users

M06: Exit Architecture · 7 lessons · 52 min
"93% of Bitcoin investors have no exit plan. This module gives you exact
price targets, profit-taking schedule, and the reaccumulation plan for the
next cycle."
Lessons: Why Most Investors Give Back Their Gains / Cycle Peak Indicators /
The Profit-Taking Ladder / Tax-Efficient Exit Strategies / When to Stop Buying /
The Reaccumulation Window / Your Personal Exit Plan Template

M07: P2P Trading & Remittance · 6 lessons · 44 min ★ Bonus
"Skip the bank. Send money across borders in 10 minutes for $0.50. This module
covers P2P platforms, rate optimisation, and the full remittance workflow."
Lessons: P2P Platform Overview / How to Buy Bitcoin P2P Without a Bank /
Sending Remittances via Bitcoin / Avoiding Scams and Bad Actors /
Rate Optimisation: When to Send / The Family Remittance Setup

M08: African Monetary Sovereignty · 5 lessons · 36 min ★ Bonus
"The context that makes the whole thesis unavoidable. Why Bitcoin is not
optional for Africans — it is structural."
Lessons: The Colonial Roots of African Currency / Why the CFA Franc Is
a Trap / Nigeria's CBN and the Naira Crisis / Ghana's IMF Bailout Explained /
Bitcoin as African Monetary Sovereignty

M09: The Affiliate Engine · 4 lessons · 28 min
"30% commission on every sale you refer, forever. This module sets up your
affiliate infrastructure and gives you the framework to promote effectively."
Lessons: How the Affiliate Programme Works / Setting Up Your Partner Dashboard /
Your First 5 Referrals / Scaling Beyond $1,000/Month in Commissions

M10: The 21-Day Activation Sequence · 3 lessons · 22 min
"One action per day for 21 days. By the end, your DCA is running, your
Bitcoin is in self-custody, and your affiliate link is live."
Lessons: Days 1–7: Foundation Protocol / Days 8–14: Custody and Security /
Days 15–21: Launch and Monetise

M11: The Community Protocol · 2 lessons · 17 min
"How to use the Moneyverse community to accelerate your results — accountability
partners, cohort challenges, and group milestones."
Lessons: How the Community Is Structured / The 30-Day Accountability Protocol

--- SOVEREIGN STACK ONLY (black background rows, orange ★ badge) ---

M12: Macro Masterplan · 8 lessons · 1h 18m ★ Sovereign Stack
"Read the macro environment before it moves. DXY, Fed cycles, M2 money supply,
and global liquidity — the inputs that drive Bitcoin's price before the chart
shows it."
Lessons: What Macro Analysis Is and Why It Matters / The Dollar Index (DXY)
Explained / How the Fed Rate Cycle Affects Bitcoin / M2 Money Supply and
Global Liquidity / Reading the Risk-On / Risk-Off Cycle / Identifying the
Start of a Bull Run Before It Happens / The Macro Checklist: Pre-Entry
Conditions / Building Your Macro Dashboard

M13: Technical Analysis Masterclass · 10 lessons · 1h 32m ★ Sovereign Stack
"Support zones, resistance levels, RSI, moving averages. Read the chart before
the move happens and execute with precision."
Lessons: Why Technical Analysis Works for Bitcoin / Support and Resistance:
The Foundation / Reading Candlestick Patterns / RSI: How to Use It Without
Getting Faked Out / Moving Averages: 50, 100, 200 Day / Volume Analysis /
Identifying Breakouts Before They Happen / The Chart Setups That Repeat Every
Cycle / Position Sizing Based on Chart Signals / Building Your Pre-Trade Checklist

M14: Risk Management Framework · 7 lessons · 58 min ★ Sovereign Stack
"Position sizing, portfolio allocation, and drawdown protocols. The system
that keeps you in the game through every correction."
Lessons: Why Risk Management Is the Only Edge That Compounds / Position Sizing
Formulas / Portfolio Allocation Across the Cycle / The Drawdown Protocol /
Stop-Loss Strategy for Bitcoin Investors / Mental Stops vs. Hard Stops /
The Recovery Playbook After a Major Correction

M15: Money Management Strategy · 6 lessons · 48 min ★ Sovereign Stack
"The compounding playbook across multiple 4-year cycles. How to turn one
bull run into a permanent financial advantage."
Lessons: The Multi-Cycle Compounding Model / How to Reinvest Profits
Without Giving Them Back / Building an Emergency Reserve in Hard Currency /
The 3-Bucket Framework: Spend · Save · Stack / Tax Planning for Bitcoin
Profits in African Markets / Your 10-Year Financial Architecture

### Testimonials Section — n50 background

3 columns bordered:
```
"The clearest articulation of cycle theory I've ever paid for."
— B. Ofori · Personal Finance · 84K

"Eleven modules. Zero hype. Read the curriculum and you understand
what's missing everywhere else."
— A. Hartmann · Macro Strategy · 38K

"Bought it for the affiliate program. Stayed for the Exit Plan module."
— K. Patel · Real Estate · 121K
```

### Tier Selection + Checkout — White

Heading: "Pick your level."
Sub-heading italic orange: "Pay once. Own it forever."
Body: "Every tier includes the complete 11-module Blueprint. What separates
them is how far you want to go — from stopping the currency leak, to running
money across borders like a professional operator. One payment. No subscription.
No upsell."
Top right: "Pay in · USD · NGN · BTC · USDT" + "NGN · GHS · KES via Paystack
/ USD · GBP · CAD via Stripe"

**3-TIER COMPARISON GRID — client-side interactive:**

Selected tier has BLACK background. Default selected: Tier 2.

**Tier 1 — Blueprint · $97**
Tagline: "You are losing money every month you don't have this. $97 stops the leak."
CTA: "Get The Blueprint →"
Commission: $29.10/sale · "4 referrals = your investment back."
Badge: none
Includes (✓):
- 11-module masterclass — 85 lessons, 11h 43m of execution-ready content
- 4-Year Clock Framework — know exactly where you are in the cycle
- Self-Custody Protocol Kit — your Bitcoin, your keys, no exchange risk
- 21-Day Activation Sequence — one action per day until the protocol is live
- Affiliate Engine — 30% commission on every sale you refer, forever
- Partner Dashboard — real-time clicks, conversions, and earnings
- Lifetime updates — every new cycle, every new lesson. No extra cost.
Excludes (–):
- Monthly live tutorial sessions
- WhatsApp activation class
- Macro Masterplan courses
- Investor timing protocol
- Arbitrage playbook
- Cross-border payment execution
- 1:1 private setup calls

**Tier 2 — Blueprint + Live · $197** ★ Most Popular (orange badge)
Tagline: "The protocol, delivered live. We walk you through every step until
it's working."
CTA: "Start The Protocol →"
Commission: $59.10/sale · "4 referrals = your investment back."
Includes:
- Everything in Blueprint
- Monthly live tutorial sessions — group walkthroughs, filmed, replays kept
- 5-Day WhatsApp activation class — Tier 2 and 3 only
- 14-Day Story Launch Sequence — done-for-you scripts for IG, X, YouTube Shorts
- Monetisation Gameplan — AI-written, 6-part playbook for your specific audience
Excludes:
- Macro Masterplan courses
- Investor timing protocol
- Arbitrage playbook
- Cross-border payment execution
- 1:1 private setup calls

**Tier 3 — Sovereign Stack · $997** ★ The Operator's System (dark badge)
Tagline: "Not a course. A complete operating system for building and protecting
wealth through Bitcoin — from reading the macro environment, to executing precise
trades, to moving money across borders without a bank. Everything. On a call with
us until it is done."
CTA: "Claim The Sovereign Stack →"
Commission: $299.10/sale · "1 referral = $299. 4 referrals = you profited. No cap."
Price in orange (larger display)
Includes:
- Everything in Blueprint + Live
- Macro Masterplan — DXY, Fed cycles, M2 supply. Know when the market is about
  to move before it does.
- Investor Protocol — exact cycle entry zones, profit-taking schedule, and exit
  targets. No guessing. No hoping.
- Technical Analysis Masterclass — support zones, resistance levels, RSI, moving
  averages. Read the chart before the move happens.
- Risk Management Framework — position sizing, portfolio allocation, and drawdown
  protocols. The system that keeps you in the game.
- Money Management Strategy — the compounding playbook across multiple 4-year cycles.
- Arbitrage Playbook — 2–4% spreads between markets exist right now.
- Cross-Border Payments — pay tuition, family support, supplier invoices. No bank.
  No fees. No delays.
- 3 × Private 1:1 Calls — we stay on screen until your full stack is live.
Excludes: nothing

**Clicking any tier card selects it and scrolls to checkout panel below.**

**Checkout Panel (below tier grid):**
```
"Enrolling in: [Tier Name] [Price in orange]"

Box (max-width 560px, 2px black border):
- Top: "Total · One-time" left, price right (orange 40px)
- Payment method selector (3 buttons): Card (Stripe · Global) | Bitcoin (BTCPay · Self-custody) | NGN (Paystack · Africa)
- Email input (mono font, n50 background)
- Error message if no email
- [CTA Button — full width, orange, 20px padding]
  Text: loading ? "Redirecting…" : bitcoin ? "Pay with Bitcoin → [tier CTA]" : "[tier CTA]"
- Footer: "30-day conditional refund" left · "● Secure" orange right
```

**Checkout API call:**
```
POST /api/checkout
{
  productId: tier.productId,  // from env vars
  customerEmail: email,
  paymentMethod: method === "card" ? undefined : method === "ngn" ? "paystack" : "bitcoin",
  linkSlug: ref from ?ref= param or mv_ref cookie,
  tier: 1 | 2 | 3,
  successUrl: "https://moneyverse.network/success",
  cancelUrl: "https://moneyverse.network/cancel"
}
→ Response: { url: string } — redirect window.location.href to url
→ Error: { error: string } — display in red
```

Env vars needed:
- NEXT_PUBLIC_PRODUCT_ID_T1 — Tier 1 product ID
- NEXT_PUBLIC_PRODUCT_ID — Tier 2 product ID
- NEXT_PUBLIC_PRODUCT_ID_T3 — Tier 3 product ID

Guarantee copy (mono, tiny, below panel):
"30-day conditional guarantee — follow the 21-day activation sequence as
designed: one protocol per day, executed. If you do the work and your financial
position hasn't fundamentally shifted, one email gets you every cent back.
No forms. No questions. We are that confident in the protocol."

---

## PAGE 3: CALCULATOR ( /calculator ) — "use client"

**Hero — Black background:**
Overline: "Free Tool · Moneyverse"
H1: "What your savings actually cost you."
Sub: "Enter what you save each month. See how much purchasing power your
currency took from you — and what the Bitcoin alternative would look like."

**Calculator Section:**

Inputs (2-col grid):
1. Country selector (dropdown):
   - 🇳🇬 Nigeria (NGN · ₦) — startRate: 410, currentRate: 1580
   - 🇬🇭 Ghana (GHS · ₵) — startRate: 5.7, currentRate: 15.5
   - 🇰🇪 Kenya (KES · KSh) — startRate: 108, currentRate: 130
   - 🇿🇦 South Africa (ZAR · R) — startRate: 14.8, currentRate: 18.5
   - 🇨🇲 Cameroon (XAF) — startRate: 540, currentRate: 617
   Context line per country:
   - NG: "The naira lost over 70% of its value against the dollar since 2021."
   - GH: "Ghana's cedi fell over 60% and required an IMF bailout in 2023."
   - KE: "The shilling depreciated ~20% — every KES 1,000 saved is worth KES 830."
   - ZA: "Load-shedding and fiscal pressure pushed the rand down ~25% since 2021."
   - CM: "The CFA franc is pegged to the euro — but the euro weakened against the dollar."

2. Monthly savings input (number, prefix = currency symbol)
   Default: 50,000 for NG

**Calculations (assume 36 months = 3 years):**
- totalSavedLocal = monthly × 36
- usdAtStart = totalSavedLocal / startRate
- usdToday = totalSavedLocal / currentRate
- purchasingPowerLost = usdAtStart - usdToday
- devaluationPct = ((currentRate - startRate) / startRate) × 100
- BTC_AVG_ENTRY = 35000, BTC_CURRENT = 100000
- btcAccumulated = usdAtStart / BTC_AVG_ENTRY
- btcValueToday = btcAccumulated × BTC_CURRENT
- btcGain = btcValueToday - usdAtStart

**Results (3-col grid, bordered):**

Column 1 — "You saved":
- Total in local currency (monthly × 36)
- In USD 3 years ago (total / startRate)

Column 2 — "It's now worth" (red tint background):
- Current USD value (total / currentRate)
- Purchasing power lost (−$X · Y%)

Column 3 — "Bitcoin alternative" (orange tint background):
- BTC value today
- BTC accumulated (X.XXXX BTC · weekly DCA)
- Gain vs saving in local currency (+$X)

**"The Gap" callout — black bar below results:**
Large orange number: btcValueToday - usdToday
"Between saving in [currency] vs. a weekly Bitcoin DCA at avg $35K entry"
Right: "See the protocol →" orange button linking to /pricing

Disclaimer (tiny mono):
"Exchange rates are illustrative and based on publicly available historical data.
Bitcoin DCA calculation assumes weekly purchases at an average entry price of
$35,000 and a current price of $100,000. Actual returns vary. This is not
financial advice."

**"The protocol that closes the gap" — 3-col grid, n50 background:**
01 Know exactly when to buy — The 4-Year Clock framework maps Bitcoin's halving
   cycles. You stop guessing and start executing at defined intervals.
02 Automate weekly accumulation — The Accumulation Engine module sets up DCA
   that runs without you. Weekly buys. Consistent allocation. No emotional decisions.
03 Move off exchanges — The Cold Storage Protocol walks you through hardware
   wallet setup. Bitcoin you hold is Bitcoin that can't be seized or frozen.

**CTA — centered white:**
"Stop saving in a leaking currency."
"Enroll in The Blueprint · $197 →" orange button → /pricing
"30-day conditional guarantee · One email refund" (tiny mono)

---

## PAGE 4: PARTNER ( /partner ) — "use client"

**Hero — Black:**
Overline: "Partner Programme · Moneyverse"
H1: "Your audience is already asking."
Sub: "You talk about money, Africa, or Bitcoin. Your audience is already paying
attention. The Blueprint gives you a product to sell — and 30% of every sale,
paid automatically."

3 stats:
- 30% — Commission per sale
- $59 — You earn per enrolment
- 4 — Sales = your course free

**Profit Potential Calculator:**

H2: "Your audience revenue potential."

Inputs (2-col):
1. Follower count (number input, default 20,000)
   Sub: "Combined across your platforms (IG, X, YouTube, WhatsApp)"
2. Content niche (select):
   - Personal Finance — 1.2% conv rate
   - Crypto / Bitcoin — 1.8% conv rate
   - Entrepreneurship — 1.0% conv rate
   - Africa / Diaspora — 1.4% conv rate
   - Investing — 1.3% conv rate

**Calculations:**
- COURSE_PRICE = 197, COMMISSION_PCT = 0.30, COMMISSION_VALUE = 59.10
- projectedSales = Math.round(followers × convRate)
- partnerEarnings = projectedSales × COMMISSION_VALUE
- breakEvenSales = Math.ceil(197 / 59.10) = 4
- breakEvenPct = (breakEvenSales / projectedSales × 100).toFixed(0)

Results (3-col bordered):
- ~X sales — Projected enrolments
- $X — Your 30% earnings (orange)
- X sales (X%) — To make course free

Footer: "Estimate based on X% conversion rate · Not a guarantee of income."

**How the programme works — 4-col grid (white on n50 section):**
01 Enroll — Buy The Blueprint at $197. You learn the protocol and get full course access.
02 Get your links — Instant access to the partner dashboard. Create affiliate links per platform or campaign.
03 Launch — Use the 14-day Story Launch Sequence and Monetisation Gameplan to promote to your audience.
04 Earn 30% — Every sale tracked in real time. $59.10 per enrolment, paid to your account.

**What partners get — 2-col layout:**

Left: "Everything you need to launch."
Body: "The Blueprint includes the partner infrastructure. You're not starting
from scratch — the scripts, the gameplan, and the dashboard are already built."

Right: feature list with "Included" tag each:
- 14-Day Story Launch Sequence — Done-for-you IG, X, and YouTube Shorts scripts for each day of your launch.
- Monetisation Gameplan — AI-generated, audience-specific 6-part playbook tailored to your niche.
- Partner Dashboard — Real-time clicks, conversions, and earnings. Updated hourly.
- Custom Affiliate Links — Create unlimited links per platform, campaign, or content piece.
- 30% Lifetime Commission — On every sale you refer, forever. No cap, no expiry.

**CTA — Black:**
"Enroll. Then monetise."
Sub: "Buy The Blueprint once. You learn the protocol and immediately get access
to the affiliate engine. Four sales and your course pays for itself."
$197 large orange
"Enroll & Activate Partner Access →" button → /pricing
"30-day conditional guarantee · $59.10 / sale · real-time dashboard"

---

## PAGE 5: FAQ ( /faq )

**Hero — Black:**
"Every question. Answered straight."
Sub: "No hedging. No corporate deflection. Email support@moneyverse.network
for anything not covered here — real reply within 24 hours."

**Layout: Each Q&A is a 2-col row. Question left (5fr), Answer right (7fr).
Sections have overline label on n50 background strip.**

**Section: The Course**

Q: Do I need prior Bitcoin or investing experience?
A: No. Module 01 starts at first principles — what money is, what fiat extracts
from you, why Bitcoin changes the equation. If you already understand Bitcoin
basics, you skip to Module 04. The 21-Day Activation Sequence works for both
complete beginners and experienced holders.

Q: How long does it take to complete?
A: 11 hours 43 minutes across 85 lessons. Most students complete Modules 01–07
in two weeks at one session per day. The 21-Day Activation Sequence runs one
protocol per day — setup is live in three weeks even at a relaxed pace.

Q: Is this pre-recorded or live?
A: Blueprint (Tier 1) is self-paced video — watch any time, any device, any
speed. Blueprint + Live (Tier 2) adds monthly live tutorial sessions with replay
access. Sovereign Stack (Tier 3) includes three private 1:1 calls.

Q: What is the 5-Day WhatsApp Activation Class?
A: A live, cohort-based walkthrough exclusive to Tier 2 and Tier 3. Over five
days: hardware wallet setup, DCA automation, P2P accounts, and affiliate link
launch — with real-time Q&A. Not available to Tier 1. Post-purchase access only.

Q: What does Sovereign Stack include beyond Blueprint + Live?
A: Four additional course tracks: Macro Masterplan (DXY, Fed cycles, M2 supply),
Technical Analysis Masterclass (support/resistance, RSI, moving averages), Risk
Management Framework (position sizing, drawdown protocols), Money Management
Strategy (compounding across cycles). Plus: Arbitrage Playbook, Cross-Border
Payments execution, and three private 1:1 calls.

**Section: Risk & Bitcoin**

Q: What if Bitcoin crashes after I buy?
A: The Blueprint is a framework for the 4-year cycle, not a prediction. Module
06 covers Exit Architecture specifically — profit-taking targets, cycle peak
indicators, reaccumulation zones. Students who execute the DCA and follow the
exit plan are structurally positioned to profit across the cycle regardless of
short-term volatility. Bitcoin involves risk. This is not investment advice.

Q: Is Bitcoin legal in my country?
A: Legal to hold and use in Nigeria, Ghana, Kenya, and South Africa. P2P trading
and self-custody are the methods taught — both operate outside the banking system
without violating law. Consult local legal advice if you have jurisdiction-specific
concerns.

Q: How much money do I need to start with?
A: The DCA protocol works from ₦5,000 / GH₵50 / $10 per week. The 21-Day
Activation gets your infrastructure live — the amount is secondary to having
the protocol running.

**Section: Payments & Access**

Q: How do I pay from Nigeria, Ghana, or Kenya?
A: Select NGN at checkout — pay via Paystack in local currency. GHS and KES also
supported. USD, GBP, CAD via Stripe. Bitcoin (BTC) and USDT via BTCPay — no bank
required for any tier.

Q: Is this a one-time payment or a subscription?
A: One-time. Once. Yours forever. No monthly fees. No annual renewal. Every future
lesson update and curriculum revision included at no extra cost.

Q: When do I get access after paying?
A: Immediately. Within two minutes, you receive an email with login credentials.
Not in inbox within five minutes — check spam or email support@moneyverse.network.

Q: Can I upgrade tiers later?
A: Yes. Contact support and we apply your original payment as a credit. Pay only
the difference.

**Section: The Guarantee**

Q: What exactly is the 30-day conditional guarantee?
A: Follow the 21-Day Activation Sequence as designed — one protocol per day,
executed in order. If you complete the sequence and your financial position
hasn't fundamentally shifted, one email gets you every cent back. No forms.
No interrogation.

Q: What does "fundamentally shifted" mean?
A: Your DCA is running automatically. Your Bitcoin is in self-custody. You have
sent or received a cross-border payment without a bank. You know your exact exit
targets. These are concrete, verifiable outcomes — not vague feelings.

**Section: Affiliate Programme**

Q: How does the affiliate programme work?
A: Every tier includes affiliate access. Your tracking link in the partner
dashboard earns 30% on every sale — forever. Tier 1: $29.10/sale. Tier 2:
$59.10. Tier 3: $299.10. Four referrals covers your original investment.

Q: Do I need a large audience?
A: No. The Monetisation Gameplan (Tier 2 and 3) is built for audiences between
1,000 and 100,000 followers. Trust and niche alignment matter more than raw
follower count.

**CTA — Black:**
"Still unsure? The guarantee removes the risk."
"From $97 · Get The Blueprint →" orange button → /pricing

---

## PAGE 6: PREVIEW ( /preview/[slug] ) — Static SSG

**15 valid slugs:**
fiat-trap, bitcoin-fundamentals, four-year-clock, dca-protocol,
self-custody, exit-architecture, p2p-remittance, african-sovereignty,
affiliate-engine, activation-sequence, community-protocol,
macro-masterplan, technical-analysis, risk-management, money-management

Use generateStaticParams() to pre-render all 15 at build time.

**Top bar (orange background strip):**
"Free Preview · Module [N]: [Title] · Enroll to unlock all [X] lessons →"
Links to /pricing

**Hero:**
Module number (large faded serif, e.g. "01") left column
Module title + description right column
"Preview" overline in accent

**Content block (2-col):**
Left:
- Stat (large orange number/text)
- Caption below stat
- 3 key points (bulleted)

Right:
- Takeaway quote (blockquote, serif italic 24px, orange left border)

**Full lesson list:**
First lesson: ▶ "Preview available" label (orange)
All others: 🔒 "Enrolled students only" (gray, strikethrough optional)

**CTA banner — black:**
Sovereign Stack modules (M12–M15): "Claim The Sovereign Stack · $997 →" → /pricing
Blueprint modules (M01–M11): "Get The Blueprint · From $97 →" → /pricing

**PREVIEW CONTENT — all 15 modules:**

slug: fiat-trap | Module 01 | 6 lessons
Hook: "In 1960, ₦1 bought $2.80. In 2025, ₦1 buys $0.00063. That's not volatility. That's design."
Stat: "₦1,580" | Caption: "What it costs in 2025 to buy what ₦410 bought in 2022"
Key points:
- What fiat currency actually is and why it depreciates by design
- How central banks use inflation as a hidden tax on savers
- Why the naira, cedi, and shilling are structurally programmed to lose value
Takeaway: "Your savings account is not protecting your money. It is slowly transferring it to the government."

slug: bitcoin-fundamentals | Module 02 | 8 lessons
Hook: "There will only ever be 21 million Bitcoin. Not one more. No committee. No vote. No override. That's new in human history."
Stat: "21,000,000" | Caption: "The hard cap. Enforced by mathematics, not policy."
Key points:
- The technical reason Bitcoin's supply cannot be inflated
- Why decentralisation makes Bitcoin impossible to shut down
- How Bitcoin compares to gold as a store of value
Takeaway: "Bitcoin is the first asset in history with a mathematically enforced, absolutely fixed supply. Everything else is a promise."

slug: four-year-clock | Module 03 | 7 lessons
Hook: "Bitcoin has followed a 4-year halving cycle with near-perfect consistency across three complete cycles. The clock is ticking right now."
Stat: "3 for 3" | Caption: "Complete cycles where Bitcoin hit a new all-time high within 18 months of the halving"
Key points:
- What the Bitcoin halving is and why it creates price cycles
- How to identify which phase of the cycle you're in right now
- The pre-halving accumulation window and why it closes fast
Takeaway: "The cycle doesn't repeat because of speculation. It repeats because of supply mechanics. That makes it predictable — if you know where to look."

slug: dca-protocol | Module 04 | 6 lessons
Hook: "Dollar-cost averaging removes the single biggest obstacle to building wealth in Bitcoin: you."
Stat: "21 days" | Caption: "Time to complete your full DCA setup, automated and running"
Key points:
- Why DCA outperforms timing the market for most investors
- How to calculate your optimal weekly stack amount
- Setting up automation so your DCA runs without you
Takeaway: "The best investment strategy is the one you can execute without second-guessing every week. DCA is that strategy."

slug: self-custody | Module 05 | 9 lessons
Hook: "FTX had $8 billion in customer funds. Then it didn't. The lesson: not your keys, not your Bitcoin."
Stat: "$8B" | Caption: "Customer funds lost in the FTX collapse — all held on a centralised exchange"
Key points:
- Why keeping Bitcoin on an exchange is not ownership
- The hardware wallet setup process from unboxing to first transfer
- How to store your seed phrase so it survives any disaster
Takeaway: "Self-custody is not paranoia. It is the difference between owning Bitcoin and having a receipt that says you own Bitcoin."

slug: exit-architecture | Module 06 | 7 lessons
Hook: "Most Bitcoin investors survived 2017 and 2021. Most gave back 80% of their gains because they had no exit plan."
Stat: "93%" | Caption: "Bitcoin investors with no documented exit strategy going into the 2021 cycle peak"
Key points:
- The cycle peak indicators that signal it's time to sell
- How to build a profit-taking ladder that captures gains without timing the exact top
- The reaccumulation plan for the next cycle dip
Takeaway: "The question is never whether to take profit. The question is whether you have a plan before the peak — or after."

slug: p2p-remittance | Module 07 | 6 lessons
Hook: "Sending $200 to Lagos from London costs $14–28 in fees. Bitcoin sends it in 10 minutes for $0.50."
Stat: "7–14%" | Caption: "The fee your family pays every time you send money home through a traditional service"
Key points:
- How to buy and sell Bitcoin peer-to-peer without a bank account
- The full remittance workflow from GBP/USD to NGN/GHS in 10 minutes
- Rate optimisation: when to send for the best spread
Takeaway: "The remittance industry charges African families $50 billion per year in fees. Bitcoin makes that optional."

slug: african-sovereignty | Module 08 | 5 lessons
Hook: "Fourteen African countries still use a currency controlled by the French treasury. That is not independence. That is a financial colony."
Stat: "14" | Caption: "CFA franc nations whose monetary policy is still set in Paris, not Africa"
Key points:
- Why the CFA franc is a structural trap for West African economies
- How the Naira crisis was manufactured by central bank policy, not market forces
- Why Bitcoin is not optional for Africans — it is structural
Takeaway: "African monetary sovereignty cannot be achieved with a currency designed in Europe. Bitcoin is the first money that belongs to no government."

slug: affiliate-engine | Module 09 | 4 lessons
Hook: "Four people you refer to The Blueprint pay for your course. Every referral after that is profit. Forever."
Stat: "4" | Caption: "Referrals needed at any tier to make your course investment net zero"
Key points:
- How the 30% lifetime commission structure works
- Setting up your partner dashboard and tracking links
- The three content formats that convert best for Bitcoin education
Takeaway: "Most courses teach you to make money someday. The Blueprint starts paying you back on referral number four."

slug: activation-sequence | Module 10 | 3 lessons
Hook: "Most people who buy a course don't finish it. The 21-Day Activation Sequence is designed so that finishing is the default, not the exception."
Stat: "21" | Caption: "Days to go from enrollment to fully operational Bitcoin protocol — one action per day"
Key points:
- How the sequence is structured to remove decision fatigue
- Why one action per day beats marathon sessions every time
- What 'fully operational' means by Day 21
Takeaway: "You don't need motivation. You need a protocol. The sequence is the protocol."

slug: community-protocol | Module 11 | 2 lessons
Hook: "The students who complete the protocol fastest are the ones with accountability partners. This module creates yours."
Stat: "3x" | Caption: "Faster protocol completion rate for students with an accountability partner vs solo"
Key points:
- How the Moneyverse cohort structure works
- The 30-day accountability challenge and how to run it
- Using the community to generate your first referral sales
Takeaway: "Isolation is the enemy of execution. The protocol works faster when someone is watching."

slug: macro-masterplan | Module 12 | 8 lessons | SOVEREIGN STACK
Hook: "Bitcoin doesn't move in a vacuum. It moves when the dollar weakens, when the Fed pivots, when M2 expands. Learning to read that is an edge."
Stat: "100%" | Caption: "Correlation between M2 money supply expansion and Bitcoin bull markets in the last three cycles"
Key points:
- How to read the Dollar Index (DXY) as a Bitcoin signal
- What Fed rate decisions mean for Bitcoin price 6–12 months out
- Building a macro dashboard that tells you when conditions are right
Takeaway: "Macro analysis doesn't predict the exact price. It tells you whether the conditions for a bull run are in place. That's enough."

slug: technical-analysis | Module 13 | 10 lessons | SOVEREIGN STACK
Hook: "The same chart patterns appear every cycle. Not because the market is predictable — because human psychology is."
Stat: "3" | Caption: "Chart patterns that have preceded every major Bitcoin rally in the last decade, without exception"
Key points:
- How to identify support and resistance levels before price reaches them
- Reading RSI without getting faked out by false signals
- The pre-breakout setups that repeat every cycle
Takeaway: "Technical analysis won't tell you when. It tells you what the market is pricing in right now. Combined with macro timing, it's an edge."

slug: risk-management | Module 14 | 7 lessons | SOVEREIGN STACK
Hook: "You can be right about the direction and still lose money if you are wrong about the size of your position."
Stat: "2%" | Caption: "Maximum recommended portfolio risk per trade for sustainable long-term compounding"
Key points:
- How to size positions so a single loss never ends your compounding
- The drawdown protocol: what to do when you are down 40%
- Portfolio allocation across the cycle phases
Takeaway: "The investors who survive every cycle are not the ones who called the top. They are the ones who stayed solvent long enough to be right."

slug: money-management | Module 15 | 6 lessons | SOVEREIGN STACK
Hook: "One Bitcoin bull run, managed correctly, can set your financial trajectory for the next 20 years. Most people give it back."
Stat: "4x" | Caption: "Average return difference between investors who followed a multi-cycle compounding plan vs those who didn't"
Key points:
- How to build the 3-bucket framework across a full cycle
- The reinvestment protocol that compounds gains without overexposure
- Your 10-year financial architecture using Bitcoin as the foundation
Takeaway: "Wealth is not built in one cycle. It is compounded across cycles. The money management strategy is what makes that possible."

---

## PAGE 7: SUCCESS ( /success )

Black background, white text, centered vertically.

Large orange checkmark: ✓ (serif 900, 120px)
H1: "You're in."
Sub: "Check your email — your login credentials and next steps are waiting.
If you don't see it within 5 minutes, check your spam folder."
Mono note: "Welcome to The Blueprint. · support@moneyverse.network"
Button: "Go to your dashboard →" → /dashboard (orange)

---

## PAGE 8: CANCEL ( /cancel )

White background, centered.

H1: "No pressure."
Sub: "Your spot is still available. If you have questions before you decide,
email us at support@moneyverse.network — we respond within 24 hours."
Two buttons:
- "Return to Pricing →" (orange) → /pricing
- "Talk to us →" (bordered) → mailto:support@moneyverse.network

---

## MOBILE REQUIREMENTS

Breakpoint: max-width 768px

- All multi-col grids collapse to 1-col
- Left borders become top borders (1px solid var(--n200))
- Section padding: 60px top/bottom, 20px left/right
- Display headings: minimum 3rem, scale with vw using clamp()
- Header: hide nav links, show hamburger button
- Footer: 2-col grid, first col spans full width
- Tier comparison grid: 1-col, each tier full width, stacked
- Calculator inputs: 1-col
- Calculator results: 1-col
- FAQ Q&A rows: 1-col (question above answer, separated by thin border)
- Partner calculator inputs: 1-col
- Partner calc results: 1-col
- Testimonials: 1-col stacked
- Preview page: 1-col

---

## IMPLEMENTATION NOTES

1. Pages in /app/(marketing)/[page]/page.tsx (App Router)
2. "use client" only for: calculator, partner calculator, tier checkout flow,
   curriculum accordion
3. Server components for: FAQ, success, cancel, preview, homepage, pricing
   hero/curriculum sections
4. generateStaticParams() for /preview/[slug] with all 15 slugs
5. Ref tracking: read ?ref= query param OR mv_ref cookie → pass as linkSlug
   to /api/checkout
6. All nav links must go to real pages — no # placeholders
7. TypeScript strict mode — zero errors, no `any` types
8. Zero external UI dependencies — no Shadcn, no Radix, no MUI
9. Smooth scroll to checkout panel when tier is selected (scrollIntoView)
10. On load, pre-select Tier 2 (Blueprint + Live) as default
