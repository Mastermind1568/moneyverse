export interface Article {
  slug: string;
  title: string;
  readingTime: string;
  theme: "fiat" | "protocol" | "custody" | "strategy";
  quarter: "Q1" | "Q2" | "Q3" | "Q4";
  teaser: string;
}

export const RESEARCH_ARTICLES: Article[] = [
  {
    slug: "m2-money-supply-savings-destroyed",
    title: "The M2 Money Supply: How Your Savings Are Silently Destroyed",
    readingTime: "8 min read",
    theme: "fiat",
    quarter: "Q1",
    teaser: "The Federal Reserve has expanded the M2 money supply by over 40% since 2020. Here is the precise mathematical mechanism by which this expansion extracts wealth from anyone holding cash — and why most people never notice until it is too late.",
  },
  {
    slug: "real-inflation-vs-cpi",
    title: "Real Inflation vs CPI: The Gap You're Not Being Told About",
    readingTime: "6 min read",
    theme: "fiat",
    quarter: "Q1",
    teaser: "Official CPI inflation figures understate the real erosion of purchasing power. We break down the methodological choices — substitution bias, hedonic adjustments, owners' equivalent rent — that keep the official number artificially low while your grocery bill tells a different story.",
  },
  {
    slug: "bitcoin-halving-cycle-explained",
    title: "The Bitcoin Halving Cycle Explained",
    readingTime: "7 min read",
    theme: "protocol",
    quarter: "Q2",
    teaser: "Every four years, Bitcoin's new supply is cut in half by a programmatic event hardcoded into its protocol. We trace the history of all four halvings, quantify their market impact, and explain why the 2028 halving is already shaping the strategic decisions of the most sophisticated Bitcoin investors.",
  },
  {
    slug: "what-happens-when-all-bitcoin-mined",
    title: "What Happens When All 21 Million Bitcoin Are Mined?",
    readingTime: "5 min read",
    theme: "protocol",
    quarter: "Q2",
    teaser: "Bitcoin's last satoshi will be mined around 2140. Critics claim this creates an existential security problem for the network. The reality reveals something profound about Bitcoin's economic design — and why this apparent flaw is actually evidence of extraordinary long-term thinking.",
  },
  {
    slug: "why-bitcoin-hardest-money",
    title: "Why Bitcoin Is The Hardest Money Ever Created",
    readingTime: "9 min read",
    theme: "protocol",
    quarter: "Q2",
    teaser: "Gold was the hardest money in human history — for 5,000 years, no one could meaningfully inflate its supply. Bitcoin changes the calculus entirely. We compare the 'hardness' of every major monetary asset in history and explain why Bitcoin's stock-to-flow ratio makes it categorically different from anything that came before.",
  },
  {
    slug: "self-custody-guide",
    title: "The Self-Custody Guide: Your Complete Step-by-Step Protocol",
    readingTime: "12 min read",
    theme: "custody",
    quarter: "Q3",
    teaser: "Exchange collapses have destroyed billions in customer funds. The solution is self-custody: controlling your own Bitcoin private keys in a hardware wallet you own and secure yourself. This comprehensive guide walks you through the complete self-custody setup from hardware selection to seed phrase security to transfer.",
  },
  {
    slug: "ledger-vs-trezor-2026",
    title: "Ledger vs Trezor 2026: An Honest Comparison",
    readingTime: "10 min read",
    theme: "custody",
    quarter: "Q3",
    teaser: "The two most trusted hardware wallet manufacturers each have distinct security models, feature sets, and tradeoffs. We provide an unbiased, technically rigorous comparison updated for 2026 — covering secure element design, open-source transparency, price points, and which type of user each device best serves.",
  },
  {
    slug: "bitcoin-africa-cfa-franc",
    title: "Bitcoin in Africa: The CFA Franc Alternative",
    readingTime: "8 min read",
    theme: "custody",
    quarter: "Q3",
    teaser: "Fourteen African nations use the CFA franc — a currency pegged to the euro and effectively controlled by France. Citizens of these countries experience monetary colonialism in real time. Bitcoin is not an abstract investment thesis for these people; it is practical monetary sovereignty.",
  },
  {
    slug: "exit-architecture-sell-side-protocol",
    title: "Exit Architecture: How to Build Your Personal Sell-Side Protocol",
    readingTime: "11 min read",
    theme: "strategy",
    quarter: "Q4",
    teaser: "The most successful Bitcoin investors are not the ones who bought the lowest — they're the ones who sold enough at the top to fund their goals and re-accumulate during the bear. We break down the complete exit architecture: price ladders, on-chain triggers, tax optimization, and the psychological pre-commitment that makes it executable.",
  },
  {
    slug: "bitcoin-inheritance-generational-wealth",
    title: "Bitcoin Inheritance Planning: Securing Generational Wealth",
    readingTime: "9 min read",
    theme: "strategy",
    quarter: "Q4",
    teaser: "Self-custodied Bitcoin leaves no institutional record — if your heirs don't know it exists and how to access it, it is gone permanently. We outline the complete inheritance planning framework: from asset documentation to multisig key distribution to attorney-drafted estate provisions, ensuring your Bitcoin creates wealth across generations.",
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
