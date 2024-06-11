import { createApi } from "@reduxjs/toolkit/query/react";
import { supabase } from "../supabase";
import { Matchups, User } from "../types/types";
import uuid from "react-native-uuid";
import { Tables } from "../types/supabaseTypes";

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
  endpoints: (builder) => ({
    addUser: builder.mutation<User, User>({
      queryFn: async (param) => {
        try {
          const { error: errInsert } = await supabase.from("users").insert({
            id: param.id,
            email: param.email,
            name: param.name,
            favorite_team: param.favorite_team,
          });

          const { data, error: errGet } = await supabase
            .from("users")
            .select("*")
            .eq("id", param.id)
            .single();

          if (errGet || errInsert) {
            console.log("INSERT ERROR -->", errInsert, "GET ERROR -->", errGet);
            throw new Error();
          }

          return { data };
        } catch (ex: any) {
          // console.log("HERE", ex);
          throw new Error("Did not add user");
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
  }),
});

export const useGetUserQuery = userApi.endpoints.getUser.useQuery;
export const useAddUserMutation = userApi.endpoints.addUser.useMutation;
export const useGetMatchupsBySeasonQuery =
  userApi.endpoints.getMatchupsBySeasonAndWeek.useQuery;
export const useGetMatchupsForCurrentSeasonQuery =
  userApi.endpoints.getAllMatchupsForCurrentSeason.useQuery;
