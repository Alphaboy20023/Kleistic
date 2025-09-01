import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



// const API_URL = "http://localhost:8000/auth/orders/";
const API_URL = "https://kleistic-v2.onrender.com/auth/orders/" 

export const createOrder = createAsyncThunk(
    "orders/createOrder",
    async (orderData, { getState, rejectWithValue }) => {
        try {
            
            const accessToken = getState().auth.data?.tokens?.access;
            console.log("access", accessToken)
            const response = await axios.post(API_URL, orderData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || error.message || "something went wrong"
            );
        }
    }
);

export const refreshAccessToken = createAsyncThunk(
  "auth/refresh",
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { refreshToken },
      } = getState();

      const response = await axios.post(`${API_URL}token/refresh/`, {
        refresh: refreshToken,
      });

      return response.data.access; 
    } catch (err) {
      return rejectWithValue("Session expired, please log in again.");
    }
  }
);


const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        loading: false,
        error: null,
        success: false
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
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.orders.push(action.payload);
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.detail ||
                    action.payload?.message ||
                    "Please fill all inputs and fields!";
            });
    },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;