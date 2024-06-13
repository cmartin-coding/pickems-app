import {
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { PickemsText } from "./PickemsText";
import { tw } from "@/tailwind";

type PickemsButtonType = {
  style?: ViewStyle;
  disabledStyle?: string;
  textStyle?: TextStyle[];
  buttonLabel: string;
} & TouchableOpacityProps;
export function PickemsButton(props: PickemsButtonType) {
  const disabled = props.disabled;
  return (
    <TouchableOpacity
      {...props}
      style={[
        tw`border rounded-md p-3 bg-slate-200 border-neutral-300/30 `,
        props.style,
        [tw`${disabled ? props.disabledStyle || "" : ""}`],
      ]}
    >
      <PickemsText style={[tw`text-center`, props.textStyle]}>
        {props.buttonLabel}
      </PickemsText>
    </TouchableOpacity>
  );
}
