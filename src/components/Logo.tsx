import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-6 w-6" }) => {
  return (
    <img 
      src="/icon.png"
      alt="Radio Logo"
      className={className}
    />
  );
};

export default Logo;