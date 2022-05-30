import create from "zustand";

const userStore = create((set) => ({
  userID: null,
  dmID: "test",
  username: "",

  setUserID: (newVal) => set((state) => ({ userID: newVal })),
  setDMID: (newVal) => set((state) => ({ dmID: newVal })),
  setUsername: (newVal) => set((state) => ({ username: newVal })),
}));

export default userStore;
