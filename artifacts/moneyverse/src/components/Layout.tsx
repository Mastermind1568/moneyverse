import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const NAV_LINKS = [
  { href: "/about", label: "The Thesis" },
  { href: "/blog", label: "The Satoshi Way" },
  { href: "/calculator", label: "Free Tools" },
  { href: "/partner", label: "Partner" },
  { href: "/pricing", label: "Masterclass" },
];

const TICKER_ITEMS = [
  "BTC CYCLE PHASE: ACCUMULATION",
  "NEXT HALVING: EST. 2028",
  "30% AFFILIATE COMMISSION",
  "LIFETIME ACCESS · NO SUBSCRIPTION",
  "85 LESSONS · 11H 43M RUNTIME",
  "NIGERIAN NAIRA −74% SINCE 2021",
];

function FooterEmailForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSent(true);
  }

  if (sent) {
    return (
      <p className="mono" style={{ fontSize: 11, color: "var(--mv-accent)" }}>
        You're in. Check your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        style={{
          fontFamily: "'Space Mono', monospace", fontSize: 11, padding: "10px 12px",
          background: "#111", border: "1px solid #333", color: "#fff",
          outline: "none", width: "100%",
        }}
      />
      <button type="submit" className="btn orange sm" style={{ width: "100%", justifyContent: "center" }}>
        Get the guide →
      </button>
    </form>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const tickerContent = [...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
    <span key={i} style={{ padding: "0 48px", whiteSpace: "nowrap", fontSize: 10, fontFamily: "'Space Mono', monospace", fontWeight: 700, letterSpacing: "0.18em" }}>
      {item} <span style={{ color: "var(--mv-accent)", margin: "0 4px" }}>·</span>
    </span>
  ));

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#fff", color: "var(--mv-black)" }}>

      {/* ── Header ── */}
      <header data-testid="header" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "#fff", borderBottom: "2px solid var(--mv-black)" }}>
        {/* Orange masthead stripe */}
        <div style={{ height: 3, background: "var(--mv-accent)" }} />

        <div style={{ height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px" }}>
          {/* Logo */}
          <Link href="/" data-testid="link-logo">
            <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
              <div style={{ width: 14, height: 14, background: "var(--mv-accent)", flexShrink: 0 }} />
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 17, letterSpacing: "0.05em", color: "var(--mv-black)" }}>
                MONEYVERSE
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav data-testid="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 32 }} className="desktop-nav">
            {NAV_LINKS.map((link) => {
              const active = location === link.href || location.startsWith(link.href + "/");
              return (
                <Link key={link.href} href={link.href} data-testid={`link-nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}>
                  <span style={{
                    fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600,
                    letterSpacing: "0.12em", textTransform: "uppercase" as const,
                    color: "var(--mv-black)", cursor: "pointer", paddingBottom: 2,
                    borderBottom: active ? "2px solid var(--mv-accent)" : "2px solid transparent",
                    transition: "border-color 0.15s",
                  }}>
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* CTA + Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link href="/pricing" data-testid="link-header-cta" className="desktop-nav">
              <span className="btn orange sm">Access Blueprint</span>
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              data-testid="button-menu-toggle"
              aria-label="Toggle menu"
              style={{
                width: 40, height: 40, border: "2px solid var(--mv-black)",
                background: "transparent", display: "flex", flexDirection: "column" as const,
                alignItems: "center", justifyContent: "center", gap: 5, cursor: "pointer", padding: 8,
              }}
              className="hamburger-btn"
            >
              <div style={{ width: 20, height: 2, background: "var(--mv-black)", transition: "all 0.2s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
              <div style={{ width: 20, height: 2, background: "var(--mv-black)", transition: "all 0.2s", opacity: menuOpen ? 0 : 1 }} />
              <div style={{ width: 20, height: 2, background: "var(--mv-black)", transition: "all 0.2s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile menu overlay ── */}
      {menuOpen && (
        <div data-testid="mobile-menu" style={{ position: "fixed", inset: 0, zIndex: 40, background: "#fff", display: "flex", flexDirection: "column" as const, paddingTop: 55 }}>
          <div style={{ height: 3, background: "var(--mv-accent)" }} />
          <nav style={{ display: "flex", flexDirection: "column" as const, padding: "40px 32px", gap: 0 }}>
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                <div style={{
                  fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 32,
                  color: "var(--mv-black)", cursor: "pointer", padding: "18px 0",
                  borderBottom: "1px solid var(--mv-n200)",
                }}>
                  {link.label}
                </div>
              </Link>
            ))}
            <div style={{ marginTop: 32 }}>
              <Link href="/pricing">
                <span className="btn orange" style={{ fontSize: 12, padding: "14px 28px" }}>Access Blueprint →</span>
              </Link>
            </div>
          </nav>
        </div>
      )}

      {/* ── Main ── */}
      <main style={{ flex: 1, paddingTop: 55 }}>
        {children}
      </main>

      {/* ── Footer ── */}
      <footer data-testid="footer" style={{ background: "var(--mv-black)", color: "#fff" }}>
        {/* Ticker marquee */}
        <div style={{ overflow: "hidden", borderBottom: "1px solid #222", padding: "12px 0", color: "var(--mv-n600)" }}>
          <div className="marquee-track">{tickerContent}</div>
        </div>

        {/* Grid */}
        <div style={{ padding: "80px 64px 60px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.4fr", gap: 48 }} className="footer-grid-responsive">
            {/* Col 1 */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 14, height: 14, background: "var(--mv-accent)", flexShrink: 0 }} />
                <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 16, letterSpacing: "0.05em" }}>MONEYVERSE</span>
              </div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 15, lineHeight: 1.5, color: "var(--mv-n400)", maxWidth: 320, marginBottom: 16 }}>
                A masterclass for operators who move before the cycle peaks.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "var(--mv-n600)", lineHeight: 1.7, maxWidth: 320 }}>
                Moneyverse is not investment advice. Bitcoin involves risk. Past cycles do not guarantee future results.
              </p>
            </div>

            {/* Col 2: Product */}
            <div>
              <p className="overline" style={{ color: "var(--mv-n600)", marginBottom: 20 }}>Product</p>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 14 }}>
                {[{ href: "/pricing", label: "The Blueprint" }, { href: "/about", label: "The Thesis" }, { href: "/blog", label: "Research" }].map((l) => (
                  <Link key={l.href} href={l.href}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--mv-n400)", cursor: "pointer" }}>{l.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Col 3: Resources */}
            <div>
              <p className="overline" style={{ color: "var(--mv-n600)", marginBottom: 20 }}>Resources</p>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 14 }}>
                {[{ href: "/calculator", label: "Currency Calculator" }, { href: "/partner", label: "Affiliate Program" }, { href: "/faq", label: "FAQ" }, { href: "/blog", label: "Research" }].map((l) => (
                  <Link key={l.href} href={l.href}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--mv-n400)", cursor: "pointer" }}>{l.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Col 4: Email capture */}
            <div>
              <p className="overline" style={{ color: "var(--mv-n600)", marginBottom: 12 }}>Get the Free Guide</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 16, lineHeight: 1.3, marginBottom: 20 }}>
                One email. The 4-Year Clock, distilled.
              </p>
              <FooterEmailForm />
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ marginTop: 60, paddingTop: 24, borderTop: "1px solid #222", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: 12 }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "var(--mv-n600)" }}>
              © 2026 Moneyverse Capital, Ltd. · Lagos · London · Dubai
            </span>
            <div style={{ display: "flex", gap: 24 }}>
              {["Terms", "Privacy", "Disclosures"].map((t) => (
                <span key={t} style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "var(--mv-n600)", cursor: "pointer" }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        a { text-decoration: none; color: inherit; }
        @media (min-width: 769px) {
          .hamburger-btn { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .footer-grid-responsive { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid-responsive { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
