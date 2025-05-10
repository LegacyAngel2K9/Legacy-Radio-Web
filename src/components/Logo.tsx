import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-6 w-6" }) => {
  return (
    <img 
      src="/legacyradio.png"
      alt="RADIO"
      className={`${className} object-contain`}
    />
  );
};

export default Logo;