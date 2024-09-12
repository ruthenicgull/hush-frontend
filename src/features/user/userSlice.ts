import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface UserState {
  user_id: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

// Define the initial state using that type
const initialState: UserState = {
  user_id: null,
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
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },

    logoutUser: (state) => {
      state.user_id = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
