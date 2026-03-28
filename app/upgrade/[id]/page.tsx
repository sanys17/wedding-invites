import { notFound } from "next/navigation";
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
    // Already on a higher plan — redirect to dashboard
    return (
      <meta httpEquiv="refresh" content={`0;url=/dashboard/${params.id}`} />
    );
  }

  return <UpgradeClient invite={invite} />;
}
