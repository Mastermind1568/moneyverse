const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email, phone, telegram } = req.body || {};

  const properties = {};
  if (email) {
    if (!EMAIL_RE.test(String(email))) return res.status(400).json({ error: "Invalid email" });
    properties.email = String(email).toLowerCase();
  } else if (phone) {
    properties.phone = String(phone);
  } else if (telegram) {
    properties.telegram_handle = String(telegram);
  } else {
    return res.status(400).json({ error: "No contact info provided" });
  }

  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) {
    console.warn("[subscribe] HUBSPOT_ACCESS_TOKEN not set");
    return res.json({ ok: true, scheduled: 0 });
  }

  const hsRes = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ properties }),
  });

  if (hsRes.ok || hsRes.status === 409) return res.json({ ok: true });

  const data = await hsRes.json().catch(() => ({}));
  console.error("[subscribe] HubSpot error:", data);
  return res.status(500).json({ error: "Subscription failed" });
}