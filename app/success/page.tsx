"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { QRCodeSVG } from "qrcode.react";

function SuccessContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);
  const [dashboardUrl, setDashboardUrl] = useState<string | null>(null);
  const [plan, setPlan] = useState<string>("standard");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(!!navigator.share);
  }, []);

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
          setDashboardUrl(data.inviteUrl.replace("/invite/", "/dashboard/"));
          setPlan(data.plan ?? "standard");
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

  const shareMsg = (url: string) => encodeURIComponent(`You're invited! 💌 Open your wedding invitation: ${url}`);

  function shareWhatsApp(url: string) { window.open(`https://wa.me/?text=${shareMsg(url)}`, "_blank"); }
  function shareTelegram(url: string) { window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent("You're invited! 💌 Open your wedding invitation:")}`, "_blank"); }
  function shareSMS(url: string) { window.open(`sms:?body=${shareMsg(url)}`); }
  function shareEmail(url: string) { window.open(`mailto:?subject=${encodeURIComponent("You're invited 💌")}&body=${shareMsg(url)}`); }
  async function shareNative(url: string) {
    try { await navigator.share({ title: "Wedding Invitation", text: "You're invited! 💌", url }); } catch {}
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
            {/* Link display */}
            <div className="border border-gold bg-white p-4 text-left flex items-center gap-3">
              <span className="flex-1 text-sm text-charcoal font-sans truncate">{inviteUrl}</span>
            </div>

            {/* Copy */}
            <button onClick={copyLink} className="w-full bg-gold text-white py-4 text-sm tracking-widest uppercase hover:bg-gold-dark transition-all duration-300">
              {copied ? t.copiedToClipboard : t.copyYourLink}
            </button>

            {/* Share via */}
            <div>
              <p className="text-[10px] tracking-ultra-wide uppercase text-muted font-light mb-3">Share via</p>
              <div className="grid grid-cols-4 gap-2">

                {/* WhatsApp */}
                <button onClick={() => shareWhatsApp(inviteUrl)}
                  className="flex flex-col items-center gap-1.5 border border-gold-light py-3 px-2 hover:border-gold transition-all group">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#25D366] group-hover:scale-110 transition-transform">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.533 5.851L.057 23.928l6.235-1.637A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.006-1.368l-.359-.214-3.72.976.994-3.634-.234-.373A9.819 9.819 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z"/>
                  </svg>
                  <span className="text-[9px] tracking-wider text-muted uppercase">WhatsApp</span>
                </button>

                {/* Telegram */}
                <button onClick={() => shareTelegram(inviteUrl)}
                  className="flex flex-col items-center gap-1.5 border border-gold-light py-3 px-2 hover:border-gold transition-all group">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#2AABEE] group-hover:scale-110 transition-transform">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/>
                  </svg>
                  <span className="text-[9px] tracking-wider text-muted uppercase">Telegram</span>
                </button>

                {/* SMS */}
                <button onClick={() => shareSMS(inviteUrl)}
                  className="flex flex-col items-center gap-1.5 border border-gold-light py-3 px-2 hover:border-gold transition-all group">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                  <span className="text-[9px] tracking-wider text-muted uppercase">Messages</span>
                </button>

                {/* Email */}
                <button onClick={() => shareEmail(inviteUrl)}
                  className="flex flex-col items-center gap-1.5 border border-gold-light py-3 px-2 hover:border-gold transition-all group">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span className="text-[9px] tracking-wider text-muted uppercase">Email</span>
                </button>
              </div>

              {/* Native share — mobile only */}
              {canNativeShare && (
                <button onClick={() => shareNative(inviteUrl)}
                  className="w-full mt-2 border border-gold-light py-3 text-[10px] tracking-widest uppercase text-muted hover:border-gold hover:text-gold transition-all flex items-center justify-center gap-2">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                  </svg>
                  More options
                </button>
              )}
            </div>

            {/* QR code — Standard and Pro only */}
            {plan !== "basic" && (
              <div className="border border-gold-light p-6 text-center">
                <p className="text-[10px] tracking-ultra-wide uppercase text-gold font-light mb-4">QR Code</p>
                <div className="flex justify-center">
                  <QRCodeSVG value={inviteUrl} size={148} fgColor="#1C1917" bgColor="#FAF8F4" level="M" />
                </div>
                <p className="text-xs text-muted font-light mt-3">Guests can scan this to open your invitation</p>
              </div>
            )}

            {/* Preview */}
            <a href={inviteUrl} target="_blank" rel="noopener noreferrer"
              className="block w-full border border-gold-light text-charcoal py-3 text-xs tracking-widest uppercase hover:border-gold transition-all duration-300">
              {t.previewInvitation}
            </a>

            {/* Dashboard — Standard and Pro only */}
            {dashboardUrl && plan !== "basic" && (
              <a href={dashboardUrl} target="_blank" rel="noopener noreferrer"
                className="block w-full border border-gold text-gold py-3 text-xs tracking-widest uppercase hover:bg-gold hover:text-white transition-all duration-300 text-center">
                View RSVP Dashboard →
              </a>
            )}
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
