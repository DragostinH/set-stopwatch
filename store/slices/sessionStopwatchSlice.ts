import { create } from "zustand";

type State = {
  sessionElapsed: number;
  sessionStartTime?: number | null;
};

type Actions = {
  setSessionElapsed: (time: number) => void;
  setSessionStartTime?: (time: number) => void;
  getElapsed?: (time: number) => number;
};

const useSessionStopwatchSlice = create<State & Actions>((set, get) => ({
  sessionElapsed: 0,
  sessionStartTime: null,
  setSessionElapsed(time) {
    set(() => ({ sessionElapsed: time }));
  },
  setSessionStartTime(time) {
    set(() => ({ sessionStartTime: time }));
  },
  getElapsed(time: number) {
    return 0;
  },
}));

export { useSessionStopwatchSlice };
