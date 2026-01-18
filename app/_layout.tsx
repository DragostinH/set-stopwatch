import { useTheme } from "@/hooks/useThemeProper";
import { useSettingsSlice } from "@/store/slices/settingsSlice";
import { Colors } from "@/theme/AppThemeScheme";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import merge from "deepmerge";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar, StatusBarStyle } from "react-native";
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
const STYLES = ["default", "dark-content", "light-content"] as const;
const appLightTheme = {
  ...MD3LightTheme,
  colors: { ...MD3LightTheme.colors, ...Colors.light },
};
const appDarkTheme = {
  ...MD3DarkTheme,
  colors: { ...MD3DarkTheme.colors, ...Colors.dark },
};
const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});
const CombinedDefaultThemes = merge(LightTheme, appLightTheme);
const CombinedDarkThemes = merge(DarkTheme, appDarkTheme);
export default function RootLayout() {
  // get the current device theme and use that
  const { colorScheme } = useTheme();
  const modeFromStore = useSettingsSlice((s) => s.mode);
  const initMode = useSettingsSlice((s) => s.initTheme);
  const paperTheme =
    colorScheme === "dark" ? CombinedDarkThemes : CombinedDefaultThemes;
  const themeMode = useSettingsSlice((state) => state.mode);
  const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>(
    STYLES[0],
  );

  const themeScheme: ReactNavigation.Theme =
    themeMode === "dark" ? CombinedDarkThemes : CombinedDefaultThemes;

  useEffect(() => {
    if (modeFromStore === null && colorScheme) {
      initMode(colorScheme);
    }
  }, [modeFromStore, colorScheme]);
  return (
    <SafeAreaProvider>
      <PaperProvider theme={paperTheme}>
        <ThemeProvider value={themeScheme}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </ThemeProvider>
        <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle={statusBarStyle}
        />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
