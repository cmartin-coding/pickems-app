import { supabase } from "@/src/supabase";
import { Tables } from "@/src/types/supabaseTypes";
import { ActiveLeagues } from "@/src/types/types";

export async function joinLeague(joinLeagueData: {
  leaguePW: string;
  shareableId: number;
  user_id: string;
}) {
  const {
    data: league,
    count,
    error,
  } = await supabase
    .from("leagues")
    .select("*")
    .eq("shareable_id", joinLeagueData.shareableId)
    .eq("shareable_pw", joinLeagueData.leaguePW)
    .maybeSingle();
  if (error) {
    console.log(error, "Error getting league details");
  }
  if (count === 0 || !league) {
    return { data: null };
  }
  const { error: err } = await supabase.from("league_users_season").insert({
    league_id: league.id,
    role: "Member",
    season_id: "3c41a592-012a-4224-b137-830ea88eeb7e",
    user_id: joinLeagueData.user_id,
  });

  if (err) {
    console.error("Error adding user to league users seasons table");
  }
  const activeLeague: ActiveLeagues = {
    isCommissioner: true,
    league_id: league.id,
    league_name: league.name,
    isOverUnderEnabled: league.does_include_over_under,
    isPlayoffsEnabled: league.does_include_playoffs,
  };
  return { data: activeLeague };
}

export async function createLeague(league: {
  league: Tables<"leagues">;
  user_id: string;
}) {
  const { data, error: insertLeagueError } = await supabase
    .from("leagues")
    .insert(league.league)
    .select("*")
    .single();
  const { error: insertLeagueUsersSeasonError } = await supabase
    .from("league_users_season")
    .insert({
      league_id: league.league.id,
      role: "Commissioner",
      season_id: "3c41a592-012a-4224-b137-830ea88eeb7e",
      user_id: league.user_id,
    });
  if (insertLeagueError || insertLeagueUsersSeasonError) {
    console.log(insertLeagueError, insertLeagueUsersSeasonError);
    throw new Error("Error adding league");
  }

  const activeLeague: ActiveLeagues = {
    isCommissioner: true,
    league_id: league.league.id,
    league_name: league.league.name,
    isOverUnderEnabled: league.league.does_include_over_under,
    isPlayoffsEnabled: league.league.does_include_playoffs,
  };
  return { data: activeLeague };
}

export async function submitPicks(picks: Tables<"picks">[]) {
  const { data, error } = await supabase.from("picks").upsert(picks);
  if (error) {
    console.log("ERROR", error);
    throw new Error("Problem upserting picks");
  }

  return { data };
}
