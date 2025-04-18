"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type ThemeConfig = {
  id: string
  name: string
  primary: string
  secondary: string
  background: string
  text: string
  accent: string
}

type ThemeContextType = {
  currentTheme: ThemeConfig
  setTheme: (theme: ThemeConfig) => void
  themes: ThemeConfig[]
  saveCustomTheme: (theme: ThemeConfig) => void
  storePreviewTheme: ThemeConfig | null
  setStorePreviewTheme: (theme: ThemeConfig | null) => void
}

// Default themes
const defaultThemes: ThemeConfig[] = [
  {
    id: "light",
    name: "Light",
    primary: "#4f46e5",
    secondary: "#f9fafb",
    background: "#ffffff",
    text: "#111827",
    accent: "#f97316",
  },
  {
    id: "dark",
    name: "Dark",
    primary: "#8b5cf6",
    secondary: "#1f2937",
    background: "#111827",
    text: "#f9fafb",
    accent: "#ec4899",
  },
  {
    id: "blue",
    name: "Blue",
    primary: "#3b82f6",
    secondary: "#f0f9ff",
    background: "#ffffff",
    text: "#1e3a8a",
    accent: "#60a5fa",
  },
]

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(defaultThemes[0])
  const [themes, setThemes] = useState<ThemeConfig[]>(defaultThemes)
  const [storePreviewTheme, setStorePreviewTheme] = useState<ThemeConfig | null>(null)

  // Load theme from localStorage on initial render
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      try {
        setCurrentTheme(JSON.parse(savedTheme))
      } catch (error) {
        console.error("Failed to parse theme from localStorage:", error)
      }
    }

    // Load custom themes
    const customThemes = localStorage.getItem("customThemes")
    if (customThemes) {
      try {
        const parsedCustomThemes = JSON.parse(customThemes)
        setThemes([...defaultThemes, ...parsedCustomThemes])
      } catch (error) {
        console.error("Failed to parse custom themes from localStorage:", error)
      }
    }
  }, [])

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    localStorage.setItem("theme", JSON.stringify(currentTheme))
  }, [currentTheme])

  const setTheme = (theme: ThemeConfig) => {
    setCurrentTheme(theme)
  }

  const saveCustomTheme = (theme: ThemeConfig) => {
    const newTheme = {
      ...theme,
      id: `custom-${Date.now()}`,
      name: theme.name || `Custom Theme`,
    }

    const updatedThemes = [...themes, newTheme]
    setThemes(updatedThemes)

    // Only run on client side
    if (typeof window !== "undefined") {
      // Filter out default themes to only save custom ones
      const customThemesToSave = updatedThemes.filter((t) => !defaultThemes.some((dt) => dt.id === t.id))
      localStorage.setItem("customThemes", JSON.stringify(customThemesToSave))
    }

    setCurrentTheme(newTheme)
  }

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
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
