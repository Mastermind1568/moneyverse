import { Link } from "wouter";
import Layout from "@/components/Layout";

const PAGES = [
  {
    num: "01",
    part: "Cover",
    title: "The Fiat Trap",
    subtitle: "Why Your Money Is Failing You — And What To Do About It",
    type: "cover",
  },
  {
    num: "02",
    part: "Part One — The Problem",
    title: "How Money Lost Its Anchor",
    type: "body",
    content: `In 1971, Richard Nixon ended the convertibility of the US dollar to gold. That single decision — known as the Nixon Shock — changed the nature of money for everyone on earth.

Before 1971, every dollar was a claim on a fixed quantity of gold. The government could not print more dollars than it had gold to back them. Supply was constrained. Purchasing power was protected.

After 1971, the dollar became a fiat currency — money by government decree, backed by nothing except institutional trust and the threat of legal compulsion. And when money can be created without limit, the incentives to create it without limit are overwhelming.

Governments that need to spend more than they tax can simply instruct the central bank to create the difference. The new money enters the economy as debt — and the cost of that creation is distributed across every holder of the existing currency, silently and without consent.

This is not ancient history. Between 2020 and 2022, the US Federal Reserve expanded the M2 money supply by over 40% in 24 months. The most aggressive peacetime monetary expansion in American history. And every other currency on earth — including every African currency — is downstream of that decision.`,
    pullQuote: "When money can be created without limit, the incentive to create it without limit is overwhelming.",
  },
  {
    num: "03",
    part: "Part One — The Problem",
    title: "The Silent Tax",
    type: "body",
    content: `Inflation is not a natural phenomenon. It is a policy outcome. When more money chases the same quantity of goods, prices rise. Your savings — measured in nominal terms — may look the same. But what those savings can actually buy quietly shrinks.

Consider the mathematics. If the money supply grows at 7% per year (a historically conservative figure for major central banks), and your savings account pays 2%, you are losing purchasing power at 5% annually. In ten years, your savings have lost 40% of their real value. You did nothing wrong. You saved diligently. The system extracted from you anyway.

The mechanism is known as the Cantillon Effect — named for 18th century economist Richard Cantillon. Those who receive newly created money first (financial institutions, government contractors, large corporations) spend it before prices have adjusted upward. They get full purchasing power from the new money. By the time the money reaches ordinary workers and savers, prices have already risen to reflect the increased supply. The last recipients bear the full cost of the dilution.

This is not a conspiracy theory. It is documented economic mechanics. And it is the precise mechanism that makes holding savings in any fiat currency — dollar, euro, naira, cedi, shilling — a slow drain on wealth.`,
    pullQuote: "You saved diligently. The system extracted from you anyway.",
  },
  {
    num: "04",
    part: "Part One — The Problem",
    title: "What CPI Doesn't Tell You",
    type: "body",
    content: `The Consumer Price Index — the official government measure of inflation — has been systematically redesigned over the past four decades to report a lower number than the original methodology would produce.

The original CPI measured the cost of a fixed basket of goods. If beef became unaffordable, the index captured the real cost increase. Modern CPI uses substitution bias: when a good becomes more expensive, the model assumes consumers switch to a cheaper alternative and measures the cheaper alternative instead. The result is a measure of downgraded consumption, not the cost of maintaining a standard of living.

Hedonic adjustments compound the problem. When a laptop costs the same price but has a faster processor, the BLS may record this as a price decrease — you're getting "more value" per dollar. Whether you needed the faster processor is irrelevant. Measured inflation falls.

Owners' equivalent rent — the largest single CPI component — does not measure actual housing costs. It asks homeowners what they think they could rent their home for. During the 2021–2023 housing boom, when market rents spiked dramatically, OER lagged by 12–18 months and never captured the peak severity.

The gap between official inflation and the lived experience of rising costs is not accidental. It serves the institutional interests of governments that have issued debt denominated in the currency they are quietly inflating away.`,
    pullQuote: "Official inflation measures the cost of downgraded consumption — not the cost of maintaining your standard of living.",
  },
  {
    num: "05",
    part: "Part One — The Problem",
    title: "The African Currency Problem",
    type: "body",
    content: `If the dollar is a leaking vessel, African currencies are often buckets with holes at the bottom. The structural vulnerabilities are compounded — not because African economies are inherently weak, but because of the monetary architecture imposed on them.

Most African currencies face a set of structural challenges that make wealth preservation uniquely difficult. Central banks with limited institutional independence regularly face political pressure to expand the money supply ahead of election cycles. External debt denominated in dollars means that currency depreciation directly increases the real debt burden. Commodity-dependent export revenues create boom-bust cycles tied to global price movements. Capital controls prevent ordinary citizens from protecting savings in harder currencies.

The result is predictable and historically documented. A currency that was worth $2.80 at independence can be worth fractions of a cent within a generation. Not through any failure of the people holding it — through structural forces operating at the institutional level.

The conventional response — "invest in local equities, buy property" — is not wrong. But it is insufficient. Property ties capital to a geography. Local equities are denominated in the same inflating currency. Neither solves the fundamental problem: there is no locally available monetary asset that cannot be debased by a decision made in a government building.

Bitcoin solves this at the protocol level. Its supply schedule is enforced by mathematics, not by any institution. No central bank, no IMF condition, no government decree can alter it.`,
    pullQuote: "There is no locally available monetary asset that cannot be debased by a decision made in a government building.",
  },
  {
    num: "06",
    part: "Part One — The Problem",
    title: "The Cantillon Winners",
    type: "body",
    content: `To understand the modern financial system, you need to understand who benefits from monetary expansion — because the wealth does not disappear. It is transferred.

When central banks create new money, the first recipients are primary dealer banks. These institutions can immediately deploy the new capital into assets — stocks, real estate, bonds — before prices have risen to reflect the new money. They capture the full purchasing power of the newly created currency.

As the money circulates outward — to corporations, to contractors, to wages — each successive recipient gets a slightly diluted version. By the time it reaches the average saver in the form of a 0.5% savings account rate, the asset prices the new money inflated are already out of reach.

This is why, in the decade from 2012 to 2022, asset prices rose dramatically while the lived experience of middle-income earners stagnated. Housing became less affordable. The stock market surged. Real wages barely moved. The system worked exactly as designed — but it was designed for the Cantillon winners, not for you.

The only escape from the Cantillon trap is to hold an asset that cannot be created by institutional decree. An asset whose supply is fixed regardless of what any government, central bank, or committee decides. The 21 million Bitcoin hard cap is not a feature — it is the point.`,
    pullQuote: "The system worked exactly as designed. It was designed for the Cantillon winners.",
  },
  {
    num: "07",
    part: "Part Two — The Solution",
    title: "Why Bitcoin Exists",
    type: "body",
    content: `Bitcoin was not invented to make people rich. It was invented to solve a problem: how do you create a digital monetary system that does not require trusting any institution?

Before Bitcoin, digital money was impossible without intermediaries. If you send a digital file, you still have it — digital information can be copied infinitely at near-zero cost. If I could send you a digital dollar and still have it, I could send the same dollar to a thousand people simultaneously. This "double spending problem" meant that every digital payment system required a trusted third party — a bank — to maintain an authoritative ledger.

Satoshi Nakamoto's solution was elegant: replace the trusted third party with a distributed ledger secured by computational work. Thousands of independent computers worldwide maintain identical copies of every transaction ever made. Adding a fraudulent transaction requires rewriting the entire history — a computational feat that would require more energy than the entire honest network combined. The cost of attack scales with the value of the network, making Bitcoin increasingly secure as it grows.

This architecture creates something genuinely new: a monetary system that operates without any institution. No central bank, no government, no company. The rules are enforced by code running on thousands of independent machines. The supply schedule — 21 million Bitcoin, diminishing issuance every four years — is as immutable as the laws of physics, because changing it would require consensus from every participant in the network simultaneously.

Bitcoin exists because the fiat system has a fundamental flaw that cannot be reformed from within. The flaw is trust. Bitcoin eliminates the need for it.`,
    pullQuote: "Bitcoin exists because the fiat system has a fundamental flaw that cannot be reformed from within. The flaw is trust.",
  },
  {
    num: "08",
    part: "Part Two — The Solution",
    title: "21 Million — Absolute Scarcity",
    type: "body",
    content: `There will only ever be 21 million Bitcoin. This is not a policy choice that can be revised at a committee meeting. It is enforced by every computer running the Bitcoin software, simultaneously and independently.

To understand why this matters, consider gold — Bitcoin's closest analogy. Gold has been humanity's hardest money for thousands of years because it is genuinely scarce and costly to produce. Miners cannot conjure gold from nothing; they must expend real labor and energy to extract it. This scarcity floor is what gave gold its monetary properties.

But gold is not perfectly scarce. The above-ground gold supply grows by approximately 1.5-2% per year through mining. Historically, sustained high gold prices have incentivized more mining, which eventually increases supply and moderates the price. Gold has a supply elasticity problem — it responds, imperfectly but meaningfully, to price signals.

Bitcoin has no supply elasticity. Regardless of the price — whether Bitcoin is worth $1 or $1 million per coin — only 3.125 new Bitcoin are created per block (after the 2024 halving). The mining difficulty adjusts to maintain the 10-minute block time, so increased mining activity does not produce more Bitcoin. It only makes the network more secure.

This is the first time in human history that an asset has achieved absolute provable scarcity. Not approximate scarcity like gold, not institutional scarcity like fiat (which has a policy constraint, not a mathematical one), but mathematical certainty verified by every participant in the network.

The implications for purchasing power preservation over a multi-decade time horizon are difficult to overstate.`,
    pullQuote: "For the first time in human history, an asset has achieved absolute provable scarcity — not by policy, but by mathematics.",
  },
  {
    num: "09",
    part: "Part Two — The Solution",
    title: "The Bitcoin Halving Cycle",
    type: "body",
    content: `Every 210,000 blocks — approximately every four years — the Bitcoin protocol automatically cuts the reward paid to miners in half. This is the Bitcoin halving, and it is the engine of Bitcoin's four-year market cycles.

The supply schedule is precise and immutable:
— 2009: 50 BTC per block
— 2012 (1st Halving): 25 BTC per block
— 2016 (2nd Halving): 12.5 BTC per block
— 2020 (3rd Halving): 6.25 BTC per block
— 2024 (4th Halving): 3.125 BTC per block
— 2028 (5th Halving): 1.5625 BTC per block

Each halving cuts the daily new Bitcoin supply roughly in half. When demand remains constant or increases and supply is suddenly cut, basic economics dictate that price must rise to reach equilibrium. The market takes months to absorb this supply shock — which is why Bitcoin's major bull markets typically begin 6–12 months after the halving.

The historical record is remarkable. The 2012 halving preceded a 9,500% price increase. The 2016 halving preceded a 2,900% increase. The 2020 halving preceded a 762% increase (from $8,000 to $69,000). Past performance is not guaranteed — but the underlying supply arithmetic is fixed in advance, and that arithmetic has not changed.

The 2024 halving occurred in April 2024. The cycle is already running. The question is not whether the next cycle will happen — that is determined by mathematics. The question is whether you have a position before it does.`,
    pullQuote: "The question is not whether the next cycle will happen — that is determined by mathematics. The question is whether you have a position.",
  },
  {
    num: "10",
    part: "Part Two — The Solution",
    title: "The Four Phases of Every Cycle",
    type: "body",
    content: `Every Bitcoin halving cycle moves through four recognizable phases. Understanding them is the difference between executing a protocol and reacting emotionally to price movements.

PHASE 1: ACCUMULATION (12–18 months post-crash)
Prices are low. Sentiment is at maximum despair. The previous bull market feels like a distant memory and the media has declared Bitcoin dead — for the fourth or fifth time. Volume is low. Most retail participants have either sold at a loss or stopped paying attention. This is when the lowest-cost Bitcoin is available. Sophisticated participants accumulate. Most do not.

PHASE 2: EXPANSION (Pre-halving through 6 months post-halving)
Prices begin recovering. The halving approaches and occurs. Early participants who accumulated in Phase 1 have significant unrealized gains. Renewed media interest. New participants begin entering. Momentum builds.

PHASE 3: BULL MARKET (6–18 months post-halving)
Parabolic price appreciation. All-time highs broken. Mainstream media coverage intensifies. Retail FOMO drives prices to levels that seem irrational in the moment and obvious in hindsight. Most people who will ever own Bitcoin in this cycle buy near the top.

PHASE 4: CORRECTION (12–18 months)
70–80% drawdown from peak. The majority of retail participants sell at a loss or hold in shock. Media declares Bitcoin dead. The next accumulation phase begins.

The protocol response is simple: accumulate most aggressively in Phase 1. Continue through Phase 2. Execute your pre-defined exit strategy in Phase 3. Do not participate in Phase 4 panic selling.`,
    pullQuote: "Most people who will ever own Bitcoin in this cycle buy near the top. The protocol ensures you are not one of them.",
  },
  {
    num: "11",
    part: "Part Two — The Solution",
    title: "Bitcoin vs Every Alternative",
    type: "body",
    content: `Every generation of savers has attempted to solve the wealth preservation problem. Understanding why the alternatives fall short clarifies why Bitcoin is not just another option — it is a different category.

CASH & SAVINGS ACCOUNTS
The most obvious choice and the worst-performing. At 2% annual interest against 6–8% real money supply growth, you are mathematically losing purchasing power every year. The institutional system that created the problem is managing your money's response to it.

GOLD
The historical hard money standard. Gold has genuine scarcity (supply grows ~1.5% per year), thousands of years of monetary credibility, and no counterparty risk when held physically. Its limitations: difficult to transport and divide, does not settle digitally, supply is not perfectly fixed (price-responsive mining), and you cannot send gold across a border in two seconds for near-zero cost.

REAL ESTATE
Excellent hedge against local inflation. Illiquid, indivisible, subject to taxes and government intervention, geographically concentrated, and requires significant capital to access. Does not solve the problem for people who cannot buy property.

STOCKS
Ownership of productive capital. Returns have historically beaten inflation. But denominated in the inflating currency, subject to regulatory risk, and requires trust in corporate governance and legal systems.

BITCOIN
Fixed supply of 21 million, enforced by mathematics. Perfectly divisible (to 8 decimal places). Settles globally in minutes. No counterparty risk if self-custodied. Genuinely portable — a seed phrase in your memory can cross any border. Available to anyone with a smartphone, regardless of geography or banking access. The first monetary asset that solves all the failure modes simultaneously.`,
    pullQuote: "Bitcoin is not just another option. It is a different category.",
  },
  {
    num: "12",
    part: "Part Three — The Protocol",
    title: "How to Buy Your First Bitcoin Safely",
    type: "body",
    content: `Most Bitcoin education skips this step — assuming you already have Bitcoin or know how to get it. This page covers the protocol for first acquisition.

STEP 1: CHOOSE A REGULATED EXCHANGE
Use a regulated, reputable exchange with a verifiable track record. In Africa, options include Yellow Card (available across 15+ African countries), Binance P2P (available widely), and Bitnob (Nigeria, Ghana, Kenya). In the diaspora, Coinbase, River, and Swan Bitcoin are strong options. Avoid small, unregulated exchanges. The FTX collapse destroyed $8 billion in customer funds overnight.

STEP 2: COMPLETE IDENTITY VERIFICATION
Regulated exchanges require KYC (Know Your Customer) verification — typically a government ID and a selfie. This takes 10–30 minutes. Do it once. It is the price of access to a reliable fiat on-ramp.

STEP 3: START SMALL
Your first purchase should be small — an amount you are comfortable losing entirely. This is a learning purchase. The goal is to understand the mechanics: the interface, transaction confirmation times, how addresses work.

STEP 4: UNDERSTAND WHAT YOU ARE BUYING
You are buying ownership of a fraction of a Bitcoin, recorded on a distributed ledger maintained by thousands of computers worldwide. No company controls it. No government can confiscate it if it's in self-custody. The private key is the proof of ownership.

STEP 5: IMMEDIATELY PLAN YOUR CUSTODY STRATEGY
Bitcoin on an exchange is not your Bitcoin. An exchange holds the keys on your behalf. Learn the self-custody protocol in the next chapter before accumulating significant amounts.`,
    pullQuote: "Bitcoin on an exchange is not your Bitcoin. The exchange holds the keys on your behalf.",
  },
  {
    num: "13",
    part: "Part Three — The Protocol",
    title: "Self-Custody — Your Keys, Your Coins",
    type: "body",
    content: `"Not your keys, not your coins" is not a slogan. It is a principle that has cost exchange customers billions of dollars in losses.

When Bitcoin is held on an exchange, the exchange controls the private keys. You have a number on a screen that represents a claim — but it is an unsecured, uninsured claim on a company whose solvency you cannot verify. FTX had $8 billion in customer funds. Then it didn't. Mt. Gox, Celsius, BlockFi, Voyager — the pattern repeats.

Self-custody eliminates counterparty risk entirely. You hold the private keys. No company, no government, no bank has the ability to freeze, seize, or lose your Bitcoin. The tradeoff is responsibility: if you lose your seed phrase and your backup, the Bitcoin is permanently inaccessible.

THE HARDWARE WALLET PROTOCOL
For amounts above $1,000, use a hardware wallet — a dedicated device that stores private keys offline. Ledger and Trezor are the two dominant manufacturers. Buy directly from the manufacturer's website. Never from Amazon or secondary markets.

THE SEED PHRASE
During setup, your device generates a 12–24 word seed phrase. This phrase is the master backup of your entire Bitcoin position. Write it by hand on paper. Store in two separate physical locations (home safe and a second trusted location). Never photograph it. Never type it into a computer. Never share it with anyone.

VERIFICATION IS NON-NEGOTIABLE
Before transferring significant Bitcoin to self-custody, test your recovery procedure: use a different wallet application, enter your seed phrase, confirm the same Bitcoin addresses appear. If you cannot recover with your backup, your backup is worthless.`,
    pullQuote: "Self-custody eliminates counterparty risk entirely. The tradeoff is responsibility.",
  },
  {
    num: "14",
    part: "Part Three — The Protocol",
    title: "Dollar Cost Averaging — The Accumulation Engine",
    type: "body",
    content: `Dollar Cost Averaging (DCA) is the practice of purchasing a fixed amount of Bitcoin at regular intervals — weekly or monthly — regardless of price. It is the simplest, most battle-tested accumulation strategy available to individual investors.

WHY DCA WORKS
Time in market beats timing the market. Identifying the exact bottom of any asset is impossible — even professional traders with superior information routinely fail at it. DCA removes the need to predict. By buying at fixed intervals, you automatically acquire more Bitcoin when prices are low (your fixed amount buys more sats) and less when prices are high. Over a full cycle, the average cost typically compares favourably to any attempt to time purchases.

THE PSYCHOLOGICAL ADVANTAGE
DCA removes the two most destructive emotions from investing: fear (which causes people to wait indefinitely for a "better price" that never comes) and greed (which causes people to buy more than they can sustain at peak excitement). A pre-committed, automated DCA schedule executes mechanically, independent of how you feel on any given day.

DYNAMIC DCA — THE CYCLE-AWARE UPGRADE
Once you understand the four-phase halving cycle, you can improve on basic DCA with a simple adjustment: invest more during Phase 1 (accumulation, post-crash) and less during Phase 3 (bull market peak). Example: 2x your baseline during the accumulation phase, 0.5x during peak euphoria signals (MVRV Z-Score above 5, extreme media coverage). This dynamic approach improves average cost basis without requiring precise market timing.

THE STARTING PROTOCOL
Choose an amount you can sustain for 4 years without touching. Set a recurring purchase. Stack sats. Withdraw to self-custody monthly or quarterly. Do not check the price daily.`,
    pullQuote: "Time in market beats timing the market. DCA removes the need to predict.",
  },
  {
    num: "15",
    part: "Part Three — The Protocol",
    title: "Building Your Exit Strategy",
    type: "body",
    content: `An entry strategy without an exit strategy is speculation, not protocol. Most Bitcoin investors who "missed" the last cycle had Bitcoin — they just didn't sell anything near the top because they had no pre-defined exit plan.

THE FUNDAMENTAL PRINCIPLE
You cannot identify the exact top in real time. No indicator, analyst, or model can. The goal of an exit strategy is not to capture the last dollar — it is to capture enough of the move to meaningfully change your financial situation. Perfect is the enemy of profitable.

STEP 1: DEFINE YOUR FINANCIAL GOALS FIRST
Before any price targets, write down what you want to accomplish with your Bitcoin gains. Specific, concrete outcomes: clear a specific debt, fund a specific purchase, reach a specific net worth number. Vague goals produce vague exits. Concrete goals produce executed exits.

STEP 2: BUILD A LADDER SELLING PLAN
Ladder selling means selling predetermined percentages at predetermined price levels — not all at once.
Example: Sell 10% at $120,000 · Sell 15% at $150,000 · Sell 20% at $200,000 · Sell 25% at $250,000 · Hold the remainder as long-term strategic position.

STEP 3: USE ON-CHAIN INDICATORS AS CONFIRMATION
Key signals that historically precede cycle peaks:
— MVRV Z-Score above 7: historically signals overvaluation
— NUPL above 0.75: signals euphoria phase
— Puell Multiple above 4: historically precedes major corrections
Use these to confirm your ladder levels, not replace them.

STEP 4: PRE-COMMIT YOUR ORDERS
Set limit sell orders during the accumulation phase — before the bull market begins. Pre-committed orders execute without requiring you to overcome the psychological barrier of selling Bitcoin during an euphoric bull run.`,
    pullQuote: "An entry strategy without an exit strategy is speculation, not protocol.",
  },
  {
    num: "16",
    part: "Part Three — The Protocol",
    title: "The 5 Mistakes That Kill Bitcoin Positions",
    type: "body",
    content: `Understanding what not to do is as important as understanding what to do. These five mistakes have destroyed more Bitcoin wealth than any market crash.

MISTAKE 1: KEEPING BITCOIN ON EXCHANGES
Already covered — but worth repeating as the single most common and catastrophic mistake. Exchanges fail. The solution is self-custody. There is no exception to this rule for amounts above your emergency fund equivalent.

MISTAKE 2: BUYING ALTCOINS INSTEAD OF BITCOIN
Every cycle produces thousands of alternative cryptocurrencies promising superior technology, faster transactions, or higher yields. The overwhelming majority go to zero or near-zero within one cycle. Bitcoin's monetary properties — fixed supply, absolute decentralization, maximum security — are emergent from its unique history and cannot be replicated. The risk-adjusted case for altcoins is almost never what it appears to be.

MISTAKE 3: SELLING DURING BEAR MARKETS
The bear market is the accumulation phase. Selling at -70% locks in permanent losses and eliminates the position needed for the next bull market. The people who built real wealth through Bitcoin almost universally held through multiple bear markets without selling their core position.

MISTAKE 4: OVERCONCENTRATION WITHOUT AN EXIT PLAN
Allocating more capital to Bitcoin than you can sustain psychologically during a bear market is a guarantee of a distressed sale. Only allocate what you can genuinely leave untouched for 4+ years.

MISTAKE 5: NO SEED PHRASE BACKUP
Hardware wallet failure. Lost device. Forgotten PIN. Any of these events is recoverable — as long as you have your seed phrase. Without it, your Bitcoin is permanently inaccessible. There is no recovery process, no customer service line, no legal remedy.`,
    pullQuote: "The people who built real wealth through Bitcoin almost universally held through multiple bear markets without selling.",
  },
  {
    num: "17",
    part: "Conclusion",
    title: "What Comes Next",
    type: "final",
    content: `You now have the framework. The fiat system and why it extracts from savers. Bitcoin's monetary properties and why they are genuinely different. The halving cycle and the four phases that repeat every four years. The accumulation protocol, the custody protocol, and the exit architecture.

This 17-page guide is the thesis. The Blueprint is the execution manual.

Where the guide explains concepts, The Blueprint provides step-by-step protocols. Where the guide describes DCA, The Blueprint provides the exact multiplier framework. Where the guide covers self-custody, The Blueprint walks you through the complete setup — hardware selection, seed phrase backup, verification, inheritance planning — in a single 21-day activation sequence.

The 2024 halving occurred in April 2024. The cycle is live. The historical pattern of 6–18 months from halving to bull market peak suggests the window of maximum accumulation opportunity is now or very soon. This is not a price prediction. It is a statement about the supply arithmetic.

The Blueprint is 11 modules, 85 lessons, one payment. It does not require prior knowledge of Bitcoin or finance. It requires only the willingness to follow a protocol — one step per day for 21 days — and the conviction that your financial situation deserves a serious response to a serious problem.

You already have the thesis. Now build the position.`,
  },
];

