"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StorePage from "./StoreDataQuery";

const queryClient = new QueryClient();

export default function StoreDataQuery({ params }: any) {

  return (
    <QueryClientProvider client={queryClient}>
      <StorePage />
    </QueryClientProvider>
  );
}
