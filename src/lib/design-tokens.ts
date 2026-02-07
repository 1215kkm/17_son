/**
 * ===== 디자인 토큰 =====
 *
 * 이 파일에서 앱 전체의 디자인을 한 곳에서 관리합니다.
 * 수정하면 앱 전체에 자동 적용됩니다.
 *
 * 사용법:
 * 1. 아래 값들을 원하는 대로 수정하세요
 * 2. globals.css의 CSS 변수도 함께 수정하세요 (동기화 필요)
 */

// ===== 색상 (COLORS) =====
export const colors = {
  // Primary (메인 브랜드 색상) - 민트/청록 계열
  primary: {
    50: '#E6F7F4',   // 가장 연한 색 (배경용)
    100: '#B3E8E0',
    200: '#80D9CC',
    300: '#4DCAB8',
    400: '#4AC8B0',  // ⭐ 메인 색상
    500: '#3DB9A2',  // ⭐ 메인 색상 (hover)
    600: '#30A08C',  // ⭐ 메인 색상 (active)
    700: '#238776',
  },

  // Gray (회색 계열)
  gray: {
    50: '#F5F7FA',   // ⭐ 배경색
    100: '#E5E7EB',  // 구분선, 비활성 배경
    200: '#D1D5DB',
    300: '#9CA3AF',  // 비활성 텍스트
    400: '#6B7280',  // ⭐ 서브 텍스트
    500: '#4B5563',
    600: '#374151',
    900: '#1A1A1A',  // ⭐ 메인 텍스트
  },

  // Semantic (의미 색상)
  success: '#22C55E',  // 성공, 완료
  warning: '#F59E0B',  // 경고, 주의
  error: '#EF4444',    // 에러, 위험
  info: '#3B82F6',     // 정보

  // 배경
  background: '#F5F7FA',      // 페이지 배경
  backgroundCard: '#FFFFFF',  // 카드 배경

  // 텍스트
  textPrimary: '#1A1A1A',     // 메인 텍스트
  textSecondary: '#6B7280',   // 서브 텍스트
  textTertiary: '#9CA3AF',    // 보조 텍스트
  textWhite: '#FFFFFF',       // 흰색 텍스트
};

// ===== BORDER RADIUS (모서리 둥글기) =====
export const radius = {
  none: 0,
  sm: 6,      // 작은 요소
  md: 8,      // ⭐ 카드, 입력 필드 기본
  lg: 12,     // 큰 카드
  xl: 14,     // ⭐ 버튼 기본
  '2xl': 16,  // 모달
  full: 9999, // 원형 (태그, 뱃지)
};

// ===== 간격 (SPACING) =====
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,      // ⭐ 기본 간격
  xl: 20,      // ⭐ 섹션 padding
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
};

// ===== 폰트 크기 (FONT SIZE) =====
export const fontSize = {
  xs: 11,      // 아주 작은 텍스트
  sm: 12,      // ⭐ 캡션, 라벨
  base: 14,    // ⭐ 본문 기본
  lg: 16,      // ⭐ 서브 타이틀
  xl: 18,
  '2xl': 20,   // ⭐ 타이틀
  '3xl': 24,   // 큰 타이틀
  '4xl': 28,
};

// ===== 폰트 굵기 (FONT WEIGHT) =====
export const fontWeight = {
  normal: 400,    // 본문
  medium: 500,    // 강조
  semibold: 600,  // ⭐ 서브타이틀
  bold: 700,      // 타이틀
};

// ===== 줄 높이 (LINE HEIGHT) =====
export const lineHeight = {
  tight: 1.25,    // 타이틀
  normal: 1.5,    // ⭐ 본문 기본
  relaxed: 1.625, // 긴 텍스트
};

// ===== 그림자 (SHADOW) =====
export const shadow = {
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  card: '0 2px 8px rgba(0, 0, 0, 0.08)', // ⭐ 카드 기본
};

// ===== 레이아웃 크기 =====
export const layout = {
  headerHeight: 56,     // 헤더 높이
  tabbarHeight: 60,     // 탭바 높이
  maxWidth: 430,        // 앱 최대 너비
  contentPadding: 20,   // 콘텐츠 좌우 패딩
};

