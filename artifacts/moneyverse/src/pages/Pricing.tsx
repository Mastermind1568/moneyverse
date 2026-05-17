import { useState, useRef } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";

const MODULES = [
  { num: "01", title: "The Fiat Trap", lessons: 6, duration: "38 min", desc: "Every fiat currency in history has failed. Understand the mechanism extracting value from your savings right now.", lessons_list: ["The History of Money", "What Fiat Currency Actually Is", "How Inflation Works as a Tax", "The Naira Case Study: 2020–2025", "Currency Devaluation vs. Hyperinflation", "Your Savings Account Is Not Safe"], sovereign: false },
  { num: "02", title: "Bitcoin Fundamentals", lessons: 8, duration: "54 min", desc: "21 million coins. No central bank. No inflation. Learn the protocol that makes Bitcoin categorically different from every other asset.", lessons_list: ["What Bitcoin Actually Is", "The 21 Million Hard Cap", "Mining and Difficulty Adjustment", "Why No One Controls Bitcoin", "Bitcoin vs Gold: The Store of Value Comparison", "The Node Network", "How Transactions Work", "Why Bitcoin Cannot Be Shut Down"], sovereign: false },
  { num: "03", title: "The 4-Year Clock", lessons: 7, duration: "48 min", desc: "The halving cycle is the most predictable pattern in financial markets. Learn to read it, position before it moves, and exit before it reverses.", lessons_list: ["What the Halving Is", "The 4 Phases of Every Cycle", "Historical Cycle Analysis: 2013 · 2017 · 2021", "Where We Are Right Now", "The Pre-Halving Accumulation Window", "Post-Halving Price Action", "Reading the Clock for 2025–2028"], sovereign: false },
  { num: "04", title: "DCA Protocol", lessons: 6, duration: "42 min", desc: "Systematic weekly accumulation removes emotion from the equation. This module sets up your DCA to run automatically — forever.", lessons_list: ["Why DCA Beats Lump Sum (Almost Always)", "Setting Your Weekly Stack Amount", "Which Exchange or P2P to Use", "Automating Your DCA Schedule", "Tracking Your Cost Basis", "The 21-Day Activation Sequence: Days 1–7"], sovereign: false },
  { num: "05", title: "Self-Custody Masterclass", lessons: 9, duration: "1h 12m", desc: "Your Bitcoin on an exchange is not your Bitcoin. This module walks you through hardware wallet setup, seed phrase security, and cold storage protocol.", lessons_list: ["Why Self-Custody Is Non-Negotiable", "Hardware Wallet Options Compared", "Unboxing and Initial Setup", "Generating Your Seed Phrase", "Seed Phrase Storage Protocol", "Transferring From Exchange to Cold Wallet", "Verifying Your Backup", "What To Do If You Lose Your Device", "Multi-Sig for Advanced Users"], sovereign: false },
  { num: "06", title: "Exit Architecture", lessons: 7, duration: "52 min", desc: "93% of Bitcoin investors have no exit plan. This module gives you exact price targets, profit-taking schedule, and the reaccumulation plan for the next cycle.", lessons_list: ["Why Most Investors Give Back Their Gains", "Cycle Peak Indicators", "The Profit-Taking Ladder", "Tax-Efficient Exit Strategies", "When to Stop Buying", "The Reaccumulation Window", "Your Personal Exit Plan Template"], sovereign: false },
  { num: "07", title: "P2P Trading & Remittance", lessons: 6, duration: "44 min", desc: "Skip the bank. Send money across borders in 10 minutes for $0.50. Covers P2P platforms, rate optimisation, and the full remittance workflow.", lessons_list: ["P2P Platform Overview", "How to Buy Bitcoin P2P Without a Bank", "Sending Remittances via Bitcoin", "Avoiding Scams and Bad Actors", "Rate Optimisation: When to Send", "The Family Remittance Setup"], sovereign: false, bonus: true },
  { num: "08", title: "African Monetary Sovereignty", lessons: 5, duration: "36 min", desc: "The context that makes the whole thesis unavoidable. Why Bitcoin is not optional for Africans — it is structural.", lessons_list: ["The Colonial Roots of African Currency", "Why the CFA Franc Is a Trap", "Nigeria's CBN and the Naira Crisis", "Ghana's IMF Bailout Explained", "Bitcoin as African Monetary Sovereignty"], sovereign: false, bonus: true },
  { num: "09", title: "The Affiliate Engine", lessons: 4, duration: "28 min", desc: "30% commission on every sale you refer, forever. This module sets up your affiliate infrastructure and gives you the framework to promote effectively.", lessons_list: ["How the Affiliate Programme Works", "Setting Up Your Partner Dashboard", "Your First 5 Referrals", "Scaling Beyond $1,000/Month in Commissions"], sovereign: false },
  { num: "10", title: "The 21-Day Activation Sequence", lessons: 3, duration: "22 min", desc: "One action per day for 21 days. By the end, your DCA is running, your Bitcoin is in self-custody, and your affiliate link is live.", lessons_list: ["Days 1–7: Foundation Protocol", "Days 8–14: Custody and Security", "Days 15–21: Launch and Monetise"], sovereign: false },
  { num: "11", title: "The Community Protocol", lessons: 2, duration: "17 min", desc: "How to use the Moneyverse community to accelerate your results — accountability partners, cohort challenges, and group milestones.", lessons_list: ["How the Community Is Structured", "The 30-Day Accountability Protocol"], sovereign: false },
  { num: "12", title: "Macro Masterplan", lessons: 8, duration: "1h 18m", desc: "Read the macro environment before it moves. DXY, Fed cycles, M2 money supply, and global liquidity — the inputs that drive Bitcoin's price before the chart shows it.", lessons_list: ["What Macro Analysis Is and Why It Matters", "The Dollar Index (DXY) Explained", "How the Fed Rate Cycle Affects Bitcoin", "M2 Money Supply and Global Liquidity", "Reading the Risk-On / Risk-Off Cycle", "Identifying the Start of a Bull Run Before It Happens", "The Macro Checklist: Pre-Entry Conditions", "Building Your Macro Dashboard"], sovereign: true },
  { num: "13", title: "Technical Analysis Masterclass", lessons: 10, duration: "1h 32m", desc: "Support zones, resistance levels, RSI, moving averages. Read the chart before the move happens and execute with precision.", lessons_list: ["Why Technical Analysis Works for Bitcoin", "Support and Resistance: The Foundation", "Reading Candlestick Patterns", "RSI: How to Use It Without Getting Faked Out", "Moving Averages: 50, 100, 200 Day", "Volume Analysis", "Identifying Breakouts Before They Happen", "The Chart Setups That Repeat Every Cycle", "Position Sizing Based on Chart Signals", "Building Your Pre-Trade Checklist"], sovereign: true },
  { num: "14", title: "Risk Management Framework", lessons: 7, duration: "58 min", desc: "Position sizing, portfolio allocation, and drawdown protocols. The system that keeps you in the game through every correction.", lessons_list: ["Why Risk Management Is the Only Edge That Compounds", "Position Sizing Formulas", "Portfolio Allocation Across the Cycle", "The Drawdown Protocol", "Stop-Loss Strategy for Bitcoin Investors", "Mental Stops vs. Hard Stops", "The Recovery Playbook After a Major Correction"], sovereign: true },
  { num: "15", title: "Money Management Strategy", lessons: 6, duration: "48 min", desc: "The compounding playbook across multiple 4-year cycles. How to turn one bull run into a permanent financial advantage.", lessons_list: ["The Multi-Cycle Compounding Model", "How to Reinvest Profits Without Giving Them Back", "Building an Emergency Reserve in Hard Currency", "The 3-Bucket Framework: Spend · Save · Stack", "Tax Planning for Bitcoin Profits in African Markets", "Your 10-Year Financial Architecture"], sovereign: true },
];

