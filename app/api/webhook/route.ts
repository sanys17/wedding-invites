import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { nanoid } from "nanoid";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("[webhook] Invalid signature", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const meta = session.metadata!;

    const id = nanoid(10); // short unique ID for the shareable URL

    const db = supabaseAdmin();
    const { error } = await db.from("invites").insert({
      id,
      partner1: meta.partner1,
      partner2: meta.partner2,
      date: meta.date,
      time: meta.time,
      venue: meta.venue,
      location: meta.location,
      message: meta.message,
      rsvp_email: meta.rsvp_email,
      template: meta.template,
      customer_email: session.customer_email,
      paid: true,
      stripe_session_id: session.id,
    });

    if (error) {
      console.error("[webhook] Supabase insert error", error);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }

    console.log(`[webhook] Invite created: ${id}`);
  }

  return NextResponse.json({ received: true });
}

// Stripe needs the raw body — disable Next.js body parsing
export const config = {
  api: { bodyParser: false },
};
