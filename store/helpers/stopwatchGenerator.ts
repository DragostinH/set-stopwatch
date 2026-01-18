export interface BaseStopwatchState {
  elapsed: number;
  startTime: number | null;
  isRunning: boolean;
  intervalRef: NodeJS.Timeout | null;
}

export interface BaseStopwatchActions {
  start: () => void;
  stop: () => void;
  reset: () => void;
  getIsRunning: () => boolean;
}

export type BaseStopwatchSlice = BaseStopwatchState & BaseStopwatchActions;

export const createStopwatch =
  (tickMs: number = 50) =>
  (set, get): BaseStopwatchSlice => ({
    elapsed: 0,
    startTime: null as number | null,
    isRunning: false,
    intervalRef: null as NodeJS.Timeout | null,

    start() {
      if (get().isRunning) return;

      const startTime = Date.now() - get().elapsed;

      set({
        isRunning: true,
        startTime,
        intervalRef: setInterval(() => {
          set({ elapsed: Date.now() - startTime });
        }, tickMs),
      });
    },

    stop() {
      const ref = get().intervalRef;
      if (ref) clearInterval(ref);

      set({ isRunning: false, intervalRef: null, elapsed: 0 });
    },

    reset() {
      const ref = get().intervalRef;
      if (ref) clearInterval(ref);

      set({
        elapsed: 0,
        startTime: null,
        isRunning: false,
        intervalRef: null,
      });
    },

    getIsRunning() {
      return get().isRunning;
    },
  });
