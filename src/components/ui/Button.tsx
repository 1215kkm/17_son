'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-[var(--color-primary-400)] text-white
    hover:bg-[var(--color-primary-500)]
    active:bg-[var(--color-primary-600)]
    disabled:bg-[var(--color-gray-200)] disabled:text-[var(--color-gray-400)]
  `,
  secondary: `
    bg-[var(--color-gray-100)] text-[var(--foreground)]
    hover:bg-[var(--color-gray-200)]
    active:bg-[var(--color-gray-300)]
    disabled:bg-[var(--color-gray-100)] disabled:text-[var(--color-gray-300)]
  `,
  outline: `
    bg-transparent border-2 border-[var(--color-primary-400)] text-[var(--color-primary-400)]
    hover:bg-[var(--color-primary-50)]
    active:bg-[var(--color-primary-100)]
    disabled:border-[var(--color-gray-200)] disabled:text-[var(--color-gray-300)]
  `,
  ghost: `
    bg-transparent text-[var(--color-primary-400)]
    hover:bg-[var(--color-primary-50)]
    active:bg-[var(--color-primary-100)]
    disabled:text-[var(--color-gray-300)]
  `,
  text: `
    bg-transparent text-[var(--foreground-secondary)]
    hover:text-[var(--foreground)]
    active:text-[var(--foreground)]
    disabled:text-[var(--color-gray-300)]
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 text-[12px] rounded-[var(--radius-md)] min-h-[36px]',
  md: 'px-4 py-3 text-[14px] rounded-[var(--radius-xl)] min-h-[44px]',
  lg: 'px-6 py-4 text-[16px] rounded-[var(--radius-xl)] min-h-[52px]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-semibold
      transition-all duration-200 ease-out
      cursor-pointer
      disabled:cursor-not-allowed
    `;

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        {loading ? (
          <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
