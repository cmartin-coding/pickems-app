import {
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { PickemsText } from "./PickemsText";
import { tw } from "@/tailwind";

type PickemsButtonType = {
  style?: ViewStyle;
  buttonLabel: string;
} & TouchableOpacityProps;
export function PickemsButton(props: PickemsButtonType) {
  return (
    <TouchableOpacity
      {...props}
      style={[tw`border rounded-md p-3 bg-slate-200 border-neutral-300/30`]}
    >
      <PickemsText style={[tw`text-center`]}>{props.buttonLabel}</PickemsText>
    </TouchableOpacity>
  );
}
