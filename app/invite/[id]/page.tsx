import { createClient } from "@supabase/supabase-js";
import type { InviteRecord } from "@/lib/types";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import InvitePageClient from "@/components/InvitePageClient";

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
    .select("partner1,partner2,date,venue,location")
    .eq("id", params.id)
    .single();

  if (!data) return { title: "Wedding Invitation" };
  const inv = data as InviteRecord;
  const title = `${inv.partner1} & ${inv.partner2} — Wedding Invitation`;
  const description = `You're invited to celebrate the wedding of ${inv.partner1} and ${inv.partner2}${inv.date ? ` on ${inv.date}` : ""}${inv.venue ? ` at ${inv.venue}` : ""}.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
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

  const inv = data as InviteRecord & { language?: string };
  return <InvitePageClient inv={inv} initialLang={(inv.language as "en" | "cs" | "sk") ?? "en"} />;
}
