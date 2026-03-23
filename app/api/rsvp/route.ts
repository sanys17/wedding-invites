import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// POST /api/rsvp — submit an RSVP
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { invite_id, name, attending, message, plus_ones } = body;

  if (!invite_id || !name || attending === undefined) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const db = supabaseAdmin();

  // Verify the invite exists and is paid
  const { data: invite } = await db
    .from("invites")
    .select("id")
    .eq("id", invite_id)
    .eq("paid", true)
    .single();

  if (!invite) {
    return NextResponse.json({ error: "Invite not found" }, { status: 404 });
  }

  // Check for duplicate name (same person RSVPing twice)
  const { data: existing } = await db
    .from("rsvps")
    .select("id")
    .eq("invite_id", invite_id)
    .ilike("name", name.trim())
    .single();

  if (existing) {
    // Update instead of insert
    await db
      .from("rsvps")
      .update({ attending, message: message || null, plus_ones: plus_ones || 0 })
      .eq("id", existing.id);
  } else {
    await db.from("rsvps").insert({
      invite_id,
      name: name.trim(),
      attending,
      message: message || null,
      plus_ones: plus_ones || 0,
    });
  }

  // Return updated count
  const { count } = await db
    .from("rsvps")
    .select("*", { count: "exact", head: true })
    .eq("invite_id", invite_id)
    .eq("attending", true);

  return NextResponse.json({ success: true, attending_count: count ?? 0 });
}

// GET /api/rsvp?invite_id=xxx — fetch all RSVPs
export async function GET(req: NextRequest) {
  const invite_id = req.nextUrl.searchParams.get("invite_id");
  if (!invite_id) {
    return NextResponse.json({ error: "Missing invite_id" }, { status: 400 });
  }

  const db = supabaseAdmin();
  const { data, error } = await db
    .from("rsvps")
    .select("*")
    .eq("invite_id", invite_id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const attending = data?.filter((r) => r.attending) ?? [];
  const declined = data?.filter((r) => !r.attending) ?? [];

  return NextResponse.json({
    rsvps: data ?? [],
    stats: {
      total: data?.length ?? 0,
      attending: attending.length,
      declined: declined.length,
      total_guests: attending.reduce((sum, r) => sum + 1 + (r.plus_ones ?? 0), 0),
    },
  });
}
