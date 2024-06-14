import { tw } from "@/tailwind";
import { TextInput, TextInputProps, TextStyle, View } from "react-native";
import { PickemsText } from "./PickemsText";
import { ReactNode } from "react";
import { PickemsInfoBubbleButton } from "./PickemsInfoBubbleButton";

type PickemsTextInputProps = {
  style?: TextStyle;
  label?: { text: string; includeInfoIcon?: { modalChildren: ReactNode } };
} & TextInputProps;
export function PickemsTextInput(props: PickemsTextInputProps) {
  return (
    <View style={[tw`flex flex-col gap-1`]}>
      {props.label && (
        <View style={[tw`flex flex-row gap-2 items-center`]}>
          <PickemsText>{props.label.text}</PickemsText>
          {props.label.includeInfoIcon && (
            <PickemsInfoBubbleButton
              modalChildren={props.label.includeInfoIcon.modalChildren}
            />
          )}
        </View>
      )}

      <TextInput
        {...props}
        numberOfLines={1}
        scrollEnabled
        style={[tw`border rounded-lg border-neutral-300 p-3`, props.style]}
      ></TextInput>
    </View>
  );
}
