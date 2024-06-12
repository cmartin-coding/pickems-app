import { PickemsButton } from "@/src/components/PickemsButton";
import { PickemsText } from "@/src/components/PickemsText";
import { PickemsPage } from "@/src/components/core/PickemsPage";
import { CLE } from "@/src/constants/team-logos/cle";
import { useGetUserQuery } from "@/src/services/user";
import { useAppSelector } from "@/src/store";
import { useAuthContext } from "@/src/utils";
import { tw } from "@/tailwind";
import { router } from "expo-router";
import { View } from "react-native";

export default function Home() {
  const user = useAppSelector((state) => state.user);
  // const { data: userData } = useGetUserQuery(
  //   "180f0ac8-4868-4b93-b092-7d8a57942541"
  // );
  console.log("HOME", user);

  return (
    <PickemsPage isTabBarScreen>
      <PickemsText style={[tw`mb-4 text-lg text-center`]}>
        Welcome {user.user.name}!
      </PickemsText>
      {user.activeLeagues.length > 0 && (
        <View style={[tw`flex flex-col mb-4 gap-2`]}>
          <PickemsText>Your Leagues</PickemsText>
          {user.activeLeagues.map((al) => (
            <PickemsText key={al.league_id} style={[tw`ml-2`]}>
              {al.league_name}
            </PickemsText>
          ))}
        </View>
      )}

      <View style={[tw`flex flex-col gap-4`]}>
        <PickemsButton
          onPress={() => {
            router.push("/create-league");
          }}
          buttonLabel="Create a league"
        />
        <PickemsButton buttonLabel="Join a league" />
      </View>
    </PickemsPage>
  );
}
