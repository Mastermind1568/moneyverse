import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";

const API_BASE = import.meta.env.VITE_API_BASE || "https://moneyverse.network";

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
      const res = await fetch(`${API_BASE}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Something went wrong. Please try again.");
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
            Check your inbox.
          </p>
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n400)", lineHeight: 1.7, marginBottom: 20 }}>
          Your guide is on its way. You'll also receive a 5-part email sequence on the fiat trap, the halving cycle, and how to build a real exit plan.
        </p>
        <Link href="/free-guide">
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: "var(--mv-accent)", cursor: "pointer" }}>
            Read it now at moneyverse.network/free-guide
          </span>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 520 }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n400)", marginBottom: 20, lineHeight: 1.7 }}>
        Get the free 17-page guide delivered to your inbox — plus a 5-part sequence on the fiat trap, the halving cycle, and the exact protocol for building an exit plan.
      </p>
      <div style={{ display: "flex", gap: 0, border: "1px solid var(--mv-n600)" }}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          disabled={status === "loading"}
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", padding: "14px 18px", fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#fff", minWidth: 0 }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn orange"
          style={{ fontSize: 11, padding: "14px 24px", flexShrink: 0, opacity: status === "loading" ? 0.6 : 1, cursor: status === "loading" ? "default" : "pointer" }}
        >
          {status === "loading" ? "Sending…" : "Send the Guide →"}
        </button>
      </div>
      {status === "error" && (
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#f87171", marginTop: 10, letterSpacing: "0.05em" }}>{errorMsg}</p>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 16, flexWrap: "wrap" as const }}>
        <p className="mono" style={{ fontSize: 9, color: "var(--mv-n600)", letterSpacing: "0.1em", margin: 0 }}>NO SPAM. UNSUBSCRIBE ANYTIME.</p>
        <Link href="/free-guide">
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-accent)", letterSpacing: "0.1em", cursor: "pointer" }}>OR READ IT NOW →</span>
        </Link>
      </div>
    </form>
  );
}

const MODULES_PREVIEW = [
  { num: "01", title: "The Fiat Trap", lessons: 6, duration: "38 min", desc: "Every fiat currency in history has failed. Understand the mechanism extracting value from your savings right now — and why no government can fix it from within." },
  { num: "02", title: "Bitcoin Fundamentals", lessons: 8, duration: "54 min", desc: "21 million coins. No central bank. No inflation schedule. Learn what makes Bitcoin categorically different from every asset you've been told to own." },
  { num: "03", title: "The 4-Year Clock", lessons: 7, duration: "48 min", desc: "The halving cycle is the most predictable pattern in financial markets. Learn to read it — and position yourself before it moves, not after." },
  { num: "04", title: "The DCA Protocol", lessons: 6, duration: "42 min", desc: "Emotion is the enemy of good accumulation. A systematic weekly protocol removes the guesswork and lets the cycle do the work for you." },
];

const TESTIMONIALS = [
  { quote: "The clearest articulation of cycle theory I have ever paid for. Every creator in this space should own it.", name: "B. Ofori", role: "Personal Finance Creator", followers: "84K" },
  { quote: "Eleven modules, zero hype, and a curriculum that makes everything else in this space look like noise.", name: "A. Hartmann", role: "Macro Strategy", followers: "38K" },
  { quote: "I bought it for the affiliate programme. I stayed for the Exit Architecture module. The 30 percent commission is just the bonus.", name: "K. Patel", role: "Real Estate", followers: "121K" },
];

function AccordionItem({ num, title, lessons, duration, desc }: typeof MODULES_PREVIEW[0]) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--mv-n200)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" as const }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 36, color: "var(--mv-n200)", lineHeight: 1, minWidth: 56 }}>{num}</span>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 18, color: "var(--mv-black)" }}>{title}</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "var(--mv-n400)", marginTop: 4 }}>{lessons} lessons · {duration}</div>
          </div>
        </div>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 20, color: "var(--mv-accent)", transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </button>
      {open && (
        <div style={{ padding: "0 0 20px 80px" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n600)", lineHeight: 1.7, maxWidth: 600 }}>{desc}</p>
          <Link href="/preview/fiat-trap">
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "var(--mv-accent)", letterSpacing: "0.12em", marginTop: 12, display: "inline-block" }}>▶ Preview Module</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Layout>

      {/* ── HERO ── */}
      {/* SB7: Open with the customer's desire. Name the problem. Give them a next step. */}
      <section style={{ background: "var(--mv-black)", minHeight: "100vh", display: "flex", flexDirection: "column" as const, justifyContent: "center", borderBottom: "2px solid #222", position: "relative" as const, overflow: "hidden" }}>
        <svg style={{ position: "absolute" as const, right: "-8%", top: "50%", transform: "translateY(-50%)", width: "55vw", height: "80vh", opacity: 0.055, pointerEvents: "none" }} viewBox="0 0 600 600" fill="none">
          {[0,1,2,3,4,5,6,7,8,9].map((i) => <circle key={i} cx="300" cy="300" r={60 + i * 45} stroke="#F59300" strokeWidth="1" fill="none" />)}
        </svg>

        <div style={{ position: "relative" as const, zIndex: 1 }} className="hero-pad">

          {/* Eyebrow — stakes setting */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 52 }}>
            <div style={{ width: 32, height: 2, background: "var(--mv-accent)" }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.2em", color: "var(--mv-n600)", textTransform: "uppercase" as const }}>
              The 2024 Bitcoin Halving Is Live · The Clock Is Running
            </span>
          </div>

          {/* Customer desire — leads before the brand name */}
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(1.1rem, 2.2vw, 1.8rem)", color: "var(--mv-n400)", lineHeight: 1.4, margin: "0 0 20px", maxWidth: "70vw" }}>
            Build generational wealth the fiat system can't touch.
          </p>

          {/* Brand mark — full, original treatment */}
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(4.5rem, 12vw, 14rem)", color: "#fff", lineHeight: 0.9, margin: "0 0 56px", letterSpacing: "-0.02em" }}>
            Money<br />
            <em style={{ color: "var(--mv-accent)", fontStyle: "italic" }}>verse</em>
          </h1>

          {/* Sub + CTAs */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "end" }} className="hero-sub-grid">
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(16px, 1.8vw, 22px)", color: "var(--mv-n400)", lineHeight: 1.75, margin: 0 }}>
              You've worked hard and saved responsibly your whole life. The naira, cedi, and shilling have quietly extracted a little more every year — without asking. That's not your failure. The money is broken. This is the 11-module protocol for building your way out.
            </p>
            <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "flex-start", gap: 16 }}>
              <Link href="/pricing">
                <span style={{ display: "inline-flex", alignItems: "center", gap: 12, fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 12, letterSpacing: "0.08em", background: "var(--mv-accent)", color: "#000", padding: "20px 40px", cursor: "pointer" }}>
                  Start The Blueprint · $97
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M11 1l4 4-4 4M15 5H1" stroke="#000" strokeWidth="1.5" strokeLinecap="square"/></svg>
                </span>
              </Link>
              <Link href="/free-guide">
                <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.1em", color: "var(--mv-n400)", cursor: "pointer", paddingTop: 4 }}>
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M4 6l3 3 3-3M1 11h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/></svg>
                  Download free 17-page guide — no purchase required
                </span>
              </Link>
            </div>
          </div>

          {/* Stats */}
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

      {/* ── STATS BAR ── */}
      <section style={{ borderBottom: "2px solid var(--mv-black)", background: "#fff" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)" }} className="stats-grid">
          {[
            { num: "11", label: "Core Modules" },
            { num: "85", label: "Video Lessons" },
            { num: "11h 43m", label: "Total Runtime" },
            { num: "Lifetime", label: "Access" },
            { num: "21 Days", label: "Money-Back Guarantee", orange: true },
          ].map((s, i) => (
            <div key={i} style={{ padding: "32px 24px", borderRight: i < 4 ? "1px solid var(--mv-n200)" : "none", textAlign: "center" as const }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 28, color: s.orange ? "var(--mv-accent)" : "var(--mv-black)" }}>{s.num}</div>
              <div className="overline" style={{ marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROBLEM — name the villain across all 3 levels ── */}
      <section style={{ borderBottom: "2px solid var(--mv-black)" }}>

        {/* Problem intro header */}
        <div style={{ background: "var(--mv-n50)", padding: "64px 64px 48px", borderBottom: "1px solid #e5e5e5" }} className="section-pad-sm">
          <span className="accent-rule lg" style={{ marginBottom: 20 }} />
          <p className="overline" style={{ marginBottom: 16 }}>The Problem</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 4.5vw, 4rem)", color: "var(--mv-black)", lineHeight: 1.05, maxWidth: 760 }}>
            The villain isn't your discipline.<br />It's the system you're playing in.
          </h2>
        </div>

        {/* External — the visible facts */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid #e5e5e5" }} className="two-col-grid">
          <div style={{ background: "var(--mv-black)", color: "#fff", padding: "100px 64px", borderRight: "2px solid #222" }}>
            <p className="overline" style={{ color: "var(--mv-accent)", marginBottom: 20 }}>External Problem</p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "#fff", lineHeight: 1.15, marginBottom: 28 }}>
              You're not bad with money.<br />The money is bad.
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "var(--mv-n400)", lineHeight: 1.85, marginBottom: 36 }}>
              You earned it. You saved it. You watched it. And somehow, it always stretched a little less than last year — rent up, groceries up, plans pushed back. That's not a discipline problem. That's currency depreciation: a slow, invisible tax on everyone who does the right thing.
            </p>
            <p className="mono" style={{ fontSize: 11, color: "var(--mv-n600)", borderLeft: "3px solid var(--mv-accent)", paddingLeft: 16, lineHeight: 1.8 }}>
              Average African currency depreciation vs USD since 2021: 47%
            </p>
          </div>
          <div style={{ background: "#fff", padding: "100px 64px" }}>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 0 }}>
              {[
                { stat: "The naira needs ₦1,580 today to buy what ₦410 bought in 2022.", sub: "That's 74% of your purchasing power. Gone. Not spent — extracted." },
                { stat: "Sending $200 home costs $14–28 in fees. Every single time.", sub: "That's 7–14% lost in transit before the money arrives. A tax on keeping your family afloat." },
                { stat: "93% of Bitcoin investors have no exit plan for the cycle peak.", sub: "They'll watch the price hit $150K and still not sell — because they never built a protocol." },
              ].map((item, i) => (
                <div key={i} style={{ padding: "32px 0", borderBottom: i < 2 ? "1px solid var(--mv-n200)" : "none" }}>
                  <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 36, color: "var(--mv-n200)", lineHeight: 1, minWidth: 44, flexShrink: 0 }}>0{i + 1}</span>
                    <div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, lineHeight: 1.6, color: "var(--mv-n800)", fontWeight: 600, marginBottom: 8 }}>{item.stat}</p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, lineHeight: 1.7, color: "var(--mv-n500)" }}>{item.sub}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Internal — the emotional truth */}
        <div style={{ background: "var(--mv-n50)", padding: "80px 64px", borderBottom: "1px solid #e5e5e5" }} className="section-pad-responsive">
          <div style={{ maxWidth: 1040, margin: "0 auto" }}>
            <p className="overline" style={{ marginBottom: 16 }}>Internal Problem</p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(1.6rem, 3vw, 2.8rem)", color: "var(--mv-black)", lineHeight: 1.15, marginBottom: 48 }}>
              The real damage isn't in your bank account.<br />It's in how it makes you feel.
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "2px solid var(--mv-black)" }} className="three-col-grid">
              {[
                {
                  feeling: "I feel like I'll miss the next Bitcoin cycle — again.",
                  context: "You watched BTC go from $8K to $69K. You weren't positioned. The 2024 halving already happened and the cycle is running. The window is now.",
                },
                {
                  feeling: "I feel like I'm doing everything right — and still falling behind.",
                  context: "Because you are. The system isn't broken by accident. It's designed to extract from people who save in fiat. That frustration is rational, not personal.",
                },
                {
                  feeling: "I feel like the right information is always just out of reach.",
                  context: "It exists — in English, for Western markets, designed for people who already have wealth. Moneyverse was built specifically for where you are.",
                },
              ].map((item, i) => (
                <div key={i} style={{ padding: "40px 36px", borderRight: i < 2 ? "1px solid var(--mv-n200)" : "none", background: "#fff" }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 18, color: "var(--mv-black)", lineHeight: 1.55, marginBottom: 20 }}>
                    &ldquo;{item.feeling}&rdquo;
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--mv-n500)", lineHeight: 1.75 }}>{item.context}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Philosophical — the injustice */}
        <div style={{ background: "var(--mv-black)", padding: "80px 64px" }} className="section-pad-responsive">
          <div style={{ maxWidth: 1040, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="two-col-grid">
            <div>
              <p className="overline" style={{ color: "var(--mv-accent)", marginBottom: 16 }}>Philosophical Problem</p>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "#fff", lineHeight: 1.15 }}>
                Hard work should build wealth — not watch it drain.
              </h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 28, paddingTop: 8 }}>
              {[
                "It's wrong that people who save responsibly are the ones who pay for bad monetary policy — through silent inflation they never voted for.",
                "It's wrong that financial sovereignty knowledge is available in English finance podcasts for Western audiences, but not built for Yoruba, Twi, or Swahili speakers.",
                "It's wrong that the African diaspora sends over $100 billion home every year and loses billions in remittance fees on every single transfer.",
              ].map((line, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <span style={{ width: 24, height: 2, background: "var(--mv-accent)", marginTop: 11, flexShrink: 0 }} />
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "var(--mv-n400)", lineHeight: 1.8 }}>{line}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GUIDE — Moneyverse as empathetic authority ── */}
      {/* SB7: The guide speaks first with empathy, then demonstrates authority. Never the other way. */}
      <section style={{ background: "#fff", borderBottom: "2px solid var(--mv-black)", padding: "100px 64px" }} className="section-pad-responsive">
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="two-col-grid">
            <div>
              <span className="accent-rule" style={{ marginBottom: 24 }} />
              <p className="overline" style={{ marginBottom: 16 }}>Meet Your Guide</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(1.8rem, 3.2vw, 3rem)", color: "var(--mv-black)", lineHeight: 1.1, marginBottom: 28 }}>
                We built Moneyverse because we lived this frustration — and found the exit.
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "var(--mv-n600)", lineHeight: 1.85, marginBottom: 20 }}>
                We know what it feels like to do everything right financially and still watch your savings erode. We know the frustration of discovering Bitcoin too late in the cycle — already up 400% before you understood what you were looking at. And we know how disorienting it is to find the right information in the wrong language, designed for the wrong context.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "var(--mv-n600)", lineHeight: 1.85 }}>
                Moneyverse was built to close that gap. A protocol designed specifically for the African and diaspora context — in plain language, with cold storage, DCA, and an exit plan built in from lesson one.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 0, border: "2px solid var(--mv-black)" }}>
              {[
                { num: "85", label: "Lessons — every protocol from fiat fundamentals to exit architecture, no prior knowledge required." },
                { num: "11", label: "Modules structured as a complete 21-day activation sequence. One step per day." },
                { num: "4", label: "Countries served — Nigeria, Ghana, Kenya, South Africa, and the global African diaspora." },
                { num: "30%", label: "Affiliate commission — the highest recurring rate in the financial education space." },
              ].map((s, i) => (
                <div key={i} style={{ padding: "28px 32px", borderBottom: i < 3 ? "1px solid var(--mv-n200)" : "none", display: "flex", gap: 24, alignItems: "center" }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 36, color: "var(--mv-accent)", minWidth: 60, flexShrink: 0 }}>{s.num}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--mv-n600)", lineHeight: 1.65 }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PLAN — 3 steps removes decision paralysis ── */}
      {/* SB7: People need to know exactly what to do next. A 3-step plan removes the friction of uncertainty. */}
      <section style={{ background: "var(--mv-black)", padding: "100px 64px", borderBottom: "2px solid #222" }} className="section-pad-responsive">
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <span className="accent-rule" style={{ marginBottom: 24 }} />
          <p className="overline" style={{ color: "var(--mv-accent)", marginBottom: 16 }}>The Protocol</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#fff", lineHeight: 1.05, marginBottom: 64 }}>
            Three steps.<br />One direction.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "1px solid #222" }} className="three-col-grid">
            {[
              {
                step: "01",
                title: "Understand why the system is failing you",
                body: "Learn how fiat currencies extract wealth from savers, why Bitcoin is a categorically different monetary asset, and how the 4-year halving cycle works — before the next one peaks.",
              },
              {
                step: "02",
                title: "Build your sovereignty protocol",
                body: "Set up cold storage so no exchange can lose your coins. Activate a DCA accumulation engine. Design your personal exit architecture — with specific price targets and a ladder selling plan.",
              },
              {
                step: "03",
                title: "Enter the cycle positioned, not reactive",
                body: "Execute with a pre-committed protocol, not emotion. Know exactly when to accumulate, when to hold, and when to execute your exit — before the euphoria makes it psychologically impossible.",
              },
            ].map((item, i) => (
              <div key={i} style={{ padding: "48px 40px", borderRight: i < 2 ? "1px solid #222" : "none" }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 56, color: "var(--mv-accent)", lineHeight: 1, display: "block", marginBottom: 24 }}>{item.step}</span>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 20, color: "#fff", marginBottom: 16, lineHeight: 1.25 }}>{item.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n500)", lineHeight: 1.8 }}>{item.body}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48 }}>
            <Link href="/pricing">
              <span style={{ display: "inline-flex", alignItems: "center", gap: 12, fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 11, letterSpacing: "0.08em", background: "var(--mv-accent)", color: "#000", padding: "18px 36px", cursor: "pointer" }}>
                Start the protocol · $97
                <svg width="14" height="9" viewBox="0 0 16 10" fill="none"><path d="M11 1l4 4-4 4M15 5H1" stroke="#000" strokeWidth="1.5" strokeLinecap="square"/></svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── THESIS — why Bitcoin specifically ── */}
      <section style={{ background: "#fff", padding: "120px 64px", borderBottom: "2px solid var(--mv-black)" }} className="section-pad-responsive">
        <span className="accent-rule lg" style={{ marginBottom: 20 }} />
        <p className="overline" style={{ marginBottom: 16 }}>Why Bitcoin — Not Crypto</p>
        <h2 className="h-section" style={{ fontSize: "clamp(2rem, 4vw, 4rem)", marginBottom: 16 }}>Not an investment.<br />An exit from the system.</h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "var(--mv-n600)", lineHeight: 1.8, maxWidth: 640, marginBottom: 64 }}>
          Bitcoin was not invented to make people rich. It was invented to solve a specific problem: how to create a monetary system that requires trusting no institution. That distinction changes everything.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: "2px solid var(--mv-black)" }} className="three-col-grid">
          {[
            {
              title: "Fixed Supply",
              body: "21 million. No government, no emergency session, no committee can create more. The supply schedule is enforced by mathematics running on thousands of independent computers worldwide — not by the good intentions of any institution.",
            },
            {
              title: "Self-Custody",
              body: "Your keys, your coins. When you hold Bitcoin in self-custody, no bank can freeze it, no government can seize it, and no exchange can lose it. True ownership — probably for the first time in your financial life.",
            },
            {
              title: "Borderless Value",
              body: "Send value across any border in 10 minutes for under $1. No SWIFT network. No 14% remittance fee. No capital controls. No asking a bank for permission to move money you already own.",
            },
          ].map((item, i) => (
            <div key={i} style={{ padding: "48px 40px", borderRight: i < 2 ? "1px solid var(--mv-n200)" : "none" }}>
              <span className="accent-rule" style={{ marginBottom: 24 }} />
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 24, marginBottom: 16 }}>{item.title}</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "var(--mv-n600)", lineHeight: 1.75 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── THREE PRODUCTS — the offer ── */}
      <section style={{ background: "var(--mv-black)", borderBottom: "2px solid #222" }}>
        <div style={{ padding: "80px 80px 48px", borderBottom: "1px solid #222" }} className="hero-pad">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap" as const, gap: 24 }}>
            <div>
              <span className="accent-rule" style={{ marginBottom: 20 }} />
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#fff", margin: 0 }}>
                Three ways in.<br />One direction out.
              </h2>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n500)", maxWidth: 400, lineHeight: 1.75, margin: 0 }}>
              Every tier includes the complete 11-module Blueprint. What separates them is how far you want to go — and how much support you want getting there.
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }} className="three-col-grid">
          {/* Tier 1 */}
          <div style={{ padding: "56px 48px 48px", borderRight: "1px solid #222", display: "flex", flexDirection: "column" as const }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "var(--mv-n600)", marginBottom: 20, textTransform: "uppercase" as const }}>Tier 01 · Self-Study</p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 28, color: "#fff", margin: "0 0 8px" }}>The Blueprint</h3>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 52, color: "#fff", lineHeight: 1, margin: "16px 0 4px" }}>$97</div>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n600)", letterSpacing: "0.12em", marginBottom: 32 }}>ONE-TIME · LIFETIME ACCESS</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 16, color: "var(--mv-n400)", lineHeight: 1.65, marginBottom: 36, flexGrow: 1 }}>
              The complete operating manual. Everything you need to understand fiat, position in Bitcoin, protect your coins, and execute your exit — at your own pace.
            </p>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 12, marginBottom: 40 }}>
              {["11 Core Modules · 85 Lessons", "Cold Storage Setup Protocol", "DCA Accumulation Engine", "Exit Architecture Framework", "21-Day Conditional Guarantee"].map((f) => (
                <div key={f} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--mv-n600)", marginTop: 1, flexShrink: 0 }}>—</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--mv-n400)", lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>
            <Link href="/pricing">
              <span style={{ display: "block", textAlign: "center" as const, fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", padding: "16px 24px", border: "1px solid #444", color: "#fff", cursor: "pointer" }}>GET THE BLUEPRINT →</span>
            </Link>
          </div>

          {/* Tier 2 — Most Popular */}
          <div style={{ padding: "56px 48px 48px", borderRight: "1px solid #222", background: "var(--mv-accent)", display: "flex", flexDirection: "column" as const, position: "relative" as const }}>
            <div style={{ position: "absolute" as const, top: 0, left: 0, right: 0, height: 4, background: "#000" }} />
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "rgba(0,0,0,0.5)", marginBottom: 20, textTransform: "uppercase" as const }}>Tier 02 · Most Popular</p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 28, color: "#000", margin: "0 0 8px" }}>Blueprint + Live</h3>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 52, color: "#000", lineHeight: 1, margin: "16px 0 4px" }}>$197</div>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "rgba(0,0,0,0.45)", letterSpacing: "0.12em", marginBottom: 32 }}>ONE-TIME · LIFETIME ACCESS</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 16, color: "rgba(0,0,0,0.7)", lineHeight: 1.65, marginBottom: 36, flexGrow: 1 }}>
              Everything in Blueprint, plus monthly live sessions to answer your questions in real time, a 5-day WhatsApp activation class, and a done-for-you affiliate launch sequence.
            </p>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 12, marginBottom: 40 }}>
              {["Everything in The Blueprint", "Monthly Live Tutorial Sessions", "5-Day WhatsApp Activation Class", "14-Day Story Launch Sequence", "AI Monetisation Gameplan"].map((f) => (
                <div key={f} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "rgba(0,0,0,0.4)", marginTop: 1, flexShrink: 0 }}>—</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(0,0,0,0.75)", lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>
            <Link href="/pricing">
              <span style={{ display: "block", textAlign: "center" as const, fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", padding: "16px 24px", background: "#000", color: "#fff", cursor: "pointer" }}>ENROLL NOW →</span>
            </Link>
          </div>

          {/* Tier 3 */}
          <div style={{ padding: "56px 48px 48px", display: "flex", flexDirection: "column" as const }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "var(--mv-n600)", marginBottom: 20, textTransform: "uppercase" as const }}>Tier 03 · Operator Level</p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 28, color: "#fff", margin: "0 0 8px" }}>Sovereign Stack</h3>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 52, color: "var(--mv-accent)", lineHeight: 1, margin: "16px 0 4px" }}>$997</div>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n600)", letterSpacing: "0.12em", marginBottom: 32 }}>ONE-TIME · LIFETIME ACCESS</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 16, color: "var(--mv-n400)", lineHeight: 1.65, marginBottom: 36, flexGrow: 1 }}>
              The full operator stack. Macro analysis, technical analysis, arbitrage playbook, cross-border payment infrastructure, and three private 1:1 strategy calls.
            </p>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 12, marginBottom: 40 }}>
              {["Everything in Blueprint + Live", "Macro Masterplan (DXY, Fed, M2)", "Technical Analysis Masterclass", "Arbitrage & Cross-Border Playbook", "3 × Private 1:1 Strategy Calls"].map((f) => (
                <div key={f} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--mv-accent)", marginTop: 1, flexShrink: 0 }}>—</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--mv-n400)", lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>
            <Link href="/pricing">
              <span style={{ display: "block", textAlign: "center" as const, fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", padding: "16px 24px", border: "1px solid var(--mv-accent)", color: "var(--mv-accent)", cursor: "pointer" }}>CLAIM THE SOVEREIGN STACK →</span>
            </Link>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #222", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: 16, padding: "24px 80px" }} className="hero-note-pad">
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n600)", letterSpacing: "0.12em" }}>
            ALL TIERS · ONE-TIME PAYMENT · NO SUBSCRIPTION · LIFETIME ACCESS · 21-DAY CONDITIONAL GUARANTEE
          </p>
          <Link href="/pricing">
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-accent)", letterSpacing: "0.12em", cursor: "pointer" }}>COMPARE ALL TIERS IN FULL →</span>
          </Link>
        </div>
      </section>

      {/* ── CURRICULUM PREVIEW ── */}
      <section style={{ background: "var(--mv-n50)", padding: "120px 64px", borderBottom: "2px solid var(--mv-black)" }} className="section-pad-responsive">
        <span className="accent-rule lg" style={{ marginBottom: 20 }} />
        <p className="overline" style={{ marginBottom: 16 }}>Inside The Blueprint</p>
        <h2 className="h-section" style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", marginBottom: 16 }}>Your 11-module exit plan.</h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "var(--mv-n600)", lineHeight: 1.8, maxWidth: 560, marginBottom: 64 }}>
          Every module builds on the last. By the end of the 21-day activation sequence, you have a working cold storage setup, an active DCA, and a pre-set exit strategy for the next cycle peak.
        </p>
        <div style={{ borderTop: "2px solid var(--mv-black)" }}>
          {MODULES_PREVIEW.map((m) => <AccordionItem key={m.num} {...m} />)}
        </div>
        <div style={{ marginTop: 40 }}>
          <Link href="/pricing">
            <span className="btn" style={{ fontSize: 12 }}>See all 11 modules →</span>
          </Link>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section style={{ background: "#fff", padding: "100px 64px", borderBottom: "2px solid var(--mv-black)" }} className="section-pad-responsive">
        <p className="overline" style={{ marginBottom: 48, textAlign: "center" as const }}>People who run the protocol</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "2px solid var(--mv-black)" }} className="three-col-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{ padding: "48px 40px", borderRight: i < 2 ? "1px solid var(--mv-n200)" : "none", background: i === 1 ? "var(--mv-black)" : "#fff" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 18, lineHeight: 1.6, color: i === 1 ? "#fff" : "var(--mv-black)", marginBottom: 32 }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, color: i === 1 ? "var(--mv-n400)" : "var(--mv-black)" }}>— {t.name}</p>
                <p className="overline" style={{ marginTop: 6, color: i === 1 ? "var(--mv-n600)" : undefined }}>{t.role} · {t.followers}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FREE GUIDE — transitional CTA ── */}
      {/* SB7: The transitional CTA captures people who aren't ready to buy. It's not a consolation prize — it's a funnel entry. */}
      <section style={{ background: "var(--mv-black)", padding: "100px 64px", borderBottom: "2px solid #222" }} className="section-pad-responsive">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="two-col-grid">
          <div>
            <span className="accent-rule" style={{ marginBottom: 24 }} />
            <p className="overline" style={{ color: "var(--mv-accent)", marginBottom: 16 }}>Free Guide — 17 Pages</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#fff", lineHeight: 1.05, marginBottom: 24 }}>
              Not ready to commit?<br />
              <em style={{ color: "var(--mv-accent)" }}>Start here. For free.</em>
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "var(--mv-n400)", lineHeight: 1.85, marginBottom: 32 }}>
              17 pages on why fiat currencies fail, how the 4-year Bitcoin halving cycle works, the exact five mistakes that cost most investors their position — and what to do instead. No email required. No purchase. Just the thesis.
            </p>
            <Link href="/free-guide">
              <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 10, letterSpacing: "0.1em", color: "#000", background: "#fff", padding: "16px 28px", cursor: "pointer" }}>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M4 6l3 3 3-3M1 11h12" stroke="#000" strokeWidth="1.5" strokeLinecap="square"/></svg>
                READ & DOWNLOAD FREE — NO EMAIL REQUIRED
              </span>
            </Link>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n700)", letterSpacing: "0.1em", marginTop: 12 }}>
              AVAILABLE AT MONEYVERSE.NETWORK/FREE-GUIDE
            </p>
          </div>
          <div style={{ borderLeft: "1px solid #222", paddingLeft: 64 }} className="guide-form-col">
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.15em", color: "var(--mv-n600)", marginBottom: 20, textTransform: "uppercase" as const }}>
              Or — get the guide delivered with the full email sequence
            </p>
            <LeadCaptureForm />
          </div>
        </div>
      </section>

      {/* ── FINAL CTA — failure + success stakes ── */}
      {/* SB7: Show the cost of inaction. Then show the life they want. Then give them the path. */}
      <section style={{ background: "var(--mv-black)", borderTop: "2px solid #222", position: "relative" as const, overflow: "hidden" }} className="hero-pad">
        <div style={{ position: "absolute" as const, right: "-10%", top: "50%", transform: "translateY(-50%)", width: "45vw", height: "45vw", borderRadius: "50%", background: "var(--mv-accent)", opacity: 0.04, pointerEvents: "none" }} />
        <div style={{ position: "relative" as const, zIndex: 1, maxWidth: 900 }}>
          <span className="accent-rule" style={{ marginBottom: 24 }} />
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.2em", color: "var(--mv-n600)", marginBottom: 48, textTransform: "uppercase" as const }}>The stakes</p>

          {/* Failure — what happens if they don't act */}
          <div style={{ marginBottom: 56, paddingBottom: 56, borderBottom: "1px solid #222" }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "var(--mv-n600)", marginBottom: 20, textTransform: "uppercase" as const }}>Without a protocol</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(1.8rem, 3.8vw, 4rem)", color: "var(--mv-n500)", lineHeight: 1.0, marginBottom: 24 }}>
              The 2028 halving will pass the same way<br />the 2020 one did — with you watching.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "var(--mv-n600)", lineHeight: 1.85, maxWidth: 680 }}>
              Bitcoin went from $8,000 to $69,000 in the last cycle. Most people found out when the price was already at the top — no position, no exit plan, no protocol. They watched. The 2024 halving has already happened. The cycle is live. The accumulation window is now.
            </p>
          </div>

          {/* Success — the life they want */}
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "var(--mv-accent)", marginBottom: 20, textTransform: "uppercase" as const }}>With the protocol</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)", color: "#fff", lineHeight: 0.95, marginBottom: 32 }}>
            Every week you wait,<br />someone else is accumulating<br />
            <em style={{ color: "var(--mv-accent)" }}>your exit.</em>
          </h2>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(16px, 1.6vw, 21px)", color: "var(--mv-n400)", maxWidth: 720, lineHeight: 1.8, marginBottom: 52 }}>
            The Blueprint exists so that when the next cycle peaks, you're the one with the cold storage, the DCA running, the exit orders pre-set — and generational wealth building in the background. Not watching from the sidelines while someone else accumulates your position.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" as const }}>
            <Link href="/pricing">
              <span style={{ display: "inline-flex", alignItems: "center", gap: 14, fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 12, letterSpacing: "0.08em", background: "var(--mv-accent)", color: "#000", padding: "22px 48px", cursor: "pointer" }}>
                Start The Blueprint · $97
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M11 1l4 4-4 4M15 5H1" stroke="#000" strokeWidth="1.5" strokeLinecap="square"/></svg>
              </span>
            </Link>
            <div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n600)", letterSpacing: "0.12em", lineHeight: 2 }}>
                ONE-TIME PAYMENT · LIFETIME ACCESS<br />21-DAY CONDITIONAL MONEY-BACK GUARANTEE
              </p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .hero-sub-grid { grid-template-columns: 1fr 1fr; }
        .stats-grid { grid-template-columns: repeat(5, 1fr); }
        .three-col-grid { grid-template-columns: repeat(3, 1fr); }
        .two-col-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 900px) {
          .two-col-grid, .hero-sub-grid { grid-template-columns: 1fr !important; }
          .three-col-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .guide-form-col { border-left: none !important; padding-left: 0 !important; border-top: 1px solid #222; padding-top: 40px !important; }
        }
        @media (max-width: 600px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        .section-pad-responsive { padding: 120px 64px; }
        .section-pad-sm { padding: 64px 64px 48px; }
        .hero-pad { padding: 120px 80px 80px; }
        .hero-note-pad { padding: 24px 80px; }
        @media (max-width: 768px) {
          .section-pad-responsive { padding: 60px 20px !important; }
          .section-pad-sm { padding: 40px 20px 32px !important; }
          .hero-pad { padding: 60px 20px 48px !important; }
          .hero-note-pad { padding: 20px 20px !important; }
        }
      `}</style>
    </Layout>
  );
}
