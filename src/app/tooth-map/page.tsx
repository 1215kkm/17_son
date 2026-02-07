'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout';
import { Button, Card, Tag } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import { STORAGE_KEYS } from '@/lib/constants';

const symptomLabels: { [key: string]: string } = {
  cold: '찬물 시림',
  hot: '뜨거운 것 아픔',
  chewing: '씹을 때 통증',
  rest: '가만히 있어도 아픔',
  gum: '잇몸 문제',
  color: '변색',
  crack: '금/깨짐',
  loose: '흔들림',
};

// 치아 번호 배열
const upperTeeth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
const lowerTeeth = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

function getToothName(num: number): string {
  const isUpper = num < 40;
  const isRight = [1, 4].includes(Math.floor(num / 10));
  const lastDigit = num % 10;

  let type = '';
  if (lastDigit === 8) type = '사랑니';
  else if (lastDigit >= 6) type = '큰어금니';
  else if (lastDigit >= 4) type = '작은어금니';
  else if (lastDigit === 3) type = '송곳니';
  else type = '앞니';

  return `${isUpper ? '위' : '아래'} ${isRight ? '오른쪽' : '왼쪽'} ${type}`;
}

function isMolar(num: number): boolean {
  const lastDigit = num % 10;
  return lastDigit >= 6;
}

