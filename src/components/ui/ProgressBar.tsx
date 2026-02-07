'use client';

interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
  showLabel?: boolean;
}

export const ProgressBar = ({ value, className = '', showLabel = false }: ProgressBarProps) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-[var(--text-sm)] text-[var(--foreground-secondary)]">진행률</span>
          <span className="text-[var(--text-sm)] font-medium text-[var(--color-primary-400)]">
            {Math.round(clampedValue)}%
          </span>
        </div>
      )}
      <div className="w-full h-2 bg-[var(--color-gray-100)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--color-primary-400)] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};
