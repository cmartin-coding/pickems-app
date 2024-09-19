import { FootballLoader } from "@/src/components/FootballLoader";
import { NoActiveLeaguesPlaceholder } from "@/src/components/NoActiveLeaguesPlaceholder";
import { PickemsText } from "@/src/components/PickemsText";
import { PickemsPage } from "@/src/components/core/PickemsPage";
import { TeamLogo } from "@/src/constants/team-logos/TeamLogo";
import { useThemeContext } from "@/src/context/ThemeContext";
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

  const {} = useThemeContext();
  const [colorScheme, toggleColorScheme, setColorScheme] =
    useAppColorScheme(tw);
  const gradientColors =
    colorScheme === "light"
      ? ["#000000", "#0000FF"]
      : [tw.color("blue-900"), "#0000FF"];
  const {
    data: leagueUsers,
    refetch,
    isFetching,
    isLoading,
  } = useGetLeagueUsersAndStandings(user?.currentActiveLeague || "");
  if (!leagueUsers && isLoading) {
    return <FootballLoader />;
  }

  if (!leagueUsers) {
    return <PickemsText>No League Users</PickemsText>;
  }
  if (!user.currentActiveLeague) {
    return <NoActiveLeaguesPlaceholder tab="standings" />;
  }

  const sortedUsers = [...leagueUsers].sort(
    (a, b) => b.overallAccuracy - a.overallAccuracy
  );

  const columns: Array<
    | "Name"
    | "W"
    | "L"
    | "Acc."
    | "Rank"
    | "Team W"
    | "O/U W"
    | "Team L"
    | "O/U L"
    | ""
  > = ["", "Name", "Team W", "Team L", "O/U W", "O/U L", "Acc."];

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
      <View style={[tw`border relative py-3 rounded-lg `]}>
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
              <View
                key={col}
                style={[
                  tw`flex  ${
                    ix !== 0 ? "w-[15.7%]" : "w-[5%]"
                  } flex-col items-center`,
                ]}
              >
                <PickemsText
                  adjustsFontSizeToFit
                  numberOfLines={1}
                  style={[tw`font-bold text-xs text-white`]}
                >
                  {col}
                </PickemsText>

                {/* <StandingsColumns colName={col} users={sortedUsers} /> */}
              </View>
            );
          })}
        </View>
        <View style={[tw`flex flex-col gap-6 `]}>
          {sortedUsers.map((user, ix) => {
            const totalWins =
              user.total_over_under_selections_correct +
              user.total_team_selections_correct;
            const totalLosses =
              user.totalCompleteMatchups * 2 -
              (user.total_over_under_selections_correct +
                user.total_team_selections_correct);
            const teamPickWins = user.total_team_selections_correct;
            const overUnderWins = user.total_over_under_selections_correct;

            const teamPickLs = user.totalCompleteMatchups - teamPickWins;
            const overUnderLs = user.totalCompleteMatchups - overUnderWins;
            return (
              <View
                style={[
                  tw`flex  flex-row ${
                    ix !== sortedUsers.length - 1
                      ? "border-b border-slate-300/50 "
                      : ""
                  } pb-6`,
                ]}
                key={user.user_id}
              >
                <PickemsText style={[tw`w-[5%]  text-white text-center`]}>
                  {ix + 1}
                </PickemsText>
                <PickemsText
                  numberOfLines={1}
                  style={[tw`w-[15.7%]  text-white text-center`]}
                >
                  {user.user_name}
                </PickemsText>
                <PickemsText style={[tw`w-[15.7%] text-white  text-center`]}>
                  {teamPickWins}
                </PickemsText>
                <PickemsText style={[tw`w-[15.7%] text-white text-center`]}>
                  {teamPickLs}
                </PickemsText>
                <PickemsText style={[tw`w-[15.7%] text-white  text-center`]}>
                  {overUnderWins}
                </PickemsText>
                <PickemsText style={[tw`w-[15.7%] text-white text-center`]}>
                  {overUnderLs}
                </PickemsText>
                <PickemsText style={[tw`w-[15.7%] text-white text-center`]}>
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
