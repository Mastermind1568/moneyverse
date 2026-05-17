export interface ComparisonPoint {
  category: string;
  a: string;
  b: string;
  winner?: "a" | "b" | "tie";
}

export interface Comparison {
  slug: string;
  title: string;
  aName: string;
  bName: string;
  intro: string;
  verdict: string;
  points: ComparisonPoint[];
  relatedSlugs: string[];
}

export const COMPARISONS: Comparison[] = [
  {
    slug: "ledger-vs-trezor",
    title: "Ledger vs Trezor: Which Hardware Wallet Is Right for You?",
    aName: "Ledger",
    bName: "Trezor",
    intro: `Choosing a hardware wallet is one of the most important security decisions a Bitcoin holder makes. Ledger and Trezor are the two most trusted names in hardware wallet manufacturing — both have years of production experience, dedicated security teams, and have survived rigorous community scrutiny. But they take meaningfully different approaches to security, usability, and transparency that make one a better fit depending on your specific needs and philosophy.

This comparison covers the key dimensions that matter for a Bitcoin holder: security architecture, open-source transparency, price and hardware, companion software experience, and track record. There is no universally "correct" answer — both are excellent choices. The goal is to identify which aligns with your priorities.`,
    verdict: `Both Ledger and Trezor are excellent hardware wallets appropriate for most Bitcoin holders. Ledger's certified secure element chip provides stronger physical tamper resistance, making it the preferred choice for users primarily concerned with hardware attacks. Trezor's fully open-source firmware is the better choice for users who prioritize code auditability and transparency over hardware security certification. For most users, either device will provide dramatically better security than any software wallet or exchange custody.`,
    points: [
      {
        category: "Secure Element Chip",
        a: "Uses a certified EAL5+ secure element (ST33/ST31) that stores keys in tamper-resistant hardware. The chip is certified by independent security labs.",
        b: "Does not use a certified secure element. Keys are stored in a general-purpose microcontroller (STM32). Trezor argues that open-source design compensates for this.",
        winner: "a",
      },
      {
        category: "Open Source Firmware",
        a: "The firmware is closed-source. Ledger publishes some components but the secure element firmware is proprietary. The company argues the secure element cannot be open-source by design.",
        b: "Fully open-source firmware. All code is publicly auditable on GitHub. Independent security researchers can and do review the codebase continuously.",
        winner: "b",
      },
      {
        category: "Passphrase Support",
        a: "Supports an optional 25th-word passphrase (BIP-39) that creates a separate hidden wallet. The passphrase never touches the device unless manually entered.",
        b: "Supports passphrase protection on all models. Implementation is straightforward and well-documented.",
        winner: "tie",
      },
      {
        category: "Price Range",
        a: "Ledger Nano S Plus: ~$79. Ledger Nano X: ~$149. Ledger Stax: ~$279.",
        b: "Trezor Model One: ~$69. Trezor Model T: ~$219. Trezor Safe 3: ~$79.",
        winner: "b",
      },
      {
        category: "Companion Software",
        a: "Ledger Live is a polished, feature-rich application available on desktop and mobile. Supports staking, swaps, and a wide range of cryptocurrencies.",
        b: "Trezor Suite is clean and functional, available on desktop and as a web app. More focused on security than ecosystem features.",
        winner: "a",
      },
      {
        category: "Security Track Record",
        a: "2023 data breach: customer data (names, email, phone numbers) from the Ledger database was leaked. No private keys were compromised, but it led to significant phishing attacks targeting customers.",
        b: "2020 security disclosure: Trezor One's secure chip could theoretically be attacked with physical voltage glitching. Fixed in newer hardware. No customer database breaches.",
        winner: "b",
      },
      {
        category: "Bitcoin-Only Firmware",
        a: "Ledger does not offer Bitcoin-only firmware. All devices run the same multi-asset firmware.",
        b: "Trezor offers a Bitcoin-only firmware option, reducing attack surface for Bitcoin-focused users who have no need for altcoin support.",
        winner: "b",
      },
    ],
    relatedSlugs: ["cold-storage-vs-hot-wallet"],
  },
  {
    slug: "cold-storage-vs-hot-wallet",
    title: "Cold Storage vs Hot Wallet: Understanding Bitcoin Security Tiers",
    aName: "Cold Storage",
    bName: "Hot Wallet",
    intro: `Every Bitcoin holder makes a fundamental security decision: how much to keep immediately accessible (hot) versus how much to keep deeply secured (cold). This isn't a binary choice — most sophisticated Bitcoin holders maintain both, using each for its appropriate purpose.

Cold storage refers to any method of holding Bitcoin private keys entirely offline, disconnected from internet threats. Hot wallets are Bitcoin wallets with active or frequent internet connections — mobile wallets, browser extensions, and exchange balances all qualify. Understanding the security and convenience tradeoffs between these approaches is essential for any serious Bitcoin holder.`,
    verdict: `Cold storage is unambiguously superior for protecting significant Bitcoin holdings over time. The security difference between a properly configured hardware wallet and any internet-connected wallet is not marginal — it is categorical. However, cold storage is not a replacement for a hot wallet; it is a complement. The practical answer for most Bitcoin holders: keep 95%+ of savings in cold storage (hardware wallet with proper seed phrase backup) and keep only what you're actively spending or trading in a hot wallet.`,
    points: [
      {
        category: "Security Against Network Attacks",
        a: "Immune to remote attacks. Private keys stored in a device that has never been online cannot be stolen via malware, phishing, exchange hacks, or network intrusion.",
        b: "Always exposed to network threats. Any device connected to the internet can be targeted by malware, keyloggers, clipboard hijackers, and phishing attacks.",
        winner: "a",
      },
      {
        category: "Convenience and Speed",
        a: "Requires physical access to the hardware device to sign transactions. This creates friction — sending Bitcoin requires plugging in the device, entering a PIN, and confirming on-screen.",
        b: "Transactions can be initiated and signed in seconds from anywhere. Ideal for payments, trading, or any time-sensitive Bitcoin movement.",
        winner: "b",
      },
      {
        category: "Counterparty Risk",
        a: "Zero counterparty risk when using a personal hardware wallet. No company can go bankrupt, freeze your funds, or be compelled to deny access.",
        b: "Exchange hot wallets carry significant counterparty risk. The exchange can freeze withdrawals, be hacked, go bankrupt (FTX, Celsius, Mt. Gox), or comply with government asset seizure orders.",
        winner: "a",
      },
      {
        category: "Cost",
        a: "Hardware wallet costs $69-$279 upfront. This is a one-time cost that protects Bitcoin indefinitely.",
        b: "Most mobile hot wallets are free. Exchange accounts have no setup cost. The 'cost' is the risk accepted.",
        winner: "b",
      },
      {
        category: "Recovery Options",
        a: "Fully recoverable with seed phrase backup. If hardware is lost, stolen, or damaged, any compatible wallet can restore access from the seed phrase.",
        b: "Recovery varies. Self-custody hot wallets are recoverable from seed phrase. Exchange accounts can be recovered through KYC identity verification.",
        winner: "tie",
      },
      {
        category: "Appropriate For",
        a: "Long-term savings, any amount you're not actively spending, holding through market cycles. The 'vault' portion of a Bitcoin stack.",
        b: "Active payments, small daily-use amounts, trading positions, and funds needed in the next 30 days. The 'checking account' portion of a Bitcoin stack.",
        winner: "tie",
      },
      {
        category: "Physical Theft Risk",
        a: "Exposed to physical theft of the device. However, PIN protection, passphrase protection, and separate seed phrase backup make physical theft non-catastrophic if security is layered correctly.",
        b: "Mobile phone theft with an unlocked wallet app creates immediate risk. Exchange accounts are protected by login credentials and 2FA.",
        winner: "b",
      },
    ],
    relatedSlugs: ["ledger-vs-trezor"],
  },
  {
    slug: "bitcoin-vs-gold",
    title: "Bitcoin vs Gold: The Scarcity Showdown",
    aName: "Bitcoin",
    bName: "Gold",
    intro: `Gold has served as humanity's store of value for 5,000 years. Bitcoin has existed for 15. Yet in those 15 years, Bitcoin has made a compelling case that it is not just an alternative to gold, but a superior one — at least on most monetary dimensions. This is not a speculative claim; it is a feature-by-feature analysis of the properties that make a good monetary store of value.

The comparison matters because gold has long been the benchmark for "hard money" — money that is difficult to inflate and maintains purchasing power over long periods. Bitcoin was explicitly designed as a gold-like asset but improved upon gold's key weaknesses: portability, divisibility, verifiability, and supply predictability.`,
    verdict: `Bitcoin outperforms gold on almost every monetary property except physical tactility and 5,000-year track record. For long-term wealth storage in an increasingly digital world, Bitcoin's supply certainty, portability, and divisibility make it the superior monetary protocol. Gold remains valuable as a physical hedge and maintains important roles in jewelry and industrial applications. For a pure monetary store of value in the 21st century, Bitcoin's properties are categorically stronger.`,
    points: [
      {
        category: "Supply Certainty",
        a: "Absolute mathematical certainty: exactly 21 million Bitcoin will ever exist. The supply schedule is hardcoded and verifiable by any node. No authority can change it.",
        b: "Supply is limited by mining difficulty, but not absolutely capped. New gold deposits continue to be discovered. Estimated 190,000 tonnes mined so far with unknown reserves remaining.",
        winner: "a",
      },
      {
        category: "Portability",
        a: "Any amount of Bitcoin can be sent anywhere in the world in minutes, for minimal fees. You can memorize a seed phrase and carry billions of dollars across any border in your head.",
        b: "Physical gold is heavy, expensive to transport, and difficult to divide. Crossing borders with significant gold requires declaration and faces confiscation risk.",
        winner: "a",
      },
      {
        category: "Divisibility",
        a: "Divisible to 8 decimal places (1 satoshi = 0.00000001 BTC). Any amount from $0.01 to billions can be transacted precisely.",
        b: "Physical gold divisibility is limited and costly. Cutting gold coins or bars incurs fees and verification challenges. Digital gold products add counterparty risk.",
        winner: "a",
      },
      {
        category: "Verifiability",
        a: "Anyone can verify the authenticity and quantity of Bitcoin using open-source software. Full auditing requires no specialized equipment and can be done in seconds.",
        b: "Verifying gold authenticity requires physical testing (acid tests, X-ray fluorescence). Tungsten-filled gold bars have appeared in circulation. Paper gold products are difficult to audit.",
        winner: "a",
      },
      {
        category: "Track Record",
        a: "15 years old. Has survived multiple 80%+ crashes, regulatory attacks from multiple governments, and numerous attempts to fork or co-opt the protocol. Still operating.",
        b: "5,000 years of human use as money and store of value across dozens of civilizations. The longest track record of any monetary asset.",
        winner: "b",
      },
      {
        category: "Storage Cost",
        a: "Digital storage costs essentially nothing. A hardware wallet costs $70-150 as a one-time expense.",
        b: "Secure physical storage requires a safe, vault, or professional custodian. Insurance adds additional cost. Storage costs of 0.1-0.5% annually are common.",
        winner: "a",
      },
      {
        category: "Volatility",
        a: "Extremely volatile. 70-80% drawdowns have occurred multiple times. Not suitable for short-term value storage.",
        b: "Relatively stable with much lower drawdowns. More suitable as a short-term value store or portfolio volatility hedge.",
        winner: "b",
      },
    ],
    relatedSlugs: ["ledger-vs-trezor", "cold-storage-vs-hot-wallet"],
  },
];

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}
