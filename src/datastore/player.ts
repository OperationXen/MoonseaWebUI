import { create } from "zustand";

const usePlayerStore = create((set) => ({
  characters: [],
  loading: false,

  setCharacters: (newVal) => set((state) => ({ characters: newVal })),
  setLoading: (newVal) => set((state) => ({ loading: newVal })),
  // request refresh function forces the datamanager to refetch state from the server
  refresh: 1,
  requestRefresh: () =>
    set((state) => {
      return { refresh: state.refresh + 1 };
    }),
}));

export default usePlayerStore;
