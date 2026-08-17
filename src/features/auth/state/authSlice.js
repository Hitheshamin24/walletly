import { createSlice } from "@reduxjs/toolkit";

const getInitialUser = () => {
  try {
    const stored = localStorage.getItem("walletlyCurrentUser");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};
const initialUser = getInitialUser();

const initialState = {
  user: initialUser,
  isAuthenticated: !!initialUser,
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
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
});

export const { addUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
