import tw from "@/tailwind";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { ReactNode, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
  RefreshControl,
  useWindowDimensions,
  StatusBar,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

export type PickemsPageProps = {
  children: ReactNode;
  childrenStyle?: ViewStyle[];
  belowScrollViewChildren?: ReactNode;
  style?: ViewStyle[];
  showBackButton?: boolean;
  backButtonColor?: string;
  isTabBarScreen?: boolean;
  statusBarStyle?: "dark-content" | "light-content";
  scrollViewStyle?: ViewStyle[];
  scrollViewContentStyle?: ViewStyle[];
  refreshControl?: { onRefresh: () => void; isRefreshing: boolean };
  aboveScrollViewChildren?: ReactNode;
};

export function PickemsPage(props: PickemsPageProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        tw`flex-1 flex-col  relative bg-white dark:bg-pickems-dark-blue`,
        props.style,
      ]}
    >
      {/* <View style={[tw`w-[100%] h-30 bg-red-300 absolute`]}></View> */}
      <StatusBar
        barStyle={props.statusBarStyle ? props.statusBarStyle : "dark-content"}
      />
      {props.showBackButton && router.canGoBack() && (
        <TouchableOpacity
          style={[tw`pt-1  z-20 absolute left-4`, { paddingTop: insets.top }]}
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons
            name="arrow-back"
            // color={props.backButtonColor ? props.backButtonColor : "black"}
            style={[tw`text-black dark:text-white`]}
            size={20}
          />
        </TouchableOpacity>
      )}
      {props.children && (
        <>
          {props.aboveScrollViewChildren && props.aboveScrollViewChildren}
          <ScrollView
            automaticallyAdjustKeyboardInsets={true}
            refreshControl={
              props.refreshControl && (
                <RefreshControl
                  refreshing={props.refreshControl.isRefreshing}
                  onRefresh={props.refreshControl.onRefresh}
                />
              )
            }
            style={[
              props.scrollViewStyle,
              tw`flex-1 `,
              {
                paddingTop: props.isTabBarScreen ? 0 : insets.top,
                paddingLeft: insets.left,
                paddingRight: insets.right,
              },
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[
              tw``,
              {
                paddingBottom: insets.bottom + 80,
              },
              props.scrollViewContentStyle,
            ]}
          >
            <View style={[tw`p-2 my-6 mx-2`, props.childrenStyle]}>
              {props.children}
            </View>
          </ScrollView>
          {props.belowScrollViewChildren && props.belowScrollViewChildren}
        </>
      )}
    </View>
  );
}
