import { Link, useParams } from "wouter";
import Layout from "@/components/Layout";
import { usePageMeta } from "@/hooks/usePageMeta";
import { GLOSSARY_TERMS, getTermBySlug } from "@/data/glossary";

export default function GlossaryTerm() {
  const { term } = useParams<{ term: string }>();
  const data = term ? getTermBySlug(term) : undefined;

  const metaTitle = data
    ? `${data.title} — Bitcoin Glossary — Moneyverse`
    : "Term Not Found — Moneyverse";
  const metaDesc = data
    ? data.shortDefinition
    : "This glossary term could not be found.";

  const jsonLd = data
    ? {
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        "name": data.title,
        "description": data.shortDefinition,
        "inDefinedTermSet": {
          "@type": "DefinedTermSet",
          "name": "Moneyverse Bitcoin Glossary",
          "url": "https://moneyverse.network/learn/bitcoin-halving",
        },
      }
    : undefined;

  usePageMeta(metaTitle, metaDesc, jsonLd);

  if (!data) {
    return (
      <Layout>
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center" data-testid="term-not-found">
          <p className="text-xs font-bold tracking-widest text-muted-foreground mb-4">GLOSSARY</p>
          <h1 className="font-serif font-black text-4xl mb-6">Term Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The term "{term}" doesn't exist in our glossary yet.
          </p>
          <Link href="/learn/bitcoin-halving" data-testid="link-glossary-back">
            <span className="text-xs font-bold tracking-widest underline underline-offset-4 hover:text-accent transition-colors cursor-pointer">
              ← BROWSE GLOSSARY
            </span>
          </Link>
        </section>
      </Layout>
    );
  }

  const relatedTerms = data.relatedTerms
    .map((slug) => GLOSSARY_TERMS.find((t) => t.slug === slug))
    .filter(Boolean);

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="border-b border-border" data-testid="glossary-breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3 text-xs text-muted-foreground">
          <Link href="/">
            <span className="hover:text-foreground transition-colors cursor-pointer">Home</span>
          </Link>
          <span>/</span>
          <span>Glossary</span>
          <span>/</span>
          <span className="text-foreground">{data.title}</span>
        </div>
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" data-testid="glossary-article">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main content */}
          <div className="lg:col-span-2">
            <p className="text-xs font-bold tracking-widest text-muted-foreground mb-4">BITCOIN GLOSSARY</p>
            <h1 className="font-serif font-black text-4xl sm:text-5xl mb-6" data-testid="glossary-title">
              {data.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed border-l-4 border-accent pl-6">
              {data.shortDefinition}
            </p>

            <div className="prose prose-base max-w-none" data-testid="glossary-definition">
              {data.definition.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-base text-foreground/80 leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* CTA box */}
            <div className="border border-border p-8 mb-8" data-testid="glossary-cta-box">
              <p className="text-xs font-bold tracking-widest text-muted-foreground mb-4">READY TO GO DEEPER?</p>
              <h3 className="font-serif font-bold text-xl mb-4">Learn the full protocol.</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                16 modules. 85 lessons. One framework built around the halving cycle.
              </p>
              <Link href="/masterclass" data-testid="link-glossary-masterclass">
                <span className="block text-center cursor-pointer bg-foreground text-background text-xs font-bold tracking-widest px-6 py-4 hover:bg-accent hover:text-black transition-colors">
                  GET THE BLUEPRINT — $197 →
                </span>
              </Link>
            </div>

            {/* Related terms */}
            {relatedTerms.length > 0 && (
              <div data-testid="glossary-related">
                <p className="text-xs font-bold tracking-widest text-muted-foreground mb-4">RELATED TERMS</p>
                <div className="space-y-2">
                  {relatedTerms.map((related) => related && (
                    <Link key={related.slug} href={`/learn/${related.slug}`} data-testid={`link-related-${related.slug}`}>
                      <div className="border border-border p-4 hover:border-foreground transition-colors cursor-pointer">
                        <div className="font-medium text-sm mb-1">{related.title}</div>
                        <div className="text-xs text-muted-foreground">{related.shortDefinition}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* All terms */}
      <section className="border-t border-border bg-muted py-16 px-4 sm:px-6 lg:px-8" data-testid="all-glossary-terms">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-muted-foreground mb-8">ALL TERMS</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {GLOSSARY_TERMS.map((t) => (
              <Link key={t.slug} href={`/learn/${t.slug}`} data-testid={`link-all-term-${t.slug}`}>
                <div className={`border p-3 text-xs font-medium cursor-pointer transition-colors ${t.slug === term ? "border-foreground bg-foreground text-background" : "border-border bg-background hover:border-foreground"}`}>
                  {t.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
