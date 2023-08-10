import axios from "axios";
import { BASE_URL } from "../constants/api-path";

export const Axios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});


