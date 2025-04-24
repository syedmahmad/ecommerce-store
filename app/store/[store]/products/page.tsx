"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductsDataPage } from "./ProductsQuery";

const queryClient = new QueryClient();

export default function StoreDataQuery({ params }: any) {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductsDataPage />
    </QueryClientProvider>
  );
}
