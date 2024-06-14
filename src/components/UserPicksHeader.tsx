import { ScrollView, TouchableOpacity, View } from "react-native";
import { PickemsHeader } from "./PickemsHeader";
import { tw } from "@/tailwind";
import { Ionicons } from "@expo/vector-icons";
import { PickemsText } from "./PickemsText";
import { PickemsInputModal } from "./PickemsInputModal";
import { useRef, useState } from "react";
import { getCurrentNFLWeek } from "../helpers/helpers";
import { NFL_WEEKS } from "../constants/weeks";

type UserPicksHeaderType = {
  onWeekChange: (week: number) => void;
  selectedWeek: number;
  currWeek: number;
};
export function UserPicksHeader(props: UserPicksHeaderType) {
  const scrollViewRef = useRef(null);
  const [weeksItemHeight, setWeeksItemHeight] = useState(0);
  const [isModalShown, setIsModalShown] = useState(false);

  return (
    <>
      <View style={[tw`flex flex-col bg-white items-center gap-2`]}>
        <PickemsHeader style={[tw`mb-0`]}>2024 Picks</PickemsHeader>

        <View
          style={[
            tw`flex flex-row border p-1 ${
              props.currWeek === props.selectedWeek ? "" : "bg-blue-200"
            } rounded-lg items-center`,
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              if (props.selectedWeek > 1) {
                props.onWeekChange(props.selectedWeek - 1);
                // setSelectedWeek((prev) => prev - 1);
              }
            }}
            style={[tw`border-r  border-r-black`]}
          >
            <Ionicons name="chevron-back-sharp" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsModalShown(true);
            }}
            style={[tw`flex px-2 flex-row gap-1 items-center`]}
          >
            <PickemsText>Week {props.selectedWeek}</PickemsText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[tw`border-l  flex flex-row justify-center border-l-black`]}
            onPress={() => {
              if (props.selectedWeek < 18) {
                props.onWeekChange(props.selectedWeek + 1);
                // setSelectedWeek((prev) => prev + 1);
              }
            }}
          >
            <Ionicons name="chevron-forward-sharp" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <PickemsInputModal
        visible={isModalShown}
        onDismiss={() => {
          setIsModalShown(false);
        }}
      >
        <View style={[tw`pb-10`]}>
          <View
            style={[
              tw`flex flex-row border-b border-b-slate-300 pb-2 items-center justify-between`,
            ]}
          >
            <View style={[tw`flex-1`]} />
            <PickemsText style={[tw`flex-1 text-md`]}>Select Week</PickemsText>
            <TouchableOpacity
              onPress={() => {
                setIsModalShown(false);
              }}
              style={[tw`flex-1 flex flex-row justify-end`]}
            >
              <Ionicons name="close-circle-outline" size={28} color={"black"} />
            </TouchableOpacity>
          </View>
          <ScrollView
            contentOffset={{ x: 0, y: (props.selectedWeek - 1) * 48 }}
            ref={scrollViewRef}
            style={[tw`flex flex-col mt-3`]}
          >
            {NFL_WEEKS.map((x) => {
              const isSelected = x === props.selectedWeek;
              return (
                <TouchableOpacity
                  onLayout={(event) => {
                    if (weeksItemHeight === 0) {
                      const { height } = event.nativeEvent.layout;
                      setWeeksItemHeight(height);
                    }
                  }}
                  key={x}
                  style={[
                    tw`${
                      isSelected ? "bg-black/10" : ""
                    } rounded-lg p-3 flex flex-row items-center justify-between`,
                  ]}
                  onPress={() => {
                    // setSelectedWeek(x);
                    props.onWeekChange(x);
                    setIsModalShown(false);
                  }}
                >
                  <View style={[tw`flex flex-col`]}>
                    <PickemsText style={[tw`text-black font-bold`]}>
                      Week {x}
                    </PickemsText>
                    {x === props.currWeek && (
                      <PickemsText style={[tw`text-xs`]}>
                        Current Week
                      </PickemsText>
                    )}
                  </View>
                  {isSelected && (
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={24}
                      color={"green"}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </PickemsInputModal>
    </>
  );
}
