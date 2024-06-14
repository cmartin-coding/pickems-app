import { tw } from "@/tailwind";
import { Switch, View, ViewStyle } from "react-native";
import { MatchupsTeamCard } from "../MatchupsTeamCard";
import { PickemsText } from "../PickemsText";
import { MatchupPicksType } from "@/src/types/types";
import { PickemsOptionSlider } from "../PickemsOptionSlider";
import { PickemsButton } from "../PickemsButton";
import { useEffect, useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { PicksMatchupCard } from "../PicksMatchupCard";
import {
  formatMatchupsByTimeOfDay,
  getWeeklyResults,
} from "@/src/helpers/helpers";
import { daysOfWeek } from "@/src/constants/const";
import { format, getDay } from "date-fns";
import { Tables } from "@/src/types/supabaseTypes";
import { useSubmitPicksMutation } from "@/src/services/user";
import { useAppSelector } from "@/src/store";
import { CurrentStats } from "../CurrentStats";
import { PickemsAuthenticatedPage } from "../core/PickemsAuthenticatedPage";

type UserPicksScreenType = {
  isOverUnderEnabled: boolean;
  matchups: MatchupPicksType[];
  currWeek: number;
  style?: ViewStyle[];
  leagueId: string;

  isLoading: boolean;
  onSubmitPicks: (picks: Tables<"picks">[]) => void;
};
export function UserPicksScreen(props: UserPicksScreenType) {
  const matchupsWeek = props.matchups[0].week;

  const isCurrentMatchupWeek = matchupsWeek === props.currWeek;

  const [includeCompletedPicks, setIncludeCompletedPicks] = useState(true);
  const [picks, setPicks] = useState<Tables<"picks">[]>([]);
  const [loading, setLoading] = useState(false);

  const formattedMatchups = useMemo(() => {
    let matchups = props.matchups;
    // const matchups = formatMatchupsByTimeOfDay(props.matchups);
    if (!includeCompletedPicks) {
      matchups = props.matchups.filter((x) => !x.picks[0]?.id);
    }
    return formatMatchupsByTimeOfDay(matchups);
  }, [includeCompletedPicks, props.matchups]);

  const gameTimes = Object.keys(formattedMatchups).sort(
    //@ts-ignore
    (a, b) => new Date(a) - new Date(b)
  );
  const numberOfCompletedPicks = picks.length;
  const isButtonsDisabled = numberOfCompletedPicks === 0;

  const totalMatchups = props.matchups.length;
  const totalPicksAlreadySubmitted = props.matchups.reduce((prev, acc) => {
    if (!!acc.picks[0]?.id) {
      return prev + 1;
    } else {
      return prev;
    }
  }, 0);

  const hasCompletedWeeklyPicks = totalMatchups === totalPicksAlreadySubmitted;

  const completedMatchups = props.matchups.filter((m) => m.isComplete);
  const pickResults = getWeeklyResults(completedMatchups);

  return (
    <PickemsAuthenticatedPage
      belowScrollViewChildren={
        (!isButtonsDisabled || props.isLoading) && (
          <View style={[tw`absolute bottom-0 bg-white w-full`]}>
            <PickemsButton
              onPress={async () => {
                try {
                  props.onSubmitPicks(picks);
                  setPicks([]);
                } catch (ex) {
                  console.error(ex);
                }
              }}
              buttonLabel={props.isLoading ? "Saving..." : "Save Picks"}
              style={[tw`p-4 border rounded-0 border-green-400  bg-green-100`]}
              disabledStyle="bg-gray-200"
              textStyle={[tw`text-black`]}
            />
          </View>
        )
      }
    >
      <View
        style={[
          tw` border ${
            hasCompletedWeeklyPicks ? "mb-6" : "mb-0"
          } bg-blue-200/10 rounded-md p-2 flex  flex-col gap-4`,
        ]}
      >
        <CurrentStats
          stats={{
            numberOfCorrectOverUnderPicks:
              pickResults.numberOfCorrectOverUnderPicks,
            numberOfCorrectPicks: pickResults.numberOfCorrectPicks,
            totalSelections: completedMatchups.length,
          }}
        />

        <View style={[tw`flex  flex-row items-center justify-between`]}>
          <PickemsText>Include submitted picks?</PickemsText>
          <Switch
            value={includeCompletedPicks}
            onChange={() => {
              setIncludeCompletedPicks((prev) => !prev);
            }}
          />
        </View>
      </View>
      {!hasCompletedWeeklyPicks && (
        <View
          style={[
            tw`flex mb-6 mx-4 mt-2 flex-row gap-1 items-center  justify-center`,
          ]}
        >
          <Ionicons name="alert-circle" color={"red"} size={20} />
          <PickemsText style={[tw`   text-center text-sm`]}>
            You haven't made all of your picks!
          </PickemsText>
        </View>
      )}

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
            <View style={[tw`flex flex-col pt-3  pb-4 items-center gap-3  `]}>
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
                    onPickCompleted={(pick) => {
                      const pickIndex = picks.findIndex(
                        (p) => p.id === pick.id
                      );
                      if (pickIndex < 0) {
                        setPicks((prev) => [...prev, pick]);
                      } else {
                        const newPicks = [...picks];
                        newPicks[pickIndex] = pick;

                        setPicks(newPicks);
                      }
                    }}
                  />
                );
              })}
            </View>
          </View>
        );
      })}
    </PickemsAuthenticatedPage>
  );
}
