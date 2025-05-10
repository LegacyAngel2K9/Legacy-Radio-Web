import React from 'react';

interface LogoProps {
  className?: string;
  type?: 'text' | 'icon';
}

const Logo: React.FC<LogoProps> = ({ className = "h-6 w-6", type = 'icon' }) => {
  return (
    <img 
      src={type === 'text' ? "/legacyradio.png" : "/icon.png"}
      alt="RADIO"
      className={`${className} object-contain`}
    />
  );
};

export default Logo;