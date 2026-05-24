import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import Layout from "@/components/Layout";

const MODULES = [
  { num: "01", slug: "fiat-trap", title: "The Fiat Illusion", lessons: 6, duration: "47 min" },
  { num: "02", slug: "bitcoin-fundamentals", title: "The 21 Million Standard", lessons: 7, duration: "52 min" },
  { num: "03", slug: "four-year-clock", title: "The 4-Year Clock", lessons: 9, duration: "1h 12m" },
  { num: "04", slug: "self-custody", title: "Cold Storage Protocol", lessons: 11, duration: "1h 24m" },
  { num: "05", slug: "dca-protocol", title: "The Accumulation Engine", lessons: 8, duration: "58 min" },
  { num: "06", slug: "exit-architecture", title: "The Exit Architecture", lessons: 8, duration: "1h 4m" },
  { num: "07", slug: "african-sovereignty", title: "The Third Liberation", lessons: 8, duration: "1h 2m" },
  { num: "08", slug: "p2p-remittance", title: "P2P Trading & Spot Execution", lessons: 7, duration: "1h 12m" },
  { num: "09", slug: "affiliate-engine", title: "Your Country, Your Stack", lessons: 8, duration: "1h 20m" },
  { num: "10", slug: "activation-sequence", title: "The Mindset Protocol", lessons: 7, duration: "1h 6m" },
  { num: "11", slug: "community-protocol", title: "Bitcoin After You", lessons: 6, duration: "57 min" },
];

const TOTAL_LESSONS = MODULES.reduce((s, m) => s + m.lessons, 0);
const API_BASE = import.meta.env.VITE_API_BASE || "https://moneyverse.network";

function getProgress(): Record<string, boolean[]> {
  try { return JSON.parse(localStorage.getItem("mv_progress") || "{}"); }
  catch { return {}; }
}
function saveProgress(p: Record<string, boolean[]>) {
  localStorage.setItem("mv_progress", JSON.stringify(p));
}

// ── Partner Tab ───────────────────────────────────────────────────────────────

interface PartnerData {
  creatorId: string | null;
  links: { id: string; label: string; slug: string; url: string; clicks: number; conversions: number; revenue: number }[];
  totalClicks: number;
  totalConversions: number;
  convRate: number;
  revenue30d: number;
  enrolments30d: number;
}

