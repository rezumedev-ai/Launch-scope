import React from 'react';

export const CursorLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <img src="/Cursor_Vector_Logo.png" alt="Cursor" className={className} />
);

export const ClaudeLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <img src="/claude-ai-icon.webp" alt="Claude" className={className} />
);

export const OpenAILogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <img src="/openai.svg" alt="OpenAI" className={className} />
);
