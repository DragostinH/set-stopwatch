import { useExerciseSlice } from "@/store/slices/exerciseSlice";
import { useExerciseStopwatchSlice } from "@/store/slices/stopwatches/exerciseStopwatchSlice";
import { useSetStopwatchSlice } from "@/store/slices/stopwatches/setStopwatchSlice";
import { StyleSheet, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import uuid from "react-native-uuid";
import { Stopwatch } from "./stopwatch";

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 16,
    flexGrow: 2,
  },
  watchContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderStyle: "dotted",
  },
});

export function CurrentSetStopwatch() {
  // Theme
  const theme = useTheme();
  // Exercise Stopwatch
  const exerciseElapsed = useExerciseStopwatchSlice(
    (state) => state.elapsed,
  );
  const initExercise = useExerciseStopwatchSlice((state) => state.start);
  const stopExerciseStopwatch = useExerciseStopwatchSlice(
    (state) => state.stop,
  );
  const isRunning = useExerciseStopwatchSlice((state) => state.isRunning);
  const elapsedExerciseStopwatch = useExerciseStopwatchSlice(
    (state) => state.elapsed,
  );

  // Set stopwatch
  const restTimeElapsed = useSetStopwatchSlice((state) => state.elapsed);
  const isSetRunning = useSetStopwatchSlice((state) =>
    state.getIsRunning(),
  );
  const endSet = useSetStopwatchSlice((state) => state.stop);
  const startSetTimer = useSetStopwatchSlice((state) => state.start);
  const resetSetTimer = useSetStopwatchSlice((state) => state.reset);

  // Exercise Slice
  const addExerciseSet = useExerciseSlice((state) => state.addSetToActive);
  const activateExercise = useExerciseSlice(
    (state) => state.startExercise,
  );
  const finishExercise = useExerciseSlice((state) => state.finishExercise);

  const startExercise = () => {
    if (isRunning) return;
    if (isSetRunning) endSet();
    initExercise();
  };

  const addRest = () => {
    if (!isSetRunning) {
      startSetTimer();
      activateExercise(uuid.v4(), uuid.v4());
      return;
    }

    const newSet = {
      id: uuid.v4(),
      time: restTimeElapsed === 0 ? 0 : Date.now() - restTimeElapsed,
      activeSet: true,
    };

    addExerciseSet(newSet);
    resetSetTimer();
    startSetTimer();
  };

  const endExercise = () => {
    if (!isRunning) return;
    if (isSetRunning) endSet();
    finishExercise(elapsedExerciseStopwatch);
    stopExerciseStopwatch();
  };

  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          ...styles.watchContainer,
          borderColor: theme.colors.secondary,
          borderWidth: 2,
          height: 200,
          width: 200,
        }}
      >
        <View className="set-stopwatch">
          <Stopwatch
            fontSize="lg"
            elapsed={restTimeElapsed}
            hasMilliseconds
          />
        </View>
        <View className="exercise-stopwatch">
          <Stopwatch
            fontSize="sm"
            hasMilliseconds={false}
            elapsed={exerciseElapsed}
          />
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <Button
          icon="dumbbell"
          mode="contained"
          onPress={initExercise}
          disabled={isRunning}
        >
          Start
        </Button>
        <Button disabled={!isRunning} onPress={addRest}>
          REST
        </Button>
        <Button disabled={!isRunning} onPress={endExercise}>
          END
        </Button>
      </View>
    </View>
  );
}
