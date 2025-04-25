"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContactPageData } from "./ContactPageData";

const queryClient = new QueryClient();

const ContatUsPage = () => {
  return (
  <QueryClientProvider client={queryClient}>
    <ContactPageData />
  </QueryClientProvider>
  )

};

export default ContatUsPage;
