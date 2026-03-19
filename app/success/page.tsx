"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

function SuccessContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) return;

    let attempts = 0;
    const maxAttempts = 15;

    const poll = async () => {
      try {
        const res = await fetch(
          `/api/invite-by-session?session_id=${sessionId}`
        );
        const data = await res.json();

        if (data.inviteUrl) {
          setInviteUrl(data.inviteUrl);
          setLoading(false);
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(poll, 1500);
        } else {
          setLoading(false);
        }
      } catch {
        setLoading(false);
      }
    };

    poll();
  }, [sessionId]);

  function copyLink() {
    if (!inviteUrl) return;
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <main className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Subtle background botanical */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-[0.04]">
          <circle cx="300" cy="300" r="240" stroke="#B8960C" strokeWidth="1" />
          <circle cx="300" cy="300" r="220" stroke="#B8960C" strokeWidth="0.4" />
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 360) / 24;
            const rad = (angle * Math.PI) / 180;
            const cx = 300 + 240 * Math.cos(rad);
            const cy = 300 + 240 * Math.sin(rad);
            return (
              <g key={i} transform={`translate(${cx},${cy}) rotate(${angle + 90})`}>
                <ellipse rx="3.5" ry="10" fill="#B8960C" />
              </g>
            );
          })}
        </svg>
      </div>

      <div className="absolute top-6 right-8 z-10">
        <LanguageSwitcher />
      </div>

      <div className="max-w-lg w-full relative z-10">
        {/* Gold star ornament */}
        <div className="flex items-center justify-center gap-4 mb-8 fade-in">
          <div className="h-px w-12 bg-gold-light" />
          <span className="text-gold text-lg">✦</span>
          <div className="h-px w-12 bg-gold-light" />
        </div>

        <div className="flex items-center gap-4 justify-center mb-6 fade-in">
          <span className="text-xs tracking-ultra-wide uppercase text-gold font-light">
            {t.paymentConfirmed}
          </span>
        </div>

        <h1 className="font-serif text-5xl font-light text-charcoal mb-4 fade-in-delay-1">
          {t.invitationReady1}
          <br />
          <span className="italic text-gold">{t.invitationReady2}</span>
        </h1>

        <p className="text-muted font-light leading-relaxed mb-12 fade-in-delay-2 max-w-md mx-auto">
          {t.shareLink}
        </p>

        {loading ? (
          <div className="border border-gold-light p-8 fade-in-delay-2">
            <div className="flex items-center justify-center gap-3">
              <div
                className="w-2 h-2 bg-gold rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-2 h-2 bg-gold rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-2 h-2 bg-gold rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
            <p className="text-muted text-sm mt-4 font-light">
              {t.generatingLink}
            </p>
          </div>
        ) : inviteUrl ? (
          <div className="fade-in-delay-2 space-y-4">
            <div className="border border-gold bg-white p-4 text-left flex items-center gap-3">
              <span className="flex-1 text-sm text-charcoal font-sans truncate">
                {inviteUrl}
              </span>
            </div>
            <button
              onClick={copyLink}
              className="w-full bg-gold text-white py-4 text-sm tracking-widest uppercase hover:bg-gold-dark transition-all duration-300"
            >
              {copied ? t.copiedToClipboard : t.copyYourLink}
            </button>
            <a
              href={inviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full border border-gold-light text-charcoal py-3 text-xs tracking-widest uppercase hover:border-gold transition-all duration-300"
            >
              {t.previewInvitation}
            </a>
          </div>
        ) : (
          <div className="border border-red-100 p-6 fade-in-delay-2">
            <p className="text-muted text-sm font-light">{t.linkComingSoon}</p>
          </div>
        )}

        <Link
          href="/"
          className="inline-block mt-12 text-xs tracking-widest text-muted uppercase hover:text-gold transition-colors border-b border-gold-light pb-px font-sans font-light"
        >
          {t.backToForevermore}
        </Link>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
