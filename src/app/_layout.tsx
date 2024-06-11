import { tw } from "@/tailwind";
import { Slot, Stack } from "expo-router";
import React from "react";
import { Provider } from "react-redux";
import { useDeviceContext } from "twrnc";
import { store } from "../store";
import { AuthProvider } from "../context/AuthContext";
import { DataProvider } from "../context/DataContext";

export default function RootLayout() {
  // useDeviceContext(tw);
  return (
    <Provider store={store}>
      <AuthProvider>
        <DataProvider>
          <Slot />
        </DataProvider>
      </AuthProvider>
    </Provider>
  );
}
