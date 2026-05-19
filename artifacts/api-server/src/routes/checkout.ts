import { Router, type IRouter } from "express";
import Stripe from "stripe";

const router: IRouter = Router();

const TIER_PRICES: Record<number, { amount: number; name: string }> = {
  1: { amount: 9700,  name: "Moneyverse — Blueprint" },
  2: { amount: 19700, name: "Moneyverse — Blueprint + Live" },
  3: { amount: 99700, name: "Moneyverse — Sovereign Stack" },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/checkout", async (req, res) => {
  const body = req.body as Record<string, unknown>;
  const { productId, customerEmail, paymentMethod, tier, successUrl, cancelUrl } = body;

  if (typeof customerEmail !== "string" || !EMAIL_RE.test(customerEmail.trim())) {
    res.status(400).json({ ok: false, error: "A valid email address is required." });
    return;
  }

  const tierId = typeof tier === "number" ? tier : Number(tier);
  const tierInfo = TIER_PRICES[tierId];
  if (!tierInfo) {
    res.status(400).json({ ok: false, error: "Invalid tier." });
    return;
  }

  if (paymentMethod === "bitcoin") {
    const btcpayUrl = process.env["BTCPAY_URL"];
    const btcpayStoreId = process.env["BTCPAY_STORE_ID"];
    const btcpayApiKey = process.env["BTCPAY_API_KEY"];

    if (!btcpayUrl || !btcpayStoreId || !btcpayApiKey) {
      res.status(503).json({ ok: false, error: "Bitcoin payments not configured." });
      return;
    }

    try {
      const btcRes = await fetch(`${btcpayUrl}/api/v1/stores/${btcpayStoreId}/invoices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${btcpayApiKey}`,
        },
        body: JSON.stringify({
          amount: tierInfo.amount / 100,
          currency: "USD",
          buyerEmail: customerEmail.trim(),
          metadata: { productId, tier: tierId },
          checkout: { redirectURL: successUrl, redirectAutomatically: true },
        }),
      });

      if (!btcRes.ok) {
        res.status(502).json({ ok: false, error: "Payment gateway error. Please try again." });
        return;
      }

      const invoice = (await btcRes.json()) as { checkoutLink?: string };
      if (!invoice.checkoutLink) {
        res.status(502).json({ ok: false, error: "Could not create Bitcoin invoice." });
        return;
      }

      res.json({ ok: true, url: invoice.checkoutLink });
    } catch {
      res.status(502).json({ ok: false, error: "Bitcoin payment gateway unreachable." });
    }
    return;
  }

  const stripeKey = process.env["STRIPE_SECRET_KEY"];
  if (!stripeKey) {
    res.status(503).json({ ok: false, error: "Payment system not configured." });
    return;
  }

  try {
    const stripe = new Stripe(stripeKey);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customerEmail.trim(),
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: tierInfo.amount,
            product_data: { name: tierInfo.name },
          },
          quantity: 1,
        },
      ],
      success_url: typeof successUrl === "string" ? successUrl : "https://moneyverse.network/success",
      cancel_url: typeof cancelUrl === "string" ? cancelUrl : "https://moneyverse.network/cancel",
      metadata: {
        productId: typeof productId === "string" ? productId : "",
        tier: String(tierId),
      },
    });

    res.json({ ok: true, url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(502).json({ ok: false, error: message });
  }
});

export default router;
