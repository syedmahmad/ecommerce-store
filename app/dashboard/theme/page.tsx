"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemePage0 from "./ThemePage";

const queryClient = new QueryClient();

export default function ThemePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemePage0 />
    </QueryClientProvider>
  );
}