export default function ToothMapPage() {
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [savedTeeth, setSavedTeeth] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.TOOTH_MAP_DATA);
    if (stored) {
      setSavedTeeth(JSON.parse(stored));
    }
  }, []);

  const saveTooth = () => {
    if (!selectedTooth) return;

    const newData = { ...savedTeeth };
    if (selectedSymptoms.length === 0) {
      delete newData[selectedTooth];
    } else {
      newData[selectedTooth] = selectedSymptoms;
    }

    localStorage.setItem(STORAGE_KEYS.TOOTH_MAP_DATA, JSON.stringify(newData));
    setSavedTeeth(newData);
    setSelectedTooth(null);
    setSelectedSymptoms([]);
  };

  const deleteTooth = (toothNum: string) => {
    const newData = { ...savedTeeth };
    delete newData[toothNum];
    localStorage.setItem(STORAGE_KEYS.TOOTH_MAP_DATA, JSON.stringify(newData));
    setSavedTeeth(newData);
  };

  const selectTooth = (num: number) => {
    setSelectedTooth(num);
    setSelectedSymptoms(savedTeeth[num] || []);
  };

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const cancelSelection = () => {
    setSelectedTooth(null);
    setSelectedSymptoms([]);
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header title="치아 맵" />

      <main className="pt-[var(--header-height)] px-5 pb-8">
        {/* 페이지 헤더 */}
        <div className="py-4 text-center">
          <h1 className="text-[var(--text-2xl)] font-bold">아픈 치아를 선택해주세요</h1>
          <p className="text-[var(--foreground-secondary)] mt-1">
            해당 위치를 터치하면 증상을 기록할 수 있어요
          </p>
        </div>

        {/* 치아 맵 */}
        <Card className="!p-5 mb-4">
          {/* 상악 */}
          <div className="mb-3">
            <p className="text-[var(--text-xs)] text-center text-[var(--foreground-tertiary)] mb-2">
              위턱 (상악)
            </p>
            <div className="flex justify-center gap-[2px]">
              {upperTeeth.map((num) => (
                <button
                  key={num}
                  onClick={() => selectTooth(num)}
                  className={`
                    ${isMolar(num) ? 'w-[26px] h-[30px]' : 'w-[22px] h-[28px]'}
                    rounded-[4px] border-2 text-[9px] font-medium
                    transition-all
                    ${
                      savedTeeth[num]
                        ? 'border-amber-500 bg-amber-50 text-amber-600'
                        : selectedTooth === num
                        ? 'border-[var(--color-primary-400)] bg-[var(--color-primary-50)] text-[var(--color-primary-500)]'
                        : 'border-[var(--color-gray-200)] text-[var(--foreground-tertiary)]'
                    }
                  `}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* 구분선 */}
          <div className="h-[1px] bg-[var(--color-gray-100)] my-3" />

          {/* 하악 */}
          <div>
            <div className="flex justify-center gap-[2px]">
              {lowerTeeth.map((num) => (
                <button
                  key={num}
                  onClick={() => selectTooth(num)}
                  className={`
                    ${isMolar(num) ? 'w-[26px] h-[30px]' : 'w-[22px] h-[28px]'}
                    rounded-[4px] border-2 text-[9px] font-medium
                    transition-all
                    ${
                      savedTeeth[num]
                        ? 'border-amber-500 bg-amber-50 text-amber-600'
                        : selectedTooth === num
                        ? 'border-[var(--color-primary-400)] bg-[var(--color-primary-50)] text-[var(--color-primary-500)]'
                        : 'border-[var(--color-gray-200)] text-[var(--foreground-tertiary)]'
                    }
                  `}
                >
                  {num}
                </button>
              ))}
            </div>
            <p className="text-[var(--text-xs)] text-center text-[var(--foreground-tertiary)] mt-2">
              아래턱 (하악)
            </p>
          </div>

          <p className="text-[var(--text-xs)] text-center text-[var(--foreground-tertiary)] mt-4">
            ← 오른쪽 | 왼쪽 →<br />
            (거울을 보는 방향 기준)
          </p>
        </Card>

        {/* 선택된 치아 정보 */}
        {selectedTooth && (
          <Card className="mb-4 animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[var(--text-base)] font-semibold">
                {getToothName(selectedTooth)}
              </span>
              <span className="px-3 py-1 bg-[var(--color-primary-400)] text-white text-[var(--text-sm)] font-semibold rounded-full">
                #{selectedTooth}
              </span>
            </div>
            <p className="text-[var(--text-sm)] text-[var(--foreground-secondary)] mb-3">
              이 치아에 어떤 증상이 있나요?
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(symptomLabels).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => toggleSymptom(key)}
                  className={`px-3 py-2 rounded-full text-[var(--text-sm)] border-2 transition-colors ${
                    selectedSymptoms.includes(key)
                      ? 'border-[var(--color-primary-400)] bg-[var(--color-primary-50)] text-[var(--color-primary-500)]'
                      : 'border-[var(--color-gray-100)] text-[var(--foreground-secondary)]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" onClick={cancelSelection} className="flex-1">
                취소
              </Button>
              <Button onClick={saveTooth} className="flex-[2]">
                저장하기
              </Button>
            </div>
          </Card>
        )}

        {/* 저장된 치아 목록 */}
        <div className="mt-6">
          <h3 className="text-[var(--text-base)] font-semibold mb-3">📋 기록된 치아</h3>

          {Object.keys(savedTeeth).length === 0 ? (
            <div className="text-center py-10">
              <div className="text-4xl mb-2">🦷</div>
              <p className="text-[var(--foreground-secondary)]">
                아직 기록된 치아가 없어요<br />
                위 맵에서 치아를 선택해보세요
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {Object.entries(savedTeeth).map(([toothNum, symptoms]) => (
                <Card key={toothNum} className="!p-3 flex items-start gap-3">
                  <div className="w-11 h-11 bg-amber-50 rounded-[10px] flex items-center justify-center text-xl flex-shrink-0">
                    🦷
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">
                      {getToothName(parseInt(toothNum))} (#{toothNum})
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {symptoms.map((s) => (
                        <Tag key={s} variant="warning" size="sm">
                          {symptomLabels[s]}
                        </Tag>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTooth(toothNum)}
                    className="p-1 text-[var(--foreground-tertiary)]"
                  >
                    <Icon name="x" size={18} />
                  </button>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* 고지사항 */}
        <div className="mt-6 bg-[var(--color-gray-100)] rounded-[var(--radius-md)] p-4">
          <p className="text-[var(--text-sm)] text-[var(--foreground-tertiary)] text-center">
            ⚠️ 치아 번호는 FDI 국제 표기법을 따릅니다.<br />
            치과 방문 시 증상 설명에 참고해주세요.
          </p>
        </div>
      </main>
    </div>
  );
}
