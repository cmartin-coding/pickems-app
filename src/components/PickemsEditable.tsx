import React, { useEffect, useState } from "react";
import {
  Text,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
  Switch,
  Image,
  TextStyle,
  TextInputProps,
} from "react-native";
import tw from "../../tailwind";
import { PickemsInputModal } from "./PickemsInputModal";

type Props = {
  label?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  modalLabel?: string;
  modalLabelStyle?: StyleProp<TextStyle>;
  iconFillColor?: string;
  iconContainerStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
  onLeft?: boolean;
  textStyle?: StyleProp<TextStyle>;
  valueFormat?: (v: any) => any;
  textInputProps?: TextInputProps;
} & (
  | {
      value: string;
      inputType: "text";
      onSave: (value: string) => void;
    }
  | {
      value: number;
      inputType: "number";
      onSave: (value: number) => void;
    }
);
export default function TopiaEditable(props: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(props.value);
  const [frequency, setFrequency] = useState<"Annual" | "Monthly">("Annual");
  const [didInitialRender, setDidInitialRender] = useState(false);
  useEffect(() => {
    setDidInitialRender(true);
  }, []);
  useEffect(() => {
    if (didInitialRender) {
      if (frequency === "Monthly") {
        setNewValue((prev) => +prev / 12);
      }
      if (frequency === "Annual") {
        setNewValue((prev) => +prev * 12);
      }
    }
  }, [frequency]);
  useEffect(() => {
    setNewValue(props.value);
  }, [props.value]);
  const pencilBtn = (
    <View
      style={[
        tw`w-8 h-8 border flex items-center justify-center border-gray-200 rounded-full`,
        props.onLeft ? tw`mr-2` : tw`ml-2`,
        props.iconContainerStyle,
      ]}
    >
      {/* <TopiaPencilSVG
          style={[tw`text-gray-400 `]}
          width={16}
          fill={props.iconFillColor ? props.iconFillColor : ""}
          height={16}
        /> */}
    </View>
  );

  const displayValue = props.valueFormat
    ? props.valueFormat(props.value)
    : props.value;
  return (
    <>
      <View
        style={[
          tw`flex-row items-center justify-between rounded-md gap-2`,
          props.style,
        ]}
      >
        <View style={[tw`flex flex-row items-center gap-1`]}>
          {props.label && (
            <Text
              numberOfLines={1}
              style={[tw`text-xs  text-neutral-100 `, props.labelStyle]}
            >
              {props.label}
            </Text>
          )}
          {/* {props.infoBubble && <TopiaInfoBubbleButton {...props.infoBubble} />} */}
        </View>

        <TouchableOpacity
          style={[tw` flex-row items-center `]}
          onPress={() => {
            setIsEditing(true);
          }}
        >
          <View style={[tw`flex flex-row  items-center`]}>
            {props.onLeft && pencilBtn}

            {props.inputType === "text" && (
              <Text
                style={[
                  tw` font-medium text-white ${
                    props.placeholder && props.value.length == 0
                      ? "text-neutral-500"
                      : ""
                  }`,
                  props.textStyle,
                ]}
              >
                {props.value.length === 0 && props.placeholder
                  ? props.placeholder
                  : props.value.length > 30
                  ? props.value.slice(0, 30) + "..."
                  : props.value}
              </Text>
            )}

            {props.inputType === "number" && (
              <Text style={[tw` font-medium text-white `, props.textStyle]}>
                {props.value}
              </Text>
            )}

            {!props.onLeft && pencilBtn}
          </View>
        </TouchableOpacity>
      </View>
      <View style={[tw`absolute`]}>
        <PickemsInputModal
          visible={isEditing}
          onDismiss={() => {
            setIsEditing(false);
            const adjValue =
              frequency === "Annual" ? props.value : +props.value / 12;
            setNewValue(adjValue);
          }}
        >
          {/* {props.inputType === "text" && (
            <TopiaTextInput
              label={props.modalLabel ? props.modalLabel : "Name"}
              value={newValue.toString()}
              onChangeText={(text) => {
                setNewValue(text);
              }}
              {...props.textInputProps}
            />
          )} */}

          {props.inputType === "number" && (
            <></>
            // <TopiaTextInput
            //   label={props.modalLabel ? props.modalLabel : "Name"}
            //   value={newValue.toString()}
            //   keyboardType="number-pad"
            //   maxLength={2}
            //   onChangeText={(text) => {
            //     setNewValue(Number(text));
            //   }}
            // />
          )}

          {/* <TopiaButton
            onPress={() => {
              setIsEditing(false);
            }}
            style={[tw`border bg-pale-yellow p-3 rounded-full mt-4`]}
          >
            Save
          </TopiaButton> */}
          <TouchableOpacity
            style={[tw`border bg-white p-3 rounded-full mt-2`]}
            onPress={() => {
              setIsEditing(false);
              //   setNewValue(adjValue);
            }}
          >
            <Text style={[tw`text-md text-center `]}>Cancel</Text>
          </TouchableOpacity>
        </PickemsInputModal>
      </View>
    </>
  );
}
