'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout';
import { Button, Card, Tag } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import { STORAGE_KEYS } from '@/lib/constants';

interface DiagnosisResult {
  score: number;
  riskLevel: 'low' | 'medium' | 'high';
  riskText: string;
  recommendations: string[];
  possibleConditions: { name: string; description: string }[];
  symptoms: string[];
}

interface DiagnosisData {
  answers: Record<string, string | string[]>;
  result: DiagnosisResult;
  date: string;
}

const riskConfig = {
  low: {
    icon: '😊',
    color: 'bg-green-50',
    textColor: 'text-green-600',
    barColor: 'bg-green-500',
  },
  medium: {
    icon: '😐',
    color: 'bg-amber-50',
    textColor: 'text-amber-600',
    barColor: 'bg-amber-500',
  },
  high: {
    icon: '😟',
    color: 'bg-red-50',
    textColor: 'text-red-600',
    barColor: 'bg-red-500',
  },
};

export default function DiagnosisResultPage() {
  const router = useRouter();
  const [data, setData] = useState<DiagnosisData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_DIAGNOSIS);
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-5">
        <div className="text-6xl mb-4">📋</div>
        <h2 className="text-[var(--text-lg)] font-semibold mb-2">아직 결과가 없어요</h2>
        <p className="text-[var(--foreground-secondary)] mb-6">먼저 증상 체크를 진행해주세요</p>
        <Button onClick={() => router.push('/diagnosis')}>증상 체크 시작하기</Button>
      </div>
    );
  }

  const { result, date } = data;
  const config = riskConfig[result.riskLevel];
  const maxScore = 15;
  const scorePercent = Math.min((result.score / maxScore) * 100, 100);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header title="결과 확인" onBack={() => router.push('/')} />

      <main className="pt-[var(--header-height)] px-5 pb-8">
        {/* 결과 헤더 */}
        <section className="text-center py-6 animate-fade-in">
          <div
            className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl mb-4 ${config.color}`}
          >
            {config.icon}
          </div>
          <h1 className={`text-[var(--text-2xl)] font-bold ${config.textColor}`}>
            {result.riskText}
          </h1>
          <p className="text-[var(--foreground-secondary)] mt-1">
            입력된 정보를 종합한 결과입니다
          </p>
          <p className="text-[var(--text-sm)] text-[var(--foreground-tertiary)] mt-2">
            체크 일시: {new Date(date).toLocaleDateString('ko-KR')}
          </p>
        </section>

        {/* 분석 완료 메시지 */}
        <div className="bg-[var(--color-primary-50)] rounded-[var(--radius-md)] p-3 mb-4 animate-fade-in stagger-1">
          <p className="text-[var(--text-sm)] text-[var(--color-primary-500)] text-center">
            📊 입력하신 정보를 종합하여 분석했습니다
          </p>
        </div>

        {/* 점수 바 */}
        <Card className="mb-4 animate-fade-in stagger-1">
          <p className="text-[var(--text-sm)] text-[var(--foreground-secondary)] mb-2">
            증상 종합 점수
          </p>
          <div className="w-full h-2 bg-[var(--color-gray-100)] rounded-full overflow-hidden mb-2">
            <div
              className={`h-full rounded-full transition-all duration-500 ${config.barColor}`}
              style={{ width: `${scorePercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[var(--text-xs)] text-[var(--foreground-tertiary)]">
            <span>양호</span>
            <span>관찰 필요</span>
            <span>방문 권장</span>
          </div>
        </Card>

        {/* 가능한 상태 */}
        <Card className="mb-4 animate-fade-in stagger-2">
          <h3 className="text-[var(--text-base)] font-semibold mb-3 flex items-center gap-2">
            <span>🔍</span> 가능한 상태
          </h3>
          <div className="space-y-3">
            {result.possibleConditions.map((cond, i) => (
              <div key={i} className="bg-[var(--color-gray-50)] rounded-[var(--radius-sm)] p-3">
                <p className="font-semibold text-[var(--foreground)]">{cond.name}</p>
                <p className="text-[var(--text-sm)] text-[var(--foreground-secondary)] mt-1">
                  {cond.description}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* 권장 행동 */}
        <Card className="mb-4 animate-fade-in stagger-3">
          <h3 className="text-[var(--text-base)] font-semibold mb-3 flex items-center gap-2">
            <span>✅</span> 권장 행동
          </h3>
          <div className="space-y-3">
            {result.recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[var(--color-primary-50)] flex items-center justify-center flex-shrink-0">
                  <span className="text-[var(--text-xs)] text-[var(--color-primary-500)] font-semibold">
                    {i + 1}
                  </span>
                </div>
                <p className="text-[var(--text-base)] text-[var(--foreground-secondary)] leading-relaxed">
                  {rec}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* 액션 버튼 */}
        <div className="space-y-3 animate-fade-in stagger-4">
          <Link href="/tooth-map">
            <Button variant="secondary" fullWidth leftIcon={<span>🗺️</span>}>
              치아 위치도 기록하기
            </Button>
          </Link>
          <Link href="/treatment">
            <Button variant="secondary" fullWidth leftIcon={<span>💡</span>}>
              치료 정보 알아보기
            </Button>
          </Link>
          <Link href="/diagnosis">
            <Button variant="outline" fullWidth>
              다시 체크하기
            </Button>
          </Link>
        </div>

        {/* 고지사항 */}
        <div className="mt-6 bg-[var(--color-gray-100)] rounded-[var(--radius-md)] p-4">
          <p className="text-[var(--text-sm)] text-[var(--foreground-tertiary)] text-center leading-relaxed">
            ⚠️ 본 결과는 의료 진단이 아닙니다.<br />
            입력된 정보를 기반으로 한 참고용 안내이며,<br />
            정확한 진단은 반드시 치과 전문의와 상담하세요.
          </p>
        </div>
      </main>
    </div>
  );
}
