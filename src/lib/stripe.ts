import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.warn('VITE_STRIPE_PUBLISHABLE_KEY is not defined. Stripe functionality will be disabled.');
}

const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

export const getStripe = async () => {
  if (!stripePromise) {
    console.error('Stripe is not initialized. Please check your VITE_STRIPE_PUBLISHABLE_KEY environment variable.');
    return null;
  }
  return await stripePromise;
};