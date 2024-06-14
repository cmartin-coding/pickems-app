import { PickemsHeader } from "@/src/components/PickemsHeader";
import { PickemsInputModal } from "@/src/components/PickemsInputModal";
import { PickemsText } from "@/src/components/PickemsText";
import { PickemsAuthenticatedPage } from "@/src/components/core/PickemsAuthenticatedPage";
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

  const [loading, setLoading] = useState(false);
  const currLeague = user.activeLeagues.find((l) => l.league_id === leagueID);
  const [submitPicks, { isLoading: isSubmittingPicksLoading }] =
    useSubmitPicksMutation();

  const [hasSubmittedPicks, setHasSubmittedPicks] = useState(false);
  const handleSubmittingPicks = async (picks: Tables<"picks">[]) => {
    try {
      await submitPicks(picks);
      setHasSubmittedPicks(true);
    } catch (ex) {
      console.error(ex);
    }
  };

  useEffect(() => {
    if (hasSubmittedPicks && !isFetching) {
      setHasSubmittedPicks(false);
    }
  }, [isFetching]);

  console.log("HERE", hasSubmittedPicks);

  return (
    <>
      <View style={[tw`flex flex-col bg-white items-center gap-2`]}>
        <PickemsHeader style={[tw`mb-0`]}>2024 Picks</PickemsHeader>

        <View
          style={[
            tw`flex flex-row border p-1 ${
              currWeek === selectedWeek ? "" : "bg-blue-200"
            } rounded-lg items-center`,
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              if (selectedWeek > 1) {
                setSelectedWeek((prev) => prev - 1);
              }
            }}
            style={[tw`border-r  border-r-black`]}
          >
            <Ionicons name="chevron-back-sharp" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsModalShown(true);
            }}
            style={[tw`flex px-2 flex-row gap-1 items-center`]}
          >
            <PickemsText>Week {selectedWeek}</PickemsText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[tw`border-l  flex flex-row justify-center border-l-black`]}
            onPress={() => {
              if (selectedWeek < 18) {
                setSelectedWeek((prev) => prev + 1);
              }
            }}
          >
            <Ionicons name="chevron-forward-sharp" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      {(isLoading || (isFetching && !hasSubmittedPicks)) && (
        <View style={[tw` h-full flex flex-row items-center justify-center`]}>
          <ActivityIndicator />
        </View>
      )}
      {!data && !isLoading && <PickemsText>No picks data...</PickemsText>}
      {data && !isLoading && (
        <UserPicksScreen
          isLoading={isSubmittingPicksLoading}
          leagueId={leagueID}
          currWeek={currWeek}
          isOverUnderEnabled={!!currLeague?.isOverUnderEnabled}
          matchups={data}
          onSubmitPicks={(picks) => {
            handleSubmittingPicks(picks);
          }}
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
    </>
  );
}
