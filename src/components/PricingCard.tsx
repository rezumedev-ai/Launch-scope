import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { getStripe } from '../lib/stripe';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  priceId?: string; // Stripe Price ID for paid plans
  onGetStarted: () => void; // For free plan or sign-up
}

export function PricingCard({
  title,
  price,
  description,
  features,
  isPopular = false,
  priceId,
  onGetStarted,
}: PricingCardProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubscribe = async () => {
    if (!user) {
      onGetStarted(); // Redirect to sign-up/sign-in if not logged in
      return;
    }

    if (!priceId) {
      // This is likely the free plan, or a plan without a direct Stripe subscription
      onGetStarted();
      return;
    }

    setLoading(true);
    try {
      const { data, error: functionError } = await supabase.functions.invoke('stripe-checkout', {
        body: { 
          price_id: priceId,
          success_url: `${window.location.origin}/dashboard?success=true`,
          cancel_url: `${window.location.origin}/dashboard?canceled=true`,
          mode: 'subscription'
        },
      });

      if (functionError) {
        console.error('Supabase function error:', functionError);
        throw new Error(functionError.message || 'Failed to create checkout session');
      }

      if (data.error) {
        console.error('Stripe checkout error:', data.error);
        throw new Error(data.error);
      }

      const sessionId = data.sessionId;
      if (!sessionId) {
        console.error('No session ID returned:', data);
        throw new Error('No checkout session ID received');
      }

      const stripe = await getStripe();
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }
      
      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });
      if (stripeError) {
        console.error('Stripe redirect error:', stripeError);
        throw new Error(stripeError.message || 'Failed to redirect to checkout');
      }
    } catch (error) {
      console.error('Error during subscription:', error);
      alert(`Subscription failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-white/10 backdrop-blur-sm p-8 rounded-2xl border ${isPopular ? 'border-2 border-blue-400/50 hover:bg-white/20' : 'border-white/20 hover:bg-white/15'} transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl group relative`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-blue-400 to-indigo-400 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </div>
        </div>
      )}

      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <div className="text-4xl font-bold text-white mb-4">
          {price}<span className="text-lg text-blue-100 font-normal">/month</span>
        </div>
        <p className="text-blue-100 mb-6">{description}</p>

        <div className="space-y-3 mb-8 text-left">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
              <span className="text-white font-medium">{feature}</span>
            </div>
          ))}
        </div>

        <Button
          size="lg"
          onClick={handleSubscribe}
          className="w-full text-lg py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          disabled={loading}
        >
          {loading ? 'Loading...' : (priceId ? 'Subscribe Now' : 'Start Free')}
        </Button>
      </div>
    </div>
  );
}