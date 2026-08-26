import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  accounts: [],
};
const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    addAccount: (state, action) => {
      state.accounts.push(action.payload);
    },
    removeAccount: (state, action) => {
      state.accounts = state.accounts.filter(
        (account) => account.id !== action.payload,
      );
    },
    updateAccount: (state, action) => {
      let index = state.accounts.findIndex(
        (account) => account.id === action.payload.id,
      );
      if (index !== -1) state.accounts[index] = action.payload;
    },
  },
});

export const { addAccount, removeAccount, updateAccount } =
  accountSlice.actions;

export default accountSlice.reducer;
