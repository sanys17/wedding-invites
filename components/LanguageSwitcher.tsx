"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { Lang } from "@/lib/translations";

const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "cs", label: "CZ" },
  { code: "sk", label: "SK" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center gap-1 text-xs font-sans font-light tracking-widest">
      {LANGS.map(({ code, label }, i) => (
        <span key={code} className="flex items-center gap-1">
          <button
            onClick={() => setLang(code)}
            className={`uppercase transition-colors ${
              lang === code
                ? "text-gold"
                : "text-muted hover:text-charcoal"
            }`}
          >
            {label}
          </button>
          {i < LANGS.length - 1 && (
            <span className="text-muted/40">·</span>
          )}
        </span>
      ))}
    </div>
  );
}
