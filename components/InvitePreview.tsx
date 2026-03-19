"use client";

import type { InviteData } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  data: InviteData;
  animate?: boolean;
}

export default function InvitePreview({ data, animate = false }: Props) {
  const { t } = useLanguage();
  const cls = animate ? "fade-in" : "";

  return (
    <div
      className={`relative bg-white w-full max-w-md mx-auto shadow-xl font-serif ${cls}`}
      style={{ aspectRatio: "3/4", minHeight: 480 }}
    >
      {/* Top ornament */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gold" />

      <div className="flex flex-col items-center justify-center h-full px-10 py-12 text-center">
        {/* Top line */}
        <div className="flex items-center gap-3 mb-8 w-full">
          <div className="flex-1 h-px bg-gold-light" />
          <span className="text-xs tracking-ultra-wide uppercase text-gold font-sans font-light">
            {t.weddingInvitation}
          </span>
          <div className="flex-1 h-px bg-gold-light" />
        </div>

        {/* Together forever label */}
        <p className="text-xs tracking-ultra-wide uppercase text-muted font-sans font-light mb-4">
          {t.togetherForever}
        </p>

        {/* Names */}
        <h1 className="text-4xl font-light italic text-charcoal leading-tight mb-1">
          {data.partner1 || t.partnerOnePlaceholder}
        </h1>
        <p className="text-lg text-gold font-light tracking-widest mb-1">&amp;</p>
        <h1 className="text-4xl font-light italic text-charcoal leading-tight mb-8">
          {data.partner2 || t.partnerTwoPlaceholder}
        </h1>

        {/* Divider */}
        <div className="flex items-center gap-3 w-full mb-8">
          <div className="flex-1 h-px bg-gold-light" />
          <span className="text-gold text-sm">✦</span>
          <div className="flex-1 h-px bg-gold-light" />
        </div>

        {/* Date & time */}
        <p className="text-sm tracking-widest uppercase text-charcoal font-sans font-light mb-1">
          {data.date || t.datePlaceholder}
        </p>
        {data.time && (
          <p className="text-sm tracking-widest text-muted font-sans font-light mb-6">
            {data.time}
          </p>
        )}

        {/* Venue */}
        <p className="text-base italic text-charcoal mb-1">
          {data.venue || t.venuePlaceholder}
        </p>
        <p className="text-xs tracking-wider text-muted font-sans font-light mb-8">
          {data.location || t.locationPlaceholder}
        </p>

        {/* Message */}
        {data.message && (
          <>
            <div className="flex items-center gap-3 w-full mb-6">
              <div className="flex-1 h-px bg-gold-light" />
            </div>
            <p className="text-sm italic text-muted leading-relaxed font-light">
              &ldquo;{data.message}&rdquo;
            </p>
          </>
        )}

        {/* RSVP */}
        {data.rsvp_email && (
          <div className="mt-8 border border-gold-light px-6 py-3">
            <p className="text-xs tracking-ultra-wide uppercase text-gold font-sans font-light mb-1">
              RSVP
            </p>
            <p className="text-xs text-muted font-sans">{data.rsvp_email}</p>
          </div>
        )}
      </div>

      {/* Bottom ornament */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold" />
    </div>
  );
}
