import { View } from "react-native";
import { PickemsPage } from "../core/PickemsPage";
import { PickemsHeader } from "../PickemsHeader";
import { PickemsTextInput } from "../PickemsTextInput";
import { useEffect, useState } from "react";
import { Tables } from "@/src/types/supabaseTypes";
import uuid from "react-native-uuid";
import { tw } from "@/tailwind";
import { PickemsSwitch } from "../PickemsSwitch";
import { PickemsButton } from "../PickemsButton";
import { PickemsText } from "../PickemsText";
import { useAppSelector } from "@/src/store";
import { router } from "expo-router";
import { getLeagueShareableID } from "@/src/helpers/helpers";
import { useJoinLeagueMutation } from "@/src/services/user";
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
    <PickemsPage showBackButton>
      <PickemsHeader>Join a league</PickemsHeader>
      <View
        style={[
          tw`flex flex-col border p-3 border-slate-300 bg-blue-100/20 rounded-md gap-4`,
        ]}
      >
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
          onPress={() => {
            handleJoiningLeague();
          }}
          buttonLabel="Join League"
        />
      </View>
    </PickemsPage>
  );
}
