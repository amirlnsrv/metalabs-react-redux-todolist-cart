import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

import { BASE_URL } from "../baseURL";

export const fetchProducts = createAsyncThunk(
  "cart/fetchProducts",
  async ({ page, limit }) => {
    const { data } = await axios.get(`${BASE_URL}/products`, {
      params: {
        _page: page,
        _per_page: limit,
      },
    });
    return data;
  }
);

const initialState = {
  responseForProducts: {},
};

const productsSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.responseForProducts = action.payload;
    });
  },
});

export default productsSlice.reducer;
