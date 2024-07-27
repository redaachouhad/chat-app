// axiosInstance.ts
import axios from "axios";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BACKEND_URL, // Replace with your actual base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the JWT token in the headers
axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if ((session as any)?.accessToken) {
      config.headers.Authorization = `Bearer ${
        (session as any)?.accessToken as string
      }`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
