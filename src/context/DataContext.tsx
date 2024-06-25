import React, { ReactNode, useContext, useEffect, useState } from "react";
import { ActiveLeagues, UserType } from "../types/types";
import { useAuthContext } from "../utils";
import { useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import { userActions } from "../slices/user";
import { supabase } from "../supabase";
import { activeLeagueActions } from "../slices/activeLeague";

type DataContextType = {
  loading: boolean;
  // current_active_league?: string;
};

export const DataContext = React.createContext<DataContextType>(
  undefined as any
);

export function DataProvider(props: { children: ReactNode }) {
  const authCtx = useAuthContext();
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleInitialAppOpen = async (userId: string) => {
    setLoading(true);

    try {
      const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (!user) {
        setLoading(false);
        return;
      }
      const leagues = await supabase
        .from("league_users_season")
        .select("leagues(*), role")
        .eq("user_id", userId);

      const activeLeagues: ActiveLeagues[] = leagues.data
        ? leagues.data.map((l) => ({
            league_id: l.leagues?.id || "",
            league_name: l.leagues?.name || "",
            isCommissioner: l.role === "Commissioner",
            isOverUnderEnabled: !!l.leagues?.does_include_over_under,
            isPlayoffsEnabled: !!l.leagues?.does_include_playoffs,
          }))
        : [];

      // dispatch(
      //   userActions.setUser({ user: user, activeLeagues: activeLeagues })
      // );

      dispatch(
        activeLeagueActions.setActiveLeague({
          leagueID: activeLeagues[0]?.league_id || null,
        })
      );

      setLoading(false);
    } catch (ex) {
      setLoading(false);
      console.error(ex);
    }
  };
  useEffect(() => {
    if (authCtx.user && authCtx.user?.id !== user.user.id) {
      // handleInitialAppOpen(authCtx.user.id);
    }
  }, [authCtx.user?.id]);
  return (
    <DataContext.Provider value={{ loading: loading }}>
      {props.children}
    </DataContext.Provider>
  );
}

export const useDataContext = () => React.useContext(DataContext);
