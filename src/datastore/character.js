import create from "zustand";

const useCharacterStore = create((set) => ({
  characters: [],
  loading: false,

  setCharacters: (newVal) => set((state) => ({ characters: newVal })),
  setLoading: (newVal) => set((state) => ({ loading: newVal })),
  // request refresh function forces the datamanager to refetch state from the server
  refresh: false,
  requestRefresh: () => set((state) => ({ refresh: !state.refresh })),
}));

export default useCharacterStore;
