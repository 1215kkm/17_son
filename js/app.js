/* ===== 치과 자가진단 앱 - 메인 JavaScript ===== */

// 로컬 스토리지 키
const STORAGE_KEYS = {
  DIAGNOSIS_DATA: 'dental_diagnosis_data',
  TOOTH_MAP_DATA: 'dental_tooth_map',
  RECORDS: 'dental_records',
  CURRENT_DIAGNOSIS: 'dental_current_diagnosis'
};

// ===== 유틸리티 함수 =====
const utils = {
  // 로컬 스토리지 저장
  saveData(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('저장 실패:', e);
    }
  },

  // 로컬 스토리지 불러오기
  loadData(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('불러오기 실패:', e);
      return null;
    }
  },

  // 날짜 포맷팅
  formatDate(date) {
    const d = new Date(date);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  },

  // 페이지 이동
  goTo(url) {
    window.location.href = url;
  },

  // 뒤로가기
  goBack() {
    window.history.back();
  }
};

// ===== 진단 로직 (룰 기반) =====
const diagnosisRules = {
  // 증상 점수 가중치
  weights: {
    // 통증 관련
    pain_none: 0,
    pain_sometimes: 2,
    pain_always: 4,

    // 통증 시기
    pain_cold: 2,
    pain_hot: 3,
    pain_chewing: 3,
    pain_rest: 4,

    // 잇몸 증상
    gum_bleeding: 2,
    gum_swelling: 3,
    gum_smell: 2,
    gum_none: 0,

    // 기타 증상
    sensitivity: 2,
    discoloration: 2,
    hole_visible: 4,
    loose_tooth: 4
  },

  // 진단 결과 계산
  calculateResult(answers) {
    let totalScore = 0;
    let symptoms = [];

    // 점수 계산
    for (const [key, value] of Object.entries(answers)) {
      if (Array.isArray(value)) {
        value.forEach(v => {
          totalScore += this.weights[v] || 0;
          if (this.weights[v] > 0) symptoms.push(v);
        });
      } else {
        totalScore += this.weights[value] || 0;
        if (this.weights[value] > 0) symptoms.push(value);
      }
    }

    // 위험도 판정
    let riskLevel, riskText, recommendations;

    if (totalScore <= 3) {
      riskLevel = 'low';
      riskText = '양호한 상태';
      recommendations = [
        '현재 특별한 문제가 없어 보입니다',
        '정기적인 스케일링을 권장합니다',
        '올바른 칫솔질을 유지해주세요'
      ];
    } else if (totalScore <= 7) {
      riskLevel = 'medium';
      riskText = '관찰 필요';
      recommendations = [
        '가벼운 증상이 있을 수 있습니다',
        '2주 내 치과 방문을 권장합니다',
        '증상이 심해지면 빠르게 내원해주세요'
      ];
    } else {
      riskLevel = 'high';
      riskText = '방문 권장';
      recommendations = [
        '치과 방문이 필요해 보입니다',
        '가능한 빨리 검진받으시길 권장합니다',
        '자가 치료는 피해주세요'
      ];
    }

    // 가능한 상태 추론
    const possibleConditions = this.inferConditions(symptoms);

    return {
      score: totalScore,
      riskLevel,
      riskText,
      recommendations,
      possibleConditions,
      symptoms
    };
  },

  // 증상 기반 상태 추론
  inferConditions(symptoms) {
    const conditions = [];

    // 충치 가능성
    if (symptoms.includes('pain_cold') || symptoms.includes('hole_visible') || symptoms.includes('discoloration')) {
      conditions.push({
        name: '충치 가능성',
        description: '찬 것에 시리거나 변색이 있다면 충치일 수 있습니다'
      });
    }

    // 잇몸 질환 가능성
    if (symptoms.includes('gum_bleeding') || symptoms.includes('gum_swelling') || symptoms.includes('gum_smell')) {
      conditions.push({
        name: '잇몸 염증 가능성',
        description: '잇몸 출혈이나 붓기는 치은염의 신호일 수 있습니다'
      });
    }

    // 신경 문제 가능성
    if (symptoms.includes('pain_rest') || symptoms.includes('pain_hot')) {
      conditions.push({
        name: '신경 문제 가능성',
        description: '가만히 있어도 아프다면 신경치료가 필요할 수 있습니다'
      });
    }

    // 치아 손상 가능성
    if (symptoms.includes('pain_chewing') || symptoms.includes('loose_tooth')) {
      conditions.push({
        name: '치아 손상 가능성',
        description: '씹을 때 통증이나 흔들림이 있다면 검진이 필요합니다'
      });
    }

    if (conditions.length === 0) {
      conditions.push({
        name: '특별한 이상 없음',
        description: '현재 입력된 정보로는 특이사항이 없습니다'
      });
    }

    return conditions;
  }
};

