"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useAuthStatus({
  required = false,
  redirectTo = "/login",
} = {}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    setIsLoading(false);

    if (required && status !== "authenticated") {
      // router.push(`${redirectTo}?callbackUrl=${encodeURIComponent(window.location.href)}`)
    }
  }, [status, required, redirectTo, router]);

  return {
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading" || isLoading,
    session,
    user: session?.user,
  };
}
