import { PickemsButton } from "@/src/components/PickemsButton";
import { PickemsCard } from "@/src/components/PickemsCard";
import { PickemsText } from "@/src/components/PickemsText";
import { PickemsPage } from "@/src/components/core/PickemsPage";
import { CLE } from "@/src/constants/team-logos/cle";
import { useGetUserQuery } from "@/src/services/user";
import { activeLeagueActions } from "@/src/slices/activeLeague";
import { useAppSelector } from "@/src/store";
import { useAuthContext } from "@/src/utils";
import { tw } from "@/tailwind";
import { router } from "expo-router";
import { View } from "react-native";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);
  // const { data } = useGetLeagueUsersQuery({
  //   leagueID: user.activeLeagues[0].league_id,
  // });
  // console.log(data);
  return (
    <PickemsPage isTabBarScreen>
      <PickemsText style={[tw`mb-4 text-lg text-center`]}>
        Welcome {user.user.name}!
      </PickemsText>
      {user.activeLeagues.length > 0 && (
        <View style={[tw`flex flex-col relative mb-4 gap-2`]}>
          <PickemsText>Your Leagues</PickemsText>
          {user.activeLeagues.map((al) => (
            <PickemsCard
              style={[tw`bg-green-200/80 border-black`]}
              key={al.league_id}
              onPress={() => {
                dispatch(
                  activeLeagueActions.setActiveLeague({
                    leagueID: al.league_id,
                  })
                );
                router.push({
                  pathname: "/user-picks",
                  // params: { leagueId: al.league_id },
                });
              }}
            >
              <PickemsText style={[tw`ml-2`]}>{al.league_name}</PickemsText>
            </PickemsCard>
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
        <PickemsButton
          onPress={() => {
            router.push("join-league");
          }}
          buttonLabel="Join a league"
        />
      </View>
    </PickemsPage>
  );
}
