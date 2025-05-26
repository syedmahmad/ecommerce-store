"use client";
import React from "react";
import { useAuthStatus } from "@/hooks/use-auth-status";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Loader2 } from "lucide-react";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { GET } from "../utils/Axios";
import { UpdateStoreInfoAfterLogin } from "./customize-store/_components/UpdateStoreInfoAfterLogin";

export default function DashboardPage() {
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
    return (
      <UpdateStoreInfoAfterLogin />
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {" "}
            Welcome, {`${userName}` || "User"}!{" "}
          </h1>
          <Button variant="outline" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>
        <p className="text-muted-foreground">
          You are now signed in to your account. You can manage your store from
          this dashboard.
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card p-6">
            <div className="text-sm font-medium text-muted-foreground">
              Total Products
            </div>
            <div className="text-2xl font-bold">
              {productsData?.length > 0 ? productsData?.length : 0}
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <div className="text-sm font-medium text-muted-foreground">
              Total Orders
            </div>
            <div className="text-2xl font-bold">0</div>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <div className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </div>
            <div className="text-2xl font-bold">RS0.00</div>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <div className="text-sm font-medium text-muted-foreground">
              Customers
            </div>
            <div className="text-2xl font-bold">
              {testimonials && testimonials?.length > 0
                ? testimonials?.length
                : 0}
            </div>
          </div>
        </div>
      </div>
      {/* the UI will only appear when user does not added his contact number and  */}


    </DashboardLayout>
  );
}
