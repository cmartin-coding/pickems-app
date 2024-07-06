import { TouchableOpacity, View } from "react-native";
import { MatchupsTeamCard } from "./MatchupsTeamCard";
import { PickemsText } from "./PickemsText";
import tw from "@/tailwind";
import { Ionicons } from "@expo/vector-icons";
import { MatchupPicksType } from "../types/types";
import { PickemsOptionSlider } from "./PickemsOptionSlider";
import { useEffect, useState } from "react";
import { Tables } from "../types/supabaseTypes";
import uuid from "react-native-uuid";
import { useAppSelector } from "../store";
import { isAfter, isEqual } from "date-fns";
import { OverUnderPicker } from "./OverUnderPicker";
import { getMatchIsStartingSoonLockout } from "../helpers/helpers";
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
  const initialPickVal = {
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
  };
  const [pick, setPick] = useState<Tables<"picks">>(initialPickVal);

  const pickIsMade = !!props.overUnderInfo
    ? pick.over_under_selection && pick.team_selection
    : !!pick.team_selection;

  useEffect(() => {
    if (pickIsMade && userHasAlteredPick) {
      props.onPickCompleted(pick);
    }
  }, [pick]);

  const isHomeTeamWinner = props.matchup.winner === props.matchup.home_team.id;
  const isAwayTeamWinner = props.matchup.winner === props.matchup.away_team.id;

  const isSelectedHomeTeam = pick.team_selection === props.matchup.home_team.id;
  const isSelectedAwayTeam = pick.team_selection === props.matchup.away_team.id;

  const isHomePickCorrect =
    props.matchup.isComplete && isSelectedHomeTeam && isHomeTeamWinner;
  const isAwayPickCorrect =
    props.matchup.isComplete && isSelectedAwayTeam && isAwayTeamWinner;

  const isMatchupLocked = getMatchIsStartingSoonLockout(props.matchup.time);
  return (
    <View
      style={[
        tw`flex h-17  rounded-md flex-row gap-4 w-full 
        `,
      ]}
    >
      <View
        style={[tw`flex flex-1 relative  flex-col   `]}
        key={props.matchup.id}
      >
        <View style={[tw`flex flex-row gap-4 flex-1 items-center`]}>
          <TouchableOpacity
            disabled={props.matchup.isComplete || isMatchupLocked}
            style={[
              tw`flex-1 flex flex-col dark:border-white border rounded-lg p-1 items-center 
             
          ${
            isSelectedAwayTeam && !props.matchup.isComplete && !isMatchupLocked
              ? "rounded-xl bg-blue-400/30"
              : ""
          }
            ${isAwayPickCorrect ? "bg-green-300" : ""}
            ${isHomeTeamWinner && isSelectedAwayTeam ? "bg-red-300" : ""}
         
          `,
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
              isComplete={props.matchup.isComplete || isMatchupLocked}
              isWinner={isAwayTeamWinner}
              score={props.matchup.score.away || 0}
              teamName={props.matchup.away_team.name}
            />
          </TouchableOpacity>

          <PickemsText style={[tw`text-center text-lg  font-extrabold`]}>
            @
          </PickemsText>
          <TouchableOpacity
            disabled={props.matchup.isComplete || isMatchupLocked}
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
              tw`flex-1 relative dark:border-white border p-1 rounded-lg flex 
              ${
                isSelectedHomeTeam &&
                !props.matchup.isComplete &&
                !isMatchupLocked
                  ? " bg-blue-400/30"
                  : ""
              }
                ${isHomePickCorrect ? "bg-green-300" : ""}
                ${isAwayTeamWinner && isSelectedHomeTeam ? "bg-red-300" : ""}
              flex-col items-center`,
            ]}
          >
            <MatchupsTeamCard
              teamId={props.matchup.home_team.id}
              abbreviation={props.matchup.home_team.abbreviation as string}
              isComplete={props.matchup.isComplete || isMatchupLocked}
              isWinner={isHomeTeamWinner}
              score={props.matchup.score.home || 0}
              teamName={props.matchup.home_team.name}
            />
          </TouchableOpacity>
        </View>
      </View>

      {props.overUnderInfo && (
        <OverUnderPicker
          isDisabled={props.matchup.isComplete || isMatchupLocked}
          style={[tw` border  rounded-md `]}
          currentSelection={
            pick.over_under_selection
              ? (pick.over_under_selection as "Over" | "Under")
              : null
          }
          highlightStyle={[
            tw`${
              pick.over_under_selection === "Over"
                ? "rounded-t-md"
                : "rounded-b-md"
            } bg-blue-400/30 ${
              pick.over_under_selection === "Over" &&
              props.matchup.over_under_winner === "Over"
                ? "bg-green-300"
                : ""
            }
            ${
              pick.over_under_selection === "Under" &&
              props.matchup.over_under_winner === "Under"
                ? "bg-green-300"
                : ""
            }
            ${
              pick.over_under_selection === "Over" &&
              props.matchup.over_under_winner === "Under"
                ? "bg-red-300"
                : ""
            }
            ${
              pick.over_under_selection === "Under" &&
              props.matchup.over_under_winner === "Over"
                ? "bg-red-300"
                : ""
            }
            `,
          ]}
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
