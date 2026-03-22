"use client";

import type { InviteData } from "@/lib/types";

export interface TemplateT {
  weddingInvitation: string;
  partnerOnePlaceholder: string;
  partnerTwoPlaceholder: string;
  datePlaceholder: string;
  venuePlaceholder: string;
  locationPlaceholder: string;
  togetherForever: string;
  together: string;
  anInvitation: string;
  rsvp: string;
  requestPresence: string;
  togetherWithFamilies: string;
}

const DEFAULT_T: TemplateT = {
  weddingInvitation: "Wedding Invitation",
  partnerOnePlaceholder: "Partner One",
  partnerTwoPlaceholder: "Partner Two",
  datePlaceholder: "Day, Month Date, Year",
  venuePlaceholder: "The Venue Name",
  locationPlaceholder: "City, Country",
  togetherForever: "Together Forever",
  together: "Together",
  anInvitation: "An Invitation",
  rsvp: "RSVP",
  requestPresence: "Request the honour of your presence",
  togetherWithFamilies: "Together with their families",
};

type TP = { data: InviteData; t?: TemplateT };

const P1 = (d: InviteData, t: TemplateT) => d.partner1 || t.partnerOnePlaceholder;
const P2 = (d: InviteData, t: TemplateT) => d.partner2 || t.partnerTwoPlaceholder;
const DATE = (d: InviteData, t: TemplateT) => d.date || t.datePlaceholder;
const VENUE = (d: InviteData, t: TemplateT) => d.venue || t.venuePlaceholder;
const LOC = (d: InviteData, t: TemplateT) => d.location || t.locationPlaceholder;

// ── 1. Élégant ─────────────────────────────────────────────────────────────
export function Elegant({ data: d, t: tProp }: TP) {
  const t = tProp ?? DEFAULT_T;
  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-center px-10 py-10 text-center">
      <div className="flex items-center gap-3 w-full mb-7">
        <div className="flex-1 h-px bg-[#D4B86A]" />
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#B8960C] font-sans font-light">{t.weddingInvitation}</span>
        <div className="flex-1 h-px bg-[#D4B86A]" />
      </div>
      <h1 className="font-serif text-4xl font-light italic text-[#1C1917] leading-tight mb-0.5">{P1(d, t)}</h1>
      <p className="text-[#B8960C] tracking-widest text-xl mb-0.5">&amp;</p>
      <h1 className="font-serif text-4xl font-light italic text-[#1C1917] leading-tight mb-7">{P2(d, t)}</h1>
      <div className="flex items-center gap-3 w-full mb-7">
        <div className="flex-1 h-px bg-[#D4B86A]" />
        <span className="text-[#B8960C] text-xs">✦</span>
        <div className="flex-1 h-px bg-[#D4B86A]" />
      </div>
      <p className="text-[11px] tracking-[0.2em] uppercase text-[#1C1917] font-sans font-light mb-1">{DATE(d, t)}</p>
      {d.time && <p className="text-[11px] tracking-wider text-[#6B6359] font-sans font-light mb-5">{d.time}</p>}
      <p className="font-serif italic text-[#1C1917] text-base mb-1">{VENUE(d, t)}</p>
      <p className="text-[11px] tracking-wider text-[#6B6359] font-sans font-light mb-6">{LOC(d, t)}</p>
      {d.message && <p className="font-serif italic text-[#6B6359] text-sm leading-relaxed mb-5">&ldquo;{d.message}&rdquo;</p>}
      {d.rsvp_email && (
        <div className="border border-[#D4B86A] px-5 py-2 mt-1">
          <p className="text-[9px] tracking-[0.3em] uppercase text-[#B8960C] font-sans mb-1">{t.rsvp}</p>
          <p className="text-[10px] text-[#6B6359] font-sans">{d.rsvp_email}</p>
        </div>
      )}
    </div>
  );
}

// ── 2. Jardin ──────────────────────────────────────────────────────────────
export function Jardin({ data: d, t: tProp }: TP) {
  const t = tProp ?? DEFAULT_T;
  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-center px-10 py-10 text-center relative">
      {[["top-4 left-4", ""], ["top-4 right-4", "scaleX(-1)"], ["bottom-4 left-4", "scaleY(-1)"], ["bottom-4 right-4", "scale(-1)"]].map(([pos, tf]) => (
        <svg key={pos} className={`absolute ${pos} w-10 h-10 text-[#D4B86A] opacity-50`} viewBox="0 0 50 50" fill="currentColor" style={{ transform: tf }}>
          <path d="M25 3 C12 15 6 28 12 42 C18 28 32 22 44 28 C32 14 25 3 25 3Z" />
          <path d="M25 3 C15 8 10 18 14 30" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.7" />
        </svg>
      ))}
      <div className="flex items-center gap-2 w-full mb-5">
        <div className="flex-1 h-px bg-[#D4B86A]" /><span className="text-[#B8960C]">✿</span><div className="flex-1 h-px bg-[#D4B86A]" />
      </div>
      <p className="text-[9px] tracking-[0.3em] uppercase text-[#B8960C] font-sans font-light mb-5">{t.weddingInvitation}</p>
      <h1 className="font-serif text-4xl font-light italic text-[#1C1917] leading-tight mb-0.5">{P1(d, t)}</h1>
      <p className="text-[#B8960C] tracking-widest text-xl mb-0.5">&amp;</p>
      <h1 className="font-serif text-4xl font-light italic text-[#1C1917] leading-tight mb-5">{P2(d, t)}</h1>
      <div className="flex items-center gap-2 w-full mb-5">
        <div className="flex-1 h-px bg-[#D4B86A]" /><span className="text-[#B8960C]">✿</span><div className="flex-1 h-px bg-[#D4B86A]" />
      </div>
      <p className="text-[11px] tracking-[0.2em] uppercase text-[#1C1917] font-sans font-light mb-1">{DATE(d, t)}</p>
      {d.time && <p className="text-[11px] tracking-wider text-[#6B6359] font-sans font-light mb-4">{d.time}</p>}
      <p className="font-serif italic text-[#1C1917] text-base mb-1">{VENUE(d, t)}</p>
      <p className="text-[11px] tracking-wider text-[#6B6359] font-sans font-light mb-5">{LOC(d, t)}</p>
      {d.message && <p className="font-serif italic text-[#6B6359] text-sm leading-relaxed mb-4">&ldquo;{d.message}&rdquo;</p>}
      {d.rsvp_email && (
        <div className="border border-[#D4B86A] px-5 py-2">
          <p className="text-[9px] tracking-[0.3em] uppercase text-[#B8960C] font-sans mb-0.5">{t.rsvp}</p>
          <p className="text-[10px] text-[#6B6359] font-sans">{d.rsvp_email}</p>
        </div>
      )}
    </div>
  );
}

// ── 3. Lumière (Art Deco) ──────────────────────────────────────────────────
export function Lumiere({ data: d, t: tProp }: TP) {
  const t = tProp ?? DEFAULT_T;
  const rays = Array.from({ length: 12 });
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 py-10 text-center relative" style={{ background: "#FDFAF4" }}>
      {/* Outer geometric border */}
      <div className="absolute inset-4 border border-[#B8960C] opacity-30 pointer-events-none" />
      <div className="absolute inset-6 border border-[#B8960C] opacity-15 pointer-events-none" />
      {/* Corner diamonds */}
      {[["top-4 left-4", ""], ["top-4 right-4", "rotate-90"], ["bottom-4 left-4", "rotate-270"], ["bottom-4 right-4", "rotate-180"]].map(([pos, _]) => (
        <svg key={pos} className={`absolute ${pos} w-5 h-5`} viewBox="0 0 20 20">
          <rect x="5" y="5" width="10" height="10" fill="none" stroke="#B8960C" strokeWidth="0.8" transform="rotate(45 10 10)" />
        </svg>
      ))}
      {/* Sunburst */}
      <svg width="80" height="50" viewBox="0 0 80 50" className="mb-4">
        {rays.map((_, i) => {
          const angle = (i * 180) / 11 - 90;
          const rad = (angle * Math.PI) / 180;
          return <line key={i} x1="40" y1="40" x2={40 + 36 * Math.cos(rad)} y2={40 + 36 * Math.sin(rad)} stroke="#B8960C" strokeWidth={i % 3 === 0 ? "1.2" : "0.6"} opacity={i % 3 === 0 ? "0.9" : "0.5"} />;
        })}
        <circle cx="40" cy="40" r="4" fill="none" stroke="#B8960C" strokeWidth="0.8" />
        <circle cx="40" cy="40" r="1.5" fill="#B8960C" />
      </svg>
      <p className="text-[9px] tracking-[0.4em] uppercase text-[#B8960C] font-sans font-light mb-4">{t.weddingInvitation}</p>
      <h1 className="font-serif text-3xl font-light tracking-wider text-[#1C1917] mb-0.5">{P1(d, t)}</h1>
      <p className="text-[#B8960C] tracking-[0.4em] text-sm font-sans font-light mb-0.5">— &amp; —</p>
      <h1 className="font-serif text-3xl font-light tracking-wider text-[#1C1917] mb-6">{P2(d, t)}</h1>
      {/* Diamond rule */}
      <div className="flex items-center gap-2 w-full mb-5">
        <div className="flex-1 h-px bg-[#D4B86A] opacity-60" />
        <svg width="12" height="12" viewBox="0 0 12 12"><rect x="1" y="1" width="10" height="10" fill="#B8960C" transform="rotate(45 6 6)" /></svg>
        <div className="flex-1 h-px bg-[#D4B86A] opacity-60" />
      </div>
      <p className="text-[11px] tracking-[0.25em] uppercase text-[#1C1917] font-sans font-light mb-1">{DATE(d, t)}</p>
      {d.time && <p className="text-[11px] tracking-wider text-[#6B6359] font-sans font-light mb-4">{d.time}</p>}
      <p className="font-serif text-base text-[#1C1917] mb-0.5">{VENUE(d, t)}</p>
      <p className="text-[11px] tracking-wider text-[#6B6359] font-sans mb-4">{LOC(d, t)}</p>
      {d.message && <p className="font-serif italic text-[#6B6359] text-sm leading-relaxed mb-4">&ldquo;{d.message}&rdquo;</p>}
      {d.rsvp_email && (
        <div className="border border-[#D4B86A] px-4 py-1.5">
          <p className="text-[8px] tracking-[0.3em] uppercase text-[#B8960C] font-sans mb-0.5">{t.rsvp}</p>
          <p className="text-[9px] text-[#6B6359] font-sans">{d.rsvp_email}</p>
        </div>
      )}
    </div>
  );
}

// ── 4. Nocturne (Dark Romance) ─────────────────────────────────────────────
export function Nocturne({ data: d, t: tProp }: TP) {
  const t = tProp ?? DEFAULT_T;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-10 py-10 text-center relative" style={{ background: "#1C1917" }}>
      {/* Moon */}
      <svg className="mb-5" width="50" height="50" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="none" stroke="#D4B86A" strokeWidth="0.8" opacity="0.5" />
        <path d="M25 8 A17 17 0 1 0 25 42 A12 12 0 1 1 25 8Z" fill="#D4B86A" opacity="0.15" />
        <path d="M32 12 A13 13 0 1 0 32 38 A10 10 0 1 1 32 12Z" fill="#D4B86A" opacity="0.2" />
      </svg>
      <div className="flex items-center gap-3 w-full mb-5">
        <div className="flex-1 h-px bg-[#D4B86A] opacity-30" />
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#D4B86A] font-sans font-light opacity-70">{t.weddingInvitation}</span>
        <div className="flex-1 h-px bg-[#D4B86A] opacity-30" />
      </div>
      <h1 className="font-serif text-4xl font-light italic leading-tight mb-0.5" style={{ color: "#F5F0E8" }}>{P1(d, t)}</h1>
      <p className="text-[#D4B86A] tracking-widest text-xl mb-0.5 opacity-80">&amp;</p>
      <h1 className="font-serif text-4xl font-light italic leading-tight mb-6" style={{ color: "#F5F0E8" }}>{P2(d, t)}</h1>
      <div className="flex items-center gap-3 w-full mb-6">
        <div className="flex-1 h-px bg-[#D4B86A] opacity-30" />
        <span className="text-[#D4B86A] text-xs opacity-60">✦</span>
        <div className="flex-1 h-px bg-[#D4B86A] opacity-30" />
      </div>
      <p className="text-[11px] tracking-[0.2em] uppercase font-sans font-light mb-1" style={{ color: "#C8B99A" }}>{DATE(d, t)}</p>
      {d.time && <p className="text-[11px] tracking-wider font-sans font-light mb-4" style={{ color: "#8A7A6A" }}>{d.time}</p>}
      <p className="font-serif italic text-base mb-1" style={{ color: "#C8B99A" }}>{VENUE(d, t)}</p>
      <p className="text-[11px] tracking-wider font-sans font-light mb-4" style={{ color: "#8A7A6A" }}>{LOC(d, t)}</p>
      {d.message && <p className="font-serif italic text-sm leading-relaxed mb-4" style={{ color: "#8A7A6A" }}>&ldquo;{d.message}&rdquo;</p>}
      {d.rsvp_email && (
        <div className="mt-2 border px-5 py-2" style={{ borderColor: "#D4B86A33" }}>
          <p className="text-[9px] tracking-[0.3em] uppercase text-[#D4B86A] font-sans mb-0.5 opacity-70">{t.rsvp}</p>
          <p className="text-[10px] font-sans" style={{ color: "#8A7A6A" }}>{d.rsvp_email}</p>
        </div>
      )}
    </div>
  );
}

