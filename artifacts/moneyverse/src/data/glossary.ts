export interface GlossaryTerm {
  slug: string;
  title: string;
  shortDefinition: string;
  definition: string;
  relatedTerms: string[];
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    slug: "bitcoin-halving",
    title: "Bitcoin Halving",
    shortDefinition: "A programmatic event that cuts Bitcoin's new supply in half every ~4 years.",
    definition: `The Bitcoin Halving is one of the most consequential events in monetary history — a programmatic, mathematically predetermined reduction in the rate at which new Bitcoin enters circulation. It occurs approximately every 210,000 blocks (roughly every four years), and each time it happens, the reward miners receive for validating transactions is cut exactly in half.

When Satoshi Nakamoto launched Bitcoin in 2009, miners received 50 BTC per block. After the first halving in November 2012, that dropped to 25 BTC. The second halving in July 2016 brought it to 12.5 BTC. The third halving in May 2020 reduced it to 6.25 BTC. The fourth halving in April 2024 cut it to 3.125 BTC. This process will continue until the final satoshi is mined, projected around the year 2140.

Why does this matter? Supply and demand. When demand for Bitcoin remains constant or increases while the new supply flowing into the market is cut in half, the price pressure tilts decisively upward. This isn't speculation — it's basic economics. The halving is hardcoded into Bitcoin's protocol and cannot be changed, debated, or voted away by any central authority.

The halving also creates Bitcoin's famous four-year market cycles. Historically, each halving has been followed by a significant bull run as markets absorb the new supply shock reality. Understanding the halving cycle is foundational to any intelligent Bitcoin accumulation and exit strategy.

The halving is what makes Bitcoin's monetary policy the most predictable, auditable, and trustworthy in human history. No central bank can alter it. No government can accelerate it. It runs like clockwork, block after block, securing Bitcoin's status as genuinely scarce digital money.`,
    relatedTerms: ["21-million-hard-cap", "proof-of-work", "bitcoin-market-cycle", "digital-scarcity"],
  },
  {
    slug: "21-million-hard-cap",
    title: "21 Million Hard Cap",
    shortDefinition: "The absolute maximum number of Bitcoin that will ever exist.",
    definition: `The 21 million hard cap is Bitcoin's most fundamental property — the absolute, immutable ceiling on how many Bitcoin will ever exist. Not 21 million and one. Not more if miners vote. Not more if the market demands it. Exactly 21 million, baked into Bitcoin's code from genesis block to final satoshi.

This number wasn't chosen arbitrarily. Satoshi Nakamoto designed the issuance schedule so that the final Bitcoin wouldn't be mined until approximately 2140, giving humanity over a century to transition to a Bitcoin standard. Each Bitcoin is divisible into 100 million units called satoshis (sats), meaning the total supply is actually 2.1 quadrillion satoshis — enough granularity to serve a global economy.

The hard cap is enforced by Bitcoin's consensus rules — the rules that every node in the network validates independently. If a miner tried to issue more Bitcoin than allowed, every honest node in the network would reject that block outright. There is no committee, no appeals board, and no override. The rule is the rule.

Contrast this with every fiat currency that has ever existed. The U.S. dollar has no supply cap. The Federal Reserve can and does create trillions of new dollars at will. This dilution silently transfers wealth from savers to those with access to newly created money — a phenomenon economists call the Cantillon Effect. Bitcoin's hard cap makes this impossible.

The 21 million cap is what transforms Bitcoin from a clever cryptographic experiment into genuine monetary scarcity. In a world where every other asset class can theoretically be produced in greater quantities — more gold can be mined, more stocks can be issued, more real estate can be built — Bitcoin is the first asset in human history with absolute, verifiable, unalterable scarcity.`,
    relatedTerms: ["bitcoin-halving", "digital-scarcity", "proof-of-work", "fiat-debasement"],
  },
  {
    slug: "proof-of-work",
    title: "Proof of Work",
    shortDefinition: "The consensus mechanism that secures Bitcoin by requiring real computational energy expenditure.",
    definition: `Proof of Work (PoW) is the consensus mechanism that makes Bitcoin work — the system by which the network agrees on a single, valid history of all transactions without requiring any trusted third party. It is Bitcoin's immune system, its security model, and the physical bridge between the digital and real worlds.

Here is how it works: Miners compete to solve an extraordinarily difficult cryptographic puzzle. The puzzle requires finding a number (called a nonce) such that when combined with the transaction data and run through the SHA-256 hash function, the result begins with a required number of zeroes. The only way to find this number is to try trillions of possibilities — there are no shortcuts. The first miner to find the solution broadcasts it to the network, earns the block reward (currently 3.125 BTC), and the process starts again.

This process is intentionally expensive. It requires real-world energy — electricity — which means attacking Bitcoin requires acquiring and deploying an enormous amount of physical infrastructure. To rewrite Bitcoin's history or double-spend coins, an attacker would need to outpace the cumulative computational work of the entire global mining network. As Bitcoin grows, this becomes progressively more expensive and impractical.

The beauty of Proof of Work is that it converts energy into economic finality. Every confirmed transaction has an ever-growing mountain of computational work backing it. This is why Bitcoin transactions become irreversible — not because a company promised it, but because undoing them would require burning more energy than protecting them.

Critics point to Bitcoin's energy consumption as a flaw. But this energy expenditure is the feature, not the bug. It is what makes Bitcoin trustworthy without requiring trust in any institution. Every other monetary system — fiat, gold, even other cryptocurrencies — relies on someone's promise. Bitcoin relies on physics.`,
    relatedTerms: ["bitcoin-halving", "21-million-hard-cap", "digital-scarcity", "self-custody"],
  },
  {
    slug: "digital-scarcity",
    title: "Digital Scarcity",
    shortDefinition: "The property of having a provably limited digital supply that cannot be inflated or replicated.",
    definition: `Digital scarcity is a concept that seemed impossible before Bitcoin. In the digital world, copying is trivially cheap — you can duplicate a photo, a song, or a text file millions of times in seconds. This property made digital money impossible before Bitcoin: if you could copy digital coins as easily as copying files, the system would be worthless.

Bitcoin solved this with a combination of cryptography, game theory, and distributed consensus. For the first time in human history, something purely digital can be provably scarce. There will never be more than 21 million Bitcoin, and every participant in the network can verify this independently, in real time, without trusting anyone.

This is a singular breakthrough. Gold has always been scarce, but its scarcity isn't absolute — new gold can be mined, and in the future, asteroid mining could theoretically flood the market. Real estate is scarce in specific locations, but more can always be built. Stocks are scarce until companies issue more. Bitcoin's scarcity is mathematically enforced and cannot be changed by any actor, no matter how powerful.

Digital scarcity creates the foundation for Bitcoin's value proposition: it is the only asset that combines the portability and divisibility of digital information with the scarcity of a physical commodity. You can send any amount of Bitcoin to anyone anywhere in the world in minutes, with no intermediary — and the recipient can verify they actually own it without trusting any third party.

This property is what distinguishes Bitcoin from the thousands of alternative cryptocurrencies that have been created since. Any programmer can create a new cryptocurrency and declare it scarce — but without Bitcoin's network effects, security, and battle-tested protocol, that scarcity is just a promise. Bitcoin's digital scarcity is the real thing.`,
    relatedTerms: ["21-million-hard-cap", "proof-of-work", "bitcoin-halving", "fiat-debasement"],
  },
  {
    slug: "fiat-debasement",
    title: "Fiat Debasement",
    shortDefinition: "The systematic reduction of a fiat currency's purchasing power through money creation.",
    definition: `Fiat debasement is the quiet wealth confiscation that affects every person holding cash or cash-equivalent assets in any country with a central bank. It is the process by which governments and their central banking systems erode the purchasing power of money by creating more of it — inflating the supply, diluting the value of every existing unit.

The word "fiat" means "by decree" in Latin. Fiat money has value because the government says it does, and because laws require its acceptance. There is no underlying commodity backing it, no hard limit on how much can be created. This is in stark contrast to commodity-backed money, which had its supply constrained by the physical difficulty of mining gold or silver.

Since the U.S. dollar abandoned the gold standard in 1971, the Federal Reserve has dramatically expanded the money supply. The M2 money supply — a broad measure of dollars in circulation — has grown from roughly $600 billion in 1971 to over $21 trillion today. That's a 35x increase. Meanwhile, the prices of assets, housing, education, and healthcare have outpaced official CPI figures by enormous margins.

The mechanism is simple: when more money is created, each existing dollar buys less. If you have $100,000 in a savings account earning 0.5% interest, but the money supply grows 7% that year, you have lost 6.5% of your purchasing power in real terms. Your nominal balance grew, but your real wealth shrank.

This is not accidental. Governments benefit from inflation — it erodes the real value of their debts. Banks benefit from getting access to newly created money first (the Cantillon Effect), before prices have risen. The losers are ordinary savers who hold cash. Bitcoin was designed specifically to solve this problem, offering an alternative monetary system where no authority can debase the currency.`,
    relatedTerms: ["m2-money-supply", "purchasing-power", "inflation-vs-cpi", "21-million-hard-cap"],
  },
  {
    slug: "m2-money-supply",
    title: "M2 Money Supply",
    shortDefinition: "A broad measure of money in circulation, including cash, checking deposits, and savings.",
    definition: `M2 is one of the Federal Reserve's key measures of the money supply in the United States. It includes physical currency in circulation, demand deposits (checking accounts), savings deposits, money market funds, and other time deposits under $100,000. In short, it measures all money that is either immediately spendable or easily convertible to spending.

M2 matters because it is the most relevant measure of the monetary base that affects everyday prices. When the Fed expands M2 — through mechanisms like quantitative easing, low interest rates, or direct money creation — more dollars are chasing the same amount of goods and services. The inevitable result is higher prices, which we experience as inflation.

The rate of M2 growth is a leading indicator of future inflation. When M2 grows faster than real economic output, prices must eventually rise to absorb the excess money. This relationship was dramatically illustrated in 2020-2021, when the Federal Reserve expanded M2 by over 40% in just two years in response to the COVID-19 pandemic. The predictable result was the highest inflation in 40 years, peaking at over 9% in 2022.

For Bitcoin investors, tracking M2 growth is essential context. Bitcoin's supply grows at a known, declining rate — currently less than 1% per year and falling with each halving. When you compare Bitcoin's supply growth rate to M2 growth, the asymmetry becomes clear: dollars are being created much faster than Bitcoin, making Bitcoin progressively more scarce relative to the dollar over time.

The M2 money supply data is public and freely available from the Federal Reserve's own website. Unlike Bitcoin, where every issuance is transparent and verifiable on-chain, fiat money creation happens through opaque banking mechanisms that most citizens never examine. Understanding M2 is the first step to understanding why holding cash is a losing long-term strategy.`,
    relatedTerms: ["fiat-debasement", "purchasing-power", "inflation-vs-cpi", "21-million-hard-cap"],
  },
  {
    slug: "purchasing-power",
    title: "Purchasing Power",
    shortDefinition: "The real-world buying ability of a unit of currency over time.",
    definition: `Purchasing power is the amount of goods and services you can buy with a given amount of money. It is the true measure of wealth — not the number printed on your bank statement, but what that number can actually buy in the real world. And purchasing power, for every fiat currency in history, has moved in one direction: down.

The U.S. dollar has lost over 97% of its purchasing power since the Federal Reserve was created in 1913. A dollar in 1913 bought what roughly $30 buys today. This erosion is not random — it is the direct consequence of continuous money creation. Every time new dollars are added to the system without a corresponding increase in goods and services, each existing dollar becomes worth slightly less.

For ordinary savers, this creates an insidious trap. Keeping money in a savings account feels safe. The number goes up (barely) with interest. But if that interest rate is lower than the real rate of inflation, your purchasing power is declining even as your nominal balance grows. This is the fiat trap: the illusion of safety while wealth quietly evaporates.

The impact compounds dramatically over time. At 3% annual inflation — historically conservative — $100,000 today has the purchasing power of $74,000 in ten years, $55,000 in twenty years, and $41,000 in thirty years. At the actual rate of M2 money supply growth (historically 6-7% per year), the erosion is far more severe.

Bitcoin offers the opposite trajectory. As its supply growth rate declines with each halving and demand grows with global adoption, Bitcoin's purchasing power has historically increased relative to fiat currencies. This is not guaranteed — Bitcoin is volatile — but the long-term asymmetry between an appreciating scarce asset and a depreciating inflationary currency is the core investment thesis.`,
    relatedTerms: ["fiat-debasement", "m2-money-supply", "inflation-vs-cpi", "dollar-cost-averaging"],
  },
  {
    slug: "inflation-vs-cpi",
    title: "Inflation vs. CPI",
    shortDefinition: "Why the official inflation measure understates the real erosion of purchasing power.",
    definition: `The Consumer Price Index (CPI) is the U.S. government's official measure of inflation — a basket of goods and services tracked over time to measure price changes. According to CPI, inflation has been relatively tame in recent decades. But many economists, investors, and ordinary people living through price increases know that CPI significantly understates the real erosion of purchasing power.

The gap between CPI and real inflation is not a conspiracy theory — it is a methodological reality. Several factors cause CPI to understate actual cost-of-living increases. First, "substitution bias": when beef gets expensive, CPI assumes you switch to chicken, effectively crediting the statistic for a cost reduction based on the behavior it forced. Second, "hedonic quality adjustments": if a TV this year has better features than last year's model, CPI may record its price as "falling" even if you paid more. Third, housing costs are measured via "owners' equivalent rent" — an imputed number that often diverges significantly from actual housing costs.

The result is that CPI-measured inflation consistently runs below alternative measures. The Chapwood Index, for example, which tracks actual prices of 500 common goods and services in major U.S. cities, has historically shown inflation running 2-3x higher than CPI.

For Bitcoin investors, the CPI gap matters because it understates the true cost of holding cash. If you're benchmarking your returns against CPI, you're using a ruler that shrinks your losses. The real hurdle rate — the return you need just to maintain purchasing power — is likely significantly higher than the official 2% inflation target.

Bitcoin doesn't care about CPI. Its supply is fixed, its protocol is neutral, and its price discovery happens in open markets without political interference. For those who understand the gap between official inflation data and lived economic reality, Bitcoin represents the most direct hedge available.`,
    relatedTerms: ["fiat-debasement", "m2-money-supply", "purchasing-power", "fiat-debasement"],
  },
  {
    slug: "hardware-wallet",
    title: "Hardware Wallet",
    shortDefinition: "A physical device that stores your Bitcoin private keys offline, away from internet threats.",
    definition: `A hardware wallet is a specialized physical device designed to store your Bitcoin private keys in a secure, offline environment — completely isolated from the internet and the malware, phishing attacks, and exchange hacks that plague the digital world. It is the gold standard for Bitcoin self-custody and an essential tool for anyone serious about protecting their holdings.

The core problem a hardware wallet solves is simple: private keys stored on an internet-connected device are always at risk. A computer infected with keylogging malware can capture your keys. An exchange can be hacked, taking your Bitcoin with it. A phone can be SIM-swapped. Any device connected to the internet is a potential attack surface. Hardware wallets eliminate this threat by keeping private keys in a secure element that never transmits them — not even to the computer you connect the device to.

When you sign a Bitcoin transaction with a hardware wallet, the transaction is sent to the device, the device signs it internally without ever exposing your private key, and only the signed transaction (not the key) is returned to your computer and broadcast to the network. Your private key never leaves the device.

The two most popular and well-regarded hardware wallet manufacturers are Ledger and Trezor. Both have excellent track records and are suitable for most users. Key features to look for: a secure element chip (stores the key in tamper-resistant hardware), a physical screen (to verify transaction details on the device itself, not your computer), and open-source firmware (so the security can be independently verified).

Hardware wallets are not magic — they require proper setup and seed phrase backup. But for anyone holding significant Bitcoin, they are the minimum security standard. The Bitcoin community's maxim says it best: "Not your keys, not your coins."`,
    relatedTerms: ["seed-phrase", "cold-storage", "self-custody", "not-your-keys-not-your-coins"],
  },
  {
    slug: "seed-phrase",
    title: "Seed Phrase",
    shortDefinition: "A sequence of 12 or 24 words that is the master backup to all your Bitcoin.",
    definition: `A seed phrase (also called a recovery phrase or mnemonic phrase) is a human-readable backup of your Bitcoin private keys — typically 12 or 24 ordinary English words generated by your wallet. These words encode the master secret from which all your Bitcoin addresses and private keys are derived. If you lose your hardware wallet, this seed phrase is all you need to recover every Bitcoin you own on any compatible wallet.

The seed phrase works through a standard called BIP-39, which maps 2,048 common English words to numbers. Your wallet generates a random number, encodes it into words, and derives all your private keys deterministically from that single master seed. This means that backing up 12 or 24 words effectively backs up your entire Bitcoin fortune, no matter how many addresses you've used.

The implications are profound in both directions. The seed phrase's power to restore your funds is absolute — which means the consequences of its compromise are also absolute. Anyone who obtains your seed phrase gains complete, irrevocable access to all Bitcoin held by that wallet. There are no appeals, no password resets, no bank to call. This is not a flaw — it is the feature of self-sovereignty. You are your own bank.

Proper seed phrase security requires treating those 12 or 24 words like the master key to a vault containing everything you own. Never photograph them. Never type them into a computer. Never store them in a cloud service. Never tell anyone. The gold standard is to write them on paper — clearly, with the correct spelling and order — and store them in at least two geographically separate locations, ideally one being fireproof.

Advanced users engrave seed phrases on stainless steel to protect against fire and water. This is not paranoia — it is appropriate security for an asset with no recovery mechanism.`,
    relatedTerms: ["hardware-wallet", "cold-storage", "self-custody", "not-your-keys-not-your-coins"],
  },
  {
    slug: "cold-storage",
    title: "Cold Storage",
    shortDefinition: "Keeping Bitcoin private keys completely offline, disconnected from internet risks.",
    definition: `Cold storage refers to any method of storing Bitcoin private keys in a completely offline environment — one that has never been exposed to the internet and ideally never will be. It is the highest form of Bitcoin security, used by serious long-term holders, institutions, and anyone treating Bitcoin as a meaningful store of wealth.

The spectrum of Bitcoin storage runs from "hot" (fully online) to "cold" (fully offline). A software wallet on your phone is hot — connected, convenient, vulnerable. A hardware wallet that's only connected to sign transactions is warm. True cold storage takes this further: keys generated on an airgapped device (one that has never been and will never be connected to the internet), with transactions signed offline and then broadcast to the network via a separate, internet-connected device.

Practical cold storage options include: hardware wallets (the most common and accessible solution), paper wallets (keys printed or written and stored physically), and airgapped computers running wallet software with no network connectivity. Each has tradeoffs between security and convenience.

For most Bitcoin holders, a hardware wallet represents the optimal balance between security and usability. It keeps your keys offline (cold) while still allowing you to sign transactions without excessive friction. True airgapped setups offer maximum security but require more technical sophistication and can introduce their own risks if not configured correctly.

The fundamental principle of cold storage is that a private key that has never touched the internet cannot be stolen via a network attack. Thieves would need physical access to the device — and if your seed phrase is backed up in a separate, secure location, even physical theft of the device doesn't compromise your Bitcoin.`,
    relatedTerms: ["hardware-wallet", "seed-phrase", "self-custody", "hot-wallet"],
  },
  {
    slug: "hot-wallet",
    title: "Hot Wallet",
    shortDefinition: "A Bitcoin wallet connected to the internet, offering convenience at the cost of security.",
    definition: `A hot wallet is any Bitcoin wallet that maintains an active or frequent connection to the internet. This includes software wallets on your smartphone or computer, browser extension wallets, and Bitcoin held directly on exchanges. Hot wallets are useful for spending, transacting, and holding small amounts — but they carry inherent security risks that make them unsuitable for storing significant savings.

The "hot" in hot wallet refers to the connection to the network. Being online means being exposed to every category of cyber threat: malware, phishing attacks, supply chain compromises, remote exploits, and exchange hacks. Private keys on an internet-connected device are always at risk of being accessed by malicious software. This isn't hypothetical — billions of dollars in Bitcoin have been stolen from hot wallets and exchanges over the years.

Hot wallets serve an important function in the Bitcoin ecosystem. When you need to pay for something with Bitcoin, send Bitcoin to an exchange to sell, or interact with Bitcoin-based applications, a hot wallet provides the convenience and accessibility necessary for these transactions. The key is to keep only the amount in a hot wallet that you would be comfortable losing — think of it like walking-around cash versus savings.

The optimal Bitcoin security model uses both: cold storage (hardware wallet or airgapped setup) for your long-term savings stack, and a hot wallet for amounts you're actively using. Never keep more than a few hundred dollars worth of Bitcoin in a hot wallet. Never keep any amount you care about on an exchange for longer than necessary to complete a transaction.

The distinction between hot and cold storage is the single most important security concept for new Bitcoin holders. Getting this right protects you from the most common and costly Bitcoin mistakes.`,
    relatedTerms: ["cold-storage", "hardware-wallet", "self-custody", "not-your-keys-not-your-coins"],
  },
  {
    slug: "dollar-cost-averaging",
    title: "Dollar-Cost Averaging (DCA)",
    shortDefinition: "Buying a fixed dollar amount of Bitcoin at regular intervals regardless of price.",
    definition: `Dollar-Cost Averaging (DCA) is an investment strategy where you commit to buying a fixed dollar amount of an asset at regular intervals — weekly, biweekly, monthly — regardless of the current price. Applied to Bitcoin, it is the most reliable method for building a meaningful position over time without the psychological burden of trying to time the market.

The mechanics are simple. Suppose you commit to buying $200 of Bitcoin every week. When Bitcoin is expensive, your $200 buys fewer satoshis. When Bitcoin is cheap, your $200 buys more satoshis. Over time, this averaging effect means you accumulate Bitcoin at a blended price that naturally gravitates toward the middle — you never buy exclusively at the peak, and you always buy through the dips.

The psychological advantage of DCA is equally important. Bitcoin is one of the most volatile assets in the world. Checking the price daily and trying to buy "at the right time" leads to paralysis, FOMO-driven buying at peaks, and panic selling during corrections. DCA eliminates these decisions entirely. You buy on your schedule, regardless of price, without emotion.

Historical backtesting shows that consistent Bitcoin DCA over multi-year periods has been profitable across virtually every entry point. Even investors who began DCA at the 2017 peak ($19,800) and continued through the subsequent bear market recovered and eventually generated significant returns as Bitcoin reached new all-time highs.

The advanced version of DCA is Dynamic DCA — adjusting your purchase size based on where we are in the four-year halving cycle. During bear markets and post-halving accumulation phases, you increase your buy amount. During euphoric bull markets approaching cycle peaks, you reduce your accumulation. This requires more sophistication but can significantly improve the average cost basis over time.`,
    relatedTerms: ["bitcoin-market-cycle", "exit-strategy", "dynamic-dca", "bitcoin-halving"],
  },
  {
    slug: "bitcoin-market-cycle",
    title: "Bitcoin Market Cycle",
    shortDefinition: "Bitcoin's recurring ~4-year pattern of accumulation, bull market, and bear market driven by the halving.",
    definition: `The Bitcoin market cycle is a recurring pattern that has repeated with remarkable consistency since Bitcoin's early years. Driven primarily by the halving — the programmatic reduction in new Bitcoin supply every four years — the cycle moves through distinct phases: accumulation (post-crash, low price), the bull market (parabolic price appreciation), the blow-off top (peak euphoria), and the bear market (long, painful correction). Understanding this cycle is fundamental to any intelligent Bitcoin investment strategy.

The halving creates the supply shock that historically ignites each bull cycle. When new Bitcoin supply is suddenly cut in half while demand remains constant or grows, the price impact — though delayed by months — has been dramatic. The 2020 halving preceded Bitcoin's rise from roughly $8,000 to $69,000 by November 2021. The 2016 halving preceded the rise from roughly $600 to $20,000 by December 2017.

The cycle has four recognizable phases. The Accumulation phase occurs in the 12-18 months following a market top, when prices have crashed 70-85% from peak and sentiment is at its worst. This is when experienced investors accumulate maximum Bitcoin. The Expansion phase begins 6-12 months before or after a halving, when prices start rising on renewed interest. The Bull Market phase brings the parabolic appreciation — broad media attention, new retail investors, explosive price moves. The Correction phase follows as the market exhausts momentum, typically retracing 70-80% from the peak over 12-18 months.

Key indicators that help time the cycle include: Bitcoin's hash rate, the MVRV ratio (market value to realized value), the Stock-to-Flow model, on-chain data like long-term holder supply changes, and traditional market sentiment metrics. No single indicator is perfect, but collectively they provide a framework for cycle-aware decision making.

The most powerful application of cycle awareness is avoiding the emotional traps each phase creates. Accumulation feels hopeless — that's when you should be buying most aggressively. Bull markets feel like they'll never end — that's when you should be planning your exit.`,
    relatedTerms: ["bitcoin-halving", "exit-strategy", "dynamic-dca", "dollar-cost-averaging"],
  },
  {
    slug: "exit-strategy",
    title: "Exit Strategy",
    shortDefinition: "A predetermined plan for taking profits from Bitcoin during a bull market cycle.",
    definition: `An exit strategy is the most important — and most neglected — component of any Bitcoin investment plan. It is a predetermined, rules-based system for selling a portion of your Bitcoin holdings as the market approaches a cycle peak, locking in real-world purchasing power while the opportunity exists. Without an exit strategy, even the most successful Bitcoin investors often end up watching life-changing gains evaporate in the subsequent bear market.

The fundamental challenge of Bitcoin exits is psychological. During bull markets, every sale feels like a mistake. If you sell at $50,000 and Bitcoin reaches $80,000, you feel regret. If you sell at $80,000 and it reaches $100,000, you feel regret again. The market seems like it will never stop going up — until it does, often violently, and those who hesitated find themselves holding an asset worth 70-80% less than the peak.

The solution is to plan your exit during the bear market, when you're not emotionally compromised by greed. Decide in advance what price levels trigger what percentage of sales. Common approaches include: ladder selling (selling fixed percentages at predetermined price levels), cycle-indicator-based exits (selling when on-chain metrics like MVRV or NUPL reach euphoria zones), or time-based exits (selling in the 12-18 months following a halving, historically when cycle peaks occur).

Tax implications must factor into any exit strategy. In most jurisdictions, selling Bitcoin triggers a taxable event. Holding for over 12 months typically qualifies for lower long-term capital gains rates. Tax-loss harvesting, strategic timing of sales across tax years, and potentially using Bitcoin as collateral for loans (rather than selling) are all considerations for a complete exit architecture.

The goal is not to perfectly time the top — that's impossible. The goal is to take enough profit during the bull market to fund life goals, reduce risk, and have dry powder to re-accumulate during the subsequent bear market.`,
    relatedTerms: ["bitcoin-market-cycle", "dynamic-dca", "dollar-cost-averaging", "bitcoin-halving"],
  },
  {
    slug: "dynamic-dca",
    title: "Dynamic DCA",
    shortDefinition: "Cycle-aware accumulation that increases buys during bear markets and reduces them near peaks.",
    definition: `Dynamic Dollar-Cost Averaging (Dynamic DCA) is an enhanced version of the standard DCA strategy that adjusts purchase amounts based on where Bitcoin is in its market cycle. Instead of buying the same fixed amount every week regardless of price or cycle position, Dynamic DCA buys more aggressively during bear markets and accumulation phases — when Bitcoin is cheapest and most available — and reduces purchases during bull market peaks when Bitcoin is expensive and risk is elevated.

The logic is straightforward: if you believe Bitcoin has long-term value and follows predictable halving cycles, then buying more when it's cheap and less when it's expensive produces better outcomes than blind mechanical averaging. Dynamic DCA requires more active management and judgment, but it can significantly improve your average cost basis over a full market cycle.

Implementation varies by sophistication level. A simple Dynamic DCA rule might be: double your weekly buy amount any time Bitcoin is 50%+ below its previous all-time high, return to normal when it's within 30% of ATH, and reduce to half when it's within 10% of ATH. More sophisticated versions use on-chain indicators — MVRV Z-Score, Bitcoin's four-year moving average, or the Puell Multiple — to adjust buying dynamically based on quantitative signals.

The psychological challenge of Dynamic DCA is real: buying more during bear markets requires conviction when sentiment is at its worst. When prices are down 70%, most people want to sell, not buy more. This is precisely why having a written, rule-based system matters. You follow the rules you set during a neutral state of mind, not your emotions in the heat of a crash.

Dynamic DCA works best when combined with a clear exit strategy: you're accumulating more aggressively in bear markets with a concrete plan to take profits in the subsequent bull cycle. Without the exit strategy, Dynamic DCA becomes a more volatile way to hold through cycles without realizing gains.`,
    relatedTerms: ["dollar-cost-averaging", "bitcoin-market-cycle", "exit-strategy", "bitcoin-halving"],
  },
  {
    slug: "hyperbitcoinization",
    title: "Hyperbitcoinization",
    shortDefinition: "A theoretical future state where Bitcoin replaces fiat currencies as the world's primary monetary system.",
    definition: `Hyperbitcoinization is a theoretical future state in which Bitcoin's network effects, monetary properties, and global adoption reach a point of irreversibility — where Bitcoin effectively replaces fiat currencies as the world's dominant monetary system. The term was coined by Daniel Krawisz in 2014 and describes a scenario of rapid, self-reinforcing adoption that could unfold faster than most analysts expect.

The concept is rooted in game theory. Once enough individuals, businesses, and governments begin pricing goods and services in Bitcoin, holding Bitcoin becomes economically rational even for those skeptical of its philosophy. The last ones to adopt fiat-denominated savings bear all the inflationary losses; the first to convert to Bitcoin capture the appreciation from expanding adoption. This creates a powerful incentive structure that could drive adoption at an accelerating rate.

Several historical precedents support the possibility. Dollarization — the process by which citizens of high-inflation countries spontaneously abandon their local currency for U.S. dollars — has occurred in Argentina, Zimbabwe, Venezuela, and elsewhere. Hyperbitcoinization would be dollarization at a global scale, with Bitcoin as the preferred currency due to its superior monetary properties: fixed supply, borderless settlement, no issuing authority.

El Salvador's adoption of Bitcoin as legal tender in 2021, though imperfect in execution, demonstrated that nation-states can incorporate Bitcoin into their monetary frameworks. Several other countries have followed with varying degrees of integration.

Hyperbitcoinization is a theoretical endpoint, not a near-term prediction. Bitcoin could become the world's reserve asset without fully displacing fiat currencies — a world where Bitcoin serves as the savings layer and fiat serves as the spending layer. Whether the endgame is full hyperbitcoinization or coexistence, the directional bet on Bitcoin's increasing monetary role is the core long-term thesis.`,
    relatedTerms: ["bitcoin-circular-economy", "21-million-hard-cap", "digital-scarcity", "fiat-debasement"],
  },
  {
    slug: "bitcoin-circular-economy",
    title: "Bitcoin Circular Economy",
    shortDefinition: "An economic system where people earn, spend, and save in Bitcoin without converting to fiat.",
    definition: `A Bitcoin circular economy is an economic ecosystem in which participants earn Bitcoin, spend Bitcoin, and save Bitcoin without ever needing to convert to fiat currency. Rather than treating Bitcoin purely as a speculative investment to be cashed out for dollars, the circular economy vision sees Bitcoin as functional money for everyday economic activity.

The circular economy concept recognizes that Bitcoin's ultimate value is not as a speculative vehicle but as a sovereign monetary system. When a freelancer accepts payment in Bitcoin, pays their vendors in Bitcoin, and holds their savings in Bitcoin — without touching fiat at any point — they have opted out of the fiat system and into the Bitcoin system. Multiplied across thousands or millions of participants, this creates a parallel economy that becomes progressively less dependent on legacy financial infrastructure.

Real-world examples are emerging globally. In El Salvador, the government's Chivo wallet enabled Bitcoin payments at a national scale. In parts of Africa, Bitcoin provides a superior alternative to inflation-ravaged local currencies. Among the global digital nomad community, Bitcoin-denominated salaries and payments are increasingly common. The Lightning Network — Bitcoin's payment layer — makes small, fast, cheap transactions practical for daily commerce.

The circular economy also has profound implications for financial sovereignty in emerging markets. In countries where the banking system is inaccessible, unreliable, or actively hostile to citizens (through capital controls, currency confiscation, or hyperinflation), Bitcoin provides an alternative that requires only a smartphone and internet connection. This is not theoretical charity — it is practical monetary sovereignty.

Building a personal Bitcoin circular economy, even partially, changes one's relationship with money in fundamental ways. You become acutely aware of Bitcoin's price movements, develop an intuitive feel for satoshi denominations, and gain hands-on experience with the technology that makes Bitcoin functional as everyday money.`,
    relatedTerms: ["hyperbitcoinization", "self-custody", "dollar-cost-averaging", "21-million-hard-cap"],
  },
  {
    slug: "self-custody",
    title: "Self-Custody",
    shortDefinition: "Holding your own Bitcoin private keys, giving you direct control without relying on a third party.",
    definition: `Self-custody means holding your own Bitcoin private keys — taking direct possession of your Bitcoin in a way that does not require trusting any third party to safeguard it. When you practice self-custody, you are your own bank. No exchange can freeze your funds. No company can go bankrupt and take your Bitcoin with it. No government can easily confiscate it through the banking system. You control your Bitcoin, absolutely.

This stands in contrast to custodial holding, where you hold Bitcoin on an exchange or with a custodian. In those cases, you own a claim on Bitcoin — an IOU — but you don't own the underlying asset. The exchange holds the private keys, and you trust them to honor your claim. FTX's 2022 collapse, which wiped out billions in customer funds overnight, demonstrated the catastrophic risk of this arrangement. Exchanges and custodians can and do fail.

Self-custody requires taking responsibility for private key management — a task that cannot be delegated. This means generating keys securely, backing up seed phrases properly, and maintaining the security of your setup over time. The learning curve is real but manageable, and the knowledge required is not beyond any motivated individual.

The minimal self-custody setup is a hardware wallet from a reputable manufacturer (Ledger or Trezor), with the seed phrase backed up in at least two separate physical locations. This setup protects against exchange risk, hacks, and most physical threats.

Advanced self-custody involves multisignature (multisig) setups, where multiple private keys are required to authorize a transaction. A 2-of-3 multisig arrangement, for example, requires any two of three separate keys to sign. This eliminates single points of failure — even if one key is lost or stolen, your Bitcoin is safe. Multisig is the gold standard for significant holdings and is increasingly accessible through services and wallets designed for non-technical users.`,
    relatedTerms: ["hardware-wallet", "seed-phrase", "cold-storage", "not-your-keys-not-your-coins"],
  },
  {
    slug: "not-your-keys-not-your-coins",
    title: "Not Your Keys, Not Your Coins",
    shortDefinition: "The Bitcoin principle that custodial holdings are IOUs, not real Bitcoin ownership.",
    definition: `"Not your keys, not your coins" is the most important maxim in Bitcoin security, and it carries the weight of billions of dollars in lost or stolen Bitcoin. The phrase encapsulates a fundamental truth: if you don't hold the private keys to your Bitcoin, you don't actually own Bitcoin — you own a promise from someone else that they'll give you Bitcoin when you ask. That promise can be broken.

Private keys are the mathematical proof of Bitcoin ownership. Whoever controls the private key controls the Bitcoin. Exchanges, custodians, and lending platforms hold your private keys when you store Bitcoin with them. They can restrict withdrawals, go bankrupt, get hacked, or be compelled by governments to freeze accounts. Every one of these events has happened, repeatedly, at scale.

The history of exchange failures and custodial collapses is a long and painful one. Mt. Gox (2014): 850,000 Bitcoin lost. Bitfinex hack (2016): 120,000 Bitcoin stolen. QuadrigaCX (2019): founder dies, taking the keys with him — $190 million in customer funds inaccessible. Celsius Network (2022): $4.7 billion in customer funds frozen. FTX (2022): over $8 billion in customer funds misappropriated. The list goes on. In every case, users trusted custodians with their keys and paid the price.

The solution is self-custody: generating your own private keys, controlling your own seed phrase, and storing your Bitcoin in a wallet that only you can access. This requires accepting personal responsibility for security — the keys cannot be recovered if lost — but it eliminates the entire category of counterparty risk that has destroyed so many Bitcoin investors.

For practical purposes, keeping small amounts on exchanges for trading purposes is acceptable. But any Bitcoin you're not actively trading — your savings stack — should be in self-custody. The distinction between "Bitcoin I'm using" (exchange, hot wallet) and "Bitcoin I'm saving" (hardware wallet, cold storage) is the most important security framework for any holder.`,
    relatedTerms: ["self-custody", "hardware-wallet", "cold-storage", "seed-phrase"],
  },
];

export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  return GLOSSARY_TERMS.find((t) => t.slug === slug);
}
