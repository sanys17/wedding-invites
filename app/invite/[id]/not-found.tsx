import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-cream flex flex-col items-center justify-center text-center px-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px w-12 bg-gold-light" />
        <span className="text-xs tracking-ultra-wide uppercase text-gold font-light">
          404
        </span>
        <div className="h-px w-12 bg-gold-light" />
      </div>

      <h1 className="font-serif text-5xl font-light text-charcoal italic mb-4">
        Invitation not found.
      </h1>
      <p className="text-muted font-light mb-8">
        This link may be invalid or the invitation hasn&apos;t been published
        yet.
      </p>
      <Link
        href="/"
        className="border border-gold text-gold px-8 py-3 text-xs tracking-widest uppercase hover:bg-gold hover:text-white transition-all duration-300"
      >
        Back to Forevermore
      </Link>
    </main>
  );
}
