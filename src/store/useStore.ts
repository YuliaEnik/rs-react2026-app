import { create } from "zustand";
import type { IData } from "../types/types";

interface CardStore {
  selectedCards: IData[];
  toggleCard: (card: IData) => void;
  unselectAll: () => void;
}

export const useStore = create<CardStore>((set) => ({
  selectedCards: [],
  toggleCard: (card) =>
    set((state) => {
      const isExist = state.selectedCards.some((item) => item.id === card.id);
      return {
        selectedCards: isExist
          ? state.selectedCards.filter((item) => item.id !== card.id)
          : [...state.selectedCards, card],
      };
    }),
  unselectAll: () => set({ selectedCards: [] }),
}));
