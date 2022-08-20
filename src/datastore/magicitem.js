import create from "zustand";

const useMagicItemStore = create((set) => ({
  refresh: 0,
  requestRefresh: () => set((state) => ({ refresh: state.refresh + 1 })),
}));

export default useMagicItemStore;
