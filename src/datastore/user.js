import create from "zustand";

const userStore = create((set) => ({
  authenticated: false,
  username: "",
  email: "",
  discordID: "",
  dmUUID: "",
  dmHours: 0,

  setAuthenticated: (newVal) => set((state) => ({ authenticated: newVal })),
  setUsername: (newVal) => set((state) => ({ username: newVal })),
  setEmail: (newVal) => set((state) => ({ email: newVal })),
  setDiscordID: (newVal) => set((state) => ({ discordID: newVal })),

  setDMUUID: (newVal) => set((state) => ({ dmUUID: newVal })),
  setDMHours: (newVal) => set((state) => ({ dmHours: newVal })),
}));

export default userStore;
