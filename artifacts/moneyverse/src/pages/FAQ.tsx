import { Link } from "wouter";
import Layout from "@/components/Layout";

const SECTIONS = [
  {
    label: "The Course",
    qas: [
      { q: "Do I need prior Bitcoin or investing experience?", a: "No. Module 01 starts at first principles — what money is, what fiat extracts from you, why Bitcoin changes the equation. If you already understand Bitcoin basics, you skip to Module 04. The 21-Day Activation Sequence works for both complete beginners and experienced holders." },
      { q: "How long does it take to complete?", a: "11 hours 43 minutes across 85 lessons. Most students complete Modules 01–07 in two weeks at one session per day. The 21-Day Activation Sequence runs one protocol per day — setup is live in three weeks even at a relaxed pace." },
      { q: "Is this pre-recorded or live?", a: "Blueprint (Tier 1) is self-paced video — watch any time, any device, any speed. Blueprint + Live (Tier 2) adds monthly live tutorial sessions with replay access. Sovereign Stack (Tier 3) includes three private 1:1 calls." },
      { q: "What is the 5-Day WhatsApp Activation Class?", a: "A live, cohort-based walkthrough exclusive to Tier 2 and Tier 3. Over five days: hardware wallet setup, DCA automation, P2P accounts, and affiliate link launch — with real-time Q&A. Not available to Tier 1. Post-purchase access only." },
      { q: "What does Sovereign Stack include beyond Blueprint + Live?", a: "Four additional course tracks: Macro Masterplan (DXY, Fed cycles, M2 supply), Technical Analysis Masterclass (support/resistance, RSI, moving averages), Risk Management Framework (position sizing, drawdown protocols), Money Management Strategy (compounding across cycles). Plus: Arbitrage Playbook, Cross-Border Payments execution, and three private 1:1 calls." },
    ],
  },
  {
    label: "Risk & Bitcoin",
    qas: [
      { q: "What if Bitcoin crashes after I buy?", a: "The Blueprint is a framework for the 4-year cycle, not a prediction. Module 06 covers Exit Architecture specifically — profit-taking targets, cycle peak indicators, reaccumulation zones. Students who execute the DCA and follow the exit plan are structurally positioned to profit across the cycle regardless of short-term volatility. Bitcoin involves risk. This is not investment advice." },
      { q: "Is Bitcoin legal in my country?", a: "Legal to hold and use in Nigeria, Ghana, Kenya, and South Africa. P2P trading and self-custody are the methods taught — both operate outside the banking system without violating law. Consult local legal advice if you have jurisdiction-specific concerns." },
      { q: "How much money do I need to start with?", a: "The DCA protocol works from ₦5,000 / GH₵50 / $10 per week. The 21-Day Activation gets your infrastructure live — the amount is secondary to having the protocol running." },
    ],
  },
  {
    label: "Payments & Access",
    qas: [
      { q: "How do I pay from Nigeria, Ghana, or Kenya?", a: "Select NGN at checkout — pay via Paystack in local currency. GHS and KES also supported. USD, GBP, CAD via Stripe. Bitcoin (BTC) and USDT via BTCPay — no bank required for any tier." },
      { q: "Is this a one-time payment or a subscription?", a: "One-time. Once. Yours forever. No monthly fees. No annual renewal. Every future lesson update and curriculum revision included at no extra cost." },
      { q: "When do I get access after paying?", a: "Immediately. Within two minutes, you receive an email with login credentials. Not in inbox within five minutes — check spam or email support@moneyverse.network." },
      { q: "Can I upgrade tiers later?", a: "Yes. Contact support and we apply your original payment as a credit. Pay only the difference." },
    ],
  },
  {
    label: "The Guarantee",
    qas: [
      { q: "What exactly is the 30-day conditional guarantee?", a: "Follow the 21-Day Activation Sequence as designed — one protocol per day, executed in order. If you complete the sequence and your financial position hasn't fundamentally shifted, one email gets you every cent back. No forms. No interrogation." },
      { q: 'What does "fundamentally shifted" mean?', a: "Your DCA is running automatically. Your Bitcoin is in self-custody. You have sent or received a cross-border payment without a bank. You know your exact exit targets. These are concrete, verifiable outcomes — not vague feelings." },
    ],
  },
  {
    label: "Affiliate Programme",
    qas: [
      { q: "How does the affiliate programme work?", a: "Every tier includes affiliate access. Your tracking link in the partner dashboard earns 30% on every sale — forever. Tier 1: $29.10/sale. Tier 2: $59.10. Tier 3: $299.10. Four referrals covers your original investment." },
      { q: "Do I need a large audience?", a: "No. The Monetisation Gameplan (Tier 2 and 3) is built for audiences between 1,000 and 100,000 followers. Trust and niche alignment matter more than raw follower count." },
    ],
  },
];

