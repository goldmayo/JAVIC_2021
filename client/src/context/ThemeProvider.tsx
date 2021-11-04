import React, { useState, useLayoutEffect } from "react";

import { LIGHT_THEME, DARK_THEME } from "../theme/Theme";
import { DarkMode, ThemeContext } from "./ThemeContext";

// type Props = {
//   children?: React.ReactNode;
// };

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const PreferDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [dark, setDark] = useState<DarkMode>(PreferDarkTheme);

  useLayoutEffect(() => {
    applyTheme();
    return () => {
      console.log("change theme");
    };
  }, [dark]);

  const applyTheme = () => {
    let theme;
    if (dark) {
      theme = DARK_THEME;
    } else {
      theme = LIGHT_THEME;
    }
    const root = document.getElementsByTagName("html")[0];
    root.style.cssText = theme.join(";");
  };

  const toggleTheme = () => {
    const body = document.getElementsByTagName("body")[0];
    body.style.cssText = "transition: background .5s ease";
    setDark(!dark);
  };

  return <ThemeContext.Provider value={{ dark, toggleTheme }}>{children}</ThemeContext.Provider>;
};
