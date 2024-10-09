import tw from "@/tailwind";
import { TextStyle, TouchableOpacity, View } from "react-native";
import { PickemsText } from "./PickemsText";
import { TeamLogo } from "../constants/team-logos/TeamLogo";
import { NFLTeamNames, Score } from "../types/types";
import { getTeamColors } from "../helpers/helpers";

type MatchupsTeamCardType = {
  isWinner: boolean;
  teamName: NFLTeamNames;
  teamId: number;
  score: number;
  isComplete: boolean;
  abbreviation: string;
  textStyle?: TextStyle[];
  record?: string;
  // useTeamColor?: boolean;
};
export function MatchupsTeamCard(props: MatchupsTeamCardType) {
  const teamTextColor = getTeamColors(props.teamName, "primary", "text");

  return (
    <View
      style={[
        tw`flex-1   flex  flex-row  rounded-md ${props.isWinner ? "" : ""}`,
      ]}
    >
      <View style={[tw`flex flex-col items-center justify-center `]}>
        <View style={[tw`flex flex-row items-center  gap-1`]}>
          <PickemsText
            style={[tw`font-bold text-sm dark:text-white `, props.textStyle]}
          >
            {props.abbreviation}
          </PickemsText>
          <View style={[tw`w-12 h-12 flex flex-row justify-center `]}>
            <TeamLogo team={props.teamName as NFLTeamNames} />
          </View>
        </View>

        {props.isComplete && (
          <PickemsText
            style={[
              tw`${props.isWinner ? "font-bold  " : ""}`,
              props.textStyle,
            ]}
          >
            {props.score}
          </PickemsText>
        )}
        {props.record && props.record.length > 0 && (
          <PickemsText style={[tw`text-sm pb-1 font-semibold text-slate-200`]}>
            {props.record}
          </PickemsText>
        )}
      </View>
    </View>
  );
}
