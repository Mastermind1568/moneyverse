import { Router, type IRouter } from "express";

const router: IRouter = Router();

// ─── Shared data (duplicated from frontend data files for SSR) ───────────────

const GLOSSARY_TERMS = [
  { slug: "bitcoin-halving", title: "Bitcoin Halving", shortDef: "A programmatic event that cuts Bitcoin's new supply in half every ~4 years.", definition: `The Bitcoin Halving is one of the most consequential events in monetary history — a programmatic, mathematically predetermined reduction in the rate at which new Bitcoin enters circulation. It occurs approximately every 210,000 blocks (roughly every four years), and each time it happens, the reward miners receive for validating transactions is cut exactly in half. When Satoshi Nakamoto launched Bitcoin in 2009, miners received 50 BTC per block. After the first halving in November 2012, that dropped to 25 BTC. The second halving in July 2016 brought it to 12.5 BTC. The third halving in May 2020 reduced it to 6.25 BTC. The fourth halving in April 2024 cut it to 3.125 BTC. This process will continue until the final satoshi is mined, projected around the year 2140. The halving is what makes Bitcoin's monetary policy the most predictable, auditable, and trustworthy in human history. No central bank can alter it. No government can accelerate it. It runs like clockwork, block after block, securing Bitcoin's status as genuinely scarce digital money.`, related: ["21-million-hard-cap", "proof-of-work", "bitcoin-market-cycle"] },
  { slug: "21-million-hard-cap", title: "21 Million Hard Cap", shortDef: "The absolute maximum number of Bitcoin that will ever exist.", definition: `The 21 million hard cap is Bitcoin's most fundamental property — the absolute, immutable ceiling on how many Bitcoin will ever exist. Not 21 million and one. Not more if miners vote. Not more if the market demands it. Exactly 21 million, baked into Bitcoin's code from genesis block to final satoshi. This number wasn't chosen arbitrarily. Satoshi Nakamoto designed the issuance schedule so that the final Bitcoin wouldn't be mined until approximately 2140, giving humanity over a century to transition to a Bitcoin standard. The hard cap is enforced by Bitcoin's consensus rules — the rules that every node in the network validates independently. If a miner tried to issue more Bitcoin than allowed, every honest node in the network would reject that block outright. There is no committee, no appeals board, and no override. Contrast this with every fiat currency that has ever existed. The U.S. dollar has no supply cap. The Federal Reserve can and does create trillions of new dollars at will. Bitcoin's hard cap is what transforms it from a clever cryptographic experiment into genuine monetary scarcity.`, related: ["bitcoin-halving", "digital-scarcity", "fiat-debasement"] },
  { slug: "proof-of-work", title: "Proof of Work", shortDef: "The consensus mechanism that secures Bitcoin by requiring real computational energy expenditure.", definition: `Proof of Work (PoW) is the consensus mechanism that makes Bitcoin work — the system by which the network agrees on a single, valid history of all transactions without requiring any trusted third party. Miners compete to solve an extraordinarily difficult cryptographic puzzle. The only way to find the solution is to try trillions of possibilities — there are no shortcuts. The first miner to find the solution earns the block reward. This process is intentionally expensive. It requires real-world energy — electricity — which means attacking Bitcoin requires acquiring and deploying an enormous amount of physical infrastructure. To rewrite Bitcoin's history or double-spend coins, an attacker would need to outpace the cumulative computational work of the entire global mining network. The beauty of Proof of Work is that it converts energy into economic finality. Every confirmed transaction has an ever-growing mountain of computational work backing it. This is why Bitcoin transactions become irreversible — not because a company promised it, but because undoing them would require burning more energy than protecting them.`, related: ["bitcoin-halving", "digital-scarcity", "21-million-hard-cap"] },
  { slug: "digital-scarcity", title: "Digital Scarcity", shortDef: "The property of having a provably limited digital supply that cannot be inflated or replicated.", definition: `Digital scarcity is a concept that seemed impossible before Bitcoin. In the digital world, copying is trivially cheap — you can duplicate a photo, a song, or a text file millions of times in seconds. Bitcoin solved this with a combination of cryptography, game theory, and distributed consensus. For the first time in human history, something purely digital can be provably scarce. There will never be more than 21 million Bitcoin, and every participant in the network can verify this independently, in real time, without trusting anyone. This is a singular breakthrough. Gold has always been scarce, but its scarcity isn't absolute — new gold can be mined. Real estate is scarce in specific locations, but more can always be built. Stocks are scarce until companies issue more. Bitcoin's scarcity is mathematically enforced and cannot be changed by any actor, no matter how powerful. This property is what distinguishes Bitcoin from the thousands of alternative cryptocurrencies that have been created since. Any programmer can create a new cryptocurrency and declare it scarce — but without Bitcoin's network effects, security, and battle-tested protocol, that scarcity is just a promise. Bitcoin's digital scarcity is the real thing.`, related: ["21-million-hard-cap", "proof-of-work", "fiat-debasement"] },
  { slug: "fiat-debasement", title: "Fiat Debasement", shortDef: "The systematic reduction of a fiat currency's purchasing power through money creation.", definition: `Fiat debasement is the quiet wealth confiscation that affects every person holding cash or cash-equivalent assets in any country with a central bank. It is the process by which governments and their central banking systems erode the purchasing power of money by creating more of it — inflating the supply, diluting the value of every existing unit. Since the U.S. dollar abandoned the gold standard in 1971, the Federal Reserve has dramatically expanded the money supply. The M2 money supply has grown from roughly $600 billion in 1971 to over $21 trillion today. That's a 35x increase. This is not accidental. Governments benefit from inflation — it erodes the real value of their debts. Banks benefit from getting access to newly created money first (the Cantillon Effect), before prices have risen. The losers are ordinary savers who hold cash. Bitcoin was designed specifically to solve this problem, offering an alternative monetary system where no authority can debase the currency.`, related: ["m2-money-supply", "purchasing-power", "inflation-vs-cpi"] },
  { slug: "self-custody", title: "Self-Custody", shortDef: "Holding your own Bitcoin private keys, giving you direct control without relying on a third party.", definition: `Self-custody means holding your own Bitcoin private keys — taking direct possession of your Bitcoin in a way that does not require trusting any third party. When you practice self-custody, you are your own bank. No exchange can freeze your funds. No company can go bankrupt and take your Bitcoin with it. No government can easily confiscate it through the banking system. FTX's 2022 collapse, which wiped out billions in customer funds overnight, demonstrated the catastrophic risk of custodial arrangements. Self-custody requires taking responsibility for private key management — a task that cannot be delegated. This means generating keys securely, backing up seed phrases properly, and maintaining the security of your setup over time. The learning curve is real but manageable. The minimal self-custody setup is a hardware wallet from a reputable manufacturer (Ledger or Trezor), with the seed phrase backed up in at least two separate physical locations.`, related: ["hardware-wallet", "seed-phrase", "cold-storage", "not-your-keys-not-your-coins"] },
  { slug: "hardware-wallet", title: "Hardware Wallet", shortDef: "A physical device that stores your Bitcoin private keys offline, away from internet threats.", definition: `A hardware wallet is a specialized physical device designed to store your Bitcoin private keys in a secure, offline environment — completely isolated from the internet and the malware, phishing attacks, and exchange hacks that plague the digital world. It is the gold standard for Bitcoin self-custody. When you sign a Bitcoin transaction with a hardware wallet, the transaction is sent to the device, the device signs it internally without ever exposing your private key, and only the signed transaction (not the key) is returned to your computer and broadcast to the network. Your private key never leaves the device. The two most popular and well-regarded hardware wallet manufacturers are Ledger and Trezor. Both have excellent track records and are suitable for most users. Key features to look for: a secure element chip, a physical screen to verify transaction details on the device itself, and open-source firmware.`, related: ["seed-phrase", "cold-storage", "self-custody"] },
  { slug: "seed-phrase", title: "Seed Phrase", shortDef: "A sequence of 12 or 24 words that is the master backup to all your Bitcoin.", definition: `A seed phrase (also called a recovery phrase or mnemonic phrase) is a human-readable backup of your Bitcoin private keys — typically 12 or 24 ordinary English words generated by your wallet. These words encode the master secret from which all your Bitcoin addresses and private keys are derived. If you lose your hardware wallet, this seed phrase is all you need to recover every Bitcoin you own on any compatible wallet. The implications are profound in both directions. The seed phrase's power to restore your funds is absolute — which means the consequences of its compromise are also absolute. Anyone who obtains your seed phrase gains complete, irrevocable access to all Bitcoin held by that wallet. Never photograph them. Never type them into a computer. Never store them in a cloud service. The gold standard is to write them on paper clearly and store them in at least two geographically separate locations.`, related: ["hardware-wallet", "cold-storage", "self-custody"] },
  { slug: "dollar-cost-averaging", title: "Dollar-Cost Averaging (DCA)", shortDef: "Buying a fixed dollar amount of Bitcoin at regular intervals regardless of price.", definition: `Dollar-Cost Averaging (DCA) is an investment strategy where you commit to buying a fixed dollar amount of an asset at regular intervals — weekly, biweekly, monthly — regardless of the current price. Applied to Bitcoin, it is the most reliable method for building a meaningful position over time without the psychological burden of trying to time the market. When Bitcoin is expensive, your fixed amount buys fewer satoshis. When Bitcoin is cheap, your fixed amount buys more satoshis. Over time, this averaging effect means you accumulate Bitcoin at a blended price that naturally gravitates toward the middle — you never buy exclusively at the peak, and you always buy through the dips. Historical backtesting shows that consistent Bitcoin DCA over multi-year periods has been profitable across virtually every entry point.`, related: ["bitcoin-market-cycle", "exit-strategy", "dynamic-dca"] },
  { slug: "bitcoin-market-cycle", title: "Bitcoin Market Cycle", shortDef: "Bitcoin's recurring ~4-year pattern driven by the halving.", definition: `The Bitcoin market cycle is a recurring pattern driven primarily by the halving — the programmatic reduction in new Bitcoin supply every four years. The cycle moves through distinct phases: accumulation (post-crash, low price), expansion (price recovery), bull market (parabolic appreciation), and bear market (long correction). The halving creates the supply shock that historically ignites each bull cycle. When new Bitcoin supply is suddenly cut in half while demand remains constant or grows, the price impact — though delayed by months — has been dramatic. The 2020 halving preceded Bitcoin's rise from roughly $8,000 to $69,000. Key indicators that help time the cycle include MVRV ratio, the Puell Multiple, Stock-to-Flow deviation, and long-term holder supply changes.`, related: ["bitcoin-halving", "exit-strategy", "dynamic-dca"] },
];

