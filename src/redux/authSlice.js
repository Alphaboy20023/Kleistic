import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const api = axios.create({
  baseURL: "https://kleistic-v2.onrender.com/auth/",
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

export const googleLogin = createAsyncThunk('auth/googleLogin', async (_, thunkAPI) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken();

    const response = await api.post('google-login/', {
      token: idToken
    });

    const { user, tokens } = response.data;

    localStorage.setItem("kleistic_user", JSON.stringify(user));
    localStorage.setItem("access_token", tokens.access);
    localStorage.setItem("refresh_token", tokens.refresh);

    axios.defaults.headers.common["Authorization"] = `Bearer ${tokens.access}`;

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Google login failed');
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
      })

      .addCase(googleLogin.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })

      .addCase(googleLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = '';
      })

      .addCase(googleLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message
      });

  }
});

export const { logout, resetAuth } = authSlice.actions;
export default authSlice.reducer;

