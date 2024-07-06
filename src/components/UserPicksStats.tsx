import { Switch, View } from "react-native";
import { useAppSelector } from "../store";
import { PickemsText } from "./PickemsText";
import tw from "@/tailwind";
import { useState } from "react";
type CurrentStatsType = {
  stats: {
    numberOfCorrectPicks: number;
    numberOfCorrectOverUnderPicks: number;
    totalSelections: number;
    hasCompletedWeeklyPicks: boolean;
  };
  onIncludeCompletedPicks: (val: boolean) => void;
};

export function UserPickStats(props: CurrentStatsType) {
  const user = useAppSelector((state) => state.user);
  const [isSubmittedPicksIncluded, setIsSubmittedPicksIncluded] =
    useState(true);
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
    <View
      style={[
        tw` border -mt-6 ${
          props.stats.hasCompletedWeeklyPicks ? "mb-6" : "mb-0"
        } bg-white rounded-md p-2 flex  flex-col gap-1`,
      ]}
    >
      <View>
        <PickemsText style={[tw`text-black`]}>{user.user.name}</PickemsText>
        <View style={[tw`flex flex-col mt-2 gap-2`]}>
          <View style={[tw`flex flex-col gap-1`]}>
            {/* <PickemsText>Over Under Picks</PickemsText> */}
            <View style={[tw`flex flex-row`]}>
              <PickemsText style={[tw`text-black`]}>
                {props.stats.numberOfCorrectOverUnderPicks +
                  props.stats.numberOfCorrectPicks}
                -{incorrectPicks + incorrectOverUnder} | {totalAccuracy}%
                Accuracy
              </PickemsText>
            </View>
          </View>
        </View>
      </View>
      <View style={[tw`flex  flex-row items-center justify-between`]}>
        <PickemsText style={[tw`text-black`]}>
          Include submitted picks?
        </PickemsText>
        <Switch
          value={isSubmittedPicksIncluded}
          onChange={() => {
            props.onIncludeCompletedPicks(!isSubmittedPicksIncluded);
            setIsSubmittedPicksIncluded((prev) => !prev);
          }}
        />
      </View>
    </View>
  );
}
