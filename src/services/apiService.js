// apiService.js
import axios from "axios";

export const API_BASE_URL = "uks-server.developers.rs";

export const getBlogs = async () => {
  const response = await axios.get(`/api/blog/get/all`);
  return response.data;
};

export const getBlogDetails = async (blogId, userId) => {
  const response = await axios.get(
    `/blog/get/detail/${blogId}/${userId}`
  );
  return response.data;
};

export const getAllPages = async () => {
  const response = await axios.get(`/api/pages/get/all`);
  return response.data;
};

export const getAllClients = async () => {
  const response = await axios.get(`/api/clients/get/all`);
  return response.data; // Ensure API returns an array of clients
};
