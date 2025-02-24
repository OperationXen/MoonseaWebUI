import { create } from "zustand";

import type { Advert } from "@/types/trade";

type TradeStore = {
  adverts: Advert[];
  setAdverts: (x: Advert[]) => void;

  refresh: number;
  requestRefresh: () => void;
};

const useTradeStore = create<TradeStore>((set) => ({
  adverts: [],
  setAdverts: (newVal) => set((_state) => ({ adverts: newVal })),

  refresh: 0,
  requestRefresh: () => set((state) => ({ refresh: state.refresh + 1 })),
}));

export default useTradeStore;
