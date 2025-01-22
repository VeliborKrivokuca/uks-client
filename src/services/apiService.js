// apiService.js
import axios from "axios";
import { API_BASE_URL } from "./api";

export const getAllPages = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/pages/get/all`);
  return response.data;
};

export const getAllClients = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/clients/get/all`);
  return response.data;
};
