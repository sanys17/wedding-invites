import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const db = supabaseAdmin();
  const { data, error } = await db
    .from("invites")
    .select("plan, language")
    .eq("id", id)
    .eq("paid", true)
    .single();

  if (error || !data) return NextResponse.json({ plan: null });
  return NextResponse.json({ plan: data.plan, language: data.language });
}
