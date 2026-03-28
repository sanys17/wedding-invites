"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";

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
    loading: "Zpracování platby…",
  };
  if (lang === "sk") return {
    label: "Platba potvrdená",
    heading: "Upgrade bol úspešný",
    sub: `Váš balík bol upgradovaný na plán ${planName}. Teraz máte prístup ku všetkým novým funkciám.`,
    emailNote: "Zaslali sme vám potvrdzovací e-mail s odkazom na RSVP prehľad.",
    dashboardBtn: "Prejsť na RSVP prehľad",
    loading: "Spracovanie platby…",
  };
  return {
    label: "Payment confirmed",
    heading: "Upgrade successful",
    sub: `Your plan has been upgraded to ${planName}. You now have access to all the new features.`,
    emailNote: "We've sent you a confirmation email with a link to your RSVP dashboard.",
    dashboardBtn: "Go to RSVP Dashboard",
    loading: "Processing your payment…",
  };
}

type Status = "loading" | "success" | "error";

export default function UpgradeConfirmedPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const inviteId = params.id as string;
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState<Status>("loading");
  const [plan, setPlan] = useState("standard");
  const [lang, setLang] = useState("en");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function run() {
      if (!sessionId) {
        setErrorMsg("Missing session_id in URL.");
        setStatus("error");
        return;
      }

      try {
        const res = await fetch("/api/upgrade-complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, inviteId }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          setErrorMsg(data.error ?? "Something went wrong.");
          setStatus("error");
          return;
        }

        // Fetch language for display
        try {
          const inv = await fetch(`/api/invite-plan?id=${inviteId}`);
          const invData = await inv.json();
          if (invData.language) setLang(invData.language);
        } catch {}

        setPlan(data.plan ?? "standard");
        setStatus("success");
      } catch (err) {
        setErrorMsg(String(err));
        setStatus("error");
      }
    }

    run();
  }, [inviteId, sessionId]);

  const planNames = PLAN_NAMES[plan] ?? { en: plan, cs: plan, sk: plan };
  const planName = planNames[lang as keyof typeof planNames] ?? planNames.en;
  const s = getStrings(lang, planName);

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-md w-full">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-gold-light" />
            <span className="text-gold text-lg">✦</span>
            <div className="h-px w-12 bg-gold-light" />
          </div>
          <p className="text-muted font-light text-sm mb-8">{s.loading}</p>
          <div className="flex items-center justify-center gap-3">
            {[0, 150, 300].map((d) => (
              <div key={d} className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-md w-full">
          <p className="text-red-400 text-sm mb-4">Something went wrong: {errorMsg}</p>
          <Link href={`/upgrade/${inviteId}`} className="text-xs tracking-widest text-gold uppercase underline">
            Return to upgrade page
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md w-full">

        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-gold-light" />
          <span className="text-gold text-lg">✦</span>
          <div className="h-px w-16 bg-gold-light" />
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-8 bg-gold-light" />
          <span className="text-xs tracking-ultra-wide uppercase text-gold font-sans font-light">{s.label}</span>
          <div className="h-px w-8 bg-gold-light" />
        </div>

        <h1 className="font-serif text-4xl font-light text-charcoal mb-4">{s.heading}</h1>
        <p className="text-muted font-light leading-relaxed mb-3">{s.sub}</p>
        <p className="text-muted font-light text-sm leading-relaxed mb-10">{s.emailNote}</p>

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