const GUIDES = [
  {
    slug: "how-to-set-up-a-hardware-wallet",
    title: "How to Set Up a Hardware Wallet",
    intro: "A hardware wallet is the single most important security upgrade you can make as a Bitcoin holder. This guide walks you through setting up a hardware wallet from unboxing to your first self-custodied Bitcoin — safely and correctly.",
    estimatedTime: "45 minutes",
    difficulty: "Beginner",
    steps: [
      { title: "Purchase directly from the manufacturer", content: "Always buy your hardware wallet directly from Ledger (ledger.com) or Trezor (trezor.io) — never from Amazon, eBay, or third-party resellers. Tampered devices have been used to steal Bitcoin." },
      { title: "Verify the device integrity", content: "Before setup, verify the device has not been tampered with. Ledger devices show a genuine check on first boot. A genuine device will never have a seed phrase pre-written inside the box." },
      { title: "Install the companion software", content: "Download Ledger Live or Trezor Suite directly from the manufacturer's official website. Do not install software from any other source." },
      { title: "Initialize the device and generate your seed phrase", content: "Connect the device and follow on-screen setup. The device displays your 12 or 24-word seed phrase on the device screen — never on your computer. Write every word correctly in order." },
      { title: "Backup your seed phrase", content: "Write your seed phrase clearly on the provided card. Never type it into a computer or photograph it. Store it in at least two separate physical locations." },
      { title: "Verify your seed phrase backup", content: "Complete the verification quiz your wallet presents. This confirms you wrote the words correctly." },
      { title: "Set a strong PIN", content: "Create a PIN of at least 6-8 digits. After a certain number of incorrect PIN attempts, the device wipes itself — a security feature." },
      { title: "Receive your first Bitcoin", content: "Install the Bitcoin app, navigate to Receive, and always verify the address on your device screen before sending any funds." },
    ],
  },
  {
    slug: "bitcoin-self-custody-guide",
    title: "The Complete Bitcoin Self-Custody Guide",
    intro: "Self-custody is the core skill of a sovereign Bitcoin holder. This guide covers everything you need to know: choosing a wallet, securing your seed phrase, threat modeling your setup.",
    estimatedTime: "1 hour",
    difficulty: "Intermediate",
    steps: [
      { title: "Understand what self-custody means", content: "Self-custody means you hold your own private keys. No exchange, company, or third party can access, freeze, or confiscate your Bitcoin." },
      { title: "Assess your threat model", content: "Identify your specific risks: hackers, physical theft, house fire, government seizure. Different threats require different solutions." },
      { title: "Choose your custody level", content: "Under $1k: mobile wallet. $1k-$50k: hardware wallet. $50k+: multisignature setup." },
      { title: "Generate your keys securely", content: "For hardware wallets, the device generates your seed phrase in a secure element." },
      { title: "Back up using the 2-location rule", content: "Your seed phrase backup must be in at least two separate physical locations." },
      { title: "Test your recovery procedure", content: "Before storing significant Bitcoin, test recovery with a different compatible wallet." },
      { title: "Secure your operational security", content: "Never discuss holdings publicly. Use dedicated email and phone for Bitcoin services." },
      { title: "Document for heirs", content: "Create an inheritance document explaining your setup without containing the actual seed phrase in one location." },
    ],
  },
  {
    slug: "bitcoin-exit-strategy",
    title: "Building Your Bitcoin Exit Strategy",
    intro: "An exit strategy is what separates Bitcoin investors who realize gains from those who ride cycles up and down without extracting value.",
    estimatedTime: "30 minutes",
    difficulty: "Intermediate",
    steps: [
      { title: "Accept that you cannot time the top", content: "The goal is not to capture the last dollar but to capture enough of the move to meaningfully change your financial situation." },
      { title: "Set your personal financial targets", content: "Define what you want to accomplish: pay off mortgage, fund a business, achieve a specific net worth." },
      { title: "Build a ladder selling plan", content: "Sell predetermined percentages at predetermined price levels — not all at once." },
      { title: "Use on-chain indicators as confirmation", content: "MVRV Z-Score above 7, NUPL above 0.75, and Puell Multiple above 4 historically signal overvaluation." },
      { title: "Plan your tax strategy", content: "Long-term capital gains (held 12+ months) are taxed at lower rates. Consult a crypto-specialist tax professional." },
      { title: "Consider alternatives to selling", content: "Bitcoin-backed loans can provide liquidity without triggering taxable events." },
      { title: "Automate your exit orders", content: "Pre-set limit orders during the accumulation phase execute without requiring emotional decisions during the bull market." },
    ],
  },
];

