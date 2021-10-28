import React from "react";

export type DarkMode = false | true;
type ThemeState = { dark: DarkMode; toggleTheme: () => void };

export const ThemeContext = React.createContext<ThemeState>({
  dark: false,
  toggleTheme: () => {},
});
