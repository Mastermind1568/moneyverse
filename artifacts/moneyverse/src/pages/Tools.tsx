import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { usePageMeta } from "@/hooks/usePageMeta";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// M2 growth data (cumulative % loss of purchasing power vs year of savings start)
const M2_GROWTH_DATA: Record<number, number> = {
  2010: 52, 2011: 48, 2012: 44, 2013: 40, 2014: 36, 2015: 32,
  2016: 29, 2017: 26, 2018: 23, 2019: 20, 2020: 17, 2021: 14,
  2022: 10, 2023: 7, 2024: 4,
};

function HalvingClock() {
  const NEXT_HALVING_BLOCK = 1_050_000;
  const CURRENT_BLOCK = 949_841;
  const BLOCKS_REMAINING = NEXT_HALVING_BLOCK - CURRENT_BLOCK;
  const SECONDS_PER_BLOCK = 600;
  const TARGET_DATE = new Date(Date.now() + BLOCKS_REMAINING * SECONDS_PER_BLOCK * 1000);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calc() {
      const diff = Math.max(0, TARGET_DATE.getTime() - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="border border-border p-8 sm:p-12" data-testid="tool-halving-clock">
      <div className="mb-8">
        <p className="text-xs font-bold tracking-widest text-muted-foreground mb-2">HALVING COUNTDOWN</p>
        <h2 className="font-serif font-bold text-2xl">Next Bitcoin Halving</h2>
        <p className="text-sm text-muted-foreground mt-1">Block 1,050,000 · Epoch 06 · ~April 2028</p>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-8">
        {[
          { v: timeLeft.days, l: "DAYS" },
          { v: timeLeft.hours, l: "HRS" },
          { v: timeLeft.minutes, l: "MIN" },
          { v: timeLeft.seconds, l: "SEC" },
        ].map(({ v, l }) => (
          <div key={l} className="border border-border p-4 text-center" data-testid={`halving-${l.toLowerCase()}`}>
            <div className="font-serif font-black text-4xl sm:text-5xl tabular-nums">
              {String(v).padStart(2, "0")}
            </div>
            <div className="text-xs font-bold tracking-widest text-muted-foreground mt-2">{l}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        {[
          { label: "CURRENT BLOCK", value: "949,841" },
          { label: "TARGET BLOCK", value: "1,050,000" },
          { label: "BLOCKS LEFT", value: BLOCKS_REMAINING.toLocaleString() },
          { label: "CURRENT REWARD", value: "3.125 BTC" },
        ].map(({ label, value }) => (
          <div key={label} className="border border-border p-3">
            <div className="text-muted-foreground mb-1">{label}</div>
            <div className="font-bold">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DCAProjector() {
  const [monthly, setMonthly] = useState(200);
  const [years, setYears] = useState(4);
  const [btcPrice, setBtcPrice] = useState(78000);

  const months = years * 12;
  const totalInvested = monthly * months;

  const chartData = Array.from({ length: months }, (_, i) => {
    const m = i + 1;
    const invested = monthly * m;
    const btcAcc = (monthly * m) / btcPrice;
    const value = btcAcc * btcPrice * (1 + (m / months) * 0.5);
    return { month: m, invested, value: Math.round(value) };
  });

  const scenarios = [
    { label: "Bear", multiplier: 0.4, color: "#666" },
    { label: "Flat", multiplier: 1.0, color: "#ccc" },
    { label: "Bull", multiplier: 2.5, color: "#F7931A" },
  ];

  return (
    <div className="border border-border p-8 sm:p-12" data-testid="tool-dca-projector">
      <div className="mb-8">
        <p className="text-xs font-bold tracking-widest text-muted-foreground mb-2">DCA CALCULATOR</p>
        <h2 className="font-serif font-bold text-2xl">Bitcoin Accumulation Projector</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div>
          <label className="text-xs font-bold tracking-widest block mb-2">MONTHLY ($)</label>
          <input
            type="number"
            value={monthly}
            min={10}
            max={50000}
            onChange={(e) => setMonthly(Number(e.target.value))}
            className="w-full border border-border px-3 py-2 bg-background text-sm outline-none"
            data-testid="input-tool-monthly"
          />
        </div>
        <div>
          <label className="text-xs font-bold tracking-widest block mb-2">YEARS</label>
          <input
            type="number"
            value={years}
            min={1}
            max={20}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full border border-border px-3 py-2 bg-background text-sm outline-none"
            data-testid="input-tool-years"
          />
        </div>
        <div>
          <label className="text-xs font-bold tracking-widest block mb-2">BTC PRICE ($)</label>
          <input
            type="number"
            value={btcPrice}
            min={1000}
            max={1000000}
            step={1000}
            onChange={(e) => setBtcPrice(Number(e.target.value))}
            className="w-full border border-border px-3 py-2 bg-background text-sm outline-none"
            data-testid="input-tool-btcprice"
          />
        </div>
      </div>

      <div className="mb-8 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey="month" hide />
            <YAxis hide />
            <Tooltip
              formatter={(v: number) => [`$${v.toLocaleString()}`, ""]}
              contentStyle={{ background: "#000", border: "1px solid #333", borderRadius: 0, color: "#fff", fontSize: 12 }}
            />
            <Area type="monotone" dataKey="value" stroke="#F7931A" fill="#F7931A" fillOpacity={0.15} strokeWidth={2} name="Projected Value" />
            <Area type="monotone" dataKey="invested" stroke="#666" fill="#666" fillOpacity={0.1} strokeWidth={1} name="Total Invested" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="border border-border p-6 mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-xs text-muted-foreground mb-1">TOTAL INVESTED</div>
            <div className="font-bold">${totalInvested.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">BTC ACCUMULATED</div>
            <div className="font-bold">{(totalInvested / btcPrice).toFixed(6)}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">SATOSHIS</div>
            <div className="font-bold">{Math.round((totalInvested / btcPrice) * 1e8).toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">COST BASIS</div>
            <div className="font-bold">${btcPrice.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {scenarios.map(({ label, multiplier }) => {
          const btc = totalInvested / btcPrice;
          const exitPrice = btcPrice * multiplier;
          const value = btc * exitPrice;
          const gain = value - totalInvested;
          return (
            <div key={label} className="border border-border p-4" data-testid={`dca-proj-${label.toLowerCase()}`}>
              <div className="text-xs text-muted-foreground mb-2">{label.toUpperCase()} EXIT</div>
              <div className="text-xs text-muted-foreground">${(exitPrice / 1000).toFixed(0)}K BTC</div>
              <div className="font-serif font-bold text-lg mt-2">${Math.round(value).toLocaleString()}</div>
              <div className={`text-xs mt-1 ${gain >= 0 ? "text-accent" : "text-muted-foreground"}`}>
                {gain >= 0 ? "+" : ""}${Math.round(gain).toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FiatDebaser() {
  const [savings, setSavings] = useState(50000);
  const [startYear, setStartYear] = useState(2020);

  const loss = M2_GROWTH_DATA[startYear] ?? 0;
  const lostValue = Math.round(savings * (loss / 100));
  const realValue = savings - lostValue;

  const currentYear = 2025;
  const years = currentYear - startYear;

  return (
    <div className="border border-border p-8 sm:p-12" data-testid="tool-fiat-debaser">
      <div className="mb-8">
        <p className="text-xs font-bold tracking-widest text-muted-foreground mb-2">FIAT DEBASEMENT CALCULATOR</p>
        <h2 className="font-serif font-bold text-2xl">How Much Has Your Dollar Lost?</h2>
        <p className="text-sm text-muted-foreground mt-1">Based on M2 money supply growth relative to your savings start date.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="text-xs font-bold tracking-widest block mb-2">SAVINGS AMOUNT ($)</label>
          <input
            type="number"
            value={savings}
            min={100}
            max={10000000}
            step={1000}
            onChange={(e) => setSavings(Number(e.target.value))}
            className="w-full border border-border px-3 py-2 bg-background text-sm outline-none"
            data-testid="input-fiat-savings"
          />
        </div>
        <div>
          <label className="text-xs font-bold tracking-widest block mb-2">YEAR YOU STARTED SAVING</label>
          <select
            value={startYear}
            onChange={(e) => setStartYear(Number(e.target.value))}
            className="w-full border border-border px-3 py-2 bg-background text-sm outline-none"
            data-testid="select-fiat-year"
          >
            {Object.keys(M2_GROWTH_DATA).map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-foreground text-background p-8 mb-6" data-testid="fiat-result">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="text-xs text-background/60 mb-2">NOMINAL SAVINGS</div>
            <div className="font-serif font-black text-3xl">${savings.toLocaleString()}</div>
            <div className="text-xs text-background/60 mt-1">What you think you have</div>
          </div>
          <div>
            <div className="text-xs text-background/60 mb-2">PURCHASING POWER LOST</div>
            <div className="font-serif font-black text-3xl text-accent">-${lostValue.toLocaleString()}</div>
            <div className="text-xs text-background/60 mt-1">M2 growth over {years} year{years !== 1 ? "s" : ""}</div>
          </div>
          <div>
            <div className="text-xs text-background/60 mb-2">REAL VALUE IN {startYear} DOLLARS</div>
            <div className="font-serif font-black text-3xl">${realValue.toLocaleString()}</div>
            <div className="text-xs text-background/60 mt-1">What you actually have</div>
          </div>
        </div>
      </div>

      <div className="border border-border p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold tracking-widest">PURCHASING POWER REMAINING</span>
          <span className="text-sm font-bold">{100 - loss}%</span>
        </div>
        <div className="h-3 bg-muted">
          <div
            className="h-3 bg-foreground transition-all duration-500"
            style={{ width: `${100 - loss}%` }}
            data-testid="fiat-progress-bar"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          The M2 money supply has grown approximately {loss}% since {startYear}. This is the purchasing power that was quietly transferred away from savers.
        </p>
      </div>
    </div>
  );
}

export default function Tools() {
  usePageMeta(
    "Bitcoin Tools — Halving Countdown, DCA Calculator, Fiat Debaser — Moneyverse",
    "Free Bitcoin tools: live halving countdown clock, DCA accumulation projector, and fiat debasement calculator. Know where you stand."
  );

  return (
    <Layout>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12" data-testid="tools-hero">
        <p className="text-xs font-bold tracking-widest text-muted-foreground mb-6">TOOLS</p>
        <h1 className="font-serif font-black text-5xl sm:text-6xl leading-[0.9] mb-6">
          Know Where<br />
          <span className="text-accent">You Stand.</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Three calculators. All the clarity you need to understand your current position and build a better one.
        </p>
      </section>

      {/* Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-8" data-testid="tools-grid">
        <HalvingClock />
        <DCAProjector />
        <FiatDebaser />
      </section>
    </Layout>
  );
}
