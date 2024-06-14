import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ActiveLeagues, User, UserType } from "../types/types";
import { userApi } from "../services/user";

const initialState: UserType = {
  activeLeagues: [],
  user: { email: "", favorite_team: "", id: "", name: "" },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      return { ...action.payload };
    },
  },
  extraReducers(builder) {
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
