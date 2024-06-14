import { Ionicons } from "@expo/vector-icons";
import { ReactNode, useState } from "react";
import { TouchableOpacity } from "react-native";
import { PickemsPopUpModal } from "./PickemsPopUpModal";

type PickemsInfoBubbleButtonType = {
  modalChildren: ReactNode;
  size?: number;
};
export function PickemsInfoBubbleButton(props: PickemsInfoBubbleButtonType) {
  const [isModalShown, setIsModalShown] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setIsModalShown(true);
        }}
      >
        <Ionicons
          name="information-circle"
          size={props.size ? props.size : 20}
          color={"black"}
        />
      </TouchableOpacity>
      <PickemsPopUpModal
        visible={isModalShown}
        onDismiss={() => {
          setIsModalShown(false);
        }}
      >
        {props.modalChildren}
      </PickemsPopUpModal>
    </>
  );
}
