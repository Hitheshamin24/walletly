import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/state/authSlice";
import accountReducer from "../features/account/state/accountSlice";
import transactionReducer from "../features/transactions/state/transactionSlice";
import filterReducer from "../features/transactions/state/filterSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    accounts: accountReducer,
    transactions: transactionReducer,
    filter: filterReducer,
  },
});
