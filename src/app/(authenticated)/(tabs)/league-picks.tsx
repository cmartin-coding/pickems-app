import { NoActiveLeaguesPlaceholder } from "@/src/components/NoActiveLeaguesPlaceholder";
import { PickemsText } from "@/src/components/PickemsText";
import { UserPicksHeader } from "@/src/components/UserPicksHeader";
import { TeamLogo } from "@/src/constants/team-logos/TeamLogo";
import { getCurrentNFLWeek } from "@/src/helpers/helpers";
import {
  useGetAllLeaguePicks,
  useGetLeagueUsersAndStandings,
} from "@/src/services/user";
import { useAppSelector } from "@/src/store";
import { NFLTeamNames } from "@/src/types/types";
import { tw } from "@/tailwind";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { WeekSelectorHeader } from "@/src/components/WeekSelectorHeader";

export default function LeaguePicks() {
  const user = useAppSelector((state) => state.user);
  if (user.activeLeagues.length === 0 || !user.currentActiveLeague) {
    return <NoActiveLeaguesPlaceholder tab="league-picks" />;
  }
  const currWeek = getCurrentNFLWeek();
  const [selectedWeek, setSelectedWeek] = useState(currWeek);
  const [isUserRefresh, setIsUserRefresh] = useState(false);

  const usersScrollViewRef = useRef<any>(null);
  const matchupsScrollViewRef = useRef<any>(null);

  const {
    data: matchups,
    isLoading: isMatchupsLoading,
    isFetching: isMatchupsFetching,
    refetch: refetchMatchups,
  } = useGetAllLeaguePicks({
    week_num: selectedWeek,
    leagueId: user.currentActiveLeague as string,
  });

  const {
    data: users,
    refetch: refetchUsers,
    isLoading,
    isFetching,
  } = useGetLeagueUsersAndStandings(user.currentActiveLeague);

  useEffect(() => {
    if (isUserRefresh && !isFetching && isUserRefresh && !isMatchupsFetching) {
      setIsUserRefresh(false);
    }
  }, [isFetching, isMatchupsFetching]);

  const sortedMatchups = [...(matchups || [])].sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
  );

  const handleScroll = (event: any) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    if (usersScrollViewRef.current) {
      usersScrollViewRef.current.scrollTo({ x: scrollX, animated: false });
    }
    if (matchupsScrollViewRef.current) {
      matchupsScrollViewRef.current.scrollTo({ x: scrollX, animated: false });
    }
  };

  const sortedUsers = [...(users || [])].sort((a, b) => {
    if (a.user_id === user.user.id) return -1;
    if (b.user_id === user.user.id) return 1;
    return 0;
  });

  const currLeague = user.activeLeagues.find(
    (l) => l.league_id === user.currentActiveLeague
  );

  return (
    <View style={[tw`flex-1 bg-white`]}>
      <WeekSelectorHeader
        selectedWeek={selectedWeek}
        title="League Picks"
        onWeekChange={(week) => {
          setSelectedWeek(week);
        }}
      />
      {!isUserRefresh && (isFetching || isMatchupsFetching) ? (
        <ActivityIndicator style={[tw`mt-10`]} />
      ) : (
        <>
          <View style={[tw`border border-t-0 mt-2 border-slate-300/70`]}>
            <View style={[tw`absolute bg-white z-20`]}>
              <View style={[tw`w-15 border-r border-r-slate-300/90 pr-3`]}>
                <PickemsText style={[tw`h-6  text-xs text-right`]}>
                  Home
                </PickemsText>
                <PickemsText style={[tw`h-6  text-xs text-right`]}>
                  O/U
                </PickemsText>
                <PickemsText style={[tw`h-6 text-xs text-right`]}>
                  Away
                </PickemsText>
              </View>
            </View>
            <ScrollView
              horizontal
              ref={matchupsScrollViewRef}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              style={[tw`pr-20`]}
            >
              <View style={[tw`flex flex-row gap-4 ml-18`]}>
                {sortedMatchups.map((matchup) => (
                  <View key={matchup.id} style={[tw`flex flex-col h-18 `]}>
                    <PickemsText style={[tw`basis-1/3 w-10 text-xs`]}>
                      {matchup.home_team.abbreviation}
                    </PickemsText>
                    <PickemsText style={[tw`basis-1/3 w-10 text-xs`]}>
                      {matchup.over_under_number || 40}
                    </PickemsText>
                    <PickemsText style={[tw`basis-1/3 w-10 text-xs`]}>
                      {matchup.away_team.abbreviation}
                    </PickemsText>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={isUserRefresh}
                onRefresh={() => {
                  setIsUserRefresh(true);
                  refetchMatchups();
                  refetchUsers();
                }}
              />
            }
            style={[tw`mt-3`]}
          >
            <View style={[tw`absolute  bg-white z-20`]}>
              <View style={[tw`w-15 flex flex-col gap-4`]}>
                {sortedUsers?.map((u) => {
                  const totalWins =
                    u.total_over_under_selections_correct +
                    u.total_team_selections_correct;
                  const totalLosses = u.totalCompleteMatchups * 2 - totalWins;

                  const isCurrentUser = u.user_id === user.user.id;
                  return (
                    <View key={u.user_id} style={[tw`relative h-16 pl-2`]}>
                      <PickemsText
                        style={[
                          tw`h-6 ${
                            isCurrentUser ? "text-pickems-blue font-bold" : ""
                          }`,
                        ]}
                      >
                        {u.user_name}
                      </PickemsText>
                      <PickemsText
                        style={[
                          tw`h-6 ${isCurrentUser ? "text-pickems-blue" : ""}`,
                        ]}
                      >
                        {totalWins} - {totalLosses}
                      </PickemsText>
                      <View
                        style={[
                          tw`absolute h-[1px] bg-slate-300/70 w-100 -bottom-1`,
                        ]}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
            <ScrollView
              ref={usersScrollViewRef}
              horizontal
              style={[tw`pr-20 `]}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              <View style={[tw`flex  flex-col gap-4  ml-18`]}>
                {sortedUsers?.map((user, ix) => {
                  return (
                    <View key={user.user_id} style={[tw`flex flex-row gap-4`]}>
                      {sortedMatchups.map((m) => {
                        const pick = m.picks.find(
                          (p) => p.user_id === user.user_id
                        );
                        const homeTeamSelected =
                          m.home_team.id === pick?.team_selection;

                        return (
                          <View
                            key={m.id}
                            style={[tw`flex flex-col h-16 items-center `]}
                          >
                            <View style={[tw``]} />
                            <View style={[tw`w-10 `]}>
                              {pick ? (
                                <View style={[tw`flex flex-col w-6 `]}>
                                  <TeamLogo
                                    team={
                                      homeTeamSelected
                                        ? (m.home_team.name as NFLTeamNames)
                                        : (m.away_team.name as NFLTeamNames)
                                    }
                                    size={24}
                                  />
                                  <PickemsText
                                    adjustsFontSizeToFit
                                    numberOfLines={1}
                                    style={[
                                      tw`text-xs text-blue-900 font-semibold`,
                                    ]}
                                  >
                                    {homeTeamSelected
                                      ? m.home_team.abbreviation
                                      : m.away_team.abbreviation}
                                  </PickemsText>
                                  {currLeague?.isOverUnderEnabled && (
                                    <PickemsText
                                      style={[
                                        tw`text-center text-2xs font-bold text-pickems-blue`,
                                      ]}
                                    >
                                      {pick.over_under_selection === "Over"
                                        ? "O↑"
                                        : "U↓"}
                                    </PickemsText>
                                  )}
                                </View>
                              ) : (
                                <View
                                  style={[
                                    tw`flex flex-col justify-center  h-12`,
                                  ]}
                                >
                                  <PickemsText style={[tw`w-4 text-right   `]}>
                                    -
                                  </PickemsText>
                                </View>
                              )}
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  );
                })}
              </View>
            </ScrollView>
            {/* </View> */}
          </ScrollView>
        </>
      )}

      {/* <PickemsText style={[tw``]}>League Picks</PickemsText> */}
    </View>
  );
}