// ── 5. Bloom (Floral Wreath) ───────────────────────────────────────────────
export function Bloom({ data: d, t: tProp }: TP) {
  const t = tProp ?? DEFAULT_T;
  const petals = Array.from({ length: 18 });
  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-center px-6 py-8 text-center relative">
      <div className="relative flex items-center justify-center mb-4">
        {/* Wreath */}
        <svg width="200" height="200" viewBox="0 0 200 200" className="absolute">
          {petals.map((_, i) => {
            const angle = (i * 360) / petals.length;
            const rad = (angle * Math.PI) / 180;
            const cx = 100 + 82 * Math.cos(rad);
            const cy = 100 + 82 * Math.sin(rad);
            const isLeaf = i % 3 === 0;
            return isLeaf ? (
              <ellipse key={i} cx={cx} cy={cy} rx="5" ry="10" fill="#B8960C" opacity="0.3" transform={`rotate(${angle + 90} ${cx} ${cy})`} />
            ) : (
              <circle key={i} cx={cx} cy={cy} r="4" fill="#D4B86A" opacity={i % 2 === 0 ? "0.4" : "0.25"} />
            );
          })}
          <circle cx="100" cy="100" r="68" fill="none" stroke="#D4B86A" strokeWidth="0.5" opacity="0.4" />
        </svg>
        {/* Content inside wreath */}
        <div className="relative z-10 flex flex-col items-center justify-center w-36 h-36">
          <p className="text-[8px] tracking-[0.25em] uppercase text-[#B8960C] font-sans font-light mb-2">{t.together}</p>
          <h1 className="font-serif text-xl font-light italic text-[#1C1917] leading-tight">{P1(d, t)}</h1>
          <p className="text-[#B8960C] tracking-widest text-base">&amp;</p>
          <h1 className="font-serif text-xl font-light italic text-[#1C1917] leading-tight">{P2(d, t)}</h1>
        </div>
      </div>
      <div className="flex items-center gap-3 w-full mb-4">
        <div className="flex-1 h-px bg-[#D4B86A] opacity-40" />
        <span className="text-[#B8960C] opacity-60 text-xs">✿</span>
        <div className="flex-1 h-px bg-[#D4B86A] opacity-40" />
      </div>
      <p className="text-[11px] tracking-[0.2em] uppercase text-[#1C1917] font-sans font-light mb-1">{DATE(d, t)}</p>
      {d.time && <p className="text-[11px] tracking-wider text-[#6B6359] font-sans font-light mb-3">{d.time}</p>}
      <p className="font-serif italic text-[#1C1917] text-base mb-1">{VENUE(d, t)}</p>
      <p className="text-[11px] tracking-wider text-[#6B6359] font-sans font-light mb-4">{LOC(d, t)}</p>
      {d.message && <p className="font-serif italic text-[#6B6359] text-sm leading-relaxed mb-4">&ldquo;{d.message}&rdquo;</p>}
      {d.rsvp_email && (
        <div className="border border-[#D4B86A] px-4 py-1.5">
          <p className="text-[9px] tracking-[0.3em] uppercase text-[#B8960C] font-sans mb-0.5">{t.rsvp}</p>
          <p className="text-[10px] text-[#6B6359] font-sans">{d.rsvp_email}</p>
        </div>
      )}
    </div>
  );
}

// ── 6. Gatsby (Art Deco 1920s) ─────────────────────────────────────────────
export function Gatsby({ data: d, t: tProp }: TP) {
  const t = tProp ?? DEFAULT_T;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 py-8 text-center relative" style={{ background: "#FDFAF4" }}>
      {/* Layered border */}
      <div className="absolute inset-3 border-2 border-[#B8960C] opacity-20 pointer-events-none" />
      <div className="absolute inset-5 border border-[#B8960C] opacity-30 pointer-events-none" />
      {/* Corner diamonds */}
      {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map((pos) => (
        <svg key={pos} className={`absolute ${pos} w-6 h-6`} viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" fill="#B8960C" opacity="0.6" transform="rotate(45 12 12)" />
          <rect x="7" y="7" width="10" height="10" fill="#FDFAF4" opacity="0.9" transform="rotate(45 12 12)" />
        </svg>
      ))}
      {/* Fan top ornament */}
      <svg width="70" height="35" viewBox="0 0 70 35" className="mb-3">
        {Array.from({ length: 7 }).map((_, i) => {
          const angle = (i * 30) - 90;
          const rad = (angle * Math.PI) / 180;
          return <line key={i} x1="35" y1="35" x2={35 + 30 * Math.cos(rad)} y2={35 + 30 * Math.sin(rad)} stroke="#B8960C" strokeWidth={i === 3 ? "1.5" : "0.8"} opacity="0.7" />;
        })}
        <path d="M5 35 A30 30 0 0 1 65 35" fill="none" stroke="#B8960C" strokeWidth="0.8" opacity="0.5" />
      </svg>
      <p className="text-[9px] tracking-[0.4em] uppercase text-[#B8960C] font-sans font-light mb-3">{t.anInvitation}</p>
      <h1 className="font-serif text-3xl font-light tracking-widest text-[#1C1917] mb-0.5">{P1(d, t)}</h1>
      <div className="flex items-center gap-3 w-full my-2">
        <div className="flex-1 h-px bg-[#D4B86A] opacity-50" />
        <span className="text-[10px] tracking-[0.3em] text-[#B8960C] font-sans">&amp;</span>
        <div className="flex-1 h-px bg-[#D4B86A] opacity-50" />
      </div>
      <h1 className="font-serif text-3xl font-light tracking-widest text-[#1C1917] mb-5">{P2(d, t)}</h1>
      <div className="flex items-center gap-2 w-full mb-4">
        <div className="flex-1 h-px bg-[#D4B86A] opacity-40" />
        <svg width="10" height="10" viewBox="0 0 10 10"><rect x="1" y="1" width="8" height="8" fill="#B8960C" opacity="0.6" transform="rotate(45 5 5)" /></svg>
        <div className="flex-1 h-px bg-[#D4B86A] opacity-40" />
      </div>
      <p className="text-[11px] tracking-[0.2em] uppercase text-[#1C1917] font-sans font-light mb-1">{DATE(d, t)}</p>
      {d.time && <p className="text-[11px] tracking-wider text-[#6B6359] font-sans font-light mb-3">{d.time}</p>}
      <p className="font-serif italic text-[#1C1917] text-base mb-0.5">{VENUE(d, t)}</p>
      <p className="text-[11px] tracking-wider text-[#6B6359] font-sans font-light mb-3">{LOC(d, t)}</p>
      {d.message && <p className="font-serif italic text-[#6B6359] text-sm leading-relaxed mb-3">&ldquo;{d.message}&rdquo;</p>}
      {d.rsvp_email && (
        <div className="border border-[#D4B86A] px-4 py-1.5 mb-2">
          <p className="text-[8px] tracking-[0.3em] uppercase text-[#B8960C] font-sans mb-0.5">{t.rsvp}</p>
          <p className="text-[9px] text-[#6B6359] font-sans">{d.rsvp_email}</p>
        </div>
      )}
      {/* Fan bottom ornament */}
      <svg width="70" height="35" viewBox="0 0 70 35" className="mt-3" style={{ transform: "scaleY(-1)" }}>
        {Array.from({ length: 7 }).map((_, i) => {
          const angle = (i * 30) - 90;
          const rad = (angle * Math.PI) / 180;
          return <line key={i} x1="35" y1="35" x2={35 + 30 * Math.cos(rad)} y2={35 + 30 * Math.sin(rad)} stroke="#B8960C" strokeWidth={i === 3 ? "1.5" : "0.8"} opacity="0.5" />;
        })}
        <path d="M5 35 A30 30 0 0 1 65 35" fill="none" stroke="#B8960C" strokeWidth="0.8" opacity="0.4" />
      </svg>
    </div>
  );
}

// ── 7. Nordic (Scandinavian Minimal) ──────────────────────────────────────
export function Nordic({ data: d, t: tProp }: TP) {
  const t = tProp ?? DEFAULT_T;
  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-center px-12 py-10 text-center relative">
      <div className="absolute top-10 left-0 right-0 flex items-center px-12">
        <div className="flex-1 h-px bg-[#1C1917] opacity-10" />
      </div>
      <div className="absolute bottom-10 left-0 right-0 flex items-center px-12">
        <div className="flex-1 h-px bg-[#1C1917] opacity-10" />
      </div>
      <p className="text-[8px] tracking-[0.5em] uppercase text-[#6B6359] font-sans font-light mb-12 opacity-60">Wedding</p>
      <h1 className="font-serif text-5xl font-light text-[#1C1917] leading-tight mb-1">{P1(d, t)}</h1>
      <p className="font-sans text-sm font-light text-[#6B6359] tracking-[0.4em] my-2 opacity-50">&amp;</p>
      <h1 className="font-serif text-5xl font-light text-[#1C1917] leading-tight mb-12">{P2(d, t)}</h1>
      <div className="h-px w-8 bg-[#B8960C] mb-6 opacity-60" />
      <p className="text-[10px] tracking-[0.3em] uppercase text-[#6B6359] font-sans font-light mb-1 opacity-70">{DATE(d, t)}</p>
      {d.time && <p className="text-[10px] tracking-wider text-[#6B6359] font-sans font-light mb-3 opacity-50">{d.time}</p>}
      <p className="font-serif italic text-[#1C1917] text-base mb-0.5">{VENUE(d, t)}</p>
      <p className="text-[10px] tracking-wider text-[#6B6359] font-sans font-light opacity-50 mb-3">{LOC(d, t)}</p>
      {d.message && <p className="font-serif italic text-[#6B6359] text-sm leading-relaxed mb-3">&ldquo;{d.message}&rdquo;</p>}
      {d.rsvp_email && (
        <div className="border border-[#D4B86A] px-4 py-1.5 mt-1">
          <p className="text-[8px] tracking-[0.3em] uppercase text-[#B8960C] font-sans mb-0.5">{t.rsvp}</p>
          <p className="text-[9px] text-[#6B6359] font-sans">{d.rsvp_email}</p>
        </div>
      )}
    </div>
  );
}

