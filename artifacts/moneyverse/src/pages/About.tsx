import { Link } from "wouter";
import Layout from "@/components/Layout";

export default function About() {
  return (
    <Layout>
      {/* ── Hero ── */}
      <section style={{ background: "var(--mv-black)", padding: "120px 64px", borderBottom: "2px solid #222" }} className="section-pad-responsive">
        <span className="accent-rule lg" style={{ marginBottom: 20 }} />
        <p className="overline" style={{ color: "var(--mv-n600)", marginBottom: 20 }}>The Thesis</p>
        <h1 className="display" style={{ fontSize: "clamp(4rem, 10vw, 12rem)", color: "#fff", marginBottom: 40, maxWidth: 900 }}>
          Not an<br /><em style={{ color: "var(--mv-accent)" }}>invest</em>ment<br />An exit
        </h1>
        <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(16px, 2vw, 22px)", color: "var(--mv-n400)", maxWidth: 640, lineHeight: 1.7 }}>
          In 1960, ₦1 bought $2.80. In 2025, ₦1 buys $0.00063. That's not volatility. That's design. And the same design applies to every African currency — not by accident, by architecture.
        </p>
      </section>

      {/* ── The Problem ── */}
      <section style={{ background: "#fff", padding: "120px 64px", borderBottom: "2px solid var(--mv-black)" }} className="section-pad-responsive">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }} className="two-col-grid">
          <div>
            <span className="accent-rule" style={{ marginBottom: 20 }} />
            <p className="overline" style={{ marginBottom: 12 }}>The Problem</p>
            <h2 className="h-section" style={{ fontSize: "clamp(2rem, 3vw, 3rem)" }}>The system is working exactly as designed</h2>
          </div>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: "var(--mv-n600)", lineHeight: 1.9, marginBottom: 32 }}>
              Every fiat currency in the African context shares a structural flaw: it is controlled by institutions whose incentives do not align with yours. Central banks inflate supply. Governments devalue on political cycles. The IMF imposes conditions that hurt ordinary savers. The result is predictable — purchasing power flows from those who hold savings to those who control issuance.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: "var(--mv-n600)", lineHeight: 1.9, marginBottom: 32 }}>
              This is not a theory. The naira lost 74% against the dollar since 2021. The cedi required an IMF bailout. Fourteen CFA franc nations still have their monetary policy set in Paris. These are structural extractions — not market fluctuations.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: "var(--mv-n600)", lineHeight: 1.9 }}>
              Most investment advice tells you to earn more, spend less, and keep your savings in a bank. That advice was written for economies where the currency holds its value. It does not apply here.
            </p>
          </div>
        </div>
      </section>

      {/* ── Why Bitcoin ── */}
      <section style={{ background: "var(--mv-n50)", padding: "120px 64px", borderBottom: "2px solid var(--mv-black)" }} className="section-pad-responsive">
        <span className="accent-rule lg" style={{ marginBottom: 20 }} />
        <p className="overline" style={{ marginBottom: 20 }}>Why Bitcoin</p>
        <h2 className="h-section" style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", marginBottom: 64 }}>The properties that matter</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0, border: "2px solid var(--mv-black)" }} className="two-col-grid">
          {[
            { title: "Fixed Supply", body: "21 million Bitcoin. Enforced by mathematics, not policy. No committee, no vote, no override. Every other asset class — gold, property, equities — can have its supply increased by human decision. Bitcoin cannot." },
            { title: "Self-Custody", body: "Your Bitcoin on an exchange is not your Bitcoin. FTX had $8 billion in customer funds. Then it didn't. Self-custody removes counterparty risk entirely. Your keys, your coins. No bank can freeze, seize, or dilute what you hold in cold storage." },
            { title: "The 4-Year Cycle", body: "Bitcoin follows a predictable halving cycle. Every ~4 years, the block reward halves — reducing supply issuance. Three complete cycles have followed the same pattern: accumulation, pre-halving run, parabolic peak, bear market reset. The fourth cycle is running now." },
            { title: "Global Liquidity", body: "Send value across borders in 10 minutes for $0.50. The remittance industry charges African families $50 billion per year in fees. Bitcoin makes that optional. P2P markets operate 24 hours a day, without bank accounts, without approval, without delay." },
          ].map((item, i) => (
            <div key={i} style={{ padding: "56px 48px", borderRight: i % 2 === 0 ? "1px solid var(--mv-n200)" : "none", borderBottom: i < 2 ? "1px solid var(--mv-n200)" : "none", background: "#fff" }}>
              <span className="accent-rule" style={{ marginBottom: 20 }} />
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 24, marginBottom: 16 }}>{item.title}</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "var(--mv-n600)", lineHeight: 1.8 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── The Blueprint ── */}
      <section style={{ background: "#fff", padding: "120px 64px", borderBottom: "2px solid var(--mv-black)" }} className="section-pad-responsive">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }} className="two-col-grid">
          <div>
            <span className="accent-rule" style={{ marginBottom: 20 }} />
            <p className="overline" style={{ marginBottom: 12 }}>The Blueprint</p>
            <h2 className="h-section" style={{ fontSize: "clamp(2rem, 3vw, 3rem)" }}>An operating manual, not a prediction</h2>
          </div>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: "var(--mv-n600)", lineHeight: 1.9, marginBottom: 32 }}>
              Moneyverse was built because the right information was scattered, inaccessible, or wrapped in noise. The courses that existed were either too technical for beginners or too shallow for anyone who wanted to act. The Blueprint is neither.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: "var(--mv-n600)", lineHeight: 1.9, marginBottom: 32 }}>
              It is a sequenced, actionable system. Fifteen modules that take you from understanding what fiat currency extracts from you, to running a fully automated DCA protocol, to executing cross-border payments without a bank account — in 21 days.
            </p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 20, color: "var(--mv-black)", lineHeight: 1.6, borderLeft: "3px solid var(--mv-accent)", paddingLeft: 24 }}>
              "The question is never whether to take profit. The question is whether you have a plan before the cycle peaks — or after."
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "var(--mv-black)", padding: "100px 64px", borderTop: "2px solid #222" }} className="section-pad-responsive">
        <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 64, alignItems: "center" }} className="two-col-grid">
          <div>
            <span className="accent-rule" style={{ marginBottom: 24 }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
              You now understand why.<br />
              <em style={{ color: "var(--mv-accent)" }}>The Blueprint is the how</em>
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: "var(--mv-n500)", lineHeight: 1.8, maxWidth: 520 }}>
              The thesis is clear. The cycle is live. Most people read this page and go back to saving in naira. You don't have to be one of them — 11 modules and $97 is the entire distance between understanding and acting.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 20 }}>
            <Link href="/pricing">
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 11, letterSpacing: "0.08em", background: "var(--mv-accent)", color: "#000", padding: "22px 32px", cursor: "pointer" }}>
                Get The Blueprint · $97
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
        .two-col-grid { grid-template-columns: 1fr 2fr; }
        @media (max-width: 900px) { .two-col-grid { grid-template-columns: 1fr !important; } }
        .section-pad-responsive { padding: 120px 64px; }
        @media (max-width: 768px) { .section-pad-responsive { padding: 60px 20px !important; } }
      `}</style>
    </Layout>
  );
}
