import { PickemsText } from "@/src/components/PickemsText";
import { PickemsPage } from "@/src/components/core/PickemsPage";
import { useDataContext } from "@/src/context/DataContext";
import { useAuthContext } from "@/src/utils";
import { tw } from "@/tailwind";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function AuthenticatedLayout() {
  const dataCtx = useDataContext();
  const authCtx = useAuthContext();
  if (!authCtx?.user?.id) {
    return <Redirect href={"/sign-up"} />;
  }
  if (authCtx.loading) {
    return (
      <PickemsPage>
        <View
          style={[tw`w-full h-full flex flex-col justify-center items-center`]}
        >
          <PickemsText>Loading your information...</PickemsText>
          <ActivityIndicator />
        </View>
      </PickemsPage>
    );
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
