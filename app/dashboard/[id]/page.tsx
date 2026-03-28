import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import type { Metadata } from "next";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "RSVP Dashboard — Forevermore" };

export default async function DashboardPage({ params }: { params: { id: string } }) {
  const db = supabaseAdmin();

  const { data: invite, error } = await db
    .from("invites")
    .select("id, partner1, partner2, date, venue, location, language, paid")
    .eq("id", params.id)
    .eq("paid", true)
    .single();

  if (error || !invite) notFound();

  return <DashboardClient invite={invite} inviteId={params.id} />;
}
