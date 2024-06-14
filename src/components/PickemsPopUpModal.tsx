import { tw } from "@/tailwind";
import { Modal, TouchableOpacity, View } from "react-native";
import { PickemsText } from "./PickemsText";
import { ReactNode } from "react";
import { Ionicons } from "@expo/vector-icons";

type PickemsPopUpModalType = {
  visible: boolean;
  onDismiss: () => void;
  children: ReactNode;
};
export function PickemsPopUpModal(props: PickemsPopUpModalType) {
  return (
    <Modal
      presentationStyle="overFullScreen"
      animationType="fade"
      visible={props.visible}
      transparent={true}
    >
      <View style={[tw` flex-1 flex flex-row justify-center items-center`]}>
        <View
          style={[
            tw`min-h-30 p-3 relative rounded-md z-20 max-w-[80%] bg-white`,
          ]}
        >
          <View>{props.children}</View>
          <TouchableOpacity
            onPress={() => {
              props.onDismiss && props.onDismiss();
            }}
            style={[tw`absolute -right-2 -top-2`]}
          >
            <Ionicons size={22} name="close-circle" color={"red"} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            props.onDismiss();
          }}
          style={[tw`absolute w-full h-full bg-slate-800/30`]}
        />
      </View>
    </Modal>
  );
}
