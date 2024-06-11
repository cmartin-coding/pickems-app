import { tw } from "@/tailwind";
import { useMemo, useRef, useState } from "react";
import { Dimensions, FlatList, View, useWindowDimensions } from "react-native";
import { PickemsPage } from "../core/PickemsPage";
import { PickemsText } from "../PickemsText";
import { getMatchupWeeks } from "@/src/helpers/helpers";
import { MatchupsBySeasonAndWeek } from "../MatchupsBySeasonAndWeek";
import {
  useGetMatchupsBySeasonQuery,
  useGetMatchupsForCurrentSeasonQuery,
} from "@/src/services/user";

export function MatchupsScreen() {
  const { data: matchups, isLoading } = useGetMatchupsForCurrentSeasonQuery("");

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
  // const matchupWeeks = useMemo(() => {
  //   return getMatchupWeeks(2024);
  // }, []);

  if (isLoading) {
    return <PickemsText>Loading...</PickemsText>;
  }
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

  return (
    <PickemsPage isTabBarScreen>
      <PickemsText style={[tw`text-center text-lg mb-3`]}>
        Week {week} Matchups
      </PickemsText>
      <FlatList
        horizontal={true}
        // initialNumToRender={100}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[tw`flex flex-row`]}
        style={[tw``, { width: width }]}
        ref={flatlistRef}
        pagingEnabled={true}
        maxToRenderPerBatch={8}
        windowSize={3}
        initialNumToRender={3}
        keyExtractor={(props) => `${props.season - props.week}`}
        // inverted={true}
        onMomentumScrollEnd={(ev) => {
          const offset = ev.nativeEvent.contentOffset.x;
          const index = Math.round(offset / width);
          const week = matchupWeeks[index].week;
          console.log("week");
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
    </PickemsPage>
  );
}