// ── 8. Sakura (Japanese Blossom) ───────────────────────────────────────────
export function Sakura({ data: d, t: tProp }: TP) {
  const t = tProp ?? DEFAULT_T;
  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-center py-10 text-center relative overflow-hidden">
      {/* Branch left */}
      <svg className="absolute left-0 top-0 h-full w-20 opacity-20" viewBox="0 0 80 400" fill="none">
        <path d="M20 400 C25 300 15 200 30 100 C35 60 40 30 50 10" stroke="#FDA4AF" strokeWidth="2" strokeLinecap="round" />
        <path d="M30 100 C50 90 65 75 70 60" stroke="#FDA4AF" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M25 180 C45 165 55 155 58 140" stroke="#FDA4AF" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M22 260 C38 250 48 240 52 225" stroke="#FDA4AF" strokeWidth="1" strokeLinecap="round" />
        {[{ cx: 70, cy: 60 }, { cx: 58, cy: 140 }, { cx: 52, cy: 225 }, { cx: 50, cy: 10 }, { cx: 38, cy: 45 }].map((p, i) => (
          <g key={i}>
            <circle cx={p.cx} cy={p.cy} r="6" fill="#FDA4AF" />
            <circle cx={p.cx - 4} cy={p.cy - 5} r="4.5" fill="#FECDD3" />
            <circle cx={p.cx + 4} cy={p.cy - 4} r="4" fill="#FDA4AF" />
            <circle cx={p.cx} cy={p.cy + 5} r="4.5" fill="#FECDD3" />
            <circle cx={p.cx - 5} cy={p.cy + 3} r="3.5" fill="#FDE8EC" />
          </g>
        ))}
      </svg>
      <div className="pl-10 pr-6 w-full">
        <p className="text-[9px] tracking-[0.35em] uppercase font-sans font-light mb-5" style={{ color: "#FB7185" }}>{t.weddingInvitation}</p>
        <div className="flex items-center gap-2 mb-5 justify-center px-6">
          <div className="flex-1 h-px" style={{ background: "#FDA4AF", opacity: 0.5 }} />
          <span style={{ color: "#FDA4AF" }}>✿</span>
          <div className="flex-1 h-px" style={{ background: "#FDA4AF", opacity: 0.5 }} />
        </div>
        <h1 className="font-serif text-4xl font-light italic text-[#1C1917] leading-tight mb-0.5">{P1(d, t)}</h1>
        <p className="tracking-widest text-xl mb-0.5" style={{ color: "#FB7185" }}>&amp;</p>
        <h1 className="font-serif text-4xl font-light italic text-[#1C1917] leading-tight mb-5">{P2(d, t)}</h1>
        <div className="flex items-center gap-2 mb-5 justify-center px-6">
          <div className="flex-1 h-px" style={{ background: "#FDA4AF", opacity: 0.5 }} />
          <span style={{ color: "#FDA4AF" }}>✿</span>
          <div className="flex-1 h-px" style={{ background: "#FDA4AF", opacity: 0.5 }} />
        </div>
        <p className="text-[11px] tracking-[0.2em] uppercase text-[#1C1917] font-sans font-light mb-1">{DATE(d, t)}</p>
        {d.time && <p className="text-[11px] tracking-wider text-[#6B6359] font-sans font-light mb-4">{d.time}</p>}
        <p className="font-serif italic text-[#1C1917] text-base mb-1">{VENUE(d, t)}</p>
        <p className="text-[11px] tracking-wider text-[#6B6359] font-sans font-light mb-3">{LOC(d, t)}</p>
        {d.message && <p className="font-serif italic text-[#6B6359] text-sm leading-relaxed mb-3">&ldquo;{d.message}&rdquo;</p>}
        {d.rsvp_email && (
          <div className="mt-2 border px-4 py-1.5 mx-auto inline-block" style={{ borderColor: "#FDA4AF88" }}>
            <p className="text-[9px] tracking-[0.3em] uppercase font-sans mb-0.5" style={{ color: "#FB7185" }}>{t.rsvp}</p>
            <p className="text-[10px] text-[#6B6359] font-sans">{d.rsvp_email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── 9. Riviera (Mediterranean) ─────────────────────────────────────────────
export function Riviera({ data: d, t: tProp }: TP) {
  const t = tProp ?? DEFAULT_T;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 py-8 text-center relative overflow-hidden" style={{ background: "#F8FAFF" }}>
      {/* Arch top */}
      <svg className="absolute top-0 left-0 right-0 w-full" viewBox="0 0 240 100" preserveAspectRatio="none">
        <path d="M0 100 L0 50 Q120 -20 240 50 L240 100 Z" fill="#1E3A8A" opacity="0.07" />
        <path d="M20 100 L20 55 Q120 0 220 55 L220 100" fill="none" stroke="#1E3A8A" strokeWidth="0.8" opacity="0.25" />
      </svg>
      {/* Dot border sides */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={`l${i}`} className="absolute left-4" style={{ top: `${12 + i * 10}%`, width: 4, height: 4, borderRadius: "50%", background: "#1E3A8A", opacity: 0.15 }} />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={`r${i}`} className="absolute right-4" style={{ top: `${12 + i * 10}%`, width: 4, height: 4, borderRadius: "50%", background: "#1E3A8A", opacity: 0.15 }} />
      ))}
      <p className="text-[9px] tracking-[0.4em] uppercase font-sans font-light mb-4 mt-10" style={{ color: "#1E3A8A", opacity: 0.7 }}>{t.weddingInvitation}</p>
      <h1 className="font-serif text-4xl font-light italic text-[#1C1917] leading-tight mb-0.5">{P1(d, t)}</h1>
      <p className="tracking-widest text-xl mb-0.5" style={{ color: "#1E3A8A" }}>&amp;</p>
      <h1 className="font-serif text-4xl font-light italic text-[#1C1917] leading-tight mb-5">{P2(d, t)}</h1>
      <div className="flex items-center gap-3 w-full mb-5">
        <div className="flex-1 h-px" style={{ background: "#1E3A8A", opacity: 0.2 }} />
        <svg width="12" height="12" viewBox="0 0 12 12"><rect x="1" y="1" width="10" height="10" fill="none" stroke="#1E3A8A" strokeWidth="0.8" transform="rotate(45 6 6)" opacity="0.5" /></svg>
        <div className="flex-1 h-px" style={{ background: "#1E3A8A", opacity: 0.2 }} />
      </div>
      <p className="text-[11px] tracking-[0.2em] uppercase text-[#1C1917] font-sans font-light mb-1">{DATE(d, t)}</p>
      {d.time && <p className="text-[11px] tracking-wider text-[#6B6359] font-sans font-light mb-4">{d.time}</p>}
      <p className="font-serif italic text-[#1C1917] text-base mb-0.5">{VENUE(d, t)}</p>
      <p className="text-[11px] tracking-wider text-[#6B6359] font-sans font-light mb-3">{LOC(d, t)}</p>
      {d.message && <p className="font-serif italic text-[#6B6359] text-sm leading-relaxed mb-3">&ldquo;{d.message}&rdquo;</p>}
      {d.rsvp_email && (
        <div className="border px-4 py-1.5 mt-1" style={{ borderColor: "#1E3A8A33" }}>
          <p className="text-[8px] tracking-[0.3em] uppercase font-sans mb-0.5" style={{ color: "#1E3A8A", opacity: 0.6 }}>{t.rsvp}</p>
          <p className="text-[9px] text-[#6B6359] font-sans">{d.rsvp_email}</p>
        </div>
      )}
    </div>
  );
}

// ── 10. Versailles (Baroque Ornate) ───────────────────────────────────────
export function Versailles({ data: d, t: tProp }: TP) {
  const t = tProp ?? DEFAULT_T;
  const Scroll = ({ pos, transform }: { pos: string; transform: string }) => (
    <svg className={`absolute ${pos} w-14 h-14`} viewBox="0 0 56 56" fill="none">
      <path d="M8 8 C8 8 20 8 28 14 C36 20 36 28 28 28 C20 28 14 22 14 16 C14 10 20 8 24 12" stroke="#B8960C" strokeWidth="0.8" opacity="0.5" strokeLinecap="round" fill="none" transform={transform} />
      <path d="M6 6 L18 6 M6 6 L6 18" stroke="#B8960C" strokeWidth="0.6" opacity="0.4" transform={transform} />
    </svg>
  );
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 py-8 text-center relative" style={{ background: "#FDFBF5" }}>
      <div className="absolute inset-4 border border-[#D4B86A] opacity-20 pointer-events-none" />
      <Scroll pos="top-0 left-0" transform="translate(0,0)" />
      <Scroll pos="top-0 right-0" transform="translate(56,0) scale(-1,1)" />
      <Scroll pos="bottom-0 left-0" transform="translate(0,56) scale(1,-1)" />
      <Scroll pos="bottom-0 right-0" transform="translate(56,56) scale(-1,-1)" />
      <p className="text-[8px] tracking-[0.4em] uppercase text-[#B8960C] font-sans font-light mb-3 opacity-80">
        {t.togetherWithFamilies}
      </p>
      <p className="text-[8px] tracking-[0.3em] uppercase text-[#6B6359] font-sans font-light mb-5 opacity-70">
        {t.requestPresence}
      </p>
      <h1 className="font-serif text-4xl font-light italic text-[#1C1917] leading-tight mb-0.5">{P1(d, t)}</h1>
      <p className="text-[#B8960C] tracking-widest text-xl mb-0.5">&amp;</p>
      <h1 className="font-serif text-4xl font-light italic text-[#1C1917] leading-tight mb-5">{P2(d, t)}</h1>
      {/* Baroque rule */}
      <svg width="160" height="12" viewBox="0 0 160 12" className="mb-5">
        <line x1="0" y1="6" x2="160" y2="6" stroke="#D4B86A" strokeWidth="0.5" opacity="0.5" />
        <line x1="0" y1="4" x2="160" y2="4" stroke="#D4B86A" strokeWidth="0.3" opacity="0.3" />
        <line x1="0" y1="8" x2="160" y2="8" stroke="#D4B86A" strokeWidth="0.3" opacity="0.3" />
        <rect x="74" y="3" width="12" height="6" fill="#B8960C" opacity="0.4" transform="rotate(45 80 6)" />
      </svg>
      <p className="text-[11px] tracking-[0.2em] uppercase text-[#1C1917] font-sans font-light mb-1">{DATE(d, t)}</p>
      {d.time && <p className="text-[11px] tracking-wider text-[#6B6359] font-sans font-light mb-3">{d.time}</p>}
      <p className="font-serif italic text-[#1C1917] text-base mb-0.5">{VENUE(d, t)}</p>
      <p className="text-[11px] tracking-wider text-[#6B6359] font-sans font-light mb-3">{LOC(d, t)}</p>
      {d.message && <p className="font-serif italic text-[#6B6359] text-sm leading-relaxed mb-4">&ldquo;{d.message}&rdquo;</p>}
      {d.rsvp_email && (
        <div className="border border-[#D4B86A] px-4 py-1.5 mt-1">
          <p className="text-[8px] tracking-[0.3em] uppercase text-[#B8960C] font-sans mb-0.5">{t.rsvp}</p>
          <p className="text-[9px] text-[#6B6359] font-sans">{d.rsvp_email}</p>
        </div>
      )}
    </div>
  );
}

// ── 11. Celestial (Stars) ──────────────────────────────────────────────────
export function Celestial({ data: d, t: tProp }: TP) {
  const t = tProp ?? DEFAULT_T;
  const stars = [{ x: 20, y: 15, r: 1.5 }, { x: 180, y: 20, r: 1 }, { x: 210, y: 60, r: 1.5 }, { x: 30, y: 80, r: 1 }, { x: 190, y: 130, r: 1.2 }, { x: 15, y: 160, r: 1 }, { x: 205, y: 210, r: 1.5 }, { x: 25, y: 240, r: 1.2 }, { x: 195, y: 280, r: 1 }, { x: 10, y: 320, r: 1.5 }, { x: 200, y: 350, r: 1 }, { x: 35, y: 370, r: 1.2 }];
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-10 py-10 text-center relative overflow-hidden" style={{ background: "#0F172A" }}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 240 400" preserveAspectRatio="xMidYMid slice">
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#F5D78E" opacity={0.3 + (i % 4) * 0.15} />
        ))}
        {/* Constellation lines */}
        <line x1="20" y1="15" x2="30" y2="80" stroke="#F5D78E" strokeWidth="0.3" opacity="0.15" />
        <line x1="180" y1="20" x2="210" y2="60" stroke="#F5D78E" strokeWidth="0.3" opacity="0.15" />
      </svg>
      {/* Moon */}
      <svg width="40" height="40" viewBox="0 0 40 40" className="mb-4 relative z-10">
        <circle cx="20" cy="20" r="14" fill="none" stroke="#D4B86A" strokeWidth="0.6" opacity="0.4" />
        <path d="M20 8 A12 12 0 1 0 20 32 A9 9 0 1 1 20 8Z" fill="#D4B86A" opacity="0.2" />
      </svg>
      <div className="flex items-center gap-3 w-full mb-5 relative z-10">
        <div className="flex-1 h-px bg-[#D4B86A] opacity-20" />
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#D4B86A] font-sans font-light opacity-60">Under the Stars</span>
        <div className="flex-1 h-px bg-[#D4B86A] opacity-20" />
      </div>
      <h1 className="font-serif text-4xl font-light italic leading-tight mb-0.5 relative z-10" style={{ color: "#F5ECD7" }}>{P1(d, t)}</h1>
      <p className="text-[#D4B86A] tracking-widest text-xl mb-0.5 opacity-70 relative z-10">&amp;</p>
      <h1 className="font-serif text-4xl font-light italic leading-tight mb-6 relative z-10" style={{ color: "#F5ECD7" }}>{P2(d, t)}</h1>
      <div className="flex items-center gap-3 w-full mb-5 relative z-10">
        <div className="flex-1 h-px bg-[#D4B86A] opacity-20" />
        <span className="text-[#D4B86A] text-xs opacity-40">✦</span>
        <div className="flex-1 h-px bg-[#D4B86A] opacity-20" />
      </div>
      <p className="text-[11px] tracking-[0.2em] uppercase font-sans font-light mb-1 relative z-10" style={{ color: "#C8B99A" }}>{DATE(d, t)}</p>
      {d.time && <p className="text-[11px] tracking-wider font-sans font-light mb-4 relative z-10" style={{ color: "#8A7A6A" }}>{d.time}</p>}
      <p className="font-serif italic text-base mb-0.5 relative z-10" style={{ color: "#C8B99A" }}>{VENUE(d, t)}</p>
      <p className="text-[11px] tracking-wider font-sans font-light mb-4 relative z-10" style={{ color: "#8A7A6A" }}>{LOC(d, t)}</p>
      {d.message && <p className="font-serif italic text-sm leading-relaxed mb-4 relative z-10" style={{ color: "#8A7A6A" }}>&ldquo;{d.message}&rdquo;</p>}
      {d.rsvp_email && (
        <div className="border px-4 py-1.5 relative z-10" style={{ borderColor: "#D4B86A33" }}>
          <p className="text-[8px] tracking-[0.3em] uppercase font-sans mb-0.5" style={{ color: "#D4B86A", opacity: 0.7 }}>{t.rsvp}</p>
          <p className="text-[9px] font-sans" style={{ color: "#8A7A6A" }}>{d.rsvp_email}</p>
        </div>
      )}
    </div>
  );
}

