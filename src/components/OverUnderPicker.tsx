import { useEffect, useRef, useState } from "react";
import { Animated, TouchableOpacity, View, ViewStyle } from "react-native";
import { PickemsText } from "./PickemsText";
import tw from "@/tailwind";

type OverUnderPickerType = {
  overUnderValue: number;
  currentSelection: "Over" | "Under" | null;
  style?: ViewStyle[];
  highlightStyle?: ViewStyle[];
  onSelectOverUnder: (selection: "Over" | "Under") => void;
  isDisabled?: boolean;
};
export function OverUnderPicker(props: OverUnderPickerType) {
  const [overUnderSelection, setOverUnderSelection] = useState<
    "Over" | "Under" | null
  >(props.currentSelection);
  const startingTransitionValue = props.currentSelection === "Over" ? 0 : 1;
  const transitionValue = useRef(
    new Animated.Value(startingTransitionValue)
  ).current;
  const [height, setHeight] = useState(0);
  const toggleAnimation = (val: boolean) => {
    Animated.timing(transitionValue, {
      toValue: val ? 0 : 1,
      useNativeDriver: true,
      duration: 300,
    }).start();
  };

  const translateY = transitionValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height],
  });

  return (
    <View
      style={[tw`flex flex-col relative`, props.style]}
      onLayout={(ev) => {
        const { height } = ev.nativeEvent.layout;
        setHeight(height / 2);
      }}
    >
      <TouchableOpacity
        disabled={props.isDisabled}
        style={[tw` z-20 flex-1 flex flex-row items-center justify-center`]}
        onPress={() => {
          toggleAnimation(true);
          setOverUnderSelection("Over");
          props.onSelectOverUnder("Over");
        }}
      >
        <PickemsText style={[tw`text-center`]}>
          Over {props.overUnderValue}
        </PickemsText>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={props.isDisabled}
        onPress={() => {
          toggleAnimation(false);
          setOverUnderSelection("Under");
          props.onSelectOverUnder("Under");
        }}
        style={[tw`z-20 flex-1 flex flex-row justify-center items-center`]}
      >
        <PickemsText style={[tw`text-center`]}>
          Under {props.overUnderValue}
        </PickemsText>
      </TouchableOpacity>
      <Animated.View
        style={[
          tw`h-[49%]`,
          props.highlightStyle,
          tw`absolute ${overUnderSelection ? "w-full" : ""} 
           `,
          { transform: [{ translateY: translateY }] },
        ]}
      />
    </View>
  );
}
