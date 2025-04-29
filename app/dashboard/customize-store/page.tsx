"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CustomizeStoreFront } from "./CustomizeStoreFront";

const queryClient = new QueryClient();
const CustomizeDashboard = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomizeStoreFront />
    </QueryClientProvider>
  );
};

export default CustomizeDashboard;
