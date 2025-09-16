import React, { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';
import { stripePromise } from '../lib/stripe';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  priceId?: string;
  onGetStarted?: () => void;
}

export function PricingCard({ 
  title, 
  price, 
  description, 
  features, 
  isPopular = false, 
  priceId,
  onGetStarted 
}: PricingCardProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubscribe = async () => {
    if (!priceId) {
      onGetStarted?.();
      return;
    }

    if (!user) {
      onGetStarted?.();
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          priceId,
          userId: user.id,
          userEmail: user.email
        }
      });

      if (error) throw error;

      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId
      });

      if (stripeError) throw stripeError;
    } catch (err) {
      console.error('Subscription error:', err);
      alert('Failed to start subscription. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-white/10 backdrop-blur-sm p-8 rounded-2xl border transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl group relative ${
      isPopular ? 'border-2 border-blue-400/50 bg-white/15' : 'border-white/20'
    }`}>
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
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                isPopular ? 'bg-gradient-to-r from-blue-400 to-indigo-400' : 'bg-gradient-to-r from-green-400 to-emerald-400'
              }`}>
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-white">{feature}</span>
            </div>
          ))}
        </div>
        
        <Button 
          size="lg" 
          onClick={handleSubscribe}
          disabled={loading}
          className={`w-full text-lg py-4 transform hover:scale-105 transition-all duration-200 ${
            isPopular 
              ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 shadow-lg hover:shadow-xl' 
              : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            priceId ? 'Subscribe Now' : 'Start Free'
          )}
        </Button>
      </div>
    </div>
  );
}