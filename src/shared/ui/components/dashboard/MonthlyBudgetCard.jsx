import { useDashboard } from "../../../hooks/useDashboard";
import { useBudgetHook } from "../../../../features/budget/hooks/useBudgetHook";
import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";

const MonthlyBudgetCard = () => {
  const { fmt } = useDashboard();
  const { budgets } = useBudgetHook();
  const navigate = useNavigate();

  const now = new Date();
  const monthLabel = now.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const totalLimit = budgets.reduce((s, b) => s + Number(b.limit), 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);
  const hasbudgets = budgets.length > 0;
  const isOver = totalSpent > totalLimit;
  const percent = totalLimit > 0 ? Math.min((totalSpent / totalLimit) * 100, 100).toFixed(1) : 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Monthly Budget</h3>
          <p className="text-[10px] text-slate-400">{monthLabel}</p>
        </div>
      </div>

      {!hasbudgets ? (
        <div className="flex flex-col items-center gap-2 py-3 text-center">
          <p className="text-[11px] text-slate-500">No budgets set</p>
          <p className="text-[10px] text-slate-400">Set category budgets to track your spending</p>
          <button
            onClick={() => navigate("/main/budgets")}
            className="flex items-center gap-1 rounded-md bg-teal-50 px-3 py-1.5 text-[10px] font-medium text-teal-700 hover:bg-teal-100 transition cursor-pointer"
          >
            Set Budgets <ArrowRight size={10} />
          </button>
        </div>
      ) : (
        <>
          <div className="mb-2 flex items-end justify-between">
            <span className="text-lg font-bold text-slate-800">{fmt(totalSpent)}</span>
            <span className="text-[10px] text-slate-400">of {fmt(totalLimit)}</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isOver ? "bg-red-500" : Number(percent) >= 75 ? "bg-amber-500" : "bg-teal-600"
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>

          <div className="mt-2 flex justify-between text-[9px]">
            <span className="text-slate-400">{percent}% used</span>
            {isOver ? (
              <span className="font-medium text-red-500">{fmt(totalSpent - totalLimit)} over</span>
            ) : (
              <span className="font-medium text-teal-600">{fmt(totalLimit - totalSpent)} left</span>
            )}
          </div>

          {/* Mini per-budget bars */}
          <div className="mt-3 space-y-1.5">
            {budgets.slice(0, 3).map((b) => (
              <div key={b.id} className="flex items-center gap-2">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: b.color ?? "#0f766e" }}
                />
                <span className="min-w-0 flex-1 truncate text-[9px] capitalize text-slate-500">
                  {b.category}
                </span>
                <span
                  className={`text-[9px] font-medium ${b.isOver ? "text-red-500" : "text-slate-600"}`}
                >
                  {b.percentage}%
                </span>
              </div>
            ))}
            {budgets.length > 3 && (
              <button
                onClick={() => navigate("/main/budgets")}
                className="text-[9px] text-teal-600 hover:underline cursor-pointer"
              >
                +{budgets.length - 3} more →
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MonthlyBudgetCard;
