import { tw } from "@/tailwind";
import { useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { PickemsPage } from "../core/PickemsPage";
import { PickemsText } from "../PickemsText";
import { getMatchupWeeks } from "@/src/helpers/helpers";
import { MatchupsBySeasonAndWeek } from "../MatchupsBySeasonAndWeek";
import {
  useGetAllMatchups,
  useGetMatchupsBySeasonQuery,
} from "@/src/services/user";
import { Ionicons } from "@expo/vector-icons";
import { FootballLoader } from "../FootballLoader";
import { PickemsLoadingPage } from "../PickemsLoadingPage";
const matchupWeeks = [
  { season: 2024, week: 1 },
  { season: 2024, week: 2 },
  { season: 2024, week: 3 },
  { season: 2024, week: 4 },
  { season: 2024, week: 5 },
  { season: 2024, week: 6 },
  { season: 2024, week: 7 },
  { season: 2024, week: 8 },
  { season: 2024, week: 9 },
  { season: 2024, week: 10 },
  { season: 2024, week: 11 },
  { season: 2024, week: 12 },
  { season: 2024, week: 13 },
  { season: 2024, week: 14 },
  { season: 2024, week: 15 },
  { season: 2024, week: 16 },
  { season: 2024, week: 17 },
  { season: 2024, week: 18 },
];
export function MatchupsScreen() {
  const {
    data: matchups,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllMatchups("");

  const { width } = Dimensions.get("screen");
  const flatlistRef = useRef(null);
  const [week, setWeek] = useState(1);

  const scrollToIndex = (index: any) => {
    //@ts-ignore
    flatlistRef.current?.scrollToIndex({
      animated: true,
      index: index,
      // viewPosition: 0.5, // This will center the item in the view
    });
  };

  const handleWeekChange = (direction: "forwards" | "backwards") => {
    let weekVal: number;
    if (direction === "forwards") {
      weekVal = week + 1;
    } else {
      weekVal = week - 1;
    }

    const index = matchupWeeks.findIndex((x) => x.week === weekVal);
    scrollToIndex(index);
    setWeek(weekVal);
  };
  if (isLoading) {
    return <PickemsLoadingPage title="Fetching matchups!" />;
  }

  return (
    <PickemsPage
      refreshControl={{
        isRefreshing: isFetching && !isLoading,
        onRefresh: refetch,
      }}
      isTabBarScreen
    >
      <>
        <View
          style={[tw`flex flex-row mb-3 items-center justify-center  gap-2 `]}
        >
          {week > 1 ? (
            <TouchableOpacity
              style={[tw`w-8 `]}
              onPress={() => {
                handleWeekChange("backwards");
              }}
            >
              <Ionicons size={30} name="chevron-back-circle-outline" />
            </TouchableOpacity>
          ) : (
            <View style={[tw` w-8`]} />
          )}
          <PickemsText style={[tw`text-center text-lg `]}>
            Week {week} Matchups
          </PickemsText>
          {week < 18 ? (
            <TouchableOpacity
              style={[tw`w-8`]}
              onPress={() => {
                handleWeekChange("forwards");
              }}
            >
              <Ionicons size={30} name="chevron-forward-circle-outline" />
            </TouchableOpacity>
          ) : (
            <View style={[tw`w-8`]} />
          )}
        </View>
        <FlatList
          horizontal={true}
          // initialNumToRender={100}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[tw`flex flex-row`]}
          style={[tw``, { width: width }]}
          ref={flatlistRef}
          pagingEnabled={true}
          maxToRenderPerBatch={8}
          onScrollToIndexFailed={() => {
            return;
          }}
          windowSize={3}
          initialNumToRender={3}
          keyExtractor={(props) => `${props.season - props.week}`}
          // inverted={true}
          onMomentumScrollEnd={(ev) => {
            const offset = ev.nativeEvent.contentOffset.x;
            const index = Math.round(offset / width);
            const week = matchupWeeks[index].week;
            setWeek(week);
            // const year = monthsAndYears[index].year;
            // const month = monthsAndYears[index].month;

            // setYear(year);
            // setMonth(month);
          }}
          data={matchupWeeks}
          renderItem={(item) => {
            return (
              <View style={[tw`flex flex-row `, { width: width }]}>
                <MatchupsBySeasonAndWeek
                  season={item.item.season}
                  week={item.item.week}
                  matchups={matchups}
                />
              </View>
            );
          }}
        />
      </>
    </PickemsPage>
  );
}
