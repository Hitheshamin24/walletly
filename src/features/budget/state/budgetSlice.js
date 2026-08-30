import { createSlice } from "@reduxjs/toolkit";

const getInitialUser = () => {
  try {
    const stored = localStorage.getItem("walletlyCurrentUser");
    return stored ? JSON.parse(stored)?.id : null;
  } catch {
    return null;
  }
};

const getStoredBudgets = () => {
  try {
    const stored = localStorage.getItem(`walletly-budgets-${getInitialUser()}`);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const persist = (budgets) => {
  localStorage.setItem(
    `walletly-budgets-${getInitialUser()}`,
    JSON.stringify(budgets),
  );
};

const initialState = {
  budgets: getStoredBudgets(),
};

const budgetSlice = createSlice({
  name: "budgets",
  initialState,
  reducers: {
    addBudget: (state, action) => {
      state.budgets.push(action.payload);
      persist(state.budgets);
    },
    updateBudget: (state, action) => {
      const idx = state.budgets.findIndex((b) => b.id === action.payload.id);
      if (idx !== -1) {
        state.budgets[idx] = action.payload;
        persist(state.budgets);
      }
    },
    removeBudget: (state, action) => {
      state.budgets = state.budgets.filter((b) => b.id !== action.payload);
      persist(state.budgets);
    },
  },
});

export const { addBudget, updateBudget, removeBudget } = budgetSlice.actions;
export default budgetSlice.reducer;
