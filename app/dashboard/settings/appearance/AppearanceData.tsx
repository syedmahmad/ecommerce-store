"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminThemeSelector } from "@/components/admin-theme-selector";
import { ColorPicker } from "@/components/ui/color-picker";
import { AdminThemePreview } from "@/components/admin-theme-preview";
import { useAdminTheme } from "@/context/admin-theme-context";
import { useTheme } from "@/context/theme-context";
import { useToast } from "@/components/ui/use-toast";
import { Eye, Save, ExternalLink, RotateCcw } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import Link from "next/link";
import { StorePreview } from "@/components/store-preview";

export default function AppearancePage() {
  const { currentTheme, saveCustomTheme, previewTheme, setPreviewTheme } =
    useAdminTheme();
  const { currentTheme: storeTheme, storePreviewTheme } = useTheme();
  const { toast } = useToast();

  const [customTheme, setCustomTheme] = useState({ ...currentTheme });
  const [themeName, setThemeName] = useState(currentTheme.name);
  const [activeTab, setActiveTab] = useState("admin");
  const [previewMode, setPreviewMode] = useState<"admin" | "store" | null>(
    null
  );

  // Reset custom theme when current theme changes
  useEffect(() => {
    setCustomTheme({ ...currentTheme });
    setThemeName(
      currentTheme.isCustom ? currentTheme.name : `Custom ${currentTheme.name}`
    );
  }, [currentTheme]);

  // Update a specific color in the custom theme
  const updateThemeColor = (key: keyof typeof customTheme, value: string) => {
    setCustomTheme((prev) => ({ ...prev, [key]: value }));
  };

  // Preview the custom theme
  const handlePreview = () => {
    setPreviewTheme({ ...customTheme, name: themeName });
    setPreviewMode("admin");

    toast({
      title: "Preview mode activated",
      description: "You are now previewing your custom admin theme.",
    });
  };

  // Save the custom theme
  const handleSave = () => {
    saveCustomTheme({ ...customTheme, name: themeName });
    setPreviewMode(null);

    toast({
      title: "Theme saved",
      description: "Your custom admin theme has been saved and applied.",
    });
  };

  // Cancel preview
  const handleCancelPreview = () => {
    setPreviewTheme(null);
    setPreviewMode(null);

    toast({
      title: "Preview mode deactivated",
      description: "Your admin panel has returned to its previous theme.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Appearance Settings</h1>
            <p className="text-muted-foreground">
              Customize your admin panel and store appearance
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {previewMode && (
              <Button variant="outline" onClick={handleCancelPreview}>
                Cancel Preview
              </Button>
            )}
            {previewMode === "admin" && (
              <Link href="/store/mystore" target="_blank">
                <Button variant="outline" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Preview Store
                </Button>
              </Link>
            )}
          </div>
        </div>

        <Tabs
          defaultValue="admin"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="mb-6">
            <TabsTrigger value="admin">Admin Panel</TabsTrigger>
            {/* <TabsTrigger value="store">Store Frontend</TabsTrigger> */}
          </TabsList>

          <TabsContent value="admin">
            <Tabs defaultValue="themes">
              <TabsList className="mb-6">
                <TabsTrigger value="themes">Themes</TabsTrigger>
                <TabsTrigger value="customize">Customize Colors</TabsTrigger>
              </TabsList>

              <TabsContent value="themes">
                <Card>
                  <CardHeader>
                    <CardTitle>Admin Panel Theme</CardTitle>
                    <CardDescription>
                      Choose a theme for your admin panel. The selected theme
                      will be applied to your dashboard.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AdminThemeSelector />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="customize">
                <div className="grid gap-6 lg:grid-cols-5">
                  <div className="lg:col-span-3 space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Customize Admin Theme Colors</CardTitle>
                        <CardDescription>
                          Personalize the colors of your admin panel. These
                          settings will override the default theme colors.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <Label htmlFor="theme-name">Theme Name</Label>
                            <Input
                              id="theme-name"
                              value={themeName}
                              onChange={(e) => setThemeName(e.target.value)}
                              className="mt-1"
                            />
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2">
                            <ColorPicker
                              label="Primary Color (Buttons, Accents)"
                              color={customTheme.primaryColor}
                              onChange={(color) =>
                                updateThemeColor("primaryColor", color)
                              }
                            />

                            <ColorPicker
                              label="Secondary Color"
                              color={customTheme.secondaryColor}
                              onChange={(color) =>
                                updateThemeColor("secondaryColor", color)
                              }
                            />

                            <ColorPicker
                              label="Background Color"
                              color={customTheme.backgroundColor}
                              onChange={(color) =>
                                updateThemeColor("backgroundColor", color)
                              }
                            />

                            <ColorPicker
                              label="Text Color"
                              color={customTheme.textColor}
                              onChange={(color) =>
                                updateThemeColor("textColor", color)
                              }
                            />

                            <ColorPicker
                              label="Header Color"
                              color={customTheme.headerColor}
                              onChange={(color) =>
                                updateThemeColor("headerColor", color)
                              }
                            />

                            <ColorPicker
                              label="Sidebar Color"
                              color={customTheme.sidebarColor}
                              onChange={(color) =>
                                updateThemeColor("sidebarColor", color)
                              }
                            />

                            <ColorPicker
                              label="Accent Color"
                              color={customTheme.accentColor}
                              onChange={(color) =>
                                updateThemeColor("accentColor", color)
                              }
                            />

                            <ColorPicker
                              label="Border Color"
                              color={customTheme.borderColor}
                              onChange={(color) =>
                                updateThemeColor("borderColor", color)
                              }
                            />
                          </div>

                          <div className="flex flex-wrap gap-3 pt-4">
                            <Button
                              onClick={handlePreview}
                              className="flex items-center gap-2"
                            >
                              <Eye className="h-4 w-4" />
                              Preview Theme
                            </Button>
                            <Button
                              onClick={handleSave}
                              variant="default"
                              className="flex items-center gap-2"
                            >
                              <Save className="h-4 w-4" />
                              Save Theme
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setCustomTheme({ ...currentTheme });
                                setThemeName(currentTheme.name);
                              }}
                              className="flex items-center gap-2"
                            >
                              <RotateCcw className="h-4 w-4" />
                              Reset Changes
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Theme Preview</CardTitle>
                        <CardDescription>
                          See how your theme will look on your admin panel.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <AdminThemePreview theme={customTheme} />

                        <div className="mt-6 text-center">
                          <p className="text-sm text-muted-foreground mb-3">
                            This is a preview of how your admin theme will look.
                            Click "Preview Theme" to see it applied to your
                            admin panel.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="store">
            <Card>
              <CardHeader>
                <CardTitle>Store Theme Settings</CardTitle>
                <CardDescription>
                  Manage your store's appearance. These settings affect how your
                  customers see your store.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 lg:grid-cols-5">
                  <div className="lg:col-span-3">
                    <div className="space-y-4">
                      <p>
                        You can customize your store's appearance from the Theme
                        section in the dashboard.
                      </p>
                      <Link href="/dashboard/theme">
                        <Button>Go to Store Theme Settings</Button>
                      </Link>
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Store Preview</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <StorePreview theme={storePreviewTheme || storeTheme} />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
