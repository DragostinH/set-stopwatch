import { View } from "react-native";
import { Text } from "react-native-paper";

type Sizes = "sm" | "md" | "lg";

type StopwatchProps = {
  initialTime?: number;
  elapsed: number | 0;
  hasMilliseconds?: boolean;
  fontSize?: Sizes;
};

const STOPWATCH_SIZES: Record<Sizes, number> = {
  sm: 16,
  md: 24,
  lg: 36,
};

function formatTime(elapsed: number, showMs: boolean) {
  const ms = Math.floor((elapsed % 1000) / 10);
  const ss = Math.floor(elapsed / 1000) % 60;
  const mm = Math.floor(elapsed / 60000) % 60;
  const hh = Math.floor(elapsed / 3600000);

  let output = "";

  if (hh > 0) output += `${hh.toString().padStart(2, "0")}:`;
  output += `${mm.toString().padStart(2, "0")}:`;
  output += `${ss.toString().padStart(2, "0")}`;

  if (showMs) output += `:${ms.toString().padStart(2, "0")}`;

  return output;
}

export function Stopwatch(props: StopwatchProps) {
  const { elapsed, hasMilliseconds, fontSize = "md" } = props;

  return (
    <View>
      <Text style={{ fontSize: STOPWATCH_SIZES[fontSize] }}>
        {formatTime(elapsed, !!hasMilliseconds)}
      </Text>
    </View>
  );
}
