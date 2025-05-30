"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SingleProduct from "../SelectedProductInfo";

const queryClient = new QueryClient();

export default function StoreDataQuery() {

  return (
    <QueryClientProvider client={queryClient}>
      <SingleProduct />
    </QueryClientProvider>
  );
}
