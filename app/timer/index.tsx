import SetsList from "@/components/sets/SetsList";
import { CurrentSetStopwatch } from "@/components/stopwatches/currentSetStopwatch";
import ThemeSelect from "@/components/ui/theme-select";
import { useSettingsSlice } from "@/store/slices/settingsSlice";
// import SessionStopwatch from "@/components/stopwatches/sessionStopwatch";
import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

function TimerPage() {
  const theme = useTheme();
  const settings = useSettingsSlice((state) => state.toggle);
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        padding: 8,
      }}
    >
      <SetsList />
      <CurrentSetStopwatch />
      <View
        style={{
          position: "fixed",
          top: 0,
          right: 0,
        }}
      >
        <ThemeSelect />
      </View>
    </View>
  );
}

export default TimerPage;
