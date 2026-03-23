import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "RSVP Dashboard — Forevermore" };

interface Rsvp {
  id: string;
  name: string;
  attending: boolean;
  message: string | null;
  plus_ones: number;
  created_at: string;
}

export default async function DashboardPage({ params }: { params: { id: string } }) {
  const db = supabaseAdmin();

  // Verify invite exists
  const { data: invite } = await db
    .from("invites")
    .select("id, partner1, partner2, date, venue, location, paid")
    .eq("id", params.id)
    .eq("paid", true)
    .single();

  if (!invite) notFound();

  // Fetch RSVPs
  const { data: rsvps } = await db
    .from("rsvps")
    .select("*")
    .eq("invite_id", params.id)
    .order("created_at", { ascending: false });

  const all: Rsvp[] = rsvps ?? [];
  const attending = all.filter((r) => r.attending);
  const declined = all.filter((r) => !r.attending);
  const totalGuests = attending.reduce((s, r) => s + 1 + (r.plus_ones ?? 0), 0);

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
    });
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-12">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gold-light" />
            <span className="text-xs tracking-ultra-wide uppercase text-gold font-sans font-light">RSVP Dashboard</span>
            <div className="h-px w-16 bg-gold-light" />
          </div>
          <h1 className="font-serif text-4xl font-light text-charcoal mb-1">
            {invite.partner1} <span className="italic text-gold">&amp;</span> {invite.partner2}
          </h1>
          <p className="text-sm font-sans font-light text-muted tracking-wider mt-2">
            {invite.date} · {invite.venue} · {invite.location}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: "Attending", value: attending.length, sub: `${totalGuests} total guests` },
            { label: "Declined", value: declined.length, sub: "with regrets" },
            { label: "Total RSVPs", value: all.length, sub: "responses received" },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-white border border-gold-light text-center py-6 px-4">
              <p className="font-serif text-4xl font-light text-charcoal mb-1">{value}</p>
              <p className="text-[10px] tracking-widest uppercase text-gold font-sans font-light">{label}</p>
              <p className="text-[10px] text-muted font-sans mt-1">{sub}</p>
            </div>
          ))}
        </div>

        {/* Guest list */}
        {all.length === 0 ? (
          <div className="bg-white border border-gold-light py-16 text-center">
            <p className="font-serif text-xl font-light text-charcoal mb-2">No RSVPs yet</p>
            <p className="text-sm font-sans font-light text-muted">Share your invitation link and responses will appear here.</p>
          </div>
        ) : (
          <div className="bg-white border border-gold-light overflow-hidden">
            <div className="border-b border-gold-light px-6 py-4">
              <p className="text-[10px] tracking-ultra-wide uppercase text-gold font-sans font-light">Guest Responses</p>
            </div>
            <div className="divide-y divide-gold-light/40">
              {all.map((rsvp) => (
                <div key={rsvp.id} className="px-6 py-4 flex items-start gap-4">
                  {/* Status dot */}
                  <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${rsvp.attending ? "bg-gold" : "bg-muted/30"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="font-serif text-charcoal font-light">{rsvp.name}</p>
                      {rsvp.plus_ones > 0 && (
                        <span className="text-[9px] tracking-widest uppercase text-gold font-sans border border-gold-light px-2 py-0.5">
                          +{rsvp.plus_ones}
                        </span>
                      )}
                      <span className={`text-[9px] tracking-widest uppercase font-sans ml-auto ${rsvp.attending ? "text-gold" : "text-muted"}`}>
                        {rsvp.attending ? "Attending ✓" : "Declined"}
                      </span>
                    </div>
                    {rsvp.message && (
                      <p className="text-sm italic text-muted font-sans mt-1 leading-relaxed">
                        &ldquo;{rsvp.message}&rdquo;
                      </p>
                    )}
                    <p className="text-[10px] text-muted/50 font-sans mt-1">{formatDate(rsvp.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer note */}
        <p className="text-center text-xs text-muted/50 font-sans font-light mt-8 tracking-wider">
          Keep this page bookmarked — it updates automatically as guests respond.
        </p>
      </div>
    </main>
  );
}
