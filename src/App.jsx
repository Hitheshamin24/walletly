import React from "react";
import AppRoutes from "./features/routes/AppRoutes";
import { TransactionProvider } from "./shared/context/TransactionFormContext";

const App = () => {
  return (
    <div>
      <TransactionProvider>
        <AppRoutes />
      </TransactionProvider>
    </div>
  );
};

export default App;
