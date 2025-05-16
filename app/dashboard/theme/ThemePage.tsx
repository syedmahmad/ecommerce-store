"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
      <div className="container mx-auto py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Theme Settings</h1>
            <p className="text-muted-foreground">
              Customize your store's appearance
            </p>
          </div>
          {/* <div className="flex flex-wrap gap-2">
            <Link href={`/store/${storeName}`} target="_blank">
              <Button variant="outline" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                View Store
              </Button>
            </Link>
          </div> */}
        </div>

        <Tabs
          defaultValue="themes"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="mb-6">
            <TabsTrigger value="themes">Themes</TabsTrigger>
            <TabsTrigger value="customize">Customize Colors</TabsTrigger>
          </TabsList>

          <TabsContent value="themes">
            <Card>
              <CardHeader>
                <CardTitle>Store Theme</CardTitle>
                <CardDescription>
                  Choose a theme for your store. The selected theme will be
                  applied to your storefront.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ThemeSelector />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customize">
            <Card>
              <CardHeader>
                <CardTitle>Custom Theme</CardTitle>
                <CardDescription>
                  Create a custom theme by selecting colors for your store.
                  These settings will override the default theme colors.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Custom theme editor coming soon!</p>
                <p className="text-sm text-muted-foreground mt-2">
                  In the meantime, you can select from our pre-designed themes
                  in the Themes tab.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
