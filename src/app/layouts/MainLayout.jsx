import React, { useState, useEffect } from "react";
import Navbar from "../../shared/ui/components/Navbar";
import { Outlet, useLocation } from "react-router";
import TransactionForm from "../../shared/ui/components/TransactionForm";
import { useTransactionContext, TransactionProvider } from "../../shared/context/TransactionFormContext";
import { Menu, X } from "lucide-react";

// Inner layout — consumes TransactionContext
const MainLayoutContent = () => {
  const { showTransactionModal } = useTransactionContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Top Header */}
      <div className="fixed top-0 left-0 z-30 flex h-14 w-full items-center justify-between border-b border-slate-200 bg-white px-4 md:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white">
            <img src="\walletlyLogo.png" alt="Walletly Logo" />
          </div>
          <h1 className="text-sm font-bold text-slate-800">Walletly</h1>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-slate-600 hover:text-slate-800 focus:outline-none"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-800/50 transition-opacity md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Navbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <main className="pt-18 p-4 md:ml-55 md:p-6 md:pt-6">
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

