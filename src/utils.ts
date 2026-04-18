export type Category = '연인' | '친구' | '사업';

const CATEGORY_SALT: Record<Category, number> = {
  '연인': 7,
  '친구': 3,
  '사업': 1,
};

// 0~10 균등 분포 → 높은 점수 쪽으로 치우친 분포로 리매핑
// 결과: 3(9%), 5(9%), 6(18%), 7(18%), 8(18%), 9(18%), 10(9%)
// ≤6 비중 약 36%, ≥7 비중 약 64% (3.5 : 6.5)
const SCORE_MAP = [3, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10] as const;

export function calculateScore(nameA: string, nameB: string, category: Category): number {
  const combined = nameA + nameB;
  let sum = 0;
  for (let i = 0; i < combined.length; i++) {
    sum += combined.charCodeAt(i);
  }
  const raw = (sum + CATEGORY_SALT[category]) % 11;
  return SCORE_MAP[raw];
}

export function getResultInfo(score: number): { text: string; colorClass: string } {
  if (score <= 3) return { text: '조금 더 노력이 필요해요', colorClass: 'result-low' };
  if (score <= 6) return { text: '무난하고 평범한 사이', colorClass: 'result-mid' };
  return { text: '하늘이 내린 찰떡궁합!', colorClass: 'result-high' };
}

export const CATEGORY_ICON: Record<Category, string> = {
  '연인': '❤️',
  '친구': '🤝',
  '사업': '💼',
};

export const CATEGORIES: Category[] = ['연인', '친구', '사업'];
