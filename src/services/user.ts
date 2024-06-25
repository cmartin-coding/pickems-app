import { createApi } from "@reduxjs/toolkit/query/react";
import { supabase } from "../supabase";
import {
  ActiveLeagues,
  LeagueUsersAndStandings,
  MatchupPicksType,
  Matchups,
  User,
} from "../types/types";
import uuid from "react-native-uuid";
import { Tables } from "../types/supabaseTypes";
import { CURRENT_SEASON_ID } from "../constants/const";

// supabaseBaseQuery.js

//@ts-ignore
const supabaseBaseQuery = async ({ url, method, body }) => {
  let result;

  switch (method) {
    case "GET":
      result = await supabase.from(url).select();
      break;
    case "POST":
      result = await supabase.from(url).insert(body);
      break;
    case "PUT":
      result = await supabase.from(url).update(body).match({ id: body.id });
      break;
    case "DELETE":
      result = await supabase.from(url).delete().match({ id: body.id });
      break;
    default:
      throw new Error(`Unsupported method: ${method}`);
  }

  if (result.error) {
    throw new Error(result.error.message);
  }

  return { data: result.data };
};

export default supabaseBaseQuery;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: supabaseBaseQuery,
  tagTypes: ["Picks"],
  endpoints: (builder) => ({
    addUser: builder.mutation<User, User>({
      queryFn: async (param) => {
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
      },
    }),
    getUser: builder.query<
      { id: string; name: string; email: string; favorite_team: string | null },
      string
    >({
      queryFn: async (userId) => {
        try {
          const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", userId)
            .single();
          if (error) {
            console.log(error);
            throw new Error(error.message);
          }

          return { data };
        } catch (error: any) {
          //   throw new Error("TEST");
          throw new Error(`Failed to fetch user: ${error.message}`);
        }
      },
    }),
    getAllMatchupsForCurrentSeason: builder.query({
      queryFn: async (params) => {
        try {
          const { data, error } = await supabase
            .from("nfl_matchups")
            .select(`*, home_team(*), away_team(*)`)
            .eq("season", "3c41a592-012a-4224-b137-830ea88eeb7e");
          if (data) {
            return { data };
          } else {
            // @TODO - FIX THIS TYPESCRIPT ISSUE
            return [] as any;
          }
        } catch (ex) {
          throw new Error("Could not get matchups");
        }
      },
    }),
    getMatchupsBySeasonAndWeek: builder.query<
      Matchups,
      { week: number; season: number }
    >({
      queryFn: async (params) => {
        try {
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
        } catch (ex) {
          console.log(ex);
          throw new Error("Could not get matchups");
        }
      },
    }),
    getLeagueUsersAndStandings: builder.query<
      LeagueUsersAndStandings[],
      { leagueID: string }
    >({
      queryFn: async ({ leagueID }) => {
        try {
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

          if (error) {
            console.error("Problem getting standings data", error);
          }

          if (!users || !total_matchups_completed) {
            return { data: [] };
          }
          const leagueUsersAndStanding = [];
          for (let i = 0; i < users?.length; i++) {
            const overUnderAccuracy =
              users[i].total_over_under_selections_correct /
                total_matchups_completed || 0;
            const teamSelectionAccuracy =
              users[i].total_team_selections_correct /
                total_matchups_completed || 0;
            const overallAccuracy =
              (users[i].total_over_under_selections_correct +
                users[i].total_team_selections_correct) /
                (total_matchups_completed * 2) || 0;

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
        } catch (ex) {
          throw new Error("Problem getting users");
        }
      },
    }),
    joinLeague: builder.mutation<
      ActiveLeagues | null,
      { leaguePW: string; shareableId: number; user_id: string }
    >({
      queryFn: async (joinLeagueData) => {
        try {
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
          const { error: err } = await supabase
            .from("league_users_season")
            .insert({
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
        } catch (ex) {
          console.error(ex);
          throw new Error("Problem joining league");
        }
      },
    }),
    createLeague: builder.mutation<
      ActiveLeagues,
      { league: Tables<"leagues">; user_id: string }
    >({
      queryFn: async (league) => {
        try {
          const { error } = await supabase
            .from("leagues")
            .insert(league.league);
          const { error: err } = await supabase
            .from("league_users_season")
            .insert({
              league_id: league.league.id,
              role: "Commissioner",
              season_id: "3c41a592-012a-4224-b137-830ea88eeb7e",
              user_id: league.user_id,
            });
          if (error || err) {
            console.log(error, err);
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
        } catch (ex) {
          console.log(ex);
          throw new Error("Error creating league");
        }
      },
    }),
    getLeaguePicks: builder.query<
      MatchupPicksType[],
      { week_num: number; leagueId: string }
    >({
      //@ts-ignore
      queryFn: async (params) => {
        try {
          const { data, error } = await supabase
            .from("nfl_matchups")
            .select("*, home_team(*), away_team(*), picks(*)")
            .eq("week", params.week_num)
            .eq("season", "3c41a592-012a-4224-b137-830ea88eeb7e")
            .eq("picks.league_id", params.leagueId);

          if (error) {
            throw new Error("Problem getting picks");
          }

          return { data };
        } catch (ex) {
          console.error(ex);
          throw new Error("Problem grabbing picks");
        }
      },
      providesTags: ["Picks"],
    }),
    getUserPicksByLeague: builder.query<
      MatchupPicksType[],
      { userId: string; leagueId: string; week_num: number }
    >({
      providesTags: ["Picks"],
      // @ts-ignore
      // TODO: Dont get why this error is occurring. It is matching what I want.
      queryFn: async (params) => {
        try {
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

          return { data };
        } catch (ex) {
          console.error(ex);
          throw new Error("Problem grabbing picks");
        }
      },
    }),
    submitPicks: builder.mutation<null, Tables<"picks">[]>({
      invalidatesTags: ["Picks"],
      queryFn: async (picks) => {
        try {
          const { data, error } = await supabase.from("picks").upsert(picks);
          if (error) {
            console.log("ERROR", error);
            throw new Error("Problem upserting picks");
          }
          console.log("Picks data upserted", picks);
          return { data };
        } catch (ex) {
          console.error(ex);
          throw new Error("Problem adding picks");
        }
      },
    }),
  }),
});

export const useGetUserQuery = userApi.endpoints.getUser.useQuery;
export const useGetMatchupsBySeasonQuery =
  userApi.endpoints.getMatchupsBySeasonAndWeek.useQuery;
export const useGetMatchupsForCurrentSeasonQuery =
  userApi.endpoints.getAllMatchupsForCurrentSeason.useQuery;
export const useGetPicksByLeagueIdAndUserAndSeason =
  userApi.endpoints.getUserPicksByLeague.useQuery;
export const useGetLeagueUsersAndStandings =
  userApi.endpoints.getLeagueUsersAndStandings.useQuery;
export const useGetAllLeaguePicks = userApi.endpoints.getLeaguePicks.useQuery;

export const useAddUserMutation = userApi.endpoints.addUser.useMutation;
export const useCreateLeagueMutation =
  userApi.endpoints.createLeague.useMutation;
export const useSubmitPicksMutation = userApi.endpoints.submitPicks.useMutation;
export const useJoinLeagueMutation = userApi.endpoints.joinLeague.useMutation;
