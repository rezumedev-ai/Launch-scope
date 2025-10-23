import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchComponentProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function SearchComponent({ onSearch, placeholder = "Describe your startup idea...", disabled = false }: SearchComponentProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
        <div className="relative flex items-center">
          <Search className="absolute left-6 w-6 h-6 text-slate-400 z-10" />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full pl-16 pr-6 py-6 text-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>
    </form>
  );
}
