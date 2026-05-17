export interface GuideStep {
  title: string;
  content: string;
}

export interface Guide {
  slug: string;
  title: string;
  intro: string;
  estimatedTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  steps: GuideStep[];
  relatedSlugs: string[];
}

export const GUIDES: Guide[] = [
  {
    slug: "how-to-set-up-a-hardware-wallet",
    title: "How to Set Up a Hardware Wallet",
    intro: "A hardware wallet is the single most important security upgrade you can make as a Bitcoin holder. This guide walks you through setting up a hardware wallet from unboxing to your first self-custodied Bitcoin — safely and correctly.",
    estimatedTime: "45 minutes",
    difficulty: "Beginner",
    steps: [
      {
        title: "Purchase directly from the manufacturer",
        content: "Always buy your hardware wallet directly from Ledger (ledger.com) or Trezor (trezor.io) — never from Amazon, eBay, or third-party resellers. Tampered devices have been used to steal Bitcoin. If the packaging shows any signs of tampering when it arrives, do not use the device.",
      },
      {
        title: "Verify the device integrity",
        content: "Before setup, verify the device has not been tampered with. Ledger devices show a genuine check on first boot. Trezor uses a holographic seal. Follow the manufacturer's official verification instructions. A genuine device will never have a seed phrase pre-written inside the box — that is always a scam.",
      },
      {
        title: "Install the companion software",
        content: "Download Ledger Live (for Ledger devices) or Trezor Suite (for Trezor devices) directly from the manufacturer's official website. Do not install software from any other source. These applications are your interface for managing the wallet, installing apps, and initiating transactions.",
      },
      {
        title: "Initialize the device and generate your seed phrase",
        content: "Connect the device to your computer and follow the on-screen setup instructions. The device will generate a 12 or 24-word seed phrase and display it on the device's screen — never on your computer screen. These words are your master backup. Take your time. Write every word correctly and in the correct order.",
      },
      {
        title: "Backup your seed phrase properly",
        content: "Write your seed phrase on the provided recovery card using a pen. Never type it into a computer, phone, or cloud service. Never photograph it. Write it clearly, double-check every word, and store this card somewhere secure — not in your wallet, not in your desk drawer. A fireproof safe is ideal. Create a second physical copy and store it in a separate location.",
      },
      {
        title: "Verify your seed phrase backup",
        content: "Your wallet will ask you to confirm your seed phrase in random order. This is critical — it verifies you wrote the words correctly. Take this seriously. If you wrote one word wrong, you will discover it here, when you can still fix it. Skip this check and you risk being unable to recover your Bitcoin.",
      },
      {
        title: "Set a strong PIN",
        content: "Create a PIN of at least 6 digits (8 is better). This PIN is required to unlock your device for transactions. Choose something memorable but not guessable. After a certain number of incorrect PIN attempts, the device wipes itself — this is a security feature, not a bug. Make sure you have your seed phrase before setting the PIN.",
      },
      {
        title: "Install the Bitcoin app and receive your first transaction",
        content: "In Ledger Live or Trezor Suite, install the Bitcoin application on your device. Navigate to 'Receive' and verify the receiving address shown on your computer matches exactly what appears on your device screen — always verify addresses on the device itself. Send a small test amount first. Once confirmed on-chain, you're running proper self-custody.",
      },
    ],
    relatedSlugs: ["bitcoin-self-custody-guide", "bitcoin-inheritance-plan"],
  },
  {
    slug: "bitcoin-self-custody-guide",
    title: "The Complete Bitcoin Self-Custody Guide",
    intro: "Self-custody is the core skill of a sovereign Bitcoin holder. This guide covers everything you need to know: choosing a wallet, securing your seed phrase, threat modeling your setup, and building a multi-layer security architecture.",
    estimatedTime: "1 hour",
    difficulty: "Intermediate",
    steps: [
      {
        title: "Understand what self-custody means",
        content: "Self-custody means you hold your own private keys — the cryptographic proof of Bitcoin ownership. No exchange, company, or third party can access, freeze, or confiscate your Bitcoin. You are the final authority. This power comes with responsibility: losing your keys means losing your Bitcoin, permanently and irrevocably.",
      },
      {
        title: "Assess your threat model",
        content: "Before choosing a security setup, identify your specific risks. Are you most worried about hackers? Physical theft? House fire? Government seizure? Your own death or incapacitation? Different threats require different solutions. A realistic threat model guides every security decision and prevents both over-engineering and under-protecting.",
      },
      {
        title: "Choose your custody level based on holdings",
        content: "Under $1,000: A mobile wallet like Blue Wallet or Phoenix (Lightning) is sufficient for small amounts. $1,000–$50,000: A single hardware wallet (Ledger or Trezor) with proper seed phrase backup. $50,000+: Consider a multisignature setup using multiple hardware wallets, ideally from different manufacturers, stored in separate locations.",
      },
      {
        title: "Generate your keys securely",
        content: "For hardware wallets, the device generates your seed phrase in a secure element. For software wallets, use a reputable open-source wallet on a dedicated device. Never generate keys on a device that is also used for general internet browsing. For maximum security, generate keys on an airgapped device that has never been online.",
      },
      {
        title: "Back up your seed phrase using the 2-location rule",
        content: "Your seed phrase backup must be in at least two separate physical locations to protect against single points of failure like a house fire or flood. Location 1 might be a home safe. Location 2 might be a bank safe deposit box or a trusted family member's home. Write clearly on archival-quality paper or engrave on stainless steel.",
      },
      {
        title: "Test your recovery procedure",
        content: "Before storing significant Bitcoin, test that you can actually recover your wallet using your seed phrase backup. Use a different compatible wallet application and enter your seed phrase — confirm the same Bitcoin addresses appear. This test is non-negotiable. If you can't recover with your backup, your backup is worthless.",
      },
      {
        title: "Secure your operational security",
        content: "Never discuss your Bitcoin holdings publicly or on social media. Avoid using the same email for Bitcoin services and general accounts. Use a dedicated email and phone number for Bitcoin. If you use a hardware wallet, never connect it to a shared or public computer. Be suspicious of any unsolicited contact about your Bitcoin.",
      },
      {
        title: "Document your setup for heirs",
        content: "Self-custody Bitcoin is inaccessible after your death unless you've documented how to access it. Create an inheritance document — stored securely, accessible only to trusted heirs — that explains your setup, what hardware you use, where seed phrase backups are located, and how to access them. This document should not contain the actual seed phrase in a single location.",
      },
    ],
    relatedSlugs: ["how-to-set-up-a-hardware-wallet", "bitcoin-inheritance-plan"],
  },
  {
    slug: "bitcoin-exit-strategy",
    title: "Building Your Bitcoin Exit Strategy",
    intro: "An exit strategy is what separates Bitcoin investors who realize gains from those who ride cycles up and down without extracting value. This guide teaches you how to build a rules-based, emotion-free exit architecture before the next bull market peak.",
    estimatedTime: "30 minutes",
    difficulty: "Intermediate",
    steps: [
      {
        title: "Accept that you cannot time the top",
        content: "The most common exit mistake is waiting for the absolute peak price. It's unknowable in advance. No indicator, analyst, or model can identify the exact top in real time. The goal of an exit strategy is not to capture the last dollar but to capture enough of the move to meaningfully change your financial situation. Perfect is the enemy of profitable.",
      },
      {
        title: "Set your personal financial targets first",
        content: "Before looking at any price targets, define what you want to accomplish with your Bitcoin gains. Pay off your mortgage? Fund a business? Achieve a specific net worth target? Build an emergency fund? Concrete financial goals anchor your exit decisions to reality and prevent the moving-goalpost psychology that causes most investors to sell nothing.",
      },
      {
        title: "Build a ladder selling plan",
        content: "Ladder selling means selling predetermined percentages at predetermined price levels — not all at once. Example: Sell 10% at $100k, 15% at $120k, 20% at $150k, 25% at $180k, holding the remainder as a long-term strategic position. This approach guarantees you capture value across a price range and removes the binary all-or-nothing decision.",
      },
      {
        title: "Use on-chain indicators as confirmation signals",
        content: "On-chain data provides objective signals about cycle position without requiring price prediction. Key indicators: MVRV Z-Score (above 7 historically signals overvaluation), NUPL (Net Unrealized Profit/Loss above 0.75 signals euphoria), the Puell Multiple (above 4 historically precedes major corrections). Use these to confirm your ladder levels, not to replace them.",
      },
      {
        title: "Plan your tax strategy in advance",
        content: "Selling Bitcoin is a taxable event in most jurisdictions. Long-term capital gains (held 12+ months) are typically taxed at lower rates than short-term gains. Consult a tax professional who specializes in digital assets. Consider staggering sales across tax years, tax-loss harvesting, or qualified opportunity zone investments for large gains. Tax planning done after the fact is almost always suboptimal.",
      },
      {
        title: "Consider alternatives to selling",
        content: "In a bull market, you may be able to access liquidity without selling by using Bitcoin-backed loans. Services like Unchained Capital allow you to borrow dollars against Bitcoin collateral, creating liquidity without triggering a taxable sale. This works best for short-term liquidity needs with a high confidence in eventual repayment. It is not without risk — if Bitcoin drops significantly, loan-to-value ratios can trigger margin calls.",
      },
      {
        title: "Automate and pre-commit your exit orders",
        content: "Decide your exit ladder in advance and set limit orders on your exchange during the accumulation phase, before the bull market begins. Pre-committed orders remove the psychological friction of selling during an euphoric bull market. Many investors fail to execute exits because the act of selling Bitcoin during a bull run feels like giving up. Pre-set orders execute without requiring you to make that decision in the moment.",
      },
    ],
    relatedSlugs: ["dynamic-dca-bitcoin", "bitcoin-halving-cycle-explained"],
  },
  {
    slug: "bitcoin-inheritance-plan",
    title: "Bitcoin Inheritance Planning: Securing Generational Wealth",
    intro: "Self-custodied Bitcoin is inaccessible after death without a clear inheritance plan. This guide shows you how to structure your Bitcoin estate planning to ensure your holdings pass to your heirs without being lost forever.",
    estimatedTime: "45 minutes",
    difficulty: "Advanced",
    steps: [
      {
        title: "Understand the unique challenge of Bitcoin inheritance",
        content: "Unlike bank accounts, stocks, or real estate, Bitcoin held in self-custody has no institutional record. There is no bank to contact, no probate process that uncovers it, no government record. If your heirs don't know your Bitcoin exists or how to access it, it is gone permanently. Bitcoin inheritance planning must be proactive and explicit.",
      },
      {
        title: "Create a Bitcoin asset inventory document",
        content: "Write a clear document that lists: the total approximate Bitcoin you hold, the custody method (which hardware wallets, which exchanges), and general instructions for how to access each holding. This document should be findable by your executor and heirs after your death. It should NOT contain your seed phrase itself — that's a separate, secured document.",
      },
      {
        title: "Structure the seed phrase access appropriately",
        content: "Consider a multisignature setup where multiple people hold partial access. A 2-of-3 multisig might give one key to a trusted family member, one to a Bitcoin attorney, and one to a professional custodian. No single party can access the funds, but any two can. This prevents both theft by a single party and permanent loss if one party becomes unavailable.",
      },
      {
        title: "Write detailed recovery instructions",
        content: "Assume your heirs know nothing about Bitcoin. Write step-by-step instructions covering: what hardware wallet(s) you use, where the devices are physically located, where seed phrase backups are stored, which wallet software to use, and how to verify they're looking at the right addresses. Consider recording a video walkthrough stored in a secure location.",
      },
      {
        title: "Engage a Bitcoin-literate attorney",
        content: "A traditional estate attorney will not know how to handle Bitcoin. Find an attorney who specializes in digital asset estate planning. They can structure a will or trust that explicitly addresses Bitcoin, appoint a technically capable executor, and ensure legal mechanisms exist to transfer Bitcoin to heirs efficiently. This is increasingly common as Bitcoin adoption grows.",
      },
      {
        title: "Test your inheritance plan",
        content: "Walk a trusted family member through your inheritance plan while you're still alive — without revealing your actual seed phrase. Have them follow your written instructions to understand what they would need to do. Identify gaps, confusion, or missing steps. The time to discover problems in your inheritance plan is before it needs to be executed.",
      },
    ],
    relatedSlugs: ["bitcoin-self-custody-guide", "how-to-set-up-a-hardware-wallet"],
  },
  {
    slug: "dynamic-dca-bitcoin",
    title: "How to Implement Dynamic DCA for Bitcoin",
    intro: "Dynamic Dollar-Cost Averaging is cycle-aware accumulation — buying more Bitcoin when it's cheap in bear markets and reducing purchases near cycle peaks. This guide shows you exactly how to implement it.",
    estimatedTime: "20 minutes",
    difficulty: "Intermediate",
    steps: [
      {
        title: "Set your baseline DCA amount",
        content: "Start by establishing what you can sustainably invest in Bitcoin every month without affecting your lifestyle or emergency fund. This is your baseline. Dynamic DCA multiplies or divides this number based on cycle position. If your baseline is $200/month, your system might invest $400/month during bear markets and $100/month near cycle peaks.",
      },
      {
        title: "Define your cycle indicators",
        content: "Choose 2-3 objective indicators to guide your multipliers. Recommended starting set: Bitcoin's distance from its all-time high (simple, no data subscription needed), MVRV Z-Score (available on Glassnode), and the 4-Year Moving Average (also called the 'Rainbow Chart' baseline). Multiple indicators provide cross-validation and reduce false signals.",
      },
      {
        title: "Build a simple rules-based multiplier table",
        content: "Create a decision table you can follow mechanically. Example: 75%+ below ATH: invest 3x baseline. 50-75% below ATH: invest 2x baseline. 25-50% below ATH: invest 1.5x baseline. Near ATH or MVRV > 3: invest 0.75x baseline. MVRV > 5 or strong on-chain euphoria signals: invest 0.5x baseline only. Follow the table. Don't improvise.",
      },
      {
        title: "Automate what you can",
        content: "Set up recurring buys for your baseline amount on a reputable exchange with low fees (Swan Bitcoin, Strike, or River are popular for U.S. users). Adjust the amount up or down manually each month based on your indicator table. Full automation of the variable component is difficult but partial automation (fixed base + manual adjustments) reduces friction significantly.",
      },
      {
        title: "Log every purchase",
        content: "Maintain a simple spreadsheet tracking every Bitcoin purchase: date, price in USD, BTC amount, sats acquired, cumulative cost basis, cumulative BTC held. This log is essential for tax reporting, understanding your cost basis, and measuring how your Dynamic DCA is performing over time. It also provides valuable feedback as you refine your indicators.",
      },
    ],
    relatedSlugs: ["bitcoin-exit-strategy", "bitcoin-halving-cycle-explained"],
  },
  {
    slug: "bitcoin-halving-cycle-explained",
    title: "The Bitcoin Halving Cycle Explained",
    intro: "The Bitcoin halving cycle is the closest thing to a predictable pattern in financial markets. Understanding how it works gives you a framework for accumulation and exit decisions that most investors never develop.",
    estimatedTime: "15 minutes",
    difficulty: "Beginner",
    steps: [
      {
        title: "What is the Bitcoin halving?",
        content: "Every 210,000 blocks (approximately every four years), the reward paid to Bitcoin miners is cut in half. In 2009 miners earned 50 BTC per block. Today (post-2024 halving) they earn 3.125 BTC. In 2028 they'll earn 1.5625 BTC. This programmatic supply reduction is hardcoded into Bitcoin and cannot be changed by any authority.",
      },
      {
        title: "Why does the halving affect price?",
        content: "Supply and demand. When the new supply of Bitcoin entering the market is suddenly halved but demand remains constant or increases, basic economics dictate that price must rise. This isn't immediate — the market takes 6-18 months to fully absorb the supply shock — but historically each halving has preceded a significant bull cycle.",
      },
      {
        title: "The four phases of each halving cycle",
        content: "Each Bitcoin cycle moves through recognizable phases. Accumulation: 12-18 months post-crash, prices are low, sentiment is hopeless, smart money accumulates. Expansion: Prices begin rising months before or after the halving, renewed interest. Bull Market: Parabolic price appreciation, media coverage, retail FOMO, new all-time highs. Correction: 70-80% drawdown over 12-18 months, the next accumulation phase begins.",
      },
      {
        title: "Historical halving data",
        content: "First Halving (Nov 2012): Price went from ~$12 to $1,150 (+9,500%) over the following year. Second Halving (Jul 2016): Price went from ~$650 to $19,800 (+2,946%) by Dec 2017. Third Halving (May 2020): Price went from ~$8,000 to $69,000 (+762%) by Nov 2021. Fourth Halving (Apr 2024): Cycle still in progress. Past performance doesn't guarantee future results, but the structural supply shock is real.",
      },
      {
        title: "Using the cycle for strategy",
        content: "The halving cycle provides a loose but useful framework. Accumulate most aggressively in the 12-18 months following a market peak (post-bear, pre-halving). Continue accumulating through the halving. Begin planning your exit strategy 12-18 months after the halving, when bull markets historically peak. Reduce or stop accumulation when euphoria indicators reach extreme levels.",
      },
    ],
    relatedSlugs: ["dynamic-dca-bitcoin", "bitcoin-exit-strategy"],
  },
  {
    slug: "what-happens-when-all-bitcoin-mined",
    title: "What Happens When All 21 Million Bitcoin Are Mined?",
    intro: "Bitcoin's final satoshi will be mined around the year 2140. This is one of the most common questions Bitcoin skeptics raise — and the answer reveals something important about Bitcoin's design.",
    estimatedTime: "10 minutes",
    difficulty: "Beginner",
    steps: [
      {
        title: "The timeline is further away than you think",
        content: "Due to the halving schedule, the vast majority of Bitcoin has already been mined. Approximately 19.7 million of the 21 million Bitcoin have been issued. But the remaining 1.3 million Bitcoin will take until approximately 2140 to mine — over 100 years from now. The diminishing block rewards mean each successive epoch produces exponentially fewer new Bitcoin.",
      },
      {
        title: "Miners will rely on transaction fees",
        content: "Miners currently earn two things: the block reward (newly created Bitcoin) and transaction fees paid by users. As the block reward approaches zero over the coming century, transaction fees become the primary miner revenue. For this model to work, Bitcoin must have sufficient transaction volume and fee revenue to incentivize miners to continue securing the network.",
      },
      {
        title: "Why transaction fees scale with Bitcoin's value",
        content: "The key insight is that transaction fees are denominated in Bitcoin, not dollars. If Bitcoin is worth $1 million per coin, a fee of 0.0001 BTC ($100) is very attractive to miners even though it's a tiny fraction of a Bitcoin. Higher Bitcoin prices make fee revenue more lucrative in real terms, aligning miner incentives with long-term network security.",
      },
      {
        title: "The Lightning Network as a fee solution",
        content: "The Lightning Network enables millions of transactions to be settled off-chain and bundled into single on-chain transactions. This creates a dual-fee market: small Lightning transactions pay minimal fees to Lightning node operators, while large or high-priority transactions pay on-chain fees to miners. This layered architecture allows Bitcoin to scale without compromising base-layer security.",
      },
      {
        title: "This is not a threat — it's a feature",
        content: "Bitcoin's eventual transition from subsidy-based to fee-based miner revenue is a designed property, not a flaw. It ensures Bitcoin's monetary policy remains fixed (no extra Bitcoin can be created to pay miners) while providing a sustainable economic model through real market demand for block space. The 2140 endpoint is evidence of Bitcoin's long-term thinking — not a looming crisis.",
      },
    ],
    relatedSlugs: ["bitcoin-halving-cycle-explained", "dynamic-dca-bitcoin"],
  },
  {
    slug: "how-much-value-has-dollar-lost-since-2020",
    title: "How Much Value Has the Dollar Lost Since 2020?",
    intro: "The 2020-2023 period saw the most significant dollar purchasing power erosion in a generation. Understanding the magnitude of this loss is essential context for any serious savings strategy.",
    estimatedTime: "10 minutes",
    difficulty: "Beginner",
    steps: [
      {
        title: "The 2020 money printing event",
        content: "In response to the COVID-19 pandemic, the Federal Reserve and U.S. government engaged in unprecedented monetary expansion. The M2 money supply grew from approximately $15.4 trillion in January 2020 to over $21.7 trillion by April 2022 — a 40% increase in just two years. This was the largest peacetime expansion of the money supply in American history.",
      },
      {
        title: "What 40% M2 growth means for purchasing power",
        content: "When the money supply grows faster than real economic output, prices rise to absorb the excess money. The effect is not immediate — there's a 12-18 month lag between money creation and price increases — which is why the inflation that hit in 2021-2022 felt sudden despite being caused by 2020 policy decisions.",
      },
      {
        title: "CPI tells only part of the story",
        content: "By official CPI measures, cumulative inflation from January 2020 to December 2023 was approximately 19%. This means goods that cost $100 in early 2020 cost roughly $119 by end of 2023. But CPI's methodological limitations mean actual purchasing power erosion for many households was higher — particularly for housing, food, and energy.",
      },
      {
        title: "Asset price inflation: the hidden tax",
        content: "Beyond consumer prices, money printing drove dramatic asset price inflation. The S&P 500, housing prices, and Bitcoin all surged as newly created money searched for returns. This created a two-tier economy: asset owners (who benefited from rising asset prices) and non-asset owners (who experienced rising prices without rising wealth). If you had savings in cash, you were in the second tier.",
      },
      {
        title: "The Bitcoin comparison",
        content: "Bitcoin's supply grew by approximately 1.8% during the same period (2020-2023), following its programmatic issuance schedule. The dollar's M2 supply grew 40%. This supply asymmetry — combined with growing demand for Bitcoin — is the fundamental driver of Bitcoin's long-term appreciation relative to fiat currencies. The 2020-2023 episode was a real-time demonstration of the monetary properties that make Bitcoin compelling as a savings vehicle.",
      },
    ],
    relatedSlugs: ["bitcoin-vs-savings-account", "bitcoin-halving-cycle-explained"],
  },
  {
    slug: "bitcoin-vs-savings-account",
    title: "Bitcoin vs. a Savings Account: An Honest Comparison",
    intro: "A savings account feels safe. Bitcoin feels volatile. But which one is actually protecting your wealth over time? This guide provides an honest, numbers-based comparison.",
    estimatedTime: "10 minutes",
    difficulty: "Beginner",
    steps: [
      {
        title: "The savings account proposition",
        content: "High-yield savings accounts currently offer approximately 4-5% annual interest (as of 2024-2025, following rate increases). On $50,000, that's $2,000-$2,500 per year in nominal interest. The balance grows, FDIC insurance protects up to $250,000, and the number never goes down. On the surface, this seems like a compelling offer.",
      },
      {
        title: "The real return after inflation",
        content: "The critical metric is not nominal return — it's real return (return minus inflation). If your savings account pays 4% but M2 money supply grows 7%, your real return is negative 3%. Your purchasing power is declining even as your balance grows. Over 10 years, a savings account with 4% interest against 7% monetary inflation delivers roughly -24% real return. You are getting poorer while the number gets bigger.",
      },
      {
        title: "Bitcoin's volatility in context",
        content: "Bitcoin's 70-80% drawdowns are real, and they are painful. But so is the invisible 3-7% annual erosion of a savings account. The difference is that Bitcoin's volatility is visible (you can see the price drop) while savings account erosion is invisible (the number goes up, but what it buys goes down). Visible pain is easier to panic-sell. Invisible pain is easier to ignore until it's too late.",
      },
      {
        title: "Long-term performance comparison",
        content: "Bitcoin has been the best-performing asset of every 4-year period since its creation. From 2016 to 2020: roughly 2,500% gain. 2017 peak to 2021 peak: still a significant gain despite the brutal 2018-2019 bear market. Even a savings account outperforming Bitcoin in a single year (which has happened during Bitcoin bear markets) loses badly over any 4-year period that includes a halving cycle.",
      },
      {
        title: "The optimal approach: both",
        content: "A savings account and Bitcoin solve different problems. A savings account is excellent for: emergency funds (3-6 months expenses), near-term purchases (1-3 years), and capital you cannot afford to lose at all. Bitcoin is excellent for: long-term savings (4+ year horizon), protection against monetary debasement, and building generational wealth. Using both appropriately — savings account for stability, Bitcoin for purchasing power protection — is the rational strategy.",
      },
    ],
    relatedSlugs: ["dynamic-dca-bitcoin", "how-much-value-has-dollar-lost-since-2020"],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
