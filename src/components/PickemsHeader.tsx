import { TextStyle } from "react-native";
import { PickemsText } from "./PickemsText";
import { tw } from "@/tailwind";

type PickemsHeaderType = {
  children: string;
  style?: TextStyle[];
};

export function PickemsHeader(props: PickemsHeaderType) {
  return (
    <PickemsText
      style={[tw`text-center text-lg mb-6 text-black font-bold`, props.style]}
    >
      {props.children}
    </PickemsText>
  );
}
