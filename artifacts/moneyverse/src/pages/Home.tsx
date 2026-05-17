import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { usePageMeta } from "@/hooks/usePageMeta";

function HalvingCountdown() {
  const NEXT_HALVING_BLOCK = 1_050_000;
  const CURRENT_BLOCK = 949_841;
  const BLOCKS_REMAINING = NEXT_HALVING_BLOCK - CURRENT_BLOCK;
  const SECONDS_PER_BLOCK = 600;
  const TARGET_DATE = new Date(Date.now() + BLOCKS_REMAINING * SECONDS_PER_BLOCK * 1000);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calculate() {
      const diff = Math.max(0, TARGET_DATE.getTime() - Date.now());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    }
    calculate();
    const id = setInterval(calculate, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="border border-border p-8" data-testid="halving-countdown">
      <p className="text-xs font-bold tracking-widest text-muted-foreground mb-6">NEXT HALVING — EPOCH 06 — BLOCK 1,050,000</p>
      <div className="grid grid-cols-4 gap-4">
        {[
          { value: timeLeft.days, label: "DAYS" },
          { value: timeLeft.hours, label: "HRS" },
          { value: timeLeft.minutes, label: "MIN" },
          { value: timeLeft.seconds, label: "SEC" },
        ].map(({ value, label }) => (
          <div key={label} className="text-center border border-border p-4">
            <div className="font-serif font-black text-4xl sm:text-5xl tabular-nums" data-testid={`countdown-${label.toLowerCase()}`}>
              {String(value).padStart(2, "0")}
            </div>
            <div className="text-xs font-bold tracking-widest text-muted-foreground mt-2">{label}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-6 text-xs text-muted-foreground">
        <span>{BLOCKS_REMAINING.toLocaleString()} BLOCKS REMAINING</span>
        <span>~APR 2028</span>
      </div>
    </div>
  );
}

function DCACalculator() {
  const [monthly, setMonthly] = useState(200);
  const [years, setYears] = useState(4);

  const scenarios = [
    { label: "Bear", price: 30000, color: "text-muted-foreground" },
    { label: "Current", price: 78000, color: "text-foreground" },
    { label: "Bull", price: 150000, color: "text-accent" },
  ];

  const totalInvested = monthly * 12 * years;

  return (
    <div className="border border-border p-8" data-testid="dca-calculator">
      <p className="text-xs font-bold tracking-widest text-muted-foreground mb-6">DCA CALCULATOR</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="text-xs font-bold tracking-widest block mb-2">MONTHLY AMOUNT</label>
          <div className="flex items-center border border-border">
            <span className="px-3 py-2 text-sm bg-muted border-r border-border">$</span>
            <input
              type="number"
              value={monthly}
              min={10}
              max={10000}
              onChange={(e) => setMonthly(Number(e.target.value))}
              className="flex-1 px-3 py-2 bg-background text-foreground text-sm outline-none"
              data-testid="input-dca-monthly"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-bold tracking-widest block mb-2">YEARS</label>
          <div className="flex items-center border border-border">
            <input
              type="number"
              value={years}
              min={1}
              max={20}
              onChange={(e) => setYears(Number(e.target.value))}
              className="flex-1 px-3 py-2 bg-background text-foreground text-sm outline-none"
              data-testid="input-dca-years"
            />
          </div>
        </div>
      </div>

      <div className="mb-4 text-xs text-muted-foreground">
        TOTAL INVESTED: <span className="text-foreground font-bold">${totalInvested.toLocaleString()}</span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {scenarios.map(({ label, price, color }) => {
          const btc = totalInvested / price;
          const sats = Math.round(btc * 1e8);
          return (
            <div key={label} className="border border-border p-4" data-testid={`dca-scenario-${label.toLowerCase()}`}>
              <div className="text-xs font-bold tracking-widest text-muted-foreground mb-3">
                {label.toUpperCase()} · ${(price / 1000).toFixed(0)}K
              </div>
              <div className={`font-serif font-bold text-lg ${color}`}>
                {btc.toFixed(4)} BTC
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {sats.toLocaleString()} sats
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Home() {
  usePageMeta(
    "Moneyverse — The Bitcoin Education Protocol",
    "Stop watching Bitcoin from the sidelines. Moneyverse is the complete Bitcoin education protocol for serious operators. One-time $197. Lifetime access. 85 lessons. The 4-year framework."
  );

  return (
    <Layout>
      {/* Hero */}
      <section className="min-h-[90vh] grid grid-cols-1 lg:grid-cols-2 border-b border-border" data-testid="hero-section">
        {/* Left */}
        <div className="bg-foreground text-background flex flex-col justify-center px-8 sm:px-16 py-20 lg:py-0">
          <div className="max-w-xl">
            <p className="text-xs font-bold tracking-widest text-accent mb-8">MONEYVERSE V1.0 · BITCOIN EDUCATION PROTOCOL</p>
            <h1 className="font-serif font-black text-5xl sm:text-6xl lg:text-7xl leading-[0.95] mb-8" data-testid="hero-headline">
              Escape<br />
              the<br />
              <em className="text-accent not-italic">Fiat</em><br />
              Leak.
            </h1>
            <p className="text-lg font-light text-background/80 leading-relaxed mb-10 max-w-sm">
              The complete Bitcoin protocol for operators who know Bitcoin is real — but haven't built their position yet.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-0"
              data-testid="hero-email-form"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-4 bg-background text-foreground text-sm outline-none border border-background/20 placeholder:text-background/40"
                data-testid="input-hero-email"
              />
              <button
                type="submit"
                className="px-6 py-4 bg-accent text-black text-xs font-bold tracking-widest hover:bg-background hover:text-foreground transition-colors whitespace-nowrap"
                data-testid="button-hero-cta"
              >
                GET FREE GUIDE →
              </button>
            </form>
            <p className="text-xs text-background/40 mt-3">Free 16-page PDF. No spam. No altcoin content. Unsubscribe anytime.</p>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col justify-center px-8 sm:px-16 py-16 lg:py-0 border-t lg:border-t-0 lg:border-l border-border">
          <div className="max-w-md">
            <p className="text-xs font-bold tracking-widest text-muted-foreground mb-10">WHAT YOU GET</p>
            <div className="space-y-8">
              {[
                { value: "$197", label: "One-time investment. Lifetime access." },
                { value: "85", label: "Lessons across 4 phases of Bitcoin mastery." },
                { value: "16", label: "Modules from foundation to global context." },
                { value: "4YR", label: "Framework built around the halving cycle." },
              ].map(({ value, label }) => (
                <div key={value} className="flex items-start gap-6 pb-8 border-b border-border last:border-0 last:pb-0">
                  <div className="font-serif font-black text-4xl text-accent leading-none w-20 flex-shrink-0">{value}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed pt-1">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link href="/masterclass" data-testid="link-hero-learn-more">
                <span className="text-xs font-bold tracking-widest underline underline-offset-4 hover:text-accent transition-colors cursor-pointer">
                  SEE FULL CURRICULUM →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker bar */}
      <section className="bg-foreground text-background px-8 py-4 flex flex-wrap items-center gap-8 text-xs font-mono" data-testid="ticker-bar">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span>BLOCK 949,841</span>
        </div>
        <div className="text-background/60">·</div>
        <div><span className="text-background/60">BTC/USD</span> <span className="text-accent font-bold">$78,158</span></div>
        <div className="text-background/60">·</div>
        <div><span className="text-background/60">EPOCH</span> 05</div>
        <div className="text-background/60">·</div>
        <div><span className="text-background/60">REWARD</span> 3.125 BTC/BLOCK</div>
        <div className="text-background/60">·</div>
        <div><span className="text-background/60">NEXT HALVING</span> ~APR 2028</div>
      </section>

      {/* Tools preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-8" data-testid="tools-preview">
        <HalvingCountdown />
        <DCACalculator />
      </section>

      {/* Manifesto pull-quote */}
      <section className="bg-foreground text-background py-24 px-8" data-testid="manifesto-section">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest text-accent mb-8">THE THESIS</p>
          <blockquote className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl leading-tight mb-10">
            "Every dollar you keep in cash is a loan to a system designed to inflate it away. Bitcoin is the exit."
          </blockquote>
          <Link href="/thesis" data-testid="link-manifesto-read">
            <span className="text-xs font-bold tracking-widest text-background/60 hover:text-accent transition-colors cursor-pointer underline underline-offset-4">
              READ THE FULL THESIS →
            </span>
          </Link>
        </div>
      </section>

      {/* Curriculum preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" data-testid="curriculum-preview">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold tracking-widest text-muted-foreground mb-2">THE BLUEPRINT</p>
            <h2 className="font-serif font-black text-4xl sm:text-5xl">4 Phases.<br />16 Modules.<br />One Protocol.</h2>
          </div>
          <Link href="/curriculum" data-testid="link-curriculum-preview">
            <span className="text-xs font-bold tracking-widest underline underline-offset-4 hover:text-accent transition-colors cursor-pointer whitespace-nowrap">
              VIEW FULL CURRICULUM →
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {[
            { number: "01", title: "The Foundation", desc: "What money is. How fiat fails. Why Bitcoin solves it." },
            { number: "02", title: "The Protocol", desc: "Buy securely. Master self-custody. Own your keys." },
            { number: "03", title: "The Strategy", desc: "DCA. 4-Year cycle. Exit architecture." },
            { number: "04", title: "The Global Context", desc: "Bitcoin as macro asset. Monetary sovereignty." },
          ].map(({ number, title, desc }) => (
            <div key={number} className="bg-background p-8" data-testid={`phase-preview-${number}`}>
              <div className="font-serif font-black text-6xl text-muted-foreground/20 mb-4">{number}</div>
              <h3 className="font-serif font-bold text-xl mb-3">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-24 px-8" data-testid="cta-section">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest text-muted-foreground mb-4">READY TO BUILD YOUR POSITION?</p>
          <h2 className="font-serif font-black text-4xl sm:text-5xl mb-8">The Plan You've<br />Been Missing.</h2>
          <Link href="/masterclass" data-testid="link-cta-masterclass">
            <span className="inline-block cursor-pointer bg-foreground text-background text-sm font-bold tracking-widest px-10 py-5 hover:bg-accent hover:text-black transition-colors">
              ACCESS THE BLUEPRINT — $197 →
            </span>
          </Link>
          <p className="text-xs text-muted-foreground mt-4">One-time payment. Lifetime access. Bitcoin-only.</p>
        </div>
      </section>
    </Layout>
  );
}
