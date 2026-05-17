import { useState } from "react";
import { Link } from "wouter";
import { supabase } from "@/lib/supabase";
import Layout from "@/components/Layout";

export default function Register() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithGoogle() {
    if (!supabase) { setError("Authentication is not configured."); return; }
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) { setError(error.message); setLoading(false); }
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

          <div style={{ background: "var(--mv-accent)", padding: "12px 20px", marginBottom: 32 }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "#000" }}>
              ✓ PURCHASE CONFIRMED — ACTIVATE YOUR ACCESS BELOW
            </p>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 6vw, 3rem)", marginBottom: 8, lineHeight: 1 }}>
            Access Your Dashboard
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n600)", marginBottom: 40, lineHeight: 1.6 }}>
            Sign in with the Google account associated with your purchase email. Your access is already activated.
          </p>

          {error && (
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "var(--mv-red)", padding: "12px 16px", border: "1px solid var(--mv-red)", background: "#fff5f5", marginBottom: 16 }}>
              {error}
            </p>
          )}

          <button
            onClick={signInWithGoogle}
            disabled={loading}
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
              background: loading ? "var(--mv-n400)" : "var(--mv-black)",
              color: "#fff", fontFamily: "'Space Mono', monospace", fontSize: 11,
              fontWeight: 700, letterSpacing: "0.15em", padding: "18px 32px",
              border: "none", cursor: loading ? "not-allowed" : "pointer", transition: "background 0.15s",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {loading ? "REDIRECTING..." : "CONTINUE WITH GOOGLE →"}
          </button>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "var(--mv-n600)", marginTop: 20, textAlign: "center" as const }}>
            Use the Google account linked to your purchase email.{" "}
            <Link href="/login">
              <span style={{ color: "var(--mv-accent)", cursor: "pointer", fontWeight: 600 }}>Already signed in?</span>
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
