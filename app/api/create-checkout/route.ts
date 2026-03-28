import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import type { InviteData } from "@/lib/types";

const PLAN_PRICING = {
  basic:    { eur: 2900,  czk: 69900  }, // €29 / 699 Kč
  standard: { eur: 4900,  czk: 119000 }, // €49 / 1 190 Kč
  pro:      { eur: 8900,  czk: 219000 }, // €89 / 2 190 Kč
} as const;

const PLAN_LABELS = {
  basic:    "Basic — Digital",
  standard: "Standard — Premium",
  pro:      "Pro — Luxury",
} as const;

function getPricing(plan: string = "standard", language?: string) {
  const tier = PLAN_PRICING[plan as keyof typeof PLAN_PRICING] ?? PLAN_PRICING.standard;
  if (language === "cs") return { currency: "czk", unit_amount: tier.czk };
  return { currency: "eur", unit_amount: tier.eur };
}

export async function POST(req: NextRequest) {
  try {
    const { invite, plan }: { invite: InviteData; plan?: string } = await req.json();

    const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL;
    const { currency, unit_amount } = getPricing(plan, invite.language);
    const productName = `Digital Wedding Invitation — ${PLAN_LABELS[plan as keyof typeof PLAN_LABELS] ?? PLAN_LABELS.standard}`;

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
              name: productName,
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
        plan: plan ?? "standard",
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
