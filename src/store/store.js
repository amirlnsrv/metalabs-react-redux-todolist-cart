import { configureStore } from "@reduxjs/toolkit";

import todoReducer from "./todoSlice";
import cartReducer from "./cartSlice";
import productsReducer from "./productsSlice";

const store = configureStore({
  reducer: {
    todos: todoReducer,
    cart: cartReducer,
    products: productsReducer,
  },
});

export default store;