// ── 12. Tuscany (Italian Rustic) ──────────────────────────────────────────
export function Tuscany({ data: d, t: tProp }: TP) {
  const t = tProp ?? DEFAULT_T;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-10 py-8 text-center relative" style={{ background: "#FEFBF5" }}>
      {/* Olive branch top */}
      <svg width="180" height="40" viewBox="0 0 180 40" className="mb-3">
        <path d="M10 20 C50 20 90 20 170 20" stroke="#78716C" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        {[20, 40, 60, 80, 100, 120, 140, 160].map((x, i) => (
          <g key={x}>
            <ellipse cx={x} cy={i % 2 === 0 ? 14 : 26} rx="8" ry="4.5" fill="#92400E" opacity="0.2" transform={`rotate(${i % 2 === 0 ? -20 : 20} ${x} ${i % 2 === 0 ? 14 : 26})`} />
          </g>
        ))}
      </svg>
      <p className="text-[9px] tracking-[0.4em] uppercase font-sans font-light mb-4" style={{ color: "#92400E", opacity: 0.7 }}>{t.weddingInvitation}</p>
      <h1 className="font-serif text-4xl font-light italic text-[#1C1917] leading-tight mb-0.5">{P1(d, t)}</h1>
      <p className="tracking-widest text-xl mb-0.5" style={{ color: "#92400E" }}>&amp;</p>
      <h1 className="font-serif text-4xl font-light italic text-[#1C1917] leading-tight mb-5">{P2(d, t)}</h1>
      <div className="flex items-center gap-3 w-full mb-5">
        <div className="flex-1 h-px" style={{ background: "#92400E", opacity: 0.2 }} />
        <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="3" fill="none" stroke="#92400E" strokeWidth="0.8" opacity="0.5" /></svg>
        <div className="flex-1 h-px" style={{ background: "#92400E", opacity: 0.2 }} />
      </div>
      <p className="text-[11px] tracking-[0.2em] uppercase text-[#1C1917] font-sans font-light mb-1">{DATE(d, t)}</p>
      {d.time && <p className="text-[11px] tracking-wider text-[#6B6359] font-sans font-light mb-4">{d.time}</p>}
      <p className="font-serif italic text-[#1C1917] text-base mb-0.5">{VENUE(d, t)}</p>
      <p className="text-[11px] tracking-wider text-[#6B6359] font-sans font-light mb-4">{LOC(d, t)}</p>
      {d.message && <p className="font-serif italic text-[#6B6359] text-sm leading-relaxed mb-4">&ldquo;{d.message}&rdquo;</p>}
      {d.rsvp_email && (
        <div className="border border-[#D4B86A] px-4 py-1.5 mb-3">
          <p className="text-[8px] tracking-[0.3em] uppercase text-[#B8960C] font-sans mb-0.5">{t.rsvp}</p>
          <p className="text-[9px] text-[#6B6359] font-sans">{d.rsvp_email}</p>
        </div>
      )}
      {/* Olive branch bottom */}
      <svg width="180" height="40" viewBox="0 0 180 40" style={{ transform: "scaleY(-1)" }}>
        <path d="M10 20 C50 20 90 20 170 20" stroke="#78716C" strokeWidth="1" strokeLinecap="round" opacity="0.25" />
        {[20, 60, 100, 140].map((x, i) => (
          <ellipse key={x} cx={x} cy={i % 2 === 0 ? 13 : 27} rx="7" ry="4" fill="#92400E" opacity="0.15" transform={`rotate(${i % 2 === 0 ? -20 : 20} ${x} ${i % 2 === 0 ? 13 : 27})`} />
        ))}
      </svg>
    </div>
  );
}

// ── 13. Noir (Bold Typography) ─────────────────────────────────────────────
export function Noir({ data: d, t: tProp }: TP) {
  const t = tProp ?? DEFAULT_T;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center relative" style={{ background: "#0A0A0A" }}>
      <div className="px-8 w-full">
        <p className="text-[8px] tracking-[0.5em] uppercase font-sans font-light mb-6" style={{ color: "#6B6359" }}>{t.weddingInvitation}</p>
        <h1 className="font-serif font-light italic leading-none mb-0" style={{ fontSize: "clamp(2.5rem,10vw,3.5rem)", color: "#F5F0E8" }}>{P1(d, t)}</h1>
        <div className="flex items-center gap-0 my-3">
          <div className="flex-1 h-px" style={{ background: "#B8960C" }} />
        </div>
        <p className="text-[10px] tracking-[0.5em] uppercase font-sans font-light mb-0" style={{ color: "#B8960C" }}>&amp;</p>
        <div className="flex items-center gap-0 my-3">
          <div className="flex-1 h-px" style={{ background: "#B8960C" }} />
        </div>
        <h1 className="font-serif font-light italic leading-none mb-8" style={{ fontSize: "clamp(2.5rem,10vw,3.5rem)", color: "#F5F0E8" }}>{P2(d, t)}</h1>
        <p className="text-[9px] tracking-[0.4em] uppercase font-sans font-light mb-1" style={{ color: "#4A4A4A" }}>{DATE(d, t)}</p>
        {d.time && <p className="text-[9px] tracking-wider font-sans font-light mb-2" style={{ color: "#3A3A3A" }}>{d.time}</p>}
        <p className="font-serif italic text-sm mb-0.5" style={{ color: "#5A5A5A" }}>{VENUE(d, t)}</p>
        <p className="text-[9px] tracking-wider font-sans font-light mb-3" style={{ color: "#3A3A3A" }}>{LOC(d, t)}</p>
        {d.message && <p className="font-serif italic text-xs leading-relaxed mb-3" style={{ color: "#4A4A4A" }}>&ldquo;{d.message}&rdquo;</p>}
        {d.rsvp_email && (
          <div className="border border-[#B8960C] px-4 py-1.5 mt-1">
            <p className="text-[8px] tracking-[0.3em] uppercase font-sans mb-0.5" style={{ color: "#B8960C" }}>{t.rsvp}</p>
            <p className="text-[9px] font-sans" style={{ color: "#4A4A4A" }}>{d.rsvp_email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── 14. Moderne (Swiss Grid) ───────────────────────────────────────────────
export function Moderne({ data: d, t: tProp }: TP) {
  const t = tProp ?? DEFAULT_T;
  return (
    <div className="w-full h-full bg-white flex flex-col justify-center relative">
      {/* Thick gold left bar */}
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#B8960C]" />
      {/* Thin top line */}
      <div className="absolute top-8 left-12 right-8 h-px bg-[#1C1917] opacity-10" />
      <div className="absolute bottom-8 left-12 right-8 h-px bg-[#1C1917] opacity-10" />
      <div className="pl-14 pr-8">
        <p className="text-[8px] tracking-[0.5em] uppercase text-[#B8960C] font-sans font-light mb-6">Wedding</p>
        <h1 className="font-serif text-5xl font-light text-[#1C1917] leading-none mb-0">{P1(d, t)}</h1>
        <div className="flex items-center gap-3 my-3">
          <span className="font-sans text-3xl font-light text-[#B8960C]">&amp;</span>
          <div className="flex-1 h-px bg-[#D4B86A] opacity-40" />
        </div>
        <h1 className="font-serif text-5xl font-light text-[#1C1917] leading-none mb-8">{P2(d, t)}</h1>
        <div className="h-px w-12 bg-[#B8960C] mb-6 opacity-60" />
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#1C1917] font-sans font-light mb-1 opacity-70">{DATE(d, t)}</p>
        {d.time && <p className="text-[10px] tracking-wider text-[#6B6359] font-sans font-light mb-2">{d.time}</p>}
        <p className="font-serif italic text-[#1C1917] text-base mb-0.5">{VENUE(d, t)}</p>
        <p className="text-[10px] tracking-wider text-[#6B6359] font-sans font-light mb-3">{LOC(d, t)}</p>
        {d.message && <p className="font-serif italic text-[#6B6359] text-sm leading-relaxed mb-3">&ldquo;{d.message}&rdquo;</p>}
        {d.rsvp_email && (
          <div className="border border-[#D4B86A] px-4 py-1.5 mt-1">
            <p className="text-[8px] tracking-[0.3em] uppercase text-[#B8960C] font-sans mb-0.5">{t.rsvp}</p>
            <p className="text-[9px] text-[#6B6359] font-sans">{d.rsvp_email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── 15. Parchment (Vintage) ────────────────────────────────────────────────
export function Parchment({ data: d, t: tProp }: TP) {
  const t = tProp ?? DEFAULT_T;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-10 py-8 text-center relative" style={{ background: "#F5ECD7" }}>
      {/* Worn inner border (dashed) */}
      <div className="absolute inset-4 pointer-events-none" style={{ border: "1px dashed #B8960C", opacity: 0.25, borderRadius: 1 }} />
      <div className="absolute inset-6 pointer-events-none" style={{ border: "1px solid #B8960C", opacity: 0.12, borderRadius: 1 }} />
      {/* Postmark circle */}
      <svg width="100" height="100" viewBox="0 0 100 100" className="absolute opacity-8" style={{ opacity: 0.06 }}>
        <circle cx="50" cy="50" r="44" fill="none" stroke="#1C1917" strokeWidth="2" />
        <circle cx="50" cy="50" r="36" fill="none" stroke="#1C1917" strokeWidth="1" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 45 * Math.PI) / 180;
          return <line key={i} x1={50 + 36 * Math.cos(a)} y1={50 + 36 * Math.sin(a)} x2={50 + 44 * Math.cos(a)} y2={50 + 44 * Math.sin(a)} stroke="#1C1917" strokeWidth="1" />;
        })}
      </svg>
      <p className="text-[8px] tracking-[0.5em] uppercase font-sans font-light mb-4" style={{ color: "#92400E", opacity: 0.7 }}>Est. Forever</p>
      <div className="flex items-center gap-3 w-full mb-4">
        <div className="flex-1 h-px" style={{ background: "#92400E", opacity: 0.3 }} />
        <span style={{ color: "#92400E", opacity: 0.5, fontSize: 10 }}>✦</span>
        <div className="flex-1 h-px" style={{ background: "#92400E", opacity: 0.3 }} />
      </div>
      <h1 className="font-serif text-4xl font-light italic text-[#1C1917] leading-tight mb-0.5">{P1(d, t)}</h1>
      <p className="tracking-widest text-xl mb-0.5" style={{ color: "#92400E" }}>&amp;</p>
      <h1 className="font-serif text-4xl font-light italic text-[#1C1917] leading-tight mb-4">{P2(d, t)}</h1>
      <div className="flex items-center gap-3 w-full mb-4">
        <div className="flex-1 h-px" style={{ background: "#92400E", opacity: 0.3 }} />
        <span style={{ color: "#92400E", opacity: 0.5, fontSize: 10 }}>✦</span>
        <div className="flex-1 h-px" style={{ background: "#92400E", opacity: 0.3 }} />
      </div>
      <p className="text-[11px] tracking-[0.2em] uppercase text-[#1C1917] font-sans font-light mb-1">{DATE(d, t)}</p>
      {d.time && <p className="text-[11px] tracking-wider text-[#6B6359] font-sans font-light mb-3">{d.time}</p>}
      <p className="font-serif italic text-[#1C1917] text-base mb-0.5">{VENUE(d, t)}</p>
      <p className="text-[11px] tracking-wider text-[#6B6359] font-sans font-light mb-3">{LOC(d, t)}</p>
      {d.message && <p className="font-serif italic text-[#6B6359] text-sm leading-relaxed mb-4">&ldquo;{d.message}&rdquo;</p>}
      {d.rsvp_email && (
        <div className="border border-[#D4B86A] px-4 py-1.5 mt-1">
          <p className="text-[8px] tracking-[0.3em] uppercase text-[#B8960C] font-sans mb-0.5">{t.rsvp}</p>
          <p className="text-[9px] text-[#6B6359] font-sans">{d.rsvp_email}</p>
        </div>
      )}
    </div>
  );
}

// ── 16. Eden (Lush Botanical Frame) ───────────────────────────────────────
export function Eden({ data: d, t: tProp }: TP) {
  const t = tProp ?? DEFAULT_T;
  const leaves = [
    { x: 5, y: 20, r: -30, s: 1 }, { x: 0, y: 60, r: 15, s: 0.8 }, { x: 8, y: 100, r: -20, s: 1.1 },
    { x: 2, y: 140, r: 25, s: 0.9 }, { x: 10, y: 180, r: -15, s: 1 }, { x: 0, y: 220, r: 20, s: 0.85 },
    { x: 5, y: 260, r: -25, s: 1 }, { x: 3, y: 300, r: 10, s: 0.9 }, { x: 8, y: 340, r: -30, s: 1.1 },
    { x: 215, y: 20, r: 30, s: 1 }, { x: 220, y: 60, r: -15, s: 0.8 }, { x: 212, y: 100, r: 20, s: 1.1 },
    { x: 218, y: 140, r: -25, s: 0.9 }, { x: 210, y: 180, r: 15, s: 1 }, { x: 220, y: 220, r: -20, s: 0.85 },
    { x: 215, y: 260, r: 25, s: 1 }, { x: 217, y: 300, r: -10, s: 0.9 }, { x: 212, y: 340, r: 30, s: 1.1 },
  ];
  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-center px-14 py-10 text-center relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 240 400" preserveAspectRatio="xMidYMid slice">
        {leaves.map((l, i) => (
          <g key={i} transform={`translate(${l.x},${l.y}) rotate(${l.r}) scale(${l.s})`}>
            <path d="M0 0 C-5 -8 -3 -18 0 -22 C3 -18 5 -8 0 0Z" fill="#B8960C" opacity={0.15 + (i % 4) * 0.05} />
            <path d="M0 0 C-4 -6 -2 -14 0 -18 C2 -14 4 -6 0 0Z" fill="#92400E" opacity="0.08" />
          </g>
        ))}
        {/* Top/bottom leaf clusters */}
        {[30, 60, 90, 120, 150, 180, 210].map((x, i) => (
          <g key={`t${x}`} transform={`translate(${x},5) rotate(${i % 2 === 0 ? 0 : 180})`}>
            <path d="M0 0 C-4 -7 -2 -15 0 -18 C2 -15 4 -7 0 0Z" fill="#B8960C" opacity="0.12" />
          </g>
        ))}
        {[30, 60, 90, 120, 150, 180, 210].map((x) => (
          <g key={`b${x}`} transform={`translate(${x},395) rotate(180)`}>
            <path d="M0 0 C-4 -7 -2 -15 0 -18 C2 -15 4 -7 0 0Z" fill="#B8960C" opacity="0.12" />
          </g>
        ))}
      </svg>
      <p className="text-[9px] tracking-[0.4em] uppercase text-[#B8960C] font-sans font-light mb-4 relative z-10 opacity-80">{t.weddingInvitation}</p>
      <div className="flex items-center gap-2 w-full mb-4 relative z-10">
        <div className="flex-1 h-px bg-[#B8960C] opacity-20" />
        <span className="text-[#B8960C] opacity-50 text-xs">✿</span>
        <div className="flex-1 h-px bg-[#B8960C] opacity-20" />
      </div>
      <h1 className="font-serif text-4xl font-light italic text-[#1C1917] leading-tight mb-0.5 relative z-10">{P1(d, t)}</h1>
      <p className="text-[#B8960C] tracking-widest text-xl mb-0.5 relative z-10">&amp;</p>
      <h1 className="font-serif text-4xl font-light italic text-[#1C1917] leading-tight mb-4 relative z-10">{P2(d, t)}</h1>
      <div className="flex items-center gap-2 w-full mb-4 relative z-10">
        <div className="flex-1 h-px bg-[#B8960C] opacity-20" />
        <span className="text-[#B8960C] opacity-50 text-xs">✿</span>
        <div className="flex-1 h-px bg-[#B8960C] opacity-20" />
      </div>
      <p className="text-[11px] tracking-[0.2em] uppercase text-[#1C1917] font-sans font-light mb-1 relative z-10">{DATE(d, t)}</p>
      {d.time && <p className="text-[11px] tracking-wider text-[#6B6359] font-sans font-light mb-3 relative z-10">{d.time}</p>}
      <p className="font-serif italic text-[#1C1917] text-base mb-0.5 relative z-10">{VENUE(d, t)}</p>
      <p className="text-[11px] tracking-wider text-[#6B6359] font-sans font-light mb-3 relative z-10">{LOC(d, t)}</p>
      {d.message && <p className="font-serif italic text-[#6B6359] text-sm leading-relaxed mb-3 relative z-10">&ldquo;{d.message}&rdquo;</p>}
      {d.rsvp_email && (
        <div className="border border-[#D4B86A] px-4 py-1.5 relative z-10">
          <p className="text-[8px] tracking-[0.3em] uppercase text-[#B8960C] font-sans mb-0.5">{t.rsvp}</p>
          <p className="text-[9px] text-[#6B6359] font-sans">{d.rsvp_email}</p>
        </div>
      )}
    </div>
  );
}

// ── 17. Venezia (Gothic Arch) ──────────────────────────────────────────────
export function Venezia({ data: d, t: tProp }: TP) {
  const t = tProp ?? DEFAULT_T;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 py-6 text-center relative" style={{ background: "#FDFBF8" }}>
      {/* Gothic arch SVG frame */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 240 400" preserveAspectRatio="none">
        {/* Outer arch */}
        <path d="M20 400 L20 160 Q20 20 120 20 Q220 20 220 160 L220 400" fill="none" stroke="#D4B86A" strokeWidth="0.8" opacity="0.35" />
        {/* Inner arch */}
        <path d="M34 400 L34 165 Q34 40 120 40 Q206 40 206 165 L206 400" fill="none" stroke="#D4B86A" strokeWidth="0.5" opacity="0.2" />
        {/* Gothic peak ornament */}
        <path d="M105 20 L120 6 L135 20" fill="none" stroke="#B8960C" strokeWidth="0.8" opacity="0.5" />
        <circle cx="120" cy="5" r="3" fill="none" stroke="#B8960C" strokeWidth="0.6" opacity="0.5" />
        {/* Filigree at arch sides */}
        <path d="M20 160 C15 140 18 120 22 100" fill="none" stroke="#D4B86A" strokeWidth="0.4" opacity="0.3" />
        <path d="M220 160 C225 140 222 120 218 100" fill="none" stroke="#D4B86A" strokeWidth="0.4" opacity="0.3" />
      </svg>
      <p className="text-[9px] tracking-[0.4em] uppercase text-[#B8960C] font-sans font-light mb-3 mt-16 relative z-10 opacity-80">{t.weddingInvitation}</p>
      <div className="flex items-center gap-3 w-full mb-4 relative z-10 px-6">
        <div className="flex-1 h-px bg-[#D4B86A] opacity-40" />
        <svg width="8" height="8" viewBox="0 0 8 8"><rect x="1" y="1" width="6" height="6" fill="#B8960C" opacity="0.5" transform="rotate(45 4 4)" /></svg>
        <div className="flex-1 h-px bg-[#D4B86A] opacity-40" />
      </div>
      <h1 className="font-serif text-4xl font-light italic text-[#1C1917] leading-tight mb-0.5 relative z-10">{P1(d, t)}</h1>
      <p className="text-[#B8960C] tracking-widest text-xl mb-0.5 relative z-10">&amp;</p>
      <h1 className="font-serif text-4xl font-light italic text-[#1C1917] leading-tight mb-4 relative z-10">{P2(d, t)}</h1>
      <div className="flex items-center gap-3 w-full mb-4 relative z-10 px-6">
        <div className="flex-1 h-px bg-[#D4B86A] opacity-40" />
        <svg width="8" height="8" viewBox="0 0 8 8"><rect x="1" y="1" width="6" height="6" fill="#B8960C" opacity="0.5" transform="rotate(45 4 4)" /></svg>
        <div className="flex-1 h-px bg-[#D4B86A] opacity-40" />
      </div>
      <p className="text-[11px] tracking-[0.2em] uppercase text-[#1C1917] font-sans font-light mb-1 relative z-10">{DATE(d, t)}</p>
      {d.time && <p className="text-[11px] tracking-wider text-[#6B6359] font-sans font-light mb-3 relative z-10">{d.time}</p>}
      <p className="font-serif italic text-[#1C1917] text-base mb-0.5 relative z-10">{VENUE(d, t)}</p>
      <p className="text-[11px] tracking-wider text-[#6B6359] font-sans font-light mb-3 relative z-10">{LOC(d, t)}</p>
      {d.message && <p className="font-serif italic text-[#6B6359] text-sm leading-relaxed mb-3 relative z-10">&ldquo;{d.message}&rdquo;</p>}
      {d.rsvp_email && (
        <div className="border border-[#D4B86A] px-4 py-1.5 relative z-10">
          <p className="text-[8px] tracking-[0.3em] uppercase text-[#B8960C] font-sans mb-0.5">{t.rsvp}</p>
          <p className="text-[9px] text-[#6B6359] font-sans">{d.rsvp_email}</p>
        </div>
      )}
    </div>
  );
}

// ── 18. Côte (French Riviera) ──────────────────────────────────────────────
export function Cote({ data: d, t: tProp }: TP) {
  const t = tProp ?? DEFAULT_T;
  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-center px-10 py-10 text-center relative overflow-hidden">
      {/* Horizontal stripe bands */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div key={i} className="absolute left-0 right-0 h-px" style={{ top: `${10 + i * 5}%`, background: "#BFDBFE", opacity: i % 2 === 0 ? 0.5 : 0.25 }} />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div key={i} className="absolute left-0 right-0 h-px" style={{ bottom: `${10 + i * 5}%`, background: "#BFDBFE", opacity: i % 2 === 0 ? 0.5 : 0.25 }} />
      ))}
      <p className="text-[9px] tracking-[0.4em] uppercase font-sans font-light mb-5 relative z-10" style={{ color: "#1D4ED8", opacity: 0.6 }}>{t.weddingInvitation}</p>
      <div className="flex items-center gap-3 w-full mb-5 relative z-10">
        <div className="flex-1 h-px" style={{ background: "#93C5FD", opacity: 0.6 }} />
        <svg width="12" height="6" viewBox="0 0 12 6"><path d="M0 6 C2 0 10 0 12 6Z" fill="#93C5FD" opacity="0.5" /></svg>
        <div className="flex-1 h-px" style={{ background: "#93C5FD", opacity: 0.6 }} />
      </div>
      <h1 className="font-serif text-4xl font-light italic text-[#1C1917] leading-tight mb-0.5 relative z-10">{P1(d, t)}</h1>
      <p className="tracking-widest text-xl mb-0.5 relative z-10" style={{ color: "#3B82F6" }}>&amp;</p>
      <h1 className="font-serif text-4xl font-light italic text-[#1C1917] leading-tight mb-5 relative z-10">{P2(d, t)}</h1>
      <div className="flex items-center gap-3 w-full mb-5 relative z-10">
        <div className="flex-1 h-px" style={{ background: "#93C5FD", opacity: 0.6 }} />
        <svg width="12" height="6" viewBox="0 0 12 6"><path d="M0 6 C2 0 10 0 12 6Z" fill="#93C5FD" opacity="0.5" /></svg>
        <div className="flex-1 h-px" style={{ background: "#93C5FD", opacity: 0.6 }} />
      </div>
      <p className="text-[11px] tracking-[0.2em] uppercase text-[#1C1917] font-sans font-light mb-1 relative z-10">{DATE(d, t)}</p>
      {d.time && <p className="text-[11px] tracking-wider text-[#6B6359] font-sans font-light mb-3 relative z-10">{d.time}</p>}
      <p className="font-serif italic text-[#1C1917] text-base mb-0.5 relative z-10">{VENUE(d, t)}</p>
      <p className="text-[11px] tracking-wider text-[#6B6359] font-sans font-light mb-3 relative z-10">{LOC(d, t)}</p>
      {d.message && <p className="font-serif italic text-[#6B6359] text-sm leading-relaxed mb-3 relative z-10">&ldquo;{d.message}&rdquo;</p>}
      {d.rsvp_email && (
        <div className="border border-[#3B82F6] border-opacity-30 px-4 py-1.5 relative z-10">
          <p className="text-[8px] tracking-[0.3em] uppercase font-sans mb-0.5" style={{ color: "#3B82F6", opacity: 0.6 }}>{t.rsvp}</p>
          <p className="text-[9px] text-[#6B6359] font-sans">{d.rsvp_email}</p>
        </div>
      )}
    </div>
  );
}

