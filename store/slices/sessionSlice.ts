import { create } from "zustand";

export type sessionStatusType = "STARTED" | "ENDED" | "PAUSED";

type State = {
  sessionStatus: sessionStatusType;
  elapsed: number;
  startedAt: number;
  endedAt: number;
};

type Actions = {
  setSessionStatus: (status: sessionStatusType) => void;
  setElapsed: (by: number) => void;
  setStartedAt: (at: number) => void;
  setEndedAt?: (at: number) => void;
  getElapsed?: (time: number) => number;
  start: () => void;
};

const useSessionSlice = create<State & Actions>((set, get) => ({
  sessionStatus: "ENDED",
  elapsed: 0,
  startedAt: 0,
  endedAt: 0,
  start() {
    if (get().sessionStatus === "STARTED") return;
    get().setSessionStatus("STARTED");
    get().setStartedAt(Date.now() - get().elapsed);
    setInterval(() => {
      if (!get().startedAt) return;
      get().setElapsed(Date.now() - get().startedAt);
    }, 50);
  },
  setSessionStatus(status) {
    set({ sessionStatus: status });
  },
  setElapsed(by) {
    set(() => ({ elapsed: by }));
  },
  setStartedAt(at) {
    set(() => ({ startedAt: at }));
  },
  setEndedAt(at) {
    set(() => ({ endedAt: at }));
  },
}));

export { useSessionSlice };
