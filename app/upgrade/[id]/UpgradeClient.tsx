"use client";

import { useState } from "react";
import Link from "next/link";

interface Invite {
  id: string;
  partner1: string;
  partner2: string;
  plan: string;
  language?: string;
}

function getStrings(lang?: string) {
  if (lang === "cs") return {
    label: "Upgrade balíčku",
    heading: "Odemkněte více funkcí",
    sub: "Doplaťte pouze rozdíl a okamžitě získejte přístup k dalším funkcím.",
    popular: "Nejoblíbenější",
    payBtn: (price: string) => `Doplatit ${price}`,
    features: {
      standard: ["Animované šablony", "Živý přehled RSVP", "QR kód"],
      pro: ["Všechny šablony včetně videa", "Živý přehled RSVP", "QR kód", "Vlastní doménový odkaz", "Prioritní podpora"],
    },
    diffLabel: "doplatek",
    backLabel: "Zpět na přehled",
    loading: "Přesměrování…",
  };
  if (lang === "sk") return {
    label: "Upgrade balíka",
    heading: "Odomknite viac funkcií",
    sub: "Doplatte iba rozdiel a okamžite získate prístup k ďalším funkciám.",
    popular: "Najpopulárnejší",
    payBtn: (price: string) => `Doplatiť ${price}`,
    features: {
      standard: ["Animované šablóny", "Živý prehľad RSVP", "QR kód"],
      pro: ["Všetky šablóny vrátane videa", "Živý prehľad RSVP", "QR kód", "Vlastný doménový odkaz", "Prioritná podpora"],
    },
    diffLabel: "doplatok",
    backLabel: "Späť na prehľad",
    loading: "Presmerovanie…",
  };
  return {
    label: "Upgrade Plan",
    heading: "Unlock more features",
    sub: "Pay only the difference and instantly gain access to additional features.",
    popular: "Most Popular",
    payBtn: (price: string) => `Pay ${price} more`,
    features: {
      standard: ["Animated templates", "Live RSVP dashboard", "QR code"],
      pro: ["All templates including video", "Live RSVP dashboard", "QR code", "Custom domain link", "Priority support"],
    },
    diffLabel: "upgrade",
    backLabel: "Back to dashboard",
    loading: "Redirecting…",
  };
}

const TIERS = [
  {
    key: "standard",
    tier: "Standard",
    name: { en: "Premium", cs: "Prémiový", sk: "Prémiové" },
    diffEur: "€20",
    diffCzk: "491 Kč",
    popular: true,
  },
  {
    key: "pro",
    tier: "Pro",
    name: { en: "Luxury", cs: "Luxusní", sk: "Luxusné" },
    diffEur: "€60",
    diffCzk: "1 491 Kč",
    popular: false,
  },
];

export default function UpgradeClient({ invite }: { invite: Invite }) {
  const lang = invite.language ?? "en";
  const s = getStrings(lang);
  const isCzk = lang === "cs";
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function handleUpgrade(newPlan: string) {
    setLoading(newPlan);
    setError("");
    try {
      const res = await fetch("/api/create-upgrade-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviteId: invite.id, newPlan }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error ?? "Something went wrong.");
        setLoading(null);
      }
    } catch {
      setError("Network error. Please try again.");
      setLoading(null);
    }
  }

  return (
    <main className="min-h-screen bg-cream px-6 py-16 flex flex-col items-center">
      <div className="max-w-2xl w-full">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gold-light" />
            <span className="text-xs tracking-ultra-wide uppercase text-gold font-sans font-light">{s.label}</span>
            <div className="h-px w-12 bg-gold-light" />
          </div>
          <h1 className="font-serif text-4xl font-light text-charcoal mb-3">{s.heading}</h1>
          <p className="text-muted font-light text-sm leading-relaxed max-w-sm mx-auto">{s.sub}</p>
          <p className="font-serif italic text-gold mt-2">{invite.partner1} &amp; {invite.partner2}</p>
        </div>

        {/* Upgrade cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch mb-8">
          {TIERS.map((tier) => {
            const diff = isCzk ? tier.diffCzk : tier.diffEur;
            const tierName = tier.name[lang as keyof typeof tier.name] ?? tier.name.en;
            const features = s.features[tier.key as keyof typeof s.features];

            return (
              <div
                key={tier.key}
                className={`relative border bg-white flex flex-col ${
                  tier.popular ? "border-gold shadow-[0_4px_24px_rgba(184,150,12,0.15)]" : "border-gold-light"
                }`}
              >
                {/* Corner accents */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-gold-light pointer-events-none" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-gold-light pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-gold-light pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-gold-light pointer-events-none" />

                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-white text-[9px] tracking-ultra-wide uppercase px-3 py-1 whitespace-nowrap">
                    {s.popular}
                  </div>
                )}

                <div className="p-7 pb-5 border-b border-gold-light/50">
                  <p className="text-[10px] tracking-ultra-wide uppercase text-gold font-light mb-1">{tier.tier}</p>
                  <p className="font-serif text-xl text-charcoal mb-4">{tierName}</p>
                  <div className="font-serif text-4xl text-charcoal font-light">+{diff}</div>
                  <p className="text-muted text-[10px] font-light tracking-wider mt-1">{s.diffLabel}</p>
                </div>

                <div className="p-7 pt-5 flex flex-col flex-1">
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {features.map((feat) => (
                      <li key={feat} className="flex items-center gap-3 text-sm text-muted font-light">
                        <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  {error && loading === tier.key && (
                    <p className="text-red-400 text-xs mb-3 text-center">{error}</p>
                  )}

                  <button
                    onClick={() => handleUpgrade(tier.key)}
                    disabled={loading !== null}
                    className={`w-full py-3 text-xs tracking-widest uppercase transition-all duration-300 disabled:opacity-50 ${
                      tier.popular
                        ? "bg-charcoal text-cream hover:bg-gold"
                        : "border border-charcoal text-charcoal hover:border-gold hover:text-gold"
                    }`}
                  >
                    {loading === tier.key ? s.loading : s.payBtn(diff)}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href={`/dashboard/${invite.id}`}
            className="text-xs tracking-widest text-muted uppercase hover:text-gold transition-colors border-b border-gold-light pb-px font-sans font-light"
          >
            ← {s.backLabel}
          </Link>
        </div>
      </div>
    </main>
  );
}
