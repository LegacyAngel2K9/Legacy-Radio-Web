import React, { forwardRef } from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    helperText, 
    error, 
    fullWidth = false, 
    className, 
    leftIcon, 
    rightIcon, 
    ...props 
  }, ref) => {
    const inputClasses = clsx(
      'block rounded-md border-gray-300 dark:border-dark-300 shadow-sm focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400 text-sm bg-white dark:bg-dark-200 text-gray-900 dark:text-gray-100',
      {
        'w-full': fullWidth,
        'border-error-500 focus:border-error-500 focus:ring-error-500': error,
        'pl-10': leftIcon,
        'pr-10': rightIcon,
      },
      className
    );

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label 
            htmlFor={props.id} 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 dark:text-gray-400">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            className={inputClasses}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500 dark:text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        
        {(error || helperText) && (
          <p 
            className={clsx('mt-1 text-sm', {
              'text-error-500 dark:text-error-400': error,
              'text-gray-500 dark:text-gray-400': !error && helperText,
            })}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;