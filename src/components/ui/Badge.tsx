import React from 'react';
import clsx from 'clsx';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
}) => {
  const baseStyles = 'inline-flex items-center rounded-full font-medium';
  
  const variantStyles = {
    primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300',
    secondary: 'bg-accent-100 dark:bg-accent-900/30 text-accent-800 dark:text-accent-300',
    success: 'bg-success-50 dark:bg-success-900/30 text-success-700 dark:text-success-300',
    warning: 'bg-warning-50 dark:bg-warning-900/30 text-warning-700 dark:text-warning-300',
    error: 'bg-error-50 dark:bg-error-900/30 text-error-700 dark:text-error-300',
    outline: 'bg-white dark:bg-dark-200 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-dark-300',
  };
  
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-sm',
  };
  
  return (
    <span
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;