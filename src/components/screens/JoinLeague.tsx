import { StatusBar, View } from "react-native";
import { PickemsPage } from "../core/PickemsPage";
import { PickemsHeader } from "../PickemsHeader";
import { PickemsTextInput } from "../PickemsTextInput";
import { useEffect, useState } from "react";
import { Tables } from "@/src/types/supabaseTypes";
import uuid from "react-native-uuid";
import tw from "@/tailwind";
import { PickemsSwitch } from "../PickemsSwitch";
import { PickemsButton } from "../PickemsButton";
import { PickemsText } from "../PickemsText";
import { useAppSelector } from "@/src/store";
import { router } from "expo-router";
import { getLeagueShareableID } from "@/src/helpers/helpers";
import { useJoinLeagueMutation } from "@/src/services/user";
import { BlueSVGBackground } from "../BlueSVGBackground";
import { Ionicons } from "@expo/vector-icons";
export function JoinLeague() {
  const [createLeague, { isLoading, isSuccess, error }] =
    useJoinLeagueMutation();

  const userId = useAppSelector((state) => state.user.user.id);
  const [leagueDetails, setLeagueDetails] = useState<{
    leaguePW: string;
    shareableId: number;
    user_id: string;
  }>({ leaguePW: "", shareableId: 0, user_id: userId });

  const handleJoiningLeague = async () => {
    await createLeague(leagueDetails);
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/home");
    }
  };
  return (
    <>
      <BlueSVGBackground />
      <PickemsPage
        statusBarStyle="light-content"
        showBackButton
        backButtonColor="white"
        style={[tw`flex flex-col bg-transparent z-20`]}
        scrollViewContentStyle={[tw`flex flex-col justify-center h-full`]}
      >
        <View style={[tw`flex flex-col  p-3  bg-white  rounded-3xl gap-4`]}>
          <Ionicons
            name="people"
            style={[tw`text-center`]}
            color={tw.color("pickems-blue")}
            size={40}
          />
          <PickemsHeader>Join a league</PickemsHeader>
          <PickemsTextInput
            onChangeText={(text) => {
              setLeagueDetails((prev) => ({ ...prev, shareableId: +text }));
            }}
            keyboardType="number-pad"
            value={
              leagueDetails.shareableId ? `${leagueDetails.shareableId}` : ""
            }
            label={{ text: "League Code" }}
            style={[tw`bg-white`]}
          />

          <PickemsTextInput
            onChangeText={(text) => {
              setLeagueDetails((prev) => ({ ...prev, leaguePW: text }));
            }}
            value={leagueDetails.leaguePW}
            label={{
              text: "League Password",
            }}
            style={[tw`bg-white`]}
          />
          <PickemsButton
            style={[tw`bg-pickems-blue`]}
            textStyle={[tw`text-white font-bold`]}
            onPress={() => {
              handleJoiningLeague();
            }}
            buttonLabel="Join League"
          />
        </View>
      </PickemsPage>
    </>
  );
}
