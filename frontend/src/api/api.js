/**
 * Central Axios instance
 * Works for:
 * - Localhost
 * - Vercel
 * - Mobile
 */
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"                       // Local backend
    : "https://apnacollege-dsa-tracker.vercel.app/api"; // Vercel backend

export const API = axios.create({
  baseURL: API_URL,
});
