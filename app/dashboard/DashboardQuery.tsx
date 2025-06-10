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
      <div className="space-y-8 px-4 sm:px-0">
        {/* Header Section - More refined spacing */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
              Welcome, {userName || "User"}!
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Here's what's happening with your store today
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full sm:w-auto justify-center border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <LogOutIcon className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Summary Cards - More refined design with subtle animations */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Product Card */}
          <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-xs border border-gray-100 dark:border-gray-700 hover:shadow-sm transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Products
                </p>
                <p className="text-2xl font-semibold mt-2 text-gray-900 dark:text-white">
                  {productsData?.length || 0}
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-50/50 dark:bg-blue-900/20">
                <PackageIcon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              Total products in inventory
            </p>
          </div>

          {/* Orders Card */}
          <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-xs border border-gray-100 dark:border-gray-700 hover:shadow-sm transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Orders
                </p>
                <p className="text-2xl font-semibold mt-2 text-gray-900 dark:text-white">
                  0
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-50/50 dark:bg-green-900/20">
                <ShoppingCartIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              Orders this month
            </p>
          </div>

          {/* Revenue Card */}
          <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-xs border border-gray-100 dark:border-gray-700 hover:shadow-sm transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Revenue
                </p>
                <p className="text-2xl font-semibold mt-2 text-gray-900 dark:text-white">
                  Rs0.00
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-50/50 dark:bg-purple-900/20">
                <CurrencyIcon className="h-5 w-5 text-purple-500 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              Monthly earnings
            </p>
          </div>

          {/* Customers Card */}
          <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-xs border border-gray-100 dark:border-gray-700 hover:shadow-sm transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Customers
                </p>
                <p className="text-2xl font-semibold mt-2 text-gray-900 dark:text-white">
                  {testimonials?.length || 0}
                </p>
              </div>
              <div className="p-3 rounded-full bg-amber-50/50 dark:bg-amber-900/20">
                <UsersIcon className="h-5 w-5 text-amber-500 dark:text-amber-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              Happy customers
            </p>
          </div>
        </div>

        {/* Quick Actions Section - More polished */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 tracking-tight">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            <Button
              variant="outline"
              className="justify-start gap-2 h-11 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={() => router.push("/dashboard/products")}
            >
              <PlusIcon className="h-4 w-4" />
              Add New Product
            </Button>

            <Button
              variant="outline"
              className="justify-start gap-2 h-11 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={() => {
                router.push("dashboard/customize-store");
              }}
            >
              <SettingsIcon className="h-4 w-4" />
              Store Settings
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
