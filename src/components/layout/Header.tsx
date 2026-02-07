'use client';

import { useRouter } from 'next/navigation';
import { Icon } from '../ui/Icon';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  transparent?: boolean;
}

export const Header = ({
  title,
  showBack = true,
  onBack,
  rightAction,
  transparent = false,
}: HeaderProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header
      className={`
        fixed top-0 left-1/2 -translate-x-1/2
        w-full max-w-[430px]
        h-[var(--header-height)]
        flex items-center justify-between
        px-4 z-50
        ${transparent ? 'bg-transparent' : 'bg-[var(--background)]'}
      `}
    >
      {/* Left */}
      <div className="w-10 h-10 flex items-center justify-center">
        {showBack && (
          <button
            onClick={handleBack}
            className="w-10 h-10 flex items-center justify-center rounded-full
                       hover:bg-[var(--color-gray-100)] transition-colors"
            aria-label="뒤로가기"
          >
            <Icon name="chevron-left" size={24} color="var(--foreground)" />
          </button>
        )}
      </div>

      {/* Center */}
      {title && (
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[var(--text-lg)] font-semibold text-[var(--foreground)]">
          {title}
        </h1>
      )}

      {/* Right */}
      <div className="w-10 h-10 flex items-center justify-center">
        {rightAction}
      </div>
    </header>
  );
};