function PageCover() {
  return (
    <div style={{ background: "var(--mv-black)", minHeight: "100vh", display: "flex", flexDirection: "column" as const, justifyContent: "space-between", padding: "80px 80px 60px", borderBottom: "2px solid #222", position: "relative" as const, overflow: "hidden" }}>
      <div style={{ position: "absolute" as const, right: "-5%", bottom: "-10%", width: "60vw", height: "60vw", borderRadius: "50%", border: "1px solid #222", pointerEvents: "none" }} />
      <div style={{ position: "absolute" as const, right: "5%", bottom: "0%", width: "40vw", height: "40vw", borderRadius: "50%", border: "1px solid #1a1a1a", pointerEvents: "none" }} />
      <div style={{ position: "relative" as const, zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 80 }}>
          <span style={{ width: 32, height: 32, background: "var(--mv-accent)", display: "inline-block", flexShrink: 0 }} />
          <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 13, letterSpacing: "0.1em", color: "#fff" }}>MONEYVERSE</span>
        </div>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.2em", color: "var(--mv-n600)", marginBottom: 32, textTransform: "uppercase" as const }}>Free Guide — 17 Pages</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(3.5rem, 8vw, 9rem)", color: "#fff", lineHeight: 0.9, marginBottom: 48, maxWidth: 900 }}>
          The<br />Fiat<br /><em style={{ color: "var(--mv-accent)" }}>Trap</em>
        </h1>
        <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(16px, 2vw, 24px)", color: "var(--mv-n400)", maxWidth: 560, lineHeight: 1.7 }}>
          Why your money is failing you — and the operating protocol for building your way out
        </p>
      </div>
      <div style={{ position: "relative" as const, zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap" as const, gap: 20 }}>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n600)", letterSpacing: "0.12em", lineHeight: 2 }}>
          FIAT TRAP · HALVING CYCLE · SELF-CUSTODY<br />DCA PROTOCOL · EXIT STRATEGY · BITCOIN THESIS
        </p>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n600)", letterSpacing: "0.12em" }}>PG. 01 / 17</p>
      </div>
    </div>
  );
}

