import { create, type StateCreator } from "zustand";
import type { IData } from "../types/types";
interface SelectionSlice {
  selectedCards: IData[];
  toggleCard: (card: IData) => void;
  unselectAll: () => void;
}

const createSelectionSlice: StateCreator<
  SelectionSlice,
  [],
  [],
  SelectionSlice
> = (set) => ({
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
});

export const useStore = create<SelectionSlice>()((...a) => ({
  ...createSelectionSlice(...a),
}));
