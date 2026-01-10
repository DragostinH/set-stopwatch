import { create } from "zustand";

type State = {
  sets: number;
  sessionStarted: boolean;
  sessionEnded?: boolean;
  sessionStartTime?: number | null;
};

type Actions = {
  startSession: () => void;
  endSession: () => void;
  increaseSets: (by: number) => void;
  setSessionStartTime?: (time: number) => void;
};

const useMainStore = create<State & Actions>((set) => ({
  sets: 0,
  sessionStarted: false,
  sessionEnded: false,
  sessionStartTime: null,
  increaseSets: (by: number) =>
    set((state) => ({ sets: state.sets + by })),

  startSession: () =>
    set((state) => ({
      sessionStarted: state.sessionStarted ? state.sessionStarted : true,
      sessionStartTime: Date.now(),
    })),

  endSession: () =>
    set((state) => ({
      sessionStarted: false,
      sessionEnded: true,
      sessionStartTime: null,
    })),
}));

export { useMainStore };
