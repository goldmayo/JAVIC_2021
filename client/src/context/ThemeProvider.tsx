import React, { useState, useLayoutEffect } from "react";

import { LIGHT_THEME, DARK_THEME } from "../theme/Theme";
import { DarkMode, ThemeContext } from "./ThemeContext";

const strToBoolean = () => {
  const str = window.localStorage.getItem("darkTheme");
  switch (str) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
};
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const LastTheme = strToBoolean();
  const [dark, setDark] = useState<DarkMode>(LastTheme);

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
    window.localStorage.setItem("darkTheme", JSON.stringify(!dark));
  };

  return <ThemeContext.Provider value={{ dark, toggleTheme }}>{children}</ThemeContext.Provider>;
};
