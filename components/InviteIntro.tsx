"use client";

import { useEffect, useState } from "react";

// ─── shared skip hint ────────────────────────────────────────────────────────
function SkipHint() {
  return (
    <p style={{
      fontFamily: "Jost, sans-serif",
      fontSize: 10,
      letterSpacing: "0.18em",
      color: "#9B9490",
      marginTop: 28,
      textTransform: "uppercase",
    }}>
      tap to skip
    </p>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ENVELOPE INTRO  (Standard)
// ─────────────────────────────────────────────────────────────────────────────
export function EnvelopeIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);
  // 0 = closed envelope
  // 1 = flap opening
  // 2 = card rising
  // 3 = fade out

  useEffect(() => {
    const ts = [
      setTimeout(() => setPhase(1), 700),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2700),
      setTimeout(onComplete, 3300),
    ];
    return () => ts.forEach(clearTimeout);
  }, [onComplete]);

  function skip() {
    setPhase(3);
    setTimeout(onComplete, 500);
  }

  const W = 260;
  const bodyH = 160;
  const flapH = 90;

  return (
    <div
      onClick={skip}
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        background: "#FAF8F4",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        opacity: phase === 3 ? 0 : 1,
        transition: "opacity 0.7s ease",
        pointerEvents: phase === 3 ? "none" : "auto",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      {/* ── ornament above envelope ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
        <div style={{ height: 1, width: 28, background: "#C9A96E", opacity: 0.4 }} />
        <span style={{ color: "#C9A96E", fontSize: 14, opacity: 0.8 }}>✦</span>
        <div style={{ height: 1, width: 28, background: "#C9A96E", opacity: 0.4 }} />
      </div>

      {/* ── envelope assembly ── */}
      <div style={{ position: "relative", width: W, height: bodyH + flapH * 0.6 }}>

        {/* invitation card — rises from inside */}
        <div style={{
          position: "absolute",
          left: "50%",
          bottom: 16,
          transform: `translateX(-50%) translateY(${phase >= 2 ? "-155px" : "8px"})`,
          transition: phase >= 2
            ? "transform 1.1s cubic-bezier(0.34, 1.45, 0.64, 1)"
            : "none",
          width: W - 50,
          background: "white",
          boxShadow: "0 12px 40px rgba(0,0,0,0.14)",
          padding: "20px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
          opacity: phase >= 1 ? 1 : 0,
          transitionProperty: "transform, opacity",
          transitionDuration: phase >= 2 ? "1.1s" : "0.4s",
          zIndex: 1,
        }}>
          <div style={{ height: 1, width: "72%", background: "#C9A96E", opacity: 0.6 }} />
          <p style={{ margin: 0, fontFamily: "Cormorant Garamond, serif", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "#C9A96E" }}>
            Wedding Invitation
          </p>
          <p style={{ margin: 0, fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontStyle: "italic", fontWeight: 300, color: "#1C1917" }}>
            Emma &amp; James
          </p>
          <p style={{ margin: 0, fontFamily: "Jost, sans-serif", fontSize: 9, letterSpacing: "0.18em", color: "#6B6359", fontWeight: 300, textTransform: "uppercase" }}>
            September 14, 2025
          </p>
          <div style={{ height: 1, width: "72%", background: "#C9A96E", opacity: 0.6 }} />
        </div>

        {/* envelope body */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: bodyH,
          background: "#F0DAAA",
          border: "1px solid rgba(201,169,110,0.45)",
          zIndex: 2,
          overflow: "hidden",
        }}>
          {/* left inner flap triangle */}
          <div style={{
            position: "absolute", bottom: 0, left: 0,
            width: 0, height: 0,
            borderStyle: "solid",
            borderWidth: `0 0 ${bodyH * 0.52}px ${W / 2}px`,
            borderColor: `transparent transparent #E8CE90 transparent`,
          }} />
          {/* right inner flap triangle */}
          <div style={{
            position: "absolute", bottom: 0, right: 0,
            width: 0, height: 0,
            borderStyle: "solid",
            borderWidth: `0 ${W / 2}px ${bodyH * 0.52}px 0`,
            borderColor: `transparent #E8CE90 transparent transparent`,
          }} />
        </div>

        {/* envelope flap — slides up + fades when opening */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: W,
          height: flapH,
          transformOrigin: "bottom center",
          transform: `perspective(500px) rotateX(${phase >= 1 ? "-170deg" : "0deg"})`,
          transition: "transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: phase >= 1 ? 0 : 4,
          overflow: "visible",
        }}>
          <div style={{
            width: "100%",
            height: "100%",
            background: "#EDD090",
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            border: "1px solid rgba(201,169,110,0.3)",
          }} />
        </div>

      </div>

      {/* ── Forevermore label ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 36 }}>
        <div style={{ height: 1, width: 24, background: "#C9A96E", opacity: 0.35 }} />
        <p style={{ margin: 0, fontFamily: "Cormorant Garamond, serif", fontSize: 13, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A96E", fontStyle: "italic", opacity: 0.85 }}>
          Forevermore
        </p>
        <div style={{ height: 1, width: 24, background: "#C9A96E", opacity: 0.35 }} />
      </div>

      <SkipHint />
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

        {/* wax seal — overlaid on scroll center */}
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

      <SkipHint />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function InviteIntro({
  plan,
  onComplete,
}: {
  plan: string;
  onComplete: () => void;
}) {
  if (plan === "standard") return <EnvelopeIntro onComplete={onComplete} />;
  if (plan === "pro") return <ScrollIntro onComplete={onComplete} />;
  return null;
}
