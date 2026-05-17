import { Link } from "wouter";
import Layout from "@/components/Layout";

const PAGES = [
  {
    num: "01",
    part: "Cover",
    title: "The Fiat Trap",
    subtitle: "Why your money is failing you, and the operating protocol for building your way out",
    type: "cover",
  },
  {
    num: "02",
    part: "Part One / The Problem",
    title: "How Money Lost Its Anchor",
    type: "body",
    pullQuote: "When money can be created without limit, the incentive to create it without limit is overwhelming.",
    content: [
      "In 1971, Richard Nixon ended the convertibility of the US dollar to gold. That single decision, known as the Nixon Shock, changed the nature of money for everyone on earth.",
      "Before 1971, every dollar was a claim on a fixed quantity of gold. The government could not print more dollars than it had gold to back them. Supply was constrained. Purchasing power was protected.",
      "After 1971, the dollar became a fiat currency: money by government decree, backed by nothing except institutional trust and the threat of legal compulsion. When money can be created without limit, the incentives to create it without limit are overwhelming.",
      "Governments that need to spend more than they tax can simply instruct the central bank to create the difference. The new money enters the economy as debt, and the cost of that creation is distributed across every holder of the existing currency, silently and without consent.",
      "This is not ancient history. Between 2020 and 2022, the US Federal Reserve expanded the M2 money supply by over 40% in 24 months. The most aggressive peacetime monetary expansion in American history. And every other currency on earth, including every African currency, is downstream of that decision.",
    ],
  },
  {
    num: "03",
    part: "Part One / The Problem",
    title: "The Silent Tax",
    type: "body",
    pullQuote: "You saved diligently. The system extracted from you anyway.",
    content: [
      "Inflation is not a natural phenomenon. It is a policy outcome. When more money chases the same quantity of goods, prices rise. Your savings, measured in nominal terms, may look the same. But what those savings can actually buy quietly shrinks.",
      "Consider the mathematics. If the money supply grows at 7% per year, a historically conservative figure for major central banks, and your savings account pays 2%, you are losing purchasing power at 5% annually. In ten years, your savings have lost 40% of their real value. You did nothing wrong. You saved diligently. The system extracted from you anyway.",
      "The mechanism is known as the Cantillon Effect, named for 18th century economist Richard Cantillon. Those who receive newly created money first spend it before prices have adjusted upward. They get full purchasing power from the new money. By the time the money reaches ordinary workers and savers, prices have already risen. The last recipients bear the full cost of the dilution.",
      "This is not a conspiracy theory. It is documented economic mechanics. And it is the precise mechanism that makes holding savings in any fiat currency, whether dollar, euro, naira, cedi, or shilling, a slow drain on wealth.",
    ],
  },
  {
    num: "04",
    part: "Part One / The Problem",
    title: "What CPI Does Not Tell You",
    type: "body",
    pullQuote: "Official inflation measures the cost of downgraded consumption, not the cost of maintaining your standard of living.",
    content: [
      "The Consumer Price Index, the official government measure of inflation, has been systematically redesigned over the past four decades to report a lower number than the original methodology would produce.",
      "The original CPI measured the cost of a fixed basket of goods. If beef became unaffordable, the index captured the real cost increase. Modern CPI uses substitution bias: when a good becomes more expensive, the model assumes consumers switch to a cheaper alternative. The result is a measure of downgraded consumption, not the cost of maintaining a standard of living.",
      "Hedonic adjustments compound the problem. When a laptop costs the same price but has a faster processor, the BLS may record this as a price decrease, because you are getting more value per dollar. Whether you needed the faster processor is irrelevant. Measured inflation falls.",
      "Owners' equivalent rent, the largest single CPI component, does not measure actual housing costs. It asks homeowners what they think they could rent their home for. During the 2021 to 2023 housing boom, OER lagged by 12 to 18 months and never captured the peak severity.",
      "The gap between official inflation and the lived experience of rising costs is not accidental. It serves the institutional interests of governments that have issued debt denominated in the currency they are quietly inflating away.",
    ],
  },
  {
    num: "05",
    part: "Part One / The Problem",
    title: "The African Currency Problem",
    type: "body",
    pullQuote: "There is no locally available monetary asset that cannot be debased by a decision made in a government building.",
    content: [
      "If the dollar is a leaking vessel, African currencies often face compounded structural vulnerabilities. Not because African economies are inherently weak, but because of the monetary architecture imposed on them.",
      "Most African currencies face challenges that make wealth preservation uniquely difficult. Central banks with limited institutional independence regularly face political pressure to expand the money supply ahead of election cycles. External debt denominated in dollars means that currency depreciation directly increases the real debt burden. Capital controls prevent ordinary citizens from protecting savings in harder currencies.",
      "The result is predictable and historically documented. A currency that was worth $2.80 at independence can be worth fractions of a cent within a generation. Not through any failure of the people holding it, but through structural forces operating at the institutional level.",
      "The conventional response, invest in local equities and buy property, is not wrong. But it is insufficient. Property ties capital to a geography. Local equities are denominated in the same inflating currency. Neither solves the fundamental problem: there is no locally available monetary asset that cannot be debased by a decision made in a government building.",
      "Bitcoin solves this at the protocol level. Its supply schedule is enforced by mathematics, not by any institution. No central bank, no IMF condition, no government decree can alter it.",
    ],
  },
  {
    num: "06",
    part: "Part One / The Problem",
    title: "The Cantillon Winners",
    type: "body",
    pullQuote: "The system worked exactly as designed. It was designed for the Cantillon winners.",
    content: [
      "To understand the modern financial system, you need to understand who benefits from monetary expansion, because the wealth does not disappear. It is transferred.",
      "When central banks create new money, the first recipients are primary dealer banks. These institutions can immediately deploy the new capital into assets: stocks, real estate, bonds, before prices have risen to reflect the new money. They capture the full purchasing power of the newly created currency.",
      "As the money circulates outward to corporations, to contractors, to wages, each successive recipient gets a slightly diluted version. By the time it reaches the average saver in the form of a 0.5% savings account rate, the asset prices the new money inflated are already out of reach.",
      "This is why, in the decade from 2012 to 2022, asset prices rose dramatically while the lived experience of middle-income earners stagnated. Housing became less affordable. The stock market surged. Real wages barely moved. The system worked exactly as designed, but it was designed for the Cantillon winners, not for you.",
      "The only escape from the Cantillon trap is to hold an asset that cannot be created by institutional decree. An asset whose supply is fixed regardless of what any government, central bank, or committee decides. The 21 million Bitcoin hard cap is not a feature. It is the point.",
    ],
  },
  {
    num: "07",
    part: "Part Two / The Solution",
    title: "Why Bitcoin Exists",
    type: "body",
    pullQuote: "Bitcoin exists because the fiat system has a fundamental flaw that cannot be reformed from within. The flaw is trust.",
    content: [
      "Bitcoin was not invented to make people rich. It was invented to solve a problem: how do you create a digital monetary system that does not require trusting any institution?",
      "Before Bitcoin, digital money was impossible without intermediaries. If you send a digital file, you still have it. Digital information can be copied infinitely at near-zero cost. If you could send a digital dollar and still have it, you could send the same dollar to a thousand people simultaneously. This double spending problem meant every digital payment system required a trusted third party, a bank, to maintain an authoritative ledger.",
      "Satoshi Nakamoto's solution was elegant: replace the trusted third party with a distributed ledger secured by computational work. Thousands of independent computers worldwide maintain identical copies of every transaction ever made. Adding a fraudulent transaction requires rewriting the entire history, a computational feat that would require more energy than the entire honest network combined.",
      "This architecture creates something genuinely new: a monetary system that operates without any institution. No central bank, no government, no company. The rules are enforced by code running on thousands of independent machines. The supply schedule, 21 million Bitcoin with diminishing issuance every four years, is as immutable as the laws of physics.",
      "Bitcoin exists because the fiat system has a fundamental flaw that cannot be reformed from within. The flaw is trust. Bitcoin eliminates the need for it.",
    ],
  },
  {
    num: "08",
    part: "Part Two / The Solution",
    title: "21 Million: Absolute Scarcity",
    type: "body",
    pullQuote: "For the first time in human history, an asset has achieved absolute provable scarcity: not by policy, but by mathematics.",
    content: [
      "There will only ever be 21 million Bitcoin. This is not a policy choice that can be revised at a committee meeting. It is enforced by every computer running the Bitcoin software, simultaneously and independently.",
      "To understand why this matters, consider gold, Bitcoin's closest analogy. Gold has been humanity's hardest money for thousands of years because it is genuinely scarce and costly to produce. Miners cannot conjure gold from nothing. They must expend real labor and energy to extract it. This scarcity floor is what gave gold its monetary properties.",
      "But gold is not perfectly scarce. The above-ground gold supply grows by approximately 1.5% to 2% per year through mining. Historically, sustained high gold prices have incentivized more mining, which eventually increases supply and moderates the price. Gold has a supply elasticity problem.",
      "Bitcoin has no supply elasticity. Regardless of the price, only 3.125 new Bitcoin are created per block after the 2024 halving. The mining difficulty adjusts to maintain the 10-minute block time, so increased mining activity does not produce more Bitcoin. It only makes the network more secure.",
      "This is the first time in human history that an asset has achieved absolute provable scarcity. Not approximate scarcity like gold, not institutional scarcity like fiat, but mathematical certainty verified by every participant in the network. The implications for purchasing power preservation over a multi-decade time horizon are difficult to overstate.",
    ],
  },
  {
    num: "09",
    part: "Part Two / The Solution",
    title: "The Bitcoin Halving Cycle",
    type: "body",
    pullQuote: "The question is not whether the next cycle will happen. That is determined by mathematics. The question is whether you have a position.",
    content: [
      "Every 210,000 blocks, approximately every four years, the Bitcoin protocol automatically cuts the reward paid to miners in half. This is the Bitcoin halving, and it is the engine of Bitcoin's four-year market cycles.",
      "The supply schedule is precise and immutable. In 2009: 50 BTC per block. After the 2012 halving: 25 BTC. After the 2016 halving: 12.5 BTC. After the 2020 halving: 6.25 BTC. After the 2024 halving: 3.125 BTC. After the 2028 halving: 1.5625 BTC.",
      "Each halving cuts the daily new Bitcoin supply roughly in half. When demand remains constant or increases and supply is suddenly cut, basic economics dictate that price must rise to reach equilibrium. The market takes months to absorb this supply shock, which is why Bitcoin's major bull markets typically begin 6 to 12 months after the halving.",
      "The historical record is remarkable. The 2012 halving preceded a 9,500% price increase. The 2016 halving preceded a 2,900% increase. The 2020 halving preceded a 762% increase, from $8,000 to $69,000. Past performance is not guaranteed, but the underlying supply arithmetic is fixed in advance, and that arithmetic has not changed.",
      "The 2024 halving occurred in April 2024. The cycle is already running. The question is not whether the next cycle will happen: that is determined by mathematics. The question is whether you have a position before it does.",
    ],
  },
  {
    num: "10",
    part: "Part Two / The Solution",
    title: "The Four Phases of Every Cycle",
    type: "body",
    pullQuote: "Most people who will ever own Bitcoin in this cycle buy near the top. The protocol ensures you are not one of them.",
    content: [
      "Every Bitcoin halving cycle moves through four recognizable phases. Understanding them is the difference between executing a protocol and reacting emotionally to price movements.",
      "PHASE 1: ACCUMULATION (12 to 18 months post-crash). Prices are low. Sentiment is at maximum despair. The previous bull market feels like a distant memory and the media has declared Bitcoin dead. Volume is low. Most retail participants have either sold at a loss or stopped paying attention. This is when the lowest-cost Bitcoin is available. Sophisticated participants accumulate. Most do not.",
      "PHASE 2: EXPANSION (Pre-halving through 6 months post-halving). Prices begin recovering. The halving approaches and occurs. Early participants who accumulated in Phase 1 have significant unrealized gains. Renewed media interest. New participants begin entering. Momentum builds.",
      "PHASE 3: BULL MARKET (6 to 18 months post-halving). Parabolic price appreciation. All-time highs broken. Mainstream media coverage intensifies. Retail FOMO drives prices to levels that seem irrational in the moment and obvious in hindsight. Most people who will ever own Bitcoin in this cycle buy near the top.",
      "PHASE 4: CORRECTION (12 to 18 months). 70 to 80% drawdown from peak. The majority of retail participants sell at a loss or hold in shock. The next accumulation phase begins. The protocol response is simple: accumulate most aggressively in Phase 1. Execute your pre-defined exit strategy in Phase 3. Do not participate in Phase 4 panic selling.",
    ],
  },
  {
    num: "11",
    part: "Part Two / The Solution",
    title: "Bitcoin vs Every Alternative",
    type: "body",
    pullQuote: "Bitcoin is not just another option. It is a different category of asset entirely.",
    content: [
      "Every generation of savers has attempted to solve the wealth preservation problem. Understanding why the alternatives fall short clarifies why Bitcoin is not just another option: it is a different category.",
      "CASH AND SAVINGS ACCOUNTS. The most obvious choice and the worst-performing. At 2% annual interest against 6 to 8% real money supply growth, you are mathematically losing purchasing power every year. The institutional system that created the problem is managing your money's response to it.",
      "GOLD. The historical hard money standard. Gold has genuine scarcity, thousands of years of monetary credibility, and no counterparty risk when held physically. Its limitations: difficult to transport and divide, does not settle digitally, and supply responds slowly to price signals. You cannot send gold across a border in two seconds for near-zero cost.",
      "REAL ESTATE. Excellent hedge against local inflation. Illiquid, indivisible, subject to taxes and government intervention, geographically concentrated, and requires significant capital to access. Does not solve the problem for people who cannot buy property.",
      "BITCOIN. Fixed supply of 21 million, enforced by mathematics. Perfectly divisible to 8 decimal places. Settles globally in minutes. No counterparty risk if self-custodied. Genuinely portable: a seed phrase in your memory can cross any border. Available to anyone with a smartphone, regardless of geography or banking access. The first monetary asset that solves all the failure modes simultaneously.",
    ],
  },
  {
    num: "12",
    part: "Part Three / The Protocol",
    title: "How to Buy Your First Bitcoin Safely",
    type: "body",
    pullQuote: "Bitcoin on an exchange is not your Bitcoin. The exchange holds the keys on your behalf.",
    content: [
      "Most Bitcoin education skips this step, assuming you already have Bitcoin or know how to get it. This page covers the protocol for first acquisition.",
      "STEP 1: CHOOSE A REGULATED EXCHANGE. Use a regulated, reputable exchange with a verifiable track record. In Africa, options include Yellow Card (available across 15+ countries), Binance P2P, and Bitnob for Nigeria, Ghana, and Kenya. In the diaspora, Coinbase, River, and Swan Bitcoin are strong options. Avoid small, unregulated exchanges. The FTX collapse destroyed $8 billion in customer funds overnight.",
      "STEP 2: COMPLETE IDENTITY VERIFICATION. Regulated exchanges require KYC verification: a government ID and a selfie. This takes 10 to 30 minutes. Do it once. It is the price of access to a reliable fiat on-ramp.",
      "STEP 3: START SMALL. Your first purchase should be a small amount you are comfortable losing entirely. This is a learning purchase. The goal is to understand the mechanics: the interface, transaction confirmation times, and how addresses work.",
      "STEP 4: IMMEDIATELY PLAN YOUR CUSTODY STRATEGY. Bitcoin on an exchange is not your Bitcoin. An exchange holds the keys on your behalf. Learn the self-custody protocol before accumulating significant amounts.",
    ],
  },
  {
    num: "13",
    part: "Part Three / The Protocol",
    title: "Self-Custody: Your Keys, Your Coins",
    type: "body",
    pullQuote: "Self-custody eliminates counterparty risk entirely. The tradeoff is responsibility.",
    content: [
      "Not your keys, not your coins is not a slogan. It is a principle that has cost exchange customers billions of dollars in losses.",
      "When Bitcoin is held on an exchange, the exchange controls the private keys. You have a number on a screen that represents a claim, but it is an unsecured, uninsured claim on a company whose solvency you cannot verify. FTX had $8 billion in customer funds. Then it did not. Mt. Gox, Celsius, BlockFi, Voyager: the pattern repeats.",
      "Self-custody eliminates counterparty risk entirely. You hold the private keys. No company, no government, no bank has the ability to freeze, seize, or lose your Bitcoin. The tradeoff is responsibility: if you lose your seed phrase and your backup, the Bitcoin is permanently inaccessible.",
      "THE HARDWARE WALLET PROTOCOL. For amounts above $1,000, use a hardware wallet: a dedicated device that stores private keys offline. Ledger and Trezor are the two dominant manufacturers. Buy directly from the manufacturer's website only. Never from secondary markets.",
      "THE SEED PHRASE. During setup, your device generates a 12 to 24 word seed phrase. This phrase is the master backup of your entire Bitcoin position. Write it by hand on paper. Store it in two separate physical locations. Never photograph it. Never type it into a computer. Never share it with anyone. Test your recovery procedure before transferring significant Bitcoin to self-custody.",
    ],
  },
  {
    num: "14",
    part: "Part Three / The Protocol",
    title: "Dollar Cost Averaging: The Accumulation Engine",
    type: "body",
    pullQuote: "Time in market beats timing the market. DCA removes the need to predict.",
    content: [
      "Dollar Cost Averaging is the practice of purchasing a fixed amount of Bitcoin at regular intervals, weekly or monthly, regardless of price. It is the simplest, most battle-tested accumulation strategy available to individual investors.",
      "WHY DCA WORKS. Time in market beats timing the market. Identifying the exact bottom of any asset is impossible. DCA removes the need to predict. By buying at fixed intervals, you automatically acquire more Bitcoin when prices are low and less when prices are high. Over a full cycle, the average cost typically compares favourably to any attempt to time purchases.",
      "THE PSYCHOLOGICAL ADVANTAGE. DCA removes the two most destructive emotions from investing: fear, which causes people to wait indefinitely for a better price that never comes, and greed, which causes people to buy more than they can sustain at peak excitement. A pre-committed, automated DCA schedule executes mechanically, independent of how you feel on any given day.",
      "DYNAMIC DCA: THE CYCLE-AWARE UPGRADE. Once you understand the four-phase halving cycle, improve on basic DCA with a simple adjustment: invest more during Phase 1, the accumulation phase, and less during Phase 3, the bull market peak. Example: 2x your baseline during accumulation, 0.5x during peak euphoria signals. This improves average cost basis without requiring precise market timing.",
      "THE STARTING PROTOCOL. Choose an amount you can sustain for 4 years without touching. Set a recurring purchase. Stack sats. Withdraw to self-custody monthly or quarterly. Do not check the price daily.",
    ],
  },
  {
    num: "15",
    part: "Part Three / The Protocol",
    title: "Building Your Exit Strategy",
    type: "body",
    pullQuote: "An entry strategy without an exit strategy is speculation, not protocol.",
    content: [
      "An entry strategy without an exit strategy is speculation, not protocol. Most Bitcoin investors who missed the last cycle had Bitcoin. They just did not sell anything near the top because they had no pre-defined exit plan.",
      "THE FUNDAMENTAL PRINCIPLE. You cannot identify the exact top in real time. No indicator, analyst, or model can. The goal of an exit strategy is not to capture the last dollar: it is to capture enough of the move to meaningfully change your financial situation. Perfect is the enemy of profitable.",
      "STEP 1: DEFINE YOUR FINANCIAL GOALS FIRST. Before any price targets, write down what you want to accomplish with your Bitcoin gains. Specific, concrete outcomes: clear a specific debt, fund a specific purchase, reach a specific net worth number. Vague goals produce vague exits. Concrete goals produce executed exits.",
      "STEP 2: BUILD A LADDER SELLING PLAN. Ladder selling means selling predetermined percentages at predetermined price levels. Example: Sell 10% at $120,000. Sell 15% at $150,000. Sell 20% at $200,000. Sell 25% at $250,000. Hold the remainder as a long-term strategic position.",
      "STEP 3: PRE-COMMIT YOUR ORDERS. Set limit sell orders during the accumulation phase, before the bull market begins. Pre-committed orders execute without requiring you to overcome the psychological barrier of selling during an euphoric bull run. Many investors fail to execute exits because selling during a bull market feels like giving up. Pre-set orders execute without that decision.",
    ],
  },
  {
    num: "16",
    part: "Part Three / The Protocol",
    title: "The 5 Mistakes That Kill Bitcoin Positions",
    type: "body",
    pullQuote: "The people who built real wealth through Bitcoin almost universally held through multiple bear markets without selling their core position.",
    content: [
      "Understanding what not to do is as important as understanding what to do. These five mistakes have destroyed more Bitcoin wealth than any market crash.",
      "MISTAKE 1: KEEPING BITCOIN ON EXCHANGES. Already covered, but worth repeating as the single most common and catastrophic mistake. Exchanges fail. The solution is self-custody. There is no exception to this rule for amounts above your emergency fund equivalent.",
      "MISTAKE 2: BUYING ALTCOINS INSTEAD OF BITCOIN. Every cycle produces thousands of alternative cryptocurrencies promising superior technology. The overwhelming majority go to zero within one cycle. Bitcoin's monetary properties are emergent from its unique history and cannot be replicated. The risk-adjusted case for altcoins is almost never what it appears to be.",
      "MISTAKE 3: SELLING DURING BEAR MARKETS. The bear market is the accumulation phase. Selling at -70% locks in permanent losses and eliminates the position needed for the next bull market. The people who built real wealth through Bitcoin almost universally held through multiple bear markets without selling their core position.",
      "MISTAKE 4: OVERCONCENTRATION WITHOUT AN EXIT PLAN. Allocating more capital to Bitcoin than you can sustain psychologically during a bear market guarantees a distressed sale. Only allocate what you can genuinely leave untouched for 4 or more years.",
      "MISTAKE 5: NO SEED PHRASE BACKUP. Hardware wallet failure, lost device, forgotten PIN: any of these events is recoverable as long as you have your seed phrase. Without it, your Bitcoin is permanently inaccessible. There is no recovery process, no customer service line, no legal remedy.",
    ],
  },
  {
    num: "17",
    part: "Conclusion",
    title: "What Comes Next",
    type: "final",
    content: [
      "You now have the framework. The fiat system and why it extracts from savers. Bitcoin's monetary properties and why they are genuinely different. The halving cycle and the four phases that repeat every four years. The accumulation protocol, the custody protocol, and the exit architecture.",
      "This 17-page guide is the thesis. The Blueprint is the execution manual.",
      "Where the guide explains concepts, The Blueprint provides step-by-step protocols. Where the guide describes DCA, The Blueprint provides the exact multiplier framework. Where the guide covers self-custody, The Blueprint walks you through the complete setup in a single 21-day activation sequence.",
      "The 2024 halving occurred in April 2024. The cycle is live. The historical pattern of 6 to 18 months from halving to bull market peak suggests the window of maximum accumulation opportunity is now or very soon. This is not a price prediction. It is a statement about the supply arithmetic.",
      "The Blueprint is 11 modules, 85 lessons, one payment. It does not require prior knowledge of Bitcoin or finance. It requires only the willingness to follow a protocol, one step per day for 21 days, and the conviction that your financial situation deserves a serious response to a serious problem.",
      "You already have the thesis. Now build the position.",
    ],
  },
];

