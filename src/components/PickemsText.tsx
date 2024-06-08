import { tw } from "@/tailwind";
import { Text, TextProps, TextStyle } from "react-native";

type PickemsTextProps = {
  children: string;
  style?: TextStyle;
} & TextProps;
export function PickemsText(props: PickemsTextProps) {
  return (
    <Text {...props} style={[tw`text-md text-black font-sans`, props.style]}>
      {props.children}
    </Text>
  );
}
