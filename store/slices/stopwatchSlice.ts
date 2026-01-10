import { create } from "zustand";

type State = {
  elapsed: number;
  startTime: number | null;
  isRunning: boolean;
};

type Actions = {
  start: (time: number) => void;
  stop: () => void;
  reset: () => void;
};

const useStopwatchSlice = create<State & Actions>((set, get) => ({
  elapsed: 0,
  startTime: null,
  isRunning: false,
  start() {
    set({
      isRunning: true,
      startTime: Date.now() - get().elapsed,
    });
  },
  stop() {
    set({
      isRunning: false,
    });
  },
  reset() {
    set({
      elapsed: 0,
      startTime: null,
      isRunning: false,
    });
  },
}));

export { useStopwatchSlice };
