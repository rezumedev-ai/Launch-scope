// Stripe Product Configuration
export const STRIPE_PRODUCTS = {
  LAUNCHSCOPE_PRO: {
    priceId: 'price_YOUR_ACTUAL_PRICE_ID_HERE', // Replace with your actual Price ID from Stripe
    name: 'Launch-Scope Pro',
    description: 'Unlimited startup idea validations with advanced insights',
    mode: 'subscription' as const,
  },
} as const;

export type StripeProduct = typeof STRIPE_PRODUCTS[keyof typeof STRIPE_PRODUCTS];