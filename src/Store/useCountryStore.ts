import { create } from 'zustand';
import type { FormState } from '../types/types';

export const useCountryStore = create<FormState>((set) => ({
  list: [
    'Italy',
    'Spain',
    'Poland',
    'USA',
    'Canada',
    'Ukraine',
    'Germany',
    'Kazakhstan',
    'United Kingdom',
    'France',
  ],
  cards: [],
  addCard: (newCard) =>
    set((state) => ({
      cards: [...state.cards, newCard],
    })),
}));
