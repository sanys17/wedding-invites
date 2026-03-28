import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const PLAN_NAMES: Record<string, { en: string; cs: string; sk: string }> = {
  standard: { en: "Premium", cs: "Prémiový", sk: "Prémiové" },
  pro:      { en: "Luxury",  cs: "Luxusní",  sk: "Luxusné"  },
};

function getEmailStrings(lang: string, planName: string) {
  if (lang === "cs") return {
    subject: `Váš balíček byl upgradován na ${planName} ✦`,
    label: "Platba potvrzena",
    heading: "Upgrade byl úspěšný",
    sub: `Váš balíček byl upgradován na plán <strong>${planName}</strong>. Nyní máte přístup ke všem novým funkcím.`,
    dashboardLabel: "RSVP přehled",
    dashboardDesc: "Sledujte, kdo přijde, v reálném čase. Tento odkaz si nechte pro sebe.",
    inviteLabel: "Váš odkaz ke sdílení",
    btn: "Přejít na přehled RSVP",
    footer: "FOREVERMORE · DIGITÁLNÍ SVATEBNÍ OZNÁMENÍ",
  };
  if (lang === "sk") return {
    subject: `Váš balík bol upgradovaný na ${planName} ✦`,
    label: "Platba potvrdená",
    heading: "Upgrade bol úspešný",
    sub: `Váš balík bol upgradovaný na plán <strong>${planName}</strong>. Teraz máte prístup ku všetkým novým funkciám.`,
    dashboardLabel: "RSVP prehľad",
    dashboardDesc: "Sledujte, kto príde, v reálnom čase. Tento odkaz si nechajte pre seba.",
    inviteLabel: "Váš odkaz na zdieľanie",
    btn: "Prejsť na prehľad RSVP",
    footer: "FOREVERMORE · DIGITÁLNE SVADOBNÉ OZNÁMENIA",
  };
  return {
    subject: `Your plan has been upgraded to ${planName} ✦`,
    label: "Payment confirmed",
    heading: "Upgrade successful",
    sub: `Your plan has been upgraded to <strong>${planName}</strong>. You now have access to all the new features.`,
    dashboardLabel: "RSVP Dashboard",
    dashboardDesc: "Track who's attending in real time. Keep this link private.",
    inviteLabel: "Your shareable invite link",
    btn: "Go to RSVP Dashboard",
    footer: "FOREVERMORE · DIGITAL WEDDING INVITATIONS",
  };
}

export async function POST(req: NextRequest) {
  try {
    const { sessionId, inviteId } = await req.json();

    if (!sessionId || !inviteId) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    // Verify payment with Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: `Payment not complete: ${session.payment_status}` }, { status: 400 });
    }

    const meta = session.metadata;
    if (!meta || meta.type !== "upgrade" || meta.invite_id !== inviteId) {
      return NextResponse.json({ error: "Session metadata mismatch" }, { status: 400 });
    }

    const newPlan = meta.new_plan;
    const db = supabaseAdmin();

    // Fetch invite
    const { data: invite, error: fetchError } = await db
      .from("invites")
      .select("id, partner1, partner2, plan, language, customer_email")
      .eq("id", inviteId)
      .single();

    if (fetchError || !invite) {
      return NextResponse.json({ error: `Invite not found: ${fetchError?.message}` }, { status: 404 });
    }

    // Update plan (always — idempotent)
    const { error: updateError } = await db
      .from("invites")
      .update({ plan: newPlan })
      .eq("id", inviteId);

    if (updateError) {
      console.error("[upgrade-complete] DB update error", updateError);
      return NextResponse.json({ error: `DB update failed: ${updateError.message}` }, { status: 500 });
    }

    // Send email (always — don't skip if webhook already ran)
    if (invite.customer_email) {
      const lang = invite.language ?? "en";
      const planNames = PLAN_NAMES[newPlan] ?? { en: newPlan, cs: newPlan, sk: newPlan };
      const planName = planNames[lang as keyof typeof planNames] ?? planNames.en;
      const s = getEmailStrings(lang, planName);

      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wedding-inv-nine.vercel.app";
      const inviteUrl = `${baseUrl}/invite/${inviteId}`;
      const dashboardUrl = `${baseUrl}/dashboard/${inviteId}`;

      await resend.emails.send({
        from: "Forevermore <onboarding@resend.dev>",
        to: invite.customer_email,
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
          <p style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#C9A96E;margin:0 0 16px;">${s.label}</p>
          <h1 style="font-size:32px;font-weight:300;font-style:italic;color:#1C1917;margin:0 0 8px;">${s.heading}</h1>
          <p style="font-family:Arial,sans-serif;font-size:14px;color:#6B6359;font-weight:300;margin:0 0 12px;">
            ${invite.partner1} &amp; ${invite.partner2}
          </p>
          <p style="font-family:Arial,sans-serif;font-size:14px;color:#6B6359;font-weight:300;margin:0 0 40px;">${s.sub}</p>
          <div style="border-top:1px solid #E8DCC8;border-bottom:1px solid #E8DCC8;padding:20px 0;margin:0 0 32px;">
            <p style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#6B6359;margin:0 0 6px;">${s.inviteLabel}</p>
            <a href="${inviteUrl}" style="font-family:Arial,sans-serif;font-size:13px;color:#C9A96E;word-break:break-all;">${inviteUrl}</a>
          </div>
          <a href="${dashboardUrl}" style="display:inline-block;background:#C9A96E;color:#fff;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;text-decoration:none;padding:16px 36px;margin-bottom:40px;">
            ${s.btn}
          </a>
        </td></tr>
        <tr><td style="padding:0 50px 40px;text-align:center;">
          <div style="background:#FAF8F4;padding:24px;border:1px solid #E8DCC8;">
            <p style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#C9A96E;margin:0 0 8px;">${s.dashboardLabel}</p>
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
      }).catch((err) => console.error("[upgrade-complete] Email error", err));
    }

    return NextResponse.json({ success: true, plan: newPlan });
  } catch (err) {
    console.error("[upgrade-complete] Unexpected error", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
