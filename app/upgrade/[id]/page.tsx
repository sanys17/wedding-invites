import { notFound, redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import UpgradeClient from "./UpgradeClient";

export const dynamic = "force-dynamic";

export default async function UpgradePage({ params }: { params: { id: string } }) {
  const db = supabaseAdmin();

  const { data: invite, error } = await db
    .from("invites")
    .select("id, partner1, partner2, plan, language")
    .eq("id", params.id)
    .eq("paid", true)
    .single();

  if (error || !invite) notFound();
  if (invite.plan !== "basic") {
    redirect(`/dashboard/${params.id}`);
  }

  return <UpgradeClient invite={invite} />;
}
