import { Plus } from "lucide-react";

const BudgetHeader = () => {
  return (
    <div className="mb-4 flex items-start justify-between">
      <div>
        <h1 className="text-lg font-bold tracking-tight text-slate-900">
          Budgets & Goals
        </h1>
        <p className="text-[8px] text-slate-500">
          Track your spending limits and savings milestones.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button className="flex h-6 items-center gap-1 rounded border border-slate-200 bg-white px-2 text-[7px] font-semibold text-slate-600 shadow-sm hover:bg-slate-50">
          <Plus size={8} />
          Create Goal
        </button>

        <button className="flex h-6 items-center gap-1 rounded bg-teal-700 px-2 text-[7px] font-semibold text-white shadow-sm hover:bg-teal-800">
          <Plus size={8} />
          Set New Budget
        </button>
      </div>
    </div>
  );
};

export default BudgetHeader;
