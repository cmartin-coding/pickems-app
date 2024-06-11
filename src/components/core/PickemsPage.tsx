import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { ReactNode } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw, { useDeviceContext } from "twrnc";

export function PickemsPage(props: {
  children: ReactNode;
  style?: ViewStyle;
  showBackButton?: boolean;
  isTabBarScreen?: boolean;
}) {
  useDeviceContext(tw);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[tw`flex-1 flex-col bg-white `, props.style]}>
      {props.children && (
        <ScrollView
          style={[
            tw`flex-1`,
            {
              paddingTop: props.isTabBarScreen ? 0 : insets.top,
              paddingLeft: insets.left,
              paddingRight: insets.right,
            },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingBottom: insets.bottom + 120,
          }}
        >
          <View style={[tw`flex-row justify-center items-center  py-4`]}>
            {props.showBackButton && router.canGoBack() && (
              <TouchableOpacity
                style={[tw`pt-1  z-20 absolute left-4`]}
                onPress={() => {
                  router.back();
                }}
              >
                <Ionicons
                  name="arrow-back"
                  style={[tw`text-black`]}
                  size={20}
                />
              </TouchableOpacity>
            )}
            {/* {props.rightHeader && (
                <View style={[tw`pt-1 absolute right-5`]}>
                  {props.rightHeader}
                </View>
              )} */}
            {/* 
              {props.logo ? (
                props.logo
              ) : (
                <TopiaLogo color={props.headerFgColor || "white"} />
              )} */}
          </View>

          <View style={[tw`p-2 mx-2`]}>{props.children}</View>
        </ScrollView>
      )}
    </View>
  );
}
