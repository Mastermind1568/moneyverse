import { Router, type IRouter } from "express";
import { GLOSSARY_TERMS } from "../../../moneyverse/src/data/glossary";
import { GUIDES } from "../../../moneyverse/src/data/guides";
import { COMPARISONS } from "../../../moneyverse/src/data/comparisons";

const router: IRouter = Router();

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
  <meta name="description" content="${description.replace(/"/g, "&quot;").replace(/\n/g, " ")}" />
  <meta property="og:title" content="${title.replace(/"/g, "&quot;")}" />
  <meta property="og:description" content="${description.replace(/"/g, "&quot;").replace(/\n/g, " ")}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonicalUrl}" />
  <link rel="canonical" href="${canonicalUrl}" />
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  <style>
    *{box-sizing:border-box}
    body{font-family:Georgia,serif;max-width:860px;margin:0 auto;padding:2rem 1.5rem;color:#111;background:#fff;line-height:1.6}
    h1{font-size:2.25rem;font-weight:900;line-height:1.1;margin:0 0 1rem}
    h2{font-size:1.2rem;font-weight:700;margin:2rem 0 .5rem}
    p{margin:0 0 1rem;color:#333}
    a{color:#F7931A;text-decoration:none}
    a:hover{text-decoration:underline}
    nav{margin-bottom:2rem;font-size:.875rem;color:#666}
    nav a{color:#111}
    .badge{display:inline-block;border:1px solid #111;padding:.2rem .5rem;font-size:.75rem;margin-bottom:1rem;font-family:monospace}
    .quote{border-left:4px solid #F7931A;padding:.5rem 1rem;margin:1.5rem 0;color:#444}
    ol{padding-left:1.5rem}
    ol li{margin-bottom:.75rem}
    ul{padding-left:1.5rem}
    ul li{margin-bottom:.5rem}
    .related{margin-top:2.5rem;padding:1.5rem;border:1px solid #ddd;background:#fafafa}
    .cta{display:inline-block;background:#000;color:#fff;padding:.75rem 1.5rem;font-weight:bold;text-decoration:none;margin-top:1rem}
    .cta:hover{background:#F7931A;color:#000}
    .term-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:.5rem;margin-top:1rem}
    .term-link{border:1px solid #ddd;padding:.4rem .75rem;font-size:.85rem;color:#111;display:block}
    .term-link:hover{border-color:#F7931A;text-decoration:none}
  </style>
</head>
<body>
  <nav>
    <a href="/">MONEYVERSE</a>
    ${bodyContent.includes("BITCOIN GLOSSARY") ? ' / <a href="/learn/bitcoin-halving">Glossary</a>' : bodyContent.includes("HOW-TO GUIDE") ? ' / <a href="/research">Guides</a>' : ' / <a href="/research">Compare</a>'}
  </nav>
  ${bodyContent}
  <div class="related">
    <strong>Learn Bitcoin the right way — structured curriculum for serious operators.</strong><br/>
    <a href="/masterclass" class="cta">GET THE BLUEPRINT — $197 →</a>
    <p style="margin-top:1rem;font-size:.85rem;color:#666">One-time payment. Lifetime access. 85 lessons. 11 modules. Bitcoin-only.</p>
    <p style="font-size:.85rem"><a href="/learn/bitcoin-halving">Glossary</a> · <a href="/guides/how-to-set-up-a-hardware-wallet">Guides</a> · <a href="/compare/ledger-vs-trezor">Comparisons</a> · <a href="/tools">Tools</a></p>
  </div>
</body>
</html>`;
}

// ─── Glossary SSR ─────────────────────────────────────────────────────────────

router.get("/learn/:term", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.term) ? req.params.term[0] : req.params.term;
  const termSlug = raw.toLowerCase().replace(/[^a-z0-9-]/g, "");

  const data = GLOSSARY_TERMS.find((t) => t.slug === termSlug);

  if (!data) {
    res.status(404).send(htmlShell({
      title: "Term Not Found — Moneyverse Glossary",
      description: "This glossary term could not be found. Browse all Bitcoin terms at Moneyverse.",
      canonicalUrl: `https://moneyverse.network/learn/${termSlug}`,
      jsonLd: {},
      bodyContent: `<div class="badge">BITCOIN GLOSSARY</div><h1>Term Not Found</h1><p>The term "${termSlug.replace(/-/g, " ")}" doesn't exist in our glossary yet.</p><p><a href="/learn/bitcoin-halving">← Browse Glossary</a></p>`,
    }));
    return;
  }

  const relatedTerms = (data.relatedTerms ?? [])
    .map((slug: string) => GLOSSARY_TERMS.find((t) => t.slug === slug))
    .filter(Boolean) as typeof GLOSSARY_TERMS;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": data.title,
    "description": data.shortDefinition,
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "name": "Moneyverse Bitcoin Glossary",
      "url": "https://moneyverse.network/learn/bitcoin-halving",
    },
  };

  const relatedHtml = relatedTerms.length > 0
    ? `<h2>Related Terms</h2><ul>${relatedTerms.map((t) => `<li><a href="/learn/${t!.slug}">${t!.title}</a> — ${t!.shortDefinition}</li>`).join("")}</ul>`
    : "";

  const allTermsHtml = `<h2>Browse All Terms</h2><div class="term-grid">${GLOSSARY_TERMS.map((t) => `<a class="term-link" href="/learn/${t.slug}">${t.title}</a>`).join("")}</div>`;

  const bodyContent = `
    <div class="badge">BITCOIN GLOSSARY</div>
    <h1>${data.title}</h1>
    <div class="quote">${data.shortDefinition}</div>
    ${data.definition.split(/\n\n+/).map((p: string) => `<p>${p.trim()}</p>`).join("")}
    ${relatedHtml}
    ${allTermsHtml}
  `;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(htmlShell({
    title: `${data.title} — Bitcoin Glossary — Moneyverse`,
    description: data.shortDefinition,
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
      description: "This guide could not be found. Browse all Bitcoin guides at Moneyverse.",
      canonicalUrl: `https://moneyverse.network/guides/${slug}`,
      jsonLd: {},
      bodyContent: `<div class="badge">HOW-TO GUIDE</div><h1>Guide Not Found</h1><p>The guide "${slug.replace(/-/g, " ")}" doesn't exist yet.</p><p><a href="/research">← Browse Guides</a></p>`,
    }));
    return;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": guide.title,
    "description": guide.intro,
    "totalTime": `PT${guide.estimatedTime.replace(/ minutes?/, "M").replace(/ hours?/, "H")}`,
    "step": guide.steps.map((step: { title: string; content: string }, i: number) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": step.title,
      "text": step.content,
    })),
  };

  const stepsHtml = guide.steps.map((step: { title: string; content: string }, i: number) => `
    <h2>${i + 1}. ${step.title}</h2>
    <p>${step.content}</p>
  `).join("");

  const relatedGuides = (guide.relatedSlugs ?? [])
    .map((s: string) => GUIDES.find((g) => g.slug === s))
    .filter(Boolean);

  const relatedHtml = relatedGuides.length > 0
    ? `<h2>Related Guides</h2><ul>${relatedGuides.map((g) => `<li><a href="/guides/${g!.slug}">${g!.title}</a></li>`).join("")}</ul>`
    : "";

  const allGuidesHtml = `<h2>All Guides</h2><ul>${GUIDES.map((g) => `<li><a href="/guides/${g.slug}">${g.title}</a></li>`).join("")}</ul>`;

  const bodyContent = `
    <div class="badge">HOW-TO GUIDE</div>
    <div class="badge" style="margin-left:.5rem">${guide.difficulty} · ${guide.estimatedTime}</div>
    <h1>${guide.title}</h1>
    <p>${guide.intro}</p>
    <h2>Steps</h2>
    <ol>${guide.steps.map((s: { title: string; content: string }) => `<li><strong>${s.title}</strong> — ${s.content}</li>`).join("")}</ol>
    ${stepsHtml}
    ${relatedHtml}
    ${allGuidesHtml}
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
      description: "This comparison could not be found. Browse all Bitcoin comparisons at Moneyverse.",
      canonicalUrl: `https://moneyverse.network/compare/${slug}`,
      jsonLd: {},
      bodyContent: `<div class="badge">COMPARISON</div><h1>Comparison Not Found</h1><p>The comparison "${slug.replace(/-/g, " ")}" doesn't exist yet.</p><p><a href="/research">← Browse Research</a></p>`,
    }));
    return;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": comparison.title,
    "description": comparison.intro.split("\n\n")[0],
    "author": { "@type": "Organization", "name": "Moneyverse" },
    "publisher": { "@type": "Organization", "name": "Moneyverse", "url": "https://moneyverse.network" },
  };

  const pointsHtml = comparison.points.map((pt) => `
    <h2>${pt.category}</h2>
    <p><strong>${comparison.aName}:</strong> ${pt.a}</p>
    <p><strong>${comparison.bName}:</strong> ${pt.b}</p>
    ${pt.winner && pt.winner !== "tie" ? `<p><em>Edge: ${pt.winner === "a" ? comparison.aName : comparison.bName}</em></p>` : "<p><em>Edge: Tie</em></p>"}
  `).join("");

  const allComparisonsHtml = `<h2>All Comparisons</h2><ul>${COMPARISONS.map((c) => `<li><a href="/compare/${c.slug}">${c.aName} vs ${c.bName}</a></li>`).join("")}</ul>`;

  const bodyContent = `
    <div class="badge">COMPARISON</div>
    <h1>${comparison.title}</h1>
    ${comparison.intro.split("\n\n").map((p: string) => `<p>${p.trim()}</p>`).join("")}
    <div class="quote"><strong>Verdict:</strong> ${comparison.verdict}</div>
    ${pointsHtml}
    ${allComparisonsHtml}
  `;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(htmlShell({
    title: `${comparison.title} — Moneyverse`,
    description: comparison.intro.split("\n\n")[0],
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

  const urlEntries = allUrls.map((path) =>
    `  <url>
    <loc>${BASE}${path}</loc>
    <changefreq>${path === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${path === "/" ? "1.0" : path === "/masterclass" ? "0.9" : "0.7"}</priority>
  </url>`
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.send(xml);
});

export default router;
