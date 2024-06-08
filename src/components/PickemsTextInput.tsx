import { tw } from "@/tailwind";
import { TextInput, TextInputProps, TextStyle, View } from "react-native";
import { PickemsText } from "./PickemsText";

type PickemsTextInputProps = {
  style?: TextStyle;
  label?: string;
} & TextInputProps;
export function PickemsTextInput(props: PickemsTextInputProps) {
  return (
    <View style={[tw`flex flex-col gap-1`]}>
      {props.label && <PickemsText>{props.label}</PickemsText>}
      <TextInput
        {...props}
        numberOfLines={1}
        scrollEnabled
        style={[tw`border rounded-lg border-neutral-300 p-3`, props.style]}
      ></TextInput>
    </View>
  );
}
