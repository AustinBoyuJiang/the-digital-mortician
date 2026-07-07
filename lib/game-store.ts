import { create } from 'zustand';

export type GameStage = 0 | 1 | 2 | 3 | 4;

export type Ending = 'truth' | 'compliance' | 'terminated' | null;

interface GameState {
  gameStage: GameStage;
  isGlitching: boolean;
  openWindows: string[];
  countdown: number;
  ending: Ending;
  decryptAttempted: boolean;
  activeWindow: string | null;
  setGameStage: (stage: GameStage) => void;
  setGlitching: (glitching: boolean) => void;
  openWindow: (windowId: string) => void;
  closeWindow: (windowId: string) => void;
  setCountdown: (count: number) => void;
  setEnding: (ending: Ending) => void;
  setDecryptAttempted: (attempted: boolean) => void;
  setActiveWindow: (windowId: string | null) => void;
}

export const useGameStore = create<GameState>((set) => ({
  gameStage: 0,
  isGlitching: false,
  openWindows: [],
  countdown: 120,
  ending: null,
  decryptAttempted: false,
  activeWindow: null,
  setGameStage: (stage) => set({ gameStage: stage }),
  setGlitching: (glitching) => set({ isGlitching: glitching }),
  openWindow: (windowId) =>
    set((state) => ({
      openWindows: state.openWindows.includes(windowId)
        ? state.openWindows
        : [...state.openWindows, windowId],
      activeWindow: windowId,
    })),
  closeWindow: (windowId) =>
    set((state) => ({
      openWindows: state.openWindows.filter((id) => id !== windowId),
      activeWindow: state.activeWindow === windowId ? null : state.activeWindow,
    })),
  setCountdown: (count) => set({ countdown: count }),
  setEnding: (ending) => set({ ending }),
  setDecryptAttempted: (attempted) => set({ decryptAttempted: attempted }),
  setActiveWindow: (windowId) => set({ activeWindow: windowId }),
}));
