import { tw } from "@/tailwind";
import { TouchableOpacity, View, ViewStyle } from "react-native";
import { MatchupsTeamCard } from "../MatchupsTeamCard";
import { PickemsText } from "../PickemsText";
import { MatchupPicksType } from "@/src/types/types";
import { PickemsOptionSlider } from "../PickemsOptionSlider";
import { PickemsButton } from "../PickemsButton";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { PicksMatchupCard } from "../PicksMatchupCard";
import { formatMatchupsByTimeOfDay } from "@/src/helpers/helpers";
import { daysOfWeek } from "@/src/constants/const";
import { format, getDay } from "date-fns";

type UserPicksScreenType = {
  isOverUnderEnabled: boolean;
  matchups: MatchupPicksType[];
  currWeek: number;
  style?: ViewStyle[];
  leagueId: string;
};
export function UserPicksScreen(props: UserPicksScreenType) {
  const matchupsWeek = props.matchups[0].week;
  const isCurrentMatchupWeek = matchupsWeek === props.currWeek;
  const [picks, setPicks] = useState([]);
  const formattedMatchups = formatMatchupsByTimeOfDay(props.matchups);
  const gameTimes = Object.keys(formattedMatchups).sort(
    //@ts-ignore
    (a, b) => new Date(a) - new Date(b)
  );

  return (
    <View>
      <PickemsButton buttonLabel="Submit Picks" style={[tw`mx-4 mb-4 p-1 `]} />
      {gameTimes.map((d) => {
        const day = daysOfWeek[getDay(new Date(d))];
        const dateStr = format(new Date(d), "MMM d ");
        const timeStr = format(new Date(d), "h:mm a");
        return (
          <View key={d} style={[tw`flex flex-col gap-2 w-full`]}>
            <View
              style={[
                tw`flex flex-row mx-4 border-b border-b-black justify-between`,
              ]}
            >
              <PickemsText style={[tw`font-bold text-lg`]}>
                {day} {dateStr}
              </PickemsText>
              <PickemsText>{timeStr}</PickemsText>
            </View>
            <View
              style={[tw`flex flex-col pt-3 pb-4 items-center   px-4 gap-3  `]}
            >
              {formattedMatchups[d].map((matchup) => {
                const overUnderVal = matchup.odds.over ? matchup.odds.over : 56;
                const pick = matchup.picks[0];
                const selectedHomeTeam =
                  pick?.team_selection === matchup.home_team.id;
                const selectedAwayTeam =
                  pick?.team_selection === matchup.away_team.id;

                return (
                  <PicksMatchupCard
                    key={matchup.id}
                    leagueId={props.leagueId}
                    isCurrentMatchupWeek={isCurrentMatchupWeek}
                    isSelectedAwayTeam={selectedAwayTeam}
                    isSelectedHomeTeam={selectedHomeTeam}
                    matchup={matchup}
                    overUnderInfo={{ over: 56, under: 56 }}
                  />
                );
              })}
            </View>
          </View>
        );
      })}
      {/* <View style={[tw`flex flex-col items-center  px-4 gap-5 `, props.style]}>
        {props.matchups.map((matchup) => {
          const overUnderVal = matchup.odds.over ? matchup.odds.over : 56;
          const pick = matchup.picks[0];
          const selectedHomeTeam =
            pick?.team_selection === matchup.home_team.id;
          const selectedAwayTeam =
            pick?.team_selection === matchup.away_team.id;

          return (
            <PicksMatchupCard
              key={matchup.id}
              isCurrentMatchupWeek={isCurrentMatchupWeek}
              isSelectedAwayTeam={selectedAwayTeam}
              isSelectedHomeTeam={selectedHomeTeam}
              matchup={matchup}
              overUnderInfo={{ over: 56, under: 56 }}
            />
          );
        })}
      </View> */}
      <PickemsButton buttonLabel="Submit Picks" style={[tw`mx-4 mt-4 p-1 `]} />
    </View>
  );
}
