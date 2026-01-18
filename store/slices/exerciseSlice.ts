import uuid from "react-native-uuid";
import { create } from "zustand";

type ExerciseSet = {
  id: string;
  time: number;
  activeSet: boolean;
};

type ActiveExercise = {
  id: string;
  name: string;
  sets: ExerciseSet[];
  totalElapsed?: number;
} | null;

type ExerciseState = {
  activeExercise: ActiveExercise;
  completedExercises: ActiveExercise[];
};

type ExerciseActions = {
  startExercise: (id: string, name: string) => void;
  addSetToActive: (newSet: ExerciseSet) => void;
  removeSetFromActive: (id: string) => void;
  finishExercise: (elapsed: number) => void;
  resetActive: () => void;
};

const useExerciseSlice = create<ExerciseState & ExerciseActions>(
  (set, get) => ({
    activeExercise: null,
    completedExercises: [],

    startExercise(id, name) {
      const firstSet = {
        id: uuid.v4(),
        time: 0,
        activeSet: true,
      };
      set({
        activeExercise: {
          id: id,
          name: name,
          sets: [firstSet],
        },
      });
    },

    addSetToActive(newSet) {
      const current = get().activeExercise;
      if (!current) return;

      const mappedToFalse = current.sets.map((items) => {
        return {
          id: items.id,
          time: items.time,
          activeSet: false,
        };
      });

      set({
        activeExercise: {
          ...current,
          sets: [...mappedToFalse, newSet],
        },
      });
    },

    removeSetFromActive(id) {
      const current = get().activeExercise;
      if (!current) return;
      const newSets = current.sets.filter((set) => set.id !== id);

      set({
        activeExercise: {
          ...current,
          sets: newSets,
        },
      });
    },

    finishExercise(elapsed) {
      const current = get().activeExercise;
      if (!current) return;
      if (elapsed) current.totalElapsed = elapsed;
      set((state) => ({
        activeExercise: null,
        completedExercises: [...state.completedExercises, current],
      }));
    },

    resetActive() {
      set({ activeExercise: null });
    },
  })
);

export { useExerciseSlice };
