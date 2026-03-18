"use client";

import { useState } from "react";
import InvitePreview from "@/components/InvitePreview";
import type { InviteData } from "@/lib/types";
import Link from "next/link";

const INITIAL: InviteData = {
  partner1: "",
  partner2: "",
  date: "",
  time: "",
  venue: "",
  location: "",
  message: "",
  rsvp_email: "",
  template: "elegant-minimal",
};

const PRICE = 15; // USD — change this whenever you decide

export default function CustomizePage() {
  const [form, setForm] = useState<InviteData>(INITIAL);
  const [step, setStep] = useState<"edit" | "review">("edit");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(field: keyof InviteData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isComplete() {
    return (
      form.partner1.trim() &&
      form.partner2.trim() &&
      form.date.trim() &&
      form.venue.trim() &&
      form.location.trim() &&
      form.rsvp_email.trim() &&
      isValidEmail(form.rsvp_email)
    );
  }

  async function handleCheckout() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invite: form }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-cream">
      {/* ── NAV ── */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-6xl mx-auto border-b border-gold-light">
        <Link href="/" className="font-serif text-2xl tracking-widest text-charcoal hover:text-gold transition-colors">
          Forevermore
        </Link>
        <span className="text-xs tracking-ultra-wide uppercase text-muted font-light">
          {step === "edit" ? "Customize" : "Review & Purchase"}
        </span>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* ── LEFT: FORM ── */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-gold-light" />
              <span className="text-xs tracking-ultra-wide uppercase text-gold font-light">
                {step === "edit" ? "Your Details" : "Looks good?"}
              </span>
              <div className="h-px w-12 bg-gold-light" />
            </div>

            {step === "edit" ? (
              <>
                <h1 className="font-serif text-4xl font-light text-charcoal mb-2">
                  Make it yours.
                </h1>
                <p className="text-muted font-light mb-10 leading-relaxed">
                  Fill in your details and watch the invitation update live on
                  the right.
                </p>

                <div className="space-y-6">
                  {/* Names */}
                  <fieldset className="border border-gold-light p-5">
                    <legend className="px-2 text-xs tracking-ultra-wide uppercase text-gold font-light font-sans">
                      The Couple
                    </legend>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <label className="block">
                        <span className="text-xs uppercase tracking-widest text-muted font-sans font-light">
                          First Partner *
                        </span>
                        <input
                          className="mt-1 w-full border-b border-gold-light bg-transparent py-2 text-charcoal font-serif text-lg focus:outline-none focus:border-gold"
                          placeholder="e.g. Emma"
                          value={form.partner1}
                          onChange={(e) => update("partner1", e.target.value)}
                        />
                      </label>
                      <label className="block">
                        <span className="text-xs uppercase tracking-widest text-muted font-sans font-light">
                          Second Partner *
                        </span>
                        <input
                          className="mt-1 w-full border-b border-gold-light bg-transparent py-2 text-charcoal font-serif text-lg focus:outline-none focus:border-gold"
                          placeholder="e.g. James"
                          value={form.partner2}
                          onChange={(e) => update("partner2", e.target.value)}
                        />
                      </label>
                    </div>
                  </fieldset>

                  {/* Date & Time */}
                  <fieldset className="border border-gold-light p-5">
                    <legend className="px-2 text-xs tracking-ultra-wide uppercase text-gold font-light font-sans">
                      Date &amp; Time
                    </legend>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <label className="block">
                        <span className="text-xs uppercase tracking-widest text-muted font-sans font-light">
                          Date *
                        </span>
                        <input
                          className="mt-1 w-full border-b border-gold-light bg-transparent py-2 text-charcoal font-serif focus:outline-none focus:border-gold"
                          placeholder="e.g. September 14, 2025"
                          value={form.date}
                          onChange={(e) => update("date", e.target.value)}
                        />
                      </label>
                      <label className="block">
                        <span className="text-xs uppercase tracking-widest text-muted font-sans font-light">
                          Time
                        </span>
                        <input
                          className="mt-1 w-full border-b border-gold-light bg-transparent py-2 text-charcoal font-serif focus:outline-none focus:border-gold"
                          placeholder="e.g. 4:00 PM"
                          value={form.time}
                          onChange={(e) => update("time", e.target.value)}
                        />
                      </label>
                    </div>
                  </fieldset>

                  {/* Venue */}
                  <fieldset className="border border-gold-light p-5">
                    <legend className="px-2 text-xs tracking-ultra-wide uppercase text-gold font-light font-sans">
                      Venue
                    </legend>
                    <div className="space-y-4 mt-2">
                      <label className="block">
                        <span className="text-xs uppercase tracking-widest text-muted font-sans font-light">
                          Venue Name *
                        </span>
                        <input
                          className="mt-1 w-full border-b border-gold-light bg-transparent py-2 text-charcoal font-serif focus:outline-none focus:border-gold"
                          placeholder="e.g. The Grand Estate"
                          value={form.venue}
                          onChange={(e) => update("venue", e.target.value)}
                        />
                      </label>
                      <label className="block">
                        <span className="text-xs uppercase tracking-widest text-muted font-sans font-light">
                          City &amp; Country *
                        </span>
                        <input
                          className="mt-1 w-full border-b border-gold-light bg-transparent py-2 text-charcoal font-serif focus:outline-none focus:border-gold"
                          placeholder="e.g. Florence, Italy"
                          value={form.location}
                          onChange={(e) => update("location", e.target.value)}
                        />
                      </label>
                    </div>
                  </fieldset>

                  {/* Personal Message */}
                  <fieldset className="border border-gold-light p-5">
                    <legend className="px-2 text-xs tracking-ultra-wide uppercase text-gold font-light font-sans">
                      Personal Message
                    </legend>
                    <label className="block mt-2">
                      <span className="text-xs uppercase tracking-widest text-muted font-sans font-light">
                        A note for your guests (optional)
                      </span>
                      <textarea
                        rows={3}
                        className="mt-1 w-full border-b border-gold-light bg-transparent py-2 text-charcoal font-serif focus:outline-none focus:border-gold resize-none"
                        placeholder="e.g. We joyfully invite you to celebrate with us…"
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                      />
                    </label>
                  </fieldset>

                  {/* RSVP */}
                  <fieldset className="border border-gold-light p-5">
                    <legend className="px-2 text-xs tracking-ultra-wide uppercase text-gold font-light font-sans">
                      RSVP Email
                    </legend>
                    <label className="block mt-2">
                      <span className="text-xs uppercase tracking-widest text-muted font-sans font-light">
                        Guests will RSVP to this email *
                      </span>
                      <input
                        type="email"
                        className="mt-1 w-full border-b border-gold-light bg-transparent py-2 text-charcoal font-serif focus:outline-none focus:border-gold"
                        placeholder="e.g. emma@example.com"
                        value={form.rsvp_email}
                        onChange={(e) => update("rsvp_email", e.target.value)}
                      />
                      {form.rsvp_email && !isValidEmail(form.rsvp_email) && (
                        <p className="text-red-400 text-xs mt-1">
                          Please enter a valid email address (e.g. emma@example.com)
                        </p>
                      )}
                    </label>
                  </fieldset>
                </div>

                <button
                  onClick={() => setStep("review")}
                  disabled={!isComplete()}
                  className="mt-10 w-full bg-charcoal text-cream py-4 text-sm tracking-widest uppercase hover:bg-gold transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Review My Invitation →
                </button>
                <p className="text-center text-xs text-muted mt-3 font-light">
                  * Required fields
                </p>
              </>
            ) : (
              /* ── REVIEW STEP ── */
              <div>
                <h1 className="font-serif text-4xl font-light text-charcoal mb-2">
                  Looking beautiful.
                </h1>
                <p className="text-muted font-light mb-8 leading-relaxed">
                  Your invitation is ready. After payment you&apos;ll receive a
                  permanent shareable link instantly.
                </p>

                <div className="border border-gold-light p-6 mb-8 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted font-light">Design</span>
                    <span className="font-serif">Élégant — Minimalist</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted font-light">Couple</span>
                    <span className="font-serif italic">
                      {form.partner1} &amp; {form.partner2}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted font-light">Date</span>
                    <span className="font-serif">{form.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted font-light">Venue</span>
                    <span className="font-serif">{form.venue}</span>
                  </div>
                  <div className="divider-gold" />
                  <div className="flex justify-between">
                    <span className="text-muted font-light text-sm">Total</span>
                    <span className="font-serif text-xl text-gold">
                      ${PRICE} USD
                    </span>
                  </div>
                </div>

                {error && (
                  <p className="text-red-500 text-sm mb-4 text-center">
                    {error}
                  </p>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-gold text-white py-4 text-sm tracking-widest uppercase hover:bg-gold-dark transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? "Redirecting to payment…" : `Pay $${PRICE} & Get My Link`}
                </button>

                <button
                  onClick={() => setStep("edit")}
                  className="mt-4 w-full border border-gold-light text-muted py-3 text-xs tracking-widest uppercase hover:border-gold hover:text-charcoal transition-all duration-300"
                >
                  ← Go Back &amp; Edit
                </button>

                <p className="text-center text-xs text-muted mt-4 font-light">
                  Secure payment via Stripe. Your link is permanent — share it
                  forever.
                </p>
              </div>
            )}
          </div>

          {/* ── RIGHT: LIVE PREVIEW ── */}
          <div className="lg:sticky lg:top-8">
            <div className="flex items-center gap-4 mb-6 justify-center">
              <div className="h-px w-12 bg-gold-light" />
              <span className="text-xs tracking-ultra-wide uppercase text-gold font-light">
                Live Preview
              </span>
              <div className="h-px w-12 bg-gold-light" />
            </div>
            <InvitePreview data={form} />
            <p className="text-center text-xs text-muted mt-4 font-light">
              This is exactly what your guests will see.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
