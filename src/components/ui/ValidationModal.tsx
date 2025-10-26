import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';

interface ValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (notes: string) => void;
  ideaSummary: string;
  isLoading?: boolean;
}

export function ValidationModal({ isOpen, onClose, onConfirm, ideaSummary, isLoading = false }: ValidationModalProps) {
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(notes);
    setNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 max-w-2xl w-full border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mr-4">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Validate Idea</h2>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-xl p-4 mb-6">
          <p className="text-white text-sm line-clamp-3">{ideaSummary}</p>
        </div>

        <div className="mb-6">
          <label className="block text-white text-sm font-medium mb-2">
            Validation Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Why do you think this idea is worth pursuing?"
            className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            rows={4}
            disabled={isLoading}
          />
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Validating...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Confirm Validation
              </>
            )}
          </button>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-xl font-semibold transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
