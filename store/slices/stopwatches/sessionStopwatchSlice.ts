import { createStopwatch } from "@/store/helpers/stopwatchGenerator";
import { create } from "zustand";

type State = {
  sessionElapsed: number;
  sessionStartTime?: number | null;
  sessionStarted?: boolean;
};

type Actions = {
  setSessionStarted: (started: boolean) => void;
  setSessionElapsed: (time: number) => void;
  setSessionStartTime?: (time: number) => void;
  getElapsed?: (time: number) => number;
};

const useSessionStopwatchSlice = create(createStopwatch(1000));

export { useSessionStopwatchSlice };
