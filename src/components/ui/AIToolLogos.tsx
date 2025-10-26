import React from 'react';

interface LogoProps {
  className?: string;
}

export function CursorLogo({ className }: LogoProps) {
  return (
    <img
      src="/Cursor_Vector_Logo.png"
      alt="Cursor"
      className={className}
    />
  );
}

export function ClaudeLogo({ className }: LogoProps) {
  return (
    <img
      src="/claude-ai-icon.webp"
      alt="Claude AI"
      className={className}
    />
  );
}

export function OpenAILogo({ className }: LogoProps) {
  return (
    <img
      src="/openai.svg"
      alt="OpenAI"
      className={className}
    />
  );
}
