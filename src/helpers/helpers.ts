import { NFL_START_DATE } from "../constants/const";
import { add, differenceInWeeks } from "date-fns";
import { MatchupPicksType, Matchups } from "../types/types";
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
export function getMatchupWeeks(season_year: number) {
  const matchupWeeks = [];
  for (let i = 1; i <= 18; i++) {
    let matchupWeek = { week: i, season: season_year };
    matchupWeeks.push(matchupWeek);
  }

  return matchupWeeks;
}

export function getCurrentNFLWeek() {
  const currDate = new Date();
  if (currDate < NFL_START_DATE) {
    return 1;
  } else {
    return differenceInWeeks(currDate, NFL_START_DATE);
  }
}

export function formatMatchupsByTimeOfDay(
  matchups: MatchupPicksType[] | Matchups[]
) {
  const formattedData = matchups.reduce((acc, matchup) => {
    //@ts-ignore
    const { time, ...data } = matchup;

    if (acc[time]) {
      //@ts-ignore
      acc[time].push({ ...data, time: time });
    } else {
      //@ts-ignore
      acc[time] = [{ ...data, time: time }];
    }
    return acc;
  }, {} as { [key: string]: MatchupPicksType[] });

  return formattedData;
}

export function getWeeklyResults(completedMatchups: MatchupPicksType[]): {
  numberOfCorrectPicks: number;
  numberOfCorrectOverUnderPicks: number;
} {
  const numberOfCorrectPicks = completedMatchups.reduce((prev, acc) => {
    const isCorrect = acc.picks[0].team_selection === acc.winner;
    if (isCorrect) {
      return prev + 1;
    } else {
      return prev;
    }
  }, 0);
  const numberOfCorrectOverUnderPicks = completedMatchups.reduce(
    (prev, acc) => {
      const isCorrect =
        acc.picks[0].over_under_selection === acc.over_under_winner;
      if (isCorrect) {
        return prev + 1;
      } else {
        return prev;
      }
    },
    0
  );

  return { numberOfCorrectPicks, numberOfCorrectOverUnderPicks };
}