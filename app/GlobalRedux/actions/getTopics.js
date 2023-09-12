"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const NEXT_PUBLIC_API_URL= process.env.NEXT_PUBLIC_API_URL


export const fetchTopicsItems = createAsyncThunk(
  "TopicsItems/fetchTopicsItems",
  async () => {
    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/topics`);
    return response.data;
  }
);
const fetchTopicsItemsSlice = createSlice({
  name: "TopicsItems",
  initialState: {
    loading: true,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopicsItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopicsItems.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTopicsItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});
export default fetchTopicsItemsSlice.reducer;


