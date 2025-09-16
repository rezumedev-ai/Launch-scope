// Stripe Product Configuration
export const STRIPE_PRODUCTS = {
  LAUNCHSCOPE_PRO: {
    priceId: 'price_1S7xjkKI1OQ24rwk9jS28EQ4',
    name: 'Launch-Scope Pro',
    description: 'Unlimited startup idea validations with advanced insights',
    mode: 'subscription' as const,
  },
} as const;

export type StripeProduct = typeof STRIPE_PRODUCTS[keyof typeof STRIPE_PRODUCTS];