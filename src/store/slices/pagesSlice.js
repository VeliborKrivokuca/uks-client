import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/api";

export const fetchAllPages = createAsyncThunk("pages/fetchAll", async () => {
  const response = await apiClient.get("/api/pages/get/all");
  return response.data; // Automatically handled as `fulfilled`
});

export const fetchAllClients = createAsyncThunk("clients/fetchAll", async () => {
  const response = await apiClient.get("/api/clients/get/all");
  return response.data;
});

const pagesSlice = createSlice({
  name: "pages",
  initialState: {
    pages: [],
    clients: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Pages
      .addCase(fetchAllPages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPages.fulfilled, (state, action) => {
        state.loading = false;
        state.pages = action.payload;
      })
      .addCase(fetchAllPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Clients
      .addCase(fetchAllClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchAllClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default pagesSlice.reducer;
