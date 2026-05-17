import { useState } from "react";
import Layout from "@/components/Layout";
import { usePageMeta } from "@/hooks/usePageMeta";
import { CURRICULUM_PHASES } from "@/data/curriculum";

const FAQS = [
  {
    question: "Is this right for me?",
    answer: "The Blueprint is designed for people who understand that Bitcoin is real and want a concrete plan — not philosophical debates or speculative trading advice. If you have savings you want to protect from monetary debasement and are willing to invest time learning a proper protocol, this is for you. No prior Bitcoin knowledge required.",
  },
  {
    question: "What if I'm a complete beginner?",
    answer: "Phase 1 (The Foundation) starts from zero — 'what is money?' through 'how Bitcoin works' in plain language. You don't need to understand cryptography, programming, or finance. You need curiosity and the willingness to question what you've been told about money. The Blueprint meets you where you are.",
  },
  {
    question: "What format is the content?",
    answer: "The Blueprint is structured as 85 lessons across 16 modules delivered through written content, annotated charts, and interactive tools. Each lesson is self-contained and designed to be completed in 15-30 minutes. You work at your own pace, in any order after completing Phase 1. Lifetime access means no deadline, ever.",
  },
  {
    question: "Is there a refund policy?",
    answer: "Yes. If you complete Phase 1 (4 modules) and don't believe the educational content delivered on its promise, request a full refund within 30 days. We are confident enough in the quality of the content to stand behind it. After 30 days, all sales are final.",
  },
  {
    question: "What about altcoins? Does the Blueprint cover them?",
    answer: "No. The Blueprint is Bitcoin-only, and that is a feature, not a limitation. After building a thorough understanding of what makes Bitcoin uniquely valuable — the 21M cap, Proof of Work security, absolute scarcity — the case for altcoins as serious monetary assets becomes difficult to make. We have nothing to say about tokens, NFTs, or DeFi. This is a Bitcoin education protocol.",
  },
  {
    question: "How is this different from free Bitcoin content online?",
    answer: "Free Bitcoin content is scattered, inconsistent in quality, often agenda-driven (shilling projects), and unstructured. The Blueprint is a deliberate curriculum with a specific endpoint: a fully operational Bitcoin position including self-custody, a DCA plan, and an exit architecture. The structure and sequence of the curriculum is the product — it saves you 2-3 years of self-directed research.",
  },
];

