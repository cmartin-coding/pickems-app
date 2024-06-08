export type User = {
  name: string;
  id: string;
  favorite_team: string;
  email: string;
};

export type ActiveLeagues = {
  league_id: string;
  league_name: string;
  isCommissioner: boolean;
};
export type UserType = {
  user: User;
  activeLeagues: ActiveLeagues[];
};
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
