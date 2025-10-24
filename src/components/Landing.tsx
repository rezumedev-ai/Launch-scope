import React from 'react';
import { Rocket, Target, TrendingUp, Users, Zap, CheckCircle } from 'lucide-react';
import { Button } from './ui/Button';
import SearchComponent from './ui/animated-glowing-search-bar';
import { PricingCard } from './PricingCard';
import { STRIPE_PRODUCTS } from '../stripe-config';
import { CursorLogo, ClaudeLogo, OpenAILogo } from './ui/AIToolLogos';
import SpotlightCard from './ui/SpotlightCard';

interface LandingProps {
  onGetStarted: () => void;
  onSignIn: () => void;
  onNavigateToLegal: (page: 'privacy' | 'terms' | 'cookies' | 'refund' | 'acceptable-use') => void;
}

export function Landing({ onGetStarted, onSignIn, onNavigateToLegal }: LandingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-500">
      {/* Header */}
      <header className="px-6 py-4 backdrop-blur-sm bg-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg shadow-indigo-900/20">
              <Rocket className="w-4 h-4 text-indigo-600" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">LaunchScope</span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onSignIn}
              className="rounded-full px-5 py-2 whitespace-nowrap"
            >
              Sign In
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={onGetStarted}
              className="rounded-full px-5 py-2 whitespace-nowrap"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center text-white relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
              Validate Your
              <span className="text-pink-300"> Startup Ideas </span>
              Before You Build
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-50 mb-10 leading-relaxed font-light">
              Get instant clarity on your startup idea with deep insights into risks, opportunities, and what matters most to customers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <Button
                variant="secondary"
                size="lg"
                onClick={onGetStarted}
                className="px-12 py-6 text-lg hover:scale-105 shadow-2xl shadow-indigo-900/30"
              >
                Get Started Free
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={onGetStarted}
                className="px-12 py-6 text-lg"
              >
                See How It Works
              </Button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="group bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/20">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center mb-5 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Deep Analysis</h3>
                <p className="text-blue-100 leading-relaxed">
                  Uncover strengths, gaps, and hidden risks in your idea.
                </p>
              </div>

              <div className="group bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/20">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl flex items-center justify-center mb-5 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Market Insights</h3>
                <p className="text-blue-100 leading-relaxed">
                  Spot real opportunities and understand customer needs.
                </p>
              </div>

              <div className="group bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/20 sm:col-span-2 md:col-span-1">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-300 to-blue-400 rounded-xl flex items-center justify-center mb-5 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Actionable Next Steps</h3>
                <p className="text-blue-100 leading-relaxed">
                  Clear guidance on what to build and prioritize first.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="px-6 py-20 md:py-28 bg-gradient-to-br from-indigo-600 to-blue-600 relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItMnptMC0ydjItMnptLTItMnYyLTJ6bS0yIDB2Mi0yem0tMiAwdjItMnptLTItMnYyLTJ6bS0yIDB2Mi0yem0tMiAwdjItMnptLTItMnYyLTJ6bS0yIDB2Mi0yem0tMiAwdjItMnptLTItMnYyLTJ6bS0yIDB2Mi0yem0tMiAwdjItMnptLTItMnYyLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>

        <div className="max-w-7xl mx-auto text-center text-white relative z-10">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
              Most Startups Fail Before They Even Launch
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 leading-relaxed font-light">
              Founders spend months building products nobody asked for. They burn money, time, and energy — only to realize customers didn't want it.
            </p>
          </div>

          {/* Problem Visualization */}
          <div className="mb-16 relative">
            <div className="max-w-5xl mx-auto">
              <div className="relative bg-white/5 backdrop-blur-md rounded-3xl border border-white/20 p-8 md:p-12 overflow-hidden shadow-2xl">
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 border-2 border-white/30 rounded-2xl mb-8">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  <h3 className="text-white text-xl font-semibold mb-10">The Reality of Building Without Validation</h3>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
                    <div className="bg-white/5 border border-white/20 rounded-xl p-6 text-center hover:bg-white/10 hover:scale-105 transition-all duration-300">
                      <div className="text-pink-300 text-2xl font-bold mb-2">6 months</div>
                      <div className="text-blue-100 text-sm">Development time</div>
                    </div>

                    <div className="bg-white/5 border border-white/20 rounded-xl p-6 text-center hover:bg-white/10 hover:scale-105 transition-all duration-300">
                      <div className="text-pink-300 text-2xl font-bold mb-2">$50k+</div>
                      <div className="text-blue-100 text-sm">Wasted budget</div>
                    </div>

                    <div className="bg-white/5 border border-white/20 rounded-xl p-6 text-center hover:bg-white/10 hover:scale-105 transition-all duration-300">
                      <div className="text-pink-300 text-2xl font-bold mb-2">0 users</div>
                      <div className="text-blue-100 text-sm">Product adoption</div>
                    </div>

                    <div className="bg-white/5 border border-white/20 rounded-xl p-6 text-center hover:bg-white/10 hover:scale-105 transition-all duration-300">
                      <div className="text-pink-300 text-2xl font-bold mb-2">90%</div>
                      <div className="text-blue-100 text-sm">Failure rate</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3">
                    {['Building in isolation', 'Assuming customer needs', 'No market feedback', 'Feature bloat', 'Wrong priorities'].map((item, idx) => (
                      <span key={idx} className="px-5 py-2 bg-white/5 border border-white/20 rounded-full text-blue-100 text-sm hover:bg-white/10 transition-all duration-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Problem Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl">
              <div className="flex items-start gap-4 text-left">
                <div className="flex-shrink-0 w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
                    <polyline points="12,6 12,12 16,14" strokeWidth="2"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Months of work wasted</h3>
                  <p className="text-blue-100">Building features nobody wants</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl">
              <div className="flex items-start gap-4 text-left">
                <div className="flex-shrink-0 w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-pink-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Wrong features built</h3>
                  <p className="text-blue-100">Missing what customers actually need</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl">
              <div className="flex items-start gap-4 text-left">
                <div className="flex-shrink-0 w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
                    <line x1="15" y1="9" x2="9" y2="15" strokeWidth="2"></line>
                    <line x1="9" y1="9" x2="15" y2="15" strokeWidth="2"></line>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">No clear direction</h3>
                  <p className="text-blue-100">Guessing instead of knowing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The New Reality Section */}
      <section className="px-6 py-20 md:py-32 bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-40">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center text-white relative z-10">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
              Building is <span className="text-blue-200">Easy</span>.
              <br />
              <span className="bg-gradient-to-r from-pink-300 via-pink-200 to-pink-300 bg-clip-text text-transparent">
                Building the Right Thing is Hard.
              </span>
            </h2>
            <p className="text-xl sm:text-2xl text-blue-100 font-light leading-relaxed">
              The bottleneck isn't technology — it's <span className="text-white font-semibold">clarity</span>.
            </p>
          </div>

          {/* Visual Comparison Grid */}
          <div className="mb-14 relative">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6 relative">
                {/* LEFT: AI-Powered Execution */}
                <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.2)">
                  <div className="flex flex-col h-full">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl shadow-lg shadow-blue-500/30 mb-4">
                        <Zap className="w-8 h-8 text-white" strokeWidth={2.5} />
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-2">EASY</h3>
                      <p className="text-lg text-blue-100 font-medium">AI-Powered Execution</p>
                    </div>

                    {/* AI Tools Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="group relative">
                        <div className="absolute inset-0 bg-white/10 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                          <div className="flex items-center justify-center mb-3 h-10">
                            <CursorLogo className="w-10 h-10 text-white drop-shadow-lg" />
                          </div>
                          <div className="text-white text-sm font-semibold text-center">Cursor</div>
                        </div>
                      </div>

                      <div className="group relative">
                        <div className="absolute inset-0 bg-pink-300/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                          <div className="flex items-center justify-center mb-3 h-10">
                            <ClaudeLogo className="w-10 h-10 text-pink-300 drop-shadow-lg" />
                          </div>
                          <div className="text-white text-sm font-semibold text-center">Claude</div>
                        </div>
                      </div>

                      <div className="group relative">
                        <div className="absolute inset-0 bg-blue-300/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                          <div className="flex items-center justify-center mb-3 h-10">
                            <OpenAILogo className="w-10 h-10 text-blue-300 drop-shadow-lg" />
                          </div>
                          <div className="text-white text-sm font-semibold text-center">OpenAI</div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto pt-6 border-t border-white/10">
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <span className="text-blue-100 text-sm font-semibold">Automated Execution</span>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>

                {/* VS Badge - Centered between cards */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-pink-400 to-pink-500 rounded-full p-4 shadow-2xl shadow-pink-500/50 border-4 border-white/20">
                      <span className="text-white font-bold text-lg">VS</span>
                    </div>
                  </div>
                </div>

                {/* RIGHT: Strategic Direction */}
                <SpotlightCard spotlightColor="rgba(236, 72, 153, 0.2)">
                  <div className="flex flex-col h-full">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl shadow-lg shadow-pink-500/30 mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-2">HARD</h3>
                      <p className="text-lg text-blue-100 font-medium">Strategic Direction</p>
                    </div>

                    {/* Strategic Questions */}
                    <div className="space-y-3 mb-6">
                      {[
                        { q: 'What problem?', icon: '🎯' },
                        { q: 'Which market?', icon: '🌍' },
                        { q: 'Which features?', icon: '⚡' }
                      ].map((item, idx) => (
                        <div key={idx} className="group relative">
                          <div className="absolute inset-0 bg-pink-300/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative bg-white/5 border border-white/20 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{item.icon}</span>
                              <span className="text-white font-semibold text-base flex-1">{item.q}</span>
                              <svg className="w-5 h-5 text-pink-300 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-auto pt-6 border-t border-white/10">
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <span className="text-blue-100 text-sm font-semibold">Requires Human Judgment</span>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </div>

              {/* Bottom Insight */}
              <div className="mt-10 text-center">
                <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl rounded-full px-8 py-4 border border-white/30 shadow-xl">
                  <svg className="w-5 h-5 text-pink-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <p className="text-white font-semibold text-lg">
                    AI accelerates execution. <span className="text-pink-300">Strategy is your moat.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-12 h-12 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
                ),
                title: 'Code is Cheap',
                desc: 'AI tools ship features in days',
                color: 'rgba(59, 130, 246, 0.15)'
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: 'Clarity is Scarce',
                desc: 'Knowing what to build is rare',
                color: 'rgba(236, 72, 153, 0.15)'
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Strategy Wins',
                desc: 'Direction beats execution speed',
                color: 'rgba(59, 130, 246, 0.15)'
              }
            ].map((item, idx) => (
              <SpotlightCard key={idx} spotlightColor={item.color} className="transform hover:-translate-y-1 transition-transform duration-300">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">{item.icon}</div>
                  <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                  <p className="text-blue-100 leading-relaxed">{item.desc}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="px-6 py-20 md:py-28 bg-gradient-to-br from-indigo-600 to-blue-600">
        <div className="max-w-7xl mx-auto text-center text-white">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
              The LaunchScope Solution
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 leading-relaxed font-light">
              LaunchScope empowers you to make data-driven decisions, ensuring every hour and dollar you invest goes into building products customers truly desire.
            </p>
          </div>

          {/* Solution Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: TrendingUp, title: 'Data-Driven Validation', desc: 'Test against real market demand' },
              { icon: Users, title: 'Customer Insights', desc: 'Understand real user needs' },
              { icon: CheckCircle, title: 'Strategic Focus', desc: 'Build features that matter most' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl flex items-center justify-center mb-5 mx-auto shadow-lg">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                <p className="text-blue-100">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-12">How LaunchScope Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { num: '1', title: 'Submit Your Idea', desc: 'Share your startup concept and target market.' },
                { num: '2', title: 'Get Deep Insights', desc: 'Receive comprehensive analysis with actionable recommendations.' },
                { num: '3', title: 'Build With Confidence', desc: 'Use our prioritized roadmap to build what customers want.' }
              ].map((step, idx) => (
                <div key={idx} className="relative group">
                  <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl">
                    <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-2xl">{step.num}</span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-4">{step.title}</h4>
                    <p className="text-blue-100 leading-relaxed">{step.desc}</p>
                  </div>
                  {idx < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-white/30 transform -translate-y-1/2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 py-20 md:py-28 bg-gradient-to-br from-indigo-500 to-blue-500">
        <div className="max-w-7xl mx-auto text-center text-white">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
              Ready to Validate Your Idea?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 leading-relaxed font-light">
              Get started for free or unlock unlimited analysis with our paid plan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <PricingCard
              title="Free to Start"
              price="$0"
              description="Perfect for testing the waters"
              features={[
                "3 validations per month",
                "Basic market analysis",
                "Risk assessment"
              ]}
              onGetStarted={onGetStarted}
            />

            <PricingCard
              title="Unlock Unlimited Insights"
              price="$5"
              description="For serious founders ready to scale"
              features={[
                "Unlimited validations",
                "Deep competitor analysis",
                "Priority support",
                "Advanced insights"
              ]}
              isPopular={true}
              priceId={STRIPE_PRODUCTS.LAUNCHSCOPE_PRO.priceId}
              onGetStarted={onGetStarted}
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 md:py-28 bg-gradient-to-br from-indigo-600 to-blue-600">
        <div className="max-w-7xl mx-auto text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
              Don't Waste Months Building the Wrong Thing
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-12 leading-relaxed font-light">
              Get clarity in minutes. LaunchScope gives you the insights you need before you write a single line of code.
            </p>

            <div className="relative inline-block">
              <Button
                variant="secondary"
                size="lg"
                onClick={onGetStarted}
                className="px-16 py-7 text-xl hover:scale-110 shadow-2xl shadow-indigo-900/30 relative z-10"
              >
                Start Validating Your Idea
              </Button>
              <div className="absolute inset-0 bg-pink-300/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
            </div>

            <p className="text-blue-100 mt-8 text-lg">
              Join thousands of founders who validated first, built second.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-indigo-900/50 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                  <Rocket className="w-5 h-5 text-indigo-600" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">LaunchScope</span>
              </div>
              <p className="text-blue-200 font-light">
                Empowering makers to build what matters
              </p>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <a
                    href="mailto:launchscopeapp@gmail.com"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:launchscopeapp@gmail.com"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => onNavigateToLegal('privacy')}
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateToLegal('terms')}
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateToLegal('cookies')}
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateToLegal('refund')}
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Refund Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateToLegal('acceptable-use')}
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Acceptable Use
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-blue-200 font-light">
              &copy; 2025 LaunchScope. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
