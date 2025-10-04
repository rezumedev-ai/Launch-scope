import React from 'react';

export const CursorLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4 4L18 18M4 4L4 18L8 14L11 17L18 10M4 4L14 4L11 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ClaudeLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      fill="currentColor"
    />
    <circle cx="12" cy="12" r="3" fill="white" opacity="0.3" />
  </svg>
);

export const OpenAILogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 6C12 6 15 9 15 12C15 15 12 18 12 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12 6C12 6 9 9 9 12C9 15 12 18 12 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" />
  </svg>
);
