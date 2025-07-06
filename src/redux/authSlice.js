import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "https://web-production-6999.up.railway.app/kleistic/",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },

  withCredentials: true
});

export const logIn = createAsyncThunk('auth/login', async ({ username, password }, thunkAPI) => {
  try {
    const response = await api.post('login/', { username, password });

    const { access, refresh } = response.data.tokens;

    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh)

    return response.data;
  } catch (error) {
    // this next line?
    return thunkAPI.rejectWithValue(error.response?.data?.detail || 'Login failed')
  }
});


export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await api.post('register/', userData);
    return response.data;
  } catch (error) {

    console.error('❌ Register error:', error.response?.data || error.message);
    
    if (error.response?.data) {
      return thunkAPI.rejectWithValue(error.response.data);
    }

    return thunkAPI.rejectWithValue({ error: 'Registration failed' });
  }
})


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: null,
    status: "idle",
    error: '',
  },

  reducers: {
    logout: (state) => {
      state.data = null;
      state.status = 'idle';
      state.error = '';
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    },
    resetAuth: (state) => {
      state.status = "idle";
      state.error = "";
      state.data = null;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })

      .addCase(logIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })

      .addCase(logIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })

      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })

      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })

      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });

  }
});

export const { logout, resetAuth } = authSlice.actions;
export default authSlice.reducer;





















// src/api/axiosWithRefresh.js
// import axios from "axios";
// import api from "./axios"; // reuse your base Axios instance

// const axiosWithRefresh = axios.create();

// axiosWithRefresh.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       const refresh = localStorage.getItem("refresh");
//       if (!refresh) return Promise.reject(error);

//       try {
//         const res = await api.post("/token/refresh/", { refresh });
//         localStorage.setItem("access", res.data.access);
//         api.defaults.headers["Authorization"] = `Bearer ${res.data.access}`;
//         originalRequest.headers["Authorization"] = `Bearer ${res.data.access}`;
//         return api(originalRequest);
//       } catch (err) {
//         console.error("Token refresh failed", err);
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosWithRefresh;
