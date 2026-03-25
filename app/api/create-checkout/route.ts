import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import type { InviteData } from "@/lib/types";

function getPricing(language?: string) {
  if (language === "cs") return { currency: "czk", unit_amount: 35000 }; // 350 Kč
  return { currency: "eur", unit_amount: 1400 }; // €14
}

export async function POST(req: NextRequest) {
  try {
    const { invite }: { invite: InviteData } = await req.json();

    const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL;
    const { currency, unit_amount } = getPricing(invite.language);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency,
            unit_amount,
            product_data: {
              name: "Digital Wedding Invitation — Élégant",
              description: `${invite.partner1} & ${invite.partner2} · ${invite.date}`,
            },
          },
        },
      ],
      // We store the invite data in metadata so the webhook can retrieve it
      metadata: {
        partner1: invite.partner1,
        partner2: invite.partner2,
        date: invite.date,
        time: invite.time ?? "",
        venue: invite.venue,
        location: invite.location,
        message: invite.message ?? "",
        rsvp_email: invite.rsvp_email,
        template: invite.template,
        language: invite.language ?? "en",
        image_url: invite.image_url ?? "",
        video_url: invite.video_url ?? "",
      },
      // only prefill email if it looks valid
      ...(invite.rsvp_email?.includes("@") ? { customer_email: invite.rsvp_email } : {}),
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/customize`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[create-checkout]", err);
    return NextResponse.json(
      { error: "Failed to create checkout session." },
      { status: 500 }
    );
  }
}
