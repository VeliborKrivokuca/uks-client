import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // Ovde postavite bazni URL
  headers: {
    "Content-Type": "application/json", // Defaultni header
  },
});

export default api;