function PageBody({ page, index }: { page: typeof PAGES[number]; index: number }) {
  const isEven = index % 2 === 0;
  const bg = isEven ? "#fff" : "var(--mv-n50)";
  const paragraphs = "content" in page ? (page.content as string).split("\n\n") : [];

  return (
    <div style={{ background: bg, minHeight: "100vh", padding: "80px 80px 60px", borderBottom: "2px solid var(--mv-black)", position: "relative" as const }} className="guide-page-pad">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: 64, alignItems: "start", maxWidth: 1100 }} className="guide-grid">
        <div style={{ position: "sticky" as const, top: 80 }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "var(--mv-n400)", marginBottom: 16, textTransform: "uppercase" as const }}>{page.part}</p>
          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(4rem, 6vw, 6rem)", color: "var(--mv-accent)", lineHeight: 1, marginBottom: 24 }}>{page.num}</div>
          {"pullQuote" in page && page.pullQuote && (
            <div style={{ borderLeft: "3px solid var(--mv-accent)", paddingLeft: 20, marginTop: 32 }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 15, color: "var(--mv-n600)", lineHeight: 1.7 }}>"{page.pullQuote as string}"</p>
            </div>
          )}
        </div>
        <div>
          <span style={{ display: "block", width: 40, height: 3, background: "var(--mv-accent)", marginBottom: 24 }} />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 3.5vw, 3.5rem)", color: "var(--mv-black)", lineHeight: 1.05, marginBottom: 40 }}>{page.title}</h2>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 24 }}>
            {paragraphs.map((p, i) => {
              const isDash = p.startsWith("—");
              return (
                <p key={i} style={{
                  fontFamily: isDash ? "'Space Mono', monospace" : "'Inter', sans-serif",
                  fontSize: isDash ? 12 : 16,
                  color: isDash ? "var(--mv-n600)" : "var(--mv-n700)",
                  lineHeight: isDash ? 1.9 : 1.85,
                  letterSpacing: isDash ? "0.02em" : "normal",
                  paddingLeft: isDash ? 16 : 0,
                  borderLeft: isDash ? "2px solid var(--mv-n200)" : "none",
                  whiteSpace: "pre-line" as const,
                }}>
                  {p}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 48 }}>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n400)", letterSpacing: "0.12em" }}>PG. {page.num} / 17</p>
      </div>
    </div>
  );
}

