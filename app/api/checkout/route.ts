import { NextResponse } from "next/server";
import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});
export async function POST(req: Request) {
  try {
    const { items } = await req.json();
    const lineItems = items.map((item: any) => ({
      price_data: {
        curreny: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${window.location.origin}/success`,
      cancel_url: `${window.location.origin}/cancel`,
    });
    return NextResponse.json({
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 }
    );
  }
}
