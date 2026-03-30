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
// ENVELOPE INTRO  (Standard) — full-screen bi-fold that opens from center
// ─────────────────────────────────────────────────────────────────────────────
export function EnvelopeIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);
  // 0 = closed, seal visible
  // 1 = seal shakes
  // 2 = seal cracks, panels fold open
  // 3 = fade out

  useEffect(() => {
    const ts = [
      setTimeout(() => setPhase(1), 900),
      setTimeout(() => setPhase(2), 1600),
      setTimeout(() => setPhase(3), 3100),
      setTimeout(onComplete, 3800),
    ];
    return () => ts.forEach(clearTimeout);
  }, [onComplete]);

  function skip() {
    setPhase(3);
    setTimeout(onComplete, 500);
  }

  const open = phase >= 2;

  // Shared panel decoration
  function PanelInner({ side }: { side: "left" | "right" }) {
    return (
      <>
        {/* outer gold border */}
        <div style={{
          position: "absolute", inset: 14,
          border: "1px solid rgba(201,169,110,0.5)",
          pointerEvents: "none",
        }} />
        {/* inner gold border */}
        <div style={{
          position: "absolute", inset: 22,
          border: "1px solid rgba(201,169,110,0.22)",
          pointerEvents: "none",
        }} />
        {/* corner ✦ ornaments */}
        {[{ top: 20, [side === "left" ? "left" : "right"]: 20 },
          { bottom: 20, [side === "left" ? "left" : "right"]: 20 }].map((pos, i) => (
          <div key={i} style={{
            position: "absolute", ...pos,
            color: "#C9A96E", fontSize: 9, opacity: 0.55,
            fontFamily: "serif",
          }}>✦</div>
        ))}
        {/* horizontal center crease line (runs to the seam) */}
        <div style={{
          position: "absolute",
          top: "50%",
          [side === "left" ? "left" : "right"]: 28,
          [side === "left" ? "right" : "left"]: 0,
          height: 1,
          background: "linear-gradient(to " + (side === "left" ? "right" : "left") + ", transparent, rgba(201,169,110,0.35))",
          transform: "translateY(-0.5px)",
        }} />
        {/* vertical edge shadow (seam side) */}
        <div style={{
          position: "absolute",
          top: 0, bottom: 0,
          [side === "left" ? "right" : "left"]: 0,
          width: 18,
          background: side === "left"
            ? "linear-gradient(to right, transparent, rgba(0,0,0,0.06))"
            : "linear-gradient(to left, transparent, rgba(0,0,0,0.06))",
        }} />
        {/* "Forevermore" watermark — only visible on the left panel */}
        {side === "left" && (
          <div style={{
            position: "absolute",
            bottom: 36,
            left: 0, right: 0,
            textAlign: "center",
            fontFamily: "Cormorant Garamond, serif",
            fontSize: 11,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            fontStyle: "italic",
            color: "#C9A96E",
            opacity: 0.45,
          }}>Forevermore</div>
        )}
        {/* "Wedding Invitation" — only on right panel */}
        {side === "right" && (
          <div style={{
            position: "absolute",
            top: 36,
            left: 0, right: 0,
            textAlign: "center",
            fontFamily: "Cormorant Garamond, serif",
            fontSize: 10,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#8B7355",
            opacity: 0.5,
          }}>Wedding Invitation</div>
        )}
      </>
    );
  }

  return (
    <div
      onClick={skip}
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        background: "#FAF8F4",
        overflow: "hidden",
        opacity: phase === 3 ? 0 : 1,
        transition: "opacity 0.85s ease",
        pointerEvents: phase === 3 ? "none" : "auto",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      {/* ── perspective wrapper ── */}
      <div style={{
        position: "absolute", inset: 0,
        perspective: "1400px",
        perspectiveOrigin: "50% 50%",
      }}>

        {/* LEFT PANEL — hinges at its right edge (screen center) */}
        <div style={{
          position: "absolute",
          top: 0, left: 0,
          width: "50%", height: "100%",
          transformOrigin: "100% 50%",
          transform: `rotateY(${open ? "-165deg" : "0deg"})`,
          transition: open ? "transform 1.4s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
          backfaceVisibility: "hidden",
          background: "linear-gradient(160deg, #F8EDD6 0%, #F0E0BA 50%, #F5E8CC 100%)",
          boxShadow: open ? "none" : "4px 0 24px rgba(0,0,0,0.08)",
        }}>
          <PanelInner side="left" />
        </div>

        {/* RIGHT PANEL — hinges at its left edge (screen center) */}
        <div style={{
          position: "absolute",
          top: 0, right: 0,
          width: "50%", height: "100%",
          transformOrigin: "0% 50%",
          transform: `rotateY(${open ? "165deg" : "0deg"})`,
          transition: open ? "transform 1.4s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
          backfaceVisibility: "hidden",
          background: "linear-gradient(200deg, #F5E8CC 0%, #F0E0BA 50%, #F8EDD6 100%)",
          boxShadow: open ? "none" : "-4px 0 24px rgba(0,0,0,0.08)",
        }}>
          <PanelInner side="right" />
        </div>

      </div>

      {/* ── center seam line ── */}
      <div style={{
        position: "absolute",
        left: "50%", top: "8%", bottom: "8%",
        width: 1,
        background: "rgba(201,169,110,0.3)",
        transform: "translateX(-0.5px)",
        zIndex: 3,
        opacity: open ? 0 : 1,
        transition: "opacity 0.25s ease",
      }} />

      {/* ── wax seal ── */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: `translate(-50%, -50%) scale(${open ? 0 : 1}) rotate(${open ? 40 : 0}deg)`,
        transition: open
          ? "transform 0.38s cubic-bezier(0.4, 0, 0.8, 1)"
          : "none",
        animation: phase === 1 ? "sealShake 0.12s ease-in-out 5" : "none",
        zIndex: 5,
        width: 80, height: 80,
        borderRadius: "50%",
        background: "radial-gradient(circle at 36% 30%, #922020, #500E0E)",
        border: "2px solid rgba(201,169,110,0.85)",
        boxShadow: "0 6px 28px rgba(0,0,0,0.28), inset 0 1px 4px rgba(255,255,255,0.12)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ color: "rgba(201,169,110,0.95)", fontSize: 26, lineHeight: 1 }}>✦</span>
      </div>

      {/* ── "tap to open" hint ── */}
      <div style={{
        position: "absolute",
        bottom: 36, left: "50%",
        transform: "translateX(-50%)",
        zIndex: 5,
        opacity: open ? 0 : 0.65,
        transition: "opacity 0.3s ease",
        whiteSpace: "nowrap",
      }}>
        <p style={{
          margin: 0,
          fontFamily: "Jost, sans-serif",
          fontSize: 10,
          letterSpacing: "0.2em",
          color: "#9B9490",
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
