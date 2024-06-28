import tw from "@/tailwind";
import { Alert, Switch, View, ViewStyle } from "react-native";
import { MatchupsTeamCard } from "../MatchupsTeamCard";
import { PickemsText } from "../PickemsText";
import { MatchupPicksType } from "@/src/types/types";
import { PickemsOptionSlider } from "../PickemsOptionSlider";
import { PickemsButton } from "../PickemsButton";
import { useEffect, useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { PicksMatchupCard } from "../PicksMatchupCard";
import {
  formatMatchupsByTimeOfDay,
  getCurrentNFLWeek,
  getWeeklyResults,
} from "@/src/helpers/helpers";
import { daysOfWeek } from "@/src/constants/const";
import { format, getDay } from "date-fns";
import { Tables } from "@/src/types/supabaseTypes";
import { useSubmitPicksMutation } from "@/src/services/user";
import { useAppSelector } from "@/src/store";
import { UserPickStats } from "../UserPicksStats";
import { UserPicksHeader } from "../UserPicksHeader";
import Toast from "react-native-toast-message";
import { PickemsPage } from "../core/PickemsPage";
import { LinearGradient } from "expo-linear-gradient";
import { PicksByGameTime } from "../PicksByGameTime";
import { WeekSelectorHeader } from "../WeekSelectorHeader";
import { PickemsAccordion } from "../PickemsAccordion";
import { FootballLoader } from "../FootballLoader";

type UserPicksScreenType = {
  isOverUnderEnabled: boolean;
  matchups: MatchupPicksType[];
  currWeek: number;
  style?: ViewStyle[];
  onChangeWeek: (week: number) => void;
  isFetching: boolean;
  isLoadingInitial: boolean;
  refetch: () => void;
  // onSubmitPicks: (picks: Tables<"picks">[]) => void;
};
const showSuccessfulSavingToastMessage = () => {
  Toast.show({
    type: "success",
    text1: "Picks Saved!",
    text2: "Good luck.",
    position: "bottom",
    visibilityTime: 1300,
  });
};
export function UserPicksScreen(props: UserPicksScreenType) {
  const matchupsWeek = props.matchups[0].week;
  const isCurrentMatchupWeek = matchupsWeek === props.currWeek;

  const [includeCompletedPicks, setIncludeCompletedPicks] = useState(true);
  const [picks, setPicks] = useState<Tables<"picks">[]>([]);

  const formattedTBDMatchups = useMemo(() => {
    let matchups = props.matchups.filter((m) => !m.isComplete);
    if (!includeCompletedPicks) {
      matchups = props.matchups.filter((x) => !x.picks[0]?.id);
    }

    return formatMatchupsByTimeOfDay(matchups);
  }, [includeCompletedPicks, props.matchups]);
  const upcomingGameTimes = Object.keys(formattedTBDMatchups).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const formattedCompleteMatchups = useMemo(() => {
    return formatMatchupsByTimeOfDay(
      props.matchups.filter((m) => m.isComplete)
    );
  }, [props.matchups]);
  const completedGameTimes = Object.keys(formattedCompleteMatchups).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const totalMatchups = props.matchups.length;
  const totalPicksAlreadySubmitted = props.matchups.reduce((prev, acc) => {
    if (!!acc.picks[0]?.id) {
      return prev + 1;
    } else {
      return prev;
    }
  }, 0);

  const hasCompletedWeeklyPicks = totalMatchups === totalPicksAlreadySubmitted;

  const completedMatchups = props.matchups.filter((m) => m.isComplete);
  const pickResults = getWeeklyResults(completedMatchups);

  const [submitPicks, { isLoading: isSubmittingPicksLoading }] =
    useSubmitPicksMutation();

  const [isAvoidingFullLoader, setIsAvoidingFullLoader] = useState(false);
  const [overrideRefreshControl, setOverrideRefreshControl] = useState(false);

  useEffect(() => {
    if (isAvoidingFullLoader && !props.isFetching) {
      setIsAvoidingFullLoader(false);
    }
    if (overrideRefreshControl && !props.isFetching) {
      setOverrideRefreshControl(false);
    }
  }, [props.isFetching]);

  const currWeek = getCurrentNFLWeek();
  const [selectedWeek, setSelectedWeek] = useState(currWeek);

  const numberOfCompletedPicks = picks.length;
  const isButtonsDisabled = numberOfCompletedPicks === 0;

  const handleSubmittingPicks = async (picks: Tables<"picks">[]) => {
    try {
      await submitPicks(picks);
      setOverrideRefreshControl(true);
      setIsAvoidingFullLoader(true);
      setPicks([]);
      showSuccessfulSavingToastMessage();
    } catch (ex) {
      console.error(ex);
    }
  };

  return (
    <PickemsPage
      refreshControl={{
        isRefreshing: props.isFetching && !overrideRefreshControl,
        onRefresh: () => {
          setIsAvoidingFullLoader(true);

          props.refetch();
        },
      }}
      isTabBarScreen
      aboveScrollViewChildren={
        <WeekSelectorHeader
          selectedWeek={selectedWeek}
          onWeekChange={(week) => {
            if (picks.length > 0) {
              Alert.alert(
                "Confirm Navigation",
                "You have unsaved changes, are you sure you want to leave this screen?",
                [
                  {
                    text: "Stay",
                    onPress: () => console.log("Stay Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "Leave",
                    onPress: () => {
                      setPicks([]);
                      setSelectedWeek(week);
                      props.onChangeWeek(week);
                    },
                  },
                ]
              );
            } else {
              setSelectedWeek(week);
              props.onChangeWeek(week);
            }
          }}
        />
      }
      belowScrollViewChildren={
        (!isButtonsDisabled || isSubmittingPicksLoading) && (
          <View style={[tw`absolute bottom-0 bg-white w-full`]}>
            <PickemsButton
              onPress={() => {
                handleSubmittingPicks(picks);
              }}
              buttonLabel={
                isSubmittingPicksLoading ? "Saving..." : "Save Picks"
              }
              style={[tw`p-4 border rounded-0   bg-blue-800`]}
              disabledStyle="bg-gray-200"
              textStyle={[tw`text-white font-bold`]}
            />
          </View>
        )
      }
    >
      {props.isLoadingInitial || (props.isFetching && !isAvoidingFullLoader) ? (
        <View style={[tw` h-full flex flex-row items-center justify-center`]}>
          <FootballLoader />
        </View>
      ) : (
        <>
          <UserPickStats
            stats={{
              numberOfCorrectOverUnderPicks:
                pickResults.numberOfCorrectOverUnderPicks,
              numberOfCorrectPicks: pickResults.numberOfCorrectPicks,
              totalSelections: completedMatchups.length,
              hasCompletedWeeklyPicks: hasCompletedWeeklyPicks,
            }}
            onIncludeCompletedPicks={(val) => {
              setIncludeCompletedPicks(val);
            }}
          />

          {!hasCompletedWeeklyPicks && (
            <View
              style={[
                tw`flex mb-6 mx-4 mt-2 flex-row gap-1 items-center  justify-center`,
              ]}
            >
              <Ionicons name="alert-circle" color={"red"} size={20} />
              <PickemsText style={[tw`   text-center text-sm`]}>
                You haven't made all of your picks!
              </PickemsText>
            </View>
          )}

          <PickemsAccordion
            title="Completed Matchups"
            style={[tw`border-2 mb-6`]}
          >
            <View style={[tw`  bg-slate-300/40`]}>
              <PicksByGameTime
                gametimes={completedGameTimes}
                isCurrentMatchupWeek={isCurrentMatchupWeek}
                isLoadingPicksSubmission={false}
                matchups={formattedCompleteMatchups}
                onPickCompleted={() => {}}
              />
            </View>
          </PickemsAccordion>

          <PicksByGameTime
            gametimes={upcomingGameTimes}
            isCurrentMatchupWeek={isCurrentMatchupWeek}
            matchups={formattedTBDMatchups}
            onPickCompleted={(pick) => {
              const pickIndex = picks.findIndex((p) => p.id === pick.id);
              if (pickIndex < 0) {
                setPicks((prev) => [...prev, pick]);
              } else {
                const newPicks = [...picks];
                newPicks[pickIndex] = pick;
                setPicks(newPicks);
              }
            }}
            isLoadingPicksSubmission={isSubmittingPicksLoading}
          />
        </>
      )}
    </PickemsPage>
  );
}