// ===== 애니메이션 =====
export const animation = {
  fast: '0.15s',
  normal: '0.25s',
  slow: '0.4s',
  easing: 'ease-out',
};

// ===== 활성화/비활성화 상태 =====
export const state = {
  // 버튼 활성화
  buttonActive: {
    background: colors.primary[400],
    text: colors.textWhite,
  },
  // 버튼 비활성화
  buttonDisabled: {
    background: colors.gray[200],
    text: colors.gray[400],
  },
  // 탭 활성화
  tabActive: {
    color: colors.primary[400],
  },
  // 탭 비활성화
  tabInactive: {
    color: colors.gray[400],
  },
  // 입력 필드 포커스
  inputFocus: {
    border: colors.primary[400],
  },
  // 입력 필드 기본
  inputDefault: {
    border: colors.gray[100],
  },
};

// ===== CSS 변수 문자열 (globals.css 동기화용) =====
export const cssVariables = `
:root {
  /* Primary Colors */
  --color-primary-50: ${colors.primary[50]};
  --color-primary-100: ${colors.primary[100]};
  --color-primary-200: ${colors.primary[200]};
  --color-primary-300: ${colors.primary[300]};
  --color-primary-400: ${colors.primary[400]};
  --color-primary-500: ${colors.primary[500]};
  --color-primary-600: ${colors.primary[600]};
  --color-primary-700: ${colors.primary[700]};

  /* Gray Colors */
  --color-gray-50: ${colors.gray[50]};
  --color-gray-100: ${colors.gray[100]};
  --color-gray-200: ${colors.gray[200]};
  --color-gray-300: ${colors.gray[300]};
  --color-gray-400: ${colors.gray[400]};
  --color-gray-500: ${colors.gray[500]};
  --color-gray-600: ${colors.gray[600]};
  --color-gray-900: ${colors.gray[900]};

  /* Semantic Colors */
  --color-success: ${colors.success};
  --color-warning: ${colors.warning};
  --color-error: ${colors.error};
  --color-info: ${colors.info};

  /* Background & Foreground */
  --background: ${colors.background};
  --background-card: ${colors.backgroundCard};
  --foreground: ${colors.textPrimary};
  --foreground-secondary: ${colors.textSecondary};
  --foreground-tertiary: ${colors.textTertiary};

  /* Spacing */
  --spacing-xs: ${spacing.xs}px;
  --spacing-sm: ${spacing.sm}px;
  --spacing-md: ${spacing.md}px;
  --spacing-lg: ${spacing.lg}px;
  --spacing-xl: ${spacing.xl}px;
  --spacing-2xl: ${spacing['2xl']}px;
  --spacing-3xl: ${spacing['3xl']}px;

  /* Layout */
  --header-height: ${layout.headerHeight}px;
  --tabbar-height: ${layout.tabbarHeight}px;

  /* Border Radius */
  --radius-sm: ${radius.sm}px;
  --radius-md: ${radius.md}px;
  --radius-lg: ${radius.lg}px;
  --radius-xl: ${radius.xl}px;
  --radius-2xl: ${radius['2xl']}px;
  --radius-full: ${radius.full}px;

  /* Shadow */
  --shadow-sm: ${shadow.sm};
  --shadow-md: ${shadow.md};
  --shadow-lg: ${shadow.lg};
  --shadow-card: ${shadow.card};

  /* Typography */
  --text-xs: ${fontSize.xs}px;
  --text-sm: ${fontSize.sm}px;
  --text-base: ${fontSize.base}px;
  --text-lg: ${fontSize.lg}px;
  --text-xl: ${fontSize.xl}px;
  --text-2xl: ${fontSize['2xl']}px;
  --text-3xl: ${fontSize['3xl']}px;

  --font-normal: ${fontWeight.normal};
  --font-medium: ${fontWeight.medium};
  --font-semibold: ${fontWeight.semibold};
  --font-bold: ${fontWeight.bold};
}
`;

// ===== 타입 정의 =====
export type ColorKey = keyof typeof colors;
export type SpacingKey = keyof typeof spacing;
export type RadiusKey = keyof typeof radius;
export type FontSizeKey = keyof typeof fontSize;
