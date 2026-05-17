import { Router, type IRouter } from "express";
import { Resend } from "resend";
import { readFileSync } from "node:fs";
import path from "node:path";

const router: IRouter = Router();

const EMAILS_DIR =
  process.env["EMAIL_TEMPLATES_DIR"] ??
  path.resolve(process.cwd(), "../../artifacts/mockup-sandbox/public/emails");

const DRIP_SEQUENCE = [
  {
    file: "email1-welcome.html",
    subject: "Your free guide is inside — Moneyverse",
    delayDays: 0,
  },
  {
    file: "email2-fiat-leak.html",
    subject: "47 cents on the dollar — Moneyverse",
    delayDays: 2,
  },
  {
    file: "email3-missed-window.html",
    subject: "Why the window closes before they act — Moneyverse",
    delayDays: 4,
  },
  {
    file: "email4-blueprint-offer.html",
    subject: "The Blueprint — what's inside — Moneyverse",
    delayDays: 7,
  },
  {
    file: "email5-final-push.html",
    subject: "The cycle closes. Last call. — Moneyverse",
    delayDays: 10,
  },
];

function scheduledAt(delayDays: number): string | undefined {
  if (delayDays === 0) return undefined;
  const d = new Date();
  d.setDate(d.getDate() + delayDays);
  return d.toISOString();
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/subscribe", async (req, res) => {
  const email: unknown = (req.body as Record<string, unknown>)["email"];
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    res.status(400).json({ ok: false, error: "A valid email address is required." });
    return;
  }

  const cleanEmail = email.trim();

  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) {
    res.status(503).json({ ok: false, error: "Email service not configured." });
    return;
  }

  const resend = new Resend(apiKey);
  const fromAddress = process.env["RESEND_FROM"] ?? "Moneyverse <onboarding@resend.dev>";

  const payloads: Parameters<typeof resend.emails.send>[0][] = [];

  for (const item of DRIP_SEQUENCE) {
    const htmlPath = path.join(EMAILS_DIR, item.file);
    let html: string;
    try {
      html = readFileSync(htmlPath, "utf8");
    } catch {
      res.status(500).json({
        ok: false,
        error: `Could not read email template: ${item.file}`,
      });
      return;
    }

    const payload: Parameters<typeof resend.emails.send>[0] = {
      from: fromAddress,
      to: [cleanEmail],
      subject: item.subject,
      html,
    };

    const sendAt = scheduledAt(item.delayDays);
    if (sendAt) {
      payload.scheduledAt = sendAt;
    }

    payloads.push(payload);
  }

  const results = await Promise.all(payloads.map((p) => resend.emails.send(p)));

  const failed = results
    .map((r, i) => (r.error ? `Day ${DRIP_SEQUENCE[i]!.delayDays}: ${r.error.message}` : null))
    .filter((e): e is string => e !== null);

  if (failed.length > 0) {
    res.status(500).json({
      ok: false,
      error: "Failed to schedule the full email sequence. Please try again.",
      details: failed,
    });
    return;
  }

  res.json({ ok: true, scheduled: DRIP_SEQUENCE.length });
});

export default router;
