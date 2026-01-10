import { View } from "react-native";
import Index from "./index";

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Index />
    </View>
  );
}
