import React from 'react';
import { Rocket, Target, TrendingUp, Users } from 'lucide-react';
import { Button } from './ui/Button';
import SearchComponent from './ui/animated-glowing-search-bar';
import { PricingCard } from './PricingCard';
import { STRIPE_PRODUCTS } from '../stripe-config';
import { CursorLogo, ClaudeLogo, OpenAILogo } from './ui/AIToolLogos';

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

      {/* The New Reality Section - Visually Stunning Redesign */}
      <section className="px-6 py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center text-white relative z-10">
          {/* Minimal headline - let visuals do the talking */}
          <div className="max-w-5xl mx-auto mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Building is Easy.
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                Building the Right Thing is Hard.
              </span>
            </h2>
            <p className="text-xl sm:text-2xl text-blue-200 font-light max-w-3xl mx-auto">
              The bottleneck isn't technology — it's clarity.
            </p>
          </div>

          {/* Main Visual Split Screen */}
          <div className="mb-16 relative">
            <div className="max-w-7xl mx-auto">
              <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 md:p-16 overflow-hidden shadow-2xl">
                {/* Glowing orbs for depth */}
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl"></div>

                <div className="relative z-10 grid md:grid-cols-2 gap-12 md:gap-16 items-stretch">
                  {/* LEFT: AI-Powered Execution - EASY */}
                  <div className="relative">
                    <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 backdrop-blur-sm rounded-2xl border border-emerald-400/30 p-8 h-full flex flex-col">
                      {/* Icon with glow effect */}
                      <div className="mb-6 relative">
                        <div className="absolute inset-0 bg-emerald-400/20 blur-2xl rounded-full"></div>
                        <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl shadow-lg shadow-emerald-500/50 mx-auto">
                          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-emerald-300 mb-3">EASY</h3>
                      <p className="text-white/90 text-lg mb-8">AI-Powered Execution</p>

                      {/* AI Tools Grid - With Original Logos */}
                      <div className="grid grid-cols-3 gap-4 mb-8 flex-grow items-center">
                        <div className="group relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2">
                            <div className="flex items-center justify-center mb-3 h-12">
                              <CursorLogo className="w-10 h-10 text-blue-400" />
                            </div>
                            <div className="text-white/90 text-sm font-medium">Cursor</div>
                          </div>
                        </div>

                        <div className="group relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-amber-500/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2">
                            <div className="flex items-center justify-center mb-3 h-12">
                              <ClaudeLogo className="w-10 h-10 text-amber-400" />
                            </div>
                            <div className="text-white/90 text-sm font-medium">Claude</div>
                          </div>
                        </div>

                        <div className="group relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/30 to-cyan-500/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2">
                            <div className="flex items-center justify-center mb-3 h-12">
                              <OpenAILogo className="w-10 h-10 text-teal-400" />
                            </div>
                            <div className="text-white/90 text-sm font-medium">OpenAI</div>
                          </div>
                        </div>
                      </div>

                      {/* Animated flow visualization */}
                      <div className="flex items-center justify-center gap-4 mt-auto">
                        <div className="bg-emerald-500/20 border border-emerald-400/40 rounded-lg px-4 py-3 backdrop-blur-sm">
                          <div className="text-emerald-300 font-mono text-sm">&lt;code/&gt;</div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-transparent animate-pulse"></div>
                          <div className="w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-transparent animate-pulse delay-100"></div>
                          <div className="w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-transparent animate-pulse delay-200"></div>
                        </div>
                        <div className="bg-emerald-500/20 border border-emerald-400/40 rounded-lg px-4 py-3 backdrop-blur-sm">
                          <div className="text-emerald-300 text-sm">✨ App</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vertical divider with VS badge */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="relative">
                      <div className="w-0.5 h-64 bg-gradient-to-b from-transparent via-white/40 to-transparent"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-4 shadow-lg shadow-purple-500/50 border-4 border-slate-900">
                        <span className="text-white font-bold text-sm">VS</span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: Strategic Direction - HARD */}
                  <div className="relative">
                    <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl border border-amber-400/30 p-8 h-full flex flex-col">
                      {/* Icon with glow effect */}
                      <div className="mb-6 relative">
                        <div className="absolute inset-0 bg-amber-400/20 blur-2xl rounded-full"></div>
                        <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg shadow-amber-500/50 mx-auto">
                          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-amber-300 mb-3">HARD</h3>
                      <p className="text-white/90 text-lg mb-8">Strategic Direction</p>

                      {/* Critical questions visualization */}
                      <div className="space-y-4 flex-grow">
                        <div className="group relative">
                          <div className="absolute inset-0 bg-amber-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative bg-white/5 border border-amber-400/30 rounded-xl p-5 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                            <div className="flex items-center justify-between">
                              <span className="text-white/90 font-medium">What problem?</span>
                              <svg className="w-6 h-6 text-amber-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        <div className="group relative">
                          <div className="absolute inset-0 bg-amber-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative bg-white/5 border border-amber-400/30 rounded-xl p-5 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                            <div className="flex items-center justify-between">
                              <span className="text-white/90 font-medium">Which market?</span>
                              <svg className="w-6 h-6 text-amber-400 animate-pulse delay-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        <div className="group relative">
                          <div className="absolute inset-0 bg-amber-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative bg-white/5 border border-amber-400/30 rounded-xl p-5 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                            <div className="flex items-center justify-between">
                              <span className="text-white/90 font-medium">Which features?</span>
                              <svg className="w-6 h-6 text-amber-400 animate-pulse delay-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Human judgment icon */}
                      <div className="flex items-center justify-center gap-3 mt-8 pt-6 border-t border-amber-400/20">
                        <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <span className="text-amber-200 text-sm font-medium">Requires Human Judgment</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom insight banner */}
                <div className="mt-12 text-center">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full px-8 py-4 border border-white/20">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <p className="text-white font-semibold text-lg">
                      AI accelerates execution. <span className="text-amber-300">Strategy is your moat.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Simplified key insight cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">💻</div>
                <h4 className="text-xl font-bold text-white mb-2">Code is Cheap</h4>
                <p className="text-blue-200">AI tools ship features in days</p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">🎯</div>
                <h4 className="text-xl font-bold text-white mb-2">Clarity is Scarce</h4>
                <p className="text-blue-200">Knowing what to build is rare</p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">🚀</div>
                <h4 className="text-xl font-bold text-white mb-2">Strategy Wins</h4>
                <p className="text-blue-200">Direction beats execution speed</p>
              </div>
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
              priceId={STRIPE_PRODUCTS.LAUNCHSCOPE_PRO.priceId}
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