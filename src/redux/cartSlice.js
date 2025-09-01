import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items:
    typeof window !== "undefined" && localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id === action.payload.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === productId);

      if (existingItem) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== productId);
        } else {
          existingItem.quantity = quantity;
        }
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    clearCart: (state) => {
      state.items = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }
    },
  },
});

export const { addToCart, decreaseQuantity, clearCart, updateQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
