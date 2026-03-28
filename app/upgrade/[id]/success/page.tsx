"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

function getStrings(lang: string) {
  if (lang === "cs") return {
    label: "Platba potvrzena",
    heading: "Upgrade byl úspěšný",
    sub: "Váš balíček byl upgradován. Připravujeme váš přehled…",
    btn: "Přejít na přehled RSVP",
  };
  if (lang === "sk") return {
    label: "Platba potvrdená",
    heading: "Upgrade bol úspešný",
    sub: "Váš balík bol upgradovaný. Pripravujeme váš prehľad…",
    btn: "Prejsť na prehľad RSVP",
  };
  return {
    label: "Payment confirmed",
    heading: "Upgrade successful",
    sub: "Your plan has been upgraded. Preparing your dashboard…",
    btn: "Go to RSVP Dashboard",
  };
}

export default function UpgradeSuccessPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [ready, setReady] = useState(false);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 20;

    const poll = async () => {
      try {
        const res = await fetch(`/api/invite-plan?id=${id}`);
        const data = await res.json();
        if (data.language) setLang(data.language);
        if (data.plan && data.plan !== "basic") {
          setReady(true);
          return;
        }
      } catch {}
      if (attempts < maxAttempts) {
        attempts++;
        setTimeout(poll, 1500);
      } else {
        // Give up polling — send them to dashboard anyway
        setReady(true);
      }
    };

    poll();
  }, [id]);

  const s = getStrings(lang);

  return (
    <main className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md w-full">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-12 bg-gold-light" />
          <span className="text-gold text-lg">✦</span>
          <div className="h-px w-12 bg-gold-light" />
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-xs tracking-ultra-wide uppercase text-gold font-light">{s.label}</span>
        </div>

        <h1 className="font-serif text-4xl font-light text-charcoal mb-4">{s.heading}</h1>
        <p className="text-muted font-light leading-relaxed mb-10">{s.sub}</p>

        {!ready ? (
          <div className="flex items-center justify-center gap-3">
            {[0, 150, 300].map((d) => (
              <div key={d} className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
            ))}
          </div>
        ) : (
          <button
            onClick={() => router.push(`/dashboard/${id}`)}
            className="bg-charcoal text-cream px-10 py-4 text-xs tracking-widest uppercase hover:bg-gold transition-all duration-300"
          >
            {s.btn}
          </button>
        )}
      </div>
    </main>
  );
}