export default function FAQ() {
  return (
    <Layout>
      {/* ── Hero ── */}
      <section style={{ background: "var(--mv-black)", padding: "100px 64px", borderBottom: "2px solid #222" }} className="section-pad-responsive">
        <span className="accent-rule" style={{ marginBottom: 20 }} />
        <h1 className="h-section" style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", color: "#fff", marginBottom: 24 }}>
          Every question.<br />Answered straight.
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: "var(--mv-n400)", maxWidth: 560, lineHeight: 1.7 }}>
          No hedging. No corporate deflection. Email{" "}
          <a href="mailto:support@moneyverse.network" style={{ color: "var(--mv-accent)" }}>support@moneyverse.network</a>{" "}
          for anything not covered here — real reply within 24 hours.
        </p>
      </section>

      {/* ── Q&A Sections ── */}
      {SECTIONS.map((section, si) => (
        <section key={si} style={{ borderBottom: "2px solid var(--mv-black)" }}>
          {/* Section overline */}
          <div style={{ background: "var(--mv-n50)", padding: "16px 64px", borderBottom: "1px solid var(--mv-n200)" }} className="section-pad-x-responsive">
            <p className="overline">{section.label}</p>
          </div>
          {/* Q&A rows */}
          {section.qas.map((qa, qi) => (
            <div key={qi} style={{ display: "grid", gridTemplateColumns: "5fr 7fr", borderBottom: qi < section.qas.length - 1 ? "1px solid var(--mv-n200)" : "none" }} className="qa-row">
              <div style={{ padding: "48px 64px", borderRight: "1px solid var(--mv-n200)", background: "#fff" }} className="qa-q-pad">
                <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, lineHeight: 1.4, color: "var(--mv-black)" }}>{qa.q}</p>
              </div>
              <div style={{ padding: "48px 64px", background: "#fff" }} className="qa-a-pad">
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "var(--mv-n600)", lineHeight: 1.8 }}>{qa.a}</p>
              </div>
            </div>
          ))}
        </section>
      ))}

      {/* ── CTA ── */}
      <section style={{ background: "var(--mv-black)", padding: "100px 64px", borderTop: "2px solid #222" }} className="section-pad-responsive">
        <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 64, alignItems: "center" }} className="two-col-grid-faq">
          <div>
            <span className="accent-rule" style={{ marginBottom: 24 }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
              Your questions are answered.<br />
              <em style={{ color: "var(--mv-accent)" }}>The only question left is when</em>
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: "var(--mv-n500)", lineHeight: 1.8, maxWidth: 520 }}>
              The guarantee means if you go through the first module and it doesn't land, you email once and get everything back. There is no risk — only the risk of staying exactly where you are.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 20 }}>
            <Link href="/pricing">
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 11, letterSpacing: "0.08em", background: "var(--mv-accent)", color: "#000", padding: "22px 32px", cursor: "pointer" }}>
                Start now · from $97
                <svg width="14" height="9" viewBox="0 0 16 10" fill="none"><path d="M11 1l4 4-4 4M15 5H1" stroke="#000" strokeWidth="1.5" strokeLinecap="square"/></svg>
              </span>
            </Link>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n600)", letterSpacing: "0.12em", lineHeight: 2, textAlign: "center" as const }}>
              ONE-TIME · LIFETIME ACCESS<br />30-DAY CONDITIONAL GUARANTEE
            </p>
          </div>
        </div>
      </section>

      <style>{`
        .qa-row { grid-template-columns: 5fr 7fr; }
        @media (max-width: 768px) {
          .qa-row { grid-template-columns: 1fr !important; }
          .qa-q-pad, .qa-a-pad { padding: 32px 20px !important; border-right: none !important; }
          .section-pad-x-responsive { padding: 16px 20px !important; }
        }
        .section-pad-responsive { padding: 100px 64px; }
        @media (max-width: 768px) { .section-pad-responsive { padding: 60px 20px !important; } }
      `}</style>
    </Layout>
  );
}
