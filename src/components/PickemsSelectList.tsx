import { useState } from "react";
import { Image, StyleProp, ViewStyle } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
export function PickemsSelectList(props: {
  data: { key: string; value: string }[];
  setSelected: (val: string) => void;
  selected?: any[];
  placeholder?: string;
  darkMode?: boolean;
  boxStyle?: ViewStyle;
  label?: string;
}) {
  return (
    <SelectList
      data={props.data}
      inputStyles={{
        borderColor: "#ffffff",
        fontSize: 16,
      }}
      searchicon={<></>}
      //   arrowicon={
      //     <Image
      //       //   source={chevron}
      //       style={{
      //         width: 34,
      //         height: 34,
      //         position: "absolute",
      //         right: 5,
      //       }}
      //     />
      //   }
      boxStyles={{
        backgroundColor: "white",
        borderRadius: 90,
        height: 55,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        ...props.boxStyle,
      }}
      dropdownStyles={{ backgroundColor: "white" }}
      searchPlaceholder={
        props.placeholder ? props.placeholder : "Select option"
      }
      placeholder={props.placeholder ? props.placeholder : "Select option"}
      setSelected={props.setSelected}
    />
  );
}
