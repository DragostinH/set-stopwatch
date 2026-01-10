import { Text, View } from "react-native";

type StopwatchProps = {
  initialTime?: number;
  elapsed: number;
  hasMilliseconds?: boolean;
};

export function Stopwatch(props: StopwatchProps) {
  const { initialTime, elapsed } = props;
  const ms = Math.floor((elapsed % 1000) / 10);
  const ss = Math.floor(elapsed / 1000) % 60;
  const mm = Math.floor(elapsed / 60000);

  return (
    <View>
      <Text>
        {mm < 10 ? <Text>0{mm}</Text> : mm}:
        {ss < 10 ? <Text>0{ss}</Text> : ss}
        {props.hasMilliseconds && (
          <Text>:{ms < 10 ? <Text>0{ms}</Text> : ms}</Text>
        )}
      </Text>
    </View>
  );
}
