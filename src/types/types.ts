import { Json, Tables } from "./supabaseTypes";

export type User = {
  name: string;
  id: string;
  favorite_team: string | null;
  email: string;
};

export type ActiveLeagues = {
  league_id: string;
  league_name: string;
  isCommissioner: boolean;
  isOverUnderEnabled: boolean;
  isPlayoffsEnabled: boolean;
};

export type MatchupPicksType = {
  away_team: Tables<"nfl_teams">;
  home_team: Tables<"nfl_teams">;
  id: string;
  isComplete: boolean;
  odds: Odds;
  picks: Tables<"picks">[];
  score: Score;
  season: string;
  time: string;
  week: number;
  winner: number | null;
  over_under_number: number;
  over_under_winner: "Over" | "Under";
};
export type UserType = {
  user: User;
  activeLeagues: ActiveLeagues[];
};
export type LeagueUsersAndStandings = {
  overUnderAccuracy: number;
  teamSelectionAccuracy: number;
  overallAccuracy: number;
  user_name: string;
  user_id: string;
  favorite_team: string;
  total_team_selections_correct: number;
  total_over_under_selections_correct: number;
  totalCompleteMatchups: number;
};
export type Score = { home: number; away: number };
export type Odds = { over: number; under: number };
export type Matchups = {
  away_team: Tables<"nfl_teams">;
  home_team: Tables<"nfl_teams">;
  id: string;
  isComplete: boolean;
  odds: Odds;
  score: Score;
  season: string;
  time: string | null;
  week: number;
  winner: number | null;
}[];
export type NFLTeamNames =
  | "Cardinals"
  | "Falcons"
  | "Ravens"
  | "Bills"
  | "Panthers"
  | "Bears"
  | "Bengals"
  | "Browns"
  | "Cowboys"
  | "Broncos"
  | "Lions"
  | "Packers"
  | "Texans"
  | "Colts"
  | "Jaguars"
  | "Chiefs"
  | "Raiders"
  | "Chargers"
  | "Rams"
  | "Dolphins"
  | "Vikings"
  | "Patriots"
  | "Saints"
  | "Giants"
  | "Jets"
  | "Eagles"
  | "Steelers"
  | "49ers"
  | "Seahawks"
  | "Buccaneers"
  | "Titans"
  | "Commanders";
