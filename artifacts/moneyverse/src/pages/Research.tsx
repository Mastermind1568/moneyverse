import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { usePageMeta } from "@/hooks/usePageMeta";
import { RESEARCH_ARTICLES, THEME_LABELS, QUARTER_LABELS } from "@/data/research";

export default function Research() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  usePageMeta(
    "Bitcoin Research & Analysis — Moneyverse",
    "Deep-dive articles on Bitcoin, fiat debasement, self-custody, and strategic exit planning. The signal without the noise."
  );

  const filters = [
    { key: "all", label: "ALL" },
    { key: "fiat", label: "FIAT & MACRO" },
    { key: "protocol", label: "PROTOCOL" },
    { key: "custody", label: "CUSTODY" },
    { key: "strategy", label: "STRATEGY" },
  ];

  const filtered = activeFilter === "all"
    ? RESEARCH_ARTICLES
    : RESEARCH_ARTICLES.filter((a) => a.theme === activeFilter);

  const quarters = ["Q1", "Q2", "Q3", "Q4"] as const;

  return (
    <Layout>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12" data-testid="research-hero">
        <p className="text-xs font-bold tracking-widest text-muted-foreground mb-6">RESEARCH</p>
        <h1 className="font-serif font-black text-5xl sm:text-6xl leading-[0.9] mb-6">
          High Signal.<br />
          <span className="text-accent">Zero Noise.</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Original research and analysis on Bitcoin, monetary policy, self-custody, and strategic exits. Updated quarterly.
        </p>
      </section>

      {/* Filters */}
      <section className="border-y border-border" data-testid="research-filters">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`flex-shrink-0 px-6 py-4 text-xs font-bold tracking-widest border-b-2 transition-colors ${
                  activeFilter === f.key
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`filter-${f.key}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles by quarter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" data-testid="research-articles">
        {activeFilter === "all" ? (
          <div className="space-y-16">
            {quarters.map((q) => {
              const articles = RESEARCH_ARTICLES.filter((a) => a.quarter === q);
              if (articles.length === 0) return null;
              return (
                <div key={q} data-testid={`quarter-${q}`}>
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="font-serif font-bold text-2xl">{QUARTER_LABELS[q]}</h2>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
                    {articles.map((article) => (
                      <ArticleCard key={article.slug} article={article} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {filtered.length === 0 ? (
              <div className="col-span-2 py-16 text-center text-muted-foreground bg-background">
                No articles in this category yet.
              </div>
            ) : (
              filtered.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))
            )}
          </div>
        )}
      </section>

      {/* Glossary CTA */}
      <section className="border-t border-border py-16 px-8 bg-muted" data-testid="research-glossary-cta">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold tracking-widest text-muted-foreground mb-2">BITCOIN GLOSSARY</p>
            <h3 className="font-serif font-bold text-2xl">20+ terms defined properly.</h3>
          </div>
          <Link href="/learn/bitcoin-halving" data-testid="link-research-glossary">
            <span className="text-xs font-bold tracking-widest underline underline-offset-4 hover:text-accent transition-colors cursor-pointer whitespace-nowrap">
              EXPLORE GLOSSARY →
            </span>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

function ArticleCard({ article }: { article: typeof RESEARCH_ARTICLES[0] }) {
  return (
    <div
      className="bg-background p-8 flex flex-col gap-4 hover:bg-muted transition-colors group"
      data-testid={`article-card-${article.slug}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-xs border border-border px-2 py-0.5 font-medium">
          {THEME_LABELS[article.theme]}
        </span>
        <span className="text-xs text-muted-foreground">{article.readingTime}</span>
        <span className="text-xs text-muted-foreground">{article.quarter}</span>
      </div>
      <h3 className="font-serif font-bold text-xl leading-tight group-hover:text-accent transition-colors">
        {article.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
        {article.teaser}
      </p>
      <div className="text-xs font-bold tracking-widest text-muted-foreground group-hover:text-accent transition-colors">
        READ ARTICLE →
      </div>
    </div>
  );
}
