import { PickemsHeader } from "@/src/components/PickemsHeader";
import { PickemsInputModal } from "@/src/components/PickemsInputModal";
import { PickemsText } from "@/src/components/PickemsText";
import { UserPicksHeader } from "@/src/components/UserPicksHeader";
import { PickemsPage } from "@/src/components/core/PickemsPage";
import { UserPicksScreen } from "@/src/components/screens/UserPicksScreen";
import { NFL_START_DATE } from "@/src/constants/const";
import { NFL_WEEKS } from "@/src/constants/weeks";
import { getCurrentNFLWeek } from "@/src/helpers/helpers";
import {
  useGetPicksByLeagueIdAndUserAndSeason,
  useSubmitPicksMutation,
} from "@/src/services/user";
import { useAppSelector } from "@/src/store";
import { Tables } from "@/src/types/supabaseTypes";
import { tw } from "@/tailwind";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import Home from "./home";
import { PickemsButton } from "@/src/components/PickemsButton";
import { NoActiveLeaguesPlaceholder } from "@/src/components/NoActiveLeaguesPlaceholder";

export default function UserPicks() {
  const user = useAppSelector((state) => state.user);
  const currentSelectedLeague = useAppSelector((state) => state.activeLeague);
  // const { leagueId } = useLocalSearchParams<{ leagueId: string }>();
  // let leagueID = leagueId;
  // if (!leagueID) {
  // leagueID = user.activeLeagues[0]?.league_id;
  // }
  if (!currentSelectedLeague.selectedLeagueID) {
    return <NoActiveLeaguesPlaceholder tab="user-picks" />;
  }

  const currWeek = getCurrentNFLWeek();
  const [selectedWeek, setSelectedWeek] = useState(currWeek);

  const { isLoading, data, isFetching, refetch } =
    useGetPicksByLeagueIdAndUserAndSeason({
      leagueId: currentSelectedLeague.selectedLeagueID,
      userId: user.user.id,
      week_num: selectedWeek,
    });

  useEffect(() => {
    refetch();
  }, [currentSelectedLeague.selectedLeagueID]);

  const currLeague = user.activeLeagues.find(
    (l) => l.league_id === currentSelectedLeague.selectedLeagueID
  );

  return (
    <>
      {isLoading && !data && (
        <View style={[tw`w-full h-full flex flex-col`]}>
          <UserPicksHeader
            includeHeader
            onWeekChange={() => {}}
            selectedWeek={currWeek}
          />
          <View style={[tw`flex-1 flex-row justify-center items-center`]}>
            <ActivityIndicator style={[tw``]} />
          </View>
        </View>
      )}

      {data && (
        <UserPicksScreen
          refetch={refetch}
          isFetching={isFetching}
          isLoadingInitial={isLoading}
          leagueId={currentSelectedLeague.selectedLeagueID}
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
