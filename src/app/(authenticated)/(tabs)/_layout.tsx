import { PickemsText } from "@/src/components/PickemsText";
import { PickemsTabHeader } from "@/src/components/navigation/PickemsTabHeader";
import { SettingsCogHeader } from "@/src/components/navigation/SettingsCogHeader";
import { useThemeContext } from "@/src/context/ThemeContext";
import { useAppSelector } from "@/src/store";
import tw from "@/tailwind";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Tabs, router } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppColorScheme } from "twrnc";

export default function PickemsTabBar() {
  const { theme } = useThemeContext();

  const tabBarColor = theme === "light" ? "#03002e" : "#ffff00";
  const tabBarBackgroundColor = theme === "light" ? "#ffffff" : "#03002e";
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tabBarColor,
        tabBarStyle: { backgroundColor: tabBarBackgroundColor },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: `Home`,
          header: (props) => {
            return (
              <PickemsTabHeader title="Home" includeLeagueSelector={false} />
            );
          },
          // tabBarItemStyle: [tw`border-r mt-2 border-r-slate-300`],

          tabBarIcon: ({ color }) => (
            <FontAwesome size={25} name="home" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="league-picks"
        options={{
          title: "League Picks",
          tabBarIcon: ({ color }) => (
            <Ionicons name="people" size={25} color={color} />
            // <FontAwesome size={28} name="" color={color} />
          ),
          header: (props) => {
            return (
              <PickemsTabHeader title="League Picks" includeLeagueSelector />
            );
          },
        }}
      />
      <Tabs.Screen
        name="user-picks"
        options={{
          title: "My Picks",
          // tabBarItemStyle: [tw`border rounded-full`],
          tabBarIcon: ({ color }) => (
            <Ionicons name="american-football" size={25} color={color} />
            // <FontAwesome size={28} name="" color={color} />
          ),

          header: (props) => {
            return <PickemsTabHeader title="My Picks" includeLeagueSelector />;
          },
          // headerRight: (props) => {
          //   return <SettingsCogHeader />;
          // },
        }}
      />
      <Tabs.Screen
        name="matchups"
        options={{
          title: "Matchups",
          tabBarIcon: ({ color }) => (
            <Ionicons name="medal" size={25} color={color} />
            // <FontAwesome size={28} name="" color={color} />
          ),

          header: (props) => {
            return <PickemsTabHeader title="Matchups" />;
          },
        }}
      />
      <Tabs.Screen
        name="standings"
        options={{
          title: "League Info",
          tabBarIcon: ({ color }) => (
            <Ionicons name="trophy" size={25} color={color} />
            // <FontAwesome size={28} name="" color={color} />
          ),
          header: (props) => {
            return <PickemsTabHeader title="Standings" includeLeagueSelector />;
          },
        }}
      />
    </Tabs>
  );
}
