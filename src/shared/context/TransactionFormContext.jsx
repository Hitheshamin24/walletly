/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import TransactionForm from "../ui/components/TransactionForm";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  return (
    <TransactionContext.Provider
      value={{ showTransactionModal, setShowTransactionModal }}
    >
      {children}
      {showTransactionModal && <TransactionForm />}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
