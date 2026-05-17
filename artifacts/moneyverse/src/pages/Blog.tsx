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

      {/* ── Tag filter (visual only) ── */}
      <section style={{ background: "#fff", padding: "24px 64px", borderBottom: "1px solid var(--mv-n200)", overflowX: "auto" as const }} className="tag-pad-responsive">
        <div style={{ display: "flex", gap: 8, flexWrap: "nowrap" as const }}>
          {TAGS.map((tag, i) => (
            <span key={tag} style={{
              fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.12em", padding: "6px 14px",
              border: "2px solid var(--mv-black)", cursor: "pointer", whiteSpace: "nowrap" as const,
              background: i === 0 ? "var(--mv-black)" : "transparent",
              color: i === 0 ? "#fff" : "var(--mv-black)",
            }}>
              {tag.toUpperCase()}
            </span>
          ))}
        </div>
      </section>

      {/* ── Articles grid ── */}
      <section style={{ background: "#fff", padding: "80px 64px", borderBottom: "2px solid var(--mv-black)" }} className="section-pad-responsive">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0, border: "2px solid var(--mv-black)" }} className="articles-grid">
          {ARTICLES.map((article, i) => (
            <div key={article.slug} style={{
              padding: "48px 40px",
              borderRight: i % 2 === 0 ? "1px solid var(--mv-n200)" : "none",
              borderBottom: i < ARTICLES.length - 2 ? "1px solid var(--mv-n200)" : "none",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: "#000", background: "var(--mv-accent)", padding: "3px 10px", letterSpacing: "0.12em" }}>
                  {article.tag.toUpperCase()}
                </span>
                <span className="mono" style={{ fontSize: 10, color: "var(--mv-n400)" }}>{article.date}</span>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(1.2rem, 2vw, 1.6rem)", lineHeight: 1.2, marginBottom: 16, color: "var(--mv-black)" }}>
                {article.title}
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n600)", lineHeight: 1.7, marginBottom: 24 }}>
                {article.preview}
              </p>
              <Link href={`/blog/${article.slug}`}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "var(--mv-accent)", letterSpacing: "0.12em", cursor: "pointer" }}>
                  READ → 
                </span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "var(--mv-n50)", padding: "80px 64px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: 32, borderBottom: "2px solid var(--mv-black)" }} className="section-pad-responsive">
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", marginBottom: 8 }}>
            Ready to go beyond the research?
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: "var(--mv-n600)" }}>
            The Blueprint translates this into an executable protocol.
          </p>
        </div>
        <Link href="/pricing">
          <span className="btn orange" style={{ fontSize: 12, padding: "14px 28px" }}>Get The Blueprint →</span>
        </Link>
      </section>

      <style>{`
        .articles-grid { grid-template-columns: repeat(2, 1fr); }
        @media (max-width: 768px) {
          .articles-grid { grid-template-columns: 1fr !important; }
          .section-pad-responsive { padding: 60px 20px !important; }
          .tag-pad-responsive { padding: 24px 20px !important; }
        }
      `}</style>
    </Layout>
  );
}
