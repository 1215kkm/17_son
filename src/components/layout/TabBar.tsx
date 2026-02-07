'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '../ui/Icon';

const TAB_ITEMS = [
  { id: 'home', label: '홈', href: '/', icon: 'home' },
  { id: 'search', label: '치과검색', href: '/search', icon: 'search' },
  { id: 'community', label: '커뮤니티', href: '/community', icon: 'message' },
  { id: 'mypage', label: '마이', href: '/mypage', icon: 'user' },
];

export const TabBar = () => {
  const pathname = usePathname();

  // 탭바를 숨겨야 하는 경로
  const hiddenPaths = ['/diagnosis', '/tooth-map'];
  const shouldHide = hiddenPaths.some((path) => pathname.startsWith(path));

  if (shouldHide) return null;

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="
        fixed bottom-0 left-1/2 -translate-x-1/2
        w-full max-w-[430px]
        h-[var(--tabbar-height)]
        bg-[var(--background-card)]
        border-t border-[var(--color-gray-100)]
        flex items-center justify-around
        px-2 pb-[var(--safe-area-bottom)]
        z-50
      "
    >
      {TAB_ITEMS.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.id}
            href={item.href}
            className={`
              flex flex-col items-center justify-center
              w-full h-full gap-1
              transition-colors
              ${active ? 'text-[var(--color-primary-400)]' : 'text-[var(--color-gray-400)]'}
            `}
          >
            <Icon
              name={item.icon}
              size={24}
              color={active ? 'var(--color-primary-400)' : 'var(--color-gray-400)'}
            />
            <span className="text-[11px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
