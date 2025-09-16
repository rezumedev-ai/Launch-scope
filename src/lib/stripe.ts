import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  throw new Error('Missing Stripe publishable key. Please check your .env file contains VITE_STRIPE_PUBLISHABLE_KEY');
}

export const stripePromise = loadStripe(stripePublishableKey);