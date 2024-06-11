import { PickemsText } from "@/src/components/PickemsText";
import { SettingsCogHeader } from "@/src/components/navigation/SettingsCogHeader";
import { tw } from "@/tailwind";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Tabs, router } from "expo-router";
import { TouchableOpacity, View } from "react-native";

export default function PickemsTabBar() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "green" }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerRight: (props) => {
            return <SettingsCogHeader />;
          },
          tabBarItemStyle: [tw`border-r mt-2 border-r-slate-300`],

          tabBarIcon: ({ color }) => (
            <FontAwesome size={25} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="user-picks"
        options={{
          title: "Your Picks",
          tabBarIcon: ({ color }) => (
            <Ionicons name="american-football" size={25} color={color} />
            // <FontAwesome size={28} name="" color={color} />
          ),
          headerRight: (props) => {
            return <SettingsCogHeader />;
          },
        }}
      />
      <Tabs.Screen
        name="league-picks"
        options={{
          title: "League Picks",
          tabBarIcon: ({ color }) => (
            <Ionicons name="flag" size={25} color={color} />
            // <FontAwesome size={28} name="" color={color} />
          ),
          headerRight: (props) => {
            return <SettingsCogHeader />;
          },
        }}
      />
      <Tabs.Screen
        name="matchups"
        options={{
          title: "Matchups",
          tabBarIcon: ({ color }) => (
            <Ionicons name="contract" size={25} color={color} />
            // <FontAwesome size={28} name="" color={color} />
          ),
          headerRight: (props) => {
            return <SettingsCogHeader />;
          },
        }}
      />
      <Tabs.Screen
        name="standings"
        options={{
          title: "Standings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="analytics" size={25} color={color} />
            // <FontAwesome size={28} name="" color={color} />
          ),
          headerRight: (props) => {
            return <SettingsCogHeader />;
          },
        }}
      />
    </Tabs>
  );
}
