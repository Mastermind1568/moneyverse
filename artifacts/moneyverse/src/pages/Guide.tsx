import { Link, useParams } from "wouter";
import Layout from "@/components/Layout";
import { usePageMeta } from "@/hooks/usePageMeta";
import { GUIDES, getGuideBySlug } from "@/data/guides";

const DIFFICULTY_COLOR: Record<string, string> = {
  Beginner: "text-accent border-accent",
  Intermediate: "text-foreground border-foreground",
  Advanced: "text-foreground border-foreground",
};

export default function Guide() {
  const { slug } = useParams<{ slug: string }>();
  const guide = slug ? getGuideBySlug(slug) : undefined;

  const metaTitle = guide
    ? `${guide.title} — Guides — Moneyverse`
    : "Guide Not Found — Moneyverse";
  const metaDesc = guide
    ? guide.intro
    : "This guide could not be found.";

  const jsonLd = guide
    ? {
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
      }
    : undefined;

  usePageMeta(metaTitle, metaDesc, jsonLd);

  if (!guide) {
    return (
      <Layout>
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center" data-testid="guide-not-found">
          <p className="text-xs font-bold tracking-widest text-muted-foreground mb-4">GUIDES</p>
          <h1 className="font-serif font-black text-4xl mb-6">Guide Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The guide "{slug}" doesn't exist yet.
          </p>
          <Link href="/research" data-testid="link-guide-back">
            <span className="text-xs font-bold tracking-widest underline underline-offset-4 hover:text-accent transition-colors cursor-pointer">
              ← BROWSE INTEL
            </span>
          </Link>
        </section>
      </Layout>
    );
  }

  const relatedGuides = guide.relatedSlugs
    .map((s) => GUIDES.find((g) => g.slug === s))
    .filter(Boolean);

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="border-b border-border" data-testid="guide-breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3 text-xs text-muted-foreground">
          <Link href="/">
            <span className="hover:text-foreground transition-colors cursor-pointer">Home</span>
          </Link>
          <span>/</span>
          <span>Guides</span>
          <span>/</span>
          <span className="text-foreground truncate">{guide.title}</span>
        </div>
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" data-testid="guide-article">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Meta */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className={`text-xs border px-2 py-0.5 font-bold ${DIFFICULTY_COLOR[guide.difficulty]}`}>
                {guide.difficulty}
              </span>
              <span className="text-xs text-muted-foreground">{guide.estimatedTime}</span>
              <span className="text-xs text-muted-foreground">{guide.steps.length} steps</span>
            </div>

            <p className="text-xs font-bold tracking-widest text-muted-foreground mb-4">HOW-TO GUIDE</p>
            <h1 className="font-serif font-black text-4xl sm:text-5xl mb-8 leading-tight" data-testid="guide-title">
              {guide.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              {guide.intro}
            </p>

            {/* Steps */}
            <div className="space-y-0" data-testid="guide-steps">
              {guide.steps.map((step, i) => (
                <div
                  key={i}
                  className="border border-border mb-4 last:mb-0"
                  data-testid={`guide-step-${i + 1}`}
                >
                  <div className="flex items-start gap-0">
                    <div className="flex-shrink-0 w-12 sm:w-16 flex items-center justify-center bg-foreground text-background self-stretch">
                      <span className="font-serif font-black text-xl">{i + 1}</span>
                    </div>
                    <div className="p-6 flex-1">
                      <h3 className="font-serif font-bold text-lg mb-3">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Next steps */}
            <div className="mt-12 border-t border-border pt-8">
              <p className="text-xs font-bold tracking-widest text-muted-foreground mb-4">NEXT STEPS</p>
              <Link href="/masterclass" data-testid="link-guide-masterclass">
                <span className="inline-block cursor-pointer bg-foreground text-background text-xs font-bold tracking-widest px-8 py-4 hover:bg-accent hover:text-black transition-colors">
                  GET THE FULL BLUEPRINT — $197 →
                </span>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick nav */}
            <div className="border border-border p-6 mb-8 sticky top-24" data-testid="guide-toc">
              <p className="text-xs font-bold tracking-widest text-muted-foreground mb-4">IN THIS GUIDE</p>
              <ol className="space-y-2">
                {guide.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-xs font-mono text-muted-foreground mt-0.5 w-4 flex-shrink-0">{i + 1}.</span>
                    <span className="text-sm">{step.title}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-6 pt-6 border-t border-border">
                <Link href="/masterclass" data-testid="link-guide-sidebar-cta">
                  <span className="block text-center cursor-pointer bg-foreground text-background text-xs font-bold tracking-widest px-4 py-3 hover:bg-accent hover:text-black transition-colors">
                    GET THE BLUEPRINT →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related guides */}
      {relatedGuides.length > 0 && (
        <section className="border-t border-border bg-muted py-16 px-4 sm:px-6 lg:px-8" data-testid="related-guides">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs font-bold tracking-widest text-muted-foreground mb-8">RELATED GUIDES</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {relatedGuides.map((g) => g && (
                <Link key={g.slug} href={`/guides/${g.slug}`} data-testid={`link-related-guide-${g.slug}`}>
                  <div className="bg-background p-8 hover:bg-background/80 transition-colors cursor-pointer h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-xs border px-2 py-0.5 font-bold ${DIFFICULTY_COLOR[g.difficulty]}`}>{g.difficulty}</span>
                      <span className="text-xs text-muted-foreground">{g.estimatedTime}</span>
                    </div>
                    <h3 className="font-serif font-bold text-xl mb-3 leading-tight">{g.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">{g.intro}</p>
                    <div className="text-xs font-bold tracking-widest text-muted-foreground mt-4 hover:text-accent transition-colors">
                      READ GUIDE →
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
