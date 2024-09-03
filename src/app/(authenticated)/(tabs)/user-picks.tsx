import { PickemsHeader } from "@/src/components/PickemsHeader";
import { PickemsInputModal } from "@/src/components/PickemsInputModal";
import { PickemsText } from "@/src/components/PickemsText";
import { UserPicksHeader } from "@/src/components/UserPicksHeader";
import { PickemsPage } from "@/src/components/core/PickemsPage";
import { UserPicksScreen } from "@/src/components/screens/UserPicksScreen";
import { NFL_START_DATE } from "@/src/constants/const";
import { NFL_WEEKS } from "@/src/constants/weeks";
import { getCurrentNFLWeek } from "@/src/helpers/helpers";
import { useGetUserPicks, useSubmitPicksMutation } from "@/src/services/user";
import { useAppSelector } from "@/src/store";
import { Tables } from "@/src/types/supabaseTypes";
import tw from "@/tailwind";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import Home from "./home";
import { NoActiveLeaguesPlaceholder } from "@/src/components/NoActiveLeaguesPlaceholder";
import { LinearGradient } from "expo-linear-gradient";
import { FootballLoader } from "@/src/components/FootballLoader";
import { useThemeContext } from "@/src/context/ThemeContext";

export default function UserPicks() {
  const {} = useThemeContext();
  const user = useAppSelector((state) => state.user);

  const currWeek = getCurrentNFLWeek();

  console.log(currWeek);
  const [selectedWeek, setSelectedWeek] = useState(currWeek);

  const { isLoading, data, isFetching, refetch } = useGetUserPicks({
    leagueId: user.currentActiveLeague || "",
    userId: user.user.id,
    week_num: selectedWeek,
  });

  useEffect(() => {
    refetch();
  }, [user.currentActiveLeague]);

  const currLeague = user.activeLeagues.find(
    (l) => l.league_id === user.currentActiveLeague
  );

  if (!user.currentActiveLeague) {
    return <NoActiveLeaguesPlaceholder tab="user-picks" />;
  }

  return (
    <>
      {isLoading && !data && (
        <View style={[tw`flex-1 `]}>
          <View
            style={[tw`flex w-full p-4 flex-col items-start relative mb-2`]}
          >
            <LinearGradient
              style={[
                tw` absolute top-0 bottom-0 flex flex-row justify-center left-0 right-0`,
              ]}
              start={{ x: 0.2, y: 0.2 }}
              // end={{ x: 1, y: 1.5 }}
              colors={["#000000", "#0000FF"]}
            >
              <Ionicons
                name="american-football"
                size={175}
                style={[
                  tw`absolute bg-transparent -top-10 right-0 text-white/20`,
                ]}
              />
            </LinearGradient>
            <PickemsText style={[tw`text-white font-semibold mb-2 text-lg`]}>
              My Picks
            </PickemsText>
            <UserPicksHeader
              // includeHeader
              selectedWeek={selectedWeek}
              style={[tw`bg-white/0`]}
              selectionStyle={[tw`border-0 bg-white`]}
              onWeekChange={(week) => {
                // setSelectedWeek(week);
              }}
            />
          </View>

          <FootballLoader />
        </View>
        // <View style={[tw`w-full h-full flex flex-col`]}>
        //   <UserPicksHeader
        //     includeHeader
        //     onWeekChange={() => {}}
        //     selectedWeek={currWeek}
        //   />

        // </View>
      )}

      {data && (
        <UserPicksScreen
          refetch={refetch}
          isFetching={isFetching}
          isLoadingInitial={isLoading}
          currWeek={currWeek}
          isOverUnderEnabled={!!currLeague?.isOverUnderEnabled}
          matchups={data}
          onChangeWeek={(week) => {
            setSelectedWeek(week);
          }}
        />
      )}
    </>
  );
}
