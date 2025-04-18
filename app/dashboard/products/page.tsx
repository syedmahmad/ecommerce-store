"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductsPage } from "./prodcutQuery";

const queryClient = new QueryClient();

export default function ProductQueryPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductsPage />
    </QueryClientProvider>
  );
}