const COMPARISONS = [
  {
    slug: "ledger-vs-trezor",
    aName: "Ledger",
    bName: "Trezor",
    title: "Ledger vs Trezor: Which Hardware Wallet Is Right for You?",
    intro: "Ledger and Trezor are the two most trusted names in hardware wallet manufacturing. This comparison covers the key dimensions that matter for a Bitcoin holder.",
    verdict: "Both are excellent choices. Ledger's secure element chip provides stronger physical tamper resistance. Trezor's fully open-source firmware is better for users who prioritize code auditability.",
  },
  {
    slug: "cold-storage-vs-hot-wallet",
    aName: "Cold Storage",
    bName: "Hot Wallet",
    title: "Cold Storage vs Hot Wallet: Understanding Bitcoin Security Tiers",
    intro: "Every Bitcoin holder makes a fundamental security decision: how much to keep immediately accessible versus how much to keep deeply secured.",
    verdict: "Cold storage is unambiguously superior for significant holdings. Use cold storage for 95%+ of savings and a hot wallet only for amounts you're actively spending.",
  },
  {
    slug: "bitcoin-vs-gold",
    aName: "Bitcoin",
    bName: "Gold",
    title: "Bitcoin vs Gold: The Scarcity Showdown",
    intro: "Gold has served as humanity's store of value for 5,000 years. Bitcoin has existed for 15 — and outperforms gold on most monetary dimensions.",
    verdict: "Bitcoin outperforms gold on almost every monetary property. For long-term wealth storage in an increasingly digital world, Bitcoin's supply certainty, portability, and divisibility make it the superior monetary protocol.",
  },
];

