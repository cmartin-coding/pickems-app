import { PickemsText } from "@/src/components/PickemsText";
import { PickemsAuthenticatedPage } from "@/src/components/core/PickemsAuthenticatedPage";
import { PickemsPage } from "@/src/components/core/PickemsPage";
import { View } from "react-native";

export default function UserPicks() {
  return (
    <PickemsAuthenticatedPage>
      <View>
        <PickemsText>Your Picks</PickemsText>
      </View>
    </PickemsAuthenticatedPage>
  );
}
