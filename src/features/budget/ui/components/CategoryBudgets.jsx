import { Target, Pencil, Trash2 } from "lucide-react";

const BudgetCard = ({ budget, onEdit, onDelete, fmt }) => {
  const isOver = budget.isOver;
  const pct = Math.min(budget.percentage, 100);

  // Progress bar colour: green <75%, amber 75-99%, red >=100%
  const barColor =
    budget.percentage >= 100
      ? "bg-red-500"
      : budget.percentage >= 75
      ? "bg-amber-500"
      : "bg-teal-600";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition hover:shadow-md">
      {/* Top row */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Color dot */}
          <span
            className="h-3 w-3 shrink-0 rounded-full"
            style={{ backgroundColor: budget.color ?? "#0f766e" }}
          />
          <div>
            <p className="text-[11px] font-semibold text-slate-700">
              {budget.name}
            </p>
            <p className="text-[9px] capitalize text-slate-400">
              {budget.category} · Monthly
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(budget)}
            title="Edit"
            className="flex h-6 w-6 items-center justify-center rounded text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition cursor-pointer"
          >
            <Pencil size={11} />
          </button>
          <button
            onClick={() => onDelete(budget.id)}
            title="Delete"
            className="flex h-6 w-6 items-center justify-center rounded text-slate-400 hover:bg-red-50 hover:text-red-500 transition cursor-pointer"
          >
            <Trash2 size={11} />
          </button>
        </div>
      </div>

      {/* Amounts */}
      <div className="mb-2 flex items-end justify-between">
        <span
          className={`text-base font-bold ${isOver ? "text-red-500" : "text-slate-800"}`}
        >
          {fmt(budget.spent)}
        </span>
        <span className="text-[10px] text-slate-400">
          of {fmt(budget.limit)}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Footer */}
      <div className="mt-1.5 flex justify-between text-[9px]">
        <span className={isOver ? "text-red-500 font-medium" : "text-slate-400"}>
          {isOver
            ? `${fmt(budget.spent - budget.limit)} over limit`
            : `${fmt(budget.limit - budget.spent)} remaining`}
        </span>
        <span
          className={`font-medium ${
            budget.percentage >= 100
              ? "text-red-500"
              : budget.percentage >= 75
              ? "text-amber-500"
              : "text-slate-500"
          }`}
        >
          {budget.percentage}% used
        </span>
      </div>
    </div>
  );
};

const CategoryBudgets = ({ budgets, onEdit, onDelete, fmt, onNew }) => {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Target size={13} className="text-teal-600" />
          <h2 className="text-sm font-semibold text-slate-700">
            Category Budgets
          </h2>
        </div>
        <span className="text-[10px] text-slate-400">
          {budgets.length} budget{budgets.length !== 1 ? "s" : ""}
        </span>
      </div>

      {budgets.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 py-12">
          <Target size={28} className="text-slate-200" />
          <div className="text-center">
            <p className="text-[12px] font-medium text-slate-500">No budgets yet</p>
            <p className="text-[10px] text-slate-400">
              Create your first budget to start tracking spending
            </p>
          </div>
          <button
            onClick={onNew}
            className="rounded-md bg-teal-700 px-4 py-1.5 text-[10px] font-semibold text-white hover:bg-teal-800 transition cursor-pointer"
          >
            Set New Budget
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {budgets.map((budget) => (
            <BudgetCard
              key={budget.id}
              budget={budget}
              onEdit={onEdit}
              onDelete={onDelete}
              fmt={fmt}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryBudgets;
