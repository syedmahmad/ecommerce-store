"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { StoreLayoutWrapper } from "./ui/StoreLayoutWrapper";

const queryClient = new QueryClient();

export default function StoreLayout({ children }: any) {
  const params = useParams();
  const storeId = params.store;

  return (
    <QueryClientProvider client={queryClient}>
      <StoreLayoutWrapper storeId={storeId} children={children} />
    </QueryClientProvider>
  );
}
