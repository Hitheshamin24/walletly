import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    removeUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const { addUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
