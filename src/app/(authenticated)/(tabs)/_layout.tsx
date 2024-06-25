import { PickemsText } from "@/src/components/PickemsText";
import { PickemsTabHeader } from "@/src/components/navigation/PickemsTabHeader";
import { SettingsCogHeader } from "@/src/components/navigation/SettingsCogHeader";
import { useAppSelector } from "@/src/store";
import { tw } from "@/tailwind";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Tabs, router } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PickemsTabBar() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#0000FF" }}>
      <Tabs.Screen
        name="home"
        options={{
          title: `Home`,
          header: (props) => {
            return <PickemsTabHeader title="Home" />;
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
          title: "Chat",
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbox" size={25} color={color} />
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
