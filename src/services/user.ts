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
import {
  addUser,
  getAllMatchupsForCurrentSeason,
  getLeaguePicks,
  getLeagueUsersAndStandings,
  getLeagueUsersAndStandingsByWeek,
  getMatchupsBySeasonAndWeek,
  getUser,
  getUserPicksByLeague,
} from "./helpers/queries/helpers";
import {
  createLeague,
  joinLeague,
  submitPicks,
} from "./helpers/mutations/helpers";

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
      queryFn: addUser,
    }),
    getUser: builder.query<
      { user: User; activeLeagues: ActiveLeagues[] },
      string
    >({
      queryFn: getUser,
    }),
    getAllMatchupsForCurrentSeason: builder.query({
      queryFn: getAllMatchupsForCurrentSeason,
    }),
    getMatchupsBySeasonAndWeek: builder.query<
      Matchups,
      { week: number; season: number }
    >({
      queryFn: getMatchupsBySeasonAndWeek,
    }),
    getLeagueUsersAndStandings: builder.query<
      LeagueUsersAndStandings[],
      string
    >({
      queryFn: getLeagueUsersAndStandings,
    }),
    joinLeague: builder.mutation<
      ActiveLeagues | null,
      { leaguePW: string; shareableId: number; user_id: string }
    >({
      queryFn: joinLeague,
    }),
    createLeague: builder.mutation<
      ActiveLeagues,
      { league: Tables<"leagues">; user_id: string }
    >({
      queryFn: createLeague,
    }),
    getUserPicks: builder.query<
      MatchupPicksType[],
      { userId: string; leagueId: string; week_num: number }
    >({
      providesTags: ["Picks"],
      // @ts-ignore
      // TODO: Dont get why this error is occurring. It is matching what I want.
      queryFn: getUserPicksByLeague,
    }),
    getLeaguePicks: builder.query<
      MatchupPicksType[],
      { week_num: number; leagueId: string }
    >({
      queryFn: getLeaguePicks,
      providesTags: ["Picks"],
    }),
    submitPicks: builder.mutation<null, Tables<"picks">[]>({
      invalidatesTags: ["Picks"],
      queryFn: submitPicks,
    }),
    getLeagueStandingsByWeek: builder.query<
      LeagueUsersAndStandings[],
      { week_num: number; leagueId: string }
    >({
      queryFn: getLeagueUsersAndStandingsByWeek,
    }),
  }),
});

export const useGetUserQuery = userApi.endpoints.getUser.useQuery;
export const useGetMatchupsBySeasonQuery =
  userApi.endpoints.getMatchupsBySeasonAndWeek.useQuery;
export const useGetAllMatchups =
  userApi.endpoints.getAllMatchupsForCurrentSeason.useQuery;
export const useGetLeagueUsersAndStandings =
  userApi.endpoints.getLeagueUsersAndStandings.useQuery;
export const useGetLeagueUsersAndStandingsByWeek =
  userApi.endpoints.getLeagueStandingsByWeek.useQuery;
export const useGetAllLeaguePicks = userApi.endpoints.getLeaguePicks.useQuery;
export const useGetUserPicks = userApi.endpoints.getUserPicks.useQuery;

export const useAddUserMutation = userApi.endpoints.addUser.useMutation;
export const useCreateLeagueMutation =
  userApi.endpoints.createLeague.useMutation;
export const useSubmitPicksMutation = userApi.endpoints.submitPicks.useMutation;
export const useJoinLeagueMutation = userApi.endpoints.joinLeague.useMutation;
