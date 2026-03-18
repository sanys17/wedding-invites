import Link from "next/link";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Choose a Design",
    desc: "Browse our curated collection of elegant invitation templates.",
  },
  {
    step: "02",
    title: "Personalize It",
    desc: "Add your names, date, venue and a personal message — and watch a live preview update in real time.",
  },
  {
    step: "03",
    title: "Checkout",
    desc: "Pay once. No subscriptions, no hidden fees.",
  },
  {
    step: "04",
    title: "Share Your Link",
    desc: "Receive a unique URL instantly. Copy, paste, send — your guests experience a stunning invitation online.",
  },
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

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      {/* ── NAV ── */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-6xl mx-auto">
        <span className="font-serif text-2xl tracking-widest text-charcoal">
          Forevermore
        </span>
        <div className="flex items-center gap-8 text-sm tracking-widest uppercase text-muted font-light">
          <a href="#how-it-works" className="hover:text-gold transition-colors">
            How It Works
          </a>
          <a href="#designs" className="hover:text-gold transition-colors">
            Designs
          </a>
          <Link
            href="/customize"
            className="border border-gold text-gold px-5 py-2 hover:bg-gold hover:text-white transition-all duration-300"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-24 pb-32">
        {/* decorative line */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px w-16 bg-gold-light" />
          <span className="text-xs tracking-ultra-wide uppercase text-gold font-light">
            Digital Wedding Invitations
          </span>
          <div className="h-px w-16 bg-gold-light" />
        </div>

        <h1 className="font-serif text-6xl md:text-8xl font-light text-charcoal leading-none mb-6 fade-in">
          Your love story,
          <br />
          <span className="italic text-gold">beautifully told.</span>
        </h1>

        <p className="max-w-lg text-muted font-light text-lg leading-relaxed mb-12 fade-in-delay-1">
          Elegant digital invitations your guests will remember. Customize in
          minutes. Share a link. No printing, no postage, no stress.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 fade-in-delay-2">
          <Link
            href="/customize"
            className="bg-charcoal text-cream px-10 py-4 text-sm tracking-widest uppercase hover:bg-gold transition-all duration-300"
          >
            Design Your Invitation
          </Link>
          <a
            href="#designs"
            className="border border-charcoal text-charcoal px-10 py-4 text-sm tracking-widest uppercase hover:border-gold hover:text-gold transition-all duration-300"
          >
            View Designs
          </a>
        </div>

        {/* floating quote */}
        <p className="mt-20 font-serif italic text-muted text-lg fade-in-delay-3">
          &ldquo;The beginning of forever.&rdquo;
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
              How It Works
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
              Our Designs
            </span>
            <div className="h-px w-12 bg-gold-light" />
          </div>
          <h2 className="font-serif text-4xl text-center text-charcoal mb-16 font-light">
            Choose Your Style
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEMPLATES.map((t) => (
              <div
                key={t.id}
                className={`group relative border transition-all duration-500 ${
                  t.available
                    ? "border-gold-light hover:border-gold hover:shadow-lg cursor-pointer"
                    : "border-gray-100 opacity-50 cursor-not-allowed"
                }`}
              >
                {/* Preview card */}
                <div className="bg-white aspect-[3/4] flex flex-col items-center justify-center p-8 text-center">
                  <div className="h-px w-10 bg-gold-light mb-6" />
                  <p className="text-xs tracking-ultra-wide uppercase text-gold font-light mb-4">
                    {t.available ? "Sample Invitation" : "Coming Soon"}
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
                  <p className="font-serif text-xl text-charcoal">{t.name}</p>
                  <p className="text-xs text-muted tracking-wider mt-1">
                    {t.tag}
                  </p>
                  {t.available && (
                    <Link
                      href="/customize"
                      className="inline-block mt-4 text-xs tracking-widest uppercase text-gold border-b border-gold pb-px hover:text-gold-dark transition-colors"
                    >
                      Customize →
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
          Ready to begin?
        </h2>
        <p className="text-muted font-light mb-10 tracking-wide">
          Create your invitation in minutes.
        </p>
        <Link
          href="/customize"
          className="border border-gold text-gold px-12 py-4 text-sm tracking-widest uppercase hover:bg-gold hover:text-white transition-all duration-300"
        >
          Start Designing
        </Link>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-6 text-center">
        <p className="font-serif italic text-muted text-sm">
          Forevermore &mdash; Digital Wedding Invitations
        </p>
        <p className="text-xs text-muted/60 mt-2 tracking-wider">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </footer>
    </main>
  );
}
