"use client";

import { useEffect, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// ENVELOPE INTRO  (Standard) — full-screen bi-fold, slides apart from center
// ─────────────────────────────────────────────────────────────────────────────
export function EnvelopeIntro({
  onComplete,
  partner1,
  partner2,
}: {
  onComplete: () => void;
  partner1: string;
  partner2: string;
}) {
  const [phase, setPhase] = useState(0);
  // 0 = closed, seal visible
  // 1 = seal shakes
  // 2 = panels slide apart
  // 3 = fade out

  useEffect(() => {
    const ts = [
      setTimeout(() => setPhase(1), 900),
      setTimeout(() => setPhase(2), 1600),
      setTimeout(() => setPhase(3), 3000),
      setTimeout(onComplete, 3700),
    ];
    return () => ts.forEach(clearTimeout);
  }, [onComplete]);

  function skip() {
    setPhase(3);
    setTimeout(onComplete, 500);
  }

  const open = phase >= 2;
  const bg = "#19160F";

  return (
    <div
      onClick={skip}
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        background: bg,
        overflow: "hidden",
        opacity: phase === 3 ? 0 : 1,
        transition: "opacity 0.85s ease",
        pointerEvents: phase === 3 ? "none" : "auto",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      {/* LEFT PANEL — full X fold: top-left + bottom-left flap zones */}
      <div style={{
        position: "absolute",
        top: 0, left: 0,
        width: "50%", height: "100%",
        transform: `translateX(${open ? "-100%" : "0"})`,
        transition: open ? "transform 1.1s cubic-bezier(0.76, 0, 0.24, 1)" : "none",
        overflow: "hidden",
      }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="none">
          {/* top-left flap zone */}
          <polygon points="0,0 100%,0 100%,50%" fill="rgba(255,255,255,0.04)" />
          {/* bottom-left flap zone */}
          <polygon points="0,100% 100%,100% 100%,50%" fill="rgba(255,255,255,0.025)" />
          {/* fold lines */}
          <line x1="0" y1="0"   x2="100%" y2="50%" stroke="rgba(255,255,255,0.09)" strokeWidth="0.8" />
          <line x1="0" y1="100%" x2="100%" y2="50%" stroke="rgba(255,255,255,0.09)" strokeWidth="0.8" />
        </svg>
        <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: 40, background: "linear-gradient(to right, transparent, rgba(0,0,0,0.18))" }} />
      </div>

      {/* RIGHT PANEL — full X fold: top-right + bottom-right flap zones */}
      <div style={{
        position: "absolute",
        top: 0, right: 0,
        width: "50%", height: "100%",
        transform: `translateX(${open ? "100%" : "0"})`,
        transition: open ? "transform 1.1s cubic-bezier(0.76, 0, 0.24, 1)" : "none",
        overflow: "hidden",
      }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="none">
          {/* top-right flap zone */}
          <polygon points="100%,0 0,0 0,50%" fill="rgba(255,255,255,0.04)" />
          {/* bottom-right flap zone */}
          <polygon points="100%,100% 0,100% 0,50%" fill="rgba(255,255,255,0.025)" />
          {/* fold lines */}
          <line x1="100%" y1="0"   x2="0" y2="50%" stroke="rgba(255,255,255,0.09)" strokeWidth="0.8" />
          <line x1="100%" y1="100%" x2="0" y2="50%" stroke="rgba(255,255,255,0.09)" strokeWidth="0.8" />
        </svg>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 40, background: "linear-gradient(to left, transparent, rgba(0,0,0,0.18))" }} />
      </div>

      {/* center seam */}
      <div style={{
        position: "absolute",
        left: "50%", top: 0, bottom: 0,
        width: 1,
        background: "rgba(255,255,255,0.06)",
        transform: "translateX(-0.5px)",
        zIndex: 3,
        opacity: open ? 0 : 1,
        transition: "opacity 0.2s ease",
      }} />

      {/* ── gold wax seal — round, organic ── */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: `translate(-50%, -50%) scale(${open ? 0 : 1}) rotate(${open ? 25 : 0}deg)`,
        transition: open ? "transform 0.4s cubic-bezier(0.4, 0, 0.8, 1)" : "none",
        animation: phase === 1 ? "sealShake 0.12s ease-in-out 5" : "none",
        zIndex: 5,
        width: 118,
        height: 118,
        /* organic blob — slightly uneven like real melted wax */
        borderRadius: "50% 46% 52% 48% / 48% 52% 46% 52%",
        background: [
          "radial-gradient(circle at 36% 26%, rgba(255,248,190,0.75) 0%, transparent 38%)",
          "radial-gradient(circle at 68% 72%, rgba(90,55,5,0.55) 0%, transparent 42%)",
          "linear-gradient(140deg, #D8AC3C 0%, #C09828 20%, #A87E18 45%, #8A6210 70%, #6A4A08 100%)",
        ].join(", "),
        boxShadow: [
          "0 18px 56px rgba(0,0,0,0.75)",
          "0 6px 20px rgba(0,0,0,0.55)",
          "inset 0 4px 12px rgba(255,238,140,0.22)",
          "inset 0 -6px 14px rgba(0,0,0,0.45)",
        ].join(", "),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {/* impressed outer ring */}
        <div style={{
          position: "absolute", inset: 8,
          borderRadius: "50%",
          border: "1.5px solid rgba(60,38,2,0.55)",
          boxShadow: "inset 0 1px 3px rgba(255,215,60,0.18), 0 1px 2px rgba(0,0,0,0.2)",
        }} />
        {/* specular highlight */}
        <div style={{
          position: "absolute",
          top: 12, left: 18,
          width: 28, height: 12,
          borderRadius: "50%",
          background: "rgba(255,252,210,0.5)",
          transform: "rotate(-25deg)",
          filter: "blur(4px)",
        }} />
        {/* wedding rings SVG — engraved */}
        <svg
          viewBox="0 0 64 52"
          width="62"
          height="50"
          style={{ position: "relative", zIndex: 1 }}
        >
          {/* diamond on top */}
          <polygon
            points="26,2 20,10 26,14 32,10"
            fill="none"
            stroke="rgba(55,32,2,0.75)"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <line x1="20" y1="10" x2="32" y2="10" stroke="rgba(55,32,2,0.75)" strokeWidth="1.5" />
          {/* left ring */}
          <circle cx="24" cy="34" r="14" fill="none" stroke="rgba(55,32,2,0.75)" strokeWidth="3.2" />
          {/* right ring — overlapping */}
          <circle cx="40" cy="34" r="14" fill="none" stroke="rgba(55,32,2,0.75)" strokeWidth="3.2" />
          {/* mask the left side of the right ring where it's behind the left ring */}
          <path
            d="M 40,20 A 14,14 0 0,0 40,48"
            fill="none"
            stroke={`rgba(${parseInt("A8",16)},${parseInt("7E",16)},${parseInt("18",16)},1)`}
            strokeWidth="4.5"
          />
          {/* redraw left ring front arc */}
          <path
            d="M 24,20 A 14,14 0 0,1 24,48"
            fill="none"
            stroke="rgba(55,32,2,0.75)"
            strokeWidth="3.2"
          />
        </svg>
      </div>

      {/* tap hint */}
      <div style={{
        position: "absolute",
        bottom: 40, left: "50%",
        transform: "translateX(-50%)",
        zIndex: 5,
        opacity: open ? 0 : 0.4,
        transition: "opacity 0.3s ease",
        whiteSpace: "nowrap",
      }}>
        <p style={{
          margin: 0,
          fontFamily: "Jost, sans-serif",
          fontSize: 10,
          letterSpacing: "0.22em",
          color: "rgba(255,255,255,0.5)",
          textTransform: "uppercase",
        }}>tap to open</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WAX SEAL + SCROLL INTRO  (Pro)
// ─────────────────────────────────────────────────────────────────────────────
export function ScrollIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);
  // 0 = seal visible, still
  // 1 = seal shaking
  // 2 = seal breaks / scroll unfurls
  // 3 = scroll content fades in
  // 4 = fade out

  useEffect(() => {
    const ts = [
      setTimeout(() => setPhase(1), 900),
      setTimeout(() => setPhase(2), 1700),
      setTimeout(() => setPhase(3), 2700),
      setTimeout(() => setPhase(4), 4000),
      setTimeout(onComplete, 4600),
    ];
    return () => ts.forEach(clearTimeout);
  }, [onComplete]);

  function skip() {
    setPhase(4);
    setTimeout(onComplete, 500);
  }

  const scrollW = 290;
  const scrollH = 380;
  const rollerH = 22;

  return (
    <div
      onClick={skip}
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        background: "#18130D",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        opacity: phase === 4 ? 0 : 1,
        transition: "opacity 0.7s ease",
        pointerEvents: phase === 4 ? "none" : "auto",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      {/* ambient glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at center, rgba(201,169,110,0.07) 0%, transparent 65%)",
      }} />

      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>

        {/* top roller */}
        <div style={{
          width: scrollW + 20,
          height: rollerH,
          background: "linear-gradient(to right, #5C4010, #C9A96E, #F5D98B, #C9A96E, #5C4010)",
          borderRadius: 4,
          boxShadow: "0 3px 12px rgba(0,0,0,0.5)",
          marginBottom: -rollerH / 2,
          zIndex: 3,
          position: "relative",
          opacity: phase >= 2 ? 1 : 0,
          transform: `translateY(${phase >= 2 ? 0 : 10}px)`,
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }} />

        {/* scroll body */}
        <div style={{
          width: scrollW,
          height: phase >= 2 ? scrollH : 84,
          transition: "height 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
          background: "linear-gradient(to right, #E8D5A8, #F5E8CC, #FBF0D8, #F5E8CC, #E8D5A8)",
          border: "1px solid rgba(201,169,110,0.4)",
          boxShadow: "0 16px 60px rgba(0,0,0,0.5)",
          overflow: "hidden",
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {/* scroll content */}
          <div style={{
            padding: "28px 32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            opacity: phase >= 3 ? 1 : 0,
            transition: "opacity 0.9s ease",
            textAlign: "center",
          }}>
            <div style={{ height: 1, width: "70%", background: "#C9A96E", opacity: 0.6 }} />
            <p style={{ margin: 0, fontFamily: "Cormorant Garamond, serif", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "#8B6914" }}>
              Together With Their Families
            </p>
            <p style={{ margin: 0, fontFamily: "Cormorant Garamond, serif", fontSize: 32, fontStyle: "italic", fontWeight: 300, color: "#1C1917", lineHeight: 1.25 }}>
              Emma<br />
              <span style={{ fontSize: 20, color: "#C9A96E" }}>&amp;</span><br />
              James
            </p>
            <p style={{ margin: 0, fontFamily: "Jost, sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "#6B6359", fontWeight: 300, textTransform: "uppercase" }}>
              Request the Pleasure of Your Company
            </p>
            <div style={{ height: 1, width: "70%", background: "#C9A96E", opacity: 0.6 }} />
            <p style={{ margin: 0, fontFamily: "Cormorant Garamond, serif", fontSize: 15, color: "#3B2D1A" }}>September 14, 2025</p>
            <p style={{ margin: 0, fontFamily: "Cormorant Garamond, serif", fontSize: 13, fontStyle: "italic", color: "#6B6359" }}>Grand Estate · Florence</p>
          </div>
        </div>

        {/* bottom roller */}
        <div style={{
          width: scrollW + 20,
          height: rollerH,
          background: "linear-gradient(to right, #5C4010, #C9A96E, #F5D98B, #C9A96E, #5C4010)",
          borderRadius: 4,
          boxShadow: "0 -3px 12px rgba(0,0,0,0.5)",
          marginTop: -rollerH / 2,
          zIndex: 3,
          position: "relative",
          opacity: phase >= 2 ? 1 : 0,
          transform: `translateY(${phase >= 2 ? 0 : -10}px)`,
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }} />

        {/* wax seal */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${phase >= 2 ? 0 : 1}) rotate(${phase >= 2 ? 45 : 0}deg)`,
          transition: "transform 0.45s cubic-bezier(0.4, 0, 0.8, 1)",
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "radial-gradient(circle at 38% 32%, #8B2020, #4A0E0E)",
          border: "2.5px solid rgba(201,169,110,0.85)",
          boxShadow: "0 6px 24px rgba(0,0,0,0.6), inset 0 1px 4px rgba(255,255,255,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 4,
          animation: phase === 1 ? "sealShake 0.1s ease-in-out 6" : "none",
        }}>
          <span style={{ color: "rgba(201,169,110,0.95)", fontSize: 26 }}>✦</span>
        </div>

      </div>

      {/* Forevermore label */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 44 }}>
        <div style={{ height: 1, width: 24, background: "#C9A96E", opacity: 0.25 }} />
        <p style={{ margin: 0, fontFamily: "Cormorant Garamond, serif", fontSize: 13, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A96E", fontStyle: "italic", opacity: 0.6 }}>
          Forevermore
        </p>
        <div style={{ height: 1, width: 24, background: "#C9A96E", opacity: 0.25 }} />
      </div>

      <p style={{ margin: "28px 0 0", fontFamily: "Jost, sans-serif", fontSize: 10, letterSpacing: "0.18em", color: "#9B9490", textTransform: "uppercase" }}>
        tap to skip
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function InviteIntro({
  plan,
  onComplete,
  partner1,
  partner2,
}: {
  plan: string;
  onComplete: () => void;
  partner1: string;
  partner2: string;
}) {
  if (plan === "standard") return <EnvelopeIntro onComplete={onComplete} partner1={partner1} partner2={partner2} />;
  if (plan === "pro") return <ScrollIntro onComplete={onComplete} />;
  return null;
}
