import { useMainStore } from "@/store/mainStore";
import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { Stopwatch } from "./stopwatch";

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderStyle: "dotted",
  },
});

export function CurrentSetStopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<number>(null);
  const startTimeRef = useRef<number>(null);
  // we can get this from the device settings later
  // will make for smoother animation on high refresh rate screens
  const [screenHz, setScreenHz] = useState(60);
  const [sets, setSets] = useState<number[]>([]);

  const sessionStarted = useMainStore((state) => state.sessionStarted);
  const startSessionStore = useMainStore((state) => state.startSession);
  const endSessionStore = useMainStore((state) => state.endSession);

  const startSession = () => {
    if (intervalRef.current) return;

    startSessionStore();
    startTimeRef.current = Date.now() - elapsed;

    intervalRef.current = setInterval(() => {
      if (!startTimeRef.current) return;
      setElapsed(Date.now() - startTimeRef.current);
    }, screenHz);
  };
  const endSession = () => {
    if (!intervalRef.current) return;
    endSessionStore();
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setElapsed(0);
  };

  useEffect(() => {
    return () => {
      if (!intervalRef.current) return;
      clearInterval(intervalRef.current);
    };
  }, []);

   return (
    <View style={styles.container}>
      <View>
        {!sessionStarted ? (
          <Button title="START SESSION" onPress={startSession} />
        ) : (
          <Stopwatch elapsed={elapsed} hasMilliseconds={true} />
        )}
      </View>
    </View>
  );
}
