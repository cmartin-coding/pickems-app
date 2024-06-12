import { PickemsHeader } from "@/src/components/PickemsHeader";
import { PickemsInputModal } from "@/src/components/PickemsInputModal";
import { PickemsText } from "@/src/components/PickemsText";
import { PickemsAuthenticatedPage } from "@/src/components/core/PickemsAuthenticatedPage";
import { PickemsPage } from "@/src/components/core/PickemsPage";
import { UserPicksScreen } from "@/src/components/screens/UserPicksScreen";
import { NFL_START_DATE } from "@/src/constants/const";
import { NFL_WEEKS } from "@/src/constants/weeks";
import { getCurrentNFLWeek } from "@/src/helpers/helpers";
import { useGetPicksByLeagueIdAndUserAndSeason } from "@/src/services/user";
import { useAppSelector } from "@/src/store";
import { Tables } from "@/src/types/supabaseTypes";
import { tw } from "@/tailwind";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

export default function UserPicks() {
  const user = useAppSelector((state) => state.user);
  const { leagueId } = useLocalSearchParams<{ leagueId: string }>();
  let leagueID = leagueId;
  if (!leagueID) {
    leagueID = user.activeLeagues[0]?.league_id;
  }

  const scrollViewRef = useRef(null);
  const [weeksItemHeight, setWeeksItemHeight] = useState(0);
  const [isModalShown, setIsModalShown] = useState(false);

  const currWeek = getCurrentNFLWeek();
  const [selectedWeek, setSelectedWeek] = useState(currWeek);

  const { isLoading, data, isFetching } = useGetPicksByLeagueIdAndUserAndSeason(
    {
      leagueId: leagueID,
      userId: user.user.id,
      week_num: selectedWeek,
    }
  );

  const currLeague = user.activeLeagues.find((l) => l.league_id === leagueID);

  return (
    <PickemsAuthenticatedPage>
      <View style={[tw`mb-4 flex flex-col items-center gap-2`]}>
        <PickemsHeader style={[tw`mb-0`]}>2024 Picks</PickemsHeader>
        <TouchableOpacity
          onPress={() => {
            setIsModalShown(true);
          }}
          style={[
            tw`flex border rounded-xl p-[3px] flex-row gap-1 items-center`,
          ]}
        >
          <PickemsText>Week {selectedWeek}</PickemsText>
          <Ionicons size={16} name="chevron-down-sharp" />
        </TouchableOpacity>
      </View>
      {(isLoading || isFetching) && (
        <View style={[tw` h-full flex flex-row items-center justify-center`]}>
          <ActivityIndicator />
        </View>
      )}
      {!data && !isLoading && <PickemsText>No picks data...</PickemsText>}
      {data && !isLoading && !isFetching && (
        <UserPicksScreen
          leagueId={leagueID}
          currWeek={currWeek}
          isOverUnderEnabled={!!currLeague?.isOverUnderEnabled}
          matchups={data}
        />
      )}
      <PickemsInputModal
        visible={isModalShown}
        onDismiss={() => {
          setIsModalShown(false);
        }}
      >
        <View style={[tw`pb-10`]}>
          <View
            style={[
              tw`flex flex-row border-b border-b-slate-300 pb-2 items-center justify-between`,
            ]}
          >
            <View style={[tw`flex-1`]} />
            <PickemsText style={[tw`flex-1 text-md`]}>Select Week</PickemsText>
            <TouchableOpacity
              onPress={() => {
                setIsModalShown(false);
              }}
              style={[tw`flex-1 flex flex-row justify-end`]}
            >
              <Ionicons name="close-circle-outline" size={28} color={"black"} />
            </TouchableOpacity>
          </View>
          <ScrollView
            contentOffset={{ x: 0, y: (selectedWeek - 1) * 48 }}
            ref={scrollViewRef}
            style={[tw`flex flex-col mt-3`]}
          >
            {NFL_WEEKS.map((x) => {
              const isSelected = x === selectedWeek;
              return (
                <TouchableOpacity
                  onLayout={(event) => {
                    if (weeksItemHeight === 0) {
                      const { height } = event.nativeEvent.layout;
                      setWeeksItemHeight(height);
                    }
                  }}
                  key={x}
                  style={[
                    tw`${
                      isSelected ? "bg-black/10" : ""
                    } rounded-lg p-3 flex flex-row items-center justify-between`,
                  ]}
                  onPress={() => {
                    setSelectedWeek(x);
                    setIsModalShown(false);
                  }}
                >
                  <View style={[tw`flex flex-col`]}>
                    <PickemsText style={[tw`text-black font-bold`]}>
                      Week {x}
                    </PickemsText>
                    {x === currWeek && (
                      <PickemsText style={[tw`text-xs`]}>
                        Current Week
                      </PickemsText>
                    )}
                  </View>
                  {isSelected && (
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={24}
                      color={"green"}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </PickemsInputModal>
    </PickemsAuthenticatedPage>
  );
}
