import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";

// Prices are the *difference* the customer pays to upgrade from Basic
const UPGRADE_PRICING: Record<string, { eur: number; czk: number; label: string }> = {
  standard: { eur: 2000, czk: 49100, label: "Standard — Premium" }, // €49 - €29 = €20 / 1190 - 699 = 491 Kč
  pro:      { eur: 6000, czk: 149100, label: "Pro — Luxury" },       // €89 - €29 = €60 / 2190 - 699 = 1491 Kč
};

export async function POST(req: NextRequest) {
  try {
    const { inviteId, newPlan }: { inviteId: string; newPlan: string } = await req.json();

    // Verify the invite exists, is paid, and is currently Basic
    const db = supabaseAdmin();
    const { data: invite, error } = await db
      .from("invites")
      .select("id, plan, language, partner1, partner2")
      .eq("id", inviteId)
      .eq("paid", true)
      .single();

    if (error || !invite) {
      return NextResponse.json({ error: "Invite not found." }, { status: 404 });
    }

    if (invite.plan !== "basic") {
      return NextResponse.json({ error: "Only Basic plan invites can be upgraded." }, { status: 400 });
    }

    const pricing = UPGRADE_PRICING[newPlan];
    if (!pricing) {
      return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
    }

    const isCzk = invite.language === "cs";
    const currency = isCzk ? "czk" : "eur";
    const unit_amount = isCzk ? pricing.czk : pricing.eur;

    const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL;

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
              name: `Upgrade to ${pricing.label}`,
              description: `${invite.partner1} & ${invite.partner2} — plan upgrade`,
            },
          },
        },
      ],
      metadata: {
        type: "upgrade",
        invite_id: inviteId,
        new_plan: newPlan,
      },
      success_url: `${origin}/upgrade/${inviteId}/confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/upgrade/${inviteId}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[create-upgrade-checkout]", err);
    return NextResponse.json({ error: "Failed to create checkout session." }, { status: 500 });
  }
}
