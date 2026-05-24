import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  try {
    const { email, source } = await req.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ ok: false, error: "Invalid email" }, { status: 400, headers: CORS });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Upsert subscriber (ignore duplicates)
    const { error: dbError } = await supabase
      .from("subscribers")
      .upsert({ email, source: source ?? "unknown", subscribed_at: new Date().toISOString() }, { onConflict: "email", ignoreDuplicates: true });

    if (dbError) throw dbError;

    // Send guide delivery email to subscriber
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
        body: JSON.stringify({
          from: "Moneyverse <hello@moneyverse.network>",
          to: email,
          subject: "Your free guide: The Fiat Trap",
          html: `
            <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:40px 24px;background:#fff;color:#111">
              <p style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#999;margin-bottom:32px">MONEYVERSE</p>
              <h1 style="font-size:28px;font-weight:900;line-height:1.2;margin-bottom:16px">The Fiat Trap — your free guide is ready</h1>
              <p style="font-size:15px;line-height:1.8;color:#444;margin-bottom:24px">
                17 pages on why fiat currencies fail, how the 4-year Bitcoin halving cycle works, and the five mistakes that cost most investors their position.
              </p>
              <a href="https://moneyverse.network/free-guide" style="display:inline-block;background:#f97316;color:#000;font-family:monospace;font-size:11px;letter-spacing:0.1em;padding:16px 32px;text-decoration:none;font-weight:700;margin-bottom:32px">
                READ THE GUIDE →
              </a>
              <p style="font-size:13px;line-height:1.8;color:#666;margin-bottom:8px">Over the next 5 days you'll also receive the full email sequence covering:</p>
              <ul style="font-size:13px;line-height:2;color:#444;padding-left:20px">
                <li>Why your savings are losing the race</li>
                <li>The Cantillon Effect — who benefits first</li>
                <li>The halving cycle, mapped</li>
                <li>Cold storage: not your keys, not your coins</li>
                <li>Building your exit architecture</li>
              </ul>
              <hr style="border:none;border-top:1px solid #eee;margin:32px 0"/>
              <p style="font-size:11px;color:#999;line-height:1.6">
                Moneyverse Capital, Ltd. · Lagos · London · Dubai<br/>
                Questions? Reply to this email or contact <a href="mailto:hello@moneyverse.network" style="color:#f97316">hello@moneyverse.network</a>
              </p>
            </div>
          `,
        }),
      });

      // Notify admin
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
        body: JSON.stringify({
          from: "Moneyverse <hello@moneyverse.network>",
          to: "hello@moneyverse.network",
          subject: `New subscriber: ${email}`,
          html: `<p>New subscriber from <strong>${source ?? "unknown"}</strong>: <strong>${email}</strong></p><p>${new Date().toISOString()}</p>`,
        }),
      });
    }

    return Response.json({ ok: true }, { headers: CORS });
  } catch (err) {
    console.error(err);
    return Response.json({ ok: false, error: "Server error" }, { status: 500, headers: CORS });
  }
});
