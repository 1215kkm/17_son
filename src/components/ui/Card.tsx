'use client';

import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  clickable?: boolean;
}

const variantStyles = {
  default: 'bg-[var(--background-card)] shadow-card',
  outlined: 'bg-[var(--background-card)] border border-[var(--color-gray-100)]',
  elevated: 'bg-[var(--background-card)] shadow-lg',
};

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-5',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      clickable = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`
          rounded-[var(--radius-md)]
          ${variantStyles[variant]}
          ${paddingStyles[padding]}
          ${clickable ? 'cursor-pointer transition-transform active:scale-[0.98]' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card Header
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const CardHeader = ({ title, subtitle, action, className = '', ...props }: CardHeaderProps) => {
  return (
    <div className={`flex items-start justify-between mb-3 ${className}`} {...props}>
      <div>
        <h3 className="text-[var(--text-lg)] font-semibold text-[var(--foreground)]">{title}</h3>
        {subtitle && (
          <p className="text-[var(--text-sm)] text-[var(--foreground-secondary)] mt-0.5">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

// Card Content
export const CardContent = ({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};
