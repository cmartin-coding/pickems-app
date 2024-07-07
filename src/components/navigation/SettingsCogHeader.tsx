import tw from "@/tailwind";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

export function SettingsCogHeader() {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push("/settings");
      }}
      style={[tw``]}
    >
      <Ionicons
        name="cog"
        size={30}
        style={[tw`text-black  dark:text-white`]}
      />
    </TouchableOpacity>
  );
}
