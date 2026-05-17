export interface Article {
  slug: string;
  title: string;
  readingTime: string;
  theme: "fiat" | "protocol" | "custody" | "strategy";
  quarter: "Q1" | "Q2" | "Q3" | "Q4";
  teaser: string;
  intro: string;
}

export const RESEARCH_ARTICLES: Article[] = [
  {
    slug: "m2-money-supply-savings-destroyed",
    title: "The M2 Money Supply: How Your Savings Are Silently Destroyed",
    readingTime: "8 min read",
    theme: "fiat",
    quarter: "Q1",
    teaser: "The Federal Reserve has expanded the M2 money supply by over 40% since 2020. Here is the precise mathematical mechanism by which this expansion extracts wealth from anyone holding cash.",
    intro: `The Federal Reserve expanded the M2 money supply by over 40% between 2020 and 2022 — the most aggressive monetary expansion in American peacetime history. In absolute terms, the U.S. money supply grew from approximately $15.4 trillion in January 2020 to over $21.7 trillion at its peak in April 2022. This was not a rounding error or a technicality. It was a fundamental transformation of the monetary base that affects every dollar-denominated savings account, CD, bond, or cash holding on earth.

The mechanism is not complicated, but it is deliberately obscured. When the Federal Reserve buys Treasury bonds from primary dealers, it credits those dealers' accounts with newly created dollars. These dollars did not exist yesterday. They weren't transferred from elsewhere. They were conjured — entries in a database at the Federal Reserve, backed by nothing but the institutional authority of the central bank. The primary dealers then lend these new dollars into the broader economy, and through the fractional reserve multiplier effect, each newly created base dollar spawns additional credit money as it circulates through the banking system.

The effect on your savings is mathematically precise: if you held $100,000 in a savings account in January 2020 earning 0.5% annual interest, and the money supply expanded by 40% while your account grew by perhaps 2% over two years, you didn't "lose money" in nominal terms. Your account showed $102,000. But in terms of claims on real goods and services — houses, food, labor, time — your $102,000 bought meaningfully less than your original $100,000 did in 2020. The new dollars diluted the value of your existing dollars.

This is the Cantillon Effect in action. Those who receive newly created money first — primary dealers, large financial institutions, leveraged asset holders — benefit most, because they spend the money before prices have adjusted upward. Those who receive it last — wage earners, savers, fixed-income retirees — bear the full cost of the adjustment. Monetary expansion is not a neutral event. It is a transfer mechanism. Bitcoin's hard 21 million cap exists precisely to make this mechanism impossible.`,
  },
  {
    slug: "real-inflation-vs-cpi",
    title: "Real Inflation vs CPI: The Gap You're Not Being Told About",
    readingTime: "6 min read",
    theme: "fiat",
    quarter: "Q1",
    teaser: "Official CPI inflation figures understate the real erosion of purchasing power. We break down the methodological choices that keep the official number artificially low.",
    intro: `The Consumer Price Index is the U.S. government's official measure of inflation — and it has been systematically redesigned since the 1980s to report a lower number than earlier methodologies would produce. This is not a conspiracy theory. It is documented methodology published by the Bureau of Labor Statistics, and the implications for anyone trying to preserve purchasing power are severe.

The original CPI, as calculated through the late 1970s, measured the cost of a fixed basket of goods. If steak became unaffordable and consumers switched to chicken, the index captured the real cost increase — steak was still part of the basket. Modern CPI uses substitution bias: when a good becomes more expensive, the model assumes consumers will substitute a cheaper alternative. The index then measures the cheaper alternative, not the original good. The result is a measure that tracks the cost of downgraded consumption, not the cost of maintaining a standard of living.

Hedonic adjustments compound the problem. When a new laptop costs the same as last year's model but has a faster processor, the BLS may record this as a price decrease — because you're getting "more value" per dollar. Whether you needed that faster processor is irrelevant. The adjustment reduces the measured inflation rate by attributing product improvements as effective price cuts, even when your out-of-pocket cost is identical.

Perhaps most consequentially, owners' equivalent rent — the largest single component of CPI at roughly 24% of the index — does not measure actual housing costs. It asks homeowners what they think they could rent their home for. During the 2021-2023 housing boom, when home prices surged 30-40% nationally and actual market rents spiked dramatically, OER lagged by 12-18 months and never captured the peak severity. Economists who track real-world shelter costs consistently find shelter inflation running 5-8 percentage points higher than OER during that period. Bitcoin's supply schedule answers this problem with mathematical precision: the only monetary policy is the one encoded in its protocol, and no government bureau can redefine what it measures.`,
  },
  {
    slug: "bitcoin-halving-cycle-explained",
    title: "The Bitcoin Halving Cycle Explained",
    readingTime: "7 min read",
    theme: "protocol",
    quarter: "Q2",
    teaser: "Every four years, Bitcoin's new supply is cut in half. We trace the history of all four halvings and explain why the 2028 halving is already shaping strategic decisions.",
    intro: `Every 210,000 blocks — approximately every four years — the Bitcoin protocol automatically cuts the reward paid to miners in half. This is the Bitcoin halving: the single most important recurring event in Bitcoin's monetary history, the mechanism that makes Bitcoin's supply schedule the most predictable and auditable in human history, and the engine that drives Bitcoin's four-year market cycles.

The numbers tell the story starkly. In 2009, miners received 50 BTC per block. After the first halving in November 2012, that reward dropped to 25 BTC. The 2016 halving brought it to 12.5 BTC. The May 2020 halving reduced it to 6.25 BTC. The April 2024 halving cut it to 3.125 BTC. Each halving event roughly halved the rate at which new Bitcoin entered circulation — reducing the annual inflation rate of Bitcoin's supply from approximately 50% in its early years to under 1% after the 2024 halving.

The market impact of each halving has been profound, though the mechanism is not instantaneous. The supply shock takes months to propagate through the market as miners adjust operations, accumulated selling pressure diminishes, and new demand encounters a structurally reduced new supply. The 2012 halving preceded a 9,000% Bitcoin price increase over the following 12 months. The 2016 halving preceded an 2,900% increase. The 2020 halving preceded Bitcoin's rise from roughly $8,000 to $69,000 — a 762% increase. Each cycle is different, each involves new participants and new market dynamics, but the underlying supply arithmetic is fixed in advance.

What makes the halving different from every other macro event is its absolute predictability. We know the exact block at which the next halving will occur (block 1,050,000). We know approximately when that block will be mined (April 2028, though the exact date depends on mining difficulty). We know exactly what the reward will be (1.5625 BTC). No central bank meeting, no Federal Open Market Committee decision, no government policy can alter this. The 2028 halving is already encoded in the protocol. Sophisticated Bitcoin investors are already positioning for it — adjusting DCA schedules, building positions ahead of the supply shock, and refining exit architectures for the bull cycle they anticipate it will catalyze.`,
  },
  {
    slug: "what-happens-when-all-bitcoin-mined",
    title: "What Happens When All 21 Million Bitcoin Are Mined?",
    readingTime: "5 min read",
    theme: "protocol",
    quarter: "Q2",
    teaser: "Bitcoin's last satoshi will be mined around 2140. Critics claim this creates an existential security problem. The reality reveals something profound about Bitcoin's economic design.",
    intro: `Around the year 2140, a miner will collect the final satoshi ever issued by the Bitcoin protocol. At that point, the block subsidy — the newly minted Bitcoin that has compensated miners for securing the network since 2009 — will be zero. No more new Bitcoin will ever exist. The critics who have latched onto this as an existential threat to Bitcoin's security argue simply: if miners aren't paid in new coins, what incentive do they have to continue mining? If they stop mining, who secures the network?

This criticism rests on a fundamental misunderstanding of Bitcoin's two-part incentive structure. Miners are compensated not only by the block subsidy — the new Bitcoin they create with each block — but also by transaction fees. When you send Bitcoin from one address to another, you include a fee that goes to the miner who confirms your transaction. Today, transaction fees represent a relatively small portion of miner revenue because the block subsidy is still substantial. But this proportion shifts with each halving, and it is intended to shift. Bitcoin's design assumes a future in which a mature network with enormous transaction volume generates sufficient fee revenue to sustain a robust mining ecosystem — even with zero subsidy.

The logic holds under reasonable assumptions. Bitcoin processes approximately 5-7 transactions per second currently, constrained by block size. As second-layer solutions like the Lightning Network handle routine small payments, on-chain Bitcoin transactions will increasingly represent high-value, high-fee settlements — international wire equivalents, large commercial transactions, institutional clearing. If on-chain Bitcoin becomes the settlement layer for a meaningful fraction of global commerce, even modest fees per transaction aggregate to enormous miner revenue across the roughly 144 blocks mined per day. The 2140 security model doesn't require speculation about the future of cryptography or Bitcoin's protocol. It requires only that Bitcoin becomes sufficiently valuable and sufficiently used that people will pay to transact in it. Every year of additional adoption makes that assumption more plausible, not less.`,
  },
  {
    slug: "why-bitcoin-hardest-money",
    title: "Why Bitcoin Is The Hardest Money Ever Created",
    readingTime: "9 min read",
    theme: "protocol",
    quarter: "Q2",
    teaser: "Gold was the hardest money in human history for 5,000 years. Bitcoin changes the calculus entirely. We compare monetary hardness across every major asset in history.",
    intro: `"Hard money" is money that is difficult or impossible to inflate — money whose supply cannot be easily increased by those in power. The concept predates Bitcoin by millennia. Gold's tenure as humanity's reserve monetary asset for roughly 5,000 years rested on a single property: its supply grew slowly and could not be meaningfully accelerated by any political actor. Kings couldn't print gold. Emperors couldn't decree more of it into existence. The physical reality of gold's scarcity constrained monetary policy in a way that no fiat system ever has.

The economist Saifedean Ammous formalized this into the concept of the stock-to-flow ratio: the existing supply of an asset (the "stock") divided by the annual new production (the "flow"). Gold's stock-to-flow ratio today is approximately 60 — there is about 60 years' worth of current mining production already above ground. This high ratio makes gold resistant to supply dilution; even if gold mining doubled overnight, it would take decades to meaningfully inflate the supply relative to existing holdings. Silver has a stock-to-flow of roughly 22. Copper and oil have ratios below 1 — they are consumed as quickly as they are produced.

Bitcoin's current stock-to-flow ratio, after the 2024 halving, exceeds 100. And unlike gold, Bitcoin's flow doesn't depend on the economic incentives of mining companies, the discovery of new deposits, or improvements in extraction technology. Bitcoin's flow is mathematically fixed by protocol. After the 2028 halving, the ratio will exceed 200. After the final halving cycles, it approaches infinity — the flow approaches zero while the stock remains fixed at 21 million. No monetary asset in human history has achieved this. Gold's scarcity is geological and real but ultimately uncertain — asteroid mining, deep sea extraction, and future technologies could theoretically expand supply. Bitcoin's scarcity is mathematical, deterministic, and verifiable in real time by any node on the network. It is not just the hardest money we have ever created. It is the hardest money that can be created, because there is no harder ceiling than absolute.`,
  },
  {
    slug: "self-custody-guide",
    title: "The Self-Custody Guide: Your Complete Step-by-Step Protocol",
    readingTime: "12 min read",
    theme: "custody",
    quarter: "Q3",
    teaser: "Exchange collapses have destroyed billions in customer funds. The solution is self-custody. This comprehensive guide walks you through the complete setup from hardware selection to seed phrase security.",
    intro: `In November 2022, FTX — the world's second-largest cryptocurrency exchange by volume and a company valued at $32 billion as recently as January of that year — collapsed in 72 hours. Approximately $8 billion in customer funds was missing. Customers who held Bitcoin on FTX did not own Bitcoin. They owned a database entry claiming Bitcoin on their behalf, backed by a company that was using those funds for other purposes. When the company failed, the claims became worthless. The Bitcoin was gone.

FTX was not an anomaly. Mt. Gox, once the world's largest Bitcoin exchange, collapsed in 2014 losing 850,000 Bitcoin. Celsius Network filed for bankruptcy in 2022 with a $1.2 billion gap in its customer accounts. Voyager Digital, BlockFi, and Genesis Capital followed. In every case, the mechanism was identical: customers held IOUs from companies, not actual Bitcoin. When the companies became insolvent, the IOUs became worthless. The customers who had held their own keys lost nothing in these collapses. The customers who had trusted an institution lost everything.

Self-custody is the practice of holding your own Bitcoin private keys — eliminating the counterparty entirely. When you practice self-custody correctly, your Bitcoin's safety depends on the security of your own setup, not on the solvency, honesty, or regulatory compliance of any company. No bankruptcy judge can freeze your holdings. No government order served to an exchange can block your access. No hack of a centralized database can drain your funds.

The technical requirements for self-custody are less formidable than they appear. A hardware wallet from Ledger or Trezor costs $70-150. The setup process takes 45 minutes. The seed phrase backup — 24 ordinary English words — can be stored on paper in two separate physical locations. The ongoing maintenance is minimal. What self-custody requires is not technical sophistication but a willingness to take personal responsibility for an asset that, by its nature, can only be held by someone. The only question is whether that someone is you or an institution you are trusting not to fail.`,
  },
  {
    slug: "ledger-vs-trezor-2026",
    title: "Ledger vs Trezor 2026: An Honest Comparison",
    readingTime: "10 min read",
    theme: "custody",
    quarter: "Q3",
    teaser: "The two most trusted hardware wallet manufacturers have distinct security models, feature sets, and tradeoffs. We provide an unbiased, technically rigorous comparison updated for 2026.",
    intro: `The two most battle-tested names in Bitcoin hardware wallet manufacturing are Ledger and Trezor. Between them, they have shipped tens of millions of devices, survived multiple rounds of public security scrutiny, and maintained their positions as the default recommendations from the Bitcoin self-custody community for over a decade. Both are excellent products. Both will protect your Bitcoin effectively if used correctly. The question is which set of tradeoffs aligns with your specific security philosophy and usage patterns.

The fundamental divide between them is philosophical before it is technical: Ledger prioritizes hardware security through the use of a certified secure element chip, accepting that this chip requires proprietary firmware. Trezor prioritizes software transparency through fully open-source firmware, accepting that this means relying on a general-purpose microcontroller without a certified secure element. Neither position is objectively correct — they represent different threat models and different values about what constitutes trustworthy security.

Ledger's secure element (the ST33 chip in the Nano X, certified at EAL5+ by an independent security lab) is the same category of hardware used in credit cards, SIM cards, and passports. It stores private keys in a physically hardened environment designed to resist voltage glitching, side-channel analysis, and fault injection attacks. An attacker with physical access to your Ledger device faces a formidable hardware barrier. The tradeoff is that the secure element's firmware cannot be made open-source — the certification process and NDA requirements with the chip manufacturer prohibit it. Ledger's critics argue, reasonably, that you cannot fully verify what this closed firmware is doing with your keys.

Trezor's fully open-source approach means that every line of code that handles your private keys has been published on GitHub and is continuously audited by independent security researchers worldwide. If there is a backdoor or a vulnerability, the open-source community has the best chance of finding it. The tradeoff is the absence of a certified secure element, meaning physical access to the device for sufficient time could theoretically allow an attacker to extract keys through hardware attacks. In practice, the threat of physical hardware attacks is relevant only in specific scenarios — most Bitcoin theft occurs remotely, through malware and phishing, where Trezor's open-source firmware provides strong protection.`,
  },
  {
    slug: "bitcoin-africa-cfa-franc",
    title: "Bitcoin in Africa: The CFA Franc Alternative",
    readingTime: "8 min read",
    theme: "custody",
    quarter: "Q3",
    teaser: "Fourteen African nations use the CFA franc — a currency controlled by France. Citizens experience monetary colonialism in real time. Bitcoin is practical monetary sovereignty for these people.",
    intro: `Fourteen nations in West and Central Africa — home to roughly 180 million people — use the CFA franc as their official currency. The franc's peg to the euro, maintained since 1999, sounds like financial stability. The reality is a monetary relationship that transfers significant economic sovereignty from these nations to the European Central Bank, with France holding the institutional levers. Fifty percent of the foreign currency reserves of the West African Economic and Monetary Union are required to be deposited with the French Treasury. The nations that use the currency have limited ability to conduct independent monetary policy. Their monetary fate is tied to decisions made in Frankfurt and Paris, not in Dakar, Abidjan, or Yaoundé.

The consequences for ordinary citizens are concrete and daily. Inflation imported from the Eurozone erodes savings. Capital controls limit international transactions. Remittance costs remain high — the World Bank estimates average remittance fees to Sub-Saharan Africa at 7-9%, extracting billions annually from some of the world's poorest families. Currency devaluations, when they occur, are decided by institutions with no democratic accountability to the people affected — the 1994 devaluation of the CFA franc by 50% overnight destroyed half of savings accounts for millions of people with no warning and no recourse.

Bitcoin offers an alternative that requires no permission from the French Treasury, no relationship with a correspondent bank, and no exposure to the monetary decisions of the ECB. A Bitcoin wallet requires only a smartphone and internet access — both increasingly ubiquitous across the continent that has leapfrogged traditional banking infrastructure through mobile money. Cross-border transactions that previously required days, expensive correspondent banking relationships, and significant fees can be settled in Bitcoin in minutes for a fraction of the cost. Remittances sent via the Lightning Network from Europe to family members in Senegal or Cameroon can arrive in seconds at near-zero cost, with no intermediary capable of blocking or skimming the transfer.

This is not an abstract ideological point about sound money. For people living under monetary systems they did not choose and cannot change through democratic means, Bitcoin is a practical exit — the first genuinely neutral monetary network available to anyone on earth with a smartphone.`,
  },
  {
    slug: "exit-architecture-sell-side-protocol",
    title: "Exit Architecture: How to Build Your Personal Sell-Side Protocol",
    readingTime: "11 min read",
    theme: "strategy",
    quarter: "Q4",
    teaser: "The most successful Bitcoin investors are not those who bought lowest — they're the ones who sold enough at the top to fund their goals and re-accumulate during the bear.",
    intro: `The most common failure mode in Bitcoin investing is not buying at the wrong time. It is having no exit plan. The pattern repeats across every market cycle with clockwork consistency: an investor builds a meaningful position during the accumulation phase, watches their portfolio appreciate dramatically during the bull run, experiences the psychological intoxication of paper gains, convinces themselves the cycle will be different this time, holds through the peak, and then endures a 70-80% drawdown watching years of gains evaporate. They exit at the bottom — the worst possible time — after the emotional weight becomes unbearable.

The antidote is not better market timing. Market timing is impossible, even for professionals with full-time research teams and sophisticated models. The antidote is pre-commitment: designing your exit architecture during the accumulation phase, when you are thinking rationally and dispassionately, and then executing it mechanically during the bull market when emotions are most likely to override judgment.

Effective exit architecture has four components. First, define your objectives in concrete, specific terms before the bull market begins. Not "take profits when Bitcoin is high" — that is meaningless. Instead: "I will sell 10% of my position when I can pay off my mortgage, 15% when I can fund my children's college education, 20% when my remaining position still exceeds $X even after the sale." Attaching exit decisions to specific life outcomes removes the psychological difficulty of selling an asset you believe in for the long term.

Second, build a price ladder rather than a single exit point. Selling in tranches — for example, 5% at each doubling from your cost basis — ensures you participate in the full upside while systematically reducing position risk as prices become more extended. You will never capture the absolute peak, but you will capture enough of the move to be meaningful while avoiding the catastrophic outcome of holding 100% through a multi-year bear market.

Third, use on-chain market cycle indicators as confirmation signals rather than primary triggers. The MVRV Z-Score (the ratio of market cap to realized value, normalized by standard deviation) has historically exceeded 7 near Bitcoin cycle tops. The Puell Multiple (daily miner revenue relative to its 365-day average) has historically exceeded 4 at cycle peaks. These signals don't tell you the exact top, but readings at these extremes historically indicate significant overvaluation — confirmation that your price ladder exits are appropriate. Finally, integrate tax planning from the beginning. Long-term capital gains treatment for Bitcoin held more than 12 months is taxed at substantially lower rates than short-term gains. Structuring exits to maximize long-term treatment can recover meaningful percentages of your effective return.`,
  },
  {
    slug: "bitcoin-inheritance-generational-wealth",
    title: "Bitcoin Inheritance Planning: Securing Generational Wealth",
    readingTime: "9 min read",
    theme: "strategy",
    quarter: "Q4",
    teaser: "Self-custodied Bitcoin leaves no institutional record — if your heirs don't know it exists and how to access it, it is gone permanently. We outline the complete inheritance planning framework.",
    intro: `Bitcoin held in self-custody has a property that every other financial asset lacks: it is invisible to the institutions that normally facilitate inheritance. When you die with a stock brokerage account, a bank balance, or even physical gold in a bank vault, there are institutions with records — brokerages, banks, estate attorneys, government agencies — that can help heirs identify and claim assets. The process is cumbersome, but the assets can be found.

Self-custodied Bitcoin held on a hardware wallet exists nowhere except in the cryptographic relationship between your private keys and the blockchain. There is no custodian to contact. There is no institution with a record. There is no bankruptcy proceeding that will surface it. If your heirs do not know your Bitcoin exists, do not have access to your seed phrase, and do not know how to use it, your Bitcoin will remain in those addresses forever — permanently inaccessible, effectively destroyed. The blockchain will show it sitting there indefinitely, and no one will ever be able to move it.

Estimates of permanently lost Bitcoin — coins that were mined in Bitcoin's early years and have not moved in over a decade, suggesting their owners have died or lost access — run between 3 and 4 million Bitcoin, representing 14-19% of the total supply. This is not a rounding error. It is the cost of a generation of Bitcoin holders who did not plan for inheritance.

The solution is not to abandon self-custody — the risks of custodial arrangements are well-documented. The solution is deliberate inheritance planning that creates a documented path to your Bitcoin without creating a single point of failure that could expose your holdings to theft during your lifetime. This requires separating knowledge into components: your heirs can know that Bitcoin exists and approximately how to access it, while the actual seed phrase is secured in a way that requires multiple factors or trusted parties to reconstruct. Attorney-drafted estate documents can reference Bitcoin holdings and provide instructions without including the seed phrase itself. Multisignature wallet setups — requiring multiple keys held by multiple parties to authorize transactions — can distribute access in ways that prevent single points of failure while ensuring heirs can eventually claim what is theirs.`,
  },
];

export const THEME_LABELS: Record<string, string> = {
  fiat: "Fiat & Macro",
  protocol: "Bitcoin Protocol",
  custody: "Security & Custody",
  strategy: "Strategy & Exit",
};

export const QUARTER_LABELS: Record<string, string> = {
  Q1: "Q1 — Fiat Reality",
  Q2: "Q2 — Bitcoin Protocol",
  Q3: "Q3 — Self-Custody",
  Q4: "Q4 — Strategy & Exit",
};
