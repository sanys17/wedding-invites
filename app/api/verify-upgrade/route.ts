import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, inviteId } = await req.json();
    if (!sessionId || !inviteId) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    // Retrieve the session directly from Stripe to verify payment
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
    }

    const meta = session.metadata;
    if (!meta || meta.type !== "upgrade" || meta.invite_id !== inviteId) {
      return NextResponse.json({ error: "Invalid session" }, { status: 400 });
    }

    const db = supabaseAdmin();
    const { error } = await db
      .from("invites")
      .update({ plan: meta.new_plan })
      .eq("id", inviteId);

    if (error) {
      console.error("[verify-upgrade] DB error", error);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }

    return NextResponse.json({ plan: meta.new_plan });
  } catch (err) {
    console.error("[verify-upgrade]", err);
    return NextResponse.json({ error: "Failed to verify upgrade" }, { status: 500 });
  }
}
