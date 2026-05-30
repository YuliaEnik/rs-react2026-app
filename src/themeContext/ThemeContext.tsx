import { createContext, useContext } from "react";

export type ThemeKey = "dark" | "light";

export type ThemeContextType = {
  theme: ThemeKey;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useAppTheme must be used within ThemeProvider");
  return context;
};
