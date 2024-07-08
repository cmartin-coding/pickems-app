import tw from "@/tailwind";
import React, { ReactNode, useEffect, useState } from "react";
import { RnColorScheme } from "twrnc";
import { useAppColorScheme } from "twrnc/dist/esm/hooks";

type ColorThemeContextType = {
  currentTheme: RnColorScheme;
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
  isDarkMode: boolean;
};
export const ColorThemeContext = React.createContext<ColorThemeContextType>(
  undefined as any
);

export function ColorThemeProvider({ children }: { children: ReactNode }) {
  const [colorScheme, toggleColorScheme, setColorScheme] =
    useAppColorScheme(tw);

  const [currentTheme, setCurrentTheme] = useState(colorScheme);

  const setTheme = (theme: "dark" | "light") => {
    setColorScheme(theme);
    setCurrentTheme(theme);
  };

  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev === "light" ? "dark" : "light"));
    toggleColorScheme();
  };

  useEffect(() => {
    console.log("here");
  }, [colorScheme]);

  return (
    <ColorThemeContext.Provider
      value={{
        currentTheme: currentTheme,
        setTheme,
        toggleTheme,
        isDark: currentTheme === "dark",
      }}
    >
      {children}
    </ColorThemeContext.Provider>
  );
}

export const useColorThemeContext = () => React.useContext(ColorThemeContext);
