import { View } from "react-native";
import { useTheme } from "react-native-paper";
import TimerPage from "../timer";

export default function Index() {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <TimerPage />
    </View>
  );
}
