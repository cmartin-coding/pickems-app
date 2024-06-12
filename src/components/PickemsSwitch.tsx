import { tw } from "@/tailwind";
import { Switch, View, ViewStyle } from "react-native";
import { PickemsText } from "./PickemsText";
import { useState } from "react";

type PickemsSwitchType = {
  isActive: boolean;
  onChange: (val: boolean) => void;
  label?: string;
  isComingSoon?: boolean;
  style?: ViewStyle[];
};
export function PickemsSwitch(props: PickemsSwitchType) {
  const [isActive, setIsActive] = useState(props.isActive);
  return (
    <View style={[tw`flex flex-row items-center justify-between`, props.style]}>
      {props.label && (
        <View style={[tw`flex flex-row items-center gap-1`]}>
          <PickemsText>{props.label}</PickemsText>
          {props.isComingSoon && (
            <View style={[tw`bg-green-300  p-1 rounded-lg`]}>
              <PickemsText style={[tw``]}>New</PickemsText>
            </View>
          )}
        </View>
      )}
      <Switch
        value={isActive}
        onChange={(ev) => {
          setIsActive((prev) => !prev);
          props.onChange(!isActive);
        }}
      />
    </View>
  );
}
