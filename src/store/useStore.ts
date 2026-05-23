import { create } from "zustand";

interface CardStore {
  selectedIds: number[];
  toggleCard: (id: number) => void;
}

export const useStore = create<CardStore>((set) => ({
  selectedIds: [],
  toggleCard: (id) =>
    set((state) => {
      const isExist = state.selectedIds.includes(id);
      return {
        selectedIds: isExist
          ? state.selectedIds.filter((itemIds) => itemIds !== id)
          : [...state.selectedIds, id],
      };
    }),
}));
