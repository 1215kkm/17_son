'use client';

import { useState } from 'react';
import { Header } from '@/components/layout';
import { Card } from '@/components/ui';
import { TREATMENT_INFO } from '@/lib/constants';

type TreatmentKey = keyof typeof TREATMENT_INFO;

export default function TreatmentPage() {
  const [selected, setSelected] = useState<TreatmentKey>('scaling');
  const treatment = TREATMENT_INFO[selected];

  const tabs: { key: TreatmentKey; label: string }[] = [
    { key: 'scaling', label: '스케일링' },
    { key: 'filling', label: '충치 치료' },
    { key: 'rootCanal', label: '신경치료' },
    { key: 'extraction', label: '발치' },
    { key: 'implant', label: '임플란트' },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header title="치료 정보" />

      <main className="pt-[var(--header-height)] pb-8">
        {/* 페이지 헤더 */}
        <div className="px-5 py-4 text-center">
          <h1 className="text-[var(--text-2xl)] font-bold">치료 과정 알아보기</h1>
          <p className="text-[var(--foreground-secondary)] mt-1">
            궁금한 치료를 선택해서 미리 알아보세요
          </p>
        </div>

        {/* 탭 */}
        <div className="px-5 pb-4 overflow-x-auto hide-scrollbar">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelected(tab.key)}
                className={`px-4 py-2 rounded-full text-[var(--text-sm)] font-medium whitespace-nowrap transition-colors ${
                  selected === tab.key
                    ? 'bg-[var(--color-primary-400)] text-white'
                    : 'bg-white border border-[var(--color-gray-100)] text-[var(--foreground-secondary)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 치료 정보 카드 */}
        <div className="px-5">
          <Card className="!p-0 overflow-hidden mb-4">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-[var(--color-primary-400)] to-[var(--color-primary-300)] p-5 text-white">
              <h2 className="text-[var(--text-xl)] font-bold">{treatment.name}</h2>
              <p className="text-[var(--text-sm)] mt-1 opacity-90">{treatment.description}</p>
            </div>

            {/* 기본 정보 */}
            <div className="p-5">
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-[var(--color-gray-50)] rounded-[var(--radius-md)] p-3 text-center">
                  <p className="text-[var(--text-xs)] text-[var(--foreground-tertiary)]">소요 시간</p>
                  <p className="text-[var(--text-base)] font-semibold mt-1">{treatment.duration}</p>
                </div>
                <div className="bg-[var(--color-gray-50)] rounded-[var(--radius-md)] p-3 text-center">
                  <p className="text-[var(--text-xs)] text-[var(--foreground-tertiary)]">회복 기간</p>
                  <p className="text-[var(--text-base)] font-semibold mt-1">{treatment.recovery}</p>
                </div>
              </div>

              {/* 치료 단계 */}
              <h3 className="text-[var(--text-base)] font-semibold mb-3 flex items-center gap-2">
                <span>📋</span> 치료 단계
              </h3>
              <div className="space-y-3">
                {treatment.steps.map((step, i) => (
                  <div
                    key={i}
                    className="flex gap-3 p-3 bg-[var(--color-gray-50)] rounded-[var(--radius-md)]"
                  >
                    <div className="w-8 h-8 bg-[var(--color-primary-400)] text-white rounded-full flex items-center justify-center font-semibold text-[var(--text-sm)] flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{step.title}</p>
                      <p className="text-[var(--text-sm)] text-[var(--foreground-secondary)] mt-0.5">
                        {step.description}
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-[var(--text-xs)] text-[var(--foreground-tertiary)]">
                          통증:
                        </span>
                        {[...Array(5)].map((_, j) => (
                          <div
                            key={j}
                            className={`w-2 h-2 rounded-full ${
                              j < step.pain
                                ? 'bg-amber-500'
                                : 'bg-[var(--color-gray-200)]'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 팁 */}
              <div className="mt-5 p-4 bg-[var(--color-primary-50)] rounded-[var(--radius-md)]">
                <h3 className="text-[var(--text-base)] font-semibold mb-2">
                  ✨ 알아두면 좋은 팁
                </h3>
                {treatment.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2 mt-2">
                    <span className="text-[var(--text-sm)]">💡</span>
                    <p className="text-[var(--text-sm)] text-[var(--foreground-secondary)]">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* 고지사항 */}
          <div className="bg-[var(--color-gray-100)] rounded-[var(--radius-md)] p-4">
            <p className="text-[var(--text-sm)] text-[var(--foreground-tertiary)] text-center leading-relaxed">
              ⚠️ 본 정보는 일반적인 치료 과정 안내입니다.<br />
              개인 상태에 따라 치료 방법이 다를 수 있으며,<br />
              자세한 내용은 담당 치과의사와 상담하세요.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
