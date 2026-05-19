import { Link } from "wouter";
import Layout from "@/components/Layout";

export default function Register() {
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
              ✓ PURCHASE CONFIRMED — CHECK YOUR EMAIL
            </p>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 6vw, 3rem)", marginBottom: 16, lineHeight: 1 }}>
            Check your inbox.
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "var(--mv-n600)", marginBottom: 16, lineHeight: 1.7 }}>
            We've sent an account activation link to the email you used at checkout. Click it to set your password and access your dashboard.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--mv-n600)", marginBottom: 40, lineHeight: 1.7 }}>
            Can't find it? Check your spam folder or email{" "}
            <a href="mailto:support@moneyverse.network" style={{ color: "var(--mv-accent)", fontWeight: 600 }}>support@moneyverse.network</a>.
          </p>

          <Link href="/login">
            <span style={{
              display: "block", width: "100%", textAlign: "center" as const,
              fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700,
              letterSpacing: "0.15em", padding: "18px 32px",
              background: "var(--mv-black)", color: "#fff",
              border: "none", cursor: "pointer", boxSizing: "border-box" as const,
            }}>
              SIGN IN TO DASHBOARD →
            </span>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
