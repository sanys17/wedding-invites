"use client";

import type { InviteData } from "@/lib/types";
import { getTemplateComponent } from "./templates";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  data: InviteData;
  animate?: boolean;
}

export default function InvitePreview({ data, animate = false }: Props) {
  const { t } = useLanguage();
  const Template = getTemplateComponent(data.template || "elegant-minimal");

  const templateT = {
    weddingInvitation: t.weddingInvitation,
    partnerOnePlaceholder: t.partnerOnePlaceholder,
    partnerTwoPlaceholder: t.partnerTwoPlaceholder,
    datePlaceholder: t.datePlaceholder,
    venuePlaceholder: t.venuePlaceholder,
    locationPlaceholder: t.locationPlaceholder,
    togetherForever: t.togetherForever,
    together: t.together,
    anInvitation: t.anInvitation,
    rsvp: t.rsvp,
    togetherWithFamilies: t.togetherWithFamilies,
    requestPresence: t.requestPresence,
  };

  return (
    <div
      className={`relative w-full max-w-md mx-auto shadow-xl overflow-hidden ${animate ? "fade-in" : ""}`}
      style={{ aspectRatio: "3/4" }}
    >
      <div className="absolute inset-0">
        <Template data={data} t={templateT} />
      </div>
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#B8960C] opacity-60 z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B8960C] opacity-60 z-10 pointer-events-none" />
    </div>
  );
}
