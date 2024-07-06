import { CURRENT_SEASON_ID } from "@/src/constants/const";
import { supabase } from "@/src/supabase";
import { Tables } from "@/src/types/supabaseTypes";
import {
  ActiveLeagues,
  LeagueUsersAndStandings,
  MatchupPicksType,
  User,
} from "@/src/types/types";

export async function addUser(param: User) {
  const { data, error: errInsert } = await supabase
    .from("users")
    .insert({
      id: param.id,
      email: param.email,
      name: param.name,
      favorite_team: param.favorite_team,
    })
    .select("*")
    .single();
  if (data) {
    return { data };
  } else {
    throw new Error("No user inserted");
  }
}
export async function getUser(
  userId: string
): Promise<{ data: { user: User; activeLeagues: ActiveLeagues[] } }> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId);
  console.log(data, "User DATA");
  if (error) {
    throw new Error(error.message);
  }
  const { data: leagues, error: leagueError } = await supabase
    .from("league_users_season")
    .select("leagues(*), role")
    .eq("user_id", userId);
  console.log(leagues, "League DATA");
  const activeLeagues: ActiveLeagues[] = leagues
    ? leagues.map((l) => ({
        league_id: l.leagues?.id || "",
        league_name: l.leagues?.name || "",
        isCommissioner: l.role === "Commissioner",
        isOverUnderEnabled: !!l.leagues?.does_include_over_under,
        isPlayoffsEnabled: !!l.leagues?.does_include_playoffs,
      }))
    : [];

  if (data) {
    return { data: { user: data[0], activeLeagues: activeLeagues } };
  } else {
    throw new Error("Problem creating user");
  }
}

export async function getAllMatchupsForCurrentSeason() {
  const { data, error } = await supabase
    .from("nfl_matchups")
    .select(`*, home_team(*), away_team(*)`)
    .eq("season", "3c41a592-012a-4224-b137-830ea88eeb7e");
  if (data) {
    return { data };
  } else {
    return [] as any;
  }
}

export async function getMatchupsBySeasonAndWeek(params: {
  week: number;
  season: number;
}) {
  const { data, error } = await supabase
    .from("nfl_matchups")
    .select(`*, home_team(*), away_team(*)`)
    .eq("season", "3c41a592-012a-4224-b137-830ea88eeb7e")
    .eq("week", params.week);

  if (data) {
    return { data };
  } else {
    // @TODO - FIX THIS TYPESCRIPT ISSUE
    return [] as any;
  }
}

export async function getLeagueUsersAndStandings(leagueID: string) {
  const { count: total_matchups_completed } = await supabase
    .from("nfl_matchups")
    .select("*", { count: "exact" })
    .eq("isComplete", true);

  const { data: users, error } = await supabase.rpc(
    "get_league_users_and_pick_statistics",
    {
      input_league_id: leagueID,
      input_season_id: CURRENT_SEASON_ID,
    }
  );

  if (!users) {
    return { data: [] };
  }

  const leagueUsersAndStanding = [];
  for (let i = 0; i < users?.length; i++) {
    const overUnderAccuracy =
      users[i].total_over_under_selections_correct /
      (total_matchups_completed || 0);
    const teamSelectionAccuracy =
      users[i].total_team_selections_correct / (total_matchups_completed || 0);
    const overallAccuracy =
      (users[i].total_over_under_selections_correct +
        users[i].total_team_selections_correct) /
        ((total_matchups_completed || 0) * 2) || 0;

    const updUser = {
      ...users[i],
      totalCompleteMatchups: total_matchups_completed,
      overUnderAccuracy,
      teamSelectionAccuracy,
      overallAccuracy,
    };
    leagueUsersAndStanding.push(updUser);
  }

  return { data: leagueUsersAndStanding };
}
export async function getUserPicksByLeague(params: {
  userId: string;
  leagueId: string;
  week_num: number;
}): Promise<MatchupPicksType[]> {
  if (params.leagueId.length === 0) {
    //@ts-ignore
    return { data: [] };
  }
  const { data, error } = await supabase
    .from("nfl_matchups")
    .select("*, home_team(*), away_team(*), picks(*)")
    .eq("picks.user_id", params.userId)
    .eq("week", params.week_num)
    .eq("season", "3c41a592-012a-4224-b137-830ea88eeb7e")
    .eq("picks.league_id", params.leagueId);

  if (error) {
    throw new Error("Problem getting picks");
  }
  //@ts-ignore
  return { data };
}
export async function getLeaguePicks(params: {
  week_num: number;
  leagueId: string;
}) {
  if (params.leagueId.length === 0) {
    return { data: [] };
  }
  const { data, error } = await supabase
    .from("nfl_matchups")
    .select("*, home_team(*), away_team(*), picks(*)")
    .eq("week", params.week_num)
    .eq("season", "3c41a592-012a-4224-b137-830ea88eeb7e")
    .eq("picks.league_id", params.leagueId);

  if (error) {
    console.log(error);
    throw new Error("Problem getting picks");
  }

  if (!data) {
    return { data: [] };
  } else {
    return { data };
  }
}
