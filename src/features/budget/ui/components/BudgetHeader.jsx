import { Plus } from "lucide-react";

const BudgetHeader = ({ onNewBudget }) => {
  return (
    <div className="mb-4 flex items-start justify-between">
      <div>
        <h1 className="text-lg font-bold tracking-tight text-slate-900">
          Budgets
        </h1>
        <p className="text-[11px] text-slate-500">
          Track your spending limits and stay on top of your monthly goals.
        </p>
      </div>

      <button
        onClick={onNewBudget}
        className="flex h-8 items-center gap-1.5 rounded-md bg-teal-700 px-3 text-[11px] font-semibold text-white shadow-sm hover:bg-teal-800 transition cursor-pointer"
      >
        <Plus size={12} strokeWidth={2.5} />
        Set New Budget
      </button>
    </div>
  );
};

export default BudgetHeader;
