import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/user";
import { useSelector } from "react-redux";
import { userApi } from "./services/user";
import { activeLeagueSlice } from "./slices/activeLeague";

export const store = configureStore({
  reducer: {
    userApi: userApi.reducer,
    user: userSlice.reducer,
    activeLeague: activeLeagueSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export function useAppSelector<T>(fn: (state: RootState) => T) {
  return useSelector(fn);
}
