import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/state/authSlice";
import accountReducer from "../features/account/state/accountSlice";
import transactionReducer from "../features/transactions/state/transactionSlice";
import filterReducer from "../features/transactions/state/filterSlice";
import budgetReducer from "../features/budget/state/budgetSlice";
import goalReducer from "../features/goals/state/goalSlice";
import recurringReducer from "../features/recurring/state/recurringSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    accounts: accountReducer,
    transactions: transactionReducer,
    filter: filterReducer,
    budgets: budgetReducer,
    goals: goalReducer,
    recurring: recurringReducer,
  },
});
