import { createClient } from "@supabase/supabase-js";
import type { InviteRecord } from "@/lib/types";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data } = await supabase
    .from("invites")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!data) return { title: "Wedding Invitation" };
  const inv = data as InviteRecord;
  return {
    title: `${inv.partner1} & ${inv.partner2} — Wedding Invitation`,
    description: `You're invited to celebrate the wedding of ${inv.partner1} and ${inv.partner2} on ${inv.date}.`,
  };
}

export default async function InvitePage({ params }: Props) {
  const { data, error } = await supabase
    .from("invites")
    .select("*")
    .eq("id", params.id)
    .eq("paid", true)
    .single();

  if (!data || error) notFound();

  const inv = data as InviteRecord;

  return (
    <main className="min-h-screen bg-cream flex flex-col items-center justify-center px-4 py-16">
      {/* Ambient background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(201,169,110,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(201,169,110,0.04) 0%, transparent 50%)",
        }}
      />

      {/* Invitation card */}
      <div className="relative bg-white w-full max-w-lg shadow-2xl fade-in">
        {/* Gold top bar */}
        <div className="h-1 bg-gold w-full" />

        <div className="flex flex-col items-center text-center px-12 py-16 font-serif">
          {/* Header line */}
          <div className="flex items-center gap-3 w-full mb-10">
            <div className="flex-1 h-px bg-gold-light" />
            <span className="text-xs tracking-ultra-wide uppercase text-gold font-sans font-light whitespace-nowrap">
              Wedding Invitation
            </span>
            <div className="flex-1 h-px bg-gold-light" />
          </div>

          {/* Together */}
          <p className="text-xs tracking-ultra-wide uppercase text-muted font-sans font-light mb-6 fade-in-delay-1">
            Together Forever
          </p>

          {/* Names */}
          <h1 className="text-5xl md:text-6xl font-light italic text-charcoal leading-tight fade-in-delay-1">
            {inv.partner1}
          </h1>
          <p className="text-2xl text-gold font-light tracking-widest my-3 fade-in-delay-1">
            &amp;
          </p>
          <h1 className="text-5xl md:text-6xl font-light italic text-charcoal leading-tight mb-12 fade-in-delay-1">
            {inv.partner2}
          </h1>

          {/* Ornament */}
          <div className="flex items-center gap-4 w-full mb-10 fade-in-delay-2">
            <div className="flex-1 h-px bg-gold-light" />
            <span className="text-gold">✦</span>
            <div className="flex-1 h-px bg-gold-light" />
          </div>

          {/* Request */}
          <p className="text-sm font-sans font-light text-muted tracking-widest uppercase mb-8 fade-in-delay-2">
            Request the honour of your presence
          </p>

          {/* Date */}
          <p className="text-lg tracking-widest uppercase text-charcoal font-sans font-light mb-1 fade-in-delay-2">
            {inv.date}
          </p>
          {inv.time && (
            <p className="text-base tracking-widest text-muted font-sans font-light mb-8 fade-in-delay-2">
              {inv.time}
            </p>
          )}

          {/* Venue */}
          <p className="text-2xl italic text-charcoal mb-1 fade-in-delay-2">
            {inv.venue}
          </p>
          <p className="text-sm tracking-wider text-muted font-sans font-light mb-10 fade-in-delay-2">
            {inv.location}
          </p>

          {/* Message */}
          {inv.message && (
            <>
              <div className="flex items-center gap-4 w-full mb-8 fade-in-delay-3">
                <div className="flex-1 h-px bg-gold-light" />
              </div>
              <p className="text-base italic text-muted leading-relaxed font-light max-w-sm fade-in-delay-3">
                &ldquo;{inv.message}&rdquo;
              </p>
            </>
          )}

          {/* RSVP */}
          <div className="mt-12 border border-gold-light px-8 py-5 fade-in-delay-3">
            <p className="text-xs tracking-ultra-wide uppercase text-gold font-sans font-light mb-2">
              Kindly RSVP
            </p>
            <a
              href={`mailto:${inv.rsvp_email}?subject=RSVP – ${inv.partner1} & ${inv.partner2}&body=Dear ${inv.partner1} and ${inv.partner2},%0D%0A%0D%0AThank you for the invitation. I would like to confirm my attendance.%0D%0A%0D%0AWith love,`}
              className="text-sm font-sans text-charcoal underline underline-offset-4 decoration-gold-light hover:text-gold transition-colors"
            >
              {inv.rsvp_email}
            </a>
          </div>
        </div>

        {/* Gold bottom bar */}
        <div className="h-1 bg-gold w-full" />
      </div>

      {/* Watermark */}
      <p className="mt-10 text-xs text-muted/50 tracking-widest font-sans font-light">
        Created with{" "}
        <span className="font-serif italic text-muted/60">Forevermore</span>
      </p>
    </main>
  );
}
