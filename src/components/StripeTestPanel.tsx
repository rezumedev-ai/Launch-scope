import React, { useState } from 'react';
import { Button } from './ui/Button';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { STRIPE_PRODUCTS } from '../stripe-config';

export function StripeTestPanel() {
  const [testResults, setTestResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const addTestResult = (test: string, success: boolean, details: any) => {
    setTestResults(prev => [...prev, {
      test,
      success,
      details,
      timestamp: new Date().toISOString()
    }]);
  };

  const testStripeConfig = async () => {
    setLoading(true);
    setTestResults([]);

    // Test 1: Check environment variables
    try {
      const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      
      addTestResult('Environment Variables', !!stripeKey && !!supabaseUrl, {
        hasStripeKey: !!stripeKey,
        hasSupabaseUrl: !!supabaseUrl,
        stripeKeyPrefix: stripeKey?.substring(0, 7)
      });
    } catch (error) {
      addTestResult('Environment Variables', false, { error: error.message });
    }

    // Test 2: Check Supabase connection
    try {
      const { data, error } = await supabase.from('stripe_customers').select('count').limit(1);
      addTestResult('Supabase Connection', !error, { error: error?.message, data });
    } catch (error) {
      addTestResult('Supabase Connection', false, { error: error.message });
    }

    // Test 3: Test edge function availability
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'OPTIONS'
      });
      addTestResult('Edge Function Deployed', response.ok, { 
        status: response.status,
        statusText: response.statusText 
      });
    } catch (error) {
      addTestResult('Edge Function Deployed', false, { error: error.message });
    }

    // Test 4: Test checkout session creation (if user is logged in)
    if (user) {
      try {
        const { data, error } = await supabase.functions.invoke('stripe-checkout', {
          body: {
            price_id: STRIPE_PRODUCTS.LAUNCHSCOPE_PRO.priceId,
            success_url: `${window.location.origin}/dashboard?success=true`,
            cancel_url: `${window.location.origin}/dashboard?canceled=true`,
            mode: 'subscription'
          }
        });

        addTestResult('Checkout Session Creation', !error && data?.sessionId, {
          error: error?.message,
          hasSessionId: !!data?.sessionId,
          sessionIdPrefix: data?.sessionId?.substring(0, 10)
        });
      } catch (error) {
        addTestResult('Checkout Session Creation', false, { error: error.message });
      }
    } else {
      addTestResult('Checkout Session Creation', false, { error: 'User not logged in' });
    }

    setLoading(false);
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">Stripe Integration Test</h3>
        <Button 
          onClick={testStripeConfig}
          disabled={loading}
          size="sm"
        >
          {loading ? 'Testing...' : 'Run Tests'}
        </Button>
      </div>

      {testResults.length > 0 && (
        <div className="space-y-3">
          {testResults.map((result, index) => (
            <div 
              key={index}
              className={`p-3 rounded-lg border ${
                result.success 
                  ? 'bg-green-500/10 border-green-400/30 text-green-100' 
                  : 'bg-red-500/10 border-red-400/30 text-red-100'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{result.test}</span>
                <span className={`text-sm ${result.success ? 'text-green-300' : 'text-red-300'}`}>
                  {result.success ? '✓ PASS' : '✗ FAIL'}
                </span>
              </div>
              {result.details && (
                <pre className="text-xs opacity-75 overflow-x-auto">
                  {JSON.stringify(result.details, null, 2)}
                </pre>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 text-sm text-blue-100">
        <p><strong>Manual Test Steps:</strong></p>
        <ol className="list-decimal list-inside space-y-1 mt-2">
          <li>Run the automated tests above</li>
          <li>Click "Subscribe Now" on the Pro plan</li>
          <li>Use test card: 4242 4242 4242 4242</li>
          <li>Check if you're redirected back successfully</li>
          <li>Verify the subscription appears in your Stripe dashboard</li>
        </ol>
      </div>
    </div>
  );
}