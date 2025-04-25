"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { SalesPageData } from "./SalePageData";

const queryClient = new QueryClient();

const SalePage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SalesPageData />
    </QueryClientProvider>
  );
};

export default SalePage;
