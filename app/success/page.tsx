"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SuccessContent() {
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
    <main className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-lg w-full">
        <div className="text-5xl mb-8 fade-in">✦</div>

        <div className="flex items-center gap-4 justify-center mb-6 fade-in">
          <div className="h-px w-12 bg-gold-light" />
          <span className="text-xs tracking-ultra-wide uppercase text-gold font-light">
            Payment Confirmed
          </span>
          <div className="h-px w-12 bg-gold-light" />
        </div>

        <h1 className="font-serif text-5xl font-light text-charcoal mb-4 fade-in-delay-1">
          Your invitation
          <br />
          <span className="italic text-gold">is ready.</span>
        </h1>

        <p className="text-muted font-light leading-relaxed mb-12 fade-in-delay-2">
          Share the link below with your guests. It&apos;s permanent — they can
          open it on any device, any time.
        </p>

        {loading ? (
          <div className="border border-gold-light p-8 fade-in-delay-2">
            <div className="flex items-center justify-center gap-3">
              <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
            <p className="text-muted text-sm mt-4 font-light">
              Generating your link…
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
              {copied ? "✓ Copied to Clipboard!" : "Copy Your Invitation Link"}
            </button>
            <a
              href={inviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full border border-gold-light text-charcoal py-3 text-xs tracking-widest uppercase hover:border-gold transition-all duration-300"
            >
              Preview Your Invitation →
            </a>
          </div>
        ) : (
          <div className="border border-red-100 p-6 fade-in-delay-2">
            <p className="text-muted text-sm font-light">
              Your link is being generated — it will arrive at your email
              shortly. If you don&apos;t receive it in 5 minutes, please contact
              us.
            </p>
          </div>
        )}

        <Link
          href="/"
          className="inline-block mt-12 text-xs tracking-widest text-muted uppercase hover:text-gold transition-colors border-b border-gold-light pb-px font-sans font-light"
        >
          ← Back to Forevermore
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