function PageFinal() {
  const page = PAGES[PAGES.length - 1];
  const paragraphs = "content" in page ? (page.content as string).split("\n\n") : [];
  return (
    <div style={{ background: "var(--mv-black)", minHeight: "100vh", padding: "80px 80px 80px", position: "relative" as const, overflow: "hidden" }} className="guide-page-pad">
      <div style={{ position: "absolute" as const, left: "-5%", top: "50%", transform: "translateY(-50%)", width: "50vw", height: "50vw", borderRadius: "50%", background: "var(--mv-accent)", opacity: 0.04, pointerEvents: "none" }} />
      <div style={{ position: "relative" as const, zIndex: 1, display: "grid", gridTemplateColumns: "1fr 3fr", gap: 64, alignItems: "start", maxWidth: 1100 }} className="guide-grid">
        <div>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "var(--mv-n600)", marginBottom: 16, textTransform: "uppercase" as const }}>{page.part}</p>
          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(4rem, 6vw, 6rem)", color: "var(--mv-accent)", lineHeight: 1 }}>{page.num}</div>
        </div>
        <div>
          <span style={{ display: "block", width: 40, height: 3, background: "var(--mv-accent)", marginBottom: 24 }} />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 3.5vw, 3.5rem)", color: "#fff", lineHeight: 1.05, marginBottom: 40 }}>{page.title}</h2>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 24, marginBottom: 60 }}>
            {paragraphs.map((p, i) => (
              <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: "var(--mv-n400)", lineHeight: 1.85 }}>{p}</p>
            ))}
          </div>
          <div style={{ borderTop: "1px solid #333", paddingTop: 48 }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.2em", color: "var(--mv-n600)", marginBottom: 24, textTransform: "uppercase" as const }}>Ready to execute</p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#fff", lineHeight: 1.05, marginBottom: 20 }}>
              You have the thesis<br /><em style={{ color: "var(--mv-accent)" }}>Now build the position</em>
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "var(--mv-n500)", lineHeight: 1.8, maxWidth: 520, marginBottom: 40 }}>
              The Blueprint is 11 modules, 85 lessons, one payment. A complete 21-day activation protocol that takes everything in this guide and turns it into executed action. No prior knowledge required.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" as const }}>
              <Link href="/pricing">
                <span style={{ display: "inline-flex", alignItems: "center", gap: 14, fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 11, letterSpacing: "0.08em", background: "var(--mv-accent)", color: "#000", padding: "20px 40px", cursor: "pointer" }}>
                  Get The Blueprint · $97
                  <svg width="14" height="9" viewBox="0 0 16 10" fill="none"><path d="M11 1l4 4-4 4M15 5H1" stroke="#000" strokeWidth="1.5" strokeLinecap="square"/></svg>
                </span>
              </Link>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n600)", letterSpacing: "0.12em", lineHeight: 2 }}>
                ONE-TIME · LIFETIME ACCESS<br />21-DAY CONDITIONAL GUARANTEE
              </p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 48, position: "relative" as const, zIndex: 1 }}>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n600)", letterSpacing: "0.12em" }}>PG. 17 / 17</p>
      </div>
    </div>
  );
}