// ── 19. Aurora (Northern Lights) ───────────────────────────────────────────
export function Aurora({ data: d, t: tProp }: TP) {
  const t = tProp ?? DEFAULT_T;
  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-center px-10 py-10 text-center relative overflow-hidden">
      {/* Aurora gradient bands */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(52,211,153,0.12) 0%, rgba(96,165,250,0.10) 40%, rgba(167,139,250,0.08) 70%, transparent 100%)" }} />
      <div className="absolute top-0 left-0 right-0 h-20 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(52,211,153,0.06) 0%, transparent 100%)" }} />
      <p className="text-[9px] tracking-[0.4em] uppercase font-sans font-light mb-8 mt-8 relative z-10" style={{ color: "#059669", opacity: 0.7 }}>{t.weddingInvitation}</p>
      <h1 className="font-serif text-5xl font-light text-[#1C1917] leading-tight mb-0 relative z-10">{P1(d, t)}</h1>
      <div className="flex items-center gap-3 w-full my-3 relative z-10">
        <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #34D399, #60A5FA)" , opacity: 0.4 }} />
        <span className="font-sans font-light tracking-widest" style={{ color: "#818CF8" }}>&amp;</span>
        <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #60A5FA, #A78BFA)", opacity: 0.4 }} />
      </div>
      <h1 className="font-serif text-5xl font-light text-[#1C1917] leading-tight mb-8 relative z-10">{P2(d, t)}</h1>
      <div className="h-px w-10 mb-6 relative z-10" style={{ background: "linear-gradient(90deg, #34D399, #818CF8)" }} />
      <p className="text-[11px] tracking-[0.2em] uppercase text-[#1C1917] font-sans font-light mb-1 relative z-10">{DATE(d, t)}</p>
      {d.time && <p className="text-[11px] tracking-wider text-[#6B6359] font-sans font-light mb-3 relative z-10">{d.time}</p>}
      <p className="font-serif italic text-[#1C1917] text-base mb-0.5 relative z-10">{VENUE(d, t)}</p>
      <p className="text-[11px] tracking-wider text-[#6B6359] font-sans font-light mb-3 relative z-10">{LOC(d, t)}</p>
      {d.message && <p className="font-serif italic text-[#6B6359] text-sm leading-relaxed mb-3 relative z-10">&ldquo;{d.message}&rdquo;</p>}
      {d.rsvp_email && (
        <div className="border border-[#D4B86A] px-4 py-1.5 relative z-10">
          <p className="text-[8px] tracking-[0.3em] uppercase text-[#B8960C] font-sans mb-0.5">{t.rsvp}</p>
          <p className="text-[9px] text-[#6B6359] font-sans">{d.rsvp_email}</p>
        </div>
      )}
    </div>
  );
}

