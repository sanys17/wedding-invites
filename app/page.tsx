"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Home() {
  const { t } = useLanguage();

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
    },
    {
      id: "coming-soon-1",
      name: "Jardin",
      tag: "Botanical · Romantic",
      available: false,
    },
    {
      id: "coming-soon-2",
      name: "Aurora",
      tag: "Modern · Bold",
      available: false,
    },
  ];

  return (
    <main className="min-h-screen bg-cream">
      {/* ── NAV ── */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-6xl mx-auto">
        <span className="font-serif text-2xl tracking-widest text-charcoal">
          Forevermore
        </span>
        <div className="flex items-center gap-6 text-sm tracking-widest uppercase text-muted font-light">
          <a href="#how-it-works" className="hover:text-gold transition-colors">
            {t.howItWorks}
          </a>
          <a href="#designs" className="hover:text-gold transition-colors">
            {t.designs}
          </a>
          <LanguageSwitcher />
          <Link
            href="/customize"
            className="border border-gold text-gold px-5 py-2 hover:bg-gold hover:text-white transition-all duration-300"
          >
            {t.getStarted}
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-24 pb-32">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px w-16 bg-gold-light" />
          <span className="text-xs tracking-ultra-wide uppercase text-gold font-light">
            {t.tagline}
          </span>
          <div className="h-px w-16 bg-gold-light" />
        </div>

        <h1 className="font-serif text-6xl md:text-8xl font-light text-charcoal leading-none mb-6 fade-in">
          {t.heroTitle1}
          <br />
          <span className="italic text-gold">{t.heroTitle2}</span>
        </h1>

        <p className="max-w-lg text-muted font-light text-lg leading-relaxed mb-12 fade-in-delay-1">
          {t.heroSub}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 fade-in-delay-2">
          <Link
            href="/customize"
            className="bg-charcoal text-cream px-10 py-4 text-sm tracking-widest uppercase hover:bg-gold transition-all duration-300"
          >
            {t.designYourInvitation}
          </Link>
          <a
            href="#designs"
            className="border border-charcoal text-charcoal px-10 py-4 text-sm tracking-widest uppercase hover:border-gold hover:text-gold transition-all duration-300"
          >
            {t.viewDesigns}
          </a>
        </div>

        <p className="mt-20 font-serif italic text-muted text-lg fade-in-delay-3">
          &ldquo;{t.heroQuote}&rdquo;
        </p>
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="divider-gold" />
      </div>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-16 justify-center">
            <div className="h-px w-12 bg-gold-light" />
            <span className="text-xs tracking-ultra-wide uppercase text-gold font-light">
              {t.howItWorksLabel}
            </span>
            <div className="h-px w-12 bg-gold-light" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {HOW_IT_WORKS.map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <span className="font-serif text-5xl text-gold-light font-light">
                  {step}
                </span>
                <h3 className="font-serif text-xl mt-3 mb-3 text-charcoal">
                  {title}
                </h3>
                <p className="text-muted text-sm leading-relaxed font-light">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="divider-gold" />
      </div>

      {/* ── DESIGNS ── */}
      <section id="designs" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-4 justify-center">
            <div className="h-px w-12 bg-gold-light" />
            <span className="text-xs tracking-ultra-wide uppercase text-gold font-light">
              {t.ourDesigns}
            </span>
            <div className="h-px w-12 bg-gold-light" />
          </div>
          <h2 className="font-serif text-4xl text-center text-charcoal mb-16 font-light">
            {t.chooseYourStyle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEMPLATES.map((tmpl) => (
              <div
                key={tmpl.id}
                className={`group relative border transition-all duration-500 ${
                  tmpl.available
                    ? "border-gold-light hover:border-gold hover:shadow-lg cursor-pointer"
                    : "border-gray-100 opacity-50 cursor-not-allowed"
                }`}
              >
                <div className="bg-white aspect-[3/4] flex flex-col items-center justify-center p-8 text-center">
                  <div className="h-px w-10 bg-gold-light mb-6" />
                  <p className="text-xs tracking-ultra-wide uppercase text-gold font-light mb-4">
                    {tmpl.available ? t.sampleInvitation : t.comingSoon}
                  </p>
                  <h3 className="font-serif text-4xl text-charcoal mb-2 italic font-light">
                    Emma &amp; James
                  </h3>
                  <p className="text-xs tracking-widest text-muted uppercase font-light mb-2">
                    September 14, 2025
                  </p>
                  <p className="text-xs text-muted font-light">
                    The Grand Estate · Florence
                  </p>
                  <div className="h-px w-10 bg-gold-light mt-6" />
                </div>

                <div className="p-5 border-t border-gold-light bg-cream">
                  <p className="font-serif text-xl text-charcoal">{tmpl.name}</p>
                  <p className="text-xs text-muted tracking-wider mt-1">
                    {tmpl.tag}
                  </p>
                  {tmpl.available && (
                    <Link
                      href="/customize"
                      className="inline-block mt-4 text-xs tracking-widest uppercase text-gold border-b border-gold pb-px hover:text-gold-dark transition-colors"
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

      {/* ── CTA BANNER ── */}
      <section className="bg-charcoal py-24 px-6 text-center">
        <div className="h-px w-16 bg-gold mx-auto mb-10" />
        <h2 className="font-serif text-5xl text-cream font-light mb-4 italic">
          {t.readyToBegin}
        </h2>
        <p className="text-muted font-light mb-10 tracking-wide">
          {t.createInMinutes}
        </p>
        <Link
          href="/customize"
          className="border border-gold text-gold px-12 py-4 text-sm tracking-widest uppercase hover:bg-gold hover:text-white transition-all duration-300"
        >
          {t.startDesigning}
        </Link>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-6 text-center">
        <p className="font-serif italic text-muted text-sm">{t.footerText}</p>
        <p className="text-xs text-muted/60 mt-2 tracking-wider">
          © {new Date().getFullYear()} {t.allRightsReserved}
        </p>
      </footer>
    </main>
  );
}
