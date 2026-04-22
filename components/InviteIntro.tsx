"use client";

import { useEffect, useRef, useState, useMemo } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// ENVELOPE INTRO  (Standard) — pixel-faithful implementation of design handoff
// ─────────────────────────────────────────────────────────────────────────────

// Easing helpers (ported from animations.jsx)
const easeOutCubic    = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInCubic     = (t: number) => t * t * t;
const easeInOutCubic  = (t: number) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;
const easeInBack      = (t: number) => { const c1=1.70158, c3=c1+1; return c3*t*t*t - c1*t*t; };

// Single-segment tween
function anim(t: number, from: number, to: number, start: number, end: number, ease = easeInOutCubic) {
  if (t <= start) return from;
  if (t >= end)   return to;
  return from + (to - from) * ease((t - start) / (end - start));
}

export function EnvelopeIntro({
  onComplete,
  partner1,
  partner2,
}: {
  onComplete: () => void;
  partner1: string;
  partner2: string;
}) {
  const [time, setTime] = useState(0);
  const startRef  = useRef<number | null>(null);
  const rafRef    = useRef<number | null>(null);
  const doneRef   = useRef(false);
  const [vw, setVw] = useState(390);
  const [vh, setVh] = useState(844);

  useEffect(() => {
    setVw(window.innerWidth);
    setVh(window.innerHeight);
    const onResize = () => { setVw(window.innerWidth); setVh(window.innerHeight); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const DURATION = 8.8;

  useEffect(() => {
    const step = (ts: number) => {
      if (startRef.current == null) startRef.current = ts;
      const elapsed = (ts - startRef.current) / 1000;
      setTime(elapsed);
      if (elapsed < DURATION && !doneRef.current) {
        rafRef.current = requestAnimationFrame(step);
      } else if (!doneRef.current) {
        doneRef.current = true;
        onComplete();
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [onComplete]);

  function skip() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (!doneRef.current) { doneRef.current = true; onComplete(); }
  }

  // ── Envelope geometry ──────────────────────────────────────────────────────
  const EW = 580, EH = 390;
  const envScale = Math.min((vw * 0.96) / EW, (vh * 0.86) / EH);

  // ── Derived animation values ───────────────────────────────────────────────
  const t           = time;
  const fadeIn      = anim(t, 0, 1,  0.4, 1.5, easeOutCubic);
  const driftIn     = anim(t, 22, 0, 0.4, 1.7, easeOutCubic);
  const sealOpRaw   = t <= 2.3 ? 1 : t >= 3.2 ? 0 : 1 - easeInCubic((t-2.3)/(3.2-2.3));
  const sealOp      = sealOpRaw * fadeIn;
  const sealScale   = anim(t, 1, 1.1, 2.3, 3.2, easeInBack);
  const slideAmt    = EW * 0.54;
  const leftTx      = anim(t, 0, -slideAmt, 3.2, 6.4, easeInOutCubic);
  const rightTx     = anim(t, 0,  slideAmt, 3.2, 6.4, easeInOutCubic);
  const gapP        = anim(t, 0, 1, 3.2, 6.4, easeInOutCubic);
  const afterFade   = anim(t, 1, 0, 7.0, 8.5, easeInOutCubic);
  const totalOp     = fadeIn * afterFade;
  const liningOp    = gapP * afterFade;
  const breathe     = 1 + 0.0022 * Math.sin(t * 1.6) * Math.max(0, 1 - gapP * 2);
  const shadowBlur  = 22 + gapP * 10;
  const shadowOp    = (0.13 + gapP * 0.04) * afterFade;
  const skipOp      = Math.max(0, Math.min(fadeIn * (1 - gapP * 3), 0.45)) * afterFade;

  // ── Design tokens ──────────────────────────────────────────────────────────
  const foldLine      = "oklch(72% 0.038 70)";
  const envFace       = "oklch(95.5% 0.018 82)";
  const sealColor     = "oklch(27% 0.09 18)";
  const sealGoldColor = "oklch(72% 0.09 56)";
  const liningColor   = "oklch(84% 0.032 72)";
  const monL = partner1.charAt(0).toUpperCase();
  const monR = partner2.charAt(0).toUpperCase();

  // ── Wax seal geometry — computed once ─────────────────────────────────────
  const seal = useMemo(() => {
    const R = 42, D = (R + 14) * 2, cx = D / 2, cy = D / 2;
    const segs = 90;
    const edgePts = Array.from({ length: segs }, (_, i) => {
      const ang = (i * 2 * Math.PI) / segs - Math.PI / 2;
      const n = 1.0
        + 0.022 * Math.sin(i * 1.8  + 0.4)
        + 0.014 * Math.sin(i * 3.3  + 1.6)
        + 0.008 * Math.cos(i * 6.1  + 0.9)
        + 0.005 * Math.sin(i * 11.2 + 2.1);
      return `${cx + R * n * Math.cos(ang)},${cy + R * n * Math.sin(ang)}`;
    }).join(" ");
    const dripPts = (() => {
      const pts: string[] = [];
      const dCx = cx + 6, dCy = cy + R + 3;
      for (let i = 0; i <= 18; i++) {
        const a  = Math.PI * 0.7 + (i / 18) * Math.PI * 0.7;
        const dr = 7 + 2 * Math.sin(i * 0.9);
        pts.push(`${dCx + dr * Math.cos(a)},${dCy + dr * Math.sin(a) * 0.55}`);
      }
      return pts.join(" ");
    })();
    return { R, D, cx, cy, edgePts, dripPts };
  }, []);

  // ── Security lining stripes — computed once ────────────────────────────────
  const liningStripes = useMemo(() => {
    const spacing = 18;
    const out: React.ReactNode[] = [];
    for (let y = -EW; y < EW * 2; y += spacing) {
      out.push(
        <polygon key={y}
          points={`0,${y} ${EW},${y+EW} ${EW},${y+EW+spacing*0.5} 0,${y+spacing*0.5}`}
          fill="oklch(68% 0.050 67 / 0.28)"
        />
      );
    }
    return out;
  }, []);

  return (
    <div
      onClick={skip}
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: t >= 7.0 ? "none" : "auto",
        cursor: "pointer", userSelect: "none", overflow: "hidden",
      }}
    >
      {/* Stage background — cream, fades with envelope */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 74% 62% at 50% 46%, oklch(96% 0.012 84), oklch(90% 0.028 71))",
        opacity: afterFade,
      }} />

      {/* Viewport-scaled wrapper */}
      <div style={{ transform: `scale(${envScale})`, transformOrigin: "center", flexShrink: 0 }}>

        {/* Envelope group */}
        <div style={{
          position: "relative",
          width: EW, height: EH,
          opacity: totalOp,
          transform: `translateY(${driftIn}px) scale(${breathe})`,
          transformOrigin: "center",
          willChange: "transform, opacity",
        }}>

          {/* Drop shadow */}
          <div style={{
            position: "absolute",
            left: "6%", top: "68%", width: "88%", height: "40%",
            background: `oklch(38% 0.05 70 / ${shadowOp})`,
            borderRadius: "50%",
            filter: `blur(${shadowBlur}px)`,
            pointerEvents: "none",
          }} />

          {/* ── LAYER 1: Envelope back (always visible behind everything) ── */}
          <svg width={EW} height={EH}
            style={{ position: "absolute", top: 0, left: 0, zIndex: 1, display: "block" }}
          >
            <defs>
              <linearGradient id="ei_backGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="oklch(86% 0.030 74)" />
                <stop offset="100%" stopColor="oklch(82% 0.036 71)" />
              </linearGradient>
            </defs>
            {/* Back body */}
            <rect x="0" y="0" width={EW} height={EH} fill="url(#ei_backGrad)" />
            {/* Bottom V-flap */}
            <polygon points={`0,${EH} ${EW/2},${EH*0.52} ${EW},${EH}`} fill="oklch(79% 0.040 70)" />
            <line x1="0"    y1={EH}       x2={EW/2} y2={EH*0.52} stroke={foldLine} strokeWidth="1" opacity="0.7" />
            <line x1={EW/2} y1={EH*0.52}  x2={EW}   y2={EH}      stroke={foldLine} strokeWidth="1" opacity="0.7" />
            {/* Top flap */}
            <polygon points={`0,0 ${EW/2},${EH*0.52} ${EW},0`} fill="oklch(82% 0.034 72)" />
            <line x1="0"    y1="0"        x2={EW/2} y2={EH*0.52} stroke={foldLine} strokeWidth="1" opacity="0.65" />
            <line x1={EW/2} y1={EH*0.52}  x2={EW}   y2="0"       stroke={foldLine} strokeWidth="1" opacity="0.65" />
          </svg>

          {/* ── LAYER 2: Security lining interior ── */}
          <div style={{ position: "absolute", inset: 0, zIndex: 2, overflow: "hidden" }}>
            <svg width={EW} height={EH}
              style={{ position: "absolute", inset: 0, display: "block", opacity: liningOp }}
            >
              <defs>
                <linearGradient id="ei_lingGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor={liningColor} />
                  <stop offset="100%" stopColor="oklch(80% 0.038 70)" />
                </linearGradient>
                <radialGradient id="ei_lingCenter" cx="50%" cy="50%" r="55%">
                  <stop offset="0%"   stopColor="oklch(92% 0.016 78 / 0.45)" />
                  <stop offset="65%"  stopColor="transparent" />
                  <stop offset="100%" stopColor="oklch(28% 0.04 68 / 0.18)" />
                </radialGradient>
                <clipPath id="ei_lClip">
                  <rect x="0" y="0" width={EW} height={EH} />
                </clipPath>
              </defs>
              <rect x="0" y="0" width={EW} height={EH} fill="url(#ei_lingGrad)" />
              <g clipPath="url(#ei_lClip)">{liningStripes}</g>
              <rect x="0" y="0" width={EW} height={EH} fill="url(#ei_lingCenter)" />
              {/* Edge depth shadows */}
              <rect x="0"      y="0"      width={EW} height="8"  fill="oklch(28% 0.04 68 / 0.12)" />
              <rect x="0"      y={EH - 8} width={EW} height="8"  fill="oklch(28% 0.04 68 / 0.10)" />
              <rect x="0"      y="0"      width="8"  height={EH} fill="oklch(28% 0.04 68 / 0.10)" />
              <rect x={EW - 8} y="0"      width="8"  height={EH} fill="oklch(28% 0.04 68 / 0.10)" />
            </svg>
          </div>

          {/* ── LAYER 3: Sliding half-faces ── */}
          <div style={{ position: "absolute", inset: 0, zIndex: 3, overflow: "hidden" }}>

            {/* Left half */}
            <div style={{
              position: "absolute", top: 0, left: 0,
              width: EW / 2, height: EH,
              transform: `translateX(${leftTx}px)`,
              willChange: "transform",
            }}>
              <svg width={EW / 2} height={EH} style={{ display: "block" }}>
                <defs>
                  <linearGradient id="ei_lfH" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%"   stopColor="oklch(91% 0.022 79)" />
                    <stop offset="100%" stopColor={envFace} />
                  </linearGradient>
                  <linearGradient id="ei_lfV" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="oklch(98% 0.008 84 / 0.35)" />
                    <stop offset="35%"  stopColor="oklch(98% 0.008 84 / 0.00)" />
                    <stop offset="100%" stopColor="oklch(75% 0.020 75 / 0.07)" />
                  </linearGradient>
                  <linearGradient id="ei_lfSh" x1="1" y1="0" x2="0.65" y2="0">
                    <stop offset="0%"   stopColor="oklch(35% 0.02 72 / 0.2)" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width={EW/2} height={EH} fill="url(#ei_lfH)" />
                <rect x="0" y="0" width={EW/2} height={EH} fill="url(#ei_lfV)" />
                <rect x="0" y="0" width={EW/2} height={EH} fill="url(#ei_lfSh)" />
                <line x1={EW/2-0.5} y1="0" x2={EW/2-0.5} y2={EH}
                  stroke={foldLine} strokeWidth="0.7" opacity="0.45" />
              </svg>
            </div>

            {/* Right half */}
            <div style={{
              position: "absolute", top: 0, right: 0,
              width: EW / 2, height: EH,
              transform: `translateX(${rightTx}px)`,
              willChange: "transform",
            }}>
              <svg width={EW / 2} height={EH} style={{ display: "block" }}>
                <defs>
                  <linearGradient id="ei_rfH" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%"   stopColor={envFace} />
                    <stop offset="100%" stopColor="oklch(91% 0.022 79)" />
                  </linearGradient>
                  <linearGradient id="ei_rfV" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="oklch(98% 0.008 84 / 0.35)" />
                    <stop offset="35%"  stopColor="oklch(98% 0.008 84 / 0.00)" />
                    <stop offset="100%" stopColor="oklch(75% 0.020 75 / 0.07)" />
                  </linearGradient>
                  <linearGradient id="ei_rfSh" x1="0" y1="0" x2="0.35" y2="0">
                    <stop offset="0%"   stopColor="oklch(35% 0.02 72 / 0.2)" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width={EW/2} height={EH} fill="url(#ei_rfH)" />
                <rect x="0" y="0" width={EW/2} height={EH} fill="url(#ei_rfV)" />
                <rect x="0" y="0" width={EW/2} height={EH} fill="url(#ei_rfSh)" />
                <line x1="0.5" y1="0" x2="0.5" y2={EH}
                  stroke={foldLine} strokeWidth="0.7" opacity="0.45" />
              </svg>
            </div>
          </div>

          {/* ── LAYER 4: Wax seal ── */}
          <div style={{
            position: "absolute", left: "50%", top: "50%",
            transform: `translate(-50%, -50%) scale(${sealScale})`,
            opacity: sealOp,
            zIndex: 20,
            pointerEvents: "none",
            willChange: "opacity, transform",
          }}>
            <svg
              width={seal.D} height={seal.D}
              viewBox={`0 0 ${seal.D} ${seal.D}`}
              overflow="visible"
            >
              <defs>
                {/* Domed radial — lighter at top-left, dark at base */}
                <radialGradient id="ei_waxDome" cx="38%" cy="30%" r="65%" gradientUnits="objectBoundingBox">
                  <stop offset="0%"   stopColor="oklch(44% 0.11 20)" />
                  <stop offset="42%"  stopColor={sealColor} />
                  <stop offset="100%" stopColor="oklch(18% 0.07 14)" />
                </radialGradient>
                {/* Bumpy wax surface displacement */}
                <filter id="ei_waxBump" x="-12%" y="-12%" width="124%" height="124%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.06 0.052"
                    numOctaves="5" seed="12" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="5"
                    xChannelSelector="R" yChannelSelector="G" result="bumped" />
                  <feComposite in="bumped" in2="SourceGraphic" operator="in" />
                </filter>
                {/* Gloss: bright top-left */}
                <radialGradient id="ei_waxGloss" cx="33%" cy="25%" r="48%" gradientUnits="objectBoundingBox">
                  <stop offset="0%"   stopColor="white" stopOpacity="0.42" />
                  <stop offset="30%"  stopColor="white" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="white" stopOpacity="0.00" />
                </radialGradient>
                {/* Edge darkening */}
                <radialGradient id="ei_waxEdge" cx="50%" cy="50%" r="50%" gradientUnits="objectBoundingBox">
                  <stop offset="55%"  stopColor="transparent" />
                  <stop offset="100%" stopColor="oklch(10% 0.04 14 / 0.5)" />
                </radialGradient>
                {/* Incised emboss filter */}
                <filter id="ei_incise">
                  <feGaussianBlur stdDeviation="0.35" result="b" />
                  <feOffset dx="0.3" dy="0.5" in="b" result="s" />
                  <feBlend in="SourceGraphic" in2="s" mode="normal" />
                </filter>
                <clipPath id="ei_sealClip">
                  <polygon points={seal.edgePts} />
                </clipPath>
              </defs>

              {/* Layer 1: wax body with bumpy texture */}
              <polygon points={seal.edgePts} fill="url(#ei_waxDome)" filter="url(#ei_waxBump)" />
              {/* Wax drip */}
              <polygon points={seal.dripPts} fill="url(#ei_waxDome)" filter="url(#ei_waxBump)" />

              {/* Layer 2: edge shadow */}
              <polygon points={seal.edgePts} fill="url(#ei_waxEdge)" />

              {/* Layer 3: gloss highlight */}
              <polygon points={seal.edgePts} fill="url(#ei_waxGloss)" />

              {/* Incised decorative ring */}
              <circle
                cx={seal.cx} cy={seal.cy} r={seal.R * 0.74}
                fill="none"
                stroke={sealGoldColor} strokeWidth="0.85" strokeOpacity="0.55"
                filter="url(#ei_incise)" clipPath="url(#ei_sealClip)"
              />

              {/* Monogram: Left letter */}
              <text x={seal.cx - 17} y={seal.cy + 9}
                textAnchor="middle" fill={sealGoldColor}
                fontSize="23" fontFamily="Cormorant Garamond, serif"
                fontStyle="italic" fontWeight="300"
                filter="url(#ei_incise)" clipPath="url(#ei_sealClip)"
              >{monL}</text>

              {/* Ampersand */}
              <text x={seal.cx} y={seal.cy + 8}
                textAnchor="middle" fill={sealGoldColor}
                fontSize="13" fontFamily="Cormorant Garamond, serif"
                fontStyle="italic" fontWeight="300"
                filter="url(#ei_incise)" clipPath="url(#ei_sealClip)"
                opacity="0.8"
              >&amp;</text>

              {/* Right letter */}
              <text x={seal.cx + 17} y={seal.cy + 9}
                textAnchor="middle" fill={sealGoldColor}
                fontSize="23" fontFamily="Cormorant Garamond, serif"
                fontStyle="italic" fontWeight="300"
                filter="url(#ei_incise)" clipPath="url(#ei_sealClip)"
              >{monR}</text>

              {/* Hairline crack details */}
              <g stroke={sealGoldColor} strokeWidth="0.4" opacity="0.18" clipPath="url(#ei_sealClip)">
                <line x1={seal.cx-9}  y1={seal.cy+5}  x2={seal.cx+11} y2={seal.cy-8} />
                <line x1={seal.cx+7}  y1={seal.cy+10} x2={seal.cx+18} y2={seal.cy+3} />
                <line x1={seal.cx-14} y1={seal.cy-4}  x2={seal.cx-5}  y2={seal.cy+7} />
              </g>
            </svg>
          </div>

        </div>{/* end envelope group */}
      </div>{/* end scale wrapper */}

      {/* Tap to skip */}
      <div style={{
        position: "absolute", bottom: 36, left: "50%",
        transform: "translateX(-50%)",
        opacity: skipOp,
        pointerEvents: "none",
        whiteSpace: "nowrap",
      }}>
        <p style={{
          margin: 0,
          fontFamily: "Jost, sans-serif",
          fontSize: 10,
          letterSpacing: "0.22em",
          color: "oklch(38% 0.03 70)",
          textTransform: "uppercase",
        }}>tap to skip</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WAX SEAL + SCROLL INTRO  (Pro)
// ─────────────────────────────────────────────────────────────────────────────
export function ScrollIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);

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

  function skip() { setPhase(4); setTimeout(onComplete, 500); }

  const scrollW = 290, scrollH = 380, rollerH = 22;

  return (
    <div onClick={skip} style={{
      position: "fixed", inset: 0, zIndex: 50,
      background: "#18130D",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      opacity: phase === 4 ? 0 : 1,
      transition: "opacity 0.7s ease",
      pointerEvents: phase === 4 ? "none" : "auto",
      cursor: "pointer", userSelect: "none",
    }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at center, rgba(201,169,110,0.07) 0%, transparent 65%)" }} />
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* top roller */}
        <div style={{ width: scrollW+20, height: rollerH, background: "linear-gradient(to right, #5C4010, #C9A96E, #F5D98B, #C9A96E, #5C4010)", borderRadius: 4, boxShadow: "0 3px 12px rgba(0,0,0,0.5)", marginBottom: -rollerH/2, zIndex: 3, position: "relative", opacity: phase >= 2 ? 1 : 0, transform: `translateY(${phase >= 2 ? 0 : 10}px)`, transition: "opacity 0.4s ease, transform 0.4s ease" }} />
        {/* scroll body */}
        <div style={{ width: scrollW, height: phase >= 2 ? scrollH : 84, transition: "height 1.2s cubic-bezier(0.4, 0, 0.2, 1)", background: "linear-gradient(to right, #E8D5A8, #F5E8CC, #FBF0D8, #F5E8CC, #E8D5A8)", border: "1px solid rgba(201,169,110,0.4)", boxShadow: "0 16px 60px rgba(0,0,0,0.5)", overflow: "hidden", position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: phase >= 3 ? 1 : 0, transition: "opacity 0.9s ease", textAlign: "center" }}>
            <div style={{ height: 1, width: "70%", background: "#C9A96E", opacity: 0.6 }} />
            <p style={{ margin: 0, fontFamily: "Cormorant Garamond, serif", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "#8B6914" }}>Together With Their Families</p>
            <p style={{ margin: 0, fontFamily: "Cormorant Garamond, serif", fontSize: 32, fontStyle: "italic", fontWeight: 300, color: "#1C1917", lineHeight: 1.25 }}>Emma<br /><span style={{ fontSize: 20, color: "#C9A96E" }}>&amp;</span><br />James</p>
            <p style={{ margin: 0, fontFamily: "Jost, sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "#6B6359", fontWeight: 300, textTransform: "uppercase" }}>Request the Pleasure of Your Company</p>
            <div style={{ height: 1, width: "70%", background: "#C9A96E", opacity: 0.6 }} />
            <p style={{ margin: 0, fontFamily: "Cormorant Garamond, serif", fontSize: 15, color: "#3B2D1A" }}>September 14, 2025</p>
            <p style={{ margin: 0, fontFamily: "Cormorant Garamond, serif", fontSize: 13, fontStyle: "italic", color: "#6B6359" }}>Grand Estate · Florence</p>
          </div>
        </div>
        {/* bottom roller */}
        <div style={{ width: scrollW+20, height: rollerH, background: "linear-gradient(to right, #5C4010, #C9A96E, #F5D98B, #C9A96E, #5C4010)", borderRadius: 4, boxShadow: "0 -3px 12px rgba(0,0,0,0.5)", marginTop: -rollerH/2, zIndex: 3, position: "relative", opacity: phase >= 2 ? 1 : 0, transform: `translateY(${phase >= 2 ? 0 : -10}px)`, transition: "opacity 0.4s ease, transform 0.4s ease" }} />
        {/* wax seal */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: `translate(-50%, -50%) scale(${phase >= 2 ? 0 : 1}) rotate(${phase >= 2 ? 45 : 0}deg)`, transition: "transform 0.45s cubic-bezier(0.4, 0, 0.8, 1)", width: 80, height: 80, borderRadius: "50%", background: "radial-gradient(circle at 38% 32%, #8B2020, #4A0E0E)", border: "2.5px solid rgba(201,169,110,0.85)", boxShadow: "0 6px 24px rgba(0,0,0,0.6), inset 0 1px 4px rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4, animation: phase === 1 ? "sealShake 0.1s ease-in-out 6" : "none" }}>
          <span style={{ color: "rgba(201,169,110,0.95)", fontSize: 26 }}>✦</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 44 }}>
        <div style={{ height: 1, width: 24, background: "#C9A96E", opacity: 0.25 }} />
        <p style={{ margin: 0, fontFamily: "Cormorant Garamond, serif", fontSize: 13, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A96E", fontStyle: "italic", opacity: 0.6 }}>Forevermore</p>
        <div style={{ height: 1, width: 24, background: "#C9A96E", opacity: 0.25 }} />
      </div>
      <p style={{ margin: "28px 0 0", fontFamily: "Jost, sans-serif", fontSize: 10, letterSpacing: "0.18em", color: "#9B9490", textTransform: "uppercase" }}>tap to skip</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function InviteIntro({
  plan, onComplete, partner1, partner2,
}: {
  plan: string; onComplete: () => void; partner1: string; partner2: string;
}) {
  if (plan === "standard") return <EnvelopeIntro onComplete={onComplete} partner1={partner1} partner2={partner2} />;
  if (plan === "pro")      return <ScrollIntro onComplete={onComplete} />;
  return null;
}