// ===== 치아 맵 데이터 =====
const toothMapData = {
  // 상악 (위턱) 치아 번호
  upper: {
    right: [18, 17, 16, 15, 14, 13, 12, 11],
    left: [21, 22, 23, 24, 25, 26, 27, 28]
  },
  // 하악 (아래턱) 치아 번호
  lower: {
    right: [48, 47, 46, 45, 44, 43, 42, 41],
    left: [31, 32, 33, 34, 35, 36, 37, 38]
  },

  // 치아 타입
  getToothType(num) {
    const lastDigit = num % 10;
    if (lastDigit >= 6 || lastDigit === 8) return 'molar'; // 어금니
    if (lastDigit >= 4) return 'premolar'; // 작은어금니
    if (lastDigit === 3) return 'canine'; // 송곳니
    return 'incisor'; // 앞니
  },

  // 치아 이름
  getToothName(num) {
    const types = {
      molar: '어금니',
      premolar: '작은어금니',
      canine: '송곳니',
      incisor: '앞니'
    };
    const type = this.getToothType(num);
    const isUpper = num < 40;
    const isRight = [1, 4].includes(Math.floor(num / 10));

    return `${isUpper ? '위' : '아래'} ${isRight ? '오른쪽' : '왼쪽'} ${types[type]}`;
  }
};

// ===== 치료 정보 데이터 =====
const treatmentInfo = {
  scaling: {
    name: '스케일링',
    description: '치석을 제거하여 잇몸 건강을 유지하는 기본 치료입니다',
    steps: [
      { title: '준비', pain: 0, description: '입 안을 헹구고 치료 부위를 확인합니다' },
      { title: '치석 제거', pain: 1, description: '초음파 기구로 치석을 제거합니다' },
      { title: '연마', pain: 0, description: '치아 표면을 매끄럽게 정리합니다' },
      { title: '마무리', pain: 0, description: '입안을 깨끗이 헹구고 종료합니다' }
    ],
    duration: '30분~1시간',
    recovery: '당일',
    tips: ['시술 직후 잠시 시림이 있을 수 있습니다', '6개월마다 정기적으로 받으시면 좋습니다']
  },
  filling: {
    name: '충치 치료 (레진)',
    description: '충치 부위를 제거하고 레진으로 채우는 치료입니다',
    steps: [
      { title: '마취', pain: 1, description: '치료 부위를 마취합니다' },
      { title: '충치 제거', pain: 0, description: '마취 후 충치 부위를 제거합니다' },
      { title: '레진 충전', pain: 0, description: '치아 색깔의 레진을 채웁니다' },
      { title: '경화 및 마무리', pain: 0, description: '광선으로 굳히고 모양을 다듬습니다' }
    ],
    duration: '30분~1시간',
    recovery: '당일',
    tips: ['마취가 풀릴 때까지 2시간 정도 음식을 삼가세요', '당일은 질긴 음식을 피해주세요']
  },
  rootCanal: {
    name: '신경치료',
    description: '손상된 치아 신경을 제거하고 치료하는 시술입니다',
    steps: [
      { title: '마취', pain: 1, description: '충분한 마취를 진행합니다' },
      { title: '신경 제거', pain: 0, description: '손상된 신경 조직을 제거합니다' },
      { title: '소독', pain: 0, description: '근관 내부를 깨끗이 소독합니다' },
      { title: '충전', pain: 0, description: '근관을 밀봉재로 채웁니다' },
      { title: '보철', pain: 0, description: '크라운 등으로 치아를 보호합니다' }
    ],
    duration: '2~3회 내원',
    recovery: '1~2주',
    tips: ['치료 중간에 아프면 바로 말씀해주세요', '치료 완료 후 크라운을 씌우면 오래 사용할 수 있습니다']
  },
  extraction: {
    name: '발치 (이빨 뽑기)',
    description: '치료가 어려운 치아를 뽑는 시술입니다',
    steps: [
      { title: '마취', pain: 1, description: '발치 부위를 충분히 마취합니다' },
      { title: '치아 분리', pain: 0, description: '치아와 잇몸 사이를 분리합니다' },
      { title: '발치', pain: 1, description: '치아를 흔들어 뽑습니다' },
      { title: '지혈', pain: 0, description: '거즈를 물어 지혈합니다' }
    ],
    duration: '30분~1시간',
    recovery: '3~7일',
    tips: ['발치 후 2시간은 거즈를 꼭 물고 계세요', '당일은 뜨거운 음식과 술을 피해주세요', '담배는 최소 3일 삼가세요']
  },
  implant: {
    name: '임플란트',
    description: '인공 치아 뿌리를 심어 자연 치아처럼 사용하는 시술입니다',
    steps: [
      { title: '상담 및 검사', pain: 0, description: 'CT 촬영 등으로 뼈 상태를 확인합니다' },
      { title: '식립 (1차 수술)', pain: 2, description: '잇몸을 열고 임플란트를 심습니다' },
      { title: '치유 기간', pain: 0, description: '3~6개월간 뼈와 결합을 기다립니다' },
      { title: '보철 연결', pain: 1, description: '임플란트 위에 인공 치아를 연결합니다' }
    ],
    duration: '3~6개월',
    recovery: '1~2주 (수술 후)',
    tips: ['수술 후 부기가 있을 수 있습니다', '치유 기간 동안 해당 부위로 씹지 마세요', '정기 검진이 중요합니다']
  }
};

