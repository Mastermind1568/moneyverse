import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { usePageMeta } from "@/hooks/usePageMeta";
import { CURRICULUM_PHASES } from "@/data/curriculum";

const PHASE_COLORS = ["bg-foreground text-background", "bg-background text-foreground", "bg-accent text-black", "bg-background text-foreground"];
const PHASE_BORDER_COLORS = ["border-foreground", "border-foreground", "border-accent", "border-foreground"];

export default function Curriculum() {
  const [openModule, setOpenModule] = useState<string | null>(null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "The Moneyverse Bitcoin Curriculum",
    "description": "The complete Bitcoin education path: from 'what is money?' to exit architecture and inheritance planning. 85 lessons, 4 phases, one protocol.",
    "provider": { "@type": "Organization", "name": "Moneyverse", "url": "https://moneyverse.network" },
    "numberOfCredits": 85,
    "hasCourseInstance": CURRICULUM_PHASES.flatMap((phase) =>
      phase.modules.map((mod) => ({
        "@type": "CourseInstance",
        "name": mod.title,
        "description": mod.description,
        "courseMode": "online",
      }))
    ),
  };

  usePageMeta(
    "Bitcoin Curriculum — 4 Phases, 16 Modules — Moneyverse",
    "The complete Bitcoin education path: from 'what is money?' to exit architecture and inheritance planning. 85 lessons, 4 phases, one protocol.",
    jsonLd,
  );

  return (
    <Layout>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20" data-testid="curriculum-hero">
        <div className="max-w-3xl">
          <p className="text-xs font-bold tracking-widest text-muted-foreground mb-6">THE CURRICULUM</p>
          <h1 className="font-serif font-black text-5xl sm:text-6xl leading-[0.9] mb-8">
            4 Phases.<br />
            16 Modules.<br />
            <span className="text-accent">One Protocol.</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The complete Bitcoin education path — from first principles to exit architecture. Built around the four-year halving cycle. Designed for operators, not spectators.
          </p>
        </div>
      </section>

      {/* Phase overview */}
      <section className="border-t border-border" data-testid="phase-overview">
        <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-border">
          {CURRICULUM_PHASES.map((phase, i) => (
            <div
              key={phase.number}
              className={`${PHASE_COLORS[i]} p-6 lg:p-8 ${i > 0 ? "border-l border-border" : ""}`}
              data-testid={`phase-header-${phase.number}`}
            >
              <div className="font-mono text-xs mb-3 opacity-60">PHASE {String(phase.number).padStart(2, "0")}</div>
              <h3 className="font-serif font-bold text-xl leading-tight">{phase.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Phases detail */}
      <section className="border-b border-border" data-testid="phases-detail">
        {CURRICULUM_PHASES.map((phase, pi) => (
          <div key={phase.number} className={pi > 0 ? "border-t border-border" : ""} data-testid={`phase-${phase.number}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              {/* Phase header */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
                <div className="lg:col-span-1">
                  <div className={`inline-flex items-center border-2 ${PHASE_BORDER_COLORS[pi]} px-4 py-2 mb-4`}>
                    <span className="text-xs font-bold tracking-widest">PHASE {phase.number}</span>
                  </div>
                  <h2 className="font-serif font-black text-3xl">{phase.title}</h2>
                </div>
                <div className="lg:col-span-3 flex items-center">
                  <p className="text-lg text-muted-foreground">{phase.subtitle}</p>
                </div>
              </div>

              {/* Modules */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border" data-testid={`phase-${phase.number}-modules`}>
                {phase.modules.map((mod) => {
                  const isOpen = openModule === mod.id;
                  return (
                    <div key={mod.id} className="bg-background" data-testid={`module-${mod.id}`}>
                      <button
                        className="w-full text-left p-8 flex items-start justify-between gap-4 hover:bg-muted transition-colors"
                        onClick={() => setOpenModule(isOpen ? null : mod.id)}
                        data-testid={`button-module-${mod.id}`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="font-mono text-xs text-muted-foreground">{mod.id}</span>
                            <span className="text-xs border border-border px-2 py-0.5 font-medium">{mod.difficulty}</span>
                            <span className="text-xs text-muted-foreground">{mod.duration}</span>
                          </div>
                          <h3 className="font-serif font-bold text-lg">{mod.title}</h3>
                        </div>
                        <span className="text-2xl text-muted-foreground mt-1 flex-shrink-0">{isOpen ? "−" : "+"}</span>
                      </button>
                      {isOpen && (
                        <div className="px-8 pb-8 border-t border-border" data-testid={`module-detail-${mod.id}`}>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-6 mt-6">{mod.description}</p>
                          <div>
                            <p className="text-xs font-bold tracking-widest mb-3">KEY OBJECTIVES</p>
                            <ul className="space-y-2">
                              {mod.objectives.map((obj, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm">
                                  <span className="text-accent mt-0.5 flex-shrink-0">→</span>
                                  <span className="text-muted-foreground">{obj}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-24 px-8" data-testid="curriculum-cta">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest text-muted-foreground mb-4">READY TO START?</p>
          <h2 className="font-serif font-black text-4xl sm:text-5xl mb-8">Get The<br />Blueprint.</h2>
          <Link href="/masterclass" data-testid="link-curriculum-cta">
            <span className="inline-block cursor-pointer bg-foreground text-background text-sm font-bold tracking-widest px-10 py-5 hover:bg-accent hover:text-black transition-colors">
              ACCESS THE BLUEPRINT — $197 →
            </span>
          </Link>
          <p className="text-xs text-muted-foreground mt-4">One-time. Lifetime access. All 11 modules.</p>
        </div>
      </section>
    </Layout>
  );
}
