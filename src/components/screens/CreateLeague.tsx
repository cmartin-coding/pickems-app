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
import { useCreateLeagueMutation } from "@/src/services/user";
import { router } from "expo-router";
import { getLeagueShareableID } from "@/src/helpers/helpers";
export function CreateLeague() {
  const [createLeague, { isLoading, isSuccess, error }] =
    useCreateLeagueMutation();

  const userId = useAppSelector((state) => state.user.user.id);
  const id = uuid.v4();
  const shareableLeagueId = getLeagueShareableID();
  const [league, setLeague] = useState<Tables<"leagues">>({
    id: `${id}`,
    does_include_over_under: false,
    does_include_playoffs: false,
    name: "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    shareable_id: shareableLeagueId,
    shareable_pw: "",
  });
  const [noLeagueNameInputted, setNoLeagueNameInputted] = useState(false);

  useEffect(() => {
    if (league.name.trim().length > 0) {
      setNoLeagueNameInputted(false);
    }
  }, [league.name]);

  const handleCreateLeague = async () => {
    if (league.name.trim().length === 0) {
      setNoLeagueNameInputted(true);
      return;
    }
    await createLeague({ league: league, user_id: userId });
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/home");
    }
  };

  return (
    <PickemsPage showBackButton>
      <PickemsHeader>Create a league</PickemsHeader>
      <View
        style={[
          tw`flex flex-col border p-3 border-slate-300 bg-blue-100/20 rounded-md gap-4`,
        ]}
      >
        <PickemsTextInput
          onChangeText={(text) => {
            setLeague((prev) => ({ ...prev, name: text }));
          }}
          value={league.name}
          label={{ text: "League Name" }}
          style={[tw`bg-white`]}
        />
        {noLeagueNameInputted && (
          <PickemsText style={[tw`text-red-600 text-sm`]}>
            Please add a league name
          </PickemsText>
        )}
        <PickemsSwitch
          label="Include Over/Under Selection?"
          isActive={league.does_include_over_under}
          onChange={(val) => {
            setLeague((prev) => ({ ...prev, does_include_over_under: val }));
          }}
        />

        <PickemsSwitch
          label="Include Playoffs?"
          isActive={league.does_include_over_under}
          onChange={(val) => {
            setLeague((prev) => ({ ...prev, does_include_playoffs: val }));
          }}
        />
        <PickemsTextInput
          onChangeText={(text) => {
            setLeague((prev) => ({ ...prev, shareable_pw: text }));
          }}
          value={league.shareable_pw || ""}
          label={{
            text: "League Password",
            includeInfoIcon: {
              modalChildren: (
                <View>
                  <PickemsHeader style={[tw`mb-2`]}>
                    League Password
                  </PickemsHeader>
                  <PickemsText style={[tw`text-sm`]}>
                    You will share this password with other users so they can
                    join the league.
                  </PickemsText>
                </View>
              ),
            },
          }}
          style={[tw`bg-white`]}
        />
        <PickemsButton
          onPress={() => {
            handleCreateLeague();
          }}
          buttonLabel="Create League"
        />
        <PickemsText style={[tw`text-center`]}>
          *You can have up to 10 players per league*
        </PickemsText>
      </View>
    </PickemsPage>
  );
}
