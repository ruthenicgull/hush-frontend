import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types";

// Define a type for the slice state
export interface UserState {
  data: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

// Define the initial state using that type
const initialState: UserState = {
  data: null,
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
      state.data = action.payload.data;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
