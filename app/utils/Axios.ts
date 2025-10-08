import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 🔑 ensures cookies are sent with requests
});

// 🔹 Request Interceptor
axiosInstance.interceptors.request.use((config) => {
  // Read from cookie first
  let token = Cookies.get("authToken");

  // Fallback: read from localStorage (in case cookie not accessible in JS)
  if (!token) {
    const user = localStorage.getItem("user");
    if (user) {
      token = JSON.parse(user)?.token;
    }
  }

  // Attach Authorization header if token exists
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 🔹 Response Interceptor
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
      localStorage.removeItem("user");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

// 🔹 API Helpers
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
