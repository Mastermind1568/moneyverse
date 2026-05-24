import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@14?target=deno";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TIER_MAP: Record<string, number> = { "1": 1, "2": 2, "3": 3 };

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
  if (!stripeKey) {
    return Response.json({ error: "Payment system not configured. Email hello@moneyverse.network to enrol." }, { status: 503, headers: CORS });
  }

  try {
    const { productId, customerEmail, tier, successUrl, cancelUrl, refCode } = await req.json();
    if (!productId || !customerEmail || !successUrl) {
      return Response.json({ error: "Missing required fields." }, { status: 400, headers: CORS });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Fetch the Stripe price ID from the products table
    const { data: product } = await supabase
      .from("products")
      .select("stripe_price_id, title, price_usd")
      .eq("id", productId)
      .single();

    if (!product?.stripe_price_id) {
      return Response.json({ error: "Product not found." }, { status: 404, headers: CORS });
    }

    // Resolve ref code to creator_id for affiliate tracking
    let creatorId: string | null = null;
    if (refCode && /^[A-Z0-9]{8}$/i.test(refCode)) {
      const { data } = await supabase.rpc("resolve_ref_code", { ref: refCode.toUpperCase() });
      if (data) creatorId = data as string;
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2024-06-20" });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: customerEmail,
      line_items: [{ price: product.stripe_price_id, quantity: 1 }],
      success_url: `${successUrl}?email=${encodeURIComponent(customerEmail)}&tier=t${tier}`,
      cancel_url: cancelUrl,
      metadata: {
        product_id: productId,
        tier: String(TIER_MAP[String(tier)] ?? 1),
        customer_email: customerEmail,
        ...(creatorId ? { creator_id: creatorId } : {}),
        ...(refCode ? { ref_code: refCode } : {}),
      },
      allow_promotion_codes: true,
    });

    return Response.json({ url: session.url }, { headers: CORS });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Checkout failed. Please try again or email hello@moneyverse.network." }, { status: 500, headers: CORS });
  }
});
