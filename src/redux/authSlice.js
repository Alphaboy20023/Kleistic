import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const logIn = createAsyncThunk('auth/logIn', async ({ username, password }, _) => {
  const response = await fetch('', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  const data = await response.json();
  localStorage.setItem('token', data.token); 
  return data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: null,
    status: 'idle',
    error: '',
  },
  
  reducers: {
    logout: (state) => {
      state.data = null;
      state.status = 'idle';
      state.error = '';
      localStorage.removeItem('token');
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
