import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = globalSlice.actions;
export default globalSlice.reducer;
