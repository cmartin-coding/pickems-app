import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  ActiveLeagues,
  MatchupPicksType,
  User,
  UserType,
} from "../types/types";
import { userApi } from "../services/user";

const initialState: { selectedLeagueID: string | null } = {
  selectedLeagueID: "",
};
export const activeLeagueSlice = createSlice({
  name: "picks",
  initialState,
  reducers: {
    setActiveLeague: (
      state,
      action: PayloadAction<{ leagueID: string | null }>
    ) => {
      state.selectedLeagueID = action.payload.leagueID;
    },
  },
});

export const activeLeagueActions = activeLeagueSlice.actions;
