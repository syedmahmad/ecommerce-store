"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MerchantsData } from "./MerchantsData";

const queryClient = new QueryClient();
const ViewMerhcants = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MerchantsData />
    </QueryClientProvider>
  );
};

export default ViewMerhcants;
