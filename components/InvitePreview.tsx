"use client";

import type { InviteData } from "@/lib/types";
import { getTemplateComponent } from "./templates";

interface Props {
  data: InviteData;
  animate?: boolean;
}

export default function InvitePreview({ data, animate = false }: Props) {
  const Template = getTemplateComponent(data.template || "elegant-minimal");

  return (
    <div
      className={`relative w-full max-w-md mx-auto shadow-xl overflow-hidden ${animate ? "fade-in" : ""}`}
      style={{ aspectRatio: "3/4" }}
    >
      <div className="absolute inset-0">
        <Template data={data} />
      </div>
      {/* Gold top/bottom accent bars */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#B8960C] opacity-60 z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B8960C] opacity-60 z-10 pointer-events-none" />
    </div>
  );
}