// ── 20. Monogram (Classic Initials) ───────────────────────────────────────
export function Monogram({ data: d, t: tProp }: TP) {
  const t = tProp ?? DEFAULT_T;
  const i1 = (d.partner1 || "A")[0].toUpperCase();
  const i2 = (d.partner2 || "B")[0].toUpperCase();
  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-center px-10 py-8 text-center relative">
      {/* Outer decorative ring */}
      <svg className="absolute" width="200" height="200" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="90" fill="none" stroke="#D4B86A" strokeWidth="0.6" opacity="0.3" />
        <circle cx="100" cy="100" r="82" fill="none" stroke="#D4B86A" strokeWidth="0.3" opacity="0.2" />
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * 360) / 24;
          const r = (a * Math.PI) / 180;
          return <circle key={i} cx={100 + 90 * Math.cos(r)} cy={100 + 90 * Math.sin(r)} r="1.5" fill="#B8960C" opacity={i % 4 === 0 ? "0.5" : "0.2"} />;
        })}
      </svg>
      {/* Monogram */}
      <div className="relative z-10 flex items-center justify-center mb-6">
        <span className="font-serif text-7xl font-light italic text-[#B8960C] opacity-30 -mr-4">{i1}</span>
        <span className="font-serif text-7xl font-light italic text-[#1C1917] relative z-10">{i1}{i2}</span>
        <span className="font-serif text-7xl font-light italic text-[#B8960C] opacity-30 -ml-4">{i2}</span>
      </div>
      <div className="flex items-center gap-3 w-full mb-4 relative z-10">
        <div className="flex-1 h-px bg-[#D4B86A] opacity-40" />
        <span className="text-[#B8960C] text-xs">✦</span>
        <div className="flex-1 h-px bg-[#D4B86A] opacity-40" />
      </div>
      <p className="font-serif text-2xl font-light italic text-[#1C1917] mb-0.5 relative z-10">{P1(d, t)} &amp; {P2(d, t)}</p>
      <p className="text-[9px] tracking-[0.4em] uppercase text-[#B8960C] font-sans font-light mb-4 relative z-10 opacity-70">{t.weddingInvitation}</p>
      <p className="text-[11px] tracking-[0.2em] uppercase text-[#1C1917] font-sans font-light mb-1 relative z-10">{DATE(d, t)}</p>
      {d.time && <p className="text-[11px] tracking-wider text-[#6B6359] font-sans font-light mb-2 relative z-10">{d.time}</p>}
      <p className="font-serif italic text-[#1C1917] text-base mb-0.5 relative z-10">{VENUE(d, t)}</p>
      <p className="text-[11px] tracking-wider text-[#6B6359] font-sans font-light mb-3 relative z-10">{LOC(d, t)}</p>
      {d.message && <p className="font-serif italic text-[#6B6359] text-sm leading-relaxed mb-3 relative z-10">&ldquo;{d.message}&rdquo;</p>}
      {d.rsvp_email && (
        <div className="border border-[#D4B86A] px-4 py-1.5 relative z-10">
          <p className="text-[8px] tracking-[0.3em] uppercase text-[#B8960C] font-sans mb-0.5">{t.rsvp}</p>
          <p className="text-[9px] text-[#6B6359] font-sans">{d.rsvp_email}</p>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// NEW VERTICAL TEMPLATES (3:4) — with custom image support
// ══════════════════════════════════════════════════════════════════════════════

// ── 21. Portrait (Photo + Text) ─────────────────────────────────────────────
export function Portrait({ data: d, t: tProp }: TP) {
  const t = tProp ?? DEFAULT_T;
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#0D0D0D" }}>
      {/* Photo top half */}
      <div className="flex-1 relative overflow-hidden" style={{ maxHeight: "55%" }}>
        {d.image_url ? (
          <img src={d.image_url} alt="Couple" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)" }}>
            <svg className="w-16 h-16 opacity-20" viewBox="0 0 64 64" fill="white">
              <circle cx="24" cy="20" r="8" /><circle cx="40" cy="20" r="8" />
              <path d="M8 56c0-12 8-20 16-20s16 8 16 20" /><path d="M24 56c0-12 8-20 16-20s16 8 16 20" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, #0D0D0D 100%)" }} />
        {/* Gold frame corners */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t border-l" style={{ borderColor: "#C9A96E" }} />
        <div className="absolute top-4 right-4 w-6 h-6 border-t border-r" style={{ borderColor: "#C9A96E" }} />
      </div>
      {/* Text bottom */}
      <div className="px-8 pb-8 pt-2 flex flex-col items-center text-center">
        <div className="flex items-center gap-3 w-full mb-4">
          <div className="flex-1 h-px" style={{ background: "#C9A96E" }} />
          <span className="text-[8px] tracking-[0.4em] uppercase font-sans font-light" style={{ color: "#C9A96E" }}>{t.weddingInvitation}</span>
          <div className="flex-1 h-px" style={{ background: "#C9A96E" }} />
        </div>
        <h1 className="font-serif text-3xl font-light italic leading-tight mb-0.5" style={{ color: "#F5F0E8" }}>{P1(d, t)}</h1>
        <p className="text-lg tracking-widest mb-0.5" style={{ color: "#C9A96E" }}>&amp;</p>
        <h1 className="font-serif text-3xl font-light italic leading-tight mb-4" style={{ color: "#F5F0E8" }}>{P2(d, t)}</h1>
        <p className="text-[10px] tracking-[0.25em] uppercase font-sans font-light mb-1" style={{ color: "#8B8070" }}>{DATE(d, t)}</p>
        {d.time && <p className="text-[10px] tracking-wider font-sans font-light mb-1" style={{ color: "#8B8070" }}>{d.time}</p>}
        <p className="font-serif italic text-sm mb-0.5" style={{ color: "#F5F0E8" }}>{VENUE(d, t)}</p>
        <p className="text-[10px] tracking-wider font-sans font-light mb-3" style={{ color: "#8B8070" }}>{LOC(d, t)}</p>
        {d.message && <p className="font-serif italic text-xs leading-relaxed mb-3" style={{ color: "#8B8070" }}>&ldquo;{d.message}&rdquo;</p>}
        {d.rsvp_email && (
          <div className="border px-4 py-1.5" style={{ borderColor: "#C9A96E" }}>
            <p className="text-[8px] tracking-[0.3em] uppercase font-sans" style={{ color: "#C9A96E" }}>RSVP · {d.rsvp_email}</p>
          </div>
        )}
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l" style={{ borderColor: "#C9A96E" }} />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r" style={{ borderColor: "#C9A96E" }} />
      </div>
    </div>
  );
}

// ── 22. Manuscript (Letter Style) ───────────────────────────────────────────
export function Manuscript({ data: d, t: tProp }: TP) {
  const t = tProp ?? DEFAULT_T;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-10 py-8 relative" style={{ background: "#F7F0E3", fontFamily: "Georgia, serif" }}>
      {/* Aged paper texture lines */}
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} className="absolute left-0 right-0 h-px" style={{ top: `${6 + i * 5.2}%`, background: "rgba(139,115,85,0.08)" }} />
      ))}
      {/* Red margin line */}
      <div className="absolute top-0 bottom-0 w-px" style={{ left: "15%", background: "rgba(180,60,60,0.2)" }} />
      <div className="relative z-10 text-center w-full">
        <p className="text-[9px] tracking-[0.3em] uppercase font-sans font-light mb-1" style={{ color: "#8B7355" }}>{d.date || t.datePlaceholder}</p>
        {d.time && <p className="text-[9px] tracking-wider font-sans font-light mb-1" style={{ color: "#8B7355" }}>{d.time}</p>}
        <p className="text-[9px] tracking-[0.2em] font-sans font-light mb-5" style={{ color: "#8B7355" }}>{d.location || t.locationPlaceholder}</p>
        <p className="text-xs font-sans font-light mb-3 italic" style={{ color: "#6B5A40" }}>Dear friends &amp; family,</p>
        <p className="text-xs font-sans font-light mb-5 leading-relaxed" style={{ color: "#6B5A40" }}>We joyfully invite you to witness the union of</p>
        <h1 className="font-serif text-4xl font-light italic mb-0.5" style={{ color: "#2C2218" }}>{P1(d, t)}</h1>
        <p className="text-lg mb-0.5 font-serif italic" style={{ color: "#8B7355" }}>&amp;</p>
        <h1 className="font-serif text-4xl font-light italic mb-5" style={{ color: "#2C2218" }}>{P2(d, t)}</h1>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px" style={{ background: "#C4A882" }} />
          <span className="font-serif italic text-xs" style={{ color: "#8B7355" }}>♦</span>
          <div className="flex-1 h-px" style={{ background: "#C4A882" }} />
        </div>
        <p className="text-xs font-sans font-light mb-1" style={{ color: "#6B5A40" }}>{VENUE(d, t)}</p>
        {d.message && <p className="text-xs italic font-sans leading-relaxed mt-3" style={{ color: "#8B7355" }}>&ldquo;{d.message}&rdquo;</p>}
        {d.rsvp_email && <p className="text-[9px] tracking-[0.3em] uppercase font-sans mt-3" style={{ color: "#8B7355" }}>RSVP · {d.rsvp_email}</p>}
        <p className="font-serif italic text-base mt-4" style={{ color: "#2C2218" }}>With love,</p>
        <p className="font-serif text-lg italic" style={{ color: "#2C2218" }}>{P1(d, t)} &amp; {P2(d, t)}</p>
      </div>
    </div>
  );
}

