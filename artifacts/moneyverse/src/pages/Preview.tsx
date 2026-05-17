import { Link, useParams } from "wouter";
import Layout from "@/components/Layout";

interface ModuleData {
  num: string;
  title: string;
  lessons: number;
  hook: string;
  stat: string;
  caption: string;
  keyPoints: string[];
  takeaway: string;
  lessonsList: string[];
  sovereign?: boolean;
}

const MODULES: Record<string, ModuleData> = {
  "fiat-trap": { num: "01", title: "The Fiat Trap", lessons: 6, hook: "In 1960, ₦1 bought $2.80. In 2025, ₦1 buys $0.00063. That's not volatility. That's design.", stat: "₦1,580", caption: "What it costs in 2025 to buy what ₦410 bought in 2022", keyPoints: ["What fiat currency actually is and why it depreciates by design", "How central banks use inflation as a hidden tax on savers", "Why the naira, cedi, and shilling are structurally programmed to lose value"], takeaway: "Your savings account is not protecting your money. It is slowly transferring it to the government.", lessonsList: ["The History of Money", "What Fiat Currency Actually Is", "How Inflation Works as a Tax", "The Naira Case Study: 2020–2025", "Currency Devaluation vs. Hyperinflation", "Your Savings Account Is Not Safe"] },
  "bitcoin-fundamentals": { num: "02", title: "Bitcoin Fundamentals", lessons: 8, hook: "There will only ever be 21 million Bitcoin. Not one more. No committee. No vote. No override. That's new in human history.", stat: "21,000,000", caption: "The hard cap. Enforced by mathematics, not policy.", keyPoints: ["The technical reason Bitcoin's supply cannot be inflated", "Why decentralisation makes Bitcoin impossible to shut down", "How Bitcoin compares to gold as a store of value"], takeaway: "Bitcoin is the first asset in history with a mathematically enforced, absolutely fixed supply. Everything else is a promise.", lessonsList: ["What Bitcoin Actually Is", "The 21 Million Hard Cap", "Mining and Difficulty Adjustment", "Why No One Controls Bitcoin", "Bitcoin vs Gold: The Store of Value Comparison", "The Node Network", "How Transactions Work", "Why Bitcoin Cannot Be Shut Down"] },
  "four-year-clock": { num: "03", title: "The 4-Year Clock", lessons: 7, hook: "Bitcoin has followed a 4-year halving cycle with near-perfect consistency across three complete cycles. The clock is ticking right now.", stat: "3 for 3", caption: "Complete cycles where Bitcoin hit a new all-time high within 18 months of the halving", keyPoints: ["What the Bitcoin halving is and why it creates price cycles", "How to identify which phase of the cycle you're in right now", "The pre-halving accumulation window and why it closes fast"], takeaway: "The cycle doesn't repeat because of speculation. It repeats because of supply mechanics. That makes it predictable — if you know where to look.", lessonsList: ["What the Halving Is", "The 4 Phases of Every Cycle", "Historical Cycle Analysis: 2013 · 2017 · 2021", "Where We Are Right Now", "The Pre-Halving Accumulation Window", "Post-Halving Price Action", "Reading the Clock for 2025–2028"] },
  "dca-protocol": { num: "04", title: "DCA Protocol", lessons: 6, hook: "Dollar-cost averaging removes the single biggest obstacle to building wealth in Bitcoin: you.", stat: "21 days", caption: "Time to complete your full DCA setup, automated and running", keyPoints: ["Why DCA outperforms timing the market for most investors", "How to calculate your optimal weekly stack amount", "Setting up automation so your DCA runs without you"], takeaway: "The best investment strategy is the one you can execute without second-guessing every week. DCA is that strategy.", lessonsList: ["Why DCA Beats Lump Sum (Almost Always)", "Setting Your Weekly Stack Amount", "Which Exchange or P2P to Use", "Automating Your DCA Schedule", "Tracking Your Cost Basis", "The 21-Day Activation Sequence: Days 1–7"] },
  "self-custody": { num: "05", title: "Self-Custody Masterclass", lessons: 9, hook: "FTX had $8 billion in customer funds. Then it didn't. The lesson: not your keys, not your Bitcoin.", stat: "$8B", caption: "Customer funds lost in the FTX collapse — all held on a centralised exchange", keyPoints: ["Why keeping Bitcoin on an exchange is not ownership", "The hardware wallet setup process from unboxing to first transfer", "How to store your seed phrase so it survives any disaster"], takeaway: "Self-custody is not paranoia. It is the difference between owning Bitcoin and having a receipt that says you own Bitcoin.", lessonsList: ["Why Self-Custody Is Non-Negotiable", "Hardware Wallet Options Compared", "Unboxing and Initial Setup", "Generating Your Seed Phrase", "Seed Phrase Storage Protocol", "Transferring From Exchange to Cold Wallet", "Verifying Your Backup", "What To Do If You Lose Your Device", "Multi-Sig for Advanced Users"] },
  "exit-architecture": { num: "06", title: "Exit Architecture", lessons: 7, hook: "Most Bitcoin investors survived 2017 and 2021. Most gave back 80% of their gains because they had no exit plan.", stat: "93%", caption: "Bitcoin investors with no documented exit strategy going into the 2021 cycle peak", keyPoints: ["The cycle peak indicators that signal it's time to sell", "How to build a profit-taking ladder that captures gains without timing the exact top", "The reaccumulation plan for the next cycle dip"], takeaway: "The question is never whether to take profit. The question is whether you have a plan before the peak — or after.", lessonsList: ["Why Most Investors Give Back Their Gains", "Cycle Peak Indicators", "The Profit-Taking Ladder", "Tax-Efficient Exit Strategies", "When to Stop Buying", "The Reaccumulation Window", "Your Personal Exit Plan Template"] },
  "p2p-remittance": { num: "07", title: "P2P Trading & Remittance", lessons: 6, hook: "Sending $200 to Lagos from London costs $14–28 in fees. Bitcoin sends it in 10 minutes for $0.50.", stat: "7–14%", caption: "The fee your family pays every time you send money home through a traditional service", keyPoints: ["How to buy and sell Bitcoin peer-to-peer without a bank account", "The full remittance workflow from GBP/USD to NGN/GHS in 10 minutes", "Rate optimisation: when to send for the best spread"], takeaway: "The remittance industry charges African families $50 billion per year in fees. Bitcoin makes that optional.", lessonsList: ["P2P Platform Overview", "How to Buy Bitcoin P2P Without a Bank", "Sending Remittances via Bitcoin", "Avoiding Scams and Bad Actors", "Rate Optimisation: When to Send", "The Family Remittance Setup"] },
  "african-sovereignty": { num: "08", title: "African Monetary Sovereignty", lessons: 5, hook: "Fourteen African countries still use a currency controlled by the French treasury. That is not independence. That is a financial colony.", stat: "14", caption: "CFA franc nations whose monetary policy is still set in Paris, not Africa", keyPoints: ["Why the CFA franc is a structural trap for West African economies", "How the Naira crisis was manufactured by central bank policy, not market forces", "Why Bitcoin is not optional for Africans — it is structural"], takeaway: "African monetary sovereignty cannot be achieved with a currency designed in Europe. Bitcoin is the first money that belongs to no government.", lessonsList: ["The Colonial Roots of African Currency", "Why the CFA Franc Is a Trap", "Nigeria's CBN and the Naira Crisis", "Ghana's IMF Bailout Explained", "Bitcoin as African Monetary Sovereignty"] },
  "affiliate-engine": { num: "09", title: "The Affiliate Engine", lessons: 4, hook: "Four people you refer to The Blueprint pay for your course. Every referral after that is profit. Forever.", stat: "4", caption: "Referrals needed at any tier to make your course investment net zero", keyPoints: ["How the 30% lifetime commission structure works", "Setting up your partner dashboard and tracking links", "The three content formats that convert best for Bitcoin education"], takeaway: "Most courses teach you to make money someday. The Blueprint starts paying you back on referral number four.", lessonsList: ["How the Affiliate Programme Works", "Setting Up Your Partner Dashboard", "Your First 5 Referrals", "Scaling Beyond $1,000/Month in Commissions"] },
  "activation-sequence": { num: "10", title: "The 21-Day Activation Sequence", lessons: 3, hook: "Most people who buy a course don't finish it. The 21-Day Activation Sequence is designed so that finishing is the default, not the exception.", stat: "21", caption: "Days to go from enrollment to fully operational Bitcoin protocol — one action per day", keyPoints: ["How the sequence is structured to remove decision fatigue", "Why one action per day beats marathon sessions every time", "What 'fully operational' means by Day 21"], takeaway: "You don't need motivation. You need a protocol. The sequence is the protocol.", lessonsList: ["Days 1–7: Foundation Protocol", "Days 8–14: Custody and Security", "Days 15–21: Launch and Monetise"] },
  "community-protocol": { num: "11", title: "The Community Protocol", lessons: 2, hook: "The students who complete the protocol fastest are the ones with accountability partners. This module creates yours.", stat: "3x", caption: "Faster protocol completion rate for students with an accountability partner vs solo", keyPoints: ["How the Moneyverse cohort structure works", "The 30-day accountability challenge and how to run it", "Using the community to generate your first referral sales"], takeaway: "Isolation is the enemy of execution. The protocol works faster when someone is watching.", lessonsList: ["How the Community Is Structured", "The 30-Day Accountability Protocol"] },
  "macro-masterplan": { num: "12", title: "Macro Masterplan", lessons: 8, hook: "Bitcoin doesn't move in a vacuum. It moves when the dollar weakens, when the Fed pivots, when M2 expands. Learning to read that is an edge.", stat: "100%", caption: "Correlation between M2 money supply expansion and Bitcoin bull markets in the last three cycles", keyPoints: ["How to read the Dollar Index (DXY) as a Bitcoin signal", "What Fed rate decisions mean for Bitcoin price 6–12 months out", "Building a macro dashboard that tells you when conditions are right"], takeaway: "Macro analysis doesn't predict the exact price. It tells you whether the conditions for a bull run are in place. That's enough.", lessonsList: ["What Macro Analysis Is and Why It Matters", "The Dollar Index (DXY) Explained", "How the Fed Rate Cycle Affects Bitcoin", "M2 Money Supply and Global Liquidity", "Reading the Risk-On / Risk-Off Cycle", "Identifying the Start of a Bull Run Before It Happens", "The Macro Checklist: Pre-Entry Conditions", "Building Your Macro Dashboard"], sovereign: true },
  "technical-analysis": { num: "13", title: "Technical Analysis Masterclass", lessons: 10, hook: "The same chart patterns appear every cycle. Not because the market is predictable — because human psychology is.", stat: "3", caption: "Chart patterns that have preceded every major Bitcoin rally in the last decade, without exception", keyPoints: ["How to identify support and resistance levels before price reaches them", "Reading RSI without getting faked out by false signals", "The pre-breakout setups that repeat every cycle"], takeaway: "Technical analysis won't tell you when. It tells you what the market is pricing in right now. Combined with macro timing, it's an edge.", lessonsList: ["Why Technical Analysis Works for Bitcoin", "Support and Resistance: The Foundation", "Reading Candlestick Patterns", "RSI: How to Use It Without Getting Faked Out", "Moving Averages: 50, 100, 200 Day", "Volume Analysis", "Identifying Breakouts Before They Happen", "The Chart Setups That Repeat Every Cycle", "Position Sizing Based on Chart Signals", "Building Your Pre-Trade Checklist"], sovereign: true },
  "risk-management": { num: "14", title: "Risk Management Framework", lessons: 7, hook: "You can be right about the direction and still lose money if you are wrong about the size of your position.", stat: "2%", caption: "Maximum recommended portfolio risk per trade for sustainable long-term compounding", keyPoints: ["How to size positions so a single loss never ends your compounding", "The drawdown protocol: what to do when you are down 40%", "Portfolio allocation across the cycle phases"], takeaway: "The investors who survive every cycle are not the ones who called the top. They are the ones who stayed solvent long enough to be right.", lessonsList: ["Why Risk Management Is the Only Edge That Compounds", "Position Sizing Formulas", "Portfolio Allocation Across the Cycle", "The Drawdown Protocol", "Stop-Loss Strategy for Bitcoin Investors", "Mental Stops vs. Hard Stops", "The Recovery Playbook After a Major Correction"], sovereign: true },
  "money-management": { num: "15", title: "Money Management Strategy", lessons: 6, hook: "One Bitcoin bull run, managed correctly, can set your financial trajectory for the next 20 years. Most people give it back.", stat: "4x", caption: "Average return difference between investors who followed a multi-cycle compounding plan vs those who didn't", keyPoints: ["How to build the 3-bucket framework across a full cycle", "The reinvestment protocol that compounds gains without overexposure", "Your 10-year financial architecture using Bitcoin as the foundation"], takeaway: "Wealth is not built in one cycle. It is compounded across cycles. The money management strategy is what makes that possible.", lessonsList: ["The Multi-Cycle Compounding Model", "How to Reinvest Profits Without Giving Them Back", "Building an Emergency Reserve in Hard Currency", "The 3-Bucket Framework: Spend · Save · Stack", "Tax Planning for Bitcoin Profits in African Markets", "Your 10-Year Financial Architecture"], sovereign: true },
};