export default function Masterclass() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "name": "The Blueprint — Moneyverse Bitcoin Masterclass",
        "description": "$197 one-time. Lifetime access. 85 lessons across 16 modules. The complete Bitcoin protocol for serious operators.",
        "provider": { "@type": "Organization", "name": "Moneyverse", "url": "https://moneyverse.network" },
        "numberOfCredits": 85,
        "offers": {
          "@type": "Offer",
          "price": "197",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
        },
        "hasCourseInstance": CURRICULUM_PHASES.flatMap((phase) =>
          phase.modules.map((mod) => ({
            "@type": "CourseInstance",
            "name": mod.title,
            "description": mod.description,
          }))
        ),
      },
      {
        "@type": "FAQPage",
        "mainEntity": FAQS.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
        })),
      },
    ],
  };

  usePageMeta(
    "The Blueprint — Bitcoin Masterclass — Moneyverse",
    "$197 one-time. Lifetime access. 85 lessons across 16 modules. The complete Bitcoin protocol for serious operators.",
    jsonLd,
  );

  return (
    <Layout>
      {/* Hero pricing */}
      <section className="bg-foreground text-background py-24 px-8" data-testid="masterclass-hero">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-accent mb-8">THE BLUEPRINT</p>
          <h1 className="font-serif font-black text-5xl sm:text-7xl leading-[0.9] mb-8">
            The Bitcoin<br />
            Protocol for<br />
            <em className="text-accent not-italic">Operators.</em>
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-background/20 mb-12 mt-16">
            {[
              { value: "$197", label: "One-Time · No Subscription" },
              { value: "85", label: "Lessons Across 4 Phases" },
              { value: "4YR", label: "Halving Cycle Framework" },
            ].map(({ value, label }, i) => (
              <div
                key={value}
                className={`p-8 ${i > 0 ? "border-t sm:border-t-0 sm:border-l border-background/20" : ""}`}
                data-testid={`hero-stat-${i}`}
              >
                <div className="font-serif font-black text-5xl text-accent mb-3">{value}</div>
                <div className="text-sm text-background/60">{label}</div>
              </div>
            ))}
          </div>
          <button
            className="bg-accent text-black text-sm font-bold tracking-widest px-12 py-6 hover:bg-background hover:text-foreground transition-colors"
            data-testid="button-masterclass-cta-hero"
          >
            ACCESS THE BLUEPRINT →
          </button>
          <p className="text-xs text-background/40 mt-4">Secure checkout. 30-day satisfaction guarantee.</p>
        </div>
      </section>

      {/* USP pillars */}
      <section className="border-b border-border" data-testid="masterclass-usps">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-xs font-bold tracking-widest text-muted-foreground mb-12">WHY THE BLUEPRINT</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {[
              {
                title: "Bitcoin-Only",
                desc: "No altcoins. No DeFi. No tokens. Bitcoin is the only monetary protocol worth a serious education. The Blueprint goes deep on the one thing that matters.",
                icon: "₿",
              },
              {
                title: "Actionable Protocol",
                desc: "Not theory — a concrete plan. By the end of Phase 2, you will have purchased Bitcoin and moved it into self-custody. By Phase 3, you will have a DCA plan and exit architecture.",
                icon: "→",
              },
              {
                title: "Exit Architecture",
                desc: "Most Bitcoin education stops at accumulation. The Blueprint includes a complete exit strategy framework — built during the bear market so you can execute without emotion during the bull.",
                icon: "↗",
              },
            ].map(({ title, desc, icon }) => (
              <div key={title} className="bg-background p-10" data-testid={`usp-${title.toLowerCase().replace(/\s/g, "-")}`}>
                <div className="font-serif font-black text-4xl text-accent mb-6">{icon}</div>
                <h3 className="font-serif font-bold text-2xl mb-4">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" data-testid="masterclass-curriculum">
        <p className="text-xs font-bold tracking-widest text-muted-foreground mb-4">WHAT'S INSIDE</p>
        <h2 className="font-serif font-black text-4xl sm:text-5xl mb-16">Complete Curriculum</h2>
        <div className="space-y-12">
          {CURRICULUM_PHASES.map((phase) => (
            <div key={phase.number} className="border border-border" data-testid={`curriculum-phase-${phase.number}`}>
              <div className="bg-foreground text-background px-8 py-5 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <span className="font-mono text-xs opacity-60">PHASE {phase.number}</span>
                  <h3 className="font-serif font-bold text-xl">{phase.title}</h3>
                </div>
                <span className="text-xs text-background/60">{phase.modules.length} MODULES</span>
              </div>
              <div className="divide-y divide-border">
                {phase.modules.map((mod) => (
                  <div key={mod.id} className="px-8 py-5 flex items-start gap-6" data-testid={`curriculum-module-${mod.id}`}>
                    <span className="font-mono text-xs text-muted-foreground mt-0.5 w-8 flex-shrink-0">{mod.id}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-medium text-sm">{mod.title}</span>
                        <span className="text-xs text-muted-foreground">{mod.duration}</span>
                        <span className="text-xs border border-border px-2 py-0.5">{mod.difficulty}</span>
                      </div>
                      <ul className="mt-2 space-y-1">
                        {mod.objectives.map((obj, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                            <span className="text-accent mt-0.5 flex-shrink-0">·</span>
                            {obj}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Affiliate */}
      <section className="bg-muted border-y border-border px-8 py-16" data-testid="masterclass-affiliate">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold tracking-widest text-muted-foreground mb-4">PARTNER PROGRAM</p>
            <h2 className="font-serif font-black text-3xl sm:text-4xl mb-6">50/50 Revenue Split.</h2>
            <p className="text-muted-foreground leading-relaxed">
              Earn 50% on every Blueprint sale you refer — $98.50 per conversion. No caps, no tiers, no complex commission structures. You refer, we split. Simple.
            </p>
          </div>
          <div className="border border-border bg-background p-8">
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "50%", label: "Revenue share" },
                { value: "$98.50", label: "Per referral" },
                { value: "∞", label: "No cap" },
                { value: "30d", label: "Cookie window" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="font-serif font-black text-3xl text-accent">{value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{label}</div>
                </div>
              ))}
            </div>
            <button
              className="mt-8 w-full bg-foreground text-background text-xs font-bold tracking-widest py-4 hover:bg-accent hover:text-black transition-colors"
              data-testid="button-affiliate-apply"
            >
              APPLY TO PARTNER →
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20" data-testid="masterclass-faq">
        <p className="text-xs font-bold tracking-widest text-muted-foreground mb-4">FAQ</p>
        <h2 className="font-serif font-black text-4xl mb-12">Common Questions</h2>
        <div className="space-y-0 border border-border">
          {FAQS.map((faq, i) => (
            <div key={i} className={i > 0 ? "border-t border-border" : ""} data-testid={`faq-${i}`}>
              <button
                className="w-full text-left px-8 py-6 flex items-center justify-between gap-4 hover:bg-muted transition-colors"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                data-testid={`button-faq-${i}`}
              >
                <span className="font-serif font-bold text-lg">{faq.question}</span>
                <span className="text-2xl text-muted-foreground flex-shrink-0">{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && (
                <div className="px-8 pb-6 border-t border-border" data-testid={`faq-answer-${i}`}>
                  <p className="text-muted-foreground leading-relaxed pt-4">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-foreground text-background py-24 px-8" data-testid="masterclass-final-cta">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest text-accent mb-6">ONE-TIME. LIFETIME.</p>
          <h2 className="font-serif font-black text-4xl sm:text-6xl mb-4">$197</h2>
          <p className="text-background/60 mb-10 text-lg">85 lessons · 16 modules · 4-year framework</p>
          <button
            className="bg-accent text-black text-sm font-bold tracking-widest px-12 py-6 hover:bg-background hover:text-foreground transition-colors"
            data-testid="button-masterclass-cta-final"
          >
            ACCESS THE BLUEPRINT →
          </button>
          <p className="text-xs text-background/40 mt-6">30-day satisfaction guarantee · Bitcoin-only · No altcoins</p>
        </div>
      </section>
    </Layout>
  );
}
