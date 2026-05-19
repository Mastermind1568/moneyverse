import { Link } from "wouter";
import Layout from "@/components/Layout";

export default function Success() {
  return (
    <Layout>
      <section style={{
        background: "var(--mv-black)", minHeight: "80vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column" as const, textAlign: "center" as const, padding: "80px 32px",
      }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 120, color: "var(--mv-accent)", lineHeight: 1, marginBottom: 32 }}>✓</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(3rem, 8vw, 7rem)", color: "#fff", marginBottom: 24, letterSpacing: "-0.04em", lineHeight: 0.9 }}>
          You're in.
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, color: "var(--mv-n400)", maxWidth: 480, lineHeight: 1.8, marginBottom: 16 }}>
          Payment confirmed. Check your email — we've sent your account activation link. Click it to set your password and access your dashboard.
        </p>
        <p className="mono" style={{ fontSize: 10, color: "var(--mv-n600)", letterSpacing: "0.15em", marginBottom: 48 }}>
          ACTIVATION EMAIL SENT · support@moneyverse.network
        </p>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 16, alignItems: "center" }}>
          <Link href="/login">
            <span className="btn orange" style={{ fontSize: 12, padding: "16px 36px" }}>
              Already activated? Sign In →
            </span>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
