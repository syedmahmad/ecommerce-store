"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme, type ThemeConfig } from "@/context/theme-context"
import { Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function ThemeSelector() {
  const { themes, currentTheme, setTheme } = useTheme()
  const { toast } = useToast()
  const [selectedTheme, setSelectedTheme] = useState<ThemeConfig>(currentTheme)
  const [isApplying, setIsApplying] = useState(false)

  const handleSelectTheme = (theme: ThemeConfig) => {
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
        description: `Your store now uses the ${selectedTheme.name} theme.`,
      })
    }, 800)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {themes.map((theme) => (
          <Card
            key={theme.id}
            className={`cursor-pointer transition-all relative overflow-hidden ${
              selectedTheme.id === theme.id ? "ring-2 ring-primary" : "hover:shadow-md"
            }`}
            onClick={() => handleSelectTheme(theme)}
          >
            {selectedTheme.id === theme.id && (
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1 z-10">
                <Check className="h-4 w-4" />
              </div>
            )}
            <CardContent className="p-0">
              <div className="relative h-40 w-full">
                <div className="absolute inset-0 opacity-10" style={{ backgroundColor: theme.primary }} />
                <div className="p-4 h-full flex flex-col">
                  <div className="h-6 w-full rounded-md mb-2" style={{ backgroundColor: theme.primary }}></div>
                  <div className="flex-1 rounded-md" style={{ backgroundColor: theme.secondary }}></div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium">{theme.name}</h3>
                <div className="flex mt-3 gap-2">
                  {[theme.primary, theme.accent, theme.background, theme.text].map((color, i) => (
                    <div key={i} className="h-5 w-5 rounded-full border" style={{ backgroundColor: color }} />
                  ))}
                </div>
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
