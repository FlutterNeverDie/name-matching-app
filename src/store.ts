import { create } from 'zustand';
import type { Category } from './utils';

type Stage = 'input' | 'result';

interface AppState {
  isIntro: boolean;
  nameA: string;
  nameB: string;
  category: Category;
  stage: Stage;
  shouldFocusNameB: boolean;

  startApp: () => void;
  setNameA: (name: string) => void;
  setNameB: (name: string) => void;
  setCategory: (category: Category) => void;
  showResult: () => void;
  tryAnother: () => void;
  resetAll: () => void;
  clearFocusFlag: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isIntro: true,
  nameA: '',
  nameB: '',
  category: '연인',
  stage: 'input',
  shouldFocusNameB: false,

  startApp: () => set({ isIntro: false }),

  setNameA: (name) => set({ nameA: name.slice(0, 15) }),
  setNameB: (name) => set({ nameB: name.slice(0, 15) }),
  setCategory: (category) => set({ category }),
  showResult: () => set({ stage: 'result' }),
  tryAnother: () => set({ nameB: '', stage: 'input', shouldFocusNameB: true }),
  resetAll: () => set({ nameA: '', nameB: '', category: '연인', stage: 'input', shouldFocusNameB: false }),
  clearFocusFlag: () => set({ shouldFocusNameB: false }),
}));
