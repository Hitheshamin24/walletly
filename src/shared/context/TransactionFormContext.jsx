/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null)
  return (
    <TransactionContext.Provider
      value={{ showTransactionModal, setShowTransactionModal ,editingTransaction,setEditingTransaction}}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactionContext must be used within a TransactionProvider"
    );
  }
  return context;
};
