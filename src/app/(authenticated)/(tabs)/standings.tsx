import { NoActiveLeaguesPlaceholder } from "@/src/components/NoActiveLeaguesPlaceholder";
import { PickemsText } from "@/src/components/PickemsText";
import { PickemsPage } from "@/src/components/core/PickemsPage";
import { TeamLogo } from "@/src/constants/team-logos/TeamLogo";
import { useGetLeagueUsersAndStandings } from "@/src/services/user";
import { useAppSelector } from "@/src/store";
import { NFLTeamNames } from "@/src/types/types";
import { tw } from "@/tailwind";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Standings() {
  const user = useAppSelector((state) => state.user);
  const activeLeagueID = useAppSelector((state) => state.activeLeague);

  if (!activeLeagueID.selectedLeagueID) {
    return <NoActiveLeaguesPlaceholder tab="standings" />;
  }
  const {
    data: leagueUsers,
    refetch,
    isFetching,
    isLoading,
  } = useGetLeagueUsersAndStandings({
    leagueID: activeLeagueID.selectedLeagueID as string,
  });
  if (!leagueUsers && isLoading) {
    return <ActivityIndicator />;
  }
  if (!leagueUsers) {
    return <PickemsText>No League Users</PickemsText>;
  }

  const sortedUsers = leagueUsers?.sort(
    (a, b) => b.overUnderAccuracy - a.overUnderAccuracy
  );

  const columns: Array<"Name" | "W" | "L" | "Acc."> = [
    "Name",
    "W",
    "L",
    "Acc.",
  ];

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
      <View style={[tw``]}>
        <View
          style={[
            tw`flex flex-row items-center  border-b pb-2 border-b-black/60 mb-4 gap-6`,
          ]}
        >
          {columns.map((col, ix) => {
            return (
              <View
                key={col}
                style={[
                  tw`flex w-1/5   flex-col ${ix === 0 ? "" : "items-center"}`,
                ]}
              >
                <PickemsText style={[tw`font-bold text-lg`]}>{col}</PickemsText>

                {/* <StandingsColumns colName={col} users={sortedUsers} /> */}
              </View>
            );
          })}
        </View>
        <View style={[tw`flex flex-col gap-2`]}>
          {sortedUsers.map((user) => {
            const totalWins =
              user.total_over_under_selections_correct +
              user.total_team_selections_correct;
            const totalLosses =
              user.totalCompleteMatchups * 2 -
              (user.total_over_under_selections_correct +
                user.total_team_selections_correct);
            return (
              <View
                style={[
                  tw`flex flex-row border-b border-slate-300/50 pb-2 gap-6`,
                ]}
                key={user.user_id}
              >
                <PickemsText style={[tw`w-1/5  `]}>
                  {user.user_name}
                </PickemsText>
                <PickemsText style={[tw`w-1/5  text-center`]}>
                  {totalWins}
                </PickemsText>
                <PickemsText style={[tw`w-1/5  text-center`]}>
                  {totalLosses}
                </PickemsText>
                <PickemsText style={[tw`w-1/5  text-center`]}>
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
