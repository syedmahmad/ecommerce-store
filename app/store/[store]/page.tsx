"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import StorePage from "./StoreDataQuery";

const queryClient = new QueryClient();

export default function StoreDataQuery() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [storeId, setStoreId] = useState<string | null>(null);

  useEffect(() => {
    // Method 1: Get from subdomain (store1.zylospace.com)
    if (typeof window !== 'undefined') {
      const hostParts = window.location.hostname.split('.');
      if (hostParts.length > 2 && hostParts[0].startsWith('store')) {
        setStoreId(hostParts[0].replace('store', ''));
        return;
      }
    }

    // Method 2: Get from path (/store/[store])
    if (params?.store) {
      setStoreId(params.store as string);
    }
  }, [params?.store]);

  if (!storeId) {
    return <div>Loading store...</div>; // Or your loading component
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StorePage storeId={storeId} key={storeId} />
    </QueryClientProvider>
  );
}