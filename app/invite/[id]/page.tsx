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

  return <InvitePageClient inv={data as InviteRecord} />;
}
