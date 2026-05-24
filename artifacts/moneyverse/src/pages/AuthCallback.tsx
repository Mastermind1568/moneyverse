import { useEffect, useState, FormEvent } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";
import Layout from "@/components/Layout";

export default function AuthCallback() {
  const [, navigate] = useLocation();
  const [mode, setMode] = useState<"loading" | "recovery">("loading");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!supabase) { navigate("/login"); return; }

    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setMode("recovery");
      return;
    }

    async function init() {
      if (!supabase) { navigate("/login"); return; }

      if (hash.includes("access_token")) {
        const params = new URLSearchParams(hash.slice(1));
        const accessToken = params.get("access_token");
        const refreshToken = params.get("refresh_token");
        if (accessToken && refreshToken) {
          await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
        }
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/login"); return; }

      const { data: profile } = await supabase
        .from("profiles")
        .select("tier")
        .eq("id", session.user.id)
        .single();

      if (profile && profile.tier > 0) {
        navigate("/dashboard");
      } else {
        navigate("/pricing?signed_in=true");
      }
    }

    init();
  }, [navigate]);

  async function handleSetPassword(e: FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirm) { setError("Passwords don't match."); return; }
    setError("");
    setSaving(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }
    navigate("/dashboard");
  }

  if (mode === "recovery") {
    return (
      <Layout>
        <section style={{
          minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center",
          background: "#fff", padding: "80px 32px",
        }}>
          <div style={{ width: "100%", maxWidth: 440 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
              <div style={{ width: 14, height: 14, background: "var(--mv-accent)", flexShrink: 0 }} />
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 17, letterSpacing: "0.05em" }}>MONEYVERSE</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 6vw, 3rem)", marginBottom: 8, lineHeight: 1 }}>
              Set New Password
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n600)", marginBottom: 40, lineHeight: 1.6 }}>
              Choose a password for your Moneyverse account.
            </p>

            {error && (
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#ef4444", padding: "12px 16px", border: "1px solid #ef4444", marginBottom: 20 }}>
                {error}
              </p>
            )}

            <form onSubmit={handleSetPassword} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.12em", color: "var(--mv-n600)", marginBottom: 8 }}>NEW PASSWORD</p>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  required
                  autoComplete="new-password"
                  style={{
                    width: "100%", fontFamily: "'Space Mono', monospace", fontSize: 12, padding: "14px 16px",
                    border: "2px solid var(--mv-black)", outline: "none", boxSizing: "border-box" as const,
                  }}
                />
              </div>
              <div>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.12em", color: "var(--mv-n600)", marginBottom: 8 }}>CONFIRM PASSWORD</p>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Repeat password"
                  required
                  autoComplete="new-password"
                  style={{
                    width: "100%", fontFamily: "'Space Mono', monospace", fontSize: 12, padding: "14px 16px",
                    border: "2px solid var(--mv-black)", outline: "none", boxSizing: "border-box" as const,
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                style={{
                  width: "100%", fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.15em", padding: "18px 32px",
                  background: saving ? "var(--mv-n400)" : "var(--mv-black)",
                  color: "#fff", border: "none", cursor: saving ? "not-allowed" : "pointer", marginTop: 8,
                }}
              >
                {saving ? "SAVING..." : "SET PASSWORD →"}
              </button>
            </form>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#525252" }}>
      Signing you in...
    </div>
  );
}
