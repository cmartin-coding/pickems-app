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
  // useTeamColor?: boolean;
};
export function MatchupsTeamCard(props: MatchupsTeamCardType) {
  const teamTextColor = getTeamColors(props.teamName, "primary", "text");
  return (
    <View
      style={[
        tw`flex-1   flex  flex-row justify-between rounded-md ${
          props.isWinner ? "" : ""
        }`,
      ]}
    >
      <View style={[tw`flex flex-col items-center justify-center `]}>
        <View style={[tw`flex flex-row items-center  gap-1`]}>
          <PickemsText
            style={[tw`font-bold dark:text-white `, props.textStyle]}
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
      </View>
    </View>
  );
}
