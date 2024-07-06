import { Slot, Stack } from "expo-router";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { useDeviceContext } from "twrnc";
import { store } from "../store";
import { AuthProvider } from "../context/AuthContext";
import { DataProvider } from "../context/DataContext";
import Toast from "react-native-toast-message";
import tw from "@/tailwind";

export default function RootLayout() {
  useDeviceContext(tw, {
    // 1️⃣  opt OUT of listening to DEVICE color scheme events
    observeDeviceColorSchemeChanges: false,
    // 2️⃣  and supply an initial color scheme
    initialColorScheme: `device`, // 'light' | 'dark' | 'device'
  });

  return (
    <Provider store={store}>
      <AuthProvider>
        <DataProvider>
          <Slot />
          <Toast />
        </DataProvider>
      </AuthProvider>
    </Provider>
  );
}
