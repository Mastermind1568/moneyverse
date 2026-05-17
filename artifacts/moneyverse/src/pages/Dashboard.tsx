import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";

const MODULES = [
  { num: "01", slug: "fiat-trap", title: "The Fiat Trap", lessons: 6, duration: "38 min" },
  { num: "02", slug: "bitcoin-fundamentals", title: "Bitcoin Fundamentals", lessons: 8, duration: "54 min" },
  { num: "03", slug: "four-year-clock", title: "The 4-Year Clock", lessons: 7, duration: "48 min" },
  { num: "04", slug: "dca-protocol", title: "DCA Protocol", lessons: 6, duration: "42 min" },
  { num: "05", slug: "self-custody", title: "Self-Custody Masterclass", lessons: 9, duration: "1h 12m" },
  { num: "06", slug: "exit-architecture", title: "Exit Architecture", lessons: 7, duration: "52 min" },
  { num: "07", slug: "p2p-remittance", title: "P2P Trading & Remittance", lessons: 6, duration: "44 min" },
  { num: "08", slug: "african-sovereignty", title: "African Monetary Sovereignty", lessons: 5, duration: "36 min" },
  { num: "09", slug: "affiliate-engine", title: "The Affiliate Engine", lessons: 4, duration: "28 min" },
  { num: "10", slug: "activation-sequence", title: "The 21-Day Activation Sequence", lessons: 3, duration: "22 min" },
  { num: "11", slug: "community-protocol", title: "The Community Protocol", lessons: 2, duration: "17 min" },
];

const TOTAL_LESSONS = MODULES.reduce((s, m) => s + m.lessons, 0);

function getProgress(): Record<string, boolean[]> {
  try {
    return JSON.parse(localStorage.getItem("mv_progress") || "{}");
  } catch {
    return {};
  }
}

function saveProgress(p: Record<string, boolean[]>) {
  localStorage.setItem("mv_progress", JSON.stringify(p));
}

export default function Dashboard() {
  const { user, signOut, loading } = useAuth();
  const [, navigate] = useLocation();
  const [progress, setProgress] = useState<Record<string, boolean[]>>(getProgress);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <Layout>
        <section style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "var(--mv-n600)" }}>
            Loading...
          </p>
        </section>
      </Layout>
    );
  }

  const displayName = (user.user_metadata?.full_name as string) || user.email?.split("@")[0] || "Student";
  const referralCode = user.id.substring(0, 8).toUpperCase();
  const referralUrl = `https://moneyverse.network/?ref=${referralCode}`;

  const completedLessons = Object.values(progress).flat().filter(Boolean).length;
  const pct = Math.round((completedLessons / TOTAL_LESSONS) * 100);

  function toggleLesson(slug: string, idx: number) {
    setProgress((prev) => {
      const mod = [...(prev[slug] || Array(MODULES.find((m) => m.slug === slug)!.lessons).fill(false))];
      mod[idx] = !mod[idx];
      const next = { ...prev, [slug]: mod };
      saveProgress(next);
      return next;
    });
  }

  function copyReferral() {
    navigator.clipboard.writeText(referralUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const lastModule = MODULES.find((m) => (progress[m.slug] || []).some(Boolean));

  return (
    <Layout>
      {/* ── Header bar ── */}
      <section style={{ background: "var(--mv-black)", padding: "48px 64px", borderBottom: "2px solid #222" }} className="section-pad-responsive">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, flexWrap: "wrap" as const }}>
          <div>
            <p className="overline" style={{ color: "var(--mv-accent)", marginBottom: 12 }}>Student Dashboard</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#fff", lineHeight: 1, marginBottom: 8 }}>
              Welcome back,<br /><em style={{ color: "var(--mv-accent)" }}>{displayName}.</em>
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n600)" }}>{user.email}</p>
          </div>
          <button
            onClick={signOut}
            style={{
              fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.12em",
              background: "transparent", border: "1px solid #333", color: "var(--mv-n600)",
              padding: "10px 20px", cursor: "pointer",
            }}
          >
            SIGN OUT
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 40, maxWidth: 600 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "var(--mv-n600)", letterSpacing: "0.1em" }}>
              OVERALL PROGRESS
            </span>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "var(--mv-accent)", letterSpacing: "0.1em" }}>
              {completedLessons} / {TOTAL_LESSONS} LESSONS · {pct}%
            </span>
          </div>
          <div style={{ height: 3, background: "#222", width: "100%" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: "var(--mv-accent)", transition: "width 0.4s ease" }} />
          </div>
        </div>
      </section>

      {/* ── Continue + Referral ── */}
      <section style={{ background: "#fff", padding: "48px 64px", borderBottom: "2px solid var(--mv-black)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="two-col-grid section-pad-responsive">
        {/* Continue learning */}
        <div style={{ border: "2px solid var(--mv-black)", padding: "32px" }}>
          <p className="overline" style={{ marginBottom: 16 }}>
            {lastModule ? "Continue Where You Left Off" : "Start Here"}
          </p>
          {lastModule ? (
            <>
              <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 22, marginBottom: 8 }}>
                Module {lastModule.num}: {lastModule.title}
              </p>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "var(--mv-n600)", marginBottom: 20, letterSpacing: "0.1em" }}>
                {(progress[lastModule.slug] || []).filter(Boolean).length} / {lastModule.lessons} LESSONS DONE
              </p>
              <Link href={`/preview/${lastModule.slug}`}>
                <span className="btn orange sm">Continue →</span>
              </Link>
            </>
          ) : (
            <>
              <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 22, marginBottom: 8 }}>
                Module 01: The Fiat Trap
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n600)", marginBottom: 20, lineHeight: 1.6 }}>
                Start with the foundation — why your savings are losing value by design.
              </p>
              <Link href="/preview/fiat-trap">
                <span className="btn orange sm">Begin Module 01 →</span>
              </Link>
            </>
          )}
        </div>

        {/* Affiliate referral */}
        <div style={{ border: "2px solid var(--mv-black)", padding: "32px", background: "var(--mv-n50)" }}>
          <p className="overline" style={{ marginBottom: 16 }}>Your Affiliate Link</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n600)", marginBottom: 20, lineHeight: 1.6 }}>
            Earn 30% ($59.10) for every enrolment you refer. Share this link — every click is tracked.
          </p>
          <div style={{ display: "flex", gap: 0, marginBottom: 12 }}>
            <div style={{
              flex: 1, fontFamily: "'Space Mono', monospace", fontSize: 10,
              padding: "12px 14px", border: "2px solid var(--mv-black)", borderRight: "none",
              background: "#fff", color: "var(--mv-n600)", overflow: "hidden",
              textOverflow: "ellipsis", whiteSpace: "nowrap" as const, letterSpacing: "0.05em",
            }}>
              {referralUrl}
            </div>
            <button
              onClick={copyReferral}
              style={{
                fontFamily: "'Space Mono', monospace", fontSize: 9, fontWeight: 700,
                letterSpacing: "0.12em", padding: "0 18px",
                background: copied ? "var(--mv-accent)" : "var(--mv-black)",
                color: copied ? "#000" : "#fff",
                border: "2px solid var(--mv-black)", cursor: "pointer",
                transition: "all 0.15s", whiteSpace: "nowrap" as const,
              }}
            >
              {copied ? "COPIED ✓" : "COPY"}
            </button>
          </div>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n600)", letterSpacing: "0.1em" }}>
            REF CODE: {referralCode} · 30% COMMISSION PER SALE
          </p>
        </div>
      </section>

      {/* ── Curriculum ── */}
      <section style={{ background: "#fff", padding: "64px 64px", borderBottom: "2px solid var(--mv-black)" }} className="section-pad-responsive">
        <span className="accent-rule" style={{ marginBottom: 20 }} />
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(1.5rem, 4vw, 2.5rem)", marginBottom: 40 }}>
          The Blueprint — 11 Modules
        </h2>
        <div style={{ border: "2px solid var(--mv-black)" }}>
          {MODULES.map((mod, modIdx) => {
            const modProgress = progress[mod.slug] || Array(mod.lessons).fill(false);
            const done = modProgress.filter(Boolean).length;
            const modPct = Math.round((done / mod.lessons) * 100);
            const complete = done === mod.lessons;
            return (
              <ModuleRow
                key={mod.slug}
                mod={mod}
                modIdx={modIdx}
                modProgress={modProgress}
                done={done}
                modPct={modPct}
                complete={complete}
                onToggle={(i) => toggleLesson(mod.slug, i)}
              />
            );
          })}
        </div>
      </section>

      <style>{`
        .two-col-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 900px) { .two-col-grid { grid-template-columns: 1fr !important; } }
        .section-pad-responsive { padding: 64px; }
        @media (max-width: 768px) { .section-pad-responsive { padding: 40px 20px !important; } }
      `}</style>
    </Layout>
  );
}