// ── 23. Cathedral (Gothic Dark) ─────────────────────────────────────────────
export function Cathedral({ data: d, t: tProp }: TP) {
  const t = tProp ?? DEFAULT_T;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 py-8 text-center relative overflow-hidden" style={{ background: "#0F0A1E" }}>
      {/* Gothic arch SVG */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 400" preserveAspectRatio="none" fill="none">
        <path d="M30 400 L30 150 Q30 30 150 30 Q270 30 270 150 L270 400" stroke="#4A2D7A" strokeWidth="1" fill="none" opacity="0.6"/>
        <path d="M50 400 L50 155 Q50 55 150 55 Q250 55 250 155 L250 400" stroke="#6B3FA0" strokeWidth="0.5" fill="none" opacity="0.4"/>
        {/* Stained glass geometric */}
        <path d="M150 30 L150 100" stroke="#7B3FBE" strokeWidth="0.5" opacity="0.6"/>
        <circle cx="150" cy="30" r="20" stroke="#9B5DE5" strokeWidth="0.5" fill="none" opacity="0.4"/>
        <circle cx="150" cy="30" r="12" stroke="#F7B731" strokeWidth="0.5" fill="rgba(247,183,49,0.05)" opacity="0.6"/>
        {/* Side decorations */}
        {[80, 160, 240, 320].map((y, i) => (
          <g key={i}>
            <line x1="30" y1={y} x2="55" y2={y} stroke="#4A2D7A" strokeWidth="0.5" opacity="0.5"/>
            <line x1="245" y1={y} x2="270" y2={y} stroke="#4A2D7A" strokeWidth="0.5" opacity="0.5"/>
          </g>
        ))}
      </svg>
      <div className="relative z-10">
        <div className="w-8 h-8 mx-auto mb-4 border border-yellow-500/30 rotate-45 flex items-center justify-center">
          <div className="w-4 h-4 border border-yellow-500/50 rotate-0" />
        </div>
        <p className="text-[8px] tracking-[0.5em] uppercase font-sans font-light mb-5" style={{ color: "#9B5DE5" }}>{t.weddingInvitation}</p>
        <h1 className="font-serif text-3xl font-light italic leading-tight mb-0.5" style={{ color: "#F0EBF8" }}>{P1(d, t)}</h1>
        <p className="text-base tracking-widest mb-0.5" style={{ color: "#F7B731" }}>&amp;</p>
        <h1 className="font-serif text-3xl font-light italic leading-tight mb-6" style={{ color: "#F0EBF8" }}>{P2(d, t)}</h1>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #4A2D7A)" }} />
          <span style={{ color: "#F7B731", fontSize: "10px" }}>✦</span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, #4A2D7A)" }} />
        </div>
        <p className="text-[10px] tracking-[0.2em] uppercase font-sans font-light mb-1" style={{ color: "#9B8AB0" }}>{DATE(d, t)}</p>
        {d.time && <p className="text-[10px] tracking-wider font-sans font-light mb-1" style={{ color: "#7B6A90" }}>{d.time}</p>}
        <p className="font-serif italic text-sm mb-1" style={{ color: "#F0EBF8" }}>{VENUE(d, t)}</p>
        <p className="text-[10px] tracking-wider font-sans font-light mb-3" style={{ color: "#7B6A90" }}>{LOC(d, t)}</p>
        {d.message && <p className="text-[10px] italic font-sans mt-2 leading-relaxed mb-3" style={{ color: "#9B8AB0" }}>&ldquo;{d.message}&rdquo;</p>}
        {d.rsvp_email && (
          <div className="border mt-2 px-4 py-1.5" style={{ borderColor: "#4A2D7A" }}>
            <p className="text-[8px] tracking-[0.3em] uppercase font-sans mb-0.5" style={{ color: "#9B5DE5" }}>{t.rsvp}</p>
            <p className="text-[9px] font-sans" style={{ color: "#9B8AB0" }}>{d.rsvp_email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── 24. Wildflower (Meadow Watercolor) ──────────────────────────────────────
export function Wildflower({ data: d, t: tProp }: TP) {
  const t = tProp ?? DEFAULT_T;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 py-6 text-center relative" style={{ background: "#FDFAF5" }}>
      {/* Wildflower wreath SVG */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 400" fill="none" preserveAspectRatio="xMidYMid meet">
        {/* Top flowers */}
        {[
          { cx: 70, cy: 45, r: 8, c: "#E8A0B0", petals: 5 },
          { cx: 110, cy: 30, r: 6, c: "#F4C2A1", petals: 6 },
          { cx: 150, cy: 22, r: 10, c: "#B8D4A8", petals: 7 },
          { cx: 190, cy: 30, r: 6, c: "#E8A0B0", petals: 5 },
          { cx: 230, cy: 45, r: 8, c: "#F4C2A1", petals: 6 },
        ].map(({ cx, cy, r, c, petals }, i) => (
          <g key={i}>
            {Array.from({ length: petals }).map((_, j) => {
              const angle = (j * 360) / petals;
              const rad = (angle * Math.PI) / 180;
              return <ellipse key={j} cx={cx + r * 1.5 * Math.cos(rad)} cy={cy + r * 1.5 * Math.sin(rad)} rx={r * 0.8} ry={r * 0.5} fill={c} opacity="0.6" transform={`rotate(${angle}, ${cx + r * 1.5 * Math.cos(rad)}, ${cy + r * 1.5 * Math.sin(rad)})`} />;
            })}
            <circle cx={cx} cy={cy} r={r * 0.5} fill="#F9E4B7" />
            {/* Stem */}
            <path d={`M${cx} ${cy + r} Q${cx - 5} ${cy + 30} ${cx - 3} ${cy + 50}`} stroke="#8DB87A" strokeWidth="0.8" fill="none" opacity="0.5"/>
          </g>
        ))}
        {/* Left side botanical */}
        <path d="M15 150 Q40 120 30 90" stroke="#8DB87A" strokeWidth="1" fill="none" opacity="0.4"/>
        <ellipse cx="30" cy="90" rx="12" ry="7" fill="#B8D4A8" opacity="0.35" transform="rotate(-30, 30, 90)"/>
        <path d="M20 200 Q50 170 35 140" stroke="#8DB87A" strokeWidth="1" fill="none" opacity="0.4"/>
        {/* Right side botanical */}
        <path d="M285 150 Q260 120 270 90" stroke="#8DB87A" strokeWidth="1" fill="none" opacity="0.4"/>
        <ellipse cx="270" cy="90" rx="12" ry="7" fill="#B8D4A8" opacity="0.35" transform="rotate(30, 270, 90)"/>
        {/* Bottom flowers */}
        {[70, 150, 230].map((cx, i) => (
          <g key={i}>
            <circle cx={cx} cy={370} r={6} fill={["#E8A0B0", "#F4C2A1", "#E8A0B0"][i]} opacity="0.5"/>
            <path d={`M${cx} ${364} Q${cx - 8} ${340} ${cx - 5} ${310}`} stroke="#8DB87A" strokeWidth="0.8" fill="none" opacity="0.4"/>
          </g>
        ))}
      </svg>
      <div className="relative z-10">
        <p className="text-[9px] tracking-[0.4em] uppercase font-sans font-light mb-5" style={{ color: "#9B7E6A" }}>{t.weddingInvitation}</p>
        <h1 className="font-serif text-4xl font-light italic leading-tight mb-0.5" style={{ color: "#3D2B1F" }}>{P1(d, t)}</h1>
        <p className="text-base tracking-widest mb-0.5" style={{ color: "#C4826E" }}>&amp;</p>
        <h1 className="font-serif text-4xl font-light italic leading-tight mb-5" style={{ color: "#3D2B1F" }}>{P2(d, t)}</h1>
        <p className="text-[10px] tracking-[0.2em] uppercase font-sans font-light mb-1" style={{ color: "#9B7E6A" }}>{DATE(d, t)}</p>
        {d.time && <p className="text-[10px] tracking-wider font-sans font-light mb-1" style={{ color: "#9B7E6A" }}>{d.time}</p>}
        <p className="font-serif italic text-sm mb-1" style={{ color: "#3D2B1F" }}>{VENUE(d, t)}</p>
        <p className="text-[10px] tracking-wider font-sans font-light mb-3" style={{ color: "#9B7E6A" }}>{LOC(d, t)}</p>
        {d.message && <p className="text-[10px] italic font-sans leading-relaxed mb-3" style={{ color: "#7A6050" }}>&ldquo;{d.message}&rdquo;</p>}
        {d.rsvp_email && <p className="text-[9px] tracking-[0.3em] uppercase font-sans" style={{ color: "#C4826E" }}>RSVP · {d.rsvp_email}</p>}
      </div>
    </div>
  );
}

// ── 25. Prism (Bold Geometric) ───────────────────────────────────────────────
export function Prism({ data: d, t: tProp }: TP) {
  const t = tProp ?? DEFAULT_T;
  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col items-center justify-center text-center px-8" style={{ background: "#0A0A0A" }}>
      {/* Geometric prism shapes */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 400" preserveAspectRatio="none">
        <polygon points="0,0 120,0 60,200" fill="rgba(255,100,100,0.08)"/>
        <polygon points="300,0 180,0 240,200" fill="rgba(100,100,255,0.08)"/>
        <polygon points="0,400 120,400 60,200" fill="rgba(100,255,150,0.06)"/>
        <polygon points="300,400 180,400 240,200" fill="rgba(255,200,100,0.06)"/>
        <line x1="0" y1="0" x2="60" y2="200" stroke="rgba(255,100,100,0.3)" strokeWidth="0.5"/>
        <line x1="300" y1="0" x2="240" y2="200" stroke="rgba(100,100,255,0.3)" strokeWidth="0.5"/>
        <line x1="60" y1="200" x2="150" y2="400" stroke="rgba(100,255,150,0.2)" strokeWidth="0.5"/>
        <line x1="240" y1="200" x2="150" y2="400" stroke="rgba(255,200,100,0.2)" strokeWidth="0.5"/>
        {/* Center glow */}
        <circle cx="150" cy="200" r="60" fill="url(#prismGlow)" />
        <defs>
          <radialGradient id="prismGlow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.03"/>
            <stop offset="100%" stopColor="white" stopOpacity="0"/>
          </radialGradient>
        </defs>
      </svg>
      <div className="relative z-10">
        <div className="mb-6">
          <div className="flex items-center gap-2 justify-center mb-2">
            <div className="w-12 h-px" style={{ background: "linear-gradient(to right, transparent, #FF6464)" }} />
            <span className="text-[8px] tracking-[0.5em] uppercase font-sans font-light" style={{ color: "#888" }}>{t.weddingInvitation}</span>
            <div className="w-12 h-px" style={{ background: "linear-gradient(to left, transparent, #6464FF)" }} />
          </div>
        </div>
        <h1 className="font-serif text-4xl font-light italic leading-tight mb-0.5" style={{ color: "#F8F8F8" }}>{P1(d, t)}</h1>
        <p className="text-xl font-light mb-0.5" style={{ background: "linear-gradient(90deg, #FF6464, #6464FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>&amp;</p>
        <h1 className="font-serif text-4xl font-light italic leading-tight mb-6" style={{ color: "#F8F8F8" }}>{P2(d, t)}</h1>
        <div className="w-16 h-px mx-auto mb-4" style={{ background: "linear-gradient(90deg, #FF6464, #6464FF)" }} />
        <p className="text-[10px] tracking-[0.3em] uppercase font-sans font-light mb-1" style={{ color: "#888" }}>{DATE(d, t)}</p>
        {d.time && <p className="text-[10px] tracking-wider font-sans font-light mb-1" style={{ color: "#666" }}>{d.time}</p>}
        <p className="font-serif italic text-sm mb-1" style={{ color: "#E0E0E0" }}>{VENUE(d, t)}</p>
        <p className="text-[10px] tracking-wider font-sans font-light mb-3" style={{ color: "#666" }}>{LOC(d, t)}</p>
        {d.message && <p className="font-serif italic text-xs leading-relaxed mb-3" style={{ color: "#888" }}>&ldquo;{d.message}&rdquo;</p>}
        {d.rsvp_email && (
          <p className="text-[9px] tracking-[0.3em] uppercase font-sans mt-2" style={{ color: "#FF6464" }}>RSVP · {d.rsvp_email}</p>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// NEW HORIZONTAL TEMPLATES (4:3) — with custom image support
// ══════════════════════════════════════════════════════════════════════════════

// ── 26. Cinéma (Letterbox) ───────────────────────────────────────────────────
export function Cinema({ data: d, t: tProp }: TP) {
  const t = tProp ?? DEFAULT_T;
  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center" style={{ background: "#080808" }}>
      {/* Background image */}
      {d.image_url && (
        <img src={d.image_url} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
      )}
      {/* Letterbox bars */}
      <div className="absolute top-0 left-0 right-0 h-[12%]" style={{ background: "#080808" }} />
      <div className="absolute bottom-0 left-0 right-0 h-[12%]" style={{ background: "#080808" }} />
      {/* Vignette */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)" }} />
      <div className="relative z-10 text-center px-12">
        <p className="text-[8px] tracking-[0.6em] uppercase font-sans font-light mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>{t.weddingInvitation}</p>
        <h1 className="font-serif text-4xl font-light italic leading-tight" style={{ color: "#F5F5F0" }}>{P1(d, t)}</h1>
        <p className="text-2xl tracking-widest my-1" style={{ color: "rgba(255,255,255,0.5)" }}>&amp;</p>
        <h1 className="font-serif text-4xl font-light italic leading-tight mb-5" style={{ color: "#F5F5F0" }}>{P2(d, t)}</h1>
        <div className="flex items-center gap-4 justify-center mb-4">
          <div className="flex-1 h-px max-w-16" style={{ background: "rgba(255,255,255,0.2)" }} />
          <p className="text-[10px] tracking-[0.3em] uppercase font-sans font-light" style={{ color: "rgba(255,255,255,0.5)" }}>{DATE(d, t)}</p>
          <div className="flex-1 h-px max-w-16" style={{ background: "rgba(255,255,255,0.2)" }} />
        </div>
        {d.time && <p className="text-[9px] tracking-wider font-sans font-light mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>{d.time}</p>}
        <p className="font-serif italic text-sm mb-1" style={{ color: "#D0CCBC" }}>{VENUE(d, t)}</p>
        <p className="text-[9px] tracking-wider font-sans font-light mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>{LOC(d, t)}</p>
        {d.message && <p className="font-serif italic text-xs leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>&ldquo;{d.message}&rdquo;</p>}
        {d.rsvp_email && <p className="text-[8px] tracking-[0.3em] uppercase font-sans" style={{ color: "rgba(255,255,255,0.35)" }}>RSVP · {d.rsvp_email}</p>}
      </div>
    </div>
  );
}

// ── 27. Diptych (Split Photo + Text) ────────────────────────────────────────
export function Diptych({ data: d, t: tProp }: TP) {
  const t = tProp ?? DEFAULT_T;
  return (
    <div className="w-full h-full flex" style={{ background: "#FAF7F2" }}>
      {/* Left: photo panel */}
      <div className="relative overflow-hidden" style={{ width: "42%", background: "#1C1C1C" }}>
        {d.image_url ? (
          <img src={d.image_url} alt="Couple" className="w-full h-full object-cover" style={{ filter: "grayscale(20%)" }} />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: "linear-gradient(160deg, #2A2A2A 0%, #1A1A1A 100%)" }}>
            <svg className="w-12 h-12 opacity-20" viewBox="0 0 48 48" fill="white">
              <circle cx="18" cy="16" r="6"/><circle cx="30" cy="16" r="6"/>
              <path d="M6 42c0-9 6-15 12-15s12 6 12 15"/>
            </svg>
          </div>
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 70%, rgba(250,247,242,0.4) 100%)" }} />
      </div>
      {/* Dividing line */}
      <div className="w-px self-stretch my-6" style={{ background: "#C9A96E" }} />
      {/* Right: text panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-6 text-center">
        <p className="text-[8px] tracking-[0.4em] uppercase font-sans font-light mb-4" style={{ color: "#B8960C" }}>{t.weddingInvitation}</p>
        <h1 className="font-serif text-2xl font-light italic leading-tight mb-0.5" style={{ color: "#1C1917" }}>{P1(d, t)}</h1>
        <p className="tracking-widest text-lg mb-0.5" style={{ color: "#B8960C" }}>&amp;</p>
        <h1 className="font-serif text-2xl font-light italic leading-tight mb-4" style={{ color: "#1C1917" }}>{P2(d, t)}</h1>
        <div className="w-full h-px mb-4" style={{ background: "#D4B86A" }} />
        <p className="text-[9px] tracking-[0.2em] uppercase font-sans font-light mb-1" style={{ color: "#6B6359" }}>{DATE(d, t)}</p>
        {d.time && <p className="text-[9px] tracking-wider font-sans font-light mb-2" style={{ color: "#9B9490" }}>{d.time}</p>}
        <p className="font-serif italic text-sm mb-0.5" style={{ color: "#1C1917" }}>{VENUE(d, t)}</p>
        <p className="text-[9px] tracking-wider font-sans font-light mb-3" style={{ color: "#6B6359" }}>{LOC(d, t)}</p>
        {d.message && <p className="text-[9px] italic font-sans leading-relaxed mb-3" style={{ color: "#8B8070" }}>&ldquo;{d.message}&rdquo;</p>}
        {d.rsvp_email && <p className="text-[8px] tracking-[0.3em] uppercase font-sans" style={{ color: "#B8960C" }}>RSVP · {d.rsvp_email}</p>}
      </div>
    </div>
  );
}

// ── 28. Pavilion (Wide Arch) ─────────────────────────────────────────────────
export function Pavilion({ data: d, t: tProp }: TP) {
  const t = tProp ?? DEFAULT_T;
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden" style={{ background: "#F9F5EE" }}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
        {/* Arch frame */}
        <path d="M40 300 L40 120 Q40 20 200 20 Q360 20 360 120 L360 300" stroke="#C9A96E" strokeWidth="1" fill="none"/>
        <path d="M55 300 L55 125 Q55 38 200 38 Q345 38 345 125 L345 300" stroke="#D4B86A" strokeWidth="0.5" fill="none" opacity="0.5"/>
        {/* Corner ornaments */}
        <path d="M40 300 L40 270 Q40 260 50 260 L80 260" stroke="#C9A96E" strokeWidth="0.8" fill="none"/>
        <path d="M360 300 L360 270 Q360 260 350 260 L320 260" stroke="#C9A96E" strokeWidth="0.8" fill="none"/>
        {/* Keystone */}
        <path d="M188 18 L200 4 L212 18" stroke="#C9A96E" strokeWidth="0.8" fill="none"/>
        <circle cx="200" cy="4" r="3" fill="#C9A96E" opacity="0.6"/>
        {/* Column bases */}
        <rect x="30" y="285" width="25" height="3" fill="#C9A96E" opacity="0.3"/>
        <rect x="345" y="285" width="25" height="3" fill="#C9A96E" opacity="0.3"/>
      </svg>
      <div className="relative z-10 text-center px-16">
        <p className="text-[8px] tracking-[0.5em] uppercase font-sans font-light mb-4" style={{ color: "#B8960C" }}>{t.weddingInvitation}</p>
        <h1 className="font-serif text-3xl font-light italic leading-tight mb-0.5" style={{ color: "#2C2218" }}>{P1(d, t)}</h1>
        <p className="text-lg tracking-widest mb-0.5" style={{ color: "#C9A96E" }}>&amp;</p>
        <h1 className="font-serif text-3xl font-light italic leading-tight mb-5" style={{ color: "#2C2218" }}>{P2(d, t)}</h1>
        <div className="flex items-center gap-3 justify-center mb-3">
          <div className="w-8 h-px" style={{ background: "#C9A96E" }} />
          <span className="text-xs" style={{ color: "#C9A96E" }}>✦</span>
          <div className="w-8 h-px" style={{ background: "#C9A96E" }} />
        </div>
        <p className="text-[9px] tracking-[0.2em] uppercase font-sans font-light mb-1" style={{ color: "#8B7355" }}>{DATE(d, t)}</p>
        {d.time && <p className="text-[9px] tracking-wider font-sans font-light mb-1" style={{ color: "#8B7355" }}>{d.time}</p>}
        <p className="font-serif italic text-sm mb-0.5" style={{ color: "#2C2218" }}>{VENUE(d, t)}</p>
        <p className="text-[9px] tracking-wider font-sans font-light mb-3" style={{ color: "#8B7355" }}>{LOC(d, t)}</p>
        {d.message && <p className="font-serif italic text-xs leading-relaxed mb-3" style={{ color: "#8B7355" }}>&ldquo;{d.message}&rdquo;</p>}
        {d.rsvp_email && (
          <div className="border border-[#C9A96E] border-opacity-40 px-4 py-1.5">
            <p className="text-[7px] tracking-[0.3em] uppercase font-sans mb-0.5" style={{ color: "#B8960C" }}>{t.rsvp}</p>
            <p className="text-[8px] font-sans" style={{ color: "#8B7355" }}>{d.rsvp_email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── 29. Blueprint (Technical Romantic) ───────────────────────────────────────
export function Blueprint({ data: d, t: tProp }: TP) {
  const t = tProp ?? DEFAULT_T;
  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center" style={{ background: "#1a3a5c" }}>
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 16} x2="400" y2={i * 16} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
        ))}
        {Array.from({ length: 26 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 16} y1="0" x2={i * 16} y2="300" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
        ))}
        {/* Thick border */}
        <rect x="16" y="12" width="368" height="276" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none"/>
        <rect x="22" y="18" width="356" height="264" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" fill="none"/>
        {/* Title block bottom right */}
        <rect x="290" y="240" width="94" height="36" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" fill="none"/>
        <line x1="290" y1="252" x2="384" y2="252" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
        {/* Cross hairs */}
        <circle cx="32" cy="24" r="4" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" fill="none"/>
        <line x1="28" y1="24" x2="36" y2="24" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"/>
        <line x1="32" y1="20" x2="32" y2="28" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"/>
      </svg>
      <div className="relative z-10 text-center px-12">
        <p className="text-[7px] tracking-[0.6em] uppercase font-sans font-light mb-5" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>CEREMONY — DRAWING No. 001</p>
        <h1 className="font-serif text-4xl font-light italic leading-tight" style={{ color: "#FFFFFF" }}>{P1(d, t)}</h1>
        <p className="text-base tracking-widest my-1" style={{ color: "rgba(255,255,255,0.4)" }}>&amp;</p>
        <h1 className="font-serif text-4xl font-light italic leading-tight mb-5" style={{ color: "#FFFFFF" }}>{P2(d, t)}</h1>
        <p className="text-[9px] tracking-[0.4em] uppercase font-sans font-light mb-1" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "monospace" }}>{DATE(d, t)}</p>
        {d.time && <p className="text-[9px] tracking-wider font-sans font-light mb-1" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>{d.time}</p>}
        <p className="font-serif italic text-sm mb-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>{VENUE(d, t)}</p>
        <p className="text-[9px] tracking-wider font-sans font-light mb-3" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>{LOC(d, t)}</p>
        {d.message && <p className="font-serif italic text-xs leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>&ldquo;{d.message}&rdquo;</p>}
        {d.rsvp_email && <p className="text-[8px] tracking-[0.4em] uppercase font-sans" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>RSVP · {d.rsvp_email}</p>}
      </div>
    </div>
  );
}

// ── 30. Solstice (Terracotta Warmth) ─────────────────────────────────────────
export function Solstice({ data: d, t: tProp }: TP) {
  const t = tProp ?? DEFAULT_T;
  return (
    <div className="w-full h-full flex relative overflow-hidden" style={{ background: "#F2E8D9" }}>
      {/* Left: warm color block */}
      <div className="flex flex-col items-center justify-center" style={{ width: "35%", background: "#C65D3A", padding: "24px 16px" }}>
        {/* Sun SVG */}
        <svg viewBox="0 0 80 80" className="w-14 h-14 mb-4">
          <circle cx="40" cy="40" r="16" fill="#F2E8D9" opacity="0.9"/>
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            return <line key={i} x1={40 + 20 * Math.cos(angle)} y1={40 + 20 * Math.sin(angle)} x2={40 + 28 * Math.cos(angle)} y2={40 + 28 * Math.sin(angle)} stroke="#F2E8D9" strokeWidth="1.5" opacity="0.7"/>;
          })}
        </svg>
        <p className="text-[8px] tracking-[0.3em] uppercase font-sans font-light text-center" style={{ color: "rgba(242,232,217,0.7)" }}>{DATE(d, t)}</p>
        {d.time && <p className="text-[10px] font-sans font-light text-center mt-1" style={{ color: "rgba(242,232,217,0.7)" }}>{d.time}</p>}
      </div>
      {/* Right: text */}
      <div className="flex-1 flex flex-col items-start justify-center px-7 py-6">
        <p className="text-[8px] tracking-[0.4em] uppercase font-sans font-light mb-5" style={{ color: "#C65D3A" }}>{t.weddingInvitation}</p>
        <h1 className="font-serif text-3xl font-light italic leading-tight mb-0.5" style={{ color: "#2C1810" }}>{P1(d, t)}</h1>
        <p className="text-lg tracking-widest mb-0.5" style={{ color: "#C65D3A" }}>&amp;</p>
        <h1 className="font-serif text-3xl font-light italic leading-tight mb-5" style={{ color: "#2C1810" }}>{P2(d, t)}</h1>
        <div className="w-12 h-px mb-4" style={{ background: "#C9A96E" }} />
        <p className="font-serif italic text-sm mb-1" style={{ color: "#2C1810" }}>{VENUE(d, t)}</p>
        <p className="text-[10px] tracking-wider font-sans font-light mb-3" style={{ color: "#8B6B50" }}>{LOC(d, t)}</p>
        {d.message && <p className="text-[9px] italic font-sans leading-relaxed" style={{ color: "#8B6B50" }}>&ldquo;{d.message}&rdquo;</p>}
        {d.rsvp_email && <p className="text-[8px] tracking-[0.3em] uppercase font-sans mt-3" style={{ color: "#C65D3A" }}>RSVP · {d.rsvp_email}</p>}
      </div>
    </div>
  );
}

// ── Registry ────────────────────────────────────────────────────────────────
export const TEMPLATE_REGISTRY = [
  // ── Vertical (3:4) ──────────────────────────────────────────────────────────
  { id: "elegant-minimal", name: "Élégant",    tag: "Minimalist · Timeless",      component: Elegant,    orientation: "vertical",   supportsImage: false, image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80&fit=crop" },
  { id: "jardin",          name: "Jardin",     tag: "Botanical · Romantic",       component: Jardin,     orientation: "vertical",   supportsImage: false, image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=600&q=80&fit=crop" },
  { id: "lumiere",         name: "Lumière",    tag: "Art Deco · Geometric",       component: Lumiere,    orientation: "vertical",   supportsImage: false, image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80&fit=crop" },
  { id: "nocturne",        name: "Nocturne",   tag: "Dark · Dramatic",            component: Nocturne,   orientation: "vertical",   supportsImage: false, image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80&fit=crop" },
  { id: "bloom",           name: "Bloom",      tag: "Floral · Dreamy",            component: Bloom,      orientation: "vertical",   supportsImage: false, image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600&q=80&fit=crop" },
  { id: "gatsby",          name: "Gatsby",     tag: "Art Deco · 1920s",           component: Gatsby,     orientation: "vertical",   supportsImage: false, image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80&fit=crop" },
  { id: "nordic",          name: "Nordic",     tag: "Scandinavian · Clean",       component: Nordic,     orientation: "vertical",   supportsImage: false, image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=600&q=80&fit=crop" },
  { id: "sakura",          name: "Sakura",     tag: "Blossom · Delicate",         component: Sakura,     orientation: "vertical",   supportsImage: false, image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=600&q=80&fit=crop" },
  { id: "riviera",         name: "Riviera",    tag: "Mediterranean · Arch",       component: Riviera,    orientation: "vertical",   supportsImage: false, image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80&fit=crop" },
  { id: "versailles",      name: "Versailles", tag: "Baroque · Ornate",           component: Versailles, orientation: "vertical",   supportsImage: false, image: "https://images.unsplash.com/photo-1551009175-8a68da93d5f9?w=600&q=80&fit=crop" },
  { id: "celestial",       name: "Celestial",  tag: "Stars · Mystical",           component: Celestial,  orientation: "vertical",   supportsImage: false, image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&q=80&fit=crop" },
  { id: "tuscany",         name: "Tuscany",    tag: "Italian · Rustic",           component: Tuscany,    orientation: "vertical",   supportsImage: false, image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&q=80&fit=crop" },
  { id: "noir",            name: "Noir",       tag: "Bold · Typography",          component: Noir,       orientation: "vertical",   supportsImage: false, image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=600&q=80&fit=crop" },
  { id: "moderne",         name: "Moderne",    tag: "Swiss · Grid",               component: Moderne,    orientation: "vertical",   supportsImage: false, image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80&fit=crop" },
  { id: "parchment",       name: "Parchment",  tag: "Vintage · Nostalgic",        component: Parchment,  orientation: "vertical",   supportsImage: false, image: "https://images.unsplash.com/photo-1516562309708-05f3b220653f?w=600&q=80&fit=crop" },
  { id: "eden",            name: "Eden",       tag: "Lush · Tropical",            component: Eden,       orientation: "vertical",   supportsImage: false, image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80&fit=crop" },
  { id: "venezia",         name: "Venezia",    tag: "Gothic · Venetian",          component: Venezia,    orientation: "vertical",   supportsImage: false, image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80&fit=crop" },
  { id: "cote",            name: "Côte",       tag: "French · Coastal",           component: Cote,       orientation: "vertical",   supportsImage: false, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80&fit=crop" },
  { id: "aurora",          name: "Aurora",     tag: "Northern Lights · Modern",   component: Aurora,     orientation: "vertical",   supportsImage: false, image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80&fit=crop" },
  { id: "monogram",        name: "Monogram",   tag: "Classic · Initials",         component: Monogram,   orientation: "vertical",   supportsImage: false, image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80&fit=crop" },
  // ── New Vertical (with photo) ────────────────────────────────────────────────
  { id: "portrait",        name: "Portrait",   tag: "Photo · Cinematic",          component: Portrait,   orientation: "vertical",   supportsImage: true,  image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80&fit=crop" },
  { id: "manuscript",      name: "Manuscript", tag: "Letter · Handwritten",       component: Manuscript, orientation: "vertical",   supportsImage: false, image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80&fit=crop" },
  { id: "cathedral",       name: "Cathedral",  tag: "Gothic · Dark Magic",        component: Cathedral,  orientation: "vertical",   supportsImage: false, image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80&fit=crop" },
  { id: "wildflower",      name: "Wildflower", tag: "Meadow · Watercolor",        component: Wildflower, orientation: "vertical",   supportsImage: false, image: "https://images.unsplash.com/photo-1490750967868-88df5691cc5f?w=600&q=80&fit=crop" },
  { id: "prism",           name: "Prism",      tag: "Geometric · Bold",           component: Prism,      orientation: "vertical",   supportsImage: false, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&fit=crop" },
  // ── Horizontal (4:3) ────────────────────────────────────────────────────────
  { id: "cinema",          name: "Cinéma",     tag: "Letterbox · Photo",          component: Cinema,     orientation: "horizontal", supportsImage: true,  image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=80&fit=crop" },
  { id: "diptych",         name: "Diptych",    tag: "Split · Photo + Text",       component: Diptych,    orientation: "horizontal", supportsImage: true,  image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80&fit=crop" },
  { id: "pavilion",        name: "Pavilion",   tag: "Arch · Mediterranean",       component: Pavilion,   orientation: "horizontal", supportsImage: false, image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80&fit=crop" },
  { id: "blueprint",       name: "Blueprint",  tag: "Technical · Modern",         component: Blueprint,  orientation: "horizontal", supportsImage: false, image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80&fit=crop" },
  { id: "solstice",        name: "Solstice",   tag: "Terracotta · Warm",          component: Solstice,   orientation: "horizontal", supportsImage: false, image: "https://images.unsplash.com/photo-1533854775446-95c4609da544?w=600&q=80&fit=crop" },
];

export function getTemplateComponent(id: string) {
  return TEMPLATE_REGISTRY.find((t) => t.id === id)?.component ?? Elegant;
}
