"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppearancePage from "./AppearanceData";

const queryClient = new QueryClient();

export default function Appearance() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppearancePage />
    </QueryClientProvider>
  );
}
