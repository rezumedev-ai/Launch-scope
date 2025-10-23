import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

interface IdeaInputBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isAnalyzing?: boolean;
  placeholder?: string;
}

export function IdeaInputBox({
  value,
  onChange,
  onSubmit,
  isAnalyzing = false,
  placeholder = 'Describe your startup idea...'
}: IdeaInputBoxProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
        <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100">
          <div className="flex items-start gap-4 p-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={isAnalyzing}
                className="w-full min-h-[120px] text-gray-800 placeholder-gray-400 focus:outline-none resize-none text-lg"
              />
            </div>
          </div>
          <div className="px-6 pb-6 flex items-center justify-between border-t border-gray-100 pt-4">
            <p className="text-sm text-gray-500">
              Press Enter to analyze or Shift+Enter for new line
            </p>
            <button
              onClick={onSubmit}
              disabled={isAnalyzing || !value.trim()}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {isAnalyzing ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Analyze Idea
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
