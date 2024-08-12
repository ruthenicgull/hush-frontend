import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface AuthState {
  // Ensure it's exported directly
  isLoginOpen: boolean;
  isSignUpOpen: boolean;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLoginOpen: false,
  isSignUpOpen: false,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunk for signup
export const signUp = createAsyncThunk(
  "auth/signUp",
  async (
    formData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        formData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (
    formData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        formData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openLoginDialog(state) {
      state.isLoginOpen = true;
    },
    closeLoginDialog(state) {
      state.isLoginOpen = false;
    },
    openSignUpDialog(state) {
      state.isSignUpOpen = true;
    },
    closeSignUpDialog(state) {
      state.isSignUpOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
        state.isSignUpOpen = false;
        state.isAuthenticated = true;
      })
      .addCase(signUp.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
        state.isLoginOpen = false;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const {
  openLoginDialog,
  closeLoginDialog,
  openSignUpDialog,
  closeSignUpDialog,
} = authSlice.actions;

export default authSlice.reducer;
