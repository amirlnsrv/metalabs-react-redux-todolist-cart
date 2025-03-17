import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

import productImg1 from "../assets/images/productItem1.png";
import productImg2 from "../assets/images/productItem2.png";
import productImg3 from "../assets/images/productItem3.png";
import productImg4 from "../assets/images/productItem4.png";
import productImg5 from "../assets/images/productItem5.png";
import productImg6 from "../assets/images/productItem6.png";
import { BASE_URL } from "../baseURL";

export const fetchProducts = createAsyncThunk(
  "cart/fetchProducts",
  async () => {
    const { data } = await axios.get(`${BASE_URL}/cart`);

    return data;
  }
);

export const addProduct = createAsyncThunk(
  "cart/addProduct",
  async (product) => {
    await axios.post(`${BASE_URL}/cart`, product);
    return product;
  }
);

export const removeProduct = createAsyncThunk(
  "cart/removeProduct",
  async (id) => {
    console.log(id);
    await axios.delete(`${BASE_URL}/cart/${id}`);
    return id;
  }
);

export const clearProducts = createAsyncThunk(
  "cart/clearProducts",
  async () => {
    const { data } = await axios.get(`${BASE_URL}/cart`);
    await Promise.all(
      data.map((item) => axios.delete(`${BASE_URL}/cart/${item.id}`))
    );
    return [];
  }
);

const initialState = {
  products: [
    {
      id: "1",
      img: productImg1,
      title: "Смартфон Apple iPhone 14 128GB",
      price: 87999,
    },
    {
      id: "2",
      img: productImg2,
      title: "Смартфон Apple iPhone 12 64GB",
      price: 47756,
    },
    {
      id: "3",
      img: productImg3,
      title: "Смартфон HUAWEI nova Y61",
      price: 14117,
    },
    {
      id: "4",
      img: productImg4,
      title: "Смартфон Xiaomi Redmi  128GB",
      price: 87999,
    },
    {
      id: "5",
      img: productImg5,
      title: "Смартфон Apple iPhone 14 128GB",
      price: 79999,
    },
    {
      id: "6",
      img: productImg6,
      title: "Смартфон HUAWEI nova Y61",
      price: 14117,
    },
  ],
  cart: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.total = action.payload.reduce((sum, item) => sum + item.price, 0);
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.cart.push(action.payload);
        state.total += action.payload.price;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
        state.total = state.cart.reduce((sum, item) => sum + item.price, 0);
      })
      .addCase(clearProducts.fulfilled, (state) => {
        state.cart = [];
        state.total = 0;
      });
  },
});

export default cartSlice.reducer;
