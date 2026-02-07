'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout';
import { Button, ProgressBar } from '@/components/ui';
import { DIAGNOSIS_QUESTIONS, STORAGE_KEYS } from '@/lib/constants';

type AnswerValue = string | string[];
type Answers = Record<string, AnswerValue>;

export default function DiagnosisPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  // 조건부 질문 필터링
  const activeQuestions = DIAGNOSIS_QUESTIONS.filter((q) => {
    if (!q.condition) return true;
    return q.condition(answers);
  });

  const currentQuestion = activeQuestions[currentStep];
  const progress = ((currentStep + 1) / activeQuestions.length) * 100;
  const isLastStep = currentStep === activeQuestions.length - 1;

  // 현재 질문에 대한 답변 확인
  const currentAnswer = answers[currentQuestion?.id];
  const canProceed =
    currentQuestion?.type === 'single'
      ? !!currentAnswer
      : Array.isArray(currentAnswer) && currentAnswer.length > 0;

  // 옵션 선택
  const handleSelect = (value: string) => {
    const questionId = currentQuestion.id;

    if (currentQuestion.type === 'multi') {
      const current = (answers[questionId] as string[]) || [];
      const isNoneOption = value.includes('_none');

      if (current.includes(value)) {
        // 이미 선택된 것 해제
        setAnswers({
          ...answers,
          [questionId]: current.filter((v) => v !== value),
        });
      } else if (isNoneOption) {
        // "없어요" 선택 시 다른 것 해제
        setAnswers({ ...answers, [questionId]: [value] });
      } else {
        // 다른 것 선택 시 "없어요" 해제
        setAnswers({
          ...answers,
          [questionId]: [...current.filter((v) => !v.includes('_none')), value],
        });
      }
    } else {
      setAnswers({ ...answers, [questionId]: value });
    }
  };

  // 다음 단계
  const handleNext = () => {
    if (isLastStep) {
      // 결과 계산 및 저장
      const result = calculateResult(answers);
      localStorage.setItem(
        STORAGE_KEYS.CURRENT_DIAGNOSIS,
        JSON.stringify({
          answers,
          result,
          date: new Date().toISOString(),
        })
      );
      router.push('/diagnosis/result');
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // 이전 단계
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // 뒤로가기
  const handleBack = () => {
    if (currentStep > 0) {
      handlePrev();
    } else {
      router.push('/');
    }
  };

  // 선택 여부 확인
  const isSelected = (value: string) => {
    if (currentQuestion.type === 'multi') {
      return (currentAnswer as string[])?.includes(value);
    }
    return currentAnswer === value;
  };

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header title="증상 확인" onBack={handleBack} />

      {/* 진행바 */}
      <div className="fixed top-[var(--header-height)] left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5 py-3 bg-[var(--background)]">
        <ProgressBar value={progress} />
      </div>

      {/* 메인 콘텐츠 */}
      <main className="pt-[calc(var(--header-height)+48px)] px-5 pb-[120px]">
        {/* 질문 헤더 */}
        <div className="mb-6 animate-fade-in">
          <p className="text-[var(--text-sm)] text-[var(--color-primary-400)] font-semibold mb-2">
            질문 {currentStep + 1} / {activeQuestions.length}
          </p>
          <h2 className="text-[var(--text-2xl)] font-bold text-[var(--foreground)] leading-tight">
            {currentQuestion.question}
          </h2>
          <p className="text-[var(--text-base)] text-[var(--foreground-secondary)] mt-2">
            {currentQuestion.hint}
          </p>
        </div>

        {/* 복수선택 힌트 */}
        {currentQuestion.type === 'multi' && (
          <p className="text-center text-[var(--text-sm)] text-[var(--foreground-tertiary)] mb-4">
            여러 개 선택 가능
          </p>
        )}

        {/* 옵션 목록 */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`
                w-full p-4 rounded-[var(--radius-md)] border-2 text-left
                transition-all duration-200 animate-fade-in
                flex items-center gap-4
                ${
                  isSelected(option.value)
                    ? 'border-[var(--color-primary-400)] bg-[var(--color-primary-50)]'
                    : 'border-[var(--color-gray-100)] bg-[var(--background-card)]'
                }
              `}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* 아이콘 */}
              <div
                className={`
                  w-11 h-11 rounded-[10px] flex items-center justify-center text-xl
                  transition-colors
                  ${
                    isSelected(option.value)
                      ? 'bg-[var(--color-primary-100)]'
                      : 'bg-[var(--color-gray-50)]'
                  }
                `}
              >
                {option.icon}
              </div>

              {/* 텍스트 */}
              <div className="flex-1">
                <p
                  className={`
                    text-[var(--text-base)] font-semibold
                    ${isSelected(option.value) ? 'text-[var(--color-primary-500)]' : 'text-[var(--foreground)]'}
                  `}
                >
                  {option.label}
                </p>
                <p className="text-[var(--text-sm)] text-[var(--foreground-secondary)] mt-0.5">
                  {option.desc}
                </p>
              </div>

              {/* 체크 표시 */}
              {isSelected(option.value) && (
                <div className="w-6 h-6 rounded-full bg-[var(--color-primary-400)] flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </main>

      {/* 하단 버튼 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-5 bg-[var(--background)] border-t border-[var(--color-gray-100)]">
        <div className="flex gap-3">
          {currentStep > 0 && (
            <Button variant="secondary" onClick={handlePrev} className="!w-14">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </Button>
          )}
          <Button fullWidth disabled={!canProceed} onClick={handleNext}>
            {isLastStep ? '결과 확인하기' : '다음'}
          </Button>
        </div>
      </div>
    </div>
  );
}

// 결과 계산 함수
function calculateResult(answers: Answers) {
  const weights: Record<string, number> = {
    pain_none: 0,
    pain_sometimes: 2,
    pain_always: 4,
    pain_cold: 2,
    pain_hot: 3,
    pain_chewing: 3,
    pain_rest: 4,
    gum_bleeding: 2,
    gum_swelling: 3,
    gum_smell: 2,
    gum_none: 0,
    discoloration: 2,
    hole_visible: 4,
    loose_tooth: 4,
    visual_none: 0,
    duration_recent: 0,
    duration_weeks: 1,
    duration_months: 2,
  };

  let totalScore = 0;
  const symptoms: string[] = [];

  Object.values(answers).forEach((value) => {
    if (Array.isArray(value)) {
      value.forEach((v) => {
        totalScore += weights[v] || 0;
        if (weights[v] > 0) symptoms.push(v);
      });
    } else {
      totalScore += weights[value] || 0;
      if (weights[value] > 0) symptoms.push(value);
    }
  });

  let riskLevel: 'low' | 'medium' | 'high';
  let riskText: string;
  let recommendations: string[];

  if (totalScore <= 3) {
    riskLevel = 'low';
    riskText = '양호한 상태';
    recommendations = [
      '현재 특별한 문제가 없어 보입니다',
      '정기적인 스케일링을 권장합니다',
      '올바른 칫솔질을 유지해주세요',
    ];
  } else if (totalScore <= 7) {
    riskLevel = 'medium';
    riskText = '관찰 필요';
    recommendations = [
      '가벼운 증상이 있을 수 있습니다',
      '2주 내 치과 방문을 권장합니다',
      '증상이 심해지면 빠르게 내원해주세요',
    ];
  } else {
    riskLevel = 'high';
    riskText = '방문 권장';
    recommendations = [
      '치과 방문이 필요해 보입니다',
      '가능한 빨리 검진받으시길 권장합니다',
      '자가 치료는 피해주세요',
    ];
  }

  // 가능한 상태 추론
  const possibleConditions = [];

  if (symptoms.some((s) => ['pain_cold', 'hole_visible', 'discoloration'].includes(s))) {
    possibleConditions.push({
      name: '충치 가능성',
      description: '찬 것에 시리거나 변색이 있다면 충치일 수 있습니다',
    });
  }

  if (symptoms.some((s) => ['gum_bleeding', 'gum_swelling', 'gum_smell'].includes(s))) {
    possibleConditions.push({
      name: '잇몸 염증 가능성',
      description: '잇몸 출혈이나 붓기는 치은염의 신호일 수 있습니다',
    });
  }

  if (symptoms.some((s) => ['pain_rest', 'pain_hot'].includes(s))) {
    possibleConditions.push({
      name: '신경 문제 가능성',
      description: '가만히 있어도 아프다면 신경치료가 필요할 수 있습니다',
    });
  }

  if (possibleConditions.length === 0) {
    possibleConditions.push({
      name: '특별한 이상 없음',
      description: '현재 입력된 정보로는 특이사항이 없습니다',
    });
  }

  return {
    score: totalScore,
    riskLevel,
    riskText,
    recommendations,
    possibleConditions,
    symptoms,
  };
}
