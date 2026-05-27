import { Link } from "wouter";
import Layout from "@/components/Layout";

export default function Cancel() {
  return (
    <Layout>
      <section style={{
        background: "#fff", minHeight: "80vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column" as const, textAlign: "center" as const, padding: "80px 32px",
        borderBottom: "2px solid var(--mv-black)",
      }}>
        <span className="accent-rule lg" style={{ marginBottom: 40 }} />
        <h1 className="h-section" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", marginBottom: 24 }}>
          No pressure.
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, color: "var(--mv-n600)", maxWidth: 480, lineHeight: 1.8, marginBottom: 40 }}>
          Your spot is still available. If you have questions before you decide, email us at{" "}
          <a href="mailto:hello@moneyverse.network" style={{ color: "var(--mv-accent)" }}>hello@moneyverse.network</a>.{" "}
          We respond within 24 hours.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const, justifyContent: "center" }}>
          <Link href="/pricing">
            <span className="btn orange" style={{ fontSize: 12, padding: "14px 28px" }}>Return to Pricing →</span>
          </Link>
          <a href="mailto:hello@moneyverse.network">
            <span className="btn" style={{ fontSize: 12, padding: "14px 28px" }}>Talk to us →</span>
          </a>
        </div>
      </section>
    </Layout>
  );
}