// ─── Shared HTML shell ────────────────────────────────────────────────────────

function htmlShell({
  title,
  description,
  canonicalUrl,
  jsonLd,
  bodyContent,
}: {
  title: string;
  description: string;
  canonicalUrl: string;
  jsonLd: object;
  bodyContent: string;
}): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description.replace(/"/g, "&quot;")}" />
  <meta property="og:title" content="${title.replace(/"/g, "&quot;")}" />
  <meta property="og:description" content="${description.replace(/"/g, "&quot;")}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonicalUrl}" />
  <link rel="canonical" href="${canonicalUrl}" />
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  <style>
    body { font-family: Georgia, serif; max-width: 800px; margin: 0 auto; padding: 2rem; color: #111; background: #fff; }
    h1 { font-size: 2rem; font-weight: 900; line-height: 1.1; margin-bottom: 1rem; }
    h2 { font-size: 1.25rem; font-weight: 700; margin: 2rem 0 0.5rem; }
    p { line-height: 1.7; margin-bottom: 1rem; color: #333; }
    a { color: #F7931A; }
    nav { margin-bottom: 2rem; font-size: 0.875rem; }
    .badge { display: inline-block; border: 1px solid #111; padding: 0.25rem 0.5rem; font-size: 0.75rem; margin-bottom: 1rem; }
    ol li { margin-bottom: 0.75rem; line-height: 1.6; }
    .related { margin-top: 2rem; padding: 1rem; border: 1px solid #eee; }
    .cta { display: inline-block; background: #000; color: #fff; padding: 0.75rem 1.5rem; font-weight: bold; text-decoration: none; margin-top: 1rem; }
  </style>
</head>
<body>
  <nav>
    <a href="/">MONEYVERSE</a> /
    ${bodyContent.includes("GLOSSARY") ? '<a href="/learn/bitcoin-halving">Glossary</a>' : bodyContent.includes("GUIDE") ? '<a href="/research">Guides</a>' : '<a href="/research">Compare</a>'}
  </nav>
  ${bodyContent}
  <div class="related">
    <strong>Learn Bitcoin with the complete protocol:</strong>
    <br/><a href="/masterclass" class="cta">GET THE BLUEPRINT — $197 →</a>
  </div>
</body>
</html>`;
}

// ─── Glossary SSR ─────────────────────────────────────────────────────────────

router.get("/learn/:term", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.term) ? req.params.term[0] : req.params.term;
  const term = raw.toLowerCase().replace(/[^a-z0-9-]/g, "");

  const data = GLOSSARY_TERMS.find((t) => t.slug === term);

  if (!data) {
    res.status(404).send(htmlShell({
      title: "Term Not Found — Moneyverse Glossary",
      description: "This glossary term could not be found.",
      canonicalUrl: `https://moneyverse.network/learn/${term}`,
      jsonLd: {},
      bodyContent: `<h1>Term Not Found</h1><p>The term "${term}" doesn't exist in our glossary.</p><a href="/learn/bitcoin-halving">Browse Glossary →</a>`,
    }));
    return;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": data.title,
    "description": data.shortDef,
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "name": "Moneyverse Bitcoin Glossary",
      "url": "https://moneyverse.network/learn/bitcoin-halving",
    },
  };

  const relatedLinks = data.related
    .map((slug) => `<li><a href="/learn/${slug}">${slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</a></li>`)
    .join("");

  const bodyContent = `
    <div class="badge">BITCOIN GLOSSARY</div>
    <h1>${data.title}</h1>
    <p><strong>${data.shortDef}</strong></p>
    ${data.definition.split(/\n\n/).map((p) => `<p>${p}</p>`).join("")}
    <h2>Related Terms</h2>
    <ul>${relatedLinks}</ul>
  `;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(htmlShell({
    title: `${data.title} — Bitcoin Glossary — Moneyverse`,
    description: data.shortDef,
    canonicalUrl: `https://moneyverse.network/learn/${data.slug}`,
    jsonLd,
    bodyContent,
  }));
});

