import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  isLoading: boolean;
  data: {
    username: string;
    email: string;
    college: string;
  } | null;
}

const initialState: UserState = {
  isLoading: false,
  data: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    fetchUserSuccess: (
      state,
      action: PayloadAction<{
        username: string;
        email: string;
        college: string;
      }>
    ) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { startLoading, stopLoading, fetchUserSuccess } =
  userSlice.actions;

export default userSlice.reducer;
