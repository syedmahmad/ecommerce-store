"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import StorePage from "./StoreDataQuery";

const queryClient = new QueryClient();

export default function StoreDataQuery() {
  const params = useParams();
  const storeId = params.store;

  return (
    <QueryClientProvider client={queryClient}>
      <StorePage storeId={storeId} />
    </QueryClientProvider>
  );
}
