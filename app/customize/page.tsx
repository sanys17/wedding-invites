"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import InvitePreview from "@/components/InvitePreview";
import type { InviteData } from "@/lib/types";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { TEMPLATE_REGISTRY } from "@/components/templates";

function CustomizeContent() {
  const { t, lang, setLang } = useLanguage();
  const searchParams = useSearchParams();
  const paramTemplate = searchParams.get("template") ?? "elegant-minimal";
  const initialTemplate = TEMPLATE_REGISTRY.find((r) => r.id === paramTemplate)
    ? paramTemplate
    : "elegant-minimal";

  const INITIAL: InviteData = {
    partner1: "",
    partner2: "",
    date: "",
    time: "",
    venue: "",
    location: "",
    message: "",
    rsvp_email: "",
    template: initialTemplate,
    language: lang,
  };

  function priceDisplay(language?: string) {
    return language === "cs" ? "350 Kč" : "€14";
  }

  type FilterKey = "all" | "vertical" | "horizontal" | "photo" | "animated" | "video";
  const FILTERS: { key: FilterKey; label: string }[] = [
    { key: "all",        label: "All" },
    { key: "animated",   label: "✦ Animated" },
    { key: "video",      label: "▶ Video" },
    { key: "vertical",   label: "Vertical" },
    { key: "horizontal", label: "Horizontal" },
    { key: "photo",      label: "With Photo" },
  ];

  const [form, setForm] = useState<InviteData>(INITIAL);
  const [step, setStep] = useState<"edit" | "review">("edit");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [imageError, setImageError] = useState("");
  const [videoUploading, setVideoUploading] = useState(false);
  const [videoError, setVideoError] = useState("");

  function update(field: keyof InviteData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUploading(true);
    setImageError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload-image", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) update("image_url", data.url);
      else setImageError("Upload failed. Try again.");
    } catch {
      setImageError("Upload failed. Try again.");
    } finally {
      setImageUploading(false);
    }
  }

  async function handleVideoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoUploading(true);
    setVideoError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload-video", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) update("video_url", data.url);
      else setVideoError(data.error ?? "Upload failed. Try again.");
    } catch {
      setVideoError("Upload failed. Try again.");
    } finally {
      setVideoUploading(false);
    }
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
        setError(data.error || t.somethingWentWrong);
      }
    } catch {
      setError(t.networkError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-cream">
      {/* ── NAV ── */}
      <nav className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-gold-light/50 px-8 py-5 shadow-sm">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link
            href="/"
            className="font-serif text-2xl tracking-widest text-charcoal hover:text-gold transition-colors cursor-pointer"
          >
            Forevermore
          </Link>
          <div className="flex items-center gap-6">
            <LanguageSwitcher />
            {/* Step indicator */}
            <div className="hidden sm:flex items-center gap-2 text-xs tracking-widest uppercase font-light">
              <span className={step === "edit" ? "text-gold" : "text-muted/40"}>
                01 · {t.customizeStep}
              </span>
              <span className="text-muted/30">—</span>
              <span className={step === "review" ? "text-gold" : "text-muted/40"}>
                02 · {t.reviewStep}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* ── LEFT: FORM ── */}
          <div>
            {/* Template switcher */}
            {step === "edit" && (
              <div className="mb-8">
                <p className="text-xs tracking-ultra-wide uppercase text-muted font-light mb-3">Choose a Design</p>

                {/* Filter pills */}
                <div className="flex gap-2 mb-3 flex-wrap">
                  {FILTERS.map((f) => (
                    <button
                      key={f.key}
                      onClick={() => setFilter(f.key)}
                      className={`px-3 py-1 text-[10px] tracking-widest uppercase font-light border transition-all ${
                        filter === f.key
                          ? "border-gold text-gold bg-gold/5"
                          : "border-gold-light text-muted hover:border-gold hover:text-gold"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                {/* Template grid */}
                {(() => {
                  const filtered = TEMPLATE_REGISTRY.filter((tmpl) => {
                    if (filter === "vertical")   return tmpl.orientation === "vertical";
                    if (filter === "horizontal") return tmpl.orientation === "horizontal";
                    if (filter === "photo")      return tmpl.supportsImage;
                    if (filter === "animated")   return (tmpl as any).animated;
                    if (filter === "video")      return (tmpl as any).supportsVideo;
                    return true;
                  });

                  const hasHorizontal = filtered.some(t => t.orientation === "horizontal");
                  const hasVertical   = filtered.some(t => t.orientation === "vertical");
                  const mixed = hasHorizontal && hasVertical;

                  if (mixed) {
                    // Group by orientation when showing "all"
                    const verticals   = filtered.filter(t => t.orientation === "vertical");
                    const horizontals = filtered.filter(t => t.orientation === "horizontal");
                    const previewData: InviteData = { partner1: "Emma", partner2: "James", date: "Sept 14, 2025", time: "4:00 PM", venue: "Grand Estate", location: "Florence", message: "", rsvp_email: "", template: "" };

                    return (
                      <div className="max-h-72 overflow-y-auto pr-1 space-y-4">
                        {verticals.length > 0 && (
                          <div>
                            <p className="text-[9px] tracking-ultra-wide uppercase text-muted/50 font-light mb-2">Vertical</p>
                            <div className="grid grid-cols-5 gap-2">
                              {verticals.map((tmpl) => {
                                const TC = tmpl.component;
                                return (
                                  <button key={tmpl.id} onClick={() => update("template", tmpl.id)}
                                    className={`relative border transition-all cursor-pointer ${form.template === tmpl.id ? "border-gold shadow-sm" : "border-gold-light hover:border-gold"}`}
                                    style={{ aspectRatio: "3/4" }} title={`${tmpl.name} — ${tmpl.tag}`}>
                                    <div className="absolute inset-0 overflow-hidden" style={{ transform: "scale(0.155)", transformOrigin: "top left", width: "645%", height: "645%" }}>
                                      <TC data={{ ...previewData, template: tmpl.id }} />
                                    </div>
                                    {form.template === tmpl.id && <div className="absolute inset-0 border-2 border-gold pointer-events-none" />}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        {horizontals.length > 0 && (
                          <div>
                            <p className="text-[9px] tracking-ultra-wide uppercase text-muted/50 font-light mb-2">Horizontal</p>
                            <div className="grid grid-cols-3 gap-2">
                              {horizontals.map((tmpl) => {
                                const TC = tmpl.component;
                                return (
                                  <button key={tmpl.id} onClick={() => update("template", tmpl.id)}
                                    className={`relative border transition-all cursor-pointer ${form.template === tmpl.id ? "border-gold shadow-sm" : "border-gold-light hover:border-gold"}`}
                                    style={{ aspectRatio: "4/3" }} title={`${tmpl.name} — ${tmpl.tag}`}>
                                    <div className="absolute inset-0 overflow-hidden" style={{ transform: "scale(0.155)", transformOrigin: "top left", width: "645%", height: "645%" }}>
                                      <TC data={{ ...previewData, template: tmpl.id }} />
                                    </div>
                                    {form.template === tmpl.id && <div className="absolute inset-0 border-2 border-gold pointer-events-none" />}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }

                  // Single orientation view
                  const isHoriz = hasHorizontal;
                  const previewData: InviteData = { partner1: "Emma", partner2: "James", date: "Sept 14, 2025", time: "4:00 PM", venue: "Grand Estate", location: "Florence", message: "", rsvp_email: "", template: "" };
                  return (
                    <div className={`grid gap-2 max-h-72 overflow-y-auto pr-1 ${isHoriz ? "grid-cols-3" : "grid-cols-5"}`}>
                      {filtered.map((tmpl) => {
                        const TC = tmpl.component;
                        return (
                          <button key={tmpl.id} onClick={() => update("template", tmpl.id)}
                            className={`relative border transition-all cursor-pointer ${form.template === tmpl.id ? "border-gold shadow-sm" : "border-gold-light hover:border-gold"}`}
                            style={{ aspectRatio: isHoriz ? "4/3" : "3/4" }} title={`${tmpl.name} — ${tmpl.tag}`}>
                            <div className="absolute inset-0 overflow-hidden" style={{ transform: "scale(0.155)", transformOrigin: "top left", width: "645%", height: "645%" }}>
                              <TC data={{ ...previewData, template: tmpl.id }} />
                            </div>
                            {form.template === tmpl.id && <div className="absolute inset-0 border-2 border-gold pointer-events-none" />}
                          </button>
                        );
                      })}
                    </div>
                  );
                })()}

                <p className="text-[10px] text-muted font-light mt-2">
                  Selected: <span className="text-gold font-normal">{TEMPLATE_REGISTRY.find(r => r.id === form.template)?.name}</span>
                  {" — "}{TEMPLATE_REGISTRY.find(r => r.id === form.template)?.tag}
                  {TEMPLATE_REGISTRY.find(r => r.id === form.template)?.supportsImage && (
                    <span className="ml-2 text-gold/60">· supports photo</span>
                  )}
                </p>
              </div>
            )}

            {/* Image upload — only shown for templates that support it */}
            {step === "edit" && TEMPLATE_REGISTRY.find(r => r.id === form.template)?.supportsImage && (
              <div className="mb-8">
                <p className="text-xs tracking-ultra-wide uppercase text-muted font-light mb-3">Photo</p>
                <label className={`flex flex-col items-center justify-center border border-dashed border-gold-light p-6 cursor-pointer hover:border-gold transition-colors ${imageUploading ? "opacity-50 pointer-events-none" : ""}`}>
                  {form.image_url ? (
                    <div className="w-full flex flex-col items-center gap-3">
                      <img src={form.image_url} alt="Preview" className="h-28 object-contain rounded" />
                      <p className="text-xs text-muted font-light">Click to change photo</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted">
                      <svg className="w-8 h-8 text-gold-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                      <p className="text-xs font-light text-center">Upload your couple photo<br /><span className="text-[10px] text-muted/60">JPG, PNG · max 5 MB</span></p>
                      {imageUploading && <p className="text-xs text-gold">Uploading…</p>}
                    </div>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
                {imageError && <p className="text-xs text-red-500 mt-1">{imageError}</p>}
              </div>
            )}

            {/* Video upload — only shown for templates that support video */}
            {step === "edit" && TEMPLATE_REGISTRY.find(r => r.id === form.template)?.supportsVideo && (
              <div className="mb-8">
                <p className="text-xs tracking-ultra-wide uppercase text-muted font-light mb-3">Background Video</p>
                <label className={`flex flex-col items-center justify-center border border-dashed border-gold-light p-6 cursor-pointer hover:border-gold transition-colors ${videoUploading ? "opacity-50 pointer-events-none" : ""}`}>
                  {form.video_url ? (
                    <div className="w-full flex flex-col items-center gap-3">
                      <video src={form.video_url} className="h-28 rounded object-cover w-full" muted loop playsInline autoPlay />
                      <p className="text-xs text-muted font-light">Click to change video</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted">
                      <svg className="w-8 h-8 text-gold-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                      <p className="text-xs font-light text-center">Upload your background video<br /><span className="text-[10px] text-muted/60">MP4, MOV · max 50 MB</span></p>
                      {videoUploading && <p className="text-xs text-gold">Uploading…</p>}
                    </div>
                  )}
                  <input type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} />
                </label>
                {videoError && <p className="text-xs text-red-500 mt-1">{videoError}</p>}
              </div>
            )}

            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-gold-light" />
              <span className="text-xs tracking-ultra-wide uppercase text-gold font-light">
                {step === "edit" ? t.yourDetails : t.looksGood}
              </span>
              <div className="h-px w-12 bg-gold-light" />
            </div>

            {step === "edit" ? (
              <>
                <h1 className="font-serif text-4xl font-light text-charcoal mb-2">
                  {t.makeItYours}
                </h1>
                <p className="text-muted font-light mb-10 leading-relaxed">
                  {t.fillInDetails}
                </p>

                <div className="space-y-6">
                  {/* Invitation Language — top of form */}
                  <fieldset className="border border-gold-light px-4 pt-2 pb-4">
                    <legend className="px-2 text-xs tracking-ultra-wide uppercase text-gold font-light font-sans">
                      {t.invitationLanguage}
                    </legend>
                    <p className="text-xs uppercase tracking-widest text-muted font-sans font-light mt-2 mb-3">
                      {t.languageGuestsSee}
                    </p>
                    <div className="flex gap-3">
                      {(["en", "cs", "sk"] as const).map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => { update("language", l); setLang(l); }}
                          className={`flex-1 py-2 text-xs tracking-widest uppercase font-sans border transition-all ${
                            (form.language ?? lang) === l
                              ? "border-gold bg-gold/10 text-gold"
                              : "border-gold-light text-muted hover:border-gold hover:text-gold"
                          }`}
                        >
                          {l === "en" ? "English" : l === "cs" ? "Česky" : "Slovensky"}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  {/* Names */}
                  <fieldset className="border border-gold-light p-5">
                    <legend className="px-2 text-xs tracking-ultra-wide uppercase text-gold font-light font-sans">
                      {t.theCouple}
                    </legend>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <label className="block">
                        <span className="text-xs uppercase tracking-widest text-muted font-sans font-light">
                          {t.firstPartner}
                        </span>
                        <input
                          className="mt-1 w-full border-b border-gold-light bg-transparent py-2 text-charcoal font-serif text-lg focus:outline-none focus:border-gold"
                          placeholder={t.egPartner1}
                          value={form.partner1}
                          onChange={(e) => update("partner1", e.target.value)}
                        />
                      </label>
                      <label className="block">
                        <span className="text-xs uppercase tracking-widest text-muted font-sans font-light">
                          {t.secondPartner}
                        </span>
                        <input
                          className="mt-1 w-full border-b border-gold-light bg-transparent py-2 text-charcoal font-serif text-lg focus:outline-none focus:border-gold"
                          placeholder={t.egPartner2}
                          value={form.partner2}
                          onChange={(e) => update("partner2", e.target.value)}
                        />
                      </label>
                    </div>
                  </fieldset>

                  {/* Date & Time */}
                  <fieldset className="border border-gold-light p-5">
                    <legend className="px-2 text-xs tracking-ultra-wide uppercase text-gold font-light font-sans">
                      {t.dateAndTime}
                    </legend>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <label className="block">
                        <span className="text-xs uppercase tracking-widest text-muted font-sans font-light">
                          {t.date}
                        </span>
                        <input
                          className="mt-1 w-full border-b border-gold-light bg-transparent py-2 text-charcoal font-serif focus:outline-none focus:border-gold"
                          placeholder={t.egDate}
                          value={form.date}
                          onChange={(e) => update("date", e.target.value)}
                        />
                      </label>
                      <label className="block">
                        <span className="text-xs uppercase tracking-widest text-muted font-sans font-light">
                          {t.time}
                        </span>
                        <input
                          className="mt-1 w-full border-b border-gold-light bg-transparent py-2 text-charcoal font-serif focus:outline-none focus:border-gold"
                          placeholder={t.egTime}
                          value={form.time}
                          onChange={(e) => update("time", e.target.value)}
                        />
                      </label>
                    </div>
                  </fieldset>

                  {/* Venue */}
                  <fieldset className="border border-gold-light p-5">
                    <legend className="px-2 text-xs tracking-ultra-wide uppercase text-gold font-light font-sans">
                      {t.venue}
                    </legend>
                    <div className="space-y-4 mt-2">
                      <label className="block">
                        <span className="text-xs uppercase tracking-widest text-muted font-sans font-light">
                          {t.venueName}
                        </span>
                        <input
                          className="mt-1 w-full border-b border-gold-light bg-transparent py-2 text-charcoal font-serif focus:outline-none focus:border-gold"
                          placeholder={t.egVenue}
                          value={form.venue}
                          onChange={(e) => update("venue", e.target.value)}
                        />
                      </label>
                      <label className="block">
                        <span className="text-xs uppercase tracking-widest text-muted font-sans font-light">
                          {t.cityAndCountry}
                        </span>
                        <input
                          className="mt-1 w-full border-b border-gold-light bg-transparent py-2 text-charcoal font-serif focus:outline-none focus:border-gold"
                          placeholder={t.egLocation}
                          value={form.location}
                          onChange={(e) => update("location", e.target.value)}
                        />
                      </label>
                    </div>
                  </fieldset>

                  {/* Personal Message */}
                  <fieldset className="border border-gold-light p-5">
                    <legend className="px-2 text-xs tracking-ultra-wide uppercase text-gold font-light font-sans">
                      {t.personalMessage}
                    </legend>
                    <label className="block mt-2">
                      <span className="text-xs uppercase tracking-widest text-muted font-sans font-light">
                        {t.noteForGuests}
                      </span>
                      <textarea
                        rows={3}
                        className="mt-1 w-full border-b border-gold-light bg-transparent py-2 text-charcoal font-serif focus:outline-none focus:border-gold resize-none"
                        placeholder={t.egMessage}
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                      />
                    </label>
                  </fieldset>

                  {/* RSVP */}
                  <fieldset className="border border-gold-light p-5">
                    <legend className="px-2 text-xs tracking-ultra-wide uppercase text-gold font-light font-sans">
                      {t.rsvpEmail}
                    </legend>
                    <label className="block mt-2">
                      <span className="text-xs uppercase tracking-widest text-muted font-sans font-light">
                        {t.guestsWillRsvp}
                      </span>
                      <input
                        type="email"
                        className="mt-1 w-full border-b border-gold-light bg-transparent py-2 text-charcoal font-serif focus:outline-none focus:border-gold"
                        placeholder={t.egEmail}
                        value={form.rsvp_email}
                        onChange={(e) => update("rsvp_email", e.target.value)}
                      />
                      {form.rsvp_email && !isValidEmail(form.rsvp_email) && (
                        <p className="text-red-400 text-xs mt-1">
                          {t.invalidEmail}
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
                  {t.reviewInvitation}
                </button>
                <p className="text-center text-xs text-muted mt-3 font-light">
                  {t.requiredFields}
                </p>
              </>
            ) : (
              /* ── REVIEW STEP ── */
              <div>
                <h1 className="font-serif text-4xl font-light text-charcoal mb-2">
                  {t.lookingBeautiful}
                </h1>
                <p className="text-muted font-light mb-8 leading-relaxed">
                  {t.readyAfterPayment}
                </p>

                <div className="border border-gold-light p-6 mb-8 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted font-light">{t.design}</span>
                    <span className="font-serif">Élégant — Minimalist</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted font-light">{t.couple}</span>
                    <span className="font-serif italic">
                      {form.partner1} &amp; {form.partner2}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted font-light">{t.date}</span>
                    <span className="font-serif">{form.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted font-light">{t.venue}</span>
                    <span className="font-serif">{form.venue}</span>
                  </div>
                  <div className="divider-gold" />
                  <div className="flex justify-between">
                    <span className="text-muted font-light text-sm">
                      {t.total}
                    </span>
                    <span className="font-serif text-xl text-gold">
                      {priceDisplay(form.language)}
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
                  {loading ? t.redirecting : t.payAndGetLink(priceDisplay(form.language))}
                </button>

                <button
                  onClick={() => setStep("edit")}
                  className="mt-4 w-full border border-gold-light text-muted py-3 text-xs tracking-widest uppercase hover:border-gold hover:text-charcoal transition-all duration-300"
                >
                  {t.goBackEdit}
                </button>

                <p className="text-center text-xs text-muted mt-4 font-light">
                  {t.securePayment}
                </p>
              </div>
            )}
          </div>

          {/* ── RIGHT: LIVE PREVIEW ── */}
          <div className="lg:sticky lg:top-8">
            <div className="flex items-center gap-4 mb-6 justify-center">
              <div className="h-px w-12 bg-gold-light" />
              <span className="text-xs tracking-ultra-wide uppercase text-gold font-light">
                {t.livePreview}
              </span>
              <div className="h-px w-12 bg-gold-light" />
            </div>
            <InvitePreview data={form} />
            <p className="text-center text-xs text-muted mt-4 font-light">
              {t.exactlyWhatGuests}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CustomizePage() {
  return (
    <Suspense>
      <CustomizeContent />
    </Suspense>
  );
}
