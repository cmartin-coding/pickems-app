import tw from "@/tailwind";
import { ReactNode, createContext, useContext, useState } from "react";
import { RnColorScheme, useAppColorScheme } from "twrnc";

type ThemeType = { theme: RnColorScheme; toggleTheme: () => void };
export const ThemeContext = createContext<ThemeType>(undefined as any);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colorScheme, toggleColorScheme] = useAppColorScheme(tw);
  const [theme, setTheme] = useState(colorScheme);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    toggleColorScheme();
  };

  console.log(colorScheme, theme);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
export const useThemeContext = () => useContext(ThemeContext);