// ─── Guides SSR ───────────────────────────────────────────────────────────────

router.get("/guides/:slug", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
  const slug = raw.toLowerCase().replace(/[^a-z0-9-]/g, "");

  const guide = GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    res.status(404).send(htmlShell({
      title: "Guide Not Found — Moneyverse",
      description: "This guide could not be found.",
      canonicalUrl: `https://moneyverse.network/guides/${slug}`,
      jsonLd: {},
      bodyContent: `<h1>Guide Not Found</h1><p>The guide "${slug}" doesn't exist.</p><a href="/research">Browse Research →</a>`,
    }));
    return;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": guide.title,
    "description": guide.intro,
    "totalTime": `PT${guide.estimatedTime.replace(" minutes", "M").replace(" hour", "H")}`,
    "step": guide.steps.map((step, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": step.title,
      "text": step.content,
    })),
  };

  const stepsHtml = guide.steps.map((step, i) => `
    <h2>${i + 1}. ${step.title}</h2>
    <p>${step.content}</p>
  `).join("");

  const bodyContent = `
    <div class="badge">${guide.difficulty} · ${guide.estimatedTime}</div>
    <div class="badge" style="margin-left:0.5rem">HOW-TO GUIDE</div>
    <h1>${guide.title}</h1>
    <p>${guide.intro}</p>
    <ol>
      ${guide.steps.map((s) => `<li><strong>${s.title}</strong> — ${s.content}</li>`).join("")}
    </ol>
    ${stepsHtml}
  `;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(htmlShell({
    title: `${guide.title} — Moneyverse`,
    description: guide.intro,
    canonicalUrl: `https://moneyverse.network/guides/${guide.slug}`,
    jsonLd,
    bodyContent,
  }));
});

