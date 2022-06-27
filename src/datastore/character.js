import create from "zustand";

const useCharacterStore = create((set) => ({
  uuid: "",
  editable: false,

  name: "Meepo",
  artwork: "",
  token: "",
  sheet: "",
  season: "",
  race: "",
  level: 10,
  ac: 15,
  hp: 62,
  pp: 11,
  dc: 18,
  vision: "",
  biography: "",
  dm_text: "",
  classes: [],

  gold: 0.0,
  downtime: 0.0,
  items: [],

  setName: (newVal) => set((state) => ({ name: newVal })),
  setArtwork: (newVal) => set((state) => ({ artwork: newVal })),
  setToken: (newVal) => set((state) => ({ token: newVal })),
  setSheet: (newVal) => set((state) => ({ sheet: newVal })),
  setSeason: (newVal) => set((state) => ({ season: newVal })),
  setRace: (newVal) => set((state) => ({ race: newVal })),
  setLevel: (newVal) => set((state) => ({ level: newVal })),
  setAC: (newVal) => set((state) => ({ ac: newVal })),
  setHP: (newVal) => set((state) => ({ hp: newVal })),
  setPP: (newVal) => set((state) => ({ pp: newVal })),
  setDC: (newVal) => set((state) => ({ dc: newVal })),
  setVision: (newVal) => set((state) => ({ vision: newVal })),
  setBiography: (newVal) => set((state) => ({ biography: newVal })),
  setDMText: (newVal) => set((state) => ({ dm_text: newVal })),
  setClasses: (newVal) => set((state) => ({ classes: newVal })),

  setGold: (newVal) => set((state) => ({ gold: newVal })),
  setDowntime: (newVal) => set((state) => ({ downtime: newVal })),
  setItems: (newVal) => set((state) => ({ items: newVal })),

  refresh: 0,
  requestRefresh: () => set((state) => ({ refresh: state.refresh + 1 })),

  setAll: (newVal) => set((state) => ({ ...newVal })),
}));

export default useCharacterStore;
