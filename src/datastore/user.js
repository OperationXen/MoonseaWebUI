import create from "zustand";

const userStore = create((set) => ({
  username: "",
  email: "",
  discordID: "",
  dmUUID: "test",
  dmHours: 0,

  setUsername: (newVal) => set((state) => ({ username: newVal })),
  setEmail: (newVal) => set((state) => ({ email: newVal })),
  setDiscordID: (newVal) => set((state) => ({ discordID: newVal })),

  setDMUUID: (newVal) => set((state) => ({ dmUUID: newVal })),
  setDMHours: (newVal) => set((state) => ({ dmHours: newVal })),
}));

export default userStore;
