import { useState } from "react";
import { Link, useLocation } from "wouter";
import { supabase } from "@/lib/supabase";
import Layout from "@/components/Layout";

export default function Register() {
  const [, navigate] = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) {
      setError("Authentication is not configured yet.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });
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

          <div style={{ background: "var(--mv-accent)", padding: "12px 20px", marginBottom: 32 }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "#000" }}>
              ✓ PURCHASE CONFIRMED — CREATE YOUR ACCOUNT BELOW
            </p>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 6vw, 3rem)", marginBottom: 8, lineHeight: 1 }}>
            Create Your Account
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n600)", marginBottom: 40, lineHeight: 1.6 }}>
            Set up your student account to access The Blueprint. This is a one-time setup.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase" as const, display: "block", marginBottom: 8 }}>
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase" as const, display: "block", marginBottom: 8 }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                style={inputStyle}
              />
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "var(--mv-n600)", marginTop: 6 }}>
                Use the same email you purchased with.
              </p>
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
                autoComplete="new-password"
                style={inputStyle}
              />
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "var(--mv-n600)", marginTop: 6 }}>
                Minimum 8 characters.
              </p>
            </div>

            <div>
              <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase" as const, display: "block", marginBottom: 8 }}>
                Confirm Password
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                autoComplete="new-password"
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
                width: "100%", background: loading ? "var(--mv-n400)" : "var(--mv-accent)",
                color: "#000", fontFamily: "'Space Mono', monospace", fontSize: 11,
                fontWeight: 700, letterSpacing: "0.15em", padding: "18px 32px",
                border: "none", cursor: loading ? "not-allowed" : "pointer",
                transition: "background 0.15s",
              }}
            >
              {loading ? "CREATING ACCOUNT..." : "ACTIVATE MY ACCESS →"}
            </button>
          </form>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "var(--mv-n600)", marginTop: 24, textAlign: "center" as const }}>
            Already have an account?{" "}
            <Link href="/login">
              <span style={{ color: "var(--mv-accent)", cursor: "pointer", fontWeight: 600 }}>Sign in →</span>
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
