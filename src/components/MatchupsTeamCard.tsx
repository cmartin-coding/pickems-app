import { tw } from "@/tailwind";
import { TouchableOpacity, View } from "react-native";
import { PickemsText } from "./PickemsText";
import { TeamLogo } from "../constants/team-logos/TeamLogo";
import { NFLTeamNames, Score } from "../types/types";

type MatchupsTeamCardType = {
  isWinner: boolean;
  teamName: string;
  teamId: number;
  score: number;
  isComplete: boolean;
  abbreviation: string;
};
export function MatchupsTeamCard(props: MatchupsTeamCardType) {
  return (
    <View
      style={[
        tw`flex-1   flex  flex-row justify-between rounded-md ${
          props.isWinner ? "" : ""
        }`,
      ]}
    >
      <View style={[tw`flex flex-row items-center gap-1`]}>
        <View style={[tw`flex flex-row gap-1`]}>
          <PickemsText style={[tw``]}>{props.abbreviation}</PickemsText>
          {props.isComplete && <PickemsText>({props.score})</PickemsText>}
        </View>
        <View style={[tw`w-15 h-15 flex flex-row justify-center `]}>
          <TeamLogo team={props.teamName as NFLTeamNames} />
        </View>
      </View>
    </View>
  );
}
