import { FootballLoader } from "@/src/components/FootballLoader";
import { NoActiveLeaguesPlaceholder } from "@/src/components/NoActiveLeaguesPlaceholder";
import { PickemsText } from "@/src/components/PickemsText";
import { PickemsPage } from "@/src/components/core/PickemsPage";
import { TeamLogo } from "@/src/constants/team-logos/TeamLogo";
import { useGetLeagueUsersAndStandings } from "@/src/services/user";
import { useAppSelector } from "@/src/store";
import { NFLTeamNames } from "@/src/types/types";
import tw from "@/tailwind";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { View } from "react-native";
import { useAppColorScheme } from "twrnc/dist/esm/hooks";

export default function Standings() {
  const user = useAppSelector((state) => state.user);

  if (!user.currentActiveLeague) {
    return <NoActiveLeaguesPlaceholder tab="standings" />;
  }
  const {
    data: leagueUsers,
    refetch,
    isFetching,
    isLoading,
  } = useGetLeagueUsersAndStandings(user.currentActiveLeague);
  if (!leagueUsers && isLoading) {
    return <FootballLoader />;
  }
  if (!leagueUsers) {
    return <PickemsText>No League Users</PickemsText>;
  }

  const sortedUsers = leagueUsers?.sort(
    (a, b) => b.overUnderAccuracy - a.overUnderAccuracy
  );

  const columns: Array<"Name" | "W" | "L" | "Acc." | "Rank"> = [
    "Rank",
    "Name",
    "W",
    "L",
    "Acc.",
  ];

  const [colorScheme, toggleColorScheme, setColorScheme] =
    useAppColorScheme(tw);
  const gradientColors =
    colorScheme === "light"
      ? ["#000000", "#0000FF"]
      : [tw.color("blue-900"), "#0000FF"];

  return (
    <PickemsPage
      refreshControl={{
        isRefreshing: isFetching,
        onRefresh: () => {
          refetch();
        },
      }}
      isTabBarScreen
      childrenStyle={[tw`p-0 `]}
    >
      <View style={[tw`border relative p-4 rounded-lg `]}>
        <LinearGradient
          style={[
            tw` absolute top-0 bottom-0 flex rounded-md flex-row justify-center left-0 right-0`,
          ]}
          start={{ x: 0.2, y: 0.2 }}
          end={{ x: 1, y: 1.5 }}
          colors={gradientColors}
        >
          <Ionicons
            name="american-football"
            size={175}
            style={[tw`absolute bg-transparent  right-0 text-white/5`]}
          />
        </LinearGradient>
        <View
          style={[
            tw`flex flex-row items-center  border-b-2 pb-2 border-b-white mb-4 `,
          ]}
        >
          {columns.map((col, ix) => {
            return (
              <View key={col} style={[tw`flex w-1/5   flex-col items-center`]}>
                <PickemsText style={[tw`font-bold text-lg text-white`]}>
                  {col}
                </PickemsText>

                {/* <StandingsColumns colName={col} users={sortedUsers} /> */}
              </View>
            );
          })}
        </View>
        <View style={[tw`flex flex-col gap-2`]}>
          {sortedUsers.map((user, ix) => {
            const totalWins =
              user.total_over_under_selections_correct +
              user.total_team_selections_correct;
            const totalLosses =
              user.totalCompleteMatchups * 2 -
              (user.total_over_under_selections_correct +
                user.total_team_selections_correct);
            return (
              <View
                style={[tw`flex flex-row border-b border-slate-300/50 pb-2 `]}
                key={user.user_id}
              >
                <PickemsText style={[tw`w-1/5  text-white text-center`]}>
                  {ix + 1}
                </PickemsText>
                <PickemsText style={[tw`w-1/5  text-white text-center`]}>
                  {user.user_name}
                </PickemsText>
                <PickemsText style={[tw`w-1/5 text-white  text-center`]}>
                  {totalWins}
                </PickemsText>
                <PickemsText style={[tw`w-1/5 text-white text-center`]}>
                  {totalLosses}
                </PickemsText>
                <PickemsText style={[tw`w-1/5 text-white text-center`]}>
                  {(user.overallAccuracy * 100).toFixed(0)}%
                </PickemsText>
              </View>
            );
          })}
        </View>
      </View>
    </PickemsPage>
  );
}
