import React from "react";
import Navbar from "../../shared/ui/components/Navbar";
import { Outlet } from "react-router";
import TransactionForm from "../../shared/ui/components/TransactionForm";
import { useTransactionContext, TransactionProvider } from "../../shared/context/TransactionFormContext";

// Inner layout — consumes TransactionContext
const MainLayoutContent = () => {
  const { showTransactionModal } = useTransactionContext();
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="ml-55 p-6">
        <Outlet />
      </main>
      {showTransactionModal && <TransactionForm />}
    </div>
  );
};

const MainLayout = () => (
  <TransactionProvider>
    <MainLayoutContent />
  </TransactionProvider>
);

export default MainLayout;

