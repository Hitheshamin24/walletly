import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/state/authSlice";
import accountReducer from "../features/account/state/accountSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    accounts: accountReducer,
  },
});
