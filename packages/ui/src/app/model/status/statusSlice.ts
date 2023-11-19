import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Status, StatusFile, statusRecord } from "shared-code";

const initialState: Status = {
  untracked: [],
  unstaged: [],
  staged: [],
  unmodified: [],
  notFound: [],
};

export const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Status>) => {
      state = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { set } = statusSlice.actions;

export default statusSlice.reducer;
