import { createSlice } from "@reduxjs/toolkit";

const getInitialUser = () => {
  const { id } = JSON.parse(localStorage.getItem("walletlyCurrentUser"));
  return id;
};
const getCurrentAccounts = () => {
  return (
    JSON.parse(localStorage.getItem(`walletly-accounts-${getInitialUser()}`)) ||
    []
  );
};
const initialState = {
  accounts: getCurrentAccounts(),
};
const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    addAccount: (state, action) => {
      state.accounts.push(action.payload);
      localStorage.setItem(
        `walletly-accounts-${getInitialUser()}`,
        JSON.stringify(state.accounts),
      );
    },
    removeAccount: (state, action) => {
      state.accounts = state.accounts.filter(
        (account) => account.id !== action.payload,
      );
      localStorage.setItem(
        `walletly-accounts-${getInitialUser()}`,
        JSON.stringify(state.accounts),
      );
    },
    updateAccount: (state, action) => {
      let index = state.accounts.findIndex(
        (account) => account.id === action.payload.id,
      );
      if (index !== -1) state.accounts[index] = action.payload;
      localStorage.setItem(
        `walletly-accounts-${getInitialUser()}`,
        JSON.stringify(state.accounts),
      );
    },
  },
});

export const { addAccount, removeAccount, updateAccount } =
  accountSlice.actions;

export default accountSlice.reducer;
