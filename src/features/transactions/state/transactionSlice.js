import { createSlice } from "@reduxjs/toolkit";

const getInitialUser = () => {
  try {
    const stored = localStorage.getItem("walletlyCurrentUser");
    return stored ? JSON.parse(stored)?.id : null;
  } catch {
    return null;
  }
};
const getCurrentTime = () => {
  const now = new Date();

  const date = now.toLocaleDateString("en-GB");
  const time = now.toLocaleTimeString("en-GB");
  return [date, time];
};

const getCurrentTransaction = () => {
  try {
    const stored = localStorage.getItem(`walletly-Transactions-${getInitialUser()}`);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};
const getCurrentLastUpdated = () => {
  try {
    const stored = localStorage.getItem(`walletly-lastUpdate-Transactions-${getInitialUser()}`);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
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
    removeTransactionAccount: (state, action) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.accountId !== action.payload,
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
  },
});

export const { addTransaction, removeTransaction, updateTransaction ,removeTransactionAccount} =
  transactionSlice.actions;

export default transactionSlice.reducer;
