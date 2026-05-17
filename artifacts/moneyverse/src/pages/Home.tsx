import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";

const MODULES_PREVIEW = [
  { num: "01", title: "The Fiat Trap", lessons: 6, duration: "38 min", desc: "Every fiat currency in history has failed. Understand the mechanism extracting value from your savings right now." },
  { num: "02", title: "Bitcoin Fundamentals", lessons: 8, duration: "54 min", desc: "21 million coins. No central bank. No inflation. Learn the protocol that makes Bitcoin categorically different." },
  { num: "03", title: "The 4-Year Clock", lessons: 7, duration: "48 min", desc: "The halving cycle is the most predictable pattern in financial markets. Learn to read it and position before it moves." },
  { num: "04", title: "DCA Protocol", lessons: 6, duration: "42 min", desc: "Systematic weekly accumulation removes emotion from the equation. Set up your DCA to run automatically — forever." },
];

const TESTIMONIALS = [
  { quote: "The clearest articulation of cycle theory I've ever paid for.", name: "B. Ofori", role: "Personal Finance", followers: "84K" },
  { quote: "Eleven modules. Zero hype. Read the curriculum and you understand what's missing everywhere else.", name: "A. Hartmann", role: "Macro Strategy", followers: "38K" },
  { quote: "Bought it for the affiliate program. Stayed for the Exit Plan module.", name: "K. Patel", role: "Real Estate", followers: "121K" },
];

