// apiService.js
import axios from "axios";

export const API_BASE_URL = "http://localhost:8080";

export const getBlogs = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/blog/get/all`);
  return response.data;
};

export const getBlogDetails = async (blogId, userId) => {
  const response = await axios.get(
    `${API_BASE_URL}/blog/get/detail/${blogId}/${userId}`
  );
  return response.data;
};

export const getAllPages = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/pages/get/all`);
  return response.data;
};

export const getAllClients = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/clients/get/all`);
  return response.data; // Ensure API returns an array of clients
};
