import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";

// Define a type for the slice state
export interface UserState {
  user_id: string | null;
  isAuthenticated: boolean;
  username: string | null;
  email: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

// Define the initial state using that type
const initialState: UserState = {
  user_id: null,
  username: null,
  email: null,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user_id = action.payload.user_id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },

    logoutUser: (state) => {
      state.user_id = null;
      state.username = null;
      state.email = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },

    // Update access token without mutating the rest of the user state
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setUser, logoutUser, updateAccessToken } = userSlice.actions;

// Selectors
export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
export const selectAccessToken = (state: RootState) => state.user.accessToken;
export const selectRefreshToken = (state: RootState) => state.user.refreshToken;
export const selectUsername = (state: RootState) => state.user.username;
export const selectUserEmail = (state: RootState) => state.user.email;
export const selectUserId = (state: RootState) => state.user.user_id;

export default userSlice.reducer;
