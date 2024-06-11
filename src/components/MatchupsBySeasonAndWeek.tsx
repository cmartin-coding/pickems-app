import { tw } from "@/tailwind";
import { ActivityIndicator, View, ViewStyle } from "react-native";
import { useGetMatchupsBySeasonQuery } from "../services/user";
import { PickemsText } from "./PickemsText";
import Svg, { Path } from "react-native-svg";
import { NFL } from "../constants/team-logos/nfl";
import { TeamLogo } from "../constants/team-logos/TeamLogo";
import { NFLTeamNames } from "../types/types";
import { MatchupsTeamCard } from "./MatchupsTeamCard";
type MatchupsBySeasonAndWeekType = {
  season: number;
  week: number;
  style?: ViewStyle;
  matchups: any[];
};

export function MatchupsBySeasonAndWeek(props: MatchupsBySeasonAndWeekType) {
  // const { data: matchups, isLoading } = useGetMatchupsBySeasonQuery({
  //   season: props.season,
  //   week: props.week,
  // });

  // if (isLoading) {
  //   return <ActivityIndicator />;
  // }

  // if (!matchups) {
  //   return <PickemsText>No matchups data.</PickemsText>;
  // }
  const matchups = props.matchups.filter((m) => m.week === props.week);

  return (
    <View
      style={[tw`flex flex-col items-center  w-[92%] px-4 gap-3 `, props.style]}
    >
      {matchups.map((matchup) => {
        const isHomeTeamWinner =
          matchup.winner && matchup.winner === matchup.home_team.id;
        const isAwayTeamWinner =
          matchup.winner && matchup.winner === matchup.away_team.id;
        return (
          <View
            style={[
              tw`flex flex-1  flex-col border bg-blue-200/20 border-slate-300 rounded-md w-full`,
            ]}
            key={matchup.id}
          >
            <View style={[tw`flex flex-row items-center`]}>
              <MatchupsTeamCard
                abbreviation={matchup.home_team.abbreviation as string}
                isComplete={matchup.isComplete}
                isWinner={!!isHomeTeamWinner}
                score={matchup.score.home || 0}
                teamName={matchup.home_team.name}
              />
              <PickemsText style={[tw`flex-1 text-center`]}>VS.</PickemsText>
              <MatchupsTeamCard
                abbreviation={matchup.away_team.abbreviation as string}
                isComplete={matchup.isComplete}
                isWinner={!!isAwayTeamWinner}
                score={matchup.score.away || 0}
                teamName={matchup.away_team.name}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}