function PartnerTab({ jwt, refCode }: { jwt: string; refCode: string }) {
  const [data, setData] = useState<PartnerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [linkLabel, setLinkLabel] = useState("");
  const [creating, setCreating] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const sb = createClient(
        import.meta.env.VITE_SUPABASE_URL || "https://ceiyqcecfsuvmoqcayqx.supabase.co",
        import.meta.env.VITE_SUPABASE_ANON_KEY || "",
        { global: { headers: { Authorization: `Bearer ${jwt}` } } }
      );

      const { data: { user } } = await sb.auth.getUser(jwt);
      if (!user) { setLoading(false); return; }

      // Get or create creator record
      const { data: profile } = await sb.from("profiles").select("creator_id").eq("id", user.id).single();
      let creatorId = profile?.creator_id ?? null;

      if (!creatorId) {
        // Create creator record
        const { data: newCreator } = await sb.from("creators").insert({ handle: user.id.slice(0, 8) }).select("id").single();
        if (newCreator) {
          creatorId = newCreator.id;
          await sb.from("profiles").update({ creator_id: creatorId }).eq("id", user.id);
        }
      }

      if (!creatorId) { setLoading(false); return; }

      // Fetch links
      const { data: links } = await sb.from("creator_links")
        .select("id, label, slug, clicks, conversions, earnings_usd")
        .eq("creator_id", creatorId)
        .order("created_at", { ascending: false });

      // Fetch 30-day purchase stats
      const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      const { data: purchases } = await sb.from("purchases")
        .select("amount_paid, created_at")
        .eq("creator_id", creatorId)
        .gte("created_at", since)
        .eq("status", "completed");

      const revenue30d = (purchases ?? []).reduce((s, p) => s + (Number(p.amount_paid) * 0.3), 0);
      const enrolments30d = (purchases ?? []).length;
      const totalClicks = (links ?? []).reduce((s, l) => s + l.clicks, 0);
      const totalConversions = (links ?? []).reduce((s, l) => s + l.conversions, 0);
      const convRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

      setData({
        creatorId,
        links: (links ?? []).map((l) => ({
          id: l.id, label: l.label, slug: l.slug,
          url: `https://moneyverse.network/?ref=${refCode}&lnk=${l.slug}`,
          clicks: l.clicks, conversions: l.conversions, revenue: Number(l.earnings_usd),
        })),
        totalClicks, totalConversions, convRate, revenue30d, enrolments30d,
      });
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, [jwt, refCode]);

  useEffect(() => { load(); }, [load]);

  async function createLink() {
    if (!linkLabel.trim() || !data?.creatorId) return;
    setCreating(true);
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const sb = createClient(
        import.meta.env.VITE_SUPABASE_URL || "https://ceiyqcecfsuvmoqcayqx.supabase.co",
        import.meta.env.VITE_SUPABASE_ANON_KEY || "",
        { global: { headers: { Authorization: `Bearer ${jwt}` } } }
      );
      const slug = `${linkLabel.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Math.random().toString(36).slice(2, 6)}`;
      await sb.from("creator_links").insert({ creator_id: data.creatorId, label: linkLabel.trim(), slug });
      setLinkLabel("");
      await load();
    } catch (e) { console.error(e); }
    setCreating(false);
  }

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  const simpleLink = `https://moneyverse.network/?ref=${refCode}`;

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", border: "2px solid var(--mv-black)", marginBottom: 32 }} className="partner-stats-grid">
        {[
          { label: "30-Day Commission", value: data ? `$${data.revenue30d.toFixed(2)}` : "—" },
          { label: "Enrolments (30d)", value: data?.enrolments30d ?? "—" },
          { label: "Total Clicks", value: data?.totalClicks ?? "—" },
          { label: "Conversion Rate", value: data ? `${data.convRate.toFixed(1)}%` : "—" },
        ].map((s, i) => (
          <div key={i} style={{ padding: "24px 20px", borderRight: i < 3 ? "1px solid var(--mv-n200)" : "none", textAlign: "center" as const }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 28, color: "var(--mv-accent)" }}>{s.value}</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n600)", letterSpacing: "0.1em", marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ border: "2px solid var(--mv-black)", padding: 32, marginBottom: 32, background: "var(--mv-n50)" }}>
        <p className="overline" style={{ marginBottom: 12 }}>Your Default Affiliate Link</p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--mv-n600)", marginBottom: 20, lineHeight: 1.6 }}>
          Share this link — 30% commission on every enrolment. 4 sales at T2 = your full course fee back.
        </p>
        <div style={{ display: "flex", gap: 0, marginBottom: 8 }}>
          <div style={{ flex: 1, fontFamily: "'Space Mono', monospace", fontSize: 10, padding: "12px 14px", border: "2px solid var(--mv-black)", borderRight: "none", background: "#fff", color: "var(--mv-n600)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>
            {simpleLink}
          </div>
          <button onClick={() => copy(simpleLink, "simple")} style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", padding: "0 18px", background: copied === "simple" ? "var(--mv-accent)" : "var(--mv-black)", color: copied === "simple" ? "#000" : "#fff", border: "2px solid var(--mv-black)", cursor: "pointer", whiteSpace: "nowrap" as const }}>
            {copied === "simple" ? "COPIED ✓" : "COPY"}
          </button>
        </div>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n600)", letterSpacing: "0.1em" }}>
          REF CODE: {refCode} · 30% commission · No cap · Paid 1st of each month
        </p>
      </div>

      <div style={{ border: "2px solid var(--mv-black)", padding: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24, flexWrap: "wrap" as const, gap: 16 }}>
          <div>
            <p className="overline" style={{ marginBottom: 8 }}>Tracked Campaign Links</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--mv-n600)" }}>Create labelled links to track which platform drives conversions.</p>
          </div>
          <div style={{ display: "flex", gap: 0 }}>
            <input value={linkLabel} onChange={(e) => setLinkLabel(e.target.value)} onKeyDown={(e) => e.key === "Enter" && createLink()} placeholder="e.g. Instagram · Twitter · WhatsApp" style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, padding: "10px 14px", border: "2px solid var(--mv-black)", borderRight: "none", outline: "none", width: 240 }} />
            <button onClick={createLink} disabled={creating} style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", padding: "0 18px", background: "var(--mv-black)", color: "#fff", border: "2px solid var(--mv-black)", cursor: "pointer", opacity: creating ? 0.6 : 1, whiteSpace: "nowrap" as const }}>
              {creating ? "..." : "+ CREATE"}
            </button>
          </div>
        </div>
        {loading ? (
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "var(--mv-n600)" }}>Loading...</p>
        ) : !data?.links?.length ? (
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--mv-n600)" }}>No tracked links yet. Create your first one above.</p>
        ) : (
          <div style={{ borderTop: "1px solid var(--mv-n200)" }}>
            {data.links.map((link) => (
              <div key={link.id} style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto auto", gap: 20, padding: "16px 0", borderBottom: "1px solid var(--mv-n200)", alignItems: "center" }} className="link-row">
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{link.label}</p>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n600)" }}>{link.url}</p>
                </div>
                <div style={{ textAlign: "center" as const }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 20 }}>{link.clicks}</p>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: "var(--mv-n600)", letterSpacing: "0.1em" }}>CLICKS</p>
                </div>
                <div style={{ textAlign: "center" as const }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 20 }}>{link.conversions}</p>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: "var(--mv-n600)", letterSpacing: "0.1em" }}>SALES</p>
                </div>
                <div style={{ textAlign: "center" as const }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 20, color: "var(--mv-accent)" }}>${link.revenue.toFixed(0)}</p>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: "var(--mv-n600)", letterSpacing: "0.1em" }}>EARNED</p>
                </div>
                <button onClick={() => copy(link.url, link.id)} style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, fontWeight: 700, letterSpacing: "0.1em", padding: "8px 14px", background: copied === link.id ? "var(--mv-accent)" : "transparent", color: copied === link.id ? "#000" : "var(--mv-black)", border: "1px solid var(--mv-black)", cursor: "pointer", whiteSpace: "nowrap" as const }}>
                  {copied === link.id ? "✓" : "COPY"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Admin Tab ─────────────────────────────────────────────────────────────────

interface Affiliate {
  creator_id: string;
  handle: string;
  email: string | null;
  total_sales: number;
  total_gmv: number;
  commission_owed: number;
  commission_paid: number;
  purchases: { id: string; amount_paid: number; commission: number; commission_paid: boolean; commission_paid_at: string | null; created_at: string; gateway: string }[];
}

function AdminTab({ jwt }: { jwt: string }) {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [paying, setPaying] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const sb = createClient(
        import.meta.env.VITE_SUPABASE_URL || "https://ceiyqcecfsuvmoqcayqx.supabase.co",
        import.meta.env.VITE_SUPABASE_ANON_KEY || "",
        { global: { headers: { Authorization: `Bearer ${jwt}` } } }
      );

      const { data: purchases } = await sb
        .from("purchases")
        .select("id, creator_id, amount_paid, gateway, commission_paid, commission_paid_at, created_at, profiles(email), creators(handle)")
        .eq("status", "completed")
        .not("creator_id", "is", null)
        .order("created_at", { ascending: false });

      // Group by creator
      const map: Record<string, Affiliate> = {};
      for (const p of (purchases ?? [])) {
        const cid = p.creator_id as string;
        if (!map[cid]) {
          map[cid] = {
            creator_id: cid,
            handle: (p.creators as any)?.handle ?? cid.slice(0, 8),
            email: (p.profiles as any)?.email ?? null,
            total_sales: 0, total_gmv: 0, commission_owed: 0, commission_paid: 0, purchases: [],
          };
        }
        const commission = Number(p.amount_paid) * 0.3;
        map[cid].total_sales++;
        map[cid].total_gmv += Number(p.amount_paid);
        if (p.commission_paid) { map[cid].commission_paid += commission; }
        else { map[cid].commission_owed += commission; }
        map[cid].purchases.push({ id: p.id, amount_paid: Number(p.amount_paid), commission, commission_paid: p.commission_paid, commission_paid_at: p.commission_paid_at, created_at: p.created_at, gateway: p.gateway });
      }
      setAffiliates(Object.values(map));
    } catch (e) { console.error(e); }
    setLoading(false);
  }, [jwt]);

  useEffect(() => { load(); }, [load]);

  async function markPaid(affiliate: Affiliate) {
    const unpaidIds = affiliate.purchases.filter((p) => !p.commission_paid).map((p) => p.id);
    if (!unpaidIds.length) return;
    setPaying(affiliate.creator_id);
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const sb = createClient(
        import.meta.env.VITE_SUPABASE_URL || "https://ceiyqcecfsuvmoqcayqx.supabase.co",
        import.meta.env.VITE_SUPABASE_ANON_KEY || "",
        { global: { headers: { Authorization: `Bearer ${jwt}` } } }
      );
      await sb.from("purchases")
        .update({ commission_paid: true, commission_paid_at: new Date().toISOString() })
        .in("id", unpaidIds);
      await load();
    } catch (e) { console.error(e); }
    setPaying(null);
  }

  const totalOwed = affiliates.reduce((s, a) => s + a.commission_owed, 0);

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: "2px solid var(--mv-black)", marginBottom: 32 }} className="admin-stats-grid">
        {[
          { label: "Active Affiliates", value: affiliates.length },
          { label: "Commission Owed", value: `$${totalOwed.toFixed(2)}` },
          { label: "Total Affiliate Sales", value: affiliates.reduce((s, a) => s + a.total_sales, 0) },
        ].map((s, i) => (
          <div key={i} style={{ padding: "24px 20px", borderRight: i < 2 ? "1px solid var(--mv-n200)" : "none", textAlign: "center" as const }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 28, color: "var(--mv-accent)" }}>{s.value}</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n600)", letterSpacing: "0.1em", marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>
      {loading ? (
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "var(--mv-n600)" }}>Loading...</p>
      ) : !affiliates.length ? (
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n600)" }}>No affiliate sales recorded yet.</p>
      ) : (
        <div style={{ border: "2px solid var(--mv-black)" }}>
          {affiliates.map((a, idx) => (
            <div key={a.creator_id} style={{ borderBottom: idx < affiliates.length - 1 ? "1px solid var(--mv-n200)" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "20px 28px", flexWrap: "wrap" as const }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{a.handle}</p>
                  {a.email && <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n600)" }}>{a.email}</p>}
                </div>
                <div style={{ textAlign: "center" as const, minWidth: 60 }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 22 }}>{a.total_sales}</p>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: "var(--mv-n600)", letterSpacing: "0.1em" }}>SALES</p>
                </div>
                <div style={{ textAlign: "center" as const, minWidth: 80 }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 22, color: a.commission_owed > 0 ? "var(--mv-accent)" : "var(--mv-n400)" }}>${a.commission_owed.toFixed(2)}</p>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: "var(--mv-n600)", letterSpacing: "0.1em" }}>OWED</p>
                </div>
                <div style={{ textAlign: "center" as const, minWidth: 80 }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 22, color: "var(--mv-n400)" }}>${a.commission_paid.toFixed(2)}</p>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: "var(--mv-n600)", letterSpacing: "0.1em" }}>PAID</p>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => setExpanded(expanded === a.creator_id ? null : a.creator_id)} style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: "0.1em", padding: "8px 14px", background: "transparent", color: "var(--mv-black)", border: "1px solid var(--mv-n200)", cursor: "pointer" }}>
                    {expanded === a.creator_id ? "HIDE" : "DETAILS"}
                  </button>
                  {a.commission_owed > 0 && (
                    <button onClick={() => markPaid(a)} disabled={paying === a.creator_id} style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, fontWeight: 700, letterSpacing: "0.1em", padding: "8px 14px", background: "var(--mv-accent)", color: "#000", border: "none", cursor: "pointer", opacity: paying === a.creator_id ? 0.6 : 1, whiteSpace: "nowrap" as const }}>
                      {paying === a.creator_id ? "..." : "MARK PAID"}
                    </button>
                  )}
                </div>
              </div>
              {expanded === a.creator_id && (
                <div style={{ padding: "0 28px 20px 28px", background: "var(--mv-n50)" }}>
                  {a.purchases.map((p) => (
                    <div key={p.id} style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: 16, padding: "8px 0", borderBottom: "1px solid var(--mv-n200)" }}>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9 }}>{new Date(p.created_at).toLocaleDateString("en-GB")}</span>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9 }}>${p.amount_paid}</span>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-accent)" }}>${p.commission.toFixed(2)}</span>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: p.commission_paid ? "var(--mv-n400)" : "var(--mv-black)" }}>
                        {p.commission_paid ? `PAID ${new Date(p.commission_paid_at!).toLocaleDateString("en-GB")}` : "UNPAID"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────

export default function Dashboard() {
  const { user, signOut, loading } = useAuth();
  const [, navigate] = useLocation();
  const [progress, setProgress] = useState<Record<string, boolean[]>>(getProgress);
  const [tier, setTier] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [jwt, setJwt] = useState<string>("");
  const [tab, setTab] = useState<"courses" | "partner" | "admin">("courses");

  useEffect(() => {
    if (!loading && !user) { navigate("/login"); return; }
    if (!user || !supabase) return;

    supabase
      .from("profiles")
      .select("tier, is_admin")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        const t = (data as any)?.tier ?? 0;
        setTier(t);
        setIsAdmin(!!(data as any)?.is_admin);
        if (t === 0) navigate("/pricing");
      });

    supabase.auth.getSession().then(({ data }) => {
      setJwt(data.session?.access_token ?? "");
    });
  }, [user, loading, navigate]);

  if (loading || !user || tier === null) {
    return (
      <Layout>
        <section style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "var(--mv-n600)" }}>Loading...</p>
        </section>
      </Layout>
    );
  }

  const displayName = (user.user_metadata?.full_name as string) || user.email?.split("@")[0] || "Student";
  const referralCode = user.id.substring(0, 8).toUpperCase();
  const completedLessons = Object.values(progress).flat().filter(Boolean).length;
  const pct = Math.round((completedLessons / TOTAL_LESSONS) * 100);

  function toggleLesson(slug: string, idx: number) {
    setProgress((prev) => {
      const mod = [...(prev[slug] || Array(MODULES.find((m) => m.slug === slug)!.lessons).fill(false))];
      mod[idx] = !mod[idx];
      const next = { ...prev, [slug]: mod };
      saveProgress(next);
      return next;
    });
  }

  const lastModule = MODULES.find((m) => (progress[m.slug] || []).some(Boolean));
  const TAB_ITEMS = [
    { key: "courses", label: "COURSES" },
    { key: "partner", label: "PARTNER" },
    ...(isAdmin ? [{ key: "admin", label: "ADMIN" }] : []),
  ] as const;

  return (
    <Layout>
      {/* ── Header ── */}
      <section style={{ background: "var(--mv-black)", padding: "48px 64px", borderBottom: "2px solid #222" }} className="section-pad-responsive">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, flexWrap: "wrap" as const }}>
          <div>
            <p className="overline" style={{ color: "var(--mv-accent)", marginBottom: 12 }}>Student Dashboard</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#fff", lineHeight: 1, marginBottom: 8 }}>
              Welcome back,<br /><em style={{ color: "var(--mv-accent)" }}>{displayName}.</em>
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n600)" }}>{user.email}</p>
          </div>
          <button onClick={signOut} style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.12em", background: "transparent", border: "1px solid #333", color: "var(--mv-n600)", padding: "10px 20px", cursor: "pointer" }}>
            SIGN OUT
          </button>
        </div>
        <div style={{ marginTop: 40, maxWidth: 600 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "var(--mv-n600)", letterSpacing: "0.1em" }}>OVERALL PROGRESS</span>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "var(--mv-accent)", letterSpacing: "0.1em" }}>{completedLessons} / {TOTAL_LESSONS} LESSONS · {pct}%</span>
          </div>
          <div style={{ height: 3, background: "#222", width: "100%" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: "var(--mv-accent)", transition: "width 0.4s ease" }} />
          </div>
        </div>
      </section>

      {/* ── Tab bar ── */}
      <section style={{ background: "#fff", borderBottom: "2px solid var(--mv-black)" }}>
        <div style={{ display: "flex", padding: "0 64px" }} className="tab-bar-pad">
          {TAB_ITEMS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key as typeof tab)} style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.12em", padding: "20px 28px", background: "transparent", border: "none", borderBottom: tab === t.key ? "3px solid var(--mv-accent)" : "3px solid transparent", color: tab === t.key ? "var(--mv-black)" : "var(--mv-n600)", cursor: "pointer", transition: "all 0.15s" }}>
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Courses tab ── */}
      {tab === "courses" && (
        <>
          <section style={{ background: "#fff", padding: "48px 64px", borderBottom: "2px solid var(--mv-black)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="two-col-grid section-pad-responsive">
            <div style={{ border: "2px solid var(--mv-black)", padding: "32px" }}>
              <p className="overline" style={{ marginBottom: 16 }}>{lastModule ? "Continue Where You Left Off" : "Start Here"}</p>
              {lastModule ? (
                <>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 22, marginBottom: 8 }}>Module {lastModule.num}: {lastModule.title}</p>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "var(--mv-n600)", marginBottom: 20, letterSpacing: "0.1em" }}>{(progress[lastModule.slug] || []).filter(Boolean).length} / {lastModule.lessons} LESSONS DONE</p>
                  <Link href={`/preview/${lastModule.slug}`}><span className="btn orange sm">Continue →</span></Link>
                </>
              ) : (
                <>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 22, marginBottom: 8 }}>Module 01: The Fiat Illusion</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n600)", marginBottom: 20, lineHeight: 1.6 }}>Start with the foundation — why your savings are losing value by design.</p>
                  <Link href="/preview/fiat-trap"><span className="btn orange sm">Begin Module 01 →</span></Link>
                </>
              )}
            </div>
            <div style={{ border: "2px solid var(--mv-black)", padding: "32px", background: "var(--mv-n50)" }}>
              <p className="overline" style={{ marginBottom: 12 }}>Quick Start</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--mv-n600)", marginBottom: 16, lineHeight: 1.6 }}>
                Switch to the <strong>Partner tab</strong> to get your affiliate link, create tracked campaign links, and see your earnings in real time.
              </p>
              <button onClick={() => setTab("partner")} className="btn orange sm">View Partner Dashboard →</button>
            </div>
          </section>

          <section style={{ background: "#fff", padding: "64px 64px", borderBottom: "2px solid var(--mv-black)" }} className="section-pad-responsive">
            <span className="accent-rule" style={{ marginBottom: 20 }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(1.5rem, 4vw, 2.5rem)", marginBottom: 40 }}>The Blueprint — 11 Modules</h2>
            <div style={{ border: "2px solid var(--mv-black)" }}>
              {MODULES.map((mod, modIdx) => {
                const modProgress = progress[mod.slug] || Array(mod.lessons).fill(false);
                const done = modProgress.filter(Boolean).length;
                const modPct = Math.round((done / mod.lessons) * 100);
                const complete = done === mod.lessons;
                return <ModuleRow key={mod.slug} mod={mod} modIdx={modIdx} modProgress={modProgress} done={done} modPct={modPct} complete={complete} onToggle={(i) => toggleLesson(mod.slug, i)} />;
              })}
            </div>
          </section>
        </>
      )}

      {/* ── Partner tab ── */}
      {tab === "partner" && jwt && (
        <section style={{ background: "#fff", padding: "48px 64px" }} className="section-pad-responsive">
          <span className="accent-rule" style={{ marginBottom: 20 }} />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(1.5rem, 4vw, 2.5rem)", marginBottom: 8 }}>Partner Dashboard</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n600)", marginBottom: 40, lineHeight: 1.6 }}>30% commission on every enrolment you refer. Paid on the 1st of each month. No cap.</p>
          <PartnerTab jwt={jwt} refCode={referralCode} />
        </section>
      )}

      {/* ── Admin tab ── */}
      {tab === "admin" && isAdmin && jwt && (
        <section style={{ background: "#fff", padding: "48px 64px" }} className="section-pad-responsive">
          <span className="accent-rule" style={{ marginBottom: 20 }} />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(1.5rem, 4vw, 2.5rem)", marginBottom: 8 }}>Affiliate Payouts</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--mv-n600)", marginBottom: 40, lineHeight: 1.6 }}>All affiliates with outstanding commissions. Mark as paid once transferred.</p>
          <AdminTab jwt={jwt} />
        </section>
      )}

      <style>{`
        .two-col-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 900px) { .two-col-grid { grid-template-columns: 1fr !important; } }
        .section-pad-responsive { padding: 64px; }
        @media (max-width: 768px) { .section-pad-responsive { padding: 40px 20px !important; } }
        .tab-bar-pad { padding: 0 64px; }
        @media (max-width: 768px) { .tab-bar-pad { padding: 0 20px !important; } }
        .partner-stats-grid { grid-template-columns: repeat(4, 1fr); }
        @media (max-width: 900px) { .partner-stats-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        .admin-stats-grid { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 768px) { .admin-stats-grid { grid-template-columns: 1fr !important; } }
        .link-row { grid-template-columns: 1fr auto auto auto auto; }
        @media (max-width: 768px) { .link-row { grid-template-columns: 1fr auto !important; } }
      `}</style>
    </Layout>
  );
}

