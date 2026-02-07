'use client';

interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
  className?: string;
}

const variantStyles = {
  default: 'bg-[var(--color-gray-100)] text-[var(--foreground-secondary)]',
  primary: 'bg-[var(--color-primary-50)] text-[var(--color-primary-500)]',
  success: 'bg-green-50 text-green-600',
  warning: 'bg-amber-50 text-amber-600',
  error: 'bg-red-50 text-red-600',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-[11px]',
  md: 'px-3 py-1 text-[12px]',
};

export const Tag = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: TagProps) => {
  return (
    <span
      className={`
        inline-flex items-center
        rounded-full font-medium
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};
