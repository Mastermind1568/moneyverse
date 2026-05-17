import { useEffect } from "react";

export function usePageMeta(
  title: string,
  description: string,
  jsonLd?: object,
) {
  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        const [attrName, attrValue] = attr.split("=");
        el.setAttribute(attrName.trim(), attrValue?.replace(/"/g, "") ?? attr);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    setMeta('meta[name="description"]', 'name="description"', description);
    setMeta('meta[property="og:title"]', 'property="og:title"', title);
    setMeta('meta[property="og:description"]', 'property="og:description"', description);
    setMeta('meta[property="og:type"]', 'property="og:type"', "website");

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `https://moneyverse.network${window.location.pathname}`);

    const SCRIPT_ID = "structured-data-jsonld";
    let script = document.getElementById(SCRIPT_ID);
    if (jsonLd) {
      if (!script) {
        script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        script.id = SCRIPT_ID;
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else if (script) {
      script.remove();
    }
  }, [title, description, jsonLd]);
}