function AccordionItem({ num, title, lessons, duration, desc }: typeof MODULES_PREVIEW[0]) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--mv-n200)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 0", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" as const,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 36, color: "var(--mv-n200)", lineHeight: 1, minWidth: 56 }}>{num}</span>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 18, color: "var(--mv-black)" }}>{title}</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "var(--mv-n400)", marginTop: 4 }}>
              {lessons} lessons · {duration}
            </div>
          </div>
        </div>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 20, color: "var(--mv-accent)", transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </button>
      {open && (
        <div style={{ padding: "0 0 20px 80px" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n600)", lineHeight: 1.7, maxWidth: 600 }}>{desc}</p>
          <Link href={`/preview/fiat-trap`}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "var(--mv-accent)", letterSpacing: "0.12em", marginTop: 12, display: "inline-block" }}>
              ▶ Preview Module
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Layout>
      {/* ── Hero ── */}
      <section style={{ background: "var(--mv-black)", minHeight: "100vh", display: "flex", alignItems: "stretch" }}>
        <div style={{ display: "grid", gridTemplateColumns: "60fr 40fr", width: "100%", borderBottom: "2px solid #222" }} className="hero-grid">
          {/* Left */}
          <div style={{ padding: "100px 64px", display: "flex", flexDirection: "column" as const, justifyContent: "center", borderRight: "2px solid #222" }}>
            <p className="overline" style={{ color: "var(--mv-n600)", marginBottom: 32 }}>Bitcoin · Financial Sovereignty</p>
            <h1 className="display" style={{ fontSize: "clamp(5rem, 13vw, 16rem)", color: "#fff", marginBottom: 40 }}>
              Money<br /><em style={{ color: "var(--mv-accent)" }}>verse</em><span style={{ color: "var(--mv-accent)" }}>.</span>
            </h1>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(16px, 2vw, 22px)", color: "var(--mv-n400)", maxWidth: 560, lineHeight: 1.6, marginBottom: 40 }}>
              The naira fell 74%. The cedi needed an IMF bailout. Your bank charged you 6% to send money home. Most Bitcoin investors have no exit plan, no risk framework, and no idea what the chart is telling them. This is the operating manual.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
              <Link href="/pricing"><span className="btn orange" style={{ fontSize: 12 }}>Get The Blueprint →</span></Link>
              <Link href="/pricing"><span className="btn" style={{ color: "#fff", borderColor: "#fff", fontSize: 12 }}>See the Curriculum →</span></Link>
            </div>
          </div>

          {/* Right */}
          <div style={{ padding: "100px 48px", display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", position: "relative" as const, overflow: "hidden" }}>
            <svg style={{ position: "absolute" as const, inset: 0, width: "100%", height: "100%", opacity: 0.08 }} viewBox="0 0 400 500" fill="none">
              {[0,1,2,3,4,5,6,7,8].map((i) => <ellipse key={i} cx="200" cy="250" rx={60 + i * 30} ry={40 + i * 25} stroke="#F59300" strokeWidth="1" fill="none" />)}
            </svg>
            <div style={{ textAlign: "center" as const, zIndex: 1 }}>
              <p className="overline" style={{ color: "var(--mv-n600)", marginBottom: 12 }}>Starting price</p>
              <div className="display" style={{ fontSize: "clamp(4rem, 10vw, 7rem)", color: "var(--mv-accent)" }}>$97</div>
              <p className="mono" style={{ fontSize: 10, color: "var(--mv-n600)", marginTop: 8, letterSpacing: "0.15em" }}>ONCE. YOURS FOREVER.</p>
              <div style={{ marginTop: 48, display: "flex", flexDirection: "column" as const, gap: 16 }}>
                {["85 Lessons", "11h 43m Runtime", "30-Day Guarantee"].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ color: "var(--mv-accent)", fontSize: 16 }}>✓</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n400)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section style={{ borderBottom: "2px solid var(--mv-black)", background: "#fff" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)" }} className="stats-grid">
          {[
            { num: "11", label: "Modules" },
            { num: "85", label: "Lessons" },
            { num: "11h 43m", label: "Runtime" },
            { num: "Lifetime", label: "Access" },
            { num: "30 Days", label: "Guarantee", orange: true },
          ].map((s, i) => (
            <div key={i} style={{ padding: "32px 24px", borderRight: i < 4 ? "1px solid var(--mv-n200)" : "none", textAlign: "center" as const }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 28, color: s.orange ? "var(--mv-accent)" : "var(--mv-black)" }}>{s.num}</div>
              <div className="overline" style={{ marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Problem Block ── */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "2px solid var(--mv-black)" }} className="two-col-grid">
        {/* Left — black */}
        <div style={{ background: "var(--mv-black)", color: "#fff", padding: "100px 64px", borderRight: "2px solid #222" }}>
          <span className="accent-rule" style={{ marginBottom: 24 }} />
          <p className="overline" style={{ color: "var(--mv-accent)", marginBottom: 20 }}>The Problem</p>
          <h2 className="h-section" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "#fff", marginBottom: 28 }}>
            Your savings are being taxed without your consent.
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "var(--mv-n400)", lineHeight: 1.8, marginBottom: 36 }}>
            Every year the naira, cedi, and shilling lose purchasing power. Your bank is not a savings vehicle. It is a slow drain. The Blueprint is the system that stops it.
          </p>
          <p className="mono" style={{ fontSize: 11, color: "var(--mv-n600)", borderLeft: "3px solid var(--mv-accent)", paddingLeft: 16 }}>
            Average African currency depreciation vs USD since 2021: 47%
          </p>
        </div>

        {/* Right — white */}
        <div style={{ background: "#fff", padding: "100px 64px" }}>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 0 }}>
            {[
              "The naira needs ₦1,580 today to buy what ₦410 bought in 2022.",
              "Sending $200 home costs $14–28 in fees. That's 7–14%.",
              "93% of Bitcoin investors have no exit plan for the next cycle peak.",
            ].map((item, i) => (
              <div key={i} style={{ padding: "32px 0", borderBottom: i < 2 ? "1px solid var(--mv-n200)" : "none" }}>
                <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 40, color: "var(--mv-n200)", lineHeight: 1, minWidth: 48 }}>0{i + 1}</span>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, lineHeight: 1.7, color: "var(--mv-n700)", marginTop: 6 }}>{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Thesis Section ── */}
      <section style={{ background: "#fff", padding: "120px 64px", borderBottom: "2px solid var(--mv-black)" }} className="section-pad-responsive">
        <span className="accent-rule lg" style={{ marginBottom: 20 }} />
        <p className="overline" style={{ marginBottom: 16 }}>Why Bitcoin</p>
        <h2 className="h-section" style={{ fontSize: "clamp(2rem, 4vw, 4rem)", marginBottom: 64 }}>Not an investment.<br />An exit.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: "2px solid var(--mv-black)" }} className="three-col-grid">
          {[
            { title: "Fixed Supply", body: "21 million. No government can print more." },
            { title: "Self-Custody", body: "Your keys, your coins. No bank can freeze it." },
            { title: "Global Liquidity", body: "Send value across borders in 10 minutes for $0.50." },
          ].map((item, i) => (
            <div key={i} style={{ padding: "48px 40px", borderRight: i < 2 ? "1px solid var(--mv-n200)" : "none" }}>
              <span className="accent-rule" style={{ marginBottom: 24 }} />
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 24, marginBottom: 16 }}>{item.title}</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "var(--mv-n600)", lineHeight: 1.7 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Curriculum Preview ── */}
      <section style={{ background: "var(--mv-n50)", padding: "120px 64px", borderBottom: "2px solid var(--mv-black)" }} className="section-pad-responsive">
        <span className="accent-rule lg" style={{ marginBottom: 20 }} />
        <h2 className="h-section" style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", marginBottom: 64 }}>What's inside.</h2>
        <div style={{ borderTop: "2px solid var(--mv-black)" }}>
          {MODULES_PREVIEW.map((m) => <AccordionItem key={m.num} {...m} />)}
        </div>
        <div style={{ marginTop: 40 }}>
          <Link href="/pricing">
            <span className="btn" style={{ fontSize: 12 }}>See all 11 modules →</span>
          </Link>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section style={{ background: "var(--mv-n50)", padding: "120px 64px", borderBottom: "2px solid var(--mv-black)" }} className="section-pad-responsive">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "2px solid var(--mv-black)" }} className="three-col-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{ padding: "48px 40px", borderRight: i < 2 ? "1px solid var(--mv-n200)" : "none", background: "#fff" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 18, lineHeight: 1.6, color: "var(--mv-black)", marginBottom: 32 }}>
                "{t.quote}"
              </p>
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, color: "var(--mv-black)" }}>— {t.name}</p>
                <p className="overline" style={{ marginTop: 6 }}>{t.role} · {t.followers}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ background: "var(--mv-black)", padding: "100px 64px" }} className="section-pad-responsive">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="two-col-grid">
          <div>
            <h2 className="h-section" style={{ fontSize: "clamp(2rem, 4vw, 4rem)", color: "#fff", marginBottom: 24 }}>
              Enroll before the next cycle peak.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: "var(--mv-n400)", lineHeight: 1.7 }}>
              11 modules. 85 lessons. One payment. Starts at $97.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "flex-start", gap: 20 }}>
            <div className="display" style={{ fontSize: "clamp(4rem, 8vw, 8rem)", color: "var(--mv-accent)" }}>$97</div>
            <Link href="/pricing"><span className="btn orange" style={{ fontSize: 13 }}>Access Blueprint →</span></Link>
            <p className="mono" style={{ fontSize: 10, color: "var(--mv-n600)", letterSpacing: "0.12em" }}>30-day conditional guarantee</p>
          </div>
        </div>
      </section>

      <style>{`
        .hero-grid { grid-template-columns: 60fr 40fr; }
        .stats-grid { grid-template-columns: repeat(5, 1fr); }
        .three-col-grid { grid-template-columns: repeat(3, 1fr); }
        .two-col-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 900px) {
          .hero-grid, .two-col-grid { grid-template-columns: 1fr !important; }
          .three-col-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        .section-pad-responsive { padding: 120px 64px; }
        @media (max-width: 768px) {
          .section-pad-responsive { padding: 60px 20px !important; }
        }
      `}</style>
    </Layout>
  );
}
