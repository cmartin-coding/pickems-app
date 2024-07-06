import { PickemsButton } from "@/src/components/PickemsButton";
import { PickemsCard } from "@/src/components/PickemsCard";
import { PickemsHeader } from "@/src/components/PickemsHeader";
import { PickemsText } from "@/src/components/PickemsText";
import { PickemsPage } from "@/src/components/core/PickemsPage";
import { CLE } from "@/src/constants/team-logos/cle";
import { useGetUserQuery } from "@/src/services/user";
import { activeLeagueActions } from "@/src/slices/activeLeague";
import { useAppSelector } from "@/src/store";
import { useAuthContext } from "@/src/utils";
import tw from "@/tailwind";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity, View, useWindowDimensions } from "react-native";
import { useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "@/src/supabase";
import React from "react";
import { userActions } from "@/src/slices/user";
import { FootballLoader } from "@/src/components/FootballLoader";

export default function Home() {
  const dispatch = useDispatch();
  const authCtx = useAuthContext();
  const { width } = useWindowDimensions();
  const user = useAppSelector((state) => state.user);
  console.log("home", user);
  // const { isLoading } = useGetUserQuery(authCtx.user?.id as string);

  // if (isLoading) {
  //   return <FootballLoader />;
  // }

  return (
    <PickemsPage isTabBarScreen>
      <PickemsHeader style={[tw`mb-4 text-xl text-left `]}>
        Hello {user.user.name} 👋
      </PickemsHeader>

      <View style={[tw`border border-black rounded-md p-1 mb-4`]}>
        <LinearGradient
          // Background Linear Gradient
          style={[
            tw` absolute top-0 bottom-0 flex flex-row justify-center rounded-md left-0 right-0`,
          ]}
          start={{ x: 0.2, y: 0.2 }}
          colors={["#000000", "#0000FF"]}
        >
          <Ionicons
            name="american-football"
            size={300}
            style={[tw`absolute bg-transparent -top-10 text-purple-900/20`]}
          />
        </LinearGradient>
        <PickemsText style={[tw`text-white mx-2 text-lg font-semibold`]}>
          Play Pickems!
        </PickemsText>
        <PickemsText style={[tw`text-white mx-2 text-sm`]}>
          Play against your friends and see who knows their stuff.
        </PickemsText>

        <View style={[tw`flex flex-col mt-4 mx-3 gap-2`]}>
          <PickemsButton
            style={[tw`bg-white  rounded-full shadow-sm`]}
            onPress={() => {
              router.push("/create-league");
            }}
            buttonLabel="Create a league"
          />
          <PickemsButton
            style={[tw`bg-transparent border-0 shadow-sm `]}
            textStyle={[tw`text-white`]}
            onPress={() => {
              router.push("join-league");
            }}
            buttonLabel="Join a league"
          />
        </View>
      </View>
      {user.activeLeagues.length > 0 && (
        <View style={[tw`flex flex-col rounded-md relative mb-4 gap-2`]}>
          <PickemsText style={[tw`font-semibold`]}>My Leagues</PickemsText>
          {user.activeLeagues.map((al) => (
            <TouchableOpacity
              key={al.league_id}
              onPress={() => {
                dispatch(
                  userActions.updateSelectedLeague({
                    activeLeagueID: al.league_id,
                  })
                );
                router.push("/user-picks");
              }}
              style={[
                tw`flex mx-1  relative border rounded-lg items-center p-2 flex-row gap-2`,
              ]}
            >
              <LinearGradient
                colors={["#000000", "#ffffff"]}
                start={{ x: 0.4, y: 0.1 }}
                end={{ x: 0.7, y: 1.2 }}
                style={[tw`absolute top-0 right-0 rounded-md left-0 bottom-0`]}
              />
              <View style={[tw`flex-1 flex-row gap-2`]}>
                <Ionicons
                  name="american-football"
                  color={"white"}
                  size={25}
                  // style={[tw`bg-white`]}
                />
                <PickemsText style={[tw`text-white`]}>
                  {al.league_name}
                </PickemsText>
              </View>
              <Ionicons name="chevron-forward" style={[tw``]} color={"black"} />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </PickemsPage>
  );
}
