"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
;
const NEXT_PUBLIC_API_URL= process.env.NEXT_PUBLIC_API_URL


export const fetchTopicsServerItems = createAsyncThunk(
  "TopicsServerItems/fetchTopicsServerItems",
  async () => {
    const getTopics = async () => {
        try {
          const res = await fetch(`${NEXT_PUBLIC_API_URL}/topics`, {
            cache: "no-store",
          });
      
          if (!res.ok) {
            throw new Error("Failed to fetch topics");
          }
      
          return res.json();
        } catch (error) {
          console.log("Error loading topics: ", error);
        }
      };
      const { topics } = await getTopics();
          return topics
  }
);
const fetchTopicsServerItemsSlice = createSlice({
  name: "TopicsServerItems",
  initialState: {
    loading: true,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopicsServerItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopicsServerItems.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTopicsServerItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});
export default fetchTopicsServerItemsSlice.reducer;


