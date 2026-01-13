/**
 * Central Axios instance
 * Used for all API calls to the backend
 */
import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});


