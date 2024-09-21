import tw from "@/tailwind";
import { View, ViewStyle } from "react-native";
import { useGetMatchupsBySeasonQuery } from "../services/user";
import { PickemsText } from "./PickemsText";
import Svg, { Path } from "react-native-svg";
import { NFL } from "../constants/team-logos/nfl";
import { TeamLogo } from "../constants/team-logos/TeamLogo";
import { NFLTeamNames } from "../types/types";
import { MatchupsTeamCard } from "./MatchupsTeamCard";
import { formatMatchupsByTimeOfDay, getTeamColors } from "../helpers/helpers";
import { format, getDay } from "date-fns";
import { daysOfWeek } from "../constants/const";
type MatchupsBySeasonAndWeekType = {
  season: number;
  week: number;
  style?: ViewStyle;
  matchups: any[];
};

export function MatchupsBySeasonAndWeek(props: MatchupsBySeasonAndWeekType) {
  const matchups = props.matchups.filter((m) => m.week === props.week);

  const formattedMatchups = formatMatchupsByTimeOfDay(matchups);

  const dates = Object.keys(formattedMatchups).sort(
    //@ts-ignore
    (a, b) => new Date(a) - new Date(b)
  );

  return (
    <View
      style={[tw`flex flex-col w-[95%] mt-5 items-center  gap-3 `, props.style]}
    >
      {dates.map((d) => {
        const day = daysOfWeek[getDay(new Date(d))];
        const dateStr = format(new Date(d), "MMM d ");
        const timeStr = format(new Date(d), "h:mm a");

        return (
          <View key={d} style={[tw`flex   flex-col gap-3 pt-3  w-full`]}>
            <View
              style={[
                tw`flex flex-row  pb-2 mx-4 border-b border-b-black justify-between`,
              ]}
            >
              <PickemsText style={[tw`font-bold text-lg`]}>
                {day} {dateStr}
              </PickemsText>
              <PickemsText style={[tw``]}>{timeStr}</PickemsText>
            </View>
            <View style={[tw`flex flex-col pt-2 items-center   px-4 gap-3  `]}>
              {formattedMatchups[d].map((matchup) => {
                const isHomeTeamWinner =
                  matchup.winner && matchup.winner === matchup.home_team.id;
                const isAwayTeamWinner =
                  matchup.winner && matchup.winner === matchup.away_team.id;
                const homeTeamBG = getTeamColors(
                  matchup.home_team.name as NFLTeamNames,
                  "primary",
                  "background"
                );
                const awayTeamBG = getTeamColors(
                  matchup.away_team.name as NFLTeamNames,
                  "primary",
                  "background"
                );
                return (
                  <View
                    style={[
                      tw`flex  min-h-20  flex-col border bg-blue-200/20 ${
                        matchup.isComplete
                          ? "border-blue-600 border-2"
                          : "border-slate-300"
                      } rounded-md w-full`,
                    ]}
                    key={matchup.id}
                  >
                    <View style={[tw`flex flex-row  flex-1 items-center`]}>
                      <View
                        style={[
                          tw`pl-2 flex-1 ${
                            isAwayTeamWinner ? awayTeamBG : ""
                          }  rounded-sm flex flex-col items-center `,
                        ]}
                      >
                        <MatchupsTeamCard
                          textStyle={[
                            tw`${isAwayTeamWinner ? "text-white" : ""}`,
                          ]}
                          teamId={matchup.away_team.id}
                          abbreviation={
                            matchup.away_team.abbreviation as string
                          }
                          isComplete={matchup.isComplete}
                          isWinner={!!isAwayTeamWinner}
                          score={matchup.score.away || 0}
                          teamName={matchup.away_team.name as NFLTeamNames}
                        />
                      </View>
                      <PickemsText style={[tw` text-center  font-extrabold`]}>
                        @
                      </PickemsText>
                      <View
                        style={[
                          tw`pr-2 flex-1  ${
                            isHomeTeamWinner ? homeTeamBG : ""
                          } rounded-sm flex flex-col items-center`,
                        ]}
                      >
                        <MatchupsTeamCard
                          textStyle={[
                            tw`${isHomeTeamWinner ? "text-white" : ""}`,
                          ]}
                          teamId={matchup.home_team.id}
                          abbreviation={
                            matchup.home_team.abbreviation as string
                          }
                          isComplete={matchup.isComplete}
                          isWinner={!!isHomeTeamWinner}
                          score={matchup.score.home || 0}
                          teamName={matchup.home_team.name as NFLTeamNames}
                        />
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}
      {/* {matchups.map((matchup) => {
        const isHomeTeamWinner =
          matchup.winner && matchup.winner === matchup.home_team.id;
        const isAwayTeamWinner =
          matchup.winner && matchup.winner === matchup.away_team.id;
        return (
          <View
            style={[
              tw`flex flex-1  flex-col border bg-blue-200/20 border-slate-300 rounded-md w-full`,
            ]}
            key={matchup.id}
          >
            <View style={[tw`flex flex-row  flex-1 items-center`]}>
              <View style={[tw`pl-4`]}>
                <MatchupsTeamCard
                  teamId={matchup.home_team.id}
                  abbreviation={matchup.home_team.abbreviation as string}
                  isComplete={matchup.isComplete}
                  isWinner={!!isHomeTeamWinner}
                  score={matchup.score.home || 0}
                  teamName={matchup.home_team.name}
                />
              </View>
              <PickemsText
                style={[tw`flex-1 text-center  text-black font-extrabold`]}
              >
                VS.
              </PickemsText>
              <MatchupsTeamCard
                teamId={matchup.away_team.id}
                abbreviation={matchup.away_team.abbreviation as string}
                isComplete={matchup.isComplete}
                isWinner={!!isAwayTeamWinner}
                score={matchup.score.away || 0}
                teamName={matchup.away_team.name}
              />
            </View>
          </View>
        );
      })} */}
    </View>
  );
}
