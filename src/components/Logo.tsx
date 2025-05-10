import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-6 w-6" }) => {
  return (
    <svg 
      viewBox="0 0 1000 1000" 
      className={className}
      fill="currentColor"
    >
      <path d="M500 0C223.9 0 0 223.9 0 500s223.9 500 500 500 500-223.9 500-500S776.1 0 500 0zm0 900c-220.9 0-400-179.1-400-400S279.1 100 500 100s400 179.1 400 400-179.1 400-400 400z"/>
      <path d="M500 200c-165.7 0-300 134.3-300 300s134.3 300 300 300 300-134.3 300-300-134.3-300-300-300zm0 500c-110.5 0-200-89.5-200-200s89.5-200 200-200 200 89.5 200 200-89.5 200-200 200z"/>
      <circle cx="500" cy="500" r="100"/>
    </svg>
  );
};

export default Logo;