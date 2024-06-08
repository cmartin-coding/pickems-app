import { PickemsText } from "@/src/components/PickemsText";
import { useAuthContext } from "@/src/utils";
import { Redirect, Stack } from "expo-router";

export default function UnauthenticatedLayout() {
  const authCtx = useAuthContext();
  if (authCtx.loading) {
    return <PickemsText>Loading...</PickemsText>;
  }
  if (authCtx.user?.id) {
    return <Redirect href={"/home"} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="value-prop" /> */}
      {/* <Stack.Screen name="login" /> */}
      <Stack.Screen name="sign-up" />
      {/* <Stack.Screen name="forgot-password" /> */}
    </Stack>
  );
}
