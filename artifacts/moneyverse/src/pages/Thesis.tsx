import { Link } from "wouter";
import Layout from "@/components/Layout";
import { usePageMeta } from "@/hooks/usePageMeta";

const CHAPTERS = [
  {
    number: "01",
    title: "The Fiat Leak",
    sections: [
      {
        heading: "Money as a Technology",
        body: "Money is not natural — it is a technology, invented and iterated upon by civilizations across millennia. Barter failed because it required a 'double coincidence of wants': you had wheat, you needed a hammer, and you had to find someone with a hammer who wanted wheat. Commodity money solved this with universally valued objects — shells, salt, gold. Fiat money solved portability and divisibility. But fiat introduced a critical failure mode that all previous monetary systems lacked: unlimited expandability of supply.",
      },
      {
        heading: "The M2 Money Supply and the Mathematics of Dilution",
        body: "Since the U.S. dollar abandoned the gold standard in 1971, the Federal Reserve has expanded the M2 money supply from approximately $600 billion to over $21 trillion — a 35x increase. This expansion is not neutral. Every new dollar created dilutes the value of every existing dollar. At a 7% annual M2 growth rate (historically conservative), the purchasing power of a dollar held in savings is cut in half approximately every decade. This is not a bug in the system — it is the system.",
      },
      {
        heading: "The CPI Deception",
        body: "The official Consumer Price Index consistently understates real inflation through methodological choices that benefit the government's debt obligations. Substitution bias credits the statistic when consumers are forced to buy cheaper alternatives. Hedonic adjustments reduce recorded prices when products gain features. Owners' equivalent rent substitutes an imputed number for actual housing costs. The result: official inflation of 2-3% while M2 grows at 6-8%, asset prices rise 10-15% annually, and the lived experience of Americans diverges dramatically from the official statistic.",
      },
      {
        heading: "The Asset Inflation Trap",
        body: "Those who understand inflation seek refuge in assets: real estate, index funds, stocks. But this is not wealth creation — it is a life raft. If the S&P 500 returns 10% annually but M2 grows 7%, your real return is 3%. If you're paying taxes on the nominal 10% gain, your after-tax real return may be negative. Real estate doubles your housing costs over 20 years while providing the same shelter. These assets don't make you rich — they keep you treading water while the monetary tide rises. The trap is that staying stationary feels like winning.",
      },
    ],
  },
  {
    number: "02",
    title: "Absolute Scarcity",
    sections: [
      {
        heading: "The Double Spend Problem",
        body: "Before Bitcoin, creating digital money was impossible for a specific reason: digital information can be copied infinitely at near-zero cost. If I send you a digital file, I still have it. If I send you a digital dollar, what prevents me from sending the same dollar to a hundred other people simultaneously? The traditional solution was to use trusted intermediaries — banks — to maintain authoritative ledgers and prevent double spending. Satoshi's solution was to create a distributed ledger secured by computational work, eliminating the trusted intermediary entirely.",
      },
      {
        heading: "Proof of Work: Energy as Anchor",
        body: "Bitcoin's Proof of Work is often criticized as wasteful. This criticism fundamentally misunderstands what the energy is doing. By requiring miners to expend real-world energy to add blocks to the blockchain, Bitcoin anchors its digital ledger to physical reality. Attacking the network requires acquiring and deploying more physical infrastructure than all honest miners combined. This is not waste — it is the cost of trustless, permissionless, uncensorable digital money. Every dollar spent on Bitcoin mining is a dollar making the network more secure.",
      },
      {
        heading: "21 Million: An Immutable Promise",
        body: "Bitcoin's 21 million hard cap is not a feature that could be changed by a majority vote. It is enforced by every node in the network independently. Any miner or developer who attempted to change this rule would have their version of the blockchain rejected by every honest node. The cap is not a policy — it is a physical reality of the network. This is the first time in monetary history that a money supply limit has been enforced by mathematics rather than by the promises of any institution.",
      },
      {
        heading: "The Halving as Mathematical Heartbeat",
        body: "Every 210,000 blocks — approximately every four years — the reward for mining a Bitcoin block is cut in half. This creates a programmatic, predictable reduction in new supply that mimics the diminishing marginal returns of gold mining, but with perfect, unalterable precision. The halving is Bitcoin's heartbeat: a recurring supply shock that has historically preceded each major bull market cycle. It cannot be delayed, accelerated, or canceled. It runs whether markets are euphoric or despairing, whether governments approve or prohibit it.",
      },
    ],
  },
  {
    number: "03",
    title: "The 21M Standard",
    sections: [
      {
        heading: "A Singular, Unrepeatable Discovery",
        body: "Bitcoin cannot be recreated. The conditions that enabled its launch — anonymous creator, no premine, genuine community development, network effects built organically over years — are not replicable. Every cryptocurrency that came after had a known founder, a team with financial interests, and a supply that could in practice be changed. Bitcoin is the exception precisely because it was not launched as a business venture. Satoshi disappeared. The network ran itself. Bitcoin is not crypto — it is the monetary discovery equivalent of fire.",
      },
      {
        heading: "Bitcoin as Protocol, Not Product",
        body: "People compare Bitcoin to MySpace — dismissed as the first attempt at something that will eventually be superseded by a better version. This analogy fundamentally misunderstands what Bitcoin is. MySpace was a product. Facebook was a better product. Bitcoin is a protocol. TCP/IP was not replaced by a better internet protocol — it became the foundation of the internet. Bitcoin's monetary properties are not features that can be copied — they are emergent properties of its specific history, network effects, and security. You can copy the code. You cannot copy the network, the trust, or the immutability.",
      },
      {
        heading: "Monetary Sovereignty in Practice",
        body: "Bitcoin's ultimate promise is not that it will make you rich — though it has made many people wealthy. Its ultimate promise is monetary sovereignty: the ability to hold, send, and receive money without the permission of any government, bank, or institution. For most people living in wealthy Western countries, this sounds abstract. For the billions living under capital controls, currency confiscation, hyperinflation, or simply without access to banking infrastructure, it is immediately practical. Bitcoin is the only money in human history that cannot be inflated, seized, or controlled by any authority.",
      },
      {
        heading: "The Protocol is The Plan",
        body: "Understanding Bitcoin intellectually is not enough. The gap between understanding and acting is where wealth is lost. Every year you hold fiat savings, you lose purchasing power. Every halving cycle that passes without a position is a compounding opportunity cost. The 21M Standard is not an abstract concept — it is a call to action. The protocol exists. The tools exist. The education exists. What has been missing is a concrete, actionable plan for operators who understand the stakes but haven't built their position. That plan is the Moneyverse Blueprint.",
      },
    ],
  },
];