export default function Preview() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const module = MODULES[slug];

  if (!module) {
    return (
      <Layout>
        <section style={{ background: "#fff", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" as const, textAlign: "center" as const, padding: 64 }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 48, marginBottom: 20 }}>Module not found.</h1>
          <Link href="/pricing"><span className="btn orange">View all modules →</span></Link>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Top bar */}
      <div style={{ background: "var(--mv-accent)", padding: "12px 64px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: 8 }} className="topbar-responsive">
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "#000" }}>
          FREE PREVIEW · MODULE {module.num}: {module.title.toUpperCase()} · ENROLL TO UNLOCK ALL {module.lessons} LESSONS →
        </span>
        <Link href="/pricing">
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "#000", textDecoration: "underline", cursor: "pointer" }}>
            Enroll now
          </span>
        </Link>
      </div>

      {/* Hero */}
      <section style={{ background: module.sovereign ? "var(--mv-black)" : "#fff", padding: "80px 64px", borderBottom: "2px solid var(--mv-black)" }} className="section-pad-responsive">
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 48, alignItems: "start" }} className="preview-hero-grid">
          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(6rem, 16vw, 14rem)", color: module.sovereign ? "#1a1a1a" : "var(--mv-n200)", lineHeight: 1 }}>
            {module.num}
          </div>
          <div>
            <p className="overline" style={{ color: "var(--mv-accent)", marginBottom: 16 }}>Preview</p>
            <h1 className="h-section" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: module.sovereign ? "#fff" : "var(--mv-black)", marginBottom: 20 }}>
              {module.title}
            </h1>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 18, color: module.sovereign ? "var(--mv-n400)" : "var(--mv-n600)", lineHeight: 1.7, maxWidth: 600 }}>
              {module.hook}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: "#fff", padding: "80px 64px", borderBottom: "2px solid var(--mv-black)" }} className="section-pad-responsive">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }} className="two-col-grid">
          {/* Left: stat + key points */}
          <div>
            <div style={{ marginBottom: 48 }}>
              <div className="display" style={{ fontSize: "clamp(3rem, 8vw, 6rem)", color: "var(--mv-accent)", lineHeight: 1, marginBottom: 12 }}>{module.stat}</div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n600)" }}>{module.caption}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 16 }}>
              {module.keyPoints.map((point, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--mv-accent)", fontSize: 14, flexShrink: 0, marginTop: 2 }}>→</span>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "var(--mv-n600)", lineHeight: 1.7 }}>{point}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Right: takeaway */}
          <div>
            <blockquote style={{ borderLeft: "3px solid var(--mv-accent)", paddingLeft: 32 }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: "var(--mv-black)", lineHeight: 1.6 }}>
                "{module.takeaway}"
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Lesson list */}
      <section style={{ background: "var(--mv-n50)", padding: "80px 64px", borderBottom: "2px solid var(--mv-black)" }} className="section-pad-responsive">
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 28, marginBottom: 32 }}>Lessons in this module</h2>
        <div style={{ border: "2px solid var(--mv-black)" }}>
          {module.lessonsList.map((lesson, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 16, padding: "20px 28px",
              borderBottom: i < module.lessonsList.length - 1 ? "1px solid var(--mv-n200)" : "none",
              background: "#fff",
            }}>
              {i === 0
                ? <span style={{ color: "var(--mv-accent)", fontSize: 14 }}>▶</span>
                : <span style={{ fontSize: 14 }}>🔒</span>
              }
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: i === 0 ? "var(--mv-accent)" : "var(--mv-n600)", flex: 1 }}>{lesson}</span>
              {i === 0 && (
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-accent)", letterSpacing: "0.1em" }}>PREVIEW AVAILABLE</span>
              )}
              {i > 0 && (
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n400)", letterSpacing: "0.08em" }}>ENROLLED STUDENTS ONLY</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--mv-black)", padding: "80px 64px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: 32 }} className="section-pad-responsive">
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: "#fff", marginBottom: 8 }}>
            {module.sovereign ? "Claim The Sovereign Stack · $997" : `Get The Blueprint · From $97`}
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n600)" }}>
            {module.sovereign ? "Includes all 15 modules, 3 × 1:1 calls, and the full advanced curriculum." : "Unlock all 11 modules, 85 lessons, lifetime access."}
          </p>
        </div>
        <Link href="/pricing">
          <span className="btn orange" style={{ fontSize: 12, padding: "14px 28px", whiteSpace: "nowrap" as const }}>
            {module.sovereign ? "Claim The Sovereign Stack →" : "Get The Blueprint →"}
          </span>
        </Link>
      </section>

      <style>{`
        .preview-hero-grid { grid-template-columns: auto 1fr; }
        .two-col-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 900px) {
          .preview-hero-grid, .two-col-grid { grid-template-columns: 1fr !important; }
          .topbar-responsive { padding: 12px 20px !important; }
        }
        .section-pad-responsive { padding: 80px 64px; }
        @media (max-width: 768px) { .section-pad-responsive { padding: 48px 20px !important; } }
      `}</style>
    </Layout>
  );
}
