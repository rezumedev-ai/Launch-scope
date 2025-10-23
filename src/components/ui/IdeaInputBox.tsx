import React from 'react';
import { Lightbulb } from 'lucide-react';

interface IdeaInputBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export function IdeaInputBox({ value, onChange, onSubmit, placeholder, disabled }: IdeaInputBoxProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="relative">
      <div className="absolute left-4 top-4">
        <Lightbulb className="w-6 h-6 text-indigo-400" />
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder || "Describe your startup idea..."}
        disabled={disabled}
        className="w-full pl-14 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        rows={4}
      />
    </div>
  );
}
