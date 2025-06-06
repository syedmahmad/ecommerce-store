"use client";
import React from "react";
import { useAuthStatus } from "@/hooks/use-auth-status";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  CurrencyIcon,
  FileTextIcon,
  Loader2,
  PackageIcon,
  PlusIcon,
  SettingsIcon,
  ShoppingCartIcon,
  UsersIcon,
} from "lucide-react";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { GET } from "../utils/Axios";
import { UpdateStoreInfoAfterLogin } from "./customize-store/_components/UpdateStoreInfoAfterLogin";
import { useRouter } from "next/navigation";

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
      <div className="space-y-6 px-4 sm:px-0">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {userName || "User"}!
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Your store management dashboard
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full sm:w-auto justify-center"
          >
            Sign Out
          </Button>
        </div>

        {/* Summary Cards - Responsive Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Product Card */}
          <div className="rounded-xl bg-white dark:bg-gray-800 p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Products
                </p>
                <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                  {productsData?.length || 0}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                <PackageIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              Total products in your store
            </p>
          </div>

          {/* Orders Card */}
          <div className="rounded-xl bg-white dark:bg-gray-800 p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Orders
                </p>
                <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                  0
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/30">
                <ShoppingCartIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              Total orders received
            </p>
          </div>

          {/* Revenue Card */}
          <div className="rounded-xl bg-white dark:bg-gray-800 p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Revenue
                </p>
                <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                  Rs0.00
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/30">
                <CurrencyIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              Total earnings this month
            </p>
          </div>

          {/* Customers Card */}
          <div className="rounded-xl bg-white dark:bg-gray-800 p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Customers
                </p>
                <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                  {testimonials?.length || 0}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/30">
                <UsersIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              People who trust your business
            </p>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            <Button
              variant="outline"
              className="justify-start gap-2"
              onClick={() => router.push("/dashboard/products")}
            >
              <PlusIcon className="h-4 w-4" />
              Add New Product
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <FileTextIcon className="h-4 w-4" />
              View Orders
            </Button>
            <Button
              variant="outline"
              className="justify-start gap-2"
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
