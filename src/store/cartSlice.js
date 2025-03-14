import { createSlice } from "@reduxjs/toolkit";

import productImg1 from "../assets/images/productItem1.png";
import productImg2 from "../assets/images/productItem2.png";
import productImg3 from "../assets/images/productItem3.png";
import productImg4 from "../assets/images/productItem4.png";
import productImg5 from "../assets/images/productItem5.png";
import productImg6 from "../assets/images/productItem6.png";

const initialState = {
  products: [
    {
      id: 1,
      img: productImg1,
      title: "Смартфон Apple iPhone 14 128GB",
      price: 87999,
    },
    {
      id: 2,
      img: productImg2,
      title: "Смартфон Apple iPhone 12 64GB",
      price: 47756,
    },
    {
      id: 3,
      img: productImg3,
      title: "Смартфон HUAWEI nova Y61",
      price: 14117,
    },
    {
      id: 4,
      img: productImg4,
      title: "Смартфон Xiaomi Redmi  128GB",
      price: 87999,
    },
    {
      id: 5,
      img: productImg5,
      title: "Смартфон Apple iPhone 14 128GB",
      price: 79999,
    },
    {
      id: 6,
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
  reducers: {
    addToCart(state, { payload }) {
      const product = state.products.find((product) => product.id === payload);
      if (product) {
        state.cart.push(product);
        state.total += product.price;
      }
    },
    removeFromCart(state, { payload }) {
      const id = state.cart.findIndex((product) => product.id === payload);
      if (id !== -1) {
        state.total -= state.cart[id].price;
        state.cart.splice(id, 1);
      }
    },
    clearCart(state) {
      state.cart = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
