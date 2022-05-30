import create from "zustand";

const userStore = create((set) => ({
  token: "",
  userID: null,
  dmID: "test",
  username: "",

  setToken: (newVal) => set((state) => ({ token: newVal })),
  setUserID: (newVal) => set((state) => ({ userID: newVal })),
  setDMID: (newVal) => set((state) => ({ dmID: newVal })),
  setUsername: (newVal) => set((state) => ({ username: newVal })),
}));

export default userStore;
