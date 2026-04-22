"use client";

import { useState, useEffect } from "react";
import type { InviteRecord } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageProvider } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { Lang } from "@/lib/translations";
import InviteIntro from "@/components/InviteIntro";
import InvitePreview from "@/components/InvitePreview";

function InviteContent({ inv }: { inv: InviteRecord }) {
  const { t } = useLanguage();

  // RSVP state
  const [step, setStep] = useState<"idle" | "form" | "submitting" | "done">("idle");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [plusOnes, setPlusOnes] = useState(0);
  const [attendingCount, setAttendingCount] = useState<number | null>(null);
  const [error, setError] = useState("");

  // Restore state from localStorage + fetch count
  useEffect(() => {
    const saved = localStorage.getItem(`rsvp_${inv.id}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAttending(parsed.attending);
        setName(parsed.name ?? "");
        setStep("done");
      } catch {}
    }
    fetch(`/api/rsvp?invite_id=${inv.id}`)
      .then((r) => r.json())
      .then((d) => setAttendingCount(d.stats?.attending ?? 0))
      .catch(() => {});
  }, [inv.id]);

  async function submitRsvp() {
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (attending === null) { setError("Please choose yes or no."); return; }
    setError("");
    setStep("submitting");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invite_id: inv.id, name, attending, message, plus_ones: plusOnes }),
      });
      const data = await res.json();
      if (data.success) {
        setAttendingCount(data.attending_count);
        localStorage.setItem(`rsvp_${inv.id}`, JSON.stringify({ attending, name }));
        setStep("done");
      } else {
        setError("Something went wrong. Please try again.");
        setStep("form");
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setStep("form");
    }
  }

  return (
    <main className="min-h-screen bg-cream flex flex-col items-center justify-center px-4 py-16">
      {/* Ambient background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(201,169,110,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(201,169,110,0.04) 0%, transparent 50%)",
        }}
      />

      {/* Language switcher */}
      <div className="absolute top-6 right-8">
        <LanguageSwitcher />
      </div>

      {/* Invitation card — renders the template the couple chose */}
      <div className="w-full max-w-lg fade-in">
        <InvitePreview data={inv} animate />
      </div>

      {/* ── RSVP Section ─────────────────────────────────────────────── */}
      <div className="w-full max-w-lg mt-8 fade-in-delay-3">

        {/* Attending count badge */}
        {attendingCount !== null && attendingCount > 0 && (
          <p className="text-center text-xs tracking-ultra-wide uppercase text-gold font-sans font-light mb-6">
            ✦ {attendingCount} {attendingCount === 1 ? "guest" : "guests"} attending
          </p>
        )}

        {step === "idle" && (
          <div className="bg-white shadow-lg border-t-2 border-gold">
            <div className="px-10 py-8 text-center">
              <p className="text-xs tracking-ultra-wide uppercase text-gold font-sans font-light mb-2">RSVP</p>
              <p className="font-serif text-2xl font-light text-charcoal mb-6">Will you be joining us?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => { setAttending(true); setStep("form"); }}
                  className="flex-1 bg-gold text-white py-3.5 text-xs tracking-widest uppercase hover:bg-gold-dark transition-all duration-300"
                >
                  Joyfully accepts ✓
                </button>
                <button
                  onClick={() => { setAttending(false); setStep("form"); }}
                  className="flex-1 border border-gold-light text-charcoal py-3.5 text-xs tracking-widest uppercase hover:border-gold transition-all duration-300"
                >
                  Declines with regrets
                </button>
              </div>
            </div>
          </div>
        )}

        {step === "form" && (
          <div className="bg-white shadow-lg border-t-2 border-gold">
            <div className="px-10 py-8">
              <p className="text-xs tracking-ultra-wide uppercase text-gold font-sans font-light text-center mb-6">
                {attending ? "Joyfully Accepts ✓" : "Declines with regrets"}
              </p>

              {/* Name */}
              <div className="mb-4">
                <label className="block text-[10px] tracking-widest uppercase text-muted font-sans mb-1.5">Your name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="w-full border border-gold-light px-4 py-2.5 text-sm font-sans text-charcoal focus:outline-none focus:border-gold bg-cream/30 placeholder:text-muted/40"
                />
              </div>

              {/* Plus ones (only if attending) */}
              {attending && (
                <div className="mb-4">
                  <label className="block text-[10px] tracking-widest uppercase text-muted font-sans mb-1.5">Additional guests</label>
                  <select
                    value={plusOnes}
                    onChange={(e) => setPlusOnes(Number(e.target.value))}
                    className="w-full border border-gold-light px-4 py-2.5 text-sm font-sans text-charcoal focus:outline-none focus:border-gold bg-cream/30"
                  >
                    {[0, 1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>{n === 0 ? "Just me" : `+${n} guest${n > 1 ? "s" : ""}`}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Message */}
              <div className="mb-6">
                <label className="block text-[10px] tracking-widest uppercase text-muted font-sans mb-1.5">
                  Message for the couple <span className="normal-case">(optional)</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your wishes…"
                  rows={3}
                  className="w-full border border-gold-light px-4 py-2.5 text-sm font-sans text-charcoal focus:outline-none focus:border-gold bg-cream/30 resize-none placeholder:text-muted/40"
                />
              </div>

              {error && <p className="text-red-400 text-xs font-sans mb-4 text-center">{error}</p>}

              <div className="flex gap-3">
                <button
                  onClick={() => { setStep("idle"); setName(""); setMessage(""); setPlusOnes(0); setError(""); }}
                  className="px-5 border border-gold-light text-xs tracking-widest uppercase text-muted hover:border-gold transition-all"
                >
                  Back
                </button>
                <button
                  onClick={submitRsvp}
                  className="flex-1 bg-gold text-white py-3.5 text-xs tracking-widest uppercase hover:bg-gold-dark transition-all duration-300"
                >
                  Send RSVP
                </button>
              </div>
            </div>
          </div>
        )}

        {step === "submitting" && (
          <div className="bg-white shadow-lg border-t-2 border-gold px-10 py-10 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              {[0, 150, 300].map((delay) => (
                <div key={delay} className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
              ))}
            </div>
            <p className="text-xs tracking-widest uppercase text-muted font-sans">Sending…</p>
          </div>
        )}

        {step === "done" && (
          <div className="bg-white shadow-lg border-t-2 border-gold px-10 py-10 text-center fade-in">
            {attending ? (
              <>
                <p className="text-3xl mb-3">🥂</p>
                <p className="font-serif text-2xl font-light text-charcoal mb-2">See you there!</p>
                <p className="text-sm font-sans font-light text-muted">
                  Your RSVP has been received. {attendingCount !== null && attendingCount > 1 && `${attendingCount} guests are joining the celebration.`}
                </p>
              </>
            ) : (
              <>
                <p className="text-3xl mb-3">🌸</p>
                <p className="font-serif text-2xl font-light text-charcoal mb-2">You&apos;ll be missed</p>
                <p className="text-sm font-sans font-light text-muted">Your response has been noted. Thank you for letting us know.</p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Watermark */}
      <p className="mt-10 text-xs text-muted/50 tracking-widest font-sans font-light">
        {t.createdWith}{" "}
        <span className="font-serif italic text-muted/60">Forevermore</span>
      </p>
    </main>
  );
}

function InviteWithIntro({ inv, initialLang }: { inv: InviteRecord; initialLang: Lang }) {
  const [introPlayed, setIntroPlayed] = useState(false);

  if (!introPlayed && (inv.plan === "standard" || inv.plan === "pro")) {
    return <InviteIntro plan={inv.plan} onComplete={() => setIntroPlayed(true)} partner1={inv.partner1} partner2={inv.partner2} />;
  }

  return (
    <LanguageProvider initialLang={initialLang}>
      <InviteContent inv={inv} />
    </LanguageProvider>
  );
}

export default function InvitePageClient({
  inv,
  initialLang = "en",
}: {
  inv: InviteRecord;
  initialLang?: Lang;
}) {
  return <InviteWithIntro inv={inv} initialLang={initialLang} />;
}
