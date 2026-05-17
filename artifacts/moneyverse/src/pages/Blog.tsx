import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";

const ARTICLES = [
  { slug: "nigerian-naira-collapse", title: "The Naira Collapse: A Case Study in Fiat Failure", date: "Jan 2025", tag: "Macro", preview: "₦1,580 to the dollar. ₦410 in 2022. In three years, the naira lost 74% of its value. This is not volatility — this is the design of every fiat currency under pressure." },
  { slug: "bitcoin-halving-2024", title: "The 2024 Halving: What Actually Happened and What Comes Next", date: "May 2024", tag: "Cycle Theory", preview: "The fourth Bitcoin halving reduced block rewards from 6.25 to 3.125 BTC. What the previous three cycles tell us about the 18 months that follow." },
  { slug: "self-custody-ftx", title: "FTX, $8 Billion, and Why Self-Custody Is Not Optional", date: "Dec 2023", tag: "Self-Custody", preview: "FTX had customer funds. Then it didn't. The lesson was not about one exchange — it was about the entire model of keeping Bitcoin on platforms you don't control." },
  { slug: "dca-vs-timing", title: "DCA vs. Timing the Market: A 4-Year Study", date: "Mar 2024", tag: "Strategy", preview: "Across three complete Bitcoin cycles, systematic weekly DCA outperformed lump-sum timing for 74% of investors. The evidence for removing emotion from accumulation." },
  { slug: "african-monetary-sovereignty", title: "14 Nations. One Currency. Set in Paris.", date: "Feb 2024", tag: "Africa", preview: "The CFA franc. Colonial monetary architecture still running in 2025. Why 14 African nations cannot set their own interest rates — and what Bitcoin represents structurally." },
  { slug: "bitcoin-remittance", title: "Sending $200 to Lagos Costs $28. Bitcoin Costs $0.50.", date: "Nov 2023", tag: "Remittance", preview: "The remittance industry extracts $50 billion per year from African families. A full breakdown of the fees, the delays, and the Bitcoin P2P alternative that bypasses all of it." },
  { slug: "exit-architecture", title: "93% of Bitcoin Investors Have No Exit Plan", date: "Apr 2024", tag: "Exit Strategy", preview: "Most investors survived the 2017 and 2021 cycles. Most gave back 80% of their gains because they had no documented plan for when the cycle peaks. The exit architecture framework." },
  { slug: "ghana-imf-bailout", title: "Ghana's IMF Bailout: What It Means for the Cedi and African Savers", date: "Jan 2024", tag: "Macro", preview: "Ghana requested $3 billion from the IMF in 2022. The cedi had already fallen 60%. What structural forces drove the crisis — and why the pattern will repeat." },
];

const TAGS = ["All", "Macro", "Cycle Theory", "Self-Custody", "Strategy", "Africa", "Remittance", "Exit Strategy"];

