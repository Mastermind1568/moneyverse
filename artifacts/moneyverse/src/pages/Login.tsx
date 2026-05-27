import { useState, FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { supabase } from "@/lib/supabase";
import Layout from "@/components/Layout";

type Mode = "signin" | "forgot";

export default function Login() {
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [, navigate] = useLocation();

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();
    if (!supabase) { setError("Authentication is not configured."); return; }
    setError("");
    setLoading(true);
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }
    const { data: profile } = await supabase
      .from("profiles")
      .select("tier")
      .eq("id", data.user.id)
      .single();
    if (profile && profile.tier > 0) {
      navigate("/dashboard");
    } else {
      navigate("/pricing?signed_in=true");
    }
  }

  async function handleForgot(e: FormEvent) {
    e.preventDefault();
    if (!supabase) { setError("Authentication is not configured."); return; }
    setError("");
    setLoading(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback`,
    });
    setLoading(false);
    if (resetError) {
      setError(resetError.message);
    } else {
      setInfo("Check your inbox. We've sent a reset link.");
    }
  }

  return (
    <Layout>
      <section style={{
        minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "#fff", padding: "80px 32px",
      }}>
        <div style={{ width: "100%", maxWidth: 440 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
            <div style={{ width: 14, height: 14, background: "var(--mv-accent)", flexShrink: 0 }} />
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 17, letterSpacing: "0.05em" }}>
              MONEYVERSE
            </span>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 6vw, 3rem)", marginBottom: 8, lineHeight: 1 }}>
            Student Login
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n600)", marginBottom: 40, lineHeight: 1.6 }}>
            {mode === "signin" ? (
              <>This area is for enrolled students only. Not yet enrolled?{" "}
              <Link href="/pricing">
                <span style={{ color: "var(--mv-accent)", cursor: "pointer", fontWeight: 600 }}>Access The Blueprint →</span>
              </Link></>
            ) : "Enter your email to receive a password reset link."}
          </p>

          {error && (
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#ef4444", padding: "12px 16px", border: "1px solid #ef4444", marginBottom: 20 }}>
              {error}
            </p>
          )}
          {info && (
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#22c55e", padding: "12px 16px", border: "1px solid #22c55e", marginBottom: 20 }}>
              {info}
            </p>
          )}

          {mode === "signin" ? (
            <form onSubmit={handleSignIn} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.12em", color: "var(--mv-n600)", marginBottom: 8 }}>EMAIL</p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  required
                  autoComplete="email"
                  style={{
                    width: "100%", fontFamily: "'Space Mono', monospace", fontSize: 12, padding: "14px 16px",
                    border: "2px solid var(--mv-black)", outline: "none", boxSizing: "border-box" as const,
                  }}
                />
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.12em", color: "var(--mv-n600)", margin: 0 }}>PASSWORD</p>
                  <button
                    type="button"
                    onClick={() => { setMode("forgot"); setError(""); setInfo(""); }}
                    style={{ background: "none", border: "none", fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n600)", cursor: "pointer", letterSpacing: "0.1em", padding: 0 }}
                  >
                    FORGOT?
                  </button>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  style={{
                    width: "100%", fontFamily: "'Space Mono', monospace", fontSize: 12, padding: "14px 16px",
                    border: "2px solid var(--mv-black)", outline: "none", boxSizing: "border-box" as const,
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%", fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.15em", padding: "18px 32px", background: loading ? "var(--mv-n400)" : "var(--mv-black)",
                  color: "#fff", border: "none", cursor: loading ? "not-allowed" : "pointer", marginTop: 8,
                }}
              >
                {loading ? "SIGNING IN..." : "SIGN IN →"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleForgot} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.12em", color: "var(--mv-n600)", marginBottom: 8 }}>EMAIL</p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  required
                  autoComplete="email"
                  style={{
                    width: "100%", fontFamily: "'Space Mono', monospace", fontSize: 12, padding: "14px 16px",
                    border: "2px solid var(--mv-black)", outline: "none", boxSizing: "border-box" as const,
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !!info}
                style={{
                  width: "100%", fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.15em", padding: "18px 32px",
                  background: info ? "#22c55e" : loading ? "var(--mv-n400)" : "var(--mv-black)",
                  color: "#fff", border: "none", cursor: (loading || !!info) ? "not-allowed" : "pointer", marginTop: 8,
                }}
              >
                {loading ? "SENDING..." : info ? "EMAIL SENT ✓" : "SEND RESET LINK →"}
              </button>
              <button
                type="button"
                onClick={() => { setMode("signin"); setError(""); setInfo(""); }}
                style={{ background: "none", border: "none", fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n600)", cursor: "pointer", letterSpacing: "0.1em", marginTop: -8 }}
              >
                ← BACK TO SIGN IN
              </button>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
}
