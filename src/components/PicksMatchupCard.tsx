import { TouchableOpacity, View } from "react-native";
import { MatchupsTeamCard } from "./MatchupsTeamCard";
import { PickemsText } from "./PickemsText";
import { tw } from "@/tailwind";
import { Ionicons } from "@expo/vector-icons";
import { MatchupPicksType } from "../types/types";
import { PickemsOptionSlider } from "./PickemsOptionSlider";
import { useState } from "react";
import { Tables } from "../types/supabaseTypes";
import uuid from "react-native-uuid";
import { useAppSelector } from "../store";
type PicksMatchupCardType = {
  matchup: MatchupPicksType;
  leagueId: string;
  isSelectedHomeTeam: boolean;
  isSelectedAwayTeam: boolean;
  isCurrentMatchupWeek: boolean;
  overUnderInfo: { over: number; under: number };
};
export function PicksMatchupCard(props: PicksMatchupCardType) {
  const userId = useAppSelector((state) => state.user.user.id);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pickID = uuid.v4();
  const [pick, setPick] = useState<Tables<"picks">>({
    id: pickID as string,
    is_over_under_selection_correct:
      props.matchup.picks[0]?.is_team_selection_correct,
    is_team_selection_correct:
      props.matchup.picks[0]?.is_over_under_selection_correct,
    league_id: props.leagueId,
    matchup_id: props.matchup.id,
    over_under_selection: props.matchup.picks[0]?.over_under_selection,
    user_id: userId,
    season_id: props.matchup.season,
    team_selection: props.matchup.picks[0]?.team_selection,
  });

  const pickIsMade = pick.over_under_selection && pick.team_selection;

  return (
    <View
      style={[
        tw`flex flex-1  flex-col border bg-blue-200/20 ${
          pickIsMade ? "border-2 border-green-500" : "border-slate-300"
        }  rounded-md w-full`,
      ]}
      key={props.matchup.id}
    >
      <View style={[tw`flex flex-row gap-2 flex-1 items-center`]}>
        <TouchableOpacity
          onPress={() => {
            setPick((prev) => ({
              ...prev,
              team_selection: props.matchup.home_team.id,
            }));
          }}
          style={[
            tw`flex-1 relative flex ${
              pick.team_selection === props.matchup.home_team.id
                ? " rounded-md bg-blue-300/20"
                : ""
            } flex-col items-center`,
          ]}
        >
          {isCollapsed ? (
            <View style={[tw`p-2`]}>
              <PickemsText style={[tw`font-bold`]}>
                {props.matchup.home_team.abbreviation}{" "}
                {props.matchup.home_team.name}
              </PickemsText>
            </View>
          ) : (
            <MatchupsTeamCard
              teamId={props.matchup.home_team.id}
              abbreviation={props.matchup.home_team.abbreviation as string}
              isComplete={props.matchup.isComplete}
              isWinner={false}
              score={props.matchup.score.home || 0}
              teamName={props.matchup.home_team.name}
            />
          )}
          {props.isCurrentMatchupWeek && (
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
        <PickemsText style={[tw`text-center  text-black font-extrabold`]}>
          VS.
        </PickemsText>
        <TouchableOpacity
          style={[
            tw`flex-1 flex flex-col items-center 
         
          ${
            pick.team_selection === props.matchup.away_team.id
              ? "rounded-md bg-blue-300/20"
              : ""
          }`,
          ]}
          onPress={() => {
            setPick((prev) => ({
              ...prev,
              team_selection: props.matchup.away_team.id,
            }));
          }}
        >
          {isCollapsed ? (
            <View style={[tw`p-2`]}>
              <PickemsText style={[tw`font-bold`]}>
                {props.matchup.away_team.abbreviation}{" "}
                {props.matchup.away_team.name}
              </PickemsText>
            </View>
          ) : (
            <MatchupsTeamCard
              teamId={props.matchup.away_team.id}
              abbreviation={props.matchup.away_team.abbreviation as string}
              isComplete={props.matchup.isComplete}
              isWinner={false}
              score={props.matchup.score.away || 0}
              teamName={props.matchup.away_team.name}
            />
          )}
          {props.isCurrentMatchupWeek && (
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
      </View>
      {props.overUnderInfo && props.isCurrentMatchupWeek && (
        <View
          style={[tw`flex  border-t border-t-black flex-col  items-center`]}
        >
          {/* <PickemsText>Over/Under</PickemsText> */}
          {/* <PickemsOptionSlider
            highlightBgColor="bg-blue-300"
            buttonOneLabel={`Under ${props.overUnderInfo.over}`}
            buttonTwoLabel={`Over ${props.overUnderInfo.over}`}
            onClickOption={(option, val) => {
              setPick((prev) => ({
                ...prev,
                over_under_selection: val as string,
              }));
            }}
            selectedOption={pick.over_under_selection || ""}
          /> */}
        </View>
      )}
      {/* <View style={[tw`flex flex-row justify-end`]}>
        <TouchableOpacity
          onPress={() => {
            setIsCollapsed((prev) => !prev);
          }}
        >
          <Ionicons size={20} name="chevron-collapse-outline" />
        </TouchableOpacity>
      </View> */}
    </View>
  );
}