function DownloadButton() {
  const base = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
  return (
    <a
      href={`${base}/fiat-trap-guide.pdf`}
      download="moneyverse-fiat-trap-guide.pdf"
      className="no-print"
      style={{
        position: "fixed" as const,
        bottom: 32,
        right: 32,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontFamily: "'Space Mono', monospace",
        fontWeight: 700,
        fontSize: 10,
        letterSpacing: "0.12em",
        background: "var(--mv-accent)",
        color: "#000",
        textDecoration: "none",
        padding: "16px 24px",
        cursor: "pointer",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1v8M4 6l3 3 3-3M1 11h12" stroke="#000" strokeWidth="1.5" strokeLinecap="square"/>
      </svg>
      DOWNLOAD PDF
    </a>
  );
}

export default function FreeGuide() {
  const coverPage = PAGES[0];
  const bodyPages = PAGES.slice(1, PAGES.length - 1);
  const finalPage = PAGES[PAGES.length - 1];

  return (
    <Layout>
      <DownloadButton />

      {/* Nav strip */}
      <div className="no-print" style={{ background: "var(--mv-black)", borderBottom: "1px solid #222", padding: "14px 64px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Link href="/">
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.15em", color: "var(--mv-n600)", cursor: "pointer" }}>BACK TO SITE</span>
          </Link>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n800)" }}>/</span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.15em", color: "var(--mv-n600)" }}>FREE GUIDE: THE FIAT TRAP</span>
        </div>
        <Link href="/pricing">
          <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 9, letterSpacing: "0.12em", background: "var(--mv-accent)", color: "#000", padding: "10px 20px", cursor: "pointer", display: "inline-block" }}>GET THE BLUEPRINT $97</span>
        </Link>
      </div>

      {/* COVER PAGE */}
      <div className="print-page" style={{ background: "var(--mv-black)", minHeight: "100vh", padding: "80px 80px 60px", borderBottom: "2px solid #222", display: "flex", flexDirection: "column" as const, justifyContent: "space-between", position: "relative" as const, overflow: "hidden" }}>
        <div style={{ position: "absolute" as const, right: "-8%", bottom: "-12%", width: "55vw", height: "55vw", borderRadius: "50%", border: "1px solid #1c1c1c", pointerEvents: "none" }} />
        <div style={{ position: "absolute" as const, right: "2%", bottom: "-4%", width: "38vw", height: "38vw", borderRadius: "50%", border: "1px solid #161616", pointerEvents: "none" }} />

        <div style={{ position: "relative" as const, zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 72 }}>
            <span style={{ width: 28, height: 28, background: "var(--mv-accent)", display: "inline-block", flexShrink: 0 }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 11, letterSpacing: "0.15em", color: "#fff" }}>MONEYVERSE</span>
          </div>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.25em", color: "var(--mv-n600)", marginBottom: 40, textTransform: "uppercase" as const }}>Free Guide / 17 Pages</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(5rem, 12vw, 13rem)", color: "#fff", lineHeight: 0.88, marginBottom: 52, letterSpacing: "-0.02em" }}>
            The<br />Fiat<br /><em style={{ color: "var(--mv-accent)" }}>Trap</em>
          </h1>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(15px, 1.8vw, 21px)", color: "var(--mv-n400)", maxWidth: 520, lineHeight: 1.75 }}>
            {coverPage.subtitle}
          </p>
        </div>

        <div style={{ position: "relative" as const, zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap" as const, gap: 16 }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n700)", letterSpacing: "0.12em", lineHeight: 2.2, textTransform: "uppercase" as const }}>
            Fiat Trap / Halving Cycle / Self-Custody<br />DCA Protocol / Exit Strategy / Bitcoin Thesis
          </p>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n700)", letterSpacing: "0.12em" }}>01 / 17</p>
        </div>
      </div>

      {/* BODY PAGES */}
      {bodyPages.map((page, i) => {
        const isLight = i % 2 === 0;
        const bg = isLight ? "#fff" : "var(--mv-n50)";
        const textPrimary = "var(--mv-black)";
        const textBody = "var(--mv-n700)";

        return (
          <div key={page.num} className="print-page" style={{ background: bg, minHeight: "100vh", padding: "80px 80px 60px", borderBottom: "2px solid var(--mv-black)" }}>
            {/* Header row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 64 }}>
              <div>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "var(--mv-n400)", marginBottom: 12, textTransform: "uppercase" as const }}>{page.part}</p>
                <span style={{ display: "block", width: 48, height: 3, background: "var(--mv-accent)" }} />
              </div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n400)", letterSpacing: "0.12em" }}>{page.num} / 17</p>
            </div>

            {/* Number + Title */}
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 48, alignItems: "baseline", marginBottom: 56 }} className="guide-title-grid">
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(4rem, 7vw, 7rem)", color: "var(--mv-accent)", lineHeight: 1 }}>{page.num}</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(1.8rem, 3vw, 3.2rem)", color: textPrimary, lineHeight: 1.05 }}>{page.title}</h2>
            </div>

            {/* Body text */}
            <div style={{ maxWidth: 820 }}>
              {"pullQuote" in page && page.pullQuote && (
                <blockquote style={{ borderLeft: "3px solid var(--mv-accent)", paddingLeft: 24, marginBottom: 40, marginLeft: 0 }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(15px, 1.6vw, 19px)", color: "var(--mv-n600)", lineHeight: 1.7, margin: 0 }}>
                    {page.pullQuote as string}
                  </p>
                </blockquote>
              )}
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 20 }}>
                {(page.content as string[]).map((para, j) => {
                  const isLabel = /^(PHASE|STEP|MISTAKE|CASH|GOLD|REAL|BITCOIN|THE |WHY |DYNAMIC)/.test(para);
                  return (
                    <p key={j} style={{
                      fontFamily: isLabel ? "'Space Mono', monospace" : "'Inter', sans-serif",
                      fontSize: isLabel ? 11 : 15,
                      color: isLabel ? textPrimary : textBody,
                      lineHeight: isLabel ? 1.9 : 1.85,
                      letterSpacing: isLabel ? "0.02em" : "normal",
                      fontWeight: isLabel ? 700 : 400,
                    }}>
                      {para}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}

      {/* FINAL PAGE */}
      <div className="print-page" style={{ background: "var(--mv-black)", minHeight: "100vh", padding: "80px 80px 80px", position: "relative" as const, overflow: "hidden" }}>
        <div style={{ position: "absolute" as const, left: "-8%", top: "50%", transform: "translateY(-50%)", width: "50vw", height: "50vw", borderRadius: "50%", background: "var(--mv-accent)", opacity: 0.04, pointerEvents: "none" }} />

        <div style={{ position: "relative" as const, zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 64 }}>
            <div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "var(--mv-n600)", marginBottom: 12, textTransform: "uppercase" as const }}>{finalPage.part}</p>
              <span style={{ display: "block", width: 48, height: 3, background: "var(--mv-accent)" }} />
            </div>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n600)", letterSpacing: "0.12em" }}>17 / 17</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 48, alignItems: "baseline", marginBottom: 56 }} className="guide-title-grid">
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(4rem, 7vw, 7rem)", color: "var(--mv-accent)", lineHeight: 1 }}>17</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(1.8rem, 3vw, 3.2rem)", color: "#fff", lineHeight: 1.05 }}>{finalPage.title}</h2>
          </div>

          <div style={{ maxWidth: 820, display: "flex", flexDirection: "column" as const, gap: 20, marginBottom: 72 }}>
            {(finalPage.content as string[]).map((para, i) => (
              <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: i === (finalPage.content as string[]).length - 1 ? "#fff" : "var(--mv-n400)", lineHeight: 1.85, fontStyle: i === (finalPage.content as string[]).length - 1 ? "italic" : "normal", fontWeight: i === (finalPage.content as string[]).length - 1 ? 600 : 400 }}>
                {para}
              </p>
            ))}
          </div>

          <div style={{ borderTop: "1px solid #222", paddingTop: 56 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="guide-cta-grid">
              <div>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "var(--mv-n600)", marginBottom: 20, textTransform: "uppercase" as const }}>Ready to execute</p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#fff", lineHeight: 1.05, marginBottom: 16 }}>
                  You have the thesis<br /><em style={{ color: "var(--mv-accent)" }}>Now build the position</em>
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n500)", lineHeight: 1.8 }}>
                  11 modules. 85 lessons. One payment. The complete 21-day activation protocol that turns everything in this guide into executed action.
                </p>
              </div>
              <div className="no-print">
                <Link href="/pricing">
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 11, letterSpacing: "0.08em", background: "var(--mv-accent)", color: "#000", padding: "22px 32px", cursor: "pointer", marginBottom: 16 }}>
                    Get The Blueprint · $97
                    <svg width="14" height="9" viewBox="0 0 16 10" fill="none"><path d="M11 1l4 4-4 4M15 5H1" stroke="#000" strokeWidth="1.5" strokeLinecap="square"/></svg>
                  </span>
                </Link>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n600)", letterSpacing: "0.12em", lineHeight: 2, textAlign: "center" as const }}>
                  ONE-TIME / LIFETIME ACCESS<br />21-DAY CONDITIONAL GUARANTEE
                </p>
              </div>
              <div className="print-only" style={{ display: "none" }}>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "var(--mv-accent)", letterSpacing: "0.12em", lineHeight: 2 }}>
                  MONEYVERSE.NETWORK/PRICING<br />GET THE BLUEPRINT: $97
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .print-page { padding: 40px 24px 40px !important; }
          .guide-title-grid { grid-template-columns: 1fr !important; gap: 8px !important; }
          .guide-cta-grid { grid-template-columns: 1fr !important; }
        }
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { margin: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print-page {
            min-height: 100vh;
            page-break-after: always;
            break-after: page;
            padding: 60px 64px !important;
          }
          .print-page:last-of-type { page-break-after: avoid; break-after: avoid; }
          nav, header, footer, [data-layout-nav], [data-layout-footer] { display: none !important; }
        }
        @page { size: A4; margin: 0; }
      `}</style>
    </Layout>
  );
}
