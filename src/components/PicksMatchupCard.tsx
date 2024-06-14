import { TouchableOpacity, View } from "react-native";
import { MatchupsTeamCard } from "./MatchupsTeamCard";
import { PickemsText } from "./PickemsText";
import { tw } from "@/tailwind";
import { Ionicons } from "@expo/vector-icons";
import { MatchupPicksType } from "../types/types";
import { PickemsOptionSlider } from "./PickemsOptionSlider";
import { useEffect, useState } from "react";
import { Tables } from "../types/supabaseTypes";
import uuid from "react-native-uuid";
import { useAppSelector } from "../store";
import { isAfter, isEqual } from "date-fns";
import { OverUnderPicker } from "./OverUnderPicker";
type PicksMatchupCardType = {
  matchup: MatchupPicksType;
  leagueId: string;
  isSelectedHomeTeam: boolean;
  isSelectedAwayTeam: boolean;
  isCurrentMatchupWeek: boolean;
  overUnderInfo?: { over: number; under: number };
  onPickCompleted: (pick: Tables<"picks">) => void;
};
export function PicksMatchupCard(props: PicksMatchupCardType) {
  const userId = useAppSelector((state) => state.user.user.id);
  const [userHasAlteredPick, setUserHasAlteredPick] = useState(false);

  const pickID = uuid.v4();

  const [pick, setPick] = useState<Tables<"picks">>({
    id: props.matchup.picks[0]?.id
      ? props.matchup.picks[0].id
      : (pickID as string),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    league_id: props.leagueId,
    matchup_id: props.matchup.id,
    over_under_selection: props.matchup.picks[0]?.over_under_selection,
    user_id: userId,
    season_id: props.matchup.season,
    team_selection: props.matchup.picks[0]?.team_selection,
  });

  const pickIsMade = !!props.overUnderInfo
    ? pick.over_under_selection && pick.team_selection
    : !!pick.team_selection;

  useEffect(() => {
    if (pickIsMade && userHasAlteredPick) {
      props.onPickCompleted(pick);
    }
  }, [pick]);

  return (
    <View
      style={[
        tw`flex h-17 border rounded-md ${
          props.matchup.isComplete ? "border-blue-800 border-2" : ""
        } flex-row  w-full 
        `,
      ]}
    >
      <View
        style={[tw`flex flex-1 relative border-r flex-col  bg-blue-200/20 `]}
        key={props.matchup.id}
      >
        <View style={[tw`flex flex-row gap-2 flex-1 items-center`]}>
          <TouchableOpacity
            disabled={props.matchup.isComplete}
            style={[
              tw`flex-1 flex flex-col items-center 
          ${
            pick.team_selection === props.matchup.away_team.id
              ? "rounded-sm bg-blue-300/50"
              : ""
          }`,
            ]}
            onPress={() => {
              if (props.matchup.away_team.id !== pick.team_selection) {
                setUserHasAlteredPick(true);
              }
              setPick((prev) => ({
                ...prev,
                team_selection: props.matchup.away_team.id,
              }));
            }}
          >
            <MatchupsTeamCard
              teamId={props.matchup.away_team.id}
              abbreviation={props.matchup.away_team.abbreviation as string}
              isComplete={props.matchup.isComplete}
              isWinner={false}
              score={props.matchup.score.away || 0}
              teamName={props.matchup.away_team.name}
            />
            {!props.matchup.isComplete && (
              <View
                style={[
                  tw`h-4 w-4 mb-1 ${
                    pick.team_selection === props.matchup.away_team.id
                      ? "bg-green-500"
                      : ""
                  } rounded-full border border-black`,
                ]}
              />
            )}
          </TouchableOpacity>

          <PickemsText
            style={[tw`text-center text-lg text-black font-extrabold`]}
          >
            @
          </PickemsText>
          <TouchableOpacity
            disabled={props.matchup.isComplete}
            onPress={() => {
              if (props.matchup.home_team.id !== pick.team_selection) {
                setUserHasAlteredPick(true);
              }
              setPick((prev) => ({
                ...prev,
                team_selection: props.matchup.home_team.id,
              }));
            }}
            style={[
              tw`flex-1 relative flex rounded-sm
              ${
                pick.team_selection === props.matchup.home_team.id
                  ? "rounded-sm bg-blue-300/50"
                  : ""
              }
              flex-col items-center`,
            ]}
          >
            <MatchupsTeamCard
              teamId={props.matchup.home_team.id}
              abbreviation={props.matchup.home_team.abbreviation as string}
              isComplete={props.matchup.isComplete}
              isWinner={false}
              score={props.matchup.score.home || 0}
              teamName={props.matchup.home_team.name}
            />
            {!props.matchup.isComplete && (
              <View
                style={[
                  tw`h-4 w-4 mb-1 rounded-full border border-black ${
                    pick.team_selection === props.matchup.home_team.id
                      ? "bg-green-500 "
                      : ""
                  }`,
                ]}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {props.overUnderInfo && (
        <OverUnderPicker
          isDisabled={props.matchup.isComplete}
          style={[tw`border-0`]}
          currentSelection={
            pick.over_under_selection
              ? (pick.over_under_selection as "Over" | "Under")
              : null
          }
          highlightStyle={[tw`rounded-r-sm bg-slate-500/40`]}
          overUnderValue={40}
          onSelectOverUnder={(selection) => {
            if (selection !== pick.over_under_selection) {
              setUserHasAlteredPick(true);
            }
            setPick((prev) => ({ ...prev, over_under_selection: selection }));
          }}
        />
      )}
    </View>
  );
}
