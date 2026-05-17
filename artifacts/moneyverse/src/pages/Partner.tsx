import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";

const NICHES = [
  { label: "Personal Finance", rate: 0.012 },
  { label: "Crypto / Bitcoin", rate: 0.018 },
  { label: "Entrepreneurship", rate: 0.010 },
  { label: "Africa / Diaspora", rate: 0.014 },
  { label: "Investing", rate: 0.013 },
];

const COURSE_PRICE = 197;
const COMMISSION_PCT = 0.30;
const COMMISSION_VALUE = 59.10;

export default function Partner() {
  const { user } = useAuth();
  const [followers, setFollowers] = useState(20000);
  const [nicheIdx, setNicheIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const niche = NICHES[nicheIdx];
  const projectedSales = Math.round(followers * niche.rate);
  const partnerEarnings = projectedSales * COMMISSION_VALUE;
  const breakEvenSales = Math.ceil(COURSE_PRICE / COMMISSION_VALUE);
  const breakEvenPct = projectedSales > 0 ? ((breakEvenSales / projectedSales) * 100).toFixed(0) : "—";

  const referralCode = user ? user.id.substring(0, 8).toUpperCase() : null;
  const referralUrl = referralCode ? `https://moneyverse.network/?ref=${referralCode}` : null;

  function copyReferral() {
    if (!referralUrl) return;
    navigator.clipboard.writeText(referralUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <Layout>
      {/* ── Hero ── */}
      <section style={{ background: "var(--mv-black)", padding: "100px 64px", borderBottom: "2px solid #222" }} className="section-pad-responsive">
        <span className="accent-rule" style={{ marginBottom: 20 }} />
        <p className="overline" style={{ color: "var(--mv-n600)", marginBottom: 16 }}>Partner Programme · Moneyverse</p>
        <h1 className="h-section" style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", color: "#fff", marginBottom: 24 }}>
          Your audience is already asking.
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: "var(--mv-n400)", maxWidth: 620, lineHeight: 1.7, marginBottom: 48 }}>
          You talk about money, Africa, or Bitcoin. Your audience is already paying attention. The Blueprint gives you a product to sell — and 30% of every sale, paid automatically.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, maxWidth: 560, border: "2px solid #222" }} className="stats-three-col">
          {[
            { num: "30%", label: "Commission per sale" },
            { num: "$59", label: "You earn per enrolment" },
            { num: "4", label: "Sales = your course free" },
          ].map((s, i) => (
            <div key={i} style={{ padding: "24px 20px", borderRight: i < 2 ? "1px solid #222" : "none", textAlign: "center" as const }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 32, color: "var(--mv-accent)" }}>{s.num}</div>
              <div className="overline" style={{ color: "var(--mv-n600)", marginTop: 8 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Referral link (enrolled students only) ── */}
      {user && referralUrl && (
        <section style={{ background: "var(--mv-accent)", padding: "40px 64px", borderBottom: "2px solid var(--mv-black)" }} className="section-pad-sm">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" as const }}>
            <div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "#000", marginBottom: 8 }}>
                YOUR AFFILIATE LINK · REF: {referralCode}
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#000", opacity: 0.7 }}>
                Share this link. Every sale earns you $59.10. Tracked in real time.
              </p>
            </div>
            <div style={{ display: "flex", gap: 0, flexShrink: 0 }}>
              <div style={{
                fontFamily: "'Space Mono', monospace", fontSize: 11,
                padding: "12px 18px", background: "#fff", color: "#000",
                border: "2px solid #000", borderRight: "none",
                maxWidth: 280, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const,
              }}>
                {referralUrl}
              </div>
              <button
                onClick={copyReferral}
                style={{
                  fontFamily: "'Space Mono', monospace", fontSize: 9, fontWeight: 700,
                  letterSpacing: "0.12em", padding: "0 20px",
                  background: copied ? "var(--mv-black)" : "#000",
                  color: "#fff", border: "2px solid #000",
                  cursor: "pointer", whiteSpace: "nowrap" as const, transition: "all 0.15s",
                }}
              >
                {copied ? "COPIED ✓" : "COPY LINK"}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── Calculator ── */}
      <section style={{ background: "#fff", padding: "100px 64px", borderBottom: "2px solid var(--mv-black)" }} className="section-pad-responsive">
        <span className="accent-rule" style={{ marginBottom: 20 }} />
        <h2 className="h-section" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", marginBottom: 48 }}>Your audience revenue potential</h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 40 }} className="two-col-grid">
          <div>
            <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase" as const, display: "block", marginBottom: 12 }}>
              Follower Count
            </label>
            <input
              type="number"
              value={followers}
              onChange={(e) => setFollowers(Math.max(0, Number(e.target.value)))}
              style={{ width: "100%", fontFamily: "'Space Mono', monospace", fontSize: 16, padding: "14px 16px", border: "2px solid var(--mv-black)", outline: "none" }}
            />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "var(--mv-n600)", marginTop: 10 }}>
              Combined across your platforms (IG, X, YouTube, WhatsApp)
            </p>
          </div>
          <div>
            <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase" as const, display: "block", marginBottom: 12 }}>
              Content Niche
            </label>
            <select
              value={nicheIdx}
              onChange={(e) => setNicheIdx(Number(e.target.value))}
              style={{ width: "100%", fontFamily: "'Space Mono', monospace", fontSize: 12, padding: "14px 16px", border: "2px solid var(--mv-black)", outline: "none", appearance: "none" as const, cursor: "pointer" }}
            >
              {NICHES.map((n, i) => (
                <option key={i} value={i}>{n.label} — {(n.rate * 100).toFixed(1)}% conv rate</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: "2px solid var(--mv-black)" }} className="three-col-grid">
          <div style={{ padding: "40px 32px", borderRight: "1px solid var(--mv-n200)" }}>
            <p className="overline" style={{ marginBottom: 16 }}>Projected enrolments</p>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 48 }}>~{projectedSales}</div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--mv-n600)", marginTop: 8 }}>sales at {(niche.rate * 100).toFixed(1)}% conv rate</p>
          </div>
          <div style={{ padding: "40px 32px", borderRight: "1px solid var(--mv-n200)", background: "#fff8f0" }}>
            <p className="overline" style={{ marginBottom: 16, color: "var(--mv-accent)" }}>Your 30% earnings</p>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 48, color: "var(--mv-accent)" }}>
              ${partnerEarnings.toLocaleString("en-US", { maximumFractionDigits: 0 })}
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--mv-n600)", marginTop: 8 }}>
              ${COMMISSION_VALUE.toFixed(2)} × {projectedSales} sales
            </p>
          </div>
          <div style={{ padding: "40px 32px" }}>
            <p className="overline" style={{ marginBottom: 16 }}>To make course free</p>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 48 }}>{breakEvenSales}</div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--mv-n600)", marginTop: 8 }}>
              sales ({breakEvenPct}% of projection)
            </p>
          </div>
        </div>
        <p className="mono" style={{ fontSize: 9, color: "var(--mv-n400)", marginTop: 16, letterSpacing: "0.08em" }}>
          Estimate based on {(niche.rate * 100).toFixed(1)}% conversion rate · Not a guarantee of income.
        </p>
      </section>

      {/* ── How it works ── */}
      <section style={{ background: "var(--mv-n50)", padding: "100px 64px", borderBottom: "2px solid var(--mv-black)" }} className="section-pad-responsive">
        <span className="accent-rule lg" style={{ marginBottom: 20 }} />
        <h2 className="h-section" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", marginBottom: 48 }}>How the programme works</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", border: "2px solid var(--mv-black)" }} className="four-col-grid">
          {[
            { num: "01", title: "Enroll", body: "Buy The Blueprint at $97. You learn the protocol and get full course access." },
            { num: "02", title: "Get your links", body: "Instant access to the partner dashboard. Create affiliate links per platform or campaign." },
            { num: "03", title: "Launch", body: "Use the 14-day Story Launch Sequence and Monetisation Gameplan to promote to your audience." },
            { num: "04", title: "Earn 30%", body: "Every sale tracked in real time. $59.10 per enrolment, paid to your account." },
          ].map((step, i) => (
            <div key={i} style={{ padding: "40px 28px", borderRight: i < 3 ? "1px solid var(--mv-n200)" : "none", background: "#fff" }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 40, color: "var(--mv-n200)" }}>{step.num}</span>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 20, margin: "16px 0 12px" }}>{step.title}</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n600)", lineHeight: 1.7 }}>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── What partners get ── */}
      <section style={{ background: "#fff", padding: "100px 64px", borderBottom: "2px solid var(--mv-black)" }} className="section-pad-responsive">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }} className="two-col-grid">
          <div>
            <span className="accent-rule" style={{ marginBottom: 20 }} />
            <h2 className="h-section" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: 20 }}>Everything you need to launch</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: "var(--mv-n600)", lineHeight: 1.8 }}>
              The Blueprint includes the partner infrastructure. You're not starting from scratch — the scripts, the gameplan, and the dashboard are already built.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 0, border: "2px solid var(--mv-black)" }}>
            {[
              { title: "14-Day Story Launch Sequence", desc: "Done-for-you IG, X, and YouTube Shorts scripts for each day of your launch." },
              { title: "Monetisation Gameplan", desc: "AI-generated, audience-specific 6-part playbook tailored to your niche." },
              { title: "Partner Dashboard", desc: "Real-time clicks, conversions, and earnings. Updated hourly." },
              { title: "Custom Affiliate Links", desc: "Create unlimited links per platform, campaign, or content piece." },
              { title: "30% Lifetime Commission", desc: "On every sale you refer, forever. No cap, no expiry." },
            ].map((item, i) => (
              <div key={i} style={{ padding: "24px 28px", borderBottom: i < 4 ? "1px solid var(--mv-n200)" : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                  <div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{item.title}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--mv-n600)", lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, background: "var(--mv-accent)", color: "#000", padding: "2px 8px", letterSpacing: "0.1em", whiteSpace: "nowrap" as const, flexShrink: 0 }}>INCLUDED</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "var(--mv-black)", padding: "100px 64px", textAlign: "center" as const }} className="section-pad-responsive">
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 4rem)", color: "#fff", marginBottom: 16 }}>
          {user ? "Your affiliate link is active." : "Enroll. Then monetise."}
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: "var(--mv-n400)", maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.7 }}>
          {user
            ? "Share your link, track your conversions, and earn 30% on every sale — forever."
            : "Buy The Blueprint once. You learn the protocol and immediately get access to the affiliate engine. Four sales and your course pays for itself."}
        </p>
        {user ? (
          <Link href="/dashboard">
            <span className="btn orange" style={{ fontSize: 12, padding: "16px 32px" }}>Go to Dashboard →</span>
          </Link>
        ) : (
          <>
            <div className="display" style={{ fontSize: "clamp(4rem, 10vw, 8rem)", color: "var(--mv-accent)", marginBottom: 24 }}>$97</div>
            <Link href="/pricing">
              <span className="btn orange" style={{ fontSize: 12, padding: "16px 32px" }}>Enroll & Activate Partner Access →</span>
            </Link>
          </>
        )}
        <p className="mono" style={{ fontSize: 9, color: "var(--mv-n600)", letterSpacing: "0.1em", display: "block", marginTop: 20 }}>
          21-day conditional guarantee · $59.10 / sale · real-time dashboard
        </p>
      </section>

      <style>{`
        .stats-three-col { grid-template-columns: repeat(3, 1fr); }
        .two-col-grid { grid-template-columns: 1fr 1fr; }
        .three-col-grid { grid-template-columns: repeat(3, 1fr); }
        .four-col-grid { grid-template-columns: repeat(4, 1fr); }
        @media (max-width: 900px) {
          .two-col-grid, .four-col-grid { grid-template-columns: 1fr !important; }
          .three-col-grid, .stats-three-col { grid-template-columns: 1fr !important; }
        }
        .section-pad-responsive { padding: 100px 64px; }
        .section-pad-sm { padding: 40px 64px; }
        @media (max-width: 768px) {
          .section-pad-responsive { padding: 60px 20px !important; }
          .section-pad-sm { padding: 24px 20px !important; }
        }
      `}</style>
    </Layout>
  );
}
