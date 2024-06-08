import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../types/types";

const initialState: UserType = {
  activeLeagues: [],
  user: { email: "", favorite_team: "", id: "", name: "" },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.actions;
