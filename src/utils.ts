export type Category = '연인' | '친구' | '사업';

const CATEGORY_SALT: Record<Category, number> = {
  '연인': 7,
  '친구': 3,
  '사업': 1,
};

export function calculateScore(nameA: string, nameB: string, category: Category): number {
  const combined = nameA + nameB;
  let sum = 0;
  for (let i = 0; i < combined.length; i++) {
    sum += combined.charCodeAt(i);
  }
  const raw = (sum + CATEGORY_SALT[category]) % 11;
  if (raw <= 5 && Math.random() < 0.5) {
    return Math.floor(Math.random() * 4) + 7; // 7~10 랜덤
  }
  return raw;
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
