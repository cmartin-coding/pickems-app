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
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw, { useDeviceContext } from "twrnc";

export type PickemsPageProps = {
  children: ReactNode;
  childrenStyle?: ViewStyle[];
  belowScrollViewChildren?: ReactNode;
  style?: ViewStyle[];
  showBackButton?: boolean;
  isTabBarScreen?: boolean;
  scrollViewStyle?: ViewStyle[];
  refreshControl?: { onRefresh: () => void; isRefreshing: boolean };
  aboveScrollViewChildren?: ReactNode;
};

export function PickemsPage(props: PickemsPageProps) {
  useDeviceContext(tw);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[tw`flex-1 flex-col bg-white `, props.style]}>
      {props.children && (
        <>
          {props.aboveScrollViewChildren && props.aboveScrollViewChildren}
          <ScrollView
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
            </View>

            <View style={[tw`p-2 mx-2`, props.childrenStyle]}>
              {props.children}
            </View>
          </ScrollView>
          {props.belowScrollViewChildren && props.belowScrollViewChildren}
        </>
      )}
    </View>
  );
}
