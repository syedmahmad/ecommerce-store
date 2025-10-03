"use client";
import React from "react";
import { useAuthStatus } from "@/hooks/use-auth-status";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  CurrencyIcon,
  Loader2,
  LogOutIcon,
  PackageIcon,
  PlusIcon,
  SettingsIcon,
  ShoppingCartIcon,
  UsersIcon,
} from "lucide-react";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { GET } from "../utils/Axios";
import { UpdateStoreInfoAfterLogin } from "./customize-store/_components/UpdateStoreInfoAfterLogin";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function DashboardPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const lcData = localStorage.getItem("user");
      const user = lcData && JSON.parse(lcData);
      if (user?.id) {
        setUserId(user.id);
        setUserName(user.name);
      }
    }
  }, [userId]);

  const getAllProducts = useQuery({
    queryKey: ["get-product"],
    queryFn: async () => {
      const endpoint = `product/admin?id=${userId}`;
      return await GET(endpoint);
    },
    enabled: !!userId,
  });

  const { data } = useQuery({
    queryKey: ["our-customer-section", userId],
    queryFn: async () => {
      const endpoint = `our-customer-section/${userId}`;
      return GET(endpoint);
    },
    enabled: !!userId,
  });

  const getStoreInfo = useQuery({
    queryKey: ["store-info"],
    queryFn: async () => {
      const endpoint = `store/${userId}`;
      return await GET(endpoint);
    },
    enabled: !!userId,
  });

  const storeInfoFromBE = getStoreInfo?.data?.data;

  const isContactNo = storeInfoFromBE?.contactNumber ?? false;

  const testimonials = data?.data;
  const productsData = getAllProducts?.data?.data;

  const { isLoading } = useAuthStatus({ required: true });

  const handleLogout = async () => {
    Cookies.remove("authToken");
    window.location.href = "/";
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isContactNo) {
    return <UpdateStoreInfoAfterLogin />;
  }

  return (
    <DashboardLayout>
      <div className="space-y-12 px-4 sm:px-0">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent drop-shadow-md">
              Welcome, {userName || "User"}!
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Here's what's happening with your store today
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full sm:w-auto justify-center px-6 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 
                 bg-white/30 dark:bg-gray-800/40 backdrop-blur-sm
                 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white 
                 transition-all duration-300 hover:shadow-[0_0_18px_rgba(139,92,246,0.6)]"
          >
            <LogOutIcon className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Products",
              value: productsData?.length || 0,
              icon: PackageIcon,
            },
            { title: "Orders", value: 0, icon: ShoppingCartIcon },
            { title: "Revenue", value: "Rs0.00", icon: CurrencyIcon },
            {
              title: "Customers",
              value: testimonials?.length || 0,
              icon: UsersIcon,
            },
          ].map(({ title, value, icon: Icon }, i) => (
            <div
              key={i}
              className="rounded-2xl relative bg-white/70 dark:bg-gray-900/60 
                   border border-white/20 dark:border-gray-800 
                   shadow-md backdrop-blur-xl 
                   hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-[1.02]
                   transition-transform duration-300 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {title}
                  </p>
                  <p className="text-3xl font-extrabold mt-2 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-md">
                    {value}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg">
                  <Icon className="h-5 w-5 text-white" />
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                {title === "Products"
                  ? "Total products in inventory"
                  : title === "Orders"
                  ? "Orders this month"
                  : title === "Revenue"
                  ? "Monthly earnings"
                  : "Happy customers"}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            <Button
              variant="outline"
              className="flex flex-col items-start h-28 px-5 py-4 rounded-2xl border border-purple-500/40 
                   text-left bg-white/40 dark:bg-gray-900/40 backdrop-blur-md
                   hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white 
                   hover:shadow-[0_0_22px_rgba(59,130,246,0.4)] transition-all"
              onClick={() => router.push("/dashboard/products")}
            >
              <PlusIcon className="h-5 w-5 mb-2" />
              <span className="font-medium">Add New Product</span>
              <span className="text-xs opacity-70">
                Quickly add items to your store
              </span>
            </Button>

            <Button
              variant="outline"
              className="flex flex-col items-start h-28 px-5 py-4 rounded-2xl border border-purple-500/40 
                   text-left bg-white/40 dark:bg-gray-900/40 backdrop-blur-md
                   hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white 
                   hover:shadow-[0_0_22px_rgba(139,92,246,0.5)] transition-all"
              onClick={() => router.push("dashboard/customize-store")}
            >
              <SettingsIcon className="h-5 w-5 mb-2" />
              <span className="font-medium">Store Settings</span>
              <span className="text-xs opacity-70">Manage your storefront</span>
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// <Button variant="outline" className="justify-start gap-2">
//               <FileTextIcon className="h-4 w-4" />
//               View Orders
//             </Button>
