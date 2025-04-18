"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAdminTheme, type AdminThemeConfig } from "@/context/admin-theme-context"
import { Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function AdminThemeSelector() {
  const { themes, currentTheme, setTheme } = useAdminTheme()
  const { toast } = useToast()
  const [selectedTheme, setSelectedTheme] = useState<AdminThemeConfig>(currentTheme)
  const [isApplying, setIsApplying] = useState(false)

  const handleSelectTheme = (theme: AdminThemeConfig) => {
    setSelectedTheme(theme)
  }

  const handleApplyTheme = () => {
    setIsApplying(true)

    // Simulate a delay for better UX
    setTimeout(() => {
      setTheme(selectedTheme)
      setIsApplying(false)

      toast({
        title: "Theme applied",
        description: `Your admin panel now uses the ${selectedTheme.name} theme.`,
      })
    }, 800)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {themes.map((theme) => (
          <Card
            key={theme.id}
            className={`cursor-pointer transition-all relative overflow-hidden ${
              selectedTheme.id === theme.id ? "ring-2 ring-primary" : "hover:shadow-md"
            }`}
            onClick={() => handleSelectTheme(theme)}
            style={{
              borderColor: theme.borderColor,
            }}
          >
            {selectedTheme.id === theme.id && (
              <div
                className="absolute top-2 right-2 rounded-full p-1 z-10"
                style={{ backgroundColor: theme.primaryColor }}
              >
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
            <CardContent className="p-4">
              <div className="flex flex-col space-y-3">
                <div
                  className="h-8 rounded-md"
                  style={{ backgroundColor: theme.headerColor, borderColor: theme.borderColor, borderWidth: 1 }}
                ></div>
                <div className="flex gap-2 h-24">
                  <div
                    className="w-1/4 rounded-md"
                    style={{ backgroundColor: theme.sidebarColor, borderColor: theme.borderColor, borderWidth: 1 }}
                  ></div>
                  <div
                    className="flex-1 rounded-md"
                    style={{ backgroundColor: theme.backgroundColor, borderColor: theme.borderColor, borderWidth: 1 }}
                  ></div>
                </div>
                <div className="flex gap-2">
                  <div
                    className="h-6 w-16 rounded-md flex items-center justify-center text-xs text-white"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    Primary
                  </div>
                  <div
                    className="h-6 w-16 rounded-md flex items-center justify-center text-xs"
                    style={{ backgroundColor: theme.accentColor, color: "#ffffff" }}
                  >
                    Accent
                  </div>
                </div>
                <h3 className="font-medium mt-2">{theme.name}</h3>
                <p className="text-xs text-muted-foreground">{theme.isCustom ? "Custom theme" : "Default theme"}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={() => setSelectedTheme(currentTheme)}
          disabled={selectedTheme.id === currentTheme.id}
        >
          Reset
        </Button>
        <Button onClick={handleApplyTheme} disabled={isApplying || selectedTheme.id === currentTheme.id}>
          {isApplying ? "Applying..." : "Apply Theme"}
        </Button>
      </div>
    </div>
  )
}
