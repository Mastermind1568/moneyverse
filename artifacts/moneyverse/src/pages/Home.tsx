import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";

function LeadCaptureForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div style={{ maxWidth: 520 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <span style={{ color: "var(--mv-accent)", fontSize: 24 }}>✓</span>
          <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 22, color: "#fff", margin: 0 }}>
            You're in. Check your inbox.
          </p>
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n400)", lineHeight: 1.7 }}>
          Your free guide is on its way. You'll receive 5 emails over the next 10 days covering the fiat trap, the 4-year cycle, and the Blueprint.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 520 }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n400)", marginBottom: 20, lineHeight: 1.7 }}>
        Enter your email and get the free 16-page guide — plus a 5-part sequence on the fiat trap, the halving cycle, and how to build a real exit plan.
      </p>
      <div style={{ display: "flex", gap: 0, border: "1px solid var(--mv-n600)" }}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          disabled={status === "loading"}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            padding: "14px 18px",
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            color: "#fff",
            minWidth: 0,
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn orange"
          style={{
            fontSize: 11,
            padding: "14px 24px",
            flexShrink: 0,
            opacity: status === "loading" ? 0.6 : 1,
            cursor: status === "loading" ? "default" : "pointer",
          }}
        >
          {status === "loading" ? "Sending…" : "Get the Guide →"}
        </button>
      </div>
      {status === "error" && (
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#f87171", marginTop: 10, letterSpacing: "0.05em" }}>
          {errorMsg}
        </p>
      )}
      <p className="mono" style={{ fontSize: 9, color: "var(--mv-n600)", marginTop: 12, letterSpacing: "0.1em" }}>
        NO SPAM. UNSUBSCRIBE ANYTIME.
      </p>
    </form>
  );
}

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
      <section style={{ background: "var(--mv-black)", minHeight: "100vh", display: "flex", flexDirection: "column" as const, justifyContent: "center", borderBottom: "2px solid #222", position: "relative" as const, overflow: "hidden" }}>
        {/* Background concentric rings */}
        <svg style={{ position: "absolute" as const, right: "-8%", top: "50%", transform: "translateY(-50%)", width: "55vw", height: "80vh", opacity: 0.055, pointerEvents: "none" }} viewBox="0 0 600 600" fill="none">
          {[0,1,2,3,4,5,6,7,8,9].map((i) => <circle key={i} cx="300" cy="300" r={60 + i * 45} stroke="#F59300" strokeWidth="1" fill="none" />)}
        </svg>

        <div style={{ padding: "120px 80px 80px", position: "relative" as const, zIndex: 1 }} className="hero-pad">
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
            <div style={{ width: 32, height: 2, background: "var(--mv-accent)" }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.2em", color: "var(--mv-n600)", textTransform: "uppercase" as const }}>
              Bitcoin · Financial Sovereignty · Africa
            </span>
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(4.5rem, 12vw, 14rem)", color: "#fff", lineHeight: 0.9, margin: "0 0 56px", letterSpacing: "-0.02em" }}>
            Money<br />
            <em style={{ color: "var(--mv-accent)", fontStyle: "italic" }}>verse</em>
          </h1>

          {/* Sub + CTA row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "end" }} className="hero-sub-grid">
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(16px, 1.8vw, 22px)", color: "var(--mv-n400)", lineHeight: 1.7, margin: 0 }}>
              Your currency is being drained by design. Your bank is not protecting you. The next Bitcoin cycle is already running — and this is the only protocol built for where you actually live
            </p>

            <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "flex-start", gap: 20 }}>
              <Link href="/pricing">
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 12,
                  fontFamily: "'Space Mono', monospace", fontWeight: 700,
                  fontSize: 12, letterSpacing: "0.08em",
                  background: "var(--mv-accent)", color: "#000",
                  padding: "20px 40px", cursor: "pointer",
                  transition: "opacity 0.15s",
                }}>
                  Enroll in The Blueprint
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M11 1l4 4-4 4M15 5H1" stroke="#000" strokeWidth="1.5" strokeLinecap="square"/></svg>
                </span>
              </Link>
            </div>
          </div>

          {/* Bottom stats bar */}
          <div style={{ marginTop: 96, paddingTop: 40, borderTop: "1px solid #222", display: "flex", gap: 0, flexWrap: "wrap" as const }}>
            {[
              { num: "11", label: "Modules" },
              { num: "85", label: "Lessons" },
              { num: "11h 43m", label: "Runtime" },
              { num: "4", label: "Countries served" },
              { num: "30%", label: "Affiliate commission" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "0 48px 0 0", marginRight: 48, borderRight: i < 4 ? "1px solid #222" : "none" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 26, color: i === 4 ? "var(--mv-accent)" : "#fff" }}>{s.num}</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n600)", letterSpacing: "0.14em", marginTop: 6, textTransform: "uppercase" as const }}>{s.label}</div>
              </div>
            ))}
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

      {/* ── Three Products ── */}
      <section style={{ background: "var(--mv-black)", borderBottom: "2px solid #222" }}>
        {/* Header */}
        <div style={{ padding: "80px 80px 48px", borderBottom: "1px solid #222" }} className="hero-pad">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap" as const, gap: 24 }}>
            <div>
              <span className="accent-rule" style={{ marginBottom: 20 }} />
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#fff", margin: 0 }}>
                Three ways in — one direction
              </h2>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n500)", maxWidth: 420, lineHeight: 1.7, margin: 0 }}>
              Every tier includes the complete 11-module Blueprint. What separates them is how far you want to go — from stopping the currency leak, to running money across borders like a professional operator.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }} className="three-col-grid">

          {/* Tier 1 — Blueprint */}
          <div style={{ padding: "56px 48px 48px", borderRight: "1px solid #222", display: "flex", flexDirection: "column" as const, gap: 0 }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "var(--mv-n600)", marginBottom: 20, textTransform: "uppercase" as const }}>Tier 01</p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 28, color: "#fff", margin: "0 0 8px" }}>Blueprint</h3>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 52, color: "#fff", lineHeight: 1, margin: "16px 0 4px" }}>$97</div>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n600)", letterSpacing: "0.12em", marginBottom: 32 }}>ONE-TIME · LIFETIME ACCESS</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 16, color: "var(--mv-n400)", lineHeight: 1.6, marginBottom: 36, flexGrow: 1 }}>
              The complete operating manual. 11 modules covering the fiat trap, the halving cycle, cold storage, DCA, and your full exit plan.
            </p>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 12, marginBottom: 40 }}>
              {["11 Core Modules · 85 Lessons", "Cold Storage Protocol", "DCA Accumulation Engine", "Bitcoin Exit Plan Framework", "30-Day Conditional Guarantee"].map((f) => (
                <div key={f} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--mv-n600)", marginTop: 1, flexShrink: 0 }}>—</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--mv-n400)", lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>
            <Link href="/pricing">
              <span style={{ display: "block", textAlign: "center" as const, fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", padding: "16px 24px", border: "1px solid #444", color: "#fff", cursor: "pointer", transition: "border-color 0.15s" }}>
                GET THE BLUEPRINT →
              </span>
            </Link>
          </div>

          {/* Tier 2 — Blueprint + Live (most popular) */}
          <div style={{ padding: "56px 48px 48px", borderRight: "1px solid #222", background: "var(--mv-accent)", display: "flex", flexDirection: "column" as const, position: "relative" as const }}>
            <div style={{ position: "absolute" as const, top: 0, left: 0, right: 0, height: 4, background: "#000" }} />
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "rgba(0,0,0,0.5)", marginBottom: 20, textTransform: "uppercase" as const }}>Tier 02 · Most Popular</p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 28, color: "#000", margin: "0 0 8px" }}>Blueprint + Live</h3>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 52, color: "#000", lineHeight: 1, margin: "16px 0 4px" }}>$197</div>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "rgba(0,0,0,0.45)", letterSpacing: "0.12em", marginBottom: 32 }}>ONE-TIME · LIFETIME ACCESS</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 16, color: "rgba(0,0,0,0.7)", lineHeight: 1.6, marginBottom: 36, flexGrow: 1 }}>
              Everything in Blueprint, plus monthly live sessions, a 5-day WhatsApp activation class, and a done-for-you affiliate launch sequence.
            </p>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 12, marginBottom: 40 }}>
              {["Everything in Blueprint", "Monthly Live Tutorial Sessions", "5-Day WhatsApp Activation Class", "14-Day Story Launch Sequence", "AI Monetisation Gameplan"].map((f) => (
                <div key={f} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "rgba(0,0,0,0.4)", marginTop: 1, flexShrink: 0 }}>—</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(0,0,0,0.75)", lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>
            <Link href="/pricing">
              <span style={{ display: "block", textAlign: "center" as const, fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", padding: "16px 24px", background: "#000", color: "#fff", cursor: "pointer" }}>
                ENROLL NOW →
              </span>
            </Link>
          </div>

          {/* Tier 3 — Sovereign Stack */}
          <div style={{ padding: "56px 48px 48px", display: "flex", flexDirection: "column" as const }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "var(--mv-n600)", marginBottom: 20, textTransform: "uppercase" as const }}>Tier 03 · Operator Level</p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 28, color: "#fff", margin: "0 0 8px" }}>Sovereign Stack</h3>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 52, color: "var(--mv-accent)", lineHeight: 1, margin: "16px 0 4px" }}>$997</div>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n600)", letterSpacing: "0.12em", marginBottom: 32 }}>ONE-TIME · LIFETIME ACCESS</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 16, color: "var(--mv-n400)", lineHeight: 1.6, marginBottom: 36, flexGrow: 1 }}>
              The full operator stack. Macro analysis, technical analysis, arbitrage playbook, cross-border payments, and 3 private 1:1 calls.
            </p>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 12, marginBottom: 40 }}>
              {["Everything in Blueprint + Live", "Macro Masterplan (DXY, Fed, M2)", "Technical Analysis Masterclass", "Arbitrage & Cross-Border Playbook", "3 × Private 1:1 Calls"].map((f) => (
                <div key={f} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--mv-accent)", marginTop: 1, flexShrink: 0 }}>—</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--mv-n400)", lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>
            <Link href="/pricing">
              <span style={{ display: "block", textAlign: "center" as const, fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", padding: "16px 24px", border: "1px solid var(--mv-accent)", color: "var(--mv-accent)", cursor: "pointer" }}>
                CLAIM THE SOVEREIGN STACK →
              </span>
            </Link>
          </div>
        </div>

        {/* Footer note */}
        <div style={{ padding: "24px 80px", borderTop: "1px solid #222", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: 16 }} className="hero-pad">
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n600)", letterSpacing: "0.12em" }}>
            ALL TIERS · ONE-TIME PAYMENT · NO SUBSCRIPTION · LIFETIME ACCESS · 30-DAY CONDITIONAL GUARANTEE
          </p>
          <Link href="/pricing">
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-accent)", letterSpacing: "0.12em", cursor: "pointer" }}>COMPARE ALL TIERS IN FULL →</span>
          </Link>
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
        <h2 className="h-section" style={{ fontSize: "clamp(2rem, 4vw, 4rem)", marginBottom: 64 }}>Not an investment<br />An exit</h2>
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
        <h2 className="h-section" style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", marginBottom: 64 }}>What's inside</h2>
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

      {/* ── Lead Capture ── */}
      <section style={{ background: "var(--mv-black)", padding: "100px 64px", borderBottom: "2px solid #222" }} className="section-pad-responsive">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="two-col-grid">
          <div>
            <span className="accent-rule" style={{ marginBottom: 24 }} />
            <p className="overline" style={{ color: "var(--mv-accent)", marginBottom: 16 }}>Free Guide</p>
            <h2 className="h-section" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#fff", marginBottom: 20 }}>
              Start here.<br />It's free.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "var(--mv-n400)", lineHeight: 1.8 }}>
              16 pages on why fiat currencies fail and how the 4-year Bitcoin cycle works. No purchase required.
            </p>
          </div>
          <div>
            <LeadCaptureForm />
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ background: "var(--mv-black)", padding: "120px 80px", borderTop: "2px solid #222", position: "relative" as const, overflow: "hidden" }} className="hero-pad">
        <div style={{ position: "absolute" as const, right: "-10%", top: "50%", transform: "translateY(-50%)", width: "45vw", height: "45vw", borderRadius: "50%", background: "var(--mv-accent)", opacity: 0.04, pointerEvents: "none" }} />
        <div style={{ position: "relative" as const, zIndex: 1, maxWidth: 860 }}>
          <span className="accent-rule" style={{ marginBottom: 24 }} />
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.2em", color: "var(--mv-n600)", marginBottom: 32, textTransform: "uppercase" as const }}>The clock is already running</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)", color: "#fff", lineHeight: 0.95, marginBottom: 40 }}>
            Every week you wait,<br />
            someone else is accumulating<br />
            <em style={{ color: "var(--mv-accent)" }}>your exit</em>
          </h2>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(16px, 1.6vw, 21px)", color: "var(--mv-n400)", maxWidth: 700, lineHeight: 1.8, marginBottom: 52 }}>
            The last halving cycle turned $1,000 into $30,000 for people who had a protocol. Most found out when the price was already at $69K. The Blueprint exists so that doesn't happen to you again.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" as const }}>
            <Link href="/pricing">
              <span style={{ display: "inline-flex", alignItems: "center", gap: 14, fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 12, letterSpacing: "0.08em", background: "var(--mv-accent)", color: "#000", padding: "22px 48px", cursor: "pointer" }}>
                Start The Blueprint · $97
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M11 1l4 4-4 4M15 5H1" stroke="#000" strokeWidth="1.5" strokeLinecap="square"/></svg>
              </span>
            </Link>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n600)", letterSpacing: "0.12em", lineHeight: 2 }}>
              ONE-TIME · LIFETIME ACCESS<br />30-DAY CONDITIONAL GUARANTEE
            </p>
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
