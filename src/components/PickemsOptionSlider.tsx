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
  selectedOption: string;
  onClickOption: (option: boolean, val?: string) => void;
  highlightBgColor?: string;
};
export function PickemsOptionSlider(props: PickemsOptionSliderType) {
  const transitionValue = useRef(new Animated.Value(0)).current;
  const [selectedVal, setSelectedVal] = useState(props.selectedOption);
  const [width, setWidth] = useState(0);
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
  };

  useEffect(() => {
    if (selectedVal === props.buttonOneLabel) {
      setWidth(buttonWidths[props.buttonOneLabel]);
    }
    if (selectedVal === props.buttonTwoLabel) {
      setWidth(buttonWidths[props.buttonTwoLabel]);
    }
  }, [buttonWidths, selectedVal]);

  return (
    <View style={[tw`flex flex-row relative`]}>
      <Animated.View
        style={[
          tw`h-full  ${
            props.highlightBgColor ? props.highlightBgColor : "bg-green-400"
          }  absolute rounded-md `,
          {
            transform: [{ translateX }],
            width: width,
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
          setSelectedVal(props.buttonOneLabel);
          toggleOption(true);
          props.onClickOption(true, props.buttonOneLabel);
        }}
        style={[tw`px-4 py-2 flex-1`]}
      >
        <PickemsText style={[tw`text-center`]}>
          {props.buttonOneLabel}
        </PickemsText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setSelectedVal(props.buttonTwoLabel);
          props.onClickOption(false, props.buttonTwoLabel);
          toggleOption(false);
        }}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setButtonWidths((prev) => ({
            ...prev,
            [props.buttonTwoLabel]: width,
          }));
        }}
        style={[tw`px-4 py-2 flex-1`]}
      >
        <PickemsText style={[tw`text-center`]}>
          {props.buttonTwoLabel}
        </PickemsText>
      </TouchableOpacity>
    </View>
  );
}
