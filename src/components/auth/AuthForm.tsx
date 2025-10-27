import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Lock, AlertCircle, Loader, Eye, EyeOff, Rocket, Sparkles, TrendingUp, Lightbulb } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { supabase } from '../../lib/supabase';

const quotes = [
  {
    text: "The best time to validate your idea was yesterday. The second best time is now.",
    author: "LaunchScope",
    icon: Lightbulb
  },
  {
    text: "Every successful startup begins with a validated idea and clear direction.",
    author: "LaunchScope",
    icon: TrendingUp
  },
  {
    text: "Build what customers want, not what you think they want.",
    author: "LaunchScope",
    icon: Sparkles
  },
  {
    text: "Strategy beats speed. Clarity beats complexity. Validation beats guessing.",
    author: "LaunchScope",
    icon: Rocket
  }
];

interface AuthFormProps {
  onBack: () => void;
  initialMode: 'signup' | 'signin';
}

export function AuthForm({ onBack, initialMode }: AuthFormProps) {
  const [mode, setMode] = useState<'signup' | 'signin'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
        setIsAnimating(false);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const quote = quotes[currentQuote];
  const QuoteIcon = quote.icon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-500 flex relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Left side - Quote/Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        <div className="max-w-xl relative z-10">
          {/* Logo and brand */}
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-900/20">
                <Rocket className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">LaunchScope</span>
            </div>
            <p className="text-blue-100 text-lg font-light">Validate your startup ideas before you build</p>
          </div>

          {/* Animated quote */}
          <div className={`transition-all duration-500 transform ${
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <QuoteIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-xl font-medium leading-relaxed mb-4">
                    "{quote.text}"
                  </p>
                  <p className="text-blue-200 text-sm font-light">— {quote.author}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quote indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {quotes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsAnimating(true);
                  setTimeout(() => {
                    setCurrentQuote(idx);
                    setIsAnimating(false);
                  }, 500);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentQuote
                    ? 'w-8 bg-white'
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`View quote ${idx + 1}`}
              />
            ))}
          </div>

          {/* Feature highlights */}
          <div className="mt-12 grid grid-cols-2 gap-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <div className="text-pink-300 text-2xl font-bold mb-1">10k+</div>
              <div className="text-blue-100 text-sm">Ideas Validated</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <div className="text-pink-300 text-2xl font-bold mb-1">95%</div>
              <div className="text-blue-100 text-sm">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <div className="w-full max-w-md animate-fade-in-up">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
            {/* Form header */}
            <div className="bg-gradient-to-r from-white/5 to-white/10 border-b border-white/20 px-6 py-4">
              <Button
                variant="secondary"
                onClick={onBack}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>

            {/* Form content */}
            <div className="p-8">
              {/* Mobile logo */}
              <div className="lg:hidden mb-8 text-center">
                <div className="inline-flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                    <Rocket className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className="text-xl font-bold text-white tracking-tight">LaunchScope</span>
                </div>
              </div>

              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
                </h1>
                <p className="text-blue-100">
                  {mode === 'signup'
                    ? 'Start analyzing your startup ideas'
                    : 'Sign in to continue your journey'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start space-x-3 animate-fade-in">
                    <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
                    <p className="text-red-200 text-sm">{error}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-blue-100 text-sm font-medium block">
                    Email address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300 group-focus-within:text-pink-300 transition-colors" />
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                      className="pl-11 bg-white/10 border-white/20 text-white placeholder:text-blue-300/50 focus:border-pink-300 focus:ring-pink-300/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-blue-100 text-sm font-medium block">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300 group-focus-within:text-pink-300 transition-colors" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                      minLength={6}
                      className="pl-11 pr-11 bg-white/10 border-white/20 text-white placeholder:text-blue-300/50 focus:border-pink-300 focus:ring-pink-300/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-pink-300 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-300/50 rounded-lg p-1"
                      disabled={loading}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-semibold shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 hover:scale-[1.02]"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      {mode === 'signup' ? 'Creating Account...' : 'Signing In...'}
                    </>
                  ) : (
                    <>
                      {mode === 'signup' ? 'Create Account' : 'Sign In'}
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setMode(mode === 'signup' ? 'signin' : 'signup');
                    setError(null);
                  }}
                  className="text-blue-200 hover:text-white text-sm transition-colors font-medium"
                >
                  {mode === 'signup'
                    ? 'Already have an account? Sign in'
                    : "Don't have an account? Sign up"}
                </button>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-6 text-center">
            <p className="text-blue-100 text-sm mb-2">Trusted by founders worldwide</p>
            <div className="flex justify-center items-center gap-4 text-blue-200/60 text-xs">
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Secure & encrypted</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Privacy protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
