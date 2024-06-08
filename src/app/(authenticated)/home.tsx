import { PickemsButton } from "@/src/components/PickemsButton";
import { PickemsText } from "@/src/components/PickemsText";
import { PickemsPage } from "@/src/components/core/PickemsPage";
import { useAuthContext } from "@/src/utils";

export default function Home() {
  const authCtx = useAuthContext();
  return (
    <PickemsPage>
      <PickemsText>TESTING</PickemsText>
      <PickemsButton
        buttonLabel="Logout"
        onPress={async () => {
          await authCtx.logout();
        }}
      />
    </PickemsPage>
  );
}
