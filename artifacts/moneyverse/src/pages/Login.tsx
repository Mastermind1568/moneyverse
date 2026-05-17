import { useState } from "react";
import { Link, useLocation } from "wouter";
import { supabase } from "@/lib/supabase";
import Layout from "@/components/Layout";

export default function Login() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) {
      setError("Authentication is not configured yet.");
      return;
    }
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      navigate("/dashboard");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", fontFamily: "'Space Mono', monospace", fontSize: 13,
    padding: "14px 16px", border: "2px solid var(--mv-black)", background: "#fff",
    outline: "none", boxSizing: "border-box",
  };

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
            This area is for enrolled students only. Not yet enrolled?{" "}
            <Link href="/pricing">
              <span style={{ color: "var(--mv-accent)", cursor: "pointer", fontWeight: 600 }}>Access The Blueprint →</span>
            </Link>
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase" as const, display: "block", marginBottom: 8 }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase" as const, display: "block", marginBottom: 8 }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                style={inputStyle}
              />
            </div>

            {error && (
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "var(--mv-red)", padding: "12px 16px", border: "1px solid var(--mv-red)", background: "#fff5f5" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", background: loading ? "var(--mv-n400)" : "var(--mv-black)",
                color: "#fff", fontFamily: "'Space Mono', monospace", fontSize: 11,
                fontWeight: 700, letterSpacing: "0.15em", padding: "18px 32px",
                border: "none", cursor: loading ? "not-allowed" : "pointer",
                transition: "background 0.15s",
              }}
            >
              {loading ? "SIGNING IN..." : "SIGN IN →"}
            </button>
          </form>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "var(--mv-n600)", marginTop: 24, textAlign: "center" as const }}>
            Just purchased?{" "}
            <Link href="/register">
              <span style={{ color: "var(--mv-accent)", cursor: "pointer", fontWeight: 600 }}>Create your account →</span>
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
