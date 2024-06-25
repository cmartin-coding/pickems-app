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
import { tw } from "@/tailwind";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "@/src/supabase";
export default function Home() {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);
  // const { data } = useGetLeagueUsersQuery({
  //   leagueID: user.activeLeagues[0].league_id,
  // });
  // console.log(data);
  const test = async () => {
    const { data } = await supabase.from("users").select("*");
    console.log(data);
  };
  test();

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
          // end={{ x: 1, y: 1.5 }}
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
            // <PickemsCard
            //   style={[tw` `]}
            //   key={al.league_id}
            //   onPress={() => {
            //     dispatch(
            //       activeLeagueActions.setActiveLeague({
            //         leagueID: al.league_id,
            //       })
            //     );
            //     router.push({
            //       pathname: "/user-picks",
            //       // params: { leagueId: al.league_id },
            //     });
            //   }}
            // >
            //   <PickemsText style={[tw`ml-2`]}>{al.league_name}</PickemsText>
            // </PickemsCard>
          ))}
        </View>
      )}

      {/* <View>
        <PickemsText style={[tw`text-md font-semibold`]}>News</PickemsText>
      </View> */}
    </PickemsPage>
  );
}
