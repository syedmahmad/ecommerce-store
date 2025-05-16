// CheckoutPage

"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import CheckoutPage from "./CheckoutPage";

const queryClient = new QueryClient();

export default function StoreDataQuery() {
  const params = useParams();
  const storeId = params.store;

  return (
    <QueryClientProvider client={queryClient}>
      <CheckoutPage storeId={storeId} />
    </QueryClientProvider>
  );
}
