"use client"

import { useAuthStatus } from "@/hooks/use-auth-status"
import { Loader2 } from "lucide-react"

export function ProtectedRoute({ children, redirectTo = "/login" }: any) {
  const { isAuthenticated, isLoading } = useAuthStatus({ required: true, redirectTo })

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (isAuthenticated) {
    return <>{children}</>
  }

  return null
}
