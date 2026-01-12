import axios from "axios";

export const API_BASE_URL = "https://uks-server.developers.rs";

const api = axios.create({
  baseURL: "https://uks-server.developers.rs", // Ovde postavite bazni URL
  headers: {
    "Content-Type": "application/json", // Defaultni header
  },
});

export default api;