// ─── Compare SSR ──────────────────────────────────────────────────────────────

router.get("/compare/:slug", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
  const slug = raw.toLowerCase().replace(/[^a-z0-9-]/g, "");

  const comparison = COMPARISONS.find((c) => c.slug === slug);

  if (!comparison) {
    res.status(404).send(htmlShell({
      title: "Comparison Not Found — Moneyverse",
      description: "This comparison could not be found.",
      canonicalUrl: `https://moneyverse.network/compare/${slug}`,
      jsonLd: {},
      bodyContent: `<h1>Comparison Not Found</h1><p>The comparison "${slug}" doesn't exist.</p><a href="/research">Browse Research →</a>`,
    }));
    return;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": comparison.title,
    "description": comparison.intro,
    "author": { "@type": "Organization", "name": "Moneyverse" },
    "publisher": { "@type": "Organization", "name": "Moneyverse", "url": "https://moneyverse.network" },
  };

  const bodyContent = `
    <div class="badge">COMPARISON</div>
    <h1>${comparison.title}</h1>
    <p>${comparison.intro}</p>
    <h2>${comparison.aName} vs ${comparison.bName}</h2>
    <p>${comparison.verdict}</p>
  `;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(htmlShell({
    title: `${comparison.title} — Moneyverse`,
    description: comparison.intro,
    canonicalUrl: `https://moneyverse.network/compare/${comparison.slug}`,
    jsonLd,
    bodyContent,
  }));
});

// ─── Sitemap ──────────────────────────────────────────────────────────────────

router.get("/sitemap.xml", async (_req, res): Promise<void> => {
  const BASE = "https://moneyverse.network";

  const staticPages = ["/", "/thesis", "/curriculum", "/research", "/masterclass", "/tools"];

  const glossarySlugs = GLOSSARY_TERMS.map((t) => `/learn/${t.slug}`);
  const guideSlugs = GUIDES.map((g) => `/guides/${g.slug}`);
  const compareSlugs = COMPARISONS.map((c) => `/compare/${c.slug}`);

  const allUrls = [...staticPages, ...glossarySlugs, ...guideSlugs, ...compareSlugs];

  const urlEntries = allUrls
    .map(
      (path) =>
        `  <url>
    <loc>${BASE}${path}</loc>
    <changefreq>${path === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${path === "/" ? "1.0" : path === "/masterclass" ? "0.9" : "0.7"}</priority>
  </url>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.send(xml);
});

export default router;
