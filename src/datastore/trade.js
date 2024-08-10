import { create } from "zustand";

const useTradeStore = create((set) => ({
  adverts: [],
  setAdverts: (newVal) => set((state) => ({ adverts: newVal })),

  refresh: 0,
  requestRefresh: () => set((state) => ({ refresh: state.refresh + 1 })),
}));

export default useTradeStore;
