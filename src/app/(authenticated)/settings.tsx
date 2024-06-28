import { PickemsButton } from "@/src/components/PickemsButton";
import { PickemsText } from "@/src/components/PickemsText";
import { PickemsPage } from "@/src/components/core/PickemsPage";
import { useAuthContext } from "@/src/utils";
import { View } from "react-native";

export default function Settings() {
  const authCtx = useAuthContext();
  console.log(authCtx.user?.email);
  return (
    <PickemsPage showBackButton>
      <View>
        <PickemsText>Settings Screen</PickemsText>
        <PickemsButton
          buttonLabel="Logout"
          onPress={async () => {
            await authCtx.logout();
          }}
        />
      </View>
    </PickemsPage>
  );
}
