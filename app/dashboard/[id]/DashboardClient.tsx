"use client";

import { useEffect, useState, useCallback } from "react";

interface Rsvp {
  id: string;
  name: string;
  attending: boolean;
  message: string | null;
  plus_ones: number;
  created_at: string;
}

interface Stats {
  total: number;
  attending: number;
  declined: number;
  total_guests: number;
}

interface Invite {
  id: string;
  partner1: string;
  partner2: string;
  date: string;
  venue: string;
  location: string;
  language?: string;
}

function getDashboardStrings(lang?: string) {
  if (lang === "cs") return {
    label: "RSVP Přehled",
    refresh: "Obnovit",
    updated: "Aktualizováno",
    attending: "Přijde",
    declined: "Odmítlo",
    totalRsvps: "Celkem RSVP",
    totalGuests: (n: number) => `${n} hostů celkem`,
    withRegrets: "s omluvou",
    responsesReceived: "přijatých odpovědí",
    noRsvpsTitle: "Zatím žádné odpovědi",
    noRsvpsDesc: "Sdílejte odkaz na oznámení a odpovědi se zobrazí zde.",
    guestResponses: "Odpovědi hostů",
    attendingLabel: "Přijde ✓",
    declinedLabel: "Odmítl(a)",
    autoRefresh: "Tato stránka se automaticky obnovuje každých 30 sekund.",
    dateLocale: "cs-CZ",
  };
  if (lang === "sk") return {
    label: "RSVP Prehľad",
    refresh: "Obnoviť",
    updated: "Aktualizované",
    attending: "Príde",
    declined: "Odmietlo",
    totalRsvps: "Celkom RSVP",
    totalGuests: (n: number) => `${n} hostí celkom`,
    withRegrets: "s ospravedlnením",
    responsesReceived: "prijatých odpovedí",
    noRsvpsTitle: "Zatiaľ žiadne odpovede",
    noRsvpsDesc: "Zdieľajte odkaz na oznámenie a odpovede sa zobrazia tu.",
    guestResponses: "Odpovede hostí",
    attendingLabel: "Príde ✓",
    declinedLabel: "Odmietol/a",
    autoRefresh: "Táto stránka sa automaticky obnovuje každých 30 sekúnd.",
    dateLocale: "sk-SK",
  };
  return {
    label: "RSVP Dashboard",
    refresh: "Refresh",
    updated: "Updated",
    attending: "Attending",
    declined: "Declined",
    totalRsvps: "Total RSVPs",
    totalGuests: (n: number) => `${n} total guests`,
    withRegrets: "with regrets",
    responsesReceived: "responses received",
    noRsvpsTitle: "No RSVPs yet",
    noRsvpsDesc: "Share your invitation link and responses will appear here.",
    guestResponses: "Guest Responses",
    attendingLabel: "Attending ✓",
    declinedLabel: "Declined",
    autoRefresh: "This page refreshes automatically every 30 seconds.",
    dateLocale: "en-GB",
  };
}

export default function DashboardClient({ invite, inviteId }: { invite: Invite; inviteId: string }) {
  const s = getDashboardStrings(invite.language);
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, attending: 0, declined: 0, total_guests: 0 });
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`/api/rsvp?invite_id=${inviteId}`, { cache: "no-store" });
      const data = await res.json();
      if (data.rsvps) {
        setRsvps(data.rsvps);
        setStats(data.stats);
        setLastUpdated(new Date());
      }
    } catch {}
    setLoading(false);
  }, [inviteId]);

  useEffect(() => {
    fetchData();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30_000);
    return () => clearInterval(interval);
  }, [fetchData]);

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString(s.dateLocale, {
      day: "numeric", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-12">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gold-light" />
            <span className="text-xs tracking-ultra-wide uppercase text-gold font-sans font-light">{s.label}</span>
            <div className="h-px w-16 bg-gold-light" />
          </div>
          <h1 className="font-serif text-4xl font-light text-charcoal mb-1">
            {invite.partner1} <span className="italic text-gold">&amp;</span> {invite.partner2}
          </h1>
          <p className="text-sm font-sans font-light text-muted tracking-wider mt-2">
            {invite.date} · {invite.venue} · {invite.location}
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              onClick={fetchData}
              className="text-[10px] tracking-widest uppercase text-gold font-sans border border-gold-light px-4 py-1.5 hover:border-gold transition-all"
            >
              {s.refresh}
            </button>
            {lastUpdated && (
              <span className="text-[10px] text-muted font-sans">
                {s.updated} {lastUpdated.toLocaleTimeString(s.dateLocale)}
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: s.attending, value: stats.attending, sub: s.totalGuests(stats.total_guests) },
            { label: s.declined, value: stats.declined, sub: s.withRegrets },
            { label: s.totalRsvps, value: stats.total, sub: s.responsesReceived },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-white border border-gold-light text-center py-6 px-4">
              <p className="font-serif text-4xl font-light text-charcoal mb-1">{value}</p>
              <p className="text-[10px] tracking-widest uppercase text-gold font-sans font-light">{label}</p>
              <p className="text-[10px] text-muted font-sans mt-1">{sub}</p>
            </div>
          ))}
        </div>

        {/* Guest list */}
        {loading ? (
          <div className="bg-white border border-gold-light py-16 text-center">
            <div className="flex items-center justify-center gap-2">
              {[0, 150, 300].map((d) => (
                <div key={d} className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
              ))}
            </div>
          </div>
        ) : rsvps.length === 0 ? (
          <div className="bg-white border border-gold-light py-16 text-center">
            <p className="font-serif text-xl font-light text-charcoal mb-2">{s.noRsvpsTitle}</p>
            <p className="text-sm font-sans font-light text-muted">{s.noRsvpsDesc}</p>
          </div>
        ) : (
          <div className="bg-white border border-gold-light overflow-hidden">
            <div className="border-b border-gold-light px-6 py-4">
              <p className="text-[10px] tracking-ultra-wide uppercase text-gold font-sans font-light">{s.guestResponses}</p>
            </div>
            <div className="divide-y divide-gold-light/40">
              {rsvps.map((rsvp) => (
                <div key={rsvp.id} className="px-6 py-4 flex items-start gap-4">
                  <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${rsvp.attending ? "bg-gold" : "bg-muted/30"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="font-serif text-charcoal font-light">{rsvp.name}</p>
                      {rsvp.plus_ones > 0 && (
                        <span className="text-[9px] tracking-widest uppercase text-gold font-sans border border-gold-light px-2 py-0.5">
                          +{rsvp.plus_ones}
                        </span>
                      )}
                      <span className={`text-[9px] tracking-widest uppercase font-sans ml-auto ${rsvp.attending ? "text-gold" : "text-muted"}`}>
                        {rsvp.attending ? s.attendingLabel : s.declinedLabel}
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

        <p className="text-center text-xs text-muted/50 font-sans font-light mt-8 tracking-wider">
          {s.autoRefresh}
        </p>
      </div>
    </main>
  );
}
