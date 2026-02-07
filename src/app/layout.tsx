import type { Metadata, Viewport } from 'next';
import './globals.css';
import { TabBar } from '@/components/layout';

export const metadata: Metadata = {
  title: '치아 상태 정리하기',
  description: '치과 방문 전 내 치아 상태를 정리해보세요. AI 없이 증상을 체크하고 치료 정보를 확인할 수 있습니다.',
  keywords: ['치과', '자가진단', '치아', '증상체크', '치료정보'],
  authors: [{ name: '치아 상태 정리하기' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '치아 상태 정리하기',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#F5F7FA',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
      </head>
      <body className="antialiased">
        <div className="app-container">
          {children}
          <TabBar />
        </div>
      </body>
    </html>
  );
}
