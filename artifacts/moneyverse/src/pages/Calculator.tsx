import { useState, useEffect } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";

const COUNTRIES = [
  { code: "NG", flag: "🇳🇬", name: "Nigeria", currency: "NGN", symbol: "₦", startRate: 410, currentRate: 1580, defaultSavings: 50000, context: "The naira lost over 70% of its value against the dollar since 2021." },
  { code: "GH", flag: "🇬🇭", name: "Ghana", currency: "GHS", symbol: "₵", startRate: 5.7, currentRate: 15.5, defaultSavings: 2000, context: "Ghana's cedi fell over 60% and required an IMF bailout in 2023." },
  { code: "KE", flag: "🇰🇪", name: "Kenya", currency: "KES", symbol: "KSh", startRate: 108, currentRate: 130, defaultSavings: 15000, context: "The shilling depreciated ~20% — every KES 1,000 saved is worth KES 830." },
  { code: "ZA", flag: "🇿🇦", name: "South Africa", currency: "ZAR", symbol: "R", startRate: 14.8, currentRate: 18.5, defaultSavings: 3000, context: "Load-shedding and fiscal pressure pushed the rand down ~25% since 2021." },
  { code: "CM", flag: "🇨🇲", name: "Cameroon", currency: "XAF", symbol: "XAF", startRate: 540, currentRate: 617, defaultSavings: 100000, context: "The CFA franc is pegged to the euro — but the euro weakened against the dollar." },
];

const BTC_AVG_ENTRY = 35000;
const MONTHS = 36;

