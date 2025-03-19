import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

import { BASE_URL } from "../baseURL";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const { data } = await axios.get(`${BASE_URL}/cart`);

  return data;
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product, { getState }) => {
    const { cart } = getState().cart;

    const existProduct = cart.find((item) => item.id === product.id);

    if (existProduct) {
      const updatedQuantity = existProduct.quantity + 1;
      await axios.patch(`${BASE_URL}/cart/${product.id}`, {
        quantity: updatedQuantity,
      });
      return { ...existProduct, quantity: updatedQuantity };
    } else {
      await axios.post(`${BASE_URL}/cart`, { ...product, quantity: 1 });
      return { ...product, quantity: 1 };
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id) => {
    console.log(id);
    await axios.delete(`${BASE_URL}/cart/${id}`);
    return id;
  }
);

export const clearCart = createAsyncThunk("cart/clearCart", async () => {
  const { data } = await axios.get(`${BASE_URL}/cart`);
  await Promise.all(
    data.map((item) => axios.delete(`${BASE_URL}/cart/${item.id}`))
  );
  return [];
});

const initialState = {
  cart: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.total = action.payload.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      })
      .addCase(addToCart.fulfilled, (state, { payload }) => {
        const product = state.cart.find((item) => item.id === payload.id);
        if (product) {
          product.quantity = payload.quantity;
        } else {
          state.cart.push(payload);
        }
        state.total += payload.price;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
        state.total = state.cart.reduce((sum, item) => sum + item.price, 0);
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cart = [];
        state.total = 0;
      });
  },
});

export default cartSlice.reducer;
