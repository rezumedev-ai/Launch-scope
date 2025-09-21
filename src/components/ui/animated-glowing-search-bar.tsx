import React, { useState } from 'react';
import { Search, Sparkles, Zap } from 'lucide-react';

interface SearchComponentProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const SearchComponent = ({ 
  value, 
  onChange, 
  onSubmit, 
  placeholder = "Describe your startup idea...",
  disabled = false 
}: SearchComponentProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (value.trim()) {
        onSubmit(value.trim());
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        {/* Animated background gradient */}
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-500 animate-pulse"></div>
        
        {/* Main container */}
        <div className="relative bg-white rounded-xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Top gradient bar */}
          <div className="h-1 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500"></div>
          
          {/* Input container */}
          <div className="relative p-6">
            {/* Search icon */}
            <div className="absolute left-8 top-8 z-10">
              <div className={`transition-all duration-300 ${isFocused ? 'text-purple-500 scale-110' : 'text-gray-400'}`}>
                <Search className="w-6 h-6" />
              </div>
            </div>

            {/* Magic sparkle icon */}
            <div className="absolute right-8 top-8 z-10">
              <div className={`transition-all duration-300 ${isFocused ? 'text-pink-500 animate-pulse' : 'text-gray-400'}`}>
                <Sparkles className="w-6 h-6" />
              </div>
            </div>

            {/* Textarea */}
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              rows={3}
              className={`
                w-full px-16 py-4 text-lg text-gray-800 placeholder-gray-500 
                bg-transparent border-none outline-none resize-none
                transition-all duration-300 min-h-[80px] max-h-[200px]
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                ${isFocused ? 'text-gray-900' : ''}
              `}
              style={{
                height: 'auto',
                minHeight: '80px'
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = Math.min(target.scrollHeight, 200) + 'px';
              }}
            />

            {/* Submit button */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Zap className="w-4 h-4" />
                <span>Press Cmd/Ctrl + Enter to analyze</span>
              </div>
              
              <button
                type="submit"
                disabled={disabled || !value.trim()}
                className={`
                  px-8 py-3 rounded-xl font-semibold text-white
                  bg-gradient-to-r from-purple-500 to-pink-500
                  hover:from-purple-600 hover:to-pink-600
                  focus:outline-none focus:ring-4 focus:ring-purple-500/25
                  transform transition-all duration-200
                  ${disabled || !value.trim() 
                    ? 'opacity-50 cursor-not-allowed scale-100' 
                    : 'hover:scale-105 hover:shadow-lg active:scale-95'
                  }
                `}
              >
                {disabled ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  'Analyze Idea'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Floating particles effect */}
        {isFocused && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 left-1/4 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-75"></div>
            <div className="absolute top-8 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-50" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-6 left-1/3 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '1s' }}></div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchComponent;