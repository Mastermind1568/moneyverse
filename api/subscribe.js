import { createClient } from "@supabase/supabase-js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function supabase() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email } = req.body || {};
  if (!email || !EMAIL_RE.test(String(email))) {
    return res.status(400).json({ error: "Invalid email" });
  }

  const sb = supabase();
  const { error } = await sb
    .from("subscribers")
    .upsert({ email: String(email).toLowerCase() }, { onConflict: "email" });

  if (error) {
    console.error("[subscribe] Supabase error:", error.message);
    return res.status(500).json({ error: "Subscription failed" });
  }

  return res.json({ ok: true });
}