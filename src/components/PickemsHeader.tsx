import { TextStyle } from "react-native";
import { PickemsText } from "./PickemsText";
import tw from "@/tailwind";

type PickemsHeaderType = {
  children: string | string[];
  style?: TextStyle[];
};

export function PickemsHeader(props: PickemsHeaderType) {
  return (
    <PickemsText
      style={[tw`text-center text-lg text-black font-bold`, props.style]}
    >
      {props.children}
    </PickemsText>
  );
}
