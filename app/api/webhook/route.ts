import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { nanoid } from "nanoid";
import type Stripe from "stripe";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function getEmailStrings(lang: string) {
  if (lang === "cs") return {
    subject: "Vaše svatební oznámení je připraveno ✦",
    heading: "Vaše oznámení je připraveno",
    linkLabel: "Váš odkaz ke sdílení",
    viewBtn: "Zobrazit oznámení",
    dashboardTitle: "RSVP přehled",
    dashboardDesc: "Sledujte, kdo přijde, v reálném čase. Tento odkaz si nechte pro sebe.",
    footer: "FOREVERMORE · DIGITÁLNÍ SVATEBNÍ OZNÁMENÍ",
  };
  if (lang === "sk") return {
    subject: "Vaše svadobné oznámenie je pripravené ✦",
    heading: "Vaše oznámenie je pripravené",
    linkLabel: "Váš odkaz na zdieľanie",
    viewBtn: "Zobraziť oznámenie",
    dashboardTitle: "RSVP prehľad",
    dashboardDesc: "Sledujte, kto príde, v reálnom čase. Tento odkaz si nechajte pre seba.",
    footer: "FOREVERMORE · DIGITÁLNE SVADOBNÉ OZNÁMENIA",
  };
  return {
    subject: "Your wedding invitation is ready ✦",
    heading: "Your invitation is ready",
    linkLabel: "Your shareable invite link",
    viewBtn: "View Invitation",
    dashboardTitle: "RSVP Dashboard",
    dashboardDesc: "Track who's attending in real time. Keep this link private.",
    footer: "FOREVERMORE · DIGITAL WEDDING INVITATIONS",
  };
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("[webhook] Invalid signature", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const meta = session.metadata!;

    const id = nanoid(10); // short unique ID for the shareable URL

    const db = supabaseAdmin();
    const { error } = await db.from("invites").insert({
      id,
      partner1: meta.partner1,
      partner2: meta.partner2,
      date: meta.date,
      time: meta.time,
      venue: meta.venue,
      location: meta.location,
      message: meta.message,
      rsvp_email: meta.rsvp_email,
      template: meta.template,
      plan: meta.plan ?? "standard",
      language: meta.language ?? "en",
      image_url: meta.image_url ?? null,
      video_url: meta.video_url ?? null,
      customer_email: session.customer_email,
      paid: true,
      stripe_session_id: session.id,
    });

    if (error) {
      console.error("[webhook] Supabase insert error", error);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wedding-inv-nine.vercel.app";
    const inviteUrl = `${baseUrl}/invite/${id}`;
    const dashboardUrl = `${baseUrl}/dashboard/${id}`;

    // Send confirmation email to customer
    if (session.customer_email) {
      const s = getEmailStrings(meta.language ?? "en");
      await resend.emails.send({
        from: "Forevermore <onboarding@resend.dev>",
        to: session.customer_email,
        subject: s.subject,
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#FAF8F4;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF8F4;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-top:3px solid #C9A96E;">
        <tr><td style="padding:50px 50px 0;text-align:center;">
          <p style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:#C9A96E;margin:0 0 24px;">Forevermore</p>
          <h1 style="font-size:32px;font-weight:300;font-style:italic;color:#1C1917;margin:0 0 8px;">${s.heading}</h1>
          <p style="font-family:Arial,sans-serif;font-size:14px;color:#6B6359;font-weight:300;margin:0 0 40px;">
            ${meta.partner1} &amp; ${meta.partner2}
          </p>
          <div style="border-top:1px solid #E8DCC8;border-bottom:1px solid #E8DCC8;padding:20px 0;margin:0 0 40px;">
            <p style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#6B6359;margin:0 0 6px;">${s.linkLabel}</p>
            <a href="${inviteUrl}" style="font-family:Arial,sans-serif;font-size:13px;color:#C9A96E;word-break:break-all;">${inviteUrl}</a>
          </div>
          <a href="${inviteUrl}" style="display:inline-block;background:#C9A96E;color:#fff;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;text-decoration:none;padding:16px 36px;margin-bottom:40px;">
            ${s.viewBtn}
          </a>
        </td></tr>
        <tr><td style="padding:0 50px 40px;text-align:center;">
          <div style="background:#FAF8F4;padding:24px;border:1px solid #E8DCC8;">
            <p style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#C9A96E;margin:0 0 8px;">${s.dashboardTitle}</p>
            <p style="font-family:Arial,sans-serif;font-size:12px;color:#6B6359;margin:0 0 12px;font-weight:300;">${s.dashboardDesc}</p>
            <a href="${dashboardUrl}" style="font-family:Arial,sans-serif;font-size:11px;color:#C9A96E;word-break:break-all;">${dashboardUrl}</a>
          </div>
        </td></tr>
        <tr><td style="border-top:3px solid #C9A96E;padding:24px;text-align:center;">
          <p style="font-family:Arial,sans-serif;font-size:10px;color:#9B9490;margin:0;letter-spacing:2px;">${s.footer}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
      });
    }

    console.log(`[webhook] Invite created: ${id}`);
  }

  return NextResponse.json({ received: true });
}
