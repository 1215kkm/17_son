'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout';
import { Card, Button } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import { STORAGE_KEYS } from '@/lib/constants';
import Link from 'next/link';

interface UserStats {
  diagnosisCount: number;
  recordCount: number;
  savedTeethCount: number;
}

export default function MyPage() {
  const [stats, setStats] = useState<UserStats>({
    diagnosisCount: 0,
    recordCount: 0,
    savedTeethCount: 0,
  });

  useEffect(() => {
    // 진단 기록 확인
    const diagnosisData = localStorage.getItem(STORAGE_KEYS.CURRENT_DIAGNOSIS);
    const diagnosisCount = diagnosisData ? 1 : 0;

    // 방문 기록 확인
    const recordsData = localStorage.getItem(STORAGE_KEYS.RECORDS);
    const recordCount = recordsData ? JSON.parse(recordsData).length : 0;

    // 치아맵 데이터 확인
    const toothData = localStorage.getItem(STORAGE_KEYS.TOOTH_MAP_DATA);
    const savedTeethCount = toothData ? Object.keys(JSON.parse(toothData)).length : 0;

    setStats({ diagnosisCount, recordCount, savedTeethCount });
  }, []);

  const menuItems = [
    {
      icon: 'calendar',
      title: '방문 기록 관리',
      desc: '치과 방문 기록 확인',
      href: '/records',
    },
    {
      icon: 'map-pin',
      title: '치아 맵',
      desc: '내 치아 상태 기록',
      href: '/tooth-map',
    },
    {
      icon: 'check-circle',
      title: '진단 결과',
      desc: '최근 진단 결과 확인',
      href: '/diagnosis/result',
    },
    {
      icon: 'file-text',
      title: '치료 정보',
      desc: '치료 종류별 정보',
      href: '/treatment',
    },
  ];

  const settingsItems = [
    { icon: 'bell', title: '알림 설정', desc: '방문 리마인더 등' },
    { icon: 'info', title: '앱 정보', desc: '버전 1.0.0' },
    { icon: 'help-circle', title: '도움말', desc: '자주 묻는 질문' },
  ];

  const clearAllData = () => {
    if (confirm('모든 데이터를 삭제할까요? 이 작업은 되돌릴 수 없습니다.')) {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_DIAGNOSIS);
      localStorage.removeItem(STORAGE_KEYS.RECORDS);
      localStorage.removeItem(STORAGE_KEYS.TOOTH_MAP_DATA);
      setStats({ diagnosisCount: 0, recordCount: 0, savedTeethCount: 0 });
      alert('모든 데이터가 삭제되었습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header title="마이페이지" />

      <main className="pt-[var(--header-height)] px-5 pb-24">
        {/* 프로필 영역 */}
        <div className="py-6 text-center">
          <div className="w-20 h-20 mx-auto bg-[var(--color-primary-50)] rounded-full flex items-center justify-center mb-3">
            <span className="text-4xl">👤</span>
          </div>
          <h2 className="text-[var(--text-lg)] font-bold">게스트 사용자</h2>
          <p className="text-[var(--text-sm)] text-[var(--foreground-secondary)] mt-1">
            로그인 없이 사용 중
          </p>
        </div>

        {/* 통계 카드 */}
        <Card className="!p-4 mb-5">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-[var(--text-2xl)] font-bold text-[var(--color-primary-400)]">
                {stats.diagnosisCount}
              </p>
              <p className="text-[var(--text-xs)] text-[var(--foreground-secondary)]">진단 횟수</p>
            </div>
            <div className="border-x border-[var(--color-gray-100)]">
              <p className="text-[var(--text-2xl)] font-bold text-[var(--color-primary-400)]">
                {stats.recordCount}
              </p>
              <p className="text-[var(--text-xs)] text-[var(--foreground-secondary)]">방문 기록</p>
            </div>
            <div>
              <p className="text-[var(--text-2xl)] font-bold text-[var(--color-primary-400)]">
                {stats.savedTeethCount}
              </p>
              <p className="text-[var(--text-xs)] text-[var(--foreground-secondary)]">기록된 치아</p>
            </div>
          </div>
        </Card>

        {/* 내 활동 메뉴 */}
        <div className="mb-5">
          <h3 className="text-[var(--text-base)] font-semibold mb-3">내 활동</h3>
          <Card className="!p-0 overflow-hidden">
            {menuItems.map((item, index) => (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-4 p-4 hover:bg-[var(--color-gray-50)] transition-colors ${
                  index < menuItems.length - 1 ? 'border-b border-[var(--color-gray-100)]' : ''
                }`}
              >
                <div className="w-10 h-10 bg-[var(--color-primary-50)] rounded-[10px] flex items-center justify-center">
                  <Icon name={item.icon as any} size={20} color="var(--color-primary-400)" />
                </div>
                <div className="flex-1">
                  <p className="text-[var(--text-base)] font-medium">{item.title}</p>
                  <p className="text-[var(--text-sm)] text-[var(--foreground-secondary)]">
                    {item.desc}
                  </p>
                </div>
                <Icon name="chevron-right" size={20} color="var(--foreground-tertiary)" />
              </Link>
            ))}
          </Card>
        </div>

        {/* 설정 메뉴 */}
        <div className="mb-5">
          <h3 className="text-[var(--text-base)] font-semibold mb-3">설정</h3>
          <Card className="!p-0 overflow-hidden">
            {settingsItems.map((item, index) => (
              <button
                key={item.title}
                className={`w-full flex items-center gap-4 p-4 hover:bg-[var(--color-gray-50)] transition-colors text-left ${
                  index < settingsItems.length - 1 ? 'border-b border-[var(--color-gray-100)]' : ''
                }`}
              >
                <div className="w-10 h-10 bg-[var(--color-gray-100)] rounded-[10px] flex items-center justify-center">
                  <Icon name={item.icon as any} size={20} color="var(--foreground-secondary)" />
                </div>
                <div className="flex-1">
                  <p className="text-[var(--text-base)] font-medium">{item.title}</p>
                  <p className="text-[var(--text-sm)] text-[var(--foreground-secondary)]">
                    {item.desc}
                  </p>
                </div>
                <Icon name="chevron-right" size={20} color="var(--foreground-tertiary)" />
              </button>
            ))}
          </Card>
        </div>

        {/* 데이터 삭제 버튼 */}
        <Button variant="outline" fullWidth onClick={clearAllData} className="!text-red-500 !border-red-200">
          모든 데이터 삭제
        </Button>

        {/* 고지사항 */}
        <div className="mt-6 text-center">
          <p className="text-[var(--text-xs)] text-[var(--foreground-tertiary)]">
            본 앱의 모든 데이터는 기기에만 저장됩니다.<br />
            앱 삭제 시 데이터가 함께 삭제될 수 있습니다.
          </p>
        </div>
      </main>
    </div>
  );
}