function fmt(n: number, digits = 0) {
  return n.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

export default function Calculator() {
  const [countryCode, setCountryCode] = useState("NG");
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const [priceError, setPriceError] = useState(false);

  const country = COUNTRIES.find((c) => c.code === countryCode) || COUNTRIES[0];
  const [monthly, setMonthly] = useState(country.defaultSavings);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd")
      .then((r) => r.json())
      .then((data) => {
        if (data?.bitcoin?.usd) setBtcPrice(data.bitcoin.usd);
        else setPriceError(true);
      })
      .catch(() => setPriceError(true));
  }, []);

  function handleCountryChange(code: string) {
    const c = COUNTRIES.find((x) => x.code === code) || COUNTRIES[0];
    setCountryCode(code);
    setMonthly(c.defaultSavings);
  }

  const BTC_CURRENT = btcPrice ?? 100000;

  const totalLocal = monthly * MONTHS;
  const usdAtStart = totalLocal / country.startRate;
  const usdToday = totalLocal / country.currentRate;
  const purchasingPowerLost = usdAtStart - usdToday;
  const devaluationPct = ((country.currentRate - country.startRate) / country.startRate) * 100;
  const btcAccumulated = usdAtStart / BTC_AVG_ENTRY;
  const btcValueToday = btcAccumulated * BTC_CURRENT;
  const theGap = btcValueToday - usdToday;

  return (
    <Layout>
      {/* ── Hero ── */}
      <section style={{ background: "var(--mv-black)", padding: "100px 64px", borderBottom: "2px solid #222" }} className="section-pad-responsive">
        <span className="accent-rule" style={{ marginBottom: 20 }} />
        <p className="overline" style={{ color: "var(--mv-n600)", marginBottom: 16 }}>Free Tool · Moneyverse</p>
        <h1 className="h-section" style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", color: "#fff", marginBottom: 24 }}>
          What your savings actually cost you.
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: "var(--mv-n400)", maxWidth: 620, lineHeight: 1.7 }}>
          Enter what you save each month. See how much purchasing power your currency took from you — and what the Bitcoin alternative would look like.
        </p>

        {/* Live BTC price badge */}
        <div style={{ marginTop: 32, display: "inline-flex", alignItems: "center", gap: 10, border: "1px solid #333", padding: "8px 16px" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: btcPrice ? "var(--mv-accent)" : priceError ? "#888" : "#444", display: "inline-block", flexShrink: 0 }} />
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: "var(--mv-n400)" }}>
            {btcPrice
              ? `BTC LIVE: $${fmt(btcPrice)} USD`
              : priceError
              ? "BTC: $100,000 USD (CACHED)"
              : "FETCHING LIVE BTC PRICE..."}
          </span>
        </div>
      </section>

      {/* ── Calculator ── */}
      <section style={{ background: "#fff", padding: "80px 64px", borderBottom: "2px solid var(--mv-black)" }} className="section-pad-responsive">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 48 }} className="two-col-grid">
          <div>
            <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase" as const, display: "block", marginBottom: 12 }}>
              Country
            </label>
            <select
              value={countryCode}
              onChange={(e) => handleCountryChange(e.target.value)}
              style={{ width: "100%", fontFamily: "'Space Mono', monospace", fontSize: 12, padding: "14px 16px", border: "2px solid var(--mv-black)", background: "#fff", outline: "none", cursor: "pointer", appearance: "none" as const }}
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>{c.flag} {c.name} ({c.currency} · {c.symbol})</option>
              ))}
            </select>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "var(--mv-n600)", marginTop: 10, lineHeight: 1.6 }}>{country.context}</p>
          </div>
          <div>
            <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase" as const, display: "block", marginBottom: 12 }}>
              Monthly Savings ({country.symbol})
            </label>
            <div style={{ position: "relative" as const }}>
              <span style={{ position: "absolute" as const, left: 16, top: "50%", transform: "translateY(-50%)", fontFamily: "'Space Mono', monospace", fontSize: 14, color: "var(--mv-n600)" }}>
                {country.symbol}
              </span>
              <input
                type="number"
                value={monthly}
                onChange={(e) => setMonthly(Math.max(0, Number(e.target.value)))}
                style={{ width: "100%", fontFamily: "'Space Mono', monospace", fontSize: 16, padding: "14px 16px 14px 48px", border: "2px solid var(--mv-black)", background: "#fff", outline: "none" }}
              />
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "var(--mv-n600)", marginTop: 10 }}>
              Calculation assumes 36 months (3 years) of saving.
            </p>
          </div>
        </div>

        {/* Results */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: "2px solid var(--mv-black)" }} className="three-col-grid">
          <div style={{ padding: "40px 32px", borderRight: "1px solid var(--mv-n200)" }}>
            <p className="overline" style={{ marginBottom: 20 }}>You saved</p>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 32, marginBottom: 8 }}>
              {country.symbol}{fmt(totalLocal)}
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--mv-n600)" }}>Total in {country.currency} over 3 years</p>
            <div style={{ marginTop: 24, paddingTop: 24, borderTop: "1px solid var(--mv-n200)" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 24, color: "var(--mv-n700)", marginBottom: 8 }}>
                ${fmt(usdAtStart, 2)}
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--mv-n600)" }}>In USD 3 years ago</p>
            </div>
          </div>

          <div style={{ padding: "40px 32px", borderRight: "1px solid var(--mv-n200)", background: "#fff5f5" }}>
            <p className="overline" style={{ marginBottom: 20, color: "var(--mv-red)" }}>It's now worth</p>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 32, color: "var(--mv-red)", marginBottom: 8 }}>
              ${fmt(usdToday, 2)}
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--mv-n600)" }}>Current USD value</p>
            <div style={{ marginTop: 24, paddingTop: 24, borderTop: "1px solid var(--mv-n200)" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 24, color: "var(--mv-red)", marginBottom: 8 }}>
                −${fmt(purchasingPowerLost, 2)}
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--mv-n600)" }}>
                Purchasing power lost · {fmt(devaluationPct, 1)}% devaluation
              </p>
            </div>
          </div>

          <div style={{ padding: "40px 32px", background: "#fff8f0" }}>
            <p className="overline" style={{ marginBottom: 20, color: "var(--mv-accent)" }}>Bitcoin alternative</p>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 32, color: "var(--mv-accent)", marginBottom: 8 }}>
              ${fmt(btcValueToday, 0)}
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--mv-n600)" }}>
              BTC value today {btcPrice ? `· $${fmt(btcPrice)} live` : ""}
            </p>
            <div style={{ marginTop: 24, paddingTop: 24, borderTop: "1px solid var(--mv-n200)" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 16, color: "var(--mv-n700)", marginBottom: 4 }}>
                {btcAccumulated.toFixed(4)} BTC
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--mv-n600)", marginBottom: 16 }}>Accumulated · weekly DCA</p>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 20, color: "var(--mv-accent)" }}>
                +${fmt(btcValueToday - usdAtStart, 0)}
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--mv-n600)" }}>Gain vs saving in {country.currency}</p>
            </div>
          </div>
        </div>

        {/* Gap callout */}
        <div style={{ background: "var(--mv-black)", padding: "40px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: 24, marginTop: -2 }}>
          <div>
            <div className="display" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--mv-accent)" }}>
              ${fmt(theGap, 0)}
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n400)", marginTop: 8 }}>
              Between saving in {country.currency} vs. a weekly Bitcoin DCA at avg $35K entry
            </p>
          </div>
          <Link href="/pricing">
            <span className="btn orange" style={{ fontSize: 11, whiteSpace: "nowrap" as const }}>See the protocol →</span>
          </Link>
        </div>

        <p className="mono" style={{ fontSize: 9, color: "var(--mv-n400)", marginTop: 20, lineHeight: 1.8, letterSpacing: "0.06em" }}>
          Exchange rates are illustrative and based on publicly available historical data. Bitcoin price pulled live from CoinGecko. DCA assumes weekly purchases at a $35,000 average entry. Actual returns vary. This is not financial advice.
        </p>
      </section>

      {/* ── Protocol section ── */}
      <section style={{ background: "var(--mv-n50)", padding: "100px 64px", borderBottom: "2px solid var(--mv-black)" }} className="section-pad-responsive">
        <span className="accent-rule" style={{ marginBottom: 20 }} />
        <h2 className="h-section" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", marginBottom: 48 }}>The protocol that closes the gap.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: "2px solid var(--mv-black)" }} className="three-col-grid">
          {[
            { num: "01", title: "Know exactly when to buy", body: "The 4-Year Clock framework maps Bitcoin's halving cycles. You stop guessing and start executing at defined intervals." },
            { num: "02", title: "Automate weekly accumulation", body: "The Accumulation Engine module sets up DCA that runs without you. Weekly buys. Consistent allocation. No emotional decisions." },
            { num: "03", title: "Move off exchanges", body: "The Cold Storage Protocol walks you through hardware wallet setup. Bitcoin you hold is Bitcoin that can't be seized or frozen." },
          ].map((item, i) => (
            <div key={i} style={{ padding: "48px 36px", borderRight: i < 2 ? "1px solid var(--mv-n200)" : "none", background: "#fff" }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 40, color: "var(--mv-n200)" }}>{item.num}</span>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 20, margin: "16px 0 12px" }}>{item.title}</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n600)", lineHeight: 1.7 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#fff", padding: "80px 64px", textAlign: "center" as const, borderBottom: "2px solid var(--mv-black)" }} className="section-pad-responsive">
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", marginBottom: 24 }}>
          Stop saving in a leaking currency.
        </h2>
        <Link href="/pricing">
          <span className="btn orange" style={{ fontSize: 13, padding: "16px 32px", marginBottom: 16, display: "inline-flex" }}>Enroll in The Blueprint · $97 →</span>
        </Link>
        <p className="mono" style={{ fontSize: 9, color: "var(--mv-n400)", letterSpacing: "0.1em", display: "block", marginTop: 12 }}>
          30-day conditional guarantee · One email refund
        </p>
      </section>

      <style>{`
        .two-col-grid { grid-template-columns: 1fr 1fr; }
        .three-col-grid { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 900px) {
          .two-col-grid { grid-template-columns: 1fr !important; }
          .three-col-grid { grid-template-columns: 1fr !important; }
        }
        .section-pad-responsive { padding: 100px 64px; }
        @media (max-width: 768px) { .section-pad-responsive { padding: 60px 20px !important; } }
      `}</style>
    </Layout>
  );
}
