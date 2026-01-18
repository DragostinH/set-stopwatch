import { useSessionSlice } from "@/store/slices/sessionSlice";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Stopwatch } from "./stopwatch";

interface SessionStopwatchProps {}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 8,
    borderRadius: "50%",
    borderWidth: 1,
    borderColor: "gray",
    marginRight: 8,
  },
});

function SessionStopwatch(props: SessionStopwatchProps) {
  const {} = props;
  const sessionElapsed = useSessionSlice((state) => state.elapsed);

  return (
    <View style={styles.mainContainer}>
      <Stopwatch
        fontSize="sm"
        elapsed={sessionElapsed}
        hasMilliseconds={false}
      />
    </View>
  );
}

export default SessionStopwatch;
