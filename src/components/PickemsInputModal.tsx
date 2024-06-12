import {
  KeyboardAvoidingView,
  Modal,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
//   import { tw } from "../../tailwind";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useRef } from "react";
import { tw } from "../../tailwind";
import React from "react";
//   import { LinearGradient } from "expo-linear-gradient";

export function PickemsInputModal(props: {
  visible?: boolean;
  onDismiss?: () => void;
  children?: any;
  containerStyle?: StyleProp<ViewStyle>;
}) {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={props.visible} transparent animationType="slide">
      <KeyboardAvoidingView
        style={[tw`flex-1 flex-col justify-end`]}
        behavior="padding"
      >
        <TouchableWithoutFeedback
          onPress={() => {
            props.onDismiss && props.onDismiss();
          }}
        >
          <View style={[tw`flex-1 ${props.visible ? "bg-black/10" : ""}`]} />
          {/* <LinearGradient
              colors={["#00000000", "#00000080"]}
              style={[tw`flex-1`]}
            /> */}
        </TouchableWithoutFeedback>
        <View
          style={[
            tw`flex-col rounded-tl-xl min-h-[180px] max-h-[90%] border rounded-tr-xl bg-white p-4 -mt-4`,
            { paddingBottom: insets.bottom + 4 },
            props.containerStyle,
          ]}
        >
          {props.children}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
