import { Target } from "lucide-react";

/* ── Single budget card ───────────────────────────────────── */
const BudgetCard = ({ budget }) => {
  const Icon = budget.icon;
  const isOver = budget.percentage > 100;

  return (
    <div className="rounded-md border border-slate-200 bg-white p-2.5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="flex items-center gap-2">
        <div
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${budget.iconBg} ${budget.iconColor}`}
        >
          <Icon size={11} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[8px] font-semibold text-slate-700">
            {budget.name}
          </p>
          <p className="text-[6px] text-slate-400">Monthly limit</p>
        </div>

        <div className="text-right">
          <p
            className={`text-[8px] font-semibold ${
              isOver ? "text-red-500" : "text-slate-700"
            }`}
          >
            {budget.amount}{" "}
            <span className="font-normal text-slate-400">/ {budget.limit}</span>
          </p>
          <p
            className={`text-[6px] ${isOver ? "text-red-400" : "text-slate-400"}`}
          >
            {isOver ? "Over Budget" : "Within Budget"}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-3">
        <div className="h-1 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full ${budget.progress}`}
            style={{ width: `${Math.min(budget.percentage, 100)}%` }}
          />
        </div>

        <div className="mt-1 flex justify-between">
          <span
            className={`text-[6px] ${isOver ? "text-red-500" : "text-slate-400"}`}
          >
            {budget.remaining}
          </span>
          <span
            className={`text-[6px] font-medium ${
              isOver ? "text-red-500" : "text-slate-500"
            }`}
          >
            {budget.percentage}% used
          </span>
        </div>
      </div>
    </div>
  );
};

/* ── Budget cards section ─────────────────────────────────── */
const CategoryBudgets = ({ budgets }) => {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Target size={10} className="text-teal-600" />
          <h2 className="text-[9px] font-semibold text-slate-700">
            Category Budgets
          </h2>
        </div>
        <button className="text-[7px] font-medium text-teal-600 hover:underline">
          See All
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {budgets.map((budget) => (
          <BudgetCard key={budget.name} budget={budget} />
        ))}
      </div>
    </div>
  );
};

export default CategoryBudgets;
