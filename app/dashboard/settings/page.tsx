"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SettingsPage from "./SettingsPageData";

const queryClient = new QueryClient();

export default function DashboardQueryPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <SettingsPage />
    </QueryClientProvider>
  );
}
