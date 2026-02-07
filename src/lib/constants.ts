// ===== 디자인 토큰 상수 =====

export const COLORS = {
  primary: {
    50: '#E6F7F4',
    100: '#B3E8E0',
    200: '#80D9CC',
    300: '#4DCAB8',
    400: '#4AC8B0',
    500: '#3DB9A2',
    600: '#30A08C',
    700: '#238776',
  },
  gray: {
    50: '#F5F7FA',
    100: '#E5E7EB',
    200: '#D1D5DB',
    300: '#9CA3AF',
    400: '#6B7280',
    500: '#4B5563',
    600: '#374151',
    900: '#1A1A1A',
  },
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
} as const;

export const RADIUS = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 14,
  '2xl': 16,
  full: 9999,
} as const;

export const FONT_SIZE = {
  xs: 11,
  sm: 12,
  base: 14,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 24,
} as const;

// ===== 레이아웃 상수 =====
export const LAYOUT = {
  headerHeight: 56,
  tabbarHeight: 60,
  maxWidth: 430,
} as const;

// ===== 로컬스토리지 키 =====
export const STORAGE_KEYS = {
  DIAGNOSIS_DATA: 'dental_diagnosis_data',
  TOOTH_MAP_DATA: 'dental_tooth_map',
  RECORDS: 'dental_records',
  CURRENT_DIAGNOSIS: 'dental_current_diagnosis',
} as const;

// ===== 탭바 네비게이션 =====
export const TAB_ITEMS = [
  { id: 'home', label: '홈', href: '/', icon: 'home' },
  { id: 'search', label: '치과검색', href: '/search', icon: 'search' },
  { id: 'community', label: '커뮤니티', href: '/community', icon: 'users' },
  { id: 'mypage', label: '마이', href: '/mypage', icon: 'user' },
] as const;

// ===== 진단 질문 =====
export const DIAGNOSIS_QUESTIONS = [
  {
    id: 'pain',
    question: '통증이 있으신가요?',
    hint: '현재 느끼는 통증 정도를 선택해주세요',
    type: 'single' as const,
    options: [
      { value: 'pain_none', label: '없어요', desc: '특별한 통증 없음', icon: '😊' },
      { value: 'pain_sometimes', label: '가끔 아파요', desc: '때때로 불편함', icon: '😐' },
      { value: 'pain_always', label: '계속 아파요', desc: '지속적인 통증', icon: '😣' },
    ],
  },
  {
    id: 'pain_when',
    question: '언제 통증이 심해지나요?',
    hint: '해당하는 것을 모두 선택해주세요',
    type: 'multi' as const,
    condition: (answers: Record<string, string | string[]>) => answers.pain !== 'pain_none',
    options: [
      { value: 'pain_cold', label: '찬 것 먹을 때', desc: '찬물, 아이스크림 등', icon: '🧊' },
      { value: 'pain_hot', label: '뜨거운 것 먹을 때', desc: '뜨거운 음료, 국물 등', icon: '🔥' },
      { value: 'pain_chewing', label: '씹을 때', desc: '음식을 씹는 중', icon: '🍖' },
      { value: 'pain_rest', label: '가만히 있어도', desc: '아무것도 안 해도 아픔', icon: '😔' },
    ],
  },
  {
    id: 'gum',
    question: '잇몸 증상이 있으신가요?',
    hint: '해당하는 것을 모두 선택해주세요',
    type: 'multi' as const,
    options: [
      { value: 'gum_bleeding', label: '피가 나요', desc: '양치할 때 출혈', icon: '🩸' },
      { value: 'gum_swelling', label: '붓거나 아파요', desc: '잇몸이 부어오름', icon: '😫' },
      { value: 'gum_smell', label: '냄새가 나요', desc: '구취가 느껴짐', icon: '💨' },
      { value: 'gum_none', label: '없어요', desc: '잇몸은 괜찮음', icon: '👍' },
    ],
  },
  {
    id: 'visual',
    question: '눈에 보이는 변화가 있나요?',
    hint: '해당하는 것을 모두 선택해주세요',
    type: 'multi' as const,
    options: [
      { value: 'discoloration', label: '치아 변색', desc: '검은 점이나 얼룩', icon: '🔍' },
      { value: 'hole_visible', label: '구멍이 보여요', desc: '치아에 구멍', icon: '🕳️' },
      { value: 'loose_tooth', label: '치아가 흔들려요', desc: '움직임이 느껴짐', icon: '↔️' },
      { value: 'visual_none', label: '없어요', desc: '특별한 변화 없음', icon: '✨' },
    ],
  },
  {
    id: 'duration',
    question: '증상이 얼마나 됐나요?',
    hint: '대략적인 기간을 선택해주세요',
    type: 'single' as const,
    options: [
      { value: 'duration_recent', label: '며칠 안 됐어요', desc: '1주일 이내', icon: '📅' },
      { value: 'duration_weeks', label: '몇 주 됐어요', desc: '1~4주 정도', icon: '📆' },
      { value: 'duration_months', label: '꽤 오래됐어요', desc: '한 달 이상', icon: '🗓️' },
    ],
  },
];

