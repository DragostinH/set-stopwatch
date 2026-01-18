import { createStopwatch } from "@/store/helpers/stopwatchGenerator";
import { create } from "zustand";

const useSetStopwatchSlice = create(createStopwatch(50));

export { useSetStopwatchSlice };