function ModuleRow({
  mod, modIdx, modProgress, done, modPct, complete, onToggle,
}: {
  mod: typeof MODULES[0];
  modIdx: number;
  modProgress: boolean[];
  done: number;
  modPct: number;
  complete: boolean;
  onToggle: (i: number) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: modIdx < MODULES.length - 1 ? "1px solid var(--mv-n200)" : "none" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: 20,
          padding: "20px 28px", background: complete ? "#f0fff4" : "#fff",
          border: "none", cursor: "pointer", textAlign: "left" as const,
        }}
      >
        <span style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 28,
          color: complete ? "var(--mv-accent)" : "var(--mv-n200)", lineHeight: 1, minWidth: 48,
        }}>
          {mod.num}
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" as const }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 16 }}>{mod.title}</span>
            {complete && (
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, background: "var(--mv-accent)", color: "#000", padding: "2px 8px", letterSpacing: "0.1em" }}>COMPLETE</span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 6 }}>
            <div style={{ height: 2, width: 80, background: "var(--mv-n200)" }}>
              <div style={{ height: "100%", width: `${modPct}%`, background: complete ? "var(--mv-accent)" : "var(--mv-black)", transition: "width 0.3s ease" }} />
            </div>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n600)", letterSpacing: "0.08em" }}>
              {done}/{mod.lessons} · {mod.duration}
            </span>
          </div>
        </div>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "var(--mv-n600)", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
      </button>

      {open && (
        <div style={{ padding: "0 28px 20px 96px", display: "flex", flexDirection: "column" as const, gap: 8 }}>
          {Array.from({ length: mod.lessons }, (_, i) => (
            <label key={i} style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={!!modProgress[i]}
                onChange={() => onToggle(i)}
                style={{ width: 14, height: 14, accentColor: "var(--mv-accent)", cursor: "pointer" }}
              />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: modProgress[i] ? "var(--mv-n600)" : "var(--mv-black)", textDecoration: modProgress[i] ? "line-through" : "none" }}>
                Lesson {String(i + 1).padStart(2, "0")}
              </span>
            </label>
          ))}
          <div style={{ marginTop: 8 }}>
            <Link href={`/preview/${mod.slug}`}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-accent)", letterSpacing: "0.1em", cursor: "pointer" }}>
                VIEW MODULE PREVIEW →
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
