import { createStopwatch } from "@/store/helpers/stopwatchGenerator";
import { create } from "zustand";

const useExerciseStopwatchSlice = create(createStopwatch(50));

export { useExerciseStopwatchSlice };
