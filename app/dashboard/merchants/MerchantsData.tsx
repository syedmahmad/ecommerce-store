"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GET } from "@/app/utils/Axios";
import { DashboardLayout } from "@/components/dashboard-layout";
import { format } from "date-fns"; // Date formatting library

export const MerchantsData = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const lcData = localStorage.getItem("user");
      const user = lcData && JSON.parse(lcData);
      if (user?.id) {
        setUserId(user.users_uuid);
      }
    }
  }, [userId]);

  const merchantsInfo = useQuery({
    queryKey: ["get-merchant-data"],
    queryFn: async () => {
      const endpoint = `/merchants`;
      return await GET(endpoint);
    },
    enabled: !!userId,
  });

  const merchantData = merchantsInfo?.data?.data;

  // Extract relevant data from merchantData
  const totalSalesCount = merchantData?.data?.totalSalesCount ?? 0;
  const totalSalesValue = merchantData?.data?.totalSalesValue ?? 0;
  const totalProductsSold = merchantData?.data?.totalProductsSold ?? 0;

  // User info
  const userInfo = merchantData?.data?.user ?? null;

  return (
    <DashboardLayout>
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {merchantData &&
          merchantData?.map((merchant: any) => (
            <div
              key={merchant.merchant_uuid}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-6 flex flex-col"
            >
              {/* Store Information */}
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {merchant.store.name}
                </h2>
                <p className="text-gray-600">{merchant.store.description}</p>
                {/* <a
                href={`https://${merchant.store.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-sm mt-2 block"
              >
                Visit Store
              </a> */}
              </div>

              {/* Divider */}
              <hr className="my-4" />

              {/* Owner Information */}
              <div className="flex items-center gap-4">
                <img
                  src={"/avatar.png"}
                  alt={`${merchant.user.name}'s profile`}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-gray-900 font-medium">
                    {merchant.user.name}
                  </p>
                  <p className="text-gray-500 text-sm">{merchant.user.email}</p>

                  {/* Member Since */}
                  <p className="text-gray-500 text-sm">
                    Member Since:{" "}
                    {merchant.user.createdAt
                      ? format(
                          new Date(merchant.user.createdAt),
                          "MMMM dd, yyyy"
                        )
                      : "N/A"}
                  </p>
                </div>
              </div>

              {/* Products (Future Ready) */}
              <div className="mt-6">
                <h3 className="text-md font-semibold mb-2">Products:</h3>
                {merchant.products.length === 0 ? (
                  <p className="text-gray-400 text-sm">
                    No products available yet.
                  </p>
                ) : (
                  <ul className="list-disc list-inside">
                    {/* First, show the count */}
                    <li className="text-gray-800 text-sm font-semibold mb-2">
                      Active Products:{" "}
                      {
                        merchant.products.filter(
                          (product: any) => product.status === 1
                        ).length
                      }
                    </li>

                    {/* Now, list only active products */}
                    {merchant.products.map((product: any) => {
                      if (product.status !== 1) return null; // Skip non-active products
                      return null;
                    })}
                  </ul>
                )}
              </div>
            </div>
          ))}
      </div>
    </DashboardLayout>
  );
};
