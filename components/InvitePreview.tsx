"use client";

import type { InviteData } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  data: InviteData;
  animate?: boolean;
}

function ElegantPreview({ data, t }: { data: InviteData; t: ReturnType<typeof useLanguage>["t"] }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-10 py-12 text-center">
      <div className="flex items-center gap-3 mb-8 w-full">
        <div className="flex-1 h-px bg-gold-light" />
        <span className="text-xs tracking-ultra-wide uppercase text-gold font-sans font-light">{t.weddingInvitation}</span>
        <div className="flex-1 h-px bg-gold-light" />
      </div>

      <p className="text-xs tracking-ultra-wide uppercase text-muted font-sans font-light mb-4">{t.togetherForever}</p>

      <h1 className="text-4xl font-light italic text-charcoal leading-tight mb-1">
        {data.partner1 || t.partnerOnePlaceholder}
      </h1>
      <p className="text-lg text-gold font-light tracking-widest mb-1">&amp;</p>
      <h1 className="text-4xl font-light italic text-charcoal leading-tight mb-8">
        {data.partner2 || t.partnerTwoPlaceholder}
      </h1>

      <div className="flex items-center gap-3 w-full mb-8">
        <div className="flex-1 h-px bg-gold-light" />
        <span className="text-gold text-sm">✦</span>
        <div className="flex-1 h-px bg-gold-light" />
      </div>

      <p className="text-sm tracking-widest uppercase text-charcoal font-sans font-light mb-1">
        {data.date || t.datePlaceholder}
      </p>
      {data.time && (
        <p className="text-sm tracking-widest text-muted font-sans font-light mb-6">{data.time}</p>
      )}

      <p className="text-base italic text-charcoal mb-1">{data.venue || t.venuePlaceholder}</p>
      <p className="text-xs tracking-wider text-muted font-sans font-light mb-8">
        {data.location || t.locationPlaceholder}
      </p>

      {data.message && (
        <>
          <div className="flex items-center gap-3 w-full mb-6">
            <div className="flex-1 h-px bg-gold-light" />
          </div>
          <p className="text-sm italic text-muted leading-relaxed font-light">&ldquo;{data.message}&rdquo;</p>
        </>
      )}

      {data.rsvp_email && (
        <div className="mt-8 border border-gold-light px-6 py-3">
          <p className="text-xs tracking-ultra-wide uppercase text-gold font-sans font-light mb-1">RSVP</p>
          <p className="text-xs text-muted font-sans">{data.rsvp_email}</p>
        </div>
      )}
    </div>
  );
}

function JardinPreview({ data, t }: { data: InviteData; t: ReturnType<typeof useLanguage>["t"] }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-10 py-12 text-center relative">
      {/* Botanical leaf ornaments */}
      <svg className="absolute top-6 left-6 w-12 h-12 text-gold-light opacity-40" viewBox="0 0 50 50" fill="currentColor">
        <path d="M25 3 C12 15 6 28 12 42 C18 28 32 22 44 28 C32 14 25 3 25 3Z" />
        <path d="M25 3 C15 8 10 18 14 30" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.6" />
      </svg>
      <svg className="absolute top-6 right-6 w-12 h-12 text-gold-light opacity-40" viewBox="0 0 50 50" fill="currentColor" style={{ transform: "scaleX(-1)" }}>
        <path d="M25 3 C12 15 6 28 12 42 C18 28 32 22 44 28 C32 14 25 3 25 3Z" />
        <path d="M25 3 C15 8 10 18 14 30" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.6" />
      </svg>
      <svg className="absolute bottom-6 left-6 w-10 h-10 text-gold-light opacity-30" viewBox="0 0 50 50" fill="currentColor" style={{ transform: "rotate(180deg)" }}>
        <path d="M25 3 C12 15 6 28 12 42 C18 28 32 22 44 28 C32 14 25 3 25 3Z" />
      </svg>
      <svg className="absolute bottom-6 right-6 w-10 h-10 text-gold-light opacity-30" viewBox="0 0 50 50" fill="currentColor" style={{ transform: "rotate(180deg) scaleX(-1)" }}>
        <path d="M25 3 C12 15 6 28 12 42 C18 28 32 22 44 28 C32 14 25 3 25 3Z" />
      </svg>

      {/* Floral divider top */}
      <div className="flex items-center gap-3 mb-6 w-full">
        <div className="flex-1 h-px bg-gold-light" />
        <span className="text-gold font-light">✿</span>
        <div className="flex-1 h-px bg-gold-light" />
      </div>

      <p className="text-xs tracking-ultra-wide uppercase text-gold font-sans font-light mb-3">{t.weddingInvitation}</p>

      <p className="text-xs tracking-ultra-wide uppercase text-muted font-sans font-light mb-5">{t.requestPresence}</p>

      <h1 className="text-4xl font-light italic text-charcoal leading-tight mb-1">
        {data.partner1 || t.partnerOnePlaceholder}
      </h1>
      <p className="text-gold font-light tracking-widest text-xl mb-1">&amp;</p>
      <h1 className="text-4xl font-light italic text-charcoal leading-tight mb-6">
        {data.partner2 || t.partnerTwoPlaceholder}
      </h1>

      {/* Floral divider */}
      <div className="flex items-center gap-3 w-full mb-6">
        <div className="flex-1 h-px bg-gold-light" />
        <span className="text-gold font-light">✿</span>
        <div className="flex-1 h-px bg-gold-light" />
      </div>

      <p className="text-sm tracking-widest uppercase text-charcoal font-sans font-light mb-1">
        {data.date || t.datePlaceholder}
      </p>
      {data.time && (
        <p className="text-sm tracking-widest text-muted font-sans font-light mb-4">{data.time}</p>
      )}

      <p className="text-base italic text-charcoal mb-1">{data.venue || t.venuePlaceholder}</p>
      <p className="text-xs tracking-wider text-muted font-sans font-light mb-6">
        {data.location || t.locationPlaceholder}
      </p>

      {data.message && (
        <p className="text-sm italic text-muted leading-relaxed font-light mb-6">&ldquo;{data.message}&rdquo;</p>
      )}

      {data.rsvp_email && (
        <div className="border border-gold-light px-6 py-2 mt-2">
          <p className="text-xs tracking-ultra-wide uppercase text-gold font-sans font-light mb-1">RSVP</p>
          <p className="text-xs text-muted font-sans">{data.rsvp_email}</p>
        </div>
      )}
    </div>
  );
}

export default function InvitePreview({ data, animate = false }: Props) {
  const { t } = useLanguage();
  const cls = animate ? "fade-in" : "";
  const isJardin = data.template === "jardin";

  return (
    <div
      className={`relative bg-white w-full max-w-md mx-auto shadow-xl font-serif ${cls}`}
      style={{ aspectRatio: "3/4", minHeight: 480 }}
    >
      {/* Top ornament */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${isJardin ? "bg-gradient-to-r from-gold-light via-gold to-gold-light" : "bg-gold"}`} />

      {isJardin ? (
        <JardinPreview data={data} t={t} />
      ) : (
        <ElegantPreview data={data} t={t} />
      )}

      {/* Bottom ornament */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 ${isJardin ? "bg-gradient-to-r from-gold-light via-gold to-gold-light" : "bg-gold"}`} />
    </div>
  );
}
