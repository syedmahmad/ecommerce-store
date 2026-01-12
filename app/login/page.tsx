"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2, AlertCircle, Mail, Lock, LogIn } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Cookies from "js-cookie";
import { useAuth } from "@/context/auth-context";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const errorMessage = searchParams.get("error");
  const callbackUrl = "/dashboard";

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError("");
    try {
      const success = await login(data.email, data.password);
      if (success) {
        window.location.reload();
        router.push(callbackUrl);
      }
    } catch (error: any) {
      setError(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setIsLoading(true);
    setError("");
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.post(`${API_URL}/auth/google`, {
        credential: credentialResponse.credential,
      });

      if (response.status === 201) {
        const { token, user } = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        Cookies.set("authToken", token, {
          expires: 7,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
          path: "/",
        });
        router.push("/dashboard");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Google login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Card className="rounded-2xl shadow-2xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
          {/* Decorative gradient header */}
          <div className="h-2 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600"></div>
          
          <CardHeader className="space-y-3 text-center pb-8 pt-8">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg mb-2">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Welcome Back
              </span>
            </CardTitle>
            <CardDescription className="text-gray-600 text-base">
              Sign in to continue to ZyloSpace
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 px-8 pb-8">
          {(error || errorMessage) && (
            <Alert variant="destructive" className="border-red-200 bg-red-50 animate-in slide-in-from-top-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm font-medium">{error || errorMessage}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          placeholder="name@example.com"
                          className="pl-10 border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all duration-200 h-11"
                          {...field}
                          disabled={isLoading}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10 border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all duration-200 h-11"
                          {...field}
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors duration-200 p-1 rounded-md hover:bg-purple-50"
                          tabIndex={-1}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Forgot password */}
              <div className="flex items-center justify-end pt-1">
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:underline transition-all duration-200 hover:opacity-80"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign in Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 h-11 text-base font-semibold mt-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign in
                  </>
                )}
              </Button>
            </form>
          </Form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-gray-500 font-medium tracking-wider">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Button */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log("Login Failed")}
            />
          </div>
          </CardContent>

          <CardFooter className="flex justify-center border-t border-gray-100 bg-gray-50/50 py-6">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:underline transition-all duration-200 hover:opacity-80"
            >
              Sign up
            </Link>
          </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
