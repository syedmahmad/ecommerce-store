"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme, type ThemeConfig } from "@/context/theme-context";
import { Check } from "lucide-react";
import { GET, POST } from "@/app/utils/Axios";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

export function ThemeSelector() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const lcData = localStorage.getItem("user");
      const user = lcData && JSON.parse(lcData);
      if (user?.id) {
        setUserId(user.id);
      }
    }
  }, [userId]);

  const getStoreThemeInfo = useQuery({
    queryKey: ["store-theme-data"],
    queryFn: async () => {
      const endpoint = `store-theme/${userId}`;
      return await GET(endpoint);
    },
    enabled: !!userId,
  });

  const themeData = getStoreThemeInfo?.data?.data;

  const { themes, currentTheme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<ThemeConfig>(themeData);
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    if (themeData) {
      setSelectedTheme({
        id: themeData.themeId,
        name: themeData.name,
        primary: themeData.primary,
        secondary: themeData.secondary,
        background: themeData.background,
        text: themeData.text,
        accent: themeData.accent,
      });
    }
  }, [themeData]);

  const handleSelectTheme = (theme: ThemeConfig) => {
    setSelectedTheme(theme);
  };

  const handleApplyTheme = async () => {
    setIsApplying(true);
    try {
      const lcData = localStorage.getItem("user");
      const parseLCData = lcData && JSON.parse(lcData);
      const userId = parseLCData?.id;

      const payload = {
        name: selectedTheme.name,
        primary: selectedTheme.primary,
        secondary: selectedTheme.secondary,
        background: selectedTheme.background,
        text: selectedTheme.text,
        accent: selectedTheme.accent,
        themeId: selectedTheme.id,
      };

      const response = await POST(`/store-theme/${userId}`, payload);
      if (response?.status === 201) {
        setTheme(selectedTheme);
        toast.success(`Theme ${selectedTheme.name} applied successfully! `);
      }
    } catch (error: any) {
      setIsApplying(false);
      console.error("Failed to apply theme", error);
      toast.error("Failed to apply theme. Please try again.");
      if (error?.response?.data?.message === "Unauthorized") {
        toast.warn(
          `${error?.response?.data?.message} access. Try reloading the page or logout then login back.`,
          {
            autoClose: false,
          }
        );
      }
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {themes.map((theme) => (
          <Card
            key={theme.id}
            className={`cursor-pointer transition-all relative overflow-hidden ${
              selectedTheme?.id === theme?.id
                ? "ring-2 ring-primary"
                : "hover:shadow-md"
            }`}
            onClick={() => handleSelectTheme(theme)}
          >
            {selectedTheme?.id === theme?.id && (
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1 z-10">
                <Check className="h-4 w-4" />
              </div>
            )}
            <CardContent className="p-0">
              <div className="relative h-40 w-full">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{ backgroundColor: theme.primary }}
                />
                <div className="p-4 h-full flex flex-col">
                  <div
                    className="h-6 w-full rounded-md mb-2"
                    style={{ backgroundColor: theme.primary }}
                  ></div>
                  <div
                    className="flex-1 rounded-md"
                    style={{ backgroundColor: theme.secondary }}
                  ></div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium">{theme.name}</h3>
                <div className="flex mt-3 gap-2">
                  {[
                    theme.primary,
                    theme.accent,
                    theme.background,
                    theme.text,
                  ].map((color, i) => (
                    <div
                      key={i}
                      className="h-5 w-5 rounded-full border"
                      style={{ backgroundColor: color }}
                    />
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
          disabled={selectedTheme?.id === currentTheme.id}
        >
          Reset
        </Button>
        <Button
          onClick={handleApplyTheme}
          disabled={isApplying || selectedTheme?.id === currentTheme.id}
        >
          {isApplying ? "Applying..." : "Apply Theme"}
        </Button>
      </div>
    </div>
  );
}
