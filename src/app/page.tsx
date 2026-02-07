'use client';

import Link from 'next/link';
import { Card } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';

export default function HomePage() {
  return (
    <main className="main-content main-content-no-header">
      {/* 히어로 섹션 */}
      <section className="text-center pt-4 pb-6 animate-fade-in">
        {/* 캐릭터 일러스트 영역 */}
        <div className="w-[200px] h-[160px] mx-auto mb-4 bg-[var(--color-primary-50)] rounded-[20px] flex items-center justify-center">
          <span className="text-6xl">🦷</span>
        </div>

        <h1 className="text-[var(--text-2xl)] font-bold text-[var(--foreground)] leading-tight">
          치과 가기 전,<br />
          내 상태부터 정리해볼까요?
        </h1>
        <p className="text-[var(--text-base)] text-[var(--foreground-secondary)] mt-2">
          부담 없이 천천히 알아보세요
        </p>
      </section>

      {/* 메인 CTA - 증상확인 테스트 */}
      <section className="animate-fade-in stagger-1">
        <Link href="/diagnosis">
          <Card
            className="!p-5 bg-gradient-to-r from-[var(--color-primary-400)] to-[var(--color-primary-300)] border-none"
            clickable
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[var(--text-lg)] font-semibold text-white">
                  증상 확인 테스트
                </h2>
                <p className="text-[var(--text-sm)] text-white/80 mt-1">
                  30초만에 내 상태 정리하기
                </p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="chevron-right" size={24} color="white" />
              </div>
            </div>
          </Card>
        </Link>
      </section>

      {/* 기능 카드 그리드 */}
      <section className="mt-5 animate-fade-in stagger-2">
        <div className="grid grid-cols-2 gap-3">
          {/* 치과 방문 기록 */}
          <Link href="/records">
            <Card clickable className="h-full">
              <div className="w-10 h-10 bg-[var(--color-primary-50)] rounded-[10px] flex items-center justify-center mb-3">
                <Icon name="calendar" size={20} color="var(--color-primary-400)" />
              </div>
              <h3 className="text-[var(--text-base)] font-semibold text-[var(--foreground)]">
                치과 방문 기록
              </h3>
              <p className="text-[var(--text-sm)] text-[var(--foreground-secondary)] mt-1">
                내 진료 기록 관리
              </p>
            </Card>
          </Link>

          {/* 치료 정보 */}
          <Link href="/treatment">
            <Card clickable className="h-full">
              <div className="w-10 h-10 bg-[var(--color-primary-50)] rounded-[10px] flex items-center justify-center mb-3">
                <Icon name="file-text" size={20} color="var(--color-primary-400)" />
              </div>
              <h3 className="text-[var(--text-base)] font-semibold text-[var(--foreground)]">
                치료 정보
              </h3>
              <p className="text-[var(--text-sm)] text-[var(--foreground-secondary)] mt-1">
                치료 과정 알아보기
              </p>
            </Card>
          </Link>

          {/* 치아 맵 */}
          <Link href="/tooth-map">
            <Card clickable className="h-full">
              <div className="w-10 h-10 bg-[var(--color-primary-50)] rounded-[10px] flex items-center justify-center mb-3">
                <Icon name="map-pin" size={20} color="var(--color-primary-400)" />
              </div>
              <h3 className="text-[var(--text-base)] font-semibold text-[var(--foreground)]">
                치아 위치 선택
              </h3>
              <p className="text-[var(--text-sm)] text-[var(--foreground-secondary)] mt-1">
                아픈 치아 표시하기
              </p>
            </Card>
          </Link>

          {/* 이전 결과 */}
          <Link href="/diagnosis/result">
            <Card clickable className="h-full">
              <div className="w-10 h-10 bg-[var(--color-primary-50)] rounded-[10px] flex items-center justify-center mb-3">
                <Icon name="check-circle" size={20} color="var(--color-primary-400)" />
              </div>
              <h3 className="text-[var(--text-base)] font-semibold text-[var(--foreground)]">
                이전 결과
              </h3>
              <p className="text-[var(--text-sm)] text-[var(--foreground-secondary)] mt-1">
                최근 진단 결과 보기
              </p>
            </Card>
          </Link>
        </div>
      </section>

      {/* 고지사항 */}
      <section className="mt-6 animate-fade-in stagger-3">
        <div className="bg-[var(--color-gray-100)] rounded-[var(--radius-md)] p-4">
          <p className="text-[var(--text-sm)] text-[var(--foreground-tertiary)] text-center leading-relaxed">
            ⚠️ 본 서비스는 의료 진단이 아닙니다.<br />
            증상 정리를 도와드리는 참고용 서비스이며,<br />
            정확한 진단은 반드시 치과 전문의와 상담하세요.
          </p>
        </div>
      </section>
    </main>
  );
}
