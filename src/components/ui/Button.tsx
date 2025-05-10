import React from 'react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'relative inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark-100';
  
  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600',
    secondary: 'bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-400 dark:bg-accent-600 dark:hover:bg-accent-700',
    outline: 'bg-transparent border border-gray-300 dark:border-dark-300 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-200 focus:ring-primary-500',
    danger: 'bg-error-500 text-white hover:bg-error-700 focus:ring-error-500 dark:bg-error-600 dark:hover:bg-error-700',
    success: 'bg-success-500 text-white hover:bg-success-700 focus:ring-success-500 dark:bg-success-600 dark:hover:bg-success-700',
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };
  
  const disabledStyles = 'opacity-60 cursor-not-allowed dark:opacity-50';
  const widthStyles = fullWidth ? 'w-full' : '';
  const loadingStyles = isLoading ? 'cursor-wait' : '';
  
  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        widthStyles,
        (disabled || isLoading) && disabledStyles,
        loadingStyles,
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      
      {!isLoading && leftIcon && (
        <span className="mr-2">{leftIcon}</span>
      )}
      
      {children}
      
      {!isLoading && rightIcon && (
        <span className="ml-2">{rightIcon}</span>
      )}
    </button>
  );
};

export default Button;