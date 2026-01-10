import { Button } from "react-native";

type ActionButtonProps = {
  text: string;
  type: "";
};

export function ActionButton(props: ActionButtonProps) {
  return <Button title="some title" />;
}
