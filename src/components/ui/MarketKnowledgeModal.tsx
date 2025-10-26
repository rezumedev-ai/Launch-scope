import React from 'react';
import { X } from 'lucide-react';

interface MarketKnowledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  marketKnowledge: any;
}

export function MarketKnowledgeModal({ isOpen, onClose, marketKnowledge }: MarketKnowledgeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 max-w-4xl w-full border border-white/10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Market Knowledge</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="text-slate-300">
          {marketKnowledge ? (
            <pre className="whitespace-pre-wrap">{JSON.stringify(marketKnowledge, null, 2)}</pre>
          ) : (
            <p>No market knowledge available</p>
          )}
        </div>
      </div>
    </div>
  );
}
