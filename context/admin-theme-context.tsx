"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type AdminThemeConfig = {
  id: string
  name: string
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  textColor: string
  headerColor: string
  sidebarColor: string
  accentColor: string
  borderColor: string
  isCustom?: boolean
}

type AdminThemeContextType = {
  currentTheme: AdminThemeConfig
  setTheme: (theme: AdminThemeConfig) => void
  themes: AdminThemeConfig[]
  saveCustomTheme: (theme: AdminThemeConfig) => void
  previewTheme: AdminThemeConfig | null
  setPreviewTheme: (theme: AdminThemeConfig | null) => void
}

// Default admin themes
const defaultAdminThemes: AdminThemeConfig[] = [
  {
    id: "light",
    name: "Light",
    primaryColor: "#4f46e5",
    secondaryColor: "#f9fafb",
    backgroundColor: "#ffffff",
    textColor: "#111827",
    headerColor: "#ffffff",
    sidebarColor: "#f9fafb",
    accentColor: "#f97316",
    borderColor: "#e5e7eb",
  },
  {
    id: "dark",
    name: "Dark",
    primaryColor: "#8b5cf6",
    secondaryColor: "#1f2937",
    backgroundColor: "#111827",
    textColor: "#f9fafb",
    headerColor: "#111827",
    sidebarColor: "#1f2937",
    accentColor: "#ec4899",
    borderColor: "#374151",
  },
  {
    id: "blue",
    name: "Blue",
    primaryColor: "#3b82f6",
    secondaryColor: "#f0f9ff",
    backgroundColor: "#ffffff",
    textColor: "#1e3a8a",
    headerColor: "#1e40af",
    sidebarColor: "#eff6ff",
    accentColor: "#60a5fa",
    borderColor: "#dbeafe",
  },
]

const AdminThemeContext = createContext<AdminThemeContextType | undefined>(undefined)

export function AdminThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<AdminThemeConfig>(defaultAdminThemes[0])
  const [themes, setThemes] = useState<AdminThemeConfig[]>(defaultAdminThemes)
  const [previewTheme, setPreviewTheme] = useState<AdminThemeConfig | null>(null)

  // Load theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem("adminTheme")
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme)
        setCurrentTheme(parsedTheme)
      } catch (error) {
        console.error("Failed to parse admin theme from localStorage:", error)
      }
    }

    // Load custom themes
    const customThemes = localStorage.getItem("customAdminThemes")
    if (customThemes) {
      try {
        const parsedCustomThemes = JSON.parse(customThemes)
        setThemes([...defaultAdminThemes, ...parsedCustomThemes])
      } catch (error) {
        console.error("Failed to parse custom admin themes from localStorage:", error)
      }
    }
  }, [])

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("adminTheme", JSON.stringify(currentTheme))
  }, [currentTheme])

  const setTheme = (theme: AdminThemeConfig) => {
    setCurrentTheme(theme)
  }

  const saveCustomTheme = (theme: AdminThemeConfig) => {
    // Create a new theme with isCustom flag
    const newTheme = {
      ...theme,
      isCustom: true,
      id: theme.id || `custom-${Date.now()}`,
      name: theme.name || `Custom Theme ${themes.length - defaultAdminThemes.length + 1}`,
    }

    // Add to themes array
    const updatedThemes = [...themes.filter((t) => t.id !== newTheme.id), newTheme]
    setThemes(updatedThemes)

    // Save custom themes to localStorage
    const customThemes = updatedThemes.filter((t) => t.isCustom)
    localStorage.setItem("customAdminThemes", JSON.stringify(customThemes))

    // Set as current theme
    setCurrentTheme(newTheme)
    setPreviewTheme(null)
  }

  return (
    <AdminThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        themes,
        saveCustomTheme,
        previewTheme,
        setPreviewTheme,
      }}
    >
      {children}
    </AdminThemeContext.Provider>
  )
}

export function useAdminTheme() {
  const context = useContext(AdminThemeContext)
  if (context === undefined) {
    throw new Error("useAdminTheme must be used within an AdminThemeProvider")
  }
  return context
}
