"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeSelector } from "@/components/theme-selector";
import { DashboardLayout } from "@/components/dashboard-layout";

export default function ThemePage0() {
  const [activeTab, setActiveTab] = useState("themes");

  return (
    <DashboardLayout>
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent drop-shadow-sm">
              Theme Settings
            </h1>
            <p className="text-gray-400 mt-1">
              Customize your store's appearance with themes & colors
            </p>
          </div>
        </div>

        <Tabs
          defaultValue="themes"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="mb-8 flex gap-3 bg-white/50 backdrop-blur-sm border border-gray-200/40 p-2 rounded-xl shadow-sm">
            <TabsTrigger
              value="themes"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 
                   data-[state=active]:text-white data-[state=active]:shadow-lg 
                   transition-all rounded-lg px-4 py-2 text-sm font-medium text-gray-600 
                   hover:text-purple-600 hover:scale-105"
            >
              🌈 Themes
            </TabsTrigger>
            <TabsTrigger
              value="customize"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 
                   data-[state=active]:text-white data-[state=active]:shadow-lg 
                   transition-all rounded-lg px-4 py-2 text-sm font-medium text-gray-600 
                   hover:text-purple-600 hover:scale-105"
            >
              🎨 Customize Colors
            </TabsTrigger>
          </TabsList>

          {/* Themes Tab */}
          <TabsContent value="themes">
            <Card className="relative overflow-hidden bg-white/60 backdrop-blur-lg border border-purple-200/50 shadow-lg rounded-2xl transition-all hover:shadow-purple-200/50">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-transparent to-blue-100/20 pointer-events-none"></div>

              <CardHeader>
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Store Theme
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Choose a theme for your store. The selected theme will be
                  applied instantly to your storefront.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ThemeSelector />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customize Colors Tab */}
          <TabsContent value="customize">
            <Card className="relative overflow-hidden bg-white/60 backdrop-blur-lg border border-blue-200/50 shadow-lg rounded-2xl transition-all hover:shadow-blue-200/50">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-purple-100/20 pointer-events-none"></div>

              <CardHeader>
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Custom Theme
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Create a custom theme by selecting colors for your store.
                  These will override the default theme colors.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-lg bg-gray-50 text-gray-700 border border-dashed border-gray-300 text-sm">
                  🚧 Custom theme editor coming soon!
                  <p className="text-xs text-gray-500 mt-2">
                    For now, try one of our pre-designed themes in the Themes
                    tab.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