export default function Blog() {
  const [activeTag, setActiveTag] = useState("All");

  const filtered = activeTag === "All" ? ARTICLES : ARTICLES.filter((a) => a.tag === activeTag);

  return (
    <Layout>
      {/* ── Hero ── */}
      <section style={{ background: "var(--mv-black)", padding: "100px 64px", borderBottom: "2px solid #222" }} className="section-pad-responsive">
        <span className="accent-rule lg" style={{ marginBottom: 20 }} />
        <p className="overline" style={{ color: "var(--mv-n600)", marginBottom: 20 }}>Research · Moneyverse</p>
        <h1 className="h-section" style={{ fontSize: "clamp(3rem, 8vw, 8rem)", color: "#fff", marginBottom: 24 }}>
          Research Index.
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: "var(--mv-n400)", maxWidth: 560, lineHeight: 1.7 }}>
          Analysis on Bitcoin cycles, African monetary systems, self-custody, and the structural forces that make the thesis unavoidable. No hype. No price predictions. Just the data.
        </p>
      </section>

      {/* ── Tag filter ── */}
      <section style={{ background: "#fff", padding: "24px 64px", borderBottom: "1px solid var(--mv-n200)", overflowX: "auto" as const }} className="tag-pad-responsive">
        <div style={{ display: "flex", gap: 8, flexWrap: "nowrap" as const }}>
          {TAGS.map((tag) => {
            const active = tag === activeTag;
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                style={{
                  fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.12em",
                  padding: "6px 14px", border: "2px solid var(--mv-black)", cursor: "pointer",
                  whiteSpace: "nowrap" as const, background: active ? "var(--mv-black)" : "transparent",
                  color: active ? "#fff" : "var(--mv-black)", transition: "all 0.15s",
                }}
              >
                {tag.toUpperCase()}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Articles grid ── */}
      <section style={{ background: "#fff", padding: "80px 64px", borderBottom: "2px solid var(--mv-black)" }} className="section-pad-responsive">
        {filtered.length === 0 ? (
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n600)" }}>No articles in this category yet.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0, border: "2px solid var(--mv-black)" }} className="articles-grid">
            {filtered.map((article, i) => (
              <Link key={article.slug} href={`/blog/${article.slug}`}>
                <div style={{
                  padding: "48px 40px", cursor: "pointer",
                  borderBottom: i < filtered.length - 2 ? "1px solid var(--mv-n200)" : "none",
                  borderRight: i % 2 === 0 ? "1px solid var(--mv-n200)" : "none",
                  transition: "background 0.15s",
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--mv-n50)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
                >
                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20 }}>
                    <span style={{
                      fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: "0.12em",
                      padding: "3px 10px", border: "1px solid var(--mv-n300)", color: "var(--mv-n600)",
                    }}>
                      {article.tag.toUpperCase()}
                    </span>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n400)", letterSpacing: "0.08em" }}>
                      {article.date}
                    </span>
                  </div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(1.1rem, 2vw, 1.4rem)", marginBottom: 16, lineHeight: 1.3 }}>
                    {article.title}
                  </h2>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n600)", lineHeight: 1.7 }}>
                    {article.preview}
                  </p>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "var(--mv-accent)", marginTop: 20, letterSpacing: "0.1em" }}>
                    READ →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "var(--mv-black)", padding: "100px 64px", borderTop: "2px solid #222" }} className="section-pad-responsive">
        <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 64, alignItems: "center" }} className="two-col-grid-blog">
          <div>
            <span className="accent-rule" style={{ marginBottom: 24 }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
              Reading about it is free.<br />
              <em style={{ color: "var(--mv-accent)" }}>Acting on it changes everything</em>
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: "var(--mv-n500)", lineHeight: 1.8, maxWidth: 520 }}>
              Everything on this page is a fraction of what's inside The Blueprint — including the DCA protocol, the cold storage system, and the cycle exit framework that turns knowledge into a position.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 20 }}>
            <Link href="/pricing">
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 11, letterSpacing: "0.08em", background: "var(--mv-accent)", color: "#000", padding: "22px 32px", cursor: "pointer" }}>
                Build the position · $97
                <svg width="14" height="9" viewBox="0 0 16 10" fill="none"><path d="M11 1l4 4-4 4M15 5H1" stroke="#000" strokeWidth="1.5" strokeLinecap="square"/></svg>
              </span>
            </Link>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n600)", letterSpacing: "0.12em", lineHeight: 2, textAlign: "center" as const }}>
              ONE-TIME · LIFETIME ACCESS<br />21-DAY CONDITIONAL GUARANTEE
            </p>
          </div>
        </div>
      </section>

      <style>{`
        .articles-grid { grid-template-columns: repeat(2, 1fr); }
        @media (max-width: 768px) {
          .articles-grid { grid-template-columns: 1fr !important; }
          .tag-pad-responsive { padding: 16px 20px !important; }
        }
        .section-pad-responsive { padding: 80px 64px; }
        @media (max-width: 768px) { .section-pad-responsive { padding: 48px 20px !important; } }
      `}</style>
    </Layout>
  );
}
