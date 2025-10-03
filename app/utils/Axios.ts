// axios.ts
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Request Interceptor (inject JWT from cookies)
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("authToken"); // ✅ get from cookie
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔹 Response Interceptor (centralized error handling)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    const errorMessage = error?.response?.data?.message;

    if (
      typeof errorMessage === "string" &&
      errorMessage.startsWith("Store with owner ID") &&
      errorMessage.endsWith("not found.")
    ) {
      toast.warn(errorMessage);
      Cookies.remove("authToken");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

// 🔹 API Helpers (super clean now)
const GET = (endPoint: string, config?: any) =>
  axiosInstance.get(endPoint, config);
const POST = (endPoint: string, data?: any, config?: any) =>
  axiosInstance.post(endPoint, data, config);
const PUT = (endPoint: string, data?: any, config?: any) =>
  axiosInstance.put(endPoint, data, config);
const PATCH = (endPoint: string, data?: any, config?: any) =>
  axiosInstance.patch(endPoint, data, config);
const DELETE = (endPoint: string, config?: any) =>
  axiosInstance.delete(endPoint, config);

export { GET, POST, PUT, PATCH, DELETE, axiosInstance };
