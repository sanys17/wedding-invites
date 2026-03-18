import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  const db = supabaseAdmin();
  const { data, error } = await db
    .from("invites")
    .select("id")
    .eq("stripe_session_id", sessionId)
    .eq("paid", true)
    .single();

  if (error || !data) {
    return NextResponse.json({ inviteUrl: null });
  }

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ?? req.headers.get("origin") ?? "";

  return NextResponse.json({ inviteUrl: `${origin}/invite/${data.id}` });
}
