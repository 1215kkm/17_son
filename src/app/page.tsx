'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { STORAGE_KEYS } from '@/lib/constants';

interface VisitRecord {
  id: string;
  date: string;
  clinic: string;
  treatment: string;
  memo: string;
}

export default function HomePage() {
  const [daysSinceVisit, setDaysSinceVisit] = useState<number | null>(null);
  const [showReminder, setShowReminder] = useState(true);

  useEffect(() => {
    const recordsData = localStorage.getItem(STORAGE_KEYS.RECORDS);
    if (recordsData) {
      const records: VisitRecord[] = JSON.parse(recordsData);
      if (records.length > 0) {
        const sortedRecords = records.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        const lastVisit = new Date(sortedRecords[0].date);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - lastVisit.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysSinceVisit(diffDays);
      }
    }
  }, []);

  const treatments = [
    { id: 'scaling', name: '스케일링', color: '#E8F5E9', emoji: '🦷' },
    { id: 'resin', name: '레진', color: '#E3F2FD', emoji: '✨' },
    { id: 'inlay', name: '인레이', color: '#FFF3E0', emoji: '🔶' },
    { id: 'nerve', name: '신경치료', color: '#FCE4EC', emoji: '💉' },
    { id: 'crown', name: '크라운', color: '#F3E5F5', emoji: '👑' },
  ];

  const magazines = [
    {
      id: 1,
      title: '임플란트 골이식 재료, 어떻게 선택할까?',
      image: '🦴',
      tag: '치과상식',
    },
    {
      id: 2,
      title: '임플란트도 건강보험이 가능하다고?',
      image: '💰',
      tag: '보험정보',
    },
    {
      id: 3,
      title: '치아 관리법, 전문의가 알려드려요',
      image: '🪥',
      tag: '치과상식',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 상단 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="flex items-center justify-between px-5 h-14">
          <span className="text-lg font-bold tracking-tight">DENTAL GUIDE</span>
          <div className="flex items-center gap-4">
            <button className="relative">
              <Icon name="bell" size={24} color="#1A1A1A" />
            </button>
            <button>
              <Icon name="user" size={24} color="#1A1A1A" />
            </button>
          </div>
        </div>
      </header>

      <main className="pt-14 pb-24">
        {/* 히어로 섹션 - 파란색 그라데이션 */}
        <section className="relative overflow-hidden" style={{
          background: 'linear-gradient(135deg, #5B9BD5 0%, #7BC8E8 50%, #A8E0D1 100%)',
          minHeight: '240px'
        }}>
          <div className="px-5 py-8 relative z-10">
            <p className="text-white/80 text-sm mb-1">지금 치과 가야 할까?</p>
            <h1 className="text-white text-xl font-bold leading-tight">
              내 증상에 딱 맞는<br />
              맞춤형 가이드
            </h1>
            <Link
              href="/diagnosis"
              className="inline-flex items-center gap-1 mt-6 px-4 py-2.5 bg-white rounded-full text-sm font-medium text-gray-800"
            >
              내 증상 확인하기
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>

          {/* 일러스트 영역 (플레이스홀더) */}
          <div className="absolute right-0 bottom-0 w-48 h-48 flex items-end justify-end pr-4 pb-4">
            <div className="w-36 h-44 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center">
              <span className="text-6xl">📱</span>
            </div>
          </div>
        </section>

        {/* 최근 방문치과 카드 */}
        <section className="px-5 -mt-4 relative z-20">
          <Link href="/records" className="block bg-white rounded-2xl shadow-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">🏥</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">최근 방문치과</p>
                  <p className="text-2xl font-bold">
                    {daysSinceVisit !== null ? (
                      <>{daysSinceVisit}<span className="text-base font-normal text-gray-500 ml-1">일 경과</span></>
                    ) : (
                      <span className="text-base font-normal text-gray-400">기록 없음</span>
                    )}
                  </p>
                </div>
              </div>
              <Icon name="chevron-right" size={24} color="#9CA3AF" />
            </div>
          </Link>
        </section>

        {/* 치료 정보 섹션 */}
        <section className="mt-8 px-5">
          <h2 className="text-lg font-bold mb-4">치료 정보</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
            {treatments.map((treatment) => (
              <Link
                key={treatment.id}
                href={`/treatment?tab=${treatment.id}`}
                className="flex-shrink-0 w-20"
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-2"
                  style={{ backgroundColor: treatment.color }}
                >
                  <span className="text-3xl">{treatment.emoji}</span>
                </div>
                <p className="text-center text-sm">{treatment.name}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* 매거진 섹션 */}
        <section className="mt-8 px-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">매거진</h2>
            <button className="text-sm text-gray-400">더보기</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
            {magazines.map((magazine) => (
              <div
                key={magazine.id}
                className="flex-shrink-0 w-40 bg-gray-50 rounded-2xl overflow-hidden"
              >
                <div className="h-24 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                  <span className="text-4xl">{magazine.image}</span>
                </div>
                <div className="p-3">
                  <span className="text-xs text-blue-500 font-medium">{magazine.tag}</span>
                  <p className="text-sm font-medium mt-1 line-clamp-2">{magazine.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 빠른 메뉴 */}
        <section className="mt-8 px-5">
          <h2 className="text-lg font-bold mb-4">빠른 메뉴</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/tooth-map" className="bg-gray-50 rounded-xl p-4">
              <div className="w-10 h-10 bg-[#4AC8B0]/10 rounded-xl flex items-center justify-center mb-3">
                <Icon name="map-pin" size={20} color="#4AC8B0" />
              </div>
              <p className="font-medium">치아 위치 선택</p>
              <p className="text-sm text-gray-400 mt-0.5">아픈 치아 표시하기</p>
            </Link>
            <Link href="/diagnosis/result" className="bg-gray-50 rounded-xl p-4">
              <div className="w-10 h-10 bg-[#4AC8B0]/10 rounded-xl flex items-center justify-center mb-3">
                <Icon name="check-circle" size={20} color="#4AC8B0" />
              </div>
              <p className="font-medium">이전 결과</p>
              <p className="text-sm text-gray-400 mt-0.5">최근 진단 결과 보기</p>
            </Link>
          </div>
        </section>
      </main>

      {/* 하단 알림 바 */}
      {showReminder && (
        <div className="fixed bottom-20 left-4 right-4 bg-[#4AC8B0] text-white rounded-xl px-4 py-3 flex items-center justify-between shadow-lg z-40">
          <p className="text-sm">7일 뒤, 예약한 치과 일정이 있습니다</p>
          <button onClick={() => setShowReminder(false)} className="ml-2">
            <Icon name="x" size={18} color="white" />
          </button>
        </div>
      )}

      {/* 하단 탭바 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50">
        <div className="flex items-center justify-around h-16">
          <Link href="/" className="flex flex-col items-center gap-1 text-[#4AC8B0]">
            <Icon name="home" size={24} color="#4AC8B0" />
            <span className="text-xs">홈</span>
          </Link>
          <Link href="/search" className="flex flex-col items-center gap-1 text-gray-400">
            <Icon name="search" size={24} color="#9CA3AF" />
            <span className="text-xs">치과검색</span>
          </Link>
          <Link href="/diagnosis" className="flex flex-col items-center gap-1 text-gray-400">
            <Icon name="file-text" size={24} color="#9CA3AF" />
            <span className="text-xs">증상기록</span>
          </Link>
          <Link href="/community" className="flex flex-col items-center gap-1 text-gray-400">
            <Icon name="users" size={24} color="#9CA3AF" />
            <span className="text-xs">커뮤니티</span>
          </Link>
        </div>
        {/* iOS 홈 인디케이터 영역 */}
        <div className="h-5 bg-white" />
      </nav>
    </div>
  );
}
