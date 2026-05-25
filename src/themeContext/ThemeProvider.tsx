import { type ReactNode, useEffect } from "react";
import { ThemeContext, type ThemeKey } from "./ThemeContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../constants/localStoragesKeys";

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useLocalStorage(STORAGE_KEYS.THEME, "dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme as ThemeKey, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
