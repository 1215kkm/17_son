'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout';
import { Button, Card, Tag } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import { STORAGE_KEYS } from '@/lib/constants';

interface VisitRecord {
  id: number;
  date: string;
  treatments: string[];
  area?: string;
  memo?: string;
}

const treatmentLabels: { [key: string]: string } = {
  scaling: '스케일링',
  checkup: '정기검진',
  filling: '충치치료',
  rootcanal: '신경치료',
  extraction: '발치',
  implant: '임플란트',
  crown: '크라운',
  other: '기타',
};

export default function RecordsPage() {
  const [records, setRecords] = useState<VisitRecord[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    treatments: [] as string[],
    area: '',
    memo: '',
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.RECORDS);
    if (stored) {
      setRecords(JSON.parse(stored));
    }
  }, []);

  const saveRecords = (newRecords: VisitRecord[]) => {
    localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(newRecords));
    setRecords(newRecords);
  };

  const handleSubmit = () => {
    if (formData.treatments.length === 0) {
      alert('치료 종류를 선택해주세요');
      return;
    }

    const newRecord: VisitRecord = {
      id: Date.now(),
      date: formData.date,
      treatments: formData.treatments,
      area: formData.area || undefined,
      memo: formData.memo || undefined,
    };

    saveRecords([newRecord, ...records]);
    setShowModal(false);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      treatments: [],
      area: '',
      memo: '',
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('이 기록을 삭제할까요?')) {
      saveRecords(records.filter((r) => r.id !== id));
    }
  };

  const toggleTreatment = (treatment: string) => {
    setFormData((prev) => ({
      ...prev,
      treatments: prev.treatments.includes(treatment)
        ? prev.treatments.filter((t) => t !== treatment)
        : [...prev.treatments, treatment],
    }));
  };

  // 다음 방문 추천 계산
  const getNextVisit = () => {
    if (records.length === 0) return null;
    const lastDate = new Date(records[0].date);
    lastDate.setMonth(lastDate.getMonth() + 6);
    return lastDate;
  };

  const nextVisit = getNextVisit();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header title="방문 기록" />

      <main className="pt-[var(--header-height)] px-5 pb-24">
        {/* 페이지 헤더 */}
        <div className="py-4">
          <h1 className="text-[var(--text-2xl)] font-bold">내 치과 기록</h1>
          <p className="text-[var(--foreground-secondary)] mt-1">
            치과 방문 기록을 관리하고 다음 일정을 확인하세요
          </p>
        </div>

        {/* 다음 방문 추천 */}
        {nextVisit && (
          <Card className="!p-4 bg-gradient-to-r from-[var(--color-primary-400)] to-[var(--color-primary-300)] border-none mb-4">
            <p className="text-[var(--text-sm)] text-white/80">📅 다음 방문 추천</p>
            <p className="text-[var(--text-lg)] font-bold text-white mt-1">
              {nextVisit.toLocaleDateString('ko-KR')}
            </p>
            <p className="text-[var(--text-sm)] text-white/80">정기 스케일링 권장</p>
          </Card>
        )}

        {/* 기록 목록 */}
        {records.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="text-[var(--text-lg)] font-semibold mb-1">아직 기록이 없어요</h3>
            <p className="text-[var(--foreground-secondary)]">
              치과 방문 후 기록을 남겨두면<br />
              다음 방문 시기를 알려드려요
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {records.map((record) => (
              <Card key={record.id} className="relative">
                <button
                  onClick={() => handleDelete(record.id)}
                  className="absolute top-3 right-3 p-1 text-[var(--foreground-tertiary)]"
                >
                  <Icon name="x" size={18} />
                </button>

                <p className="text-[var(--text-sm)] text-[var(--color-primary-400)] font-semibold">
                  {new Date(record.date).toLocaleDateString('ko-KR')}
                </p>
                <p className="text-[var(--text-base)] font-semibold mt-1">
                  {record.treatments.map((t) => treatmentLabels[t]).join(', ')}
                </p>

                {record.area && (
                  <p className="text-[var(--text-sm)] text-[var(--foreground-secondary)] mt-2">
                    📍 {record.area}
                  </p>
                )}
                {record.memo && (
                  <p className="text-[var(--text-sm)] text-[var(--foreground-secondary)] mt-1">
                    💬 {record.memo}
                  </p>
                )}

                <div className="flex flex-wrap gap-1 mt-3">
                  {record.treatments.map((t) => (
                    <Tag key={t} variant="primary" size="sm">
                      {treatmentLabels[t]}
                    </Tag>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* FAB */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-24 right-5 w-14 h-14 bg-[var(--color-primary-400)] text-white rounded-full shadow-lg flex items-center justify-center text-2xl"
      >
        <Icon name="plus" size={24} color="white" />
      </button>

      {/* 모달 */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white w-full max-w-[430px] rounded-t-[20px] p-5 pb-8 animate-slide-up max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[var(--text-lg)] font-bold">방문 기록 추가</h2>
              <button onClick={() => setShowModal(false)} className="text-[var(--foreground-tertiary)]">
                <Icon name="x" size={24} />
              </button>
            </div>

            {/* 날짜 */}
            <div className="mb-5">
              <label className="block text-[var(--text-sm)] font-semibold mb-2">방문 날짜</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-3 border-2 border-[var(--color-gray-100)] rounded-[var(--radius-md)] text-[var(--text-base)]"
              />
            </div>

            {/* 치료 종류 */}
            <div className="mb-5">
              <label className="block text-[var(--text-sm)] font-semibold mb-2">치료 종류</label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(treatmentLabels).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => toggleTreatment(key)}
                    className={`px-3 py-2 rounded-full text-[var(--text-sm)] border-2 transition-colors ${
                      formData.treatments.includes(key)
                        ? 'border-[var(--color-primary-400)] bg-[var(--color-primary-50)] text-[var(--color-primary-500)]'
                        : 'border-[var(--color-gray-100)] text-[var(--foreground-secondary)]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* 치료 부위 */}
            <div className="mb-5">
              <label className="block text-[var(--text-sm)] font-semibold mb-2">
                치료 부위 (선택)
              </label>
              <input
                type="text"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                placeholder="예: 왼쪽 아래 어금니"
                className="w-full p-3 border-2 border-[var(--color-gray-100)] rounded-[var(--radius-md)] text-[var(--text-base)]"
              />
            </div>

            {/* 메모 */}
            <div className="mb-6">
              <label className="block text-[var(--text-sm)] font-semibold mb-2">메모</label>
              <textarea
                value={formData.memo}
                onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
                placeholder="치료 내용이나 주의사항을 적어주세요"
                rows={3}
                className="w-full p-3 border-2 border-[var(--color-gray-100)] rounded-[var(--radius-md)] text-[var(--text-base)] resize-none"
              />
            </div>

            <Button fullWidth onClick={handleSubmit}>
              저장하기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
