import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, Zap, Send } from 'lucide-react';

interface IdeaInputBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export function IdeaInputBox({ value, onChange, onSubmit, disabled = false }: IdeaInputBoxProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
    setCharCount(value.length);
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSubmit();
      }
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto group">
      {/* Animated Background Glow */}
      <div
        className={`absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500 ${
          isFocused ? 'opacity-40' : ''
        }`}
      />

      {/* Floating particles animation */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-2 h-2 bg-indigo-400 rounded-full animate-ping ${isFocused ? 'opacity-75' : 'opacity-0'}`} style={{ animationDelay: '0s' }} />
        <div className={`absolute top-1/2 right-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping ${isFocused ? 'opacity-75' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }} />
        <div className={`absolute bottom-0 left-1/2 w-2 h-2 bg-pink-400 rounded-full animate-ping ${isFocused ? 'opacity-75' : 'opacity-0'}`} style={{ animationDelay: '1s' }} />
      </div>

      {/* Main Container */}
      <div
        className={`relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl border-2 rounded-3xl overflow-hidden transition-all duration-300 ${
          isFocused
            ? 'border-indigo-400/50 shadow-2xl shadow-indigo-500/20'
            : 'border-white/20 shadow-xl'
        }`}
      >
        {/* Top Gradient Bar */}
        <div className={`h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-opacity duration-300 ${
          isFocused ? 'opacity-100' : 'opacity-0'
        }`} />

        {/* Input Area */}
        <div className="relative p-6">
          {/* Floating Icon */}
          <div className={`absolute top-6 left-6 transition-all duration-300 ${
            isFocused ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
          }`}>
            {isFocused ? (
              <Zap className="w-6 h-6 text-yellow-400 drop-shadow-lg" />
            ) : (
              <Sparkles className="w-6 h-6 text-indigo-300" />
            )}
          </div>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            placeholder="Describe your startup idea in detail... What problem does it solve? Who are your customers?"
            className="w-full bg-transparent text-white placeholder-slate-300/60 focus:outline-none resize-none pl-12 pr-4 min-h-[120px] text-lg leading-relaxed disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ maxHeight: '400px', overflowY: 'auto' }}
          />

          {/* Bottom Bar with Actions */}
          <div className={`flex items-center justify-between mt-4 pt-4 border-t transition-all duration-300 ${
            isFocused ? 'border-white/20' : 'border-white/10'
          }`}>
            {/* Character Count & Hints */}
            <div className="flex items-center space-x-4">
              <div className={`text-sm transition-colors duration-300 ${
                charCount > 500
                  ? 'text-green-300'
                  : charCount > 200
                    ? 'text-yellow-300'
                    : 'text-slate-400'
              }`}>
                {charCount} characters
              </div>

              {isFocused && (
                <div className="text-xs text-slate-400 animate-fade-in hidden sm:block">
                  Press <kbd className="px-2 py-0.5 bg-white/10 rounded text-white font-mono">⌘</kbd> +
                  <kbd className="px-2 py-0.5 bg-white/10 rounded text-white font-mono ml-1">Enter</kbd> to submit
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={onSubmit}
              disabled={!value.trim() || disabled}
              className={`group/btn flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform ${
                value.trim() && !disabled
                  ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 active:scale-95 cursor-pointer'
                  : 'bg-white/5 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>Analyze</span>
              <Send className={`w-4 h-4 transition-transform duration-300 ${
                value.trim() && !disabled ? 'group-hover/btn:translate-x-1' : ''
              }`} />
            </button>
          </div>
        </div>

        {/* Floating Suggestions (shown when empty and focused) */}
        {isFocused && !value && (
          <div className="absolute top-full left-0 right-0 mt-2 mx-6">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-xl animate-fade-in">
              <p className="text-sm text-slate-300 mb-3">💡 Need inspiration? Try these:</p>
              <div className="space-y-2">
                {[
                  'A mobile app that helps freelancers track time and generate invoices automatically',
                  'An AI-powered meal planning service for busy families with dietary restrictions',
                  'A platform connecting local tutors with students for personalized online learning'
                ].map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => onChange(suggestion)}
                    className="w-full text-left text-sm text-slate-200 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 hover:translate-x-1"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quality Indicator */}
      {charCount > 0 && (
        <div className="mt-4 flex items-center justify-center space-x-2">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`h-1.5 w-8 rounded-full transition-all duration-300 ${
                  charCount >= level * 100
                    ? level <= 3
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400'
                      : 'bg-gradient-to-r from-green-400 to-emerald-400'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-300 ml-2">
            {charCount < 100 && 'Add more detail for better analysis'}
            {charCount >= 100 && charCount < 200 && 'Good start! Keep going'}
            {charCount >= 200 && charCount < 400 && 'Great detail!'}
            {charCount >= 400 && 'Excellent! Ready for deep analysis'}
          </span>
        </div>
      )}
    </div>
  );
}