function ModuleRow({ mod, modIdx, modProgress, done, modPct, complete, onToggle }: {
  mod: typeof MODULES[0]; modIdx: number; modProgress: boolean[]; done: number; modPct: number; complete: boolean; onToggle: (i: number) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: modIdx < MODULES.length - 1 ? "1px solid var(--mv-n200)" : "none" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 20, padding: "20px 28px", background: complete ? "#f0fff4" : "#fff", border: "none", cursor: "pointer", textAlign: "left" as const }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 28, color: complete ? "var(--mv-accent)" : "var(--mv-n200)", lineHeight: 1, minWidth: 48 }}>{mod.num}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" as const }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 16 }}>{mod.title}</span>
            {complete && <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, background: "var(--mv-accent)", color: "#000", padding: "2px 8px", letterSpacing: "0.1em" }}>COMPLETE</span>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 6 }}>
            <div style={{ height: 2, width: 80, background: "var(--mv-n200)" }}>
              <div style={{ height: "100%", width: `${modPct}%`, background: complete ? "var(--mv-accent)" : "var(--mv-black)", transition: "width 0.3s ease" }} />
            </div>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-n600)", letterSpacing: "0.08em" }}>{done}/{mod.lessons} · {mod.duration}</span>
          </div>
        </div>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "var(--mv-n600)", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
      </button>
      {open && (
        <div style={{ padding: "0 28px 20px 96px", display: "flex", flexDirection: "column" as const, gap: 8 }}>
          {Array.from({ length: mod.lessons }, (_, i) => (
            <label key={i} style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
              <input type="checkbox" checked={!!modProgress[i]} onChange={() => onToggle(i)} style={{ width: 14, height: 14, accentColor: "var(--mv-accent)", cursor: "pointer" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: modProgress[i] ? "var(--mv-n600)" : "var(--mv-black)", textDecoration: modProgress[i] ? "line-through" : "none" }}>Lesson {String(i + 1).padStart(2, "0")}</span>
            </label>
          ))}
          <div style={{ marginTop: 8 }}>
            <Link href={`/preview/${mod.slug}`}><span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--mv-accent)", letterSpacing: "0.1em", cursor: "pointer" }}>VIEW MODULE PREVIEW →</span></Link>
          </div>
        </div>
      )}
    </div>
  );
}
