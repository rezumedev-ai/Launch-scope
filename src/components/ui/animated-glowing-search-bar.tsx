import React from 'react';

interface SearchComponentProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export default function SearchComponent({
  value = '',
  onChange = () => {},
  placeholder = 'Search...'
}: SearchComponentProps) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="relative w-full px-6 py-4 bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-all shadow-xl"
      />
    </div>
  );
}