export default function Thesis() {
  usePageMeta(
    "The Bitcoin Thesis — Moneyverse",
    "The complete monetary argument for Bitcoin: The Fiat Leak, Absolute Scarcity, and The 21M Standard. Understanding why holding fiat is a guaranteed loss."
  );

  return (
    <Layout>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20" data-testid="thesis-hero">
        <div className="max-w-3xl">
          <p className="text-xs font-bold tracking-widest text-muted-foreground mb-6">THE THESIS</p>
          <h1 className="font-serif font-black text-5xl sm:text-7xl leading-[0.9] mb-8">
            Why Bitcoin.<br />
            Why Now.<br />
            Why <em className="text-accent not-italic">You.</em>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Three chapters. One conclusion: the monetary system you were born into is designed to transfer your wealth to those who control it. Bitcoin is the first viable exit.
          </p>
        </div>
      </section>

      {/* Chapters */}
      <section className="border-t border-border" data-testid="thesis-chapters">
        {CHAPTERS.map((chapter, ci) => (
          <div key={chapter.number} className={`${ci > 0 ? "border-t border-border" : ""}`} data-testid={`chapter-${chapter.number}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              {/* Chapter header */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
                <div className="lg:col-span-1">
                  <div className="font-serif font-black text-[8rem] leading-none text-muted-foreground/10 select-none -ml-2">
                    {chapter.number}
                  </div>
                </div>
                <div className="lg:col-span-3">
                  <p className="text-xs font-bold tracking-widest text-muted-foreground mb-3">CHAPTER {chapter.number}</p>
                  <h2 className="font-serif font-black text-4xl sm:text-5xl">{chapter.title}</h2>
                </div>
              </div>

              {/* Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
                <div className="lg:col-span-1" />
                <div className="lg:col-span-3 space-y-12">
                  {chapter.sections.map((section, si) => (
                    <div key={si} className="border-l-2 border-border pl-8" data-testid={`section-${chapter.number}-${si}`}>
                      <h3 className="font-serif font-bold text-xl mb-4">{section.heading}</h3>
                      <p className="text-base text-muted-foreground leading-relaxed">{section.body}</p>
                    </div>
                  ))}

                  {/* Pull quote */}
                  {ci === 0 && (
                    <div className="bg-foreground text-background p-10 my-8">
                      <p className="font-serif font-black text-2xl leading-tight">
                        "At 7% annual M2 growth, the purchasing power of a dollar held in savings is cut in half approximately every decade. This is not a bug — it is the system."
                      </p>
                    </div>
                  )}
                  {ci === 1 && (
                    <div className="bg-foreground text-background p-10 my-8">
                      <p className="font-serif font-black text-2xl leading-tight">
                        "Bitcoin's 21 million cap is not a policy that could be voted away. It is enforced by mathematics. This is the first time in monetary history that has ever been true."
                      </p>
                    </div>
                  )}
                  {ci === 2 && (
                    <div className="bg-foreground text-background p-10 my-8">
                      <p className="font-serif font-black text-2xl leading-tight">
                        "Bitcoin is not crypto. It is the monetary discovery equivalent of fire. You cannot recreate it. You can only decide whether you hold it."
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-foreground text-background py-24 px-8" data-testid="thesis-cta">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest text-accent mb-6">YOU UNDERSTAND THE THESIS</p>
          <h2 className="font-serif font-black text-4xl sm:text-5xl mb-8">Now Build<br />The Position</h2>
          <Link href="/masterclass" data-testid="link-thesis-cta">
            <span className="inline-block cursor-pointer bg-accent text-black text-sm font-bold tracking-widest px-10 py-5 hover:bg-background hover:text-foreground transition-colors">
              GET THE BLUEPRINT — $197 →
            </span>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
