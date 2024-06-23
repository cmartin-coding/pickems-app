import { tw } from "@/tailwind";
import {
  Animated,
  Easing,
  LayoutAnimation,
  TouchableOpacity,
  View,
} from "react-native";
import { PickemsText } from "./PickemsText";
import { useEffect, useRef, useState } from "react";
type PickemsOptionSliderType = {
  buttonOneLabel: string;
  buttonTwoLabel: string;
  selectedOption: boolean;
  onClickOption: (option: boolean) => void;
  highlightColor?: string;
};
export function PickemsOptionSlider(props: PickemsOptionSliderType) {
  const transitionValue = useRef(new Animated.Value(0)).current;

  const [buttonWidths, setButtonWidths] = useState({
    [props.buttonOneLabel]: 0,
    [props.buttonTwoLabel]: 0,
  });

  const translateX = transitionValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, buttonWidths[props.buttonOneLabel]],
  });

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [props.selectedOption]);

  const toggleOption = (option: boolean) => {
    Animated.timing(transitionValue, {
      toValue: option ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.ease),
    }).start();
    props.onClickOption(option);
  };
  return (
    <View
      style={[
        tw`flex p-1 w-[90%] flex-row bg-gray-200/70 rounded-lg  relative`,
      ]}
    >
      <Animated.View
        style={[
          tw`h-full m-1 shadow-md ${
            props.highlightColor ? props.highlightColor : "bg-green-400"
          }  absolute rounded-md `,
          {
            transform: [{ translateX }],
            width: "50%",
          },
        ]}
      />
      <TouchableOpacity
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setButtonWidths((prev) => ({
            ...prev,
            [props.buttonOneLabel]: width,
          }));
        }}
        onPress={() => {
          toggleOption(true);
        }}
        style={[tw`flex-1 py-1`]}
      >
        <PickemsText style={[tw`text-center`]}>
          {props.buttonOneLabel}
        </PickemsText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          toggleOption(false);
        }}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setButtonWidths((prev) => ({
            ...prev,
            [props.buttonTwoLabel]: width,
          }));
        }}
        style={[tw`flex-1 py-1`]}
      >
        <PickemsText style={[tw`text-center`]}>
          {props.buttonTwoLabel}
        </PickemsText>
      </TouchableOpacity>
    </View>
  );
}
