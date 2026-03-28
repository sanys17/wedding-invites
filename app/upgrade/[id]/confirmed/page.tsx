import { notFound } from "next/navigation";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const PLAN_NAMES: Record<string, { en: string; cs: string; sk: string }> = {
  standard: { en: "Premium", cs: "Prémiový", sk: "Prémiové" },
  pro:      { en: "Luxury",  cs: "Luxusní",  sk: "Luxusné"  },
};

function getStrings(lang: string, planName: string) {
  if (lang === "cs") return {
    label: "Platba potvrzena",
    heading: "Upgrade byl úspěšný",
    sub: `Váš balíček byl upgradován na plán ${planName}. Nyní máte přístup ke všem novým funkcím.`,
    emailNote: "Zaslali jsme vám potvrzovací e-mail s odkazem na RSVP přehled.",
    dashboardBtn: "Přejít na RSVP přehled",
  };
  if (lang === "sk") return {
    label: "Platba potvrdená",
    heading: "Upgrade bol úspešný",
    sub: `Váš balík bol upgradovaný na plán ${planName}. Teraz máte prístup ku všetkým novým funkciám.`,
    emailNote: "Zaslali sme vám potvrdzovací e-mail s odkazom na RSVP prehľad.",
    dashboardBtn: "Prejsť na RSVP prehľad",
  };
  return {
    label: "Payment confirmed",
    heading: "Upgrade successful",
    sub: `Your plan has been upgraded to ${planName}. You now have access to all the new features.`,
    emailNote: "We've sent you a confirmation email with a link to your RSVP dashboard.",
    dashboardBtn: "Go to RSVP Dashboard",
  };
}

export default async function UpgradeConfirmedPage({ params }: { params: { id: string } }) {
  const db = supabaseAdmin();

  const { data: invite, error } = await db
    .from("invites")
    .select("id, partner1, partner2, plan, language")
    .eq("id", params.id)
    .single();

  if (error || !invite) notFound();

  const lang = invite.language ?? "en";
  const planNames = PLAN_NAMES[invite.plan] ?? { en: invite.plan, cs: invite.plan, sk: invite.plan };
  const planName = planNames[lang as keyof typeof planNames] ?? planNames.en;
  const s = getStrings(lang, planName);

  return (
    <main className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md w-full">

        {/* Ornament */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-gold-light" />
          <span className="text-gold text-lg">✦</span>
          <div className="h-px w-16 bg-gold-light" />
        </div>

        {/* Label */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-8 bg-gold-light" />
          <span className="text-xs tracking-ultra-wide uppercase text-gold font-sans font-light">{s.label}</span>
          <div className="h-px w-8 bg-gold-light" />
        </div>

        {/* Heading */}
        <h1 className="font-serif text-4xl font-light text-charcoal mb-4">{s.heading}</h1>
        <p className="font-serif italic text-gold mb-4">{invite.partner1} &amp; {invite.partner2}</p>
        <p className="text-muted font-light leading-relaxed mb-3">{s.sub}</p>
        <p className="text-muted font-light text-sm leading-relaxed mb-10">{s.emailNote}</p>

        {/* Dashboard link */}
        <Link
          href={`/dashboard/${invite.id}`}
          className="inline-block bg-charcoal text-cream text-xs tracking-widest uppercase px-10 py-4 hover:bg-gold transition-colors duration-300"
        >
          {s.dashboardBtn}
        </Link>
      </div>
    </main>
  );
}
