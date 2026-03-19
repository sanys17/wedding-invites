"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useState, useEffect } from "react";

export default function Home() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const HOW_IT_WORKS = [
    { step: "01", title: t.step1Title, desc: t.step1Desc },
    { step: "02", title: t.step2Title, desc: t.step2Desc },
    { step: "03", title: t.step3Title, desc: t.step3Desc },
    { step: "04", title: t.step4Title, desc: t.step4Desc },
  ];

  const TEMPLATES = [
    {
      id: "elegant-minimal",
      name: "Élégant",
      tag: "Minimalist · Timeless",
      available: true,
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80&fit=crop",
    },
    {
      id: "jardin",
      name: "Jardin",
      tag: "Botanical · Romantic",
      available: true,
      image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=600&q=80&fit=crop",
    },
    {
      id: "coming-soon-2",
      name: "Aurora",
      tag: "Modern · Bold",
      available: false,
      image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80&fit=crop",
    },
  ];

  const WHY_DIGITAL = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
        </svg>
      ),
      title: "Instant link",
      desc: "Share your link the moment payment is confirmed. No waiting, no shipping, no lost invitations.",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3m-3 3.75h3m-6-3.75H9m1.5-3.75H9" />
        </svg>
      ),
      title: "Any device, always",
      desc: "Guests open it on their phone, tablet, or laptop. One link works everywhere, forever.",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
      title: "Zero waste",
      desc: "No paper, no printing, no postage. Beautiful and kind to the planet — like every great love story.",
    },
  ];

  const PRICING_INCLUDES = [
    "Live preview while you customize",
    "Instant permanent shareable link",
    "Works on all devices, forever",
    "Secure Stripe checkout",
    "No subscriptions, no renewals",
  ];

  return (
    <main className="min-h-screen bg-cream overflow-x-hidden">

      {/* ── STICKY NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/92 backdrop-blur-md border-b border-gold-light/50 py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}>
        <div className="flex items-center justify-between px-8 max-w-6xl mx-auto">
          <span className="font-serif text-2xl tracking-widest text-charcoal">Forevermore</span>
          <div className="flex items-center gap-6 text-sm tracking-widest uppercase text-muted font-light">
            <a href="#how-it-works" className="hover:text-gold transition-colors hidden md:block cursor-pointer">{t.howItWorks}</a>
            <a href="#designs" className="hover:text-gold transition-colors hidden md:block cursor-pointer">{t.designs}</a>
            <LanguageSwitcher />
            <Link href="/customize" className="border border-gold text-gold px-5 py-2 hover:bg-gold hover:text-white transition-all duration-300 cursor-pointer">
              {t.getStarted}
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO — SPLIT LAYOUT ── */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

        {/* Left: text */}
        <div className="flex flex-col justify-center px-10 md:px-16 pt-32 pb-20 lg:pt-0 lg:pb-0 relative">
          {/* Decorative botanical ring behind text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-[0.05]">
              <circle cx="300" cy="300" r="240" stroke="#B8960C" strokeWidth="1" />
              <circle cx="300" cy="300" r="220" stroke="#B8960C" strokeWidth="0.4" />
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i * 360) / 24;
                const rad = (angle * Math.PI) / 180;
                const cx = 300 + 240 * Math.cos(rad);
                const cy = 300 + 240 * Math.sin(rad);
                return (
                  <g key={i} transform={`translate(${cx},${cy}) rotate(${angle + 90})`}>
                    <ellipse rx="4" ry="12" fill="#B8960C" opacity={i % 4 === 0 ? "0.9" : "0.6"} />
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="relative z-10 max-w-lg">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-gold-light" />
              <span className="text-xs tracking-ultra-wide uppercase text-gold font-light">{t.tagline}</span>
            </div>

            <h1 className="font-serif text-5xl md:text-7xl font-light text-charcoal leading-none mb-6 fade-in">
              {t.heroTitle1}
              <br />
              <span className="italic text-gold">{t.heroTitle2}</span>
            </h1>

            <p className="text-muted font-light text-lg leading-relaxed mb-10 fade-in-delay-1">
              {t.heroSub}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 fade-in-delay-2">
              <Link href="/customize" className="bg-charcoal text-cream px-8 py-4 text-sm tracking-widest uppercase hover:bg-gold transition-all duration-300 cursor-pointer text-center">
                {t.designYourInvitation}
              </Link>
              <a href="#designs" className="border border-charcoal text-charcoal px-8 py-4 text-sm tracking-widest uppercase hover:border-gold hover:text-gold transition-all duration-300 cursor-pointer text-center">
                {t.viewDesigns}
              </a>
            </div>

            {/* Trust strip */}
            <div className="flex items-center gap-5 mt-10 fade-in-delay-3 flex-wrap">
              {[
                { label: "One-time $15", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
                { label: "Instant link", icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" },
                { label: "Secure payment", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
              ].map(({ label, icon }, i) => (
                <div key={label} className="flex items-center gap-4">
                  {i > 0 && <div className="h-3 w-px bg-gold-light hidden sm:block" />}
                  <div className="flex items-center gap-2 text-xs text-muted font-light tracking-wider">
                    <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                    </svg>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-10 font-serif italic text-muted">&ldquo;{t.heroQuote}&rdquo;</p>
          </div>
        </div>

        {/* Right: photo grid */}
        <div className="hidden lg:grid grid-rows-2 grid-cols-2 gap-3 p-10 pt-24 pb-10 bg-charcoal/[0.02]">
          <div className="relative row-span-2 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80&fit=crop"
              alt="Wedding flowers"
              fill
              className="object-cover"
              sizes="25vw"
            />
            <div className="absolute inset-0 bg-charcoal/5" />
          </div>
          <div className="relative overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80&fit=crop"
              alt="Wedding rings"
              fill
              className="object-cover"
              sizes="15vw"
            />
            <div className="absolute inset-0 bg-charcoal/5" />
          </div>
          <div className="relative overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80&fit=crop"
              alt="Wedding table setting"
              fill
              className="object-cover"
              sizes="15vw"
            />
            <div className="absolute inset-0 bg-charcoal/5" />
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-4xl mx-auto px-6"><div className="divider-gold" /></div>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-4 justify-center">
            <div className="h-px w-12 bg-gold-light" />
            <span className="text-xs tracking-ultra-wide uppercase text-gold font-light">{t.howItWorksLabel}</span>
            <div className="h-px w-12 bg-gold-light" />
          </div>
          <h2 className="font-serif text-4xl text-center text-charcoal mb-3 font-light">Ready in four simple steps</h2>
          <p className="text-center text-muted text-sm font-light mb-16">From blank to beautiful in minutes.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative">
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-gold-light to-transparent z-0" />
            {HOW_IT_WORKS.map(({ step, title, desc }) => (
              <div key={step} className="text-center relative z-10">
                <div className="w-16 h-16 rounded-full border border-gold-light bg-cream flex items-center justify-center mx-auto mb-5 shadow-sm">
                  <span className="font-serif text-2xl text-gold font-light">{step}</span>
                </div>
                <h3 className="font-serif text-xl mb-3 text-charcoal">{title}</h3>
                <p className="text-muted text-sm leading-relaxed font-light">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-4xl mx-auto px-6"><div className="divider-gold" /></div>

      {/* ── DESIGNS ── */}
      <section id="designs" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-4 justify-center">
            <div className="h-px w-12 bg-gold-light" />
            <span className="text-xs tracking-ultra-wide uppercase text-gold font-light">{t.ourDesigns}</span>
            <div className="h-px w-12 bg-gold-light" />
          </div>
          <h2 className="font-serif text-4xl text-center text-charcoal mb-3 font-light">{t.chooseYourStyle}</h2>
          <p className="text-center text-muted font-light text-sm mb-16 max-w-sm mx-auto">
            Two styles available now. Each crafted to feel personal and elegant.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEMPLATES.map((tmpl) => (
              <div
                key={tmpl.id}
                className={`group relative border transition-all duration-500 ${
                  tmpl.available
                    ? "border-gold-light hover:border-gold hover:shadow-[0_8px_40px_rgba(184,150,12,0.12)] cursor-pointer"
                    : "border-gray-100 opacity-40 cursor-not-allowed"
                }`}
              >
                {/* Photo banner */}
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={tmpl.image}
                    alt={tmpl.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-charcoal/20" />
                  {!tmpl.available && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs tracking-ultra-wide uppercase text-white font-light bg-charcoal/60 px-4 py-2">
                        {t.comingSoon}
                      </span>
                    </div>
                  )}
                </div>

                {/* Invitation preview */}
                <div className="bg-white py-8 px-6 flex flex-col items-center justify-center text-center relative">
                  {/* Corner ornaments */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-gold-light opacity-70" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-gold-light opacity-70" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-gold-light opacity-70" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-gold-light opacity-70" />

                  {tmpl.id === "jardin" ? (
                    /* Jardin botanical preview */
                    <>
                      {/* Leaf ornaments */}
                      <svg className="absolute top-5 left-5 w-8 h-8 text-gold-light opacity-50" viewBox="0 0 40 40" fill="currentColor">
                        <path d="M20 2 C10 10 5 20 10 32 C15 20 25 15 35 20 C25 10 20 2 20 2Z" />
                      </svg>
                      <svg className="absolute bottom-5 right-5 w-8 h-8 text-gold-light opacity-50" viewBox="0 0 40 40" fill="currentColor" style={{ transform: "rotate(180deg)" }}>
                        <path d="M20 2 C10 10 5 20 10 32 C15 20 25 15 35 20 C25 10 20 2 20 2Z" />
                      </svg>
                      <div className="flex items-center gap-2 w-full mb-3">
                        <div className="flex-1 h-px bg-gold-light" />
                        <span className="text-gold opacity-60">✿</span>
                        <div className="flex-1 h-px bg-gold-light" />
                      </div>
                      <p className="text-xs tracking-ultra-wide uppercase text-gold font-light mb-3">{t.sampleInvitation}</p>
                      <h3 className="font-serif text-3xl text-charcoal italic font-light">Emma &amp; James</h3>
                      <div className="flex items-center gap-2 w-full my-3">
                        <div className="flex-1 h-px bg-gold-light" />
                        <span className="text-gold opacity-60">✿</span>
                        <div className="flex-1 h-px bg-gold-light" />
                      </div>
                      <p className="text-xs tracking-widest text-muted uppercase font-light">September 14, 2025</p>
                      <p className="text-xs text-muted font-light mt-1">The Garden Estate · Florence</p>
                    </>
                  ) : (
                    /* Élégant minimal preview */
                    <>
                      <div className="flex items-center gap-3 w-full mb-4">
                        <div className="flex-1 h-px bg-gold-light" />
                        <span className="text-xs tracking-ultra-wide uppercase text-gold font-light">
                          {tmpl.available ? t.sampleInvitation : t.comingSoon}
                        </span>
                        <div className="flex-1 h-px bg-gold-light" />
                      </div>
                      <h3 className="font-serif text-3xl text-charcoal italic font-light mb-1">Emma</h3>
                      <p className="text-gold font-light tracking-widest mb-1">&amp;</p>
                      <h3 className="font-serif text-3xl text-charcoal italic font-light mb-4">James</h3>
                      <div className="flex items-center gap-3 w-full mb-3">
                        <div className="flex-1 h-px bg-gold-light" />
                        <span className="text-gold text-xs">✦</span>
                        <div className="flex-1 h-px bg-gold-light" />
                      </div>
                      <p className="text-xs tracking-widest text-muted uppercase font-light">September 14, 2025</p>
                      <p className="text-xs text-muted font-light mt-1">The Grand Estate · Florence</p>
                    </>
                  )}
                </div>

                <div className="p-5 border-t border-gold-light bg-cream">
                  <div className="flex items-baseline justify-between mb-1">
                    <p className="font-serif text-xl text-charcoal">{tmpl.name}</p>
                    {tmpl.available && <span className="text-xs text-gold font-light tracking-widest">$15</span>}
                  </div>
                  <p className="text-xs text-muted tracking-wider">{tmpl.tag}</p>
                  {tmpl.available && (
                    <Link
                      href={`/customize?template=${tmpl.id}`}
                      className="inline-block mt-4 text-xs tracking-widest uppercase text-gold border-b border-gold pb-px hover:text-gold-dark transition-colors cursor-pointer"
                    >
                      {t.customize}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIFESTYLE BANNER ── */}
      <section className="relative h-80 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1600&q=80&fit=crop"
          alt="Wedding celebration"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal/55" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-gold/60" />
            <span className="text-xs tracking-ultra-wide uppercase text-gold font-light">Your special day</span>
            <div className="h-px w-12 bg-gold/60" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-cream font-light italic mb-6">
            Share your love story<br />with the world
          </h2>
          <Link href="/customize" className="border border-gold text-gold px-10 py-3 text-xs tracking-widest uppercase hover:bg-gold hover:text-white transition-all duration-300 cursor-pointer">
            {t.startDesigning}
          </Link>
        </div>
      </section>

      {/* ── WHY DIGITAL ── */}
      <section className="bg-charcoal/[0.03] py-24 px-6 border-y border-gold-light/20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4 justify-center">
            <div className="h-px w-12 bg-gold-light" />
            <span className="text-xs tracking-ultra-wide uppercase text-gold font-light">Why digital</span>
            <div className="h-px w-12 bg-gold-light" />
          </div>
          <h2 className="font-serif text-4xl text-center text-charcoal mb-16 font-light">
            Modern love deserves a{" "}
            <span className="italic text-gold">modern invitation</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {WHY_DIGITAL.map(({ icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-12 h-12 rounded-full border border-gold-light flex items-center justify-center mx-auto mb-5 text-gold">{icon}</div>
                <h3 className="font-serif text-xl text-charcoal mb-3">{title}</h3>
                <p className="text-muted text-sm leading-relaxed font-light">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-24 px-6">
        <div className="max-w-sm mx-auto">
          <div className="flex items-center gap-4 mb-4 justify-center">
            <div className="h-px w-12 bg-gold-light" />
            <span className="text-xs tracking-ultra-wide uppercase text-gold font-light">Pricing</span>
            <div className="h-px w-12 bg-gold-light" />
          </div>
          <h2 className="font-serif text-4xl text-center text-charcoal mb-10 font-light">Simple &amp; honest</h2>
          <div className="border border-gold-light p-10 bg-white relative">
            <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-gold-light" />
            <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-gold-light" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-gold-light" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-gold-light" />
            <p className="text-xs tracking-ultra-wide uppercase text-gold font-light mb-3 text-center">One-time payment</p>
            <div className="font-serif text-7xl text-charcoal font-light text-center mb-1">$15</div>
            <p className="text-muted text-xs font-light text-center tracking-wider mb-8">per invitation · no subscriptions ever</p>
            <div className="space-y-3 mb-8">
              {PRICING_INCLUDES.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-muted font-light">
                  <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
            <Link href="/customize" className="block bg-charcoal text-cream px-8 py-4 text-xs tracking-widest uppercase hover:bg-gold transition-all duration-300 cursor-pointer text-center">
              {t.startDesigning}
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-charcoal py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="36" height="36" patternUnits="userSpaceOnUse">
                <circle cx="18" cy="18" r="1.2" fill="#B8960C" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
        <div className="relative z-10">
          <div className="h-px w-16 bg-gold mx-auto mb-10" />
          <h2 className="font-serif text-5xl text-cream font-light mb-4 italic">{t.readyToBegin}</h2>
          <p className="text-muted font-light mb-10 tracking-wide">{t.createInMinutes}</p>
          <Link href="/customize" className="border border-gold text-gold px-12 py-4 text-sm tracking-widest uppercase hover:bg-gold hover:text-white transition-all duration-300 cursor-pointer inline-block">
            {t.startDesigning}
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 px-6 text-center border-t border-gold-light/30">
        <span className="font-serif text-xl tracking-widest text-charcoal block mb-2">Forevermore</span>
        <p className="font-serif italic text-muted text-sm mb-6">Digital Wedding Invitations</p>
        <div className="flex items-center justify-center gap-5 text-xs text-muted/60 tracking-wider flex-wrap">
          <span>© {new Date().getFullYear()} {t.allRightsReserved}</span>
          <span className="h-3 w-px bg-muted/30 hidden sm:block" />
          <a href="mailto:hello@forevermore.wedding" className="hover:text-gold transition-colors">hello@forevermore.wedding</a>
        </div>
      </footer>
    </main>
  );
}
