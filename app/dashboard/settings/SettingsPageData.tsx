"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Palette,
  User,
  CreditCard,
  Store,
  Bell,
  Shield,
  Globe,
} from "lucide-react";

export default function SettingsPage() {
  const settingsCategories = [
    {
      id: "appearance",
      title: "Appearance",
      description: "Customize the look and feel of your admin panel",
      icon: Palette,
      href: "/dashboard/settings/appearance",
    },
    {
      id: "account",
      title: "Account",
      description: "Manage your account settings and preferences",
      icon: User,
      href: "/dashboard/settings/account",
    },
    {
      id: "billing",
      title: "Billing",
      description: "Manage your subscription and payment methods",
      icon: CreditCard,
      href: "/dashboard/settings/billing",
    },
    {
      id: "store",
      title: "Store Settings",
      description: "Configure your store details and policies",
      icon: Store,
      href: "/dashboard/settings/store",
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "Configure how you receive notifications",
      icon: Bell,
      href: "/dashboard/settings/notifications",
    },
    {
      id: "security",
      title: "Security",
      description: "Manage your security preferences",
      icon: Shield,
      href: "/dashboard/settings/security",
    },
    {
      id: "domains",
      title: "Domains",
      description: "Manage your custom domains",
      icon: Globe,
      href: "/dashboard/settings/domains",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent drop-shadow-sm">
            Settings
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your account and store settings
          </p>
        </div>

        {/* Settings Categories Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {settingsCategories.map((category) => (
            <Link key={category.id} href={category.href}>
              <Card
                className="group relative h-full overflow-hidden rounded-xl border border-gray-200/40 
                     bg-white/60 backdrop-blur-lg shadow-md transition-all duration-300
                     hover:shadow-xl hover:scale-[1.02] hover:border-purple-400/50"
              >
                {/* Glow overlay on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-purple-50 via-transparent to-blue-50 pointer-events-none"></div>

                <CardHeader className="flex flex-row items-center gap-4 relative z-10">
                  {/* Icon bubble */}
                  <div className="rounded-full p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 group-hover:from-purple-500/20 group-hover:to-blue-500/20 transition">
                    <category.icon className="h-6 w-6 text-purple-600 group-hover:text-blue-600 transition" />
                  </div>
                  <div>
                    <CardTitle className="font-semibold text-gray-800 group-hover:text-purple-600 transition">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-gray-500">
                      {category.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="flex justify-end relative z-10">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                  >
                    Manage →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