// ===== 방문 기록 관리 =====
const recordManager = {
  // 기록 불러오기
  getRecords() {
    return utils.loadData(STORAGE_KEYS.RECORDS) || [];
  },

  // 기록 추가
  addRecord(record) {
    const records = this.getRecords();
    record.id = Date.now();
    record.date = record.date || new Date().toISOString();
    records.unshift(record);
    utils.saveData(STORAGE_KEYS.RECORDS, records);
    return record;
  },

  // 기록 삭제
  deleteRecord(id) {
    const records = this.getRecords();
    const filtered = records.filter(r => r.id !== id);
    utils.saveData(STORAGE_KEYS.RECORDS, filtered);
  },

  // 다음 방문 계산
  getNextVisitRecommendation(lastVisit) {
    if (!lastVisit) return null;

    const last = new Date(lastVisit.date);
    const sixMonthsLater = new Date(last);
    sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

    return {
      date: sixMonthsLater,
      reason: '정기 스케일링 권장'
    };
  }
};

// ===== 페이지 초기화 함수들 =====
const pageInit = {
  // 메인 페이지
  main() {
    // 최근 진단 결과 표시
    const lastResult = utils.loadData(STORAGE_KEYS.CURRENT_DIAGNOSIS);
    if (lastResult) {
      const summaryEl = document.getElementById('last-diagnosis-summary');
      if (summaryEl) {
        summaryEl.innerHTML = `
          <div class="text-sm">최근 상태: ${lastResult.riskText}</div>
        `;
      }
    }
  },

  // 진단 페이지
  diagnosis() {
    // 진단 로직 초기화는 diagnosis.html에서 처리
  },

  // 결과 페이지
  result() {
    const resultData = utils.loadData(STORAGE_KEYS.CURRENT_DIAGNOSIS);
    if (!resultData) {
      utils.goTo('diagnosis.html');
      return;
    }

    // 결과 표시 로직은 result.html에서 처리
    return resultData;
  }
};

// ===== 전역 이벤트 리스너 =====
document.addEventListener('DOMContentLoaded', () => {
  // 뒤로가기 버튼
  const backBtns = document.querySelectorAll('.header-back');
  backBtns.forEach(btn => {
    btn.addEventListener('click', utils.goBack);
  });

  // 페이드인 애니메이션
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach((el, i) => {
    el.style.opacity = '0';
    setTimeout(() => {
      el.style.opacity = '1';
    }, i * 100);
  });
});

// 모듈 내보내기 (ES6 모듈 사용 시)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    utils,
    diagnosisRules,
    toothMapData,
    treatmentInfo,
    recordManager,
    pageInit,
    STORAGE_KEYS
  };
}
