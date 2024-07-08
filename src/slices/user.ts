import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ActiveLeagues, User, UserType } from "../types/types";
import { userApi } from "../services/user";

const initialState: UserType = {
  activeLeagues: [],
  user: { email: "", favorite_team: "", id: "", name: "" },
  currentActiveLeague: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: () => {
      return initialState;
    },
    setUser: (state, action: PayloadAction<UserType>) => {
      return { ...action.payload };
    },
    updateSelectedLeague: (
      state,
      action: PayloadAction<{ activeLeagueID: string }>
    ) => {
      state.currentActiveLeague = action.payload.activeLeagueID;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      userApi.endpoints.getUser.matchFulfilled,
      (
        state,
        action: PayloadAction<{ user: User; activeLeagues: ActiveLeagues[] }>
      ) => {
        state.user = action.payload.user;
        state.activeLeagues = action.payload.activeLeagues;
        state.currentActiveLeague =
          action.payload.activeLeagues[0]?.league_id || null;
      }
    );
    builder.addMatcher(
      userApi.endpoints.addUser.matchFulfilled,
      (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      }
    );
    builder.addMatcher(
      userApi.endpoints.createLeague.matchFulfilled,
      (state, action: PayloadAction<ActiveLeagues>) => {
        state.activeLeagues.push(action.payload);
      }
    );
    builder.addMatcher(
      userApi.endpoints.joinLeague.matchFulfilled,
      (state, action: PayloadAction<ActiveLeagues | null>) => {
        if (action.payload) {
          state.activeLeagues.push(action.payload);
        }
      }
    );
  },
});

export const userActions = userSlice.actions;
