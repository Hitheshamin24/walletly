import { useState } from "react";
import BudgetHeader from "../components/BudgetHeader";
import CategoryBudgets from "../components/CategoryBudgets";
import BudgetAlerts from "../components/BudgetAlerts";
import BudgetForm from "../components/BudgetForm";
import { useBudgetHook } from "../../hooks/useBudgetHook";
import { useDashboard } from "../../../../shared/hooks/useDashboard";

const BudgetsPage = () => {
  const { budgets, alerts, deleteBudget } = useBudgetHook();
  const { fmt } = useDashboard();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);

  const openNew = () => {
    setEditingBudget(null);
    setIsModalOpen(true);
  };

  const openEdit = (budget) => {
    setEditingBudget(budget);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBudget(null);
  };

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-800">
      <main className="px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <BudgetHeader onNewBudget={openNew} />

          {/* Summary strip */}
          <div className="mb-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
              <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                Total Budgets
              </p>
              <p className="mt-1 text-xl font-bold text-slate-800">
                {budgets.length}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
              <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                Total Limit
              </p>
              <p className="mt-1 text-xl font-bold text-slate-800">
                {fmt(budgets.reduce((s, b) => s + Number(b.limit), 0))}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
              <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                Total Spent
              </p>
              <p
                className={`mt-1 text-xl font-bold ${
                  budgets.some((b) => b.isOver) ? "text-red-500" : "text-teal-600"
                }`}
              >
                {fmt(budgets.reduce((s, b) => s + b.spent, 0))}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_240px]">
            {/* Left */}
            <CategoryBudgets
              budgets={budgets}
              onEdit={openEdit}
              onDelete={deleteBudget}
              fmt={fmt}
              onNew={openNew}
            />

            {/* Right */}
            <BudgetAlerts alerts={alerts} fmt={fmt} />
          </div>
        </div>
      </main>

      {isModalOpen && (
        <BudgetForm budgetToEdit={editingBudget} onClose={closeModal} />
      )}
    </div>
  );
};

export default BudgetsPage;