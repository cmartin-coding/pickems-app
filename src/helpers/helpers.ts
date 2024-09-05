import { NFL_START_DATE } from "../constants/const";
import {
  add,
  addMinutes,
  differenceInDays,
  differenceInMinutes,
  differenceInWeeks,
  isWithinInterval,
  parseISO,
  subMinutes,
} from "date-fns";
import { MatchupPicksType, Matchups, NFLTeamNames } from "../types/types";
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

  const daysSinceStart = differenceInDays(currDate, NFL_START_DATE);
  if (currDate < NFL_START_DATE) {
    return 1;
  } else {
    return Math.floor(daysSinceStart / 5) + 1;
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

export function getWeeklyResults(
  completedMatchups: MatchupPicksType[]
  // userId?: string
): {
  numberOfCorrectPicks: number;
  numberOfCorrectOverUnderPicks: number;
} {
  const numberOfCorrectPicks = completedMatchups.reduce((prev, acc) => {
    const isCorrect = acc.picks[0]?.team_selection === acc.winner;
    if (isCorrect) {
      return prev + 1;
    } else {
      return prev;
    }
  }, 0);
  const numberOfCorrectOverUnderPicks = completedMatchups.reduce(
    (prev, acc) => {
      const isCorrect =
        acc.picks[0]?.over_under_selection === acc.over_under_winner;
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

export function getLeagueStandings(completedMatchups: MatchupPicksType[]) {
  // Go through all picks for each completed matchup
  // For each user pick
}
export function getLeagueShareableID() {
  return Math.floor(1000 + Math.random() * 9000);
}

export function getMatchIsStartingSoonLockout(matchupTime: string) {
  // Get the date to ISO
  const parsedDate = parseISO(matchupTime);

  // get Current Date/Time
  const now = new Date();

  // Get the time 15 minutes before
  const interval = {
    start: subMinutes(now, 15),
    end: now,
  };

  // See if it is within 15 min
  const isWithin15Minutes = isWithinInterval(parsedDate, interval);
  return isWithin15Minutes;
}

export function getTeamColors(
  team: NFLTeamNames,
  level: "primary" | "secondary",
  type: "background" | "text"
) {
  const teamStr = team.toLocaleLowerCase();
  const styleStr = `${
    type === "background" ? "bg" : "text"
  }-${teamStr}-${level}`;

  return styleStr;
}

export function getIsGameStartingWithin15Minutes(matchupTime: string) {
  const currTime = new Date();
  const currMatchupTime = new Date(matchupTime);

  const diff = differenceInMinutes(currMatchupTime, currTime);
  return diff < 15;
}
