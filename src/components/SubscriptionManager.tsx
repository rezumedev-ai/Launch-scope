import React, { useState, useEffect } from 'react';
import { Crown, CreditCard, Calendar, AlertCircle, CheckCircle, X, Loader } from 'lucide-react';
import { Button } from './ui/Button';
import { PricingCard } from './PricingCard';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { STRIPE_PRODUCTS } from '../stripe-config';

interface SubscriptionData {
  customer_id: string;
  subscription_id: string;
  subscription_status: string;
  price_id: string;
  current_period_start: number;
  current_period_end: number;
  cancel_at_period_end: boolean;
  payment_method_brand: string;
  payment_method_last4: string;
}

export function SubscriptionManager() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPricing, setShowPricing] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadSubscriptionData();
    }
  }, [user]);

  const loadSubscriptionData = async () => {
    try {
      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .maybeSingle();

      if (error) {
        console.error('Error loading subscription:', error);
      } else {
        setSubscription(data);
      }
    } catch (err) {
      console.error('Error loading subscription data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = () => {
    setShowPricing(true);
  };

  const handleManageBilling = async () => {
    setActionLoading(true);
    try {
      // Create a customer portal session
      const { data, error } = await supabase.functions.invoke('stripe-customer-portal', {
        body: { return_url: window.location.href }
      });

      if (error) throw error;

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      alert('Failed to open billing management. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const getSubscriptionStatus = () => {
    if (!subscription) return { status: 'free', color: 'text-gray-500', bgColor: 'bg-gray-100' };
    
    switch (subscription.subscription_status) {
      case 'active':
        return { status: 'Active', color: 'text-green-600', bgColor: 'bg-green-100' };
      case 'trialing':
        return { status: 'Trial', color: 'text-blue-600', bgColor: 'bg-blue-100' };
      case 'past_due':
        return { status: 'Past Due', color: 'text-orange-600', bgColor: 'bg-orange-100' };
      case 'canceled':
        return { status: 'Canceled', color: 'text-red-600', bgColor: 'bg-red-100' };
      case 'incomplete':
        return { status: 'Incomplete', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
      default:
        return { status: 'Unknown', color: 'text-gray-600', bgColor: 'bg-gray-100' };
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isSubscribed = subscription && ['active', 'trialing'].includes(subscription.subscription_status);
  const statusInfo = getSubscriptionStatus();

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
        <Loader className="w-8 h-8 animate-spin text-white mx-auto mb-4" />
        <p className="text-white">Loading subscription details...</p>
      </div>
    );
  }

  if (showPricing) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center text-white">
          <button
            onClick={() => setShowPricing(false)}
            className="inline-flex items-center text-blue-100 hover:text-white transition-colors duration-200 mb-6"
          >
            ← Back to Dashboard
          </button>
          <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-blue-100 text-lg">Upgrade to unlock unlimited startup idea validations</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Free Plan */}
          <PricingCard
            title="Free Plan"
            price="$0"
            description="Perfect for testing the waters"
            features={[
              "3 validations per month",
              "Basic market analysis",
              "Risk assessment"
            ]}
            onGetStarted={() => setShowPricing(false)}
          />

          {/* Pro Plan */}
          <PricingCard
            title="LaunchScope Pro"
            price="$4.99"
            description="For serious founders ready to scale"
            features={[
              "Unlimited validations",
              "Deep competitor analysis",
              "Priority support",
              "Advanced insights"
            ]}
            isPopular={true}
            priceId={STRIPE_PRODUCTS.LAUNCHSCOPE_PRO.priceId}
            onGetStarted={() => setShowPricing(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Subscription Status Card */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Subscription Status</h3>
              <p className="text-blue-100 text-sm">Manage your LaunchScope subscription</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
            {statusInfo.status}
          </div>
        </div>

        {isSubscribed ? (
          <div className="space-y-4">
            {/* Current Plan */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-semibold">Current Plan</h4>
                <span className="text-green-300 font-medium">LaunchScope Pro</span>
              </div>
              <p className="text-blue-100 text-sm">Unlimited startup idea validations with advanced insights</p>
            </div>

            {/* Billing Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center mb-2">
                  <Calendar className="w-4 h-4 text-blue-300 mr-2" />
                  <span className="text-white font-medium">Next Billing</span>
                </div>
                <p className="text-blue-100 text-sm">
                  {formatDate(subscription.current_period_end)}
                </p>
                {subscription.cancel_at_period_end && (
                  <p className="text-orange-300 text-xs mt-1">
                    Subscription will cancel at period end
                  </p>
                )}
              </div>

              {subscription.payment_method_brand && (
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center mb-2">
                    <CreditCard className="w-4 h-4 text-blue-300 mr-2" />
                    <span className="text-white font-medium">Payment Method</span>
                  </div>
                  <p className="text-blue-100 text-sm">
                    {subscription.payment_method_brand.toUpperCase()} •••• {subscription.payment_method_last4}
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={handleManageBilling}
                disabled={actionLoading}
                className="bg-white/10 border border-white/20 text-white hover:bg-white/20"
              >
                {actionLoading ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Manage Billing
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl flex items-center justify-center mb-4 mx-auto">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">You're on the Free Plan</h4>
            <p className="text-blue-100 mb-6">
              Upgrade to LaunchScope Pro for unlimited validations and advanced insights
            </p>
            <Button onClick={handleSubscribe} size="lg">
              Upgrade to Pro - $4.99/month
            </Button>
          </div>
        )}
      </div>

      {/* Usage Stats (if subscribed) */}
      {isSubscribed && (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">This Month's Usage</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">∞</div>
              <div className="text-blue-100 text-sm">Validations Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300">✓</div>
              <div className="text-blue-100 text-sm">Advanced Insights</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">⚡</div>
              <div className="text-blue-100 text-sm">Priority Support</div>
            </div>
          </div>
        </div>
      )}

      {/* Free Plan Limitations */}
      {!isSubscribed && (
        <div className="bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-amber-100 font-semibold mb-2">Free Plan Limitations</h4>
              <ul className="text-amber-200 text-sm space-y-1">
                <li>• Limited to 3 idea validations per month</li>
                <li>• Basic analysis only</li>
                <li>• No priority support</li>
              </ul>
              <Button 
                onClick={handleSubscribe}
                size="sm" 
                className="mt-4 bg-amber-500 hover:bg-amber-600 text-white"
              >
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}