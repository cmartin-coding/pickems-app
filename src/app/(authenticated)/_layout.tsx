import { FootballLoader } from "@/src/components/FootballLoader";
import { PickemsLoadingPage } from "@/src/components/PickemsLoadingPage";
import { PickemsText } from "@/src/components/PickemsText";
import { PickemsPage } from "@/src/components/core/PickemsPage";
import { useDataContext } from "@/src/context/DataContext";
import { useAuthContext } from "@/src/utils";
import tw from "@/tailwind";
import { Redirect, Stack } from "expo-router";

export default function AuthenticatedLayout() {
  const dataCtx = useDataContext();
  const authCtx = useAuthContext();

  if (!authCtx?.user?.id) {
    return <Redirect href={"/sign-up"} />;
  }
  if (authCtx.loading || dataCtx.loading) {
    return <PickemsLoadingPage />;
  }

  return (
    <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="create-league" />
      <Stack.Screen name="join-league" />
    </Stack>
  );
}
