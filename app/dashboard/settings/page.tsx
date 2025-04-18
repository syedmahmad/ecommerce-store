"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Palette, User, CreditCard, Store, Bell, Shield, Globe } from "lucide-react"

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
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and store settings</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {settingsCategories.map((category) => (
            <Link key={category.id} href={category.href}>
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="rounded-full p-2 bg-primary/10">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex justify-end">
                  <Button variant="ghost" size="sm">
                    Manage
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
