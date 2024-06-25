import { ReactNode, useState } from "react";
import { TouchableOpacity, View, ViewStyle } from "react-native";
import { PickemsText } from "./PickemsText";
import { tw } from "@/tailwind";
import { Ionicons } from "@expo/vector-icons";
type PickemsAccordionProps = {
  title: string;
  style?: ViewStyle[];
  children: ReactNode;
};
export function PickemsAccordion(props: PickemsAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={[props.style, tw`flex flex-col `]}>
      <TouchableOpacity
        style={[
          tw` p-2 flex flex-row  justify-between items-center rounded-md`,
        ]}
        onPress={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <PickemsText style={[tw`font-bold `]}>{props.title}</PickemsText>
        <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={20} />
      </TouchableOpacity>
      {isOpen && props.children}
    </View>
  );
}
