"use client";
import { DashboardLayout } from "@/components/dashboard-layout";
import React, { useEffect, useState } from "react";
import { CustomiseBanner } from "./_components/CustomiseBanner";
import { WhyShopWithUs } from "./_components/WhyShopWithUs";
import { CustomerSection } from "./_components/CustomerSection";
import { UpdateStoreInfo } from "./_components/UpdateStoreInfo";

const TABS = [
  { id: "storeBanner", label: "Customize Store Banner" },
  { id: "whyShop", label: "Customize Why Shop With Us" },
  { id: "customerSection", label: "Customize Customer Section" },
  { id: "storeInfo", label: "Update Store Info" },
];

export const CustomizeStoreFront = () => {
  const [activeTab, setActiveTab] = useState("storeBanner");

  const renderContent = () => {
    switch (activeTab) {
      case "storeBanner":
        return <CustomiseBanner />;
      case "whyShop":
        return <WhyShopWithUs />;
      case "customerSection":
        return <CustomerSection />;
      case "storeInfo":
        return <UpdateStoreInfo />;
      default:
        return null;
    }
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    localStorage.setItem("activeTab", JSON.stringify(tabId));
  };

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const previousTab = localStorage.getItem("activeTab");
      if (previousTab) {
        setActiveTab(JSON.parse(previousTab));
      }
    }
  }, []);

  return (
    <DashboardLayout>
      <div className="w-full py-4 px-4 sm:py-6 sm:px-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          Customize Store
        </h1>

        {/* Tabs - horizontal scroll on mobile */}
        <div className="mb-4 sm:mb-6">
          <div className="flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content area */}
        <div className="bg-white shadow rounded-lg p-4 sm:p-6">
          {renderContent()}
        </div>
      </div>
    </DashboardLayout>
  );
};
