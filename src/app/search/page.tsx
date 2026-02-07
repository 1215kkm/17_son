'use client';

import { useState } from 'react';
import { Card } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';

// 더미 치과 데이터
const dummyClinics = [
  {
    id: 1,
    name: '서울스마일치과',
    address: '서울시 강남구 테헤란로 123',
    distance: '350m',
    rating: 4.8,
    reviewCount: 128,
    isOpen: true,
    hours: '09:00 - 21:00',
    phone: '02-1234-5678',
  },
  {
    id: 2,
    name: '연세좋은치과의원',
    address: '서울시 강남구 역삼동 456',
    distance: '520m',
    rating: 4.6,
    reviewCount: 89,
    isOpen: true,
    hours: '10:00 - 19:00',
    phone: '02-2345-6789',
  },
  {
    id: 3,
    name: '미소가득치과',
    address: '서울시 서초구 서초대로 789',
    distance: '800m',
    rating: 4.9,
    reviewCount: 256,
    isOpen: false,
    hours: '09:00 - 18:00',
    phone: '02-3456-7890',
  },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClinic, setSelectedClinic] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* 헤더 + 검색바 */}
      <div className="sticky top-0 bg-[var(--background)] z-10 px-5 pt-[env(safe-area-inset-top)] pb-3">
        <div className="flex items-center gap-3 mt-3">
          <div className="flex-1 flex items-center gap-2 px-4 py-3 bg-white rounded-[var(--radius-md)] shadow-sm">
            <Icon name="search" size={20} color="var(--foreground-tertiary)" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="치과 이름, 지역으로 검색"
              className="flex-1 text-[var(--text-base)] outline-none bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* 지도 영역 (플레이스홀더) */}
      <div className="h-[250px] bg-[var(--color-gray-100)] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">🗺️</div>
          <p className="text-[var(--foreground-secondary)] text-[var(--text-sm)]">
            카카오맵 API 연동 필요
          </p>
          <p className="text-[var(--foreground-tertiary)] text-[var(--text-xs)] mt-1">
            developers.kakao.com에서<br />앱 등록 후 API 키 발급
          </p>
        </div>
      </div>

      {/* 치과 리스트 */}
      <div className="px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[var(--text-base)] font-semibold">
            주변 치과 <span className="text-[var(--color-primary-400)]">{dummyClinics.length}</span>
          </h2>
          <button className="text-[var(--text-sm)] text-[var(--foreground-secondary)]">
            거리순 ▼
          </button>
        </div>

        <div className="space-y-3 pb-20">
          {dummyClinics.map((clinic) => (
            <Card
              key={clinic.id}
              clickable
              onClick={() => setSelectedClinic(clinic.id)}
              className={selectedClinic === clinic.id ? '!border-[var(--color-primary-400)] border-2' : ''}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[var(--text-base)] font-semibold">{clinic.name}</h3>
                    <span
                      className={`text-[var(--text-xs)] px-2 py-0.5 rounded-full ${
                        clinic.isOpen
                          ? 'bg-green-50 text-green-600'
                          : 'bg-[var(--color-gray-100)] text-[var(--foreground-tertiary)]'
                      }`}
                    >
                      {clinic.isOpen ? '진료중' : '진료종료'}
                    </span>
                  </div>
                  <p className="text-[var(--text-sm)] text-[var(--foreground-secondary)] mt-1">
                    {clinic.address}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-[var(--text-sm)]">
                    <span className="flex items-center gap-1">
                      <span className="text-amber-500">★</span>
                      <span className="font-medium">{clinic.rating}</span>
                      <span className="text-[var(--foreground-tertiary)]">
                        ({clinic.reviewCount})
                      </span>
                    </span>
                    <span className="text-[var(--foreground-tertiary)]">
                      {clinic.hours}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[var(--text-sm)] font-semibold text-[var(--color-primary-400)]">
                    {clinic.distance}
                  </span>
                </div>
              </div>

              {selectedClinic === clinic.id && (
                <div className="flex gap-2 mt-4 pt-4 border-t border-[var(--color-gray-100)]">
                  <a
                    href={`tel:${clinic.phone}`}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-[var(--color-gray-50)] rounded-[var(--radius-md)] text-[var(--text-sm)] font-medium"
                  >
                    <Icon name="phone" size={16} />
                    전화
                  </a>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-[var(--color-primary-400)] text-white rounded-[var(--radius-md)] text-[var(--text-sm)] font-medium">
                    <Icon name="map-pin" size={16} color="white" />
                    길찾기
                  </button>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
