import { View } from "react-native";
import { useAppSelector } from "../store";
import { PickemsText } from "./PickemsText";
import { tw } from "@/tailwind";
type CurrentStatsType = {
  stats: {
    numberOfCorrectPicks: number;
    numberOfCorrectOverUnderPicks: number;
    totalSelections: number;
  };
};

export function CurrentStats(props: CurrentStatsType) {
  const user = useAppSelector((state) => state.user);
  const teamPicksAccuracy =
    props.stats.numberOfCorrectPicks / props.stats.totalSelections || 0;
  const overUnderPicksAccuracy =
    props.stats.numberOfCorrectOverUnderPicks / props.stats.totalSelections ||
    0;
  const totalAccuracy =
    ((props.stats.numberOfCorrectOverUnderPicks +
      props.stats.numberOfCorrectPicks) /
      (props.stats.totalSelections * 2)) *
      100 || 0;

  const incorrectPicks =
    props.stats.totalSelections - props.stats.numberOfCorrectPicks;
  const incorrectOverUnder =
    props.stats.totalSelections - props.stats.numberOfCorrectOverUnderPicks;

  return (
    <View>
      <PickemsText>{user.user.name}</PickemsText>
      <View style={[tw`flex flex-col mt-2 gap-2`]}>
        <View style={[tw`flex flex-col gap-1`]}>
          {/* <PickemsText>Over Under Picks</PickemsText> */}
          <View style={[tw`flex flex-row`]}>
            <PickemsText>
              {props.stats.numberOfCorrectOverUnderPicks +
                props.stats.numberOfCorrectPicks}
              -{incorrectPicks + incorrectOverUnder} | {totalAccuracy}% Accuracy
            </PickemsText>
          </View>
        </View>
        {/* <View style={[tw`flex flex-col gap-2`]}>
          <View style={[tw`flex flex-row`]}>
            <PickemsText>
              Team Picks {props.stats.numberOfCorrectPicks}-{incorrectPicks} |
              {teamPicksAccuracy}% Accuracy
            </PickemsText>
          </View>
        </View> */}
        {/* <View style={[tw`flex flex-col gap-1`]}>
          <View style={[tw`flex flex-row`]}>
            <PickemsText>
              Over/Under {props.stats.numberOfCorrectOverUnderPicks}-
              {incorrectOverUnder} |{overUnderPicksAccuracy}% Accuracy
            </PickemsText>
          </View>
        </View> */}
      </View>
    </View>
  );
}
