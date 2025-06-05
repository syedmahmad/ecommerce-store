import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = () =>
  axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

const handleError = (error: any) => {
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

  throw error;
};

const GET = async (endPoint: string) => {
  try {
    const response = await axiosInstance().get(endPoint);
    return response;
  } catch (error) {
    handleError(error);
  }
};

const POST = async (endPoint: string, data: any, config?: any) => {
  try {
    let token: string | null = null;

    try {
      const user = localStorage.getItem('user');
      token = user ? JSON.parse(user)?.token || null : null;
    } catch (err) {
      console.warn('Error parsing user from localStorage', err);
    }

    const mergedConfig = {
      ...(config || {}),
      headers: {
        ...(config?.headers || {}),
        ...(token && { Authorization: `Bearer ${token}` }), // ✅ Only add if token exists
      },
    };

    const response = await axiosInstance().post(endPoint, data, mergedConfig);
    return response;
  } catch (error) {
    handleError(error);
  }
};


const DELETE = async (endPoint: string) => {
  try {
     const user = localStorage.getItem('user');
     const parseUser = user && JSON.parse(user)
     const token = parseUser.token;

    const response = await axiosInstance().delete(endPoint, {
      headers: {
        Authorization: `Bearer ${token}`, // inject JWT token here
      },
    });
    return response;
  } catch (error: any) {
    const { code, message } = error?.response?.data || {};

    if (code === "SENDER_IN_USE") {
      const toastId = "sender-in-use-warning";
      if (!toast.isActive(toastId)) {
        toast.warn(message || "Sender is already in use", {
          toastId,
          autoClose: false,
        });
      }
    } else {
      handleError(error);
    }
  }
};

const PUT = async (endPoint: string, data: any) => {
  try {
    const user = localStorage.getItem('user');
     const parseUser = user && JSON.parse(user)
     const token = parseUser.token;
    const response = await axiosInstance().put(endPoint, data, {
      headers: {
        Authorization: `Bearer ${token}`, // inject JWT token here
      },
    });

    return response;
  } catch (error) {
    handleError(error);
  }
};

const PATCH = async (endPoint: string, data: any, config?: any) => {
  try {

    const user = localStorage.getItem('user');
     const parseUser = user && JSON.parse(user)
     const token = parseUser.token;

    const mergedConfig = {
      ...(config || {}),
      headers: {
        ...(config?.headers || {}),
        Authorization: `Bearer ${token}`, // inject JWT token here
      },
    };
    const response = await axiosInstance().patch(endPoint, data, mergedConfig);
    console.log('response',response)
    return response;
  } catch (error: any) {
    console.log('error',error)
    handleError(error);
  }
};

export { GET, POST, DELETE, PUT, PATCH };