export default function FreeGuide() {
  return (
    <Layout>
      {/* Nav strip */}
      <div style={{ background: "var(--mv-black)", borderBottom: "1px solid #222", padding: "16px 80px", display: "flex", justifyContent: "space-between", alignItems: "center" }} className="guide-nav-pad">
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Link href="/">
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.15em", color: "var(--mv-n600)", cursor: "pointer" }}>← MONEYVERSE.NETWORK</span>
          </Link>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.15em", color: "var(--mv-n800)" }}>|</span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.15em", color: "var(--mv-n600)" }}>FREE GUIDE — THE FIAT TRAP</span>
        </div>
        <Link href="/pricing">
          <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 9, letterSpacing: "0.12em", background: "var(--mv-accent)", color: "#000", padding: "10px 20px", cursor: "pointer" }}>GET THE BLUEPRINT →</span>
        </Link>
      </div>

      {/* Pages */}
      <PageCover />
      {PAGES.slice(1, PAGES.length - 1).map((page, i) => (
        <PageBody key={page.num} page={page} index={i} />
      ))}
      <PageFinal />

      <style>{`
        .guide-page-pad { padding: 80px 80px 60px; }
        .guide-nav-pad { padding: 16px 80px; }
        .guide-grid { grid-template-columns: 1fr 3fr; }
        @media (max-width: 900px) {
          .guide-page-pad { padding: 48px 24px 40px !important; }
          .guide-nav-pad { padding: 16px 24px !important; }
          .guide-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </Layout>
  );
}
