import { create } from "zustand";

export const TICKER_MESSAGES = [
  "GATEWAY: CONNECTED",
  "BUFFER: 99.4% WEIRD",
  "RAM: 64MB OK",
  "VIBE: PEAK 1998",
  "DOWNLOADING MORE RAM… 4%",
  "VIBE DRIVERS UP TO DATE",
  "3 GHOSTS ONLINE",
  "DEFRAGMENTING DAYDREAMS…",
  "SIGNAL FOUND AT 432.89 MHz",
  "SNACKS.SYS RUNNING",
];

interface TickerStore { index: number; next: () => void }

export const useTickerStore = create<TickerStore>((set, get) => ({
  index: 0,
  next: () => set({ index: (get().index + 1) % TICKER_MESSAGES.length }),
}));
