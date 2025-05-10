import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  bordered?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  bordered = false,
}) => {
  return (
    <div 
      className={clsx(
        'bg-white dark:bg-dark-100 rounded-lg shadow-sm overflow-hidden',
        {
          'transition-all duration-200 hover:shadow-md': hover,
          'border border-gray-200 dark:border-dark-200': bordered,
        },
        className
      )}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
  return (
    <div className={clsx('px-6 py-4 border-b border-gray-200 dark:border-dark-200', className)}>
      {children}
    </div>
  );
};

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className }) => {
  return <div className={clsx('p-6', className)}>{children}</div>;
};

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => {
  return (
    <div className={clsx('px-6 py-4 border-t border-gray-200 dark:border-dark-200', className)}>
      {children}
    </div>
  );
};