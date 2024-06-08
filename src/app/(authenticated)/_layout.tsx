import { useAuthContext } from "@/src/utils";
import { Redirect, Stack } from "expo-router";

export default function AuthenticatedLayout() {
  const authCtx = useAuthContext();
  if (!authCtx?.user?.id) {
    return <Redirect href={"/sign-up"} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="value-prop" /> */}
      {/* <Stack.Screen name="login" /> */}
      <Stack.Screen name="home" />
      {/* <Stack.Screen name="forgot-password" /> */}
    </Stack>
  );
}
