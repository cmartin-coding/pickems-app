import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User, UserType } from "../types/types";
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
  },
});

export const userActions = userSlice.actions;
