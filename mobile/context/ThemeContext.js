import React, { createContext, useContext, useState } from "react";
import { THEMES } from "../constants/colors";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("purple");

  const switchTheme = (themeName) => {
    setTheme(themeName);
  };

  return (
    <ThemeContext.Provider value={{ COLORS: THEMES[theme], theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);