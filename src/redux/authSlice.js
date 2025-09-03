import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const api = axios.create({

  // baseURL: "http://127.0.0.1:8000/auth/",
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
    const user = response.data.user;
    // console.log(access)

    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh)
    localStorage.setItem('kleistic_user', JSON.stringify(user));

    api.defaults.headers.common['Authorization'] = `Bearer ${access}`;

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
    localStorage.setItem("access", tokens.access);
    localStorage.setItem("refresh", tokens.refresh);

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

export const refreshToken = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const refresh = localStorage.getItem("refresh");
      if (!refresh) throw new Error("No refresh token found");

      const response = await api.post("token/refresh/", { refresh });
      const { access } = response.data;

      localStorage.setItem("access", access);
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

      return { access };
    } catch (error) {
      thunkAPI.dispatch(logout()); // clear state if refresh fails
      return thunkAPI.rejectWithValue("Session expired, please login again");
    }
  }
);



const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: (() => {
      // Initialize from localStorage on app startup
      const access = localStorage.getItem('access');
      const refresh = localStorage.getItem('refresh');
      const userString = localStorage.getItem('kleistic_user');

      if (access && refresh && userString) {
        try {
          const user = JSON.parse(userString);
          return {
            tokens: { access, refresh },
            user: user
          };
        } catch (error) {
          localStorage.removeItem('kleistic_user');
        }
      }
      return null;
    })(),
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
      localStorage.removeItem('kleistic_user');
    },
    resetAuth: (state) => {
      state.status = "idle";
      state.error = "";
      state.data = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
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
      })

      .addCase(refreshToken.pending, (state) => {
        state.status = "refreshing";
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.data) {
          state.data.tokens = {
            ...state.data.tokens,
            access: action.payload.access
          };
        }
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Token refresh failed";
      });

  }
});

export const { logout, resetAuth, setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;

