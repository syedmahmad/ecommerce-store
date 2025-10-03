"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail } from "lucide-react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useAuth } from "@/context/auth-context";
import { Loader2, AlertCircle, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { POST } from "../utils/Axios";
// import { useEffect, useState } from "react";

// #region for validation

const registerSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// #endregion

export default function RegisterPage() {
  // #region general for state variable
  const router = useRouter();
  const { register, loginWithGoogle, login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // state variable for otp
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // #endregion

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const showVerifyOtpModal = () => {
    setShowOtpModal(true);
  };

  const [shouldProceed, setShouldProceed] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [showConfirmEmailModal, setShowConfirmEmailModal] = useState(false);

  const onSubmit = async (data: any) => {
    setFormData(data);
    setError("");
    setShowConfirmEmailModal(true);
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

        // ✅ Store the token in a cookie
        Cookies.set("authToken", token, {
          expires: 7, // 7 days
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
          path: "/",
        });

        toast.success(`Welcome ${user.name}`);
        window.location.reload();
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Google login failed:", error);
      setError(error.response?.data?.message || "Google login failed");
    } finally {
      setIsLoading(false);
    }
  };

  // #region for otp verification
  const handleOtpVerification = async () => {
    setIsLoading(true);
    setOtpError("");

    try {
      const email = form.getValues("email");
      const password = form.getValues("password");

      const response = await POST(
        "auth/verify-email",
        JSON.stringify({ email, otp })
      );

      // Save token if needed (e.g., in localStorage/cookie)
      // localStorage.setItem("token", response.token);

      toast.success("Email verified successfully");

      const loginResult = await login(email, password);
      if (loginResult) {
        router.push("/dashboard");
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message;

      if (message.includes("Invalid OTP")) {
        setOtpError("The code you entered is incorrect.");
      } else if (message.includes("expired")) {
        setOtpError("The OTP code has expired. Please request a new one.");
      } else {
        setOtpError("Verification failed. Please try again.");
      }

      toast.error("OPT Expired, Try Generating a new one");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setIsLoading(true);

      const email = form.getValues("email");

      // Make sure email is present before calling the API
      if (!email) {
        toast.error("Email is missing. Please enter your email.");
        return;
      }

      const res = await POST(`auth/resend-otp`, JSON.stringify({ email }));

      if (res?.status === 201) {
        toast.success(`A new OTP has been sent to your email.${email}`);
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      toast.error("Failed to resend OTP. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // #endregion

  useEffect(() => {
    const registerUser = async () => {
      if (!shouldProceed || !formData) return;

      setIsLoading(true);
      setError("");

      try {
        const success: any = await register(
          formData.name,
          formData.email,
          formData.password
        );

        if (success?.nextStep === "verify-otp") {
          toast.success(`We have sent the OTP code to: ${formData.email}`);
          showVerifyOtpModal();
          return;
        }

        if (success) {
          router.push("/dashboard");
        }
      } catch (error: any) {
        setError(error.message || "Registration failed");
      } finally {
        setIsLoading(false);
        setShouldProceed(false); // Reset flag
      }
    };

    registerUser();
  }, [shouldProceed]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-lg rounded-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-primary-600">
            Create an account
          </CardTitle>
          <CardDescription className="text-center text-gray-500">
            Enter your information to create an account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        disabled={isLoading}
                        className="focus:ring-2 focus:ring-primary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        {...field}
                        disabled={isLoading}
                        className="focus:ring-2 focus:ring-primary/50"
                      />
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
                    <FormLabel className="text-gray-700">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                          disabled={isLoading}
                          className="focus:ring-2 focus:ring-primary/50"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          tabIndex={-1}
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

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                          disabled={isLoading}
                          className="focus:ring-2 focus:ring-primary/50"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          tabIndex={-1}
                        >
                          {showConfirmPassword ? (
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

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
            </form>
          </Form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google login */}
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log("Login Failed")}
          />
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>

      {/* Confirm Email Dialog */}
      <Dialog
        open={showConfirmEmailModal}
        onOpenChange={setShowConfirmEmailModal}
      >
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-center text-primary-600">
              Confirm Your Email
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="text-center space-y-3">
              <Mail className="mx-auto h-12 w-12 text-primary" />
              <p className="text-lg font-medium text-gray-700">
                Is this the correct email address?
              </p>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="font-semibold text-primary">
                  {form.getValues("email")}
                </p>
              </div>
              <p className="text-sm text-gray-500">
                We'll send a 6-digit verification code to this address
              </p>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <Button
                type="button"
                variant="outline"
                className="px-6 py-3"
                onClick={() => setShowConfirmEmailModal(false)}
              >
                No, Change Email
              </Button>
              <Button
                type="button"
                className="px-6 py-3 bg-primary hover:bg-primary/90"
                onClick={() => {
                  setShouldProceed(true), setShowConfirmEmailModal(false);
                }}
                disabled={isLoading}
              >
                Send OTP
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* OTP Dialog */}
      {showOtpModal && (
        <Dialog open={showOtpModal} onOpenChange={setShowOtpModal}>
          <DialogContent
            className="sm:max-w-[425px]"
            hideClose
            onInteractOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle className="text-primary-600">
                Verify Your Email
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <p className="text-center text-base text-gray-600">
                We've sent a 6-digit code to {form.getValues("email")}.<br />
                <span className="text-xs text-gray-500">
                  If you don't see it soon, please check your spam or junk
                  folder.
                </span>
              </p>

              {/* OTP inputs */}
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <div className="flex justify-center space-x-2">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={otp[index] || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^[0-9]$/.test(value)) {
                          const newOtp = otp.split("");
                          newOtp[index] = value;
                          setOtp(newOtp.join(""));
                          if (index < 5 && value) {
                            document
                              .getElementById(`otp-${index + 1}`)
                              ?.focus();
                          }
                        } else if (value === "") {
                          const newOtp = otp.split("");
                          newOtp[index] = "";
                          setOtp(newOtp.join(""));
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !otp[index] && index > 0) {
                          document.getElementById(`otp-${index - 1}`)?.focus();
                        }
                      }}
                      className="w-10 h-12 text-center text-xl focus:ring-2 focus:ring-primary/50"
                    />
                  ))}
                </div>
                {otpError && <p className="text-sm text-red-500">{otpError}</p>}
              </div>

              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleResendOtp}
                  disabled={isLoading}
                >
                  Resend Code
                </Button>
                <Button
                  type="button"
                  onClick={handleOtpVerification}
                  disabled={isLoading || otp.length !== 6}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify"
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
