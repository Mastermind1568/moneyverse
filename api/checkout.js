import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function supabaseAdmin() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") { res.status(200).end(); return; }
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }

  const { productId, customerEmail, paymentMethod, successUrl, cancelUrl } = req.body || {};

  if (typeof customerEmail !== "string" || !EMAIL_RE.test(customerEmail.trim())) {
    res.status(400).json({ ok: false, error: "A valid email address is required." });
    return;
  }
  if (!productId) {
    res.status(400).json({ ok: false, error: "Product ID is required." });
    return;
  }

  const supabase = supabaseAdmin();
  const { data: product, error: productError } = await supabase
    .from("products")
    .select("id, tier, stripe_price_id, price_usd")
    .eq("id", productId)
    .single();

  if (productError || !product) {
    res.status(404).json({ ok: false, error: "Product not found." });
    return;
  }

  if (paymentMethod === "bitcoin") {
    const btcpayUrl = process.env.BTCPAY_URL;
    const btcpayStoreId = process.env.BTCPAY_STORE_ID;
    const btcpayApiKey = process.env.BTCPAY_API_KEY;

    if (!btcpayUrl || !btcpayStoreId || !btcpayApiKey) {
      res.status(503).json({ ok: false, error: "Bitcoin payments not configured." });
      return;
    }

    try {
      const btcRes = await fetch(`${btcpayUrl}/api/v1/stores/${btcpayStoreId}/invoices`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `token ${btcpayApiKey}` },
        body: JSON.stringify({
          amount: product.price_usd,
          currency: "USD",
          buyerEmail: customerEmail.trim(),
          metadata: { product_id: product.id, gateway: "btcpay" },
          checkout: { redirectURL: successUrl || "https://moneyverse.network/success", redirectAutomatically: true },
        }),
      });

      if (!btcRes.ok) { res.status(502).json({ ok: false, error: "Payment gateway error." }); return; }
      const invoice = await btcRes.json();
      if (!invoice.checkoutLink) { res.status(502).json({ ok: false, error: "Could not create Bitcoin invoice." }); return; }
      res.json({ ok: true, url: invoice.checkoutLink });
    } catch {
      res.status(502).json({ ok: false, error: "Bitcoin payment gateway unreachable." });
    }
    return;
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) { res.status(503).json({ ok: false, error: "Payment system not configured." }); return; }

  try {
    const stripe = new Stripe(stripeKey);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customerEmail.trim(),
      line_items: [{ price: product.stripe_price_id, quantity: 1 }],
      success_url: successUrl || "https://moneyverse.network/success",
      cancel_url: cancelUrl || "https://moneyverse.network/cancel",
      metadata: { product_id: product.id, gateway: "stripe" },
    });
    res.json({ ok: true, url: session.url });
  } catch (err) {
    res.status(502).json({ ok: false, error: err instanceof Error ? err.message : "Unknown error" });
  }
}
