"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export type ThemeConfig = {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
};

type ThemeContextType = {
  currentTheme: ThemeConfig;
  setTheme: (theme: ThemeConfig) => void;
  themes: ThemeConfig[];
  saveCustomTheme: (theme: ThemeConfig) => void;
  storePreviewTheme: ThemeConfig | null;
  setStorePreviewTheme: (theme: ThemeConfig | null) => void;
};

// Default themes
// Default themes
const defaultThemes: ThemeConfig[] = [
  {
    id: "light",
    name: "Light",
    primary: "#4f46e5", // Indigo-600
    secondary: "#f9fafb", // Gray-50
    background: "#ffffff", // White
    text: "#111827", // Gray-900
    accent: "#f97316", // Orange-500
  },
  {
    id: "dark",
    name: "Dark",
    primary: "#8b5cf6", // Violet-500
    secondary: "#1e1e2e", // Dark slate blue
    background: "#121212", // True dark
    text: "#e2e8f0", // Light gray
    accent: "#ec4899", // Pink-500
  },
  {
    id: "blue",
    name: "Ocean",
    primary: "#3b82f6", // Blue-500
    secondary: "#e0f2fe", // Light blue-50
    background: "#ffffff", // White
    text: "#1e3a8a", // Dark blue-900
    accent: "#06b6d4", // Cyan-500
  },
  {
    id: "midnight",
    name: "Midnight",
    primary: "#6366f1", // Indigo-500
    secondary: "#1e293b", // Slate-800
    background: "#0f172a", // Slate-900
    text: "#e2e8f0", // Light gray
    accent: "#38bdf8", // Sky-400
  },
  {
    id: "emerald",
    name: "Emerald",
    primary: "#10b981", // Emerald-500
    secondary: "#ecfdf5", // Emerald-50
    background: "#ffffff", // White
    text: "#064e3b", // Emerald-900
    accent: "#f59e0b", // Amber-500
  },
  {
    id: "sunset",
    name: "Sunset",
    primary: "#f97316", // Orange-500
    secondary: "#ffedd5", // Orange-50
    background: "#ffffff", // White
    text: "#9a3412", // Orange-800
    accent: "#ef4444", // Red-500
  },
  {
    id: "luxury",
    name: "Luxury",
    primary: "#a855f7", // Purple-500
    secondary: "#1e1e2e", // Dark slate
    background: "#0f0f15", // Very dark
    text: "#f5f3ff", // Light purple-50
    accent: "#f59e0b", // Amber-500
  },
  {
    id: "minimal",
    name: "Minimal",
    primary: "#000000", // Black
    secondary: "#f5f5f5", // Light gray
    background: "#ffffff", // White
    text: "#262626", // Dark gray
    accent: "#737373", // Neutral-500
  },
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(
    defaultThemes[0]
  );
  const [themes, setThemes] = useState<ThemeConfig[]>(defaultThemes);
  const [storePreviewTheme, setStorePreviewTheme] =
    useState<ThemeConfig | null>(null);

  // Load theme from localStorage on initial render
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      try {
        setCurrentTheme(JSON.parse(savedTheme));
      } catch (error) {
        console.error("Failed to parse theme from localStorage:", error);
      }
    }

    // Load custom themes
    const customThemes = localStorage.getItem("customThemes");
    if (customThemes) {
      try {
        const parsedCustomThemes = JSON.parse(customThemes);
        setThemes([...defaultThemes, ...parsedCustomThemes]);
      } catch (error) {
        console.error(
          "Failed to parse custom themes from localStorage:",
          error
        );
      }
    }
  }, []);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    localStorage.setItem("theme", JSON.stringify(currentTheme));
  }, [currentTheme]);

  const setTheme = (theme: ThemeConfig) => {
    setCurrentTheme(theme);
  };

  const saveCustomTheme = (theme: ThemeConfig) => {
    const newTheme = {
      ...theme,
      id: `custom-${Date.now()}`,
      name: theme.name || `Custom Theme`,
    };

    const updatedThemes = [...themes, newTheme];
    setThemes(updatedThemes);

    // Only run on client side
    if (typeof window !== "undefined") {
      // Filter out default themes to only save custom ones
      const customThemesToSave = updatedThemes.filter(
        (t) => !defaultThemes.some((dt) => dt.id === t.id)
      );
      localStorage.setItem("customThemes", JSON.stringify(customThemesToSave));
    }

    setCurrentTheme(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        themes,
        saveCustomTheme,
        storePreviewTheme,
        setStorePreviewTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
