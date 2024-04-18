import Stripe from "stripe";

const stripeClient = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

export default stripeClient;
