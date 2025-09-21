import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.Vite_Stripe_Publishable_Key;

if (!stripePublishableKey) {
  console.warn('Vite_Stripe_Publishable_Key is not defined. Stripe functionality will be disabled.');
}

const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

export const getStripe = async () => {
  if (!stripePromise) {
    console.error('Stripe is not initialized. Please check your Vite_Stripe_Publishable_Key environment variable.');
    return null;
  }
  return await stripePromise;
};