import axios from "axios";
export const API_BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: "http://localhost:8080", // Ovde postavite bazni URL
  headers: {
    "Content-Type": "application/json", // Defaultni header
  },
});

export default api;