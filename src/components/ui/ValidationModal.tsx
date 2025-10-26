import React, { useState } from 'react';
import { X, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from './Button';

interface ValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (notes: string) => void;
  ideaSummary: string;
  isLoading?: boolean;
}

export function ValidationModal({
  isOpen,
  onClose,
  onConfirm,
  ideaSummary,
  isLoading = false
}: ValidationModalProps) {
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(notes);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full border border-white/10 animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:rotate-90"
          disabled={isLoading}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">Mark as Validated</h2>
              <p className="text-slate-300 text-sm">This idea is worth pursuing further</p>
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 mb-6">
            <div className="flex items-start space-x-3 mb-4">
              <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white font-semibold mb-2">Your Idea</h3>
                <p className="text-slate-200 leading-relaxed line-clamp-3">{ideaSummary}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Why are you validating this idea? (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Example: Strong market demand, unique value proposition, aligns with my expertise..."
              className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none transition-all duration-300 hover:bg-white/10"
              rows={4}
              disabled={isLoading}
            />
            <p className="text-slate-400 text-xs mt-2">
              Add notes to remember why this idea is worth pursuing
            </p>
          </div>

          <div className="bg-slate-700/30 rounded-xl p-4 mb-6 border border-slate-600/30">
            <h4 className="text-white font-semibold mb-2 text-sm">What happens when you validate?</h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li className="flex items-start">
                <span className="text-emerald-400 mr-2">•</span>
                <span>Idea moves to your "Validated Ideas" collection for easy access</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 mr-2">•</span>
                <span>Track which ideas you're seriously considering</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 mr-2">•</span>
                <span>Stay organized as you evaluate multiple concepts</span>
              </li>
            </ul>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              onClick={handleConfirm}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-3 text-base"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Validating...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Mark as Validated
                </>
              )}
            </Button>
            <Button
              onClick={onClose}
              variant="secondary"
              disabled={isLoading}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 py-3 px-6"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