// ===== 치료 정보 =====
export const TREATMENT_INFO = {
  scaling: {
    name: '스케일링',
    description: '치석을 제거하여 잇몸 건강을 유지하는 기본 치료입니다',
    duration: '30분~1시간',
    recovery: '당일',
    steps: [
      { title: '준비', pain: 0, description: '입 안을 헹구고 치료 부위를 확인합니다' },
      { title: '치석 제거', pain: 1, description: '초음파 기구로 치석을 제거합니다' },
      { title: '연마', pain: 0, description: '치아 표면을 매끄럽게 정리합니다' },
      { title: '마무리', pain: 0, description: '입안을 깨끗이 헹구고 종료합니다' },
    ],
    tips: ['시술 직후 잠시 시림이 있을 수 있습니다', '6개월마다 정기적으로 받으시면 좋습니다'],
  },
  filling: {
    name: '충치 치료 (레진)',
    description: '충치 부위를 제거하고 레진으로 채우는 치료입니다',
    duration: '30분~1시간',
    recovery: '당일',
    steps: [
      { title: '마취', pain: 1, description: '치료 부위를 마취합니다' },
      { title: '충치 제거', pain: 0, description: '마취 후 충치 부위를 제거합니다' },
      { title: '레진 충전', pain: 0, description: '치아 색깔의 레진을 채웁니다' },
      { title: '경화 및 마무리', pain: 0, description: '광선으로 굳히고 모양을 다듬습니다' },
    ],
    tips: ['마취가 풀릴 때까지 2시간 정도 음식을 삼가세요', '당일은 질긴 음식을 피해주세요'],
  },
  rootCanal: {
    name: '신경치료',
    description: '손상된 치아 신경을 제거하고 치료하는 시술입니다',
    duration: '2~3회 내원',
    recovery: '1~2주',
    steps: [
      { title: '마취', pain: 1, description: '충분한 마취를 진행합니다' },
      { title: '신경 제거', pain: 0, description: '손상된 신경 조직을 제거합니다' },
      { title: '소독', pain: 0, description: '근관 내부를 깨끗이 소독합니다' },
      { title: '충전', pain: 0, description: '근관을 밀봉재로 채웁니다' },
      { title: '보철', pain: 0, description: '크라운 등으로 치아를 보호합니다' },
    ],
    tips: ['치료 중간에 아프면 바로 말씀해주세요', '치료 완료 후 크라운을 씌우면 오래 사용할 수 있습니다'],
  },
  extraction: {
    name: '발치 (이빨 뽑기)',
    description: '치료가 어려운 치아를 뽑는 시술입니다',
    duration: '30분~1시간',
    recovery: '3~7일',
    steps: [
      { title: '마취', pain: 1, description: '발치 부위를 충분히 마취합니다' },
      { title: '치아 분리', pain: 0, description: '치아와 잇몸 사이를 분리합니다' },
      { title: '발치', pain: 1, description: '치아를 흔들어 뽑습니다' },
      { title: '지혈', pain: 0, description: '거즈를 물어 지혈합니다' },
    ],
    tips: ['발치 후 2시간은 거즈를 꼭 물고 계세요', '당일은 뜨거운 음식과 술을 피해주세요', '담배는 최소 3일 삼가세요'],
  },
  implant: {
    name: '임플란트',
    description: '인공 치아 뿌리를 심어 자연 치아처럼 사용하는 시술입니다',
    duration: '3~6개월',
    recovery: '1~2주 (수술 후)',
    steps: [
      { title: '상담 및 검사', pain: 0, description: 'CT 촬영 등으로 뼈 상태를 확인합니다' },
      { title: '식립 (1차 수술)', pain: 2, description: '잇몸을 열고 임플란트를 심습니다' },
      { title: '치유 기간', pain: 0, description: '3~6개월간 뼈와 결합을 기다립니다' },
      { title: '보철 연결', pain: 1, description: '임플란트 위에 인공 치아를 연결합니다' },
    ],
    tips: ['수술 후 부기가 있을 수 있습니다', '치유 기간 동안 해당 부위로 씹지 마세요', '정기 검진이 중요합니다'],
  },
} as const;
