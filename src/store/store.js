import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import cartReducer from "../redux/cartSlice"
import orderReducer from "../redux/orderSlice"
import productReducer from "../redux/productSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    orders: orderReducer,
    products: productReducer
  },

});

export default store;
