import React, { useState, useEffect } from 'react';
import { X, Share2, Copy, Check, ExternalLink, Loader } from 'lucide-react';
import { Button } from './Button';
import { supabase } from '../../lib/supabase';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysisId: string;
}

export function ShareModal({ isOpen, onClose, analysisId }: ShareModalProps) {
  const [shareToken, setShareToken] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && analysisId) {
      generateShareLink();
    }
  }, [isOpen, analysisId]);

  const generateShareLink = async () => {
    try {
      setIsGenerating(true);
      setError(null);

      const { data, error: functionError } = await supabase.functions.invoke('create-share-link', {
        body: { analysisId }
      });

      if (functionError) {
        throw new Error(functionError.message || 'Failed to create share link');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setShareToken(data.shareToken);
    } catch (err) {
      console.error('Error generating share link:', err);
      setError(err instanceof Error ? err.message : 'Failed to create share link');
    } finally {
      setIsGenerating(false);
    }
  };

  const getShareUrl = () => {
    if (!shareToken) return '';
    return `${window.location.origin}/share/${shareToken}`;
  };

  const handleCopyLink = async () => {
    const url = getShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleOpenInNewTab = () => {
    const url = getShareUrl();
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-white/20 rounded-3xl max-w-lg w-full shadow-2xl animate-scale-in overflow-hidden">
        <div className="relative bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 border-b border-white/10 px-6 py-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Share2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Share Report</h2>
              <p className="text-slate-300 text-sm">Anyone with the link can view this analysis</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {isGenerating ? (
            <div className="flex items-center justify-center py-8">
              <Loader className="w-8 h-8 text-indigo-400 animate-spin" />
              <span className="ml-3 text-slate-300">Generating share link...</span>
            </div>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <p className="text-red-300 text-sm">{error}</p>
              <Button
                onClick={generateShareLink}
                className="mt-3 bg-red-500/20 hover:bg-red-500/30 text-red-200"
                size="sm"
              >
                Try Again
              </Button>
            </div>
          ) : shareToken ? (
            <>
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-300">Share Link</label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-300 text-sm font-mono overflow-x-auto">
                    {getShareUrl()}
                  </div>
                  <Button
                    onClick={handleCopyLink}
                    className={`flex-shrink-0 ${
                      isCopied
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-indigo-500 hover:bg-indigo-600'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Share2 className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-blue-200 mb-1">Public Link</h3>
                    <p className="text-xs text-blue-300 leading-relaxed">
                      This link allows anyone to view your analysis report. The link will remain active until you revoke it.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  onClick={handleOpenInNewTab}
                  variant="secondary"
                  className="flex-1 bg-slate-700/50 hover:bg-slate-700 border-slate-600"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button
                  onClick={onClose}
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                >
                  Done
                </Button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
