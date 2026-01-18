import { useSettingsSlice } from "@/store/slices/settingsSlice";
import React from "react";
import { IconButton, useTheme } from "react-native-paper";
interface Props {}

function ThemeSelect(props: Props) {
  const {} = props;
  const theme = useTheme();
  const toggleTheme = useSettingsSlice((state) => state.toggle);
  return theme.dark ? (
    <IconButton
      onPress={() => toggleTheme()}
      icon="moon-waning-crescent"
    />
  ) : (
    <IconButton onPress={() => toggleTheme()} icon="weather-sunny" />
  );
}

export default ThemeSelect;
