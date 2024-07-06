import { format, getDay } from "date-fns";
import { MatchupPicksType } from "../types/types";
import { daysOfWeek } from "../constants/const";
import tw from "@/tailwind";
import { ScrollView, View } from "react-native";
import { PickemsText } from "./PickemsText";
import { PicksMatchupCard } from "./PicksMatchupCard";
import { useAppSelector } from "../store";
import { Tables } from "../types/supabaseTypes";
import { useState } from "react";
import { PickemsButton } from "./PickemsButton";

type PicksByGameTimeProps = {
  gametimes: string[];
  matchups: { [key: string]: MatchupPicksType[] };
  isCurrentMatchupWeek: boolean;
  isLoadingPicksSubmission: boolean;
  onPickCompleted: (pick: Tables<"picks">) => void;
};

export function PicksByGameTime(props: PicksByGameTimeProps) {
  const leagueId = useAppSelector((state) => state.user.currentActiveLeague);
  //   const [picks, setPicks] = useState<Tables<"picks">[]>([]);

  return (
    <>
      {props.gametimes.map((d) => {
        const day = daysOfWeek[getDay(new Date(d))];
        const dateStr = format(new Date(d), "MMM d ");
        const timeStr = format(new Date(d), "h:mm a");

        return (
          <View key={d} style={[tw`flex flex-col w-full`]}>
            <View
              style={[
                tw`flex flex-row m-2 border-b  border-b-black dark:border-b-slate-200 justify-between`,
              ]}
            >
              <PickemsText style={[tw`font-bold text-lg`]}>
                {day} {dateStr}
              </PickemsText>
              <PickemsText>{timeStr}</PickemsText>
            </View>
            <View style={[tw`flex flex-col mx-2 my-4 items-center gap-4 `]}>
              {props.matchups[d].map((matchup) => {
                const overUnderVal = matchup.odds.over ? matchup.odds.over : 56;
                const pick = matchup.picks[0];

                const selectedHomeTeam =
                  pick?.team_selection === matchup.home_team.id;
                const selectedAwayTeam =
                  pick?.team_selection === matchup.away_team.id;

                return (
                  <PicksMatchupCard
                    key={matchup.id}
                    leagueId={leagueId as string}
                    isCurrentMatchupWeek={props.isCurrentMatchupWeek}
                    isSelectedAwayTeam={selectedAwayTeam}
                    isSelectedHomeTeam={selectedHomeTeam}
                    matchup={matchup}
                    overUnderInfo={{
                      over: overUnderVal,
                      under: overUnderVal,
                    }}
                    onPickCompleted={(pick) => {
                      props.onPickCompleted(pick);
                    }}
                  />
                );
              })}
            </View>
          </View>
        );
      })}
    </>
  );
}
