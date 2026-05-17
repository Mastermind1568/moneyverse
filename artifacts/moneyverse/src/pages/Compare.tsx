import { Link, useParams } from "wouter";
import Layout from "@/components/Layout";
import { usePageMeta } from "@/hooks/usePageMeta";
import { COMPARISONS, getComparisonBySlug } from "@/data/comparisons";

export default function Compare() {
  const { slug } = useParams<{ slug: string }>();
  const comparison = slug ? getComparisonBySlug(slug) : undefined;

  const metaTitle = comparison
    ? `${comparison.title} — Moneyverse`
    : "Comparison Not Found — Moneyverse";
  const metaDesc = comparison
    ? `In-depth comparison: ${comparison.aName} vs ${comparison.bName}. ${comparison.verdict.slice(0, 150)}...`
    : "This comparison could not be found.";

  usePageMeta(metaTitle, metaDesc);

  if (!comparison) {
    return (
      <Layout>
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center" data-testid="compare-not-found">
          <p className="text-xs font-bold tracking-widest text-muted-foreground mb-4">COMPARE</p>
          <h1 className="font-serif font-black text-4xl mb-6">Comparison Not Found</h1>
          <p className="text-muted-foreground mb-8">The comparison "{slug}" doesn't exist yet.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            {COMPARISONS.map((c) => (
              <Link key={c.slug} href={`/compare/${c.slug}`} data-testid={`link-compare-${c.slug}`}>
                <span className="border border-border px-4 py-2 text-sm hover:border-foreground transition-colors cursor-pointer block">
                  {c.aName} vs {c.bName}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </Layout>
    );
  }

  const related = comparison.relatedSlugs
    .map((s) => COMPARISONS.find((c) => c.slug === s))
    .filter(Boolean);

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="border-b border-border" data-testid="compare-breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3 text-xs text-muted-foreground">
          <Link href="/"><span className="hover:text-foreground transition-colors cursor-pointer">Home</span></Link>
          <span>/</span>
          <span>Compare</span>
          <span>/</span>
          <span className="text-foreground truncate">{comparison.aName} vs {comparison.bName}</span>
        </div>
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" data-testid="compare-article">
        {/* Hero */}
        <div className="mb-16">
          <p className="text-xs font-bold tracking-widest text-muted-foreground mb-6">COMPARISON</p>
          <h1 className="font-serif font-black text-4xl sm:text-5xl leading-tight mb-8" data-testid="compare-title">
            {comparison.title}
          </h1>
          {/* VS badge */}
          <div className="grid grid-cols-3 border border-border mb-10 max-w-xl">
            <div className="p-6 text-center bg-foreground text-background">
              <div className="font-serif font-black text-2xl">{comparison.aName}</div>
            </div>
            <div className="p-6 text-center flex items-center justify-center border-x border-border">
              <div className="font-serif font-black text-xl text-muted-foreground">VS</div>
            </div>
            <div className="p-6 text-center">
              <div className="font-serif font-black text-2xl">{comparison.bName}</div>
            </div>
          </div>
          {/* Intro */}
          <div className="max-w-3xl">
            {comparison.intro.split("\n\n").map((p, i) => (
              <p key={i} className="text-base text-muted-foreground leading-relaxed mb-4">{p}</p>
            ))}
          </div>
        </div>

        {/* Comparison table */}
        <section className="mb-16" data-testid="compare-table">
          <p className="text-xs font-bold tracking-widest text-muted-foreground mb-6">POINT BY POINT</p>
          <div className="border border-border">
            {/* Header */}
            <div className="grid grid-cols-7 bg-foreground text-background text-xs font-bold tracking-widest">
              <div className="col-span-2 p-4">CATEGORY</div>
              <div className="col-span-2 p-4 border-l border-background/20">{comparison.aName.toUpperCase()}</div>
              <div className="col-span-2 p-4 border-l border-background/20">{comparison.bName.toUpperCase()}</div>
              <div className="col-span-1 p-4 border-l border-background/20 text-center">EDGE</div>
            </div>
            {/* Rows */}
            {comparison.points.map((point, i) => (
              <div
                key={i}
                className={`grid grid-cols-7 ${i > 0 ? "border-t border-border" : ""}`}
                data-testid={`compare-row-${i}`}
              >
                <div className="col-span-2 p-4 bg-muted">
                  <div className="text-xs font-bold tracking-widest">{point.category}</div>
                </div>
                <div className={`col-span-2 p-4 text-sm text-muted-foreground leading-relaxed border-l border-border ${point.winner === "a" ? "bg-accent/5" : ""}`}>
                  {point.a}
                </div>
                <div className={`col-span-2 p-4 text-sm text-muted-foreground leading-relaxed border-l border-border ${point.winner === "b" ? "bg-accent/5" : ""}`}>
                  {point.b}
                </div>
                <div className="col-span-1 p-4 border-l border-border flex items-center justify-center">
                  {point.winner === "a" && (
                    <span className="text-xs font-bold tracking-widest text-accent">{comparison.aName}</span>
                  )}
                  {point.winner === "b" && (
                    <span className="text-xs font-bold tracking-widest">{comparison.bName}</span>
                  )}
                  {point.winner === "tie" && (
                    <span className="text-xs text-muted-foreground">TIE</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Verdict */}
        <section className="mb-16 max-w-3xl" data-testid="compare-verdict">
          <p className="text-xs font-bold tracking-widest text-muted-foreground mb-4">OUR VERDICT</p>
          <div className="border-l-4 border-accent pl-8">
            <p className="text-base text-foreground leading-relaxed">{comparison.verdict}</p>
          </div>
        </section>

        {/* CTA */}
        <section className="border border-border p-8 max-w-xl" data-testid="compare-cta">
          <p className="text-xs font-bold tracking-widest text-muted-foreground mb-4">GO DEEPER</p>
          <h3 className="font-serif font-bold text-xl mb-4">The Blueprint covers everything you need to know about securing Bitcoin</h3>
          <Link href="/masterclass" data-testid="link-compare-masterclass">
            <span className="inline-block cursor-pointer bg-foreground text-background text-xs font-bold tracking-widest px-8 py-4 hover:bg-accent hover:text-black transition-colors">
              GET THE BLUEPRINT — $197 →
            </span>
          </Link>
        </section>
      </article>

      {/* Related comparisons */}
      {related.length > 0 && (
        <section className="border-t border-border bg-muted py-16 px-4 sm:px-6 lg:px-8" data-testid="related-comparisons">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs font-bold tracking-widest text-muted-foreground mb-8">MORE COMPARISONS</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              {related.map((c) => c && (
                <Link key={c.slug} href={`/compare/${c.slug}`} data-testid={`link-related-compare-${c.slug}`}>
                  <div className="bg-background p-8 hover:bg-background/80 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-xs border border-border px-3 py-1 font-bold">{c.aName}</span>
                      <span className="text-xs text-muted-foreground">vs</span>
                      <span className="text-xs border border-border px-3 py-1 font-bold">{c.bName}</span>
                    </div>
                    <h3 className="font-serif font-bold text-xl leading-tight">{c.title}</h3>
                    <div className="text-xs font-bold tracking-widest text-muted-foreground mt-4 hover:text-accent transition-colors">
                      READ COMPARISON →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
