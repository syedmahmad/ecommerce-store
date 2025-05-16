"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

type AuthContextType = {
  user: any;
  status: "loading" | "authenticated" | "unauthenticated";
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<boolean>;
  resetPassword: (
    email: string,
    token: string,
    password: string
  ) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: any) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<{
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null>(null);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    } else {
      setUser(null);
    }
  }, [session]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const user = response.data;

      if (response.status === 201) {
        toast.success(`Weclome ${user.name}`);
        const { token } = response.data;
        localStorage.setItem("user", JSON.stringify(response.data));

        // ✅ Store the token in a cookie
        Cookies.set("authToken", token, {
          expires: 7, // 7 days
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
          path: "/",
        });
        window.location.reload();
        router.push("/dashboard");
        return true;
      }
    } catch (error: any) {
      const message = error.response?.data?.message;
      toast.error(message || "User with this information not found");
      return false;
    }
    return false;
  };

  const loginWithGoogle = async () => {
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
      toast.success("Login successful");
      return true;
    } catch (error: any) {
      toast.error("Google login failed");
      return false;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<any> => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });

      if (
        response?.status === 201 ||
        response?.data?.nextStep === "verify-otp"
      ) {
        return {
          success: true,
          nextStep: "verify-otp",
        };
      }

      if (response.status !== 201) {
        throw new Error("Registration failed");
      }

      // Auto login after registration
      // const loginResult = await login(email, password);
      // return loginResult;
    } catch (error: any) {
      if (error?.status === 409) {
        toast.warn(
          "User with these credentials already exists. Try login with these credentials",
          { autoClose: 5000 }
        );
        router.push("/login");
        return false;
      }
      return false;
    }
  };

  const logout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const requestPasswordReset = async (email: string) => {
    try {
      const response = await fetch("/api/password-reset/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Password reset request failed");
      }

      // toast({
      //   title: "Password reset email sent",
      //   description: "Check your email for a password reset link",
      // });
      return true;
    } catch (error: any) {
      // toast({
      //   title: "Password reset request failed",
      //   description: error.message || "Something went wrong",
      //   variant: "destructive",
      // });
      return false;
    }
  };

  const resetPassword = async (
    email: string,
    token: string,
    password: string
  ) => {
    try {
      const response = await fetch("/api/password-reset/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Password reset failed");
      }

      // toast({
      //   title: "Password reset successful",
      //   description: "You can now log in with your new password",
      // });
      return true;
    } catch (error: any) {
      // toast({
      //   title: "Password reset failed",
      //   description: error.message || "Something went wrong",
      //   variant: "destructive",
      // });
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        status,
        login,
        loginWithGoogle,
        register,
        logout,
        requestPasswordReset,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
