export const createStopwatchSlice = (set, get) => ({
  elapsed: 0,
  startTime: null as number | null,
  isRunning: false,

  start: () => {
    set((state: StopwatchState) => ({
      isRunning: true,
      startTime: Date.now() - state.elapsed,
    }));
  },

  stop: () => {
    set(() => ({ isRunning: false }));
  },

  reset: () => {
    set(() => ({
      elapsed: 0,
      startTime: null,
      isRunning: false,
    }));
  },
});
