const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TIER_NAMES: Record<string, string> = {
  t1: "The Blueprint",
  t2: "Blueprint + Live",
  t3: "The Sovereign Stack",
};

const TIER_PRICES: Record<string, string> = {
  t1: "$97",
  t2: "$197",
  t3: "$997",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  try {
    const { email, tier } = await req.json();
    if (!email) return Response.json({ ok: false, error: "Missing email" }, { status: 400, headers: CORS });

    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) return Response.json({ ok: true, note: "no resend key" }, { headers: CORS });

    const tierName = TIER_NAMES[tier] ?? "The Blueprint";
    const tierPrice = TIER_PRICES[tier] ?? "$97";

    // Welcome email to buyer
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
      body: JSON.stringify({
        from: "Moneyverse <hello@moneyverse.network>",
        to: email,
        subject: `Welcome to Moneyverse — ${tierName}`,
        html: `
          <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:40px 24px;background:#fff;color:#111">
            <p style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#999;margin-bottom:32px">MONEYVERSE</p>
            <h1 style="font-size:28px;font-weight:900;line-height:1.2;margin-bottom:16px">You're in. Let's build.</h1>
            <p style="font-size:15px;line-height:1.8;color:#444;margin-bottom:8px">
              You've enrolled in <strong>${tierName}</strong> (${tierPrice}). Your access is confirmed.
            </p>
            <p style="font-size:15px;line-height:1.8;color:#444;margin-bottom:24px">
              Check your account activation email — click the link to set your password and access your dashboard.
            </p>
            <a href="https://moneyverse.network/dashboard" style="display:inline-block;background:#f97316;color:#000;font-family:monospace;font-size:11px;letter-spacing:0.1em;padding:16px 32px;text-decoration:none;font-weight:700;margin-bottom:32px">
              GO TO DASHBOARD →
            </a>
            <p style="font-size:13px;line-height:1.8;color:#666;margin-bottom:8px">What's inside:</p>
            <ul style="font-size:13px;line-height:2;color:#444;padding-left:20px">
              <li>11 modules · 85 lessons</li>
              <li>Cold storage setup protocol</li>
              <li>DCA framework + exit architecture</li>
              <li>21-day activation sequence</li>
            </ul>
            <p style="font-size:13px;line-height:1.8;color:#666;margin-top:24px">
              Questions? Reply to this email — we read every one.
            </p>
            <hr style="border:none;border-top:1px solid #eee;margin:32px 0"/>
            <p style="font-size:11px;color:#999;line-height:1.6">
              Moneyverse Capital, Ltd. · Lagos · London · Dubai<br/>
              <a href="mailto:hello@moneyverse.network" style="color:#f97316">hello@moneyverse.network</a>
            </p>
          </div>
        `,
      }),
    });

    // Notify admin of purchase
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
      body: JSON.stringify({
        from: "Moneyverse <hello@moneyverse.network>",
        to: "hello@moneyverse.network",
        subject: `New purchase: ${tierName} — ${email}`,
        html: `<p><strong>New enrolment</strong></p><p>Plan: ${tierName} (${tierPrice})<br/>Email: ${email}<br/>Time: ${new Date().toISOString()}</p>`,
      }),
    });

    return Response.json({ ok: true }, { headers: CORS });
  } catch (err) {
    console.error(err);
    return Response.json({ ok: false, error: "Server error" }, { status: 500, headers: CORS });
  }
});
