import { useAuthContext } from "@/src/utils";
import { Redirect, Stack } from "expo-router";

export default function AuthenticatedLayout() {
  const authCtx = useAuthContext();
  if (!authCtx?.user?.id) {
    return <Redirect href={"/sign-up"} />;
  }

  return (
    <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="value-prop" /> */}
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="settings" />
      {/* <Stack.Screen name="login" /> */}

      {/* <Stack.Screen name="forgot-password" /> */}
    </Stack>
  );
}
