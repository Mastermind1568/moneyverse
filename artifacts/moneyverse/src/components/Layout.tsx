import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const NAV_LINKS = [
  { href: "/thesis", label: "THE THESIS" },
  { href: "/curriculum", label: "CURRICULUM" },
  { href: "/research", label: "RESEARCH" },
  { href: "/tools", label: "TOOLS" },
  { href: "/masterclass", label: "MASTERCLASS" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${scrolled ? "border-b border-border bg-background" : "bg-background"}`}
        data-testid="header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" data-testid="link-logo">
              <div className="flex items-baseline gap-2 cursor-pointer">
                <span className="font-serif font-black text-xl tracking-widest uppercase">MONEYVERSE</span>
                <span className="text-xs font-mono text-muted-foreground border border-border px-1 py-0.5">V1.0</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8" data-testid="nav-desktop">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} data-testid={`link-nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}>
                  <span className={`text-xs font-medium tracking-widest transition-colors cursor-pointer hover:text-accent ${location === link.href ? "text-accent" : "text-foreground"}`}>
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-4">
              <Link href="/masterclass" data-testid="link-header-cta">
                <span className="hidden sm:block cursor-pointer bg-foreground text-background text-xs font-bold tracking-widest px-4 py-2 hover:bg-accent hover:text-black transition-colors">
                  ACCESS BLUEPRINT →
                </span>
              </Link>
              <button
                className="lg:hidden p-2"
                onClick={() => setMenuOpen(!menuOpen)}
                data-testid="button-menu-toggle"
                aria-label="Toggle menu"
              >
                <div className={`w-6 h-0.5 bg-foreground mb-1.5 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <div className={`w-6 h-0.5 bg-foreground mb-1.5 transition-all ${menuOpen ? "opacity-0" : ""}`} />
                <div className={`w-6 h-0.5 bg-foreground transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background flex flex-col pt-20" data-testid="mobile-menu">
          <nav className="flex flex-col px-8 gap-8 mt-8">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s/g, "-")}`}>
                <span className="font-serif text-3xl font-bold cursor-pointer hover:text-accent transition-colors block">
                  {link.label}
                </span>
              </Link>
            ))}
            <Link href="/masterclass" data-testid="link-mobile-cta">
              <span className="inline-block cursor-pointer bg-foreground text-background text-sm font-bold tracking-widest px-6 py-3 hover:bg-accent hover:text-black transition-colors mt-4">
                ACCESS BLUEPRINT →
              </span>
            </Link>
          </nav>
        </div>
      )}

      {/* Main */}
      <main className="flex-1 pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background mt-24" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-serif font-black text-lg tracking-widest">MONEYVERSE</span>
                <span className="text-xs font-mono text-muted-foreground border border-border px-1">V1.0</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The Bitcoin education protocol for serious operators.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-xs font-mono text-muted-foreground border border-border px-3 py-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                BLOCK 949,841
              </div>
            </div>

            {/* Platform */}
            <div>
              <h4 className="text-xs font-bold tracking-widest mb-4">PLATFORM</h4>
              <div className="flex flex-col gap-3">
                {[
                  { href: "/", label: "Home" },
                  { href: "/thesis", label: "The Thesis" },
                  { href: "/curriculum", label: "Curriculum" },
                  { href: "/masterclass", label: "Masterclass" },
                ].map((l) => (
                  <Link key={l.href} href={l.href}>
                    <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">{l.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Learn */}
            <div>
              <h4 className="text-xs font-bold tracking-widest mb-4">LEARN</h4>
              <div className="flex flex-col gap-3">
                {[
                  { href: "/learn/bitcoin-halving", label: "Bitcoin Halving" },
                  { href: "/learn/21-million-hard-cap", label: "21M Hard Cap" },
                  { href: "/learn/digital-scarcity", label: "Digital Scarcity" },
                  { href: "/learn/fiat-debasement", label: "Fiat Debasement" },
                  { href: "/learn/self-custody", label: "Self-Custody" },
                  { href: "/learn/dollar-cost-averaging", label: "DCA" },
                  { href: "/learn/proof-of-work", label: "Proof of Work" },
                ].map((l) => (
                  <Link key={l.href} href={l.href}>
                    <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">{l.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Compare */}
            <div>
              <h4 className="text-xs font-bold tracking-widest mb-4">COMPARE</h4>
              <div className="flex flex-col gap-3">
                {[
                  { href: "/compare/ledger-vs-trezor", label: "Ledger vs Trezor" },
                  { href: "/compare/cold-storage-vs-hot-wallet", label: "Cold vs Hot Wallet" },
                  { href: "/compare/bitcoin-vs-gold", label: "Bitcoin vs Gold" },
                  { href: "/guides/how-to-set-up-a-hardware-wallet", label: "Hardware Wallet Guide" },
                  { href: "/guides/bitcoin-exit-strategy", label: "Exit Strategy Guide" },
                  { href: "/guides/bitcoin-self-custody-guide", label: "Self-Custody Guide" },
                ].map((l) => (
                  <Link key={l.href} href={l.href}>
                    <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">{l.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © 2025 Moneyverse. Not financial advice. For educational purposes only.
            </p>
            <p className="text-xs font-mono text-muted-foreground">
              EPOCH 05 · 3.125 BTC/BLOCK
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
