// import {
//   UserCredential,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   updateProfile,
// } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "../../firebase";

import { User } from "@supabase/supabase-js";
import { AppState } from "react-native";
import { supabase } from "../supabase";
import { useAddUserMutation } from "../services/user";
interface AuthContextType {
  user: User | undefined;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string,
    name?: string
  ) => Promise<{
    user: User;
  }>;
}

export const AuthContext = createContext<AuthContextType>(null!);

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export function AuthProvider(props: { children: any }) {
  const [authState, setAuthState] = useState<
    | {
        user: User;
        loading: false;
      }
    | {
        user: undefined;
        loading: boolean;
      }
  >({
    user: undefined,
    loading: true,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const user = session?.user;
      if (user && user.id) {
        setAuthState({
          user,
          loading: false,
        });
      } else {
        setAuthState({ user: undefined, loading: false });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user;
      if (user && user.id) {
        setAuthState({
          user,
          loading: false,
        });
      } else {
        setAuthState({ user: undefined, loading: false });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  };

  const logout = async () => {
    setAuthState({ user: undefined, loading: false });
    await supabase.auth.signOut();
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    name?: string
  ) => {
    const result = await supabase.auth.signUp({
      email: email,
      password: password,
      options: { data: { display_name: name } },
    });

    return { user: result.data.user as User };
  };

  return (
    <AuthContext.Provider
      value={{
        loading: authState.loading,
        signIn: signIn,
        logout: logout,
        signUpWithEmail: signUpWithEmail,
        user: authState.user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
