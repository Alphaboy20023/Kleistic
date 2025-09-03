import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({
  //   baseURL: "http://localhost:8000/auth/",
  baseURL: "https://kleistic-v2.onrender.com/auth/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Attach access token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});



// --- Thunks ---
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await API.post("orders/", orderData);
      return res.data;
    } catch (err) {
      console.log('Full error object:', err); // See the full error
      console.log('Error response:', err.response?.data);
      return rejectWithValue(err.response?.data || "Failed to create order");
    }
  }
);

// Add this temporarily to see the full URL
console.log('Full URL:', API.defaults.baseURL + 'orders/');

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("orders/");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch orders");
    }
  }
);

export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (orderId) => {
    const response = await axios.delete(`/orders/${orderId}/`);
    return response.data; // Returns the updated order with status: "Cancelled"
});

export const refreshAccessToken = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const refresh = localStorage.getItem("refresh");
      const res = await API.post("token/refresh/", { refresh });

      localStorage.setItem("access", res.data.access);
      return res.data.access;
    } catch (err) {
      return rejectWithValue("Session expired, please log in again.");
    }
  }
);

// --- Slice ---
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetOrderState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // createOrder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;

        const errorPayload = action.payload;

        if (typeof errorPayload === 'string') {
          state.error = errorPayload;
        } else if (errorPayload?.detail) {
          state.error = errorPayload.detail;
        } else if (errorPayload?.error) {
          state.error = errorPayload.error;
        } else if (errorPayload?.message) {
          state.error = errorPayload.message;
        } else {

          state.error = "Please check your form fields";
        }
      })

      // fetchOrders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
      })

      // deleteOrder
      .addCase(deleteOrder.fulfilled, (state, action) => {
        // Update the order in the state with the new status
        const updatedOrder = action.payload;
        const index = state.orders.findIndex(order => order.id === updatedOrder.id);
        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
      })

      .addCase(deleteOrder.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;



// {
//   "shipping_address": "12 Test Avenue, Lagos",
//   "paymentMethod": "PAY_ON_DELIVERY",
//   "items": [
//     {
//       "product": 1,
//       "quantity": 2
//     },
//     {
//       "product": 3,
//       "quantity": 1
//     }
//   ]
// }
