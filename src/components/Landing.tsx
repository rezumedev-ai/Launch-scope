import React from 'react';
import { Rocket, Target, TrendingUp, Users } from 'lucide-react';
import { Button } from './ui/Button';
import SearchComponent from './ui/animated-glowing-search-bar';
import { PricingCard } from './PricingCard';

interface LandingProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

export function Landing({ onGetStarted, onSignIn }: LandingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-blue-500">
      {/* Header */}
      <header className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Rocket className="w-4 h-4 text-indigo-500" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-white">LaunchScope</span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Button variant="outline" size="sm" onClick={onSignIn} className="text-white border-white hover:bg-white hover:text-indigo-500 px-1.5 py-0.5 text-xs sm:px-3 sm:py-2 sm:text-sm">
              Sign In
            </Button>
            <Button variant="secondary" size="sm" onClick={onGetStarted} className="px-1.5 py-0.5 text-xs sm:px-3 sm:py-2 sm:text-sm">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-6 py-20">
        <div className="max-w-7xl mx-auto text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Validate Your 
              <span className="text-pink-300"> Startup Ideas </span>
              Before You Build
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Get instant clarity on your startup idea with deep insights into risks, opportunities, and what matters most to customers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={onGetStarted} className="text-lg px-10 py-4">
                <span className="relative z-10">Get Started Free</span>
              </Button>
              <Button variant="secondary" size="lg" className="text-lg px-10 py-4">
                See How It Works
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Deep Analysis</h3>
              <p className="text-gray-600">
                Uncover strengths, gaps, and hidden risks in your idea.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Market Insights</h3>
              <p className="text-gray-600">
                Spot real opportunities and understand customer needs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Actionable Next Steps</h3>
              <p className="text-gray-600">
                Clear guidance on what to build and prioritize first.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* The Problem Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-indigo-500 to-blue-500">
        <div className="max-w-7xl mx-auto text-center text-white">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Most Startups Fail Before They Even Launch
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Founders spend months building products nobody asked for. They burn money, time, and energy — only to realize customers didn't want it.
            </p>
          </div>

          {/* Minimal Illustration */}
          <div className="mb-20 relative">
            <div className="max-w-5xl mx-auto">
              {/* Professional illustration container */}
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-12 overflow-hidden">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 left-4 w-32 h-32 border border-white/20 rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-24 h-24 border border-white/20 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
                </div>
                
                {/* Central content */}
                <div className="relative z-10 text-center">
                  {/* Sophisticated founder representation */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 border-2 border-white/30 rounded-xl mb-6">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <h3 className="text-white/90 text-lg font-medium mb-8">The Reality of Building Without Validation</h3>
                  
                  {/* Professional problem indicators */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center hover:bg-white/10 transition-all duration-300">
                      <div className="text-red-300 text-sm font-medium mb-1">6 months</div>
                      <div className="text-white/70 text-xs">Development time</div>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center hover:bg-white/10 transition-all duration-300">
                      <div className="text-orange-300 text-sm font-medium mb-1">$50k+</div>
                      <div className="text-white/70 text-xs">Wasted budget</div>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center hover:bg-white/10 transition-all duration-300">
                      <div className="text-yellow-300 text-sm font-medium mb-1">0 users</div>
                      <div className="text-white/70 text-xs">Product adoption</div>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center hover:bg-white/10 transition-all duration-300">
                      <div className="text-pink-300 text-sm font-medium mb-1">90%</div>
                      <div className="text-white/70 text-xs">Failure rate</div>
                    </div>
                  </div>
                  
                  {/* Key pain points */}
                  <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3 max-w-3xl mx-auto">
                    <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/70 text-sm">
                      Building in isolation
                    </span>
                    <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/70 text-sm">
                      Assuming customer needs
                    </span>
                    <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/70 text-sm">
                      No market feedback
                    </span>
                    <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/70 text-sm">
                      Feature bloat
                    </span>
                    <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/70 text-sm">
                      Wrong priorities
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Problem Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start space-x-4 text-left">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12,6 12,12 16,14"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Months of work wasted</h3>
                  <p className="text-blue-100 text-sm">Building features nobody wants</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start space-x-4 text-left">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Wrong features built</h3>
                  <p className="text-blue-100 text-sm">Missing what customers actually need</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start space-x-4 text-left">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">No clear direction</h3>
                  <p className="text-blue-100 text-sm">Guessing instead of knowing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The New Reality Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-indigo-500 to-blue-500">
        <div className="max-w-7xl mx-auto text-center text-white">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Building is Easy. <span className="text-pink-300">Building the Right Thing is Hard.</span>
            </h2>
            <div className="space-y-4 text-base sm:text-lg md:text-xl text-blue-100 leading-relaxed">
              <p>
                AI has leveled the playing field. Cursor, Claude, GPT-5 — they've made coding frictionless. Shipping an MVP is no longer the challenge.
              </p>
              <p>
                But AI won't tell you what to build, who needs it, or how to reach them. That's the real moat.
              </p>
              <p className="font-medium text-white">
                In today's world, the bottleneck isn't technology — it's clarity. Choosing the right problem to solve.
              </p>
            </div>
          </div>

          {/* Split Visual Illustration */}
          <div className="mb-20 relative">
            <div className="max-w-6xl mx-auto">
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-12 overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-8 left-8 w-24 h-24 border border-white/20 rounded-full"></div>
                  <div className="absolute bottom-8 right-8 w-32 h-32 border border-white/20 rounded-full"></div>
                </div>
                
                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                  {/* Left Side - AI-Powered Building */}
                  <div className="text-center">
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400/20 to-emerald-400/20 border-2 border-green-400/30 rounded-2xl mb-4">
                        <svg className="w-10 h-10 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-4">AI-Powered Execution</h3>
                      <p className="text-blue-100 text-sm mb-6">Code transforms into polished apps instantly</p>
                    </div>
                    
                    {/* AI Tools */}
                    <div className="flex justify-center space-x-4 mb-6">
                      <div className="bg-white/10 border border-white/20 rounded-lg p-3 hover:bg-white/15 transition-all duration-300 group">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white text-xs font-bold">AI</span>
                        </div>
                        <div className="text-white/80 text-xs">Cursor</div>
                      </div>
                      <div className="bg-white/10 border border-white/20 rounded-lg p-3 hover:bg-white/15 transition-all duration-300 group">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white text-xs font-bold">C</span>
                        </div>
                        <div className="text-white/80 text-xs">Claude</div>
                      </div>
                      <div className="bg-white/10 border border-white/20 rounded-lg p-3 hover:bg-white/15 transition-all duration-300 group">
                        <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-blue-400 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white text-xs font-bold">GPT</span>
                        </div>
                        <div className="text-white/80 text-xs">OpenAI</div>
                      </div>
                    </div>
                    
                    {/* Code to App Animation */}
                    <div className="flex items-center justify-center space-x-4">
                      <div className="bg-white/5 border border-white/10 rounded-lg p-3 animate-pulse">
                        <div className="text-xs text-green-300 font-mono">&lt;code/&gt;</div>
                      </div>
                      <svg className="w-6 h-6 text-white/60 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <div className="bg-white/5 border border-white/10 rounded-lg p-3 animate-pulse">
                        <div className="text-xs text-blue-300">📱 App</div>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-32 bg-white/20"></div>
                  <div className="md:hidden w-full h-0.5 bg-white/20 my-8"></div>

                  {/* Right Side - Strategic Confusion */}
                  <div className="text-center">
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-400/20 to-orange-400/20 border-2 border-amber-400/30 rounded-2xl mb-4">
                        <svg className="w-10 h-10 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-4">Strategic Direction</h3>
                      <p className="text-blue-100 text-sm mb-6">Human judgment guides the power</p>
                    </div>
                    
                    {/* Decision Paths */}
                    <div className="space-y-3">
                      <div className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-all duration-300">
                        <div className="text-white/80 text-sm">🤔 Which problem?</div>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-all duration-300">
                        <div className="text-white/80 text-sm">🎯 Which market?</div>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-all duration-300">
                        <div className="text-white/80 text-sm">⚡ Which feature?</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Bottom insight */}
                <div className="mt-12 text-center">
                  <div className="inline-block bg-white/5 border border-white/10 rounded-full px-6 py-3">
                    <p className="text-white/90 text-sm font-medium">
                      AI accelerates execution. Human judgment directs it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Supporting Points */}
          <div className="mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-start space-x-4 text-left">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Code is cheap now</h3>
                    <p className="text-blue-100 text-sm">Anyone can spin up features in days</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-start space-x-4 text-left">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Distribution is harder</h3>
                    <p className="text-blue-100 text-sm">Cutting through noise takes insight, not code</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-start space-x-4 text-left">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Strategy is the moat</h3>
                    <p className="text-blue-100 text-sm">Winners know what to build and why</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Transition */}
          <div className="text-center">
            <div className="inline-block bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:bg-white/10 transition-all duration-300">
              <p className="text-xl text-white font-medium">
                If AI made building easy, then the real advantage is knowing where to point that power.
              </p>
              <p className="text-blue-100 mt-2">
                That's where we come in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-indigo-500 to-blue-500">
        <div className="max-w-7xl mx-auto text-center text-white">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              The LaunchScope Solution: Build What Matters
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              LaunchScope empowers you to make data-driven decisions, ensuring every hour and dollar you invest goes into building products customers truly desire.
            </p>
          </div>

          {/* Solution Showcase */}
          <div className="mb-20 relative">
            <div className="max-w-5xl mx-auto">
              {/* Professional solution container */}
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-12 overflow-hidden">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-6 right-6 w-28 h-28 border border-white/20 rounded-full"></div>
                  <div className="absolute bottom-6 left-6 w-20 h-20 border border-white/20 rounded-full"></div>
                  <div className="absolute top-1/2 right-1/4 w-12 h-12 border border-white/20 rounded-full"></div>
                </div>
                
                {/* Central content */}
                <div className="relative z-10 text-center">
                  {/* Solution icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500/20 to-amber-500/20 border-2 border-white/30 rounded-xl mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-amber-400 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <h3 className="text-white/90 text-lg font-medium mb-8">Transform Ideas Into Validated Opportunities</h3>
                  
                  {/* Solution benefits grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-lg group">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h4 className="text-white font-semibold mb-2">Data-Driven Validation</h4>
                      <p className="text-white/70 text-sm">Test against real market demand</p>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-lg group">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h4 className="text-white font-semibold mb-2">Customer Insights</h4>
                      <p className="text-white/70 text-sm">Understand real user needs</p>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-lg group">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h4 className="text-white font-semibold mb-2">Strategic Focus</h4>
                      <p className="text-white/70 text-sm">Build features that matter most</p>
                    </div>
                  </div>
                  
                  {/* Success metrics */}
                  <div className="mt-8 flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
                    <span className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-full text-green-200 text-sm font-medium">
                      ✓ Reduce development time by 60%
                    </span>
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-full text-blue-200 text-sm font-medium">
                      ✓ Increase user adoption by 3x
                    </span>
                    <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-full text-purple-200 text-sm font-medium">
                      ✓ Save $25k+ in wasted features
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works Process */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-12">How LaunchScope Works</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
              <div className="relative group">
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-lg">1</span>
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-4">Submit Your Idea</h4>
                  <p className="text-blue-100 leading-relaxed">
                    Share your startup concept and target market. Our AI analyzes your idea against market trends and competitor landscape.
                  </p>
                </div>
                {/* Connecting line */}
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-white/30 transform -translate-y-1/2"></div>
              </div>
              
              <div className="relative group">
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-lg">2</span>
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-4">Get Deep Insights</h4>
                  <p className="text-blue-100 leading-relaxed">
                    Receive comprehensive analysis including market size, competition, risks, and opportunities with actionable recommendations.
                  </p>
                </div>
                {/* Connecting line */}
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-white/30 transform -translate-y-1/2"></div>
              </div>
              
              <div className="relative group">
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-lg">3</span>
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-4">Build With Confidence</h4>
                  <p className="text-blue-100 leading-relaxed">
                    Use our prioritized roadmap and validation framework to build features customers actually want and need.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-indigo-500 to-blue-500">
        <div className="max-w-7xl mx-auto text-center text-white">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Ready to Validate Your Idea?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Get started for free or unlock unlimited analysis with our paid plan. Validate your idea, reduce risk, and stop building what nobody wants.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto mb-16">
            {/* Free Plan */}
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

            {/* Pro Plan */}
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
              priceId="price_1234567890abcdef" // Replace with your actual Stripe Price ID
              onGetStarted={onGetStarted}
            />
          </div>
        </div>
      </section>

      {/* Final Closing Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-indigo-500 to-blue-500">
        <div className="max-w-7xl mx-auto text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Don't Waste Months Building the Wrong Thing
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-12 leading-relaxed">
              Get clarity in minutes. LaunchScope gives you the insights you need before you write a single line of code.
            </p>
            
            {/* Animated CTA */}
            <div className="relative">
              <div className="animate-fade-in-up">
                <Button 
                  size="lg" 
                  onClick={onGetStarted}
                  className="text-xl px-12 py-5 bg-gradient-to-r from-pink-300 to-pink-400 hover:from-pink-400 hover:to-pink-500 transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-pink-300/25 animate-pulse-glow"
                >
                  Start Validating Your Idea
                </Button>
              </div>
              
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-300/20 to-pink-400/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
            </div>
            
            {/* Final encouragement */}
            <p className="text-blue-200 mt-8 text-lg">
              Join thousands of founders who validated first, built second.
            </p>
          </div>
        </div>
      </section>
      
      {/* Remove the old solution section */}
      <section className="py-16" style={{ display: 'none' }}>
        <div className="text-center mb-12 text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The LaunchScope Solution: Build What Matters
          </h2>
        </div>
        <div className="mx-6 md:mx-12 lg:mx-16">
          <div className="bg-white p-8 md:p-12 lg:p-16 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1">
            <div className="text-center mb-8">
              <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                LaunchScope empowers you to make data-driven decisions, ensuring every hour and dollar you invest goes into building products customers truly desire.
              </p>
            </div>

            {/* Solution Benefits */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Data-Driven Validation</h3>
                  <p className="text-gray-600">Test your ideas against real market demand, not assumptions.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Targeted Insights</h3>
                  <p className="text-gray-600">Understand your ideal customer and their unmet needs.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Strategic Prioritization</h3>
                  <p className="text-gray-600">Focus on features that deliver maximum value and impact.</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button size="lg" onClick={onGetStarted} className="text-lg px-10 py-4">
                Start Validating Your Ideas
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="px-6 py-12 border-t border-white/20">
        <div className="max-w-7xl mx-auto text-center text-white">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Rocket className="w-5 h-5 text-indigo-500" />
            </div>
            <span className="text-xl font-bold">LaunchScope</span>
          </div>
          <p className="text-blue-100">
            Empowering makers to build what matters
          </p>
        </div>
      </footer>
    </div>
  );
}