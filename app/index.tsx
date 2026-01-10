import { CurrentSetStopwatch } from "@/components/stopwatches/current-set-stopwatch";
import SessionStopwatch from "@/components/stopwatches/sessionStopwatch";
import { View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CurrentSetStopwatch />
      <View
        style={{
          position: "absolute",
          top: 50,
        }}
      >
        <SessionStopwatch />
      </View>
    </View>
  );
}
