import React from 'react';
import { Search } from 'lucide-react';

interface IdeaInputBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
  placeholder?: string;
}

export function IdeaInputBox({ value, onChange, onSubmit, loading = false, placeholder = 'Enter your startup idea...' }: IdeaInputBoxProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="relative"
    >
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-4 pr-12 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
        rows={3}
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading || !value.trim()}
        className="absolute right-4 bottom-4 bg-white text-indigo-600 p-2 rounded-xl hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Search className="w-5 h-5" />
      </button>
    </form>
  );
}