const TIERS = [
  {
    id: 1, name: "Blueprint", price: 97, commission: 29.10,
    tagline: "You are losing money every month you don't have this. $97 stops the leak.",
    cta: "Get The Blueprint →",
    includes: ["11-module masterclass — 85 lessons, 11h 43m of execution-ready content", "4-Year Clock Framework — know exactly where you are in the cycle", "Self-Custody Protocol Kit — your Bitcoin, your keys, no exchange risk", "21-Day Activation Sequence — one action per day until the protocol is live", "Affiliate Engine — 30% commission on every sale you refer, forever", "Partner Dashboard — real-time clicks, conversions, and earnings", "Lifetime updates — every new cycle, every new lesson. No extra cost."],
    excludes: ["Monthly live tutorial sessions", "WhatsApp activation class", "Macro Masterplan courses", "Investor timing protocol", "Arbitrage playbook", "1:1 private setup calls"],
  },
  {
    id: 2, name: "Blueprint + Live", price: 197, commission: 59.10, popular: true,
    tagline: "The protocol, delivered live. We walk you through every step until it's working.",
    cta: "Start The Protocol →",
    includes: ["Everything in Blueprint", "Monthly live tutorial sessions — group walkthroughs, filmed, replays kept", "5-Day WhatsApp activation class — Tier 2 and 3 only", "14-Day Story Launch Sequence — done-for-you scripts for IG, X, YouTube Shorts", "Monetisation Gameplan — AI-written, 6-part playbook for your specific audience"],
    excludes: ["Macro Masterplan courses", "Investor timing protocol", "Arbitrage playbook", "1:1 private setup calls"],
  },
  {
    id: 3, name: "Sovereign Stack", price: 997, commission: 299.10,
    tagline: "Not a course. A complete operating system for building and protecting wealth through Bitcoin — from reading the macro environment, to executing precise trades, to moving money across borders without a bank. Everything.",
    cta: "Claim The Sovereign Stack →",
    includes: ["Everything in Blueprint + Live", "Macro Masterplan — DXY, Fed cycles, M2 supply.", "Investor Protocol — exact cycle entry zones, profit-taking schedule, and exit targets.", "Technical Analysis Masterclass — support zones, resistance levels, RSI, moving averages.", "Risk Management Framework — position sizing, portfolio allocation, and drawdown protocols.", "Money Management Strategy — the compounding playbook across multiple 4-year cycles.", "Arbitrage Playbook — 2–4% spreads between markets exist right now.", "Cross-Border Payments — pay tuition, family support, supplier invoices. No bank. No fees.", "3 × Private 1:1 Calls — we stay on screen until your full stack is live."],
    excludes: [],
  },
];

function CurriculumAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      {MODULES.map((m, idx) => (
        <div key={m.num} style={{ borderBottom: "1px solid var(--mv-n200)", background: m.sovereign ? "var(--mv-black)" : "#fff" }}>
          <button
            onClick={() => setOpen(open === idx ? null : idx)}
            style={{ width: "100%", display: "flex", alignItems: "center", padding: "24px 0", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" as const, gap: 24 }}
          >
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 40, color: m.sovereign ? "#333" : "var(--mv-n200)", lineHeight: 1, minWidth: 64 }}>{m.num}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" as const }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 20, color: m.sovereign ? "#fff" : "var(--mv-black)" }}>{m.title}</span>
                {m.bonus && <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-accent)", border: "1px solid var(--mv-accent)", padding: "2px 8px", letterSpacing: "0.1em" }}>★ BONUS</span>}
                {m.sovereign && <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "#000", background: "var(--mv-accent)", padding: "2px 8px", letterSpacing: "0.1em" }}>★ SOVEREIGN STACK</span>}
              </div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: m.sovereign ? "#666" : "var(--mv-n400)", marginTop: 4 }}>{m.lessons} lessons · {m.duration}</div>
            </div>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 20, color: "var(--mv-accent)", transition: "transform 0.2s", transform: open === idx ? "rotate(45deg)" : "none", marginRight: 8 }}>+</span>
          </button>
          {open === idx && (
            <div style={{ padding: "0 0 28px 88px" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: m.sovereign ? "var(--mv-n400)" : "var(--mv-n600)", lineHeight: 1.7, maxWidth: 640, marginBottom: 20 }}>{m.desc}</p>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
                {m.lessons_list.map((lesson, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {i === 0
                      ? <span style={{ color: "var(--mv-accent)", fontSize: 12 }}>▶</span>
                      : <span style={{ fontSize: 12 }}>🔒</span>
                    }
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: i === 0 ? "var(--mv-accent)" : (m.sovereign ? "#555" : "var(--mv-n600)") }}>{lesson}</span>
                    {i === 0 && <Link href={`/preview/${slugMap[m.num]}`}><span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-accent)", letterSpacing: "0.1em", marginLeft: 8 }}>PREVIEW</span></Link>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const slugMap: Record<string, string> = {
  "01": "fiat-trap", "02": "bitcoin-fundamentals", "03": "four-year-clock", "04": "dca-protocol",
  "05": "self-custody", "06": "exit-architecture", "07": "p2p-remittance", "08": "african-sovereignty",
  "09": "affiliate-engine", "10": "activation-sequence", "11": "community-protocol",
  "12": "macro-masterplan", "13": "technical-analysis", "14": "risk-management", "15": "money-management",
};

function CheckoutPanel({ tier }: { tier: typeof TIERS[0] }) {
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState<"card" | "bitcoin" | "ngn">("card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    if (!email) { setError("Please enter your email."); return; }
    setError(""); setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: `tier_${tier.id}`,
          customerEmail: email,
          paymentMethod: method === "card" ? undefined : method === "ngn" ? "paystack" : "bitcoin",
          tier: tier.id,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/cancel`,
        }),
      });
      const data = await res.json();
      if (data.url) { window.location.href = data.url; }
      else { setError(data.error || "Something went wrong. Please try again."); }
    } catch {
      setError("Network error. Please try again.");
    } finally { setLoading(false); }
  }

  return (
    <div style={{ maxWidth: 560, border: "2px solid var(--mv-black)", marginTop: 40 }}>
      <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--mv-n200)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" as const }}>Total · One-time</span>
        <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 40, color: "var(--mv-accent)" }}>${tier.price}</span>
      </div>
      <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--mv-n200)", display: "flex", gap: 8 }}>
        {(["card", "bitcoin", "ngn"] as const).map((m) => (
          <button key={m} onClick={() => setMethod(m)} style={{
            flex: 1, padding: "10px 8px", fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.1em",
            textTransform: "uppercase" as const, cursor: "pointer",
            background: method === m ? "var(--mv-black)" : "transparent",
            color: method === m ? "#fff" : "var(--mv-n600)",
            border: `2px solid ${method === m ? "var(--mv-black)" : "var(--mv-n200)"}`,
          }}>
            {m === "card" ? "Card · Stripe" : m === "bitcoin" ? "Bitcoin · BTCPay" : "NGN · Paystack"}
          </button>
        ))}
      </div>
      <div style={{ padding: "20px 24px" }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          style={{
            width: "100%", fontFamily: "'Space Mono', monospace", fontSize: 12, padding: "12px 16px",
            background: "var(--mv-n50)", border: "1px solid var(--mv-n200)", outline: "none", marginBottom: 12,
          }}
        />
        {error && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "var(--mv-red)", marginBottom: 12 }}>{error}</p>}
        <button onClick={handleCheckout} disabled={loading} className="btn orange full" style={{ fontSize: 11, padding: "18px 24px", justifyContent: "center", opacity: loading ? 0.7 : 1 }}>
          {loading ? "Redirecting…" : method === "bitcoin" ? `Pay with Bitcoin → ${tier.cta}` : tier.cta}
        </button>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n600)", letterSpacing: "0.1em" }}>30-day conditional refund</span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-accent)", letterSpacing: "0.1em" }}>● SECURE</span>
        </div>
      </div>
    </div>
  );
}

export default function Pricing() {
  const [selectedTier, setSelectedTier] = useState(1);
  const checkoutRef = useRef<HTMLDivElement>(null);

  function selectTier(id: number) {
    setSelectedTier(id);
    setTimeout(() => checkoutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  const activeTier = TIERS.find((t) => t.id === selectedTier) || TIERS[1];

  return (
    <Layout>
      {/* ── Hero ── */}
      <section style={{ background: "var(--mv-black)", padding: "100px 64px", borderBottom: "2px solid #222", position: "relative" as const }} className="section-pad-responsive">
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "start" }} className="pricing-hero-grid">
          <div>
            <p className="overline" style={{ color: "var(--mv-n600)", marginBottom: 20 }}>The Moneyverse Masterclass · 2026 Edition</p>
            <h1 className="display" style={{ fontSize: "clamp(4rem, 12vw, 14rem)", color: "#fff", marginBottom: 32 }}>
              The <em style={{ color: "var(--mv-accent)" }}>Blue</em>print<span style={{ color: "var(--mv-accent)" }}>.</span>
            </h1>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(16px, 2vw, 22px)", color: "var(--mv-n400)", maxWidth: 680, lineHeight: 1.6 }}>
              The naira fell 74%. The cedi needed an IMF bailout. Your bank charged you 6% to send money home. Most Bitcoin investors have no exit plan, no risk framework, and no idea what the chart is telling them.{" "}
              <span style={{ color: "var(--mv-accent)" }}>This is the system that fixes all of it.</span>
            </p>
          </div>
          <div style={{ textAlign: "right" as const }}>
            <p className="overline" style={{ color: "var(--mv-n600)", marginBottom: 8 }}>Starting from</p>
            <div className="display" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", color: "var(--mv-accent)" }}>$97</div>
            <p className="mono" style={{ fontSize: 10, color: "var(--mv-n600)", marginTop: 8, letterSpacing: "0.12em" }}>ONCE. YOURS FOREVER.</p>
          </div>
        </div>
      </section>

      {/* ── Vitals Bar ── */}
      <section style={{ borderBottom: "2px solid var(--mv-black)", background: "#fff" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)" }} className="stats-grid">
          {[
            { num: "11", label: "Modules" },
            { num: "85", label: "Lessons" },
            { num: "11h 43m", label: "Runtime" },
            { num: "Lifetime", label: "Access" },
            { num: "30 Days", label: "Guarantee", orange: true },
          ].map((s, i) => (
            <div key={i} style={{ padding: "28px 20px", borderRight: i < 4 ? "1px solid var(--mv-n200)" : "none", textAlign: "center" as const }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 26, color: s.orange ? "var(--mv-accent)" : "var(--mv-black)" }}>{s.num}</div>
              <div className="overline" style={{ marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Curriculum ── */}
      <section style={{ background: "#fff", padding: "100px 64px", borderBottom: "2px solid var(--mv-black)" }} className="section-pad-responsive">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap" as const, gap: 24, marginBottom: 48 }}>
          <div>
            <span className="accent-rule lg" style={{ marginBottom: 20 }} />
            <h2 className="h-section" style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}>The Curriculum.</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "var(--mv-n600)", lineHeight: 1.7, maxWidth: 600, marginTop: 16 }}>
              Fifteen modules, sequenced for operators. Each chapter compounds on the last — from understanding what fiat extracts from you, to the African monetary sovereignty context that makes the whole thesis unavoidable.
            </p>
          </div>
          <p className="mono" style={{ fontSize: 10, color: "var(--mv-n400)", letterSpacing: "0.1em" }}>Approx 11h 43min · 85 lessons · + 12 worksheets</p>
        </div>
        <div style={{ borderTop: "2px solid var(--mv-black)" }}>
          <CurriculumAccordion />
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ background: "var(--mv-n50)", padding: "100px 64px", borderBottom: "2px solid var(--mv-black)" }} className="section-pad-responsive">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: "2px solid var(--mv-black)" }} className="three-col-grid">
          {[
            { quote: "The clearest articulation of cycle theory I've ever paid for.", name: "B. Ofori", role: "Personal Finance · 84K" },
            { quote: "Eleven modules. Zero hype. Read the curriculum and you understand what's missing everywhere else.", name: "A. Hartmann", role: "Macro Strategy · 38K" },
            { quote: "Bought it for the affiliate program. Stayed for the Exit Plan module.", name: "K. Patel", role: "Real Estate · 121K" },
          ].map((t, i) => (
            <div key={i} style={{ padding: "48px 36px", borderRight: i < 2 ? "1px solid var(--mv-n200)" : "none", background: "#fff" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 17, lineHeight: 1.7, marginBottom: 28 }}>"{t.quote}"</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13 }}>— {t.name}</p>
              <p className="overline" style={{ marginTop: 6 }}>{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tier Selection ── */}
      <section style={{ background: "#fff", padding: "100px 64px", borderBottom: "2px solid var(--mv-black)" }} className="section-pad-responsive">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap" as const, gap: 24, marginBottom: 16 }}>
          <div>
            <span className="accent-rule" style={{ marginBottom: 20 }} />
            <h2 className="h-section" style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}>Pick your level.</h2>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 22, color: "var(--mv-accent)", marginTop: 8 }}>Pay once. Own it forever.</p>
          </div>
          <div style={{ textAlign: "right" as const }}>
            <p className="overline" style={{ marginBottom: 8 }}>Pay in</p>
            <p className="mono" style={{ fontSize: 10, color: "var(--mv-n600)" }}>USD · NGN · BTC · USDT</p>
            <p className="mono" style={{ fontSize: 9, color: "var(--mv-n400)", marginTop: 4 }}>NGN · GHS · KES via Paystack / USD · GBP · CAD via Stripe</p>
          </div>
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "var(--mv-n600)", lineHeight: 1.7, maxWidth: 760, marginBottom: 48 }}>
          Every tier includes the complete 11-module Blueprint. What separates them is how far you want to go — from stopping the currency leak, to running money across borders like a professional operator. One payment. No subscription. No upsell.
        </p>

        {/* Tier grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: "2px solid var(--mv-black)", gap: 0 }} className="three-col-grid">
          {TIERS.map((tier, i) => {
            const active = selectedTier === tier.id;
            return (
              <div
                key={tier.id}
                onClick={() => selectTier(tier.id)}
                style={{
                  padding: "40px 32px", cursor: "pointer",
                  background: active ? "var(--mv-black)" : "#fff",
                  color: active ? "#fff" : "var(--mv-black)",
                  borderRight: i < 2 ? "1px solid var(--mv-n200)" : "none",
                  transition: "background 0.2s, color 0.2s",
                  position: "relative" as const,
                }}
              >
                {tier.popular && (
                  <div style={{ position: "absolute" as const, top: 16, right: 16, fontFamily: "'Space Mono', monospace", fontSize: 8, background: "var(--mv-accent)", color: "#000", padding: "3px 10px", letterSpacing: "0.12em" }}>
                    ★ MOST POPULAR
                  </div>
                )}
                {tier.id === 3 && (
                  <div style={{ position: "absolute" as const, top: 16, right: 16, fontFamily: "'Space Mono', monospace", fontSize: 8, background: "#333", color: "var(--mv-accent)", padding: "3px 10px", letterSpacing: "0.12em" }}>
                    THE OPERATOR'S SYSTEM
                  </div>
                )}
                <p className="overline" style={{ color: active ? "var(--mv-n600)" : "var(--mv-n400)", marginBottom: 12 }}>Tier {tier.id}</p>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: tier.id === 3 ? 48 : 40, color: "var(--mv-accent)", lineHeight: 1, marginBottom: 4 }}>
                  ${tier.price}
                </div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 20, marginBottom: 16, color: active ? "#fff" : "var(--mv-black)" }}>{tier.name}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: active ? "var(--mv-n400)" : "var(--mv-n600)", lineHeight: 1.6, marginBottom: 24 }}>{tier.tagline}</p>
                <p className="mono" style={{ fontSize: 9, color: "var(--mv-accent)", letterSpacing: "0.1em", marginBottom: 24 }}>
                  ${tier.commission.toFixed(2)}/sale · 4 referrals = your investment back.
                </p>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
                  {tier.includes.map((item, idx) => (
                    <div key={idx} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: "var(--mv-accent)", fontSize: 13, flexShrink: 0, marginTop: 1 }}>✓</span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: active ? "var(--mv-n400)" : "var(--mv-n600)", lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                  {tier.excludes.map((item, idx) => (
                    <div key={idx} style={{ display: "flex", gap: 10, alignItems: "flex-start", opacity: 0.4 }}>
                      <span style={{ color: "var(--mv-n600)", fontSize: 13, flexShrink: 0 }}>–</span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "var(--mv-n600)", lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 32 }}>
                  <span className="btn orange" style={{ fontSize: 10, padding: "10px 20px" }}>{tier.cta}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Checkout panel */}
        <div ref={checkoutRef} style={{ marginTop: 64 }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, marginBottom: 8 }}>
            Enrolling in: <strong>{activeTier.name}</strong>{" "}
            <span style={{ color: "var(--mv-accent)", fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 24 }}>${activeTier.price}</span>
          </p>
          <CheckoutPanel tier={activeTier} />
          <p className="mono" style={{ fontSize: 9, color: "var(--mv-n400)", maxWidth: 560, lineHeight: 1.8, marginTop: 20, letterSpacing: "0.06em" }}>
            30-day conditional guarantee — follow the 21-day activation sequence as designed: one protocol per day, executed. If you do the work and your financial position hasn't fundamentally shifted, one email gets you every cent back. No forms. No questions. We are that confident in the protocol.
          </p>
        </div>
      </section>

      <style>{`
        .pricing-hero-grid { grid-template-columns: 1fr auto; }
        .stats-grid { grid-template-columns: repeat(5, 1fr); }
        .three-col-grid { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 900px) {
          .pricing-hero-grid { grid-template-columns: 1fr !important; }
          .three-col-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        .section-pad-responsive { padding: 100px 64px; }
        @media (max-width: 768px) {
          .section-pad-responsive { padding: 60px 20px !important; }
        }
      `}</style>
    </Layout>
  );
}
