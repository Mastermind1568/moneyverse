import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";

const PLATFORMS = [
  {
    name: "Yellow Card",
    tagline: "Africa's largest crypto exchange. Buy with mobile money or bank transfer.",
    difficulty: "Easiest",
    fee: "~1–2% per purchase",
    payMethods: "Mobile money, bank transfer, MTN, Airtel",
    minBuy: "$1",
    highlight: "Built for Africa. Buy Bitcoin with Naira, Cedis, Shillings, or Rand. No dollar card needed.",
    guideUrl: "https://yellowcard.io/how-to-buy-bitcoin",
    siteUrl: "https://yellowcard.io",
    initial: "Y",
  },
  {
    name: "Coinbase",
    tagline: "Most beginner-friendly. Trusted by 100M+ users.",
    difficulty: "Easiest",
    fee: "~1.49% per purchase",
    payMethods: "Bank transfer, debit/credit card, PayPal",
    minBuy: "$2",
    highlight: "Best for first-time buyers. Clean app, step-by-step setup. Buy and send in minutes.",
    guideUrl: "https://www.coinbase.com/how-to-buy/bitcoin",
    siteUrl: "https://www.coinbase.com",
    initial: "C",
  },
  {
    name: "Binance P2P",
    tagline: "Buy Bitcoin directly from sellers in your local currency.",
    difficulty: "Easy",
    fee: "0% trading fee (P2P)",
    payMethods: "Bank transfer, mobile money, any local method",
    minBuy: "Varies by seller",
    highlight: "Zero fees. Pay in NGN, GHS, KES, ZAR, or any local currency. Widest selection of payment methods on the continent.",
    guideUrl: "https://www.binance.com/en/p2p",
    siteUrl: "https://www.binance.com",
    initial: "B",
  },
  {
    name: "Kraken",
    tagline: "Trusted since 2011. Low fees, 24/7 human support.",
    difficulty: "Easy",
    fee: "~0.9% per purchase",
    payMethods: "Bank wire, debit/credit card, Apple Pay, Google Pay",
    minBuy: "$10",
    highlight: "Lowest fees of the platforms listed. Ideal if you're buying a larger amount with a card.",
    guideUrl: "https://www.kraken.com/learn/buy-bitcoin-btc",
    siteUrl: "https://www.kraken.com",
    initial: "K",
  },
  {
    name: "Cash App",
    tagline: "Buy Bitcoin in under 60 seconds. No crypto knowledge needed.",
    difficulty: "Easiest",
    fee: "~1.76% per purchase",
    payMethods: "Cash App balance, debit card, bank transfer",
    minBuy: "$1",
    highlight: "Already have Cash App? Tap Money → Bitcoin. Done in under a minute. (US & UK users.)",
    guideUrl: "https://cash.app/bitcoin",
    siteUrl: "https://cash.app",
    initial: "$",
  },
];

const FAQS = [
  {
    q: "Do I need a full Bitcoin to pay?",
    a: "No. Bitcoin is divisible into 100 million units called satoshis. You buy exactly the dollar amount you need — $97, $197, or $997 worth of BTC. The platform converts it automatically.",
  },
  {
    q: "How long does a Bitcoin payment take?",
    a: "BTCPay Server detects your payment as soon as it hits the network — usually within 1–3 minutes. Full confirmation takes 10–30 minutes. Your access is granted automatically once confirmed.",
  },
  {
    q: "What if I send the wrong amount?",
    a: "The BTCPay invoice shows the exact BTC amount to send based on the live exchange rate. Send exactly what the invoice shows. If there's an issue, email hello@moneyverse.network immediately.",
  },
  {
    q: "Is the wallet address the same every time?",
    a: "No — BTCPay generates a unique address for each invoice. Always use the address shown on your active invoice. Never reuse an address from a previous session.",
  },
  {
    q: "I'm new to Bitcoin. Which platform should I start with?",
    a: "If you're in Africa, start with Yellow Card — it accepts local currencies directly. Outside Africa, Coinbase is the simplest option. Both have full step-by-step guides linked above.",
  },
  {
    q: "Can I pay with Bitcoin I already hold in self-custody?",
    a: "Yes. When you click 'Pay with Bitcoin' on the pricing page, you'll receive a wallet address and exact amount. Send from any wallet — Ledger, Trezor, BlueWallet, or any exchange.",
  },
];

