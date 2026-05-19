import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const config = { api: { bodyParser: false } };

function supabaseAdmin() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
}

async function readRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => { data += chunk; });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

async function getOrProvisionUser(supabase, email, existingUserId) {
  if (existingUserId) return existingUserId;
  if (!email) return null;
  const { data: profile } = await supabase.from("profiles").select("id").eq("email", email).single();
  if (profile) return profile.id;
  const { data } = await supabase.auth.admin.inviteUserByEmail(email, {
    redirectTo: "https://moneyverse.network/auth/callback",
  });
  if (!data?.user) return null;
  await supabase.from("profiles").insert({ id: data.user.id, email });
  return data.user.id;
}

export default async function handler(req, res) {
  if (req.method !== "POST") { res.status(405).end(); return; }

  const rawBody = await readRawBody(req);
  const signature = req.headers["stripe-signature"];
  if (!signature) { res.status(400).json({ error: "Missing stripe-signature" }); return; }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    res.status(400).json({ error: err.message });
    return;
  }

  const supabase = supabaseAdmin();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const meta = session.metadata || {};

    let productId = meta.product_id ?? null;
    if (!productId) {
      const expanded = await stripe.checkout.sessions.retrieve(session.id, { expand: ["line_items"] });
      const priceId = expanded.line_items?.data?.[0]?.price?.id ?? null;
      if (priceId) {
        const { data: p } = await supabase.from("products").select("id").eq("stripe_price_id", priceId).single();
        productId = p?.id ?? null;
      }
    }
    if (!productId) { res.json({ received: true }); return; }

    const customerEmail = session.customer_details?.email ?? null;
    const userId = await getOrProvisionUser(supabase, customerEmail, meta.user_id ?? null);
    if (!userId && customerEmail) {
      res.status(500).json({ error: "Could not provision user" });
      return;
    }

    const gatewayTxId = session.payment_intent ?? session.id;
    const amountPaid = session.amount_total ? session.amount_total / 100 : 0;
    const now = new Date();
    const cohort = `${now.getFullYear()}-Q${Math.ceil((now.getMonth() + 1) / 3)}`;

    const { error } = await supabase.from("purchases").insert({
      user_id: userId,
      product_id: productId,
      creator_id: meta.creator_id ?? null,
      link_id: meta.link_id ?? null,
      amount_paid: amountPaid,
      gateway: "stripe",
      gateway_tx_id: gatewayTxId,
      status: "completed",
      cohort,
    });

    if (error && error.code !== "23505") {
      res.status(500).json({ error: "Failed to record purchase" });
      return;
    }

    if (!error && userId) {
      const { data: product } = await supabase.from("products").select("tier").eq("id", productId).single();
      const tier = product?.tier ?? 1;
      await supabase.from("profiles").update({ has_access: true, tier }).eq("id", userId);
    }
  }

  if (event.type === "charge.refunded") {
    const charge = event.data.object;
    const paymentIntent = charge.payment_intent ?? null;
    if (!paymentIntent) { res.json({ received: true }); return; }

    const { data: purchase } = await supabase
      .from("purchases").select("user_id").eq("gateway_tx_id", paymentIntent).eq("gateway", "stripe").single();

    await supabase.from("purchases")
      .update({ status: "refunded", refunded_at: new Date().toISOString() })
      .eq("gateway_tx_id", paymentIntent).eq("gateway", "stripe");

    if (purchase?.user_id) {
      const { count } = await supabase.from("purchases")
        .select("id", { count: "exact", head: true }).eq("user_id", purchase.user_id).eq("status", "completed");
      if ((count ?? 0) === 0) {
        await supabase.from("profiles").update({ has_access: false, tier: 0 }).eq("id", purchase.user_id);
      }
    }
  }

  if (event.type === "account.updated") {
    const account = event.data.object;
    if (account.details_submitted && account.charges_enabled) {
      await supabase.from("creators").update({ stripe_connected: true }).eq("stripe_account_id", account.id);
    }
  }

  res.json({ received: true });
}
