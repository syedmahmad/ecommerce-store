import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = () => axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const handleError = (error: any) => {
    console.log('.....',error)
    if( error?.response?.data?.error === "Not Found" || error?.response?.data?.statusCode === 400) {
        toast.error('Unable to find the requested resource.');
        Cookies.remove("authToken");
        window.location.href = "/login";
    }
    toast('Soemthing went wrong! Please try again.');
    throw new error;
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
        const response = await axiosInstance().post(endPoint, data, config);
        return response;
    } catch (error) {
        handleError(error);
    }
};


const DELETE = async (endPoint: string) => {
    try {
        const response = await axiosInstance().delete(endPoint);
        return response;
    } catch (error: any) {
        const { code, message } = error?.response?.data || {};

        if (code === "SENDER_IN_USE") {
            const toastId = 'sender-in-use-warning';
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



const PUT = async (endPoint: string, data: any,) => {
    try {
        const response = await axiosInstance().put(endPoint, data);
        return response;
    } catch (error) {
        handleError(error);
    }
};

const PATCH = async (endPoint: string, data: any, config?: any) => {
    try {
        const response = await axiosInstance().patch(endPoint, data, config);
        return response;
    } catch (error: any) {
        handleError(error);
    }
};


export { GET, POST, DELETE, PUT, PATCH };
