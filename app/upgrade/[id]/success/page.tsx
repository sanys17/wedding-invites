import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

const PLAN_NAMES: Record<string, { en: string; cs: string; sk: string }> = {
  standard: { en: "Premium", cs: "Prémiový", sk: "Prémiové" },
  pro:      { en: "Luxury",  cs: "Luxusní",  sk: "Luxusné"  },
};

function getStrings(lang: string, planName: string) {
  if (lang === "cs") return {
    label: "Platba potvrzena",
    heading: "Upgrade byl úspěšný",
    sub: `Váš balíček byl upgradován na plán ${planName}. Nyní máte přístup ke všem novým funkcím.`,
    dashboardBtn: "Přejít na RSVP přehled",
    footer: "FOREVERMORE · DIGITÁLNÍ SVATEBNÍ OZNÁMENÍ",
    emailSubject: `Váš balíček byl upgradován na ${planName} ✦`,
    emailHeading: "Upgrade byl úspěšný",
    emailSub: `Váš balíček byl upgradován na plán <strong>${planName}</strong>. Nyní máte přístup ke všem novým funkcím.`,
    emailDashboardLabel: "RSVP přehled",
    emailDashboardDesc: "Sledujte, kdo přijde, v reálném čase. Tento odkaz si nechte pro sebe.",
    emailInviteLabel: "Váš odkaz ke sdílení",
    emailBtn: "Přejít na přehled RSVP",
  };
  if (lang === "sk") return {
    label: "Platba potvrdená",
    heading: "Upgrade bol úspešný",
    sub: `Váš balík bol upgradovaný na plán ${planName}. Teraz máte prístup ku všetkým novým funkciám.`,
    dashboardBtn: "Prejsť na RSVP prehľad",
    footer: "FOREVERMORE · DIGITÁLNE SVADOBNÉ OZNÁMENIA",
    emailSubject: `Váš balík bol upgradovaný na ${planName} ✦`,
    emailHeading: "Upgrade bol úspešný",
    emailSub: `Váš balík bol upgradovaný na plán <strong>${planName}</strong>. Teraz máte prístup ku všetkým novým funkciám.`,
    emailDashboardLabel: "RSVP prehľad",
    emailDashboardDesc: "Sledujte, kto príde, v reálnom čase. Tento odkaz si nechajte pre seba.",
    emailInviteLabel: "Váš odkaz na zdieľanie",
    emailBtn: "Prejsť na prehľad RSVP",
  };
  return {
    label: "Payment confirmed",
    heading: "Upgrade successful",
    sub: `Your plan has been upgraded to ${planName}. You now have access to all the new features.`,
    dashboardBtn: "Go to RSVP Dashboard",
    footer: "FOREVERMORE · DIGITAL WEDDING INVITATIONS",
    emailSubject: `Your plan has been upgraded to ${planName} ✦`,
    emailHeading: "Upgrade successful",
    emailSub: `Your plan has been upgraded to <strong>${planName}</strong>. You now have access to all the new features.`,
    emailDashboardLabel: "RSVP Dashboard",
    emailDashboardDesc: "Track who's attending in real time. Keep this link private.",
    emailInviteLabel: "Your shareable invite link",
    emailBtn: "Go to RSVP Dashboard",
  };
}

