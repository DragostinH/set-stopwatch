import { create } from "zustand";

type Mode = "light" | "dark" | null;

export type State = {
  mode: Mode;
};

type Actions = {
  initTheme: (theme: Mode) => void;
  toggle: () => void;
};

const useSettingsSlice = create<State & Actions>((set, get) => ({
  mode: null,
  initTheme(theme: Mode) {
    set({ mode: theme });
  },
  toggle: () => console.log("mode", get().mode),
}));

export { useSettingsSlice };
