"use client";
import { DashboardLayout } from "@/components/dashboard-layout";
import React, { useState } from "react";
import { CustomiseBanner } from "./_components/CustomiseBanner";
import { WhyShopWithUs } from "./_components/WhyShopWithUs";
import { CustomerSection } from "./_components/CustomerSection";

const TABS = [
  { id: "storeBanner", label: "Customize Store Banner" },
  { id: "whyShop", label: "Customize Why Shop With Us" },
  { id: "customerSection", label: "Customize Customer Section" },
];

export const CustomizeDashboard0 = () => {
  const [activeTab, setActiveTab] = useState("storeBanner");

  const renderContent = () => {
    switch (activeTab) {
      case "storeBanner":
        return <CustomiseBanner />;
      case "whyShop":
        return <WhyShopWithUs />;
      case "customerSection":
        return <CustomerSection />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">Customize Dashboard</h1>

        <div className="flex space-x-2 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white shadow rounded-lg p-6">{renderContent()}</div>
      </div>
    </DashboardLayout>
  );
};

