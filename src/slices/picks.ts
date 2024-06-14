import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  ActiveLeagues,
  MatchupPicksType,
  User,
  UserType,
} from "../types/types";
import { userApi } from "../services/user";

const initialState: MatchupPicksType[] = [];
export const picksSlice = createSlice({
  name: "picks",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      userApi.endpoints.getUserPicksByLeague.matchFulfilled,
      (state, action: PayloadAction<MatchupPicksType[]>) => {
        return [...action.payload];
      }
    );
  },
});

export const sliceActions = picksSlice.actions;
