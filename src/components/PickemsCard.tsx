import tw from "@/tailwind";
import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { TouchableOpacity, View, ViewStyle } from "react-native";

type PickemsCardType = {
  children: ReactNode;
  onPress: () => void;
  style?: ViewStyle[];
};
export function PickemsCard(props: PickemsCardType) {
  return (
    <TouchableOpacity
      style={[
        tw`p-3 rounded-md overflow-hidden border   border-slate-300  flex flex-row justify-between items-center`,
        props.style,
      ]}
      onPress={props.onPress}
    >
      <View style={[tw``]}>{props.children}</View>

      <Ionicons name="chevron-forward-sharp" size={20} color={"black"} />
      {/* 
      <Ionicons
        style={[tw`absolute right-5`]}
        name="american-football"
        color={"#80808040"}
        size={100}
      /> */}
    </TouchableOpacity>
  );
}