export default function HowToBuyBitcoin() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      {/* ── Hero ── */}
      <section style={{ background: "var(--mv-black)", padding: "100px 64px", borderBottom: "2px solid #222" }} className="btc-pad">
        <div style={{ maxWidth: 720 }}>
          <span style={{
            display: "inline-block", fontFamily: "'Space Mono', monospace", fontSize: 9,
            fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const,
            color: "var(--mv-n600)", border: "1px solid #333", padding: "4px 12px", marginBottom: 28,
          }}>
            Bitcoin Payment Guide
          </span>
          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 900,
            fontSize: "clamp(3.5rem, 10vw, 9rem)", color: "#fff",
            lineHeight: 0.9, letterSpacing: "-0.04em", marginBottom: 36,
          }}>
            How to Buy<br /><em style={{ color: "var(--mv-accent)" }}>Bitcoin</em>
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: 18, color: "var(--mv-n400)",
            lineHeight: 1.8, maxWidth: 580, marginBottom: 40,
          }}>
            Never bought Bitcoin before? No problem. From zero to payment confirmed in under 15 minutes — even if you've never touched crypto.
          </p>
          <a href="#platforms" style={{
            display: "inline-block", fontFamily: "'Space Mono', monospace", fontSize: 10,
            letterSpacing: "0.12em", textTransform: "uppercase" as const,
            background: "var(--mv-accent)", color: "#000", fontWeight: 700,
            padding: "16px 32px", textDecoration: "none",
          }}>
            Choose a Platform →
          </a>
        </div>
      </section>

      {/* ── 3 Steps ── */}
      <section style={{ background: "#fff", padding: "100px 64px", borderBottom: "2px solid var(--mv-black)" }} className="btc-pad">
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <span className="accent-rule lg" style={{ marginBottom: 24 }} />
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 900,
            fontSize: "clamp(2rem, 4vw, 4rem)", marginBottom: 16, letterSpacing: "-0.03em",
          }}>
            The 3-Step Process
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "var(--mv-n600)", lineHeight: 1.7, marginBottom: 64 }}>
            From zero Bitcoin to payment confirmed — typically under 15 minutes.
          </p>

          <div style={{ display: "flex", flexDirection: "column" as const, gap: 0 }}>
            {[
              {
                num: "01",
                title: "Buy Bitcoin on any platform below",
                body: "Choose one of the platforms on this page — all are beginner-friendly. Create a free account, verify your identity (2–5 minutes), then purchase the exact USD amount of your chosen Blueprint tier in Bitcoin. The platform converts your local currency to BTC automatically.",
                tip: { label: "TIP", text: "Buy a few dollars more than your order total to cover the small Bitcoin network fee — usually $0.50–$2.00." },
              },
              {
                num: "02",
                title: "Click 'Pay with Bitcoin' on the pricing page",
                body: "Select Bitcoin as your payment method and enter your email. BTCPay Server generates a unique invoice with a wallet address and exact BTC amount locked at the current exchange rate. You have 15 minutes to complete the payment before the invoice expires.",
                warning: "Always copy-paste the wallet address. Bitcoin transactions are irreversible — one wrong character means funds cannot be recovered. Never type it manually.",
              },
              {
                num: "03",
                title: "Send Bitcoin — access is granted automatically",
                body: "Send the exact amount shown on the invoice from your exchange or wallet app. BTCPay detects the payment on the Bitcoin network within 1–3 minutes. Once confirmed, your dashboard access is unlocked automatically — no email required.",
                note: "The invoice shows both the BTC amount and a scannable QR code. Most mobile wallets let you scan directly.",
              },
            ].map((step, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "80px 1fr", gap: 40,
                padding: "48px 0", borderTop: "1px solid var(--mv-n200)",
              }} className="step-grid">
                <div style={{
                  fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 56,
                  color: "var(--mv-n200)", lineHeight: 1,
                }}>
                  {step.num}
                </div>
                <div>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 22,
                    marginBottom: 16, letterSpacing: "-0.02em",
                  }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "var(--mv-n600)", lineHeight: 1.8, marginBottom: 20 }}>
                    {step.body}
                  </p>
                  {step.tip && (
                    <div style={{
                      display: "flex", gap: 14, alignItems: "flex-start",
                      background: "#FFF8EC", borderLeft: "3px solid var(--mv-accent)",
                      padding: "16px 20px",
                    }}>
                      <span style={{
                        fontFamily: "'Space Mono', monospace", fontSize: 8, fontWeight: 700,
                        letterSpacing: "0.12em", background: "var(--mv-accent)", color: "#000",
                        padding: "3px 8px", flexShrink: 0, marginTop: 1,
                      }}>
                        {step.tip.label}
                      </span>
                      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "var(--mv-n600)", lineHeight: 1.7, margin: 0 }}>
                        {step.tip.text}
                      </p>
                    </div>
                  )}
                  {step.warning && (
                    <div style={{
                      display: "flex", gap: 14, alignItems: "flex-start",
                      background: "#FFF8E6", borderLeft: "3px solid #D97706",
                      padding: "16px 20px",
                    }}>
                      <span style={{ color: "#D97706", fontSize: 16, flexShrink: 0 }}>⚠</span>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#5C4000", lineHeight: 1.7, margin: 0 }}>
                        <strong>Always copy-paste the wallet address.</strong> Bitcoin transactions are irreversible — one wrong character means funds cannot be recovered. Never type it manually.
                      </p>
                    </div>
                  )}
                  {step.note && (
                    <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "var(--mv-n500)", letterSpacing: "0.06em", lineHeight: 1.7, marginTop: 16 }}>
                      {step.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platforms ── */}
      <section id="platforms" style={{ background: "var(--mv-n50)", padding: "100px 64px", borderBottom: "2px solid var(--mv-black)" }} className="btc-pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <span className="accent-rule lg" style={{ marginBottom: 24 }} />
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 900,
            fontSize: "clamp(2rem, 4vw, 4rem)", marginBottom: 16, letterSpacing: "-0.03em",
          }}>
            Where to Buy Bitcoin
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "var(--mv-n600)", lineHeight: 1.7, maxWidth: 640, marginBottom: 64 }}>
            All platforms listed are legitimate, widely used, and beginner-friendly. Yellow Card and Binance P2P are the recommended options for African markets — no dollar card required.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }} className="platforms-grid">
            {PLATFORMS.map((p, i) => (
              <div key={i} style={{
                background: "#fff", border: "2px solid var(--mv-black)",
                padding: "40px 36px", display: "flex", flexDirection: "column" as const, gap: 24,
              }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{
                    width: 48, height: 48, background: "var(--mv-black)", color: "var(--mv-accent)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 22, flexShrink: 0,
                  }}>
                    {p.initial}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" as const }}>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 20, letterSpacing: "-0.02em" }}>
                        {p.name}
                      </h3>
                      <span style={{
                        fontFamily: "'Space Mono', monospace", fontSize: 8, fontWeight: 700,
                        letterSpacing: "0.1em", color: "var(--mv-accent)", border: "1px solid var(--mv-accent)",
                        padding: "2px 8px", textTransform: "uppercase" as const,
                      }}>
                        {p.difficulty}
                      </span>
                    </div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--mv-n600)", marginTop: 4, lineHeight: 1.5 }}>
                      {p.tagline}
                    </p>
                  </div>
                </div>

                {/* Highlight */}
                <div style={{ borderLeft: "3px solid var(--mv-accent)", padding: "12px 16px", background: "var(--mv-n50)" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--mv-n700)", lineHeight: 1.6, margin: 0 }}>
                    {p.highlight}
                  </p>
                </div>

                {/* Details */}
                <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
                  {[
                    { label: "Fee", value: p.fee },
                    { label: "Pay with", value: p.payMethods },
                    { label: "Minimum", value: p.minBuy },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: "flex", gap: 12 }}>
                      <span style={{
                        fontFamily: "'Space Mono', monospace", fontSize: 9, fontWeight: 700,
                        letterSpacing: "0.08em", color: "var(--mv-n400)", minWidth: 64, flexShrink: 0, paddingTop: 1,
                      }}>
                        {label}
                      </span>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "var(--mv-n600)", lineHeight: 1.5 }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 10, marginTop: "auto", flexWrap: "wrap" as const }}>
                  <a
                    href={p.guideUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1, fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.1em",
                      textTransform: "uppercase" as const, fontWeight: 700, textDecoration: "none",
                      background: "var(--mv-black)", color: "#fff", padding: "14px 16px", textAlign: "center" as const,
                      whiteSpace: "nowrap" as const,
                    }}
                  >
                    How to Buy on {p.name} →
                  </a>
                  <a
                    href={p.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.1em",
                      textTransform: "uppercase" as const, fontWeight: 700, textDecoration: "none",
                      border: "2px solid var(--mv-black)", color: "var(--mv-black)", padding: "12px 16px",
                      whiteSpace: "nowrap" as const,
                    }}
                  >
                    Visit Site
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: "#fff", padding: "100px 64px", borderBottom: "2px solid var(--mv-black)" }} className="btc-pad">
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <span className="accent-rule lg" style={{ marginBottom: 24 }} />
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 900,
            fontSize: "clamp(2rem, 4vw, 4rem)", marginBottom: 56, letterSpacing: "-0.03em",
          }}>
            Common Questions
          </h2>
          <div style={{ borderTop: "2px solid var(--mv-black)" }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderBottom: "1px solid var(--mv-n200)" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "28px 0", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" as const, gap: 24,
                  }}
                >
                  <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 17, color: "var(--mv-black)", lineHeight: 1.4 }}>
                    {faq.q}
                  </span>
                  <span style={{
                    fontFamily: "'Space Mono', monospace", fontSize: 20, color: "var(--mv-accent)",
                    flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.2s",
                  }}>
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div style={{ paddingBottom: 28 }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n600)", lineHeight: 1.8, maxWidth: 640 }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <section style={{ background: "var(--mv-black)", borderTop: "3px solid var(--mv-accent)", padding: "64px" }} className="btc-pad">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap" as const, maxWidth: 1100, margin: "0 auto" }}>
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 28, color: "#fff", letterSpacing: "-0.03em", marginBottom: 8 }}>
              Ready to pay with Bitcoin?
            </h3>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "var(--mv-n600)", letterSpacing: "0.08em", lineHeight: 1.7 }}>
              Questions? Email hello@moneyverse.network — we'll walk you through it.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
            <Link href="/pricing">
              <span style={{
                display: "inline-block", fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase" as const,
                background: "var(--mv-accent)", color: "#000", padding: "16px 32px", cursor: "pointer",
              }}>
                Go to Pricing →
              </span>
            </Link>
            <a href="mailto:hello@moneyverse.network" style={{
              fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase" as const,
              border: "2px solid #333", color: "var(--mv-n400)", padding: "14px 32px", textDecoration: "none",
            }}>
              Email Support
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .platforms-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .btc-pad { padding: 60px 20px !important; }
          .step-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
      `}</style>
    </Layout>
  );
}
