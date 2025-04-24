"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CustomizeDashboard0 } from "./CustomiseDashboard";

const queryClient = new QueryClient();
const CustomizeDashboard = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomizeDashboard0 />
    </QueryClientProvider>
  );
};

export default CustomizeDashboard;
