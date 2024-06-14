import { tw } from "@/tailwind";
import { View } from "react-native";
import { PickemsText } from "./PickemsText";
import { PickemsButton } from "./PickemsButton";
import { router } from "expo-router";
import { useAppSelector } from "../store";

export function NoActiveLeaguesPlaceholder(props: {
  tab: "user-picks" | "league-picks" | "standings";
}) {
  return (
    <View
      style={[tw`flex-1 flex mx-4 flex-col gap-2 justify-center items-center`]}
    >
      <PickemsText style={[tw`text-center text-lg`]}>
        Create or join a league on the Home tab to{" "}
        {props.tab === "user-picks" && "start making picks"}
        {props.tab === "league-picks" &&
          "play with your friends and see their picks"}
        {props.tab === "standings" &&
          "track how accurate you are against your friends"}
        !
      </PickemsText>
      <PickemsButton
        style={[tw`w-full`]}
        buttonLabel="Go home"
        onPress={() => {
          router.push("/home");
        }}
      />
    </View>
  );
}
