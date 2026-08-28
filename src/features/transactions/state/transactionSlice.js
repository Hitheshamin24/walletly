import { createSlice } from "@reduxjs/toolkit";

const getInitialUser = () => {
  const { id } = JSON.parse(localStorage.getItem("walletlyCurrentUser"));
  return id;
};
const getCurrentTime = () => {
  const now = new Date();

  const date = now.toLocaleDateString("en-GB");
  const time = now.toLocaleTimeString("en-GB");
  return [date, time];
};

const getCurrentTransaction = () => {
  return (
    JSON.parse(
      localStorage.getItem(`walletly-Transactions-${getInitialUser()}`),
    ) || []
  );
};
const getCurrentLastUpdated = () => {
  return (
    JSON.parse(
      localStorage.getItem(
        `walletly-lastUpdate-Transactions-${getInitialUser()}`,
      ),
    ) || []
  );
};
const initialState = {
  transactions: getCurrentTransaction(),
  lastUpdated: getCurrentLastUpdated(),
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
      state.lastUpdated = getCurrentTime();
      localStorage.setItem(
        `walletly-Transactions-${getInitialUser()}`,
        JSON.stringify(state.transactions),
      );
      localStorage.setItem(
        `walletly-lastUpdate-Transactions-${getInitialUser()}`,
        JSON.stringify(state.lastUpdated),
      );
    },
    removeTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload,
      );
      state.lastUpdated = getCurrentTime();
      localStorage.setItem(
        `walletly-Transactions-${getInitialUser()}`,
        JSON.stringify(state.transactions),
      );
      localStorage.setItem(
        `walletly-lastUpdate-Transactions-${getInitialUser()}`,
        JSON.stringify(state.lastUpdated),
      );
    },
    updateTransaction: (state, action) => {
      const index = state.transactions.findIndex(
        (transaction) => transaction.id === action.payload.id,
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
        state.lastUpdated = getCurrentTime();
        localStorage.setItem(
          `walletly-Transactions-${getInitialUser()}`,
          JSON.stringify(state.transactions),
        );
        localStorage.setItem(
          `walletly-lastUpdate-Transactions-${getInitialUser()}`,
          JSON.stringify(state.lastUpdated),
        );
      }
    },
  },
});

export const { addTransaction, removeTransaction, updateTransaction } =
  transactionSlice.actions;

export default transactionSlice.reducer;
