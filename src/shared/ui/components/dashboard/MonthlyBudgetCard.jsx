import { MoreHorizontal } from "lucide-react";

const SPENT = 3100;
const TOTAL = 4000;
const PERCENT = ((SPENT / TOTAL) * 100).toFixed(1);
const REMAINING = TOTAL - SPENT;

const MonthlyBudgetCard = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">
            Monthly Budget
          </h3>
          <p className="text-[10px] text-slate-400">August 2026</p>
        </div>
        <MoreHorizontal size={15} className="text-slate-400" />
      </div>

      <div className="mb-2 flex items-end justify-between">
        <span className="text-lg font-bold text-slate-800">${SPENT.toLocaleString()}</span>
        <span className="text-[10px] text-slate-400">of ${TOTAL.toLocaleString()}</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-teal-600"
          style={{ width: `${PERCENT}%` }}
        />
      </div>

      <div className="mt-2 flex justify-between text-[9px]">
        <span className="text-slate-400">{PERCENT}% used</span>
        <span className="font-medium text-teal-600">
          ${REMAINING.toLocaleString()} left
        </span>
      </div>
    </div>
  );
};

export default MonthlyBudgetCard;
