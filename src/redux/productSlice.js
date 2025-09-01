import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const API_URL = "http://localhost:8000/auth/products/";
const API_URL = "https://kleistic-v2.onrender.com/auth/products/";

export const getProducts = createAsyncThunk(
    "product/getProducts",
    async (_, { rejectWithValue }) => {
        try {
            // console.log("access", accessToken)
            const response = await axios.get(API_URL, {
                headers: {
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


const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        loading: false,
        error: null,
        success: false
    },
    reducers: {
        resetProductState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.products = action.payload
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = action.payload
            })
    }
})

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
