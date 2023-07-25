import axios from "axios";
import { BASE_URL } from "../constants/api-path";

export const Axios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      (error.response?.status === 403 && error.response?.data?.message === "Invalid or expired token") ||
      error.response?.data?.message === "Authorization token not provided"
    ) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
