import { PickemsText } from "@/src/components/PickemsText";
import { PickemsPage } from "@/src/components/core/PickemsPage";
import { View } from "react-native";

export default function UserPicks() {
  return (
    <PickemsPage isTabBarScreen>
      <View>
        <PickemsText>Your Picks</PickemsText>
      </View>
    </PickemsPage>
  );
}
