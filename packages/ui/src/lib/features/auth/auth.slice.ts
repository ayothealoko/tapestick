import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface AuthState {
  accessToken?: string;
}

// Define the initial state using that type
const initialState: AuthState = {};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    tokenReceived: (state, action: PayloadAction<string>) => {
      state.accessToken += action.payload;
    },

    loggedOut: (state) => {
      console.log("logged out");
    },
  },
});

export const { tokenReceived, loggedOut } = authSlice.actions;
