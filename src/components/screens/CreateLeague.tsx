import { StatusBar, View } from "react-native";
import { PickemsPage } from "../core/PickemsPage";
import { PickemsHeader } from "../PickemsHeader";
import { PickemsTextInput } from "../PickemsTextInput";
import { useEffect, useState } from "react";
import { Tables } from "@/src/types/supabaseTypes";
import uuid from "react-native-uuid";
import tw from "@/tailwind";
import { PickemsSwitch } from "../PickemsSwitch";
import { PickemsText } from "../PickemsText";
import { useAppSelector } from "@/src/store";
import { useCreateLeagueMutation } from "@/src/services/user";
import { router } from "expo-router";
import { getLeagueShareableID } from "@/src/helpers/helpers";
import Svg, { Path } from "react-native-svg";
import { BlueSVGBackground } from "../BlueSVGBackground";
import { Ionicons } from "@expo/vector-icons";
import { useAppColorScheme } from "twrnc/dist/esm/hooks";
import { PickemsButton } from "../PickemsButton";
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
    <>
      <BlueSVGBackground />
      <PickemsPage
        statusBarStyle="light-content"
        backButtonColor="white"
        style={[tw`flex flex-col bg-transparent z-20`]}
        scrollViewContentStyle={[tw`flex flex-col justify-center h-full`]}
        showBackButton
      >
        <View
          style={[
            tw`flex flex-col shadow-2xl bg-white  p-3  rounded-3xl gap-4`,
          ]}
        >
          <Ionicons
            name="trophy-sharp"
            style={[tw`text-center`]}
            color={tw.color("pickems-blue")}
            size={40}
          />
          <PickemsHeader style={[tw`text-black`]}>
            Create a league
          </PickemsHeader>
          <PickemsTextInput
            onChangeText={(text) => {
              setLeague((prev) => ({ ...prev, name: text }));
            }}
            value={league.name}
            label={{ text: "League Name", style: [tw`text-black`] }}
            style={[tw`bg-gray-200/30`]}
          />
          {noLeagueNameInputted && (
            <PickemsText style={[tw`text-red-600 text-sm`]}>
              Please add a league name
            </PickemsText>
          )}
          <PickemsSwitch
            labelStyle={[tw`text-black`]}
            label="Include Over/Under Selection?"
            isActive={league.does_include_over_under}
            onChange={(val) => {
              setLeague((prev) => ({
                ...prev,
                does_include_over_under: val,
              }));
            }}
          />

          <PickemsSwitch
            labelStyle={[tw`text-black`]}
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
              style: [tw`text-black`],
              includeInfoIcon: {
                modalChildren: (
                  <View>
                    <PickemsHeader style={[tw`mb-2 text-black`]}>
                      League Password
                    </PickemsHeader>
                    <PickemsText style={[tw`text-sm text-black`]}>
                      You will share this password with other users so they can
                      join the league.
                    </PickemsText>
                  </View>
                ),
              },
            }}
            style={[tw`bg-gray-200/30`]}
          />
          <PickemsButton
            onPress={() => {
              handleCreateLeague();
            }}
            style={[tw`bg-pickems-blue`]}
            textStyle={[tw`text-white font-bold`]}
            buttonLabel="Create League"
          />
          <PickemsText style={[tw`text-center text-black`]}>
            *You can have up to 10 players per league*
          </PickemsText>
        </View>
      </PickemsPage>
    </>
  );
}