export default async function UpgradeSuccessPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { session_id?: string };
}) {
  const inviteId = params.id;
  const sessionId = searchParams.session_id;

  if (!sessionId) notFound();

  // Verify payment with Stripe
  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    notFound();
  }

  if (session.payment_status !== "paid") {
    redirect(`/upgrade/${inviteId}`);
  }

  const meta = session.metadata;
  if (!meta || meta.type !== "upgrade" || meta.invite_id !== inviteId) {
    notFound();
  }

  const db = supabaseAdmin();

  // Fetch invite to get language, partners, email, and current plan
  const { data: invite, error: fetchError } = await db
    .from("invites")
    .select("id, partner1, partner2, plan, language, customer_email")
    .eq("id", inviteId)
    .single();

  if (fetchError || !invite) notFound();

  const newPlan = meta.new_plan;

  // Update plan if not already upgraded (idempotent)
  if (invite.plan !== newPlan) {
    await db.from("invites").update({ plan: newPlan }).eq("id", inviteId);
  }

  const lang = invite.language ?? "en";
  const planNames = PLAN_NAMES[newPlan] ?? { en: newPlan, cs: newPlan, sk: newPlan };
  const planName = planNames[lang as keyof typeof planNames] ?? planNames.en;
  const s = getStrings(lang, planName);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wedding-inv-nine.vercel.app";
  const inviteUrl = `${baseUrl}/invite/${inviteId}`;
  const dashboardUrl = `${baseUrl}/dashboard/${inviteId}`;

  // Send upgrade confirmation email (only once — check plan was just changed)
  if (invite.plan !== newPlan && invite.customer_email) {
    await resend.emails.send({
      from: "Forevermore <onboarding@resend.dev>",
      to: invite.customer_email,
      subject: s.emailSubject,
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
          <h1 style="font-size:32px;font-weight:300;font-style:italic;color:#1C1917;margin:0 0 8px;">${s.emailHeading}</h1>
          <p style="font-family:Arial,sans-serif;font-size:14px;color:#6B6359;font-weight:300;margin:0 0 12px;">
            ${invite.partner1} &amp; ${invite.partner2}
          </p>
          <p style="font-family:Arial,sans-serif;font-size:14px;color:#6B6359;font-weight:300;margin:0 0 40px;">${s.emailSub}</p>
          <div style="border-top:1px solid #E8DCC8;border-bottom:1px solid #E8DCC8;padding:20px 0;margin:0 0 32px;">
            <p style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#6B6359;margin:0 0 6px;">${s.emailInviteLabel}</p>
            <a href="${inviteUrl}" style="font-family:Arial,sans-serif;font-size:13px;color:#C9A96E;word-break:break-all;">${inviteUrl}</a>
          </div>
          <a href="${dashboardUrl}" style="display:inline-block;background:#C9A96E;color:#fff;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;text-decoration:none;padding:16px 36px;margin-bottom:40px;">
            ${s.emailBtn}
          </a>
        </td></tr>
        <tr><td style="padding:0 50px 40px;text-align:center;">
          <div style="background:#FAF8F4;padding:24px;border:1px solid #E8DCC8;">
            <p style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#C9A96E;margin:0 0 8px;">${s.emailDashboardLabel}</p>
            <p style="font-family:Arial,sans-serif;font-size:12px;color:#6B6359;margin:0 0 12px;font-weight:300;">${s.emailDashboardDesc}</p>
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
    }).catch((err) => console.error("[upgrade-success] Email error", err));
  }

  return (
    <main className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md w-full">

        {/* Ornament */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-12 bg-gold-light" />
          <span className="text-gold text-lg">✦</span>
          <div className="h-px w-12 bg-gold-light" />
        </div>

        {/* Label */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-8 bg-gold-light" />
          <span className="text-xs tracking-ultra-wide uppercase text-gold font-sans font-light">{s.label}</span>
          <div className="h-px w-8 bg-gold-light" />
        </div>

        {/* Heading */}
        <h1 className="font-serif text-4xl font-light text-charcoal mb-4">{s.heading}</h1>
        <p className="font-serif italic text-gold mb-3">{invite.partner1} &amp; {invite.partner2}</p>
        <p className="text-muted font-light leading-relaxed mb-10">{s.sub}</p>

        {/* Dashboard link */}
        <Link
          href={`/dashboard/${inviteId}`}
          className="inline-block bg-charcoal text-cream text-xs tracking-widest uppercase px-10 py-4 hover:bg-gold transition-colors duration-300"
        >
          {s.dashboardBtn}
        </Link>
      </div>
    </main>
  );
}
